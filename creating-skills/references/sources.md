# Sources

This source map records where the skill-authoring guidance comes from.

## Official/live sources

- Anthropic Skill docs linked from `SKILL.md`: Skills Overview, Quickstart, Best Practices, and Using Skills with the API. Treat these as live references; re-check before changing official mechanics or limits.
- `references/skill-creator.md` mirrors/extends Anthropic's bundled guide and init/package-script workflow.

## Local corpus sources

- `checklist.md`, `conciseness.md`, `degrees-of-freedom.md`, `progressive-disclosure.md`, `skill-structure.md`, and `writing-descriptions.md` encode local house practice.
- `converting-books-to-skills.md`, `converting-codebases-to-skills.md`, and `converting-visual-references-to-skills.md` encode source-to-skill conversion methods from this corpus.
- `docs/vercel-product-design-overhaul-2026-06.md` records the Vercel-derived standard: skill body + routed evidence + coverage gaps + deterministic checks + human review.

## External field survey

- `references/published-skill-field-patterns.md` distills the 2026-07 ui-skills.com registry sweep (~80 published skills; full manifest and fold map in `docs/ui-skills-source-mining-2026-07.md`): the ibelick distribution stack (registry.txt, per-skill llms.txt, CLI router, root routing skill), authoring formats (Salaja linter-skills, ibelick priority audits, Bakaus command suites, Ricouard repo-adaptive references), workflow discipline (AccessLint, react-doctor playbook), and supply-chain cautions (remote-fetch prompts, commercial embeds, registry rot, description/body mismatch). Field observations, not house style.

## Promotion rule

Promote new skill-authoring guidance only when it comes from official docs, a repeated local routing/eval failure, a verified source-conversion workflow, or an accepted corpus governance decision.
