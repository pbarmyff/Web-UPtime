import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, AlertTriangle, PlayCircle, PauseCircle } from "lucide-react";

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
    <div className="relative z-10">
      <h1 className="text-3xl font-display font-bold mb-8 text-white">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-brand-surface/60 backdrop-blur-md border-white/5 shadow-xl hover:border-brand-accent/30 transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-brand-muted font-mono uppercase tracking-wider">Total Monitors</CardTitle>
                <Activity className="h-4 w-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold text-white font-display">{monitors.length}</div>
            </CardContent>
        </Card>
        <Card className="bg-brand-surface/60 backdrop-blur-md border-white/5 shadow-xl hover:border-green-400/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <PlayCircle className="h-24 w-24 text-green-400" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-brand-muted font-mono uppercase tracking-wider">Up</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-green-400 font-display">{upCount}</div>
            </CardContent>
        </Card>
        <Card className="bg-brand-surface/60 backdrop-blur-md border-white/5 shadow-xl hover:border-red-400/30 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="h-24 w-24 text-red-400" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-brand-muted font-mono uppercase tracking-wider">Down</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-red-400 font-display">{downCount}</div>
            </CardContent>
        </Card>
        <Card className="bg-brand-surface/60 backdrop-blur-md border-white/5 shadow-xl hover:border-white/20 transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-brand-muted font-mono uppercase tracking-wider">Paused</CardTitle>
                <PauseCircle className="h-4 w-4 text-brand-muted group-hover:text-white transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold text-brand-muted font-display">{pausedCount}</div>
            </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-white">Your Monitors</h2>
        <Button className="bg-brand-accent text-brand-background rounded-none font-semibold hover:bg-brand-accent/90 shadow-[0_0_15px_rgba(79,255,176,0.3)]">
            <Link href="/dashboard/monitors/new">
                <Activity className="w-4 h-4 mr-2" />
                Add Monitor
            </Link>
        </Button>
      </div>

      <div className="bg-brand-surface/60 backdrop-blur-md rounded-none border border-white/5 overflow-x-auto w-full block shadow-xl">
        {monitors.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
                <Activity className="h-12 w-12 text-brand-muted mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white mb-2">No monitors configured</h3>
                <p className="text-brand-muted mb-6 max-w-md">You haven't set up any endpoint monitors yet. Create your first monitor to start tracking uptime.</p>
                <Button variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-background rounded-none">
                     <Link href="/dashboard/monitors/new">Create First Monitor</Link>
                </Button>
            </div>
        ) : (
            <Table className="w-full min-w-[600px] text-left">
                <TableHeader className="bg-black/20 border-b border-white/5 text-sm text-brand-muted">
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="p-4 font-mono uppercase tracking-wider">Name</TableHead>
                        <TableHead className="p-4 font-mono uppercase tracking-wider">Status</TableHead>
                        <TableHead className="p-4 font-mono uppercase tracking-wider">Type</TableHead>
                        <TableHead className="p-4 font-mono uppercase tracking-wider">Interval</TableHead>
                        <TableHead className="p-4 font-mono uppercase tracking-wider text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-white/5">
                    {monitors.map(monitor => (
                        <TableRow key={monitor.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                            <TableCell className="p-4">
                                <Link href={`/dashboard/monitors/${monitor.id}`} className="font-semibold text-white group-hover:text-brand-accent transition-colors flex items-center">
                                    <span className={`w-2 h-2 rounded-full mr-3 ${monitor.status === 'UP' ? 'bg-green-400' : monitor.status === 'DOWN' ? 'bg-red-400 animate-pulse' : 'bg-gray-500'}`}></span>
                                    {monitor.name}
                                </Link>
                                <p className="text-xs text-brand-muted truncate max-w-xs mt-1 ml-5 font-mono">{monitor.url}</p>
                            </TableCell>
                            <TableCell className="p-4">
                                <span className={`inline-flex items-center px-3 py-1 text-xs font-bold font-mono tracking-wider ${
                                    monitor.status === 'UP' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                                    monitor.status === 'DOWN' ? 'bg-red-400/10 text-red-400 border border-red-400/20' :
                                    'bg-white/5 text-brand-muted border border-white/10'
                                }`}>
                                    {monitor.status}
                                </span>
                            </TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted font-medium">{monitor.type}</TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted font-mono">{monitor.interval}s</TableCell>
                            <TableCell className="p-4 text-right text-sm">
                                <Button variant="ghost" className="text-brand-muted hover:text-brand-accent hover:bg-brand-accent/10">
                                    <Link href={`/dashboard/monitors/${monitor.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
      </div>
    </div>
  );
}
