# Sources

This is a top-level provenance map for the web-design router.

## Reference map

- `web-typography.md` covers typography, font loading, scale, line length, OpenType, and related web type craft.
- `web-layout-design.md` covers grouping, alignment, logical properties/RTL, container queries, reflow, safe areas, and discoverable overflow. Platform mechanics are grounded in current MDN/W3C guidance; interface heuristics are attributed to Jakub Krehel's external skill collection.
- `web-accessibility.md` covers semantic HTML, keyboard/focus, ARIA, contrast, screen readers, and audit/testing practices.
- Anton Sten, *Products People Actually Want* (2025 ebook, local attachment), corroborates `web-accessibility.md`'s situational-accessibility layer: one-handed use, no-audio contexts, bright/dark environments, stress, distraction, and designing for anyone rather than an abstract everyone.
- `web-animation-design.md` covers web motion values, easing, durations, springs, stagger, microinteractions, and reduced-motion handling.
- `web-performance.md` covers Core Web Vitals, perceived performance, budgets, main-thread/offload decisions, and frame health.
- `form-design.md` covers field choice, layout, button weights, destructive friction, and form usability.
- `oklch-skill.md` covers OKLCH, palette generation, contrast, gamut/P3, and Tailwind theming.
- `social-video-safe-zones.md` covers 9:16 platform chrome safe zones for social video.

## Promotion rule

Promote a new web rule only when it is source-backed, project-verified, or mechanically checkable. Browser APIs, Core Web Vitals thresholds, framework defaults, Tailwind behavior, and platform safe zones drift; verify those before final guidance.
