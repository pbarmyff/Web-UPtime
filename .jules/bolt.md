## 2023-10-24 - [Sequential webhook dispatch blocking]
**Learning:** In the uptime monitoring architecture, sequential dispatching of alerts (especially webhooks) in `triggerAlerts` can cause O(N) wait times for network round-trips. This blocks subsequent alerts and delays notifications.
**Action:** Always dispatch independent network calls (like webhooks or emails) concurrently using `Promise.all` + `.map()`, and ensure each concurrent request has an individual `try...catch` boundary so one failure doesn't swallow others.
