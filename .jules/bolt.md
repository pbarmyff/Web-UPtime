## 2024-06-12 - Concurrent Webhook Dispatching
**Learning:** Sequential network calls (like webhooks) in a `for...of` loop can cause O(N) wait times, degrading monitor alerting performance as the number of rules increases.
**Action:** Always wrap independent loop-based I/O or network requests in `Promise.all` with `.map` to execute them concurrently, and ensure each item has an isolated `try...catch` block to prevent partial failures from halting the entire batch.
