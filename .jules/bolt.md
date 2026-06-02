## 2024-05-18 - Sequential Webhook Anti-Pattern
**Learning:** Webhook alerts were being processed sequentially in a `for...of` loop in `src/lib/alerts.ts`. Since each webhook requires an HTTP request, this created an O(N) wait time blocking subsequent operations.
**Action:** Always dispatch network operations like webhook alert notifications concurrently using `Promise.all` with `Array.prototype.map` instead of sequentially. Ensure each attempt is wrapped in a `try...catch` block to prevent failures from cascading.
