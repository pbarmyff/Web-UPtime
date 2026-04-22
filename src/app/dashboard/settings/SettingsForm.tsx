"use client";
import { Save } from "lucide-react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

            <div className="space-y-1">
                <Label htmlFor="email" className="text-brand-text">Email</Label>
                <Input
                    id="email"
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full border-gray-200 bg-brand-background rounded-none p-2 text-brand-muted cursor-not-allowed"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="name" className="text-brand-text">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <Separator className="bg-gray-800" />
            <h3 className="text-lg font-medium text-white">Change Password</h3>

            <div className="space-y-1">
                <Label htmlFor="currentPassword" className="text-brand-text">Current Password</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="newPassword" className="text-brand-text">New Password</Label>
                <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div className="pt-4">
                <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-6 text-sm font-semibold text-brand-background hover:bg-brand-accent/90 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-background transition-colors disabled:opacity-70 disabled:cursor-not-allowed ml-auto"
              >
                {loading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
        </form>
    );
}
