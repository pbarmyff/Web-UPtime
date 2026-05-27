## 2026-05-27 - Fix Form Grid Responsiveness in Monitor Creation
**Learning:** Hardcoded grid columns (e.g., `grid-cols-2`) in forms can cause layout squishing on mobile devices if they don't have responsive fallbacks (e.g., `grid-cols-1 md:grid-cols-2`).
**Action:** When using CSS grids for forms, always use a single column layout (`grid-cols-1`) for mobile first, and introduce multi-column layouts at larger breakpoints (`md:grid-cols-2`) to ensure proper scaling.
