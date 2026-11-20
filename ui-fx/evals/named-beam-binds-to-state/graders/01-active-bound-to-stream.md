---
type: llm
focus:
  source: file
  path: components/Composer.tsx
weight: 1
---

You are shown the contents of components/Composer.tsx after the run. A BorderBeam element is present and its `active` prop (or the condition under which it is mounted) is driven by `isStreaming`, not left always on and not driven by a timer alone. (A timer that only stills or softens the beam during a long stream is fine.)
