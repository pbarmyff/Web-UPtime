## 2024-10-24 - Form Fields Squishing on Mobile
**Learning:** Fixed `grid-cols-2` containers on form pages (like monitor creation) cause text inputs and selects to squash and become unusable on mobile screens since they don't break onto new lines.
**Action:** When using grid layouts for form sections, always default to `grid-cols-1` for mobile and apply `md:grid-cols-2` for larger viewports to ensure fields stack nicely and maintain touchability.
