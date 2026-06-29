import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    await Promise.all(rules.map(async (rule) => {
        try {
            if (rule.type === "EMAIL") {
                // ⚡ Bolt: Email sending is synchronous here but could be async in future. Wrapped in Promise.all for concurrent processing.
                console.log(`[ALERT - EMAIL] Sending to ${rule.target} | Monitor: ${monitor.name} is ${state}`);
            } else if (rule.type === "WEBHOOK") {
                const payload = {
                    monitorId: monitor.id,
                    monitorName: monitor.name,
                    incidentId: incident.id,
                    state,
                    timestamp: new Date().toISOString()
                };

                // ⚡ Bolt: Webhooks now execute concurrently instead of sequentially, removing O(N) wait times
                await fetch(rule.target, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                console.log(`[ALERT - WEBHOOK] Sent to ${rule.target} | Monitor: ${monitor.name} is ${state}`);
            }
        } catch (error) {
            // Ensure failure in one alert doesn't prevent logging or break the Promise.all array
            console.error(`Failed to send ${rule.type} alert to ${rule.target}:`, error);
        }
    }));
}
