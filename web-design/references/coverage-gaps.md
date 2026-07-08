# Coverage Gaps

Use this file for web-design claims that need current docs, project evidence, or deterministic checks before becoming reusable rules.

## Candidate gaps

- **Browser/API drift:** Core Web Vitals thresholds, CSS features, browser support, Tailwind syntax, media-query behavior, View Transitions and Speculation Rules coverage, and audio autoplay policies need current verification before exact advice.
- **A11y test fixtures:** Add examples only when they include keyboard path, focus order, labels, screen-reader expectations, and contrast evidence.
- **Motion checks:** Motion values are judgment-heavy; mechanical checks should focus on reduced-motion support, duration outliers, and main-thread performance.
- **Forms across product types:** Destructive-action and settings-copy patterns should route through `ux-writing` when wording is the hard part.
- **Social safe zones:** Platform chrome changes quickly; verify current safe areas before production video guidance.
- **Parked — morphing icons (Salaja):** the full morphing-icon recipe was not folded; its load-bearing principle (unique `view-transition-name` lifecycle, clear-source/assign-target inside `startViewTransition`) lives in `web-animation-design.md`. Promote the full recipe only if icon-morphing work recurs with project evidence.
- **Web sound (2026-06 gap — filled):** `web-sound.md` now carries the web implementation layer; synthesis parameter values (filter Hz, Q, durations) are single-sourced from Salaja and would benefit from a project fixture before being treated as hard numbers.

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
