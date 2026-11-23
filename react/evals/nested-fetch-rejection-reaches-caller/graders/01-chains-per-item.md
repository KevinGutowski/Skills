---
type: llm
focus: trace
weight: 1
---

Each chat's author lookup is chained off that chat's own promise (for example `getChat(id).then(chat => getUser(chat.author))` or an async function per id), so one slow chat no longer delays the other author lookups.
