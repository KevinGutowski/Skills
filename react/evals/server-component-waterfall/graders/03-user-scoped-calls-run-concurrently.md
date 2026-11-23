---
type: llm
focus: trace
weight: 1
---

In the revised code, the calls that need the session's user id (projects, activity, billing) run concurrently with each other rather than one after another, and none of them is called before the user id is available.
