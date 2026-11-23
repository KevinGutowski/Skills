---
type: llm
focus: trace
weight: 1
---

In the revised code, `auth()` and `fetchConfig()` are in flight at the same time: both are started before either is awaited to completion (for example `Promise.all([auth(), fetchConfig()])`, or both promises created before the first await). Fail if either one is awaited to completion before the other is started, in the page or across the components it renders, even when the response claims they run in parallel.
