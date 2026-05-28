## 2026-05-28 - Form Input Grids
**Learning:** Hardcoded `grid-cols-2` without responsive prefixes (like `sm:`) causes horizontal squishing on mobile views (375px), especially on forms with dense inputs.
**Action:** Always use responsive grid definitions, specifically `grid-cols-1 sm:grid-cols-2` when setting up form layouts with side-by-side inputs on desktop.
