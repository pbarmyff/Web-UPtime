
## 2024-05-18 - Stacked Form Fields on Mobile
**Learning:** Hardcoded `grid-cols-2` inside forms causes inputs to be squashed horizontally on smaller screens, significantly degrading UX and readability.
**Action:** When defining grid columns for inputs in responsive layouts, always provide a stacked fallback (e.g., `grid-cols-1 sm:grid-cols-2`) to ensure inputs have full width on mobile devices.
