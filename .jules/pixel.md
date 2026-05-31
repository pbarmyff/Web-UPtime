## 2024-11-20 - Fix Responsive Grid on New Monitor Page
**Learning:** Found grid containers hardcoded to `grid-cols-2` which squishes input columns on small mobile devices (e.g. 375px), compromising UX.
**Action:** Replaced `grid-cols-2` with `grid-cols-1 sm:grid-cols-2` to allow vertical stacking on mobile and column-based layout on larger screens, following the codebase's responsive pattern guidelines.
