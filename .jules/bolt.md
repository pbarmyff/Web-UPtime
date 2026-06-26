## 2024-06-26 - Concurrent Webhook Dispatching
**Learning:** Sequential `for...of` loops that await independent network operations (like webhooks) create an O(N) performance bottleneck, severely delaying subsequent notifications.
**Action:** Always dispatch independent network calls concurrently using `Promise.all` with `Array.prototype.map`, wrapping each in its own `try...catch` to guarantee isolated execution.
