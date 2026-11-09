# Skill Effectiveness Audit — 2026-07

Full pass over all 38 skills, auditing each for effectiveness as an agent-facing tool: does the always-loaded description route correctly, does the body put decision rules where a paginating agent will read them, do the references hold actionable material, and would an agent with the skill loaded demonstrably outperform one without it. Standards applied are the repo's own (README Conventions, `docs/skill-library-ops.md`).

Method: mechanical scans (validators, description/body/reference stats, orphan detection) plus a six-way parallel deep read — every `SKILL.md` read fully, every reference read or skimmed (rails sampled 11 of 20 references). Every defect listed under "Confirmed defects" was independently re-verified against the file before inclusion.

**Remediation status (2026-07):** the P0–P2 fixes below were applied in the same PR as this audit — see git history. That includes all confirmed defects, the routing-layer description fixes, the quote-tranche distill pass, the two-level-reference reconciliation in `docs/skill-library-ops.md`, a new `scripts/check_reference_hygiene.py` gate (Contents blocks, reference-level link resolution, dangling prose pointers, conversion residue) wired into `validate_all.py`, and CI now running the ledger-sync checkers. P3 content investments (exemplar banks, second sources, worked setups) remain open by design: repo policy adds exemplars only from accepted decisions, so they are tracked in each skill's coverage-gaps file rather than fabricated here.

## Headline

- **Verdicts: 28 Strong, 10 Adequate, 0 Weak.** The library is in good shape; the house anatomy (scope line → early decision rules → checklist → relationships → staleness note → sources/coverage-gaps) is real and correlates with quality wherever it is applied.
- **Two of the repo's five required pre-commit checks fail on main** because two ledgers still carry the deleted `goal` skill (removed in the taxonomy reorg, commit b8a0c48). CI only runs `validate_all.py`, so this is invisible on push.
- The systemic effectiveness tax is **quote-bank creep**: the 2025–26 interview-mined tranche (Dive Club / Config / Ona / X) was folded into always-loaded bodies as attributed per-person quotes instead of distilled rules, pushing several bodies to or past the ~5k-token budget and pushing checklists below the pagination horizon README:117 warns about.
- The most dangerous defect class is small but live: **conversion residue that actively misdirects an agent** (a reference that orders the agent to suppress its own output; pointers to files and skills that don't exist; subfiles routing "the discipline" to a `SKILL.md` that no longer contains it).

## Verdict matrix

| Skill | Verdict | Headline note |
|---|---|---|
| `apple-design` | Strong | Exemplary router + live-HIG fetch playbook; 2 long refs missing `## Contents` |
| `swiftui` | Strong | Most actionable engineering skill; `sources.md` ledger out of sync with inline citations |
| `notification-design` | Strong | Compact and decision-shaped; description doesn't state its Apple-only scope |
| `motion` | Adequate | Vendor import outside house style: orphaned duplicate files, broken resource path, no staleness/boundary block |
| `graphics-fundamentals` | Strong | Model hub body + reverse routing; description misses compression/format triggers |
| `web-design` | Strong | Best reference corpus in repo; "Initial Response" conversion artifact in web-animation-design; 7 refs missing `## Contents` |
| `frontend-design` | Adequate | High-value anti-slop rules but weakest description in repo (234 chars, no boundaries) and NEVER rules at the very bottom |
| `data-viz` | Strong | Clean hygiene; body is pure router — zero inline defaults for a body-only read |
| `creative-coding` | Strong | Model body ordering; sources cite the author's local filesystem; no current-API depth layer |
| `design-systems` | Strong | Highest evidence density; body at the ~5k-token ceiling; description lacks boundary clauses |
| `design-principles` | Strong | Executable critique machinery; duplicates design-craft's noticing/facets sections nearly verbatim |
| `design-craft` | Strong | Best operational content in repo; internal font-smoothing contradiction (see defects) |
| `design-prototyping` | Strong | Decision rules genuinely front-loaded; one semantically wrong boundary route (see defects) |
| `logo-design` | Strong | Most cleanly operationalized taste skill; no visual/SVG exemplars for the visual techniques |
| `photographic-lighting` | Adequate | Good decision procedure, but the central "family of angles" concept has no how-to and references restate the body |
| `feature-discoverability` | Strong | Highest signal-per-line body; Apple-only scope not stated in the description |
| `ux-writing` | Strong | Eval-derived non-negotiables + before/after tables; 4 subfiles invisible from SKILL.md; 4 long refs missing `## Contents` |
| `write-clear-prose` | Adequate | Good triage/workflow structure; zero before/after examples in a writing skill; much restates model defaults |
| `user-onboarding` | Strong | Rules 1–7 crisp; rules 8–15 are quote banks, not rules |
| `user-research` | Strong | Best single block in group (method table with Ns); body at token ceiling from verbatim interview texture |
| `learning-experience-design` | Adequate | Good gap-diagnosis frame; no depth layer at all (references are only sources + gaps); single-source |
| `shape-up` | Strong | Most complete method library; no route back to product-decision-making; description names 2 of its 4 schools |
| `product-decision-making` | Strong | Executable review checklist; principle-rich, zero worked examples |
| `rails` | Strong | Functional 16-line router over 20 refs; packwerk (school #3) absent from router and description |
| `dhh` | Strong | Genuinely executable review persona; version-gated APIs flagged unconditionally, no staleness note |
| `devtools` | Strong | Cleanest router in its group; AX material the description advertises sits two hops away |
| `working-with-ai` | Adequate | Best boundary prose in the AI chain; agentic-coding.md carries ~55 lines of quote sprawl past the fold |
| `ai-experience-design` | Adequate | Excellent pattern vocabulary; only AI-chain description with no boundary clauses; body at/over token budget |
| `malleable-software` | Strong | Best philosophy-to-checklist conversion; §7 is a quote bank grafted on |
| `client-work` | Strong | Model router with verbatim scripts and quantified rules |
| `people-management` | Strong | Best-in-group boundary engineering (documents its deliberate tension with design-org-influence) |
| `design-org-influence` | Strong | Retrieval-shaped objection playbooks; body ~5.1k tokens, over budget |
| `building-in-public` | Adequate | Strong evidence, but organized by source not decision, and no boundary clause vs its README-named neighbor |
| `hardware-product-design` | Strong | Task-shape inversion framing + honest ⚠️ on Humane; ~20% of body is graphics-fundamentals material |
| `research-cataloging` | Strong | Failure-driven rules at their best; consolidation drift in subfiles (see defects); 6 long refs missing `## Contents` |
| `creating-skills` | Adequate | House Style rules 1–15 are the repo's most valuable authoring artifact; the rest is triple-duplicated across body, loose files, and vendored mirror |
| `x-post-reader` | Strong | Best staleness hygiene in repo (dated mirror probes with stop-rules); routes to an `x-api` skill that doesn't exist here |
| `route-planning` | Adequate | Hard-won quantified pitfalls; step 1 (geocoding) is unexecutable as written; dangling file pointer |

## Confirmed defects (each re-verified at the cited location)

Actively misleading — an agent following the text does the wrong thing:

1. **Stale `goal` ledger rows fail two required checks.** `docs/vercel-skill-audit-2026-06.md:55` and `docs/per-skill-smoke-tests-2026-06.md:28` / `docs/per-skill-smoke-results-2026-06.md:37` (S17) still list the deleted `goal` skill, so `check_vercel_overhaul.py` and `check_skill_smoke_tests.py` — both in AGENTS.md's pre-commit list — fail on main.
2. **`web-design/references/web-animation-design.md:15-21`** — leftover standalone-skill directive: "respond only with: 'I'm ready to help you…' Do not provide any other information until the user asks a question." An agent loading this reference mid-build is instructed to suppress its own output.
3. **Font-smoothing contradiction in design-craft.** `references/polish-principles.md:79-83` (Principle 8): antialiased "is **not** a safe global default… Scope it deliberately." But the same file's Common Mistakes row (`:155`) says "Apply `antialiased` to root," and `references/typography.md:73` teaches "Apply antialiased smoothing to the root layout" as the good pattern.
4. **Invalid Ruby in the default Rails school.** `rails/references/dhh-style.md:50-54` — `def create` / `def destroy` with a single `end`; syntactically invalid, in the second code block of the most-loaded reference.
5. **`design-prototyping/SKILL.md:150`** routes "is it good enough" to `design-principles`' depth-spectrum heuristic — the depth spectrum lives in `design-craft` (its SKILL.md explicitly claims how-far-to-push questions).
6. **`motion/performance-audit/index.md:78,92`** tells the agent to read `references/property-tiers.json`; the file is at `performance-audit/resources/property-tiers.json`. Following the instruction verbatim fails. Line 30 also has a malformed link.
7. **`route-planning/SKILL.md:40`** cites `feedback_route_tiebreakers.md`, which exists nowhere in the repo (origin-project residue; the rule is fortunately inlined on the next line).
8. **Consolidation drift in research-cataloging**: `references/archival-research/capture-techniques.md:17` and `local-corpus-ocr.md:3` route "the discipline" to `SKILL.md`, which is now a 23-line router containing none of it (it lives in `references/archival-research.md`).

Wrong-by-omission at the routing layer:

9. **packwerk is missing from `rails/SKILL.md` and its description** (zero grep hits) despite README:90 defining it as school #3 of the four-school contract; it is only discoverable inside `rails-event-sourcing.md:14`.
10. **`optimizing-rails.md:255-263`** ships a `RAILS_MAX_THREADS { 5 }` sample two screens after line 226 teaches the 3-thread doctrine and warns that >5 threads causes contention.
11. **`dhh/SKILL.md:68`** flags `params.require → params.expect` unconditionally; `params.expect` is Rails 8-only, so the flag is wrong advice on any 7.x codebase. No staleness note in the file.
12. **`frontend-design/SKILL.md:4`** — `license: Complete terms in LICENSE.txt` points at a file that exists nowhere in the repo.
13. **Orphaned conflicting duplicates in motion**: `motion/react.md`, `vue.md`, `motion.md`, `base-ui.md` at the skill root are referenced by nothing and diverge from the canonical `best-practices/` copies (different MCP install instructions).
14. **`x-post-reader` description** says "use x-api instead" for auth-required reads; no `x-api` skill exists in the repo (the body hedges, the description doesn't).

## Cross-cutting themes

**1. Quote-bank creep is the systemic disease.** The same failure appears in at least nine bodies: `user-onboarding` rules 8–15, `user-research` §5, `shape-up`'s last three sections, `ai-experience-design:50-93`, `working-with-ai/references/agentic-coding.md:73-127`, `design-craft/SKILL.md:139-181`, `design-principles/SKILL.md:71-90`, `design-org-influence:76-90,116-129`, `malleable-software` §7. Multi-quote attributed field notes sit in always-loaded bodies against README:116's one-load-bearing-quote rule, and four bodies (`design-org-influence`, `user-research`, `ai-experience-design`, `design-systems`) are at or over the ~5k-token budget, pushing checklists and relationship blocks past the pagination horizon. A single "distill-on-fold" pass over the 2025–26 tranche — one-line rule in the body, quotes to a `field-notes.md` — is the highest-leverage repo-wide edit.

**2. Two-level reference nesting is a de-facto house pattern the ops doc forbids on paper.** `docs/skill-library-ops.md:16` says one-level links from SKILL.md, but ~50 substantive subfiles across web-design (16), shape-up (24), ux-writing, data-viz, design-craft, client-work, research-cataloging, creating-skills, and working-with-ai are reachable only via a parent reference. None are dead (every one is parent-linked — the mechanical "orphan" scan is noise), but only client-work and apple-design declare the pattern, and files like `linear-settings-copy-ia.md` (352 lines, the actual ruleset) or `ai-era-field-notes.md` are invisible from the router. Fix once: bless the pattern in the ops doc ("one level from SKILL.md, plus one documented hop from a parent reference"), and require SKILL.md bullets to name subdirectory members.

**3. The `## Contents` rule (>100 lines) is enforced by convention only, unevenly.** ~30 violations repo-wide, concentrated in web-design (7, incl. the 402-line web-animation-design.md), research-cataloging (6), ux-writing (4), creating-skills (incl. the 352-line skill-creator.md), swiftui (2), apple-design (2), client-work, working-with-ai. write-clear-prose uses the variant heading `## Table of Contents`. A 5-line check in `validate_all.py` closes this class permanently.

**4. The description layer is weaker than the body layer for boundaries — backwards for routing.** Descriptions missing boundary clauses their own bodies carry: `frontend-design` (234 chars, overlaps every neighbor), `ai-experience-design` (the only AI-chain member with zero chain boundaries, plus an Apple slant that undersells its general scope), `building-in-public` (vs `devtools` developer-tool-gtm — the pair README itself names), `design-systems`, `hardware-product-design`, `dhh` (185 chars), `shape-up` (names 2 of its 4 schools, so "outcome-based roadmap"/"build trap" queries never route to material the body has). Platform-scope gaps: `notification-design` and `feature-discoverability` read generic but are Apple-only.

**5. Staleness discipline is bimodal by provenance.** Apple/swiftui skills, x-post-reader (dated mirror probes with stop-rules), and the Evil Martians/Arkency-derived Rails refs are exemplary. Missing entirely: `motion` (external library + CLI + MCP, all undated), `route-planning` (maximum external-service exposure: OSRM public endpoint, a beta Apple Maps Playwright selector), `dhh` (version-gated API flags), the vendored 37signals satellites (migrations/security/hotwire carry Rails-8-era specifics untagged — `sources.md` knows they "need source refresh" but the files don't say so), `user-onboarding` and `shape-up` (the newest, fastest-aging interview material).

**6. Origin-machine and origin-project residue reduces portability.** `/tmp/books/*.txt` and `~/Library/…/iBooks` source paths (photographic-lighting, creative-coding), `~/.zshrc` token fallback and hardcoded NocoDB base ID and Pokémon grep terms (research-cataloging), `~/.claude/skill-evals/routing-eval.md` as an uncommitted "gate" (creating-skills), an external `research/transcripts/scripts/` path, plugin-namespaced routes to skills not in this repo (`figma:figma-use`, `paper-desktop:design-to-code` in design-prototyping), and the undocumented `write-clear-prose/agents/openai.yaml`. The repo already has the right idiom ("example from origin project — substitute your own") in archival-research's attribution section; apply it consistently.

**7. creating-skills has a structural split-brain.** Its core content exists three times: in the SKILL.md body, in six loose top-level files outside `references/` (`conciseness.md`, `degrees-of-freedom.md`, …), and again in the vendored `references/skill-creator.md` mirror. Two filename collisions (`checklist.md`, `writing-descriptions.md` exist at top level *and* under `converting-books-to-skills/` with different content) make grep-based retrieval land on the wrong file silently. Its own house-divergence flags (gerund naming vs the noun-phrase convention the whole corpus follows) appear ~50 lines after the official guidance they contradict.

**8. Exemplar debt is honest but unpaid.** The coverage-gaps convention works — the gaps this audit found independently are mostly already declared there. The recurring shape: judgment skills assert the actionability standard without examples (`product-decision-making` — no worked proposal review; `write-clear-prose` — no before/after rewrites; `learning-experience-design` — no artifacts at all, its references are only sources + gaps; `logo-design` — no SVG exemplars for its five visual techniques). Paying down already-acknowledged exemplar debts is the second-highest-leverage content investment after the distill pass.

## Validator gaps this audit exposes

Each of these is a class the current gates miss; all confirmed defects above passed `validate_all.py` + `check_xrefs.py` clean:

1. **Ledger↔skill-set sync** — run `check_vercel_overhaul.py` and `check_skill_smoke_tests.py` in CI (CI currently runs only `validate_all.py`), so deleted skills can't leave stale ledger rows silently.
2. **`## Contents` for >100-line files** — trivial line-count + grep check; also normalize `## Table of Contents`.
3. **File pointers outside markdown links** — backtick-referenced files (`feedback_route_tiebreakers.md`) and paths in prose (`references/property-tiers.json`) resolve nothing today; a scan for `` `*.md` ``/`*.json` tokens against the tree would catch both confirmed instances.
4. **Links inside reference files** — only SKILL.md links are resolved; the motion path bug and the emil-kowalski link-text/path mismatches live one level down.
5. **Fenced code syntax** — a `ruby -c` pass over ```` ```ruby ```` blocks would have caught the dhh-style defect.
6. **Body token budget** — the 500-line cap passes bodies that are 2× over the ~5k-token budget (dense long lines); add a word/token estimate warning.
7. **Conversion-residue sweep** — grep for "When this skill is first invoked", "this skill" / "lives in `SKILL.md`" inside `references/**` to catch standalone-skill leftovers after consolidations.

## Suggested fix order

- **P0 (actively misleading, small diffs):** defects 1–8 above, plus delete motion's four orphaned root duplicates (13) and frontend-design's dead license line (12).
- **P1 (routing layer):** add packwerk to the rails router + description; rewrite frontend-design's and ai-experience-design's descriptions to routing-contract shape; add the missing boundary clauses (building-in-public, design-systems, hardware-product-design, shape-up's four schools); add shape-up → product-decision-making relationship block; state Apple-only scope in notification-design and feature-discoverability.
- **P2 (structural, one decision each):** bless + regularize the two-level reference pattern in the ops doc; the repo-wide distill-on-fold pass over the 2025–26 quote tranche; creating-skills de-duplication; `## Contents` sweep; staleness notes for motion, route-planning, dhh, and the 37signals satellites.
- **P3 (content investment):** pay down declared exemplar debts (worked proposal review, before/after rewrite bank, LXD artifacts, logo SVG exemplars, creative-coding current-API scaffolds); add the family-of-angles mirror test to photographic-lighting.
