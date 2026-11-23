# Coverage Gaps

Use this file for AI-tooling guidance that changes too quickly or needs stronger evidence.

## Candidate gaps

- **Tool capability drift:** Coding-agent, MCP, browser, IDE, and model behaviors should be verified before exact workflows are promoted.
- **Security/privacy:** Vibe-coding, agent permissions, secrets, logs, and customer data need current policy checks before broad advice.
- **Fresh-agent validation:** Independent judge/subagent validation should be used only when authorized and isolated from leaked context.
- **Repo instruction exemplars:** Add accepted AGENTS.md/CLAUDE.md examples only when the rules improved real agent behavior.
- **Evasion lint rules (Landmines + anti-slop, 2026-11):** The catalog in agentic-coding has two independent sources for the mocking ban and fix-stating messages; the timing rows are Landmines only and the type row anti-slop only. Still wanted: a local before/after on real agent PRs. Not adopted: house style from either set (no prose comments, no explicit return types, colocated tests and file suffixes, package exports; anti-slop's array, naming, spacing, and Effect rules) and the 100 to 1,200 PRs/week figure. "Protect the gate" (human review of lint config and disables) is our inference.
- **Reference-to-prompt defaults (Meng To, 2026-11):** the capture numbers (1440 × 1100 viewport, 950px step, 2s settle, four motion frames), the 30/50/70/85 similarity dial, and "change at least four signature elements" come from one author's skills and were not run here. Wanted: one local capture of a lazy-loaded page comparing the native full-page shot with the stitched one, and one build audited with the eight-category rubric. The stance that exact recreation is for the user's own work only is this library's, not the source's. Not adopted: the source's cinematic timing (0.75 to 1.1s reveals), which conflicts with `web-design` (web-animation-design) defaults and is scoped there as an Experience-mode school at most.
- **Clarifying-question cap (Open Design, 2026-11):** the five-question cap and the brand-spec shape (six color tokens, three font stacks, three to five posture rules) are one product's prompt, itself distilled from huashu-design, which was not read directly. No local comparison of asking versus building first.
- **AI UI repair fixtures:** Add reproducible before/after UI repair cases with screenshots or code, not only prompt advice.
- **Corrections into standing rules (2026-11):** The "Turn corrections into standing rules" method in ai-ui-direction comes from one skill (Kowalski's `learn-taste`, added 2026-11-12, no measured results). The generator style brief comes from one vendor (Sleek). Keep both as method until a local session shows fewer repeated corrections.

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
