"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlertRulesManager({ monitorId, rules }: { monitorId: string, rules: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("EMAIL");
    const [target, setTarget] = useState("");
    const [error, setError] = useState("");

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/monitors/${monitorId}/alerts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, target })
            });

            if (res.ok) {
                setTarget("");
                router.refresh();
            } else {
                setError(await res.text() || "Failed to add alert rule");
            }
        } catch (_err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    const deleteRule = async (alertId: string) => {
        if (!confirm("Remove this alert rule?")) return;
        try {
            const res = await fetch(`/api/monitors/${monitorId}/alerts/${alertId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete alert rule");
            }
        } catch (_err) {
            alert("Network error");
        }
    };

    return (
        <div>
            <div className="space-y-3 mb-4">
                {rules.map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-3 bg-brand-surface border border-brand-muted/30 rounded-none">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">{rule.type}</p>
                            <p className="text-xs text-brand-accent truncate">{rule.target}</p>
                        </div>
                        <button
                            onClick={() => deleteRule(rule.id)}
                            className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                            aria-label="Delete rule"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {rules.length === 0 && <p className="text-sm text-brand-muted italic">No alert rules configured.</p>}
            </div>

            <form onSubmit={handleAdd} className="mt-4 pt-4 border-t border-brand-muted/30">
                <h4 className="text-sm font-medium text-brand-text mb-3">Add New Rule</h4>
                {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
                <div className="flex flex-col space-y-3">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="text-sm border border-gray-300 rounded-none p-2"
                    >
                        <option value="EMAIL">Email</option>
                        <option value="WEBHOOK">Webhook</option>
                    </select>
                    <input
                        type={type === 'EMAIL' ? 'email' : 'url'}
                        required
                        placeholder={type === 'EMAIL' ? 'alert@example.com' : 'https://hooks.slack.com/...'}
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="text-sm border border-gray-300 rounded-none p-2"
                    />
                    <button
                        type="submit"
                        disabled={loading || !target}
                        className="w-full bg-brand-accent text-white px-3 py-2 rounded-none text-sm font-medium hover:bg-brand-surface disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Rule'}
                    </button>
                </div>
            </form>
        </div>
    );
}
