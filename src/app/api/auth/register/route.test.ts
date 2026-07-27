import test from "node:test";
import assert from "node:assert";
import { POST } from "./route";

test("POST /api/auth/register", async (t) => {
  await t.test("returns 500 when an unexpected error occurs", async () => {
    // We mock req.json() to throw an error, triggering the catch block in the route
    const req = {
        headers: {
            get: () => "127.0.0.1",
        },
        json: async () => {
            throw new Error("Simulated json parse error");
        },
    } as unknown as Request;

    const response = await POST(req);
    assert.strictEqual(response.status, 500);

    const data = await response.json();
    assert.strictEqual(data.error, "Something went wrong");
  });
});
