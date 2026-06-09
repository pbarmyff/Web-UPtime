## 2024-11-20 - Create Monitor Form Grid
**Learning:** Found instances of fixed `grid-cols-2` grids containing text inputs and dropdowns, leading to squished inputs on mobile devices due to the lack of responsive wrapping prefixes.
**Action:** Always replace hardcoded `grid-cols-X` with a mobile-first `grid-cols-1` and a responsive prefix like `sm:grid-cols-X` when the grid cells contain block-level input elements.
