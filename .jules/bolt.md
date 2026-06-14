## 2024-06-14 - Concurrent execution for monitor checks
**Learning:** Sequential execution of background tasks in a global interval can cause interval pile-ups if tasks are I/O bound and numerous, leading to delayed monitoring checks.
**Action:** Always use batched concurrent execution (e.g., `Promise.allSettled` or `Promise.all` with `Array.prototype.map`) for processing arrays of I/O bound background tasks within interval loops, ensuring explicit handling of rejected promises.
