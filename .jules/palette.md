
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** In this application, simple icon-only mobile menu toggles (`<Menu />`, `<X />`) across landing, dashboard, and admin layouts lack inherent accessible names, state announcements, and visible keyboard focus, negatively impacting screen reader users and keyboard navigation.
**Action:** Always add dynamic `aria-label` ("Open menu" / "Close menu"), `aria-expanded={isOpen}`, `aria-hidden="true"` to inner decorative icons, and explicit `focus-visible:ring-brand-accent` classes when implementing or modifying custom interactive icon buttons.
