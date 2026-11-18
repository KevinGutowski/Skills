# Coverage Gaps

Use this file for AI-tooling guidance that changes too quickly or needs stronger evidence.

## Candidate gaps

- **Tool capability drift:** Coding-agent, MCP, browser, IDE, and model behaviors should be verified before exact workflows are promoted.
- **Security/privacy:** Vibe-coding, agent permissions, secrets, logs, and customer data need current policy checks before broad advice.
- **Fresh-agent validation:** Independent judge/subagent validation should be used only when authorized and isolated from leaked context.
- **Repo instruction exemplars:** Add accepted AGENTS.md/CLAUDE.md examples only when the rules improved real agent behavior.
- **Evasion lint rules (Landmines + anti-slop, 2026-11):** The catalog in agentic-coding has two independent sources for the mocking ban and fix-stating messages; the timing rows are Landmines only and the type row anti-slop only. Still wanted: a local before/after on real agent PRs. Not adopted: house style from either set (no prose comments, no explicit return types, colocated tests and file suffixes, package exports; anti-slop's array, naming, spacing, and Effect rules) and the 100 to 1,200 PRs/week figure. "Protect the gate" (human review of lint config and disables) is our inference.
- **AI UI repair fixtures:** Add reproducible before/after UI repair cases with screenshots or code, not only prompt advice.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Tool/model/version or date:
Observed workflow evidence:
Rule:
Security/privacy check:
Exception:
Status: proposed | accepted | rejected
```
