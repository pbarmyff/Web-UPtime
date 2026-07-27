import test from "node:test";
import assert from "node:assert";
import { runChecks } from "./monitoring";
import prisma from "./prisma";

test("runChecks should catch and log errors during check loop", async (t) => {
    const callArgs: unknown[][] = [];
    t.mock.method(console, "error", (...args: unknown[]) => {
        // filter out node warnings
        if (typeof args[0] === 'string' && args[0].includes('MODULE_TYPELESS_PACKAGE_JSON')) return;
        callArgs.push(args);
    });

    const originalFindMany = prisma.monitor.findMany;
    const originalCreateLog = prisma.monitorLog.create;
    try {
        // @ts-expect-error Mocking for test
        prisma.monitor.findMany = async () => {
            return [{
                id: "test-monitor",
                type: "HTTP",
                url: "http://example.com",
                interval: 60,
                status: "UP",
                consecutiveFailures: 0,
                retries: 3
            }];
        };

        // @ts-expect-error Mocking for test
        prisma.monitorLog.create = async () => {
            throw new Error("Simulated database error in checkMonitor");
        };

        await runChecks();

        assert.strictEqual(callArgs.length, 1);
        assert.strictEqual(callArgs[0][0], "Error in check loop:");
        // @ts-expect-error Accessing error message
        assert.strictEqual(callArgs[0][1].message, "Simulated database error in checkMonitor");

    } finally {
        prisma.monitor.findMany = originalFindMany;
        prisma.monitorLog.create = originalCreateLog;
    }
});
