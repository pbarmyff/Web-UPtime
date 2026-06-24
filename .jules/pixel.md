## 2024-11-20 - Avoid hardcoded grid-cols-2 on forms
**Learning:** Found an instance in the `src/app/dashboard/monitors/new/page.tsx` file where `grid-cols-2` was hardcoded, causing form inputs to become extremely cramped and unreadable on smaller mobile viewports.
**Action:** Always prefer setting a base 1-column grid (`grid-cols-1`) and stacking the grid up for larger viewports (`sm:grid-cols-2`) to ensure readability of side-by-side components on small screens.
