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
export default function AdminUsersClient({ initialUsers }: { initialUsers: any[] }) {
    const router = useRouter();
    const [users, setUsers] = useState(initialUsers);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user and all their data?")) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
                router.refresh();
            } else {
                alert(await res.text() || "Failed to delete user");
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
                        <TableHead className="p-4 font-medium text-brand-muted">Name</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Email</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Role</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Monitors</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Joined</TableHead>
                        <TableHead className="p-4 font-medium text-right text-brand-muted">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-700">
                    {users.map(user => (
                        <TableRow key={user.id} className="hover:bg-brand-background/50 border-gray-700">
                            <TableCell className="p-4 text-sm font-medium text-white">{user.name || 'N/A'}</TableCell>
                            <TableCell className="p-4 text-sm text-brand-text">{user.email}</TableCell>
                            <TableCell className="p-4">
                                <Badge variant="outline" className={`rounded-none font-medium ${
                                    user.role === 'ADMIN' ? 'bg-brand-accent/10 text-brand-accent border-brand-accent/20' : 'bg-gray-800 text-brand-text border-gray-700'
                                }`}>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell className="p-4 text-sm text-brand-text">{user._count.monitors}</TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="p-4 text-right">
                                {user.role !== 'ADMIN' && (
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-950/30 text-sm font-medium h-8 px-2"
                                    >
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
