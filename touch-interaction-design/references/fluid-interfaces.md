# Designing Fluid Interfaces — Distillation

*Source: Apple WWDC 2018, session 803 — "Designing Fluid Interfaces" (Chan Karunamuni, Nathan de Vries, Marcos Alonso — the team behind the iPhone X gestural interface). https://developer.apple.com/videos/play/wwdc2018/803/*

The companion to "The Life of a Button": where 804 designs a single control's feedback, 803 designs the *whole interface as a continuous, interruptible conversation*. Thesis: a fluid interface is one where "the tool feels like an extension of your mind" — "it's not that our interfaces should be fluid, it's that **we're fluid**, and our interfaces need to be able to respond to that." And it's "more than just frame rates": "you can have something chugging along at a nice 60 frames per second, but it just feels off."

---

## The principles (Chan)

- **Instant response, everywhere.** People fall "off a cliff" with any lag; delays "seep in" during design — hunt them in every tap, press, and swipe.
- **Redirection and interruption as the norm.** The iPhone X gesture space is two mixable axes (horizontal = apps, vertical = home): peek at multitasking on the way home, abort an app launch mid-flight, start using an app while it's still launching. **Thought and gesture happen in parallel** ("you sort of think it with the gesture") — faster than think-then-do, and it powers discovery: you find new gestures along the paths of existing ones.
- **Detect interruption via acceleration, not timers.** The multitasking pause is recognized by the spike in finger deceleration — "the faster you stop, the faster we can detect it."
- **Spatial consistency.** Things leave and re-enter by symmetric paths (push navigation slides in from the right, exits to the right). An asymmetric exit reads as "sending it somewhere" — use only when you mean it. ("If I walked off this stage this way, and then emerged that way, you'd be pretty amazed… because that's impossible.")
- **Hint in the direction of the gesture.** Control Center modules grow up and out toward the finger, in the direction of their popped-open state — playing into human prediction.
- **Lightweight input, amplified output.** Build an inertial profile from position/velocity/force and magnify it (scrolling, swipe-to-home). Without amplification, scrolling is "long, laborious swipes."
- **Rubberband every boundary.** Soft edges keep tracking the finger; a hard stop is indistinguishable from a frozen phone. Applies to handoffs too (dock-drag → app-drag uses a smooth curve, never a wall).
- **Smooth frames ≠ high framerate.** Choppiness is too much visual change between adjacent frames (strobing). Remedies: more fps, motion blur, or **motion stretching** (iPhone X icons elastically stretch open).
- **Behavior, not animation.** Real life prescribes no curve; motion is "a conversation between you and the object." Tune conceptual **mass**: photos light, app cards heavier.

## Dynamic motion (Nathan)

- Timed animations are call-and-response and take control from the user; fluid interfaces run **continuous dynamic behaviors** — always moving, always retargetable. The canonical curve is the braking car: unbroken, no direction changes, an **imperceptible stop**.
- **Springs, described humanely:** drop mass/stiffness/damping for two designer-facing properties — **damping ratio** (100% = no overshoot → 0% = oscillates) and **response** (how fast it seeks the target). "We actually like to avoid using duration" — the spring is always ready to retarget.
- **Bounce must be earned:** start at 100% damping ("you don't need to use springy springs"). **Reward momentum with overshoot** — Music opens Now Playing at 100% damping from a tap, but dismisses with **80%** when you fling it. **Bounce can teach:** the lock-screen Flashlight responds to a plain tap with a bounce that says "press harder to activate."
- **Project momentum — design for intent.** The FaceTime PiP doesn't snap to the nearest corner by *position*; it computes the **projected landing point** of the flick (the familiar scroll deceleration) and springs to the corner nearest *that*. "Ensure that motion is aligned with the intent of where people actually want to go. And then, take them there."

```swift
/// Distance traveled after decelerating to zero velocity at a constant rate.
func project(initialVelocity: Float, decelerationRate: Float) -> Float {
    return (initialVelocity / 1000.0) * decelerationRate / (1.0 - decelerationRate)
}

// After the PiP is thrown, determine the best corner and re-target the spring.
let decelerationRate = UIScrollView.DecelerationRate.normal
let projectedPosition = (
    x: x.value + project(initialVelocity: x.velocity, decelerationRate: decelerationRate),
    y: y.value + project(initialVelocity: y.velocity, decelerationRate: decelerationRate)
)
let nearestCornerPosition = nearestCornerTo(projectedPosition)
x.target = nearestCornerPosition.x
y.target = nearestCornerPosition.y
```
*(2018, from the session slides; velocity in points/sec, deceleration per-ms — hence the /1000. The pattern survives directly in modern SwiftUI spring APIs.)*

- **Stay in character:** scroll-drag and tap-status-bar-to-top use different mechanisms, but the page must feel like the same object; carry one motion character across the app.
- **Go beyond motion:** combine dynamic behaviors with **sound and haptics** (see `sound-design`).

## Gesture design (Marcos)

- **Even a tap is designed:** highlight on touch-down, confirm on touch-up, pad the hit area, allow drag-off-cancel / drag-back-re-arm (Calculator). *(This is 804's model — restated here as the base case.)*
- **Hysteresis:** a touch becomes a swipe only after moving a threshold distance — "usually 10 points in iOS" — which is also when you lock the swipe's axis.
- **One-to-one tracking:** after the swipe starts, content moves with the finger; respect the **relative grab point** ("never use the center of the image as the dragging point"); keep the touch **history** so the full motion transfers on release. Breaking 1:1 is itself a signal (end of content).
- **Detect gestures in parallel; cancel the losers.** Never wait for certainty before giving feedback (a 3D Touch peek starts, then cancels the instant you scroll). Avoid end-only recognizers (`UISwipeGestureRecognizer`); use ones exposing position/velocity/pressure. Know your forced delays (double-tap-to-zoom makes single taps wait).
- **Continuous feedback during the whole interaction:** Flashlight scales with pressure; tvOS focus shows what's selected, when it will change, and in which direction.

## Teaching without manuals (Chan, closing)

- Visual conventions are portable: clip content at the screen edge to invite scrolling; paging dots; grabber handles; **elevate interactive elements to their own plane** (a switch knob floats to read as draggable); **show, don't tell** — Safari's tab-close X animates the tab leftward, teaching swipe-to-close. Explicit instruction only for one *repeated* gesture, never an intermittent one.
- **Play is how fluid interfaces teach themselves:** "you don't feel like you need to learn the interface, you feel like you're discovering the interface." Lean into the "natural fiddle factor"; hand prototypes to people and watch.
- **Process:** interaction and visual design are inseparable — "you shouldn't be able to even tell when one ends and another begins." **"The interactive demo… is really worth a million static designs"** — literally how the iPhone X interface was built.
