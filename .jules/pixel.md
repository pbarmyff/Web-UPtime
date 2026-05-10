## 2024-11-20 - Responsive Grid Layout in Forms
**Learning:** Found an instance in the codebase where `grid-cols-2` was used for form layout, which caused cramped inputs on mobile sizes. The proper responsive pattern is `grid-cols-1 sm:grid-cols-2`.
**Action:** When finding `grid grid-cols-[n]`, always ensure there is a fallback for smaller screens like `grid-cols-1 md:grid-cols-[n]`.
