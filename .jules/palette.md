## 2026-05-06 - Adding Accessible Mobile Menu Navigation
**Learning:** Found multiple mobile navigation overlay implementations in the app lacking proper ARIA properties for accessibility (aria-label, aria-controls, aria-expanded), along with visual indicators for keyboard focus on icon-only toggle buttons.
**Action:** Always verify keyboard accessibility using `focus-visible:ring-2 focus-visible:outline-none` combined with context-appropriate theme colors and verify semantic ARIA linkages on all custom menu implementations.
