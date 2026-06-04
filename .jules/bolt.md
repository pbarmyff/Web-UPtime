## 2025-06-04 - Concurrent Webhook Alert Dispatch
**Learning:** Sequential network calls for alerting (like webhook dispatching in a loop) create an O(N) wait-time bottleneck. Using Promise.all resolves this network wait and achieves O(1) time complexity over the network.
**Action:** When implementing bulk external network calls (e.g. alerts or notifications), dispatch them concurrently using Promise.all and map, ensuring each has its own try/catch to avoid one failure halting the others.
