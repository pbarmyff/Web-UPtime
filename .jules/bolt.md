
## 2024-05-18 - Avoid Sequential Loops in Node.js Monitoring Intervals
**Learning:** In long-running native Node.js monitoring systems (like those using `setInterval` in Next.js `instrumentation.ts`), using a sequential `for...of` loop with `await` for processing an array of network requests can block the event loop and stall interval execution. If processing time exceeds the interval delay, the next interval might overlap or pile up, leading to memory leaks and delayed checks.
**Action:** Always process arrays of heavy asynchronous tasks (e.g., monitor pings) using batched concurrent execution (e.g., chunked `Promise.allSettled`) to maintain interval stability and maximize throughput.
