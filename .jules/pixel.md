
## 2026-07-02 - Responsive Max-Width for Long Texts
**Learning:** Using a single hardcoded max-width (e.g. max-w-[200px] or max-w-xs) for table text content truncates too early on larger screens.
**Action:** Used responsive Tailwind max-width prefixes (e.g. `max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg`) combined with `truncate` to ensure content expands appropriately across desktop breakpoints without pushing table cells on mobile.
