## 2024-05-11 - Adding Documentation for Performance Commits
**Learning:** Even when the primary logic for performance optimization works (e.g., swapping a sequential loop for `Promise.all` or `Promise.allSettled`), a PR will be rejected or flagged if explanatory comments outlining what the optimization does and its expected performance impact are not provided inline.
**Action:** Always include inline comments documenting the expected performance impact (e.g., Big O reduction or bottleneck mitigation) directly above the optimized logic.
