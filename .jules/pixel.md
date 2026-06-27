## 2024-05-18 - Fix Premature Text Truncation
**Learning:** Hardcoded `max-w-[200px]` alongside `truncate` prevents long URLs or emails from expanding on larger screens (desktop/tablet) even when there is plenty of space, degrading UX.
**Action:** Use responsive Tailwind prefixes (`max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg`) for long text strings in tables and headers to gracefully expand content based on the viewport while retaining the mobile constraints.
