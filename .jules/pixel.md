## 2024-05-18 - Responsive form grid
**Learning:** Found a common pattern where `grid-cols-2` is hardcoded for forms, causing input fields to become too narrow and squeezed on mobile devices.
**Action:** When implementing side-by-side inputs in forms, use `grid-cols-1 sm:grid-cols-2` instead of `grid-cols-2` to ensure proper stacking on mobile while keeping the side-by-side layout on larger screens.
