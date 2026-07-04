## 2026-07-04 - Prevent Redundant Breakpoints
**Learning:** When adding responsive prefixes to child elements, I should first verify the parent container's visibility classes. Adding `sm:` prefixes to children of a container that is `hidden md:flex` is redundant and has no effect since the container itself is hidden below the `md` breakpoint.
**Action:** Always traverse up the DOM tree to check parent visibility breakpoints (like `hidden md:block`) before applying responsive classes to children to ensure those classes will actually be evaluated.
