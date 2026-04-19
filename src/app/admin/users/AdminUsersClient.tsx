"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-900 border-b border-gray-700 text-sm text-gray-400">
                    <tr>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Monitors</th>
                        <th className="p-4 font-medium">Joined</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-700/50">
                            <td className="p-4 text-sm font-medium text-white">{user.name || 'N/A'}</td>
                            <td className="p-4 text-sm text-gray-300">{user.email}</td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.role === 'ADMIN' ? 'bg-indigo-900 text-indigo-300' : 'bg-gray-700 text-gray-300'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-300">{user._count.monitors}</td>
                            <td className="p-4 text-sm text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                {user.role !== 'ADMIN' && (
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
