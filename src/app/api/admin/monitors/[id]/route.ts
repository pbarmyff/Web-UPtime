import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Optimization: Use transaction to batch primary entity deletion and audit log creation
        await prisma.$transaction([
            prisma.monitor.delete({ where: { id } }),
            prisma.auditLog.create({
                data: {
                    userId: session.user.id,
                    action: "DELETE_MONITOR",
                    details: JSON.stringify({ targetMonitorId: id })
                }
            })
        ]);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Failed to delete monitor", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        // Optimization: Use transaction to batch primary entity update and audit log creation
        const [monitor] = await prisma.$transaction([
            prisma.monitor.update({
                where: { id },
                data: { status: body.status }
            }),
            prisma.auditLog.create({
                data: {
                    userId: session.user.id,
                    action: "UPDATE_MONITOR_STATUS",
                    details: JSON.stringify({ targetMonitorId: id, status: body.status })
                }
            })
        ]);

        return NextResponse.json(monitor);
    } catch (error) {
        console.error("Failed to update monitor", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
