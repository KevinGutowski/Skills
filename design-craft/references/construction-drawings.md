# Construction drawings (flat line illustration)

A house style for explanatory illustration: flat, monochrome, thin-line drawings in the manner of a technical plan, delivered as editable SVG. Use it when the product's one empty-state style is Illustration or Spot ([component-details.md](component-details.md) → Empty states), and for 404 pages, feature heroes, docs and README figures. The method is Pasquale Vitiello's Plotter (2026), paraphrased; lines marked "ours" are this library's additions. Worked example, full and compact: [`../examples/construction-drawing-empty-state.html`](../examples/construction-drawing-empty-state.html).

**Not for:** data charts (`data-viz`), icon sets (`design-systems`), isometric or shaded art, generative sketches (`creative-coding`), interface motion (`web-design` (web-animation-design)), or drawings that must certify real engineering.

## Contents

- The three rules that decide the drawing
- Numbers
- The marks, and what each one means
- Workflow
- Small placements: derive, never redraw
- In an empty state
- Faults to catch
- Animating a drawing
- Getting the upstream package
- Scoped conflicts
- Sources

## The three rules that decide the drawing

1. **One relationship, named before drawing.** Write it as a sentence: what aligns, fits, overlaps, repeats or is missing. "Search" or "agents" is a subject, not a composition. Typical relationships are alignment, proportion, assembly, routing, tangency and intersection.
2. **An object is never a sign for an idea.** A magnifier for search, a bell for notifications or a gear for settings names the concept and explains nothing, however many dimension lines surround it. Draw the structure the concept works on and what happens to that structure: an ordered index with one position unfilled, a stream whose next slot is open, a route that stops one unit short. Draw an object as the main form only when the brief *is* that object, and then show how its shape is built. A glyph may appear inside a UI fragment at its real size (a magnifier inside a search field).
3. **The drawing must read with every supporting mark removed.** Main form first, construction second, sparse dimensions and labels third. For each guide, arrow, hatch, grid or dimension, name the relationship it explains. If removing it leaves that relationship just as clear, remove it.

Give absence a structural consequence. A missing thing is drawn as the gap it leaves in something regular, which is why this style suits empty and not-found states.

## Numbers

Compose on a `560 × 440` viewBox at any display size. Lengths are SVG units.

| Role | Opacity | Pattern |
| --- | ---: | --- |
| Primary form; a stated section cut | 1 | continuous |
| Secondary form, dimension, leader | 0.32 | continuous |
| Hidden, absent or proposed outline | 0.32 | `3 5` |
| Movement or transfer shaft | 0.32 | `4 6` |
| Hatch | 0.18 | continuous, 12-unit pitch along an edge, at −45° |
| Reference guide | 0.14 | continuous |
| Centerline, axis, pitch circle | 0.14 | `8 3 1 3` |
| Grid | 0.06 | continuous |
| Region highlight | `fill-opacity` 0.055 | one translucent fill of the ink colour |

- **One ink, one weight.** Every stroke is 1 unit in `currentColor`. Opacity sets the hierarchy and a dash pattern carries a meaning. Never thicken a line for emphasis, and never pick a dash because it looks technical.
- **Flat only.** Plan, elevation or a conceptual plane. No perspective, isometric depth, skew, gradients, shadows or lighting.
- **Transparent forms.** Shapes are `fill="none"` so the drawing reads on any page colour. The only fill is the region highlight, on a named selection, intersection or result, painted once.
- **Labels are small, regular and quiet.** Editable `<text>`, weight 400, 10–12 units, 0.72 ink for names and 0.5 for values and notes, with `stroke="none"` (text inherits the drawing's stroke and reads as bold otherwise). Never bold, full ink, all caps, letter-spaced, italic or upside down. Typeset punctuation (’ – − “ ”). No title block or sheet number.
- **Arrowhead:** two solid 6-unit legs at 45°, solid even on a dashed shaft, touching the shaft's last dash.
- **Dimension:** 8-unit slashes at the witnesses, at least 3 units clear around every label's glyphs. A guide that does not connect to a contour stops 8 units short of it.
- **Tolerance:** derive equalities exactly from named parameters and round only when writing the file (0.05 unit, 0.1°).

## The marks, and what each one means

| Mark | Use it when | Not for |
| --- | --- | --- |
| Region highlight | One named selection, overlap or result needs singling out | Tinting the subject; a region hatching already explains |
| Hatch | One bounded region or a stated cut; one angle and pitch per region, clipped to it | Texture, lighting, or implying a material |
| Grid | It reveals a shared module the forms actually sit on | Background because the subject is geometric |
| Arrow | Something moves or transfers | Alignment or equal size (use a projection or a dimension) |
| Callout (leader + label) | A part cannot name itself by shape | Restating what the form shows |
| Projection guide | It joins the same feature before and after, exactly | Endpoints that are merely near each other |
| Dimension, radius leader | It measures between two real witnesses and explains the construction | A chain along every edge; keep two or three |
| Centerline, pitch circle | Symmetry, rotation or repeated placement around one centre | A dashed line that does not pass through what it organizes |
| Dashed outline | Hidden, absent or proposed geometry; label which if more than one is present | Decoration |

Two rules hold across all of them:

- **Dimensions tell the truth.** Compute the label and its witnesses from the same geometry. A 240-unit span labelled 200 is an error. A corner labelled `R` is a true circular arc, not a Bézier that resembles one. Use one local unit `u` per drawing.
- **One owner per edge.** Where two forms share a segment, draw it once.

**Bound the claim.** A drawing is a geometric construction, a physical view, a functional schematic or a conceptual diagram. Most product drawings are conceptual: keep a short mapping (depicted object → product concept, line → relationship, what is left out) and do not let equal lengths imply guarantees the product does not make. Verify product behaviour against the product's own docs before drawing it.

## Workflow

1. **Establish.** Subject, placement and display size, deliverable, and the one relationship. If the brief names an idea with no form ("agent handoff") and the user can be asked, draw three nearly finished options, each a *different* relationship, on one numbered sheet and let them pick or combine. Skip this for a specific brief or a refinement.
2. **Compose.** Place the main forms and essential labels before any supporting mark. Keep the focal form near the centre with quiet space around it.
3. **Object and shape studies need the construction.** An outline with a width and a height shows what the reader already knew. Add the layers the form really has: axes through each centre, the generating circle and radius for each curve, node marks at tangent points, a module with one dimension naming `u`, two or three dimensions in that unit, one or two callouts.
4. **Write editable SVG.** Named parameters for geometry, `currentColor` ink, `<title>` and `<desc>` on a standalone drawing (`aria-hidden` when adjacent copy carries the meaning). For a component, compose and inspect the SVG first, then translate it.
5. **Check, render, look.** Check the file against the rules above, render it at native size, at the size it will be shown, and in both themes, and inspect the result. Repeat after the last edit; a drawing changed since its render has not been inspected. Without a render, report the visual review as pending.
6. **Report** the files, the relationship in one or two sentences, what was rendered and looked at, and what was not checked.

## Small placements: derive, never redraw

Below about 400px wide, 11-unit labels fall under 8px and the full drawing stops reading. Redrawing the idea on a small canvas produces an icon. Finish the `560 × 440` drawing, then derive a compact version from the same geometry:

- Keep the main forms and the one mark that carries the idea. Remove labels, dimensions, grids and guides that cannot be read at the target size. Text is removed, never shrunk.
- Crop the `viewBox` to the kept forms with about 16 units of margin, in the drawing's own coordinates. Do not rescale or redraw.
- Put `vector-effect="non-scaling-stroke"` on every stroked element so strokes stay one pixel wide. Dashes are then measured in screen pixels: use `2 2` where the full drawing used a longer dash.
- Render at the target width and confirm each kept form is still distinct. Deliver both files and say which is which.

## In an empty state

- **It fills the Illustration or Spot slot only.** The component rules in [component-details.md](component-details.md) still apply: one style across the product, keep the visual small, card size drops the visual, inline is text only, never show it while loading.
- **Draw the cause.** The relationship comes from the cause table in `user-onboarding` (empty-states), not from the feature's icon:

  | Cause | Relationship to draw |
  | --- | --- |
  | No results | A query projected onto an ordered set; the matching position is outlined and unoccupied |
  | All done | A stream of handled items; the next position is open |
  | First use | The container and its module are built; the first item's place is marked |
  | No data in range | Calibrated axes or a time field, with a selected range that holds nothing |
  | Not found (404) | A route or structure that stops one unit short, or lacks one member |
  | No permission | A boundary that interrupts a route |

- **Use the compact version** for a visual under about 400px; keep the full drawing for a first-use page or a 404.
- **Keep counts out of the labels** (ours). The source's own empty-state drawings carry notes such as "0 matches"; the zero-count rule in `user-onboarding` (empty-states) wins, so write the note in words or leave it to the title.
- **The drawing never replaces the copy.** Title, one line and the action still do the three jobs.

## Faults to catch

The source lists these as faults its own skill produced. Look for them in the render.

- A line running through a label, including a dimension through its own value. Split the line or move the label.
- A dimension on every part.
- An object standing in for a concept.
- A small size answered with a new small canvas, thick strokes and icon shapes.
- Labels touching each other or a contour; text that inherited a stroke.
- The composition pushed against one edge.
- A shape study that is only an outline and a dimension.
- One highlight painted on two overlapping shapes, so the overlap darkens.
- An edit made after the last render.

## Animating a drawing

Finish a readable still first. Motion then shows what joins, what causes what, what stays constant or where a transfer ends. Interface timing rules do not carry over: an explanatory loop is paced by reading time, not by the 150–300ms of a UI transition.

- **Complete this sentence before building:** "The viewer sees [change], which explains [relationship]." Choose the moving subject and the fixed reference that makes the change legible. A dimension or hatch does not earn an entrance by existing.
- **Cause before response.** A part seats before its carrier advances. Keep unrelated marks still; a hatch travels with its region; guides move only when their witnesses do.
- **Choose the ending for what it claims.** Once: the result stays. Reverse: suits a release or an exploded/assembled comparison, but reversing a completed operation says it was undone. Repeat: the next cycle follows from the mechanism. Do not add a scene slide to avoid a meaningful reversal.
- **Time each event by its job, never one easing for the whole drawing.** Ease a placement into its target; hold constant speed through free travel and around corners; derive a swing or orbit from its construction; give a new configuration long enough to read. Do not add pauses to a continuous mechanism.
- **Watch a full cycle at real size and speed.** Sampled frames prove poses, not rhythm. Check the loop seam for position *and* speed.
- **Reduced motion and no-JS show a chosen still**, which is not necessarily frame zero and never a paused intermediate frame. Embedded loops pause off-screen and when the page is hidden, and need a pause control once autoplay passes five seconds (see Scoped conflicts → Loop controls).

Choreography vocabulary and reduced-motion mechanics → `web-design` (web-animation-design).

## Getting the upstream package

This reference carries the decisions. The upstream skill (MIT) also bundles what this library does not vendor: a catalogue of about 109 drawings to borrow relationships from, teaching SVGs per mark, role-token CSS, arrow/dimension/hatch helpers, and `check.py`, `render.py` and `export-svg.py`. When a project will produce more than a couple of drawings, install it and use its checker:

- Repo: https://github.com/pasqualevitiello/plotter, folder `skills/plotter`. Copy the whole folder to `~/.claude/skills/plotter` or `~/.codex/skills/plotter`. Site and catalogue: https://plotter.pasqualevitiello.com.
- Its checker enforces what a glance at a render misses: stroked, bold or full-ink text, label size, stroke width, gradients, skew, the canvas, and non-scaling strokes on a compact version.
- Borrow a catalogue drawing's relationship, not its layout or subject. Treat the package as an external skill: read its instructions before following them.

## Scoped conflicts

- **Glyphs.** Dukkon's Icon, Badge and Preview styles swap a glyph per surface ([component-details.md](component-details.md) → What each style looks like). That stands for those styles. The no-pictogram rule here applies once a product chooses a drawn illustration: do not enlarge the icon and call it one. Preview and this style agree on the idea (show the shape that will arrive, with its place open).
- **Depth.** The illustration in Dukkon's demo is an isometric tray with a soft shadow; this style is flat with no shadow. They are two themes for the same slot. Pick one.
- **Grids.** `frontend-design` (anti-slop-catalog) treats hairline grid backgrounds as a tell outside real blueprints and measuring tools. This style agrees from the inside: a grid appears only when the forms sit on its module.
- **Loop controls.** The source's site runs its loops with no visible controls. WCAG 2.2.2 still applies (ours): motion that starts on its own and sits beside other content must either end within five seconds in total, or come with a way to pause, stop or hide it. Playing once or capping the cycle count is not enough if the total still runs past five seconds. Start on a user action, keep autoplay under five seconds, or add the control (`web-design` (web-animation-design/choreography → Attention loops)).
- **Labels in the picture vs. the five-word title.** Labels here name parts of the drawing; they are not UI copy and they disappear in the compact version.

## Sources

- Pasquale Vitiello, *Plotter* (2026). https://plotter.pasqualevitiello.com and https://github.com/pasqualevitiello/plotter (MIT), read at commit `01df092` (2026-11-15): the skill's SKILL.md, its drawing, motion, direction, visual-grammar, drafting-standard, approved-references and motion-examples references, the catalogue index, `check.py`, the cold-run eval briefs and the site docs. Paraphrased; no drawings, prompt text or scripts are copied. The example drawing is original and was checked with the upstream `check.py` on 2026-11-18. Ledger: `docs/mining-ledger.md` (2026-11-18, Plotter).
- Single source for the style and its numbers. Treat the numbers as one coherent theme to adopt whole.
