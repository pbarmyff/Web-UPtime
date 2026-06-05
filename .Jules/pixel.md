## 2025-06-05 - Dashboard New Monitor Form - Grid squishing on mobile
**Learning:** Found two `<div className="grid grid-cols-2">` blocks in `src/app/dashboard/monitors/new/page.tsx` that hardcoded a 2-column layout, which caused the input fields to squish and overlap on narrow mobile screens like 375px.
**Action:** Always verify grid forms have a single-column fallback for mobile by using `grid-cols-1 sm:grid-cols-2`. Replaced `grid-cols-2` with `grid-cols-1 sm:grid-cols-2` for both grid blocks in the form.
