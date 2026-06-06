## 2026-06-06 - ARIA Label Fix for Mobile Navigation Menus
**Learning:** For interactive overlay menus/modals triggered by mobile UI, the toggle button requires dynamic aria-expanded, aria-controls referencing the menu ID, and aria-hidden on internal decorative icons to meet accessibility compliance alongside basic aria-labels.
**Action:** Always map toggle button accessibility attributes comprehensively (label, expanded state, controlled target) rather than just adding a static aria-label, especially when dealing with hidden/visible structural states.
