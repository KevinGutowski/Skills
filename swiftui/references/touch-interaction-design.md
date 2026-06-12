# Touch Interaction Design

*Scope: Designs touch controls, gestures, and fluid interactions — a control's three feedback phases plus fluid-interface principles (hysteresis, rubberbanding, momentum projection). Use when designing buttons, custom gestures, or swipes, or fixing laggy or rigid-feeling interactions. Based on WWDC 2018 sessions 804 (interaction half; sound half in sound-design) and 803. Triggers: button design, hit area, hysteresis, rubberband, feels unresponsive.*

**Sources:** [touch-interaction-design/sources.md](touch-interaction-design/sources.md) — 2 Apple WWDC 2018 sessions + MDS.

"Details are designed, even if they seem obvious." A button is an *indirect* controller — the result happens somewhere else — so both the control and its result need designed feedback, separately and connected. The whole talk is one lens: **feedback across the three phases of an interaction — before, during, after** — modeled on a physical button (resting, being pressed, springing back). Two kinds of feedback throughout: **tell** people (text/icons) and **show** people (visual/audio/haptic change over time) — often both, "because I might have missed that animation."

## Before — perceived affordance

- "The iPhone screen is just a piece of glass… Glass doesn't tell you that it's tappable." People infer tappability from **prior iOS experience + current context** — so for anything encountered rarely or for the first time, **use standard button shapes**; "we don't want to throw in something new."
- **Labels are feedback.** Label with what *users* understand, not internal vocabulary: "Toast" failed (verb or noun? "What should we call this label, toast toast? No.") → "Make Toast"; never "Request toast." An icon was rejected as unclear "for something people will be encountering for the first time in an unfamiliar context."
- Placement, grouping, and proximity communicate what a control relates to.
- **Prototype cheaply, in context:** "I drew this user interface in Keynote and I put it on a phone and I'm holding this phone in my bedroom where I might expect to use it in the morning."

## During — feedforward

"Feedforward refers to helping people understand what is happening *while* they're interacting" — it's what makes interactions fluid.

- **Hit areas larger than the visual** — "particularly important for very small controls."
- **Highlight instantaneously on touch-down.** Slow fades/grows on press "can make things feel unresponsive"; reserve continuous animation for pressure-continuous input.
- **Drag-out-to-cancel, drag-back-to-re-arm.** "It's what makes a fluid interaction *undecided* — you don't know which screen paging will end up on until you lift your finger, and the same thing applies to a very simple button." Honor it in custom controls.
- Hinting the result mid-press (toast peeking out on touch-down) was *tried and cut* as too much — but tried first. "The only way I can really know if an animation is appropriate or not is to try it."

## After — feedback

- Decide the un-highlight: immediate, or slightly delayed "so that even fast taps can be seen." Double-tap support forces a confirmation delay — weigh it.
- **Connect control feedback to result feedback:** button flash + the toaster icon starting to animate + a "toast started" label (tell *and* show).
- **States must not be confusable.** A "Stop Toasting" button that replaced "Make Toast" "looks an awful lot like" the original — rejected; they moved to a separate, visually distinct stop control (and toned down an alarming red).
- **Windup for weighty actions** (Andy Allen's "most satisfying checkbox," (Not Boring)): "Every action needs a windup. A big action… needs a big wind up" — use a *long press* (not a tap) to make a significant moment deliberate, play the animation **in reverse if released early**, and layer redundant sensory channels (visual + sound + haptic) because digital experiences are "trapped behind a hard pane of glass." Route haptic/AHAP mechanics to [sound-design.md](sound-design.md).

## Fluid interactions (beyond a single control)

A fluid interface is one where "the tool feels like an extension of your mind" — and it's "more than just frame rates" (60fps can still feel off). The rules:

- **Instant response everywhere; interruptible and redirectable always.** Thought and gesture happen *in parallel* — let people abort, redirect, and chain gestures mid-flight (the iPhone X two-axis gesture space). Detect a pause by the **spike in finger deceleration**, not a timer.
- **Hysteresis:** a touch becomes a swipe only after ~**10 points** of movement — that's also when you lock the axis.
- **One-to-one tracking:** content moves with the finger from the moment the gesture starts; respect the **relative grab point** (never re-center under the finger); keep touch *history* so the full momentum transfers on release. Breaking 1:1 is itself a signal (end of content).
- **Rubberband every boundary** — a hard stop is indistinguishable from a frozen phone; soften handoffs between gesture domains too.
- **Spatial consistency:** things exit and re-enter by symmetric paths; an asymmetric exit means "it went somewhere."
- **Project momentum — design for intent:** on release, compute where the flick *would land* (scroll deceleration) and target the snap point nearest *that*, not nearest the finger (the FaceTime PiP corners). "Take them there."
- **Detect gestures in parallel, cancel losers** — show feedback immediately, withdraw it if another gesture wins; avoid end-only recognizers.
- **Teach by showing:** clip content at edges to invite scrolling; float interactive elements on their own plane; align a static animation with its gesture (Safari's tab-close X slides the tab left). Play is the tutorial: "you feel like you're discovering the interface."
- **Prototype interactively** — "the interactive demo… is really worth a million static designs" (the how lives in `design-prototyping`).

(Spring tuning — damping/response, momentum-rewarding overshoot — lives in [swiftui-animation.md](swiftui-animation.md)'s spring section, sourced from this same talk.)

## MDS field rules (live sessions)

- **Unified 48px touch-target rhythm.** Don't size targets per-control — pick one increment and apply it everywhere: swatches, steppers, and buttons all at 48 ("48 would be also just a really good consistent touch Target size"). "If we are obsessive about these increments at this fundamental level it's going to make everything work out much better" as the design builds on top of it.
- **Keyboard-first mobile design.** "Anytime you're designing a mobile design you really need to grab a keyboard and pop that joker in" — an active field *means* the keyboard is up, so "do not design an active input field" without the keyboard showing. The keyboard eats half the layout; design for that reality, not the empty canvas.
- **Payment-adjacency safety.** Keep destructive or charge actions clear of casual tap zones — MDS added breathing room above a payment row because "we don't want… someone accidentally tapping their card when they are trying to pay." Treat the area around a charge button as a no-fly zone for other targets.

## Checklist

- [ ] Tappability obvious from shape/context — standard shapes for unfamiliar contexts?
- [ ] Label in the user's words (verb phrase), not internal vocabulary; icon only where meaning is established?
- [ ] Hit area generous (larger than the visual for small controls)?
- [ ] Touch-down highlight instantaneous; drag-out cancels, drag-back re-arms?
- [ ] Result feedback connected to the control (tell + show)?
- [ ] Distinct states look distinct — no near-identical toggle labels?
- [ ] Did you actually try the variants on a device, in context?
- [ ] Gestures: hysteresis ~10pt, axis locked at threshold, 1:1 tracking from the grab point, momentum transferred on release?
- [ ] Everything interruptible mid-animation; boundaries rubberbanded; snap targets chosen by projected intent?

See `touch-interaction-design/fluid-interfaces.md` for the full Fluid Interfaces distillation (principles, dynamic motion, gesture design, the projection code).

## Relationship to other skills

- **[sound-design.md](sound-design.md)** — the same talk's other half: the click sounds, down/up pairs, and tonal confirmation that complete the multisensory button. See/feel/hear are "one single experience."
- **`design-polish`** / **`design-polish` (emil-kowalski reference)** — the web design-engineering counterparts (hit areas, press scale, interruptibility); this skill is the Apple-talk articulation of *why* those tactics work, organized by phase.
- **`naming-features-and-labels`** — "Make Toast" vs. "Toast" is a naming call; judge the label's word there.
- **`apple-design` (apple-navigation-design)** — what a button *does* structurally (push/modal/menu) lives there; how it *feels* to press lives here.
- **[swiftui-animation.md](swiftui-animation.md)** / **`web-animation-design`** — implementation of press feedback and gesture-driven springs per platform.
- **`design-principles`** — *Craft* (instant response) and *Forgiveness* (drag-out cancel is undo-before-commit).
