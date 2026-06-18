
## 2024-06-18 - Accessible Mobile Navigation Toggles
**Learning:** Icon-only mobile menu toggles (hamburger/close) require explicit `aria-label`, `aria-expanded`, `aria-controls`, and `focus-visible` styling. Inner SVG icons must have `aria-hidden="true"`.
**Action:** Always wrap icon-only buttons with these ARIA attributes and keyboard focus rings (`focus-visible:ring-2`) to ensure full keyboard navigation and screen reader support.
