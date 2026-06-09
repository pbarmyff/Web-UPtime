import prisma from "./prisma";

export async function triggerAlerts(monitor: { id: string, name: string }, incident: { id: string }, state: "UP" | "DOWN") {
    const rules = await prisma.alertRule.findMany({
        where: { monitorId: monitor.id }
    });

    // ⚡ Bolt: Execute webhook and email alerts concurrently to avoid O(N) waiting times
    // and significantly speed up dispatch for monitors with multiple alert rules.
    await Promise.all(rules.map(async (rule) => {
        if (rule.type === "EMAIL") {
            // Note: Email implementation should also be non-blocking/async when actually implemented
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
                console.error(`Failed to send webhook to ${rule.target}:`, error);
            }
        }
    }));
}
