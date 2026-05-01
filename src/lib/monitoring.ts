import prisma from "./prisma";
import fetch from "node-fetch";
import https from "https";

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

        // ⚡ Bolt: Process monitors concurrently in batches of 10 to prevent interval pile-ups
        const CHUNK_SIZE = 10;
        for (let i = 0; i < monitors.length; i += CHUNK_SIZE) {
            const chunk = monitors.slice(i, i + CHUNK_SIZE);
            const results = await Promise.allSettled(
                chunk.map(monitor => checkMonitor(monitor))
            );

            // Explicitly log any unhandled rejections from checkMonitor
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`Error checking monitor ${chunk[index].id}:`, result.reason);
                }
            });
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
                     const req = https.request(monitor.url, { agent: new https.Agent({ rejectUnauthorized: true }), headers }, (res) => {
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
