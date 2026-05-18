## 2024-05-18 - Concurrent Alert Processing
**Learning:** Sequential asynchronous operations in a `for...of` loop can significantly bottleneck system alert pipelines, especially when relying on external webhooks or APIs.
**Action:** Always favor batched/concurrent execution using `Promise.all(array.map(...))` combined with inner `try...catch` blocks for independent background notification or messaging systems to ensure system throughput and resilience.
