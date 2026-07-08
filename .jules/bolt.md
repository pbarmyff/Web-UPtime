## 2026-07-08 - Concurrent Webhook Dispatching
**Learning:** In notification systems triggering multiple webhooks, using sequential `for...of` loops introduces O(N) wait times, where N is the number of alerts. If one webhook endpoint is slow, it delays all subsequent alerts.
**Action:** Use `Promise.all` with `Array.prototype.map` to dispatch network operations concurrently. Always wrap individual operations in `try...catch` so a single failure doesn't reject the entire batch.
