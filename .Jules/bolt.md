## 2024-06-05 - Concurrent Webhook Alert Execution

**Learning:** Webhook alerting logic in `src/lib/alerts.ts` was implemented using a sequential `for...of` loop over alert rules. In Node.js, iterating over asynchronous I/O bound tasks sequentially introduces O(N) wait times (if one webhook endpoint responds slowly, subsequent alerts are delayed or blocked). This is an unnecessary bottleneck when dispatching independent network requests.
**Action:** Always process independent network operations concurrently using `Promise.all` with `Array.prototype.map`. Wrap each async operation in its own `try...catch` block to ensure failures in one request do not interrupt the processing of others.
