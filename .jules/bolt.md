## 2024-05-20 - Sequential Network Operations in Alerting
**Learning:** Webhook alerts and monitor checks were dispatched sequentially using a `for...of` loop, causing O(N) wait times.
**Action:** Always use `Promise.all` or `Promise.allSettled` for concurrent network operations (like webhooks or HTTP checks) to prevent blocking, chunking requests if necessary to avoid pileups.
