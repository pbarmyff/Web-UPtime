## 2024-05-30 - Network Round-Trips in Webhook Dispatches
**Learning:** Sequential network requests in `for...of` loops drastically slow down the application, resulting in O(N) wait times for bulk notifications (like alerting systems).
**Action:** Always refactor sequential external API calls (e.g., webhook notifications) to use `Promise.all` alongside `.map()` and ensure individual failure isolation using `try...catch`.
