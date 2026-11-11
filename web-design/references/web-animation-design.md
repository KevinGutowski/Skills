# Web Animation Design

*Scope: Designs web animations that feel natural — easing, duration, springs, performance and accessibility. The DEFAULT theme for web motion values: when design skills overlap on easing/duration/spring choices, route here. Use when animating UI elements or handling motion accessibility. Triggers: easing, cubic-bezier, spring physics, microinteractions, stagger, prefers-reduced-motion.*

A comprehensive guide for creating animations that feel right, based on Emil Kowalski's "Animations on the Web" course.

## Contents

- Theme Note
- Quick Start
- Review Format (Required)
- Review Method: Flag Triggers, Fix Order, Verdict
- The Easing Blueprint
- Timing and Duration / Duration Guidelines
- Why Animation Works (Perception)
- Animation's Purpose: Five Patterns (Nabors, ch. 2)
- When to Animate
- Build Order and Tool Ladder
- Spring Animations
- Performance
- Accessibility
- Practical Tips
- Easing Decision Flowchart
- Communicating Motion to Engineers (Briggs)
- Reference Files

## Theme Note

The specific values in this skill (durations, easings, scale magnitudes, stagger delays) are tuned to work as a coherent set — like a color scheme, they look best when committed to as a whole. If another design skill or theme (e.g. `design-craft`, or its Emil Kowalski reference) is also loaded with different numbers, pick one theme's values and apply them consistently rather than averaging.

**This skill is the default theme for motion-related work.** When motion questions arise and multiple skills could apply, prefer these values unless the user opts into another. If the user is mixing skills and a genuine choice surfaces, briefly present the options as a menu rather than picking silently. That menu is for a choice *between themes* only. Inside one theme, make the call: do not hand the user three easings or two durations to pick from — choose, state the reason in a clause, and move on (Kowalski's skills are explicit that motion options are not a menu).

These values and techniques are for **web/CSS/JS** motion. On **iOS/SwiftUI**, animations/transitions/effects are covered by `swiftui` (swiftui-animation), scroll-driven motion by `swiftui` (swiftui-lazy-stacks), and brand-through-motion by `apple-design` (ios-brand-identity) — don't cross-apply CSS specifics there.

## Quick Start

Every animation decision starts with these questions:

1. **Is this element entering or exiting?** → Use `ease-out`
2. **Is an on-screen element moving?** → Use `ease-in-out`
3. **Is this a hover/color transition?** → Use `ease`
4. **Will users see this 100+ times daily?** → Don't animate it

Naming an effect someone can only describe → [animation-vocabulary.md](web-animation-design/animation-vocabulary.md). More than one element moving on the same event → [choreography.md](web-animation-design/choreography.md). Dropped frames → [animation-performance.md](web-animation-design/animation-performance.md).

## Review Format (Required)

When reviewing animations, you MUST use a markdown table. Do NOT use a list with "Before:" and "After:" on separate lines. Always output an actual markdown table like this:

| Before                            | After                                           |
| --------------------------------- | ----------------------------------------------- |
| `transform: scale(0)`             | `transform: scale(0.95)`                        |
| `animation: fadeIn 400ms ease-in` | `animation: fadeIn 200ms ease-out`              |
| No reduced motion support         | `@media (prefers-reduced-motion: reduce) {...}` |

Wrong format (never do this):

```
Before: transform: scale(0)
After: transform: scale(0.95)
────────────────────────────
Before: 400ms duration
After: 200ms
```

Correct format: A single markdown table with | Before | After | columns, one row per issue. Add a third **Why** column when the reader needs the reason (one clause per row), and cite `file:line`.

## Review Method: Flag Triggers, Fix Order, Verdict

Review posture: a transition that runs but feels sluggish, lands from the wrong origin, fires too often, or drops frames is a regression, not a pass. Approval is earned. (Method from Kowalski's `review-animations` skill; values are this file's.)

**Flag on sight:**

- `transition: all`
- `scale(0)` entrances; `ease-in` on any UI interaction; a default keyword easing on a deliberate animation
- Any animation on a keyboard shortcut, command-palette toggle, or other 100+/day action
- UI duration over 300ms with no stated reason
- `transform-origin: center` on a trigger-anchored popover, dropdown, or tooltip (modals are exempt — they are viewport-centered)
- Keyframes on toasts, toggles, or anything triggered rapidly (they restart from zero; transitions retarget)
- Animated layout properties; a parent CSS variable written per frame to drive child transforms
- Movement with no `prefers-reduced-motion` handling; ungated `:hover` motion
- Identical enter/exit timing on a press-and-release or hold interaction
- A group entrance that staggers uniformly, or staggers at all on high-frequency UI (see [choreography.md](web-animation-design/choreography.md))

**Fix order — prefer the earlier move:**

1. Delete the animation (high-frequency, keyboard-triggered, or purposeless)
2. Reduce it — shorter, smaller transform, fewer properties
3. Fix the easing
4. Fix origin and physicality (`transform-origin`; `scale(0)` → `scale(0.95)` + opacity)
5. Make it interruptible — keyframes → transitions, or a spring for gesture-driven motion
6. Move it to compositor properties (see [animation-performance.md](web-animation-design/animation-performance.md))
7. Make timing asymmetric — slow the deliberate phase, snap the response
8. Polish — blur to bridge a crossfade, a budgeted stagger, `@starting-style` entry
9. Accessibility and cohesion — reduced-motion and hover gating, tune to the component's personality

Most agent reviews start at step 8. Start at step 1.

**Verdict after the table**, grouped by impact, empty tiers omitted: feel-breaking regressions → animations that should be removed or reduced → performance → interruptibility and timing → origin, physicality, cohesion → accessibility. Close with an explicit decision:

- **Block** — any feel-breaking regression; animation on a keyboard or high-frequency action; `scale(0)` or `ease-in` on UI; a layout-property animation with an easy compositor swap.
- **Approve** — none of the above, nothing that obviously should be deleted, durations and easing in bounds, interruptibility handled where needed, reduced motion respected.

When feel cannot be judged from code, say so and name what to watch: play it at 2–5× duration or step it in the DevTools Animations panel, test gestures on a real phone, and look again the next day.

## The Easing Blueprint

### ease-out (Most Common)

Use for **user-initiated interactions**: dropdowns, modals, tooltips, any element entering or exiting the screen.

```css
/* Sorted weak to strong */
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
--ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
```

Why it works: Acceleration at the start creates an instant, responsive feeling. The element "jumps" toward its destination then settles in.

### ease-in-out (For Movement)

Use when **elements already on screen need to move or morph**. Mimics natural motion like a car accelerating then braking.

```css
/* Sorted weak to strong */
--ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
--ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
--ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
--ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
```

### ease (For Hover Effects)

Use for **hover states and color transitions**. The asymmetrical curve (faster start, slower end) feels elegant for gentle animations.

```css
transition: background-color 150ms ease;
```

### linear (Avoid in UI)

Only use for:

- Constant-speed animations (marquees, tickers)
- Time visualization (hold-to-delete progress indicators)

Linear feels robotic and unnatural for interactive elements.

### ease-in (Almost Never)

**Avoid for UI animations.** Makes interfaces feel sluggish because the slow start delays visual feedback.

### Physical-reference easing (Briggs school)

Derek Briggs is stricter than the curve tables above: never ship the default CSS keyword easings — "they're not accurate," robotic at start and end (Briggs, Shape FM ep. 3). His method: derive a motion's character from a physical analogue — a fan settling back on its ball bearing, the body lurch of a stopping car, sliding a phone across a table. Compatible with the named cubic-beziers above; Briggs adds:

- **Front-load the velocity peak**: "do not want it to evenly ease into a center point of a top speed and then ease out" — peak early so the ease-out feels natural; a late peak only reads right when the element is "coming up against something" (an edge or container).
- **Tooling**: motion.dev for nearly everything; CSS `linear()` for tiny things only.
- **House curves beat vague adjectives** (Kevin Kold, 2026): define a small named easing set as tokens and reuse it everywhere. Example values from his article: `--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1)` for most transitions, `--ease-spring: cubic-bezier(0.35, 1.55, 0.65, 1)` only for tiny pop/overshoot moments, and a symmetric curve for moves that truly need in/out balance. The lesson is tokenized consistency more than those exact numbers; do not mix them into another motion theme unless you adopt the set as a whole.

### Paired Elements Rule

Elements that animate together must use the same easing and duration. Modal + overlay, tooltip + arrow, drawer + backdrop—if they move as a unit, they should feel like a unit.

```css
/* Both use the same timing */
.modal {
  transition: transform 200ms ease-out;
}
.overlay {
  transition: opacity 200ms ease-out;
}
```

## Timing and Duration

## Duration Guidelines

| Element Type                      | Duration  |
| --------------------------------- | --------- |
| Micro-interactions                | 100-150ms |
| Standard UI (tooltips, dropdowns) | 150-250ms |
| Modals, drawers                   | 200-300ms |

**Rules:**

- UI animations should stay under 300ms
- Larger elements animate slower than smaller ones
- Exit animations can be ~20% faster than entrance
- **Field corroboration (Linear's stylesheet, via performance.dev 2026):** tokens of `0.1s` quick / `0.25s` regular / `0.35s` slow, hover highlight fade-in `0s` and fade-out `0.15s` — popovers and panels "appear instantly when you summon them, then fade out over 150ms when you dismiss them," and list rows get no transitions at all. Defaulting below Material's 200 ms is one of the cheapest ways to make an app feel faster.
- Match duration to distance - longer travel = longer duration
- **Modulate by Cone of Vision** (Nabors, *Animation at Work*, ch. 3): "animations in the center of the user's Cone of Vision do better with shorter durations (closer to the 70-200 ms spectrum)"; animations "on the edge of the Cone of Vision benefit from additional time… in the 300-700 ms spectrum"
- **Halve your durations** (Nabors, ch. 3): long exposure warps your sense of speed — "Whatever your pre-production duration is, halve it. Then halve it again!"

### The Frequency

Determine how often users will see the animation:

- **100+ times/day** (keyboard shortcuts, command palette, toggles) → No animation
- **Tens of times/day** (hover effects, list navigation) → Remove, or reduce to near-imperceptible
- **Occasional** (modals, drawers, toasts) → Standard animation
- **Rare/first-time** (onboarding, success moments) → Can be more special; the only tier where delight alone is a valid purpose

**Example:** Raycast never animates because users open it hundreds of times a day.

## Why Animation Works (Perception)

From Rachel Nabors, *Animation at Work* (A Book Apart, 2017); fuller quotes in [references/animation-at-work.md](web-animation-design/animation-at-work.md).

- **Where vs. What systems** (ch. 1): Margaret Livingstone's terms — shape and color tickle the newer What System; "when we design with motion, too, we tap into the older Where System. We can use motion to orient users in an information space."
- **The brain's GPU** (ch. 1): "Using animation to explicitly show users the in-betweening keeps those processes on the brain's visual cortex instead" — "a shortcut through the brain's GPU." Hudson & Stasko: animation "allows the user to continue thinking about the task domain, with no need to shift contexts to the interface domain."
- **Animacy habituates** (ch. 1): a little motion defeats change blindness, but "much like New Yorkers don't notice the huge flashing LCD signs" on Broadway, "users quickly become blind to unimportant change."
- Her caveat (Conclusion): "be wary of outdated research… most of this research is very old and needs to be revisited."

## Animation's Purpose: Five Patterns (Nabors, ch. 2)

"Transitions take users from place to place in the information space… Supplements bring information on or off the page… Feedback indicates causation… Demonstrations explain how something works… Decorations do not convey new information and are purely aesthetic."

- **The context test** (complements the story test below): "That is animation's true purpose: to add context" — "use your words to describe what benefit or new information it supplies." If you can't, it's a decoration.
- **Prioritize on a 2×2**: justification (nice-to-have → necessary) × ease of implementation; justified-and-easy first. Animations fulfilling multiple patterns rank higher.
- **Cognitive-bottleneck smells**: "flashes of white" on page loads; content insertion/removal; "Wordy descriptions can indicate something being told instead of shown. Can a demonstration do it better?"

## When to Animate

**Do animate:**

- Enter/exit transitions for spatial consistency
- State changes that benefit from visual continuity
- Responses to user actions (feedback)
- Rarely-used interactions where delight adds value

**Don't animate:**

- Keyboard-initiated actions
- Hover effects on frequently-used elements
- Anything users interact with 100+ times daily
- When speed matters more than smoothness
- Data the user is trying to read — a dashboard's numbers and charts do not move for style

**Purpose gate:** before writing any motion, name what it does — spatial consistency, state indication, feedback, explanation, preventing a jarring change, or (rare/first-time tier only) delight. No purpose from that list means no animation, and "none" is a complete answer to "animate this."

**Marketing vs. Product:**

- Marketing: More elaborate, longer durations allowed
- Product: Fast, purposeful, never frivolous

**Animation is brand voice** (course's "big little details" lesson): timing and curves carry the same brand signal as type and color. Stripe's marketing animations are deliberately slow — "we are not in a hurry, we are here for you" (premium, reliable); Vercel's product animations are fast or absent because the brand *is* speed; a slower ease-in-out over ease-out reads elegant instead of snappy. Convey feeling on marketing surfaces; in the product itself, default to speed. Orchestrated entrances ("wave" stagger — Apple's nav columns) are trial-and-error until right; there's no formula. Two interview corollaries: when showing app animations on the marketing site, don't copy them 1:1 — slow them down into a *flourish* (the app optimizes for the result; the site showcases the process) yet keep the site slightly **less** extravagant than the product, so expectations aren't set higher than the app delivers (Lochie Axon, Family). And gate every marketing animation with the story test: "How do I tell a story with this animation? Is it even contributing to that story?" — sometimes the best animation is no animation (Henry Heffernan, Vercel).

**Per-primitive identity, not a rigid motion system** (Briggs, Shape FM ep. 3): "there's just all these design system primitives that should have their own sort of styling and visual details based on what their responsibility is" — a tooltip shouldn't enter like a dialog; a toast shouldn't exit like a popover. Consistency lives at the brand level (a shared spring/easing character), not in a small uniform animation taxonomy. Corroborates the brand-voice point above: brand sets the character, each primitive's responsibility sets the move.

**Never slow anyone down** (Briggs, Shape FM ep. 3): "The worst thing you can do with a transition or an animation within a product is slow anybody down" — the most important legitimate reason to animate is "where to draw somebody's eyes." Hover and button states default to NO transition: "just let it be instant, snappy, fast." Reserve animated entrances for acknowledgement containers (dialog, popover, toast): nothing physical is instant — even a light-bulb filament takes time to glow — so a minimal entry transition there beats a frame-pop; that argues for subtle entrances, not animated hovers. Exits carry valence: delete/cancel slips away slowly; acceptance exits quick and bouncy. Corroborates the Frequency rule and Emil's Raycast example.

**Motion only when earned** (Ryo Lu, Cursor — YC-website roast, 2025): "I don't like moving things when I'm not moving" — ambient motion steals attention from reading. Fire animation when the user arrives at the element, not before (hide a CTA "until say you're here and then it kind of animates in… you pay attention to it"), and "don't hijack the scroll."

**The overcooking hazard** (Andy Madrick + Ridd, Dive Club podcast): when you polish interactions in isolation (a single bug, a single component), "you run the risk of zooming out and you realize every single piece of the interface is overcooked." Two study prompts as the antidote — "where are the best products *not* using any interactions? Where are instant transitions applied?" (e.g. where Linear ships instant) — and the no-decoration baseline: "the default is, what does this thing look like with no decoration? With the same size typeface, with no animations. Take that and say, okay, where can I add a little flourish of delight here, and how does that help the user instead of detract?"

**Anti-spring-default + physical semantics** (Karl Koch, DuckDuckGo — Dive Club podcast): AI-generated motion "springs everything. Everything's a spring" — boing is wrong when the user clicked to *read*; the animation "needs to not be overly gratuitous." This skill's spring section agrees: springs are for gestures and alive elements, not default. And derive direction/character from the physical meaning of the act: inserting an item slides in because "I'm inserting it. I'm pushing it — in real life that's what we would do"; discarding is "more of a just poof and go away" because you've lost interest in it.

### Consistency rules (Nabors, *Animation at Work*, ch. 5)

- **Entrance/exit symmetry**: "When a piece of information animates onto the screen, it should also animate as it leaves" — entrance-only alerts that cut out feel "unfinished, unreliable."
- **Avoid FOULS — always be loading**: "the default state of content in a JavaScript-enabled environment is a loading state"; users see loading → loaded, never the unloaded state.
- **Consistency beats peak frame rate**: "A 30 FPS animation that consistently runs will appear smoother than a 60 FPS animation that dips from time to time." For fast long-distance moves, fade the object out mid-trajectory, back in at the destination.
- **Anticipatory signaling**: hover can foreshadow motion — her menu bar "lifts up" on hover: "if you click me, expect me to slide further up."
- **Waitstaff red flag** (reinforces the overcooking hazard above): a tester's "Oh, that's delightful!" "could be a red flag" — they *noticed* it, spending cognition on it.

## Build Order and Tool Ladder

Decide in this order; each step can end the work:

1. **Should it animate at all?** Frequency tier and purpose gate above.
2. **What does the codebase already do?** Reuse its motion tokens (duration and easing variables, a `MotionConfig`) and its installed library. Extend that vocabulary; never fork a second one. For a whole component with solved motion (toast, drawer, dialog), prefer a maintained library over hand-rolling — interruption, focus, and gesture edge cases are the expensive part.
3. **Which tool?** Reach for the first that fits:

| Need | Tool |
| --- | --- |
| A state change (hover, open/closed, toggle) | CSS transition — retargets cleanly when interrupted |
| Entry on mount | Transition plus `@starting-style` (older browsers: a mounted data attribute) |
| Loops, multi-step, or run-once sequences | CSS keyframe animation — restarts from zero when re-triggered, so not for rapid triggers |
| Programmatic values with compositor performance | Web Animations API (`element.animate()`) |
| Springs, gestures, shared layout, exit of unmounting components | Motion — only if the project already has it or the user asked |

4. **Values** from the Easing and Duration sections.
5. **Reduced-motion variant and hover gating ship in the same change**, not as a follow-up.
6. **State what cannot be verified from code** — if no browser was run, say what to watch for.

Tuned defaults that differ by component (all Kowalski theme): modal `scale(0.96)` + opacity with the backdrop on the same timing; drawer `translateY(100%)` on the iOS-style `cubic-bezier(0.32, 0.72, 0, 1)` at up to 500ms; toast on a 400ms `ease` transition with `@starting-style`; scroll reveals on marketing surfaces only, fired once; hold-to-confirm fill is `linear` because it visualizes elapsed time. Implementations: [PRACTICAL-TIPS.md](web-animation-design/PRACTICAL-TIPS.md), `design-craft` (emil-kowalski).

## Spring Animations

Springs feel more natural because they don't have fixed durations—they simulate real physics.

### When to Use Springs

- Drag interactions with momentum
- Elements that should feel "alive" (Dynamic Island)
- Gestures that can be interrupted mid-animation
- Organic, playful interfaces

### Configuration

**Apple's approach (recommended):**

```js
// Duration + bounce (easier to understand)
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

**Traditional physics:**

```js
// Mass, stiffness, damping (more complex)
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

### Bounce Guidelines

- **Avoid bounce** in most UI contexts
- **Use bounce** for drag-to-dismiss, playful interactions
- Keep bounce subtle (0.1-0.3) when used

### Interruptibility

Springs maintain velocity when interrupted—CSS animations restart from zero. This makes springs ideal for gestures users might change mid-motion.

These gesture-physics rules — interruptibility, 1:1 tracking, velocity handoff on release, momentum projection, rubber-banding — are the web translation of Apple's *Designing Fluid Interfaces* (WWDC 2018). The native articulation, the projection math, and the drag→spring velocity-handoff formula live in `swiftui` (touch-interaction-design). The *principles* port across platforms; the CSS/spring *values* in this file don't cross back to iOS. For the broader component-craft version (press scale, origin-aware popovers), see `design-craft` (emil-kowalski).

## Performance

### The Golden Rule

Animate `transform` and `opacity` by default. They skip layout and paint and can run on the compositor; any other property needs a reason.

**Avoid animating:**

- `padding`, `margin`, `height`, `width`, `top`, `left` (trigger layout; one growing element can move its neighbors)
- `box-shadow`, `border-radius` (no layout, but a repaint every frame — the tier reviewers miss)
- `blur` filters above 20px (expensive, especially Safari)
- CSS variables that descendants inherit, written per frame (style recalculation for every child)
- Anything via `transition: all`

Tolerated exception: accordion `height`, kept short and animated to a measured value.

Frame budget: 16.7ms at 60Hz, about 8ms at 120Hz — design against the smaller.

### Optimization Techniques

**`will-change` is a last step, not a default.** Elements animating `transform`/`opacity` are already promoted, so adding it usually does nothing but spend GPU memory. Add `will-change: transform` to the animating element only after you have seen a 1px shift at the start or end of the motion, or measured dropped frames on an expensive paint.

**React-specific:**

- Animate outside React's render cycle when possible
- Use refs to update styles directly instead of state
- Re-renders on every frame = dropped frames

**Motion (Framer Motion) — version-scoped:**

```jsx
// Accelerated in every version (transform as string)
<motion.div animate={{ transform: "translateX(100px)" }} />

// Motion 14.2+: accelerated. Earlier versions: main-thread rAF, drops frames under load
<motion.div animate={{ x: 100 }} />
```

An earlier revision of this file said the shorthands are never hardware accelerated; per Kowalski's 2026 skills that stopped being true at Motion 14.2. Check the installed version before flagging it. Layout animations (`layout`, `layoutId`), `onUpdate`, and drag-driven motion values stay on the main thread in every version.

### CSS vs. JavaScript

- CSS transitions/keyframes and the Web Animations API can run off the main thread (smooth while the page is busy)
- `requestAnimationFrame`-driven animation always runs on the main thread — "JS" and "main thread" are not the same thing, since a library that hands off to WAAPI can be accelerated
- CSS better for simple, predetermined animations and anything that plays during navigation, loading, or hydration
- JS better for dynamic, interruptible, gesture-driven animations

Symptom table, cost tiers, the inherited-variable trap, and the ordered diagnosis: [animation-performance.md](web-animation-design/animation-performance.md).

## Accessibility

Animations can cause motion sickness or distraction for some users.

### prefers-reduced-motion

Whenever you add an animation, also add a media query to disable it:

```css
.modal {
  animation: fadeIn 200ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }
}
```

### Reduced Motion Guidelines

- Every animated element needs its own `prefers-reduced-motion` media query, written in the same change as the animation
- Show play buttons instead of autoplay videos
- **Reduce does not mean none** (per the course's accessibility lesson, which is more nuanced than this skill's original "disable all" stance): disable *movement* — anything translating, scaling, or changing layout — but keep non-moving animations (`opacity`, `color`, `blur`) that convey meaning. A modal can still fade; it shouldn't slide or scale. For explanatory motion visuals, jump between keyframe states instead of animating — removing them entirely would reduce understandability.
- **Why this matters** (Nabors, *Animation at Work*, ch. 5): "as many as 35% of Americans aged 40 years or older have experienced vestibular dysfunction"; WCAG advises "elements flash no more than twice per second"; fades "do not trigger vestibular disorders" — why reduce-motion-to-fades (not to nothing) works. Her 2017 mechanics predate `prefers-reduced-motion` — use the facts, not her plumbing.
- App-wide safety net in Motion: `<MotionConfig reducedMotion="user">` (not the default — set it yourself); it limits animation to opacity/color when the preference is on.
- Workflow: build the animation → test with DevTools' emulated `prefers-reduced-motion` → ship two variants.

### Framer Motion Implementation

```jsx
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  );
}
```

### Motion Specification for AI Builds

When directing an agent, provide the motion spec as a variable block plus usage rules. "Make it smooth" invites defaults; "entrance = opacity 0->1, translateY 6px->0, blur 2px->0, 280-320ms on the smooth curve" is buildable. Include reduced-motion behavior in the same prompt: movement and scale collapse; opacity/color/blur can remain when they carry meaning.

### Touch Device Considerations

```css
/* Disable hover animations on touch devices */
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.05);
  }
}
```

Touch devices trigger hover on tap, causing false positives. `:active` press feedback needs no such gate — a press is real on every device.

## Practical Tips

Quick reference for common scenarios. See [PRACTICAL-TIPS.md](web-animation-design/PRACTICAL-TIPS.md) for detailed implementations.

| Scenario                        | Solution                                        |
| ------------------------------- | ----------------------------------------------- |
| Make buttons feel responsive    | Add `transform: scale(0.97)` on `:active`       |
| Element appears from nowhere    | Start from `scale(0.95)`, not `scale(0)`        |
| Element shifts 1px at start/end | Add `will-change: transform` (only once seen)   |
| Hover causes flicker            | Animate child element, not parent               |
| Popover scales from wrong point | Set `transform-origin` to trigger location      |
| Sequential tooltips feel slow   | Skip delay/animation after first tooltip        |
| Small buttons hard to tap       | Use 44px minimum hit area (pseudo-element)      |
| Something still feels off       | Add subtle blur (under 20px) to mask it         |
| Hover triggers on mobile        | Use `@media (hover: hover) and (pointer: fine)` |
| Removed item leaves a dead gap  | Take it out of flow at once (`popLayout`)       |
| List cascade feels slow         | 30–80ms steps, ~300ms total, or no stagger      |

## Easing Decision Flowchart

Is the element entering or exiting the viewport?
├── Yes → ease-out
└── No
├── Is it moving/morphing on screen?
│ └── Yes → ease-in-out
└── Is it a hover change?
├── Yes → ease
└── Is it constant motion?
├── Yes → linear
└── Default → ease-out

## Communicating Motion to Engineers (Briggs)

Designers specifying motion "should just use black and white shapes," get the movement dialed in, and "hand that over like as a video" — a blueprint for the engineer, never a full After Effects redesign of the screen (Briggs, Shape FM ep. 3). The motion study communicates timing and character only.

## Reference Files

- [PRACTICAL-TIPS.md](web-animation-design/PRACTICAL-TIPS.md) - Detailed implementations for common animation scenarios
- [references/animation-at-work.md](web-animation-design/animation-at-work.md) - Fuller verified quotes from Nabors
- [choreography.md](web-animation-design/choreography.md) - Several elements on one event: role casting, together/overlap/sequence, stagger budgets, exits, interruption, timeline deliverable
- [animation-performance.md](web-animation-design/animation-performance.md) - Diagnosing dropped frames: symptom table, property cost tiers, driver/thread model, `will-change`, ordered diagnosis
- [animation-vocabulary.md](web-animation-design/animation-vocabulary.md) - Reverse lookup from a described effect to its precise name
- [motion-audit.md](web-animation-design/motion-audit.md) - Auditing an app's motion: find opportunities, remove unneeded animation, write handoff plans
- [gestures.md](web-animation-design/gestures.md) - Drag/swipe/sheet gesture mechanics on the web

**Sources**: Emil Kowalski's animations.dev course (primary values and techniques); Rachel Nabors, *Animation at Work* (A Book Apart, 2017) for the perception grounding, pattern taxonomy, and ch. 3/5 craft rules; Derek Briggs (PixelJanitor) via Shape FM for the physical-reference easing school and speed rules; Emil Kowalski's open skills repo (emilkowalski/skills, MIT, 2026-11) for the review method, build order, version-scoped performance rules, and the choreography / performance / vocabulary sub-references. Staleness: the 2017 book's perceptual/taxonomic layer is durable; its tooling and browser-feature mentions are dated. Full bibliography (video IDs, URLs, dates): [references/sources.md](web-animation-design/sources.md).

---
