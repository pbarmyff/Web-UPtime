
## 2025-06-18 - Icon-only Mobile Nav Menu Buttons
**Learning:** Missing ARIA labels, focus states, and dynamic `aria-expanded` attributes on mobile menu toggles is a common pattern in this app's architecture, creating a poor keyboard navigation and screen reader experience.
**Action:** Always ensure interactive toggles have dynamic `aria-expanded` matching their state, `aria-controls` matching the target container `id`, `aria-hidden="true"` on decorative icons, and distinct `focus-visible` styling when they only contain visual icons.
