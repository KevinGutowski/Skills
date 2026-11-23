# Rehearsal

How to verify a faux-UI scene. Agents usually check by reading the code or taking one settled screenshot, and both miss where the bugs are: the frames in between, where a label hops 4px or everything has faded out at once. Run the whole demo at real speed and look at it as the audience will. Distilled from Stageshow's rehearse, verify, review, and teaching references.

**Every answer comes from a frame you looked at, never from the code.** A predicted failure is not a finding, and neither is a predicted pass.

## Contents

- [Order of work](#order-of-work)
- [Prove the still first](#prove-the-still-first)
- [Film the loop](#film-the-loop)
- [Named faults](#named-faults)
- [What you see, what you do](#what-you-see-what-you-do)
- [The checklist](#the-checklist)
- [Fresh-eye review](#fresh-eye-review)
- [Handover note](#handover-note)
- [What tools cannot tell you](#what-tools-cannot-tell-you)

## Order of work

Fix the largest visible failure first, re-film, and start again from the top. The order is fixed because a later fix is wasted if an earlier one changes the frame:

1. Framing
2. Hierarchy and density
3. Motion
4. Polish

## Prove the still first

Before any choreography, render the opening and the payoff at both shipping widths (the shown width and 390) beside the closest good reference at the same size.

- Can the viewer find the focal object and what changes before any branding or copy?
- Compare quality (hierarchy, density, spacing, crop, material) against the reference separately from whether every object in the brief is present.
- Do the same for the busiest mid-story frame and every resting state that changed.
- The reduced-motion poster is not the opening. It has to work as the only frame.

## Film the loop

With Stageshow installed, `scripts/film.mjs` does this and prints the named faults below; `--gate` ends with a pass line only when the never-intentional ones are at zero. In its playground, film the direct capture route, `http://<host>/?capture=<example-name>` with `--select '#example'`: the ordinary viewer URL (`?example=<name>`) wraps the scene in an iframe and the gate fails on it. Checked here on 2026-11-18 at `299140f`: `?capture=static-card --still --gate` passes with two candidate lines (`uneven`, `lopsided`) against the upstream gold itself, so expect candidate lines on a good scene and judge each from the frame. The script needs a Chrome: set `CHROME_PATH` if no system Chrome is installed.

Notes from two local kit builds at `299140f` (a hero loop and a five-tile bento):

- `--still` shoots the opening frame. For the poster, add `--reduced`. A scene with a connector or a count that draws on needs `--delay` (2500 worked) or the still catches it mid-draw.
- A new folder under `examples/` was not always picked up by the running dev server ("Unknown example", or "no visible stages" on the first film). Re-saving the playground's preview and catalog files, or retrying, fixed it.
- Motion runs came back `inconclusive` in headless Chrome because of sampling gaps even when the gate passed. Step the beats with `--at` and a short `--every`, and look at the frames.
- The gold examples themselves print candidate lines, and the gold bento prints one never-intentional line (`avatar alignment`). Copy a gold's structure, not its every detail, and judge each line from the frame.
- `--zoom` needs a single stage, so it cannot be used on a whole grid; zoom one tile's stage.
- A kit `Button` sizes its icon slot for a glyph. An avatar in that slot overlaps the label unless the button's icon-size token is set. Without it, use this skill's `scripts/contact-sheet.mjs`, which captures frames at an interval and tiles them into one image with a timestamp on each. It reports nothing about the picture; reading the frames is the work. Run it from the project directory so it finds the project's Playwright.

```sh
# The whole loop. Pass the loop's length; the frame count follows from it.
node <skill>/scripts/contact-sheet.mjs page.html --loop 12000 --out shots/loop.png
# A stage that is not at the page's top-left: crop by element, keep the shipping viewport.
node <skill>/scripts/contact-sheet.mjs http://localhost:5173/ --select '#hero-demo' --viewport 1200x800 --loop 16000 --out shots/loop.png
# Phone column: the viewport is the phone, the crop is still the element.
node <skill>/scripts/contact-sheet.mjs page.html --select '#hero-demo' --viewport 390x800 --loop 12000 --out shots/phone.png
# One beat, frame by frame.
node <skill>/scripts/contact-sheet.mjs page.html --select '#hero-demo' --start 2800 --every 50 --count 24 --out shots/drop.png
# Close look, and the reduced-motion poster.
node <skill>/scripts/contact-sheet.mjs page.html --select '#hero-demo' --still --scale 4 --out shots/zoom.png
node <skill>/scripts/contact-sheet.mjs page.html --select '#hero-demo' --reduced --still --out shots/poster.png
```

- **Size the sheet from the loop.** The reset and the seam are at the end, so a sheet shorter than the loop misses the part most likely to be wrong. `--loop <ms>` sets the count to `ceil((loop + 1000) / every) + 1`: a 16-second loop at 500ms is 35 frames, covering the loop, the seam, and a second of the next pass. The default without `--loop` is 24 frames (11.5 seconds), and the script says so when it is used. If the frame cap is hit it prints `inconclusive`; raise `--every`.
- **The viewport is not the crop.** `--viewport` (default 1280x800) decides which breakpoint the page lays out at, and the script never changes it. `--select`, or `--x --y --width --height`, only decides which pixels are kept. A selected element is captured whole even when it is taller or wider than the viewport (a one-column grid at 390 wide, for example), at that viewport's layout. With no crop flags the default 720 x 340 crop shrinks to fit a smaller viewport; a rectangle you ask for that does not fit is refused with exit code 1. Film at the viewport the page ships at, and again at the phone's.
- **A page that did not load is not a picture.** An HTTP error, a missing file, or a selector that matches nothing exits with code 3 and writes no image.
- `--dark` films the dark scheme; `--cols` and `--thumb` shape the sheet. `inconclusive` also means frames arrived late. Give it local pages only.

The shots to take:

| Shot | How | Why |
|---|---|---|
| Contact sheet of the loop | A frame every second or so across the full loop, tiled into one image at true size | The whole story at a glance; holes and dead air show |
| Phone width | The same at a 390 viewport | The recomposed design is a different picture |
| Beat close-ups | 40 to 80ms apart across each press, morph, handoff, exit, and the loop seam | A still cannot show a pop |
| States sheet | The opening, every settled state, and the end | Each must stand as a still |
| Zoom | Any hand-drawn mark and any small glyph at 4x | Clipped strokes and mismatched weights |
| Looks | Every theme the request names | A light pass does not prove dark |
| Hover scenes | Rest, hover, and the settle after leaving | The rest frame must stand alone; leaving must glide back |

- Mark each beat in the script and film at the mark. Never guess delays.
- Slow the clock (for example 6x) and sample closely to inspect a landing or a press.
- Record element geometry on every animation frame and look for one-frame jumps and drift. Fix accidental ones.
- A recording with gaps, or one that is empty or short, is inconclusive, not a pass.
- Confirm the page you filmed is running the code you wrote, and film the real destination page at its real width, not only an isolated preview.
- Watch playback, pause, resume, and replay yourself. Check the return from offscreen.
- Judge the host page's own controls too (pickers, playback buttons, labels): at rest, hover, pressed, focused, and interrupted mid-transition.

## Named faults

Stageshow's film script names these; the names are worth using in reviews whether or not the script is installed, because each has one rule and one fix.

**Never intentional.** Fix the cause and re-film. Clearing one by hiding or removing the thing it points at is a bug.

| Name | Meaning |
|---|---|
| framing | A gutter, bleed, crop, or window shape the framing rules forbid; a hero floating whole; a popover against an edge |
| cut by the crop | An action or chip sliced by the stage edge |
| tight stack / loose stack | Title and subtitle under 3px of ink apart, or past 10px (4 to 6px is right) |
| tight mark | A status dot within 5px of its avatar or text, or outside its row |
| tight inset | Words under 8px from a window, card, or row edge (12px is right) |
| tight control | A button or chip under 8px from the field, rule, or card edge above it |
| skeleton ladder | At realistic fidelity, a visible list where wordless rows outnumber worded ones |
| loose list | Rows spread out to fill a pane |
| fat row | A one-line row three times taller than its words |
| empty pane | A void under a pane's or screen's content |
| onion skin | See-through fills overlapping at rest |
| unit wrapped | A stat's unit on its own line |
| unsized text | Text in a window left at the stage's 16px base size because nothing sized it |
| clipped glyph | An icon drawn past its box |
| emoji icon | An emoji where an icon belongs |
| mixed icons | Filled and outline glyphs side by side |
| invented mark | A one-letter tile in a brand color beside a real company's name |
| anchor drift | An open popover moving as its list changes height |
| uneven padding | A card or tile whose content sits about a third closer to one edge than the side inset, or past it |
| uneven inset | A bar, pill, or row of controls whose children sit much closer to one end than the other |
| uneven gutters | A window or panel in a tile much closer to one side than the other |
| avatar alignment | A body under an avatar row starting under the avatar instead of at the name's edge |
| spills its slot | Content running past the width it was laid out in |
| selection drift | A text highlight that is not under the I-beam |

**Candidates.** Look at each; fix the real ones and name the intentional ones in the handover note. Never cut good motion to quiet a detector.

| Name | Meaning |
|---|---|
| touching / tight lines | Text within 5px of a box; bars closer than the text they stand for |
| near-tangent | Two edges 1 to 3px apart |
| half-pixel glyph | An odd icon in an even box, snapping when motion ends |
| squeezed / lopsided | A fixed box shrunk by flex; a control stretched with its content at one end |
| covers | The cursor over the words it clicks |
| appears with no entrance / vanishes with no exit | Something popped; confirm at 50ms sampling |
| appears, then moves | A fade that finishes before its travel starts |
| near-empty frames | A frame where almost everything has faded out |
| handoff shift / settle snap | A jump on the frame where a flyer becomes its destination, or after motion ends |
| hard edge | A moving edge slicing text |
| dashed edge resizes | A dashed border changing size |
| small text | Text rendering under 10px at widths under 600 |
| shrunk, not laid out for the phone | The wide design scaled down instead of recomposed |

## What you see, what you do

| You see | You do |
|---|---|
| A void under a list or pane | More product into it until it runs off the crop, or crop the pane. Never spread the rows |
| A fat row | Padding 12px (8px dense) and more rows. Never air inside the row |
| Rows spaced wider than they are tall | Tighten the pitch to the row's padding; add rows |
| A whole window floating with even margins on a hero | Bleed it off two edges with one gutter, or fill the stage |
| Gray bars where the eye lands | Words there. Bars beside it and under the crop stay |
| A label beside a real value drawn as a bar | Both words, or drop the row |
| A stat's unit on its own line | Nowrap the pair, size the number to the tile, or move the unit to the lead |
| A phone drawn small, or whole, in a narrow host | Crop it: a gutter from one edge, off the other, screen at 1:1 |
| A grabber or sheet under the island | Start the sheet below the status bar |
| A popover that shifts while open | Pin it by the edge it opened from; reserve the height |
| An emoji where an icon belongs | A glyph from one family. Emoji stay in messages and reactions |
| An icon cut by its box | Fit the drawing in its viewBox, or use a set's glyph |
| A reaction, dot, or mark on top of words | Move it to the edge or gutter |
| A fault line you think is intentional | Look again. If it still looks fine, say so in the handover note with the frame. Never clear it by hiding the thing |
| Ten film runs, checks green, frame unchanged | Stop. Get a fresh eye |

## The checklist

**Framing** (first, because nothing else matters if it is wrong)

- One gutter, and the window or phone bleeds off at least one edge, or sits whole because the brief wants it?
- Anything with words on it, or that the eye needs whole, cut by the crop?
- Is the ground the page the brief named, with no plate behind the device on a white or dark page?
- Any stage corner empty for no reason? Any void under a list?
- Phone: nothing under the island, a sheet below the status bar, a cropped phone losing status bar and nav together?

**Hierarchy and density**

- Beside the closest good reference: say the one difference. Is yours the sparser, flatter, or smaller one, and why?
- What does the eye land on first, and is it the result? Is one window, tile, or device clearly leading?
- Is the subject real words and values, with bars only beside it and under the crop?
- Label and value both words or both bars? Named avatars colored?
- Does the heaviest mark sit on what the story is about?
- Bento: every tile a specific moment with its words on it; no tile that is a title over bars; stat and unit on one line?

**Motion**

- Each beat filmed at 40 to 80ms and looked at: presses, morphs, handoffs, exits, the seam?
- Nothing appears without an entrance or leaves without an exit?
- Rolling numbers roll the right way and settle once?
- The loop ends where it began, or resets with a visible cause?
- Watch the unchanged neighbor through an insertion and a removal. Matching endpoint screenshots prove nothing about the frames between.

**Polish**

- Every hand-drawn thing at 4x: would a stranger know what it is? Any stroke clipped?
- No translucent icon, no onion skin?
- Spacing even: words 12px from edges, stacks 4 to 6px of ink apart, dots 6px clear?
- Nothing under 10px on the phone; nothing wrapping that should not?

## Fresh-eye review

After your own pass, hand the scene to a reviewer with a fresh context.

**Give the reviewer:** the checklist above, the good reference still beside the scene's still, the scene's URL, the frames you filmed, and a one-line brief. **Withhold:** your plan, your reasons, and your handover note. The reviewer judges the picture, not the intent.

The reviewer's instructions:

1. **First question, before the checklist:** does this composition answer this product and this page, or could it be any product in its category? A layout the brief did not shape (a window pinned with even margins whatever the product) is a finding, ranked with framing, even when every check passes.
2. Start from the brief's own words. If it says "white page", a tinted plate is first on the list. If it names a size, a look, or a page color, hold the scene to that before anything else.
3. Look at the frames the way the most exacting designer you know would: the one who screenshots the single wrong thing and sends it back asking what it is.
4. Answer every checklist item from a frame. If a needed frame does not exist (a beat at 40ms, a 4x zoom, the phone width), film it before answering.
5. Return a ranked list: framing, then hierarchy and density, then motion, then polish. For each item: what you would screenshot, which frame shows it, and the fix in one line. Rank by how much of the scene it spoils, not by how easy it is to fix.
6. A line the builder called intentional is not settled. Judge it again from the frame.
7. Do not fix anything. Do not soften a finding because the build is nearly there. Say what you could not check. If there is nothing, say "nothing" and list the frames you looked at.
8. Platform conventions are not placeholders. Send back an invented accent or a redrawn system control; never send back the convention itself.

This is the same isolation `interface-review` uses for scored critique: the judge sees the artifact and the rubric, not the maker's rationale.

## Handover note

Leave a short note beside the component:

```md
# Rehearsal: <demo>
Reference: <the example or product it was held against; what was kept, what changed>
Beats: 1 … 2 … 3 … payoff; loop <n>s; poster = <beat>
Captured: widths <wide, 390>, looks, states, reduced motion
Checks: <tool output, last line pasted, or "watched by hand">
Faults: <each named fault> → <frame> → <fix, or why it stands>
Review: <reviewer's list> → <your response>
Assumptions:
Unresolved:
Not checked:
```

Say what you did not watch.

## What tools cannot tell you

A checker can flag a jump and still miss a wrong path, an implausible gesture, a bad story, or an unreadable crop. A demo can pass every check and still be dull: checks catch execution mistakes, not a weak concept. A clean report is necessary, not sufficient, and "no issues detected" is not approval. A smooth exported recording on a virtual clock says nothing about live playback pacing. Say what the tools covered and what you watched yourself.
