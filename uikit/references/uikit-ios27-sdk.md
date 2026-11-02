# UIKit in the iOS 27 SDK (27.0 and 27.1)

*Scope: What is new, changed, required or deprecated in UIKit between the iOS 26 SDK and the iOS 27 SDK, including the iOS 27.1 foldable additions. Use when building with Xcode 27, raising a deployment target to iOS 27, fixing launch failures or new warnings after an SDK update, or reviewing code for resizable-app readiness. For general UIKit practice use the sibling references; this file only says what is different now. Triggers: iOS 27 SDK, Xcode 27, scene life cycle required, UILaunchScreen, UIScreen.main, iPhone Mirroring, resizable iPhone app, UIRequiresFullScreen, prominentTabIdentifier, sidebar.preferredPlacement, navigationBarMinimization, preferredImageVisibility, registerSceneAccessory, canOpenURL deprecated, UIArrangementViewController, UIHingeInteraction, reserved regions, vertical bars.*

*Distilled from one third-party source (Oct 2026), cross-checked against Apple's own Xcode 27.2 `app-resizability` skill (see "Resizing migration" below); where they disagree, Apple's skill wins. Re-verify each symbol's availability against Apple's docs before shipping.*

*Source: Fernando Olivares, uikit-skill (MIT), skills/uikit-whats-new-27 (SKILL.md and its 10 references) and skills/uikit-whats-new-27-objc (SKILL.md and references), https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- How to read the version gates
- Must-do when moving to the iOS 27 SDK
- Resizable apps: screen, idiom, orientation, traits
- Resizing migration: lessons from Apple's app-resizability skill
- Tabs and sidebars
- Navigation bars, scroll edges, search
- Menus, Siri and drag
- Scene accessories and external displays
- Text and TextKit 2
- Observation, sensors, Mac Catalyst
- iOS 27.1: arrangements, hinges, reserved regions, vertical bars
- Behavior fixes that may break workarounds
- Swift-only APIs and the Objective-C route
- Review checklist for an SDK update
- Relationship to other skills

## How to read the version gates

- **SDK behavior** = happens to any app *linked against the iOS 27 SDK*, whatever its deployment target. No code change turns it on; you audit for it.
- **API 27.0 / API 27.1** = opt-in symbol. Guard with `if #available(iOS 27, *)` or `if #available(iOS 27.1, *)` when the deployment target is lower.
- Do not restructure working code just because a newer API exists; adopt where it fixes a real problem or removes a warning. If a symbol is not listed here, check the SDK header or Apple's page; do not guess names.

## Must-do when moving to the iOS 27 SDK

1. **Scene life cycle is required (SDK behavior).** An app still on the app-delegate window life cycle *fails to launch*. Needs `UIApplicationSceneManifest` in `Info.plist` and a `UIWindowSceneDelegate` that builds `UIWindow(windowScene:)` in `scene(_:willConnectTo:options:)`. Config may come from code (`application(_:configurationForConnecting:options:)` returning `UISceneConfiguration` with `delegateClass`) or a `UISceneConfigurations` manifest entry.
   - Move callbacks: `applicationDidBecomeActive` -> `sceneDidBecomeActive`, `WillResignActive`/`DidEnterBackground`/`WillEnterForeground` likewise; `application(_:open:options:)` -> `scene(_:openURLContexts:)`; `application(_:continue:...)` -> `scene(_:continue:)`; `performActionFor` shortcut -> `windowScene(_:performActionFor:completionHandler:)`.
   - Cold launch: URLs, user activities and shortcut items arrive in `connectionOptions` (`urlContexts`, `userActivities`, `shortcutItem`), not the later callbacks. Handle both paths.
   - Breaks most often: `UIApplication.shared.delegate?.window` (use `view.window` or the scene); UI built in `didFinishLaunching` (keep only process-wide setup there); "the" window/root controller singletons (now per scene).
2. **Launch screen is required (SDK behavior, App Store rule).** `Info.plist` must have one of `UILaunchStoryboardName`, `UILaunchStoryboards`, `UILaunchScreen`, `UILaunchScreens`; 27.0-SDK builds without one are rejected. Minimum: an empty `UILaunchScreen` dict (system background); add `UIColorName`/`UIImageName` to match the first frame. Not a splash screen. The upload rejection is `ITMS-90870` (Apple TN3208). `INFOPLIST_KEY_UILaunchScreen_Generation` in build settings also counts; read every `Info.plist`/`.xcconfig`/project source before declaring it missing, and leave an existing storyboard alone.
3. **No layout from `UIScreen.main`, idiom or orientation (SDK behavior).** iPhone apps are freely resizable in iPhone Mirroring (macOS 27) and as iPhone-only apps on iPad. See next section.
4. **`canOpenURL(_:)` is deprecated (API 27.0 deprecation).** Attempt the open and handle failure:

```swift
Task { @MainActor in
    if !(await UIApplication.shared.open(mapsURL)) { showMapsMissing() }
}
```

   Or `windowScene.open(_:options:completionHandler:)`. For your own or partner apps use universal links with `.universalLinksOnly` so the call fails instead of opening the browser (the "is it installed?" answer without `canOpenURL`). Do not hide buttons based on URL checks; show the action and handle failure. Delete `LSApplicationQueriesSchemes` once the calls are gone.

## Resizable apps: screen, idiom, orientation, traits

All SDK behavior unless noted. The scene can change size or screen at any time.

- **`UIScreen.main`** (deprecated iOS 26) always describes the built-in screen, so it is wrong exactly in Mirroring and external-display cases. Preference order: (1) do not need the screen: scale from `traitCollection.displayScale`, space from your own `bounds`; (2) take the screen from `view.window?.windowScene?.screen` or pass it in.
- Traits read inside `layoutSubviews()`, `updateProperties()`, `draw(_:)`, `viewWillLayoutSubviews()` are tracked: a change re-runs the method. For caches derived from traits elsewhere, `registerForTraitChanges([UITraitDisplayScale.self]) { ... }`.
- **Space** comes from the view: `view.bounds.size` in `viewDidLayoutSubviews()`/`viewWillTransition(to:with:)`; scene-wide from `windowScene.effectiveGeometry.coordinateSpace.bounds`, observed in `windowScene(_:didUpdateEffectiveGeometry:)`.
- **Idiom is not a layout input.** An iPhone app on iPad or in Mirroring keeps `.phone` while being any size. Replace `userInterfaceIdiom == .pad ? 3 : 1` with `horizontalSizeClass == .regular` or `container.effectiveContentSize.width / 320`. Use idiom only for input/platform conventions.
- **Orientation is not a layout input.** Supported orientations are now only a preference and are ignored in resizable environments; in Mirroring the app always runs in portrait whatever the window aspect. Use `verticalSizeClass` or compare bounds width/height. Rotation is an animated bounds change.
  - iPad app missing some of the four orientations is still continuously resizable.
  - iPhone-only app on iPad ignores supported orientations after the first user resize; layout must hold in an unlisted orientation.
  - Mirroring honors supported orientations until the user starts resizing.
- **`UIRequiresFullScreen`** no longer opts out of resizing: Apple's skill says iOS 27 ignores it and resizes the scene anyway (Apple TN3192, "Migrating your app from the deprecated UIRequiresFullScreen key"). The third-party source describes the iPhone-in-resizable-environment behavior as *discrete resizing* (each resize arrives as a move to a new `UIScreen`; games rebuild render targets from the scene's screen, `effectiveGeometry` and `displayScale` in `didUpdateEffectiveGeometry`) — verify that detail against TN3192. Never delete the key before layouts are ready (deletion makes the app resizable at once), and never add `UIRequiresFullScreenIgnoredStartingWithVersion` for the developer: its value decides which releases keep the old behavior, and 27 or lower makes the app fully resizable on iOS 27. Remove the key only after running and resizing every screen.
- **Presented view controller traits** now come from walking the presented view's superview chain through the presentation's views, not straight from the presentation controller. Custom `UIPresentationController`s that override traits must set `traitOverrides` on the container/intermediate views or the presented controller; presented controllers should read their own `traitCollection`, not `presentationController?.traitCollection`.
- **Status bar accessors** on `UIApplication` (`statusBarFrame`, `statusBarOrientation`, `statusBarStyle`, `isStatusBarHidden`) may return NaN or nil-like values. Use `windowScene.statusBarManager`, size classes/`effectiveGeometry`, and `preferredStatusBarStyle`.
- Test: Xcode 27 Device Hub and Previews have a drag-to-resize mode; also real Mirroring on macOS 27 and an iPhone app on iPad. Check narrowest, widest, very short heights, and largest text size together.

## Resizing migration: lessons from Apple's app-resizability skill

Apple ships an `app-resizability` skill with Xcode 27.1+ (it replaced the earlier `uikit-app-modernization`; see the router's companion note). It runs a task-by-task migration (`UIScreen.main`, orientation, scene life cycle, safe areas, idiom) in Swift and Objective-C. For a codebase-wide migration, use it; the durable rules it encodes, in brief:

- **Closest to the consumer.** Read the value nearest the point of use (the view's trait collection over the window's, the view's own insets over an ancestor's). Never substitute another global (`UIApplication.shared`, `UIDevice.current`, the window's screen): if no local object is reachable, add a parameter and pass it down (deprecate-and-forward the old signature).
- **A trait replacement is an atomic two-part change.** Swapping a fixed value (`UIScreen.main.scale`, process-wide idiom) for a trait introduces staleness: also register for that trait (`registerForTraitChanges([UITraitDisplayScale.self])`, `UITraitHorizontalSizeClass`, ...) wherever the result is stored, or move the read into an auto-tracked method so nothing is cached. Inline use in `layoutSubviews`/`draw(_:)`/`updateConstraints`/`viewIsAppearing(_:)` needs no registration. Traits read in `init`/`awakeFromNib` are not meaningful yet (size class `.unspecified`). Below iOS 17, use `traitCollectionDidChange(_:)`.
- **Screen properties with no trait:** `nativeScale`, `nativeBounds`, `coordinateSpace` must come from `view.window?.windowScene?.screen` (never `window.screen`, which can be wrong in multi-scene setups). Keyboard notification frames convert through the posting screen, `notification.object as? UIScreen`, not the window's screen — better, constrain to `keyboardLayoutGuide` and drop the observer. Pass a trait collection to `UIGraphicsImageRendererFormat(for:)`, never drop the argument.
- **Interface orientation is not an aspect ratio.** `windowScene.effectiveGeometry.interfaceOrientation` is current API but still the wrong layout input: a landscape-reporting scene can be taller than wide (a narrow split column). Use a size class or a bounds comparison; keep orientation only for left-vs-right or rotation transforms.
- **`windowScene(_:didUpdateEffectiveGeometry:)`** (iOS 26+) replaces the deprecated `windowScene(_:didUpdate:interfaceOrientation:traitCollection:)`, but fires only for geometry, not for trait-only changes — move trait work to `registerForTraitChanges` on the owning view. Read the *current* `windowScene.effectiveGeometry` (the parameter is the previous geometry), compare against a stored copy, and gate expensive work (asset regeneration, tiling, network) on `!isInteractivelyResizing` — never gate ordinary layout. Also migrate `windowScene.coordinateSpace` to `effectiveGeometry.coordinateSpace`. Below an iOS 26 target, keep the old callback.
- **Safe areas are asymmetric** (vertical bars on foldables, notches, windows, split columns): never assume left == right or top == bottom, never `max()` or average an edge pair, never infer the inset edge from device, orientation or size class, never subtract a hardware constant (the inset already includes it), and never test an inset against a threshold — apply it, zero is correct. `bounds.width - left - right` is already correct.
- **Never store a safe-area inset** (property, `lazy var`, static). Reads in `init`/`viewDidLoad`/`awakeFromNib`/`viewWillAppear` return zero. Read in `layoutSubviews`/`viewWillLayoutSubviews`/`viewDidLayoutSubviews`, or constrain to `safeAreaLayoutGuide`. Use `safeAreaInsetsDidChange()`/`viewSafeAreaInsetsDidChange()` to invalidate (`setNeedsLayout()`, or `setNeedsUpdateConstraints()` if the read is in `updateConstraints`), not to recompute a cache.
- **Physical vs directional:** `safeAreaInsets.left` is the physical left in both layout directions; constrain to `safeAreaLayoutGuide.leadingAnchor` when you mean direction. `additionalSafeAreaInsets` is physical too and carries only your extra chrome, never the safe area itself (adding it counts twice).
- **Read insets from the view you lay out** — a sheet, popover, or split column carries insets its window does not. Rounded corners are not in `safeAreaInsets`: use `layoutGuide(for: .safeArea(cornerAdaptation: .horizontal))` or `directionalEdgeInsets(for:)` (iOS 26) where a corner can clip content.
- **`traitCollection.verticalBarEdge`** (iOS 27.1) says which edge holds a vertical bar (`leading`/`trailing`/`unspecified`, directional). Reads in layout methods are tracked; elsewhere register for `UITraitCollection.systemTraitsAffectingVerticalBarEdge`. Use the inset, not this trait, for sizes.
- **Scroll views:** let `contentInsetAdjustmentBehavior = .automatic` work (remove legacy `.never`); never add safe-area insets on top of `adjustedContentInset`. Leave intentionally edge-to-edge content (backgrounds, media, maps) alone.
- **Preflight (read-only):** launch-screen key present; iPad declares all four orientations (a `supportedInterfaceOrientations` override can still lock the scene); `UIRequiresFullScreen` status as above.

## Tabs and sidebars

All opt-in API 27.0, building on the iOS 18 `UITab` API. Design doctrine routes to `apple-design` (`apple-navigation-design`).

- `UITabBarController.prominentTabIdentifier: String?` names the emphasized tab; it stays visible when the tab bar collapses on scroll. Change on screen with `setProminentTabIdentifier(_:animated:)`. When `nil` and a `UISearchTab` has `automaticallyActivatesSearch = true`, search gets prominence (iOS 26 behavior). Must match a tab `identifier` exactly; a typo silently gives none, so use constants. Never fake prominence with custom item art or a floating button (breaks collapse, Liquid Glass, accessibility).
- `tabBarController.sidebar.preferredPlacement = .sidebar` (`.automatic`, `.sidebar`, `.tabBar`) lets an *iPhone* app opt into the sidebar. It is an app choice, not a user toggle; the system shows the sidebar only when there is room (regular width in Mirroring or on iPad).
- `sidebar.isAvailable` (read only) says whether the sidebar can show now. Re-check on size/size-class change; when false, surface `UITabGroup` children in-screen (segmented control, list on the group root, or menu).

## Navigation bars, scroll edges, search

- **`UINavigationItem.navigationBarMinimization`** (API 27.0, `UIBarMinimization`): `minimizationBehavior` (`.automatic`, `.never`, `.onScrollDown`, `.onScrollUp`), `restorationBehavior` (`.automatic`, `.atScrollEdge`), `safeAreaAdjustment` (`.automatic`, `.disabled`, `.enabled`). Set in `init`/`viewDidLoad` so first appearance has it. `.onScrollDown` for reading screens, `.never` where the bar holds always-needed controls, `safeAreaAdjustment = .disabled` only when you pin content to the bar yourself. The early names `barMinimizeBehavior` / `barMinimizationSafeAreaAdjustment` are not the shipping API. Do not hide the bar with `setNavigationBarHidden` from `scrollViewDidScroll`. Tab bar has its own `tabBarMinimizeBehavior` (iOS 26).
- **Scroll edge effect visuals changed (SDK behavior).** `.automatic` has its own look and no longer switches between `.soft` and `.hard`; explicit `.soft` no longer matches the system look. Review every `topEdgeEffect`/`bottomEdgeEffect` style override; usually remove it.
- **`UIScrollEdgeElementContainerInteraction`** (iOS 26): in iOS 27 the container's size and position may shape the effect. Size the container to hug the floating content; one container per floating cluster, not a full-width transparent view.
- **Centered search (SDK behavior):** with `preferredSearchBarPlacement = .integratedCentered`, the scope bar sits inline on the search field's row. Keep 2-4 one-word scope titles; more belong in a filter menu; stop relying on the old two-row height.

## Menus, Siri and drag

- **Menu images mostly hidden (SDK behavior, iPadOS 27/macOS 27 menu bar and context menus).** Opt in per element with `UIMenuElement.preferredImageVisibility` (API 27.0; `.automatic`, `.hidden`, `.visible`; new initializers on `UIMenu`, `UIAction`, `UICommand`, `UIKeyCommand`). Force `.visible` only when the image carries meaning the title does not (color swatch, avatar, status, icon palettes). Do not mark everything visible to restore the old look; keep setting images (still shown on iPhone, button menus, accessibility).
- **Ask Siri** item is added to menus by the system when relevant; give context via App Intents view annotations with App Entities (outside UIKit).
- **Drag sessions can start without a gesture (SDK behavior).** Siri/Apple Intelligence from a context menu calls your `UIDragInteractionDelegate` to fetch items. Keep `sessionWillBegin` to state only; no animation or modal UI there. Show drag-only UI in `sessionDidMove` and reset in `session(_:didEndWith:)`. `itemsForBeginning` must return lazily-loading providers that do not depend on on-screen state set up by a gesture. Apply the same rule to table/collection drag delegates.
- `UIDragInteraction.allowsPointerDragBeforeLiftDelay` (API 27.0) tunes pointer-initiated drag timing separately from touch, for gesture-dense canvases/timelines. Test with trackpad, mouse and Catalyst.

## Scene accessories and external displays

- **SDK behavior:** the system no longer offers `windowExternalDisplayNonInteractive` scenes on its own; answering that role in `configurationForConnecting` stops being called. Register from the view controller that owns the content (API 27.0):

```swift
let config = UISceneConfiguration(name: "External", sessionRole: .windowExternalDisplayNonInteractive)
config.delegateClass = ExternalSceneDelegate.self
externalRegistration = registerSceneAccessory(.externalNonInteractive(sceneConfiguration: config))
// later: externalRegistration?.isEnabled = presenting
```

- `UISceneAccessoryRegistration.isEnabled` (read/write: show now) and `isAvailable` (read only: can show at all, e.g. display connected). Store the registration; drive any "Show on display" control from `isAvailable`. Pass identifiers in `userInfo` (`externalNonInteractive(sceneConfiguration:userInfo:)`), not views. The external scene sizes from its own scene, never `UIScreen.main`.
- **API 27.1:** `UISceneAccessory.cameraCapture(sceneConfiguration:)` (role `.windowCameraCaptureAccessory`) shows content on a foldable iPhone's outer display while open, foregrounded and capturing. Register from the capture screen; the scene connects and disconnects as capture starts and stops.

## Text and TextKit 2

API 27.0 unless noted; some types are older but UIKit text views now use them this way. Verify on an iOS 27 device.

- A `UITextView` subclass may override the `NSTextViewportLayoutControllerDelegate` methods, e.g. `viewportBounds(for:)`, and must call `super`. Never replace `textViewportLayoutController.delegate` (the text view stops laying out). Other hooks: `textViewportLayoutControllerWillLayout(_:)`, `textViewportLayoutController(_:configureRenderingSurfaceFor:)`, `textViewportLayoutControllerDidLayout(_:)`; keep them tiny, they run every scroll pass.
- `UITextAttachmentViewProviderReusePolicy` (`onScrollingOutOfViewport`, `onEditingInlineParagraphs`) registered per provider type (ObjC: `-registerTextAttachmentViewProviderReusePolicy:forTextAttachmentViewProviderType:`) keeps stateful attachment views (players, checkboxes) alive to stop flicker. Not for plain images; kept views still cost memory.
- `NSTextViewportRenderingSurface` (27.0) marks a view/layer as a fragment's drawable; cache via `NSTextViewportRenderingSurfaceKey` (iOS 18) and the `cacheRenderingSurface` / `retrieveCachedRenderingSurface` delegate methods.
- Text tables: `NSTextTable`, `NSTextBlock`, `NSTextTableBlock` in attributed strings; each cell is one paragraph ending in `\n` with `paragraphStyle.textBlocks = [block]`; read back outermost to innermost. Test paste interop and VoiceOver.

## Observation, sensors, Mac Catalyst

- **Section providers are observation-tracked (27.0 runtime, Swift only).** Reading an `@Observable` property inside a `UICollectionViewCompositionalLayout` section provider invalidates and rebuilds the layout when it changes. Read only what layout needs; never fast-changing values (progress, scroll); cell content still goes through `reconfigureItems(_:)`. Below a 27 deployment target keep an explicit `invalidateLayout()` path. Observation tracking is on by default from iOS 26 (iOS 18 needs `UIObservationTrackingEnabled`).
- **`UIView` as sensor body** (API 27.0): `CMMotionManager.deviceMotionBody` and `CLLocationManager.headingBody` accept a view; readings arrive in that view's interface orientation. Use the view that shows the data, not the window; drop manual rotation by `interfaceOrientation`. The managers retain the view: clear the property when the screen goes away.
- **Mac Catalyst:** `UIRefreshControl` and `UIStepper` are fully supported in the Mac idiom; remove Mac-only substitutes after checking on macOS 27, but keep a Refresh menu command with a shortcut.

## iOS 27.1: arrangements, hinges, reserved regions, vertical bars

All API 27.1.

- **`UIArrangementViewController`**: primary/secondary container that adapts to size class, orientation and reserved regions. `setViewController(_:for:animated:)` (`.primary`, `.secondary`; `nil` clears), `updateArrangement(_:animated:)`, `viewController(for:)`, `placement(for:)`, `state(for:)` (`isHidden`, `splitAxis`, `zIndex`); descendants find it via `arrangementViewController`. `UISplitArrangement().axes([...])` with `DimensionRange` (`minimum`/`preferred`/`maximum`); `UIOverlayArrangement` overlays, or goes side by side on a folded display; custom ones conform to `Arrangement`. Use for panes that follow the fold; keep `UISplitViewController` for sidebar/list/detail with collapse. Never hand-compute hinge frames.
- **Reserved regions**: `reservedRegions(kind:options:)` with kinds `.division` (hinge split) and `.occlusion` (hardware covering); each has `frame`, `margins`, `isActive`, `kind`; `.includeInactive` option. No control, text or image focal point across a `.division` region plus its margins; only decorative content under `.occlusion`.
- **`UIHingeInteraction(updateHandler:)`** (`isEnabled`): `update.hinge` is `nil` when the view leaves a hinged hierarchy; `UIHinge.status` `.closed`/`.partiallyOpen`/`.fullyOpen`/`.unknown`, `angle` in radians. Switch layouts on status changes; do not animate per angle tick. Capture `[weak self]`.
- **Vertical bars**: override `preferredVerticalBarBehavior` (`.automatic`/`.disabled`; `.disabled` for full-bleed editors), `childForPreferredVerticalBarBehavior`, `setNeedsUpdateOfVerticalBarConfiguration()`; trait `verticalBarEdge` (register via `systemTraitsAffectingVerticalBarEdge`); `UIView.LayoutRegion.bar(onEdge:extent:)`; `UIBarButtonItem.axisBehavior` (`.horizontalOnly` for wide segmented controls and search fields); `UINavigationItem.verticalBarCompressionBehavior` (`.automatic`, `.prefersBarItems`, `.prefersTabBar`).

## Behavior fixes that may break workarounds

SDK behavior; remove the workaround after confirming on iOS 27.

- `UISceneClosureConfirmation` now actually presents its dialog: delete custom alerts that substituted for it.
- `UIMenuLeaf` now declares `subtitle`: drop casts to `UIAction`/`UICommand`.
- Bottom toolbar background no longer disappears when an item sets `hidesSharedBackground`: remove added background views.
- `UIScene.extendStateRestoration()` / `completeStateRestoration()` (iOS 15) now also cover background-to-foreground transitions, not only connection. Every path, including errors and cancellation, must call `completeStateRestoration()` or the system waits forever.

## Swift-only APIs and the Objective-C route

No Objective-C declaration exists for these; do not invent a selector. Keep a small Swift file exposing an `@objc` method, or use the route below.

| API | Objective-C route |
|---|---|
| `UINavigationItem.navigationBarMinimization` | system default, or a Swift shim (`@objc func configureBarMinimizationForReading()`) |
| `UIArrangementViewController` configuration (`setViewController(_:for:animated:)`, `updateArrangement`, lookups, `UISplitArrangement`, `UIOverlayArrangement`) | `UISplitViewController` with `-setViewController:forColumn:`, or a Swift controller presented from ObjC (class, `-init`, `arrangementViewController` do bridge) |
| `UIView.reservedRegions(kind:options:)`, `ReservedRegion` members | `UIHingeInteraction` plus the safe area |
| `UIView.LayoutRegion.bar(onEdge:extent:)` | none |
| Observation tracking in section providers | `-invalidateLayout` from your own change callback; reading `NSObject`/KVO properties registers nothing |

Other Objective-C gotchas:

- Calling `super` in an override of an iOS 27-only UIKit hook (e.g. `viewportBoundsForTextViewportLayoutController:`) crashes with an unrecognized selector on older systems. Wrap the `super` call in `if (@available(iOS 27.0, *))`. `API_AVAILABLE(ios(27.1))` on your own override is a declaration marker only, not a runtime check.
- Selector spellings: `+[UISceneAccessory externalNonInteractiveSceneAccessoryWithConfiguration:]`, `cameraCaptureSceneAccessoryWithConfiguration:`; registration `enabled`/`available` properties (getters `isEnabled`/`isAvailable`); `UIApplicationOpenURLOptionUniversalLinksOnly: @YES`.
- `UITab` providers, `UIHingeInteraction` handlers and open-URL completions are retained blocks: capture `weakSelf`, hop to main for UI.

## Review checklist for an SDK update

1. Scene delegate present and the app launches; launch screen key present.
2. Grep each; every hit goes or gets a one-line comment saying why it stays:

```
UIScreen.main / mainScreen
userInterfaceIdiom
interfaceOrientation
statusBarOrientation
statusBarFrame
canOpenURL
windowExternalDisplayNonInteractive
UIRequiresFullScreen
sessionWillBegin
.soft
```

3. Custom presentation controllers still deliver the right traits.
4. Drag `sessionWillBegin` does no animation or modal UI; items load lazily.
5. Menus whose meaning depends on images set `preferredImageVisibility`.
6. External display code registers a scene accessory.
7. Every `extendStateRestoration()` has a matching `completeStateRestoration()` on all paths.
8. iOS 27/27.1 APIs behind matching `#available`; ObjC `super` calls into 27-only hooks guarded.
9. Runs in the resizable simulator, at compact width, short heights and largest text.

## Relationship to other skills

- General UIKit practice: [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md), [uikit-text-and-interaction.md](uikit-text-and-interaction.md), [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md), [uikit-lists.md](uikit-lists.md); older deprecations (`UIScreen.main`, `UIWindow(frame:)`) in [uikit-deprecated-apis.md](uikit-deprecated-apis.md).
- Tab, sidebar, toolbar and Liquid Glass design doctrine: `apple-design` (`apple-navigation-design`, `liquid-glass-design-system`).
- SwiftUI equivalents: `swiftui`.
