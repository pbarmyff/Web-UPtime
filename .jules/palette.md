## 2026-05-02 - Missing ARIA Labels on Icon-Only Nav Toggles
**Learning:** Icon-only mobile navigation buttons in this app frequently lack both `aria-label` and `aria-expanded` attributes, and miss standard keyboard focus outlines.
**Action:** Always check newly added or existing icon-only buttons (especially toggles using `lucide-react`) for `aria-label`, `aria-expanded`, and `focus-visible:outline-none focus-visible:ring-2` Tailwind utility classes.
