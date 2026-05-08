## 2024-05-14 - Dashboard New Monitor Grid Fix
**Learning:** Found an anti-pattern in `src/app/dashboard/monitors/new/page.tsx` where form groups were hardcoded to `grid-cols-2` which broke/cramped the UI on mobile screens.
**Action:** Changed to `grid-cols-1 sm:grid-cols-2` to allow vertical stacking on smaller screens while preserving the 2-column layout on desktop/tablet.
