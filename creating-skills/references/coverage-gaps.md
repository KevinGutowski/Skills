# Coverage Gaps

Use this file for skill-authoring guidance that is not ready to become house style.

## Candidate gaps

- **Official docs drift:** Re-check live docs before changing package structure, manifest/frontmatter expectations, API behavior, or validation rules.
- **Fresh-agent eval harness:** Routing probes exist, but a formal fresh-judge loop still needs user-authorized subagents or another independent runner.
- **Exemplar standard:** The corpus needs examples of accepted `exemplars/` folders before standardizing the directory beyond future high-judgment skills.
- **Deterministic checks:** Add validators only for rules with low false-positive risk, such as broken references, overlong descriptions, missing source/gap pointers, or stale eval fixtures.
- **Task-completion benchmark evidence:** `measuring-skill-effect.md` rests on one author's benchmark of one UIKit task (Claude Code + Codex, Oct 2026). Re-check its transcript findings (body read once; references opened 0-2 times; unasked self-testing as the largest cost) against a second task or corpus before hard-coding them as universal.
- **Delivery-pattern evidence is one vendor's:** `skill-delivery-patterns.md` rests on Vercel's skills and one Vercel eval (Next.js API reference only; no model names or sample sizes). Not tested here: whether a stub-plus-CLI skill is invoked more or less often than an encoded skill, whether rule 20's passive-context advice holds for judgment skills, and the `npx skills` GitHub fast path against this repository's default branch (only a local-path `--list` run was made). The 82-file frontmatter tally and the plugin overlay layout come from a screening pass, not a line-by-line read.
- **Source-to-rule promotion:** Candidate rules need original source, scope, exception, and accepted evidence before entering `SKILL.md`.
- **Finish gates and retrieval relevance (2026-11):** The finish-gate design (capped blocks, waivers with reasons, PARTLY-MEASURED as WARN) comes from tasteskill alone. The relevance-before-data lesson and the provenance-with-freshness format come from `ui-ux-pro-max` alone, and their numbers are its own. Before promoting either to House Style, find a second project or run a local gate. Ledger: `docs/skills-sh-design-topic-source-mining-2026-11.md`.

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
