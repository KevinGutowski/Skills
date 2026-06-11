# SwiftUI Animation & Effects — Code Patterns

## Contents
- Zoom transition
- SwiftUI Animation driving UIKit
- Scroll effects
- MeshGradient
- Custom view transition
- TextRenderer (per-glyph text transition)
- Metal shader: Ripple
- Quick facts worth keeping
- Composing effects: domain warp + time (WWDC 2026 · 322, added by extension)
- Springs by duration + bounce (10158)
- Scoped animations & different animations per attribute (10156)
- Custom Animatable (runs body every frame — last resort) (10156)
- CustomAnimation — animate(value:time:context:), velocity, shouldMerge (10156)
- Transaction & TransactionKey (10156)


*Sources (samples transcribed verbatim from each session's Code tab; timestamps preserved):*
- *WWDC 2024, session 10145 — "Enhance your UI animations and transitions." https://developer.apple.com/videos/play/wwdc2024/10145/*
- *WWDC 2024, session 10151 — "Create custom visual effects with SwiftUI." https://developer.apple.com/videos/play/wwdc2024/10151/*
- *WWDC 2023, session 10156 — "Explore SwiftUI animation" (Kyle Macomber). https://developer.apple.com/videos/play/wwdc2023/10156/*
- *WWDC 2023, session 10158 — "Animate with springs" (Jacob Xiao). https://developer.apple.com/videos/play/wwdc2023/10158/*

**Staleness markers:** iOS 18-era APIs. The 10145 samples use beta-era `navigationTransitionStyle` — **GA name is `navigationTransition(_:)`**. Re-verify against current docs before shipping.

---

## Zoom transition

**10145 · 2:10 — SwiftUI** *(swap `navigationTransitionStyle` → `navigationTransition` for GA)*
```swift
NavigationLink {
    BraceletEditor(bracelet)
        .navigationTransitionStyle(
            .zoom(
                sourceID: bracelet.id,
                in: braceletList
            )
        )
} label: {
    BraceletPreview(bracelet)
}
.matchedTransitionSource(
    id: bracelet.id,
    in: braceletList
)
```

**10145 · 3:02 — UIKit** (closure runs on zoom-in *and* zoom-out; capture identifiers, not views)
```swift
func showEditor(for bracelet: Bracelet) {
    let braceletEditor = BraceletEditor(bracelet)
    braceletEditor.preferredTransition = .zoom { context in
        let editor = context.zoomedViewController
            as! BraceletEditor
        return cell(for: editor.bracelet)
    }
    navigationController?.pushViewController(braceletEditor, animated: true)
}
```

---

## SwiftUI Animation driving UIKit

**10145 · 8:39 — UIView with a SwiftUI animation** (no `CAAnimation` created; presentation values animated directly)
```swift
UIView.animate(.spring(duration: 0.5)) {
    bead.center = endOfBracelet
}
```

**10145 · 9:56 — Bridging through a representable** (`$binding.animated()` + `context.animate`)
```swift
struct BeadBoxWrapper: UIViewRepresentable {
    @Binding var isOpen: Bool

    func updateUIView(_ box: BeadBox, context: Context) {
        context.animate {
            box.lid.center.y = isOpen ? -100 : 100
        }
    }
}

struct BraceletEditor: View {
    @State private var isBeadBoxOpen = false
    var body: some View {
        BeadBoxWrapper($isBeadBoxOpen.animated())
            .onTapGesture {
                isBeadBoxOpen.toggle()
            }
    }
}
```

**10145 · 11:39 — Gesture-driven animation** (retarget with interactiveSpring; final spring inherits velocity)
```swift
switch gesture.state {
case .changed:
    UIView.animate(.interactiveSpring) {
        bead.center = gesture.translation
    }

case .ended:
    UIView.animate(.spring) {
        bead.center = endOfBracelet
    }
}
```

---

## Scroll effects

**10151 · 1:45 — Paged carousel scaffold**
```swift
ScrollView(.horizontal) {
    LazyHStack(spacing: 22) {
        ForEach(animals, id: \.self) { animal in
            AnimalPhoto(image: animal)
        }
    }.scrollTargetLayout()
}
.contentMargins(.horizontal, 44)
.scrollTargetBehavior(.paging)
```

**10151 · 2:30 — Per-item rotation by scroll phase**
```swift
AnimalPhoto(image: animal)
    .scrollTransition(
        axis: .horizontal
    ) { content, phase in
        content
            .rotationEffect(.degrees(phase.value * 2.5))
            .offset(y: phase.isIdentity ? 0 : 8)
    }
```
⚠️ In a lazy stack, keep such transforms inside the natural frame — see `swiftui-lazy-stacks` Rule 3.

**10151 · 3:14 — Parallax** (offset the image inside a fixed clip)
```swift
ZStack {
    AnimalPhoto(image: animal)
        .scrollTransition(axis: .horizontal) { content, phase in
            content.offset(x: phase.value * -250)
        }
}
.containerRelativeFrame(.horizontal)
.clipShape(RoundedRectangle(cornerRadius: 32))
```

**10151 · 4:41 — visualEffect: geometry without GeometryReader**
```swift
RoundedRectangle(cornerRadius: 24)
    .fill(.purple)
    .visualEffect({ content, proxy in
        content
            .hueRotation(Angle(degrees: proxy.frame(in: .global).origin.y / 10))
    })
```

---

## MeshGradient

**10151 · 7:30** (animate the points to signal change)
```swift
MeshGradient(
    width: 3,
    height: 3,
    points: [
        [0.0, 0.0], [0.5, 0.0], [1.0, 0.0],
        [0.0, 0.5], [0.9, 0.3], [1.0, 0.5],
        [0.0, 1.0], [0.5, 1.0], [1.0, 1.0]
    ],
    colors: [
        .black, .black, .black,
        .blue, .blue, .blue,
        .green, .green, .green
    ]
)
```

---

## Custom view transition

**10151 · 10:36 — Twirl** (symmetric props via `isIdentity`; asymmetric via phase comparison so the spin continues in one direction)
```swift
struct Twirl: Transition {
    func body(content: Content, phase: TransitionPhase) -> some View {
        content
            .scaleEffect(phase.isIdentity ? 1 : 0.5)
            .opacity(phase.isIdentity ? 1 : 0)
            .blur(radius: phase.isIdentity ? 0 : 10)
            .rotationEffect(
                .degrees(
                    phase == .willAppear ? 360 :
                        phase == .didDisappear ? -360 : .zero
                )
            )
            .brightness(phase == .willAppear ? 1 : 0)
    }
}
```

---

## TextRenderer (per-glyph text transition)

**10151 · 13:29 — Minimum viable renderer**
```swift
struct AppearanceEffectRenderer: TextRenderer {
    func draw(layout: Text.Layout, in context: inout GraphicsContext) {
        for line in layout {
            context.draw(line)
        }
    }
}
```

**10151 · 14:01 — The full pattern** (Animatable elapsed time, per-run emphasis attribute, staggered glyph springs, linear transaction pacing)
```swift
struct EmphasisAttribute: TextAttribute {}

/// A text renderer that animates its content.
struct AppearanceEffectRenderer: TextRenderer, Animatable {
    /// The amount of time that passes from the start of the animation. Animatable.
    var elapsedTime: TimeInterval
    /// The amount of time the app spends animating an individual element.
    var elementDuration: TimeInterval
    /// The amount of time the entire animation takes.
    var totalDuration: TimeInterval

    var spring: Spring {
        .snappy(duration: elementDuration - 0.05, extraBounce: 0.4)
    }

    var animatableData: Double {
        get { elapsedTime }
        set { elapsedTime = newValue }
    }

    init(elapsedTime: TimeInterval, elementDuration: Double = 0.4, totalDuration: TimeInterval) {
        self.elapsedTime = min(elapsedTime, totalDuration)
        self.elementDuration = min(elementDuration, totalDuration)
        self.totalDuration = totalDuration
    }

    func draw(layout: Text.Layout, in context: inout GraphicsContext) {
        for run in layout.flattenedRuns {
            if run[EmphasisAttribute.self] != nil {
                let delay = elementDelay(count: run.count)

                for (index, slice) in run.enumerated() {
                    // The time that the current element starts animating.
                    let timeOffset = TimeInterval(index) * delay
                    // The amount of time that passes for the current element.
                    let elementTime = max(0, min(elapsedTime - timeOffset, elementDuration))

                    // Copy the context so individual slices don't affect each other.
                    var copy = context
                    draw(slice, at: elementTime, in: &copy)
                }
            } else {
                var copy = context
                // Runs without the EmphasisAttribute tag quickly fade in.
                copy.opacity = UnitCurve.easeIn.value(at: elapsedTime / 0.2)
                copy.draw(run)
            }
        }
    }

    func draw(_ slice: Text.Layout.RunSlice, at time: TimeInterval, in context: inout GraphicsContext) {
        let progress = time / elementDuration
        let opacity = UnitCurve.easeIn.value(at: 1.4 * progress)
        let blurRadius =
            slice.typographicBounds.rect.height / 16 *
            UnitCurve.easeIn.value(at: 1 - progress)

        // The y-translation derives from a spring, which requires a time in seconds.
        let translationY = spring.value(
            fromValue: -slice.typographicBounds.descent,
            toValue: 0,
            initialVelocity: 0,
            time: time)

        context.translateBy(x: 0, y: translationY)
        context.addFilter(.blur(radius: blurRadius))
        context.opacity = opacity
        context.draw(slice, options: .disablesSubpixelQuantization)
    }

    /// Time between the start of two consecutive element animations.
    func elementDelay(count: Int) -> TimeInterval {
        let count = TimeInterval(count)
        let remainingTime = totalDuration - count * elementDuration
        return max(remainingTime / (count + 1), (totalDuration - elementDuration) / count)
    }
}

extension Text.Layout {
    var flattenedRuns: some RandomAccessCollection<Text.Layout.Run> {
        self.flatMap { line in line }
    }
    var flattenedRunSlices: some RandomAccessCollection<Text.Layout.RunSlice> {
        flattenedRuns.flatMap(\.self)
    }
}

struct TextTransition: Transition {
    static var properties: TransitionProperties {
        TransitionProperties(hasMotion: true)
    }

    func body(content: Content, phase: TransitionPhase) -> some View {
        let duration = 0.9
        let elapsedTime = phase.isIdentity ? duration : 0
        let renderer = AppearanceEffectRenderer(
            elapsedTime: elapsedTime,
            totalDuration: duration
        )

        content.transaction { transaction in
            // Pace elapsedTime linearly; per-glyph springs derive from its value.
            if !transaction.disablesAnimations {
                transaction.animation = .linear(duration: duration)
            }
        } body: { view in
            view.textRenderer(renderer)
        }
    }
}
```
Usage: tag key words with `.customAttribute(EmphasisAttribute())` inside the `Text`, then `.transition(TextTransition())`.

---

## Metal shader: Ripple

**10151 · 22:55 — The shader** (`[[ stitchable ]]`; runs per pixel; sample within maxSampleOffset)
```metal
#include <metal_stdlib>
#include <SwiftUI/SwiftUI.h>
using namespace metal;

[[ stitchable ]]
half4 Ripple(
    float2 position,
    SwiftUI::Layer layer,
    float2 origin,
    float time,
    float amplitude,
    float frequency,
    float decay,
    float speed
) {
    // The distance of the current pixel position from `origin`.
    float distance = length(position - origin);
    // The amount of time it takes for the ripple to arrive at the current pixel position.
    float delay = distance / speed;

    time -= delay;
    time = max(0.0, time);

    // The ripple is a sine wave scaled by an exponential decay function.
    float rippleAmount = amplitude * sin(frequency * time) * exp(-decay * time);

    // A vector of length `amplitude` that points away from position.
    float2 n = normalize(position - origin);

    // The new position moves toward or away from `origin` by rippleAmount.
    float2 newPosition = position + rippleAmount * n;

    // Sample the layer at the new position.
    half4 color = layer.sample(newPosition);

    // Lighten or darken the color based on the ripple amount.
    color.rgb += 0.3 * (rippleAmount / amplitude) * color.a;

    return color;
}
```

**10151 · 23:36 — Driving it from SwiftUI** (keyframeAnimator supplies time; `isEnabled` gates GPU work)
```swift
/// A modifier that performs a ripple effect to its content whenever its
/// trigger value changes.
struct RippleEffect<T: Equatable>: ViewModifier {
    var origin: CGPoint
    var trigger: T

    init(at origin: CGPoint, trigger: T) {
        self.origin = origin
        self.trigger = trigger
    }

    func body(content: Content) -> some View {
        let origin = origin
        let duration = duration

        content.keyframeAnimator(
            initialValue: 0,
            trigger: trigger
        ) { view, elapsedTime in
            view.modifier(RippleModifier(
                origin: origin,
                elapsedTime: elapsedTime,
                duration: duration
            ))
        } keyframes: { _ in
            MoveKeyframe(0)
            LinearKeyframe(duration, duration: duration)
        }
    }

    var duration: TimeInterval { 3 }
}

/// A modifier that applies a ripple effect to its content.
struct RippleModifier: ViewModifier {
    var origin: CGPoint
    var elapsedTime: TimeInterval
    var duration: TimeInterval

    var amplitude: Double = 12
    var frequency: Double = 15
    var decay: Double = 8
    var speed: Double = 1200

    func body(content: Content) -> some View {
        let shader = ShaderLibrary.Ripple(
            .float2(origin),
            .float(elapsedTime),
            // Parameters
            .float(amplitude),
            .float(frequency),
            .float(decay),
            .float(speed)
        )

        let maxSampleOffset = maxSampleOffset
        let elapsedTime = elapsedTime
        let duration = duration

        content.visualEffect { view, _ in
            view.layerEffect(
                shader,
                maxSampleOffset: maxSampleOffset,
                isEnabled: 0 < elapsedTime && elapsedTime < duration
            )
        }
    }

    var maxSampleOffset: CGSize {
        CGSize(width: amplitude, height: amplitude)
    }
}
```
The talk pairs this with a press gesture via `UIGestureRecognizerRepresentable` (a `UILongPressGestureRecognizer` with `minimumPressDuration = 0` reporting the touch point through `context.converter.localLocation`), and a **debug-UI preview** with sliders for time/amplitude/frequency/decay — the modifier is stateless in time, so it's fully scrubbable. The full listing is in Apple's "Creating visual effects with SwiftUI" sample project.

---

## Quick facts worth keeping

- A push is never cancelled — interruption converts it into a pop (full appearance callbacks guaranteed).
- The SwiftUI-animation path on UIView does **not** create `CAAnimation`s; presentation values are animated directly.
- `half4` = RGBA 16-bit float vector; `float2` = 2D point; SwiftUI converts `Color` → `half4` automatically.
- All animations in session 10145's demos were "slowed down to half speed."

---

## Composing effects: domain warp + time (WWDC 2026 · 322, added by extension)

*Source: "Compose advanced graphics effects with SwiftUI." https://developer.apple.com/videos/play/wwdc2026/322/*

**10:22 — Domain-warping shader** (sample noise, then sample again at the offset — the live-lyrics background)
```metal
[[stitchable]] half4 backgroundWarp(
    float2 position, SwiftUI::Layer layer,
    float2 size, texture2d<half> noiseTex
) {
    constexpr sampler s(address::repeat, filter::linear);
    float2 uv = position / size;

    half4 n = noiseTex.sample(s, uv);

    float2 q = float2(n.r, n.g);
    n = noiseTex.sample(s, uv + q);

    float2 offset = (float2(n.r, n.g) - 0.5) * 200.0;

    return layer.sample(position + offset);
}
```

**11:37 — Driving it with TimelineView** (shaders are stateless; pass elapsed time)
```swift
@State private var startDate = Date.now

TimelineView(.animation) { timeline in
    let elapsed = timeline.date.timeIntervalSince(startDate)
    CoverArtView()
        .layerEffect(
            ShaderLibrary.backgroundWarp(
                .float2(proxy.size),
                .image(Image("NoiseTexture")),
                .float(elapsed)
            ),
            maxSampleOffset: .zero
        )
}
```

**12:33 — Time-synced scrolling transcript**
```swift
@State private var playback = PlaybackState()

ScrollViewReader { scrollProxy in
    ScrollView {
        LazyVStack(alignment: .leading, spacing: 12) {
            ForEach(sampleTranscript) { line in
                Text(line.text)
                    .transcriptLineStyle(isCurrent:
                        line.id == playback.currentLineIndex
                    )
            }
        }
    }
    .onChange(of: playback.currentLineIndex, { _, i in
        scrollProxy.scrollTo(i, anchor: .center)
    })
}
```

**14:32 — Alignment-guide pin: hang an overlay below the container**
```swift
Text(line.text)
     .overlay(alignment: .bottomLeading) {
          Text(line.formattedTimestamp)
              .alignmentGuide(.bottom) { $0[.top] }   // "bottom is top"
     }
```

(The session's downloadable sample project includes a tweakable shader preview. Note: Apple's published 12:15 "basic transcript" snippet is malformed on the page — missing the `Text(line.text)` line.)

---

# Animation architecture & springs (WWDC 2023 · 10156 + 10158)

## Springs by duration + bounce (10158)

```swift
// The 2023 parameterization — perceptual duration (seconds) + bounce (−1…1)
withAnimation(.spring(duration: 0.6, bounce: 0.2)) { isActive.toggle() }

// Presets, tunable
withAnimation(.snappy) { … }
withAnimation(.bouncy(duration: 0.4, extraBounce: 0.1)) { … }
// .smooth = bounce 0, .snappy ≈ 0.15, .bouncy ≈ 0.3

// Spring as a model type — convert to/from physics parameters
let spring = Spring(duration: 0.5, bounce: 0.2)
let (mass, stiffness, damping) = (spring.mass, spring.stiffness, spring.damping)
// stiffness = (2π ÷ duration)²;  damping = 1−4π·bounce ÷ duration (bounce ≥ 0)

// Same parameterization across frameworks
UIView.animate(duration: 0.6, bounce: 0.2) { circle.center.x = 300 }
let anim = CASpringAnimation(perceptualDuration: 0.6, bounce: 0.2)
```
Guidance: bounce 0 when unsure; completion handlers fire on **perceptual** duration, never wait on settling.

## Scoped animations & different animations per attribute (10156)

```swift
content
    .animation(.smooth) { $0.shadow(radius: isSelected ? 12 : 8) }   // only the shadow
    .animation(.bouncy) { $0.scaleEffect(isSelected ? 1.5 : 1.0) }   // only the scale
// Scoped form confines the animation to these attributes — child content unaffected.
```

## Custom Animatable (runs body every frame — last resort) (10156)

```swift
struct RingOffset: ViewModifier, Animatable {
    var angle: Angle
    var animatableData: CGFloat {
        get { CGFloat(angle.radians) }
        set { angle = .radians(Double(newValue)) }
    }
    func body(content: Content) -> some View {
        content.offset(x: cos(angle.radians) * 120, y: sin(angle.radians) * 120)
    }
}
// Built-in effects (scaleEffect, offset, opacity…) animate off the main thread
// without running your code — prefer them. Use Animatable only for paths like arcs.
```

## CustomAnimation — animate(value:time:context:), velocity, shouldMerge (10156)

```swift
struct MyLinearAnimation: CustomAnimation {
    var duration: TimeInterval
    func animate<V: VectorArithmetic>(value: V, time: TimeInterval, context: inout AnimationContext<V>) -> V? {
        if time <= duration {
            value.scaled(by: time / duration)   // value is the DELTA toward the target
        } else {
            nil                                  // animation finished
        }
    }
    func velocity<V: VectorArithmetic>(value: V, time: TimeInterval, context: AnimationContext<V>) -> V? {
        value.scaled(by: 1.0 / duration)         // lets a successor preserve momentum
    }
}
// Springs implement shouldMerge(previous:) → true: retarget with preserved velocity
// instead of running additively like timing curves.
```

## Transaction & TransactionKey (10156)

```swift
// withAnimation is a thin wrapper:
withTransaction(\.animation, .bouncy) { selected.toggle() }

// Custom context flowing down the view tree
private struct AvatarTappedKey: TransactionKey {
    static let defaultValue = false
}
extension Transaction {
    var avatarTapped: Bool {
        get { self[AvatarTappedKey.self] }
        set { self[AvatarTappedKey.self] = newValue }
    }
}

// Sender:
withTransaction(\.avatarTapped, true) { model.selectedAvatar = avatar }
// Receiver decides the animation from the context:
content.transaction(value: avatar.id) { t in
    t.animation = t.avatarTapped ? .bouncy : .smooth
}
```
iOS 17+: a bare `withAnimation { … }` defaults to a smooth spring.
