
## 2024-05-24 - Fix cramped inputs on Create Monitor form
**Learning:** Found an anti-pattern in the repo where `grid-cols-2` was used for form fields without a responsive fallback, causing them to be squished horizontally on mobile screens (375px).
**Action:** Always verify that grid layouts use responsive prefixes (e.g. `grid-cols-1 sm:grid-cols-2`) so they properly stack on smaller viewports.
