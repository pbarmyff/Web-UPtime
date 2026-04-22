"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminMonitorsClient({ initialMonitors }: { initialMonitors: any[] }) {
    const router = useRouter();
    const [monitors, setMonitors] = useState(initialMonitors);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this monitor globally?")) return;

        try {
            const res = await fetch(`/api/admin/monitors/${id}`, { method: "DELETE" });
            if (res.ok) {
                setMonitors(monitors.filter(m => m.id !== id));
                router.refresh();
            } else {
                alert(await res.text() || "Failed to delete monitor");
            }
        } catch (_e) {
            alert("Network error");
        }
    };

    const handleTogglePause = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "PAUSED" ? "UP" : "PAUSED";
        try {
            const res = await fetch(`/api/admin/monitors/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setMonitors(monitors.map(m => m.id === id ? { ...m, status: newStatus } : m));
                router.refresh();
            } else {
                alert(await res.text() || "Failed to update monitor status");
            }
        } catch (_e) {
            alert("Network error");
        }
    };

    return (
        <div className="bg-brand-surface rounded-none border border-brand-muted/30 overflow-x-auto block w-full">
            <Table className="w-full min-w-[600px] text-left">
                <TableHeader className="bg-brand-background border-b border-brand-muted/30 text-sm text-brand-muted">
                    <TableRow>
                        <TableHead className="p-4 font-medium text-brand-muted">Monitor</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Owner</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Status</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Type</TableHead>
                        <TableHead className="p-4 font-medium text-right text-brand-muted">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-700">
                    {monitors.map(monitor => (
                        <TableRow key={monitor.id} className="hover:bg-brand-background/50 border-gray-700">
                            <TableCell className="p-4">
                                <div className="font-medium text-white">{monitor.name}</div>
                                <div className="text-xs text-brand-muted truncate max-w-xs">{monitor.url}</div>
                            </TableCell>
                            <TableCell className="p-4 text-sm text-brand-text">{monitor.user?.email || 'N/A'}</TableCell>
                            <TableCell className="p-4">
                                <Badge variant="outline" className={`rounded-none font-medium ${
                                    monitor.status === 'UP' ? 'bg-green-900/50 text-green-400 border-green-800' :
                                    monitor.status === 'DOWN' ? 'bg-red-900/50 text-red-400 border-red-800' :
                                    'bg-gray-800 text-brand-text border-gray-700'
                                }`}>
                                    {monitor.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="p-4 text-sm text-brand-text">{monitor.type}</TableCell>
                            <TableCell className="p-4 text-right space-x-3">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleTogglePause(monitor.id, monitor.status)}
                                    className="text-brand-accent hover:text-brand-accent/80 text-sm font-medium h-8 px-2"
                                >
                                    {monitor.status === 'PAUSED' ? 'Resume' : 'Pause'}
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => handleDelete(monitor.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30 text-sm font-medium h-8 px-2"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
