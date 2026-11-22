# design.how source mining — 2026-11

Source: https://github.com/arla6ka/design.how/tree/main/skills (Arlan Marat; site https://design.how). License: MIT. Revision: `148b94c` (2026-11-14), shallow clone.

Ticket: "Take a look at these — can we fold them in? Should we make new skills or just add them to our existing ones?"

**Answer: fold six into existing skills; one new top-level skill.** Six of the seven skills are one suite about owning a design system in a real codebase (build it from shipped UI, map tokens, document a component, migrate the app, review a screen, plus a router). Their task shapes already have owners here: `design-systems` and `interface-review`. The seventh, `make-font`, stands alone and is script-driven. It was first parked; on the owner's request (2026-11-14) its scripts were reviewed and run, and it became the `make-font` skill. All prose is paraphrased. The only upstream files copied are make-font's twelve scripts (MIT, licence text included; all since changed, so `make-font/scripts/` is a fork). The source's install commands (`npx skills add`, `npx shadcn add`) were not run.

## Manifest and coverage

| Source | Read | Density | Decision |
| --- | --- | --- | --- |
| `README.md` | Yes | Medium | Suite map and the "scripts do what prose can't" stance → ledger only. |
| `skills/design-system-boss/SKILL.md` + 4 playbooks | Yes | **High** | Ask-to-plan triage, "state wins over the ask", "fix it is not clearance", never-ship list → `design-systems` SKILL.md router and system-from-shipped-ui. |
| `skills/build-design-system/SKILL.md` | Yes | **High** | Eight steps with done-conditions, readiness audits, never list, rules → `design-systems` system-from-shipped-ui. |
| `…/references/tokens.md` | Yes | **High** | Layers, naming, never-a-token list, merge tolerances, generating, motion presets → system-from-shipped-ui (Token rules). |
| `…/references/components.md` | Yes | **High** | One per family, registry, census, state order, pending pattern, behavior contract, table/template rules → system-from-shipped-ui (Canonical components). |
| `…/references/glossary.md` | Yes | **High** | Decision vs gate, gap, identical-value swap, verdict words, counts with units → system-from-shipped-ui (Working vocabulary). Verifier/reviewer split → `working-with-ai`. The avoid-word lint → `creating-skills`. |
| `…/references/taste.md` | Yes | Low | Offer-once bans that become check rules → one line in step 1. Geist-as-structure-reference → component-docs. |
| `…/references/traps.md` | Yes | **High**, heavy overlap | ~110 trap IDs. Novel behavioral ones → `interface-review` behaviour-traps; the rest pointed at their existing owners. |
| `skills/token-mapping/SKILL.md` + `mapping-rules.md` | Yes | **High** | → `design-systems` token-mapping. |
| `skills/component-docs/SKILL.md` + `doc-format.md` | Yes | **High** | → `design-systems` component-docs. The worked Toast example was summarized in one line, not copied. |
| `skills/migrate-design-system/SKILL.md` | Yes | **High** | Modes, nine steps, brief, rules → `design-systems` migration. |
| `…/references/lessons.md`, `parity.md` | Yes | **High** | Eight lessons and ten parity classes → migration. |
| `…/references/running-many-agents.md`, `correct.md` | Yes | **High** | Not design-system-specific → `working-with-ai` (agentic-coding). |
| `skills/ui-review/SKILL.md` + `criteria.md` | Yes | High, overlaps `interface-review` | Deltas only → `interface-review` SKILL.md and behaviour-traps. |
| `skills/make-font/SKILL.md` + all 7 references | Yes | High, tooling-bound | NEW skill `make-font` (SKILL.md, method, checks-and-licensing, sources, coverage-gaps). A when-to-take-this-route note stays in `web-design` (web-typography → choosing-and-pairing §6). |
| `skills/make-font/scripts/` (12 files, ~176 KB) | Risk surface enumerated and read in context; `find_foundation.py`, `render_book.mjs` and the provenance/validity gates read in full; geometry code verified by an end-to-end run, not proof-read | n/a | Vendored into `make-font/scripts/` and since changed in every file, plus unit tests. Review record: `make-font/references/sources.md`. |
| `evals/run.mjs` (help text and lint section), `triggers.json` (head), `incidents/` (list + one case) | Partly | Medium | Suite-hygiene pattern → `creating-skills` measuring-skill-effect. |
| 10 design-system scripts under `skills/build-design-system/scripts/` and `skills/migrate-design-system/scripts/` | **No** (names and described behavior only) | n/a | Not vendored. Linked at the pinned revision from the references that mention them. |
| `systems/` (Glaze, Lime, Quartz, Sodium: one ~40 KB SKILL.md each plus components) | Quartz SKILL.md head only | Not screened | Outside the ticket's `/skills` path. Parked. |
| `vault/` (~60 visual-effect skills) | Directory listing only | Not screened | Outside the ticket's path. Parked. |
| `LICENSE` | Yes | n/a | MIT. Attribution kept in every touched file's source note. |

## Fold map

- **`design-systems`**
  - NEW `references/system-from-shipped-ui.md`, `token-mapping.md`, `component-docs.md`, `migration.md`.
  - SKILL.md: description rewritten under the 450 cap to cover the hands-on work; a "Hands-on runs in a codebase" router placed before the strategy sections; one checklist line; two relationship bullets.
  - `sources.md`, `coverage-gaps.md`.
- **`interface-review`**
  - NEW `references/behaviour-traps.md` (symptom table, probes, task-level criteria, edge cases, trap tables, what not to report).
  - SKILL.md: a "probe behavior, don't infer it" paragraph, fix-as-a-failing-check in the evidence list, and two severity rules (believed-finished, shown-versus-sent). Description unchanged.
  - `sources.md`, `coverage-gaps.md`.
- **`working-with-ai` (agentic-coding)**: NEW section "Running many agents on one repo" with a "Correction pass" subsection; Contents, checklist, sources.
- **`creating-skills` (measuring-skill-effect)**: NEW "Suite hygiene for sibling skills"; sources.
- **`make-font`** (NEW top-level skill, cross-domain tool): SKILL.md, `references/method.md`, `references/checks-and-licensing.md`, `references/sources.md`, `references/coverage-gaps.md`, and `scripts/` (twelve vendored files plus the upstream licence text).
- **`web-design` (web-typography → choosing-and-pairing §6)**: NEW "a font like these, but ours" note pointing at `make-font`; sources.
- **Repo docs:** README (rows for `design-systems`, `interface-review`, `make-font`), audit row, smoke test S43, routing probes V19–V24 and their results, this file, `mining-ledger.md`.

### Why not new skills for the design-system suite

- The taxonomy rule is extend > create > skip, and a new skill normally needs two or three independent sources. This is one author's suite.
- The source needs seven skills because each installs separately and they cross-reference a shared glossary. Here, a cluster body already routes to reference files, so the suite's router (`design-system-boss`) became a table in `design-systems` SKILL.md.
- `ui-review` would have been a second holistic-review skill competing with `interface-review` for the same prompts.

### Why `make-font` is its own skill

- It is a cross-domain tool with one narrow task shape, the kind the taxonomy keeps top-level (like `x-post-reader` and `route-planning`), and no existing cluster owns "produce a font file".
- It is useless as prose alone: the method is the scripts. The ops rule against importing scripts "by default" was met with a review and a run rather than waived.
- Two defects found in review were patched locally: a false positive in the outline-match gate (round dots matched any TrueType reference) and a dynamic import from a sibling skill folder.
- A QA run on 2026-11-17 (two weights, a base with 26 OpenType features) found five more, all reproduced and fixed: an unpaginated features page that failed the book render, later weights escaping the stem gate, the book describing one weight while drawing another, static fonts offered as bases the fitter refuses, and wrong weight counts and Reserved Font Names in the package README.
- Two further QA passes (2026-11-17, 2026-11-18) tightened the dot exemption (it had let a copied O through and crashed on one-point contours) and fixed a fitter defect: width iterations changed a class's stretch without re-solving its weight, so second weights were written with stems about 3% light. A last pass made the specimen book's weights page fit three or more styles and taught the render check to measure text rather than boxes.
- A deliberate hardening pass followed (2026-11-18): three independent line-by-line reviews and a nine-configuration build matrix. It found about forty more defects, the largest being that every weight was fitted to the first style's widths, so no Bold could pass its own gates. All twelve scripts were changed; `make-font/scripts/` is now a fork of upstream, recorded by area in `make-font/references/sources.md`.

## Conflicts and scoping

| Topic | design.how | Existing | Handling |
| --- | --- | --- | --- |
| Review output | Buckets `blocking / should-fix / note / dismissed` and a "Ready to ship" line | `interface-review` HIGH/MEDIUM/LOW and Block/Needs changes/Approve | Local scale kept; only the severity rules were folded. |
| Reviewer panel | Identical prompts, no personas | `scored` mode persona walk-throughs (Impeccable) | Panel parked in coverage gaps. |
| Pending buttons | `aria-disabled`, never `disabled`, idle label kept | Tactile theme: disabled until the action can work; Dannaway: avoid disabled buttons | Different moments (pending vs not yet valid). Stated in the trap table as a pending-state rule only. |
| Border and shadow on one surface | Pick one: border at rest, shadow when raised | `design-craft` themes with shadow-as-border | Trap row defers to a committed theme. |
| Reading measure | Flag over 75ch or under 30ch | Rutter 45–75, Krehel 60–75 | Not folded; owners keep their ranges. |
| Component tokens | Start with zero | Zalando: rationed and private | Same direction; noted inline. |
| Skill authoring promotion rule | Single external source | `creating-skills` promotes only from official docs, repeated local failures, verified conversions, or governance decisions | Folded as a labelled single-source section, following the Impeccable precedent. Worth a human look. |

## Already covered, not re-folded

`transition: all`, ease-out enters, shorter exits, transform/opacity only, origin from the trigger, interruptible retriggers, reduced motion, no transitions on theme switch, tabular numbers, color-only status, `dvh` and safe areas, hover under `(hover: hover)`, 16 px inputs on touch, never disabling zoom, error timing on blur/submit, `aria-invalid` + `aria-describedby`, input `type`/`inputmode`/`autocomplete`, icon-only button names, pointer capture for drags, sentence case, OKLCH for color math.

## Parked

- **The ten design-system scripts** (drift check, guarded capture, pixel diff, legacy ratchet, landing, body and parity checks). Linked, not vendored; see `design-systems/references/coverage-gaps.md`.
- **`systems/`**: four shadcn-installable design systems, each with a long rule-per-ID SKILL.md. A possible exemplar of a "design system as agent context" pack (an open gap in `design-systems`), not screened.
- **`vault/`**: about sixty visual effects packaged as skills with fixed/variable steps and a self-check script. Candidate for `creative-coding` or `frontend-design`, not screened.
- **Single-source numbers**, listed in the two coverage-gaps files.

## Routing check

The `design-systems` description changed and `make-font` is a new description. Probes V19–V24 were added to `docs/vercel-routing-probes-2026-06.md`; results are in `docs/vercel-routing-probe-results-2026-06.md`.

## Coverage answer

- **Read:** README, all seven SKILL.md files, the four playbooks, and every reference; the eval runner's help and lint logic, one incident case, the head of the trigger fixture; make-font's scripts as described in the manifest.
- **Skipped:** the ten design-system script bodies; `systems/` beyond one file head; `vault/`; site pages beyond the repo.
- **Changed:** `design-systems`, `interface-review`, `working-with-ai`, `creating-skills`, `web-design`. **New:** `make-font`.
- **Parked:** see above.
