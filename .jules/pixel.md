## 2026-07-06 - Grid layout squished inputs
**Learning:** Hardcoding grid-cols-2 inside forms without responsive fallbacks causes mobile views to render extremely compressed input fields.
**Action:** Always provide a single column fallback for mobile (e.g., grid-cols-1 sm:grid-cols-2) in form layouts.
