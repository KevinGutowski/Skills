---
type: llm
focus:
  source: file
  path: components/Composer.tsx
weight: 1
---

You are shown the contents of components/Composer.tsx after the run. It has been edited so that: BorderBeam is imported from 'border-beam'; it wraps the composer's rounded form element (the form is the beam's direct child, or the code accounts for the radius another way, such as the documented `borderRadius` prop); the file still starts with the "use client" directive; and the existing behaviour is intact: the `useChat` import from ../lib/chat, the submit handler, the textarea, the message list, and the Send and Stop buttons are all still there.
