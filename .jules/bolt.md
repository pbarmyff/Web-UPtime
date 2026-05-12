## 2026-05-12 - Sequential execution pile-up in interval background tasks
**Learning:** In a native Next.js `instrumentation.ts` background task (`setInterval`), using a sequential `for...of` loop over an array of monitors can cause the interval to pile up, as the total execution time may exceed the interval length.
**Action:** Always use batched concurrent execution (e.g., chunked `Promise.allSettled`) for heavy array processing in `setInterval` and ensure rejected promises are explicitly handled/logged.
