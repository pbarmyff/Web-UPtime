## 2024-10-24 - Accessibility for Mobile Menus
**Learning:** Icon-only toggles (like mobile hamburger menus) often lack proper ARIA relationships (`aria-controls`, `aria-expanded`) and visual keyboard focus states in this application.
**Action:** Always add `aria-expanded`, `aria-controls`, `aria-label`, and `focus-visible:ring-2` to interactive toggles, and use `aria-hidden="true"` on inner decorative SVG icons.
