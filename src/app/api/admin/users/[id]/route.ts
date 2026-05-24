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
        if (session.user.id === id) {
            return new NextResponse("Cannot delete yourself", { status: 400 });
        }

        // Performance optimization: Batch primary mutation and audit log into a single transaction
        // Reduces N+1 network roundtrips to the database and ensures atomicity
        await prisma.$transaction([
            prisma.user.delete({ where: { id } }),
            prisma.auditLog.create({
                data: {
                    userId: session.user.id,
                    action: "DELETE_USER",
                    details: JSON.stringify({ targetUserId: id })
                }
            })
        ]);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Failed to delete user", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
