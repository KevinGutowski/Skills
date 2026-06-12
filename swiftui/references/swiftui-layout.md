# SwiftUI Layout & Structure

*Scope: Lays out and structures SwiftUI interfaces — choosing containers (stacks, grids, List/Form), the Layout protocol, ViewThatFits/AnyLayout, and app structure. Use when choosing or composing containers, building a custom layout, replacing GeometryReader hacks, or configuring navigation and toolbars. Based on Apple WWDC sessions. Triggers: Layout protocol, ProposedViewSize, ViewThatFits, AnyLayout, NavigationSplitView, TableColumn, toolbarRole.*

**Sources:** [swiftui-layout/sources.md](swiftui-layout/sources.md) — 5 WWDC SwiftUI sessions (2020–2022).

SwiftUI layout primitives are designed for **composition** — when one type isn't enough, combine it with a complementary one. This skill covers picking the right container, building custom ones with the `Layout` protocol, and the structure layer (split views, tables, toolbars) that the design rules in `apple-design` (apple-navigation-design) get implemented with.

## Choosing a container

| Need | Use |
|---|---|
| Fixed, small sets | `HStack` / `VStack` — **"If you aren't sure which type of stack to use, use VStack or HStack. Adopt Lazy Stacks as a way to resolve performance bottlenecks that you find after profiling."** |
| Large scrollable sets | Lazy stacks in a `ScrollView` (→ [swiftui-lazy-stacks.md](swiftui-lazy-stacks.md) for the deep rules) |
| Grids of scrolling content | `LazyVGrid`/`LazyHGrid` with `[GridItem]` — `.adaptive(minimum:)` makes columns fit the width (rotation/resizing for free) |
| **Static, non-scrolling 2D** | `Grid`/`GridRow` — loads everything, so it can size and align cells across *both* axes (lazy grids can't). `gridColumnAlignment` per column, `gridCellColumns(n)` to span, a view outside any `GridRow` (e.g. `Divider()`) spans the whole grid |
| Selection + scrolling + hierarchy | `List` — always lazy; `List(items, children: \.children)` turns it into an outline in one initializer change |
| Tree traversal inside other structure | `OutlineGroup` (a ForEach over trees — expands recursively into DisclosureGroups, evaluating children only when opened) |
| Show/hide that isn't data hierarchy | `DisclosureGroup(isExpanded:)` (inspectors) |
| Collections of controls | `Form` |

## The Layout protocol (custom containers)

Two required methods: `sizeThatFits(proposal:subviews:cache:)` and `placeSubviews(in:proposal:subviews:cache:)`. The contract:
- You see **proxies**, not views: propose sizes (`subview.sizeThatFits(.unspecified)` = ideal; probe `.zero`/`.infinity` for flexibility) and place (`place(at:anchor:proposal:)`). **Views choose their own size** — the container gets what it gets.
- **Never assume origin (0,0)** — use `bounds.minX/midY` (composition depends on it). Top-left coordinates; RTL flip is automatic.
- **Don't hardcode spacing** — read `ViewSpacing` preferences (`subviews[i].spacing.distance(to:along:)`); they're per-edge, per-neighbor, per-platform.
- **Per-view data** flows in via `LayoutValueKey` + `.layoutValue(key:value:)`, read as `subview[Rank.self]`.
- **Why not GeometryReader:** it measures its container and sends size *down*; measuring a child to push size back *up* bypasses the layout engine and can loop. The Layout protocol works inside the engine — this is the sanctioned replacement (it also fixes [swiftui-lazy-stacks.md](swiftui-lazy-stacks.md) Rule 7's post-appear relayout problem).
- The `cache` parameter exists for shared intermediate math — add it only after Instruments shows layout cost.
- **GeometryReader is also a resize tax** (WWDC26 Group Lab, 7g-Xg5xiH4o): "using geometry reader means on every single frame as you resize, we are updating that view's body" — and windows now resize on iPad, Mac, *and* iPhone (iPad windowing, iPhone mirroring), where users expect smoothness. Keep resize-time invalidation scoped to layout, not bodies.
- **No lazy custom layouts** (same lab): there is "no protocol for describing a custom lazy layout" today — file feedback if you need one. Workarounds, in order: compose a non-lazy custom `Layout` *inside* a built-in lazy stack/grid (laziness from the container, custom arrangement per chunk — mosaic layouts ship this way), or interop a `UICollectionView`.
- **`ViewThatFits`** picks the first listed alternative that fits (equal-width HStack → VStack fallback at big Dynamic Type). **`AnyLayout`** switches layout *types* on one view tree with animation, since structural identity is preserved (`isThreeWayTie ? AnyLayout(HStackLayout()) : AnyLayout(MyRadialLayout())` — note `HStackLayout`, not `HStack`).

## Reusable controls: styles over wrappers

WWDC26 Group Lab ruling (7g-Xg5xiH4o): don't build `MyCustomButton` wrapper views around `Button` — "explore button styles" (and the other style protocols). A `ButtonStyle` can pass the configuration through to another button or just restyle the label, so you keep every built-in initializer ("convenience ones for localization and using system images") instead of re-declaring them — and stock components restyled this way evolve with each OS design refresh for free, where forgotten wrappers become the half-hour debugging mystery ("why isn't this updating?"). Padding nuance from the same answer: pad the *label* (or do it in the style), not the button. And when SwiftUI lacks a standard component, wrapping the UIKit/AppKit one is the recommended path, not rebuilding from scratch.

## App structure (split views, tables, toolbars)

- **`NavigationSplitView`** — two columns (sidebar+detail) or three (+content); styles `.automatic` (recommended)/`.balanced`/`.prominentDetail`; collapses to a stack in compact. This is the implementation of `apple-design` (apple-navigation-design)'s sidebar patterns. "Start with NavigationSplitView when it makes sense" — it adapts down to iPhone free.
- **Data-driven navigation (the cookbook):** links present *values*, not views — `NavigationLink(title, value:)` + `.navigationDestination(for:)` maps value types to views; `NavigationStack(path: $path)` binds the whole stack to a collection. **Deep link by mutating the path; pop to root with `path = []`**; heterogeneous values use type-erasing `NavigationPath`. In a split view, a value link inside a `List(selection:)` of matching type drives selection automatically; compose a NavigationStack *inside* the detail column for push-within-column. ⚠️ **Never attach `navigationDestination` inside a lazy container** (List/Table/LazyVGrid) — the destination may not be loaded when needed; attach it outside the ScrollView, near its links. **State restoration:** keep navigation state in one Codable model — encode **ids, not model values** ("I don't want my navigation state to contain stale data"), decode with `compactMap`, persist via `@SceneStorage` + a task that restores on appear and saves on change. Binding-based programmatic `NavigationLink(isActive:)` is deprecated since iOS 16.
- **`Table`** — column builder (`TableColumn("Name", value: \.name) { … }`); sortable via `sortOrder: $sortOrder` + `KeyPathComparator` (Table doesn't sort your data — do it in `onChange`). In compact widths a Table shows **only its first column** — keep the Table (don't swap to List) to preserve scroll/selection; make column one the compact representation. iPad tables don't scroll horizontally — budget columns.
- **Selection** = tags + state: tags auto-synthesize from identity; all tags in a container share one type; selection binding can be optional single, required (macOS sidebar), or `Set` for multi-select. iPadOS 16+: keyboard multi-select without edit mode, two-finger pan to select — but still offer an `EditButton` ("a good iPad app shines both with and without the keyboard").
- **`.contextMenu(forSelectionType:)`** — one modifier, three cases: empty set (empty-area menu → create), one item, many items. Implements `apple-design` (apple-navigation-design)'s empty-area/selection menu patterns.
- **Toolbars** — don't hand-roll a "More" ellipsis menu: put controls in a `ToolbarItemGroup` and the system overflows automatically. `.secondaryAction` placement for useful-but-not-primary (defaults into overflow); `.toolbarRole(.editor)` moves the title leading so secondary actions can render center. **Customizable toolbars:** `.toolbar(id:)` + stable `id` on every `ToolbarItem` (persisted); on iPadOS only secondary actions are customizable. `ControlGroup` (with a label) groups items that customize as a unit and can collapse to a menu. `ShareLink` for sharing (`Transferable`).
- **Titles & documents** — `.navigationTitle(title) { actions }` adds a title menu ("like the File menu on macOS"); pass a **Binding** + `RenameButton()` for inline rename; `.navigationDocument(url)` adds a draggable document header + macOS proxy icon, even outside `DocumentGroup`.

> **Staleness note (Kevin's rule):** APIs span iOS 14–16, verified-era 2026: all current, with these modernizations — `SidebarListStyle()` → `.listStyle(.sidebar)`; `showsByDefault:` → `defaultCustomization(.hidden)` (iOS 17); `.navigationBarLeading/Trailing` → `.topBarLeading/Trailing`; one-param `onChange(of:)` deprecated (iOS 17). Verify before shipping.

## Checklist

- [ ] Plain stacks by default; lazy only where profiling (or obvious scale) demands; eager `Grid` for static 2D?
- [ ] Grids adaptive where width varies; outlines via `children:`/`OutlineGroup` instead of hand-rolled trees?
- [ ] Custom layouts use the Layout protocol (not GeometryReader feedback); spacing from `ViewSpacing`; no (0,0) origin assumptions?
- [ ] `ViewThatFits` covering Dynamic Type overflow; `AnyLayout` for animated layout switches?
- [ ] Tables keep column one compact-worthy; sorting wired through `onChange`; selection types consistent?
- [ ] No hand-rolled More menus; stable toolbar ids; secondary actions in `.secondaryAction`?
- [ ] Document-like screens get title menus/rename/`navigationDocument`?

See `swiftui-layout/layout-code.md` (containers + Layout protocol, verbatim) and `swiftui-layout/structure-code.md` (split view, Table, toolbars, titles, verbatim).

## Relationship to other skills

- **[swiftui-lazy-stacks.md](swiftui-lazy-stacks.md)** — owns the lazy-scrolling deep rules (estimation, prefetching); this skill owns the *choice* of container and custom layouts. Its Rule 7 (custom `Layout` over post-appear relayout) is implemented here.
- **`apple-design` (apple-navigation-design)** — the design layer this implements: sidebars/tab bars → `NavigationSplitView`; desktop-class tables/toolbars/selection menus → `Table`/`.toolbar(id:)`/`contextMenu(forSelectionType:)`. Decide structure there; build it here.
- **`apple-design` (apple-typography)** — `ViewThatFits` + `AnyLayout` are the tools behind its accessibility-size layout flips.
- **[swiftui-animation.md](swiftui-animation.md)** — `AnyLayout` switching animates via structural identity; motion specifics there.
- **[swiftui-identity.md](swiftui-identity.md)** — the identity/lifetime model beneath ForEach identifier choices and `_ConditionalContent` branching; route state-reset and wrong-row bugs there.
- **`apple-design` (liquid-glass-design-system)** — toolbar grouping and sidebar behavior on glass; the material rules constrain what these APIs should produce.
