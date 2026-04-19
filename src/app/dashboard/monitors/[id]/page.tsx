import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import UptimeChart from "@/components/UptimeChart";
import AlertRulesManager from "./AlertRulesManager";

export default async function MonitorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const monitor = await prisma.monitor.findFirst({
      where: {
          id: id,
          userId: session.user.id
      },
      include: {
          logs: {
              orderBy: { createdAt: 'desc' },
              take: 50
          },
          incidents: {
              orderBy: { createdAt: 'desc' },
              take: 5
          },
          maintenanceWindows: {
              orderBy: { startTime: 'asc' },
              where: { endTime: { gte: new Date() } }
          },
          alertRules: true
      }
  });

  if (!monitor) notFound();

  const chartData = [...monitor.logs].reverse().map(log => ({
      time: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      responseTime: log.responseTime || 0,
      status: log.status
  }));

  const isRetrying = monitor.status === "UP" && monitor.consecutiveFailures > 0;

  return (
    <div className="space-y-6">
        {monitor.sslExpiryDays !== null && monitor.sslExpiryDays < 14 && (
            <div className={`p-4 rounded-none text-sm font-medium ${monitor.sslExpiryDays < 3 ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
                ⚠️ SSL Certificate expires in {monitor.sslExpiryDays} days!
            </div>
        )}

        <div className="flex justify-between items-center bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
            <div>
                <h1 className="text-2xl font-bold text-white">{monitor.name}</h1>
                <a href={monitor.url} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline text-sm">{monitor.url}</a>
            </div>
            <div className="flex items-center space-x-4">
                <a href={`/api/export/${monitor.id}`} download className="px-3 py-1.5 text-sm font-medium text-brand-text bg-brand-background rounded-none hover:bg-gray-200">
                    Export Data
                </a>
                <div className={`px-4 py-2 rounded-none font-bold ${
                    isRetrying ? 'bg-yellow-100 text-yellow-700' :
                    monitor.status === 'UP' ? 'bg-green-100 text-green-700' :
                    monitor.status === 'DOWN' ? 'bg-red-100 text-red-700' :
                    'bg-brand-background text-brand-text'
                }`}>
                    {isRetrying ? `RETRYING (${monitor.consecutiveFailures}/${monitor.retries})` : monitor.status}
                </div>
            </div>
        </div>

        <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
            <h2 className="text-lg font-semibold text-white mb-4">Response Time</h2>
            {chartData.length > 0 ? (
                <UptimeChart data={chartData} />
            ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                    Not enough data yet.
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30 lg:col-span-2">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Logs</h2>
                <div className="space-y-3">
                    {monitor.logs.slice(0, 10).map(log => (
                        <div key={log.id} className="flex justify-between text-sm border-b pb-2 last:border-0">
                            <span className="text-brand-muted">{new Date(log.createdAt).toLocaleString()}</span>
                            <div className="flex space-x-4">
                                <span className={log.status === 'UP' ? 'text-green-600' : 'text-red-600 font-medium'}>
                                    {log.status} {log.statusCode ? `(${log.statusCode})` : ''}
                                </span>
                                <span className="text-brand-muted w-16 text-right">{log.responseTime}ms</span>
                            </div>
                        </div>
                    ))}
                    {monitor.logs.length === 0 && <p className="text-sm text-brand-muted">No logs yet.</p>}
                </div>
            </div>

            <div className="space-y-6">
              <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
                  <h2 className="text-lg font-semibold text-white mb-4">Recent Incidents</h2>
                  <div className="space-y-4">
                    {monitor.incidents.map(incident => (
                        <div key={incident.id} className="border-l-4 border-red-500 pl-4 py-1">
                            <h3 className="font-medium text-white">{incident.title}</h3>
                            <p className="text-xs text-brand-muted mt-1">
                                Started: {new Date(incident.startedAt).toLocaleString()}
                                {incident.resolvedAt && ` • Resolved: ${new Date(incident.resolvedAt).toLocaleString()}`}
                            </p>
                            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                                incident.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {incident.status}
                            </span>
                        </div>
                    ))}
                      {monitor.incidents.length === 0 && <p className="text-sm text-brand-muted">No incidents recorded.</p>}
                  </div>
              </div>

              <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
                  <h2 className="text-lg font-semibold text-white mb-4">Alert Rules</h2>
                  <AlertRulesManager monitorId={monitor.id} rules={monitor.alertRules} />
              </div>

              <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
                  <h2 className="text-lg font-semibold text-white mb-4">Upcoming Maintenance</h2>
                  <div className="space-y-4">
                      {monitor.maintenanceWindows.map(window => (
                          <div key={window.id} className="border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-50 rounded-r-md">
                              <h3 className="font-medium text-yellow-800">{window.title}</h3>
                              <p className="text-xs text-yellow-600 mt-1">
                                  {new Date(window.startTime).toLocaleString()} - {new Date(window.endTime).toLocaleString()}
                              </p>
                          </div>
                      ))}
                      {monitor.maintenanceWindows.length === 0 && <p className="text-sm text-brand-muted">No scheduled maintenance.</p>}
                  </div>
              </div>
            </div>
        </div>
    </div>
  );
}
