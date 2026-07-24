# Visual execution substrate

## Contents

- Core aesthetic decisions
- SVG mental model
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

Useful concept prompts include brutal minimalism, controlled maximalism, retro-futurism, organic/natural, luxury/refinement, playful/toy-like, editorial, brutalism, art deco, soft/pastel, and industrial/utilitarian. These are prompts for range, not styles to combine or defaults to repeat.

## SVG mental model

- `viewBox` defines user-space coordinates independently of the rendered viewport; its `x y width height` values pan and scale the canvas.
- `preserveAspectRatio` combines a 3×3 anchor with `meet`, `slice`, or `none`.
- Path commands are operations: uppercase coordinates are absolute and lowercase coordinates are relative.
- Prepare animated assets before coding: name layers, keep groups consistent, remove excess anchors, and prefer one coordinated SVG when fragmented coordinate systems would make animation brittle.
- Vector assets still have intended optical sizes. Do not enlarge a small, chunky glyph merely because it remains sharp.
- For web icons, SVG is generally more flexible than icon fonts when sizing, color, and accessible treatment need independent control.

| Command | Letter | Effect |
| --- | --- | --- |
| Move | `M/m` | Move without drawing |
| Line | `L/l` | Draw a straight line |
| Quadratic / smooth | `Q/q`, `T/t` | Curve with one control point |
| Cubic / smooth | `C/c`, `S/s` | Curve with two control points |
| Arc | `A/a` | Draw an ellipse/circle segment |
| Close | `Z/z` | Return to the subpath origin |

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
