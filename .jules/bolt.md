## 2024-05-18 - Concurrent Network Requests for Webhooks
**Learning:** Dispatching webhook notifications sequentially in a `for...of` loop introduces an O(N) performance bottleneck tied directly to network latency.
**Action:** Always use `Promise.all` with `Array.prototype.map` for outbound network operations (like alerts) to execute them concurrently, wrapping each in a `try/catch` to ensure isolation.
