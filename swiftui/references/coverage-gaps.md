# Coverage Gaps

Use this file to preserve SwiftUI/API uncertainty instead of overfitting the router.

## Candidate gaps

- **API freshness by deployment target:** Animation, widgets, SF Symbols, concurrency, Observation, and layout APIs need SDK-target checks before naming an API in final guidance. The check is now cheap — fetch the symbol page with `.md` appended and read the `availability` block in its leading comment (see the router body, or `apple-design` (hig) for the full playbook).
- **Apple's Xcode skills not yet audited:** Xcode 27+ bundles first-party `swiftui-specialist` (data flow, environment, ForEach, structure, localization, soft-deprecated APIs), `swiftui-whats-new-27` (`@State` macro, reorderable, swipe actions, toolbars, content builder) and `building-document-based-swiftui-applications`. Export with `xcrun agent skills export` or read the mirror https://github.com/mariusfanu/xcode-skills (Xcode 27.2). Diff them against `swiftui-identity`, `swiftui-layout` and `swiftui-lazy-stacks` and fold deltas in this library's own words; known delta from the mirror's changelog: lazy `@State` initialization requires a private getter (Xcode 27.2).
- **Missing source maps:** `swiftui-identity.md` and `widget-design.md` cite a single session inline but have no same-named `sources.md`; add one if they become rule-promoting references. (`swiftui-lazy-stacks.md` and `swift-concurrency.md` now cite named 2026 sources inline — see `sources.md`.)
- **Performance fixtures:** Scroll/lazy-stack and animation guidance would benefit from small reproducible fixtures that show the failure and the fix.
- **Concurrency migration examples:** The skill needs accepted examples for Sendable/actor isolation fixes that avoid both over-annotating and papering over warnings.
- **Widget-design staleness:** `widget-design.md` is built on the 2020 (iOS 14) foundation; interactive widgets, Lock Screen/StandBy/CarPlay variants, and rendering modes exist only as ⚠️ staleness-note corrections. A content refresh needs current WidgetKit docs/HIG as source material before rewriting the body — both are now fetchable as Markdown (`https://developer.apple.com/documentation/widgetkit.md`; HIG `widgets` slug), so this gap is unblocked and waiting on the rewrite, not on access.
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
