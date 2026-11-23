# Web Typography

*Scope: Sets type on the web — measure, line-height, scales, pairing, OpenType, font loading. Use when styling CSS text or choosing/pairing/loading fonts. Apple platforms → apple-design; rendering internals → graphics-fundamentals. Triggers: line-height, measure, font pairing, type scale, web fonts, font-display, FOUT, font-feature-settings, tabular numbers, fluid typography*

**Sources:** [references/sources.md](web-typography/sources.md) — 3 books: Rutter, Santa Maria, Latin.

Use this skill when setting, sizing, pairing, or loading type for the web. References: [rutter-guidelines.md](web-typography/rutter-guidelines.md) (full guideline index), [choosing-and-pairing.md](web-typography/choosing-and-pairing.md) (selection/pairing methods), [opentype-and-micro.md](web-typography/opentype-and-micro.md) (OpenType recipes + character craft).

## Contents

- 1. Stance
- 2. The body-text triad (size × measure × line-height)
- 3. Reading-distance sizing
- 4. Scales & hierarchy
- 5. Rhythm & vertical space
- 6. Alignment & justification
- 7. Tracking (letterspacing)
- 8. Display craft
- 9. Choosing & pairing (the judgment layer)
- 10. Web fonts & loading
- 11. Tables
- 12. Staleness appendix — what changed since 2014/2017
- Checklist
- Relationship to other skills

## 1. Stance

- **"Choosing a typeface is not typography"** (Rutter, 'How to use this book') — Rutter deliberately puts font choice *last*. The craft is in the setting; "even very ordinary faces can be crafted into an engaging, absorbing typographic experience."
- **The reader controls the medium.** "The designer has no direct influence on the reader's medium… the web designer must know to relinquish control into the hands of the reader" (Rutter, 'Learn to relinquish control'). Liquid settings, user-adjustable sizes, and defaults-as-starting-points follow from this.
- **Readability ≠ legibility**: "the term readability doesn't ask simply, 'Can you read it?' but 'Do you want to read it?'" (Stephen Coles, paraphrased by Santa Maria, ch. 1 'How We Read').
- The evidence it matters: Larson & Picard's 'The Aesthetics of Reading' (2005) found typographic quality barely changes reading speed but changes *perceived* speed and mood — readers frowned less; "good typography induces a good mood" (cited in Rutter, 'Good typography induces a good mood').

## 2. The body-text triad (size × measure × line-height)

Latin's equilateral triangle (ch. 'Equilateral triangle of a perfect paragraph'): size, measure, and line-height are one decision, never three. Skew one, fix the others.

- **Measure: 45–75 characters, ~66 ideal** (Rutter, citing six centuries of print). No `ch` reliability → use ems: 1em ≈ 2 characters, so `max-width: 23–38em` (66ch ≈ 32em). Today `max-width: 65ch` is fine for the font it's set in.
  - **Reader settings offer steps inside the band, not a free slider.** Matter's 2026 web reader ships about 66 characters by default and 75 at its "wide" setting, and both sit inside the range. When readers can change the size, keep the measure in characters so it holds as the size changes.
- **Start from the default size**: "The browser default is always the best place to start for text size" (Rutter, 'Use the default font size for paragraphs') — 16px is the user's choice, adjust from there only if the typeface demands it (small x-height → bigger; see §3).
- **Line-height: unitless, ~1.4 to start.** Browser `normal` (~1.2) "is usually too small" for screens (Rutter, 'Increase line spacing from the browser default'). Always unitless so it inherits as a multiplier, not a computed length.
- **Latin's covariation rules** (ch. 'Equilateral triangle'): more leading when text is **darker/heavier**, **larger**, **longer-measured**, or the typeface **seems heavier** (most serifs). Body: **1.3–1.6**. Headings: **1–1.2** — short lines drift apart at body leading; "once you see the difference you can't unsee it."
- **CJK leading is a different table** (single-source: Open Design's typography craft file at `0725880`, adapted from referodesign's `refero_skill`; not checked against a CJK typography authority). CJK glyphs fill the em box, so Latin display leading makes lines touch. Display and headings: **1.3–1.4** at every size, including a 96px cover title broken across lines. Body: **1.7–1.8**. No negative tracking on CJK text; it crowds glyphs set on a fixed grid. In a mixed layout, put the tight Latin values on the Latin element only, never on a shared parent.
- **Language adjustments** (Latin): average German word is **11.66 characters** vs English ~8 — lean toward the 75 end of the measure and hyphenate. Slavic diacritics (č, š, ž) and German's capitalized nouns add vertical weight → slightly more line-height.
- **Units**: "use rems to scale something with the page (global sizing) and use ems to scale within a component (local sizing)" (Rutter, 'Use rems for global sizing; use ems for local sizing'). Paragraph size = rem; a component's internal padding/margins = em.

## 3. Reading-distance sizing

- Rutter's arcminutes model ('Adjust type size according to reading distance'): perceived size is an *angle* (text height ÷ distance). Book at 35cm/10pt ≈ 30 arcminutes. To hold that: **~16px phone** (close), **18–19px laptop/tablet** (~45cm), **~22px large desktop** (~60cm). Implement with `em`-based min-width media queries (60em ≈ laptop).
- **Aspect-value matching** ('Adjust the font size if the typeface requires it'): apparent size is x-height, not font-size. aspect value = x-height ÷ font-size (Helvetica 0.521, Futura 0.417). Equivalent size = `16 × 0.521 ÷ 0.417 = 20.1px` — Futura needs ~20px to look like Helvetica at 16.
- `font-size-adjust: <aspect-value>` does this automatically for fallback fonts — rendered size changes, computed size (and line-height) doesn't.
- **When readers pick the face, match every face to one x-height and one line spacing.** Matter's reader offers nine faces "each sized to the same x-height and line spacing" (2026), so switching faces changes the voice but not the apparent size. It does not hold the column: faces with equal x-heights still differ in width. `font-size-adjust` scales every face in the stack, not only fallbacks, so one value on the text container covers the whole menu. Set `line-height` in a unit that does not depend on the face, such as a unitless number or `rem`.
  - **Control the column separately.** `font-size-adjust` also changes the `ch` unit, because `ch` is measured from the adjusted face. So `max-width: 65ch` gives a different pixel width for each face. In Chromium, with `font-size-adjust: 0.5` and `width: 65ch`, DejaVu Sans set 755px and Nimbus Roman 726px (QA run, 2026-11-23). Pick one: a `ch` width keeps roughly the same number of characters per line while the column's width moves, or a `rem` width per measure step keeps the column fixed while characters per line move. Either way, count characters per line for each face on real text.

## 4. Scales & hierarchy

- Size type from a scale, not ad hoc. The classic typographic scale (6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72) is a modular scale with ratio 2 and interval 5; browsers' default heading sizes roughly follow it (Rutter, 'Always size type using a scale'). Three sizes is a good starting limit — "strike a single chord, not play out an entire melody."
- **"When using a type scale, identify your smallest size first** and then go bigger" (Rutter) — legibility of the smallest text is the constraint.
- Hierarchy ≠ size: weight, style, caps, color, spacing, placement all differentiate. "Whatever you choose, just change one attribute at a time" (Rutter, 'Don't rely on size alone for differentiation').
- **Latin's scale-vs-grid reconciliation** (ch. 'Modular scale and meaningful typography'): the scale governs *sizes*, the rhythm grid governs *leading*. When they conflict (a 37px heading wanting 60px grid leading), bend: pick a multiple/fraction of the base leading (45px = 1.5×) that lands in the heading range (45÷37 = 1.22 ✓). And the tiebreaker: "go with what looks optically right, not with what's mathematically correct."
- Modernize: compute the scale with `clamp()`/`pow()` custom properties for fluid steps between breakpoints (post-book; see §12).
- **Product UI is the exception to fluid scales** (Impeccable, 2026): app screens, dashboards, and settings want a *fixed* rem scale with a tighter ratio (~1.125–1.2), because they carry more type roles at a steady viewing distance. A fluid h1 that shrinks inside a sidebar looks worse, not better. One well-tuned sans often carries every role. Keep fluid display sizing for marketing and editorial surfaces. Mode definitions → `frontend-design` (surface-modes).

## 5. Rhythm & vertical space

- The body line-height is the page's spacing unit: margins and other elements' line-heights as multiples of it (Rutter, 'Apply vertical space in measured intervals'). Apply a margin/padding reset first.
- **Asymmetric heading margins**: more space above, less below — e.g. 1.5× rhythm above, 0.5× below, "provided the margins combine to be multiples of the basic line height" (Rutter, 'Apply vertical space in measured intervals'). Latin: "the bottom margin should be noticeably smaller than the top one" so the heading visually connects to the text it refers to (ch. 'Rhythm in web typography').
- **Baseline grids: don't.** "Don't slavishly follow a baseline grid" (Rutter) — let embedded media break the rhythm and restart the beat. Santa Maria: "Overall, however, I've found baseline grids more trouble than they're worth" (ch. 6 'Composition') — print's translucency rationale is moot on screens; "you can achieve rhythm through size and spacing just as well."

## 6. Alignment & justification

- Left-align by default. "Justify well or not at all; if in doubt, align left" and **"Never set justified text without using hyphenation"** (Rutter). Don't center long passages.
- The full justification kit (Rutter, 'Hyphenate judiciously and with care'): `text-align: justify` + `hyphens: auto` (+ correct `lang` attribute), then tame with `hyphenate-limit-lines: 2` (no ladders), `hyphenate-limit-chars: 6 3 2` (word/before/after minimums), `hyphenate-limit-zone: 8%` (less hyphenation for ragged text), `hyphenate-limit-last: always` (no orphaned half-word). Hyphenation *without* justification also reduces rag.
- **Hyphen minimums are two schools; pick one.** Rutter's `6 3 2` keeps three letters before the break and two after. Matter's 2026 reader, which says it follows Bringhurst (the book is not in this library), keeps "at least two letters before a break and three after": `hyphenate-limit-chars: auto 2 3`. Both keep the hyphen off a paragraph's last full line (`hyphenate-limit-last`, patchy support, §12).
- **Justifying well means bounding word spaces, which needs the whole paragraph.** Matter justifies with a line breaker that "weighs the whole paragraph before it breaks any line" and keeps word spaces between a fifth and a third of an em. By default a browser breaks each line in turn and then stretches it to fit; no widely shipped CSS property caps how far it stretches a space. `text-wrap: pretty` asks for better breaks, but each engine decides how many lines it reconsiders. To meet a word-space bound, lay out the paragraph in script (a Knuth–Plass-style breaker) or left-align. Check the result at the narrowest measure the reader can choose, where rivers appear first.

## 7. Tracking (letterspacing)

- **"Don't letterspace lowercase without good cause"** (Rutter) — lowercase spacing is the type designer's job.
- **Do** letterspace strings of capitals and 3+ digit runs: `letter-spacing: 0.05em` (~5%). More for all-caps headings in light weights; if another letter fits in the gap, too much. Not initials (use narrow no-break spaces) or small caps (spacing built in). Matter's 2026 reader uses 6%, about the same.
- **Gently tighten big/bold/wide**: −1% to −3% (`h1 { letter-spacing: -0.03em }`). Treat −0.04em as a floor: past it, letters lose their own shapes (Impeccable's `extreme-negative-tracking` check).
- **Retune light-on-dark text; don't just invert it.** Reversed text often looks *heavier* and blurs together (irradiation, antialiasing). That is why faces such as Signika ship a lighter "Negative" cut. Thin hairlines and small sizes can instead break up or drop out. Judge the actual face at the actual size and rendering: usually a little more line-height and tracking help, and the weight goes down a step for bold-looking faces or up for hairline faces that disappear. Impeccable's `typeset` suggests compensating on all three axes; the direction of the weight change depends on the face.
- **Optical vertical centering of a label** (Impeccable `typeset`, `d41d986`; syntax checked on MDN 2026-11-18):
  - `text-box: trim-both cap alphabetic` trims the box to cap height above and the baseline below, so a label centers on its letters rather than its line box. Put it on the label element, not the flex container: inside an `inline-flex` button the text is an anonymous flex item that the button's own trim never reaches. Wrap the label in a span and trim that (as a flex item it is already blockified, so no `display` is needed).
  - Support, per MDN's compatibility data on 2026-11-18: Chrome and Edge 133, Safari 18.2, Firefox 154. Without support the label keeps its ordinary line box, so the layout must still be acceptable untrimmed.
  - The fallback face has a different cap height, so the trimmed label jumps when the web font loads. Set `size-adjust` in the fallback's `@font-face` to the web font's cap height divided by the fallback's (both per em). The `ascent-override` family only changes what the trim removes.
  - Centered caps are not a centered word. Most of a mixed-case label sits in the x-height, below the cap center, so a trimmed label can still look low. Judge real labels at every size the control ships.
- **Centring fix**: browsers add the tracking *after* the last letter, throwing off centered display text — offset with a negative right margin equal to the letter-spacing (Rutter, 'Eliminate erroneous spaces after last letters').
- **"Turn off ligatures if increasing letterspacing"** (Rutter) — ligated pairs ignore the added space and turn into dark clumps.

## 8. Display craft

- Display text scales with the viewport like an image (Rutter, 'Resize display text as you would an image'): `vmin` keeps landscape/portrait consistent; hybrid `font-size: calc(0.5rem + 2.5vmin)` keeps small screens sane. Modern form: `clamp(min, fluid, max)`.
- **Set solid**: `line-height: 1` is the starting point for big/bold headings; all-caps can go below 1 (try 0.75) since there are no descenders — watch for clash (descenders catching ascenders) on wrap (Rutter, 'Adjust line spacing for evenness of colour').
- **Drop caps**: "implement drop caps accurately or not at all" — must share a baseline with the last line they span and align to the cap height of the first. `initial-letter: 3` does the alignment; `::first-letter` hacks rarely do.
- Prevent widows in headings: `&nbsp;` between the last two words (today: `text-wrap: balance`).
- Punctuation errors scale with the font size — proper quotes/dashes matter most here; visually center or hang punctuation ([opentype-and-micro.md](web-typography/opentype-and-micro.md)).
- "When in doubt, make it bigger. This is rarely true in design, but I've found it to be the case when designing for the screen" (Santa Maria, ch. 5).

## 9. Choosing & pairing (the judgment layer)

Full methods in [choosing-and-pairing.md](web-typography/choosing-and-pairing.md). The skeleton:

- First sort the job: **type for a moment** (UI, signage-like, open simple letterforms) vs **type to live with** (long-form: even texture, nothing the reader notices) (Santa Maria, ch. 4).
- Evaluate text faces on **three traits**: sufficient x-height, low-to-medium contrast, distinct letterforms — the **I/l/1 test** (Santa Maria, ch. 4).
- Generate candidates by **word association**; vet by **appropriateness/history** (Helvetica-on-the-subway vs Gotham-at-the-9/11-memorial); avoid **ready-mades** and audit free fonts (Santa Maria).
- Pair via Rutter's **skeleton/flesh/skin** matrix: same column (form model) = harmony; diagonal = deliberate contrast; rows are treacherous. Start from an **anchor typeface** (usually body). Latin: contrast "needs to be either clear or nonexistent."
- Genres beat classifications: Rutter's 10-genre taxonomy maps style → impression → use.

## 10. Web fonts & loading

- **Always provide WOFF2** (≈30% smaller than WOFF; today WOFF2-only is fine). **"Subset as much as you can, but no more"** — drop unused scripts/glyphs; a drop-cap-only font can ship caps alone (Rutter).
- **FOUT over FOIT**: invisible text blocks reading; reflow is "more often the lesser of the two evils" (Rutter, 'Avoid the flash of invisible text').
- `font-display` semantics (Rutter, 'Use font-display…'): "In most cases you will want to choose **fallback**" — brief block, swap only if fast, else fallback for the page's lifetime; for body text. `swap` only when the font is identity-critical and the text is small; `block` only when the specific font is *required*; `optional` for nice-to-haves on constrained connections. Plus `<link rel="preload" as="font">` for the critical face.
- **Match the fallback**: pick fallbacks by similar aspect value; `font-size-adjust` (§3) sizes them automatically, shrinking the FOUT jump. (Today, also `size-adjust`/`ascent-override` in `@font-face`.)
- Variable fonts (post-book, see §12): one file for all weights/widths — usually the best performance *and* design answer now.
- Performance budgets and loading metrics live in [`web-performance`](web-performance.md); this skill owns the font-specific strategy.

## 11. Tables

- "Tables are not pictures of data: they are catalogues of data to be perused" (Rutter). Tufte's data-ink applies: minimize furniture, fills, rules; whitespace does the grouping (cross-ref `data-viz`).
- Rutter's makeover sequence: size columns to data (never stretch) → strip fills/gridlines/bolding → **left-align text, right-align numbers, align headings with data** → group with whitespace → **tabular lining numerals** (`font-variant-numeric: lining-nums tabular-nums`), consistent precision.
- Numbers star in tables, so lining; align to the decimal point.
- Small screens: **"It's better to have a readable table that requires scrolling than an unreadable one which doesn't"** (Rutter, 'Adapt tables to small screens') — don't set a width, allow horizontal scroll, `white-space: nowrap` where wrapping destroys readability; linearise only simple tables.

## 12. Staleness appendix — what changed since 2014/2017

Durable: everything above. Decayed specifics:
- `clamp()` replaced the `calc()`+media-query ladders for fluid type; `min()`/`max()`/container queries extend it.
- `text-wrap: balance` (headings) and `text-wrap: pretty` (paragraph orphans) replace `&nbsp;` widow hacks.
- **Variable fonts went mainstream** (the books barely mention them): weight/width/optical-size axes in one file. The optical-size axis is applied automatically via `font-optical-sizing: auto`; keep it on and keep `opsz` when subsetting — [opentype-and-micro §12](web-typography/opentype-and-micro.md).
- Typekit → **Adobe Fonts** (Latin's and JSM's "TypeKit" references); Google Fonts now serves WOFF2 + variable.
- Subpixel anti-aliasing retired (macOS 10.14+); Rutter's subpixel-rendering cautions are now mostly historical — see `graphics-fundamentals` for the rendering mechanics.
- `font-display` is universal (it was behind flags when Rutter wrote); JS font-event loaders are rarely needed.
- `hanging-punctuation` is still Safari-only; the negative-margin fallback remains current.
- `hyphenate-limit-chars` shipped broadly; `hyphenate-limit-lines`/`-zone`/`-last` remain patchy — check caniuse.

## Checklist

- [ ] Measure 45–75ch (lean long for German-like languages)?
- [ ] Unitless line-height, ~1.4 start, covaried with size/measure/weight/darkness? Headings 1–1.2?
- [ ] Sizes from a scale, smallest first; one attribute changed at a time for hierarchy?
- [ ] 16px-equivalent on phones, 18–19px laptop, ~22px large desktop (or aspect-adjusted)?
- [ ] Justified text hyphenated, with one school's hyphen minimums and word spaces checked at the narrowest measure — or left-aligned?
- [ ] If readers choose the face: every face matched to one x-height and one line-height, and characters per line checked for each face?
- [ ] No letterspaced lowercase; +5% on caps/digit runs; big/bold gently tightened; ligatures off where tracked?
- [ ] Real small caps, correct numeral style per context, proper quotes/dashes/primes/ellipsis?
- [ ] WOFF2, subset, `font-display` chosen deliberately, fallback metrics matched?
- [ ] Tables: text left, numbers right + tabular lining, minimal furniture, scroll over squash?

## Relationship to other skills

- **`apple-design` (apple-typography)** — Apple platforms (SF, Dynamic Type, text styles). Never cross-apply: web rules here, platform rules there.
- **`graphics-fundamentals`** — the rendering-mechanism *why* (rasterization, hinting, font internals) lives there.
- **`frontend-design`** — interface-level aesthetics and page generation; this skill is the text-setting discipline inside it.
- **`design-craft`** (incl. its `emil-kowalski` reference) — the polish-tip layer (tabular-nums, font smoothing, text-wrap); this is the deeper reference behind those tips.
- **[`web-performance`](web-performance.md)** — budgets and load-lifecycle there; font-loading strategy here.
- **`data-viz`** — data-ink doctrine for tables and charts.
- **[`web-accessibility`](web-accessibility.md)** — the broader web accessibility practice (semantic structure, keyboard, contrast nuance like SSS shimmer); type-specific sizing and contrast stay here.

> **Staleness note:** sources are 2014–2017; §12 separates the durable doctrine from decayed specifics. Verify CSS support claims against caniuse before relying on the hyphenation suite, `initial-letter`, or `hanging-punctuation`.
