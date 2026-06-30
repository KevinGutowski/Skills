# Coverage Gaps

Use this file for skill-authoring guidance that is not ready to become house style.

## Candidate gaps

- **Official docs drift:** Re-check live docs before changing package structure, manifest/frontmatter expectations, API behavior, or validation rules.
- **Fresh-agent eval harness:** Routing probes exist, but a formal fresh-judge loop still needs user-authorized subagents or another independent runner.
- **Exemplar standard:** The corpus needs examples of accepted `exemplars/` folders before standardizing the directory beyond future high-judgment skills.
- **Deterministic checks:** Add validators only for rules with low false-positive risk, such as broken references, overlong descriptions, missing source/gap pointers, or stale eval fixtures.
- **Source-to-rule promotion:** Candidate rules need original source, scope, exception, and accepted evidence before entering `SKILL.md`.

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
