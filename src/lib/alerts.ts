import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // Performance Optimization (Bolt):
    // Replaced sequential for...of loop with concurrent Promise.all execution.
    // Why: Dispatches multiple webhooks in parallel instead of waiting sequentially.
    // Impact: Reduces total network I/O wait time from O(N) to O(1) in terms of number of webhooks.
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
            console.error(`Failed to send ${rule.type} alert to ${rule.target}:`, error);
        }
    }));
}
