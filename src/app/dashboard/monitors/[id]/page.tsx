import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import UptimeChart from "@/components/UptimeChart";

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
          }
      }
  });

  if (!monitor) notFound();

  const chartData = [...monitor.logs].reverse().map(log => ({
      time: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      responseTime: log.responseTime || 0,
      status: log.status
  }));

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{monitor.name}</h1>
                <a href={monitor.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm">{monitor.url}</a>
            </div>
            <div className="flex items-center space-x-4">
                <a href={`/api/export/${monitor.id}`} download className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    Export Data
                </a>
                <div className={`px-4 py-2 rounded-md font-bold ${
                    monitor.status === 'UP' ? 'bg-green-100 text-green-700' :
                    monitor.status === 'DOWN' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                }`}>
                    {monitor.status}
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Response Time</h2>
            {chartData.length > 0 ? (
                <UptimeChart data={chartData} />
            ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                    Not enough data yet.
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Logs</h2>
                <div className="space-y-3">
                    {monitor.logs.slice(0, 10).map(log => (
                        <div key={log.id} className="flex justify-between text-sm border-b pb-2 last:border-0">
                            <span className="text-gray-500">{new Date(log.createdAt).toLocaleString()}</span>
                            <div className="flex space-x-4">
                                <span className={log.status === 'UP' ? 'text-green-600' : 'text-red-600 font-medium'}>
                                    {log.status} {log.statusCode ? `(${log.statusCode})` : ''}
                                </span>
                                <span className="text-gray-600 w-16 text-right">{log.responseTime}ms</span>
                            </div>
                        </div>
                    ))}
                    {monitor.logs.length === 0 && <p className="text-sm text-gray-500">No logs yet.</p>}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Incidents</h2>
                <div className="space-y-4">
                    {monitor.incidents.map(incident => (
                        <div key={incident.id} className="border-l-4 border-red-500 pl-4 py-1">
                            <h3 className="font-medium text-gray-800">{incident.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
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
                    {monitor.incidents.length === 0 && <p className="text-sm text-gray-500">No incidents recorded.</p>}
                </div>
            </div>
        </div>
    </div>
  );
}
