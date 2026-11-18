# Sources and script provenance

## Source

- design.how `make-font` by Arlan Marat — https://design.how · https://github.com/arla6ka/design.how/tree/148b94c/skills/make-font
- License: MIT. The upstream licence text ships beside the scripts as `scripts/LICENSE-design.how.txt`.
- Revision: `148b94c` (2026-11-14).
- Read: SKILL.md and all seven references (measuring, foundation, fitting, spacing, checks, licensing, font-book). `SKILL.md` and the two references here are paraphrased in this library's words.
- Intake ledger: `docs/design-how-source-mining-2026-11.md`.

Single practitioner source. It is a top-level skill despite that because the task shape is narrow, it is tool-driven rather than doctrine, and the tool was run and checked here (ops rule: a single deep method source is allowed when the task shape is narrow).

## Scripts: a maintained fork, not a mirror

Twelve files came from the pinned revision: `fontlib.py`, `measure_font.py`, `measure_image.py`, `make_targets.py`, `find_foundation.py`, `fit_font.py`, `space_font.py`, `package.py`, `check_font.py`, `font_book.py`, `book.css`, `render_book.mjs`. **All twelve now differ from upstream.** The method and the design are upstream's; what changed is listed below. Each change is marked in the code with "Local change (KevinGutowski/Skills)" and says what upstream did. `test_make_font.py` is local. None of this has been sent upstream yet.

How the changes were found: a security read before vendoring (2026-11-14); five QA passes that each tried a configuration nobody had run (2026-11-17 and 18); then a deliberate hardening pass (2026-11-18) made of three independent line-by-line reviews, one per group of scripts, and a nine-configuration build matrix. Every change below was reproduced on a real font before it was fixed and checked again after.

### Measuring (`fontlib.py`, `measure_font.py`, `measure_image.py`, `make_targets.py`)

- **WOFF2 references shaped as blanks.** A WOFF2 kept its flavour when handed to HarfBuzz, which cannot read it, so the paragraph width and kerning were wrong with no error.
- **Ordinary text produced class widths.** A screenshot of normal words gave a "class width" from whichever letters happened to sit between two n's, even across a word space: one n standing for h, m, n and u. A class width is now a target only when every letter of the class was read, and nothing is read across a space.
- **Dots joined the wrong line.** A thin band of ink (the dots of an i) always joined the line above; on a line with no ascenders the descender then read six times too deep. It joins the nearer line.
- **Confidence was not lowered as documented.** Stems, sides and serifs kept "medium" or "high" under a 30 px cap. No reading is now trusted more than the cap height allows, and class confidences are printed and carried into the targets.
- **Silent repairs and omissions now say so:** a letter count patched by joining two shapes, a text with no x (so no x-height or stem), a transparent PNG (read as black on black), `--loc` values outside the axis or naming an axis the font lacks, a `--stem` the axis cannot reach.
- **Merging references depended on argument order.** Serif or sans was the mode, which on a tie is the first file named, and the base search then looked in the wrong category; it is now a weighted vote and a tie stops with `--serif yes|no`. The em size and line box could come from two different references; both now come from the one that counts most. A paragraph width is dropped when a reference that gave widths did not give one, instead of gating a blend against one font's paragraph.
- **Input checks:** a mistyped `--weight` name was ignored and a weight of 0 crashed; any spelling of `--scripts` was accepted and then skipped by the coverage gate; a first style with no stem went on to fail later. All stop with a message now.

### Fitting and spacing (`fit_font.py`, `space_font.py`)

- **Every weight was fitted to the first style's widths, sides and contrast.** Only the stem was worked out per weight. A Bold was squeezed to the Regular's widths, which narrow letters cannot reach, so every heavier weight missed its width gate (the Bold's narrow class by 9 to 15%) and was reported as "the base cannot reach these widths". Widths, sides, contrast and bar now keep the base's own ratio between the two weights, as the stem always did. Each style's targets are written to the fit log, and the spacing and checking steps read them from there. This is the largest change of behaviour: a three-weight fit that took six passes per weight and failed now takes one pass per weight and passes.
- **A stretch thinned the stems.** The width loop changed a class's stretch without solving its weight again, so a class squeezed to 0.97 kept 97% of its stem.
- **The width axis was used last, not first.** Errors under the stretch limit went into the stretch; past it, the re-aim forgot the stretch already applied and the class swung wide again. On a base with a width axis a class past tolerance now always takes a new instance.
- **A weight past the end of the axis was built silently lighter.** It is now a warning in the fit, a flag in the log, and a failed row in the check.
- **The log could describe a different font.** The loop corrected once more after its last measurement. The written font is now measured and logged, and "stretch limit reached" is said only of classes at the limit; others are "not converged".
- **Accents sat off their letters on every weight after the first,** by up to 13 units (30 on Vietnamese hooks), because a component's centre was taken from the wrong instance. The worst offset on a Bold is now 1.1 units.
- **The line box ignored how the reference sets lines.** It always took the typo metrics; a reference that sets lines from hhea (Roboto) got a 1.05 em line for its 1.17.
- **`--style` rebuilt one weight and wiped the others from the log;** an unknown name built nothing and exited 0. **`--loc wdth=` did not hold the width axis,** an unknown tag was dropped, and `wght` was accepted then overwritten. **Optical size was chosen per weight,** so x-height could differ between weights.
- **The collision guard destroyed mark positioning** on a font with a GPOS table and no kerning: it rebuilt the table from the guard pairs alone. It now adds a kern feature beside what is there. Pairs that round to "+0" are no longer counted.

### Packaging and checking (`package.py`, `check_font.py`, `find_foundation.py`)

- **The naming rule was a substring test,** in three slightly different copies. It passed `DM-Sans Neue` on a DM Sans base and refused `Printer Sans` on an Inter base. One shared rule now compares words: a protected name is contained when its words appear in a row however they are joined or cased. Reserved Font Names are read from declarations only, in any quoting, from the licence file and the copyright line.
- **The scan for the base's name failed every font on an Inter base,** because a glyph is named `interrobang`. It is now case-sensitive and bounded.
- **SemiBold and ExtraBold got neither the Regular nor the Bold style bit.** **Name records for character-variant features were dropped,** leaving features that pointed at missing names. **Accents were lost from the PostScript name** (Über became ber). **The licence file was not copied byte for byte** when it had Windows line endings, and any file mentioning the licence was accepted as the licence.
- **Gates that could not fail, or failed for the wrong reason.** Later weights had no stem gate. Every weight was gated on the first style's widths and contrast. A script with no character list was a note, not a failure. The paragraph and side gates vanished without a row when they could not run. "First style" was decided by position on the command line, so a glob that sorts Bold first gated the Bold on the Regular's paragraph. All fixed; skipped gates now say why.
- **The `fontbakery` gate failed nearly every build** on problems the base already had (a missing case pair, a zero-width combining mark). It now checks the base at the same location and fails only on what the fit added; it also finds `fontbakery` when its script is not on the PATH.
- **The outline-match gate** flagged every font's full stops as copies. Dots, bars and pills are exempt; so are rings on symbols (a degree sign). A letter or figure with a counter is always compared, so a copied O, o, 0 or D fails. One-point contours no longer crash it.
- **The base search** offered static fonts the fitter refuses, never read a local font's Reserved Font Name, and its `--offline` help said it used the cache when it does not.
- **A sibling-skill import** in `render_book.mjs` was removed before vendoring (it loaded code from a neighbouring folder by name).

### Specimen book (`font_book.py`, `book.css`, `render_book.mjs`)

- **Layouts that could not hold supported input:** more than 21 OpenType features on one page; three or more weights in a two-column layout (and a fifth dropped); a twelve-letter or three-word family name on the cover at a fixed 300 px; a feature cell widened by a long sample or stylistic-set name. All are sized or paged from measured text now.
- **The book described one weight and drew another** when the files came in glob order; it showed the wrong weight's guard log; the character-set page named the lightest style; a family name with `&` or a hyphen lost its guard log; the cover claimed Greek for a font with a pi and an omega.
- **The overflow check measured boxes, not text,** so text wider than its column counted as no overflow. It now measures the text too. A browser that fails to start is reported as that, not as "no Playwright".

### Tests

`python3 -B -m unittest discover -s make-font/scripts -p 'test_*.py'` runs 66 cases with no fonts and no network (skipped when the font libraries are absent). Two more are opt-in and slow: with `MAKE_FONT_TEST_VF` naming a variable font, one fits two weights end to end and checks every written stem against its target; with `MAKE_FONT_TEST_NODE_ROOT` also naming a folder that has Playwright, one renders a three-weight book in a browser, expects no overflow, then restores upstream's sizes and expects the check to fail.

## Security read, 2026-11-14

Every risky operation was enumerated by searching all scripts for subprocess, network, deletion, dynamic code, and file-write calls, and each hit was read in context. The later changes added no network call and no new write location; they added two `fontbakery` runs on temporary files.

- **Network:** only `find_foundation.py`, to four fixed hosts (`api.fontsource.org`, `cdn.jsdelivr.net`, `api.github.com`, `raw.githubusercontent.com`), with a generic user agent and no request body. Nothing about the references or the person is sent. `--offline` disables it.
- **Subprocess:** `curl` as a fallback download when Python lacks CA certificates; `fontbakery` when installed; `npm root -g` to locate Playwright. All use fixed argument lists, none through a shell with interpolated input.
- **Deletion:** only temporary directories the same function created.
- **Writes:** only into the output, cache, and book folders given on the command line. Cache file names are sanitized or reduced to a base name, so a catalogue entry cannot write outside the cache.
- **No** `eval`, `exec`, pickle, archive extraction, environment-variable reads other than `PW_CHROMIUM`, or telemetry.
- Downloaded fonts are parsed by fontTools and never executed.

## What was run, 2026-11-18

Python 3.14 with fontTools 4.68, uharfbuzz, skia-pathops, fontbakery 1.1; Node 24 with Playwright Chromium. Three reviewers each read one group of scripts line by line and confirmed their findings by running them. Then nine builds, each through measure, targets, fit, space, package, check, book and render:

| Build | Result |
| --- | --- |
| Two weights, a width-and-weight base, reference reachable by the base | Every gate passes for both weights; check exits 0 |
| Targets from a browser screenshot alone, two weights | Every gate passes; check exits 0 |
| Latin, Latin Extended, Cyrillic and Greek claimed | Every gate passes; check exits 0 |
| Five weights for UI, 300 to 900, a three-word family name | All stems, widths and sides pass. Fails, correctly, on a 900 the axis cannot reach and on a name too long for some applications |
| Three weights on a weight-only serif base whose axis stops at 700 | All stems and widths pass. Fails, correctly, on the 900 |
| Serif base with no width axis, fitted to a wider serif | Stems pass; widths fail by 2 to 6%, as the stretch limit predicts |
| Optical-size base with no width axis, fitted to another sans | Same: stems pass, widths fail honestly |
| Display use, two references blended, tracked −6 | Fails its width and side gates by the amount of the tracking, which is the documented reading of a tracked font |
| Three weights, Regular to Black, base's own measurements | One pass per weight, 25 seconds in all |

Every book rendered with 0 fallback glyphs and 0 overflows. Screenshots made in a real browser measured within 0.5% of the font file on class widths at a 70 px cap or more, about 1% at 43 px, and up to 3.6% at 28 px.

**Not run:** italics (not supported), a commercial reference, hinted or subpixel-coloured screenshots, macOS and Windows, Vietnamese beyond its coverage list, a base with character variants through the whole pipeline (only its name records were checked).

## Known rough edges

- `find_foundation.py` fetches the coarse-pass files from an unpinned `@latest` URL, so rankings can shift between runs. Keep the shortlist JSON with the build.
- The coarse pass downloads a few hundred small font files on first run (about a minute here).
- On a bare Linux machine Chromium needs system libraries before the book will render.
- `package.py` only ships OFL. An Apache-licensed base needs different packaging, which is not built.
- `font_book.py` expects fonts written by this pipeline, at 1000 units per em. Raw instances at another em size overflow the vertical-metrics drawing, and the render fails on it.
- The outline-match gate can report coincidences on glyphs built only from straight strokes. Fitting stems and widths to a reference makes such glyphs converge by construction: in the sans test build it flagged the Cyrillic Sha (Ш, ш) and three symbols against a reference they were never copied from. This is upstream behaviour, left in place because exempting rectilinear glyphs would also hide a copied H. Read each match before calling it a copy.
- A tracked font (`--track`) fails its width and side gates by the amount of the tracking. The gates do not subtract it; report it as the choice it is.
- The collision guard skips every pair with f on the left unless `--guard-f` is given, which also skips its own list of f traps (f before a bracket or a quote).
- `space_font.py --no-sides` only skips the last unit of correction; the fit has already set the class sides.
- When references of different confidence are merged, the target keeps the highest confidence among them.
