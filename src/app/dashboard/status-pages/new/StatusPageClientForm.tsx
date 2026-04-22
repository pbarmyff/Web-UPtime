"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
                    <div className="space-y-1">
                        <Label>Page Title</Label>
                        <Input
                            required
                            type="text"
                            placeholder="My Company Status"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-brand-surface border-brand-muted/30 focus-visible:ring-brand-accent"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Slug (URL Path)</Label>
                        <div className="flex rounded-none">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-brand-muted/30 bg-brand-background text-brand-muted sm:text-sm">
                                /status/
                            </span>
                            <Input
                                required
                                type="text"
                                pattern="[a-z0-9-]+"
                                title="Only lowercase letters, numbers, and hyphens"
                                placeholder="my-company"
                                value={formData.slug}
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                className="rounded-l-none bg-brand-surface border-brand-muted/30 focus-visible:ring-brand-accent"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Description (Optional)</Label>
                        <textarea
                            rows={3}
                            className="flex w-full rounded-md border border-brand-muted/30 bg-brand-surface px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Current status of our services"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Select Monitors to Include</Label>
                        <div className="space-y-2 max-h-60 overflow-y-auto border border-brand-muted/30 rounded-md p-3 bg-brand-surface">
                            {monitors.map(monitor => (
                                <div key={monitor.id} className="flex items-center space-x-2">
                                    <Input
                                        type="checkbox"
                                        id={monitor.id}
                                        className="h-4 w-4 shrink-0 text-brand-accent focus:ring-brand-accent border-brand-muted/30 rounded"
                                        checked={formData.monitors.includes(monitor.id)}
                                        onChange={(e) => handleCheckboxChange(monitor.id, e.target.checked)}
                                    />
                                    <Label htmlFor={monitor.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                                        {monitor.name}
                                    </Label>
                                </div>
                            ))}
                            {monitors.length === 0 && <p className="text-sm text-brand-muted">No monitors available.</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-6 text-sm font-semibold text-brand-background hover:bg-brand-accent/90 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-background transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Status Page'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
