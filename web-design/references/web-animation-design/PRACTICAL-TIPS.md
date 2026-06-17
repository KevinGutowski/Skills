# Practical Animation Tips

## Contents
- Recording & Debugging
- Button & Click Feedback
- Tooltips & Popovers
- Speed & Timing
- Choreographing Multi-Step Animations
- Live Tuning Panels
- Hover States
- Touch & Accessibility
- Easing Selection
- Visual Tricks
- From the Full Course Sweep (lessons + walkthroughs)
- Layout Animation Internals (nan.fyi trail — Nanda Syahrasyad)
- Field Notes from Design Engineers (course interviews)
- Why Details Matter


Detailed reference guide for common animation scenarios. Use this as a checklist when implementing animations.

## Recording & Debugging

### Record Your Animations

When something feels off but you can't identify why, record the animation and play it back frame by frame. This reveals details invisible at normal speed.

### Fix Shaky Animations

Elements may shift by 1px at the start/end of CSS transform animations due to GPU/CPU rendering handoff.

**Fix:**

```css
.element {
  will-change: transform;
}
```

This tells the browser to keep the element on the GPU throughout the animation.

### Take Breaks

Don't code and ship animations in one sitting. Step away, return with fresh eyes. The best animations are reviewed and refined over days, not hours.

## Button & Click Feedback

### Scale Buttons on Press

Make interfaces feel responsive by adding subtle scale feedback:

```css
button:active {
  transform: scale(0.97);
}
```

This gives instant visual feedback that the interface is listening.

### Don't Animate from scale(0)

Starting from `scale(0)` makes elements appear from nowhere—it feels unnatural.

**Bad:**

```css
.element {
  transform: scale(0);
}
.element.visible {
  transform: scale(1);
}
```

**Good:**

```css
.element {
  transform: scale(0.95);
  opacity: 0;
}
.element.visible {
  transform: scale(1);
  opacity: 1;
}
```

Elements should always have some visible shape, like a deflated balloon.

## Tooltips & Popovers

### Skip Animation on Subsequent Tooltips

First tooltip: delay + animation. Subsequent tooltips (while one is open): instant, no delay.

```css
.tooltip {
  transition:
    transform 125ms ease-out,
    opacity 125ms ease-out;
  transform-origin: var(--transform-origin);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

/* Skip animation for subsequent tooltips */
.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

Radix UI and Base UI support this pattern with `data-instant` attribute.

### Make Animations Origin-Aware

Popovers should scale from their trigger, not from center.

```css
/* Default (wrong for most cases) */
.popover {
  transform-origin: center;
}

/* Correct - scale from trigger */
.popover {
  transform-origin: var(--transform-origin);
}
```

**Radix UI:**

```css
.popover {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}
```

**Base UI:**

```css
.popover {
  transform-origin: var(--transform-origin);
}
```

## Speed & Timing

### Keep Animations Fast

A faster-spinning spinner makes apps feel faster even with identical load times. A 180ms select animation feels more responsive than 400ms.

**Rule:** UI animations should stay under 300ms.

### Don't Animate Keyboard Interactions

Arrow key navigation, keyboard shortcuts—these are repeated hundreds of times daily. Animation makes them feel slow and disconnected.

**Never animate:**

- List navigation with arrow keys
- Keyboard shortcut responses
- Tab/focus movements

### Be Careful with Frequently-Used Elements

A hover effect is nice, but if triggered multiple times a day, it may benefit from no animation at all.

**Guideline:** Use your own product daily. You'll discover which animations become annoying through repeated use.

### The Trackability Threshold

Too fast is as bad as too slow — below a certain duration the eye can't track what changed, and the animation reads as a flicker rather than motion. If a transition feels flat rather than slow, the *easing curve* is probably too weak (asymmetric custom curves feel more alive than symmetric built-ins). And exits shouldn't just be ~20% faster than entries — they should be *simpler* too (fewer animated properties).

### Hierarchy & Spatial Coherence (from the course's judgement exercises)

- **Not all elements deserve the same animation** — vary timing/treatment by visual importance; the hero gets the entrance, supporting elements follow quietly.
- **One entrance per container.** Don't animate the parent *and* stagger its children — pick one level to own the motion.
- **Exit direction should match entry direction** — a panel that slides in from the right leaves to the right.
- **Navigation direction should match the mental model** — "Next" advances one way, "Back" reverses it (direction-aware step transitions).

## Choreographing Multi-Step Animations

For sequenced, multi-stage animations (entrances, scroll-triggered reveals, staggered groups), structure the code as a **storyboard** (pattern from Josh Puckett's Interface Craft):

- **ASCII storyboard comment** at the top of the file — a shot list anyone can scan without reading code: right-aligned ms values, `→` for value transitions (`scale 0.85 → 1.0`), stagger intervals in parentheses, one line per stage.
- **One `TIMING` object** holding every stage delay (ms after trigger, not deltas), camelCase verb-phrase keys, inline comment per key. The *only* place timing lives.
- **One UPPERCASE config object per animated element** grouping all its values — scales, offsets, colors, *and its spring* — never inline in JSX. Repeated items become arrays rendered with `.map()`.
- **A single `stage` integer state** (not multiple booleans), advanced by `setTimeout`s reading from `TIMING` in one effect (with cleanup); JSX uses additive `stage >= N` checks. A `replayTrigger` prop in the dependency array gives free click-to-replay.

Spring starting points by element role: containers/cards `{ stiffness: 300, damping: 30 }` (smooth settle) · pop-ins/badges `{ stiffness: 500, damping: 25 }` (snappy) · slide entrances `{ stiffness: 350, damping: 28 }` (balanced).

**Why:** zero magic numbers in JSX means the animation reads like a script and every value is instantly tunable — which is also exactly the shape a live tuning panel (or an agent editing the file) needs.

## Live Tuning Panels

Don't guess-edit-refresh animation values — expose them as real-time controls and *feel* the differences (Josh Puckett's "live tuning"; his DialKit library is the ready-made React/Motion option, but the discipline is library-agnostic and any agent can build you a panel).

**Panel discipline:** one named panel per component · group related controls into folders (e.g. all shadow params together) · prefer perceptual spring controls (visualDuration + bounce) over raw physics (stiffness/damping) — simpler to reason about · add action buttons (replay, reset) so you can re-trigger without reloading.

**Sensible control ranges** (starting points; tune from here):

| Property | Default | Range | Step |
|---|---|---|---|
| opacity | 1 | 0–1 | 0.01 |
| blur | 0 | 0–100px | 1 |
| scale | 1 | 0.5–2 | 0.1 |
| rotation | 0 | ±180° | 1 |
| offsetX/Y | 0 | ±100px | 1 |
| borderRadius | 0 | 0–50px | 1 |
| shadowBlur | 16 | 0–48px | 1 |
| shadowOffsetY | 8 | 0–24px | 1 |
| shadowOpacity | 0.2 | 0–1 | 0.01 |
| gap / padding | 16 | 0–48px | 1 |
| duration | 0.3s | 0–2s | 0.1 |
| stagger | 0.1s | 0–0.5s | 0.01 |

**Pattern starting configs** (spring values as visualDuration/bounce): fade-in `0.4 / 0` · scale-up from 0.9 `0.3 / 0.2` · slide-in (20px offsetY + fade) `0.4 / 0.1` · hover card (scale ≤1.1, shadow lift) `0.2 / 0.1`. These respect the theme's speed rules — interaction feedback stays fast, entrances get slightly more room.

## Hover States

### Keep Hover Effects Restrained

From the course's judgement exercises: a hover **scale beyond 1–2% is almost always too much** (the "inflated card" failure) — prefer `scale(1.01)`–`scale(1.02)` for cards, and keep hover transitions at **100–150ms** (200ms+ reads as sluggish for something triggered constantly). Buttons benefit most from having **both** a hover state and a press state (`:active` scale ~0.97) — the pair is what makes them feel responsive.

### Fix Hover Flicker

When hover animation changes element position, the cursor may leave the element, causing flicker.

**Problem:**

```css
.box:hover {
  transform: translateY(-20%);
}
```

**Solution:** Animate a child element instead:

```html
<div class="box">
  <div class="box-inner"></div>
</div>
```

```css
.box:hover .box-inner {
  transform: translateY(-20%);
}

.box-inner {
  transition: transform 200ms ease;
}
```

The parent's hover area stays stable while the child moves.

### Disable Hover on Touch Devices

Touch devices don't have true hover. Accidental finger movement triggers unwanted hover states.

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: scale(1.05);
  }
}
```

**Note:** Tailwind v4's `hover:` class automatically applies only when the device supports hover.

## Touch & Accessibility

### Ensure Appropriate Target Areas

Small buttons are hard to tap. Use a pseudo-element to create larger hit areas without changing layout.

**Minimum target:** 44px (Apple and WCAG recommendation)

```css
@utility touch-hitbox {
  position: relative;
}

@utility touch-hitbox::before {
  content: "";
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-height: 44px;
  min-width: 44px;
  z-index: 9999;
}
```

Usage:

```jsx
<button className="touch-hitbox">
  <BellIcon />
</button>
```

## Easing Selection

### Use ease-out for Enter/Exit

Elements entering or exiting should use `ease-out`. The fast start creates responsiveness.

```css
.dropdown {
  transition:
    transform 200ms ease-out,
    opacity 200ms ease-out;
}
```

`ease-in` starts slow—wrong for UI. Same duration feels slower because the movement is back-loaded.

### Use ease-in-out for On-Screen Movement

Elements already visible that need to move should use `ease-in-out`. Mimics natural acceleration/deceleration like a car.

```css
.slider-handle {
  transition: transform 250ms ease-in-out;
}
```

### Use Custom Easing Curves

Built-in CSS curves are usually too weak. Custom curves create more intentional motion.

**Resources:**

- Course reference: `/learn/easing-curves`
- External: [easings.co](https://easings.co/)

## Visual Tricks

### Use Blur as a Fallback

When easing and timing adjustments don't solve the problem, add subtle blur to mask imperfections.

```css
.button-transition {
  transition:
    transform 150ms ease-out,
    filter 150ms ease-out;
}

.button-transition:active {
  transform: scale(0.97);
  filter: blur(2px);
}
```

Blur bridges visual gaps between states, tricking the eye into seeing smoother transitions. The two states blend instead of appearing as distinct objects.

**Performance note:** Keep blur under 20px, especially on Safari.

## From the Full Course Sweep (lessons + walkthroughs)

**Process & tuning**
- **Choose easing first, then duration** — "the duration largely depends on the easing you choose" (Family Drawer walkthrough). Uncommon durations (0.27s) are fine if they feel right.
- **Paired elements stay in the same curve family**: when two animations must feel in sync (drawer height + content fade), use lighter/heavier strengths of the *same* easing type, never different families.
- **A steep curve buys a longer duration**: Vaul runs 500ms — far over the sub-300ms guideline — because its `cubic-bezier(0.32, 0.72, 0, 1)` is extremely steep at the start (mimicking the iOS sheet spring's fast start/gentle settle). Judge duration *with* the curve, not in isolation.
- **Borrow the platform's curve for native feel**: Vaul uses Ionic's iOS-sheet easing verbatim — a tiny detail that makes a web component feel native.
- **Make secondary durations dynamic**: the Family drawer scales its crossfade duration to the height delta — short→short transitions get shorter fades.

**Rules sharpened by the walkthroughs**
- **Bounce requires force**: the same sheet bounces when *dragged* shut (a drag has physical force, like throwing a ball) and doesn't bounce on a *press* — gate bounce on whether the user applied a gesture.
- **Prefer translate percentages over px**: `translateY(100%)` moves an element by its own size, so Sonner/Vaul work at any content height — "percentages are less error prone."
- **Pure rotation reads best with ease-in-out**; CSS *transitions* are interruptible while CSS *keyframe animations* are not — which is why enter animations whose end state can change mid-flight (toast stacking) use transitions.
- Animating `box-shadow` is expensive — animate opacity of a pre-rendered shadow layer instead.

**Techniques**
- **The clip-path duplicate-overlay**: duplicate an element, style the duplicate as the "after" state, and animate `clip-path: inset(...)` to reveal it — seamless tab highlights (no color-transition timing problems), theme-change reveals, comparison sliders, and image reveals with zero layout shift; hardware-accelerated.
- **Desynced idle drift**: barely-visible float (~3s period) on the group + subtle rotate (~4s) on the background — different periods never sync, so the scene feels organic, not mechanical.
- **Hover-intent debounce (~100ms)** before triggering rich hover animations — short enough to feel responsive, long enough to kill accidental triggers (Apple's Dynamic Island does this).
- **Two-tap pattern on touch**: `pointer: coarse` devices get tap-once = hover state, tap-again = action; hover and click firing together on touch glitches the choreography.

**Principles from "Animations of the future" + Family Values (benji.org)**
- **Morph, don't replace**: envision the interface as one continuous space "where any element can transform into another" — a button becomes the form, deleted items are *thrown* into the trash. Fluidity also reads as speed (Family's graph transition feels faster than a static swap at identical load time).
- **Design the UI around the animation**: true fluid transitions require positioning/styling elements so the morph is seamless — decided *before* the visual design is final.
- **Text morphing flags consequence changes**: morph a button's label when its action changes — "distracting" is the point; the user must notice the button now does something different.
- **The delight-impact curve** (Family Values): delight potential rises as usage frequency falls. Rarely-used features deserve special moments; daily features need restraint. And polish uniformly — "users notice when parts of an app are less polished."
- Fluidity priority check: if the product still misses features or has bugs, fix those first — fluidity gets overshadowed.

## Layout Animation Internals (nan.fyi trail — Nanda Syahrasyad)

*From "Inside Framer's Magic Motion" and "The Power of Keys in Framer Motion" (nan.fyi), reached via the course's link trail.*

- **FLIP = First, Last, Inverse, Play** — how `layout` animations work under the hood: measure with `getBoundingClientRect()` before the layout change (First) and after (Last), apply a compensating transform so the element appears unmoved (Inverse), then animate the transform to zero (Play). The point: layout properties animate on the main thread "in every frame of the animation," and some (`justify-content`) aren't animatable at all — FLIP converts both cases into cheap transforms.
- **Scale-distortion correction**: when a parent scales, counter-scale children with `childScale = 1 / parentScale` — and recalculate it **every frame** from the parent's current scale, because "the 'correct' inverse scale does not change in the same manner as the parent animation." Same trick covers border-radius distortion. Set `transformOrigin: "top left"` (or compute between origins) when combining position + size.
- **Keys are an animation tool**: "when a component's key changes, React will treat that component as a different component, unmounting the existing component" — so changing a key *replays the mount animation* and, inside `AnimatePresence`, triggers the old child's exit + the new child's entrance. Stable keys = persistent state; changed keys = a deliberate remount transition. (SwiftUI's `.id()` analog lives in `swiftui` (swiftui-identity).)

## Field Notes from Design Engineers (course interviews)

From Emil's interviews with Henry Heffernan (Vercel), Lochie Axon (Family), and Dennis Brotzky (Fey):

**Durations & decision rules**
- Hard ceiling: a transition should essentially never exceed **1 second**, even with an extreme curve. Click-feedback go-to is **200ms, often 150ms**.
- The delete-rule: "If you ever find yourself at 150 milliseconds… 'this is not fast enough', it is probably not worth animating at all."
- **Page-load entrances must be CSS** — a JS animation library needs JavaScript loaded, so library-driven entrances delay first visuals. Save Motion/React Spring for post-hydration interactions.
- Simple layout changes can usually be faked with transforms instead of reaching for a layout-animation engine.

**Springs in practice**
- **Match spring tightness to context**: a tight spring suits a hover; the same tight spring on a scale-from-zero entrance feels too sharp — and a wobbly spring on a hover doesn't work at all (Lochie).
- **Per-element configs for key moments**: "unless it's the same component, it will have its own custom spring configuration" — but reserve this obsession for heroes and high-frequency elements (Dennis).
- Springs vs beziers matter most on **larger movements**; plain `ease` is fine for hover color/opacity.
- **Micro-overshoot for snappy elements**: instead of a visible bounce, tune the final keyframe to ~**1.005** — one or two pixels of overshoot, "just enough… because it moves so fast" (Family's Backup Now).
- Set a **project-wide default via MotionConfig** (or equivalent), tuned *subtle*, then override only where needed — "work your way up from there rather than having something too extravagant and having to work everything back down."

**Entrances & staging**
- **Start shots already in motion** (Ben Fryc, Wealthsimple — Config 2024): tweak the curve "so that the motion starts as soon as the shot starts" and eases into place; channel the motion of one shot into the next, breaking the chain only for deliberate dramatic pauses. (Marketing-video/film craft applied to UI sequences.)
- **Choreograph where the eye goes**: Family's hero animates illustrations out from the center on an "M curve" so the motion path itself returns attention to the content. Staging is "the most important [animation principle] that a lot of people tend to forget."
- **Short entrance offsets**: animating from too far away "drives the eye too far away… disjointed."
- The done-test: it's right "if I stop noticing what is animating" — flow, nothing pulling the eye.
- Map desired character to a specific classic principle: playful → squash & stretch; snappier → anticipation or quicker easing.
- Iterate curves, don't pick them: craft 4–5 cubic-bezier candidates per important animation and dial in; an asymmetric subtle-in/aggressive-out curve is a natural-feeling default (Henry).

**SVG & code hygiene**
- Never animate raw paths — **wrap elements in groups** (cleaner bounding boxes, controllable transform origins). Elements that enter "together" but live in separate groups get manual matched delays rather than re-grouping (re-grouping merges their origins).
- Keep a global **`debug-svg` CSS class** that outlines/recolors the currently-targeted group so you can see exactly what you're animating.
- CSS vs JS, the collaborative tiebreaker: hovers/dropdowns → CSS; interruptible/graphical → Motion; on team codebases prefer the JS library for readability — "is a tiny bit more performance really a better payoff than someone coming in and being confused?" CSS `linear()` springs are a niche tool (static but spring-shaped — e.g. dropping a JS dependency from a library bundle).

## Why Details Matter

> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune."
> — Paul Graham, Hackers and Painters

Details that go unnoticed are good—users complete tasks without friction. Great interfaces enable users to achieve goals with ease, not to admire animations.

**Animations are the purest proof of care** (Josh Puckett, guest lesson): they aren't required, don't exist by default in any framework, don't appear in screenshots, and can't be captured in static design tools — "they exist only in the reality of use." A tasteful transition tells the user someone cared about them specifically; care shown in a small interaction (a sticker peel-off on an RSVP page, a swipe-confirm icon) builds trust in the whole product. And don't ship same-day: review with fresh eyes over days — replay, step away, tweak (Sonner's transitions were coded in days and replayed daily before release).
