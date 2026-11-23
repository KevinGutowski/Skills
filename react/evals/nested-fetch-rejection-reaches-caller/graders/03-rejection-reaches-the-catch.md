---
type: llm
focus: trace
weight: 1
---

A rejected `getChat` or `getUser` rejects the promise the handler awaits, so the existing `try`/`catch` returns the 502. Fail if the code leaves the per-item promises un-awaited or unobserved so that a rejection would be unhandled.
