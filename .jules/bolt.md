## 2024-04-28 - Batched IO Execution in Global Intervals
**Learning:** In Next.js `instrumentation.ts`, running a `setInterval` that heavily awaits slow IO requests (like HTTP pings) sequentially causes the interval loops to overlap and pile up. This severely degrades performance over time as unresolved tasks queue up.
**Action:** When performing bulk IO in background intervals, always chunk the workload and use concurrent methods like `Promise.allSettled`, making sure to explicitly handle the `rejected` statuses to avoid silently swallowing errors.
