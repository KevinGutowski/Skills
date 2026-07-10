# Coverage Gaps

Use this file to preserve SwiftUI/API uncertainty instead of overfitting the router.

## Candidate gaps

- **API freshness by deployment target:** Animation, widgets, SF Symbols, concurrency, Observation, and layout APIs need SDK-target checks before naming an API in final guidance.
- **Missing source maps:** `swiftui-identity.md` and `widget-design.md` cite a single session inline but have no same-named `sources.md`; add one if they become rule-promoting references. (`swiftui-lazy-stacks.md` and `swift-concurrency.md` now cite named 2026 sources inline — see `sources.md`.)
- **Performance fixtures:** Scroll/lazy-stack and animation guidance would benefit from small reproducible fixtures that show the failure and the fix.
- **Concurrency migration examples:** The skill needs accepted examples for Sendable/actor isolation fixes that avoid both over-annotating and papering over warnings.
- **Widget-design staleness:** `widget-design.md` is built on the 2020 (iOS 14) foundation; interactive widgets, Lock Screen/StandBy/CarPlay variants, and rendering modes exist only as ⚠️ staleness-note corrections. A content refresh needs current WidgetKit docs/HIG as source material before rewriting the body.
- **Widget interactivity examples:** Add concrete examples only after checking current WidgetKit docs and the target OS.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Apple/Swift source checked:
Deployment target:
Observed project failure or accepted review:
Rule:
Exception:
Status: proposed | accepted | rejected
```
