# Gridlines Alignment-Pass Routing Probes

Purpose: these probes check that the `design-craft` alignment-pass reference, folded from *gridlines* (`docs/gridlines-source-mining-2026-11.md`), can be reached from skill descriptions alone. They also check that the "edges don't line up" trigger added to the `design-craft` description does not take prompts that belong to its neighbours. The word "gridlines" also means chart gridlines, so one probe checks that collision. Re-run with a fresh judge that sees only the descriptions whenever the `design-craft`, `interface-review`, `web-design` or `data-viz` description changes.

Blind packet (descriptions and prompts, no expected answers): `python3 scripts/check_routing_probe_fixtures.py --packet`
Fixture check: `python3 scripts/check_routing_probe_fixtures.py`

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| G1 | "In our web app's settings sidebar some labels start 2px further in than others. Line up the icons and labels." | `design-craft` | Target: alignment-pass. |
| G2 | "The edges don't line up between our toolbar, the filter bar and the table under it. Do an alignment pass." | `design-craft` | Target: alignment-pass. Must not go first to `interface-review`. |
| G3 | "The unread counts in our nav sidebar don't line up with the icon buttons in the header above them." | `design-craft` | Target: alignment-pass (trailing line). |
| G4 | "The play icon in our round button looks off-centre. Fix it." | `design-craft` | Neighbour inside the same skill: surfaces → Optical Alignment. |
| G5 | "Review this whole onboarding flow for accessibility, copy, layout and polish, and give me a verdict." | `interface-review` | Neighbour: whole-flow reviews stay with `interface-review`. |
| G6 | "Our dashboard charts have heavy gridlines and too much chartjunk. Clean them up." | `data-viz` | Collision control: chart gridlines are not an alignment pass. |
| G7 | "Make our marketing site's layout responsive across breakpoints using CSS grid." | `web-design` | Neighbour: page layout and responsiveness. `frontend-design` is an accepted second skill. |
| G8 | "The text in our UICollectionView cells doesn't line up with the separators. How do layout margins work?" | `uikit` | Neighbour: native UIKit layout margins. |
| G9 | "Audit our app for hardcoded spacing values and move them onto design tokens." | `design-systems` | Neighbour: token audits are not alignment passes. |
| G10 | "Write a Rails migration that adds an index on users.email." | `rails` | Control. |

## Scoring

- **Retrieval pass:** the judge's first skill is the expected one, or an accepted second skill named in Notes.
- **Boundary pass:** `design-craft` does not take any neighbour or control.

Results are recorded in `docs/gridlines-source-mining-2026-11.md`.
