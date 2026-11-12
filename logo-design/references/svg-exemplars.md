# SVG Exemplars — the rules as geometry

Four small hand-written constructions that show what this skill's vectorizing and small-size rules look like as actual SVG. Read this when the executor is an agent and the next step is "vectorize the best 15" or the 16×16 check, to calibrate what *clean construction from simple geometry* means before drawing.

These are library-written worked examples for invented subjects. They are not Peters Design Company or Shir work, not client marks, and not finished logos: each skipped the noun process, the 50 sketches, and the uniqueness check on purpose. Copy the construction habits, never the marks.

## Contents

- How to use these
- Shared conventions
- 1. Monogram on a grid
- 2. Two nouns by negative space, one colour
- 3. Wordmark with optical adjustments
- 4. A mark and its 16px variant
- What was and was not checked

## How to use these

- Match the *level of construction*: a handful of shapes, coordinates on a module, every number explainable.
- Use the measurements as a pattern for your own small-size audit: find the thinnest line and the tightest gap, convert to pixels at 16px, and fix in the SKILL.md §5 order (thicker lines → more negative space → simplify).
- Do not present these, or light edits of them, as candidates. A mark with no approved noun behind it fails the method regardless of geometry.

## Shared conventions

- `viewBox` only, no fixed `width`/`height`, so the same file renders at any size.
- `fill="currentColor"` (or `stroke="currentColor"`): one colour, set by the surrounding text colour. Black-on-white and white-on-black are then the same file on two backgrounds, which is the first-round presentation format.
- Shapes are filled paths with whole-number coordinates on an 8-unit module where the design allows. No `<text>`, no gradients, no filters, no embedded raster: nothing that depends on an installed font or fails in one-colour reproduction.
- Sizes below are stated as "units" in the 64-unit box; divide by 4 for pixels at 16×16.

## 1. Monogram on a grid

Demonstrates: "Vectorize … with geometry, simple shapes, a grid" and "thick line weight for small sizes" (SKILL.md §3).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Monogram N on an 8-unit grid">
  <g fill="none" stroke="currentColor" stroke-width="0.25" opacity="0.3">
    <path d="M8 0V64M16 0V64M24 0V64M32 0V64M40 0V64M48 0V64M56 0V64"/>
    <path d="M0 8H64M0 16H64M0 24H64M0 32H64M0 40H64M0 48H64M0 56H64"/>
  </g>
  <g fill="currentColor">
    <path d="M12 12H20V52H12Z"/>
    <path d="M44 12H52V52H44Z"/>
    <path d="M12 12H22L52 52H42Z"/>
  </g>
</svg>
```

- The first `<g>` is the construction grid; delete it for the deliverable.
- Stems are 8 units wide (2px at 16px), the thickest weight the letter can carry before the counters close.
- The diagonal is 10 units wide measured horizontally, not 8. A diagonal measured across its own direction is thinner than its horizontal width; here the run is 30 and the rise 40, so the true thickness is 10 × 40 ÷ 50 = 8 units, matching the stems. Copying the stem width onto a diagonal makes it look weak.
- The two triangular counters are 22 units wide at their open end (5.5px at 16px). They close to a point, which is where this mark will fill in first at small sizes.
- The mark sits in a 40-unit square with a 12-unit margin on every side. It is deliberately not in a circle: "There is nothing more forgettable than a letter in a circle."
- Limit: a bare initial is a weak idea by this skill's standard. Use the construction, then combine it with an approved noun.

## 2. Two nouns by negative space, one colour

Demonstrates: negative-space combination (SKILL.md §4.2) using the skill's own shield + lightning bolt pairing, and "the negative space in a brand mark is just as important as the positive space."

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Shield with a lightning bolt cut out of it">
  <path fill="currentColor" fill-rule="evenodd"
        d="M32 4L56 12V30C56 44 46 54 32 60C18 54 8 44 8 30V12Z
           M36 14L20 34H30L27 50L44 28H33Z"/>
</svg>
```

- One path, two subpaths. `fill-rule="evenodd"` turns the second subpath into a hole, so the bolt is the background showing through. There is no second colour to lose.
- Because the bolt is a hole, the mark inverts without redrawing: on a dark background the shield is light and the bolt is dark.
- The bolt is two tapering wedges joined by an 11-unit step at y=28–34; it is widest across the middle (about 19 units, under 5px at 16px) and narrows to a point at each end. The points will soften first at small sizes.
- The thinnest shield wall is above the bolt's top point: about 8 units (2px at 16px). The walls beside the bolt's left corner and bottom point are 10–12 units. These are the numbers to watch if the bolt is enlarged for impact: below about 2px the wall becomes the "overly thin lines" failure the skill names.
- Limit: shield and bolt are each a cliché; the skill's claim is only that the pair is more ownable than either. A real project would still run the uniqueness check.

## 3. Wordmark with optical adjustments

Demonstrates: custom lettering drawn as shapes, with the optical corrections that separate drawn type from typed type. The source corpus names kerning as a redesign failure (SKILL.md §9) but gives no numbers; the adjustments below are standard type-drawing practice applied by this library, not source rules.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 100" role="img" aria-label="VOLT wordmark">
  <g fill="currentColor">
    <path d="M10 20H21L40 69L59 20H70L46 82H34Z"/>
    <path fill-rule="evenodd"
          d="M112 18a32 32 0 1 0 0 64a32 32 0 1 0 0-64Z
             M112 28a22 22 0 1 0 0 44a22 22 0 1 0 0-44Z"/>
    <path d="M156 20H166V70H192V80H156Z"/>
    <path d="M186 20H234V30H215V80H205V30H186Z"/>
  </g>
</svg>
```

Cap height runs from y=20 to the baseline at y=80. Flat letters (L, T) sit exactly on those lines.

| Adjustment | In the file | Why |
| --- | --- | --- |
| Round overshoot | O spans y=18 to y=82, 2 units past each line | A curve touching the line at a single point looks shorter than a flat edge on the same line. |
| Pointed overshoot | V's foot ends at y=82 and is cut flat, 12 units wide | A point reads short and fills in when small; a blunt apex slightly past the baseline holds its place. |
| Diagonal weight | V's arms are 11 units wide horizontally | True thickness is about 10 units, matching the 10-unit stems (same reasoning as exemplar 1). |
| Uneven gaps | V–O 10 units, O–L 12 units | Spacing is judged by the area between letters, not edge distance. A diagonal next to a round leaves the most open air, so it gets the smallest measured gap. |
| Overlapping pair | T's bar starts at x=186, 6 units left of where L's foot ends (x=192) | L and T both carry large empty corners; tucking the bar over the foot closes the hole a mechanical gap would leave. |

- Check spacing with the word upside down or blurred: the gaps should read as even grey.
- No `<text>`: the file renders the same on any machine, and the letters are owned shapes that can share the mark's line width and curves (the §7 "brand-mark DNA" test).
- Limit: first-round presentation is marks only, "no typography, no color." A wordmark like this belongs to the later system stage.

## 4. A mark and its 16px variant

Demonstrates: the §5 small-size diagnosis and fix order applied until the mark changes, and visual rhythm (§4.3, evenly spaced linework) being shaved "while the idea survives."

Full-size version (sun over water, three wave bands):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Sun over three waves">
  <path fill="currentColor" d="M16 30A16 16 0 0 1 48 30Z"/>
  <g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
    <path d="M8 38Q20 32 32 38T56 38"/>
    <path d="M8 46Q20 40 32 46T56 46"/>
    <path d="M8 54Q20 48 32 54T56 54"/>
  </g>
</svg>
```

Audit at 16×16 (divide by 4): the wave lines are 4 units, so 1px. The bands sit 8 units apart, leaving 4 units between them, so 1px. The first wave's crest comes within about 3 units of the sun's flat edge, under 1px. Every one of those is the "overly thin lines and tight negative space" failure. Thickening the lines closes the gaps; widening the gaps pushes the waves out of the box. The first two fixes are exhausted, so the third applies: simplify without losing the meaning.

16px variant, drawn on a 16-unit box so one unit is one pixel:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" aria-label="Sun over one wave, small-size variant">
  <path fill="currentColor" d="M3 8A5 5 0 0 1 13 8Z"/>
  <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M2 12Q5 10 8 12T14 12"/>
</svg>
```

- Three waves became one. The idea (sun, water) survives; the rhythm does not, and that is the accepted cost at this size.
- The wave is 2px thick, double the full-size line at the same scale.
- The sun's flat edge sits on a whole pixel (y=8), so it renders as a hard line instead of a grey row. The gap to the wave is 2px at the crest and 4px at the trough.
- The sun grew relative to the box (10 of 16 units wide versus 32 of 64) because the wave stack below it shrank.
- This is the modular-system point from §8: the small mark is a designed member of the system, not the large mark scaled down. Decide the switch-over size and say it in the delivery.

## What was and was not checked

- Every SVG block above parses as well-formed XML (`xml.dom.minidom`), checked 2026-11-12.
- Measurements were worked from the coordinates by arithmetic.
- Rasterized 2026-11-12 with resvg at 16, 32 and 64px, black-on-white and white-on-black, and inspected. All five draw as described. At 16px the three-wave sun mark closes up into grey bands and the single-wave small-size variant stays clean, which is the point that variant makes. Re-render after editing any path here.
- None of the marks was checked for similarity to existing logos. They are teaching constructions and must not ship.
