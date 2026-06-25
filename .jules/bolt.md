## 2024-10-24 - Concurrent Webhook Dispatches
**Learning:** Sequential `for...of` loops with `await` for network operations like webhooks cause O(N) wait times, unnecessarily delaying subsequent actions.
**Action:** Always dispatch independent network operations concurrently using `Promise.all` combined with `Array.prototype.map`, wrapping each in a `try...catch` block to isolate failures.
