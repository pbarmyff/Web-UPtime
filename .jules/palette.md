## 2024-05-04 - Screen Reader Support on Mobile Navigation
**Learning:** Icon-only toggles (`Menu`/`X` from Lucide) lacked critical ARIA state mappings (`aria-expanded`, `aria-controls`), making mobile navigation states opaque to screen readers.
**Action:** Ensure all icon-only interactive state toggles dynamically map `aria-expanded` and link to their target containers via `aria-controls` alongside standard `aria-label`s.
