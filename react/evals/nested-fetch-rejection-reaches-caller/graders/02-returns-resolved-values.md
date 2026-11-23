---
type: llm
focus: trace
weight: 1
---

`loadAuthors` resolves to an array of author objects, not an array of promises: the per-item promises are awaited together (for example with `await Promise.all(...)` or by returning `Promise.all(...)`), so `authors.map(a => a.name)` in the handler works.
