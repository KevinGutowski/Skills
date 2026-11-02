# UIKit Data Flow, Observation, and Concurrency

*Scope: How model changes reach UIKit views and how async work stays off (and comes back to) the main actor: where state lives, Observation tracking in UIKit update methods, `updateProperties()`, `flushUpdates` animation, explicit update paths, task lifetime in view controllers and cells, main-thread hazards, and the Objective-C equivalents (GCD, blocks, KVO, Swift-interop annotations). Language-level Swift concurrency doctrine lives in `swiftui` (swift-concurrency); this file keeps only the UIKit-specific rules. Triggers: @Observable in UIKit, UIObservationTrackingEnabled, updateProperties, setNeedsUpdateProperties, flushUpdates, Task in a view controller, @MainActor, @concurrent, Sendable, AsyncStream into a snapshot, prepareForReuse task cancel, DispatchQueue.main, weakSelf, KVO, NSTimer, NS_SWIFT_UI_ACTOR.*

*Source: Fernando Olivares, uikit-skill (MIT), uikit-specialist and uikit-specialist-objc dataflow and concurrency references, uikit-specialist-slim "Main actor and tasks" and the Observation/UIUpdateLink rows, uikit-whats-new-27 observation notes, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- Where state lives
- Observation tracking in UIKit
- updateProperties (iOS 26+)
- Animating model changes
- Explicit update paths
- Lists and model changes
- Tasks on the main actor
- Moving work off main
- Streams, callbacks, per-cell tasks
- Hangs and crashes
- Objective-C notes
- Review checklist
- Relationship to other skills

## Where state lives

One source of truth per piece of state, one path from it to the screen, and views that read state at update time instead of caching copies.

| State | Lives in |
|---|---|
| App data (messages, documents) | a store outside view controllers: an actor, a database layer, or `@Observable @MainActor` model objects |
| Screen state (selection, filter, editing) | the view controller, or a small `@Observable` screen model it owns |
| Transient view state (highlight, pressed) | the view or cell, via configuration state |
| Subtree-wide values (theme, density) | a custom trait (see [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md)) |

- Controllers read from the store and send intents ("delete this ID") back; they do not hold drifting copies of app data.
- Inject dependencies through initializers. Singletons reached from views hide data flow and block testing.

## Observation tracking in UIKit

UIKit records reads of `@Observable` properties inside its update methods and reruns the method when those properties change.

- iOS 26+: on by default.
- iOS 18: only with the Info.plist key `UIObservationTrackingEnabled` = YES. Without the key nothing is tracked; keep an explicit update path.

Tracked methods:

- `UIView`: `layoutSubviews()`, `updateConstraints()`, `draw(_:)`, `updateProperties()` (iOS 26+)
- `UIViewController`: `viewWillLayoutSubviews()`, `viewDidLayoutSubviews()`, `updateViewConstraints()`, `updateProperties()` (iOS 26+), `updateContentUnavailableConfiguration(using:)`
- Cells: `updateConfiguration(using:)`, `configurationUpdateHandler`; buttons: `updateConfiguration()`, `configurationUpdateHandler`
- iOS 27: compositional layout section provider closures. Reading an observable value there invalidates and rebuilds the section, so drop hand-written `invalidateLayout()` callbacks (see [uikit-ios27-sdk.md](uikit-ios27-sdk.md)).

```swift
@Observable @MainActor
final class Inbox { var unreadCount = 0; var isSyncing = false }

final class InboxHeaderView: UIView {
    let inbox: Inbox
    override func updateProperties() {            // iOS 26+
        super.updateProperties()
        badge.text = inbox.unreadCount.formatted()   // read here = tracked
        badge.isHidden = inbox.unreadCount == 0
        inbox.isSyncing ? spinner.startAnimating() : spinner.stopAnimating()
    }
}
```

- Read the model inside the tracked method. A value copied into a stored property in `viewDidLoad` is not tracked.
- Only properties read in the last run are tracked. A branch that skips a read stops tracking that property until a later run reads it; that is correct.
- Tracked methods rerun on every dependency change: keep them cheap.
- Observation does not replace snapshots. Which items a list shows still changes via snapshot applies.
- Do not replace this with a `NotificationCenter` observer per property plus a cached value.
- Supporting iOS 18 and 26 together: `updateProperties()` does not exist on 18. Put model reads in `layoutSubviews()` / `viewWillLayoutSubviews()` (tracked with the key), gate `updateProperties()` use with `if #available(iOS 26, *)`, or keep an explicit path that calls `setNeedsLayout()`.

## updateProperties (iOS 26+)

Set state-derived properties here: text, colors, images, `isHidden`, `isEnabled`. It runs before `layoutSubviews()` and separately from it, so a property change does not force a layout pass.

- Must call `super.updateProperties()`.
- `setNeedsUpdateProperties()` requests a run when non-observable inputs change (observable reads schedule it automatically); requests coalesce.
- `updatePropertiesIfNeeded()` forces a pending run now.
- Geometry in `layoutSubviews()`; property sets in `updateProperties()`. Do not mix.

## Animating model changes

iOS 26+: `UIView.AnimationOptions.flushUpdates` applies pending property and layout updates inside the animation, so an observable model change or constraint change animates with no manual `layoutIfNeeded()`.

```swift
UIView.animate(withDuration: 0.3, delay: 0, options: .flushUpdates) {
    inbox.isExpanded.toggle()        // tracked views update and animate
}
```

`UIViewPropertyAnimator` has a matching `flushUpdates` property. Before iOS 26: change state, then call `layoutIfNeeded()` on the common ancestor inside the animation block.

## Explicit update paths

When Observation is unavailable or unwanted:

- The store exposes an `AsyncStream` of changes; the controller consumes it in a stored task.
- A delegate or closure on the model, set once, captured weakly.
- KVO via `observe(_:options:changeHandler:)` on `NSObject` models; keep the token and let it die with the observer.
- `NotificationCenter` only for app-wide, loosely coupled events (account changed, store reset), never per-property updates.

Whatever the path: coalesce bursts, and apply on the main actor from one method.

## Lists and model changes

- Identity and order come from a snapshot built from the store's IDs.
- Content: either `reconfigureItems` for changed IDs, or let tracked `configurationUpdateHandler`s read observable models so visible cells update themselves.
- With tracked handlers, look the model up by ID on each run. Capturing the model object in the closure keeps a stale reference after the item is replaced.
- Details: [uikit-lists.md](uikit-lists.md), streaming feeds: [uikit-live-lists.md](uikit-live-lists.md).

## Tasks on the main actor

`UIView`, `UIViewController`, `UIApplication` and most UIKit protocols (including delegate protocols) are `@MainActor`; Swift 6 enforces at compile time what used to be a runtime rule.

```swift
private var loadTask: Task<Void, Never>?

override func viewIsAppearing(_ animated: Bool) {
    super.viewIsAppearing(animated)
    guard loadTask == nil else { return }
    loadTask = Task { [weak self] in await self?.load() }
}
override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    loadTask?.cancel(); loadTask = nil
}
private func load() async {
    do {
        let page = try await service.firstPage()   // runs on the service's actor
        try Task.checkCancellation()
        apply(page)                                 // back on main
    } catch is CancellationError {
    } catch { showError(error) }
}
```

- `Task {}` created in a view controller inherits the main actor. Awaiting another actor suspends and resumes on main; no `DispatchQueue.main.async` or `MainActor.run` needed.
- A task is not tied to the controller's lifetime: it runs to completion and keeps its captures alive. Store it and cancel it when the result is no longer wanted.
- `[weak self]` for tasks that may outlive the screen (network, streams). A short must-finish task (saving a draft) may capture strongly.
- Check cancellation after every suspension that precedes UI work.
- Cancel from `viewDidDisappear` or explicit teardown. `deinit` of a main-actor class is nonisolated unless `isolated deinit` (Swift 6.2+); do not touch views there.

## Moving work off main

`async` does not mean background. An `async` method on a main-actor class runs on main between suspensions; heavy parsing or sorting inside a `@MainActor` model blocks scrolling.

- Put CPU work in an `actor` (`ImageCache`, `Database`) or a non-main-isolated type.
- Or mark the function `@concurrent` (Swift 6.2+). Under approachable-concurrency settings a `nonisolated async` function runs on the caller's actor unless `@concurrent`.
- Check the project's Swift version, upcoming-feature flags and the "Default Actor Isolation" build setting (it can make every type `@MainActor`) before relying on either rule.
- `Task.detached` rarely, only to deliberately drop actor and priority.
- Cross the boundary with `Sendable` values: IDs, structs, `Data`, immutable final classes. `UIImage` is `Sendable`. Never send views or mutable model classes.

## Streams, callbacks, per-cell tasks

```swift
streamTask = Task { [weak self] in
    guard let batches = self?.service.updateBatches() else { return }  // AsyncStream<[Change]>
    for await batch in batches {
        guard let self else { return }      // re-check per element
        self.applyChanges(batch)            // one snapshot apply per batch
    }
}
```

- Batch in the producer: yield every 50-100 ms or every N items. One apply per batch keeps main free for scrolling.
- Callbacks from other frameworks can arrive on any queue. If unannotated, hop with `Task { @MainActor in ... }` or mark the closure `@MainActor`. Wrap one-shot callback APIs with `withCheckedContinuation` once, in the service layer.
- Prefer `@preconcurrency import` for unannotated modules over `@unchecked Sendable` on your own types.
- `nonisolated` on a main-actor class method makes it callable anywhere but it cannot touch views.
- Per-cell: one task stored on the cell, cancelled in `prepareForReuse()`. After the await, check `Task.isCancelled` and that the cell still shows the same identifier. Never start a new task per configuration pass without cancelling the previous one; they pile up during fast scrolling.
- Timers: a `Timer` in the default run loop mode stops while the user scrolls. Use `.common` mode or `Task.sleep(for:)`; for per-frame display-tied work use `UIUpdateLink` (iOS 18) instead of `CADisplayLink`.

## Hangs and crashes

- `DispatchQueue.main.sync` from main deadlocks.
- Semaphores or `DispatchGroup.wait()` to make async code synchronous on main freeze the UI and can deadlock with the main actor.
- Views touched off main: Main Thread Checker catches it in Debug; complete strict concurrency checking catches most at compile time. Use complete checking in new code.
- `Data(contentsOf:)` or synchronous reads of network URLs or large files on main.
- `Thread.sleep` or busy-waiting on main.

## Objective-C notes

- **Observation tracking is Swift-only.** It tracks Swift `@Observable` reads; Objective-C, KVO-compliant or `NSObject` properties register nothing, and no header lets you opt in. Call `-setNeedsUpdateProperties` (iOS 26+, guard with `if (@available(iOS 26.0, *))`) or `-setNeedsUpdateConfiguration` yourself when state changes, and keep a pre-26 fallback. Trait tracking does work from Objective-C because it lives in UIKit's update cycle.
- `-updateProperties` is `NS_REQUIRES_SUPER`. Option name: `UIViewAnimationOptionFlushUpdates`.
- **KVO**: register and remove in matching places (the model setter plus `dealloc`), use a static `context`, forward unknown contexts to super. Unbalanced observers crash when the observed object deallocates. From the callback only `dispatch_async` to main and call `-setNeedsUpdateProperties`; set labels in `-updateProperties`, not the callback. Prefer a delegate or block when the model is not already KVO-compliant.
- **Main thread**: hop with `dispatch_async(dispatch_get_main_queue(), ...)`, once, at the boundary where the callback arrives. `dispatch_sync` to main from main (or to any queue you are on) deadlocks. Assert with `dispatch_assert_queue(dispatch_get_main_queue())`.
- **Cancellation**: store the `NSURLSessionTask`, `NSOperation` or `dispatch_block_create` block and cancel in `viewDidDisappear:` / `-prepareForReuse`. A cancelled `NSURLSessionTask` completes with `NSURLErrorCancelled`; do not show it as an error.
- **weakSelf/strongSelf**: a stored block using `self` or an ivar (`self->_ivar`) retains `self`. Stored owners: `copy` block properties, registration handlers, diffable cell providers, `UIAction` handlers, `configurationUpdateHandler`, notification block observers, `CADisplayLink`, repeating `NSTimer`. Use `__weak typeof(self) weakSelf`, then a strong local and a nil check; never `weakSelf->_ivar`. One-shot unstored blocks (`dispatch_async`, `animateWithDuration:`) may capture strongly.
- **Observers and timers**: store the token from `-addObserverForName:object:queue:usingBlock:` and remove it. `NSTimer` retains its target; use the block form with `weakSelf`, add it in common mode for UI, and `invalidate`. `performSelector:withObject:afterDelay:` retains its target; cancel with `+cancelPreviousPerformRequestsWithTarget:selector:object:` or prefer a block.
- **Property attributes**: block properties and `NSString`/`NSArray`/`NSDictionary`/`NSSet`/`NSData` properties are `copy`; delegates are `weak`; UI properties `nonatomic` (`atomic` protects only the accessor). Annotate nullability (`NS_ASSUME_NONNULL_BEGIN/END`) and use lightweight generics.
- **Off main**: global or private serial queues (`dispatch_queue_create`) to confine mutable state; `NSOperationQueue` when you need cancellation, dependencies or limits. Pass immutable values across queues.
- **Swift interop of your headers**: `NS_SWIFT_UI_ACTOR` on UI classes and protocols (Swift then sees them as main-actor isolated); `NS_SWIFT_NONISOLATED` on members safe from any thread; `NS_SWIFT_SENDABLE` on immutable data classes. A single-shot completion handler with trailing `NSError *` imports as `async throws`; add `NS_SWIFT_DISABLE_ASYNC` if it can fire more than once. Document the completion queue in the header.
- Swift concurrency cannot be used from `.m` files: wrap async Swift in an `@objc` class that offers completion-handler methods.

## Review checklist

1. One source of truth; views read state at update time, no cached copies.
2. Observable reads inside tracked methods; iOS 18 targets set `UIObservationTrackingEnabled` or keep an explicit path; Objective-C state calls `setNeedsUpdateProperties` itself.
3. Property sets in `updateProperties()` (iOS 26+), geometry in `layoutSubviews()`.
4. Updates funnel through one main-actor method; streams applied in batches.
5. CPU work in actors or `@concurrent` functions, not in `@MainActor` models.
6. Tasks (and ObjC requests, observers, timers) stored and cancelled; weak captures for long-lived work; cancellation checked before UI updates.
7. No `main.sync`, semaphores, `Thread.sleep` or synchronous I/O on main; UI timers in common mode.

## Relationship to other skills

- `swiftui` (swift-concurrency) owns language-level actor, isolation and `Sendable` doctrine; this file covers only how it lands in UIKit.
- [uikit-lists.md](uikit-lists.md) and [uikit-live-lists.md](uikit-live-lists.md) own snapshot, reconfigure and streaming-feed mechanics.
- [uikit-deprecated-apis.md](uikit-deprecated-apis.md) and [uikit-ios27-sdk.md](uikit-ios27-sdk.md) cover version-gated replacements.
