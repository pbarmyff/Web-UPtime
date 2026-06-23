## 2024-05-18 - [Alert Notifications Wait Time Reduction]
**Learning:** Sequential `for...of` loops for network requests (like webhooks) create an O(N) wait time bottleneck that blocks background job completion or user response unnecessarily.
**Action:** Always dispatch independent network operations concurrently using `Promise.all` with `Array.prototype.map`, keeping individual `try...catch` blocks for fault isolation.
