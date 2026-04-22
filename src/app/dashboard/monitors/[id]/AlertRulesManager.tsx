"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRule(rule.id)}
                            className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-950/30"
                            aria-label="Delete rule"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
                {rules.length === 0 && <p className="text-sm text-brand-muted italic">No alert rules configured.</p>}
            </div>

            <form onSubmit={handleAdd} className="mt-4 pt-4 border-t border-brand-muted/30">
                <h4 className="text-sm font-medium text-brand-text mb-3">Add New Rule</h4>
                {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
                <div className="flex flex-col space-y-3">
                    <Select value={type} onValueChange={(val) => val && setType(val)}>
                        <SelectTrigger className="w-full text-sm border-gray-800 rounded-none bg-brand-background text-brand-text">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-surface border-gray-800 rounded-none text-brand-text">
                            <SelectItem value="EMAIL">Email</SelectItem>
                            <SelectItem value="WEBHOOK">Webhook</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        type={type === 'EMAIL' ? 'email' : 'url'}
                        required
                        placeholder={type === 'EMAIL' ? 'alert@example.com' : 'https://hooks.slack.com/...'}
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="text-sm border-gray-800 bg-brand-background text-brand-text rounded-none focus:ring-brand-accent focus:border-brand-accent"
                    />
                    <Button
                        type="submit"
                        disabled={loading || !target}
                        className="w-full bg-brand-accent text-brand-background rounded-none text-sm font-medium hover:bg-brand-accent/90 disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Rule'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
