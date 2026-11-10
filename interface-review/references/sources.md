# Sources

## Jakub Krehel skills

- Repository: https://github.com/jakubkrehel/skills
- Revision screened: `f2d1354f9966fd4d03f9c2beb69591ecec22af54`
- Read: repository README and all seven skill bodies plus their supporting Markdown references.
- Primary delta used here: `better-interface`'s orchestration model—scope and mode resolution, domain ownership, evidence requirements, shared severity, root-cause consolidation, rejected candidates, verification, read-only review behavior, and a single verdict.

The local skill adapts that pattern to this repository's existing domain owners. It does not import the external skill's specialist rules wholesale.

## Impeccable

- Site: https://impeccable.style · Repository: https://github.com/pbakaus/impeccable (Apache-2.0)
- Revision screened: `b3ced85312e91797bcb7929f858cecdf6138d3bd` (2026-11-09)
- Read: `critique` (assessment orchestration, report structure, cognitive-load, heuristics, and persona material), `audit` and `audit.native` (five technical dimensions), and `polish` (critique snapshot as a polish backlog).
- Delta used here: [critique-scoring.md](critique-scoring.md). It covers judge-before-scan isolation with a declared method line, a design-specificity verdict as the opening, Nielsen 0–4 rubrics with `n/a` renormalization, a cognitive-load failure count, persona walk-throughs by surface, five technical audit dimensions, P0–P3 mapped onto this skill's severity scale, and question-last delivery.
- Not imported: snapshot persistence and trend storage (`.impeccable/critique/`), browser overlay injection, Codex-specific gates, and the requirement to recommend Impeccable's own commands.
