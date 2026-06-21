## 2023-10-24 - Table URL Typography Truncation Fix
**Learning:** Found that long text strings like URLs in tables can be truncated too aggressively (e.g., `max-w-[200px]`) across all screen sizes. This is a common pattern that wastes screen real estate on larger devices.
**Action:** Replaced hardcoded max-width with responsive variations (e.g., `sm:max-w-[300px] md:max-w-md`) to allow graceful expansion while preventing horizontal scrolling or overlap on small screens.
