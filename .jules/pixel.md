## 2024-05-14 - Fix Mobile Grid Columns
**Learning:** Found instances where grid-cols-2 was hardcoded for forms, causing fields to compress heavily on mobile widths (375px).
**Action:** Always verify form grids have a single column fallback (grid-cols-1) and switch to multiple columns only on sm: or md: breakpoints.
