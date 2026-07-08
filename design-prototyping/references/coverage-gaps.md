# Design Prototyping Coverage Gaps

Use this file to park prototype and eval patterns that need stronger evidence before becoming reusable agent rules.

## Candidate Gaps

- **Hermetic fixture template.** The skill says eval artifacts should be hermetic when testing a skill, but does not yet provide a minimal fixture directory shape for before/after UI, rubric, hidden holdout, and judge packet.
- **Prototype-to-production decision examples.** The body has principles for when code prototypes should carry forward; it needs accepted examples showing when a prototype was thrown away, hardened, or rebuilt in the real repo.
- **Agent-generated prototype scoring.** The independent-judge section gives the stance, but needs example rubrics for visual fidelity, interaction feel, state coverage, and product correctness.
- **Human preference log.** The Jaytel-style skill-lab loop needs a lightweight preference-history form that records what a human preferred and why without leaking the intended answer to future judges.
- **Client/stakeholder review fixtures.** The presentation sections are strong, but the skill needs examples of review packets for synchronous stakeholder critique versus fresh-user concept feedback.
- **Cross-session design memory.** Design Lab (0xdesign, https://github.com/0xdesign/design-plugin) ends each run by writing a `DESIGN_MEMORY.md` — brand adjectives, density preference, dark-mode requirement, typography/color decisions, interaction conventions (forms, modal-vs-drawer, feedback style), accessibility rules, and repo primitives — then reads it at the start of the next run to prefill defaults and skip redundant interview questions. Promising for any recurring agent-design collaboration, but needs evidence that persisted memory doesn't lock in early taste or go stale against a redesigned token set; parked until there are accepted examples of a memory file improving (or correctly being overridden in) a later session.

## Promotion Form

```markdown
fixture/{stable-id}
Status: proposed | accepted | rejected
Prototype question:
Tier:
Before artifact:
After artifact:
Hidden expectation:
Rubric:
Human preference:
Known flaw:
Source:
Approver:
```
