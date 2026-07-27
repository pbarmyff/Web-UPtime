import { test, mock } from 'node:test';
import assert from 'node:assert';

const getServerSessionMock = mock.fn();
mock.module('next-auth/next', { namedExports: { getServerSession: getServerSessionMock } });
mock.module('@/app/api/auth/[...nextauth]/route', { namedExports: { authOptions: {} } });
mock.module('next/server', { namedExports: { NextResponse: { json: (body: any, init?: any) => ({ body, init }) } } });
const prismaMock = { apiKey: { create: mock.fn(), findMany: mock.fn() } };
mock.module('@/lib/prisma', { defaultExport: prismaMock });
mock.module('crypto', { defaultExport: { randomBytes: () => ({ toString: () => 'mocked-key' }) } });

test('API Keys POST endpoint', async (t) => {
    const { POST } = await import('./route.ts');

    await t.test('POST returns 401 if unauthorized', async () => {
        getServerSessionMock.mock.mockImplementationOnce(() => null);
        const req = { json: async () => ({}) } as Request;
        const res: any = await POST(req);
        assert.deepStrictEqual(res, { body: { error: 'Unauthorized' }, init: { status: 401 } });
    });

    await t.test('POST returns 400 if name is missing', async () => {
        getServerSessionMock.mock.mockImplementationOnce(() => ({ user: { id: 'user-1' } }));
        const req = { json: async () => ({}) } as Request;
        const res: any = await POST(req);
        assert.deepStrictEqual(res, { body: { error: 'Name is required' }, init: { status: 400 } });
    });

    await t.test('POST creates api key successfully', async () => {
        getServerSessionMock.mock.mockImplementationOnce(() => ({ user: { id: 'user-1' } }));
        prismaMock.apiKey.create.mock.mockImplementationOnce((args: any) => ({ id: 'key-1', ...args.data }));
        const req = { json: async () => ({ name: 'Test Key' }) } as Request;
        const res: any = await POST(req);
        assert.deepStrictEqual(res.body.apiKey.name, 'Test Key');
        assert.deepStrictEqual(res.body.apiKey.key, 'mocked-key');
        assert.strictEqual(res.init, undefined);
    });
});
