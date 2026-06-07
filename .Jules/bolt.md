## 2024-06-07 - Sequential vs Concurrent Loop Dispatching
**Learning:** Sequential `for...of` loops executing network requests (like `fetch`) cause O(N) wait times, causing significant slowdowns.
**Action:** Use `Promise.all(arr.map(async (item) => {...}))` to dispatch independent network requests concurrently for O(1) wait time, wrapping each in a `try...catch` to avoid total failure on single request errors.
