## 2024-05-18 - Concurrent Webhook Execution in Alerts
**Learning:** In `src/lib/alerts.ts`, webhook notifications were executing sequentially in a `for...of` loop. When dealing with network I/O, this is a major performance bottleneck (O(n) latency).
**Action:** Use `Promise.all(rules.map(...))` to execute network requests concurrently, ensuring each notification request is wrapped in its own `try...catch` so a failure in one does not block others.
