# Coverage Gaps

Use this file for design-system standards that are plausible but not yet supported strongly enough to become reusable guidance.

## Candidate gaps

- **Agent context pack exemplars:** Need accepted examples of a token/component/recipe pack that actually improved generated UI without dumping the whole design system.
- **Deterministic DS checks:** Candidate lint rules include off-token colors, unapproved radii, one-off shadows, missing focus states, unsupported component props, and undocumented variants. Add only when a repo exposes stable token/component metadata.
- **Product judgment boundary:** The DS can expose allowed substrate; it should not decide product-specific UX, copy, onboarding, or AI behavior unless those rules live in the owning skill.
- **AI-legible naming evidence:** Add examples where renaming tokens/props helped or hurt agent output before promoting naming rules beyond the existing source-backed guidance.
- **Governance fixtures:** Contribution, deprecation, and adoption dashboards need concrete templates if this skill starts generating DS governance artifacts repeatedly.

## Candidate promotion form

```markdown
Candidate:
Owning section/reference:
Source or accepted DS example:
Mechanical check possible:
Rule:
Exception:
Status: proposed | accepted | rejected
```
