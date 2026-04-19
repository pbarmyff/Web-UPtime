import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const userCount = await prisma.user.count();
  const monitorCount = await prisma.monitor.count();
  const incidentCount = await prisma.incident.count();

  const recentAuditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { user: { select: { name: true, email: true } } }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">System Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
            <h3 className="text-brand-muted text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-white mt-2">{userCount}</p>
        </div>
        <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
            <h3 className="text-brand-muted text-sm font-medium">Total Monitors</h3>
            <p className="text-3xl font-bold text-white mt-2">{monitorCount}</p>
        </div>
        <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
            <h3 className="text-brand-muted text-sm font-medium">Total Incidents</h3>
            <p className="text-3xl font-bold text-white mt-2">{incidentCount}</p>
        </div>
      </div>

      <div className="bg-brand-surface rounded-none  border border-brand-muted/30 overflow-x-auto block w-full">
        <div className="p-4 border-b border-brand-muted/30 min-w-[600px]">
            <h2 className="text-lg font-semibold text-white">Recent Audit Logs</h2>
        </div>
        <table className="w-full min-w-[600px] text-left">
            <thead className="bg-brand-background border-b border-brand-muted/30 text-sm text-brand-muted">
                <tr>
                    <th className="p-4 font-medium">Timestamp</th>
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Action</th>
                    <th className="p-4 font-medium">IP Address</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {recentAuditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-brand-background/50">
                        <td className="p-4 text-sm text-brand-text">{new Date(log.createdAt).toLocaleString()}</td>
                        <td className="p-4 text-sm text-brand-text">{log.user?.email || 'System'}</td>
                        <td className="p-4 text-sm text-brand-text">{log.action}</td>
                        <td className="p-4 text-sm text-brand-muted">{log.ipAddress || 'N/A'}</td>
                    </tr>
                ))}
                {recentAuditLogs.length === 0 && (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">No recent audit logs.</td></tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
