## 2024-05-01 - Sequential background check pile-ups
**Learning:** Sequential processing (`for...of` with `await`) inside a rapid interval (like 10s monitoring) can cause severe pile-ups if network requests hang or timeout, preventing subsequent monitors from being checked on time.
**Action:** Always use chunked, concurrent execution (e.g., `Promise.allSettled`) for heavy array processing in intervals. Explicitly iterate over the results to handle/log rejected promises so errors aren't silently swallowed.
