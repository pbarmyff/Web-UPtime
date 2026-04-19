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

    try {
        if (monitor.type === "HTTP" || monitor.type === "PING") {
             const controller = new AbortController();
             const timeoutId = setTimeout(() => controller.abort(), monitor.timeout);

             const headers = monitor.headers ? JSON.parse(monitor.headers) : undefined;
             const body = monitor.body && monitor.method !== "GET" ? monitor.body : undefined;

             // SSL Check
             if (monitor.url.startsWith("https://")) {
                 try {
                     await new Promise<void>((resolve, reject) => {
                         const req = https.request(monitor.url, { method: 'HEAD', agent: new https.Agent({ rejectUnauthorized: true }) }, (res) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const cert = (res.socket as any).getPeerCertificate();
                            if (cert && cert.valid_to) {
                                const validTo = new Date(cert.valid_to);
                                const daysRemaining = Math.floor((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                                if (daysRemaining < 7) {
                                    console.warn(`[SSL WARNING] ${monitor.url} cert expires in ${daysRemaining} days.`);
                                }
                            }
                            resolve();
                         });
                         req.on('error', reject);
                         req.end();
                     });
                 } catch (sslError) {
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     console.error(`[SSL ERROR] ${monitor.url}:`, (sslError as any).message);
                 }
             }

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
    } catch (error) {
        isUp = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorMessage = (error as any).message;
    }

    const responseTime = Date.now() - startTime;
    const newStatus = isUp ? "UP" : "DOWN";

    await prisma.monitorLog.create({
        data: {
            monitorId: monitor.id,
            status: newStatus,
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
