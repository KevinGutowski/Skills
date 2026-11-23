---
type: llm
focus: trace
weight: 1
---

In the revised code, no already-started promise is left without a handler while the code awaits a different promise. Trace the case where `fetchConfig()` rejects while `auth()` is still pending: the rejection must already be observed (the promise was passed to `Promise.all`/`Promise.allSettled` together with the other work, is awaited first, or has a `.catch`/`.then(_, handler)` attached at creation). Fail if the code does `const configPromise = fetchConfig()` and then `await auth()` (or any other await) before anything handles `configPromise`, and likewise for user-scoped promises started and then left unobserved across a later `await`.
