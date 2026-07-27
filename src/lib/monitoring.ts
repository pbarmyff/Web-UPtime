import prisma from "./prisma";
import fetch from "node-fetch";
import https from "https";
import http from "http";
import dns from "node:dns";

function isPrivateIP(ip: string): boolean {
    if (!ip || typeof ip !== 'string') return false;

    // Check for IPv4 mapped IPv6 addresses (e.g., ::ffff:127.0.0.1)
    let checkIp = ip.toLowerCase();
    if (checkIp.startsWith('::ffff:')) {
        checkIp = checkIp.substring(7);
    }

    // IPv4 Checks
    const parts = checkIp.split('.');
    if (parts.length === 4) {
        if (parts[0] === '127') return true;
        if (parts[0] === '10') return true;
        if (parts[0] === '169' && parts[1] === '254') return true;
        if (parts[0] === '0') return true;
        if (parts[0] === '192' && parts[1] === '168') return true;
        if (parts[0] === '172') {
            const second = parseInt(parts[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
        return false;
    }

    // IPv6 Checks
    if (checkIp === '::' || checkIp === '::1') return true;
    if (checkIp.startsWith('fe80:')) return true;
    if (checkIp.startsWith('fc00:') || checkIp.startsWith('fd')) return true;

    return false;
}

const customLookup = (hostname: string, options: dns.LookupOptions, callback: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family: number) => void) => {
    // Check if the hostname is already an IP, and if it's private, block it immediately
    if (isPrivateIP(hostname)) {
         return process.nextTick(() => callback(new Error("SSRF blocked: private IP resolved"), hostname, 4));
    }
    dns.lookup(hostname, options, (err, address, family) => {
        if (err) return callback(err, address as any, family);
        let ipsToCheck: string[] = [];
        if (Array.isArray(address)) {
            ipsToCheck = address.map(a => a.address);
        } else {
            ipsToCheck = [address as unknown as string];
        }

        for (const ip of ipsToCheck) {
            if (isPrivateIP(ip)) {
                return callback(new Error("SSRF blocked: private IP resolved"), address as any, family);
            }
        }
        callback(null, address as any, family);
    });
};

const httpAgent = new http.Agent({ lookup: customLookup as any });
const httpsAgent = new https.Agent({ lookup: customLookup as any, rejectUnauthorized: true });


export async function runChecks() {
    try {
        const now = new Date();

        const monitors = await prisma.monitor.findMany({
            where: {
                OR: [
                    { nextRunAt: { lte: now } },
                    { nextRunAt: null }
                ],
                status: { not: "PAUSED" }
            },
            include: {
                maintenanceWindows: {
                    where: {
                        startTime: { lte: now },
                        endTime: { gte: now }
                    }
                }
            }
        });

        for (const monitor of monitors) {
            await checkMonitor(monitor);
        }
    } catch (error) {
        console.error("Error in check loop:", error);
    }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkMonitor(monitor: any) {
    const startTime = Date.now();
    let isUp = false;
    let statusCode = null;
    let errorMessage = null;
    let sslExpiryDays = monitor.sslExpiryDays;

    try {
        if (monitor.type === "HTTP" || monitor.type === "PING") {
             const controller = new AbortController();
             const timeoutId = setTimeout(() => controller.abort(), monitor.timeout);

             const headers = monitor.headers ? JSON.parse(monitor.headers) : undefined;
             const body = monitor.body && monitor.method !== "GET" ? monitor.body : undefined;

             // Use https.request for HTTPS to get SSL cert, otherwise use fetch
             if (monitor.url.startsWith("https://") && monitor.method === "GET" && !body) {
                 await new Promise<void>((resolve, reject) => {
                     const req = https.request(monitor.url, { agent: httpsAgent, headers }, (res) => {
                        statusCode = res.statusCode || null;

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const cert = (res.socket as any).getPeerCertificate();
                        if (cert && cert.valid_to) {
                            const validTo = new Date(cert.valid_to);
                            const daysRemaining = Math.floor((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                            sslExpiryDays = daysRemaining;
                            if (daysRemaining < 7) {
                                console.warn(`[SSL WARNING] ${monitor.url} cert expires in ${daysRemaining} days.`);
                            }
                        }

                        if (monitor.expectedStatus) {
                            isUp = statusCode === monitor.expectedStatus;
                        } else {
                            isUp = statusCode !== null && statusCode >= 200 && statusCode < 300;
                        }

                        let data = '';
                        res.on('data', chunk => data += chunk);
                        res.on('end', () => {
                            if (isUp && monitor.expectedKeyword) {
                                isUp = data.includes(monitor.expectedKeyword);
                                if (!isUp) errorMessage = "Keyword not found";
                            }
                            resolve();
                        });
                     });
                     req.on('error', reject);
                     req.on('timeout', () => {
                         req.destroy();
                         reject(new Error("Timeout"));
                     });
                     req.setTimeout(monitor.timeout);
                     req.end();
                 });
                 clearTimeout(timeoutId);
             } else {
                 const response = await fetch(monitor.url, {
                     agent: (_parsedURL) => _parsedURL.protocol === 'http:' ? httpAgent : httpsAgent,
                     method: monitor.method,
                     headers,
                     body,
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     signal: controller.signal as any
                 });

                 clearTimeout(timeoutId);

                 statusCode = response.status;

                 if (monitor.expectedStatus) {
                     isUp = statusCode === monitor.expectedStatus;
                 } else {
                     isUp = statusCode >= 200 && statusCode < 300;
                 }

                 if (isUp && monitor.expectedKeyword) {
                     const text = await response.text();
                     isUp = text.includes(monitor.expectedKeyword);
                     if (!isUp) errorMessage = "Keyword not found";
                 }
             }
        }
    } catch (error) {
        isUp = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorMessage = (error as any).message;
    }

    const responseTime = Date.now() - startTime;

    // Evaluate retry logic
    const consecutiveFailures = isUp ? 0 : monitor.consecutiveFailures + 1;
    let newStatus = monitor.status;

    if (isUp) {
        newStatus = "UP";
    } else if (consecutiveFailures >= monitor.retries) {
        newStatus = "DOWN";
    } // else, keep previous status (e.g., UP) while retrying

    await prisma.monitorLog.create({
        data: {
            monitorId: monitor.id,
            status: isUp ? "UP" : "DOWN",
            statusCode,
            responseTime,
            errorMessage
        }
    });

    const nextRunAt = new Date(Date.now() + (monitor.interval * 1000));

    await prisma.monitor.update({
        where: { id: monitor.id },
        data: {
            status: newStatus,
            consecutiveFailures,
            sslExpiryDays,
            lastChecked: new Date(),
            nextRunAt
        }
    });

    const inMaintenance = monitor.maintenanceWindows && monitor.maintenanceWindows.length > 0;

    if (!inMaintenance) {
        if (newStatus === "DOWN" && monitor.status !== "DOWN") {
            const { handleMonitorFailure } = await import("./incidents");
            await handleMonitorFailure(monitor, errorMessage);
        } else if (newStatus === "UP" && monitor.status !== "UP") {
            const { handleMonitorRecovery } = await import("./incidents");
            await handleMonitorRecovery(monitor);
        }
    }
}
