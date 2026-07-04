
## 2026-07-04 - Concurrent Webhook Alert Dispatch
**Learning:** Sequential processing of network operations (like webhook alerts via `for...of`) can create O(N) wait times, meaning a slow webhook delays subsequent alerts, potentially blocking critical notification pipelines during incidents.
**Action:** When dispatching multiple network operations, use concurrent execution (e.g., `Promise.all` + `map`) to process them in parallel, improving time complexity to O(max_latency). Ensure each operation wraps its own `try...catch` so independent failures do not disrupt the entire batch.
