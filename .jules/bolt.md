
## 2024-06-10 - Sequential I/O Bottlenecks in Monitoring Workflows
**Learning:** Sequential `for...of` loops for network operations (like sending webhook notifications) within a monitoring workflow create an O(N) wait time bottleneck, delaying responses when multiple alerts are configured.
**Action:** Always process batch network notifications concurrently using `Promise.all` with `Array.prototype.map()`, wrapping each attempt in its own `try...catch` block to ensure a single failure doesn't halt the rest of the batch.
