---
name: swiftui-animation
description: Build animations, transitions, and custom visual effects in SwiftUI — the animation architecture (Animatable, Transaction/TransactionKey, scoped .animation, CustomAnimation), springs by duration+bounce (.smooth/.snappy/.bouncy, velocity-preserving gesture handoff), zoom navigation transitions, scroll-driven effects (scrollTransition/visualEffect), MeshGradient, custom Transition conformances, TextRenderer glyph animation, Metal shader effects, and composing effect pipelines; bridges SwiftUI Animation into UIKit/AppKit and cross-framework springs. Use when implementing or reviewing SwiftUI motion, choosing or tuning springs, animating from gestures, adding parallax or shaders, or debugging transitions. Based on Apple WWDC 2023 sessions 10156 & 10158, 2024 sessions 10145 & 10151, and 2026 session 322. Triggers: withAnimation, spring bounce, Animatable, Transaction, CustomAnimation, navigationTransition, scrollTransition, visualEffect, MeshGradient, TextRenderer, ShaderLibrary, keyframeAnimator.
---

# SwiftUI Animation & Visual Effects

**Sources** — this skill aggregates five Apple WWDC sessions:
- *Session 10145 — "Enhance your UI animations and transitions" (UI Frameworks). https://developer.apple.com/videos/play/wwdc2024/10145/*
- *Session 10151 — "Create custom visual effects with SwiftUI" (Philip & Robb). https://developer.apple.com/videos/play/wwdc2024/10151/*
- *WWDC 2026, session 322 — "Compose advanced graphics effects with SwiftUI" (Haotian, UI Frameworks). https://developer.apple.com/videos/play/wwdc2026/322/*
- *WWDC 2023, session 10156 — "Explore SwiftUI animation" (Kyle Macomber). https://developer.apple.com/videos/play/wwdc2023/10156/*
- *WWDC 2023, session 10158 — "Animate with springs" (Jacob Xiao). https://developer.apple.com/videos/play/wwdc2023/10158/*

Great experiences are the aggregate of many small details, and motion is a big one. This skill covers the SwiftUI animation/effects toolchain — from the zoom transition and SwiftUI↔UIKit animation bridging up the ladder to scroll effects, mesh gradients, custom transitions, per-glyph text animation, and per-pixel Metal shaders. Engineering sibling of `swiftui-lazy-stacks`; the *web* counterpart values live in `web-animation-design` — don't cross-apply.

## Zoom transition (iOS 18+)

The tapped cell morphs into the incoming view, and it's **continuously interactive** — grabbable from the start or mid-flight. Use it when transitioning from a *large cell*; it keeps the same elements on screen for visual continuity. Works for push, `sheet`, and `fullScreenCover`.

- **SwiftUI:** `.navigationTransition(.zoom(sourceID:in:))` on the presented view + `.matchedTransitionSource(id:in:)` on the source (matching id + namespace). *(The talk used the beta name `navigationTransitionStyle`; GA is `navigationTransition`.)*
- **UIKit:** set `preferredTransition = .zoom { context in … }` on the pushed VC. The closure runs on zoom-in **and zoom-out** — capture a **stable identifier** and look the view up; never capture a view (cells get reused). Use `context.zoomedViewController` to read current state.

### Lifecycle rules under interruptible transitions
- **A push is never cancelled** — interrupting a push converts it into a pop: the push completes (full appearance callbacks), then the pop begins in the same run-loop turn. A cancelled *pop* jumps Disappearing → Appearing → Appeared in one turn.
- So: just call `push` unconditionally — don't special-case "transition in progress." Keep temporary transition state minimal; if you must keep some, reset it by `viewDidAppear`/`viewDidDisappear` (guaranteed at transition end).

## One animation system across frameworks

- `UIView.animate(_:)` (and the NSView equivalent) now accepts a **SwiftUI `Animation`** — the full suite including `CustomAnimation`. One animation spanning SwiftUI views and UIViews runs in sync.
- **CALayer caveat:** this path does *not* create a `CAAnimation`; it animates presentation values directly — code inspecting `layer.animations` behaves differently.
- **Representables:** pass an animated binding (`$value.animated()`) and bridge inside `updateUIView` with `context.animate { … }` — it picks up the Transaction's animation; if none, the closure runs inline. Same code path animated or not.

## The animation architecture (2023)

Two orthogonal halves: **Animatable** (what data animates) and **Animation** (how it changes over time), connected by **Transaction** (per-update implicit context; "withAnimation is just a thin wrapper around withTransaction").
- Animatable attributes hold a *model* value and a *presentation* value; built-in effects (`scaleEffect` etc.) animate **off the main thread without running your view code** — prefer them. A custom `Animatable` conformance makes `body` run **every frame** — only when built-ins can't express it (e.g. arc-path motion). `animatableData` is a `VectorArithmetic` vector (`AnimatablePair` to fuse); **animations animate the delta**, which is what makes interrupted animations combine *additively* (timing curves) or **merge/retarget with preserved velocity** (springs — implement `velocity` in a `CustomAnimation` so merges keep momentum).
- **Scoping animations precisely** (escalating): `.animation(_, value:)` for leaf components → scoped `.animation(.smooth) { $0.shadow(…) }` to confine an animation to specific attributes without touching child content → custom `TransactionKey` + `.transaction(value:)` to carry your own context (e.g. interactive-vs-programmatic) down the hierarchy. Different attributes can get different animations (smooth shadow + bouncy scale).

## Designing springs (Fluid Interfaces 2018 + Animate with springs 2023)

Why springs won (2023): they're "the only type of animation that maintains continuity both for static cases and cases with an initial velocity" — beziers can't represent starting velocity, so gesture handoffs "jerk to a halt." SwiftUI now tracks gesture velocities automatically, springs are the **default** for bare `withAnimation`, and "a spring doesn't need to bounce to make a great animation."
- **Parameterize by perceptual `duration` + `bounce`** (−1…1; the 2023 form of 2018's damping/response): bounce 0 = smooth (the "when you're not sure" default), ~15% = brisk tail, ~30% = noticeable, **be cautious above ~0.4**; negative = overdamped (scroll-style decay). Presets `.smooth`/`.snappy`/`.bouncy`, tunable via `duration:`/`extraBounce:`; same parameterization in UIKit (`UIView.animate(duration:bounce:)`) and Core Animation (`CASpringAnimation(perceptualDuration:bounce:)`).
- Tune duration first (pacing), then bounce (character); keep bounce consistent with the app's personality. **Never wait on the settling duration** — use the completion handlers, which fire on perceptual duration. Different properties finishing at different times is a feature, not a bug.
- The 2018 craft still governs *when*: **reward momentum with overshoot** (Music: 100%-damped open from a tap, bouncy dismiss from a fling); bounce can *teach* (the Flashlight tap-bounce says "press harder"); on release, **project momentum** and spring to the snap point nearest the projected landing (FaceTime PiP; code in `touch-interaction-design`'s fluid-interfaces reference).

## Gesture-driven springs — velocity for free

No more computing `initialVelocity` from gesture velocity. During the gesture, each change retargets with `.interactiveSpring`; on end, a final `.spring` **inherits the accumulated velocity**:

```swift
case .changed: UIView.animate(.interactiveSpring) { bead.center = gesture.translation }
case .ended:   UIView.animate(.spring)            { bead.center = endOfBracelet }
```

## Scroll-driven effects

- `scrollTransition(axis:) { content, phase in … }` — `phase.value` (−1…1, how far off screen) and `phase.isIdentity` drive rotation/offset/opacity per item. Pair with `scrollTargetLayout()` + `scrollTargetBehavior(.paging)` + `contentMargins` for carousels.
- **Parallax:** offset the *content* inside a fixed clip (`containerRelativeFrame` + `clipShape`) — move the image, not the window.
- `visualEffect { content, proxy in … }` — geometry-driven effects (hue, scale, blur by position) **without GeometryReader**; performant in scroll views.
- ⚠️ In **lazy stacks**, transforms that push a view out of its natural frame break visibility — see `swiftui-lazy-stacks` Rule 3 before shipping a scroll effect.

## Color: MeshGradient

A grid of unit-space points, each with a color; SwiftUI interpolates between them (closer points = sharper transitions). **Animate the points** to signal change — color as meaning, not decoration.

## Custom view transitions

Conform to `Transition`; `body(content:phase:)` mirrors `scrollTransition`. Use `phase.isIdentity` for symmetric properties and compare `phase == .willAppear` / `.didDisappear` for asymmetric ones (e.g. +360° in, −360° out so spin direction continues). Try `.combined(with:)` on standard transitions before going custom. A good transition "fits naturally within its larger context, and not feel like it was tacked on."

## Text transitions: TextRenderer (iOS 18+)

`draw(layout:in:)` hands you `Text.Layout` (Lines → Runs → RunSlices/glyphs) + a `GraphicsContext`. The canonical pattern:
- Conform to `Animatable`, forwarding `animatableData` → `elapsedTime`; structure timing as elapsed/element/total durations with a stagger (`elementDelay(count:)`).
- **Copy the context per element** (value semantics) so slices don't affect each other; draw with `.disablesSubpixelQuantization` to avoid settle jitter.
- In the wrapping `Transition`, force `transaction.animation = .linear(duration:)` so per-glyph springs are paced by a linear clock; apply via `.textRenderer(_:)`.
- Taste arc from the talk: whole-line → per-glyph everywhere ("less fun, a little same-y") → **emphasize only key words** via a custom `TextAttribute` + `customAttribute(_:)`, read in the renderer with `run[EmphasisAttribute.self]`.

## Metal shaders — per-pixel effects

- Instantiate with `ShaderLibrary.FunctionName(args…)`; apply with `colorEffect` / `distortionEffect` / `layerEffect(shader, maxSampleOffset:isEnabled:)` (layer effects are a superset). The `[[ stitchable ]]` Metal function takes `float2 position, SwiftUI::Layer layer, …params`; sampling must stay within `maxSampleOffset`.
- **Shaders have no time** — drive `elapsedTime` from SwiftUI with `keyframeAnimator(initialValue:trigger:)`, and gate with `isEnabled` so the shader only runs mid-animation.
- Why bother: a uniform spring scale "does not respond to where I touch it… lifeless and stiff" — a ripple from the touch point fixes it.
- **Build a debug UI** (sliders scrubbing time/amplitude/frequency/decay) — the effect modifier is stateless in time, so it's scrubbable. "Debug UI is a great way to iterate on complex animations."

## Composing effects — the pipeline mindset (2026)

"The 'advanced' lies in the construction, not the complexity." Standard APIs are pipes you connect, branch, and merge:
- **Shader pipe:** `colorEffect` (per-pixel color) → `distortionEffect` (position remap) → `layerEffect` (full `SwiftUI::Layer`, sample anywhere). Forward data from SwiftUI as appended arguments (floats, `float2`, images as `texture2d`).
- **Domain warping:** sample a tiling noise texture (`address::repeat` sampler, `position / size` UV), then sample *again* at the offset position — "organic, flowing blobs" (the live-lyrics background).
- **Time pipe:** shaders are stateless ("no memory of the previous frame") — drive them with `TimelineView(.animation)` passing elapsed time (or `keyframeAnimator` for triggered effects, per 10151).
- **Sync pipe:** playback state → current line → `ScrollViewReader.scrollTo(_, anchor: .center)` in `onChange`; keep per-item overlays always present, just hidden ("it's always there, just waiting to be shown").
- **Layout pipe:** alignment guides as semantic pins — hang a view below its container with `.alignmentGuide(.bottom) { $0[.top] }` ("bottom is top"), no manual offsets.
- Generalize by swapping inputs/shaders/foregrounds: "the APIs are the same. What you feed in and how you connect them, that's yours."

## Taste rules (both talks)

- Effects must stay pleasant "well after the novelty has worn off" — live with them, test in context.
- Experiment loudly, ship quietly: "turn the dials up to 100," then dial back.
- Prefer the standard tool one rung down the ladder before climbing (combined transitions before custom; visualEffect before shaders).

> **Staleness note (Kevin's rule):** 2024 (iOS 18) APIs. Known rename: beta `navigationTransitionStyle` → GA `navigationTransition(_:)`. Verify `UIGestureRecognizerRepresentable`, `TextRenderer`, `MeshGradient`, and shader entry points against current docs for your deployment target before shipping.

## Checklist

- [ ] Zoom transition: source is a large cell; UIKit closure captures an identifier, not a view?
- [ ] No "is a transition running" special-casing; transition state reset by `viewDidAppear`/`Disappear`?
- [ ] Mixed hierarchies animated with one SwiftUI `Animation` (not parallel UIKit/SwiftUI animations)?
- [ ] Gestures use `.interactiveSpring` → `.spring` retargeting, not manual velocity math?
- [ ] Scroll effects checked against lazy-stack visibility (no out-of-frame transforms)?
- [ ] Custom transitions handle asymmetric phases; `TransitionProperties(hasMotion:)` set?
- [ ] TextRenderer: context copied per slice; linear transaction pacing; emphasis limited to key words?
- [ ] Shaders gated with `isEnabled`; `maxSampleOffset` correct; debug UI used to tune?

See `references/code-patterns.md` for all verbatim samples (zoom, bridging, gestures, carousel/parallax, mesh gradient, Twirl, the full TextRenderer, and the Ripple shader + modifier).

## Relationship to other skills

- **`swiftui-lazy-stacks`** — the sibling for scrolling *content*; its Rule 3 (transforms vs. visibility) constrains this skill's scroll effects. Check both when animating in a lazy stack.
- **`swiftui-identity`** — identity decides whether a change animates in place or fades as a transition; when an animation cross-fades instead of moving, the bug is there, not here.
- **`touch-interaction-design`** — the design layer for gestures this skill implements (hysteresis, 1:1 tracking, momentum projection, interruptibility — from "Designing Fluid Interfaces").
- **`liquid-glass-design-system`** — glass morphing, sheet recession, and scroll edge effects are that system's motion; implement here, follow its rules there.
- **`sf-symbols`** — symbol animation is its own semantic preset system (wiggle/breathe/Magic Replace); use it for symbols before hand-rolling.
- **`web-animation-design`** / **`motion`** — web/CSS/JS counterpart; principles rhyme (springs, taste, restraint) but values and APIs don't transfer either way.
- **`ios-brand-identity`** — brand-through-motion on iOS (Zoom Transitions, spring personality) routes here for implementation.
- **`design-principles`** — *Craft* (responsive, interruptible) and *Delight* (purposeful motion); use it to decide *whether*, this skill for *how*.
- **`apple-visual-accessibility`** — Reduce Motion and Prefer Cross-Fade Transitions govern everything in this skill; check the settings before shipping motion.
