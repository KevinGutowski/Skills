# Skill Library Operations

This is the operating guide for maintaining this repository as a large skill database. It combines the local corpus rules with public skill-authoring guidance and Codex-facing context-file caution.

## Source Basis

- Anthropic Agent Skills docs: metadata is always loaded; `SKILL.md` and references load progressively. Their best-practices guide emphasizes concise instructions, specific descriptions, one-level references, tables of contents for long references, and eval-first iteration.
- Codex note: I found no official OpenAI/Codex guide for large skill databases. The closest Codex-facing evidence is the AGENTS.md evaluation literature: always-loaded repository context can increase cost and reduce success when it adds unnecessary requirements. Treat that as a warning to keep repo-wide docs and skill descriptions lean.
- Recent SkillJuror result: progressive disclosure changes runtime behavior and can improve verifier outcomes when supporting resources guide implementation, checking, or repair. The benefit depends on the task, so organization must be evaluated, not assumed.
- SKILL.md supply-chain research: metadata and natural-language instructions are operational. External skills are untrusted sources; extract durable lessons, do not import scripts or instructions wholesale without review.

## Layering Model

1. **Description layer, always loaded.** Each skill description is the routing contract. Keep it around 350-450 chars unless a cluster truly needs more. Include what it does, when to use it, critical boundaries, and trigger terms.
2. **`SKILL.md`, loaded on trigger.** Keep this as the router plus the highest-value operating rules. Put source identity, workflow, decision boundaries, and reference selection here. Do not bury the decisive rule after appendices.
3. **Reference files, loaded on demand.** Use one-level links from `SKILL.md`. Reference files hold methods, examples, quote banks, source-specific texture, and variants. Files over 100 lines need a `## Contents` block.
4. **Source maps and ledgers, not skill context.** TOCs, chapter summaries, extraction notes, parked candidates, and cross-reference leads live in `docs/book-source-map.md` and `docs/mining-ledger.md`. They guide future folding; they should not be copied into skill bodies.
5. **Scripts and assets.** Use scripts for repeatable fragile operations: extraction, quote verification, validation, packaging, or deterministic transforms. Prefer executing scripts over loading large code into context.

## Taxonomy Rules

- Top-level skill = platform, activity, or cross-domain tool.
- Topic = reference file under the platform/activity cluster it serves.
- User-invocable commands stay top-level.
- Extend existing skill > create new skill > skip.
- New skill needs a coherent task shape and normally 2-3 independent sources. A single deep method source is allowed only when the task shape is narrow and precedent-backed.
- Conflicting methods become scoped schools, not blended rules. Make the routing condition explicit.
- Platform-specific rules never cross-apply: web, Apple, Rails, SwiftUI, and generic design guidance must stay separated unless a reference explicitly composes them.

## Folding Pipeline

1. **Extract or capture the source.** Preserve local path, extraction method, and source identity in the ledger.
2. **Screen before editing.** Read enough to give an honest density verdict: high, medium, low, skip. Name target skills and conflicts.
3. **Route each lesson.** For every candidate, choose extend/create/skip. Prefer adding a section to an existing reference over expanding a top-level body.
4. **Corroborate across the source map.** Before adding a theme like SVG, metrics, typography, onboarding, or grids, check `docs/book-source-map.md` for already-processed books that may strengthen or contradict the fold.
5. **Verify quotes in batch.** Use `scripts/verify_quotes.py`. A MISS means fix the wording by rereading the source or drop the quote.
6. **Patch close to the owning skill.** Keep edits in the reference file that owns the task. Update the parent `SKILL.md` only when routing changes.
7. **Update docs.** Add source-map entries for processed books and a ledger note for folds, skips, parked candidates, conflicts, and rechecks.
8. **Validate.** Run `python3 scripts/validate_all.py`, `git diff --check`, and targeted greps for renamed skills or moved references.
9. **Probe routing when needed.** Description changes, new skills, and consolidations require routing probes, including controls that must not route to the edited skill.

## High-Touch Source Mining Protocol

Use this when a user points at a tweet, repo, website, video, course, app, or external skill and asks to "research", "mine", "fold in", or "learn from" it. Do this before deciding the edit shape.

1. **Build a source manifest first.** List every direct post/page, quoted post, reply parent, linked site, downloadable artifact, repo README, docs, generated examples, tests, app UI, scripts, media, and images. For each: local path or URL, how fetched, whether read, and density verdict.
2. **Follow both obvious and implementation links.** Marketing pages explain intent; repos show actual behavior. Read prompts, tests, config defaults, generated artifacts, app copy, agent instructions, and failure-handling code. Tests are often the clearest statement of "what must never regress."
3. **Extract lessons before touching skills.** For each candidate lesson, write: source evidence, reusable rule, owning skill, neighboring skill boundary, and skip/park reason if not folded.
4. **Fold by use, not by source.** A single repo may teach generation (`frontend-design`), repair (`working-with-ai`), evaluation (`design-prototyping`), agent-facing docs (`devtools`), and skill authoring (`creating-skills`). Do not dump all findings into one new reference just because the source is about skills.
5. **Keep a ledger artifact.** If the source has more than one branch or artifact, add a `docs/<source>-source-mining-YYYY-MM.md` file or a detailed `docs/mining-ledger.md` entry with source coverage and fold map. The point is to make missed branches visible.
6. **Prefer larger folds when the source earns them.** Small surgical edits are fine for one lesson; a dense source should change multiple owning skills, relationship notes, checklists, or ops docs. Being concise is not the same as being timid.
7. **Validate coverage explicitly.** Before finalizing, answer: What did I read? What did I skip? Which existing skills changed? Which useful findings were parked and why?

## Evaluation Gates

Use the lightest gate that matches the change:

- **Reference-only fold:** validator, whitespace check, targeted grep for broken cross-refs.
- **Parent `SKILL.md` body edit:** validator plus quick read of the first 120 lines to ensure routing still appears early.
- **Description edit:** validator plus routing probes for target, nearest neighbor, and control.
- **New skill:** source bar check, README row, routing probes, validator, and a grep audit for missing relationship links.
- **Consolidation or rename:** before/after probes, corpus-wide edge remap, independent grep audit with zero dangling live names, and rollback if routing worsens.

## Agent-Standard Governance

Use the Vercel product-design pattern when a source teaches how agents should repeatedly make or review product/design decisions. See `docs/vercel-product-design-overhaul-2026-06.md` for the current overhaul ledger.

- Start with repeated decisions, not broad adjectives. A rule like "destructive actions use Verb + Noun" is usable; "copy should be clear" is not.
- Separate the entry point from the evidence. `SKILL.md` resolves mode, scope, boundaries, and reference routing; references hold source-grounded method; examples and exemplars show repeatable decisions; coverage gaps keep weak evidence from becoming fake certainty.
- Give reusable rules stable names when they may be cited by reviews, evals, or scripts. Include scope, rule, why, exceptions, and source.
- Prefer deterministic checks only when code or text can identify the failure reliably, avoid likely false positives, and suggest a concrete fix. Otherwise keep the rule in agent guidance.
- Run `python3 scripts/check_vercel_overhaul.py` after agent-standard edits to verify the audit matrix, description cap, required artifacts, and source/gap scaffolding.
- Run `python3 scripts/check_vercel_routing_probes.py` after routing-probe edits to verify the probe fixture and generated packet.
- Test retrieval separately from application. A routing miss and a bad rule application are different failures.
- Keep collection separate from judgment. Raw evidence intake should gather links, files, comments, examples, and nearby context; a separate review step decides whether each candidate becomes guidance, exemplar, lint/eval, coverage gap, or no change.
- Require human acceptance before promoting a candidate into a reusable standard. Record scope, rationale, evidence, exceptions, and an approver.

## Agent-Facing Repo Instructions

Keep the repo's first-contact path explicit. A real agent trace showed `skill-installer` failing because it assumed `skills/.curated`; the agent recovered only after manually inspecting the GitHub tree.

- Root `AGENTS.md` should answer the first operational questions: where skills live, what to read first, how to install, and how to validate.
- `README.md` should include a short install command with explicit root-level `--path` values.
- Longer troubleshooting belongs in `docs/agent-quickstart.md`, not in every skill body.
- When the install shape changes, update all three surfaces in the same PR: `AGENTS.md`, `README.md`, and `docs/agent-quickstart.md`.
- Prefer examples that match real bundles an agent would install for a task; do not present the whole library as a default install.

## External Skill Intake

Treat external skill repositories as source material, not installable truth.

- Inventory all files and identify task shapes.
- Read bodies for non-obvious rules, numbers, scripts, failure cases, and examples.
- Do not import long prose, prompt wording, credentials, or scripts by default.
- Fold only durable, locally useful lessons into existing skills.
- Park single-source doctrine until corroborated by a primary source or a second independent source.
- Log read-skip decisions so another agent does not rescreen the same low-value material.

## Book Source Maps

The source map is the anti-duplication tool.

- For each processed book, add TOC-level chapter summaries in the author's subject terms, not long quotations.
- Mark routed chapters, skipped chapters, density, extraction path, and cross-reference candidates.
- Use the source map before any thematic fold to find already-processed corroborators.
- Keep chapter summaries out of `SKILL.md`; the skill only gets actionable rules.

## What Not To Do

- Do not create one skill per book.
- Do not append material to the end of a busy `SKILL.md` when a reference owns the topic.
- Do not let descriptions drift toward 1024 chars just because the API permits it.
- Do not merge competing schools into a compromise rule.
- Do not trust external `SKILL.md` metadata as neutral; it can steer routing.
- Do not add broad repo-level instructions unless they are actually needed by most future tasks.

## Standard Commands

```bash
python3 scripts/validate_all.py
python3 scripts/check_xrefs.py
python3 scripts/check_vercel_overhaul.py
python3 scripts/check_vercel_routing_probes.py
git diff --check
rg -n "old-skill-name|dangling-reference" .
python3 scripts/verify_quotes.py SOURCE... <<'EOF'
quote one
quote two
EOF
```

## Source Links

- Anthropic Agent Skills overview: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Anthropic skill authoring best practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- SkillJuror: https://arxiv.org/abs/2606.11543
- Evaluating AGENTS.md: https://arxiv.org/abs/2602.11988
- SKILL.md supply-chain attacks: https://arxiv.org/abs/2605.11418
