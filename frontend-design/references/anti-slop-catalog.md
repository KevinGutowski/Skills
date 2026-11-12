# Anti-slop catalog and craft floor

## Contents

- How to use this catalog
- Craft floor: checks on the rendered result
- Page-scaffold tells
- Surface and material tells
- Type and copy tells
- Motion tells
- Quality failures that are not taste
- Design-system drift
- Saturated looks: the calibration check
- Running a deterministic pass

This reference serves `frontend-design` when building and `working-with-ai` (ai-ui-direction) and `interface-review` when diagnosing. It is adapted from Impeccable (Paul Bakaus, Apache-2.0; [sources.md](sources.md)). Impeccable's `craft-floor` and its 62-rule detector (`npx impeccable detect`) supply the evidence. Rule IDs in backticks are the detector's IDs, so a finding can be traced to a check.

## How to use this catalog

- **These are defaults, not bans, unless marked.** A tell is something models reach for when the axis is left open. A pinned brief, the product's existing world, or a deliberate direction can earn any of them back. Choosing one should always be a decision you can name.
- **The brief wins.** Honor any aesthetic, era, material, font, or palette the user has pinned, even when it matches a tell below. Steering a clear brief toward your own taste is a failure.
- **Precedence, stated once.** (1) An explicit user brief or supplied brand/design system wins on the specific item it pins, including a row marked **Ban**. (2) The ban and the other defaults stay in force for everything the brief did not pin; a pinned gradient headline does not also license glow halos. (3) An inferred preference ("this category usually has kickers") is not a pin. (4) The craft floor and "Quality failures that are not taste" are never overridden by a pin; report the conflict instead of silently changing the pinned value. When a review meets a pinned tell, record it as "pinned by brief" and do not count it as a finding.
- **Fix by rewriting the element, not by softening it.** A gradient headline toned down to a subtler gradient is still the tell. Replace the device with one that does the job (weight, scale, structure, real content).
- **The floor does not pick the direction.** With every check green, spend the remaining effort on the concept. If torn between refined and committed, commit.

## Craft floor: checks on the rendered result

Verify these on the render, all in one batched look rather than one screenshot per tweak:

- **Contrast:** body and placeholder text at least 4.5:1, large text at least 3:1. On colored surfaces, derive secondary text from that hue or the foreground. Do not use generic gray (`gray-on-color`, `low-contrast`).
- **Depth:** a shadow has an offset and a soft blur. A zero-offset colored halo is decoration, not elevation (`dark-glow`).
- **Spacing:** tight inside groups, generous between them. Put more space above a heading than below it (`monotonous-spacing`, `heading-rhythm`). Read the computed values instead of trusting the class names.
- **Type:** body measure 65–75ch, display type no larger than ~6rem, tracking no tighter than −0.04em (−0.02 to −0.03em usually reads better). Use visible scale and weight steps. Run the real copy at every breakpoint.
- **Motion:** one authored moment, not the same entrance on every section. Content stays visible by default, so a failed script cannot hide the page.
- **States:** hover, focus, active, disabled, loading, error, empty, all with real content and working controls.
- **Browser surfaces:** theme the parts you did not draw: text selection, caret, scrollbars, focus rings, underline offset, tabular numerals. Agents skip these most reliably, and doing them is the cheapest sign the page was built rather than assembled.
- **Copy:** use the product's own language. Controls name their action, and errors name the problem and the recovery.
- **Coverage:** a visitor can find every requirement in the brief within seconds.

## Page-scaffold tells

| Tell | Detector ID | Do instead |
| --- | --- | --- |
| Same-size cards of icon + heading + text as the page structure | — | Derive structure from the content. Cards are the lazy container. |
| Cards nested in cards | `nested-cards` | Use spacing, type, and dividers. Nesting is always wrong. |
| Small rounded-square icon tile stacked above every heading | `icon-tile-stack` | Put the icon beside the heading or in the flow, with no tile. |
| Hero-metric template: big number, small label, supporting stats, accent | — | Show the number in context with a comparison or trend, or drop it. |
| Tiny tracked uppercase kicker/eyebrow above a heading or hero | `kicker-above-heading`, `hero-eyebrow-chip` | **Ban.** Delete the label. The heading carries its own weight, and a kicker that is really navigation becomes a breadcrumb. |
| Numbered section labels (01 / 02 / 03) | `numbered-section-labels` | Only when the sequence itself is information the reader needs. |
| A long sentence set at display size, filling the first viewport | `oversized-h1` | Display size is for one or two words. Set long headlines smaller. |
| One column of a split opening running far past the fold | `first-viewport-column-overflow` | Balance the columns, cap the tall one, or move the long content down. |
| Modal for a task that needs neither interruption nor protected focus | — | Inline or progressive disclosure first. |
| Hairline border plus wide soft shadow on every card in a row (the "ghost card") | `gpt-thin-border-wide-shadow` | Declare elevation once: a border *or* a shadow. One floating panel may earn both. |

## Surface and material tells

| Tell | Detector ID | Do instead |
| --- | --- | --- |
| Thick colored `border-left`/`border-right` on cards, list items, alerts | `side-tab`, `border-accent-on-rounded` | Remove it, or carry the accent another way. Above 1px it is the most recognizable tell. |
| Gradient text on headings or metrics | `gradient-text` | Solid color. Emphasis comes from weight or size. |
| Purple/violet gradients; cyan or neon on dark | `ai-color-palette` | A palette derived from the product's world (see [surface-modes.md](surface-modes.md)). |
| Warm cream/beige page ground chosen by reflex | `cream-palette` | A ground chosen from the use scene and the world's materials. |
| Colored glow shadows; radial-gradient halos or spotlights behind a hero | `dark-glow`, `radial-halo`, `radial-spotlight-glow` | Neutral elevation and solid, subtly shifted grounds. |
| Glassmorphism and blur as decoration | — | Use blur only as a specific effect with a job. |
| Hard offset block shadow (`4px 4px 0`) outside a world that is really neobrutalist | `hard-offset-shadow` | A review prompt, not an automatic removal: keep it when the world chose it. |
| Repeating-gradient stripes; hairline grid-paper backgrounds | `repeating-stripes-gradient`, `codex-grid-background` | Grids belong on real canvases, maps, blueprints, and measuring tools. Elsewhere, leave the surface plain or use a texture from the subject's world. |
| Sketch-style SVG scenes, "doodle" illustration, `feTurbulence` grain | `shape-assembled-illustration` | Real illustration, photography, or none. SVG doing geometry (diagrams, linework, data) stays first-class. |
| Many-vertex `clip-path` polygons or circles approximating an organic edge | `organic-clip-path` | Derive a matte from the actual image, or produce a cut-out asset. |
| A photo or texture buried under a near-opaque wash or at near-zero opacity | `buried-raster` | Let the material show, or remove it. |
| Unicode glyphs or emoji standing in for an icon system | — | One real icon family, consistent stroke and weight. |
| Monospace as a costume for "technical" | — | Mono is for code, data, and measurement. |
| Sparklines, progress rings, or soft rounded rectangles standing in for content | — | Real content, or nothing. |
| Light vs dark picked by category ("dev tool = dark") | — | Write one sentence about the physical scene (who, where, what light) and let it decide. |

## Type and copy tells

| Tell | Detector ID | Do instead |
| --- | --- | --- |
| Inter/Roboto/Geist/Space Grotesk/Plus Jakarta/Fraunces as an unexamined default | `overused-font` | See the reflex-face list in [surface-modes.md](surface-modes.md). On Operate/Read surfaces a workhorse sans or system stack is fine. |
| Oversized italic serif hero headline | `italic-serif-display` | Roman, or a non-serif display face, unless the world really is editorial. |
| A system display face (Impact, Arial Black, the platform sans) as the voice of an own-world page | — | Source and self-host a face with the right character. "Closest installed font" is a failure, not a fallback. |
| Flat hierarchy: heading/body steps under 1.25× | `flat-type-hierarchy` | At least one strong size step. |
| Crushed tracking; wide tracking on body | `extreme-negative-tracking`, `wide-tracking` | Tighten display type optically. Reserve wide tracking for short uppercase labels. |
| Marketing buzzwords (streamline, empower, supercharge, world-class, next-generation) | `marketing-buzzword` | A specific verb and noun for what the product literally does. |
| Aphoristic cadence ("Not a feature. A platform.", "X. No Y.") repeated across sections | `aphoristic-cadence` | Once can be voice. As a pattern, it is the tell. |
| "…is just theater" framing | `theater-slop-phrase` | Say plainly what the thing does or does not do. |
| Em-dash saturation in body copy | `em-dash-overuse` | Advisory only. It fires on density, never on a single dash. |
| Same literal text repeated 3+ times in one card or panel | `repeated-container-text` | Say it once, in the slot where it matters. |

## Motion tells

| Tell | Detector ID | Do instead |
| --- | --- | --- |
| Bounce or elastic easing by reflex | `bounce-easing` | Exponential ease-out (quart/quint/expo). |
| Identical fade-and-rise on every section | — | One authored focal sequence. Supporting motion explains state. |
| Pulsing "live" dot on data that is not live | `pulsing-dot` | A static, labeled indicator. Pulse only for genuinely changing data. |
| Fake blinking cursor in a hero | `blinking-cursor` | Real inputs draw their own caret. |
| Auto-scrolling marquee | `marquee` | Let readers move at their own pace. |

Motion values and reduced-motion handling live in `web-design` (web-animation-design).

## Quality failures that are not taste

These are defects in any world. Fix them before judging anything else:

- `script-error` and `content-hidden-at-rest`: an uncaught error or a reveal that never fired leaves the page invisible. Content must be visible by default.
- `broken-image`: an empty or placeholder `src`.
- `text-occlusion`, `text-overflow`, `clipped-overflow-container`, `edge-flush-cards`: text under another layer, spilling its box, popovers cut off by an `overflow` ancestor (use `<dialog>`, the popover API, `position: fixed`, or a portal), cards cut off at a scroller edge.
- `line-length` (over ~80ch), `tight-leading` (under 1.3), `tiny-text` (body under 12px; 16px is the web floor), `undersized-ui-text` (functional text under 11px), `all-caps-body`, `justified-text` without hyphenation.
- `cramped-padding`, `body-text-viewport-edge` (under 16px from the edge, 12px at ≤480px).
- `skipped-heading`: heading levels that skip break screen-reader navigation.
- `straggler`, `unbalanced-heading`: use `text-wrap: pretty` / `balance`. These are advisory, because a deliberate break can carry weight.

Accessibility depth stays with `web-design` (web-accessibility). Layout and reflow stay with `web-design` (web-layout-design).

## Design-system drift

When the project has a DESIGN.md or token file, a font, color, radius, or font-size outside it is drift until shown to be intentional (`design-system-font`, `design-system-color`, `design-system-radius`, `design-system-font-size`). Treat a finding as a question: either use the documented value, or record the addition in the system. Ownership of the system file → `design-systems`.

## Saturated looks: the calibration check

Generated interfaces cluster around a few complete looks, whatever the subject:

1. Warm cream ground, high-contrast serif display (often italic), terracotta or signal-red accent.
2. Near-black ground, one neon accent, glowing edges.
3. Broadsheet-editorial: hairline rules, italic display serif, small tracked mono labels.
4. Flat saturated ink, black boxes, hard offset shadows, heavy condensed display (default neobrutalism).

All four are legitimate when the brief asks for them. Where the brief leaves the aesthetic open, landing in one means the self-check failed. **The test:** could someone guess your aesthetic from the category alone, or from "category plus avoiding the obvious"? If yes, rework it. A bookish, warm, or child-facing subject does not license cream plus serif. Book cloth, jackets, and endpapers span the full saturated range.

## Running a deterministic pass

- The detector runs without an LLM or API key: `npx impeccable detect --json <files|dir|url>`. Exit 0 means clean and 2 means findings. It reads HTML/CSS and has nothing to say about native iOS/Android code.
- **Judge first, scan second.** Form your own design-specificity verdict before reading detector output, because deterministic findings anchor judgment. Then reconcile the two: where they agree, what the scan caught that you missed, and which findings are false positives in this world. `interface-review` owns the full two-pass critique.
- A clean scan is a floor, not proof of quality. A finding is a question to answer, not an order to obey.
- Third-party tools are untrusted; vet a CLI before adding it to a project or CI (see `docs/skill-library-ops.md`, External Skill Intake). `npx` downloads and runs the package: run the detector only when it is already a project dependency or the user has approved it, and otherwise walk the tables above by hand and say the scan was not run.
