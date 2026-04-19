import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ monitorId: string }> }) {
    const { monitorId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const monitor = await prisma.monitor.findFirst({
        where: { id: monitorId, userId: session.user.id },
        include: { logs: { orderBy: { createdAt: 'desc' } } }
    });

    if (!monitor) return new NextResponse("Not Found", { status: 404 });

    const csvHeader = "Timestamp,Status,StatusCode,ResponseTimeMs,ErrorMessage\n";
    const csvRows = monitor.logs.map(log =>
        `"${log.createdAt.toISOString()}","${log.status}",${log.statusCode || ""},${log.responseTime || ""},"${log.errorMessage || ""}"`
    ).join("\n");

    return new NextResponse(csvHeader + csvRows, {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="monitor-${monitor.id}-logs.csv"`
        }
    });
}
