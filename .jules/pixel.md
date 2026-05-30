## 2026-05-30 - Stack input grids on mobile
**Learning:** Found `grid-cols-2` without responsive prefixes inside `src/app/dashboard/monitors/new/page.tsx`, which forces inputs to squish or overlap on mobile screens due to lack of space.
**Action:** Replaced `grid-cols-2` with `grid-cols-1 md:grid-cols-2` and added a responsive fix comment to ensure safe degradation to a stacked single-column layout on smaller viewports.
