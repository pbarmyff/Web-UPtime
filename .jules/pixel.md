## 2024-06-26 - Responsive truncations
**Learning:** Hardcoded max-widths (like `max-w-[200px]`) for truncating long strings (URLs/emails) in headers or tables cause premature truncation on larger screens.
**Action:** Use responsive Tailwind prefixes (`max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg`) to expand content gracefully while preventing horizontal scrolling on mobile.
