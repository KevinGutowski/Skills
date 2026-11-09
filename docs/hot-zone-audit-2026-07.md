# Hot-zone audit: frontend and AI entry points

Audit date: 2026-07-24. Scope: first 120 lines of `frontend-design`, `working-with-ai`, `working-with-ai/references/agentic-coding.md`, and `ai-experience-design`.

| Entry point | Trigger distinct? | Mode visible? | Five decisions visible? | Reference selection immediate? | Authority classes distinct? | Output clear? | Verification clear? | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `frontend-design` (before) | Yes | Partial build implication | No | No routed depth | No | “working code,” but no contract | No | Revise |
| `working-with-ai` | Yes; strongest AI-chain boundary | Router by design | N/A—selects one of three modes | Yes, one reference per task | Partial | Delegated to references | Delegated to references | Keep |
| `agentic-coding.md` (before) | Yes | No | Buried in long constraint/source sections | N/A; selected reference | Standards and anecdotes mixed | Checklist only | Checks scattered | Revise |
| `ai-experience-design` | Yes | Design/shaping implied | Core input/output decisions appear early | `patterns.md` is named later than ideal | Standards carry dates; heuristics are attributed | Checklist is usable | Eval requirements are explicit | Keep for a later quote-bank extraction |

## Selection

The two highest retrieval costs were `frontend-design` and `agentic-coding.md`. The former mixed its build entry point with SVG instruction, quote-backed field tactics, and implementation history. The latter opened with provenance and a long contents/constraint sequence before defining authority, delegation, output, or review behavior.

`working-with-ai/SKILL.md` was not expanded: its short router is the desired shape. `ai-experience-design` remains long, but its durable input/output decisions and eval boundary are already visible near the top; moving its later practitioner narratives is useful follow-up, not the first bottleneck.

## Changes

- `frontend-design` now exposes build mode, neighboring boundaries, five decisions, a build output contract, and verification before routed depth.
- Actionable SVG mechanics, de-slop implementation guidance, font exceptions, and field tactics moved to `references/visual-execution.md`; original wording, named examples, attribution, and evidence context remain available on demand in `references/visual-field-notes.md`.
- `agentic-coding.md` now exposes mode, authority order, delegation/isolation decisions, evidence requirements, a task-shaped output, and a load-bearing routing example before its deeper method.
- Application fixtures test decisions and boundaries rather than exact prose.
