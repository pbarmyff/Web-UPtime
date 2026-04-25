## 2024-05-24 - Accessibility on Mobile Nav
**Learning:** Icon-only navigation toggle buttons require `aria-controls` paired with a target element's `id` to properly announce collapsible sections. Also, `aria-expanded` is critical to announce state, and manual focus-ring styles (like `focus-visible`) are needed to show keyboard selection explicitly in dark-mode themes.
**Action:** Always verify that interactive icon components have robust ARIA attributes and a visible focus style. Ensure toggles explicitly link to the content they control using `aria-controls`.
