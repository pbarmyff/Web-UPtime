import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // Performance optimization: Process all alert rules concurrently instead of sequentially
    // to prevent O(N) wait times during network operations.
    await Promise.all(rules.map(async (rule) => {
        if (rule.type === "EMAIL") {
            console.log(`[ALERT - EMAIL] Sending to ${rule.target} | Monitor: ${monitor.name} is ${state}`);
        } else if (rule.type === "WEBHOOK") {
            try {
                const payload = {
                    monitorId: monitor.id,
                    monitorName: monitor.name,
                    incidentId: incident.id,
                    state,
                    timestamp: new Date().toISOString()
                };

                await fetch(rule.target, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                console.log(`[ALERT - WEBHOOK] Sent to ${rule.target} | Monitor: ${monitor.name} is ${state}`);
            } catch (error) {
                // Individual error handling ensures one failed webhook doesn't break others
                console.error(`Failed to send webhook to ${rule.target}:`, error);
            }
        }
    }));
}
