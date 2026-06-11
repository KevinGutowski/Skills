---
name: swiftui-identity
description: "Reasons about SwiftUI identity and lifetime — explicit (id, ForEach) vs structural identity, why @State resets or transitions fade instead of moving, AnyView pitfalls. Use when @State unexpectedly resets, animations cross-fade instead of moving, the wrong row updates, or body re-runs excessively. Based on WWDC 'Demystify SwiftUI'. Triggers: SwiftUI identity, view lifetime, @State resets, ForEach id, AnyView, body re-runs, inert modifier."
---

# SwiftUI Identity

*Source: Apple WWDC 2021, session 10022 — "Demystify SwiftUI" (Matt Ricketson, Luca Bernardi, Raj Ramamurthy, SwiftUI team). https://developer.apple.com/videos/play/wwdc2021/10022/*

"When SwiftUI looks at your code, what does it see? Three things: **identity, lifetime, and dependencies.**" This is the mental model beneath the other SwiftUI skills — most mysterious state/animation bugs are identity bugs. ("Are these two different dogs? Or two pictures of the same dog?")

## Identity — explicit and structural

- **Explicit identity** comes from identifiers you supply: ForEach ids, the `id(_:)` modifier (also how `ScrollViewReader.scrollTo` targets a view). SwiftUI never uses pointer identity — views are value types.
- **Structural identity** comes from type + position in the hierarchy — and **`if/else` branches are identities**: ViewBuilder compiles an `if` into `_ConditionalContent<True, False>`, so each branch is a *distinct view*. Flipping the condition transitions one view out and another in (a fade), it doesn't move anything.
- **The core lesson:** a single view whose *modifiers* vary (`.opacity(isExpired ? 0.3 : 1)`, position, color) keeps one identity and animates fluidly; two branches fade. "By default, try to preserve identity and provide more fluid transitions." Ask at every branch: *am I representing multiple views, or two states of the same view?*
- **AnyView is structural identity's "evil nemesis"** — it hides conditional structure, blocks diagnostics, and "can result in worse performance." Fixes: `@ViewBuilder` on helper functions (body has it implicitly), plain if/switch, push conditionals *inside* containers, generics over erasure.

## Lifetime — state is tied to identity

- View *values* are ephemeral (created to diff, then destroyed) — "you should not rely on their lifetime. What you can control is their identity."
- **`@State`/`@StateObject` storage is allocated when an identity appears, persists across body re-runs, and is destroyed when the identity ends.** The same view type in two if/else branches = two identities = two separate states; switching branches **resets state to initial values**. (This is also `swiftui-lazy-stacks` Rule 6's mechanism: recycled lazy views lose their leaf state.)
- "Choosing a good identifier is your opportunity to control the lifetime of your views and data."

## Identifiers — stable and unique

- ❌ `var id: UUID { UUID() }` — a new id every read: everything flashes and loses state.
- ❌ Array indices — insert at the front and SwiftUI thinks you appended at the end.
- ❌ Non-unique ids (identifying items by name) — duplicates vanish.
- ✅ Database ids or stable derived properties. "An identifier shouldn't change over time; a new identifier represents a new item with a new lifetime."
- ForEach forms: constant range (must be constant), collection + `id:` keypath, or `Identifiable` conformance.

## Dependencies — why body runs

Inputs (properties, bindings, environment, state, observed objects) form a **dependency graph** across views — SwiftUI re-runs `body` only for views whose dependencies changed. "Identity is the backbone of the dependency graph," and "identity is one of the secrets to amazing performance."
- **Over-invalidation is also a battery bug** (WWDC26 Power & Performance lab): "by definition, over-invalidation is you are recreating a view that looks exactly the same… nothing's changing on screen, but the CPU is just churning" — any invalidation fix is a power fix too. Diagnose with the SwiftUI instrument's **cause-and-effect graph**.
- **Environment churn:** environment values are cheap to *read*; the cost is **high-frequency writes**, which re-evaluate every reader. Don't route fast-changing values (scroll offsets, sensor data) through `@Environment` — coalesce upstream (see `swift-concurrency`).
- **Extract subviews to scope invalidation** (WWDC26 Group Lab, 7g-Xg5xiH4o): a `@ViewBuilder` computed property is "as if that was still in your view body" — only a separate `View` type gets its own identity and independently-tracked dependencies, so SwiftUI can update just that piece. Views are structs "allocated on the stack" — cheap to create and discard; the team explicitly has no "too small of a view to break apart" threshold. Same trick works for repeated modifier sets → a custom `ViewModifier`. Two more lab gotchas: *declaring* an `@Environment` property invalidates the view on every change to that value "even if the body of that view doesn't read the environment" — prune unused declarations; and a value type forwarded down many levels costs an equality "comparison on it at each level" plus body evaluation of pass-through views, which is "why observable is a reference type" (stable pointer, per-property tracking — and safe to put in the environment even when its properties update often).
- **AnyView, refined** (same lab): across module boundaries prefer `some View`; `AnyView` "is fine as long as the underlying type isn't changing" — dynamic type swaps inside it are what destroy identity and static counts.
- **Debugging re-render storms** (same lab): besides `Self._printChanges()` there's `_logChanges` (which "uses OS logging"); a random background color makes body re-evaluation visible (great during resize); when output says `self` changed, the whole view value changed — "crawl up to the" parent to find why. The underscore is "a signal to not ship this" — the string generation has real overhead. The SwiftUI instrument's graph is often simpler than print-spelunking.
- **Inert modifiers over branches:** a modifier whose body contains `if expired { content.opacity(0.3) } else { content }` silently creates two identities. Fold the condition into the value — `.opacity(isExpired ? 0.3 : 1)`; `opacity(1)` is *inert* (no render effect, cheap, pruned). Same trick: `transformEnvironment` for conditional environment writes.

## Checklist

- [ ] Branches only where there are truly *different* views; states-of-one-view expressed as modifier values?
- [ ] No AnyView where ViewBuilder/generics work?
- [ ] Identifiers stable (survive edits) and unique (no name collisions); never indices or fresh UUIDs?
- [ ] State that must outlive an identity lifted to a model or parent binding?
- [ ] Mysterious fade-instead-of-move or state-reset traced to an identity change?

> **Staleness note (Kevin's rule):** 2021 talk; the model is foundational and current, but "observable object property wrappers" predates the Observation framework — modern code uses `@Observable` (dependencies become per-property, making the graph finer-grained). Verify against current docs.

## Relationship to other skills

- **`swiftui-lazy-stacks`** — its Rule 4 (static subview counts) and Rule 6 (state loss on recycle) are this skill's identity/lifetime model applied to lazy containers.
- **`swiftui-animation`** — fluid in-place animation vs. fade-transition is decided by identity; `AnyLayout` switching works *because* structural identity is preserved.
- **`swiftui-layout`** — ForEach identifier choices and `_ConditionalContent` structure underlie its containers.
- **`swift-concurrency`** — the language layer feeding this graph: coalesce/debounce high-frequency updates *before* they cross isolation into `@Observable`, so the dependency graph never sees the firehose.
