## 2024-05-24 - Mobile Menu Accessibility
**Learning:** Icon-only menu buttons in mobile navigation lack `aria-label` and `aria-expanded` attributes, making them difficult to use for screen reader users. The interactive toggles should dynamically set `aria-expanded`.
**Action:** Add `aria-label` to the mobile menu button and `aria-expanded={isOpen}` to improve screen reader experience. Ensure it follows focus-visible states as dictated in `AGENTS.md`.
