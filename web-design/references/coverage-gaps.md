# Coverage Gaps

Use this file for web-design claims that need current docs, project evidence, or deterministic checks before becoming reusable rules.

## Candidate gaps

- **Browser/API drift:** Core Web Vitals thresholds, CSS features, browser support, Tailwind syntax, and media-query behavior need current verification before exact advice.
- **Installed Apple web apps:** Re-test Safari point-release behavior for status-bar color sampling, safe-area timing, viewport units, fixed overlays, iPad window controls, icon candidate selection, cookie handoff, and startup-image caching. Joe Bell's device observations are valuable leads but not browser contracts; Safari 26's official SVG-icon support conflicts with the source's PNG-only wording.
- **Layout fixtures:** Add accepted examples for container-vs-viewport query selection, RTL mirroring, safe-area/virtual-keyboard behavior, pseudo-localization, and carousel alternatives. Keep numeric spacing/peek/translation heuristics advisory until project evidence or another source supports them.
- **A11y test fixtures:** Add examples only when they include keyboard path, focus order, labels, screen-reader expectations, and contrast evidence.
- **Motion checks:** Motion values are judgment-heavy; mechanical checks should focus on reduced-motion support, duration outliers, and main-thread performance.
- **Forms across product types:** Destructive-action and settings-copy patterns should route through `ux-writing` when wording is the hard part.
- **Motion kit drift:** The `motion` skill's best-practices file predates Motion 14.2 (2026-10), which accelerates the shorthand transforms. Two dated library notes were added to that file in 2026-11 rather than rewriting vendored text; replace them when Motion publishes an updated kit. The `will-change` difference with web-animation-design's animation-performance member is recorded there as two schools.
- **Gesture and mobile-feel fixtures:** web-animation-design's gestures member and `mobile-web-native-feel.md` rest on one practitioner's skills plus MDN. Thresholds (0.11 px/ms, 500 px/s, 10px slop, rubber-band 0.55) are that author's or Apple's sample values, not standards; add a fixture only with a real-device recording.
- **React Native motion:** no cluster owns it. Emil Kowalski's `animate-expo` skill was screened and parked (see `docs/emilkowalski-skills-source-mining-2026-11.md`); revisit if React Native work becomes recurring.
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
