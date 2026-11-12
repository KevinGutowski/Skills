# Sources

This source map records where the skill-authoring guidance comes from.

## Official/live sources

- Anthropic Skill docs linked from `SKILL.md`: Skills Overview, Quickstart, Best Practices, and Using Skills with the API. Treat these as live references; re-check before changing official mechanics or limits.
- `references/skill-creator.md` mirrors/extends Anthropic's bundled guide and init/package-script workflow.

## Local corpus sources

- `references/authoring-checklist.md`, `references/conciseness.md`, `references/degrees-of-freedom.md`, `references/progressive-disclosure.md`, `references/skill-structure.md`, and `references/description-writing.md` distill the official Anthropic guidance (each file cites its source doc). `authoring-checklist.md` and `description-writing.md` are the single house checklist and description guide: they state the House Style rule first and note the upstream default in one line. The rules themselves live in `SKILL.md`'s House Style section.
- `converting-books-to-skills.md`, `converting-codebases-to-skills.md`, and `converting-visual-references-to-skills.md` encode source-to-skill conversion methods from this corpus.
- `docs/vercel-product-design-overhaul-2026-06.md` records the Vercel-derived standard: skill body + routed evidence + coverage gaps + deterministic checks + human review.
- House rule 16 (register skills at work-creating surfaces): Matt Pocock's `/wayfinder` planning skill (https://github.com/mattpocock/skills, 2026) and Will Ness's fork routing `grilling-frontend-prototyping` from wayfinder's ticket types (https://github.com/will-ness-ai/skills), endorsed in https://x.com/mattpocockuk/status/2077743625639714850.
- House rule 17 and `references/measuring-skill-effect.md`: Fernando Olivares, uikit-skill (MIT, Oct 2026) — upstream docs: experiment-plan, thinning-plan, v0.9-adversarial-review, uikit-chat-list-sources (https://github.com/notolivaresf/uikit-skill). Single-author benchmark of one UIKit chat task; treat numbers as one task's evidence, the method as general.

## Promotion rule

Promote new skill-authoring guidance only when it comes from official docs, a repeated local routing/eval failure, a verified source-conversion workflow, or an accepted corpus governance decision.
- `measuring-skill-effect.md` (Generative skills section): Impeccable by Paul Bakaus (https://github.com/pbakaus/impeccable, Apache-2.0, screened at `b3ced85`, 2026-11-09). Sources are the maintainer CLAUDE file, `tests/skill-behavior/` conventions, and the research note https://impeccable.style/research. Ledger: `docs/impeccable-source-mining-2026-11.md`.
