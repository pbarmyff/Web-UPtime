import prisma from "./prisma";
import { triggerAlerts } from "./alerts";

export async function handleMonitorFailure(monitor: { id: string, name: string, status: string }, errorMessage: string | null) {
    const existingIncident = await prisma.incident.findFirst({
        where: {
            monitorId: monitor.id,
            status: "ONGOING"
        }
    });

    if (!existingIncident) {
        const incident = await prisma.incident.create({
            data: {
                monitorId: monitor.id,
                title: `Monitor is DOWN: ${monitor.name}`,
                description: `The monitor check failed. ${errorMessage ? `Error: ${errorMessage}` : ''}`,
                status: "ONGOING"
            }
        });

        await prisma.incidentUpdate.create({
            data: {
                incidentId: incident.id,
                message: "We are currently investigating the issue.",
                status: "INVESTIGATING"
            }
        });

        await triggerAlerts(monitor, incident, "DOWN");
    }
}

export async function handleMonitorRecovery(monitor: { id: string, name: string, status: string }) {
    const existingIncident = await prisma.incident.findFirst({
        where: {
            monitorId: monitor.id,
            status: "ONGOING"
        }
    });

    if (existingIncident) {
        await prisma.incident.update({
            where: { id: existingIncident.id },
            data: {
                status: "RESOLVED",
                resolvedAt: new Date()
            }
        });

        await prisma.incidentUpdate.create({
            data: {
                incidentId: existingIncident.id,
                message: "The issue has been resolved and the service is back online.",
                status: "RESOLVED"
            }
        });

        await triggerAlerts(monitor, existingIncident, "UP");
    }
}
