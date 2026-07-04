
## $(date +%Y-%m-%d) - Accessibility of Icon-Only Mobile Navigation Menus
**Learning:** Mobile navigation components using Lucide icons (`<Menu />`, `<X />`) for toggling overlays often lack keyboard navigation indicators and ARIA relationships out of the box, making them inaccessible to screen readers and keyboard users.
**Action:** When implementing or fixing icon-only overlay toggles, always ensure the trigger `<button>` includes `aria-label`, `aria-expanded`, and `aria-controls`, and use `focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-accent` for clear keyboard focus states, while giving the icons themselves `aria-hidden="true"`.
