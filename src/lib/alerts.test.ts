import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { triggerAlerts } from './alerts';
import prisma from './prisma';
import { AlertRule } from '@prisma/client';

describe('triggerAlerts', () => {
    let originalConsoleLog: typeof console.log;
    let originalConsoleError: typeof console.error;
    let originalFindMany: typeof prisma.alertRule.findMany;

    beforeEach(() => {
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        originalFindMany = prisma.alertRule.findMany;
        console.log = () => {};
        console.error = () => {};
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        prisma.alertRule.findMany = originalFindMany;
    });

    test('should process rules correctly - EMAIL', async () => {
        prisma.alertRule.findMany = async () => {
            return [{ type: 'EMAIL', target: 'test@example.com' } as unknown as AlertRule];
        };

        let logged = false;
        console.log = (msg: string) => {
            if (msg.includes('[ALERT - EMAIL] Sending to test@example.com')) {
                logged = true;
            }
        };

        await triggerAlerts({ id: 'm1', name: 'Test Monitor' }, { id: 'i1' }, 'DOWN');
        assert.strictEqual(logged, true, 'Should log email alert');
    });

    test('should process rules correctly - WEBHOOK success', async (t) => {
        prisma.alertRule.findMany = async () => {
            return [{ type: 'WEBHOOK', target: 'http://webhook.test' } as unknown as AlertRule];
        };

        t.mock.method(global, 'fetch', async () => ({ ok: true }));

        await triggerAlerts({ id: 'm1', name: 'Test Monitor' }, { id: 'i1' }, 'DOWN');

        // @ts-expect-error - we know fetch is mocked
        const fetchCalls = global.fetch.mock.calls;
        assert.strictEqual(fetchCalls.length, 1, 'Should call fetch once');
        assert.strictEqual(fetchCalls[0].arguments[0], 'http://webhook.test', 'Should call correct URL');

        const fetchOpts = fetchCalls[0].arguments[1];
        assert.strictEqual(fetchOpts.method, 'POST');
        assert.deepStrictEqual(fetchOpts.headers, { "Content-Type": "application/json" });

        const body = JSON.parse(fetchOpts.body);
        assert.strictEqual(body.monitorId, 'm1');
        assert.strictEqual(body.monitorName, 'Test Monitor');
        assert.strictEqual(body.incidentId, 'i1');
        assert.strictEqual(body.state, 'DOWN');
        assert.ok(body.timestamp);
    });

    test('should process rules correctly - WEBHOOK failure', async (t) => {
        prisma.alertRule.findMany = async () => {
            return [{ type: 'WEBHOOK', target: 'http://webhook.fail' } as unknown as AlertRule];
        };

        t.mock.method(global, 'fetch', async () => {
            throw new Error('Network error');
        });

        let errored = false;
        console.error = (msg: string, err: Error) => {
            if (msg.includes('Failed to send webhook to http://webhook.fail') && err.message === 'Network error') {
                errored = true;
            }
        };

        // Should not throw, should catch error and log
        await triggerAlerts({ id: 'm1', name: 'Test Monitor' }, { id: 'i1' }, 'DOWN');
        assert.strictEqual(errored, true, 'Should log error message on fetch failure');
    });

    test('should handle no rules', async (t) => {
        prisma.alertRule.findMany = async () => {
            return [] as unknown as AlertRule[];
        };

        // No rules, shouldn't fetch or anything
        let fetchCalled = false;
        t.mock.method(global, 'fetch', async () => {
            fetchCalled = true;
            return { ok: true };
        });

        await triggerAlerts({ id: 'm1', name: 'Test Monitor' }, { id: 'i1' }, 'DOWN');
        assert.strictEqual(fetchCalled, false, 'Should not call fetch if no webhook rules');
    });
});
