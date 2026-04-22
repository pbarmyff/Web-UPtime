## 2024-04-22 - Missing ARIA attributes on Mobile Nav Toggles
**Learning:** Icon-only mobile navigation toggle buttons across the app (like `Menu` and `X` icons from Lucide) frequently omit `aria-label`, `aria-expanded` attributes, and `focus-visible` styling, hindering keyboard accessibility and screen reader experience.
**Action:** Always ensure that icon-only interactive elements, especially toggles like mobile menus, have descriptive `aria-label`s, reflect their state using `aria-expanded`, and include visible focus rings (`focus-visible:ring-2`) for keyboard users.
