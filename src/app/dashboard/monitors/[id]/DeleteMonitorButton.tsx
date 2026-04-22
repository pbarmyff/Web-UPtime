"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteMonitorButton({ monitorId }: { monitorId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this monitor? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/monitors/${monitorId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.push("/dashboard/monitors");
                router.refresh();
            } else {
                alert(await res.text() || "Failed to delete monitor");
                setIsDeleting(false);
            }
        } catch (error) {
            alert("Network error occurred while deleting monitor.");
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:w-auto rounded-none flex items-center gap-2"
        >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete Monitor"}
        </Button>
    );
}
