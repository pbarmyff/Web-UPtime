## 2025-05-24 - Accessible Menu Toggles
**Learning:** Icon-only menu buttons without `aria-label`, `aria-expanded`, and `aria-controls` fail to provide screen reader users with necessary context about the menu's state and purpose.
**Action:** Always include dynamic `aria-expanded` and `aria-controls` on interactive menu toggles, add an `aria-label`, set `aria-hidden="true"` on the decorative inner icons, and ensure `focus-visible` styles are present for keyboard users.
