# Coverage Gaps

Use this file for malleable-software candidates that are promising but not yet grounded enough to become reusable rules.

## Candidate gaps

- **Product exemplars:** Add accepted examples of exposed structure, user-made tools, jigs, or branch/review/merge UX only after reviewing real products or project artifacts.
- **Interop constraints:** The skill needs more concrete patterns for permissions, schema boundaries, data portability, and shared ownership before it can prescribe implementation.
- **AI-modifies-product surfaces:** Route AI interaction details to `ai-experience-design`; promote malleability rules here only when the user can inspect, branch, revert, or share the change.
- **Education/on-ramp examples:** "Design for the 40th hour" needs examples of tutorials, templates, and progressive disclosure that teach primitives instead of hiding them.
- **Deterministic checks:** Possible future checks include presence of undo/version history/export/import/extension points, but only after the product surface is concrete.

## Candidate promotion form

```markdown
Candidate:
Owning section:
Source or accepted product example:
User capability:
Rule:
Failure mode:
Exception:
Status: proposed | accepted | rejected
```
