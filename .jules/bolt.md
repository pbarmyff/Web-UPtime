
## 2024-06-29 - O(N) Wait Time in Notifications
**Learning:** Sequential execution in a loop over external network calls (e.g. `fetch` for Webhooks) creates an O(N) wait time bottleneck, meaning one slow request can delay or block subsequent critical operations (like other alerts or status updates).
**Action:** Use `Promise.all` with `Array.prototype.map` to execute multiple independent network requests concurrently. Always ensure each asynchronous operation is wrapped in a `try...catch` block so a failure in one promise does not reject the entire `Promise.all` array.
