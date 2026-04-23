
## 2024-04-23 - Concurrent Batched Execution for Background Intervals
**Learning:** In a codebase using Node.js/Next.js native interval for long-running monitoring tasks (`runChecks`), executing network-bound tasks (like pinging URLs) sequentially via a `for...of` loop can cause massive interval pileups, especially when `timeout` bounds hit.
**Action:** Always chunk background tasks with network constraints and process them concurrently using `Promise.allSettled(chunk.map(...))`, explicitly handling rejected promises to ensure errors aren't silently swallowed.
