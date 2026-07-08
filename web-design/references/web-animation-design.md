# Web Animation Design

*Scope: Designs web animations that feel natural — easing, duration, springs, performance and accessibility. The DEFAULT theme for web motion values: when design skills overlap on easing/duration/spring choices, route here. Use when animating UI elements or handling motion accessibility. Triggers: easing, cubic-bezier, spring physics, microinteractions, stagger, prefers-reduced-motion.*

A comprehensive guide for creating animations that feel right, based on Emil Kowalski's "Animations on the Web" course.

## Contents

- Theme Note
- Initial Response
- Review Format (Required)
- Quick Start
- The Easing Blueprint
- Timing and Duration / The Frequency
- Why Animation Works (Perception)
- Animation's Purpose: Five Patterns
- When to Animate
- Spring Animations
- Performance (render pipeline, measurement, scroll, layers, View Transitions)
- Accessibility
- Practical Tips
- Easing Decision Flowchart
- Communicating Motion to Engineers
- Reference Files

## Theme Note

The specific values in this skill (durations, easings, scale magnitudes, stagger delays) are tuned to work as a coherent set — like a color scheme, they look best when committed to as a whole. If another design skill or theme (e.g. `design-craft`, or its Emil Kowalski reference) is also loaded with different numbers, pick one theme's values and apply them consistently rather than averaging.

**This skill is the default theme for motion-related work.** When motion questions arise and multiple skills could apply, prefer these values unless the user opts into another. If the user is mixing skills and a genuine choice surfaces, briefly present the options as a menu rather than picking silently.

These values and techniques are for **web/CSS/JS** motion. On **iOS/SwiftUI**, animations/transitions/effects are covered by `swiftui` (swiftui-animation), scroll-driven motion by `swiftui` (swiftui-lazy-stacks), and brand-through-motion by `apple-design` (ios-brand-identity) — don't cross-apply CSS specifics there.

## Initial Response

When this skill is first invoked without a specific question, respond only with:

> I'm ready to help you with animations based on Emil Kowalski's animations.dev course.

Do not provide any other information until the user asks a question.

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

Correct format: A single markdown table with | Before | After | columns, one row per issue.

## Quick Start

Every animation decision starts with these questions:

1. **Is this element entering or exiting?** → Use `ease-out`
2. **Is an on-screen element moving?** → Use `ease-in-out`
3. **Is this a hover/color transition?** → Use `ease`
4. **Will users see this 100+ times daily?** → Don't animate it

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

**Known divergent tradition — accelerate-on-exit.** The Disney/Material lineage (Material's accelerate easing; restated in Salaja's 12-principles-of-animation) uses ease-in for exits: departing elements speed up as they leave. This corpus's theme keeps ease-out for exits too — users don't watch departures, and the fast start reads as responsiveness. Don't blend the two on one product; if a project already uses accelerate-on-exit consistently, follow the project rather than converting exits piecemeal.

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

On a native `<dialog>` or popover, style the `::backdrop` pseudo-element instead of shipping a sibling overlay div (Salaja, pseudo-elements) — one element, no wrapper markup, and the pairing rule enforces itself.

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
- Match duration to distance - longer travel = longer duration
- **Modulate by Cone of Vision** (Nabors, *Animation at Work*, ch. 3): "animations in the center of the user's Cone of Vision do better with shorter durations (closer to the 70-200 ms spectrum)"; animations "on the edge of the Cone of Vision benefit from additional time… in the 300-700 ms spectrum"
- **Halve your durations** (Nabors, ch. 3): long exposure warps your sense of speed — "Whatever your pre-production duration is, halve it. Then halve it again!"

### The Frequency

Determine how often users will see the animation:

- **100+ times/day** → No animation (or drastically reduced)
- **Occasional use** → Standard animation
- **Rare/first-time** → Can be more special

**Example:** Raycast never animates because users open it hundreds of times a day.

**Context/right-click menus are the concrete instance** (Salaja, 12 Principles of Animation): "Context menus should not animate on entrance (exit only)" — they're summoned constantly and the user's intent is already past the menu, so open instantly and animate only the exit. Same logic as Raycast, applied per-surface.

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

The rule generalizes beyond springs: every animation should be interruptible, and motion must "never prevent user input during animations" (wshobson, interaction-design) — an animation is feedback, never a gate. If acting mid-animation breaks the UI, fix the animation, not the user.

## Performance

### The Golden Rule

Only animate `transform` and `opacity`. These skip layout and paint stages, running entirely on the GPU.

The rendering-steps glossary behind the rule (ibelick, fixing-motion-performance) — know which step a property triggers:

- **composite**: `transform`, `opacity` — cheapest; the default for motion
- **paint**: color, borders, gradients, masks, images, filters — animate "only on small, isolated surfaces", never on large containers
- **layout**: size, position, flow, grid, flex — never animate continuously on large or meaningful surfaces

When a technique proves too expensive, "prefer downgrading technique over removing motion entirely" (ibelick): a continuous blur becomes a one-shot, a layout animation becomes a FLIP transform, a paint effect shrinks its surface — drop to a cheaper rendering step before you drop the motion.

**Avoid animating:**

- `padding`, `margin`, `height`, `width` (trigger layout)
- `blur` filters above 20px (expensive, especially Safari) — and *animated* blur is stricter still (ibelick): keep it ≤8px, short and one-shot, "never animate blur continuously" or on large surfaces; prefer opacity/translate first
- CSS variables in deep component trees — never animate CSS variables as the carrier for transform/opacity/position (the variable route forfeits compositor handling), and never animate *inherited* CSS variables (every descendant recomputes); scope animated variables locally (ibelick)

### Measurement and scroll (ibelick, fixing-motion-performance)

- **Batch reads before writes.** Never interleave layout reads (`getBoundingClientRect`, `offsetHeight`) and style writes in the same frame — that's layout thrashing. Measure once, then animate via transform/opacity; for layout-like effects use FLIP: measure first, apply the final layout, transform back to the start, release.
- **Don't drive animation from scroll events or `scrollY`** — polling scroll position keeps the work on the main thread and janks under load. Prefer CSS Scroll/View Timelines where available (`animation-timeline: view()`), and IntersectionObserver for visibility triggers.
- **Pause looping animations when off-screen** (IntersectionObserver again) — an invisible loop is pure wasted frames; relatedly, no `requestAnimationFrame` loop without a stop condition.

### Optimization Techniques

```css
/* Force GPU acceleration */
.animated-element {
  will-change: transform;
}
```

Layer promotion is never automatic — "compositor motion requires layer promotion, never assume it" (ibelick). Use `will-change` temporarily and surgically: set it just before animating, remove it after, and avoid many or large promoted layers (each costs memory); validate with DevTools layer tooling when performance matters.

**React-specific:**

- Animate outside React's render cycle when possible
- Use refs to update styles directly instead of state
- Re-renders on every frame = dropped frames

**Framer Motion:**

```jsx
// Hardware accelerated (transform as string)
<motion.div animate={{ transform: "translateX(100px)" }} />

// NOT hardware accelerated (more readable)
<motion.div animate={{ x: 100 }} />
```

### CSS vs. JavaScript

- CSS animations run off main thread (smoother under load)
- JS animations (Framer Motion, React Spring) use `requestAnimationFrame`
- CSS better for simple, predetermined animations
- JS better for dynamic, interruptible animations

**Tool boundary** (ibelick): fix performance problems *within* the existing animation system — never partially migrate APIs or mix animation systems within one component, and never run multiple systems that each measure or mutate layout; two systems fighting over layout is itself a jank source.

### View Transitions (page-level shared elements)

Prefer the native View Transitions API for navigation-level and shared-element page transitions (Salaja, pseudo-elements); JS-library transitions such as Motion `layoutId` remain the right tool for interaction-heavy UI, and avoid view transitions anywhere interruption or cancellation is required — they run to completion (ibelick). Lifecycle rules whose violations fail silently:

- `view-transition-name` must be unique on the page during the transition — assign `card-${id}` at interaction time, never a static name on a repeated class.
- Clear the source element's name and assign the target's *inside* `startViewTransition`; a stale name doesn't break this transition — it silently breaks the **next** one.

```ts
sourceImg.style.viewTransitionName = "card";
document.startViewTransition(() => {
  sourceImg.style.viewTransitionName = "";
  targetImg.style.viewTransitionName = "card";
});
```

Treat size changes inside a view transition as potentially layout-triggering; style `::view-transition-group(name)` to replace the default crossfade with this skill's durations and curves.

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

- Every animated element needs its own `prefers-reduced-motion` media query
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

Touch devices trigger hover on tap, causing false positives.

## Practical Tips

Quick reference for common scenarios. See [PRACTICAL-TIPS.md](web-animation-design/PRACTICAL-TIPS.md) for detailed implementations.

| Scenario                        | Solution                                        |
| ------------------------------- | ----------------------------------------------- |
| Make buttons feel responsive    | Add `transform: scale(0.97)` on `:active`       |
| Element appears from nowhere    | Start from `scale(0.95)`, not `scale(0)`        |
| Shaky/jittery animations        | Add `will-change: transform`                    |
| Hover causes flicker            | Animate child element, not parent               |
| Popover scales from wrong point | Set `transform-origin` to trigger location      |
| Sequential tooltips feel slow   | Skip delay/animation after first tooltip        |
| Small buttons hard to tap       | 44px min hit area via `::before` + negative `inset` — no wrapper markup |
| Something still feels off       | Add subtle blur (under 20px) to mask it         |
| Hover triggers on mobile        | Use `@media (hover: hover) and (pointer: fine)` |

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

**Sources**: Emil Kowalski's animations.dev course (primary values and techniques); Rachel Nabors, *Animation at Work* (A Book Apart, 2017) for the perception grounding, pattern taxonomy, and ch. 3/5 craft rules; Derek Briggs (PixelJanitor) via Shape FM for the physical-reference easing school and speed rules; Julien Thibeaut (ibelick), ui-skills fixing-motion-performance (MIT) for the render-pipeline audit rules; Raphael Salaja's skill library for View Transitions lifecycle, pseudo-element mechanics, and the context-menu instance. Staleness: the 2017 book's perceptual/taxonomic layer is durable; its tooling and browser-feature mentions are dated. Full bibliography (video IDs, URLs, dates): [references/sources.md](web-animation-design/sources.md).

---
