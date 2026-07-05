## 2026-07-05 - [Concurrent Network Operations]
**Learning:** The codebase has an anti-pattern of using sequential `for...of` loops with `await` for network operations like sending webhooks (e.g., in alerts). This causes O(N) wait times.
**Action:** Always use `Promise.all` with `Array.prototype.map` to dispatch network operations concurrently. Wrap each iteration in its own `try...catch` to isolate failures.
