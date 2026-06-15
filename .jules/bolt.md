## 2024-06-15 - Concurrent Alert Dispatching
**Learning:** Sequential network requests for alert dispatching inside a loop cause O(N) wait times, which delays subsequent alerts in the loop.
**Action:** Always use concurrent execution (`Promise.all` + `.map`) and wrap individual dispatch attempts in `try...catch` blocks to prevent single failures from aborting the entire batch.
