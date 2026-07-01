import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MonitorsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
      return null;
  }

  const monitors = await prisma.monitor.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Monitors</h1>
        <Link href="/dashboard/monitors/new" className="bg-brand-accent text-white px-4 py-2 rounded-none text-sm font-medium hover:bg-brand-surface">
            Add Monitor
        </Link>
      </div>

      <div className="bg-brand-surface rounded-none border border-brand-muted/30 overflow-x-auto w-full block">
        {monitors.length === 0 ? (
            <div className="p-8 text-center text-brand-muted">
                No monitors yet. Create one to get started.
            </div>
        ) : (
            <table className="w-full min-w-[600px] text-left">
                <thead className="bg-brand-background border-b border-brand-muted/30 text-sm text-brand-muted">
                    <tr>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Interval</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/10">
                    {monitors.map(monitor => (
                        <tr key={monitor.id} className="hover:bg-brand-background">
                            <td className="p-4">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="font-medium text-brand-accent hover:text-brand-text">
                                    {monitor.name}
                                </Link>
                                {/* Responsive fix: prevent premature truncation on larger screens */}
                                <p className="text-xs text-brand-muted truncate max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg">{monitor.url}</p>
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium ${
                                    monitor.status === 'UP' ? 'bg-green-100 text-green-800' :
                                    monitor.status === 'DOWN' ? 'bg-red-100 text-red-800' :
                                    'bg-brand-background text-white'
                                }`}>
                                    {monitor.status}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-brand-muted">{monitor.type}</td>
                            <td className="p-4 text-sm text-brand-muted">{monitor.interval}s</td>
                            <td className="p-4 text-right text-sm">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="text-gray-400 hover:text-brand-muted">
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
