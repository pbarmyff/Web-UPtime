## 2026-06-25 - Expand truncation max-widths on larger screens
**Learning:** Hardcoding `max-w-[200px]` for long text like emails or URLs in headers and tables can truncate them prematurely on desktop and tablet screens where space is abundant.
**Action:** Use responsive Tailwind prefixes for max-widths on truncating text (e.g., `max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg`) so they can expand gracefully as viewport size increases.
