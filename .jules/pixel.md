## 2024-06-16 - Prevent cramped columns on layouts with sidebars
**Learning:** When a sidebar is introduced at a breakpoint (e.g., `md`), the remaining screen space for the main content area shrinks significantly. Setting a high number of columns (like `md:grid-cols-4`) immediately when the sidebar appears causes severe "concertina effects" and cramped content.
**Action:** Always use intermediate breakpoint classes (like `sm:grid-cols-2 lg:grid-cols-4`) for grid layouts inside main content areas when there's an adjacent sidebar that consumes viewport width at the `md` breakpoint.
