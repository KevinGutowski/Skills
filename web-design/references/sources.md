# Sources

This is a top-level provenance map for the web-design router.

## Reference map

- `web-typography.md` covers typography, font loading, scale, line length, OpenType, and related web type craft.
- `web-layout-design.md` covers grouping, alignment, logical properties/RTL, container queries, reflow, safe areas, and discoverable overflow. Platform mechanics are grounded in current MDN/W3C guidance; interface heuristics are attributed to Jakub Krehel's external skill collection.
- `apple-installed-web-apps.md` covers iOS/iPadOS Home Screen and macOS Add to Dock behavior. It adapts Joe Bell's production-oriented `apple-web-app` skill at revision `3c875dd53150e763d82da3516a8a0dde21adc8c7`, retaining current WebKit/Apple sources as authority and treating private device observations, community-derived Safari 26 thresholds, and version workarounds as re-test candidates. https://github.com/joe-bell/skills/tree/main/skills/apple-web-app
- `web-accessibility.md` covers semantic HTML, keyboard/focus, ARIA, contrast, screen readers, and audit/testing practices. Its hover-popup and loading-button bullets in §4 come from the Base UI docs (Tooltip, Context Menu, Preview Card, Button pages at 1.9.0, read 2026-11-18).
- Anton Sten, *Products People Actually Want* (2025 ebook, local attachment), corroborates `web-accessibility.md`'s situational-accessibility layer: one-handed use, no-audio contexts, bright/dark environments, stress, distraction, and designing for anyone rather than an abstract everyone.
- `web-animation-design.md` covers web motion values, easing, durations, springs, stagger, microinteractions, and reduced-motion handling. Its 2026-11 members — choreography, animation-performance, animation-vocabulary, gestures, motion-audit — plus the review method and build order adapt Emil Kowalski's open skills (https://github.com/emilkowalski/skills, MIT, rev `715c1807e08c497cfd1dc4feb450a2a3300ef2a9`, indexed at https://aiforui.dev/skills); per-file map in `web-animation-design/sources.md`, screening ledger in `docs/emilkowalski-skills-source-mining-2026-11.md`.
- `mobile-web-native-feel.md` covers mobile-browser platform fixes (hover, tap, viewport units, input zoom, overscroll, safe areas, keyboard). It adapts the `mobile-native` skill from the same repository and revision, with browser behaviour checked against MDN and three source claims narrowed in the file.
- `web-performance.md` covers Core Web Vitals, perceived performance, budgets, main-thread/offload decisions, and frame health. Its per-frame custom-property section carries a dated Base UI Scroll Area workaround for Safari (Dmytro / @pqoqubbw, X 2122725141285364024, 2026-11-17); per-source list in `web-performance/sources.md`.
- `form-design.md` covers field choice, layout, button weights, destructive friction, and form usability.
- `oklch-skill.md` covers OKLCH, palette generation, contrast, gamut/P3, and Tailwind theming.
- Jakub Krehel, *Interfaces* Cheat Sheet (https://interfaces.dev/cheat-sheet, Sep 2026; post https://x.com/jakubkrehel/status/2100605819238621632) — one-line web rules folded as deltas only: token discipline and gradient interpolation in `oklch-skill.md`; casing/underline/wrapping/truncation mechanics in `web-typography/opentype-and-micro.md` §13; `:focus-visible`, icon-only labels, `role="status"`/`role="alert"`, and the submit-error ARIA chain in `web-accessibility.md`; label/`inputmode`/never-block-paste in `form-design.md`; `scroll-margin-top` in `web-layout-design.md`. Product target sizes (44/40) are labeled as Krehel's product rule, not WCAG. Ledger: `docs/mining-ledger.md` 2026-09-18.
- Kevin Dukkon (@keviduk), *Sizing dropdown menus* and *Timing tooltips* (kevdu.co/reads, Nov 2026) — owned by `design-craft` (component-details). Here: a one-paragraph pointer under Reflow and content stress in `web-layout-design.md`, and a pointer from the tooltip-delay line in `web-animation-design/PRACTICAL-TIPS.md`. Ledger: `docs/mining-ledger.md` 2026-11-18.
- gokhan (@gkurttech), *CSS Little-Known* 13–16, a four-part scroll-snap series (X, 2026-11-12 to 11-15: alignment, padding/margin, strictness, `scroll-snap-stop`) — folded into `web-layout-design.md` → Scroll snap as a decision table plus traps checked in headless Chromium. Ledger: `docs/mining-ledger.md` 2026-11-22.
- `social-video-safe-zones.md` covers 9:16 platform chrome safe zones for social video.

## Promotion rule

Promote a new web rule only when it is source-backed, project-verified, or mechanically checkable. Browser APIs, Core Web Vitals thresholds, framework defaults, Tailwind behavior, installed-app metadata, device tables, and platform safe zones drift; verify those before final guidance.
