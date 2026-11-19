# Method: measuring, choosing a base, fitting, spacing

Judgment behind steps 2–6. Paraphrased from the upstream references (see [sources.md](sources.md)); the scripts' `--help` texts are the authority on flags.

## Contents

- Units and letter classes
- Measuring a font file
- Measuring a screenshot
- Choosing the base
- Fitting: why x and y come from different places
- Fitting limits
- Several weights
- Spacing, track, kerning
- The collision guard
- Check by eye

## Units and letter classes

Every number is cap-normalized: the font is scaled so its cap height is 700. A screenshot has no em size, so this is the only scale a screenshot and a file share. A file also records its real cap height per 1000 em, which sets the em of the output; a screenshot-only build keeps the base's ratio.

Lengths come from straight cuts through the ink: x-height, cap height, ascender, descender, overshoot, the n stem and counter, the H stem and bar, the o's thick and thin strokes (their ratio is contrast), serif reach and tip, and the paragraph width of a fixed text shaped with kerning. A serif counts as present when its reach is over 12% of the stem.

**Width classes are fixed by how a letter is built, never tuned per letter:** lowercase straight (h m n u), bowl (a b d g p q), curved (c e o s), diagonal (k v w x y z), narrow (f i j l r t); capitals straight, curved, diagonal, wide (M W), narrow; plus figures. One mean per class is a target. A single letter's advance is never a target — that would copy the reference glyph by glyph. This is the mechanical form of "numbers, never outlines".

## Measuring a font file

Reads TTF, OTF, and WOFF2; confidence is high for everything. For a variable font, pick a location, or solve the weight axis to a given n stem so candidates are compared at equal color.

## Measuring a screenshot

- The image is split into lines and letters by connected ink, and edges are read with sub-pixel precision from anti-aliasing. If the letter count disagrees with the text you passed, the script stops: crop tighter or set the text larger.
- **Advances need context.** Widths and sidebearings can only be recovered from the purpose-built sample lines (letters set between n's and H's). A screenshot of ordinary text gives vertical proportions, stems, and contrast, and no widths: a class width is recorded only when every letter of the class was read, and nothing is read across a word space.
- **Confidence:** high for vertical lines when the cap is 60 px or more and strokes are 6 px or thicker; medium for advances, sides, and 3–6 px strokes; low for strokes under 3 px, serif tips, and anything with a cap under 30 px. Report every low number; the targets step gives them less weight.
- A screenshot cannot give the em size, vertical metrics, kerning, or anything hinting or stem darkening has moved. **Subpixel (colored) anti-aliasing breaks the reading** — ask for a grayscale capture or a larger size.
- Run the self-test at the screenshot's own size first (`--px` is px per em; a cap is about 0.7 em). As a calibration from this library's own runs, sample lines captured in a real browser read class widths within 0.5% of the font file at a 70 px cap or more, about 1% at 43 px, and up to 3.6% at 28 px; stems stayed within 1 unit down to 43 px. Check the capture is in the font you think it is: a fallback font measures just as confidently.

## Choosing the base

The base decides most of what the font looks like. Fitting moves widths, weight, and spacing; it cannot change a terminal, a serif's shape, the stress angle, or a one- versus two-storey letter. So the search weights the numbers fitting cannot fix as heavily as those it can, and never fits a serif into a sans.

- Candidates are OFL or Apache families from the Google Fonts catalogue in the asked category, covering every asked script, upright, excluding math, symbol, and icon families; plus any local folder you pass (a local font with no open-licence notice in its name table is skipped).
- Two passes: a coarse ranking on one small file per family, then the best few downloaded whole, solved on their weight axis to the target stem and sampled across optical size.
- **The base must be a TrueType variable font.** The fit builds every weight and width from the base's axes, so static and CFF files are left out of the search (it prints how many). Missing axes still add a penalty: none with width and weight axes, a little with weight alone.
- **Then look.** Render each of the top three to five at display size beside a reference with cap heights matched. A candidate that wins on numbers but has the wrong skeleton (oldstyle against transitional, angled stress against vertical, a ball terminal against a sharp one) is the wrong base.
- Prefer, in order: the right skeleton, a width axis alongside weight, an optical-size axis (it holds contrast), script coverage, then the score. A weight-only base works when the widths are already within 3%.
- Note any Reserved Font Name now; it constrains the new family name.
- If the top hit is the reference's own open family, the references were open to begin with: say so. Building on it is allowed, and the outline-match gate will fail by design.

## Fitting: why x and y come from different places

Every location of one variable font has the same points in the same order, so a glyph can take its x coordinates from one location and its y coordinates from another and remain a valid outline. Width and contrast often live at opposite ends of an axis; a reference that is wide *and* high-contrast sits at neither end. Bars, hairlines, and x-height follow y; stems and curved sides follow x.

The fit solves a y instance (weight to the target stem, optical size for contrast), then an x instance per width class (on a width axis when there is one, otherwise a horizontal scale with the stem re-solved so it lands on target after the stretch), assembles, measures, corrects, and repeats up to six passes. It then removes overlaps, scales the em so cap height matches, sets the line box from the reference's vertical metrics when a file gave them, and drops the variation tables.

## Fitting limits

- **Stretch.** Past 3% a glyph reads as stretched: curved strokes get heavier than stems and curves flatten. If a class needs more, say so, keep the cap, and offer a base with a width axis. Capitals at 8–10% are a person's call with a strong reason. Above 10% the base is wrong. (In this library's test run, a weight-only base hit the cap on six classes and the width gates failed by 2–6%, exactly as the limit predicts.)
- **Bare stems.** i, l, and I are one stem, so the narrow classes move mostly through their sidebearings. That is correct.
- **Kerning from an extreme location.** Some variable fonts extrapolate pair kerning badly at the ends of an axis. If kerning reads wrong in a word at 18 px, rebuild with a y location nearer the axis default.
- **Kinks.** Mixing x and y from distant locations can kink a curve. Render S & @ W Q g a e y at 200 px and look. If one kinks, take both from one location and solve widths with factors alone.
- **What fitting cannot change:** serif thickness and bracket shape, terminals, stress angle, storeys. Report these as known gaps, never as fitted.
- **Weight color.** Matching the n stem does not match color. If the reference's curved strokes or serifs are heavier relative to the stem, the result reads lighter; compare the o's thick stroke and the serif tip in the check table and report the gap.

## Several weights

- **The first style is the anchor.** It takes the measured stem and the measured widths, sides, and contrast, whatever weight number it carries. List first the weight the references are drawn at (usually Regular).
- **Every later style is placed from it on the base's weight axis:** the first style sits where the base draws its stem, and a style 300 heavier sits 300 further along. Its stem is what the base draws there, unless you give one explicitly.
- **Its widths, sides, contrast, and bar keep the base's own ratio between those two weights.** A Bold is as much wider than the Regular as the base's Bold is than the base's Regular. It is not squeezed to the Regular's widths: narrow letters are mostly stem and cannot be.
- **A weight past the end of the axis is built at the end,** and the fit warns that it is lighter (or heavier) than its name says. The check fails a row for it. Offer a base with a longer axis or drop the weight.
- On a base with an optical-size axis, one size is chosen for the first style and reused, so x-height is the same in every weight. All styles share vertical metrics so they can mix in one line.

## Spacing, track, kerning

- Each side of a basic Latin letter is straight, curved, or other. The targets give the mean straight and curved side per case; every straight side moves by the straight difference, every curved side by the curved difference, and diagonals and open terminals by the mean of the two. Accented letters move with their base letter, and mark anchors move with the glyph. Figures, punctuation, symbols, and small capitals keep the base's spacing.
- With only a screenshot of ordinary text there are no side targets; the rhythm (twice the straight side over the n counter) still carries the spacing over.
- **Track** adds units to both sides of every inked glyph and leaves the word space alone. Display faces at 48 px and above usually want −4 to −12; text at 16 px wants 0. Tracking shows up in the width and side gates by its own amount: that is a choice, report it as one.
- The base's pair kerning comes through, scaled with the em. **Kerning is never taken from a reference.**

## The collision guard

After all moves, every pair of letters, figures, and common punctuation plus known traps (q j, g j, f before brackets, quotes before A) is shaped with kerning on, and any pair whose inks come closer than the minimum gap (6 units for text, 4 for display, 8 for UI) gets a kerning value that opens it. The guard only opens, never closes. f on the left is skipped by default because its hood is meant to overhang.

The count is a health check: twenty to eighty pairs is normal after tightening (the test run opened 51). Over 150 means the class moves or the track are too aggressive — loosen and rerun rather than shipping 150 patches.

## Check by eye

Set `nnnonnnoonnoonnn`, `HHHOHHHOOHHOOHHH`, and the n-alphabet and H-alphabet strings at 48 px, and a paragraph at 16 px. Curved letters should sit as evenly between n's as straight ones do. A gate passes on numbers; a letter that reads wrong only shows in a render.
