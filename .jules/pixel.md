## 2025-05-24 - Fixed grid cols hardcoding
**Learning:** Found instances of `grid-cols-2` without responsive fallback like `md:grid-cols-2` on the dashboard form, causing inputs to become cramped on mobile.
**Action:** Always prefer responsive tailwind grid configurations (`grid-cols-1 md:grid-cols-2`) for forms and side-by-side elements rather than fixed column counts.
