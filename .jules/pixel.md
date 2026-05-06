## 2026-05-06 - Responsive layout fix for form fields
**Learning:** In standard grid layouts (e.g., using Tailwind's `grid grid-cols-X`), utilizing responsive prefixes appropriately (`grid-cols-1 md:grid-cols-2`) prevents fields from becoming cramped or squashed on mobile.
**Action:** When inspecting components that utilize `grid-cols-X`, check for responsive variants. For form fields, applying a 1-column layout on mobile and 2-column layout on medium+ screens provides a better UX.
