
## 2024-05-23 - Missing ARIA attributes and focus styles on mobile navigation toggles
**Learning:** Icon-only toggle buttons in mobile navigation bars consistently lacked `aria-label`, `aria-expanded` attributes, and `focus-visible` styling, preventing screen reader usage and reducing keyboard accessibility. The inner decorative icons also lacked `aria-hidden="true"`.
**Action:** When implementing or fixing icon-only menu toggles, always enforce `aria-label="Open/Close menu"`, dynamically update `aria-expanded={isOpen}`, apply `focus-visible:outline-none focus-visible:ring-2` styling, and apply `aria-hidden="true"` to the decorative child icons (`Menu`, `X`, etc).
