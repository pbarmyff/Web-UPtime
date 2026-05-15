
## 2024-05-24 - Interval Pile-up with IO-bound loops
**Learning:** In Next.js background instrumentation `setInterval` loops, sequential execution (`for...of`) of IO-bound operations (like HTTP requests) causes interval pile-up where previous loops haven't finished before the next tick starts.
**Action:** Always use batched concurrent execution (e.g. `Promise.allSettled` with chunking) for processing arrays of IO-bound tasks inside `setInterval` to keep execution times under the tick threshold and log any rejected promises explicitly.
