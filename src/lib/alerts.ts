import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // ⚡ Bolt: Dispatch network operations concurrently via Promise.all to prevent O(N) wait times for notifications.
    // Each alert is wrapped in its own try/catch to ensure individual failures don't short-circuit the batch execution.
    await Promise.all(
        rules.map(async (rule) => {
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
                console.error(`Failed to execute alert rule for ${rule.target}:`, error);
            }
        })
    );
}
