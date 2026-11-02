# UIKit Text, Menus, Interactions, Accessibility & Animation

*Scope: UIKit implementation specifics for selectable and editable text, TextKit 2, edit and context menus, link handling, swipes, drag and drop, pointer, keyboard, haptics, VoiceOver and accessibility settings, property animators, layout animation, symbol effects, custom transitions and Reduce Motion. Use when writing or reviewing UIKit code that shows text, attaches menus or gestures, exposes custom views to assistive technology, or animates views. Triggers: UITextView, UILabel selection, editMenuForTextInRanges, UIEditMenuInteraction, UIMenuController, UIContextMenuInteraction, primaryActionFor, TextKit 2, layoutManager, UIViewPropertyAnimator, layoutIfNeeded animation, flushUpdates, addSymbolEffect, accessibilityCustomActions, isReduceMotionEnabled.*

*Source: Fernando Olivares, uikit-skill (MIT), uikit-specialist and uikit-specialist-objc references (text, interactions, accessibility, animation), uikit-specialist-slim SKILL.md (selectable text, edit menu and link rows), uikit-list SKILL.md rules 1-2, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- Dynamic Type and labels (UIKit specifics)
- Selectable text
- Edit menus
- Links and text items
- Editing and TextKit 2
- Localization
- Context menus, swipes and buttons
- Drag and drop, pointer, keyboard, gestures, haptics
- Accessibility
- Animation
- Objective-C notes
- Review checklist
- Relationship to other skills

## Dynamic Type and labels (UIKit specifics)

Text-style fonts, `UIFontMetrics` scaling and the base code live in `apple-design` (`apple-typography`). UIKit gotchas beyond that:

- `adjustsFontForContentSizeCategory = true` updates live on `UILabel`, `UITextField`, `UITextView` and button configurations whose fonts come from text styles. Fonts inside attributed strings do not update; rebuild the string when `UITraitPreferredContentSizeCategory` changes.
- Bold variant that keeps the scaled size: text-style font's descriptor `withSymbolicTraits(.traitBold)`, then `UIFont(descriptor:size: 0)`.
- Symbols beside text: `preferredSymbolConfiguration = UIImage.SymbolConfiguration(textStyle: .body)`. Spacing beside text: `UIFontMetrics(forTextStyle:).scaledValue(for:)`.
- `maximumContentSizeCategory` (iOS 15+) caps growth only where layout truly cannot grow. Never on body text.
- At `preferredContentSizeCategory.isAccessibilityCategory`, switch horizontal rows to vertical stacks. No fixed heights on text containers.
- `UILabel.showsExpansionTextWhenTruncated` feeds the large content viewer. Custom bar-like controls adopt `UILargeContentViewerInteraction` with `showsLargeContentViewer`, `largeContentTitle`, `largeContentImage`.
- `adjustsFontSizeToFitWidth` shrinks below the user's size: only for short labels (numeric displays) with a `minimumScaleFactor`, and never on a label updated often in a list.

## Selectable text

`UILabel` cannot select text. Use a non-editable `UITextView`; selection fails silently if any of these is missing:

```swift
let textView = UITextView(usingTextLayoutManager: false) // TextKit 1 for read-only list rows; see below
textView.isEditable = false
textView.isSelectable = true          // the default, but set it
textView.isScrollEnabled = false      // intrinsic size; required in self-sizing cells
textView.textContainerInset = .zero
textView.textContainer.lineFragmentPadding = 0   // lines up with neighbouring labels
textView.backgroundColor = .clear
textView.font = .preferredFont(forTextStyle: .body)
textView.adjustsFontForContentSizeCategory = true
textView.delegate = self              // needed for the edit menu and link methods
```

- **Read-only row text is TextKit 1.** In long lists build it with `UITextView(usingTextLayoutManager: false)`: a default TextKit 2 view redoes viewport layout and selection rects on every cell setup. Choosing TextKit 1 at init is fine; the TextKit 2 hazard below is about falling back by accident. Benchmark evidence in [uikit-live-lists.md](uikit-live-lists.md).
- **Selection competes with long press.** A gesture recognizer on the cell or an overlay eats the touches; a `UIContextMenuInteraction` on the whole cell also uses long press. Decide which wins: the cell menu offers "Copy" and "Select Text", or the row's context menu returns nil when the point is over the text. Never add a long-press recognizer over text.
- Never set `isUserInteractionEnabled = false` on the text view or any `contentView` ancestor.
- Verify by long-pressing text on a device; the simulator hides the conflict.
- If only whole-message copy is needed, skip the text view: a context menu action writing to `UIPasteboard.general` is cheaper. In UI tests, never read `UIPasteboard`; it waits on the paste prompt.
- A text view costs more than a label. In very long lists, measure; an alternative is a label that swaps to a text view when selection begins.

## Edit menus

- **Your actions first, then the system's:** return `UIMenu(children: [custom] + suggestedActions)`. Appended items land on the second page on iPhone. A menu that drops `suggestedActions` loses Copy. Return `nil` for the default menu.
- iOS 26 SDK: implement `textView(_:editMenuForTextInRanges:suggestedActions:)`, which receives every selected range as `[NSValue]` (selections can be discontiguous). The single-range `textView(_:editMenuForTextIn:suggestedActions:)` is marked to be deprecated; UIKit calls it with the union of the ranges when the new method is missing. Keep both if you also build with older SDKs (they reject the new method as unknown).
- `UIMenuController` is deprecated. Text views use the delegate methods above; custom views use `UIEditMenuInteraction` (iOS 16+).

```swift
func textView(_ textView: UITextView, editMenuForTextInRanges ranges: [NSValue],
              suggestedActions: [UIMenuElement]) -> UIMenu? {
    let quote = UIAction(title: String(localized: "Quote"), image: UIImage(systemName: "quote.opening")) { [weak self] _ in
        self?.quote(ranges.map(\.rangeValue))
    }
    return UIMenu(children: [quote] + suggestedActions)
}
```

Custom views: `let menu = UIEditMenuInteraction(delegate: self)`, `view.addInteraction(menu)`, then `menu.presentEditMenu(with: UIEditMenuConfiguration(identifier: nil, sourcePoint: point))`, and build the menu in `editMenuInteraction(_:menuFor:suggestedActions:)`. Standard commands (copy, paste, select all) come from the responder chain: override `canPerformAction(_:withSender:)` and implement `copy(_:)`.

## Links and text items

- iOS 17+: `textView(_:primaryActionFor:defaultAction:)` handles taps and `textView(_:menuConfigurationFor:defaultMenu:)` handles menus on links, attachments and custom tagged ranges. The `shouldInteractWith` URL and attachment delegate methods are deprecated.
- Tag custom ranges with `.textItemTag` in the attributed string, then match `UITextItem.Content.tag(_:)` in those methods.
- `dataDetectorTypes = [.link]` on a non-editable text view.

## Editing and TextKit 2

- Set `textContentType`, `keyboardType`, `autocapitalizationType`, `returnKeyType`, `autocorrectionType` on every field; they drive AutoFill and the keyboard. Return: `addAction(_:for: .editingDidEndOnExit)` or the delegate.
- Validate in the delegate's change methods, not by observing `textDidChangeNotification` and rewriting `text`. Never change `text` while `markedTextRange` is non-nil (breaks input methods).
- Find: `isFindInteractionEnabled = true` (iOS 16+).
- Writing Tools (iOS 18+): `writingToolsBehavior` (`.default`, `.complete`, `.limited`, `.none`), `allowedWritingToolsResultOptions`. While `isWritingToolsActive`, do not rewrite text from code; wait for the delegate's end callback.
- TextKit 2 is the default since iOS 16. Reading `textView.layoutManager` (or `textContainer.layoutManager`) permanently switches that view to TextKit 1 compatibility mode. Use `textLayoutManager` and `NSTextContentStorage`; query layout with `enumerateTextLayoutFragments(from:options:using:)` and `textViewportLayoutController`.
- TextKit 2 ranges are `NSTextRange` over `NSTextLocation`; convert from `NSRange` through the content manager, not by integer math.

## Localization

- `String(localized:)` and string catalogs for every visible string, including accessibility labels; add `comment:` when meaning is unclear.
- One string with arguments, never concatenation: `String(localized: "\(count) messages")` with plural variants in the catalog.
- Format numbers, dates, measurements, names and lists with format styles (`formatted()`).
- Leading/trailing everywhere; `semanticContentAttribute = .forceLeftToRight` only for views that must not mirror (media controls). Use `forward`/`backward` symbol names so they mirror. Test double-length and right-to-left pseudolanguages.

## Context menus, swipes and buttons

- Collection views: use the multi-item delegate `collectionView(_:contextMenuConfigurationForItemsAt:point:)` (iOS 16+). **Capture identifiers, never index paths**; the list can change while the menu is open. Resolve `dataSource.itemIdentifier(for:)` once, before building actions.
- Build lazily in the action provider; `UIDeferredMenuElement` for async items, `.uncached` to reload each time.
- Preview shape: `collectionView(_:contextMenuConfiguration:highlightPreviewForItemAt:)` and `...dismissalPreviewForItemAt:` returning `UITargetedPreview` with `UIPreviewParameters.visiblePath` for rounded or bubble cells.
- Non-cell views: `UIContextMenuInteraction`. The same menu serves secondary click and Mac right-click.
- `UIMenu.Options`: `.displayInline`, `.singleSelection`, `.displayAsPalette`; `.keepsMenuPresented` attribute keeps the menu open after a toggle.
- Buttons: `UIButton(configuration:primaryAction:)`, `menu` + `showsMenuAsPrimaryAction = true`; `changesSelectionAsPrimaryAction = true` for a pop-up picker. `UIBarButtonItem(title:image:primaryAction:menu:)` with both shows the menu on long press. Pull-down menus replace action sheets for control-attached choices.
- Swipes in list layouts: `leading/trailingSwipeActionsConfigurationProvider` on `UICollectionLayoutListConfiguration`, resolve the item inside the provider, call the completion with `true`. **Every swipe action must also be in the context menu and in `accessibilityCustomActions`**; swipes are not discoverable.

## Drag and drop, pointer, keyboard, gestures, haptics

- Drag/drop: `dragDelegate`/`dropDelegate`; `dragInteractionEnabled = true` on iPhone (default on iPad). Reorder diffable lists with `reorderingHandlers`, not the drop delegate (see [uikit-lists.md](uikit-lists.md)). Load dropped data asynchronously (`loadObject(ofClass:)`, `loadFileRepresentation(forTypeIdentifier:)`); never block. Put the model in `UIDragItem.localObject` to skip serialization in-app. Do not assume a finger on screen in drag-begin methods; the system can start a drag without a direct touch (see [uikit-ios27-sdk.md](uikit-ios27-sdk.md)).
- Pointer: `UIPointerInteraction` + `UIPointerStyle` for custom views; `hoverStyle` (iOS 17+) for iPad pointer and visionOS hover; `UIToolTipInteraction` (iOS 15+).
- Keyboard: commands in `buildMenu(with:)` so they appear in the iPad shortcut overlay and Mac menu bar (title + discoverability title required). Per-screen: `keyCommands`. `wantsPriorityOverSystemBehavior` only when beating a text field default. `UIKeyCommand.inputEscape` dismisses sheets and popovers. Collection views: `allowsFocus = true`, `selectionFollowsFocus`.
- Gestures: resolve conflicts with `require(toFail:)` or `shouldRecognizeSimultaneouslyWith`, not delays. A long-press recognizer on a cell fights the context menu; use the menu. Hit targets at least 44x44 pt; grow with `point(inside:with:)`, not bigger art.
- Haptics: on iOS 17.5+ create generators with `init(view:)` and fire the `at:` variants (`impactOccurred(at:)`) so feedback works with pointer and other inputs. `prepare()` just before the event. Standard controls already play haptics; do not double them.

## Accessibility

- Labels: short phrase without the control type ("Delete", not "Delete button"). Image-only buttons and bar items always need one. Hints only when the result is not obvious. `accessibilityUserInputLabels` gives Voice Control short names.
- Traits: mark section titles `.header` for the rotor; `.toggleButton` (iOS 17+); `.adjustable` with `accessibilityIncrement()`/`accessibilityDecrement()` updating `accessibilityValue`.
- Cells that read as one thing: `isAccessibilityElement = true` with a composed label, set in the configuration path so reused cells never keep another item's label. iOS 17+: `accessibilityLabelBlock`/`accessibilityValueBlock` compute only when assistive tech asks, saving string building during scroll.
- `accessibilityCustomActions` for every meaningful swipe and menu action.
- Custom drawn controls: subclass `UIControl` and send actions. `accessibilityRespondsToUserInteraction` for non-obvious interactive elements.
- Order: `accessibilityElements` when visual order differs; `shouldGroupAccessibilityChildren`; `accessibilityContainerType` (`.list`, `.landmark`, `.semanticGroup`); `accessibilityViewIsModal = true` on full-screen custom overlays.
- Notifications: `.screenChanged` (with first element) after large changes without navigation; `.layoutChanged` for partial; `.announcement` sparingly; iOS 17+ `AttributedString` announcements can carry `accessibilitySpeechAnnouncementPriority`.
- Settings: Reduce Motion `UIAccessibility.isReduceMotionEnabled`; Reduce Transparency `isReduceTransparencyEnabled`; Increase Contrast `traitCollection.accessibilityContrast`; Bold Text `traitCollection.legibilityWeight` (custom fonts pick heavier); Button Shapes `UIAccessibility.buttonShapesEnabled` (replaced by `AXShowBordersEnabled` in iOS 26.1); `shouldDifferentiateWithoutColor`. Each has a `UIAccessibility` change notification; trait-based ones update through trait tracking. Design doctrine: `apple-design` (`apple-visual-accessibility`).
- Testing: `try app.performAccessibilityAudit()` (iOS 17+) in a UI test catches missing labels, small targets, contrast and clipped text.

## Animation

Spring parameter doctrine (duration + bounce values) lives in `swiftui` (`swiftui-animation`). UIKit specifics:

- APIs: `UIView.animate(springDuration:bounce:initialSpringVelocity:delay:options:animations:completion:)` (iOS 17+); `UISpringTimingParameters(duration:bounce:)` for animators; `UIView.transition(with:...)` + `.transitionCrossDissolve` to swap content; `UIUpdateLink` (iOS 18+) for per-frame work instead of `CADisplayLink`; zoom `preferredTransition` (iOS 18+, see [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md)).
- Drag handoff: `initialSpringVelocity` is relative to remaining distance: gesture points/second divided by distance left.
- **Layout animation:** change the constraint outside the block, call `layoutIfNeeded()` on the common ancestor inside it. Changing only `constant` in the block does not animate. iOS 26+: `.flushUpdates` option (and the animator's `flushUpdates` property) applies pending layout and observable model changes inside the animation, no explicit `layoutIfNeeded()`.
- **Property animators** for interruptible, scrubbable or gesture-driven motion: pause, set `fractionComplete` on `.changed`, then set `isReversed` and `continueAnimation(withTimingParameters: nil, durationFactor: 0)` on end. An animator runs once; make a new one or set `pausesOnCompletion = true`. Stop a conflicting one with `stopAnimation(false)` + `finishAnimation(at: .current)`. `scrubsLinearly`, `isManualHitTestingEnabled` tune scrubbing.
- **Model state:** set the end state when the animation starts, not in completion (completion may run with `finished == false`). `frame` during an animation is already the end value; on-screen value is `layer.presentation()`. Sequences: `animateKeyframes` or one animator with `addAnimations(_:delayFactor:)`, not nested completions.
- Lists: never wrap a snapshot `apply` in `UIView.animate`; pass `animatingDifferences`.
- **Symbol effects** (iOS 17+) on `UIImageView` and `UIBarButtonItem`: `addSymbolEffect(.bounce)`, `addSymbolEffect(.pulse, options: .repeating)`, `removeSymbolEffect(ofType:)`, `setSymbolImage(_:contentTransition: .replace)`. iOS 18 adds `.wiggle`, `.rotate`, `.breathe`. Prefer them to hand-made icon scaling; they respect accessibility settings. Symbol choice: `swiftui` (`sf-symbols`).
- **Custom transitions:** try zoom and standard styles first. Otherwise `UIViewControllerTransitioningDelegate` (present) or `UINavigationControllerDelegate` (push) returning `UIViewControllerAnimatedTransitioning`; return a property animator from `interruptibleAnimator(using:)`. Interactive: drive `UIPercentDrivenInteractiveTransition`, call `finish()`/`cancel()`, and always `completeTransition(!transitionContext.transitionWasCancelled)`. Use `snapshotView(afterScreenUpdates: false)` as cheap stand-ins.
- **Reduce Motion:** read `UIAccessibility.isReduceMotionEnabled`, observe `reduceMotionStatusDidChangeNotification`. Replace movement, zoom and parallax with fades; keep functional animation (progress). `UIAccessibility.prefersCrossFadeTransitions` asks for cross-fades in transitions. System navigation, sheets and symbol effects already adapt.
- Performance: animate `transform`/`alpha` rather than `frame` or constraints when only visual position changes; give animated shadows a `shadowPath`; no timer- or `scrollViewDidScroll(_:)`-driven writes to many views.

## Objective-C notes

- Selectors: `textView:editMenuForTextInRanges:suggestedActions:` (ranges are `NSArray<NSValue *>`), `textView:primaryActionForTextItem:defaultAction:`, `textView:menuConfigurationForTextItem:defaultMenu:`.
- Tagged ranges: `UITextItemTagAttributeName` (an `NSString` value); match `textItem.contentType == UITextItemContentTypeTag` and read `textItem.tagContent`.
- Menu, swipe-provider, accessibility-block and custom-action handlers are stored blocks: capture `__weak typeof(self) weakSelf` and item IDs, never `self` or the cell. One-shot `animateWithDuration:` blocks may use strong `self`.
- `fontWithName:size:` is `nullable`; keep a `?:` fallback. The property is `view.isAccessibilityElement`, not `view.accessibilityElement`.
- Reduce Motion: `UIAccessibilityIsReduceMotionEnabled()`, `UIAccessibilityPrefersCrossFadeTransitions()`; remove block observer tokens or selector observers in `dealloc`.
- Symbol effects are classes from the Symbols framework (`[NSSymbolBounceEffect effect]`); repeat with `optionsWithRepeatBehavior:` (`optionsWithRepeating` is deprecated); guard with `@available(iOS 17.0, *)` on lower targets. Animator completions take a `UIViewAnimatingPosition`; do not assume `End`.
- Strings: `NSLocalizedString` keys and comments must be literals (tooling extracts them); plurals via `localizedStringWithFormat:`. Cache `NSDateFormatter`/`NSNumberFormatter`/`NSListFormatter` instances. Hop to the main queue after async drop loads.

## Review checklist

1. Fonts from text styles with `adjustsFontForContentSizeCategory`; no fixed text heights; tested at the largest accessibility size.
2. Selectable text in a non-editable text view with insets zeroed, delegate set, no long press or disabled interaction over it; read-only list rows use TextKit 1.
3. Edit menu returns custom actions before `suggestedActions`; multi-range method implemented with the iOS 26 SDK; no `UIMenuController`.
4. Links handled by `primaryActionFor`/`menuConfigurationFor`, not `shouldInteractWith`.
5. No accidental `layoutManager` access on TextKit 2 views.
6. Menus capture identifiers; swipe actions mirrored in context menus and accessibility custom actions.
7. Constraint animations lay out the common ancestor (or `.flushUpdates` on iOS 26+); model updated at start; gesture-driven motion uses property animators; Reduce Motion handled.

## Relationship to other skills

- `uikit`: parent skill. Siblings: [uikit-live-lists.md](uikit-live-lists.md) (text-in-list benchmark evidence), [uikit-lists.md](uikit-lists.md), [uikit-layout-and-navigation.md](uikit-layout-and-navigation.md), [uikit-deprecated-apis.md](uikit-deprecated-apis.md), [uikit-ios27-sdk.md](uikit-ios27-sdk.md).
- `apple-design` (`apple-typography`, `apple-visual-accessibility`): typography and accessibility design doctrine, UIKit Dynamic Type font samples.
- `swiftui` (`touch-interaction-design`): gesture feel; (`swiftui-animation`): spring parameter doctrine; (`sf-symbols`): symbol choice.
