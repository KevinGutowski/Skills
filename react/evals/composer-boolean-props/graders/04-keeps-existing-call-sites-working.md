---
type: llm
focus: trace
weight: 1
---

Existing call sites keep working: the current `Composer` props still behave as before, or the response gives an incremental migration path. Fail if the code defines two different things under the same exported name, or deletes current props with no transition.
