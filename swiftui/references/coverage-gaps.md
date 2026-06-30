# Coverage Gaps

Use this file to preserve SwiftUI/API uncertainty instead of overfitting the router.

## Candidate gaps

- **API freshness by deployment target:** Animation, widgets, SF Symbols, concurrency, Observation, and layout APIs need SDK-target checks before naming an API in final guidance.
- **Missing source maps:** `swiftui-identity.md`, `swiftui-lazy-stacks.md`, `swift-concurrency.md`, and `widget-design.md` need same-named `sources.md` files if they become rule-promoting references.
- **Performance fixtures:** Scroll/lazy-stack and animation guidance would benefit from small reproducible fixtures that show the failure and the fix.
- **Concurrency migration examples:** The skill needs accepted examples for Sendable/actor isolation fixes that avoid both over-annotating and papering over warnings.
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
