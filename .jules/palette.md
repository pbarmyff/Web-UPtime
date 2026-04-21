## 2024-04-21 - Accessible Icon Buttons in Navigation
**Learning:** Found a pattern where mobile toggle menus and list action icons lacked `focus-visible` styles and contextually shifting `aria-label`/`aria-expanded` attributes. Specifically, the Framer Motion-based pages drop focus ring default behavior for naked buttons.
**Action:** Always wrap `lucide-react` icons in buttons with `focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:outline-none`, and use dynamic `aria-expanded` attributes on menu toggles.
