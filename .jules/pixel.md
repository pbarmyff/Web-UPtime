## 2024-05-24 - Form Field Squishing in Monitors New Page
**Learning:** Fixed `grid-cols-2` forces two columns even on very small screens, causing input fields to squish excessively.
**Action:** Always prefer `grid-cols-1 sm:grid-cols-2` (or similar responsive breakpoints) for multi-column form layouts to allow stacking on mobile devices.
