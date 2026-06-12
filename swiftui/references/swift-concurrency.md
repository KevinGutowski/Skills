# Swift Concurrency & Modern-Feature Discipline

*Scope: Adopts Swift concurrency with discipline — task groups over unstructured Tasks, sendability without @unchecked shortcuts, @MainActor migration without contagion, measure-first Span/noncopyable adoption. Use when adopting Swift 6 strict concurrency, fixing sendability errors, or judging a performance feature. Based on WWDC 2026 Swift Group Lab. Triggers: Swift concurrency, task group, Sendable, @MainActor, Swift 6 migration, data race.*

*Source: Apple WWDC 2026, Swift Group Lab (session 8001) — live Q&A with Holly Borla, Doug Gregor, Tony Parker, and Corey (Swift server networking). https://developer.apple.com/videos/play/wwdc2026/8001*

A Q&A distillation, not a syntax tutorial. The through-line from the panel: **lean into structure, make concurrency explicit and rare, and adopt advanced features only where a profile says so.** "Language features aren't collectibles. You don't get a prize if you've got one of all of them."

## Structured concurrency: write recipes, not fan-outs

- **Avoid unstructured tasks "at almost all costs."** `Task {}` / `Task.detached {}` are for sending work elsewhere — never the mainline flow. Use task groups, and refactor small units of the codebase at a time so escape hatches don't creep in.
- **Write linear async code inside tasks.** Each task "should be a recipe… A, then B, then C." Concurrency happens at explicit fork–join / scatter–gather points (the task group), not diffused through the code. Don't fan out too much.
- **Fit object lifecycles to lexical scope.** Create → use → release within the task group's scope; Swift's `with…`-style functions exist to give resource lifetimes a lexical spelling.
- **Non-sendable types are a structuring tool here:** inside a task, most "concurrency" is just asynchrony — a non-sendable type can be used freely within that linear flow but *can't accidentally escape* to a concurrent context. Smaller surface to reason about when you do go concurrent.

## Cleanup: async defer + cancellation shields

Structured concurrency's big win is automatic cancellation propagation — and that's exactly what breaks naive cleanup. "Most Swift code will refuse to execute in a canceled context." So asynchronous cleanup (flushing a partially-written file, rolling back a DB transaction) silently no-ops mid-unwind unless shielded.

- Pair **async `defer`** (new, Swift 6.3/6.4 era) with **cancellation shields**: audit every async defer block and ask "is there an `await` in here that will refuse to run when canceled?" If yes, shield it. The panel called this the "one-two punch" for reliable resource cleanup.

## Sendability: invert the question

- People constantly ask "how do I make this type sendable?" — **often the better move is making it explicitly non-sendable.** Ephemeral/intermediate computation types modeled as non-sendable give you a clear delineation of what crosses concurrency domains and what never should — and passing them stays cheap.
- Swift 6.4 adds `~Sendable` syntax for stating this (previously an unavailable-conformance dance). Note it means *lack of* conformance — subclasses may still independently conform — unlike an unavailable conformance, which bans the whole hierarchy. (This is why e.g. `UserDefaults` sat un-annotated for years: Foundation refused to mark classes sendable that a subclass could make unsafe.)
- **Don't rush Swift 6 mode via `@unchecked Sendable`** — "you're just depriving yourself of the benefit the compiler can give you."
- To move non-sendable data between actors without copying: **region-based isolation** and the `sending` keyword (transfer is legal when the source provably never touches the value again). *Storing* transferred values still needs unsafe opt-outs; a `Disconnected`-style type is an active evolution pitch — check current status.

## @MainActor without contagion

Annotating one type with `@MainActor` tends to propagate through everything that uses it. Two strategies:

1. **Whole module belongs on the main actor?** Turn on **MainActor-by-default mode** and annotate only the offloading parts.
2. **Otherwise start at leaf types and move outward.** Within a type: mark methods that don't touch mutable state `nonisolated`; since Swift 6.x, `nonisolated` can go on a whole extension. Hunt down `static var`s that are never mutated → make them `let` (often a leftover computed property) so they need no isolation at all.

**Mental model behind the 6.2 reversal:** nonisolated async functions now run on the *caller's* context, not the global pool — because the old default "pushes a lot more types toward being sendable, and that's not the natural way to express these ideas." Concurrency should be opt-in at explicit points; offloading to the pool is the annotated exception. Write code assuming that worldview.

## High-frequency data → @Observable UI

First ask what frequency the *UI* actually needs — if updates are slower than render cadence, there's no problem to solve. Otherwise:
- **Coalesce before crossing isolation.** "Avoid context switching excessively" — batch many sensor updates into one hop to the main actor.
- **Decide acceptable data loss** explicitly (a live voltmeter readout doesn't need every sample rendered; persist raw data elsewhere if needed).
- Use swift-async-algorithms' `debounce` on an AsyncSequence; SwiftUI + `@Observable` already coalesce at the render end. Split "stream everything" from "show what the user needs" — they're different problems.

## Conformance hygiene

- `Equatable`/`Hashable`/etc. conformances are **kept by the compiler even if unused** (discoverable at runtime via `as?` casts) → code-size cost, and broad generic operator overloads can slow type checking. `Sendable` is just a compile-time tag — no runtime cost.
- **Only conform when the conformance is semantically meaningful** ("if it's Equatable, make sure it actually can be equated") — stamping conformances out of habit invites later misuse.
- Redundant *isolation* annotations are harmless and can serve as documentation of intent ("someone thought about this") — keep them if they communicate, and add a comment saying why. Treat internal helpers as if they had an API contract.

## Performance features: measure first, adopt narrowly

- **Profile before adopting anything**: Instruments flame graph + the newer top-functions view tell you where time actually goes. Don't forget plain algorithmic analysis either.
- **The signal for ownership types:** copy-on-write copies showing up as **retain/release traffic in a trace** → replace that `Array` with a unique/noncopyable array type along that path; the compiler then guides you through the tighter rules.
- **Keep adoption isolated to the hot path.** "Introducing spans and a couple of unique arrays just along the hottest path… gives you almost all the performance gains for a fairly small change." Never convert the whole project.
- **`borrow`/`mutate` accessors vs `get`/`set`:** borrow/mutate hand out (mutable) references without copies — better only when you're performance-sensitive and sharing data you already store; the exclusivity rules are more restrictive. Everywhere else, get/set.
- **If you've already hit your performance target, stop.** Time goes to features and bug fixes, not nanoseconds. The genuinely necessary moments "you will know when you see them" in a profile.

## Lesser-known tools (panel picks)

- **`@inlinable` + `@inline(never)`** on generic code with cold paths: `@inlinable` unlocks cross-module generic specialization and effects propagation; `@inline(never)` keeps the laborious cold path out of line. Rare (used ~3× in Apple's whole Swift networking portfolio) but unbeatable when needed.
- **Plain `as` type annotations** mid-expression to steer overload resolution and get sharper diagnostics.
- **Key paths** to abstract over properties — people build "big piles of closures" instead.
- **Integer overflow-reporting APIs** — carry the overflow flag through a straight-line computation, check once at the end.
- **`@diagnose` attribute (6.4)** — suppress or opt into warnings per code region (e.g. enable strict-concurrency warnings only in migrated areas: a staged-migration tool).
- **Slow `emit-module` is usually excess module dependencies**, not your generics. Use explicit module builds (now default) + Xcode's build timeline to find and prune. Tuple returns can also be slower than structs (compiler "explodes" tuples into separate values) — large hot tuples → structs.
- **Swiftly** to install/switch toolchains, including from Xcode.

## Checklist

- [ ] No `Task`/`Task.detached` in mainline flow — task groups with lexically-scoped resources?
- [ ] Async cleanup shielded from cancellation (audit async defer blocks for awaits)?
- [ ] Ephemeral types explicitly non-sendable rather than forced sendable? No `@unchecked Sendable` shortcuts?
- [ ] MainActor adoption via module default or leaf-outward, with `nonisolated`/`let` trims?
- [ ] High-frequency updates coalesced/debounced before crossing isolation?
- [ ] Conformances semantically meaningful, not habitual?
- [ ] Ownership/Span/unique-array changes justified by a profile and confined to the hot path?

> **Staleness note (Kevin's rule):** distilled from a live Q&A (audio-transcribed) in the Swift 6.3/6.4 timeframe — feature names here (`~Sendable`, `@diagnose`, async `defer`, cancellation shields, unique array / `InlineArray`, `Iterable` protocols, the `Disconnected` pitch, Subprocess package, unified Swift Build) must be **verified against current swift.org/Apple docs before citing in code**; several were in-flight evolution proposals at recording time. The disciplines (structure, inversion, measure-first) are the durable content.

## Relationship to other skills

First Swift *language*-level skill — sits beneath the SwiftUI trio:
- **[swiftui-identity.md](swiftui-identity.md)** — its dependency graph is the destination of the "coalesce before crossing isolation" rule; debug body-re-run storms there, throttle the firehose here.
- **[swiftui-lazy-stacks.md](swiftui-lazy-stacks.md)** / **[swiftui-layout.md](swiftui-layout.md)** / **[swiftui-animation.md](swiftui-animation.md)** — UI-framework layers; this skill governs the async/data layer feeding them.
- **`working-with-ai` (agentic-coding)** — "only semantically meaningful conformances" and "no unstructured tasks in mainline flow" make good project-rules entries for AI-assisted Swift codebases.
- **`optimizing-rails`** shares the measure-first creed for a different stack; don't cross-apply specifics.
