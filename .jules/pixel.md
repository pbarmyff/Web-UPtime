## 2026-05-09 - Prevent cramped inputs in Create Monitor page
**Learning:** Using hardcoded `grid-cols-2` on form field containers can lead to cramped inputs on mobile devices due to lack of space.
**Action:** Replaced `grid-cols-2` with `grid-cols-1 sm:grid-cols-2` to ensure proper stacking on smaller viewports and side-by-side layout on wider screens, enhancing responsive layout.
