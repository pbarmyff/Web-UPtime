import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string, alertId: string }> }) {
    const { id, alertId } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const monitor = await prisma.monitor.findUnique({ where: { id } });
        if (!monitor || monitor.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        await prisma.alertRule.deleteMany({
            where: { id: alertId, monitorId: id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Failed to delete alert rule", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
