# Sources

This is a top-level provenance map for the web-design router.

## Reference map

- `web-typography.md` covers typography, font loading, scale, line length, OpenType, and related web type craft.
- `web-layout-design.md` covers grouping, alignment, logical properties/RTL, container queries, reflow, safe areas, and discoverable overflow. Platform mechanics are grounded in current MDN/W3C guidance; interface heuristics are attributed to Jakub Krehel's external skill collection.
- `apple-installed-web-apps.md` covers iOS/iPadOS Home Screen and macOS Add to Dock behavior. It adapts Joe Bell's production-oriented `apple-web-app` skill at revision `3c875dd53150e763d82da3516a8a0dde21adc8c7`, retaining current WebKit/Apple sources as authority and treating private device observations, community-derived Safari 26 thresholds, and version workarounds as re-test candidates. https://github.com/joe-bell/skills/tree/main/skills/apple-web-app
- `web-accessibility.md` covers semantic HTML, keyboard/focus, ARIA, contrast, screen readers, and audit/testing practices.
- Anton Sten, *Products People Actually Want* (2025 ebook, local attachment), corroborates `web-accessibility.md`'s situational-accessibility layer: one-handed use, no-audio contexts, bright/dark environments, stress, distraction, and designing for anyone rather than an abstract everyone.
- `web-animation-design.md` covers web motion values, easing, durations, springs, stagger, microinteractions, and reduced-motion handling.
- `web-performance.md` covers Core Web Vitals, perceived performance, budgets, main-thread/offload decisions, and frame health.
- `form-design.md` covers field choice, layout, button weights, destructive friction, and form usability.
- `oklch-skill.md` covers OKLCH, palette generation, contrast, gamut/P3, and Tailwind theming.
- Jakub Krehel, *Interfaces* Cheat Sheet (https://interfaces.dev/cheat-sheet, Sep 2026; post https://x.com/jakubkrehel/status/2100605819238621632) — one-line web rules folded as deltas only: token discipline and gradient interpolation in `oklch-skill.md`; casing/underline/wrapping/truncation mechanics in `web-typography/opentype-and-micro.md` §13; `:focus-visible`, icon-only labels, `role="status"`/`role="alert"`, and the submit-error ARIA chain in `web-accessibility.md`; label/`inputmode`/never-block-paste in `form-design.md`; `scroll-margin-top` in `web-layout-design.md`. Product target sizes (44/40) are labeled as Krehel's product rule, not WCAG. Ledger: `docs/mining-ledger.md` 2026-09-18.
- `social-video-safe-zones.md` covers 9:16 platform chrome safe zones for social video.

## Promotion rule

Promote a new web rule only when it is source-backed, project-verified, or mechanically checkable. Browser APIs, Core Web Vitals thresholds, framework defaults, Tailwind behavior, installed-app metadata, device tables, and platform safe zones drift; verify those before final guidance.
