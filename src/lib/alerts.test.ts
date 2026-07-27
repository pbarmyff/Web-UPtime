import test from 'node:test';
import assert from 'node:assert';
import { triggerAlerts } from './alerts';
import prisma from './prisma';

test('triggerAlerts WEBHOOK error path', async (t) => {
    // Mock prisma
    const originalAlertRule = prisma.alertRule;
    prisma.alertRule = {
        findMany: async () => [
            { type: 'WEBHOOK', target: 'http://example.com/webhook', monitorId: '1' }
        ]
    } as any;

    // Mock fetch
    t.mock.method(global, 'fetch', async () => {
        throw new Error('Network error');
    });

    const consoleErrorMock = t.mock.method(console, 'error', () => {});
    const consoleLogMock = t.mock.method(console, 'log', () => {});

    await triggerAlerts({ id: '1', name: 'Test' }, { id: 'inc1' }, 'DOWN');

    assert.strictEqual(consoleErrorMock.mock.callCount(), 1);
    assert.match(consoleErrorMock.mock.calls[0].arguments[0], /Failed to send webhook to http:\/\/example.com\/webhook:/);
    assert.strictEqual(consoleErrorMock.mock.calls[0].arguments[1].message, 'Network error');

    // Restore
    prisma.alertRule = originalAlertRule;
});
