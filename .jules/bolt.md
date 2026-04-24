## 2025-04-24 - Avoid Interval Pile-Up with Concurrent Execution
**Learning:** Background intervals (like Next.js instrumentation intervals) performing array processing sequentially (e.g., via `for...of` loops over database query results) can lead to interval pile-ups if processing exceeds the interval frequency.
**Action:** Always use a chunked, concurrent execution model (e.g., chunked `Promise.allSettled`) for heavy array processing in background intervals. Ensure results are processed to correctly log rejected promises and prevent silently swallowed errors.
