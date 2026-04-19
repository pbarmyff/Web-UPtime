"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SettingsForm({ user }: { user: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [name, setName] = useState(user.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        if (newPassword && !currentPassword) {
            setMessage({ text: "Current password is required to set a new password.", type: "error" });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/user/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, currentPassword, newPassword })
            });

            if (res.ok) {
                setMessage({ text: "Settings updated successfully.", type: "success" });
                setCurrentPassword("");
                setNewPassword("");
                router.refresh();
            } else {
                setMessage({ text: await res.text() || "Failed to update settings.", type: "error" });
            }
        } catch (_err) {
            setMessage({ text: "Network error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            {message.text && (
                <div className={`p-4 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {message.text}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded-md p-2 text-gray-500 cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <hr className="border-gray-200" />
            <h3 className="text-lg font-medium text-gray-800">Change Password</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Settings"}
                </button>
            </div>
        </form>
    );
}
