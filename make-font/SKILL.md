---
name: make-font
description: "Make a custom font family from fonts someone likes: measure reference files or screenshots, pick the closest open-licence base, fit its proportions, widths and spacing to those numbers, run gates, and ship an OFL family with web files and a specimen book. Never copies outlines. Choosing or pairing existing fonts → web-design; logos and wordmarks → logo-design. Triggers: make a font, custom typeface, our own font, a font like these."
---

# Make a Font

The person names fonts they like. Measure them, pick an open-licence font as the base, and bend that base to the measured numbers. Every outline in the result comes from the open base; the references give numbers only. The output ships under the SIL Open Font License with a new family name.

**Source:** design.how `make-font` by Arlan Marat (MIT, `148b94c`). The scripts here are a maintained fork: all twelve were changed after a security read, five QA passes, and a line-by-line hardening pass. What changed, what was run, and the limits are in [references/sources.md](references/sources.md); open questions are in [references/coverage-gaps.md](references/coverage-gaps.md).

## The line it holds

Say this at the start, in plain words: *"I match proportions, widths and spacing on an open font. I don't trace or copy the outlines of the fonts you send."* Then hold it.

- The build steps read only the base font and `targets.json`. Never open a reference font while fitting or spacing.
- Targets are font-wide numbers and class means. Never take a per-glyph advance, a kerning pair, or a point from a reference.
- Refuse a request to clone, trace, convert, "rebuild exactly", or rename a commercial font. Offer the proportional match.
- A screenshot of a commercial font is fine to measure, and so is its file if the person has it. Neither is copied into the output or committed anywhere, and its name appears nowhere in what ships.

## Setup

Scripts live in this skill's `scripts/`. Every script answers `--help`.

- Python 3.9+ with `fonttools`, `brotli`, `uharfbuzz`, `numpy`, `pillow`, and `skia-pathops` (overlap removal). `fontbakery` is optional; when absent, its gate reports "not run". When present, the gate fails only on problems the base did not already have.
- Node 18+ with Playwright and a Chromium for the specimen PDF only (`npm i -D playwright && npx playwright install chromium`; on a bare Linux box also `npx playwright install-deps chromium`).
- Run Python as `python3 -I <skill>/scripts/<name>.py` and pass paths. Work in a scratch folder outside the skill.
- **Network:** only step 4 goes online, and only to fetch the font catalogue and candidate font files (`api.fontsource.org`, `cdn.jsdelivr.net`, `api.github.com`, `raw.githubusercontent.com`). It sends no reference data. `--offline` with `--local <dir>` skips it. Downloaded fonts go in the cache folder and are parsed, never executed.

## Steps

Each step has a done-condition. A failed gate goes back to the step that owns it.

1. **Ask once.** In one message: the fonts they like, as files or screenshots (two to four is plenty); what the font is for (text, display, or UI); scripts and languages; weights; a new family name. If they can type in the font (a foundry's type tester, a design tool), ask for a large screenshot of the four sample lines (`SAMPLE_LINES` in `scripts/fontlib.py`), cap height 80 px or more. Take defaults for anything unanswered and say which: text, Latin, Regular and Medium, a name you propose.
   *Done when references, use, scripts, weights, and name are written down.*
2. **Measure.** Files: `measure_font.py <file> --out m1.json`. Screenshots: `measure_image.py <shot.png> --text "line|line" --out m2.json`. Widths and sidebearings come only from the four sample lines; ordinary text gives vertical proportions, stems, and contrast. Before trusting a screenshot, run `measure_image.py --selftest <any open font> --px <px per em>` (a cap is about 0.7 em) to see how far pixel readings land from a file's numbers. Read every `note:` line the scripts print, and report every number marked low confidence.
   *Done when each reference has a measurement file and the person has seen the main numbers.*
3. **Targets.** `make_targets.py m1.json m2.json --family "New Name" --use text --scripts latin --style Regular:400 --style Medium:500 --out targets.json`. Where references disagree the script lists the spread: ask which way to lean rather than averaging. If they split evenly between serif and sans it stops and asks for `--serif yes|no`. The first style takes the measured stem, so name the weight the references are actually drawn at first; later styles are placed from it on the base's weight axis. `--scripts` takes `latin`, `latin-ext`, `vietnamese`, `cyrillic`, `greek`.
   *Done when `targets.json` exists and every spread has an answer or a stated default.*
4. **Find the base.** `find_foundation.py targets.json --cache <dir> --out shortlist.json`. Show the top three to five with their deltas, axes, licence, and any Reserved Font Name; render each beside a reference if you can; recommend one; **wait for a yes.** Only TrueType variable fonts are offered, because the fit cannot build on a static file.
   *Done when the person confirmed a base. Do not build before that.*
5. **Fit.** `fit_font.py <base-vf.ttf> targets.json --out-dir build/`. It solves stems and contrast, then widths per letter class, until each class mean is within 0.3%, never stretching more than 3%. A weight after the first keeps the base's own ratio to the first weight for widths, sides, and contrast; those per-weight targets are written to `build/fit-log.json`, which the next steps read. Read every `WARNING` line: a weight past the end of the base's axis is built lighter than its name says, and a class at the stretch limit needs a base with a width axis. Tell the person either way. `--style Bold` rebuilds one weight and keeps the others in the log.
   *Done when every style is written and `fit-log.json` shows each class within tolerance or explained.*
6. **Space.** `space_font.py build/X-Regular.fit.ttf targets.json --out build/X-Regular.ttf [--track -4]`, once per weight. It picks up that weight's targets from `fit-log.json` beside the font. More than 150 collision-guard pairs means the spacing is too tight: loosen and rerun. Tracking shows up in the width gates by its own amount; that is a choice to report, not a defect.
   *Done when the guard count is under 150 and its log is saved.*
7. **Package and check.** `package.py build/*.ttf --targets targets.json --base <vf> --base-licence <OFL.txt> --holder "<who owns the modifications>" --out-dir dist/ --fit-log build/fit-log.json --space-log <log> [--space-log <log> …]`, then `check_font.py dist/ttf/*.ttf --targets targets.json --base <vf> --reference <ref file> --package dist/ --fit-log build/fit-log.json --out-dir checks/`. Always pass `--fit-log`: without it, weights after the first are reported, not gated. File order does not matter. Read the `INFO` rows too; a gate that could not run says why. Look at every overlay render yourself, at text and display size.
   *Done when the check exits 0, or each failure is listed for the person with its number and reason.*
8. **Font book.** `font_book.py dist/ttf/*.ttf --webfonts dist/webfonts --targets targets.json --fit-log … --space-log … --check-report checks/check-report.json --licence dist/OFL.txt --out-dir book/`, then `node <skill>/scripts/render_book.mjs book/ --root <dir with node_modules>`. It fails on a fallback glyph or an overflow. Open three pages and look before handing over.
   *Done when `book/fontbook.pdf` exists and the render exits 0.*

Judgment for steps 2–6 (what a screenshot can and cannot give, how to choose a base, stretch and kink limits, tracking, the collision guard): [references/method.md](references/method.md). Gate tolerances, kill criteria, OFL and naming rules, refusals, and the font book: [references/checks-and-licensing.md](references/checks-and-licensing.md).

## Hand-off

Tell the person, in this order: what was made (family, weights, glyph count, scripts); the base and its licence; the gates with their numbers, pass and fail; what still differs from the references and why (the base's own drawing: terminals, serif shape, a letter that reads differently); where the files are. Attach the PDF. State the provenance plainly: built on an open font, fitted to measurements.

## Never

- Copy, trace, auto-trace, or convert outlines from a reference, or copy its kerning or per-glyph widths.
- Ship under any licence but the OFL, keep the base's name or a Reserved Font Name, or keep its trademark record.
- Put a reference font's name in the output files, the font book, or the package README.
- Call a gate passed that was not run this session.
- Stretch a glyph past the limit to hit a number. Report the gap instead.
- Commit or publish font files unless the person asks, and never a reference font.

## Relationship to other skills

- **`web-design` (web-typography)** — choosing, pairing, and setting existing typefaces; its choosing-and-pairing reference explains when a fitted open base is the right route at all. Loading the finished web fonts (subsetting, `font-display`, fallbacks) lives there too.
- **`apple-design` (apple-typography)** — optical sizes, grade, and metrics vocabulary used when reading the measurements.
- **`logo-design`** — a wordmark or a handful of custom letters is drawing, not font fitting.
- **`design-systems`** — the finished family becomes the system's type tokens; weights a token names must exist in the files.
