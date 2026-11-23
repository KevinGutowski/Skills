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

## design.how

- Site: https://design.how · Repository: https://github.com/arla6ka/design.how (MIT)
- Revision screened: `148b94c` (2026-11-14)
- Read: `ui-review` (SKILL and criteria) and the trap list in `build-design-system`.
- Delta used here: [behaviour-traps.md](behaviour-traps.md). It covers the symptom-to-trap table, stable trap IDs, measured probes (Event Timing for press feedback, real Tab presses for focus rings, measurement inside the scroller), task-level criteria, the shown-versus-sent severity rule, system-caused findings, fixes stated as failing checks, and the shown/not-shown edge-case list.
- Not imported: the source's own bucket names and ship line (this skill keeps HIGH/MEDIUM/LOW and Block/Needs changes/Approve), its multi-reviewer panel sort, its report file locations, and the capture scripts. Traps already owned by `web-design` or `design-craft` are pointed to rather than restated.

## Vercel Web Interface Guidelines

- Repository: https://github.com/vercel-labs/web-interface-guidelines (MIT), its command file at rev `434b7f9` (2026-10-05). Wrapped as the `web-design-guidelines` skill in https://github.com/vercel-labs/agent-skills (rev `5a37a63`), listed on the skills.sh Design topic.
- Read: the command file in full, `AGENTS.md`, `README.md`, and the wrapping `SKILL.md`.
- Delta used here: [code-pass-checklist.md](code-pass-checklist.md). It regroups the source-checkable rules by local owner, adds the grep-then-confirm procedure, maps severities, and records five disagreements with local owners (title case, `autocomplete="off"`, placeholder ellipses, key handlers, copy conventions).
- Not imported: the rule wording itself and the "sacrifice grammar for brevity" output instruction; this skill keeps its own report structure and verdicts. Ledger: `docs/skills-sh-design-topic-source-mining-2026-11.md`.
