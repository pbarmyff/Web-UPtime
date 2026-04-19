import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
      return null;
  }

  const monitors = await prisma.monitor.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
  });

  const upCount = monitors.filter(m => m.status === 'UP').length;
  const downCount = monitors.filter(m => m.status === 'DOWN').length;
  const pausedCount = monitors.filter(m => m.status === 'PAUSED').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Monitors</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{monitors.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-gray-500 text-sm font-medium">Up</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{upCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
            <h3 className="text-gray-500 text-sm font-medium">Down</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{downCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Paused</h3>
            <p className="text-3xl font-bold text-gray-400 mt-2">{pausedCount}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Monitors</h2>
        <Link href="/dashboard/monitors/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
            Add Monitor
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {monitors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
                No monitors yet. Create one to get started.
            </div>
        ) : (
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                    <tr>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Interval</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {monitors.map(monitor => (
                        <tr key={monitor.id} className="hover:bg-gray-50">
                            <td className="p-4">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="font-medium text-indigo-600 hover:text-indigo-800">
                                    {monitor.name}
                                </Link>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{monitor.url}</p>
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    monitor.status === 'UP' ? 'bg-green-100 text-green-800' :
                                    monitor.status === 'DOWN' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {monitor.status}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{monitor.type}</td>
                            <td className="p-4 text-sm text-gray-600">{monitor.interval}s</td>
                            <td className="p-4 text-right text-sm">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="text-gray-400 hover:text-gray-600">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}
