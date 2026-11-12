# Lazy Stack Code Patterns

## Contents
- Baseline composition
- Rule 3 — scroll transitions must not push views out of frame
- Rule 1 — relative visibility, not absolute offset
- Rule 4 — view resolution & static subview counts
- Rule 5 — prefetching: rows ready on first body, prepared by the model
- Rule 6 — scroll-surviving state belongs in a model/binding
- Programmatic scrolling
- Rule 7 — don't change layout after a subview appears


*Source: Apple WWDC 2026, session 321 — "Dive into lazy stacks and scrolling with SwiftUI." Code samples below were transcribed from the session's **Code** tab (timestamps preserved for traceability); `/* ... */` marks code Apple elided. https://developer.apple.com/videos/play/wwdc2026/321*

**Modernised 2026-11-12 — no longer verbatim.** Reconciled with Apple's Xcode-shipped `swiftui-specialist` skill (Xcode 27.2, 27B52; pin in `apple-design` (xcode-agent-skills)), which outranks the session samples: every `@State` is now `private`, and the two Rule 5 ✅ samples that built a model or loader inside the row's initializer were replaced. Rewritten samples are marked **adapted, not compiled**; nothing in this file has been built.

Grouped by the rule in [../swiftui-lazy-stacks.md](../swiftui-lazy-stacks.md). Where a rule has a wrong/right pair, the ❌/✅ shows the session's before/after unless marked adapted.

---

## Baseline composition

**1:23 — Origami app**
```swift
struct ContentView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(steps) { step in
                    StepView(step: step)
                }
            }
        }
    }
}

struct StepView: View { /* ... */ }
```

**5:11 — Nesting a horizontal showcase inside the vertical stack** (good for perf — not everyone scrolls the inner stack)
```swift
struct Showcase: View {
    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack {
                ForEach(photos) { photo in
                    PhotoView(photo: photo)
                }
            }
        }
    }
}
```

**6:30 — Pinned section header** via `pinnedViews:` + `Section`
```swift
LazyVStack(pinnedViews: [.sectionHeaders]) {
    ForEach(steps) { step in StepView(step: step) }
    Showcase()
}

struct Showcase: View {
    var body: some View {
        Section {
            ForEach(photos) { photo in PhotoView(photo: photo) }
        } header: { /* ... */ }
    }
}
```

---

## Rule 3 — scroll transitions must not push views out of frame

**7:04 — ❌** rotation + growth pushes the view beyond its natural frame, so the stack thinks it's off-screen and drops it early:
```swift
PhotoView(photo: photo)
    .scrollTransition { effect, phase in
        effect
            .rotationEffect(.degrees(phase.value * 20))
            .scaleEffect(1 + phase.value * 0.2)
    }
```

**7:36 — ✅** a small symmetric scale that never leaves the frame:
```swift
PhotoView(photo: photo)
    .scrollTransition { effect, phase in
        effect
            .scaleEffect(1 - abs(phase.value) * 0.1)
    }
```

---

## Rule 1 — relative visibility, not absolute offset

**8:20 — ❌** absolute content offset is estimated, so the threshold fires at an unstable point:
```swift
.onScrollGeometryChange(for: Bool.self) { geo in
    geo.contentOffset.y <= 100
} action: { _, newValue in
    self.isScrollToShowcaseVisible = newValue
}
```

**8:51 — ✅** depend on which subviews are visible instead:
```swift
.onScrollTargetVisibilityChange(
    idType: Step.ID.self,
    threshold: 0.8
) { visibleIDs in
    isScrollToShowcaseVisible = shouldShowScrollButton(visibleIDs: visibleIDs)
}
```

---

## Rule 4 — view resolution & static subview counts

**9:29 — one resolved subview** (1:1 — the simple case):
```swift
ForEach(steps) { step in StepView(step: step) }   // each StepView → one subview
```

**10:03 — multiple resolved subviews** — two top-level views (not in a layout) load *separately*:
```swift
struct StepView: View {
    let step: Step
    var body: some View {
        StepDiagram(/* ... */)
        StepInstructions(/* ... */)
    }
}
```

**10:52 — ❌ dynamic number of subviews** — a conditional in a leaf body makes the count vary, so the stack keeps earlier views alive (it indexes subviews):
```swift
struct StepView: View {
    let step: Step
    @Environment(\.detailLevel) var detailLevel
    var body: some View {
        if step.isVisible(in: detailLevel) {
            VStack { /* ... */ }
        }
    }
}
```

**11:46 — why it bites** — an *unrelated* environment value now re-evaluates off-screen bodies, and state isn't released:
```swift
struct StepView: View {
    let step: Step
    @Environment(\.detailLevel) var detailLevel
    @Environment(\.writingStyle) var writingStyle   // a change here re-evals off-screen views
    var body: some View {
        if step.isVisible(in: detailLevel) { /* ... */ }
    }
}
```

**12:15 — ✅ filter at the data level** so the count is known without building views (here with SwiftData `@Query`):
```swift
struct ContentView: View {
    @Query var steps: [Step]
    init(detailLevel: DetailLevel) {
        _steps = Query(filter: #Predicate<Step> { step in
            step.detailLevel >= detailLevel
        })
    }
    var body: some View { /* ... */ }
}
```

**12:35 — ❌ optional unwrapping has the same effect** (variable count):
```swift
struct StepView: View {
    let step: Step
    @Environment(\.apiToken) var token
    var body: some View {
        if let token { /* ... */ }
    }
}
```

**12:48 — ✅** let a model own the token and decide *higher up* (e.g. show a `ContentUnavailableView` instead of the lazy stack when unauthenticated):
```swift
struct StepView: View {
    let step: Step
    @Environment(NetworkClient.self) var networkClient
    var body: some View { /* ... */ }
}
```

---

## Rule 5 — prefetching: rows ready on first body, prepared by the model

**15:28 — ✅ a *good* `onAppear`: infinite scroll** from a trailing `ProgressView`:
```swift
struct Showcase: View {
    @State private var pager = ShowcasePager()
    var body: some View {
        ForEach(pager.pages) { page in PageView(page: page) }
        if !pager.atEnd {
            ProgressView()
                .progressViewStyle(.circular)
                .onAppear { pager.fetchPage() }
        }
    }
}
```

**15:53 — ❌ heavy setup in `onAppear`** changes size/content after placement, discarding prefetch work:
```swift
struct StepView: View {
    let id: Step.ID
    @State private var viewModel = StepViewModel()
    var body: some View {
        VStack { if let content = viewModel.content { /* ... */ } }
            .onAppear { viewModel.configure(with: id) }
    }
}
```

**16:23 — ❌ load size-defining content via `.task`** (starts only once the row is placed, so the row changes after prefetch measured it):
```swift
struct StepView: View {
    let step: Step
    @State private var diagramLoader = DiagramLoader()
    @State private var diagram: Diagram?
    var body: some View {
        VStack { /* ... */ }
            .task { diagram = await diagramLoader.loadDiagram(id: step.id) }
    }
}
```

**❌ Replaced session samples (16:14, 16:40) — do not reintroduce.** The session fixed both cases by constructing the view model / loader in the row's `init` and assigning it with `_viewModel = State(initialValue: …)`, with the loader starting its fetch in its own initializer. A row's `init` runs every time the parent's body runs, so that allocates a model — and starts a load — over and over, keeping only the first. Apple's skill is explicit that a view initializer copies inputs and is not a setup hook.

**✅ Adapted, not compiled — the model layer prepares each row once; the row's `init` copies one reference:**
```swift
@MainActor @Observable
final class StepModel: Identifiable {
    let id: Step.ID
    var diagram: Diagram?            // nil until loaded; the row reserves its space
    init(id: Step.ID) { self.id = id }
}

@MainActor @Observable
final class StepStore {
    private(set) var steps: [StepModel] = []    // created once and kept, never rebuilt in a body

    func loadNextPage() async {
        /* fetch the page, append one StepModel per step,
           and start their diagram loads here — before any row exists */
    }
}

struct ContentView: View {
    @State private var store = StepStore()
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(store.steps) { model in StepView(model: model) }
            }
        }
        .task { await store.loadNextPage() }
    }
}

struct StepView: View {
    let model: StepModel             // nothing to set up: usable on the first body pass
    var body: some View {
        VStack {
            DiagramSlot(diagram: model.diagram)   // fixed height; placeholder while nil
            /* ... */
        }
    }
}
```
Why this shape: the store outlives the rows, so loading starts when the data arrives rather than when a row is placed (the prefetching point), and each row observes only its own model, so one diagram landing re-runs one row. `DiagramSlot` is a stand-in for any view that keeps the same size with or without its content (Rule 7). Row-side `.task(id:)` remains fine for work that does not change the row's size.

---

## Rule 6 — scroll-surviving state belongs in a model/binding

**17:16 — ❌** highlight in leaf `@State` is lost when the view is recycled:
```swift
struct StepView: View {
    let step: Step
    @State private var isHighlighted = false
    var body: some View { /* ... */ }
}
```

**17:33 — ✅** lift it to the parent via `@Binding`:
```swift
struct ContentView: View {
    @State private var highlighted: Set<Step.ID> = []
    var body: some View { /* ... */ }
}

struct StepView: View {
    let step: Step
    @Binding var highlighted: Set<Step.ID>
    var body: some View { /* ... */ }
}
```

---

## Programmatic scrolling

**17:58 — scroll to an (even off-screen) target** with a `ScrollPosition` binding:
```swift
struct ContentView: View {
    @State private var scrollPosition = ScrollPosition()
    var body: some View {
        ScrollView { /* ... */ }
            .scrollPosition($scrollPosition)
            .overlay(alignment: .bottom) {
                Button { scrollToShowcase() } label: { /* ... */ }
            }
    }
    func scrollToShowcase() {
        withAnimation { scrollPosition.scrollTo(id: "showcase-header") }
    }
}
```

**18:24 / 18:53 — fast programmatic scroll wants a static subview count** — same fix as Rule 4: replace the in-body conditional (18:24) with a data-level `#Predicate` filter (18:53) so the stack can find/count the target ID without building views.

---

## Rule 7 — don't change layout after a subview appears

**19:16 — ❌** `onGeometryChange` → `@State` → second layout pass pushes content down after appear:
```swift
struct StepView: View {
    let step: Step
    @State private var subtitleHeight: CGFloat?
    var body: some View {
        VStack {
            StepDiagram(diagram: step.diagram)
                .frame(height: diagramHeight(subtitleHeight: subtitleHeight))
            Title(step.title)
            Subtitle(step.subtitle)
                .onGeometryChange(for: CGFloat.self, of: \.size.height) { _, value in
                    subtitleHeight = value
                }
        }
    }
}
```

**19:17 — ✅** resolve sizing in one pass with a custom `Layout`:
```swift
struct StepView: View {
    let step: Step
    var body: some View {
        StepLayout {
            StepDiagram(diagram: step.diagram)
            Title(step.title)
            Subtitle(step.subtitle)
        }
    }
}

struct StepLayout: Layout { /* ... */ }   // Layout protocol details: see ../swiftui-layout.md
```
