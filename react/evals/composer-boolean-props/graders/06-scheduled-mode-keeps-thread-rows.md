---
type: llm
focus: trace
weight: 1
---

The scheduled mode does not silently lose behavior the existing flags provide. Either the scheduled composer still renders the thread and DM-thread "also send" rows (`AlsoSendToChannel` / `AlsoSendToDM`) and the attachments and formatting controls where they applied before, or the response states explicitly which of these the scheduled mode omits and why. Fail if they are dropped without mention.
