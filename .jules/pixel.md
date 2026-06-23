
## 2024-05-18 - Fix premature text truncation
**Learning:** Hardcoded max widths (like max-w-[200px]) on text containers (URLs or emails) cause premature truncation on larger desktop/tablet screens, degrading UX by hiding useful information.
**Action:** Use responsive Tailwind prefixes for max-width (e.g., max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-lg) to allow text containers to expand gracefully across breakpoints while still truncating when necessary on mobile.
