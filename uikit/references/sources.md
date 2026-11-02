# Sources

Provenance map for the `uikit` skill.

## Primary source

- **Fernando Olivares, uikit-skill** (MIT), https://github.com/notolivaresf/uikit-skill, read 2026-11-02 at `main`. Skills folded: `uikit-specialist` (15 Swift references) and `uikit-specialist-objc` (same topics, Objective-C), `uikit-whats-new-27` and `-objc` (iOS 27.0/27.1 SDK changes), `uikit-specialist-slim` (gotchas table), `uikit-list` (tag `v1.1.0-general1`) and `uikit-chat-list` (tag `v1.0.0`, the benchmark-measured version). Its README states API facts come from Apple's public documentation, WWDC sessions and the SDK headers; it contains no Apple skill text.
- **Evidence docs in the same repo (upstream docs/ folder):** uikit-chat-list-sources (rule-by-rule evidence keys and Apple citations), thinning-plan (transcript and code reading of 14 builds), v0.9-adversarial-review (hostile review of the tuned rules — its corrections are folded as caveats in `uikit-live-lists`), experiment-plan, general-list-skill. Benchmark repo cited there: https://github.com/notolivaresf/uikit-vs-swiftui.

## Apple first-party skill (cross-check)

- **Apple, `app-resizability` agent skill**, bundled with Xcode 27.1+ (read from the Xcode 27.2 27B52 export mirrored at https://github.com/mariusfanu/xcode-skills, revision `047c090`; export locally with `xcrun agent skills export`). SKILL.md plus its UIScreen, orientation, scene-lifecycle, safe-area and idiom task references. Summarized, not copied, in `uikit-ios27-sdk` (Resizing migration). Where it disagrees with the primary source (`UIRequiresFullScreen` on iOS 27), Apple wins. Apple technotes it cites: TN3208 (launch screen, `ITMS-90870`), TN3192 (`UIRequiresFullScreen`).

## Apple sources the primary source cites for the list recipe

- WWDC18 225 "A Tour of UICollectionView" — custom layouts, `prepare()` caching, batch updates.
- WWDC21 10252 "Make blazing fast lists and collection views" — `reconfigureItems`, registrations once, prefetching, image preparation.
- WWDC22 10068 "What's new in UIKit" — self-resizing cells, `selfSizingInvalidation`.
- Tech talk 10855 "Explore UI animation hitches and the render loop".
- iPhoneOS 26.4 SDK headers: `UITextView.h`, `UICollectionView.h`, `UICollectionViewLayout.h`, `UIDiffableDataSource.h`, `UITableView.h`, `UITraitCollection.h`, `UIViewController.h`, `UIContextMenuInteraction.h`.

## Where the routed references came from

| Reference | Source files |
|---|---|
| `uikit-lists` | specialist `collection-layout`, `diffable-data`, `cells` (+ objc); slim self-sizing and diffable sections |
| `uikit-live-lists` | `uikit-list` / `uikit-chat-list` SKILL.md; specialist `updates-and-scrolling`, `list-performance`; slim prepend/pinning; the three evidence docs |
| `uikit-layout-and-navigation` | specialist `layout`, `navigation-and-bars`, `traits-and-environment` (+ objc); slim trait/color rows |
| `uikit-text-and-interaction` | specialist `text`, `interactions`, `accessibility`, `animation` (+ objc); slim selectable-text section; list rules 1-2 |
| `uikit-dataflow-and-concurrency` | specialist `dataflow`, `concurrency` (+ objc); slim main-actor section and Observation rows |
| `uikit-deprecated-apis` | specialist `deprecated-apis` (+ objc); slim "changed or deprecated APIs" table |
| `uikit-ios27-sdk` | `uikit-whats-new-27` and `-objc`, all 10 references each |

## Corroboration inside this library

- Zoom transition, spring parameters (`UIView.animate(duration:bounce:)`): `swiftui` (swiftui-animation), WWDC-sourced.
- UIKit Dynamic Type font code, trait-change modernization: `apple-design` (apple-typography) code patterns.
- Accessibility settings APIs: `apple-design` (apple-visual-accessibility).
- Main-actor and sendability doctrine: `swiftui` (swift-concurrency).

## Promotion rule

Promote new UIKit rules only when tied to a current Apple source (docs `.md` availability block, WWDC session, SDK header), a verified project failure, or a repeated accepted review outcome. The measured list recipe is one author's benchmark of one task; keep its caveats attached.
