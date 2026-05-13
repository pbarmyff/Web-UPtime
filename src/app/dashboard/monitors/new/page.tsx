"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewMonitorPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        type: "HTTP",
        interval: 60,
        expectedStatus: 200,
        expectedKeyword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/monitors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                const text = await res.text();
                setError(text || "Failed to create monitor");
            }
        } catch (_err) {
            setError("Network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Create Monitor</h1>
                <Link href="/dashboard" className="text-brand-muted hover:text-brand-text">Cancel</Link>
            </div>

            <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-none text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-1">Friendly Name</label>
                        <input
                            required
                            type="text"
                            className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="My Website"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-1">URL (or IP)</label>
                        <input
                            required
                            type="url"
                            className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="https://example.com"
                            value={formData.url}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                        />
                    </div>

                    {/* Responsive fix: Stack form fields on mobile, two columns on tablet/desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-1">Monitor Type</label>
                            <select
                                className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="HTTP">HTTP(s)</option>
                                <option value="PING">Ping</option>
                                <option value="HEARTBEAT">Heartbeat</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-1">Check Interval (seconds)</label>
                            <select
                                className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                                value={formData.interval}
                                onChange={(e) => setFormData({...formData, interval: parseInt(e.target.value)})}
                            >
                                <option value="30">30 seconds</option>
                                <option value="60">1 minute</option>
                                <option value="300">5 minutes</option>
                                <option value="600">10 minutes</option>
                            </select>
                        </div>
                    </div>

                    {/* Responsive fix: Stack form fields on mobile, two columns on tablet/desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-1">Expected Status Code</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                                placeholder="200"
                                value={formData.expectedStatus}
                                onChange={(e) => setFormData({...formData, expectedStatus: parseInt(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-1">Expected Keyword (Optional)</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                                placeholder="e.g. Welcome"
                                value={formData.expectedKeyword}
                                onChange={(e) => setFormData({...formData, expectedKeyword: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-brand-accent text-white px-6 py-2 rounded-none font-medium hover:bg-brand-surface disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Monitor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
