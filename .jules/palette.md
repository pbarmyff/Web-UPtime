## 2024-05-24 - Accessible Interactive Menu Toggles
**Learning:** Icon-only interactive toggles (like mobile hamburger menus) often lack proper screen reader context and keyboard focus indicators. React state-driven toggles need dynamic ARIA attributes to communicate their state effectively.
**Action:** Always add `aria-expanded={isOpen}`, `aria-controls="menu-id"`, `aria-label`, `focus-visible` styles, and `aria-hidden="true"` on the inner icons for all mobile menu buttons across the application.
