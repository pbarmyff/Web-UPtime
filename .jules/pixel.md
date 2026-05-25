
## 2024-06-25 - Responsive Grid Stack in New Monitor Form
**Learning:** Found a hardcoded `grid-cols-2` that squishes input fields tightly on mobile devices in the "New Monitor" page.
**Action:** Always replace fixed `grid-cols-X` with `grid-cols-1 sm:grid-cols-X` in form elements to prevent form fields from collapsing too small on mobile. Included `{/* Responsive fix: stack on mobile */}` as per instructions.
