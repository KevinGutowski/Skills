# Design Prototyping Coverage Gaps

Use this file to park prototype and eval patterns that need stronger evidence before becoming reusable agent rules.

## Candidate Gaps

- **Hermetic fixture template.** The skill says eval artifacts should be hermetic when testing a skill, but does not yet provide a minimal fixture directory shape for before/after UI, rubric, hidden holdout, and judge packet.
- **Prototype-to-production decision examples.** The body has principles for when code prototypes should carry forward; it needs accepted examples showing when a prototype was thrown away, hardened, or rebuilt in the real repo.
- **Agent-generated prototype scoring.** The independent-judge section gives the stance, but needs example rubrics for visual fidelity, interaction feel, state coverage, and product correctness.
- **Human preference log.** The Jaytel-style skill-lab loop needs a lightweight preference-history form that records what a human preferred and why without leaking the intended answer to future judges.
- **Client/stakeholder review fixtures.** The presentation sections are strong, but the skill needs examples of review packets for synchronous stakeholder critique versus fresh-user concept feedback.

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
