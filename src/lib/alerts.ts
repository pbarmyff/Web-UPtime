import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // Dispatch alerts concurrently to avoid O(N) wait times
    await Promise.all(rules.map(async (rule) => {
        try {
            if (rule.type === "EMAIL") {
                console.log(`[ALERT - EMAIL] Sending to ${rule.target} | Monitor: ${monitor.name} is ${state}`);
            } else if (rule.type === "WEBHOOK") {
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
            }
        } catch (error) {
            console.error(`Failed to process ${rule.type} alert for ${rule.target}:`, error);
        }
    }));
}
