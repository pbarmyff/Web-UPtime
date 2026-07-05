## 2026-07-05 - Mobile Menu Button Accessibility
**Learning:** Icon-only hamburger menus across the app lacked crucial ARIA attributes (label, expanded state, controls) and keyboard focus styles, which made them invisible to screen readers and difficult to navigate via keyboard.
**Action:** When implementing interactive toggles like menus, always use `aria-label`, dynamic `aria-expanded`, `aria-controls` linking to the controlled element's id, `aria-hidden="true"` on inner decorative icons, and `focus-visible` styling to ensure full accessibility compliance.
