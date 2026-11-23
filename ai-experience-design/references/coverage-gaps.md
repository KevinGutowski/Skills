# AI Experience Design Coverage Gaps

Use this file to park AI-product and agent-surface patterns that are promising but not yet stable enough to become rules.

## Candidate Gaps

- **Agent workbench exemplars.** The Linear workbench model is strong, but this skill needs more before/after examples of AI suggestions landing inside existing product UI rather than in a blank chat.
- **Autonomy-level examples.** The autonomy ladder needs concrete examples for Level 1, Level 2, and Level 3 behavior, including visibility, reversibility, opt-in scope, and escalation points.
- **AI waiting-state rubrics.** The skill has clear warnings against vanity status lines and duplicate spinners, but needs examples and checks for progress messages, focus management, and when to show model thinking.
- **Agent-turn surface mechanics are single-source.** The status-line, tool-call folding, composer, and context-ring rules in patterns.md come from one component library (Solid Glass, `6e8903e`). Its thresholds (show elapsed time from 1s, 70% and 90% context warnings, 4 to 5.2s figure holds) have no usage evidence, and the glyph-plus-shimmer status line has not been checked against the "no twin spinners" rule in a real product. Corroborate against a second agent product before promoting any of it into SKILL.md.
- **Memory and personalization consent.** The relational-AI section has principles, but agent memory, historical data reuse, and "old data for new reasoning" need product-specific examples before stable rules are promoted.
- **Agent identity and accountability.** Linear's delegation model is referenced, but the skill needs examples for assigning, mentioning, delegating to, and auditing agents without confusing human accountability.

## Promotion Form

```markdown
pattern/{stable-id}
Status: proposed | accepted | rejected
AI surface:
User job:
Autonomy level:
Decision:
Visibility:
Reversibility:
Consent / data scope:
Source:
Bad example:
Good example:
Approver:
```
