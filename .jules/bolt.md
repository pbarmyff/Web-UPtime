## 2025-05-29 - O(N) Webhook Latency Bottleneck
**Learning:** Sequential network calls inside loops (like `await fetch` in a `for...of` for webhook alerts) create unnecessary O(N) delivery delays, significantly impacting system performance during critical incidents when multiple rules trigger simultaneously.
**Action:** Always batch and dispatch independent outgoing network requests concurrently using `Promise.all()` with mapped arrays, ensuring individual failures are caught explicitly to prevent short-circuiting the entire batch.
