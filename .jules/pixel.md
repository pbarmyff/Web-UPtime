## 2024-11-20 - Fix Monitor Creation Form Layout
**Learning:** Found two consecutive instances of `grid-cols-2` without a responsive fallback for small screens, causing the fields to become cramped.
**Action:** When finding a two column layout such as `grid-cols-2`, it's generally best to use it alongside `grid-cols-1` and a responsive modifier like `sm:grid-cols-2` (e.g., `grid-cols-1 sm:grid-cols-2`) to keep inputs easily readable on a small layout.
