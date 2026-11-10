# Impeccable source mining — 2026-11

Source: https://impeccable.style (Paul Bakaus). Repository: https://github.com/pbakaus/impeccable. License: Apache-2.0. `skill/reference/ios.md` and `android.md` are MIT-derived from ehmo/platform-design-skills; see the repo's `NOTICE.md`.
Revision: `b3ced85312e91797bcb7929f858cecdf6138d3bd` (2026-11-09). Site pages fetched the same day.

Ticket: "incorporate, strengthen, and clarify skills from https://impeccable.style."

Impeccable is one user-invocable design skill (`/impeccable`) with 24 command playbooks, a Rust detector of 62 deterministic anti-pattern rules, a live browser variant mode, and a paid concept catalog behind an API. All text below is paraphrased. No skill text, scripts, binaries, or prompt wording were imported, and nothing here installs or runs the Impeccable CLI.

## Manifest and coverage

| Source area | Read | Density | Decision |
| --- | --- | --- | --- |
| Site home, `/designing`, `/docs`, `/faq` | Yes (HTML → text) | Low–medium | Workflow framing (start / improve / check / maintain) and mode names; marketing and testimonials skipped. |
| `/research` ("The model can't roll its own dice", July 2026) | Yes | **High** | Twelve findings on model variety, commitment, and review. Folded into `frontend-design` (surface-modes), `working-with-ai` (ai-ui-direction), and `creating-skills` (measuring-skill-effect). |
| `/slop` anti-pattern catalog page | Yes (cross-checked against the registry) | High | Same content as the detector registry, below. |
| `skill/SKILL.src.md` | Yes | High | Brief wins, refine vs redesign, loaded symbols, the four visitor modes → `frontend-design` SKILL.md and surface-modes. |
| `reference/craft-floor.md` | Yes | **High** | Verify and refuse lists, browser surfaces → `frontend-design` (anti-slop-catalog). |
| `reference/new-work.md`, `mode-persuade.md`, `mode-operate.md`, `mode-read.md`, `operate.md`, `shape.md` | Yes | **High** | Visual-authority classification, seven-candidate derivation, assign-don't-rank, direction contract, color strategies, reflex faces, saturated-look calibration, Operate/Read depth, finish review → `frontend-design` (surface-modes). |
| `reference/critique.md` (854 lines) | Yes | High | Judge-before-scan isolation, specificity verdict, Nielsen 0–4 with `n/a`, cognitive load, personas, P0–P3, question-last → `interface-review` (critique-scoring) and SKILL.md. |
| `reference/audit.md`, `audit.native.md` | audit.md yes; native skimmed | Medium | Five technical dimensions, touch-gesture evidence → `interface-review` (critique-scoring). |
| `reference/bolder.md`, `quieter.md`, `distill.md`, `delight.md`, `overdrive.md`, `polish.md`, `harden.md` | Yes | High | → `design-craft` (refinement-moves). Arabic-script handling → `web-design` (web-layout-design). |
| `reference/layout.md`, `typeset.md`, `colorize.md`, `animate.md` | Yes | Medium | Mostly already covered by `web-design` and `design-craft`. Deltas: product fixed rem scale, light-on-dark compensation, and the tracking floor → `web-design` (web-typography). Color-strategy roles → surface-modes. |
| `reference/clarify.md` | Yes | Low | `ux-writing` already covers it more deeply (error essentials, confirmations, no unverifiable promises). Only the empty-state cause split was folded, into `user-onboarding` (empty-states). |
| `reference/onboard.md` | Headings + empty-state section | Low | Hulick-based `user-onboarding` is deeper. Empty-state cause table folded. |
| `reference/adapt.md`, `optimize.md` | Headings skimmed | Low | Owned more deeply by `web-design` (web-layout-design, web-performance). Skipped. |
| `reference/document.md`, `extract.md`, `init.md` | document/extract yes; init skimmed | Medium | PRODUCT.md / DESIGN.md / surface-brief split, google-labs design.md spec, document from the built world, extract by intent → `design-systems` SKILL.md. |
| `reference/live*.md`, `generate.md`, `visualize.md`, `region-map.md`, `component-review.md`, `hooks.md`, `doctor.md` | region-map yes; others headings only | Low (tool-specific) | CLI and browser mechanics for Impeccable's own runtime. The transferable lesson (an approved comp is a measured spec, and models over-believe their recreation) → `design-prototyping`. The rest was skipped. |
| `reference/ios.md`, `android.md` | Not folded | n/a | MIT-derived HIG/Material digests. `apple-design` and the live HIG are the authority here. Skipped. |
| `skill/agents/impeccable-finish-reviewer.md` | Yes | High | Evidence-first check order and four-word disposition → `frontend-design` (surface-modes, Finish). |
| `crates/live/assets/antipatterns.json` (62 rules) | Yes, all | **High** | Rule IDs cited in `frontend-design` (anti-slop-catalog), with design-system drift rules → `design-systems`. |
| Maintainer `CLAUDE.md` (architecture, testing, prose rules) | Yes | Medium | Skill-authoring lessons (a11y at review stage, printed output beats optional reads, retire fields with reasons, trace-based behavior tests, comp-vs-code ratings) → `creating-skills`, `design-prototyping`. |
| `crates/`, `cli/`, `extension/`, tests, generated harness copies | Inventory only | n/a | Implementation. Not portable skill content. |

## Fold map

Extend only; no new top-level skill. Impeccable spans generation, review, refinement, systems, and skill authoring, so per `docs/skill-library-ops.md` ("fold by use, not by source") it was split across existing owners:

- **`frontend-design`.** The SKILL.md fast path gained a mode decision (Persuade / Operate / Read / Experience), refine-vs-redesign, assign-don't-rank, color strategy, truth-binds-claims, "the brief wins," the named-tell summary with the four saturated looks, commit-then-clarify, and a fresh-review step. NEW `references/surface-modes.md` (method) and `references/anti-slop-catalog.md` (craft floor plus tells mapped to detector IDs). `visual-execution.md` now warns that generic style lanes converge. Sources and coverage gaps updated; the anti-slop-checks gap is partly closed.
- **`interface-review`.** SKILL.md gained a `scored` overlay mode, judge-before-scan isolation with a method line, the tells check for AI UI, and question-last delivery. NEW `references/critique-scoring.md`. Sources and gaps updated.
- **`design-craft`.** NEW `references/refinement-moves.md` (bolder, quieter, distill, delight, overdrive, polish drift classification and triage, harden). Table row, sources, and gaps updated.
- **`working-with-ai` (ai-ui-direction).** NEW sections "Name the tell, then pick the move" and "Escape the model's defaults." The judge step now separates judgment from detector output. Checklist, relationships, and sources updated.
- **`creating-skills` (measuring-skill-effect).** NEW section "Generative skills: when guidance makes output timid."
- **`design-systems`.** One DS-as-AI-context bullet in SKILL.md (authority split, document from the built world, drift checks, extract by intent). The detail lives in a new field-notes section, which keeps the body within budget.
- **`design-prototyping`.** Comp-led vs code-led by surface mode, and comps as measured specs.
- **`web-design`.** web-typography: product fixed-scale exception, −0.04em floor, light-on-dark compensation. web-layout-design: Arabic-script data handling (`Intl` outputs verified in Node).
- **`user-onboarding` (empty-states).** Five-cause empty-state table.

## Conflicts and how they were resolved

- **Kicker/eyebrow ban vs. existing guidance.** Impeccable bans tracked kicker labels outright. No local skill recommends them, so the ban was adopted as Impeccable's one hard ban and the rest of the catalog stays default-not-ban.
- **Severity scales.** Impeccable's P0–P3 is mapped onto `interface-review`'s HIGH/MEDIUM/LOW rather than replacing it.
- **Measure.** Impeccable uses 65–75ch; `web-design` keeps Rutter's 45–75 (~66). These are compatible, so no change.
- **Reflex-face list vs `web-design` pairing method.** The list is scoped to Persuade/Experience surfaces and framed as "needs a reason," not a ban. On Operate/Read surfaces, system and workhorse faces stay fine.
- **Accessibility placement.** Impeccable keeps a11y out of design-time instructions. This library keeps its accessibility owners. The lesson is recorded as a skill-authoring observation, not a change to `frontend-design`'s verification list.
- **Single-source numbers.** The research numbers (30/35, 27/30), quieter's 70–85% saturation, and the comp vs code ratings are labeled as one project's evaluation and parked in coverage gaps for local confirmation.

## Parked or skipped

- Impeccable's runtime (concept-seed roll API, decision page, comp-spec and comp-diff gates, live mode, hooks, doctor, critique snapshots). These are tool mechanics with no local equivalent, and the catalog is a paid service.
- Native `ios.md` and `android.md` (derivative digests; `apple-design` and the live HIG win).
- `adapt.md` and `optimize.md` (deeper local owners exist).
- Detector rule thresholds beyond what the catalog cites. Re-check `antipatterns.json` on later Impeccable releases, because rules are added and renamed.
- Recheck trigger: a new Impeccable minor release, or a new research note on impeccable.style.

## QA corrections (2026-11-10)

- **Finish workflow:** the two-round ceiling now limits only the builder's own inspection. `frontend-design` spells out what to do for each reviewer verdict (recapture / rebuild / fix / ship), says user evidence reopens the review, and gives a disclosed fallback when no subagents are available, matching the source's `new-work` §7.
- **Option counts:** removed the "≤4 visible options / 8+ causes misclicks" rule taken from Impeccable's cognitive-load checklist. Working-memory limits apply to recall, not to visible menus (NN/g, "Short-Term Memory and Web Usability"). Reviews now check grouping, labeling, and real memory demands.
- **Light-on-dark type:** replaced "reads thinner, go heavier" with face-dependent guidance. Reversed text often looks heavier (e.g. Signika Negative's lighter cut), and hairlines can drop out.
- **Direction assignment:** labeled an experimental default with explicit exceptions (pinned brief, extensions, user choice, canon), consistent with `frontend-design` coverage-gaps.
