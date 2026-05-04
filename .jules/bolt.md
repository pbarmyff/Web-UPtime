## 2024-05-19 - Batched Concurrency in Interval Check Loops
**Learning:** The continuous monitoring process (`runChecks` inside `instrumentation.ts`) relied on a sequential `for...of` loop waiting on synchronous/network-bound tasks (`await checkMonitor`). Under load, sequential execution can cause the 10-second `setInterval` to overlap/pile up, blocking the Node event loop and skewing check intervals.
**Action:** Always process heavy external I/O arrays within background intervals using chunked/batched concurrency (e.g., `Promise.allSettled(batch.map(...))`). Explicitly handle rejections within `allSettled` to prevent silent failures that would otherwise halt the loop.

## 2024-05-19 - Database Transaction Batching
**Learning:** Sequential updates to the database (`prisma.monitorLog.create` followed by `prisma.monitor.update`) inside high-frequency loops trigger 2x network latency overhead and separate connection pool hits.
**Action:** When a function requires multiple deterministic writes to the database, wrap them in a `prisma.$transaction([])` array to reduce network round-trips to the DB and ensure transaction atomicity.
