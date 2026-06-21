## 2024-06-21 - Parallelize Network Operations
**Learning:** Sequential network operations (like webhook alert notifications) inside `for...of` loops cause O(N) wait times, blocking other processes.
**Action:** Always dispatch network operations concurrently using `Promise.all` with `Array.prototype.map`, wrapping each attempt in a `try...catch` block to ensure resilience.
