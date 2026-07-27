## 2026-07-27 - [Concurrent Webhook Alerts]
**Learning:** Sequential await loops for webhook alerts can cause O(N) wait times, degrading performance.
**Action:** Use Promise.all with Array.prototype.map wrapped in individual try-catch blocks to concurrently dispatch network requests without failing the whole batch.
