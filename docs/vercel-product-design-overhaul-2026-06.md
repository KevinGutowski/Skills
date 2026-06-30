# Vercel Product-Design Skill Overhaul

Source: https://vercel.com/blog/teaching-agents-product-design-at-vercel (published 2026-06-25)

This is the working ledger for upgrading this skill library around the pattern in Vercel's article. The goal is not to make every skill longer. The goal is to make each skill more usable by agents: sharp triggers, firm boundaries, routed references, traceable evidence, deterministic checks where possible, and a human-owned update loop.

## Article-Derived Pattern

Vercel's `product-design` system has three layers:

1. A skill that gives agents the product/design judgment not visible in code.
2. Linters for rules code can enforce reliably.
3. A review loop that collects evidence from real work, proposes updates, and keeps humans responsible for standards.

For this library, translate those layers as:

- **Skill body:** runtime workflow, routing, boundaries, and decision authority.
- **References:** source-grounded methods, surface-specific guidance, examples, and variants.
- **Exemplars:** shipped/reviewed examples worth repeating, including mistakes to avoid.
- **Coverage gaps:** visible list of areas where the skill does not yet have enough evidence.
- **Deterministic checks:** validators, xref guards, quote verification, routing probes, and small linters/scripts when a rule can be checked mechanically.
- **Human review:** new standards need source evidence, scope, exceptions, and approval before becoming reusable guidance.

## Rewrite Standard

Use this checklist when touching any skill:

- **Trigger:** Does the description say what the skill does, when to use it, and nearby boundaries?
- **Mode:** Does the body tell the agent whether to shape, implement, review, copy, audit, research, or harden?
- **Routing:** Are detailed sources one level below `SKILL.md`, with clear "read this when..." conditions?
- **Authority:** Does the skill distinguish user constraints, verified source evidence, accepted local rules, adjacent examples, and general heuristics?
- **Evidence:** Are new rules tied to an original source, a real failure, a repeated review comment, or an accepted exemplar?
- **Degree of freedom:** Is judgment prose kept in guidance and mechanical consistency moved to scripts/checks?
- **Examples:** Are there good/bad or before/after examples where the skill is easy to misuse?
- **Gaps:** Are missing standards parked visibly instead of being invented from one weak example?
- **Validation:** Does the change pass repo validators, xref checks, and targeted quick validation?

## Pilot Cluster

Start with the skills most directly affected by the article:

| Skill | Why it is in the pilot | First change |
| --- | --- | --- |
| `creating-skills` | Owns skill authoring and source conversion. | Add Vercel-style evidence/routing/governance rules to house style. |
| `working-with-ai` | Owns agents working on real repos and org enablement. | Route "teach agents a standard" requests to the evidence-to-skill pattern. |
| `design-systems` | Owns DS-as-AI-context, token/component specs, and enforcement. | Make the "DS as agent context" distinction explicit: substrate, lintable rules, exemplars, coverage gaps. |
| `design-craft` | Owns quality methodology and Linear-style quality rituals. | Treat quality rituals as evidence sources for examples/rules, not only craft advice. |
| `frontend-design` | Owns distinctive UI generation. | Keep aesthetic generation separate from product-design governance; add evidence/routing note only if needed. |
| `ai-experience-design` | Owns agent/AI surfaces inside products. | Route product-agent UI decisions here, while repository-agent standards stay in `working-with-ai` and `creating-skills`. |
| `ux-writing` | Owns copy rules where stable IDs and examples matter. | Later pass: add rule-ID/source/good-bad example pattern for copy decisions. |
| `user-onboarding` | Owns first-run/empty-state repeated decisions. | Later pass: add surface examples and coverage gaps. |

Completed in the 2026-06-26 first implementation batch:

- Repo-level governance: `AGENTS.md`, `docs/skill-library-ops.md`, this overhaul ledger.
- Pilot P0 skills: `creating-skills`, `working-with-ai`, `design-systems`, `design-craft`.
- P1 boundary pass: `ai-experience-design`, `ux-writing`, `user-onboarding`, `product-decision-making`, `design-prototyping`.
- Test scaffolding: `docs/vercel-routing-probes-2026-06.md` and probes 115-129 in `~/.claude/skill-evals/routing-eval.md`.
- Probe tooling: `scripts/build_vercel_probe_packet.py` and current-agent sanity results in `docs/vercel-routing-probe-results-2026-06.md`.
- Deterministic overhaul check: `scripts/check_vercel_overhaul.py` verifies audit rows, description cap, required artifacts, and source/gap scaffolding.
- Deterministic probe-fixture check: `scripts/check_vercel_routing_probes.py` verifies expected skills, contiguous probe IDs, generated packet coverage, and optional sync with `~/.claude/skill-evals/routing-eval.md` probes 115-129 when that file exists.
- Latest validation pass: `validate_all`, `check_xrefs`, `check_vercel_overhaul`, `check_vercel_routing_probes`, and `git diff --check` all pass on 2026-06-26.
- Fresh descriptions-only judge: Kepler passed 15/15 routing probes on 2026-06-29 using only the generated packet and no repo/file context.
- Per-skill smoke tests: `docs/per-skill-smoke-tests-2026-06.md`, `scripts/build_skill_smoke_packet.py`, `scripts/check_skill_smoke_tests.py`, and `docs/per-skill-smoke-results-2026-06.md`; Wegener passed 39/39 first-skill smoke prompts on 2026-06-29 using only the generated descriptions packet.
- Source maps / coverage gaps added across all P0/P1/P2 skills that need them, including the central agent/design skills (`creating-skills`, `working-with-ai`, `design-craft`, `frontend-design`) and all source-derived P2 skills.
- Completion audit: `docs/vercel-completion-audit-2026-06.md`.
- Description hygiene: trimmed `research-cataloging`, `design-craft`, and `swiftui` while preserving routing boundaries.

## Collection Audit Snapshot

Snapshot from 2026-06-26:

- `39` tracked skills in `/Users/kevingutowski/.claude/skills` passed `python3 -B scripts/validate_all.py`.
- Cross-reference guard passed against `368` files, `39` skills, and `221` reference names.
- Every skill with a `references/` directory now has top-level `sources.md` and `coverage-gaps.md`, and `check_vercel_overhaul.py` verifies both existence and `SKILL.md` links for P0/P1/P2 skills.
- Longest descriptions are capped at `450` chars by `check_vercel_overhaul.py`.

Detailed per-skill backlog: `docs/vercel-skill-audit-2026-06.md`.
Pilot routing probes: `docs/vercel-routing-probes-2026-06.md`.
Probe results: `docs/vercel-routing-probe-results-2026-06.md`.
Per-skill smoke tests: `docs/per-skill-smoke-tests-2026-06.md`.
Per-skill smoke results: `docs/per-skill-smoke-results-2026-06.md`.

This argues for a staged overhaul:

1. Add repo-level governance and audit scaffolding.
2. Pilot the Vercel pattern in the agent/product/design cluster.
3. Add coverage-gap files only where they prevent invented rules.
4. Add exemplars only where the skill has repeated decisions worth teaching.
5. Add or extend deterministic checks only for rules that code or text can verify reliably.
6. Re-run validation after each batch.

## Per-Skill Pass Template

Use this template while overhauling a skill:

```markdown
Skill:
Pass date:
Mode(s):
Original sources checked:
Current references checked:

Trigger/boundary changes:
Routed references added or revised:
Rules promoted:
Rules rejected or parked:
Exemplars added:
Coverage gaps added:
Deterministic checks added:
Validation run:
Remaining follow-up:
```

## Decision Form

Use this for candidate guidance before it becomes a rule:

```markdown
# Decision: {name}
Status: proposed | accepted | rejected
Owning skill/reference:
Scope:
Decision:
Rationale:
Evidence:
Exceptions:
Bad example:
Good example:
Assumptions:
Open decisions:
Approver:
```

## Remaining Backlog

- Run a full trigger/boundary audit of all `SKILL.md` descriptions.
- Rerun the formal fresh-judge pass on the routing-probe packet generated by `python3 scripts/build_vercel_probe_packet.py` after future description or routing-probe changes.
- Rerun the per-skill smoke pass generated by `python3 scripts/build_skill_smoke_packet.py` after future skill additions or description changes.
- Continue with description/routing hygiene, exemplar triage, deterministic-check candidates, and routing validation. Do not promote new source-derived rules until a specific skill's original sources are rechecked for that rule.
- Decide whether this repo should adopt skill-local `AGENTS.md` files. Default no until a skill needs special load order, validation, or governance that does not belong in `SKILL.md`.
- Decide whether `exemplars/` should be standardized as a folder name. Default yes for future high-judgment skills; do not create empty folders.
