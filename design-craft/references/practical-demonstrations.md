# Practical Demonstrations — the refinement vocabulary

The full move lists from Josh Puckett's Interface Craft practical-demonstration walkthroughs (`/library?collection=practical-demonstration` on interfacecraft.dev), distilled to one-line rules in `SKILL.md`. Read this when auditing a visual language, restructuring a mobile app, or looking for what the next level of depth looks like on a single component.

Eight worked walkthroughs applying the principles. The recurring critique/refinement moves:

**Visual-language audit moves** (Refining Today / Presscut):
- Count the **implicit vertical rules** — more than ~2 left-edge alignment lines reads as disorder; consolidate to one content edge.
- **Unify icon families**: one stroke width, one fill style, one color treatment across the interface.
- **Tokenize metadata**: style category labels/secondary data as visually distinct tokens so they never read as user content.
- **Standardize one divider treatment** — or try removing dividers entirely and see if spacing carries it.
- Merge sibling cards into one container ("they're effectively all siblings"); reserve the display font for the page title only — using it on every section header dilutes it; lighten strokes; fix three-line stat cards by inlining the supporting value.
- **At summary altitude, progressively disclose**: don't stuff overview tables with every column — the row click is the details view. Replace cramped inline progress bars with **row-background fills** (same information, calmer).

**Architecture exercise** (Redesigning a Mobile Web App, parts 1–3): start from "what would default iOS give us" (tab bar + table views) → *evaluate* the default against the product (chat/profile weren't peers → header + composer) → explore structures that keep grouping without tap-in friction (phase accordion auto-expanded to the current phase; completed phases collapsed behind a card stack) → sheets over pushes for short tasks (anchored, fluid, tight feedback loop). Define **guiding attributes first** (trustworthy/calming/confident), then derive every visual decision from them: system body font ("undesigned in a good way"), display serif chosen by attribute-fit (Source Serif: modern authority), **corner radius as the technical↔friendly dial**, sharp icons counterweighting soft shapes, warm neutrals + one hopeful accent, blur instead of strokes, and **language warming** ("Form Preparation" → "Your Paperwork"). One primary action per step; time estimates + "what you'll need" reduce anxiety.

**Depth-spectrum exemplars**:
- *The Ultimate Slider*: full-bleed track as its own container → subtle hover-only handle (scales in on x) → track brightens on presence → value **dodges** the handle → handle clamps at extremes → hover-only hash marks → **snap-to-deciles on click only** (generous targets; drags stay precise) softened by a spring → value becomes editable after an 800ms hold → **rubber-banding past bounds with a dead zone**. Each step "communicates we're thinking about your experience."
- *v0 Gift Card*: layered pseudo-realism (two grain layers, halftone, holographic parallax, cursor-following specular, spotlight mask to constrain intensity), scratch-off via canvas-generated CSS mask with custom SVG brushes, an animated **gesture hint that exits on first hover**, and **round-robin sound variations fired every ~40 dragged pixels** so audio feels organic, not looped.
- *Library Cards*: the **constrained-customization pattern** — never hand users a raw color picker ("room to make an ugly card"); curate the palette, then expose one perceptual **"brilliance" slider** that moves H/S/L together along always-good values. For multi-parameter generative controls, drive all parameters from one slider mapped along a **Lissajous curve projected in 3D** (huge expressive range from one fidgetable control; linear mapping fallback on mobile). Agency within a curated range.

*(Interface Kit collection: Josh's visual editor — click any element, tweak style/typography/layout visually, "Copy as prompt" exports a diff for your coding agent; npm `interface-kit`, dev-only. Video walkthroughs. Reference Desk: curated classics — Bret Victor ×4, Eames Q&A, Wilson Miner "When We Build", Frank Chimero, Dive Club, First of Kind — future source list.)*
