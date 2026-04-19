import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StatusPageClientForm from "./StatusPageClientForm";

export default async function NewStatusPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const userMonitors = await prisma.monitor.findMany({
        where: { userId: session.user.id },
        select: { id: true, name: true }
    });

    return (
        <StatusPageClientForm monitors={userMonitors} />
    );
}
