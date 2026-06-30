## 2026-06-30 - Fix Premature String Truncation
**Learning:** Hardcoding `max-w-[200px]` on long text strings like URLs causes premature truncation on desktop and larger screens, wasting available space.
**Action:** Use responsive Tailwind max-width prefixes (e.g., `max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg`) for text elements like URLs or emails to allow them to expand gracefully across breakpoints while preventing horizontal overflow on mobile.
