# Hand-written SVG illustration

Rules for the case where an agent must draw a spot illustration (an empty state, a 404, an onboarding card, a blog header) as SVG source, in an established style, with figures and props. Adapted from Meng To's illustration skills (MIT, `3cc9345`; [sources.md](sources.md)): one shared craft file plus fourteen style recipes, extracted from 42 cards that blind judges scored against commercial packs. The palettes, part kits, and style recipes were not imported.

**Single source.** Every number here is one author's, from his own cards and judges. Treat them as starting values and say so when quoting them.

## Contents

- Decide whether to draw at all
- The file contract
- Originality
- Hands
- Pose, contact, and anatomy
- Composition
- Techniques that transfer between styles
- The loop: render, compare, zoom, fix
- When another agent judges

## Decide whether to draw at all

Drawing figures in SVG by hand is the expensive, failure-prone option. Take it last.

1. **A real asset exists or can be commissioned or licensed:** use it. An illustration pack the product already owns sets the style; match it rather than inventing one.
2. **The picture is geometry:** a diagram, linework, a chart, an icon from a set. That is ordinary SVG work ([visual-execution.md](visual-execution.md), SVG mental model) and none of the figure rules below apply.
3. **The picture stands in for a photograph:** do not draw it. A scene drawn in SVG or CSS to pass as a photo reads as generated however much grain it gets.
4. **Otherwise,** draw it with this file, in one named style, with exemplars to match.

This reverses nothing in [anti-slop-catalog.md](anti-slop-catalog.md): its `shape-assembled-illustration` tell (sketchy scenes assembled from primitives, `feTurbulence` grain as decoration) describes illustration done without a style, exemplars, or this loop. The source itself disagrees internally: its site-building skills forbid model-drawn SVG, CSS, or canvas illustration and ask for generated or licensed cut-outs, while its illustration family does exactly that drawing under a strict loop. Read that as the condition: no style contract and no render loop, no hand-drawn illustration.

Routing: faux product screens → `faux-ui` (which does not draw illustration and sends that need here or to a real asset). Logos and marks → `logo-design`. Procedural or generative imagery → `creative-coding`. An icon system → `design-systems` (icon-systems).

## The file contract

An inline illustration shares a document with the page and with every other illustration on it. Each rule prevents a specific breakage.

| Rule | Breakage it prevents |
| --- | --- |
| One self-contained `<svg>` with a `viewBox`; the source draws 4:3 cards at 480 × 360 and sizes every stroke for that width | Stroke weights and detail that only hold at one size |
| No `<style>`, `class`, `<script>`, `<image>`, `<foreignObject>`, or external `href`/`url()`. Presentation attributes only | A `<style>` block in one inline SVG restyling the page and the other illustrations; class names colliding with the host's; failure inside a sandboxed embed. This does **not** protect the drawing from the host's CSS: see below |
| A short id prefix per illustration on **every** id: gradients, patterns, filters, clip paths, masks | Two inline SVGs both define `id="grain"` and the second silently renders with the first one's filter |
| A full-bleed background is a square `<rect>` with no `rx`; the page's container rounds the corners | A double radius with a sliver of page color at each corner |
| Text in a system stack; wordmarks and large lettering as paths; few words | Font substitution changing the drawing; a card that reads as a slide |
| Repeated marks (hatching, halftone dots, grass, wobbly outlines) come from a small **seeded** generator; the character and the hero object are hand-placed | A re-run that produces a different card; hand-typed repeats that drift |

**Presentation attributes lose to any CSS rule.** A `fill="…"` attribute has zero specificity, so a host stylesheet that says `path { fill: red }` or `svg * { stroke: currentColor }` repaints an inline illustration, and a reset that targets `svg` can resize it. The contract above keeps the illustration from leaking out; it does nothing to keep the page from leaking in. Choose by how much you control the page:

- **Isolation needed (unknown or third-party host CSS, CMS content, email):** embed the file with `<img src="card.svg">` or as a CSS background. The document's styles cannot reach inside. The costs: no `currentColor` theming, no styling from the page, and the file must be fully self-contained.
- **Inline, on a page you control:** keep host selectors off bare SVG elements. Scope icon rules to a class (`.icon path`, never `path`), and put the illustration in a wrapper the resets exclude.
- **Inline, on a page you do not fully control:** carry paint in the `style` attribute (`style="fill:#1f6feb"`), which outranks every author rule that is not `!important`. This is the one place the contract's "presentation attributes only" gives way.

Check it the cheap way: load the card into the real page and compare it with the standalone render.

A lint that checks the viewBox, the id prefix, the banned elements, and off-palette colors is cheap and worth writing for any set larger than a few cards.

## Originality

- Never trace or recompose a reference image, and do not reuse its poses, props, or layout. If the reference has a figure on a ladder at the left, yours does not.
- Before finishing, put the result beside every reference you looked at and ask whether someone would call it that picture redrawn. If so, recompose.
- Reusing the style's own stock props has a limit too: a card built from six props of an existing example read as that example rearranged. The isometric style's cap is three kit props from any one example.

## Hands

Hands are the first fault judges and designers catch, in every style.

- **Construction order:** cuff, tapered forearm, a wrist narrower than the hand, palm, fingers, thumb. Never a fist pasted on a sleeve, a mitten blob, or parallel stripes on a box.
- **Fingers** taper and differ in length: middle longest, little finger shortest and set lower. Group them; three or four visible is normal.
- **Size:** about as long as the face from chin to brow. Larger reads as a glove.
- **Grip:** fingers wrap, so the overlap order changes along the object; the thumb closes from the opposite face. Two hands on one bar are two fists with a gap.
- **Pointing:** index extended, the others curled with knuckles showing, thumb tucked over the middle finger. **Open:** fingers slightly spread, thumb out at about 45°.
- Draw finger separations the way the style draws edges: inner contours in an outlined style, gaps or tone steps in a flat one.

**Handedness.** Agents do not reason about which side the thumb is on unless made to, and a whole pass of hands was rejected for it. Before each hand, write down three things: left or right (trace the arm to its shoulder; overlap with the torso is the strongest cue), palm or back facing the viewer, and which way the fingers point.

| Hand | Side shown | Thumb, with fingers pointing up |
| --- | --- | --- |
| Right | back | left |
| Right | palm | right |
| Left | back | right |
| Left | palm | left |

Rotate the whole case for other finger directions. The index finger is always next to the thumb. A figure facing the viewer has its right hand on the viewer's left.

**Thumb proof:** in a throwaway copy, fill the thumb red and the index finger blue, render that hand at 8×, and compare with what you wrote down.

## Pose, contact, and anatomy

- **Weight.** A lean, bent knees, a torso twisted against a pull. Bolt-upright symmetry reads as clip art: a symmetric front-facing redraw of a pulling figure scored half a point to a point lower than the twisted one (the source's two files disagree: 7 to 6.5 in one, "a full point" in the other). The flat style leans its torsos 12 to 30°.
- **Sitting** needs the seat to take the weight: hips lower than knees on something soft, thighs foreshortened, the cushion compressed. Overlap the hips a few pixels onto the surface or the figure hovers.
- **Contact.** Feet on a ground line, objects on surfaces. Decoration that floats on purpose keeps clear of the figure (the flat style holds 20px).
- **No tangents.** Two contours that just touch read as a mistake. Overlap clearly or separate clearly.
- **Arms connect:** every hand traces back through a forearm and an elbow to a shoulder. Heads have necks.
- **Legs taper** from hip to ankle (the flat style: about 30, 22, 20 units at hip, knee, hem). Straight parallel trousers read as stiff.
- **Shin into shoe:** at the collar above the heel, never over the toe. With the foot flat, the shin leans at most about 20° from vertical; a foot tucked further back points its toe down. Both shins are about one length.
- **Furniture against the body:** check that a foot can reach the rung it is drawn on before putting it there.
- **Head scale belongs to the style.** A head nearly a third larger than the set's (45px where the set draws 35px) reads as a different set.

## Composition

- The group is centered with balanced margins; nothing touches the edge; no quadrant is empty.
- One focal point, readable in one glance at display size.
- Match the style's density. A sparse style with a cluttered card fails as surely as the reverse.
- Name the subject before drawing and make every prop serve it. A visual joke is tested at display size without its caption.
- If a large dark prop outweighs the figure, cap it (the flat style: about a sixth of the card) and break it with lighter detail.

## Techniques that transfer between styles

- **Keyline between same-color shapes.** Two overlapping shapes in one fill merge into a blob. Draw the front one's outline twice: a stroke about 3 units wider in the ground color under the shape in its own color (the flat style, on a white ground: white 11 under yellow 8 for stroked chain links, white 3 under a filled ladder rail).
- **Seam stroke.** Adjacent flat faces show a hairline crack at 2×. Give each face a thin stroke in its own fill color (0.35 in the isometric style).
- **Painter's order.** In an isometric or stacked scene, draw back to front (ascending x + y of each footprint). Split anything that passes both behind and in front of a neighbor into two draws. An open container takes three passes: the box and its dark opening, the contents, then the near walls and rims again.
- **One projection, one light.** Place every isometric point through a single projection function; never mix a 2:1 pixel grid or a perspective camera into it. All cast shadows go one way.
- **Ground everything.** Each object gets a cast shadow and each small one a dark contact pool. Without them every object looks pasted on.
- **Edge-gathered grain.** Uniform noise over a shape reads as TV static. Mask the grain to a band just inside each edge and weight it toward dark fills; keep faces and small details clean.
- **Tapered tubes** (a center line plus a width at each point, round caps) build limbs, tails, and folds more reliably than hand-typed outlines.
- **Light as paint, not glow.** In a painterly style, a radial glow or rim-light gradient looks digital; a pale cone at half opacity with speckle reads as light.
- **Hold the set's ground.** Two cards drawn on different background colors from the rest of their set scored 7; redrawn on the set's ground they scored 8.5 and 9. Put weather and night inside windows and screens.
- **Outline discipline.** A 1px stroke around one prop in an unoutlined style turns it into a different style. Separate with a value step instead.

## The loop: render, compare, zoom, fix

Work headless; reading the SVG source is not looking at the picture.

1. Render the whole card at 2×.
2. Put it on one sheet beside the style's exemplars. The question is **"same hand, same set?"**, not "is it nice?".
3. Zoom where faults hide, re-rendered from the vector rather than upscaled (the source uses 8× for hands and sets 3× as the floor): every hand, then faces, feet, and each contact point.
4. Check the read at display size.
5. Write a harsh critique, fix, re-render. The source expects three to four rounds, sometimes more, before a card honestly meets its bar.

Its scoring, for a repeatable bar: five criteria at 0, 1, or 2 each (style fidelity; character drawing; pose and physicality; composition; subject clarity and craft), with 8 of 10 required, framed as "would a buyer of a commercial pack accept this as a new card in it?"

## When another agent judges

- One judge varied by up to 1.5 points on the same render. Use two fresh judges and take the lower score.
- Absolute scores drift about a point between judges. To compare two versions, show one judge both, in random order.
- Give each card's own subject in the rubric, or later cards get marked against the first card's subject.
- Send a judge's notes back to the agent that drew the card. A fresh redraw rarely beats a focused fix.
- After fixing one element, diff the before and after renders and confirm only that element changed. If one part "was better before", restore that part and keep the other fixes.

The fresh-context judge itself is described in `design-prototyping` (agents-field-notes); these are the variance numbers one project measured for it.
