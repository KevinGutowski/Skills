# SwiftUI on iPhone Duo (iOS 27.1)

*Scope: Implementing iPhone Duo support in SwiftUI — SDK opt-in, vertical toolbars and overflow, arrangement views, reserved regions (the fold, cameras), hinge state, scene accessories, and the AVFoundation/AVKit camera changes (which apply to any UI framework). Use when building or reviewing a SwiftUI app for the folding iPhone. Triggers: iPhone Duo, foldable, ArrangementView, ReservedRegion, onHingeChange, toolbarVerticalEdge, toolbarVerticalBehavior, toolbarVerticalCompressionBehavior, visibilityPriority, axisBehavior, ToolbarOverflowMenu, CameraCaptureAccessory, AVCaptureDeviceDirectionCoordinator.*

*Sources: Apple's "Preparing your app for iPhone Duo" overview, the HIG page, and tech talks 111461–111466 (Sept–Oct 2026); list in `apple-design` (iphone-duo-design) sources. Names checked against developer.apple.com on 2026-11-05; `onHingeChange` is talk-named (no doc page yet).*

**How to use this file:** it holds the decisions and traps the docs don't make obvious. Names are search terms — for signatures, cases and availability, fetch the page (links at the end; append `.md`). Design doctrine (what goes where, displacement, toolbar order) lives in `apple-design` (iphone-duo-design); UIKit in `uikit` (uikit-ios27-sdk).

## Contents

- Rebuild first
- Layout traps
- Bars on the side
- Arrangement views
- Reserved regions and the hinge
- Scenes and accessories
- Camera (any UI framework)
- Review checklist
- Look it up

## Rebuild first

Nothing below works until the app is built with the **iOS 27.1 SDK**. Older builds run but letterbox: iOS 26-SDK builds stay left of the status bar and camera; iOS 27-SDK builds extend left of the status bar on the inner display; only 27.1 builds go edge to edge with vertical bars. Test in Xcode 27.1 Device Hub (iPhone Duo simulator: open, close, rotate, fold), including Split View with the app on *each* side. For a codebase-wide audit, Apple's Xcode `app-resizability` skill now covers SwiftUI and iPhone Duo.

## Layout traps

- **The inner display ignores your supported orientations**, and `UIScreen.main` is ambiguous with two displays. Layout from size classes and container size only (outer = compact width; inner = regular/regular).
- **Safe areas and margins are asymmetric** — the bar can be on either edge (Split View puts it on the app's outer edge). Never mirror one inset to the other side.
- You get most adaptation free from `NavigationSplitView`, `TabView`, system sheets and presentations. Opting the inner display into a sidebar (`defaultTabBarPlacement`) is for information-dense apps only.

## Bars on the side

- **Only container-managed toolbars move.** `.toolbar` content must be inside `NavigationStack` / `NavigationSplitView` / `TabView`; a hand-built bar view stays horizontal forever. This is the #1 "why didn't my bar go vertical?" cause.
- **Give items a `Label` (title + symbol).** Symbol items go vertical; text-only items and custom views stay horizontal. The title still matters for overflow.
- **`axisBehavior` trap:** a horizontal-only item is *hidden* when no horizontal bar exists, so its action needs another path. Use horizontal-only for items that morph between symbol and text (custom Select/Done); use vertical-preferred to let a custom view go vertical, then make it fit the fixed bar width.
- Placement maps to the HIG order: Back/Close = `.cancellationAction`, prominent action = `.topBarPinnedTrailing`, the rest in `ToolbarItemGroup`s. Don't add fixed spacing.
- Per view, choose `toolbarVerticalCompressionBehavior` (default keeps the tab bar — right for navigation views; task views should keep toolbar items) and set `visibilityPriority` on what must stay visible. Fold app-owned "more" menus into `ToolbarOverflowMenu`.
- Disable the vertical bar (`toolbarVerticalBehavior`) only for bottom-heavy single-page UIs or one-button sheets.
- Custom floating palettes: align them with `toolbarVerticalEdge` (nil = no vertical bar here). It's hardware-based, so don't flip it for RTL.

## Arrangement views

```swift
NavigationStack {
    ArrangementView {
        PlayerView()
    } secondary: {
        UpNextView()
    }
    .arrangementViewStyle(.split.axes(.horizontal)) // stacked layouts show the primary only
}
```

- **Split** for main–detail where neither view may be obscured; **overlay** for foreground over background (it goes side by side when folded). Existing HStack/VStack two-pane → split; ZStack layering → overlay.
- In overlay, read the z-index environment value to switch a child between collapsed and expanded as the device folds.
- **Nesting is the trap:** keep it *inside* navigation containers. Never wrap `NavigationSplitView`/`TabView` in it, and never put it in `List`, `ScrollView`, grids or split views; parts become unreachable.

## Reserved regions and the hinge

```swift
GeometryReader { proxy in
    let folds = proxy.reservedRegions(kind: .division)                               // active only
    let anyFold = proxy.reservedRegions(kind: .division, options: .includeInactive)
    MyGridLayout(columns: anyFold.isEmpty ? 3 : 4, avoiding: folds) { … }            // your own Layout
}
```

- Use reserved regions only for custom layouts; system components already avoid the fold.
- **Active vs inactive:** the fold is active only when partially folded (zero width when flat). Use *inactive* regions for structural choices (even column counts whenever a fold exists) and *active* ones for avoidance, so the layout doesn't reshuffle every time the device flexes.
- Frames are in the coordinate space of the view you read them from; convert before comparing with a `Layout`'s bounds. Frames mirror in RTL unless you pass fixed layout-direction behavior.
- **Hinge (`onHingeChange`, talk-named) is for effects, not layout:** drive an interaction from the angle (Apple's demo: a pitch-bend whammy bar), reset when not partially open, and treat a nil hinge as "no hinge here." Never animate layout per angle tick or hand-compute hinge geometry.

## Scenes and accessories

- **New windows can be created only on the inner display.** Requests fail when closed: handle the error and hide "New Window" UI.
- **`CameraCaptureAccessory`** (via `.sceneAccessory`) shows interactive content on the outer display while the camera UI is full screen inside, for example a teleprompter or something for the subject to look at. Attach it to the camera view so it lives and dies with that view, and drive any toggle from `onAvailabilityChange` (false when closed). Never cache availability.

## Camera (any UI framework)

- **The virtual front camera** (what a normal front-camera discovery returns) switches between the outer and inner cameras for you, but only offers their common subset (1080p/60, **no depth**). Use the individual devices (`builtInOuterUltraWideCamera`, `builtInInnerUltraWideCamera`) only if you need more, and then *you* handle switching.
- **`AVCaptureDevice.position` no longer tells you which way a camera faces.** The outer "front" camera faces away while you use the inner display, and a rear camera faces the user when the open device is flipped. Use `AVCaptureDeviceDirectionCoordinator` (AVKit), created on the main actor with the preview's view and **both front and rear** device types. Keep it alive while the view is on screen, and use one per view when previews are on both displays.
- The coordinator hands you sendable descriptors, not devices. Pass them to your capture actor and reconfigure there; don't touch AVFoundation in the handler. Update mirroring in the handler: mirror when the camera faces the person.
- Keep `AVCaptureDevice.RotationCoordinator` (it follows display changes), then turn off sensor-orientation compensation for performance.

## Review checklist

1. Built with the iOS 27.1 SDK; every pose and both Split View sides checked.
2. No orientation, idiom or screen layout; insets handled per edge.
3. Toolbars inside navigation containers; `Label` items; no horizontal-only item whose action is otherwise unreachable.
4. Compression and visibility priority chosen per view; one overflow menu.
5. Arrangement views nested correctly; custom controls avoid *active* folds; hinge used only for effects.
6. Scene requests handle failure; accessory toggles follow availability.
7. Camera picks by direction (coordinator) or accepts the virtual camera's limits; no AVFoundation calls in the handler.

## Look it up

Fetch as Markdown by appending `.md`, then check the `availability` block:

- Overview: https://developer.apple.com/documentation/technologyoverviews/preparing-your-app-for-iphone-duo
- https://developer.apple.com/documentation/swiftui/arrangementview · .../swiftui/arrangementviewstyle · .../swiftui/reservedregion · .../swiftui/geometryproxy/reservedregions(kind:options:layoutdirectionbehavior:)
- .../swiftui/environmentvalues/toolbarverticaledge · .../swiftui/toolbarverticalbehavior · .../swiftui/toolbarverticalcompressionbehavior · .../swiftui/toolbaritemvisibilitypriority · .../swiftui/toolbaritemaxisbehavior · .../swiftui/toolbaroverflowmenu
- .../swiftui/cameracaptureaccessory · .../swiftui/sceneaccessorycontent
- .../avkit/avcapturedevicedirectioncoordinator · .../avkit/choosing-a-camera-by-the-direction-it-faces
- Talks: https://developer.apple.com/videos/play/tech-talks/111462/ (bars), /111463/ (arrangements, regions), /111464/ (hinge, scenes, accessories), /111465/ (camera)
