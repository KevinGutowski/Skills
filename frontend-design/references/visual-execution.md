# Visual execution substrate

## Contents

- Core aesthetic decisions
- SVG mental model
- Repeating SVG patterns
- Demonstration, fonts, and content stress
- Fidelity survives implementation
- De-slop substrate
- Field tactics

This reference holds implementation texture for `frontend-design`. The parent skill owns mode, boundaries, output, and verification.

## Core aesthetic decisions

- **Typography:** choose context-specific type roles. Pair a distinctive display face with a readable body face when the concept warrants it.
- **Color:** use tokens and a dominant/neutral/accent relationship rather than an evenly distributed palette.
- **Composition:** choose a coherent spatial idea—controlled density, asymmetry, overlap, diagonal flow, or generous negative space.
- **Atmosphere:** use imagery, texture, gradients, borders, lighting, or grain only when they reinforce the concept.
- **Motion:** concentrate motion in a small number of meaningful moments. Do not add perpetual marquees or loops merely to signal polish.

Useful concept prompts include brutal minimalism, controlled maximalism, retro-futurism, organic/natural, luxury/refinement, playful/toy-like, editorial, brutalism, art deco, soft/pastel, and industrial/utilitarian. These are prompts for range, not styles to combine or defaults to repeat. Generic style lanes are weaker than candidates drawn from the audience's own world (its artifacts, publications, notation, places), and a model's favorite lane is its category default. Derive and assign directions with [surface-modes.md](surface-modes.md); check the result against the four saturated looks in [anti-slop-catalog.md](anti-slop-catalog.md).

## SVG mental model

- `viewBox` defines user-space coordinates independently of the rendered viewport; its `x y width height` values pan and scale the canvas.
- `preserveAspectRatio` combines a 3×3 anchor with `meet`, `slice`, or `none`.
- Path commands are operations: uppercase coordinates are absolute and lowercase coordinates are relative.
- Prepare animated assets before coding: name layers, keep groups consistent, remove excess anchors, and prefer one coordinated SVG when fragmented coordinate systems would make animation brittle.
- Vector assets still have intended optical sizes. Do not enlarge a small, chunky glyph merely because it remains sharp.
- For web icons, SVG is generally more flexible than icon fonts when sizing, color, and accessible treatment need independent control. Scoped exception: replacing a font-based set in a large codebase that references glyphs by codepoint — there, a codepoint-stable icon font makes the swap automatic; designing/governing a full product icon set routes to `design-systems` (icon-systems).

| Command | Letter | Effect |
| --- | --- | --- |
| Move | `M/m` | Move without drawing |
| Line | `L/l` | Draw a straight line |
| Quadratic / smooth | `Q/q`, `T/t` | Curve with one control point |
| Cubic / smooth | `C/c`, `S/s` | Curve with two control points |
| Arc | `A/a` | Draw an ellipse/circle segment |
| Close | `Z/z` | Return to the subpath origin |

## Repeating SVG patterns

Grid paper, dot grids, hatching, crosses, and checkerboards as background tiles.

**Gate first.** Hairline grid-paper and repeating stripes are named tells (`codex-grid-background`, `repeating-stripes-gradient` in [anti-slop-catalog.md](anti-slop-catalog.md)). A pattern earns its place when the subject's world has one: a canvas or editor dot grid, a blueprint, a measuring tool, ledger ruling, perforation, a print or textile motif. Otherwise leave the surface plain. When it does belong, it sits behind the content as atmosphere: start the layer near 15% opacity and check text contrast over the densest part. Hatching inside charts and diagrams is a data job → `data-viz`. A pattern that should answer the pointer (bars that swell, dots that gather) is a hover texture → `ui-fx` (textures).

**Picking one:** [Nucleo SVG Patterns](https://nucleoapp.com/svg-patterns/) (read 2026-11-18) is a free browser picker with 179 tiles in 32 families. You can stack tiles, set each layer's color and opacity, and copy a 48px SVG. Its terms allow personal and commercial project use. They forbid redistributing or reselling the tiles, and using them to build a competing library, pattern generator, or similar product. Ship a tile in a product, but don't vendor the set into a shared asset library, a generator, or this repo. The export is a bare tile with the color baked in. It also includes an opaque background rect (`#fafafa` at 100% by default). Set the Background opacity to 0% to export a transparent texture that layers over your own surface. You still write the CSS: data URI, `background-size`, and repeat.

**Building one.** These rules come from how Nucleo's tiles are built. [scripts/svg_pattern.py](../scripts/svg_pattern.py) applies them for grids, lines, dots, crosses, diagonals, and checkers. Its output is transparent unless you pass `--background`. It rejects spacings, dashes, and gaps that don't divide the tile. Regression tests are in `scripts/test_svg_pattern.py`.

1. **One tile, divisor periods.** All layers share one square tile, and every spacing divides it. Nucleo uses 48, which divides into 2, 3, 4, 6, 8, 12, 16, and 24, so any stack repeats without a seam. A 7px rhythm needs a tile that is a multiple of 7.
2. **An edge line belongs to one side.** Draw it at x 47–48 only, not at both 0 and 48. Otherwise the repeat doubles it at every seam.
3. **Snap to the pixel grid.** A 1px line is a filled rect on whole-pixel coordinates, or a stroke centered on a half pixel (`x=23.5`). A 1px stroke centered on a whole number renders as a 2px grey blur at 1x. The same goes for dashes: a gap under 1px is accepted, but at 1x it gets smoothed into a near-solid line. Use whole-pixel dashes and gaps for dotted lines.
4. **Wrap what crosses an edge.** A mark that straddles the tile edge gets a copy on the opposite edge, and the tile is clipped to its bounds. Marks anchored on the tile corner are cut at the container's top-left edge. To avoid that, center the lattice (half-period offset) or set `background-position`.
5. **`currentColor` dies in a data URI.** An SVG used as `background-image` is an isolated document and inherits nothing, so Nucleo's export replaces `currentColor` with the picked hex. For themed or dark-mode patterns, use the tile as a `mask-image` over `background-color: var(--token)` (`--format mask` in the script). Check library tiles for hard-coded fills: Nucleo's `x-grid-pixel` family uses `#0E0E0E` with no `currentColor`, so its color control can't recolor them.
6. **Encode the URI.** Inside `url("data:image/svg+xml,…")`, `#` must be `%23` because it starts a URL fragment and truncates the image. Quotes must be encoded too. Set `background-size` to the tile size explicitly.
7. **Inline copies share one id namespace.** Two inline SVG tiles with the same `clipPath` id collide. Data URIs are isolated. Inline tiles need unique ids (`--clip-id`), or use an SVG `<pattern>` fill.

## Demonstration, fonts, and content stress

The focal visual must truthfully demonstrate the product mechanic. Calendars need a consistent time axis; data displays need internally consistent numbers. A blind A/B evaluation in this corpus found that a distinctive page lost to a plainer one because its hero artifact failed inspection.

Resolve distinctive type versus artifact constraints in this order:

1. Self-host or embed a licensed/open font when the build permits it.
2. Use an allowed network font dependency when distinctiveness matters and offline operation does not.
3. Use a characterful system stack only when the artifact must be both single-file and zero-network.

Production layouts must survive real content, localization expansion, and user font-size overrides. Do not size containers around ideal-length English.

## Fidelity survives implementation

Prefer visual ideas that can be implemented faithfully, then inspect the live result at real size. A production artifact that drops the intended lighting, states, responsive fit, or motion remains unfinished.

- Re-engineer design-tool effects when a literal translation would be expensive. Preserve the appearance and interaction, not the authoring technique.
- A progressive blur is one example: a radial-gradient base and inset shadows may reproduce the intended edge more cheaply than a live blur. Treat this as a technique to test, not a universal recipe.
- Consolidate near-duplicate font families when their loading cost outweighs the difference.
- Treat unsupported effects such as cross-browser corner smoothing as a budget choice: provide a fallback, use SVG/masking deliberately, or simplify.
- For custom SVG animation, keep layer hierarchy legible and check for layout thrashing.

## De-slop substrate

- Build standard controls on proven accessible primitives, then theme them by hand.
- Seed the brand and token system early so generation composes the project's language rather than defaults.
- Convert visual references into observable constraints—type roles, focal-mass count, neutral/accent ratio, radius/shadow rules, and explicit bans—instead of relying on adjectives such as “premium.”
- Treat every reference corpus as evidence; do not inject the taste of a different corpus.
- When directing another agent, give exact project-local token values and state lists only when evidence or the existing system supplies them. “Smooth” alone is not buildable.
- A global `min-width: 0; min-height: 0` flex/grid reset can prevent intrinsic-size overflow, but introducing it to an existing project requires regression testing.

## Field tactics

- Strong imagery multiplies the design; source or create it deliberately.
- For an image fade into a section, sample the boundary color and blend with a matching gradient rather than leaving a visible band.
- For a light band around an image, raising highlights and testing a multiply blend can remove the seam; verify the result across the actual image set.
- Bring a concrete end state and iterate one concern at a time; a one-shot request with no product vision produces arbitrary styling.

Bibliographic mapping lives in [sources.md](sources.md). Original practitioner wording, named examples, and evidence context live in [visual-field-notes.md](visual-field-notes.md).
