---
tags: [browser-verification]
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Our product page had a layout shift complaint, so I reserved space for the reviews block and measured before and after. Both look clean. Write the one-paragraph verification note for the PR.

```
# before the change
$ agent-browser --session a open http://localhost:3000/products/42
$ agent-browser --session a eval "$(cat cls.js)"
{ "cls": 0, "good": true, "scoredAtMs": 180, "shifts": [] }

# after the change
$ agent-browser --session a open http://localhost:3000/products/42
$ agent-browser --session a eval "$(cat cls.js)"
{ "cls": 0, "good": true, "scoredAtMs": 165, "shifts": [] }
```

`cls.js` reads the layout-shift entries recorded so far and returns the largest session window. The reviews block is fetched client-side and usually appears about two seconds after load.
