---
name: touch-interaction-design
description: Design touch controls, gestures, and fluid interactions — the three feedback phases of a control (before: affordance/labels; during: instant highlight, generous hit areas, drag-out-to-cancel; after: connected result feedback, distinct states) plus fluid-interface principles (interruptible/redirectable gestures, hysteresis ~10pt, one-to-one tracking, rubberbanding, momentum projection, spatial consistency, teaching through play). Use when designing or reviewing buttons, custom gestures, or swipe interactions; fixing laggy or rigid-feeling interactions; or snapping draggable elements by intent. Based on Apple WWDC 2018 sessions 804 (interaction half; sound half in sound-design) and 803 "Designing Fluid Interfaces". Triggers: button design, affordance, hit area, feedforward, drag out to cancel, fluid interface, hysteresis, one-to-one tracking, rubberband, momentum projection, feels unresponsive.
---

# Touch Interaction Design

**Sources** — this skill aggregates two Apple WWDC 2018 sessions:
- *Session 804 — "The Life of a Button" (Julian, designer/prototyper; Hugo Verweij's sound half lives in `sound-design`). https://developer.apple.com/videos/play/wwdc2018/804/*
- *Session 803 — "Designing Fluid Interfaces" (Chan Karunamuni, Nathan de Vries, Marcos Alonso — the iPhone X gesture team). https://developer.apple.com/videos/play/wwdc2018/803/*

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

(Spring tuning — damping/response, momentum-rewarding overshoot — lives in `swiftui-animation`'s spring section, sourced from this same talk.)

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

See `references/fluid-interfaces.md` for the full Fluid Interfaces distillation (principles, dynamic motion, gesture design, the projection code).

## Relationship to other skills

- **`sound-design`** — the same talk's other half: the click sounds, down/up pairs, and tonal confirmation that complete the multisensory button. See/feel/hear are "one single experience."
- **`make-interfaces-feel-better`** / **`emil-design-eng`** — the web design-engineering counterparts (hit areas, press scale, interruptibility); this skill is the Apple-talk articulation of *why* those tactics work, organized by phase.
- **`naming-features-and-labels`** — "Make Toast" vs. "Toast" is a naming call; judge the label's word there.
- **`apple-navigation-design`** — what a button *does* structurally (push/modal/menu) lives there; how it *feels* to press lives here.
- **`swiftui-animation`** / **`web-animation-design`** — implementation of press feedback and gesture-driven springs per platform.
- **`design-principles`** — *Craft* (instant response) and *Forgiveness* (drag-out cancel is undo-before-commit).
