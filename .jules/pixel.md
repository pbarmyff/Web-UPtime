
## 2024-05-18 - Stack cramped inputs in monitors/new on mobile
**Learning:** Hardcoded `grid-cols-2` on configurations sections with multiple input items leads to cramping and bad UI on mobile viewports.
**Action:** Use responsive grid column classes `grid-cols-1 sm:grid-cols-2` for multi-item input fields inside the dashboard forms.
