import prisma from "@/lib/prisma";
import AdminMonitorsClient from "./AdminMonitorsClient";

export default async function AdminMonitorsPage() {
  const monitors = await prisma.monitor.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
          user: { select: { email: true } }
      }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">All Monitors</h1>
      <AdminMonitorsClient initialMonitors={monitors} />
    </div>
  );
}
