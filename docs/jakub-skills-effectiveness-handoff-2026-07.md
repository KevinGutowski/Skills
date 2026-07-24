# Skill effectiveness handoff: lessons from Jakub Krehel's skills

Date: 2026-07-24  
External source: https://github.com/jakubkrehel/skills  
Screened revision: `f2d1354f9966fd4d03f9c2beb69591ecec22af54`

## Executive summary

Jakub's collection is not broadly more capable than this repository. It is better packaged for immediate use.

This repository has greater domain depth, source diversity, platform coverage, boundary handling, provenance, and maintenance infrastructure. Jakub's collection has clearer entry points, more consistent review contracts, shorter paths from trigger to decision, and lower retrieval cost.

The desired direction is therefore:

> Preserve this repository's depth while adopting Jakub's discipline around concise entry points, explicit modes, predictable outputs, evidence requirements, and verification.

Do not import the seven external skills as parallel top-level skills. Their specialist domains already belong to `web-design`, `design-craft`, and `ux-writing`. The useful missing task shape—holistic interface review—has been added as `interface-review`, and the missing web-layout layer has been added beneath `web-design`.

The next phase should focus on retrieval and application quality rather than accumulating substantially more guidance.

## Comparative assessment

| Dimension | Jakub's collection | This repository | Direction |
| --- | --- | --- | --- |
| First-use clarity | Strong | Uneven | Make decisive rules visible in the first screenful. |
| Concision | Strong | Often dense | Move source texture and variants into routed references. |
| Review consistency | Strong | Varies by skill | Standardize evidence, verification, and verdict contracts where review is a real mode. |
| Domain depth | Moderate | Strong | Preserve local depth. |
| Source diversity | Limited or implicit | Strong | Keep local provenance and corroboration requirements. |
| Routing boundaries | Simple | Comprehensive but complex | Keep boundaries, simplify the first routing decision. |
| Implementation recipes | Easy to find | Strong but dispersed | Add short decision tables and direct reference routes. |
| Platform coverage | Primarily web UI | Broad | Preserve platform separation. |
| Maintainability | Easy because small | Strong governance for scale | Continue source maps, coverage gaps, probes, and validators. |
| Unsupported doctrine risk | Higher | Lower | Keep exact values sourced or explicitly labeled as heuristics. |

## What is already implemented in the current working tree

Before starting another pass, inspect the working tree. The following work is intentionally uncommitted:

- `interface-review/`
  - New user-invocable holistic interface-review skill.
  - Quick/full modes, evidence requirements, root-cause consolidation, rejected candidates, verification, read-only default, and one verdict.
- `web-design/references/web-layout-design.md`
  - New layout execution layer for grouping, logical properties/RTL, container queries, reflow, safe areas, content stress, and discoverable overflow.
- `web-design/references/web-accessibility.md`
  - Current W3C-corroborated distinctions for native controls versus ARIA widgets, composite-widget focus, Focus Not Obscured, Target Size Minimum, and Focus Appearance.
- `docs/jakubkrehel-skills-source-mining-2026-07.md`
  - Complete manifest, density assessment, fold map, and parked rules.
- README, mining ledger, audit matrix, and smoke-test fixture updates.

Do not recreate or overwrite these changes. Extend them.

## Product objective

An agent should be able to:

1. Select the correct skill from metadata.
2. Understand its mode, scope, and decisive rules from the first screenful.
3. Load only the references needed for the task.
4. Apply rules with evidence and exceptions intact.
5. Produce a predictable artifact appropriate to the task.
6. Verify the result rather than merely restating guidance.

Depth that cannot be reliably retrieved and applied does not improve the runtime result.

## Principles for the implementation

### 1. Optimize retrieval before adding knowledge

For each skill, identify the five or fewer decisions an agent must make first. Put those before source history, philosophy, long examples, or appendices.

The opening section should answer:

- What mode am I in: shape, build, review, audit, research, or harden?
- What is in scope?
- Which neighboring skill owns nearby work?
- Which reference should I read next?
- What evidence or verification is required?

### 2. Preserve progressive disclosure

Use the existing three-layer model:

1. Description: routing contract.
2. `SKILL.md`: mode, boundaries, decision rules, and reference selection.
3. References: detailed methods, variants, examples, source texture, and implementation recipes.

Do not shorten a skill by deleting valuable knowledge. Move material to the owning reference and leave a direct, conditional route.

### 3. Standardize only real task shapes

Do not force every skill into one template. A review skill, generation skill, research skill, and reflective-coaching skill need different outputs.

Where a skill genuinely supports review, standardize:

- resolved scope;
- evidence inspected;
- findings ordered by impact;
- exact locations;
- current versus proposed state;
- verification performed and not performed;
- final verdict or recommendation.

Where a skill builds or changes something, lead with the delivered outcome and verification rather than a review verdict.

### 4. Separate standards from heuristics

Every exact number or universal-sounding rule should be one of:

- a current standard or platform requirement, with a primary source;
- a project/design-system rule, labeled as local;
- a source-specific heuristic, labeled as a starting point;
- an empirical result, with its test context;
- parked until evidence exists.

Example: WCAG 2.2 AA Target Size Minimum is `24×24 CSS px` with exceptions. A `44×44` target may be a strong product or platform rule, but it must not be presented as the WCAG AA minimum.

### 5. Test retrieval separately from application

A routing test answers: "Did the agent select the right skill?"

An application fixture answers: "After selecting it, did the agent use the rules correctly?"

Both are required. A well-routed skill can still produce bad work because its decisive rule is buried, contradictory, or too vague.

## Prioritized implementation plan

## Phase 1: Hot-zone audit

Priority: P0

Audit the first 120 lines of the highest-use skills:

- `web-design`
- `design-craft`
- `frontend-design`
- `ux-writing`
- `working-with-ai`
- `design-prototyping`
- `design-systems`
- `apple-design`
- `swiftui`
- `rails`
- `interface-review`

For each, record:

| Field | Question |
| --- | --- |
| Trigger | Does the description clearly distinguish its nearest neighbors? |
| Mode | Does the opening identify build/review/research/etc.? |
| Decisions | Are the first five decisions visible before source texture? |
| Routing | Can an agent select a reference without scanning the whole body? |
| Authority | Are standards, local rules, heuristics, and examples distinguishable? |
| Output | Is the expected artifact clear where one is needed? |
| Verification | Does the skill say how to know the work is done? |

Deliverable:

- `docs/skill-hot-zone-audit-2026-07.md`

Acceptance criteria:

- All listed skills have a completed row.
- Every proposed edit names the exact section/file that should own the moved material.
- No recommendation is merely "make concise"; each identifies what decision is hidden or what material should move.

## Phase 2: Compress the highest-cost entry points

Priority: P0

Use the Phase 1 audit to revise the three to five skills with the highest retrieval cost.

Likely candidates based on the current corpus:

- `frontend-design`: strong content, but a long body mixes generation rules, SVG mechanics, practitioner notes, and source-derived tactics.
- `working-with-ai/references/agentic-coding.md`: high-value workflow mixed with source texture.
- `ai-experience-design`: strong pattern vocabulary with a large body.
- `user-research`: operational method plus extensive interview texture.
- `design-craft`: excellent but dense; ensure the execution router remains above methodology depth.

Editing rules:

- Keep decision rules and one load-bearing example in the entry point.
- Move quote banks, long practitioner narratives, variants, and historical texture to references.
- Do not create an unstructured catch-all reference.
- Update the parent's reference table and conditional routing language.
- Preserve source attribution during moves.

Acceptance criteria:

- Each edited `SKILL.md` remains under 500 lines and the approximately 5,000-token body budget.
- The first 120 lines contain mode, boundaries, decisive rules, and reference routing.
- No local reference becomes unreachable.
- No source attribution is lost.

## Phase 3: Add application fixtures

Priority: P0

The repository already has metadata routing smoke tests. Add a small application-eval layer for the most consequential skill families.

Start with five fixtures:

1. `interface-review`
   - Input: a small representative UI repository or frozen code fixture with seeded cross-domain defects.
   - Expected: scope resolution, deduplicated root causes, evidence, rejected candidates, verification gaps, correct verdict.
2. `web-design` (web-layout-design)
   - Input: responsive component with viewport-driven component bug, physical properties that fail RTL, fixed-height text clipping, and sticky focus occlusion.
   - Expected: container-query decision, logical-property repair, reflow verification, focus visibility.
3. `web-design` (web-accessibility)
   - Input: custom composite widget, undersized targets, misleading focus compliance claim.
   - Expected: native-control preference or correct APG pattern, precise AA/AAA distinctions.
4. `ux-writing`
   - Input: destructive confirmation, vague error, inconsistent flow labels, poor settings toggle.
   - Expected: surface-owner routing and complete replacements.
5. `working-with-ai` (ai-ui-direction)
   - Input: AI-generated layout with wrong sizing primitive, token substitution, and missing states.
   - Expected: primitive diagnosis, prompt-versus-edit choice, explicit verification.

Prefer frozen textual fixtures and expected decision traces over subjective golden prose.

Suggested structure:

```text
evals/
  application/
    interface-review/
      prompt.md
      fixture/
      expected.md
```

Before creating this structure, check whether the existing eval tooling has a preferred location and extend it rather than adding a parallel framework.

Acceptance criteria:

- Each fixture tests at least one positive rule, one exception/boundary, and one likely failure mode.
- Expected results name required decisions, not exact prose.
- A failure distinguishes routing failure from application failure.

## Phase 4: Introduce task-shaped output contracts

Priority: P1

Review the skills that repeatedly produce audits, critiques, or reports. Add a lightweight output contract only where it improves consistency.

Candidates:

- `interface-review`
- `web-design` accessibility audits
- `design-craft` critique mode
- `data-viz` chart critique
- `dhh` diff review
- `user-research` research plans
- `design-systems` audits

Avoid copying the same large template into every skill. Create surface-specific contracts:

- review: evidence → findings → verification → verdict;
- research plan: decision → method → participants/evidence → risks → synthesis;
- generation/build: concept → implementation → verification;
- strategy critique: decision → principles/trade-offs → recommendation.

Acceptance criteria:

- Contracts do not override the repository's general response style.
- Review requests remain read-only unless implementation is requested.
- No skill invents findings to populate a required table.

## Phase 5: Exact-value audit

Priority: P1

Search for universal or compliance-sounding numbers:

```bash
rg -n '\b(always|never|minimum|maximum|exactly|must)\b|[0-9]+×[0-9]+|[0-9]+px|[0-9]+ms|[0-9]+%' \
  --glob '*/SKILL.md' --glob '*/references/*.md'
```

Classify high-impact occurrences:

| Classification | Required treatment |
| --- | --- |
| Current standard | Link primary current source and identify level/version. |
| Platform convention | Name platform and version/staleness boundary. |
| Local design value | Label as a project/theme token. |
| Practitioner heuristic | Attribute and state when to tune. |
| Empirical finding | Record test context. |
| Unsupported | Soften, park, or remove. |

Prioritize accessibility, security, performance, browser/API support, legal claims, and destructive-action guidance.

Acceptance criteria:

- No high-stakes exact value is presented without authority and scope.
- Conflicting schools remain separate.
- Theme-specific motion or polish values are not generalized across platforms.

## Phase 6: Continue external-source intake

Priority: ongoing

Evaluate future sources by delta, not reputation.

For every external repository, book, article series, or course:

1. Build a source manifest.
2. Read implementation artifacts and tests, not only the README.
3. Assign density: high, medium, low, or skip.
4. Map every candidate lesson to an existing owner.
5. Choose extend, create, park, or skip.
6. Corroborate high-stakes or exact claims with primary sources.
7. Add a source-mining record.
8. Validate routing and application.

Good future source candidates have one or more of:

- repeated decision procedures;
- failure modes not already represented;
- implementation tests that reveal invariants;
- current primary documentation for stale technical references;
- accepted before/after exemplars;
- task shapes missing from the taxonomy.

Low-value candidates mostly restate broad principles, rename familiar patterns, or provide unsourced universal numbers.

## Suggested developer workflow

Before editing:

```bash
cd /workspace/Skills
sed -n '1,240p' AGENTS.md
sed -n '1,260p' docs/agent-quickstart.md
sed -n '1,340p' docs/skill-library-ops.md
sed -n '1,360p' docs/vercel-product-design-overhaul-2026-06.md
git status --short --branch
```

During edits:

- Work from one owning skill at a time.
- Use `rg` to check whether a candidate rule already exists.
- Preserve unrelated working-tree changes.
- Add source and coverage-gap updates with the owning reference.
- Keep decisive instructions high in the file.

Validation:

```bash
.venv/bin/python scripts/validate_all.py
.venv/bin/python scripts/check_xrefs.py
.venv/bin/python scripts/check_reference_hygiene.py
.venv/bin/python scripts/check_vercel_overhaul.py
.venv/bin/python scripts/check_vercel_routing_probes.py
.venv/bin/python scripts/check_skill_smoke_tests.py
git diff --check
```

Run targeted validation for every changed skill:

```bash
.venv/bin/python \
  /root/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
  path/to/skill
```

## Definition of done

This effectiveness pass is complete when:

- high-use skills expose mode, boundaries, decisions, and routing in their first screenful;
- deep source material remains available without occupying the entry point;
- holistic and focused requests route to different owners reliably;
- application fixtures prove that selected skills are used correctly;
- standards and heuristics are visibly distinct;
- review skills require evidence and verification;
- build skills lead to implemented, verified outcomes;
- all validation gates pass;
- source-mining and coverage-gap records explain what was folded, parked, and skipped.

## Non-goals

- Do not make all skills look identical.
- Do not replace deep references with shallow checklists.
- Do not add one top-level skill per external source.
- Do not promote attractive but unsupported exact values into standards.
- Do not optimize only for description-level routing.
- Do not rewrite the entire repository in one pass.
- Do not create commits unless explicitly requested.

## Recommended first ticket

Start with Phase 1 and Phase 2 for `frontend-design`, `working-with-ai`, and `ai-experience-design`.

These have high user value and enough depth that retrieval improvements should materially change agent performance. Produce the hot-zone audit first, then edit only the worst two entry points. Add one application fixture for each edited skill before expanding the effort.

