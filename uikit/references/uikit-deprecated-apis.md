# Deprecated and Outdated UIKit APIs

*Scope: Lookup table of deprecated or outdated UIKit APIs and what to write instead, with the iOS version that deprecated each (per SDK headers), grouped by area, plus how to modernize without breaking working code. Search for an API name when you meet it in existing code or are about to write it. Triggers: deprecation warning, traitCollectionDidChange, UIScreen.main, keyWindow, UIWindow(frame:), app delegate lifecycle, textLabel, canOpenURL, UIMenuController, contentEdgeInsets, UIGraphicsBeginImageContext, listPlainCell, barButton .done, @available, API_AVAILABLE.*

*Source: Fernando Olivares, uikit-skill (MIT), uikit-specialist and uikit-specialist-objc deprecated-API references, the "Changed or deprecated APIs" table in uikit-specialist-slim, and uikit-whats-new-27 deprecation notes, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- How to modernize safely
- App, scenes and windows
- Traits
- Lists and cells
- Bars and navigation
- Text
- Controls, drawing, timing
- Accessibility
- Patterns to replace
- Relationship to other skills

## How to modernize safely

- Do not migrate working code unless it is the bug or the task. Fix a deprecated call when you touch that code; never mass-migrate unasked.
- Guard newer APIs: Swift `if #available(iOS 26, *) { ... } else { ... }`; Objective-C `if (@available(iOS 26.0, *))`. `@available(iOS 26, *)` / `API_AVAILABLE(ios(26.0))` on a declaration is the declaration side and does not branch at runtime.
- Before naming an API, check the SDK header or the doc page (append `.md` to the developer.apple.com URL) for its availability block. "To be deprecated" in a header means marked for future deprecation without a version.
- Objective-C: headers use `API_DEPRECATED` / `API_DEPRECATED_WITH_REPLACEMENT`; the warning names the replacement. Mark your own deprecations the same way, not with a comment. Use `respondsToSelector:` only for unannotated cases. Import as modules (`@import UIKit;`); a missing symbol after adding a framework usually means `CLANG_ENABLE_MODULES` is off.
- Done means: builds with no new deprecation warnings.

Rows read: don't write -> write (deprecated in). ObjC selectors follow the usual mapping (for example `+[UIScreen mainScreen]`, `-initWithWindowScene:`, `UIBarButtonItemStyleProminent`).

## App, scenes and windows

| Don't write | Write | Deprecated |
|---|---|---|
| `UIApplicationDelegate` lifecycle (`applicationDidBecomeActive` etc.) | matching `UISceneDelegate` / `UIWindowSceneDelegate` methods; iOS 27 SDK builds fail to launch without scene lifecycle | iOS 26 |
| `application(_:open:options:)`, user activity / shortcut delegate methods, launch option keys | `scene(_:openURLContexts:)`, `scene(_:continue:)`, `windowScene(_:performActionFor:completionHandler:)`, connection options | iOS 26 |
| `UIWindow()`, `UIWindow(frame:)` | `UIWindow(windowScene:)` | iOS 26 |
| `UIScreen.main` | `view.window?.windowScene?.screen`, `traitCollection.displayScale`, container size (wrong on mirrored/resized iPhone apps in iOS 27) | iOS 26 |
| `UIWindowScene.interfaceOrientation`, `coordinateSpace` | `windowScene.effectiveGeometry` | iOS 26 |
| `UIApplication.shared.windows` | `view.window`, `windowScene.windows` | iOS 15 |
| `UIApplication.shared.keyWindow` | `windowScene.keyWindow`, `view.window` | iOS 13 |
| `statusBarOrientation`, `statusBarFrame` and other `UIApplication` status bar accessors | `effectiveGeometry`, `windowScene.statusBarManager`, size classes (may return NaN under the iOS 27 SDK) | iOS 13 |
| `UIApplication.canOpenURL(_:)` | `open(_:)` and handle the `false` result; universal links, `.universalLinksOnly` for "is the app installed" | iOS 27 |
| `UIMenuNewScene` | `UIMenuNewItem` | iOS 26 |
| `UIRequiresFullScreen` to dodge layout work | support resizing; see [uikit-ios27-sdk.md](uikit-ios27-sdk.md) | - |
| No launch screen | `UILaunchScreen` key or launch storyboard (App Store rejects iOS 27 SDK builds without) | required, iOS 27 SDK |

## Traits

| Don't write | Write | Deprecated |
|---|---|---|
| `traitCollectionDidChange(_:)` | `registerForTraitChanges([UITraitPreferredContentSizeCategory.self]) { (self: Self, previous: UITraitCollection) in ... }` (closure gets `self`, no `[weak self]`), or read traits in tracked update methods | iOS 17 |
| Caching a trait in a property | read it in `layoutSubviews()`, `updateConstraints()`, `draw(_:)`, `viewWillLayoutSubviews()`, `updateConfiguration(using:)`, `configurationUpdateHandler` or a section provider; UIKit reruns them on change (iOS 18) | outdated |
| `overrideTraitCollection`, `setOverrideTraitCollection(_:forChild:)` | `traitOverrides` | iOS 17 |
| `UITraitCollection(traitsFrom:)` | `UITraitCollection(mutations:)`, `modifyingTraits(_:)` | iOS 17 |

## Lists and cells

| Don't write | Write | Deprecated |
|---|---|---|
| `UITableViewCell.textLabel`, `detailTextLabel`, `imageView` | `defaultContentConfiguration()`, assign to `contentConfiguration` | iOS 27 SDK |
| `UIBackgroundConfiguration.listPlainCell()`, `listGroupedCell()`, `listSidebarCell()` | `listCell()` | iOS 18 |
| `listPlainHeaderFooter()`, `listGroupedHeaderFooter()`, `listSidebarHeader()` | `listHeader()`, `listFooter()` | iOS 18 |
| `UIListContentConfiguration.sidebarCell()`, `sidebarSubtitleCell()` | `cell()`, `subtitleCell()` | iOS 18 |
| `plainHeader()`, `groupedHeader()`, `sidebarHeader()`, `plainFooter()`, `groupedFooter()` | `header()`, `footer()` | iOS 18 |
| `NSCollectionLayoutGroup.horizontal(layoutSize:subitem:count:)` (and vertical) | `horizontal(layoutSize:repeatingSubitem:count:)` | iOS 16 |
| `contextMenuConfigurationForItemAt:point:`; ObjC `shouldShowMenuForItemAtIndexPath:` / `canPerformAction:` | `contextMenuConfigurationForItemsAt:point:` | iOS 16 |
| String reuse identifiers, `register(_:forCellWithReuseIdentifier:)` | `UICollectionView.CellRegistration` | outdated |
| Index-path data sources with `performBatchUpdates` | diffable data sources | outdated |
| `UICollectionViewFlowLayout` subclasses for complex layouts | compositional layout | outdated |
| Hand-measuring items to equalize heights in a row | `NSCollectionLayoutDimension.uniformAcrossSiblings(estimate:)` (tallest item sets the group height) | since iOS 17 |
| `UIActivityIndicatorView` as empty/loading screen | `contentUnavailableConfiguration` (`.loading()`, `.empty()`, `.search()`) set in `updateContentUnavailableConfiguration(using:)` | outdated |

## Bars and navigation

| Don't write | Write | Deprecated |
|---|---|---|
| `UIBarButtonItem.Style.done` | `.prominent` | iOS 26 |
| `doneButtonAppearance` | `prominentButtonAppearance` | iOS 26 |
| `UINavigationItem.SearchBarPlacement.inline` | `.integrated` | iOS 26 |
| `barMinimizeBehavior`, `barMinimizationSafeAreaAdjustment` (beta names) | `navigationItem.navigationBarMinimization` | iOS 27 |
| `UITabBarController.viewControllers` to declare tabs | `tabs` with `UITab` | since iOS 18 |
| `barTintColor` / background images at runtime; opaque backgrounds behind bars | `UINavigationBarAppearance` on the item; on iOS 26 leave bars transparent for Liquid Glass | outdated |
| Hand-built zoom transition | `preferredTransition = .zoom(sourceViewProvider:)`, returning the current (reused) cell | since iOS 18 |
| `viewDidLoad` for first scroll or bounds | `viewIsAppearing(_:)` | outdated |

## Text

| Don't write | Write | Deprecated |
|---|---|---|
| `textView(_:shouldInteractWith:in:interaction:)` (URL, attachment) | `textView(_:primaryActionFor:defaultAction:)`, `textView(_:menuConfigurationFor:defaultMenu:)` | iOS 17 |
| `textView(_:editMenuForTextIn:suggestedActions:)` only | also `textView(_:editMenuForTextInRanges:suggestedActions:)` for multi-range selection | iOS 26 |
| `UIMenuController` | `UIEditMenuInteraction` or the text view edit-menu delegate | iOS 16 |
| Reading `UITextView.layoutManager` on TextKit 2 | `textLayoutManager` (touching `layoutManager` falls back to TextKit 1) | outdated |
| Keyboard notifications plus frame math | `view.keyboardLayoutGuide` | outdated |

## Controls, drawing, timing

| Don't write | Write | Deprecated |
|---|---|---|
| `contentEdgeInsets`, `titleEdgeInsets`, `imageEdgeInsets` | `UIButton.Configuration` | iOS 15 |
| `UIGraphicsBeginImageContextWithOptions` and friends | `UIGraphicsImageRenderer` | iOS 17 |
| `UIPreviewInteraction`, 3D Touch peek and pop | `UIContextMenuInteraction` | outdated |
| `UIWebView` | `WKWebView` | removed |
| `CADisplayLink` for display-tied per-frame work | `UIUpdateLink` | since iOS 18 |
| `Timer` / `NSTimer` in default run loop mode for UI | `.common` mode, `Task.sleep(for:)`, or `UIUpdateLink` | outdated |

## Accessibility

| Don't write | Write | Deprecated |
|---|---|---|
| `UIAccessibility.buttonShapesEnabled` and its notification | `AXShowBordersEnabled` and its notification (Accessibility framework) | iOS 26.1 |

## Patterns to replace

Not deprecated, but the usual cause of bugs and slow screens:

- `reloadData()` per change -> snapshots plus `reconfigureItems`; model structs as diffable identifiers -> IDs (see [uikit-lists.md](uikit-lists.md)).
- Transform-flipped chat list -> natural order with anchor restore (see [uikit-live-lists.md](uikit-live-lists.md)).
- Nested collection views for horizontal rows -> orthogonal sections.
- `DispatchQueue.main.async` sprinkled through async code -> main-actor isolation; ObjC: hop once at the callback boundary.
- `performSelector:withObject:afterDelay:` -> a block; strong or `assign` object delegates -> `weak`; untyped collections and unannotated headers -> generics and nullability.
- `UIHostingConfiguration` or SwiftUI to fix a UIKit layout problem in a UIKit-only codebase -> a `UIContentConfiguration`.

## Relationship to other skills

- [uikit-ios27-sdk.md](uikit-ios27-sdk.md) holds the detail behind iOS 27 rows (scene lifecycle requirement, `canOpenURL`, resizable iPhone apps).
- [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md) covers Observation and timer rules; [uikit-text-and-interaction.md](uikit-text-and-interaction.md) the text and edit-menu replacements; [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md) traits and bars.
- `swiftui` owns the SwiftUI equivalents; `apple-design` (liquid-glass-design-system) owns iOS 26 bar styling intent.
