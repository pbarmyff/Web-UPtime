import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleMonitorRecovery } from "@/lib/incidents";

import { publicApiRateLimiter } from "@/lib/rateLimit";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || req.headers.get("x-real-ip") || "unknown";
    if (!publicApiRateLimiter.check(ip).success) return new NextResponse("Too many requests", { status: 429 });

    const { id } = await params;
    return handleHeartbeat(id);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || req.headers.get("x-real-ip") || "unknown";
    if (!publicApiRateLimiter.check(ip).success) return new NextResponse("Too many requests", { status: 429 });

    const { id } = await params;
    return handleHeartbeat(id);
}

async function handleHeartbeat(monitorId: string) {
    try {
        const monitor = await prisma.monitor.findUnique({
            where: { id: monitorId }
        });

        if (!monitor || monitor.type !== "HEARTBEAT") {
            return NextResponse.json({ error: "Invalid monitor" }, { status: 400 });
        }

        const nextRunAt = new Date(Date.now() + (monitor.interval * 1000) + (monitor.timeout));

        await prisma.monitor.update({
            where: { id: monitor.id },
            data: {
                status: "UP",
                lastChecked: new Date(),
                nextRunAt
            }
        });

        await prisma.monitorLog.create({
            data: {
                monitorId: monitor.id,
                status: "UP",
                statusCode: 200,
                responseTime: 0,
            }
        });

        if (monitor.status === "DOWN") {
            await handleMonitorRecovery(monitor);
        }

        return NextResponse.json({ success: true, message: "Heartbeat received" });
    } catch (error) {
        console.error("Heartbeat error", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
