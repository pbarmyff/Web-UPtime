"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="bg-brand-surface rounded-none  border border-brand-muted/30 overflow-x-auto block w-full">
            <table className="w-full min-w-[600px] text-left">
                <thead className="bg-brand-background border-b border-brand-muted/30 text-sm text-brand-muted">
                    <tr>
                        <th className="p-4 font-medium">Monitor</th>
                        <th className="p-4 font-medium">Owner</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {monitors.map(monitor => (
                        <tr key={monitor.id} className="hover:bg-brand-background/50">
                            <td className="p-4">
                                <div className="font-medium text-white">{monitor.name}</div>
                                <div className="text-xs text-brand-muted truncate max-w-xs">{monitor.url}</div>
                            </td>
                            <td className="p-4 text-sm text-brand-text">{monitor.user?.email || 'N/A'}</td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium ${
                                    monitor.status === 'UP' ? 'bg-green-900 text-green-300' :
                                    monitor.status === 'DOWN' ? 'bg-red-900 text-red-300' :
                                    'bg-gray-700 text-brand-text'
                                }`}>
                                    {monitor.status}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-brand-text">{monitor.type}</td>
                            <td className="p-4 text-right space-x-3">
                                <button
                                    onClick={() => handleTogglePause(monitor.id, monitor.status)}
                                    className="text-brand-accent hover:text-brand-accent text-sm font-medium"
                                >
                                    {monitor.status === 'PAUSED' ? 'Resume' : 'Pause'}
                                </button>
                                <button
                                    onClick={() => handleDelete(monitor.id)}
                                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
