## 2024-06-05 - Mobile Navigation Toggle Accessibility
**Learning:** Icon-only navigation toggles in Next.js/Tailwind components often lack essential ARIA attributes for screen readers to understand their function and state, making mobile menus inaccessible to assistive technologies.
**Action:** Always verify that interactive buttons, especially icon-only toggles, include `aria-label`, `aria-expanded`, and `aria-controls` attributes, while setting `aria-hidden="true"` on the purely decorative internal SVGs to prevent redundant announcements.
