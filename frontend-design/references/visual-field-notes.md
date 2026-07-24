# Visual execution field notes

## Contents

- Why this file exists
- SVG source texture
- Truthful demonstrations and content stress
- Design-to-code fidelity
- De-slop practitioner evidence
- MDS field tactics

## Why this file exists

This is the preservation layer for source texture removed from the `frontend-design` hot path. Load `visual-execution.md` for decisions; load this file when exact provenance, original wording, named examples, or a disputed interpretation matters. These are practitioner accounts and corpus evidence, not universal standards.

## SVG source texture

Dan Hollick, *Making Software*, describes `viewBox` as “a way of overriding the default coordinate system for the SVG by creating a user space coordinate system.” Its `x y width height` values pan and scale an effectively infinite canvas. `preserveAspectRatio` combines a 3×3 anchor with `meet` (fit), `slice` (fill and crop), or `none` (non-uniform scaling).

Hollick’s useful parsing model is that path letters are “basically a function call,” with the following numbers as parameters. Uppercase commands use absolute coordinates; lowercase commands use deltas from the previous position and can compress more efficiently.

Mailchimp’s *The UX Reader* says “layer hierarchy is key” for scripted vector animation. Name layers, keep frame groups consistent, remove excess anchors, and deselect Illustrator’s editing-capability payload on final export. One coordinated SVG can be safer than fragments when separate viewports would make transitions brittle; JS-driven animation still needs a layout-thrashing check.

Wathan and Schoger’s *Refactoring UI* warns, “Don’t scale up icons.” A small SVG remains sharp when enlarged but can look optically chunky and under-detailed. Keep the glyph near its intended size inside a larger shape when a larger target is needed. Santa Maria’s *On Web Typography* calls SVG the more flexible web-icon solution when sizing, color, and accessibility need control.

## Truthful demonstrations and content stress

A blind A/B evaluation on 2026-06-11 found that a visually distinctive page lost to a plainer candidate because its hero artifact was false under inspection. The critique was that the polish was surface-level “in exactly the place that matters most.” This is the evidence behind the parent skill’s truth decision: a calendar must align events to its real time axis and displayed data must be internally consistent.

The original corpus used Yablonski’s *Laws of UX* localization warning that compact English text may expand dramatically in another language, plus Amazon’s header behavior under user font-size changes. The durable rule is to stress real content and text scaling rather than treating the quoted percentage as a universal layout constant.

The font-source hierarchy resolves a real conflict:

1. Self-host or embed a distinctive licensed/open font when the build permits it.
2. If the brief permits a network dependency, a foundry or Google Fonts link can serve the concept.
3. If the artifact must be both single-file and zero-network, use a characterful system stack such as `ui-serif, Georgia`.

The earlier categorical “never system fonts” wording described an aesthetic ceiling, not a standard. The hierarchy above states the scoped decision.

## Design-to-code fidelity

Derek Briggs’ recurring principle is: “Users don't see your Figma design files, so they're only as good as their implementations. Sweat the details in the code too.” His UI Engineering 101 material focuses on translating high-fidelity components into HTML/CSS while retaining layout, states, SVG motion, concentric radii, stacked shadows, and elevation highlights.

Briggs’ progressive-blur example distinguishes visual intent from implementation technique. A blur authored directly in a design tool may be expensive in production; he describes rebuilding the effect with a radial-gradient base and inset box-shadows, including negative spread to recover a sharp edge. This is an example, not a required CSS recipe.

His feasibility checks also include:

- consolidate near-duplicate font families when their loading cost buys little visible difference;
- budget explicitly for Figma corner smoothing, because `corner-shape: superellipse` support was incomplete when the source was recorded;
- use masks/SVG where warranted, or simplify to ordinary radii;
- inspect the live artifact at real size instead of declaring fidelity from the source file.

Browser-support statements are dated practitioner observations; verify current support before using them as implementation facts.

## De-slop practitioner evidence

Ryo Lu’s Cursor interviews supply the primitive/theme split:

- use established primitives such as shadcn/Radix for standard controls because existing patterns give agents a reliable behavioral substrate;
- theme the visual layer by hand;
- robust tokens and components make AI composition more reliable;
- recurring slop tells include massive shadows, purple gradients/buttons, and an arbitrary default icon set.

Lu’s system-font fallback was a safe floor when unsure, while this skill asks for a more distinctive ceiling when project constraints allow it. Those are compatible only when scope is stated.

Ron Goldin’s corroborating rule is to establish branding and differentiation early, once the product is understood, so later generation extrapolates the project’s language instead of generic defaults.

The Jaytel Taste corpus supports reference-derived constraints over adjectives. Extract observable properties—focal-mass count, neutral/accent ratio, type roles, radius/shadow rules, incidental content, and anti-collapse bans. Its tests explicitly guard against injecting the tool’s neutral-UI taste into unrelated source material.

Kevin Kold’s prompting example argues that “smooth” is not directly implementable. Exact curves, durations, distances, blur, press scale, shadow layers, radius tokens, and state lists are useful when they come from the project or accepted reference. Iterate one concern at a time so an agent does not compensate with unrelated changes.

Briggs recommends the following intrinsic-size reset for new flex/grid work:

```css
*, ::after, ::before {
  min-width: 0;
  min-height: 0;
}
```

His source warns that applying it to an existing project can create regressions. It is a scoped practitioner heuristic, not a platform standard.

## MDS field tactics

Matt D. Smith’s Shift Nudge material contributes four practical observations:

- a well-made typeface can materially strengthen brand distinctiveness;
- strong imagery is a multiplier, so photography and illustration quality deserve deliberate sourcing;
- an image can fade into a section by sampling its darkest boundary color and overlaying a matching gradient;
- raising highlights and testing `mix-blend-mode: multiply` can remove a visible white band in suitable images.

Smith’s “dream home” analogy is the evidence behind vision-first iteration: a tool cannot infer a concrete end state from an underspecified one-shot request. Bring a destination, then explore deliberately.

Source URLs, episode IDs, and bibliographic details remain indexed in [sources.md](sources.md).
