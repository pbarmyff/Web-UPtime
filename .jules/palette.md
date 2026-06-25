
## 2025-01-25 - Mobile Menu Accessibility
**Learning:** Icon-only interactive toggles in the navigation were lacking screen-reader associations (`aria-expanded`, `aria-controls`) and keyboard focus indicators, making them invisible to keyboard users.
**Action:** Always provide `aria-label`, `aria-expanded`, and `aria-controls` for toggles, `id` for their targets, `aria-hidden="true"` for inner icons, and ensure `focus-visible` styling is present for all icon-only buttons.
