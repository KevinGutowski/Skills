---
name: swiftui-lazy-stacks
description: Build and debug SwiftUI scrolling content with LazyVStack/LazyHStack — understand layout estimation, view resolution, prefetching, scroll position, and the performance pitfalls that cause jank, disappearing views, leaked state, or broken programmatic scrolling. Use when building or reviewing SwiftUI ScrollView/lazy-stack code, composing nested or mixed scrolling content, adding scroll transitions, pinned headers, infinite scroll, or scroll-driven UI, or diagnosing scroll hitches, views vanishing too early, state lost on scroll, or slow programmatic scrolling. Based on Apple WWDC 2026 session 321. Triggers: LazyVStack, LazyHStack, ScrollView, lazy stack, scroll performance, scroll jank, hitch, scrollTransition, onScrollGeometryChange, onScrollTargetVisibilityChange, ScrollPosition, scrollPosition, pinnedViews, prefetching, infinite scroll, programmatic scroll.
---

# SwiftUI Lazy Stacks & Scrolling

*Source: Apple WWDC 2026, session 321 — "Dive into lazy stacks and scrolling with SwiftUI" (Rens, UI Frameworks Engineer). https://developer.apple.com/videos/play/wwdc2026/321*

`LazyVStack` / `LazyHStack` only evaluate and render the views needed to fill the visible rect. That efficiency comes with a **correctness cost you must design around**: everything off-screen is *estimated*. Most lazy-stack bugs come from treating estimated values as exact, or from making the stack's job ambiguous. This skill is the mental model plus the rules that follow from it.

## Mental model

- A lazy stack lays out subviews along its axis, **stops once the visible rect is filled**, and adds/removes subviews as you scroll. Off-screen views are not evaluated or rendered.
- **Off-screen sizes are estimated** — from the average size of already-placed views × the estimated remaining count. The stack is *unaware of changes in off-screen views*.
- **Cross-axis ideal size = the first subview's size.** A `LazyVStack`'s width is its first subview's width; a `LazyHStack`'s height (e.g. in a vertical `ScrollView`) is its first subview's height. It can't know the max across all subviews — it hasn't loaded them.
- **Content offset / total size are estimated and unstable.** They shift mid-scroll as the stack learns real sizes (e.g. after an orientation change). The stack and `ScrollView` coordinate so the *relative* position of visible items stays put while estimates update.

## Rules (and why)

### 1. Never key behavior on absolute content offset or size
They're estimates and drift as the stack learns. Reading absolute offset via `.onScrollGeometryChange` makes thresholds (e.g. "hide a button after 100pt") fire at unstable positions. Use **relative subview visibility** instead — `.onScrollTargetVisibilityChange` fires when which subviews are visible changes, with a threshold:

```swift
// ❌ absolute offset is estimated → unstable threshold
.onScrollGeometryChange(for: Bool.self) { $0.contentOffset.y <= 100 } action: { _, v in
    isScrollToShowcaseVisible = v
}
// ✅ depend on which subviews are visible
.onScrollTargetVisibilityChange(idType: Step.ID.self, threshold: 0.8) { visibleIDs in
    isScrollToShowcaseVisible = shouldShowScrollButton(visibleIDs: visibleIDs)
}
```

### 2. Fix the cross-axis size when content varies
Because cross-axis size comes from the *first* subview, variable content (e.g. multi-line labels) gets clipped. Give it a deterministic size: set a `lineLimit` and reserve space so later, taller subviews aren't cut off.

### 3. Don't push would-be-invisible views into the visible rect with a transform
`.scrollTransition` transforms that move a view *out of* its natural frame make the stack think it's off-screen (so it disappears too early), or pull in views it never loaded. A `rotationEffect` + growing `scaleEffect(1 + phase.value * 0.2)` pushes the view past its frame; a small symmetric `scaleEffect(1 - abs(phase.value) * 0.1)` stays put. Prefer transforms that don't relocate the frame over offset/translation that crosses the visibility boundary.

### 4. Keep leaf subview counts static — filter at the data level, not in the body
A view struct does **not** always map to one lazy subview. A `StepView` whose body has two top-level views (not wrapped in a `VStack`) resolves to **two** subviews the stack loads separately. Worse, a **dynamic** subview count — conditionals or optional-unwrapping in a leaf body — forces the stack to keep earlier views alive (it addresses subviews by *index*, which a changing count would shift). Consequences: views kept alive longer than expected, body re-evaluation of off-screen views when unrelated `@Environment` changes, and state that's never released.

Filter where the count is knowable up front — the data:

```swift
// ❌ conditional inside the leaf body changes the subview count
var body: some View { if step.isVisible(in: detailLevel) { VStack { /* … */ } } }

// ✅ filter the data so the stack sees an exact count (SwiftData @Query here)
init(detailLevel: DetailLevel) {
    _steps = Query(filter: #Predicate<Step> { $0.detailLevel >= detailLevel })
}
```

If content is gated (e.g. an optional auth token unwrapped in the body), show a `ContentUnavailableView` *higher up* instead of rendering the lazy stack at all.

### 5. Set up subviews in their initializer, not `onAppear` — respect prefetching
Lazy stacks **prefetch**: they do part of a view's work (body eval, layout) before it scrolls on, split across frames, to avoid dropped frames (hitches). So `body` may run during prefetch and — if the scroll reverses — `onAppear` may never fire. Heavy setup in `onAppear` that changes a view's size/content *after* placement throws away prefetch work and can over-load views. Put the view in a reasonable state in `init`; use a cache/loader that starts work in its initializer to fetch *earlier* than `.task`/`onAppear` would. **Good** `onAppear` use: triggering the next page for infinite scroll from a trailing `ProgressView`.

### 6. Don't store scroll-surviving data in `@State`
Off-screen views are kept briefly, then deleted along with their `@State`. Anything that must persist across scrolling (selection, highlight) belongs in a model object or an outer view via `@Binding` — not the leaf's `@State`.

### 7. Don't change a subview's layout after it appears
A common offender: `onGeometryChange` → set a `@State` → use it in a later layout pass. The stack measured the original height; the post-appear change pushes other content down and makes scrolling unreliable. Use a **custom `Layout`** when SwiftUI's primitives can't express it in one pass.

## Composition

- Mixing view types in one stack is fine. **Nesting** a `LazyHStack` inside a `LazyVStack` is good for performance — not everyone scrolls the inner stack.
- Pin section headers with the `pinnedViews:` parameter and `Section`:
  ```swift
  LazyVStack(pinnedViews: [.sectionHeaders]) {
      Section { ForEach(photos) { PhotoView($0) } } header: { ShowcaseHeader() }
  }
  ```

## Programmatic scrolling

- Works even to off-screen targets — the stack estimates the position and refines it each frame. Drive it with a `ScrollPosition` binding (`.scrollTo(id:)`).
- **Fastest when each `ForEach` element resolves to exactly one subview** (the stack can find the target ID without building views) and when it can quickly count subviews. This is the same payoff as Rule 4 — keep subview counts static, filter at the data level.

## Review checklist

- [ ] No logic keyed on absolute content offset/size? (use relative visibility)
- [ ] Cross-axis size fixed where content varies?
- [ ] Scroll transitions don't relocate views across the visibility boundary?
- [ ] Leaf views resolve to a static subview count? Filtering done at the data layer?
- [ ] Subviews initialized to a sane state before `onAppear`?
- [ ] Scroll-surviving state in models/bindings, not leaf `@State`?
- [ ] No post-appear layout changes (use a custom `Layout` if needed)?

See `references/code-patterns.md` for fuller before/after examples (view resolution, prefetching cache, infinite scroll, custom layout).

## Relationship to other skills

This is the first **Apple-platform engineering** skill in the library — it's about SwiftUI *implementation*, distinct from the platform-agnostic design/copy skills. It's the build layer beneath the design-pattern skills:

- **`apple-search-design`** and **`ios-brand-identity`** decide *what* scrolling/search/branded UI to build; this skill governs *how* the SwiftUI scrolling that realizes them performs.
- **`design-principles`** — the *Craft* principle (responsive, hitch-free scrolling) is what these rules operationalize in SwiftUI.
- **`swiftui-animation`** — the sibling for animations, transitions, and visual effects; its scroll effects (`scrollTransition`, parallax) must respect this skill's Rule 3 (no out-of-frame transforms). Animate there; keep scrolling correct here.
- **`swiftui-layout`** — the sibling for choosing containers and building custom ones; Rule 7's custom-`Layout` fix is implemented there (Layout protocol, ViewThatFits, AnyLayout), and its container table says when lazy is even warranted.
- **`swiftui-identity`** — the mental model beneath Rules 4 and 6: lazy state loss and subview-count stability are identity/lifetime behavior; debug mysterious state resets there.
- Motion skills (`web-animation-design`, `motion`) cover web/JS animation; this is the SwiftUI/Apple-platform equivalent for scroll-driven motion, so don't cross-apply their CSS/JS specifics here.
