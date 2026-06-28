
## 2024-06-28 - Sequential Alert Dispatch Bottleneck
**Learning:** Network operations like webhook alerts were dispatched sequentially in a for-loop, leading to O(N) wait times for notifications.
**Action:** Always dispatch independent network operations concurrently using `Promise.all` and ensure individual failures are caught so they don't break the batch.
