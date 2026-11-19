# Coverage Gaps

- **Single-source thresholds.** The 3% stretch cap, 0.3% fit tolerance, 150-pair guard ceiling, the 2% outline-match distance, the distance-score weights, and the gate tolerances by use all come from one practitioner's tool. No type designer has reviewed them here.
- **Review depth.** Every script has now been read line by line by an independent reviewer and its findings fixed, but the reviewers were given a cap of twelve findings each and all three reached it. More, smaller defects probably remain.
- **No accepted local exemplar.** There is no font made with this skill for a real brief, and no judgment yet on whether a fitted result satisfies a designer who asked for "a font like these".
- **Screenshot path.** Verified on greyscale captures from one browser at four sizes. Hinted, stem-darkened, or subpixel-coloured captures, and captures from design tools, are untested.
- **Scripts beyond Latin.** Coverage for Latin Extended, Cyrillic, and Greek was checked on one base. Class spacing is defined for basic Latin only; other scripts keep the base's spacing and widths.
- **Italics.** The search skips italic files and nothing fits a slant.
- **Legal reading.** The OFL summary is operational guidance. The line between matching proportions and imitating a protected design has not been reviewed by counsel, and typeface protection differs by country.
- **This is a fork.** All twelve scripts differ from upstream, and the per-weight targets change what a multi-weight fit produces. An upstream update cannot be dropped in; each change would need re-applying by hand. Nothing has been reported upstream.
- **Per-weight targets are this library's design decision.** Upstream fitted every weight to the first style's widths. Keeping the base's ratio between weights is the reading that lets a Bold pass, but nobody has checked it against how a type designer would want a matched family to widen. There is no switch back to upstream's behaviour.
- **Outline-match gate precision.** It is a point-structure heuristic. It has known false positives on straight-stroke glyphs (see sources, Known rough edges) and cannot compare a CFF reference at all. Nobody has measured its miss rate on real copied outlines beyond the four letters tested.
- **Test depth.** 66 unit cases cover the changed rules. The two end-to-end cases are opt-in because they need a font file and Playwright. The nine-build matrix was run by hand and is not automated.
- **Capital stems.** The H stem is solved like the n stem and was within 1 unit on the builds inspected, but only the n stem is gated.
