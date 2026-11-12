# SwiftUI Identity

*Scope: Reasons about SwiftUI identity and lifetime — explicit (id, ForEach) vs structural identity, why @State resets or transitions fade instead of moving, AnyView pitfalls. Use when @State unexpectedly resets, animations cross-fade instead of moving, the wrong row updates, or body re-runs excessively. Based on WWDC 'Demystify SwiftUI'. Triggers: SwiftUI identity, view lifetime, @State resets, ForEach id, AnyView, body re-runs, inert modifier.*

*Source: Apple WWDC 2021, session 10022 — "Demystify SwiftUI" (Matt Ricketson, Luca Bernardi, Raj Ramamurthy, SwiftUI team). https://developer.apple.com/videos/play/wwdc2021/10022/*

"When SwiftUI looks at your code, what does it see? Three things: **identity, lifetime, and dependencies.**" This is the mental model beneath the other SwiftUI skills — most mysterious state/animation bugs are identity bugs. ("Are these two different dogs? Or two pictures of the same dog?")

**Apple's skill first for the rules; this file for the model.** Apple's Xcode-shipped `swiftui-specialist` skill (export and pin: `apple-design` (xcode-agent-skills)) states the working rules more fully than this file and wins on conflict: ForEach/List ids and row structure → its foreach.md; factoring into `View` types and initializer cost → structure.md; conditional modifiers → modifiers.md; `@Observable` dependencies → dataflow.md; environment cost → environment.md. It has no identity/lifetime/dependencies model and none of the lab findings, so those stay here; the short rules below are the fallback when the export is not available.

## Identity — explicit and structural

- **Explicit identity** comes from identifiers you supply: ForEach ids, the `id(_:)` modifier (also how `ScrollViewReader.scrollTo` targets a view). SwiftUI never uses pointer identity — views are value types.
- **Structural identity** comes from type + position in the hierarchy — and **`if/else` branches are identities**: ViewBuilder compiles an `if` into `_ConditionalContent<True, False>`, so each branch is a *distinct view*. Flipping the condition transitions one view out and another in (a fade), it doesn't move anything.
- **The core lesson:** a single view whose *modifiers* vary (`.opacity(isExpired ? 0.3 : 1)`, position, color) keeps one identity and animates fluidly; two branches fade. "By default, try to preserve identity and provide more fluid transitions." Ask at every branch: *am I representing multiple views, or two states of the same view?*
- **Same view, two states → a ternary in the modifier argument.** Never an `.if(condition) { … }` helper modifier and never a `ViewModifier` whose body is `if expired { content.opacity(0.3) } else { content }` — both silently create two identities. `opacity(1)` is *inert* (no render effect, cheap, pruned), so the unconditional modifier costs nothing; `transformEnvironment` does the same job for conditional environment writes. When the two style values have different `ShapeStyle` types and the ternary really fails to type-check, wrap each side in `AnyShapeStyle` — a cheap value-type erasure, not the `AnyView` problem; don't assume a mixed ternary fails before the compiler says so. (Apple: modifiers.md.)
- **AnyView is structural identity's "evil nemesis"** — it hides conditional structure, blocks diagnostics, and "can result in worse performance." Replace it with plain `if`/`switch` in a builder context (`@ViewBuilder` on a helper, `body` has it implicitly), conditionals pushed *inside* a container, or generics. That removes the erasure; it does not by itself fix a List/ForEach row — see the next section.

## Rows in List, ForEach and lazy containers — one root per element

Removing `AnyView` (or adding `@ViewBuilder` to a row helper) leaves a row whose top level is still a bare `switch`/`if`: the shape of the row then differs per element, so the container cannot work out row ids and counts from the data and has to evaluate every row. A top-level `if` with no `else` (zero or one view) and a body with two sibling views are the same problem.

- **Fix: a concrete row `View` whose body is one container** (`VStack`, `HStack`, `ZStack`, or your own wrapper) with the `switch`/`if` *inside* it. `Group` and a nested `ForEach` pass their children through and do not count as that container.
- **Do not flatten different row shapes into one view with conditional modifiers just to get a single root.** That only works while every case happens to be the same view type. Modifiers-over-branches is the rule for *two states of one view* (above); the container is the rule for *rows that can take several shapes*.
- **Some elements should not be rows at all?** Filter the collection before it reaches `ForEach` instead of emitting an empty row.
- SwiftUI can log offending call sites: launch with `-LogForEachSlowPath YES` (Apple: foreach.md; lazy-stack consequences in [swiftui-lazy-stacks.md](swiftui-lazy-stacks.md) Rule 4).

## Lifetime — state is tied to identity

- View *values* are ephemeral (created to diff, then destroyed) — "you should not rely on their lifetime. What you can control is their identity."
- **`@State` storage is allocated when an identity appears, persists across body re-runs, and is destroyed when the identity ends.** The same view type in two if/else branches = two identities = two separate states; switching branches **resets state to initial values**. (This is also [swiftui-lazy-stacks.md](swiftui-lazy-stacks.md) Rule 6's mechanism: recycled lazy views lose their leaf state.)
- **The view struct's `init` is not the identity's birth.** It runs every time the parent's body runs, so it must only copy inputs. `@State` is always `private` with its initial value at the declaration (`@State private var model = Model()` — evaluated once per identity; without `private` the expression is re-evaluated on every init and thrown away). Assigning a `@State` that already has a default from `init` has no effect on what `body` sees. (Apple: dataflow.md, structure.md; 27 SDK compile errors → `swiftui-whats-new-27` state-macro.md.)
- "Choosing a good identifier is your opportunity to control the lifetime of your views and data."

## Identifiers — stable, unique, cheap

Deferred to Apple's foreach.md, which covers it with examples and applies equally to `List`, `Table`, `OutlineGroup` and data-driven `Picker`. The short rule: an id travels with its element, never changes while the element lives, is unique within the `ForEach`, and is small. So no positions (`.indices`, `id: \.offset` — `.enumerated()` is fine when the id is `\.element.id`), no id minted while `body` runs, no editable or non-unique field such as a name, and no `id: \.self` on a large value (every diff hashes all of it). Prepare sorted or filtered arrays on the model, not in the `ForEach` argument. "An identifier shouldn't change over time; a new identifier represents a new item with a new lifetime."

## Dependencies — why body runs

Inputs (properties, bindings, environment, state, observed models) form a **dependency graph** across views — SwiftUI re-runs `body` only for views whose dependencies changed. "Identity is the backbone of the dependency graph," and "identity is one of the secrets to amazing performance."
- **Extract `View` types to scope invalidation** (WWDC26 Group Lab, 7g-Xg5xiH4o; Apple: structure.md): a `@ViewBuilder` computed property is "as if that was still in your view body" — only a separate `View` type gets its own identity and independently-tracked dependencies. Give each section of a screen its own type and pass it only the values it reads (a struct input is compared field by field, so an unread field still invalidates). Views are structs "allocated on the stack"; the team explicitly has no "too small of a view to break apart" threshold. Same trick for repeated modifier sets → a custom `ViewModifier`.
- **Over-invalidation is also a battery bug** (WWDC26 Power & Performance lab): "by definition, over-invalidation is you are recreating a view that looks exactly the same… nothing's changing on screen, but the CPU is just churning" — any invalidation fix is a power fix too. Diagnose with the SwiftUI instrument's **cause-and-effect graph**.
- **`@Observable` tracks whole properties, not fields or elements** — deferred to Apple's dataflow.md; read it before designing a model. Short rule: pass a row its element (or the fields it shows), never the model plus an index. A value type forwarded down many levels costs an equality "comparison on it at each level", which is "why observable is a reference type" (same lab).
- **Environment** (Apple: environment.md): values are cheap to *read*; the cost is **high-frequency writes**, which make every reader in the subtree re-check — don't route scroll offsets, drag positions or sensor data through `@Environment`; hold them in an `@Observable` model and coalesce upstream (see [swift-concurrency.md](swift-concurrency.md)). *Declaring* a key-path `@Environment(\.key)` property invalidates the view on every change to that value "even if the body of that view doesn't read the environment" — prune unused declarations. The type form `@Environment(Model.self)` only tracks the properties the body reads, which is why an `@Observable` model is safe there even when its properties update often.
- **AnyView, refined** (same lab): across module boundaries prefer `some View`; `AnyView` "is fine as long as the underlying type isn't changing" — dynamic type swaps inside it are what destroy identity and static counts.
- **Debugging re-render storms** (same lab): besides `Self._printChanges()` there's `_logChanges` (which "uses OS logging"); a random background color makes body re-evaluation visible (great during resize); when output says `self` changed, the whole view value changed — "crawl up to the" parent to find why. The underscore is "a signal to not ship this" — the string generation has real overhead. The SwiftUI instrument's graph is often simpler than print-spelunking.

## Checklist

- [ ] Branches only where there are truly *different* views; states-of-one-view expressed as modifier values (no `.if` helper)?
- [ ] No AnyView where ViewBuilder/generics work; every List/ForEach row a concrete view with one root container?
- [ ] Identifiers stable (survive edits), unique, cheap to hash; never positions, fresh UUIDs or `\.self` on big values?
- [ ] `@State` private with its default at the declaration; nothing but input copies in `init`?
- [ ] State that must outlive an identity lifted to a model or parent binding?
- [ ] Mysterious fade-instead-of-move or state-reset traced to an identity change?

> **Staleness note:** 2021 talk; the model is foundational and current. Its "observable object property wrappers" (`@StateObject`, `ObservableObject`) predate the Observation framework — new code uses `@Observable` held in `@State private var`. Rule-level content was reconciled with Apple's `swiftui-specialist` skill (Xcode 27.2, 27B52) on 2026-11-12; nothing here was compiled. Verify against current docs.

## Relationship to other skills

- **[swiftui-lazy-stacks.md](swiftui-lazy-stacks.md)** — its Rule 4 (static subview counts) and Rule 6 (state loss on recycle) are this skill's identity/lifetime model applied to lazy containers.
- **[swiftui-animation.md](swiftui-animation.md)** — fluid in-place animation vs. fade-transition is decided by identity; `AnyLayout` switching works *because* structural identity is preserved.
- **[swiftui-layout.md](swiftui-layout.md)** — ForEach identifier choices and `_ConditionalContent` structure underlie its containers.
- **[swift-concurrency.md](swift-concurrency.md)** — the language layer feeding this graph: coalesce/debounce high-frequency updates *before* they cross isolation into `@Observable`, so the dependency graph never sees the firehose.
