
## 2026-06-16 - Add ARIA attributes to mobile menu toggles
**Learning:** Interactive mobile menu toggles frequently lack `aria-label`, `aria-expanded`, `aria-controls` attributes, and `focus-visible` styling, which hampers keyboard and screen reader accessibility.
**Action:** Always add standard ARIA attributes (`aria-expanded`, `aria-controls`) linking the toggle button to its overlay container (`id`), along with `aria-label` and `focus-visible` utility classes for keyboard accessibility on icon-only buttons.
