## 2024-06-03 - Accessible Mobile Navigation
**Learning:** Icon-only toggle buttons for mobile menus often lack context for screen readers and miss visual focus states for keyboard users, a common pattern in the UptimeMonitor application's top navigation bar.
**Action:** When creating or modifying navigational toggle buttons, always add `aria-label`, `aria-expanded`, and `aria-controls` linked to the dropdown's `id`. Additionally, ensure keyboard visibility using `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent`.
