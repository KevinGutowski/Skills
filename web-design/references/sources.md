# Sources

This is a top-level provenance map for the web-design router.

## Reference map

- `web-typography.md` covers typography, font loading, scale, line length, OpenType, and related web type craft.
- `web-accessibility.md` covers semantic HTML, keyboard/focus, ARIA, contrast, screen readers, and audit/testing practices.
- `web-animation-design.md` covers web motion values, easing, durations, springs, stagger, microinteractions, and reduced-motion handling.
- `web-performance.md` covers Core Web Vitals, perceived performance, budgets, main-thread/offload decisions, and frame health.
- `form-design.md` covers field choice, layout, button weights, destructive friction, and form usability.
- `oklch-skill.md` covers OKLCH, palette generation, contrast, gamut/P3, and Tailwind theming.
- `web-sound.md` covers UI audio feedback on the web: appropriateness defaults, accessibility gating, HTMLAudio/AudioContext playback, and Web Audio synthesis recipes (Raphael Salaja's skill library; philosophy layer lives in `swiftui` (sound-design)).
- `social-video-safe-zones.md` covers 9:16 platform chrome safe zones for social video.

## Promotion rule

Promote a new web rule only when it is source-backed, project-verified, or mechanically checkable. Browser APIs, Core Web Vitals thresholds, framework defaults, Tailwind behavior, and platform safe zones drift; verify those before final guidance.
