## 2024-05-24 - Sequential Network Calls Bottleneck
**Learning:** Background monitoring intervals and webhook alerts were written using sequential `for...of` loops, causing O(N) wait times that block subsequent operations and can lead to interval pile-ups when many monitors exist.
**Action:** Always batch and parallelize network operations using `Promise.all` (for independent alerts) or chunked `Promise.allSettled` (for large arrays like monitors) to prevent thread blocking and interval pile-ups. Ensure rejected promises are handled to avoid silently swallowing errors.
