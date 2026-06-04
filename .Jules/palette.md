## 2026-06-04 - Adding ARIA attributes and focus states to mobile menus
**Learning:** Icon-only navigation buttons must always include `aria-label`, `aria-expanded`, and `aria-controls`. Decorative elements like internal Lucide icons should explicitly have `aria-hidden="true"` to prevent screen reader redundancy.
**Action:** Consistently apply keyboard focus classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent`) and proper ARIA states when encountering custom UI buttons, particularly for menus.
