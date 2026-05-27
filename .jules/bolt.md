
## 2024-05-27 - Background task concurrency
**Learning:** Sequential `for...of` loops over I/O operations (like fetching webhooks or polling websites) in background scripts create hidden massive performance bottlenecks that pile up on Next.js `instrumentation.ts` intervals.
**Action:** When writing background loops for large lists of resources, always chunk execution and process them concurrently using `Promise.all` or `Promise.allSettled`, while explicitly handling rejected promises to ensure reliability.
