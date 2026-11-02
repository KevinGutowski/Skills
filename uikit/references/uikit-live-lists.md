# UIKit Live Lists: Updates, Scroll Position, Pinning, Prepending, Jump, Performance

*Scope: Changing a UIKit list while the reader watches it: live items arriving, older pages loading above without the view moving, staying pinned to the bottom (chat, logs) or top (feeds), jumping to an item, keeping place across text size, rotation and keyboard changes, and keeping the list hitch-free. Includes the benchmark-measured recipe for long lists that stream at both ends. Triggers: chat list, message list, log view, timeline, feed, infinite scroll, load older, prepend, jump to message, scroll position lost, list jumps or drifts, pinned to bottom, performBatchUpdates, reconfigureItems, targetContentOffset, scroll hitches, prefetching, image decoding.*

*Source: Fernando Olivares, uikit-skill (MIT), skills uikit-list, uikit-chat-list, uikit-specialist (updates and scrolling, list performance), uikit-specialist-slim, and the docs uikit-chat-list-sources, v0.9-adversarial-review and thinning-plan, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- Choose the path
- Default path: diffable data source
- Measured recipe: long lists that stream at both ends
- Caveats from the adversarial review
- Performance
- Verification and test hygiene
- Objective-C notes
- Relationship to other skills

## Choose the path

| List | Path |
|---|---|
| Ordinary list: settings, inbox, catalog, occasional inserts, a page appended at the end | Default path: diffable data source + compositional or list layout, estimated sizes, anchor-restore on prepend |
| Long list that streams at one or both ends (chat, logs, live feed, comment thread), where position must hold within a point through prepends, trims, jumps and text size changes | Measured recipe: `UICollectionView` + your own `UICollectionViewLayout` + saved heights + batch updates |

The two paths do not mix. Never call `performBatchUpdates`, `insertItems(at:)` or `reloadData()` on a collection view that has a diffable data source; the data source owns the updates. The measured recipe uses a plain `UICollectionViewDataSource` keyed by stable ids. Cell and layout setup for the default path is in [uikit-lists.md](uikit-lists.md).

Never flip the list upside down with a transform for chat (`scaleX: 1, y: -1` plus each cell flipped back). It breaks VoiceOver order, context menu previews, scroll indicators, the keyboard dismiss gesture and accessibility scrolling. Keep natural order and anchor.

## Default path: diffable data source

### Choose the update

| Change | Do |
|---|---|
| Content changed, same identity | `snapshot.reconfigureItems(ids)`, then apply |
| The item's cell type changed | `snapshot.reloadItems(ids)` |
| Added, removed, moved | edit the current snapshot; animate only if the user caused it |
| Everything replaced (new account, query) | apply without animation, or `applySnapshotUsingReloadData(_:)` |
| A cell's own height changed | `invalidateIntrinsicContentSize()` in the cell (needs `selfSizingInvalidation` `.enabled`, the iOS 16+ default, or `.enabledIncludingConstraints`), or reconfigure |
| Purely visual effect on a visible cell (a pulse) | change that cell via `cellForItem(at:)`; leave the snapshot alone |

`reloadData()` for a small change is wrong: it reconfigures every visible cell and flashes. Identifiers are small, stable ids, not models.

### Coalesce bursts

Changes that arrive many per second (socket, sync) go into a pending buffer flushed as one snapshot per short interval (50-100 ms) or per frame. Each apply diffs the whole snapshot, and each animated apply starts animations the next one interrupts. Do not animate changes far from the viewport or during a fast scroll. Apply the user's own changes at once.

### Prepend without moving: anchor on a visible item

Never add the content-size delta to the offset: with estimated sizes the content size keeps changing as cells are measured, so the sum drifts. Anchor on the first visible item's id and its distance from the visible top, in one main-actor turn, no animation:

```swift
@MainActor
func prepend(_ olderIDs: [ItemID]) async {
    let visibleTop = collectionView.contentOffset.y + collectionView.adjustedContentInset.top
    let anchor = collectionView.indexPathsForVisibleItems.sorted().lazy
        .compactMap { ip -> (ItemID, CGFloat)? in
            guard let a = self.collectionView.layoutAttributesForItem(at: ip),
                  a.frame.minY >= visibleTop,
                  let id = self.dataSource.itemIdentifier(for: ip) else { return nil }
            return (id, a.frame.minY - visibleTop)
        }.first
    var snapshot = dataSource.snapshot()
    if let first = snapshot.itemIdentifiers.first { snapshot.insertItems(olderIDs, beforeItem: first) }
    else { snapshot.appendItems(olderIDs) }
    await dataSource.apply(snapshot, animatingDifferences: false)
    guard let (id, distance) = anchor, let ip = dataSource.indexPath(for: id) else { return }
    collectionView.layoutIfNeeded()
    guard let a = collectionView.layoutAttributesForItem(at: ip) else { return }
    collectionView.setContentOffset(
        CGPoint(x: 0, y: a.frame.minY - distance - collectionView.adjustedContentInset.top),
        animated: false)
}
```

- No suspension between apply and restore other than the apply itself, so no frame draws in the moved state.
- `setContentOffset` stops a drag or deceleration (`isDragging`, `isDecelerating`): queue the prepend until the scroll ends, or load earlier so it lands while the reader is still far from the top (first visible index within a screen of the start, or from prefetching).
- The same id + distance anchor restores position across rotation (save in `viewWillTransition(to:with:)`, restore in the coordinator's animation or completion), Dynamic Type changes and relaunch. Never persist a raw `contentOffset`.

### Pinned to the bottom

- Read "pinned" before the update; afterwards the content size has already changed. A typical test: visible bottom (`contentOffset.y + bounds.height - adjustedContentInset.bottom`) within ~24 pt of `contentSize.height`.
- Append, `await apply`, then `scrollToItem(at:at: .bottom, animated:)` only if it was pinned. Not pinned: show a "new messages" control instead of moving the reader.
- Re-pin after the keyboard appears, rotation, a text size change, and a cell growing (a reaction on the last row).
- First load of a long conversation: apply without animation, `layoutIfNeeded()`, scroll to the last item without animation, all in `viewIsAppearing(_:)` (never `viewDidLoad`; bounds are not final).

### Scrolling in code

- A far `scrollToItem` with estimated sizes lands off by the estimate error. Exact landing: scroll without animation, `layoutIfNeeded()`, scroll to the same item again.
- Await an animated `apply` before `scrollToItem` for an item it inserted.
- Code-driven offset changes do not call `scrollViewWillBeginDragging(_:)`; do not detect your own scrolls through delegate methods.
- `scrollViewDidScroll(_:)` runs every frame: comparisons and cheap property sets only. No snapshot applies, no forced layout, no allocation. "Load more" fires once per threshold crossing behind an `isLoading` flag.
- iOS 26+: scroll edge effects (`topEdgeEffect`, `bottomEdgeEffect`, ... of type `UIScrollEdgeEffect`, `style` `.automatic`/`.soft`/`.hard`, `isHidden`). Leave them on under system bars; hide one only where the edge never meets a bar.

## Measured recipe: long lists that stream at both ends

The source author benchmarked agents building a chat list (live stream, load older, jump, text size, rotation, selectable text) and kept only rules that moved a measured result or removed a recurring failure. These rules say how to build it; they are not a list of things to test. Draw icons with SF Symbols; do not download or import image assets.

### Text and menus

1. **Edit menu: your actions first, then the system's.** From `textView(_:editMenuForTextIn:suggestedActions:)` return `UIMenu(children: [custom] + suggestedActions)`. Appended items land on the second menu page on iPhone; a menu without `suggestedActions` loses Copy. No long-press recognizer over the text; the row's context menu returns nil over the text. Copy is the system's item: if the menu lists it, it works.
2. **Read-only row text is TextKit 1:** `UITextView(usingTextLayoutManager: false)`. A default TextKit 2 view redoes viewport layout and selection rects on every cell setup.

### The list

3. **A `UICollectionView` with your own `UICollectionViewLayout`, one section, rows keyed by the item's stable id;** on the collection view, `selfSizingInvalidation = .disabled` and `isPrefetchingEnabled = false` (scoped below). The layout keeps row tops from saved heights, snapped to the pixel grid by rounding the running position with `traitCollection.displayScale`. An append adds frames; a changed height shifts only the tops below it; never recompute every top or empty the attribute cache for one change. (The full v0.10 layout also cached attributes in `prepare()`, binary-searched sorted tops in `layoutAttributesForElements(in:)`, and invalidated on bounds change only when the width changes.)
4. **Measure each row once** and keep the height by item id and width, for the current text size; self-sizing rows lose the position and drift. Measure with an `NSLayoutManager` the exact attributed string the cell shows, at the content's inner width, rounded up to the pixel (not the point). A row without text measures its fixed parts the same way. When a page arrives next to existing rows, drop the neighbouring row's height too (it gains a neighbour, so its spacing changes).
5. **Nothing per row that most rows do not show:** no formatters, regexes, images, paragraph styles or subviews created in configure or in the measurer; every cache capped; no `adjustsFontSizeToFitWidth` on a label updated often; no `draw(_:)` in cells (a drawn view keeps a bitmap its size).

### Updates

6. **Live changes:** queue each arrival and flush on a 0.1 s timer; changes the user makes apply at once. The flush is one `performBatchUpdates` inside `UIView.performWithoutAnimation`, data changed in the same closure: `insertItems` for new ids, `reconfigureItems` for changed ones; never `reloadData` or a new snapshot per item. If the list is anchored to an end (bottom of a chat or log, top of a feed), keep "pinned" as state: set it when the reader reaches that end, clear it only when the reader drags away, and never work it out again from the offset after a batch. While pinned, the layout's target offset is that end, so a flush that also trims stays there without a second offset fix.
7. **Trim rarely, in the same batch:** let the window run a page past its limit before trimming back, so most arrivals are plain appends. In one batch, deletes use old positions and inserts use positions after the deletes: trimming `k` rows from the front while appending inserts at `oldCount - k`. `reconfigureItems` asks for the cell at once, at the position given: reconfigure in a batch of its own before one that trims.
8. **A page loaded before the first visible row:** insert it without animation in `performBatchUpdates`, measuring only the new page. The layout's `targetContentOffset(forProposedContentOffset:)` returns the pinned end while pinned and otherwise keeps the first visible row where it was. It runs only inside batch updates, never after `reloadData` or a plain invalidation. Never add the inserted heights to the offset. The top row counts only once its visible content is below the top edge: ignore transparent margin and sub-point rounding remainders (small tolerance). Use the same test to capture the anchor and to read the top row after restoring, so a re-layout never names the row above.
9. **Jump to an item:** replace the window with a small one around the target (about 10 rows before, 30 after; measuring is the jump's cost), `reloadData`, set the offset at once from the target's top computed from your height store (the numbers `prepare()` will use) rounded to the pixel, then one `layoutIfNeeded`. No animation. Do not read `layoutAttributesForItem(at:)` right after `reloadData`; the layout has not prepared and may return the old window's geometry.

### Build and launch

10. Start making the data on a background queue in the app's first line, before `UIApplicationMain`, and build the screen while it runs (no placeholder controller swapped in later); check a guessed width against the real one.
11. The app target's Release build strips: `DEPLOYMENT_POSTPROCESSING`, `STRIP_INSTALLED_PRODUCT`, `STRIP_STYLE = all`, `DEAD_CODE_STRIPPING`. App target only: `STRIP_STYLE = all` is wrong for a framework or extension that exports symbols.

Also measured (cut from the final recipe for length, still true): never flush layout (`layoutIfNeeded`, reading row frames) from `scrollViewDidScroll`, cell provisioning or invalidation callbacks; a flush there re-enters the collection view's own layout pass and asserts ("Avoid flushing layout before returning the view").

### Evidence (iPhone 17 simulator, iOS 26.4, unpolled, median of 3 unless noted)

- Shrink-to-fit label on a busy row: stream cost 7.8 s to 31 s.
- TextKit 1 read-only text views: stream CPU 4.73 s to 3.53 s (about -25 %); peak memory also down.
- Self-sizing rows: table drifted up to 17 pt after a text size change (saved heights 0 pt); self-sizing collection was about as fast (47 vs 54.5 ms) but held the bottom pin after only 4 of 6 text size steps.
- Prepend by adding inserted heights to the offset: drifted 42 pt (the old first row changes height). Layout `targetContentOffset` anchor: 0 pt, 39-46 ms vs 59-62 ms for an id + offset restore (also 0 pt).
- `targetContentOffset(forProposedContentOffset:)` probe: 0 calls after invalidate + `layoutIfNeeded` and after `reloadData`; 1 call inside `performBatchUpdates`.
- Flush: one batch per message 6.49 s stream CPU vs 0.1 s timer 4.92 s. Trim + append in one correctly indexed batch: no assertion over 170 trims, CPU -16 %, cells configured 678 vs 1,550.
- Jump: window 81 to 41 rows cut the jump 49 to 33 ms; setting the offset right after `reloadData` 65 to 33-44 ms; lands within 0.2 pt. Measuring is 50-60 % of jump and text-size time.
- Pixel snapping: fractional row edges left a 0.12 pt sliver, so the next text size step named row 2,499 instead of 2,500; snapped edges fixed it 3 of 3.
- Batched inserts + reconfigure instead of rebuilding every row: stream 9.7 to 7.4 s and 15.5 to 9.6 s in two builds. Release strip: app 1.34 to 0.84 MB.

## Caveats from the adversarial review

The recipe was tuned against one scorer. The review scoped these rules for real apps:

- **Timer latency (H1).** A trailing 0.1 s timer delays every change up to 100 ms (6-12 frames), even one message on an idle list; at normal chat rates it groups nothing. Measured trade-off at 20 msg/s: timer latency median 66 ms (p95 103) vs next-main-queue-turn 7.5 ms, but next-turn costs +27 % CPU. Always apply the user's own sends, typing indicator and reactions at once. A leading-edge flush (apply immediately when idle, at most once per frame while busy, via `CADisplayLink`/`UIUpdateLink`) is the suggested middle ground; measure if it matters.
- **Prefetching off (H3)** is scoped, not universal. `isPrefetchingEnabled = false` also stops `prefetchDataSource` calls, so an app prefetching avatars or thumbnails loses that silently. The measured gain was a peak-memory change inside noise (49.2 to 47.0 MB); a programmatic fling showed equal hitches. Turn it off only for a text-only list with no `prefetchDataSource`, and measure finger flings through history.
- **Explicit offset after invalidation (H4).** `targetContentOffset(forProposedContentOffset:)` is documented for "transition or update animations" only. For text size, rotation and other re-layouts: capture the anchor, invalidate, one `layoutIfNeeded` (outside the list's callbacks), then set the anchored offset explicitly without animation. Or wrap the change in `performBatchUpdates(nil)` inside `performWithoutAnimation`, which is an update. Implementing the override too is harmless.
- **Keyboard and insets (H5).** Inset changes do not change bounds, so the layout never sees them. Pin the composer to `view.keyboardLayoutGuide`, set the list's bottom inset from the composer frame in `viewDidLayoutSubviews`, read pinned + anchor before the inset change and restore after (or alongside the keyboard animation). Same when the composer grows. `keyboardDismissMode = .interactive` must not re-pin per frame.
- **All text-metric traits (H6).** Stored attributed strings hold concrete `UIFont`s. Key strings and heights by id; rebuild both on content size category, `legibilityWeight` (Bold Text), `displayScale` and width changes (register for each with `registerForTraitChanges`). Set `adjustsFontForContentSizeCategory = false` on row text views so fonts come only from the stored string. `displayScale` changes re-snap every top.
- **TextKit 1 only for read-only text (M1).** Keep TextKit 2 for the composer and anything editable (Writing Tools gets only its limited panel in TextKit 1). Never read `.layoutManager` on a TextKit 2 view: it silently falls back to TextKit 1 with a console warning.
- **Sections and deletes (M6, M8).** "One section" means never one per message; one section per day with date headers is fine. A user deleting their own message may animate the row, as long as you supply the final offset.
- **Heights cache (L3).** Key by width and keep the last two widths, so live resize and rotate-and-back do not re-measure everything.
- **Right-to-left (M4).** A custom layout does not mirror unless `flipsHorizontallyInOppositeLayoutDirection` returns true; lay out in leading/trailing terms and use `.natural` alignment.
- **VoiceOver (M5).** Row actions via `accessibilityCustomActions`; announce new messages while pinned (`UIAccessibility.post(notification: .announcement, ...)`); `reloadData` trims and jumps drop focus.
- **Media rows (M7).** Height from width/height metadata, stored like text height; thumbnails decoded at display size into a capped cache; an async size change goes through the same anchor and pin path as an edit.
- **Growing rows (L4).** A streamed reply re-measured whole per chunk is quadratic: re-measure the tail, throttle per frame, shift only the tops below.

## Performance

Frame budget is about 8 ms at 120 Hz, 16 ms at 60 Hz. Time goes to cell configuration, Auto Layout, text layout, image decoding and offscreen rendering.

- **Configuration is a lookup plus property sets.** Models decoded once into a store; formatters reused (or `formatted()`); attributed strings built once per model change, cached by id and size category.
- **Images:** decode and downscale off main with `byPreparingThumbnail(ofSize:)` (or `byPreparingForDisplay()` at full size); sync and completion-handler forms exist for background queues. Sizes are pixels: points x `traitCollection.displayScale`, never `UIScreen.main.scale`. For big files on disk, `CGImageSourceCreateThumbnailAtIndex` with `kCGImageSourceThumbnailMaxPixelSize`. Cache decoded images in an `NSCache` with `totalCostLimit` in pixel bytes. On arrival, check the cell still represents the same id; cancel in `prepareForReuse()`; or reconfigure the id. SF Symbols and asset-catalog images need no preparation.
- **Prefetching** (`UICollectionViewDataSourcePrefetching`) is a hint; cells must work when data is not ready. Cancel in `cancelPrefetchingForItemsAt`. It can drive paging.
- **Layout:** few views and constraints per cell; change constants, not constraints, never in `layoutSubviews`; fix every unsatisfiable-constraint log; no `layoutIfNeeded()` in loops.
- **Rendering:** `masksToBounds` over changing content forces offscreen passes; set `shadowPath`; avoid group opacity (`alpha < 1` on containers), blur per cell, and `shouldRasterize` on changing cells. Draw with `UIGraphicsImageRenderer`.
- **Frame work:** `UIUpdateLink` (iOS 18+) over `CADisplayLink`; a `Timer` in default mode stops while scrolling, so add it in `.common` mode or use `Task.sleep(for:)`.

## Verification and test hygiene

- Measure on a device with a Release build; the simulator and Debug mislead. Instruments: Animation Hitches first, then Time Profiler (main thread, inverted, system hidden), Allocations/Leaks (growth while scrolling over the same content means a cache or reuse bug), Swift Concurrency. `OSSignposter` intervals around your phases.
- XCTest hitch test: `measure(metrics: [XCTOSSignpostMetric.scrollingAndDecelerationMetric]) { list.swipeUp(velocity: .fast) }`; fixed device and data, compare medians. Also the Organizer's hang and hitch metrics, Main Thread Checker, `-UIViewLayoutFeedbackLoopDebuggingThreshold`.
- Measure with nothing polling the app: XCUITest `waitForExistence` snapshots accessibility and made a table view's stream cost 30.7 s against about 6.8 s unpolled.
- Check each behaviour once the screen works, then rerun only failed tests by name (`-only-testing:`), not the whole target. Pass `-test-timeouts-enabled YES -default-test-execution-time-allowance 60` to `xcodebuild test` so a test stuck on a system prompt fails in a minute.
- Never read `UIPasteboard` from a UI test: it waits on the paste prompt nobody answers (one benchmark run hung about 600 s on it). If the menu lists Copy, Copy works.
- Close any simulator you started.

## Objective-C notes

- Selectors: `textView:editMenuForTextInRange:suggestedActions:` (iOS 16, works everywhere; the iOS 26 `...InRanges:` variant falls back to it with the union range), `targetContentOffsetForProposedContentOffset:`, `reconfigureItemsAtIndexPaths:`, `shouldInvalidateLayoutForBoundsChange:`, `viewWillTransitionToSize:withTransitionCoordinator:`.
- TextKit 1 text view: `[UITextView textViewUsingTextLayoutManager:NO]`.
- Capture `__weak typeof(self) weakSelf` in flush timers and batch-update completion blocks; the data change still goes inside the `performBatchUpdates:` block.

## Relationship to other skills

- [uikit-lists.md](uikit-lists.md): cell registration, configurations, compositional and list layouts, self-sizing basics.
- [uikit-text-and-interaction.md](uikit-text-and-interaction.md): selectable text, edit menus and context menus in depth.
- [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md): main-actor updates and tasks feeding the list; `swiftui` (`swift-concurrency`) for the language rules.
- [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md): keyboard layout guide, insets, size transitions.
- SwiftUI counterpart: `swiftui` (`swiftui-lazy-stacks`) for lazy stacks, `scrollPosition` and scroll hitches.
- `apple-design` (`hig`) for when list changes should animate; UIKit animation APIs in [uikit-text-and-interaction.md](uikit-text-and-interaction.md).
