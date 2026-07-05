
## $(date +%Y-%m-%d) - Responsive Forms using sm: Prefix
**Learning:** Hardcoded `grid-cols-X` classes without responsive prefixes cause form fields to cramp and overflow on mobile viewports (<640px).
**Action:** Always use responsive tailwind prefixes for form grids, like `grid-cols-1 sm:grid-cols-2`, to allow fields to stack cleanly on mobile while sitting side-by-side on larger screens.
