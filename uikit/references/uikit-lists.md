# UIKit Lists and Grids: Compositional Layout, Diffable Data, Cells

*Scope: The default path for UIKit lists and grids - `UICollectionViewCompositionalLayout` (list configuration, section providers, grids, orthogonal sections), `UICollectionViewDiffableDataSource` with stable identifiers, cell registrations, content and background configurations, configuration state, self-sizing, and empty/loading states via `UIContentUnavailableConfiguration`. Use when building or reviewing any UICollectionView/UITableView screen. Live-updating feeds, chat, prepending, bottom pinning and hand-rolled layouts belong in [uikit-live-lists.md](uikit-live-lists.md). Triggers: UICollectionView, compositional layout, NSCollectionLayoutSection, diffable data source, snapshot, reconfigureItems, CellRegistration, UIListContentConfiguration, self-sizing cell, estimated height, orthogonalScrollingBehavior, contentUnavailableConfiguration, UITableView.*

*Source: Fernando Olivares, uikit-skill (MIT), uikit-specialist and uikit-specialist-objc references on collection layout, diffable data and cells, plus the self-sizing and diffable sections of uikit-specialist-slim, https://github.com/notolivaresf/uikit-skill — API facts per the source from Apple docs, WWDC sessions and SDK headers. Verify availability before naming an API: append .md to the developer.apple.com doc URL and read its availability block.*

## Contents

- Three parts, three jobs
- Choosing and building the layout
- Sizes, grids and orthogonal sections
- Self-sizing
- Item identity
- Snapshots: applying and changing items
- Sections, index paths, reordering
- Cells: registrations and configurations
- State, accessories, reuse safety
- Empty and loading states
- Table views
- Objective-C notes
- Review checklist
- Relationship to other skills

## Three parts, three jobs

- Compositional layout says **where** things go.
- Diffable data source says **what** is there (identifiers only).
- Cell registrations plus content configurations say **what each item looks like**.

Keep them apart. A layout that reads the model, or a cell that decides its own position, is the usual source of hard bugs. In new code use `UICollectionView` with a compositional layout; do not subclass `UICollectionViewFlowLayout` or write a custom `UICollectionViewLayout` unless the design cannot be expressed as items, groups and sections (free-form canvas, overlapping timeline).

## Choosing and building the layout

| Screen | Layout |
|---|---|
| Table-like list (settings, inbox) | `UICollectionViewCompositionalLayout.list(using:)` |
| Mixed section kinds (carousel + list + grid) | compositional layout with a section provider; list sections via `NSCollectionLayoutSection.list(using:layoutEnvironment:)` |
| Uniform grid | item width as a fraction of the group |
| Horizontal rows in a vertical list | section with `orthogonalScrollingBehavior` |
| Existing working `UITableView` | keep it (see Table views) |

List configuration (`UICollectionLayoutListConfiguration`):

- `appearance`: `.plain`, `.grouped`, `.insetGrouped`, `.sidebar`, `.sidebarPlain`. Pick by the screen's role, not by the color you want.
- `headerMode`: `.supplementary` (header from a supplementary registration) or `.firstItemInSection` (first item is the header; use for expandable outlines).
- `showsSeparators`, `separatorConfiguration`; per-item separators via `itemSeparatorHandler` (gets index path + default config).
- Swipe providers receive an index path: resolve the identifier from the data source inside the provider; never capture the index path for later. Capture `[weak self]`.
- Never hand-roll a list with `UICollectionViewFlowLayout` and a fixed `itemSize` height plus drawn separators.

Section provider rules:

```swift
let layout = UICollectionViewCompositionalLayout { [weak self] index, env in
    guard let self, let section = self.dataSource.sectionIdentifier(for: index) else { return nil }
    switch section {
    case .featured: return Self.carousel(env)
    case .all:
        var list = UICollectionLayoutListConfiguration(appearance: .plain)
        list.headerMode = .supplementary
        return NSCollectionLayoutSection.list(using: list, layoutEnvironment: env)
    }
}
```

- Map index to identifier with `sectionIdentifier(for:)` (iOS 15+). Switching on the raw index breaks as soon as a section is hidden.
- The provider re-runs on container size or trait changes. Read `env.container.effectiveContentSize` and `env.traitCollection` there; since iOS 18 traits read in the provider are tracked, so the layout updates by itself.
- Return a new section each call; never cache `NSCollectionLayoutSection`. Keep it cheap: arithmetic and object creation, no disk-touching model queries.
- `UICollectionViewCompositionalLayoutConfiguration` holds layout-wide settings: `scrollDirection`, `interSectionSpacing`, global boundary supplementaries, `contentInsetsReference`.
- Switch list/grid with `setCollectionViewLayout(_:animated:)`, keeping the data source and snapshot. To re-run the provider without data changes, `collectionViewLayout.invalidateLayout()` - but prefer reading a trait in the provider so it happens on its own.

## Sizes, grids and orthogonal sections

| Dimension | Meaning | Use for |
|---|---|---|
| `.fractionalWidth/Height(x)` | fraction of the **containing group**, not the screen | columns, square tiles |
| `.absolute(x)` | fixed points | things that truly never change |
| `.estimated(x)` | starting guess; the cell decides | anything holding text |
| `.uniformAcrossSiblings(estimate:)` (iOS 17+) | all items in group share the tallest height | rows of 2-4 cards that must line up |

- Any dimension that depends on text must be `.estimated`. `.absolute(60)` on a text row clips at large text sizes.
- If an item is estimated in a dimension, its group must be estimated in that dimension too, or the group cannot grow.
- Fractions compound: item `.fractionalWidth(0.5)` in a group at `.fractionalWidth(0.8)` is 40% of the section.
- `.uniformAcrossSiblings` must measure every sibling before placing any; only for small groups.
- Estimates near the real typical size. Wildly wrong estimates make the scroll indicator jump and add layout passes.

Grids:

- Derive column count from the container, never the device: `max(2, Int(env.container.effectiveContentSize.width / 180))`.
- `NSCollectionLayoutGroup.horizontal(layoutSize:repeatingSubitem:count:)` (iOS 16+); the `subitem:count:` form is deprecated.
- Gaps: `group.interItemSpacing` and `section.interGroupSpacing`. Do not use item `contentInsets` for gaps - they shrink the item.
- `section.contentInsetsReference = .layoutMargins` or `.readableContent` keeps the grid aligned on wide windows.
- Square tiles: item `.fractionalWidth(1/n)`, group height `.fractionalWidth(1/n)` (width fractions work for height).

Orthogonal sections:

- Never put a collection view inside a cell for a carousel. Nested collection views duplicate reuse, prefetching and focus, and lose their scroll position when the outer cell is reused. Use one collection view and `section.orthogonalScrollingBehavior` (`.continuous`, `.continuousGroupLeadingBoundary`, `.paging`, `.groupPaging`, `.groupPagingCentered`).
- `orthogonalScrollingProperties` (iOS 17+) sets deceleration rate and bounce per section.
- React to orthogonal scrolling (page indicator) via `section.visibleItemsInvalidationHandler` (visible items, offset, environment). It also drives per-item `transform`/`alpha`/`zIndex` effects. It runs every frame: arithmetic on the given items only; never query the model or data source.

Supplementary and decoration items:

- Headers/footers: `NSCollectionLayoutBoundarySupplementaryItem`; `pinToVisibleBounds = true` for sticky headers.
- Badges: `NSCollectionLayoutSupplementaryItem` with an `NSCollectionLayoutAnchor`.
- Section backgrounds: `NSCollectionLayoutDecorationItem.background(elementKind:)`, and register the view on the **layout** with `register(_:forDecorationViewOfKind:)`.
- One constant string per element kind, shared by the layout and the registration.

## Self-sizing

Requirements, all four:

1. Dimension is `.estimated` on the item and its group.
2. Content constrained to all four edges of `contentView` (or its `layoutMarginsGuide`) with an unbroken vertical chain.
3. Multi-line labels `numberOfLines = 0`; never set `preferredMaxLayoutWidth` in cells.
4. `collectionView.selfSizingInvalidation` is `.enabled` (default since iOS 16), or `.enabledIncludingConstraints` when constraint changes inside the cell should resize it.

- When a cell changes its own size (expanded text, image loaded, a reaction row appears), call `invalidateIntrinsicContentSize()` on the changed view or the cell; the layout resizes it, animated if inside an animation block. With invalidation off, reconfigure the item through the data source instead.
- Never measure by hand (`systemLayoutSizeFitting` on a sizing cell). Estimated size plus complete constraints; the layout measures.
- If an image's aspect ratio is known from metadata, add the aspect-ratio constraint up front so the cell does not jump when the image arrives.
- `.absolute` is fine for a truly fixed row (it skips measuring) - never to hide a constraint bug.
- List configuration layouts self-size by default.
- Dynamic Type implementation: `preferredFont(forTextStyle:)` or `UIFontMetrics.scaledFont(for:)` plus `adjustsFontForContentSizeCategory = true`; at `isAccessibilityCategory` sizes switch horizontal rows to vertical stacks. Design doctrine lives in `apple-design` (`apple-typography`).

## Item identity

The identifier is the item's identity, and identity decides animation, cell reuse, selection, scroll anchoring and diff cost. It must be **stable** (same across every snapshot), **unique** (duplicates raise an exception on apply), **cheap to hash** (every apply hashes all of them), and **Sendable** in Swift 6 (snapshots are often built off main). Best choice: the model's own ID (database key, server ID, a `UUID` assigned once at creation).

```swift
enum Section: Hashable, Sendable { case pinned, recent }
struct MessageID: Hashable, Sendable { let rawValue: UUID }
var dataSource: UICollectionViewDiffableDataSource<Section, MessageID>!
var store: [MessageID: Message] = [:]
```

Anti-patterns:

- **Whole model as identifier** (`DiffableDataSource<Section, Message>` with a synthesized `Hashable`): marking it read changes its hash, so the diff sees delete + insert. The cell is recreated, state (selection, text selection, in-flight image load, open swipe) is lost, the change animates wrong, and the scroll anchor can jump. If legacy code must keep it, make `==`/`hash` use only the ID and reconfigure on field changes (the diff will not see them).
- **Per-snapshot IDs**: `UUID()` per build or array indices. Every apply looks like "everything replaced"; index IDs shift by one on any top insert so every row changes.
- **Content-derived IDs** (`text.hashValue`, title): same text collides and crashes; editing changes identity. Rows with no natural ID get one assigned at load time and kept with the data.
- **Duplicates** from merged sources (socket + page fetch): de-dupe before every apply, keeping first: `var seen = Set<ID>(); let unique = incoming.filter { seen.insert($0.id).inserted }`.
- **Same ID in two sections** is illegal. Give each placement its own identifier: `enum Row: Hashable, Sendable { case pinned(MessageID), message(MessageID) }`.

Two update paths, because the snapshot holds only IDs:

| What changed | Do |
|---|---|
| Which items exist, or their order | build and apply a snapshot |
| Content of existing items | update the store, then reconfigure those IDs |

## Snapshots: applying and changing items

- Apply from **one** method on the main actor. Two code paths that each build and apply race each other.
- Append whole arrays per section (`appendItems(_:toSection:)`), not item by item.
- Since iOS 15, `apply(_:animatingDifferences: false)` still diffs and keeps cells - it is not a reload. `applySnapshotUsingReloadData(_:)` only when you want to discard all cell state (account switch).
- `await dataSource.apply(...)` when the next step depends on it (scroll to a new item, restore an anchor).
- `dataSource.snapshot()` returns a copy; edit the copy and apply it.
- Animate user-caused changes (send, delete). No animation for first load, off-screen changes and during fast scrolling.
- Never mix `performBatchUpdates` with a diffable data source; never `reloadData()` for a small change.
- Content refresh: `snapshot.reconfigureItems(ids)` (iOS 15+) re-runs the registration handler on the existing cell and keeps its state. `reloadItems` dequeues a new cell (selection, selected text, in-flight animations lost) - only when the item must switch cell type/registration. Never delete + reinsert to refresh.
- Reconfiguring an ID not in the snapshot raises an exception: filter with `snapshot.indexOfItem(id) != nil` first.
- Large snapshots (tens of thousands of items): sort/filter/de-dupe the ID arrays on a background actor, then build and apply on main. Applying from a background queue is supported only if **every** apply for that data source uses the same queue; in Swift 6 prefer the first option.

## Sections, index paths, reordering

- Section identifiers obey the same rules: stable, unique, small.
- `NSDiffableDataSourceSectionSnapshot` models one section including outline hierarchy (`append(_:to:)`, `expand(_:)`, `collapse(_:)`); apply with `apply(_:to:animatingDifferences:)` to touch only that section. `sectionSnapshotHandlers` report expand/collapse and can lazily load children. Mixing whole and section snapshots is allowed; last apply wins per section.
- Index paths are positions in the current snapshot only. Convert at the boundary: `itemIdentifier(for:)` when UIKit hands you an index path (delegates, swipe providers, context menus), `indexPath(for:)` when telling UIKit about an item. Never store an index path in a closure, menu action or task:

```swift
guard let id = dataSource.itemIdentifier(for: indexPath) else { return nil }
let delete = UIAction(title: "Delete") { [weak self] _ in self?.deleteItem(id) }
```

- Reordering: `dataSource.reorderingHandlers.canReorderItem` and `.didReorder`. The data source has already updated its snapshot when `didReorder` runs: update the model from `transaction.finalSnapshot` or `transaction.difference`, and do not apply a new snapshot inside the handler. List cells show the control via the `.reorder()` accessory.

## Cells: registrations and configurations

```swift
let messageCell = UICollectionView.CellRegistration<UICollectionViewListCell, MessageID> { [weak self] cell, _, id in
    guard let self, let message = self.store[id] else { return }
    var content = cell.defaultContentConfiguration()
    content.text = message.sender
    content.secondaryText = message.preview
    cell.contentConfiguration = content
    cell.accessories = message.isUnread ? [.customView(configuration: self.unreadDot)] : []
}
dataSource = .init(collectionView: collectionView) { cv, indexPath, id in
    cv.dequeueConfiguredReusableCell(using: messageCell, for: indexPath, item: id)
}
```

- Create registrations **once**, before the data source (local constants captured by the provider, or stored properties). A registration created inside the cell provider raises an exception. No string reuse identifiers or `as!` casts.
- The registration's item type can be the identifier; look up the model in the handler. Capture `[weak self]`: the data source holds the registration for its lifetime.
- One registration per cell kind; choose in the provider by switching on the identifier enum or section.
- Supplementaries: `UICollectionView.SupplementaryRegistration` + `dequeueConfiguredReusableSupplementary(using:for:)` in `dataSource.supplementaryViewProvider`. Headers use `UIListContentConfiguration.header()` on a list cell. With `.firstItemInSection`, the header is an ordinary item with its own identifier case, registration and `.outlineDisclosure()`.
- Cell provider work is "look up and assign". Decode and downscale images off main (`byPreparingThumbnail(ofSize:)`), cache, and re-check the cell still shows the same ID before assigning.
- `UIListContentConfiguration` starting points: `cell.defaultContentConfiguration()` (matches the list style), `.cell()`, `.subtitleCell()`, `.valueCell()`, `.header()`/`.footer()` (iOS 18+), `.prominentInsetGroupedHeader()`. Style through properties (`textProperties.font`, `.numberOfLines`, `imageProperties.tintColor`, `directionalLayoutMargins`, `imageToTextPadding`), not by reaching into subviews. Assign a fresh configuration every pass.
- Custom content: a `UIContentConfiguration` that is `Hashable` + a `UIView & UIContentView`. In the `configuration` setter, skip when equal to current (configuration runs often). Build subviews and constraints once in `init`; `apply` only sets properties and constraint constants, and must set **everything** it touches every time. `updated(for:)` returns a state-adjusted copy and stays pure.
- Backgrounds: `UIBackgroundConfiguration`, not a hand-styled `backgroundView`. iOS 18 replaced `listPlainCell()`/`listGroupedCell()`/`listSidebarCell()` with `listCell()`, `listHeader()`, `listFooter()`, which adapt to their list; `.clear()` for none. State via `backgroundColorTransformer` or `updated(for:)`.

## State, accessories, reuse safety

- One path for state: `cell.configurationUpdateHandler = { cell, state in ... }` or override `updateConfiguration(using:)`. Start from `UIListContentConfiguration.cell().updated(for: state)` and `UIBackgroundConfiguration.listCell().updated(for: state)`. Never override `isSelected`/`isHighlighted` setters to restyle.
- State fields: `isSelected`, `isHighlighted`, `isFocused`, `isDisabled`, `isEditing`, `isExpanded`, `isSwiped`, `isReordering`, `cellDropState`, `traitCollection`.
- Custom state: extend `UIConfigurationStateCustomKey`, override `configurationState` in the cell subclass, call `setNeedsUpdateConfiguration()` when it changes.
- Traits read in `updateConfiguration(using:)` or the handler are tracked on iOS 18+ - read them there, do not cache.
- Accessories instead of buttons in the content view: `.disclosureIndicator()`, `.checkmark()`, `.delete()`, `.reorder()`, `.outlineDisclosure()`, `.label(text:)`, `.detail()`, `.multiselect()`, `.popUpMenu(_:)`, `.customView(configuration:)`, each with `displayed:` `.always`/`.whenEditing`/`.whenNotEditing`. Keeps editing mode, layout and accessibility consistent.
- Reuse: set every property on every pass (a field set only "if present" leaks the previous item's value). Cancel per-cell work in `prepareForReuse()` (call `super`) and re-check identity when async work lands. Never store an index path on a cell; never hold a strong reference to a cell outside the collection view - ask `cellForItem(at:)` and handle `nil`.
- Controls in cells: capture the identifier and `[weak self]`, set the action on every configuration, and give it an identifier so `addAction` replaces instead of stacking (else `removeAction(identifiedBy:for:)` first):

```swift
let like = UIAction(identifier: .init("like")) { [weak self] _ in self?.like(id) }
cell.likeButton.addAction(like, for: .primaryActionTriggered)
```

## Empty and loading states

Use `UIContentUnavailableConfiguration` (iOS 17+), never a label laid over the collection view. Override `updateContentUnavailableConfiguration(using:)` on the view controller: `.loading()` while loading, `.empty()` with `image`/`text`/`secondaryText` (localized) when empty, `.search()` for no search results, `nil` otherwise. Add "Try Again" via `config.button` + `config.buttonProperties.primaryAction`. Call `setNeedsUpdateContentUnavailableConfiguration()` whenever the inputs change.

## Table views

`UITableView` is not deprecated; do not migrate a working one as a side task (migrate when the screen needs grids/orthogonal sections, or when asked). Same rules: `UITableViewDiffableDataSource` (its `defaultRowAnimation` sets insert/delete animation), `defaultContentConfiguration()` instead of `textLabel`/`detailTextLabel`/`imageView` (deprecated in the iOS 27 SDK; see [uikit-deprecated-apis.md](uikit-deprecated-apis.md)), `rowHeight = UITableView.automaticDimension` with a realistic `estimatedRowHeight`, and `reconfigureRows(at:)` or snapshot `reconfigureItems(_:)` to refresh.

## Objective-C notes

- Identifiers are objects compared by `isEqual:` and `hash`; they must also be **immutable** - a mutable object whose `hash` changes while in a snapshot corrupts the diff. Use `NSUUID`, `NSString`, `NSNumber`, or a `readonly` class. A model class that does not override `isEqual:`/`hash` compares by pointer, so a freshly decoded copy of the same item becomes a different item. Legacy model identifiers: implement `isEqual:`/`hash` over the ID only.
- Sections: box an `NS_ENUM` (`@(SectionPinned)`) or use constant `NSString *` values. Two placements of one item: a small immutable class with kind + ID (both in `isEqual:`/`hash`), or a string like `pinned-<uuid>` built in one helper.
- `-indexOfItemIdentifier:` returns `NSNotFound` (a large positive number), not `nil` or `-1`; `> 0` checks are bugs. `-itemIdentifierForIndexPath:`, `-indexPathForItemIdentifier:` and `-sectionIdentifierForIndex:` return `nil` when absent.
- Selector map: `appendSectionsWithIdentifiers:`, `appendItemsWithIdentifiers:intoSectionWithIdentifier:`, `applySnapshot:animatingDifferences:` and `...completion:` (the async-await equivalent; capture `weakSelf`), `-applySnapshotUsingReloadData:`, `reconfigureItemsWithIdentifiers:`, section snapshot `-appendItems:intoParentItem:`/`-expandItems:`/`-collapseItems:`/`-applySnapshot:toSection:animatingDifferences:`, `+horizontalGroupWithLayoutSize:repeatingSubitem:count:`, `UICollectionViewSelfSizingInvalidationEnabled(IncludingConstraints)`, `[UIContentUnavailableConfiguration loadingConfiguration]`/`emptyConfiguration`, `+listCellConfiguration`, `+headerConfiguration`.
- `reorderingHandlers` is a copied property: assign a whole handlers object (or read, modify, write back). Section-snapshot handlers: `shouldExpandItemHandler`, `willExpandItemHandler`, `shouldCollapseItemHandler`, `willCollapseItemHandler`, `snapshotForExpandingParentItemHandler`.
- Registrations are not generic: the item arrives as `id`, the cell as `__kindof UICollectionViewCell *`; declare narrower types in the handler block. `__kindof` dequeue results assign without a cast.
- Retain chain: registration handler <- registration <- provider block <- data source <- controller. Use `__weak typeof(self) weakSelf` in section providers, swipe providers, registration handlers, apply completions and stored cell blocks; `configurationUpdateHandler` is a `copy` block - use its cell parameter, not an outer strong cell.
- Configurations are classes conforming to `NSCopying`. Copy before modifying a shared one; custom configurations implement `copyWithZone:`, `isEqual:`, `hash`. The `UIContentView` `configuration` property is `copy`, so the setter receives a copy.
- Accessories are classes (`UICellAccessoryDisclosureIndicator`, `UICellAccessoryLabel -initWithText:`, `UICellAccessoryPopUpMenu -initWithMenu:`, `UICellAccessoryCustomView -initWithCustomView:placement:`) with `displayedState`. Custom state keys: a `UIConfigurationStateCustomKey` string constant exposed via a `UICellConfigurationState` category.

## Review checklist

1. Identifier is an ID - not a mutable model, index or content; duplicates removed before every apply from merged sources.
2. One apply path, main actor; no `performBatchUpdates` or `reloadData()` alongside diffable.
3. Content changes reconfigure; reload only for a cell-type change; no delete+reinsert.
4. No stored index paths in closures, menus, tasks or cells.
5. Registrations created once; every configured property set on every pass; state through the update handler.
6. Text dimensions `.estimated` (item and group); no hand measurement; tested at the largest accessibility size.
7. No nested collection views; section provider maps index via `sectionIdentifier(for:)`.
8. Empty/loading states use `UIContentUnavailableConfiguration`.

## Relationship to other skills

- [uikit-live-lists.md](uikit-live-lists.md): streaming updates, prepending with anchor restore, bottom pinning, batching, list performance, custom layouts.
- [uikit-dataflow-and-concurrency.md](uikit-dataflow-and-concurrency.md): main actor, tasks, building snapshots off main, retain cycles.
- [uikit-deprecated-apis.md](uikit-deprecated-apis.md) and [uikit-ios27-sdk.md](uikit-ios27-sdk.md): replacements and newer SDK gates.
- `apple-design` (`apple-typography`, `apple-visual-accessibility`): Dynamic Type and accessibility design doctrine; `swiftui` (`swiftui-lazy-stacks`) for the SwiftUI equivalent.
