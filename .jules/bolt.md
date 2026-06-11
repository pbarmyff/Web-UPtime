## 2026-06-11 - Concurrent Webhook Alert Processing
**Learning:** Sequential `await` inside a `for...of` loop for network operations (like sending webhook alerts) causes O(N) wait times, creating a significant performance bottleneck when processing multiple webhooks.
**Action:** Always use `Promise.all` with `Array.prototype.map` to dispatch network operations concurrently when order does not matter, ensuring faster, roughly O(1) processing time.
