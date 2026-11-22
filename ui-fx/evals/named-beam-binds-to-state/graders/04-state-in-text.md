---
type: llm
focus:
  source: file
  path: components/Composer.tsx
weight: 1
---

You are shown the contents of components/Composer.tsx after the run. While streaming, visible text that does not depend on the beam or on motion says so (for example "Generating…"), and it remains when the beam is turned off for reduced motion. That text is rendered in a role="status" element (or an equivalent live region) that is not the button and not inside it. The Send-to-Stop button swap on its own, aria-busy on its own, or a visually hidden status region on its own, does not pass.
