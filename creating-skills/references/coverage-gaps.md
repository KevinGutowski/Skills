# Coverage Gaps

Use this file for skill-authoring guidance that is not ready to become house style.

## Candidate gaps

- **Official docs drift:** Re-check live docs before changing package structure, manifest/frontmatter expectations, API behavior, or validation rules.
- **Fresh-agent eval harness:** Routing probes exist, but a formal fresh-judge loop still needs user-authorized subagents or another independent runner.
- **Exemplar standard:** The corpus needs examples of accepted `exemplars/` folders before standardizing the directory beyond future high-judgment skills.
- **Deterministic checks:** Add validators only for rules with low false-positive risk, such as broken references, overlong descriptions, missing source/gap pointers, or stale eval fixtures.
- **Source-to-rule promotion:** Candidate rules need original source, scope, exception, and accepted evidence before entering `SKILL.md`.
- **Project design-memory files:** Four published skills converged on skill-managed persistent design context (`published-skill-field-patterns.md`). Candidate for high-judgment skills here; blocked on evidence about staleness/taste lock-in and an ownership rule (agent-read vs agent-write).
- **SYNC.md provenance stubs:** antfu's vendored-source convention (source path + upstream git SHA + sync date) is a candidate addition to the folding pipeline for vendored external material; needs a trial fold before becoming house style.
- **Selection-budget rule:** ui-skills-root's "smallest useful set, never more than 3, route topic → stack → specificity" is a candidate for this corpus's bundle guidance (agent-quickstart already says "keep bundles small"); needs a routing-eval check before promotion.

## Candidate promotion form

```markdown
Candidate:
Source or observed failure:
Affected skill type:
Rule:
Validator/eval possible:
Exception:
Status: proposed | accepted | rejected
```
