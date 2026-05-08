
## 2024-05-18 - Concurrent Background Task Batching
**Learning:** Sequential processing in Next.js experimental `instrumentation.ts` globally scoped intervals can lead to massive bottlenecks when processing data arrays, leading to interval pile-ups as the previous interval doesn't finish before the next one starts. Unbounded concurrency is also dangerous for rate limits.
**Action:** Always process heavy iterative loops in background tasks using chunked batch concurrency (e.g., `Promise.allSettled` in batches of 10) and explicitly log the rejected promises inside `results.forEach` since `allSettled` silently swallows errors if not inspected.
