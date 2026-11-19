---
type: llm
focus: trace
weight: 1
---

The response gives a corrected procedure that scores only after the review data has rendered, using a condition that is true only then (the review items exist, text from the data is present, or an app-ready signal), and compares before and after. Fail if the only readiness step is a fixed delay, the load event, or waiting for a heading, container or placeholder that could be present before the data arrives.
