// Testing for triggerAlerts is omitted as it heavily depends on external
// webhook endpoints and email services, which falls under background task
// monitoring without direct integration test coverage in this context.
import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // Performance Optimization (Bolt):
    // Previously, alerts were processed sequentially using a for...of loop.
    // By using Promise.all with Array.prototype.map, we process multiple webhook
    // alerts concurrently, significantly reducing total network blocking time
    // when a monitor triggers many rules at once.
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
