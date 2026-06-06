## 2024-06-05 - O(N) Network Calls in Loop

**Learning:** Dispatching network requests inside a sequential `for...of` loop causes unnecessary O(N) wait times. Using `Promise.all` with `.map()` allows concurrent execution and significantly decreases execution time for asynchronous I/O operations.

**Action:** Whenever iterating and awaiting independent asynchronous operations (like network requests or database queries), consider whether they can be executed concurrently using `Promise.all` to improve performance. However, remember to ensure individual errors don't fail the entire batch (e.g. use `try...catch` in the mapped function or `Promise.allSettled`).