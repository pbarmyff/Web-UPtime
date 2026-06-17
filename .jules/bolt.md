## 2024-05-18 - Concurrent Webhook Alert Dispatch
**Learning:** Sequential network requests in a `for...of` loop cause O(N) wait times, leading to slow processing as the number of alerts increases.
**Action:** Always dispatch independent network operations concurrently using `Promise.all` and `Array.prototype.map`, wrapping each in a `try...catch` to prevent one failure from blocking others.
