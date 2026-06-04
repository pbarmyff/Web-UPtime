## 2026-06-04 - Stack inputs on small screens
**Learning:** Found an instance in the new monitor page where grid-cols-2 was used without responsive prefixes, which would squeeze form inputs side-by-side on mobile screens, making them hard to use.
**Action:** Applied `grid-cols-1 md:grid-cols-2` to ensure the layout stacks on small screens while maintaining the two-column grid on desktop.
