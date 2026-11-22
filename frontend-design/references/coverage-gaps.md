# Coverage Gaps

Use this file for frontend-generation guidance that needs screenshots, assets, or accepted examples before becoming durable.

## Candidate gaps

- **Generated UI fixtures:** Add before/after examples only with code, screenshots, viewport checks, and accepted rationale.
- **Asset sourcing:** Visual-asset rules should distinguish generated images, sourced images, local assets, and code-native visuals with license/provenance where needed.
- **Anti-slop checks:** Partly closed (2026-11). [anti-slop-catalog.md](anti-slop-catalog.md) names the tells and maps them to Impeccable's deterministic detector IDs. Still open: a local fixture set (before/after screenshots) showing each tell and a waived, world-earned instance. Missing imagery and non-demonstrative hero artifacts still have no reliable mechanical check.
- **Direction assignment:** The "propose, then assign" procedure in [surface-modes.md](surface-modes.md) rests on one project's evaluation campaign. Needs an independent local comparison (self-ranked vs assigned direction, same briefs) before it becomes a hard rule.
- **Reflex-face and saturated-look lists:** These shift as models change. Recheck against Impeccable's current detector and new generated output each half-year rather than treating the lists as permanent.
- **Library picks:** [ui-library-picks.md](ui-library-picks.md) is one practitioner's list dated 2026-11 and includes his own library. Recheck maintenance status and add a second independent source before treating any row as a default.
- **Base UI traps:** the tables in [ui-library-picks.md](ui-library-picks.md) were read from Base UI's own docs at 1.9.0 (2026-11-18) and none were run in a project here. They are version-bound: recheck against the releases page on each minor, and drop the Scroll Area row when Base UI removes its WebKit check. The Motion exit-detection row disagrees with the vendored `motion` kit text; a dated note there records it.
- **Copy budget:** Rule `copy-budget` in [anti-slop-catalog.md](anti-slop-catalog.md) rests on one exhibit (Luke Wroblewski, 2026-11) plus the library's existing economy rules. The one-line-per-surface default is our number. Needs a local with/without comparison on the same briefs (count supporting lines and unrequested actions per surface), a second independent source, and a check that the rule does not strip consequence copy from destructive or payment flows. No deterministic detector exists; a word count per container is a plausible one.
- **Background patterns:** The construction rules in [visual-execution.md](visual-execution.md) come from one tool's tile markup, and `scripts/svg_pattern.py` was checked only in headless Chromium: a contact sheet of every kind, and a 1x pixel read showing 1px lines stay one pixel across the seam. Safari and Firefox mask rendering and HiDPI output were not checked. The 15% opacity starting value is Nucleo's default, not a tested rule. Still needed: an accepted example where a pattern came from the subject's world, next to a rejected decorative grid.
- **Theme selection:** Add examples where the right move was bold/distinctive vs restrained/platform-native rather than blending both.
- **Accessibility/performance:** This skill builds; `web-design` and `design-craft` own many tactical checks. Promote only rules that reliably improve generated frontend outcomes.

## Candidate promotion form

```markdown
Candidate:
UI type:
Source or accepted generated example:
Evidence artifact:
Rule:
Check possible:
Exception:
Status: proposed | accepted | rejected
```
