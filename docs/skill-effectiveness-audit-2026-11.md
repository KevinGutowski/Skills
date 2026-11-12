# Skill Effectiveness Audit — 2026-11

Re-audit of all 42 skills, four months after [the July audit](skill-effectiveness-audit-2026-07.md). Scope: July items that regressed or stayed open, defects in material added since (4 new skills, the July 27 Sten fold, the September–November folds), and a check against Anthropic's current skill guidance and tooling.

Method: all repo validators, per-skill size stats, `claude plugin validate`, a read of every description, and a five-way parallel deep read (every `SKILL.md` in full; references sampled, weighted to files changed since July). Apple API claims and external endpoints were probed live on 2026-11-12. Every fix listed under "Fixed in this pass" was re-verified at the cited location before editing.

## Headline

- **Verdicts: 27 Strong, 15 Adequate, 0 Weak.** Every July P0–P2 fix held. No skill is broken.
- **The July disease is back in a milder form.** The July 27 Sten fold appended "Sten's…" paragraphs to six bodies, and five bodies are now over the ~5k-token budget (July had four). The body budget was never enforced; it is now a validator warning.
- **The new defect class is fold-beside instead of fold-into.** The autumn folds added well-scoped new references but left older text in the parent files unreconciled, so a new rule and an old example now disagree in the same file.
- **Dated factual claims decay faster than the audit cadence.** Superconductor's "the API cannot send messages" went stale in six days; the HIG fetch trap verified on 2026-09-15 has inverted; x-post-reader's mirror health is five months old.
- **Nothing in the library has been measured with and without the skill.** The routing probes test retrieval. No skill has an output-quality eval, and the judgment skills are the ones closest to the no-skill baseline.

## Tooling: what exists now

There is no `audit-skills` command. The current pieces are:

| Tool | What it does | Use here |
|---|---|---|
| `/skill-doctor` (Claude Code 2.1.252+) | Per-skill context cost, invocation frequency, never-invoked skills | Needs a real machine with usage history; cannot run in CI or a sandbox. This is the only source of real fire-rate data for the consolidation decisions in [skill-listing-budget.md](skill-listing-budget.md). |
| `/doctor` | Listing-budget estimate and its largest contributors; `/doctor prompt-audit` checks instructions for outdated or conflicting guidance | Re-run after this library's growth: the 42 descriptions total ~17.7k characters before any other installed skills. |
| `claude plugin validate <dir>` | Frontmatter parse and field checks on a skills directory | Passes clean on an export of this repo. It does not follow symlinks and needs the directory to hold only skills. |
| `claude plugin eval` | Runs eval cases with and without the skill, scores them, exits non-zero under a threshold | Needs `evals/<case>/` folders, and plugin packaging for the baseline arm. None exist here yet. |
| `skill-creator` (Anthropic plugin) | With/without benchmark, blind A/B of two versions, description-trigger optimization loop | The description optimizer is the automated form of this repo's manual routing probes. |

Two runtime facts from the Claude Code docs matter for house rules:

- After compaction, Claude Code keeps only the first 5,000 tokens of an invoked skill (25,000 across all). The tail of an over-budget body, usually the checklist and relationship block, is what disappears.
- The listing drops descriptions from least-invoked skills first when over 1% of the context window. Descriptions are capped at 1,536 characters each regardless.

## Verdict matrix

Changes from July are marked. New skills have no July verdict.

| Skill | Verdict | Headline note |
|---|---|---|
| `apple-design` | Strong | HIG fetch trap had inverted (fixed); topic map misses `designing-for-visionos` and `designing-for-games`; 9 second-hop files unnamed in router bullets |
| `swiftui` | Strong | Description has no boundary to `uikit`/`apple-design`; body has no inline core rules though the description says "read the body"; widget-design still the 2020 foundation |
| `uikit` | Adequate (new) | Best body in the Apple group, but single-source API facts: core rule names an edit-menu method the references date three different ways; a false "Swift-only" row; benchmark-tuning stated as rules |
| `notification-design` | Strong | Interruption levels, Focus and summaries live only in a staleness note; Live Activities route lands on one sentence |
| `feature-discoverability` | Strong | Beta TipKit name in the body (fixed); the example block is still beta-named and will not compile as written |
| `web-design` | Strong | Best new material in the library; older parent files contradict it (see theme 1) |
| `frontend-design` | Strong (was Adequate) | Unscoped rebuild rule (fixed); ban-vs-pinned-brief precedence unstated |
| `motion` | Adequate | Motion 14.2 note patched in best-practices but the audit tiers still downgrade correct code; description still lacks a boundary to `web-design` |
| `interface-review` | Adequate (new) | Sound orchestration; no legal verdict for "no findings, coverage unverified"; description has no trigger words and omits `scored` mode and native scope |
| `data-viz` | Strong | Body default "time trend → line" overrides the newer dashboard rule in editorial-interaction |
| `graphics-fundamentals` | Strong | No defects; missing reverse routes from the autumn consumers |
| `creative-coding` | Strong | No defects; thin, and the parked current-API scaffolds are where it would add most |
| `design-craft` | Strong | Body ~6.8k tokens; scope contradiction between body and new references (fixed) |
| `design-principles` | Adequate (was Strong) | Body ~5.9k tokens; description has no boundaries and advertises a third of the body |
| `design-prototyping` | Strong | Body ~6.5k tokens; three wrong pointers (fixed); description has no boundaries |
| `design-systems` | Strong | Body ~6.9k tokens; six body passages restate quotes field-notes already holds |
| `logo-design` | Strong | SVG exemplars still open from July |
| `photographic-lighting` | Adequate | Improved; references still restate the body; needs 3–4 worked setups |
| `hardware-product-design` | Strong | Relationship block claims content "lives" in two skills where it is one reference line or absent; no depth reference |
| `ux-writing` | Strong | Clean router |
| `write-clear-prose` | Adequate | Four stacked "lens" paragraphs precede First Move; no boundary to `ux-writing` |
| `user-onboarding` | Strong | Dark-pattern route points at two references with no ethics content |
| `user-research` | Strong | Bare reference name in relationships (fixed) |
| `learning-experience-design` | Adequate | Unchanged: no depth layer, no artifacts |
| `shape-up` | Strong | 23 second-hop files, pattern undeclared and members unnamed |
| `product-decision-making` | Strong | Sten sections now sit ahead of the Zhuo core rule; worked proposal review still unpaid |
| `client-work` | Strong | "Read exactly one reference" conflicts with "each reference routes to the other" |
| `people-management` | Strong | Sten cited three times in the body, absent from its source list |
| `design-org-influence` | Adequate (was Strong) | Body ~5.9k tokens and growing; checklist starts at line 143 |
| `building-in-public` | Adequate | July reorganisation held; no defects |
| `personal-growth` | Adequate (new) | Safety line was not actionable (fixed); exposure guidance contradicts its own sources file; trajectory review written three times |
| `rails` | Adequate (was Strong) | Router fine; references accreting: security rules stranded in an architecture file, harmful `VACUUM FULL` advice and 5-thread sample (fixed), wrong `rate_limit` version (fixed) |
| `dhh` | Strong | No defects |
| `devtools` | Strong | No defects |
| `working-with-ai` | Adequate | Stale step numbers (fixed); two review rules that disagree; ai-ui-direction nests unrelated techniques under "Prompt vs edit" |
| `ai-experience-design` | Adequate | Fourteen source-keyed paragraphs precede the checklist |
| `malleable-software` | Strong | No defects |
| `superconductor` | Strong (new) | Scripts sound, 25 tests pass; scope prohibition stale within a week (fixed) |
| `creating-skills` | Adequate | Still teaches upstream rules the repo overrides (gerund names, 100–200 char descriptions, strict one-level references); five checklist copies |
| `research-cataloging` | Strong | Helper script sources `~/.zshrc` for a token; second-hop members unnamed |
| `x-post-reader` | Strong | Workflow contradicted its own mirror-health note (fixed); mirror health needs a re-probe |
| `route-planning` | Adequate | Snippets not runnable as written (unencoded query, undefined tuple shape); description frontmatter normalised |

## Fixed in this pass

Small, verified, single-meaning corrections. No description text changed, so no routing probes were required.

- **`web-design`**: the reduced-motion example disabled a fade that the rule three lines later says to keep; the React sample imported from `framer-motion`, which `motion` bans; two files attributed 44px to WCAG AA (it is the AAA target; AA is 24×24 CSS px).
- **`rails`**: `rate_limit` is Rails 7.2+, not 8.0+; routine `VACUUM FULL` advice replaced with the locking caveat; pool sample and worked example aligned with the file's own three-thread doctrine.
- **`superconductor`**: the live OpenAPI now has `POST` on both message paths; the "cannot send messages" rule and the maintenance note say so and tell the agent to check the spec.
- **`apple-design`**: HIG fetch trap rewritten. The public URL plus `.md` now returns Markdown and `/tutorials/data/` redirects to it.
- **`feature-discoverability`**: `invalidate(reason: .actionPerformed)` in the body and example; the beta name added to the staleness note.
- **`personal-growth`**: "follow the applicable safety guidance" (none exists in the library) replaced with a concrete instruction.
- **`x-post-reader`**: workflow step 1 no longer calls Nitter "fast, no rate limits"; "two paths" corrected to three.
- **`design-craft`**: "apply them everywhere" scoped to what the user named, matching refinement-moves and worst-case-data; Practical Demonstration removed from the "unmined" list (the body distils it).
- **`frontend-design`**: "rebuild every atom" scoped to Persuade and Experience.
- **Pointers**: `design-prototyping` (facets live in `design-craft`; two back-pointers to body blocks that no longer exist), `working-with-ai` (step numbers; `skill-creator` marked as external), `ai-experience-design` (`claude-api` marked as external), `user-research` (reference named as a skill), `logo-design` ("six-week" process that appears nowhere else), `creating-skills` (stale neighbour counts; second-hop note on the checklist line).
- **Owner residue**: "Staleness note (Kevin's rule)" → "Staleness note" in 20 skill files; "Per the user's preference" in `design-principles`.
- **`route-planning`**: description converted from a folded YAML block to the single quoted line the README convention requires. Text unchanged.
- **Validator**: `scripts/validate_skills.py` now warns when a body is over ~5k tokens (July validator gap 6). It reports five skills today and does not fail the build.

## Cross-cutting themes

**1. Fold-beside, not fold-into.** Every contradiction found in the web group is new rule versus old example in the same cluster. Still open in `web-design` (web-animation-design): the review method flags "a default keyword easing" while the same file prescribes `ease` and `ease-out`; PRACTICAL-TIPS caps hover scale at 1–2% and then ships `scale(1.05)`; `design-craft`'s animations reference sets a 0.95 press floor that the tactile ladder goes below. Fix as one reconciliation pass per parent file. Going forward, a fold should grep the parent and sibling files for each number or API it introduces.

**2. Append-on-fold is not sticking as a rule.** July removed quote banks; the Sten fold three weeks later added per-source paragraphs to `design-craft`, `design-principles`, `design-systems`, `write-clear-prose`, `product-decision-making` and `people-management`, mostly restating rules already present. Bodies also keep rule plus quote while the reference holds the same quote. The November folds are the model: one table row in the body, a self-contained reference, and a scoped-conflict table.

**3. Descriptions are still weaker than bodies on boundaries.** No boundary clause: `swiftui`, `design-principles`, `design-prototyping`, `product-decision-making`, `user-onboarding`, `write-clear-prose`, `motion`, `interface-review`, `route-planning`. `motion` and `web-design` (web-animation-design) both claim generic animation requests, and the README default says web values win. `interface-review` has no trigger words. Three routers say "read one reference" while their bodies require more.

**4. Relationship blocks assert content that is not there.** `check_xrefs.py` proves the skill exists, not that it holds the thing. Found: `user-onboarding` → dark-pattern ethics (in no skill), `notification-design` → Live Activities (one sentence), `apple-design` (app-intents-design) → notification automations (absent), `hardware-product-design` → two "live there" claims.

**5. Second-hop members are unnamed.** The July reconciliation blessed the `references/<name>/` pattern on condition that the router bullet names the members. Unmet in `apple-design` (9 files), `swiftui` (7, including a 646-line code-patterns file), `shape-up` (23), `rails` (dhh-style's 9), `client-work` (8), `research-cataloging`, and the emil-kowalski bullet in `design-craft`. No validator checks it.

**6. `creating-skills` contradicts the repo it governs.** It still carries upstream guidance (gerund names, 100–200 character descriptions, strict one-level references) beside House Style rules that override each one, and House Style starts at line 106.

**7. No output-quality evidence.** Anthropic's guidance is eval-first: three scenarios per skill, baseline without the skill, then iterate. The library has 18 routing probes, 42 smoke prompts and 3 application fixtures, none of which compares output with and without a skill. The skills where this matters most are the ones made largely of advice a model already gives: `learning-experience-design`, `personal-growth`, `product-decision-making`, `creative-coding`, parts of `write-clear-prose`.

## Suggested order

**P1 — routing layer (needs routing probes per the ops doc).** Add boundary clauses to the nine descriptions in theme 3; resolve `motion` versus `web-design`; rewrite `interface-review`'s description with trigger words, `scored` mode and native scope; make the "read one reference" wording match the bodies.

**P1 — remaining factual defects.**
- `uikit`: run the availability sweep its coverage-gaps file already asks for. Reconcile the edit-menu deprecation across SKILL.md and three references, correct the `navigationBarMinimization` Swift-only row, and quarantine live-lists rules 10–11 and the SF Symbols line as benchmark-specific.
- `motion`: version-gate performance-audit tiers for Motion 14.2+.
- `personal-growth`: decide whether graduated exposure is in or out; the body and methods file use it while sources and coverage-gaps forbid it. Add a red-flag first row to the route table.
- `rails`: link or move the security section in dhh-style/architecture into rails-security-multitenancy; fix `log_level = :warn` beside "emit one JSON record per request".
- `interface-review`: define the verdict for clean findings with unverified coverage.
- `x-post-reader`: re-probe mirrors and re-date. From this sandbox nitter.net returned 410 and syndication 429.
- `working-with-ai`: reconcile the two review rules in agentic-coding.

**P2 — structural.**
- Distill the five over-budget bodies. The line ranges to move are in this audit's working notes: `design-org-influence` 76–88 and 114–130; `design-craft` 140–179; `design-prototyping` 84–126; `design-systems` 95–113; `design-principles` 85–117.
- Name second-hop members in router bullets and add the check to `check_reference_hygiene.py`.
- Merge `creating-skills` to one checklist and one description guide, House Style first.
- Centralise the Xcode-skills paragraph that is verbatim in three Apple bodies, and pin the mirror revision.
- Replace dated prohibitions ("cannot", "is a 404") with "verify against the live spec" wherever a live source exists.

**P3 — measurement.**
- Run `/skill-doctor` and `/doctor` locally and record the result in skill-listing-budget.md.
- Add `evals/` case folders for three to five skills, starting with the judgment skills in theme 7, and run with-skill versus without-skill.
- Use the `skill-creator` description optimizer on the two contested pairs (`motion`/`web-design`, `design-principles`/`design-craft`/`interface-review`).
- Pay the July exemplar debts, still all open: worked proposal review, learning-experience artifacts, logo SVG exemplars, lighting setups, an interface-review report exemplar.

## Routing probe results

2026-11-12, after the description edits. Two fresh descriptions-only judges (the session's default model and Haiku) each received the blind packet from `python3 scripts/check_routing_probe_fixtures.py --packet` and nothing else.

| Fixture | Probes | Judge 1 | Judge 2 |
| --- | --- | --- | --- |
| [web-motion-routing-probes-2026-11.md](web-motion-routing-probes-2026-11.md) | W1–W18 | 18/18 | 18/18 |
| [description-boundary-routing-probes-2026-11.md](description-boundary-routing-probes-2026-11.md) | B1–B33 | 33/33 | 33/33 |

Both judges answered `none` for W18 and for B33 (single A→B directions), which is the expected pass. No neighbor or control was taken by an edited skill. The `skill-creator` description optimizer was not run: with both contested pairs already at 100% there was nothing for it to optimize against.

## Follow-up status — 2026-11-12

The owner asked for every recommendation above to be applied. Status against "Suggested order":

**P1 routing layer: done.** Fourteen descriptions edited (the nine in theme 3 plus `superconductor`, `data-viz`, `frontend-design`, `rails`, `research-cataloging`), all within the 450-character cap, with the 33-probe fixture above registered in `scripts/check_routing_probe_fixtures.py`.

**P1 factual defects: done, with two limits.** Every item in the list was applied. `route-planning`'s OSRM snippet was run; its Nominatim snippet could not be, because Nominatim returned 403 "Access denied" to this sandbox. `uikit`'s availability sweep was done against documentation; nothing was compiled.

**P2 structural: done.** All five over-budget bodies are under the 5k-token budget (`validate_skills.py` reports no warnings). Second-hop members are named in every router, and `check_reference_hygiene.py` now fails on a second-hop file its parent does not link and warns on one the router does not name. `creating-skills` has one checklist and one description guide, House Style first. The Xcode-skills paragraph lives in `apple-design/references/xcode-agent-skills.md`, pinned to mirror commit `047c090` (Xcode 27.2, 27B52).

**P3 measurement: done except the local commands.** Fifteen eval cases across five skills, run with and without the skill and graded blind: [skill-evals-2026-11.md](skill-evals-2026-11.md). Exemplar debts paid: `product-decision-making/references/worked-proposal-review.md`, `learning-experience-design/references/worked-examples.md`, `logo-design/references/svg-exemplars.md`, `photographic-lighting/references/worked-setups.md`, `interface-review/references/report-exemplar.md`. Theme 4's relationship claims were corrected and backed with new references (`user-onboarding` honest-onboarding, `notification-design` delivery-system, `hardware-product-design` build-stages-and-manufacturing).

**Still open:**

- `/skill-doctor` and `/doctor` need the owner's machine. Record the result in skill-listing-budget.md. The 42 descriptions total 17,552 characters after this pass.
- `swiftui` versus Apple's SwiftUI skill: resolved later the same day. The owner chose to lean on Apple's skill; the four tensions were settled in Apple's favour, overlapping sections were cut to pointers, and three core rules were added. The adapted samples are uncompiled (no Swift toolchain in the sandbox), and three session samples were left in their original form on purpose; both are listed in `swiftui/references/coverage-gaps.md`.
- Verified later the same day: the four `creative-coding` API claims (confirmed in the `p5@2.4.0` and `three@0.187.0` package source), the five logo SVGs (rasterized at 16, 32 and 64px in both polarities and inspected), and the `route-planning` script (ran end to end; the earlier 403 was Nominatim rejecting the placeholder `example.com` contact, as the skill warns). Still unverified: every Swift sample in `uikit` and `swiftui`, checked against documentation only.
- The five body distills cut some duplicate sentences without a line-by-line comparison against the references that hold them. `ai-experience-design` sits about 40 tokens under the body budget.
- Not built: a validator for "lives there" relationship claims, an API-availability probe, a `.claude-plugin/plugin.json`, and CI wiring for `scripts/plugin_validate.sh` (it runs by hand and passes).
- Eval follow-ups in skill-evals-2026-11.md: nine of fifteen cases do not discriminate and need harder prompts; each arm ran once.
