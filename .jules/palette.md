## 2026-05-26 - Accessible Icon-only Navigation Buttons
**Learning:** Icon-only toggle buttons (like mobile hamburger menus) using Lucide-react frequently lack accessible names and state indicators, making them completely opaque to screen readers.
**Action:** Always verify that icon-only interactive elements possess descriptive `aria-label` attributes, dynamic `aria-expanded` (or `aria-pressed`) states for toggles, `aria-hidden="true"` on the inner decorative SVG icons, and clear `focus-visible` keyboard styling.
