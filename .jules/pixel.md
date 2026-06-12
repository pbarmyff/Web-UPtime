## 2026-06-12 - Identified cramped grid layouts on mobile forms
**Learning:** In forms using `grid-cols-2`, small screens (under 640px) can cause text fields and dropdowns to become too narrow, impacting readability and interaction.
**Action:** Use responsive grid classes like `grid-cols-1 sm:grid-cols-2` to ensure form fields stack nicely in a single column on mobile while maintaining the original layout on larger screens.
