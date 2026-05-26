## 2024-05-26 - Responsive Grid Fix for Forms
**Learning:** Found multiple instances where forms used hardcoded `grid-cols-2`, which causes input fields to become overly compressed and cramped on small screens (mobile).
**Action:** Replaced `grid-cols-2` with `grid-cols-1 sm:grid-cols-2` in `src/app/dashboard/monitors/new/page.tsx` to properly stack form fields on mobile while maintaining the side-by-side grid layout on larger screens, following the codebase's responsive guidelines.
