
## 2024-06-01 - Interactive Icon Toggle Accessibility Pattern
**Learning:** `lucide-react` icons used inside interactive button toggles (like mobile hamburger/close menus) lack semantic meaning and keyboard support by default. Without explicit ARIA attributes, they are announced poorly (or not at all) to screen reader users and don't provide clear focus indicators for keyboard navigation.
**Action:** When implementing icon-only buttons with `lucide-react`, always apply:
1. `aria-label` to the wrapper button to explicitly describe the action.
2. `aria-expanded` and `aria-controls` to the wrapper button when controlling collapsible regions (menus, accordions).
3. `aria-hidden="true"` to the internal `lucide-react` icon to prevent redundant or confusing screen reader announcements.
4. `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color] rounded-sm p-1` to the wrapper button for clear keyboard focus states, ensuring the ring color matches the specific contextual theme.
