import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
        <Link href="/dashboard/monitors/new">
            <Button className="bg-brand-accent text-brand-background hover:bg-brand-accent/90">
                Add Monitor
            </Button>
        </Link>
      </div>

      <div className="bg-brand-surface border border-brand-muted/30 overflow-x-auto w-full block rounded-md">
        {monitors.length === 0 ? (
            <div className="p-8 text-center text-brand-muted">
                No monitors yet. Create one to get started.
            </div>
        ) : (
            <Table className="min-w-[600px]">
                <TableHeader className="bg-brand-background">
                    <TableRow className="border-brand-muted/30 hover:bg-transparent">
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Type</TableHead>
                        <TableHead className="font-medium">Interval</TableHead>
                        <TableHead className="text-right font-medium">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border-brand-muted/30">
                    {monitors.map(monitor => {
                        const isRetrying = monitor.status === "UP" && monitor.consecutiveFailures > 0 && monitor.consecutiveFailures < monitor.retries;
                        return (
                        <TableRow key={monitor.id} className="border-brand-muted/30 hover:bg-brand-background/50 transition-colors">
                            <TableCell className="p-4">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="font-medium text-brand-accent hover:text-brand-text">
                                    {monitor.name}
                                </Link>
                                <p className="text-xs text-brand-muted truncate max-w-[200px]">{monitor.url}</p>
                            </TableCell>
                            <TableCell className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    isRetrying ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                    monitor.status === 'UP' ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' :
                                    monitor.status === 'DOWN' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                    'bg-brand-background text-white border border-brand-muted/30'
                                }`}>
                                    {isRetrying ? `RETRYING` : monitor.status}
                                </span>
                            </TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted">{monitor.type}</TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted">{monitor.interval}s</TableCell>
                            <TableCell className="p-4 text-right text-sm">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="text-brand-muted hover:text-brand-text transition-colors">
                                    View
                                </Link>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )}
      </div>
    </div>
  );
}
