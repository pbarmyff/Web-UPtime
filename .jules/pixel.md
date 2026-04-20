## 2024-04-20 - Cramped Grid on Tablet Sizes
**Learning:** Found an anti-pattern where statistics grids transition abruptly from 1 column to 3 or 4 columns (e.g., `grid-cols-1 md:grid-cols-4`). This causes severe cramping on medium (tablet) screens.
**Action:** Use intermediate responsive prefixes like `sm:grid-cols-2 lg:grid-cols-4` (or `md:grid-cols-3` for 3-item lists) to ensure neat 2x2 wrapping before the full horizontal expansion on wider screens.
