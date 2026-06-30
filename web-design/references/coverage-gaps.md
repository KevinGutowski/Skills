# Coverage Gaps

Use this file for web-design claims that need current docs, project evidence, or deterministic checks before becoming reusable rules.

## Candidate gaps

- **Browser/API drift:** Core Web Vitals thresholds, CSS features, browser support, Tailwind syntax, and media-query behavior need current verification before exact advice.
- **A11y test fixtures:** Add examples only when they include keyboard path, focus order, labels, screen-reader expectations, and contrast evidence.
- **Motion checks:** Motion values are judgment-heavy; mechanical checks should focus on reduced-motion support, duration outliers, and main-thread performance.
- **Forms across product types:** Destructive-action and settings-copy patterns should route through `ux-writing` when wording is the hard part.
- **Social safe zones:** Platform chrome changes quickly; verify current safe areas before production video guidance.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Browser/platform docs checked:
Project evidence or fixture:
Rule:
Mechanical check possible:
Exception:
Status: proposed | accepted | rejected
```
