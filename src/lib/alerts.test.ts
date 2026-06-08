import test from "node:test";
import assert from "node:assert";
import { triggerAlerts } from "./alerts";
import prisma from "./prisma";

test("triggerAlerts dispatches webhooks concurrently", async (t) => {
    const rules = [
        { type: "WEBHOOK", target: "https://example.com/1" },
        { type: "WEBHOOK", target: "https://example.com/2" },
        { type: "WEBHOOK", target: "https://example.com/3" }
    ];

    t.mock.method(prisma.alertRule, "findMany", async () => rules);

    const monitor = { id: "test-monitor-1", name: "Test Monitor" };
    const incident = { id: "test-incident-1" };

    let concurrentRequests = 0;
    let maxConcurrentRequests = 0;

    t.mock.method(global, "fetch", async () => {
        concurrentRequests++;
        if (concurrentRequests > maxConcurrentRequests) {
            maxConcurrentRequests = concurrentRequests;
        }

        // Add a small delay to ensure requests overlap if concurrent
        await new Promise(resolve => setTimeout(resolve, 50));

        concurrentRequests--;
        return { ok: true };
    });

    await triggerAlerts(monitor, incident, "DOWN");

    // If executed sequentially, maxConcurrentRequests would be 1.
    // If executed concurrently, maxConcurrentRequests should be equal to the number of rules (3).
    assert.strictEqual(maxConcurrentRequests, 3, "Webhooks should be dispatched concurrently");
});
