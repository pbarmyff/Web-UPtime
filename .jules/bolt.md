## 2024-05-09 - Interval Pile-Up on Sequential I/O
**Learning:** In Next.js background tasks using `instrumentation.ts` with a global `setInterval`, performing network/DB I/O sequentially (e.g., in a `for...of` loop) across many items causes interval pile-ups if total execution time exceeds the interval duration.
**Action:** Always batch and execute array items concurrently (e.g., using `Promise.allSettled` in chunks of 10-20) for tasks tied to strict intervals to ensure they complete before the next tick.
