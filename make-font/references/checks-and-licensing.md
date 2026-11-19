# Checks, licensing, and the font book

What the gates in step 7 mean, when to go back a step, what the OFL requires of a modified font, and what the specimen book contains. Paraphrased from the upstream references (see [sources.md](sources.md)).

## Contents

- Gate tolerances
- Gate groups
- Reading the renders
- Kill criteria
- What the OFL requires
- What this skill adds on top
- Refusals
- The font book

## Gate tolerances

`check_font.py` gates each style and exits 1 on any failure. Tolerances come from `targets.json`, set by use. Units are cap-normalized (cap 700).

| Gate | text | display | UI |
| --- | --- | --- | --- |
| n stem, units | 3 | 3 | 2 |
| class mean width | 1.5% | 1.0% | 1.5% |
| shaped paragraph | 1.5% | 1.0% | 1.5% |
| contrast | 0.05 | 0.04 | 0.05 |
| x-height, units | 6 | 4 | 5 |
| side means, units | 4 | 3 | 4 |
| smallest ink gap in a kerned pair | 6 | 4 | 8 |

The class-width gates are the fit's own objective, so they pass nearly by construction. **The paragraph gate is the independent one** — it has spaces, punctuation, figures, and kerning the fit never saw. Read it as the real test of width. It only runs when the targets came from a font file.

**Which targets a weight is gated against.** The first style is gated against the family's targets. A later weight is gated against its own stem, widths, sides, and contrast, which the fit worked out and wrote to the fit log. Without `--fit-log` those rows are `INFO`, not gates, and say so. The order the files are given in does not matter.

## Gate groups

- **Metrics** — stem, x-height, contrast are gated. Ascender, descender, bar, serif, and overshoot are printed for information because the fit does not aim at them. A style the fit had to build at the end of the base's weight axis fails a row of its own: it is not the weight its name says.
- **Widths and spacing** — every class mean, the paragraph, the four side means.
- **Kerning** — every pair shaped; fails if any gap is more than a unit under the minimum.
- **Coverage** — the characters each claimed script needs (Latin, Latin Extended, Vietnamese, Cyrillic, Greek). A script with no list fails; add a list to the script before claiming any other.
- **Provenance** — the proof that outlines came from the base and not a reference:
  - glyph order and character map equal the base's;
  - with the fit log, every glyph's ink is within 3% as tall and 40% as wide as the base glyph at the fit's location;
  - with reference files, no outline may share point structure with a reference outline and lie within 2% of it in normalized shape. Shapes under nine points are left out, and in this library's copy so are glyphs that are only dots, bars, pills or rings (every contour convex), because two fonts' full stops and degree signs match by geometry. A letter or figure with a counter (O, o, 0, D) is always compared. A match on a glyph made only of straight strokes (a sans Cyrillic Sha, some symbols) can be a coincidence of fitted stems and widths: look at the pair before deciding. A CFF (OTF) reference cannot match a TrueType outline by construction, and the gate says so rather than passing. If the reference is itself built on the same open base, this gate fails by design: say so; it is not a copy.
- **Validity** — a dump-and-reload round trip, Windows metrics covering every glyph, no variation tables left, and `fontbakery check-universal` when installed. Most open fonts fail a few fontbakery checks of their own (a missing case pair, a zero-width mark), so the base is checked at the same location and only failures the base does not have count. Inherited ones are listed. Not installed is reported as not run, never as passed.
- **Licence** — the rules below, checked in the files.

## Reading the renders

With a reference file, the overlay sets the same words in both fonts at the same cap height: reference red, ours blue, overlap black. Black shapes with thin colored fringes mean a close match. A colored shadow along one side of every letter means width or spacing drift. With a screenshot, the stacked render puts the screenshot above ours at the same cap height. Look at every render yourself.

## Kill criteria

Stop and go back a step when:

- a class needs more than 10% stretch — the base is wrong (step 4);
- the guard opens more than 150 pairs — the spacing is too tight (step 6);
- a curve kinks in the x and y mix — take both from one location (step 5);
- the paragraph is off by more than twice its tolerance while every class passes — a class is missing, or the space or punctuation is far off; compare the word space and the figure class.

## What the OFL requires

The output is a Modified Version of the base under the SIL Open Font License 1.1.

- The licence travels with the fonts. The package step copies the base's licence file byte for byte and adds one copyright line for the modifications at the top.
- The original copyright notice stays; ours goes under it.
- A Reserved Font Name may not be used by a Modified Version. It is declared in the base's copyright line or licence file. The package step refuses a family name that contains one.
- The fonts may not be sold on their own. They may be bundled, embedded, and sold as part of a larger work.

This is a summary for running the skill, not legal advice. For a commercial brand typeface, have the person confirm the licence reading with whoever handles their legal review.

## What this skill adds on top

- **A new family name** chosen by the person, containing neither the base's family name, nor a Reserved Font Name, nor any distinct word of the base's name. Generic words are free (Serif, Sans, Mono, Display, Text, Grotesk, Slab). The test compares words, however they are joined or cased: `DM-Sans Neue` and `DMSans` both use DM Sans, while `Printer Sans` does not use Inter. Even without a Reserved Font Name, keeping the base's name would misstate who made the modified font. Keep family plus style under about 32 characters; longer names are cut short by some applications and `fontbakery` fails them.
- **No trademark record.** The base's trademark name record is dropped, since the new name does not use the mark.
- **No base name outside the copyright line.** The check scans every name record and the bytes of every other table.
- **No reference name anywhere** — not in the font, FONTLOG, README, or font book. The FONTLOG says the font was fitted to measurements of typefaces the requester chose.
- The OFL notice and URL in their name records; a four-character vendor ID or NONE; stylistic-set names kept.
- A FONTLOG in plain text: what the font is, the base and its axes, each modification with its numbers, and acknowledgements to the base's designers.

## Refusals

- A base without an OFL or Apache licence is not a base. Apache-licensed fonts are fine to measure, but this skill ships OFL and the package step refuses a non-OFL base licence, so pick an OFL base.
- A request to keep or echo a commercial font's name ("call it X Neue"): refuse and offer a new name.
- A request to ship the reference's file, or a font made by editing it: refuse.

## The font book

A printed specimen set in the font itself, 1600 × 1000 px pages, as HTML, page PNGs, and one PDF. Every number on a page is read from the font files or the logs when the book is written, never typed in.

Pages: cover with the vertical metrics drawn as guides; how it was made (targets against measured values, with the width classes); vertical metrics; weights (every style, three columns to a page at most); waterfall from 120 px to 11 px; text settings; the full character set; figures and punctuation; kerning and spacing, including the guard's largest pair before and after; OpenType features off and on; supported languages; licence and install.

- No reference name and no base family name in the book's prose. The copyright lines quoted on the licence page are the only place the base is named, because the OFL requires them.
- Plain sentences, sentence case, no puffery.
- The render step fails on two things: a **fallback glyph** (a system font drew a character the book face lacks, read per element through the browser's DevTools protocol) and **overflow**, meaning a box or a run of text past a page's margins, or text wider than the block that holds it.
- Then open the cover, the kerning page, and one character-set page and look. The standard is a sheet a type designer would send: aligned columns, one accent color for guides only, nothing clipped.
