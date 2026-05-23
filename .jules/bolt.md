## 2026-05-23 - Parallelizing Background Tasks
**Learning:** Sequential processing in monitoring loops (e.g. `for...of` for network requests) creates O(N) wait times, leading to interval pile-ups and delayed alerts.
**Action:** Always use batched concurrent execution (e.g. chunked `Promise.allSettled`) for monitoring checks and `Promise.all` mapped arrays for alert dispatching.
