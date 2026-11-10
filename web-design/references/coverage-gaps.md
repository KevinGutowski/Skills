# Coverage Gaps

Use this file for web-design claims that need current docs, project evidence, or deterministic checks before becoming reusable rules.

## Candidate gaps

- **Browser/API drift:** Core Web Vitals thresholds, CSS features, browser support, Tailwind syntax, and media-query behavior need current verification before exact advice.
- **Installed Apple web apps:** Re-test Safari point-release behavior for status-bar color sampling, safe-area timing, viewport units, fixed overlays, iPad window controls, icon candidate selection, cookie handoff, and startup-image caching. Joe Bell's device observations are valuable leads but not browser contracts; Safari 26's official SVG-icon support conflicts with the source's PNG-only wording.
- **Layout fixtures:** Add accepted examples for container-vs-viewport query selection, RTL mirroring, safe-area/virtual-keyboard behavior, pseudo-localization, and carousel alternatives. Keep numeric spacing/peek/translation heuristics advisory until project evidence or another source supports them.
- **A11y test fixtures:** Add examples only when they include keyboard path, focus order, labels, screen-reader expectations, and contrast evidence.
- **Motion checks:** Motion values are judgment-heavy; mechanical checks should focus on reduced-motion support, duration outliers, and main-thread performance.
- **Mobile browser behavior:** `mobile-browser-behavior.md` mixes documented platform mechanics with device observations from one source (sticky hover cases, residual tap delay, focus-zoom threshold, keyboard behavior per browser). None were re-tested on hardware at intake. Re-test on a current iPhone and a mid-range Android phone before treating a row as a browser contract, and re-check `interactive-widget` and `theme-color` support when Safari ships a new major version.
- **Vendor `motion` tier data:** the imported `motion` skill (performance-audit capability, property tiers) still says Motion's independent transform shorthands cannot be hardware accelerated. Motion's changelog lists that as added in 14.2.0 (2026-10-13). The vendor files were not edited; re-sync the kit and drop this entry once it reflects 14.2.
- **Choreography and gesture numbers:** stagger steps, the `delta / 500` duration clamp, the 40–50% and 500 px/s dismiss thresholds, and the idle-loop timings are one author's working values. The 0.55 rubber-band constant is a community measurement of iOS, not an Apple figure. Keep them as starting points until a project recording confirms them.
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
