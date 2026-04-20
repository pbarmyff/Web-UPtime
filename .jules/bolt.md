## 2024-04-20 - [Batching Interval Checks]
**Learning:** Sequential execution of expensive or network-bound tasks in a `setInterval` loop (like monitor checks) can cause "interval pile-ups" where the execution time exceeds the interval time. This blocks subsequent intervals and causes memory leaks and performance issues.
**Action:** Always use batched concurrent execution (`Promise.allSettled` or `Promise.all` with a bounded concurrency pool or chunks) for array processing in background intervals instead of sequential `await` loops.
