---
type: llm
focus:
  source: file
  path: components/Composer.tsx
weight: 1
---

You are shown the contents of components/Composer.tsx after the run. Every prop passed to BorderBeam is one the published border-beam 1.4.1 API accepts, with a valid value. The accepted props are: `size` ("sm", "md", "line", "pulse-outside", "pulse-inner"); `colorVariant` ("colorful", "mono", "ocean", "sunset", "forest", "candy", "ice", "gold"); `theme` ("dark", "light", "auto"); `active` (boolean); `strength` (number 0 to 1); `duration`, `borderRadius`, `brightness`, `saturation`, `glowSize`, `hueRange` (numbers); `staticColors` (boolean); `css` (string); `onActivate`, `onDeactivate` (functions); `children`; and ordinary wrapper attributes (`className`, `style`, `id`, `data-*`, `aria-*`, `ref`). Any other prop name, or a value outside these, fails. (List taken from the `BorderBeamProps`, `BorderBeamSize`, `BorderBeamColorVariant` and `BorderBeamTheme` declarations in border-beam 1.4.1's dist/index.d.ts; re-derive it when the pinned version changes.)
