## 2026-05-21 - Concurrent processing of alerts and monitors
**Learning:** The application was processing webhook alerts and monitor checks sequentially using a `for...of` loop, causing O(N) network waiting time.
**Action:** Use `Promise.all()` or `Promise.allSettled()` to dispatch these network-bound background tasks concurrently to drastically reduce execution latency, making sure to handle potential individual promise rejections correctly without silently swallowing errors.
