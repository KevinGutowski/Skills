# Icon Systems — designing and governing a product icon set

How to design, systematize, ship, and govern an interface icon set as a design-system asset. Primary source: Marek Minor (Minor Adventures, independent icon foundry), "The making of Cursor's icons" (Jul 2026, https://www.minoradventures.co/blog/the-making-of-cursors-icons) — a one-year, 600+-icon commission replacing Cursor's inherited VS Code Codicons. Single deep practitioner source; the drawing method is one hand's doctrine, but the system/governance layer matches this skill's corpus (deprecation, adoption, one-source-of-truth) and is corroborated where noted.

## Contents

- When this applies (and boundaries)
- Why products outgrow inherited sets
- The shape of the system: sizes, styles, grids
- Drawing rules: construction, the technical look, direction
- Optical adjustments — the layer sets usually skip
- Consistency is infrastructure, not memory
- Governance: one concept, one icon
- Migration without breaking references
- The pipeline: a set that can't grow decays
- Format choice: icon font vs SVG (scoped conflict)
- Checklist

## When this applies (and boundaries)

Use for a product's *interface icon set*: creating one, auditing/unifying a drifted one, or building the infrastructure that keeps one consistent. Boundaries: brand marks and badges → `logo-design`; Apple app icons → `apple-design` (app-icon-design); using Apple's system symbols in-app → `swiftui` (sf-symbols); one-off web SVG asset hygiene → `frontend-design`.

## Why products outgrow inherited sets

Cursor inherited Codicons plus custom additions "in slightly different styles" — a count found 468 icons where docs claimed 498, with codepoints leading nowhere. "None of this is unusual for an inherited set. **Sets drift when nobody owns them.**" The deeper trigger is concept coverage: Cursor kept introducing concepts no library has (AI agents, parallel/sequential execution, thinking-effort levels, cost/compute, Bugbot). "A generic set can stretch for a while, but at some point a product needs its own vocabulary." Audit both axes — style drift *and* vocabulary gaps — before deciding a redraw is warranted.

## The shape of the system: sizes, styles, grids

- **Sizes are optical sizes, like type's Text/Display cuts — not one drawing scaled.** Cursor: a 16px set (1.25px stroke, legible from ~12px to ~20px) and a 24px set on its own grid (1.5px stroke, more detail where space allows). A single size stretches only so far: at 32px a scaled 1.25px stroke becomes 2.5px, and small-size simplification leaves the extra room empty.
- **Find stroke weight by eye against the product's own typeface.** 1px "felt too thin next to text," 1.5px too heavy; "At 1.25px a 16px icon sits beside 16px Cursor Gothic, their custom typeface, and looks just right… At some point the number is a record of a decision the eye already made."
- **Pixel-grid snapping is a choice, not a law.** A 1.25px stroke never snaps — deliberately: the icons render at 12/14/16/20px so "there is no single grid to snap to," and modern displays keep fractional strokes crisp. Treat icons "as symbols, closer to small logos or characters in a typeface than to fixed-size bitmaps." (Snap-to-grid remains right when a set targets one absolute size on low-DPI targets.)
- **Two styles, asymmetric coverage:** Outline built from strokes; Filled built from solid shapes with interiors knocked out. Only draw Filled where the product actually needs it — full 1:1 style coverage is wasted work at this scale.
- **Optical shapes (keylines) per size:** Square, Circle, Horizontal, Vertical — the circle drawn slightly larger than the square for equal visual mass. Diagonal subjects fit none cleanly: pick the closest (usually circle) and adjust by eye. The keyline system is a consistency instrument, not a cage.

## Drawing rules: construction, the technical look, direction

- **One construction logic makes hundreds of icons read as "the work of one hand":** start from horizontal/vertical/45° segments, allow other angles only where the concept demands, then round corners "until the shape follows the idea." Even clouds and fire start as straight segments with rounded joins; freeform curves are rare. Icons read as "closer to technical drawings than to organic shapes – diagrams with a friendly finish." Round caps/joins keep the engineering precision from turning cold.
- **Closed over open:** wherever an icon could be open or closed, close it — simpler, more technical, more legible at tiny sizes.
- **No fake depth:** a slash cuts flat through the shape; no shadow gap pretending something sits behind.
- **A signature tendency gives the set identity:** Cursor's is extending lines to fill horizontal space, borrowed from monospace type aesthetics — a tendency, not a rule for every icon. Pick one such tendency deliberately; it's what makes the set recognizably yours rather than generic.
- **Natural proportions — tall things stay tall.** A pencil is tall and narrow, a banknote wide. "Squashing every object into the same box is where the toy look comes from, shapes inflated to fill space they don't need."
- **Directional consistency from a brand anchor:** Cursor's pointer runs bottom-left → top-right, so every direction-ambiguous icon follows it (diagonal arrows, flying objects, the smaller element of a stacked composition goes top-right); slashes run the opposite way because "a slash cancels a direction and should cut against it." "No one reads this off the screen. But without rules like it, a set stops looking like it came from one place."
- **Calibrate rounding between too sharp and too soft** — precise but approachable. Explorations that don't solve a problem get dropped: a type-design-inspired sharp-caps variant looked interesting up close but "didn't solve a problem anyone had, so the set stayed traditionally rounded."

## Optical adjustments — the layer sets usually skip

Logo and type designers make these corrections reflexively; icon sets usually skip them because it's "too much work for an effect nobody can really point at." They work "below the level of noticing, the same way a typeface's ink traps do at 10pt" — and they surface when interfaces zoom and at the larger size. Minor's standard: "It's the inside of the machine: nobody opens it, and it should still be tidy."

- **Optical breaks:** where lines meet, the junction clogs optically — cut a small notch, "the same way a text face opens up the tight corners of an A."
- **Stroke thinning:** where many lines converge, thin some so weight doesn't pile up in one spot.
- **Dot sizing by role:** a line-terminating dot, a "more" dot, and a floating dot each need slightly different sizes; track which is which.
- **Minimum gaps ("Cuts"):** between overlapping shapes (folder + plus badge, stacked squares), never less than 3 units on the 16px grid — at ≤2.5 shapes merge into "one blurry shape."

## Consistency is infrastructure, not memory

"Drawing turns out to be only half the job. The other half is keeping the set consistent, and that half runs on infrastructure rather than memory." Three-file working structure (Figma, but tool-agnostic):

1. **Explorations** — private, tens-to-hundreds of attempts per concept, organized one section + attempt row per concept.
2. **Overviews** — a lookup table auditing every recurring pattern: which icons follow which optical shape; are cut gaps optically equal; do plus/minus/x modifier badges sit at identical size/position; is detail-reduction ("hinting") done the same way; are filled-style treatments internally consistent; are dots/notches uniform; do 3D/diagonal icons share one perspective angle; is the folder in one icon the same folder as in the other nine. Cursor tracks **155+ recurring elements/properties** this way. "When a pattern drifts, the drift becomes visible. It all compounds into a set that feels unified rather than assembled from parts."
3. **Icons** — the shipping file: each icon one component with two properties, Filled (boolean) and Size (16/24).

**Leave the desk:** mirror the overview to a phone — "You need to look at the set somewhere other than the file it was drawn in, on a device where 16px is actually 16px." (The same move as design-code parity's "never judge in the tool alone.")

## Governance: one concept, one icon

Delivery is a package, not files over the fence: source file, fonts, exported SVGs, and a companion site the team actually works in.

- **Searchable by what you can't name:** search runs on tags as well as names (1,274 tags across Cursor's set), because the hard case isn't finding a known icon — it's a teammate with a *new concept* needing to know whether coverage already exists. Searching "search" must surface magnifying-glass.
- **A concepts table pins each product concept to its icon** so "What's the icon for [X]?" has exactly one answer as the product grows. "Without it, a set slowly develops two icons for the same idea, and at that point it stops being a system." This is the icon-layer version of this skill's stated-opinions rule — governance that says no to duplicates.
- **Hover-first ergonomics:** the grid answers most needs without a click — enlarged preview, codepoint, copy-SVG/download/copy-symbol. Detail view adds size-scaling preview and tags; current font files download from the same site so consumers can't pin stale copies.
- **Domain sub-systems get their own page:** file-type icons (formats → icons, sample filenames, extension lists, color palette) were "a project of their own."
- **Docs live with the set:** design philosophy + a guide for adding an icon — the system is "handed over in a state where adding the next icon is routine."

## Migration without breaking references

The constraint that shaped the whole project: replace the old set "without breaking a single reference."

- **Keep the addressing scheme, swap the payload.** In an icon font every glyph lives at a Unicode codepoint; the old font had 645 icons at 645 codepoints referenced throughout the product. Rule: every old icon remaps to its replacement *at the same codepoint* — load the new font and "arrow-up is still exactly where arrow-up always was." Icons with no replacement are "retired deliberately rather than lost" (this skill's deprecation-is-a-feature rule, applied to glyphs).
- **A mapping that size needs its own tool:** a migration dashboard with four states per old icon (To Be Processed / Processed / Removed / Coupled), warnings for missing SVGs and duplicate codepoints, a whole-set grid (coupled green, removed red), and one-click before/after comparison. Build the audit tool; don't track 645 rows in your head or a spreadsheet.

## The pipeline: a set that can't grow decays

"A set that can't grow decays, so the last deliverable is the pipeline that keeps the system alive after the drawing is done." Publishing an icon: draw in the master file (at least one size/style combination, usually 16 Outline) → flatten to single paths (font compilers can't handle booleans or un-outlined strokes) → publish the library → export SVGs into the repo's folders → run `ship it`. The one command registers new SVGs and assigns codepoints, compiles all four fonts in every needed format, merges stylesheets, rewrites font metadata (compilers misname families), regenerates the companion-site data so icons/codepoints/tags match the actual fonts, rebuilds the site, checks the docs aren't quoting a stale icon count, commits and pushes. "Doing all of that by hand is an afternoon of work, and one of the steps always gets missed. Typing ship it takes a second." SVGs, fonts, data, and both sites live in one repository so an icon travels Figma → shipped in a single step; the system "doesn't depend on me remembering anything."

## Format choice: icon font vs SVG (scoped conflict)

The web corpus in this library defaults the other way: SVG over icon fonts when sizing, color, and accessible treatment need independent control (`frontend-design` visual-execution; corroborated by Santa Maria, *On Web Typography*). Cursor ships icon *fonts* because the constraint was different: an inherited product referencing 645 glyphs by codepoint, where same-codepoint remapping makes the swap automatic. Route by constraint, don't blend: greenfield web product → SVG default; replacing a font-based set in a large existing codebase, or a product whose text pipeline already composes glyphs → icon font with codepoint-stable migration. Either way the governance layer (tags, concepts table, pipeline) is format-independent.

## Checklist

- [ ] Audited the existing set for both style drift and concept-vocabulary gaps before deciding scope?
- [ ] Sizes designed as optical sizes (own grid, stroke, detail level per size) rather than one drawing scaled?
- [ ] Stroke weight chosen by eye against the product's actual UI typeface at real size?
- [ ] Optical-shape keylines defined per size, with circle oversized for equal mass — and permission to deviate by eye?
- [ ] One construction logic + one deliberate signature tendency, written down?
- [ ] Directional rule anchored to something of the brand's, applied to every ambiguous icon?
- [ ] Optical corrections budgeted (breaks, thinning, dot roles, minimum gaps) — the inside of the machine tidy?
- [ ] Recurring elements tracked in an overview/audit surface, not memory?
- [ ] Set reviewed at true size on a real device, outside the design tool?
- [ ] One-concept-one-icon table in place, and tag-based search for concepts people can't name?
- [ ] Migration addressed by keeping the addressing scheme (codepoints/names) stable, with deliberate retirement?
- [ ] A one-command publish pipeline, so the set can grow after handoff?

*The closing standard — "You shouldn't notice them, but somewhere below noticing, you should always know – no, feel – they're Cursor's" — is the typeface bar applied to icons: invisibility earned "through one construction logic, one stroke voice, four optical shapes, and thousands of little corrections that nobody will ever point at." The craft methodology for pushing individual icons that far (156 hamburger explorations, 0.25px version diffs) lives in `design-craft`.*
