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
                <div className={`p-4 rounded-none text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {message.text}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-brand-text mb-1">Email</label>
                <input
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full border border-gray-200 bg-brand-background rounded-none p-2 text-brand-muted cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-brand-text mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <hr className="border-gray-200" />
            <h3 className="text-lg font-medium text-white">Change Password</h3>

            <div>
                <label className="block text-sm font-medium text-brand-text mb-1">Current Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-brand-text mb-1">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-accent text-white px-6 py-2 rounded-none font-medium hover:bg-brand-surface disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Settings"}
                </button>
            </div>
        </form>
    );
}
