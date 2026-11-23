# Coverage Gaps

Use this file for skill-authoring guidance that is not ready to become house style.

## Candidate gaps

- **Official docs drift:** Re-check live docs before changing package structure, manifest/frontmatter expectations, API behavior, or validation rules.
- **Fresh-agent eval harness:** Routing probes exist, but a formal fresh-judge loop still needs user-authorized subagents or another independent runner.
- **Examples over rules (Stageshow, 2026-11):** "where a rule fails, ship an example to copy" and "re-run from scratch instead of hand-fixing" come from one author's unscored account. No local with/without run compares a rule against the same rule plus an exemplar.
- **Technique extraction (Meng To, 2026-11):** the one-sentence mechanism test and the mechanism / staging / incidental sort are single-author and written for visual web techniques; untested here on a non-visual mechanism.
- **Multi-path rules (Open Design, 2026-11):** one product's post-mortem. This library has no check that a rule stated in two files (for example `AGENTS.md` and a skill body) still agrees.
- **Exemplar standard:** The corpus needs examples of accepted `exemplars/` folders before standardizing the directory beyond future high-judgment skills.
- **Deterministic checks:** Add validators only for rules with low false-positive risk, such as broken references, overlong descriptions, missing source/gap pointers, or stale eval fixtures.
- **Task-completion benchmark evidence:** `measuring-skill-effect.md` rests on one author's benchmark of one UIKit task (Claude Code + Codex, Oct 2026). Re-check its transcript findings (body read once; references opened 0-2 times; unasked self-testing as the largest cost) against a second task or corpus before hard-coding them as universal.
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
