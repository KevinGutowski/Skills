# Animation Vocabulary — Naming the Effect

*Scope: reverse lookup from a loose description of a motion effect ("the bouncy thing when a popover opens", "the iOS scroll that resists") to the precise term, so a person can prompt an agent, brief a designer, or search docs with the right word. For naming, not for deciding or building — once named, route to [web-animation-design](../web-animation-design.md), [choreography.md](choreography.md), or `motion`.*

Source: the glossary in Emil Kowalski's `animation-vocabulary` skill (emilkowalski/skills, MIT, rev `715c180`, 2026-11; mirrors aiforui.dev's vocabulary page). Term names are kept — they are the standard words; definitions and cues are rewritten here.

## Contents

- How to answer a naming question
- Close pairs to disambiguate
- Entrances and exits
- Sequencing and timing
- Movement and transforms
- Transitions between states
- Scroll
- Feedback and interaction
- Easing
- Springs
- Looping and ambient motion
- Polish and effects
- Performance words
- Principle words

## How to answer a naming question

1. **Read for the sensation, not the keyword.** People describe what they see or feel ("springy", "draws itself", "slides off").
2. **Lead with the term and one line.** A naming question wants a name, not an essay.
3. **When two terms compete, give the best match first, then one or two alternates with the difference in a clause.**
4. **When nothing fits exactly, say it is an approximation** or compose from existing words ("a stagger of scale-in entrances"). Do not coin a term.

## Close pairs to disambiguate

| If they might mean… | Ask or state the difference |
| --- | --- |
| Morph vs Crossfade vs Shared element transition | Shape *becomes* another shape · two things fade over each other in place · one element *travels* and transforms into another position |
| Shared element transition vs Layout animation | Connects two different elements/views · the same element animates to its new size or position |
| Pop in vs Bounce vs Scale in | Entrance with slight overshoot · any spring that overshoots and settles · grows to full size with no overshoot |
| Clip-path vs Mask | Hard-edged shape · soft, gradient-capable edges |
| Scroll reveal vs Scroll-driven animation | Plays once when the element enters the viewport · progress is tied to scroll position |
| Page transition vs View transition | Any animation between routes · the browser API that morphs between two states and connects shared elements |
| Stagger vs Orchestration | Same animation offset by a small delay per item · deliberately timing different animations into one coordinated motion |
| Rubber-banding vs Momentum | Resistance and snap-back past a boundary · carrying velocity after release |
| Shake vs Pulse | Quick lateral jitter meaning "rejected" · gentle repeating scale/opacity meaning "look here" |

## Entrances and exits

| They say | Term |
| --- | --- |
| "fades in / fades away" | **Fade in / Fade out** — opacity only |
| "comes in from the side" | **Slide in** — enters from off-screen on one edge |
| "grows as it appears" | **Scale in** — small to full size, usually with a fade |
| "pops / bounces into place" | **Pop in** — entrance with a slight overshoot |
| "gets uncovered / wiped on" | **Reveal** — content uncovered gradually, usually via clip-path or mask |
| "the animation when it shows up or goes away" | **Enter / Exit** — what plays on add to or removal from the screen |

## Sequencing and timing

| They say | Term |
| --- | --- |
| "the 0% / 50% / 100% points" | **Keyframes** |
| "filling in the in-between frames" | **Interpolation / Tween** |
| "one after another, like a cascade" | **Stagger** |
| "everything timed to feel like one move" | **Orchestration** (also: choreography) |
| "wait before it starts" / "how long it takes" | **Delay** / **Duration** |
| "it snaps back when it finishes" / "stays at the end" | **Fill mode** (`forwards`, `backwards`, `both`) |
| "ticks in jumps, like a countdown" | **Stepped animation** |

## Movement and transforms

| They say | Term |
| --- | --- |
| "moves over / up" | **Translate** |
| "gets bigger / smaller" | **Scale** |
| "spins" | **Rotate** |
| "slants" | **Skew** |
| "tilts toward me / flips like a card" | **3D tilt / Flip** (`rotateX`/`rotateY`) |
| "how deep the 3D looks" | **Perspective** — lower value, stronger depth |
| "where it grows or spins from" | **Transform origin** |
| "grows out of the button I clicked" | **Origin-aware animation** — the element animates from its trigger rather than from its own center (the CSS default) |

## Transitions between states

| They say | Term |
| --- | --- |
| "one fades out as the other fades in, same spot" | **Crossfade** |
| "the same box just changes so I don't get lost" | **Continuity transition** |
| "one shape turns into another" (Dynamic Island) | **Morph** |
| "the thumbnail expands into the card" | **Shared element transition** |
| "things slide to their new place instead of jumping" | **Layout animation** |
| "section opens and closes its height" | **Accordion / Collapse** |
| "slides left going forward, right going back" | **Direction-aware transition** |

## Scroll

| They say | Term |
| --- | --- |
| "appears as I scroll down to it" | **Scroll reveal** |
| "moves as I scroll, tied to the scrollbar" | **Scroll-driven animation** |
| "background moves slower than the foreground" | **Parallax** |
| "animation between pages" | **Page transition** |
| "the browser morphs the old page into the new one" | **View transition** |

## Feedback and interaction

| They say | Term |
| --- | --- |
| "changes when my cursor is over it" | **Hover effect** |
| "button shrinks a bit when clicked" | **Press / Tap feedback** |
| "fills up while I hold it down" | **Hold to confirm** |
| "grab and move it; it keeps going when I let go" | **Drag** (with **momentum**) |
| "drag list items to rearrange, others make room" | **Drag to reorder** |
| "flick it off-screen to close" | **Swipe to dismiss** |
| "resists and snaps back when pulled too far" | **Rubber-banding** |
| "wiggles side to side when wrong" | **Shake / Wiggle** |
| "circle spreads from where I tapped" | **Ripple** |

## Easing

| They say | Term |
| --- | --- |
| "how it speeds up and slows down" | **Easing** |
| "starts fast, settles gently" | **Ease-out** — the UI default |
| "starts slow then rushes" | **Ease-in** — usually avoided; reads sluggish |
| "slow, fast, slow" | **Ease-in-out** — for things already on screen moving A to B |
| "same speed the whole way" | **Linear** — spinners, marquees, progress |
| "a custom curve" | **Cubic-bezier** |
| "speeds up and slows down at different rates" | **Asymmetric easing** — reads livelier than a symmetric curve |

## Springs

| They say | Term |
| --- | --- |
| "physics-y, not on a timer" | **Spring** |
| "how hard it pulls / how snappy" | **Stiffness (tension)** |
| "how quickly it stops wobbling" | **Damping** — lower means more oscillation |
| "feels heavy" | **Mass** |
| "overshoots and settles" | **Bounce** |
| "when it *feels* done, though it is still settling" | **Perceptual duration** |
| "keeps the speed of my flick" | **Momentum** / **Velocity** carried into the next animation |
| "I can redirect it halfway" | **Interruptible animation** |

## Looping and ambient motion

| They say | Term |
| --- | --- |
| "scrolling ticker of logos/text" | **Marquee** |
| "repeats" | **Loop** |
| "plays forward then backward" | **Alternate (yoyo)** |
| "circles around something" | **Orbit** |
| "gently throbs to get attention" | **Pulse** |
| "bobs up and down, weightless" | **Float** |
| "moves a little while just sitting there" | **Idle animation** |

## Polish and effects

| They say | Term |
| --- | --- |
| "goes soft during the change" | **Blur** — softens an element or hides small imperfections in a swap |
| "cut to a shape / wipe" | **Clip-path** |
| "fades out at the edges" | **Mask** |
| "drag the divider between two images" | **Before / after slider** |
| "the line draws itself" | **Line drawing** (SVG stroke) |
| "letters shuffle when the text changes" | **Text morph** |
| "grey placeholder with a moving sheen" | **Skeleton / Shimmer** |
| "digits roll up to the value" | **Number ticker** |
| "numbers don't jiggle as they change" | **Tabular numbers** |
| "text types itself out" | **Typewriter** |

## Performance words

| They say | Term |
| --- | --- |
| "how smooth it is" | **Frame rate (FPS)** — 60 baseline, 120 on newer displays |
| "it stutters" | **Jank** / a **dropped frame** |
| "let the GPU move it" | **Compositing**; **hardware acceleration** |
| "tell the browser it's about to animate" | **`will-change`** |
| "animating width/top makes everything recalc" | **Layout-triggering animation** (reflow every frame) |
| "my code reads a size, writes a style, reads again, in a loop" | **Layout thrashing** (forced synchronous layout). The source uses this term for the row above; the stricter meaning is the read/write loop |

Fixing these: [animation-performance.md](animation-performance.md).

## Principle words

| They say | Term |
| --- | --- |
| "motion should have a reason" | **Purposeful animation** |
| "little wind-up before it moves" | **Anticipation** |
| "parts keep moving and settle after it stops" | **Follow-through** |
| "it deforms as it moves" | **Squash & stretch** |
| "feels faster even though it isn't" | **Perceived performance** |
| "seen more often → make it shorter and subtler" | **Frequency of use** |
| "I never lose track of where it went" | **Spatial consistency** |
| "tone it down for people who asked" | **Reduced motion** |
