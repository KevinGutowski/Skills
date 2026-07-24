# Jakub Krehel skills source mining — 2026-07

Source: https://github.com/jakubkrehel/skills  
Revision: `f2d1354f9966fd4d03f9c2beb69591ecec22af54`

## Manifest and coverage

| Source area | Read | Density | Decision |
| --- | --- | --- | --- |
| Repository README and agent files | Yes | Low | Installation and repo-local instructions are not portable skill content. |
| `better-interface` | Yes | High | Adapt the orchestration pattern into a local `interface-review` entry point. |
| `better-accessibility` and six references | Yes | Medium | Folded its useful current-mechanics prompts into `web-design` (web-accessibility), corroborated against current W3C WCAG/APG sources; no wholesale fold. |
| `better-colors` and five references | Yes | Low–medium | Existing `web-design` (oklch-skill) already contains conversion, palette, contrast, gamut, and Tailwind guidance. Park the source's newer semantic-color notes for corroboration. |
| `better-layout` and two references | Yes | High | Created `web-design` (web-layout-design): durable structure/adaptivity rules corroborated with MDN/W3C; retained exact spacing, peek, and translation-growth numbers only as labeled heuristics. |
| `better-typography` and six references | Yes | Low | Existing web typography corpus is substantially deeper and already covers the durable mechanics. |
| `better-ui` and four references | Yes | Low | This repository already contained the same polish substrate and has since expanded it under `design-craft`. |
| `better-writing` | Yes | Low–medium | Existing `ux-writing` owns the same surfaces with deeper source material and boundaries. |
| `agents/openai.yaml` files | Inspected | Low | UI metadata is specific to the external skill names; not imported. |
| License | Inspected | n/a | No source files or long prose copied; integration is an attributed adaptation. |

## Fold map

Created `interface-review` because holistic review is a coherent user-invocable activity missing from the current taxonomy. The local adaptation preserves the strongest durable moves:

- resolve scope and quick/full mode before reviewing;
- map each concern to an existing domain owner;
- require source or runtime evidence for every finding;
- deduplicate symptoms into root causes;
- rank by user impact, reach, and leverage;
- report considered-but-rejected changes so restraint is visible;
- keep review read-only unless implementation is requested;
- end with verification gaps and one verdict.

The domain mapping is local: `web-design`, `design-principles`, `ux-writing`, `design-craft`, and—when applicable—`working-with-ai`, `apple-design`, and `swiftui`.

Second pass extended existing skills:

- Added `web-design` (web-layout-design) for grouping, shared edges, logical properties/RTL, content-driven breakpoints, container queries, WCAG reflow, safe areas, content stress, and discoverable overflow.
- Updated `web-design` (web-accessibility) with W3C-corroborated native-vs-ARIA keyboard behavior, composite-widget focus conventions, Focus Not Obscured, the WCAG 2.2 24×24 CSS px target-size floor, and the AA/AAA distinction for Focus Appearance.
- Updated `interface-review` to route structural review through the new layout reference.

## Parked or skipped

- Precise layout constants (`2×` grouping gaps, fixed control clearances, carousel peek distances, and 30–40% translation growth) remain heuristics, not standards. The layout reference explains which are diagnostic stimuli and where current W3C/MDN requirements take precedence.
- The external specialist review-output templates are not repeated in every owning skill; the new orchestrator provides one shared report.
- The external accessibility, color, typography, polish, and writing prose largely duplicates or narrows existing references.
- No external scripts, prompt wording, credentials, or metadata were imported.
