## 2026-07-27 - Optimize monitor check loop concurrency
**Learning:** Heavy array processing in background intervals must use batched concurrent execution (e.g., chunked `Promise.allSettled`) to prevent interval pile-ups and reduce O(N) wait times.
**Action:** When iterating over a large array to perform network requests, group items into chunks and execute them concurrently with `Promise.allSettled`, ensuring returned results are explicitly processed to handle rejected promises.
