# Choreography — several elements, one motion

Deep dive for [web-animation-design.md](../web-animation-design.md). The parent file sets single-element values (easing, duration, springs). This file covers what changes when several elements move in the same moment: who moves, in what order, with how much overlap, and what stays still. Paraphrased from Emil Kowalski's `choreograph` skill and its recipes at `715c180` (MIT; [sources.md](sources.md)). Numbers are that source's working values; treat them as starting points inside the parent file's theme, not as a second theme.

## Contents

- Rules that hold everywhere
- Cast the scene first
- Pick a relationship per pair
- Stagger budgets
- Sequence only when overlap looks broken
- Secondary motion lands with its cause
- Scale timing to distance and size
- Direction and exits
- Interruption tests
- Idle attention loops
- Reduced motion
- Tools
- The timeline handoff
- Conflicts with other references

## Rules that hold everywhere

1. **One entrance per container.** Animate the parent or stagger its children, never both (also in [PRACTICAL-TIPS.md](PRACTICAL-TIPS.md)).
2. **No stagger on high-frequency or keyboard-driven UI.** Command palettes, menus, and list filters appear whole.
3. **No uniform stagger.** When every item shares delay, distance, duration, and easing, the group ticks like a metronome. Equal delays do to a group what `linear` does to one element.
4. **Choreography never blocks input.** Controls are clickable from the first frame; the sequence is decoration on top of a usable state.
5. **Every sequence survives interruption.** See the tests below.

## Cast the scene first

Give every element in the moment one role before writing a delay:

| Role | What it does | Typical treatment |
| --- | --- | --- |
| Lead | The one thing the eye should follow | Largest movement, starts first or lands last |
| Support | Follows the lead | Smaller movement, overlaps the lead |
| Decoration | Accents and flourishes | Opacity or a few pixels, timed to the lead |
| Static | Anchors the scene | Does not move |

Two leads is a hierarchy problem, not a timing problem; settle it in the layout. Most scenes need more static elements than the first draft has.

## Pick a relationship per pair

- **Together:** same start, same timing family. For things that are one object (a card and its shadow).
- **Overlap:** the second starts before the first finishes. The default for related elements.
- **Sequence:** the second starts when the first ends. The exception; see below.
- **Carry:** children ride a moving parent instead of animating themselves. In Motion, animate the parent (or give it the `layoutId`) and leave the children alone.

Two mechanics make overlap work:

- **A leaving element gives up its space at once.** Siblings should close the gap while it fades, not after. In Motion that is `AnimatePresence mode="popLayout"`. Without a library: read the element's offset, set `position: absolute` at that offset, animate it out, and move the siblings with a FLIP transform.
- **Sub-animations share a timing family.** Parts of one transition use the same easing and related durations, or the motion reads as several unrelated events.

## Stagger budgets

| Context | Step between items | Total | Notes |
| --- | --- | --- | --- |
| Product UI lists and grids | 30–80ms | under ~300ms | Stagger only the first handful (cap the index near 6); the rest arrive with the last one |
| Marketing hero, first-run moments | 100–150ms on 0.5–0.6s entrances | by feel | Seen once per visit; the wave is part of the message |

Order by importance, not DOM order, when they differ. Vary the treatment by role (the lead rises 12px, supports fade with 4–6px) rather than repeating one keyframe.

## Sequence only when overlap looks broken

Strict one-after-another reads as slow, so reserve it for three cases:

- **Two dense states in a container that resizes in both dimensions.** Both visible at once looks chaotic; let the old content leave first (Motion `mode="wait"`).
- **Pass-through:** an element must leave a region before another can occupy it.
- **Drawn cause and effect:** a line draws, then the thing it points to appears. Set the second delay to the first duration and use `animation-fill-mode: both`.

Even then, overlap the handoff by a few frames so there is no dead pause between the two.

## Secondary motion lands with its cause

Accents (motion lines, sparkles, a badge bump) should finish as the lead finishes: a short burst in roughly the last 20% of the timeline, most important accent first, the others about 40ms behind. When the user repeats the action quickly, skip the build-up and play only the payoff.

## Scale timing to distance and size

- **Duration follows distance.** A container that grows 20px and one that grows 300px should not share a fade. Derive duration from the height delta and clamp it; the source uses `delta / 500` seconds clamped to 0.15–0.27s.
- **Bounce follows size.** Small elements can carry more bounce than large surfaces.
- **A few known states get hardcoded values.** With three or four states, tune each transition by hand instead of deriving a formula.

## Direction and exits

- Direction follows the mental model: forward moves content left, back moves it right. In Motion, pass the direction as `custom` to both `AnimatePresence` and the child so the exiting element gets the new value.
- In a small container, a full slide is too much. Crossfade with a shift of about 8px and a light blur.
- Exits run together, shorter and simpler than the entrance, and leave by the path they came in on.

## Interruption tests

Run each before calling a sequence done:

- Re-trigger it mid-sequence. Nothing should jump or double up.
- Stop in-flight animations before starting new ones.
- Await the whole step (`Promise.all` over its animations) before chaining the next.
- Gate one-shot sequences with a ref so a re-render cannot replay them.
- Keep keys stable so a re-render does not re-run an entrance.

## Idle attention loops

A hint that invites interaction waits before its first run (about 2.5s), repeats rarely (about every 6s), stops the moment the user interacts, and resumes only after the interaction has fully reset.

## Reduced motion

Choreography collapses: drop delays and movement, keep opacity so state changes still register. For sequences that explain something (a drawn diagram), jump between frames instead of removing the explanation. The parent file's reduce-is-not-none rule applies.

## Tools

```css
/* One-shot entrance: an index per item times a step. */
.stagger > * {
  animation: enter 0.4s var(--ease-out) both; /* both: delayed items stay hidden until they start */
  animation-delay: calc(var(--step, 50ms) * min(var(--i), 6));
}
```

- **CSS** (above): best for entrances that play once. Set `--i` per item in markup.
- **Motion variants:** `delayChildren: stagger(0.05)` on the parent's transition (`staggerChildren` on older versions) when the group mounts and unmounts with state.
- **`useAnimate`:** only when one timeline coordinates several events. Track the running animations and stop them before starting the next run.

Record the result and scrub it frame by frame, then picture the fiftieth time someone sees it.

## The timeline handoff

When proposing or reviewing choreography, write the timeline before the code:

| Element | Role | Starts | Duration | Motion | Relationship |
| --- | --- | --- | --- | --- | --- |
| Title | Lead | 0ms | 400ms | fade + 12px rise | — |
| Subtitle | Support | 60ms | 400ms | fade + 6px rise | Overlaps title |
| Background | Static | — | — | none | Anchor |

Follow it with two short notes: **what does not move, and why** (two to five items), and a **feel check** (what the group should read as, and what to watch for when scrubbing).

## Conflicts with other references

- **Stagger step.** `design-craft` (animations) gives about 100ms between groups and 80ms between title words, from Jakub Krehel's enter recipe. That matches this file's marketing row. The 30–80ms row is for product UI seen many times a day. Pick by context; do not average.
- **Storyboard code structure.** [PRACTICAL-TIPS.md](PRACTICAL-TIPS.md) (Choreographing Multi-Step Animations) covers how to lay out the timing constants in code. This file covers what the timings should be.
