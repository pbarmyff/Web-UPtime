## 2024-05-10 - Sequential network requests in setInterval causes pile-ups
**Learning:** Checking monitors sequentially inside a `setInterval` function can cause the Next.js instrumentation background loop to pile up and exceed the interval time (especially since HTTP timeouts exist and add up).
**Action:** Use chunked `Promise.allSettled` when executing an array of network requests inside a `setInterval` or cron job.
