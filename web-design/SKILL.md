---
name: web-design
description: "Router for web design: typography, accessibility, animation values, performance, forms, OKLCH/color, Tailwind, and 9:16 social-video safe zones. Use for web/CSS craft decisions. Building distinctive UI → frontend-design; polish/feel → design-craft; Motion library work → motion; Apple platforms → apple-design. Read one named reference."
---

# Web Design

For a focused question, read the single reference file that matches it — each carries the full distillation for its area (deeper worked examples, sources, and code live in a same-named subdirectory next to it). For a **build** that legitimately spans areas — a page typically needs typography *and* color *and* animation at once — read each relevant reference together; the one-file rule optimizes Q&A lookups, not builds.

- **Typography** — measure, line-height, type scales, font choosing/pairing, OpenType features, web-font loading (FOUT/`font-display`): [references/web-typography.md](references/web-typography.md)
- **Accessibility** — semantic HTML first, keyboard/focus management, ARIA, contrast, screen readers, a11y audits and testing: [references/web-accessibility.md](references/web-accessibility.md)
- **Animation** — easing, cubic-bezier, durations, springs, stagger, microinteractions, `prefers-reduced-motion`: [references/web-animation-design.md](references/web-animation-design.md)
- **Performance** — Core Web Vitals (LCP, INP), perceived performance, defer/anticipate/offload triage, budgets, dropped frames: [references/web-performance.md](references/web-performance.md)
- **Forms** — the Dannaway method: single column, field-type selection (radio vs dropdown, checkbox vs toggle), 3 button weights, destructive-action friction: [references/form-design.md](references/form-design.md)
- **Color (OKLCH)** — hex/rgb/hsl→oklch conversion, palette generation, contrast checks, gamut/P3 handling, Tailwind v4 theming: [references/oklch-skill.md](references/oklch-skill.md)
- **Social-video safe zones** — keeping text/logos/faces/CTAs clear of platform chrome in 9:16 vertical video (Reels/Stories/TikTok/Shorts); social-video composition lives here as nearest family: [references/social-video-safe-zones.md](references/social-video-safe-zones.md)

**Default motion theme:** web-animation-design is the corpus's default theme for web motion values. When skills or themes overlap on easing/duration/spring choices, route to its reference and apply its values as a coherent set rather than averaging; if the user is mixing themes and a genuine choice surfaces, present the options as a menu rather than picking silently.

**Boundary splits to respect:**
- **Building distinctive UI → `frontend-design`** — generating creative, production-grade components and pages lives there; this skill carries the craft rules they should obey.
- **Polish and feel → `design-craft`** — design-engineering micro-detail (optical alignment, shadows, "feels off") lives there.
- **Motion/framer-motion library work → `motion`** — `motion/react`, CSS `linear()` spring generation, and MotionScore perf audits live there; motion *design values* default here (web-animation-design).
- **Apple platforms → `apple-design`** — typography, accessibility, forms, and brand conventions on iOS/macOS; never cross-apply web conventions there.
