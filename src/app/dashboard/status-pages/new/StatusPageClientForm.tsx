"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StatusPageClientForm({ monitors }: { monitors: { id: string, name: string }[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        monitors: [] as string[]
    });

    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            setFormData({ ...formData, monitors: [...formData.monitors, id] });
        } else {
            setFormData({ ...formData, monitors: formData.monitors.filter(m => m !== id) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/status-pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/dashboard/status-pages");
                router.refresh();
            } else {
                const text = await res.text();
                setError(text || "Failed to create status page");
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
                <h1 className="text-2xl font-bold text-white">Create Status Page</h1>
                <Link href="/dashboard/status-pages" className="text-brand-muted hover:text-brand-text">Cancel</Link>
            </div>

            <div className="bg-brand-surface p-6 rounded-none  border border-brand-muted/30">
                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-none text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-1">Page Title</label>
                        <input
                            required
                            type="text"
                            className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="My Company Status"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-1">Slug (URL Path)</label>
                        <div className="flex rounded-none ">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-brand-background text-brand-muted sm:text-sm">
                                /status/
                            </span>
                            <input
                                required
                                type="text"
                                pattern="[a-z0-9-]+"
                                title="Only lowercase letters, numbers, and hyphens"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                                placeholder="my-company"
                                value={formData.slug}
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-1">Description (Optional)</label>
                        <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded-none p-2 focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="Current status of our services"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Select Monitors to Include</label>
                        <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-none p-3">
                            {monitors.map(monitor => (
                                <div key={monitor.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={monitor.id}
                                        className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded"
                                        checked={formData.monitors.includes(monitor.id)}
                                        onChange={(e) => handleCheckboxChange(monitor.id, e.target.checked)}
                                    />
                                    <label htmlFor={monitor.id} className="ml-2 block text-sm text-white">
                                        {monitor.name}
                                    </label>
                                </div>
                            ))}
                            {monitors.length === 0 && <p className="text-sm text-brand-muted">No monitors available.</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || formData.monitors.length === 0}
                            className="bg-brand-accent text-white px-6 py-2 rounded-none font-medium hover:bg-brand-surface disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Status Page'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
