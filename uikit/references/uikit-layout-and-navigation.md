# UIKit Layout, App Structure and Traits

*Scope: Implementation rules for UIKit layout (Auto Layout, guides, layout regions, keyboard, size classes and resizable windows, view controller lifecycle), app structure (navigation items and bar appearance, search, `UITab` tab bars and sidebars, split views, sheets, zoom transition, scenes and windows) and the trait system (reading, registering, overriding, custom traits, colors, Liquid Glass materials, display scale). Use when building or reviewing UIKit screens and containers on iOS 17/18/26. Triggers: Auto Layout, constraints, safeAreaLayoutGuide, keyboardLayoutGuide, size class, viewIsAppearing, UINavigationBarAppearance, UISearchController, UITab, UITabBarController sidebar, UISplitViewController, sheetPresentationController, detents, zoom transition, UIWindowScene, registerForTraitChanges, traitOverrides, UITraitDefinition, CGColor dark mode, UIGlassEffect, UIScreen.main.*

*Source: Fernando Olivares, uikit-skill (MIT), uikit-specialist and uikit-specialist-objc layout, navigation-and-bars and traits-and-environment references, plus the changed-APIs table and Dynamic Type section of uikit-specialist-slim, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- Auto Layout hygiene
- Guides, layout regions and corners
- Keyboard
- Size classes and resizable windows
- View controller lifecycle and custom views
- Navigation items and bars
- Search
- Tab bars and sidebars
- Split views, sheets and the zoom transition
- Scenes and windows
- Traits: reading, tracking, registering, overriding
- Custom traits
- Colors, Liquid Glass and display scale
- Objective-C notes
- Review checklist
- Relationship to other skills

## Auto Layout hygiene

- `translatesAutoresizingMaskIntoConstraints = false` on every view you constrain in code; never on a view whose frame UIKit manages (a cell's `contentView`, a controller's root `view`, cells themselves).
- Activate in batches with `NSLayoutConstraint.activate([...])`. Keep references only to constraints you will change; change `constant` or `isActive`, never remove and recreate.
- Never rebuild constraints in `layoutSubviews()`. Build once, then adjust constants when the input changes.
- Every view needs an unambiguous set (x, width, y, height) from constraints or intrinsic size. Debug with `hasAmbiguousLayout` / `exerciseAmbiguityInLayout()`. Fix every "Unable to simultaneously satisfy constraints" log: set `identifier` on constraints so the log names them; symbolic breakpoint on `UIViewAlertForUnsatisfiableConstraints`.
- Priorities say what gives way: lower compression resistance on the label that may truncate, higher hugging on the one that should fit. Use 999 for a constraint that must yield briefly during transitions (a height while a cell resizes).
- Leading/trailing, not left/right; `directionalLayoutMargins` and `NSDirectionalEdgeInsets` so RTL mirrors.
- `UIStackView` for rows/columns; collapse an arranged subview with `isHidden`, do not remove and re-add. `UILayoutGuide` instead of empty spacer views.
- Do not mix frame layout and constraints on one view. Manual `layoutSubviews` calls `super`, uses `bounds` and margins, and is idempotent.

## Guides, layout regions and corners

| Guide | Use for |
|---|---|
| `safeAreaLayoutGuide` | avoiding sensor housing, home indicator, bars |
| `layoutMarginsGuide` | aligning with system margins |
| `readableContentGuide` | text in wide windows |
| `keyboardLayoutGuide` | anything that sits above the keyboard |
| layout regions (iOS 26+) | avoiding window controls or a container's rounded corners |

- Scroll and collection views usually fill the whole `view` (not the safe area) and let `contentInsetAdjustmentBehavior` (`.automatic`) convert the safe area into content inset so content scrolls under bars. Read the real inset from `adjustedContentInset`; add space with `additionalSafeAreaInsets` (controller) or `contentInset` (scroll view).
- Layout regions (iOS 26): `UIView.layoutGuide(for:)`, `edgeInsets(for:)`, `directionalEdgeInsets(for:)` take a `UIView.LayoutRegion` (safe area, margins or readable content, optionally corner-adapted). Use a region guide instead of hand-made insets when content collides with iPad window controls in a corner.
- Concentric corners (iOS 26): `cornerConfiguration` with `UICornerConfiguration` (`.corners(radius:)`, `.uniformCorners(radius:)`, `.capsule()`, per-corner forms) and `UICornerRadius` fixed or container-concentric, so nested shapes stay parallel to the window or container. `effectiveRadius(corner:)` read inside `layoutSubviews()` or `updateProperties()` is tracked.

```swift
card.cornerConfiguration = .corners(radius: .containerConcentric(minimum: 12))
```

## Keyboard

Use `view.keyboardLayoutGuide` (iOS 15+). Do not observe keyboard notifications, convert end frames and animate a bottom constant.

```swift
NSLayoutConstraint.activate([
    inputBar.bottomAnchor.constraint(equalTo: view.keyboardLayoutGuide.topAnchor),
    collectionView.topAnchor.constraint(equalTo: view.topAnchor),
    collectionView.bottomAnchor.constraint(equalTo: inputBar.topAnchor),
    // plus leading/trailing to view for both
])
```

- With the keyboard hidden the guide's top is the bottom of the safe area, so the bar stays above the home indicator. `usesBottomSafeArea = false` to handle that inset yourself.
- iPad: `followsUndockedKeyboard = true` follows a floating or split keyboard.
- The guide animates with the keyboard. To keep a chat pinned, decide "pinned" before the change and re-scroll when the collection view's height changes (see [uikit-live-lists.md](uikit-live-lists.md)).
- `keyboardDismissMode = .interactive` drags the keyboard with the list. For a field in a scrolling form, `scrollRectToVisible(_:animated:)` after layout. Never hard-code keyboard heights.

## Size classes and resizable windows

Rotation and window resizing are one event: the container size changed.

- Design for `horizontalSizeClass` / `verticalSizeClass`, not the device: iPhone landscape and a narrow iPad window are both compact width.
- Derive layout from the view's bounds or the compositional layout's `environment.container.effectiveContentSize` (the section provider reruns on resize), never from the screen. Never branch on `userInterfaceIdiom` or interface orientation. iPhone apps can now be shown resized: see [uikit-ios27-sdk.md](uikit-ios27-sdk.md).
- Respond in `viewWillTransition(to:with:)`; do size-dependent work inside the coordinator's `animate(alongsideTransition:completion:)`.
- Do not lock orientation to dodge layout work. If one screen must, override `supportedInterfaceOrientations` there and call `setNeedsUpdateOfSupportedInterfaceOrientations()`.

## View controller lifecycle and custom views

| Method | Do here |
|---|---|
| `loadView` | only to replace the root view with a custom class |
| `viewDidLoad` | build hierarchy and constraints once; bounds are not final |
| `viewIsAppearing(_:)` | work needing correct traits and size: first scroll position, trait-based styling |
| `viewWillLayoutSubviews` / `viewDidLayoutSubviews` | cheap, idempotent tweaks; run many times |
| `updateProperties()` (iOS 26) | set view properties from model state; see [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md) |
| `viewDidDisappear(_:)` | stop timers and visible-only work |

- `viewIsAppearing(_:)` runs once the view is in the hierarchy with traits and size, before the appearance transition draws; back-deploys to iOS 13 with current Xcode. Prefer it over `viewWillAppear(_:)` and over `viewDidLoad` for anything bounds-dependent.
- Compose from child controllers: `addChild`, add view, `didMove(toParent:)`; remove with `willMove(toParent: nil)`, remove view, `removeFromParent()`.
- Custom views: override `intrinsicContentSize` and call `invalidateIntrinsicContentSize()` on change. Many-input constraint changes go in `updateConstraints()` (call `super` last), requested via `setNeedsUpdateConstraints()`. `layoutSubviews()` must not change its own size or the superview's layout (loops); launch argument `-UIViewLayoutFeedbackLoopDebuggingThreshold 100` reports loops. Keep `sizeThatFits(_:)` consistent with constraints.

## Navigation items and bars

Configure bars through each screen's `navigationItem`, never by styling the bar view at runtime (`navigationBar.barTintColor`, `setBackgroundImage`).

- Items: `title`, `largeTitleDisplayMode`, `left/rightBarButtonItems`, `searchController`, `backAction`, and `standardAppearance` / `scrollEdgeAppearance` / `compactAppearance` built from `UINavigationBarAppearance` (`configureWithDefaultBackground()` etc.).
- `navigationItem.style` (`.navigator`, `.browser`, `.editor`, iOS 16) gives document bars with a title menu; `titleMenuProvider` and `documentProperties` add rename/share.
- iOS 26: `subtitle`, `largeSubtitle` / `largeSubtitleView` replace a two-label custom title view. `UIBarButtonItem.badge` shows a count or dot.
- Bar button style `.prominent` (iOS 26) marks the primary action; `.done` is deprecated in the iOS 26 SDK. Build items with `UIBarButtonItem(systemItem:primaryAction:menu:)` / `(title:image:primaryAction:menu:)`; image-only items need an accessibility label.
- Group with `UIBarButtonItemGroup`; space with `.fixedSpace(_:)` / `.flexibleSpace()`.
- iOS 26 bars, toolbars and tab bars use Liquid Glass automatically. No opaque backgrounds behind bars, no content views faking a bar; use standard items so the system groups them into shared glass. Opt one out with `hidesSharedBackground = true`.

## Search

- `navigationItem.searchController = UISearchController(searchResultsController:)`, `searchResultsUpdater`, `hidesSearchBarWhenScrolling`.
- `preferredSearchBarPlacement`: `.stacked`, or iOS 26 `.integrated`, `.integratedButton`, `.integratedCentered`. `.inline` is deprecated in iOS 26 for `.integrated`.
- In a tab bar controller, `UISearchTab` (iOS 18) gives search its own tab; on iOS 26 it can render as a separate search button.
- Debounce: cancel the previous search task when a new query arrives.

## Tab bars and sidebars

iOS 18+: declare `tabBarController.tabs` with `UITab` objects, not `viewControllers`.

```swift
tabBarController.tabs = [
    UITab(title: String(localized: "Inbox"), image: UIImage(systemName: "tray"), identifier: "inbox") { _ in
        UINavigationController(rootViewController: InboxViewController())
    },
    UISearchTab { _ in UINavigationController(rootViewController: SearchViewController()) },
]
tabBarController.mode = .tabSidebar
```

- The provider runs lazily on first selection. Identifiers must be stable strings (state restoration, customization).
- `UITabGroup` groups tabs in the sidebar; `allowsUserCustomization` + `customizationIdentifier` enable rearranging. `mode = .tabSidebar` lets the iPad tab bar become a sidebar; `tabBarController.sidebar` sets header, footer, `isHidden`.
- iOS 26: `tabBarMinimizeBehavior` (`.automatic`, `.never`, `.onScrollDown`, `.onScrollUp`); `bottomAccessory` (`UITabAccessory`) for a persistent view above the tab bar such as a mini player.
- iOS 27 additions (`prominentTabIdentifier`, sidebars on iPhone): [uikit-ios27-sdk.md](uikit-ios27-sdk.md).

## Split views, sheets and the zoom transition

- Split: `UISplitViewController(style: .doubleColumn | .tripleColumn)`, `setViewController(_:for:)` per column plus a `.compact` column for collapsed iPhone. `preferredDisplayMode` / `preferredSplitBehavior` are starting points; let the system adapt. iOS 26 adds an `.inspector` column. Compact width collapses to a navigation stack; do not reimplement that with size-class checks.
- Sheets: `sheetPresentationController.detents` (`.medium()`, `.large()`, `.custom { context in ... }`), `prefersGrabberVisible`, `largestUndimmedDetentIdentifier`, `prefersScrollingExpandsWhenScrolledToEdge`. Animate detent changes inside `sheet.animateChanges { }`.
- Popover on iPad, sheet on iPhone: `.popover` style, `popoverPresentationController.sourceItem` (iOS 16), configure `adaptiveSheetPresentationController`.
- Present from the on-screen controller; pass a presenter in rather than walking `view.window?.rootViewController`. `isModalInPresentation = true` blocks swipe-dismiss with unsaved changes; ask in `presentationControllerDidAttemptToDismiss(_:)`.
- Zoom (iOS 18): `preferredTransition = .zoom { context in ... }` for push or modal. The provider runs on push and on pop: resolve the source cell from current state by stable id each time (cells are reused, the detail may have paged to another item) and return `nil` when off screen. Full pattern in `swiftui` (`swiftui-animation`).

## Scenes and windows

- Create windows in `scene(_:willConnectTo:options:)` with `UIWindow(windowScene:)`; `UIWindow()` and `UIWindow(frame:)` are deprecated in the iOS 26 SDK. Scene lifecycle becomes required with iOS 27: [uikit-ios27-sdk.md](uikit-ios27-sdk.md).
- App-state work in scene callbacks (`sceneDidBecomeActive`, `sceneWillResignActive`, `sceneDidEnterBackground`, `sceneWillEnterForeground`); the `UIApplicationDelegate` equivalents are deprecated in the iOS 26 SDK. URLs and activities via `scene(_:openURLContexts:)`, `scene(_:continue:)`, and the connection options on first connect.
- State restoration: return `NSUserActivity` from `stateRestorationActivity(for:)`, restore from `session.stateRestorationActivity` on connect.
- Geometry: `windowScene.effectiveGeometry` and `windowScene(_:didUpdateEffectiveGeometry:)`; scene `interfaceOrientation` and `coordinateSpace` are deprecated in iOS 26.
- New windows: `UIApplication.shared.activateSceneSession(for:errorHandler:)` with `UISceneSessionActivationRequest` (iOS 17).
- Never `UIApplication.shared.windows`, `keyWindow` or `UIScreen.main`: use `view.window?.windowScene`. Several windows of one scene type can be live at once.

## Traits: reading, tracking, registering, overriding

- Read `traitCollection` when needed, inside an update method. Never cache trait values in stored properties. `UITraitCollection.current` is set in tracked methods and in `performAsCurrent(_:)`.
- iOS 18 automatic tracking: traits read in these methods rerun them on change, so most code needs no registration:
  - `UIView`: `layoutSubviews()`, `updateConstraints()`, `draw(_:)`, `updateProperties()` (iOS 26)
  - `UIViewController`: `viewWillLayoutSubviews()`, `viewDidLayoutSubviews()`, `updateViewConstraints()`, `updateContentUnavailableConfiguration(using:)`, `updateProperties()` (iOS 26)
  - `updateConfiguration(using:)`, `configurationUpdateHandler`, compositional section providers
- Elsewhere register (iOS 17); `traitCollectionDidChange(_:)` is deprecated:

```swift
registerForTraitChanges([UITraitPreferredContentSizeCategory.self]) { (self: Self, previous: UITraitCollection) in
    self.rebuildAttributedText()   // self is passed in: no [weak self]
}
```

- Fires only for the listed traits; sets `UITraitCollection.systemTraitsAffectingColorAppearance` / `systemTraitsAffectingImageLookup` exist. The registration lives as long as the object; keep the token only for `unregisterForTraitChanges(_:)`. Target-action forms: `registerForTraitChanges(_:target:action:)`, `(_:action:)`.
- Attributed strings do not always update for Dynamic Type: rebuild them in a `UITraitPreferredContentSizeCategory` registration. Use `UIFont.preferredFont(forTextStyle:)` or `UIFontMetrics.scaledFont(for:)` with `adjustsFontForContentSizeCategory = true`; at `isAccessibilityCategory` sizes switch horizontal rows to vertical stacks.
- Overrides: `traitOverrides` (iOS 17) on a view, controller, presentation controller or window scene, e.g. `reader.traitOverrides.userInterfaceStyle = .dark`. Replaces deprecated `overrideTraitCollection` / `setOverrideTraitCollection(_:forChild:)`. `traitOverrides.remove(_:)`, `contains(_:)`. Override the smallest subtree that needs it.

## Custom traits

Pass app-wide values down the hierarchy as a trait instead of initializer threading or globals.

```swift
struct ListDensityTrait: UITraitDefinition {
    static let defaultValue = ListDensity.regular
    static let affectsColorAppearance = false
}
extension UITraitCollection { var listDensity: ListDensity { self[ListDensityTrait.self] } }
extension UIMutableTraits {
    var listDensity: ListDensity {
        get { self[ListDensityTrait.self] }
        set { self[ListDensityTrait.self] = newValue }
    }
}
windowScene.traitOverrides.listDensity = .compact     // set high; read low in a tracked method
```

- Small, `Equatable` value types (changes are compared to decide reruns). `affectsColorAppearance = true` only if it changes color resolution; it costs work on every change.
- Typed shortcuts: `UICGFloatTraitDefinition`, `UINSIntegerTraitDefinition`; `UIObjectTraitDefinition` for reference values, sparingly.

## Colors, Liquid Glass and display scale

- Semantic colors (`.label`, `.secondaryLabel`, `.systemBackground`, `.separator`, `.tintColor`) or asset colors with dark and increased-contrast variants. In code: `UIColor { traits in ... }`.
- `CGColor` does not follow dark mode. Setting `layer.borderColor` / `shadowColor` in `awakeFromNib` or init freezes the light value; set `color.resolvedColor(with: traitCollection).cgColor` inside a tracked method such as `layoutSubviews()`.
- `tintColor` inherits; set it on the window or a container. `tintColorDidChange()` fires on change, including when a sheet dims the view.
- Prefer configurations, tint and custom traits over `UIAppearance` proxies (applied at insertion time, hard to trace).
- Liquid Glass (iOS 26 SDK): standard bars, tab bars, toolbars, sheets, menus and controls adopt it automatically; remove custom backgrounds that hide it. Custom surfaces: `UIVisualEffectView` with `UIGlassEffect` (`isInteractive`, `tintColor`); group several in a `UIGlassContainerEffect` view so they merge by `spacing`. Buttons: `UIButton.Configuration.glass()`, `.prominentGlass()`, `.clearGlass()`, `.prominentClearGlass()`. Glass for floating controls, not content or every cell. `UIBackgroundExtensionView` extends content under a sidebar or inspector. Do not fight Reduce Transparency / Increase Contrast with custom alpha. Design language: `apple-design` (`liquid-glass-design-system`).
- Display scale: `traitCollection.displayScale`, never `UIScreen.main.scale` (`UIScreen.main` deprecated in the iOS 26 SDK). Hairline = `1 / displayScale`. Current screen: `view.window?.windowScene?.screen`, which changes when a window moves displays.

## Objective-C notes

- Layout regions are refined for Swift; real names: `-layoutGuideForLayoutRegion:`, `-edgeInsetsForLayoutRegion:`, `-directionalEdgeInsetsForLayoutRegion:` with `UIViewLayoutRegion` from `+safeAreaLayoutRegionWithCornerAdaptation:` / `+marginsLayoutRegion...` / `+readableContentLayoutRegion...`. Corners: `+[UICornerConfiguration configurationWithRadius:]`, `+[UICornerRadius containerConcentricRadiusWithMinimum:]`.
- Use anchors, not visual format or `constraintWithItem:attribute:...` (anchors type-check X vs Y axes).
- A code-created view gets `initWithFrame:`, a storyboard one `initWithCoder:`: share setup in one private method. Always call `[super viewIsAppearing:animated]`.
- Bar item targets are weak selectors; a mistyped `@selector` crashes at tap time. Prefer `primaryAction:` initializers (`-initWithPrimaryAction:menu:`, `-initWithBarButtonSystemItem:primaryAction:`) with a `UIAction` block capturing `weakSelf`.
- `UITab` provider blocks are retained by the tab, and the zoom `sourceViewProvider` (`+[UIViewControllerTransition zoomWithOptions:sourceViewProvider:]`) is stored on the detail controller: capture `weakSelf`.
- `registerForTraitChanges:withHandler:` passes the environment as the first block parameter; use it instead of `self` (the object owns the registration, so a strong `self` is a cycle). Trait classes: `UITraitPreferredContentSizeCategory.class`. Overrides: `-removeTrait:`, `-containsTrait:`. iOS 18 tracking applies to ObjC equally.
- Custom traits are classes conforming to `UINSIntegerTraitDefinition` / `UICGFloatTraitDefinition` / `UIObjectTraitDefinition` with class properties `defaultValue`, reverse-DNS `identifier`, `name`, `affectsColorAppearance`; set with `setNSIntegerValue:forTrait:`, read with `valueForNSIntegerTrait:`. Object traits need `isEqual:` and immutability. Wrap in categories on `UITraitCollection` and `UIMutableTraits`.
- `modalInPresentation` (getter `isModalInPresentation`); `searchResultsUpdater` is weak. Debounce with `cancelPreviousPerformRequestsWithTarget:selector:object:` + `performSelector:withObject:afterDelay:`.
- Glass buttons: `+glassButtonConfiguration`, `+prominentGlassButtonConfiguration` (clear variants beside them in `UIButtonConfiguration.h`). Guard `UIGlassEffect`, tab minimize/accessory and other iOS 26 classes with `@available(iOS 26.0, *)`, falling back to a system blur.

## Review checklist

1. No constraints rebuilt in layout; constants changed. Scroll views fill the view and use adjusted insets.
2. Keyboard via `keyboardLayoutGuide`; nothing sized from screen, idiom or orientation.
3. Size/trait-dependent setup in `viewIsAppearing(_:)`, not `viewDidLoad`.
4. Bars configured via items and appearance objects; tabs via `UITab` with stable identifiers; sheets use detents; popovers have a source item.
5. Zoom providers resolve the source from current state.
6. Windows from a scene; no `windows`, `keyWindow` or `UIScreen.main`.
7. No `traitCollectionDidChange(_:)` or cached traits; `CGColor` resolved with current traits; custom environment as custom traits.

## Relationship to other skills

- `apple-design` owns the doctrine: `apple-navigation-design` (tabs vs sidebar, navigation patterns), `liquid-glass-design-system` (glass design language), `apple-search-design`, `apple-visual-accessibility`. This file is implementation only.
- `swiftui` (`swiftui-animation`) covers the zoom transition in more depth.
- Siblings in `uikit`: [uikit-ios27-sdk.md](uikit-ios27-sdk.md) (resizable iPhone apps, required scene lifecycle, `prominentTabIdentifier`, iPhone sidebars), [uikit-live-lists.md](uikit-live-lists.md) (keyboard and bottom pinning), [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md) (`updateProperties()`, Observation), [uikit-deprecated-apis.md](uikit-deprecated-apis.md), [uikit-text-and-interaction.md](uikit-text-and-interaction.md).
