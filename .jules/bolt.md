## 2025-06-08 - Concurrent Webhook Alert Dispatch
**Learning:** In notification systems (like webhook alerts), sequential processing of network requests using `for...of` loops introduces O(N) wait times, causing significant performance bottlenecks when scaling the number of targets.
**Action:** Always dispatch independent network requests (e.g., webhook notifications) concurrently using `Promise.all` combined with `Array.prototype.map`, wrapping each request in its own `try...catch` block to prevent failures in one request from impacting others.
