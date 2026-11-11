# Choreography — Several Elements, One Motion

*Scope: the relationships between animations that answer the same event — what moves, in what order, how much they overlap, and what stays still. Use for staggered lists, hero entrances, view swaps inside a container, multi-step flows, removals where siblings close a gap, morphs between rich states, and icon/background/accent sequences. A single animation's easing, duration, and origin stay in [web-animation-design](../web-animation-design.md); the file-structure pattern for sequenced code (storyboard comment, `TIMING` object, `stage` integer) stays in [PRACTICAL-TIPS.md](PRACTICAL-TIPS.md).*

Source: Emil Kowalski's `choreograph` skill and its recipes (emilkowalski/skills, MIT, rev `715c180`, 2026-11), adapted. Values belong to the Kowalski motion theme this cluster already uses.

## Contents

- The default: cut and parallelize
- Hard limits
- Step 1 — Cast every element
- Step 2 — Pick a relationship per pair
- Stagger budgets
- When to sequence
- Step 3 — Hook secondary motion to a moment
- Step 4 — Scale timing to the size of the change
- Step 5 — Direction and exits
- Interruption checks
- Attention loops
- Reduced motion
- Tool choice
- Implementation notes
- Deliverable: the timeline
- Scoped conflict: stagger step size

## The default: cut and parallelize

The agent failure is choreographing by addition: every child gets `delay: i * 0.1`, the panel slides and then its rows trickle in, the old view politely waits for the new one. Each piece is smooth; together the user waits for the interface to finish performing.

Good choreography mostly removes moving parts and runs the survivors at the same time. Sequence only when order *means* something — reading order, cause then effect, one thing physically arriving before another. The test in upstream's words: a sequence that works "reads as one gesture, a wave"; one that fails "reads as a queue."

## Hard limits

1. **One entrance per container.** If the panel animates in, its contents are already there. Parent entrance plus child stagger is two waits.
2. **No stagger on high-frequency or keyboard-triggered UI.** Dropdown items, menu rows, command palettes, tab content, and rows opened many times a day arrive together or without animation. A cascade is pleasant once and a tax every time after.
3. **No uniform stagger.** Identical delay, distance, duration, and easing on every item is to a group what `linear` is to a single element — a metronome. Vary by importance.
4. **Choreography never blocks input.** Anything visible is clickable; a delayed item must not hold back a button the user is already reaching for.
5. **A sequence must survive being re-triggered mid-flight** (see Interruption checks). If it breaks or replays out of order, it is not finished.

## Step 1 — Cast every element

Before writing any timing, list everything that moves on the event and assign a role:

| Role | What it is | Treatment |
| --- | --- | --- |
| Lead | The one thing the user must notice: the title, the new view, the item acted on | Moves first, travels furthest, stays in motion longest |
| Support | Content that follows the lead: subtitle, CTAs, the rest of a list | Follows with shorter, smaller motion |
| Decoration | Pills, badges, dividers, background accents | Fade only, or nothing |
| Static | Everything else, including containers whose content animates | No animation |

Two candidates for Lead is a hierarchy problem in the design; motion cannot fix it — say so instead of animating both. Most groups shrink at this step: a side panel with eight menu items becomes one move (the panel), with the items simply present.

## Step 2 — Pick a relationship per pair

Any two moving parts relate in one of four ways. Decide in this order:

| Question | Answer | Relationship |
| --- | --- | --- |
| Same visual object or same moment? (drawer height + its content; a chip leaving + siblings closing the gap) | Yes | **Together** — same start, same timing family |
| Does the order carry meaning? | No | **Together** — order without meaning is only delay |
| Would showing both at once look broken (overlap, pass-through, two dense views fighting)? | No | **Overlap** — a stagger; the second starts while the first still moves |
| Same question | Yes | **Sequence** — the second starts as the first finishes, or a beat before |

A fifth option is not a timing: **Carry.** When a child's path is out of your control (shared-layout / `layoutId` motion), animate the *parent* and let the children ride along. Items "dropping into" a bin drop because the container they belong to moves, not because each one was tuned.

**Together, by default:**

- **A leaving element gives up its space at once.** Pull it out of flow at the moment of removal so siblings close the gap *while* it fades. Otherwise the gap closes only after the exit ends: two smooth moves with a dead pause between them. Motion: `AnimatePresence mode="popLayout"`. No library: read its offset, set `position: absolute` at that spot (parent `position: relative`), then run the exit; siblings reflow or FLIP.
- **A view swap inside one container is a crossfade** — old exits while new enters. In Motion, the default `sync` mode already starts the enter and the exit at the same moment, but both elements stay in flow, so they sit side by side or stacked unless you overlay them yourself; `popLayout` takes the exiting one out of flow so the new one occupies its place, and `wait` is the mode that plays them back to back (use it only when order means something).
- **Sub-animations of one component share a timing family.** A drawer that opens in 500ms and then resizes in 200ms reads as two objects. Inner motion may use a *lighter* curve than the container (a slower content fade keeps the swap legible) but must stay in the same easing family — an ease-in-out body inside an ease-out shell drifts out of sync. Set the family once (`MotionConfig`, or one shared custom property). This extends the Paired Elements rule in [web-animation-design](../web-animation-design.md).

## Stagger budgets

| Surface | Step between items | Budget |
| --- | --- | --- |
| Product UI | 30–80ms | Whole group done in roughly 300ms |
| Marketing hero, first-run, personal site | 100–150ms steps on 0.5–0.6s entrances | Seen once per visit; the wave is part of the message |

- **Long lists:** stagger only the first handful (about six); the rest share the last delay. Item 20 never waits 20× the step.
- **Order follows importance, not DOM order.** Usually the same; check. Two items can share one beat (title and first paragraph both at step 0).
- **Vary treatment, not only delay.** Lead slides furthest, Support less, Decoration fades in place. Delays that shrink across the group (an eased stagger) read organic; equal gaps read mechanical.
- **Direction follows reading order or cause** — top to bottom for content; outward from the point of interaction for things the user triggered.

## When to sequence

Only where overlap would look wrong:

- **Two dense states in a container that changes both width and height** (a Dynamic Island-style morph): both visible at once is chaos. Old content leaves first (`mode="wait"`). To keep a crossfade anyway, render the active view twice — one copy owns the enter, an absolutely positioned copy sits at opacity 0 and becomes visible only as the exit — and give the exiting copy a scale toward where the container is headed (up if the next state is larger, down and pulled toward center if narrower so it does not bleed past the edges). The duplicate is a picture, not a second view: an opacity-0 copy is still focusable, clickable, and read by assistive technology, so keep it `inert` and `aria-hidden` for its whole lifetime (plus `pointer-events: none` where `inert` support is a concern), give it no ids or form names that collide with the live copy, and leave focus and interaction with the live view. Unmount it when the exit ends.
- **One element would visibly pass through another.** Items flying into a container whose front face draws above them: reveal the front with a *delay* timed to the items nearly landing, not a full sequence.
- **Cause and effect in drawing.** A checkbox square draws, then the checkmark; the second delay equals the first duration and both hold their end state (`forwards` or `both`).

Let the handoff overlap slightly: starting the second move just before the first ends is what turns a queue into one gesture.

## Step 3 — Hook secondary motion to a moment

A supporting animation attaches to a named moment of the lead — its start, its impact, or its settle — not to a delay that happened to look right.

- **Sync to the cause, not to the trigger before it.** In a hover-then-click interaction, the background pulse belongs to the click, landing with the press, not to the hover.
- **Accents land with the lead.** Motion lines or sparkles around an icon finish as the main shape finishes: a short burst in roughly the last 20% of the timeline (keyframe `times` near `[0.7, 0.9]`), the most important line first and the others about 40ms behind.
- **A repeat action skips the buildup.** Once the hover state is in place, a click plays at once — same internal proportions, shifted earlier.

## Step 4 — Scale timing to the size of the change

Fixed timing is wrong when the size of the change varies.

- **Duration by distance.** A container resizing between views needs the full fade for a big jump; the same fade on a tiny jump is a flicker. Derive the content-fade duration from the height delta and clamp it — upstream's working numbers are delta ÷ 500 clamped to 0.15–0.27s, with the container height on a fixed 0.27s strong ease-out. (Corroborates the Family-drawer note in PRACTICAL-TIPS.)
- **Bounce by size.** Small elements need more bounce to read as alive; the same bounce on a large view settles slowly and looks heavier than its neighbors. Tune per state.
- **Few states → hardcode per transition.** A dozen hand-tuned pairs beat a formula you cannot fine-tune. Use a formula only when the state count makes hand-tuning impossible.

## Step 5 — Direction and exits

- **Direction follows the mental model.** Forward: new content enters from the right, old leaves left. Back: the reverse. Sibling-menu content enters from the side of the trigger the user came from.
- **Exits read their direction when they start.** In Motion, pass direction through `custom` on *both* `AnimatePresence` and the child, or the leaving element uses the direction it mounted with.
- **Exits are simultaneous, shorter, simpler.** Never reverse-stagger a group out; the user already decided to leave.
- **An exit matches its entry** — what slid in from the right leaves to the right, not by fading.
- For small containers or similar views, replace a full-width slide with a crossfade plus an ~8px shift and light blur: the eye barely travels and the change still reads.

## Interruption checks

A sequence has more states than a single animation. Test each:

- **Re-trigger mid-sequence** — hover out halfway, click Next twice quickly, switch menus while the first is opening. Each run stops the in-flight animations before starting new ones; never stack.
- **Chain only after completion.** An idle loop that resumes after hover-out waits for *all* reset animations (`await Promise.all(...)`); awaiting one is safe only when all share a duration.
- **Gate with a ref, not state.** "Click works only after the hover buildup finished" is a flag that never renders.
- **Rapid view switching** can leave two presence children mounted. Check it, and give each child a stable unique `key` — a missing key is also the first suspect when an exit does not play.

## Attention loops

An idle animation that invites interaction (a hand that occasionally taps, an icon that wiggles) waits a few seconds before its first run (about 2.5s), repeats rarely (about every 6s), stops while the user is interacting, and resumes only after the interaction's reset has finished. Cap it: stop after a few repeats or once the user has interacted, and do not run it at all under `prefers-reduced-motion: reduce`. Motion that starts on its own, runs longer than five seconds, and sits beside other content needs a way to pause or stop it (WCAG 2.2.2).

## Reduced motion

Collapse the choreography; do not merely shorten it. Under `prefers-reduced-motion: reduce`, drop the delays and the movement, keep opacity, and let the group appear together. Where the sequence *is* the explanation (a step-by-step illustration), jump between its frames instead of animating between them.

## Tool choice

| Need | Tool |
| --- | --- |
| One-shot entrance | CSS keyframe with a per-item index custom property × a step variable |
| Group that enters/exits with React state | Motion variants with `delayChildren: stagger(...)` on the parent; `stagger` accepts `from` and `ease`, giving non-uniform delays for free (older versions: `staggerChildren`) |
| Several elements coordinating across several events (hover, click, idle timer) with awaited completion | Motion `useAnimate` — more powerful, much harder to maintain; not for a plain stagger |

API details: `motion` (best-practices, codex).

## Implementation notes

- **CSS index stagger:** `animation-delay: calc(var(--step) * var(--i))` with `animation-fill-mode: both` — the `backwards` half applies the first keyframe during the delay so later items do not flash their final state. Omitting the `to` keyframe animates to the element's own styles.
- **Custom-property caution:** changing a variable on a parent recalculates style for every descendant. Fine for a one-shot entrance; never drive per-frame values (a drag) through an inherited variable on a large tree — see [animation-performance.md](animation-performance.md).
- **One variant per role** (distance, duration); the stagger only sets *when* each starts. `from: "center"` radiates from the middle; a numeric index radiates from the item the user touched.
- **Imperative orchestration:** target parts with data-attribute selectors inside the scope instead of a ref per element; keep the running animations in a ref and stop them all before each new run.
- **SVG draw sequences:** `pathLength="100"` on each path makes dash array/offset values round numbers.

## Deliverable: the timeline

Write the timeline before the code, one row per moving element in start order — element, role, start, duration, motion, relationship — then check it against the budgets. Follow with two short lists:

- **What does not move, and why** (2–5 items: "menu rows — one entrance per container; the panel carries them").
- **Feel check** — what cannot be judged from code (does the stagger read as a wave, does the crossfade read as one object) and the exact moment to scrub on a recording. A wave and a queue look alike in your head and different frame by frame. Then imagine the 50th use of the day; if you would skip it, cut it.

## Scoped conflict: stagger step size

`design-craft` (animations) — the Krehel theme — staggers enter groups at ~100ms and title words at ~80ms. That matches this file's *marketing/first-run* row, not its product-UI row. Do not average: on product surfaces under this theme use 30–80ms within a ~300ms group budget; adopt the 100ms figure only where the Krehel theme is the one in force or the surface is seen once.
