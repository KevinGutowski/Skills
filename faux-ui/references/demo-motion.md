# Demo Motion

Rules for everything that moves in a faux-UI demo. Distilled from Stageshow's motion, choreography, annotation, and teaching references; durations, curves, and offsets are that source's.

**Scope warning.** These values are for an authored illustration that a visitor watches. Travel and arrivals are slow on purpose so the story can be read. They are not product animation values; for a working interface use `web-design` (web-animation-design). The one overlap: press, hover, and selection feedback inside the demo stays as quick as the real product.

## Contents

- [Story](#story)
- [Loops and resets](#loops-and-resets)
- [Pace and easing](#pace-and-easing)
- [Changing text and values](#changing-text-and-values)
- [Things that appear, travel, and leave](#things-that-appear-travel-and-leave)
- [The cursor](#the-cursor)
- [Drags and selection](#drags-and-selection)
- [Scrolling and the camera](#scrolling-and-the-camera)
- [Phones in motion](#phones-in-motion)
- [Annotations and connecting lines](#annotations-and-connecting-lines)
- [Reduced motion and the poster](#reduced-motion-and-the-poster)

## Story

Pick the shape from what the product is valued for. A demo forced into the wrong shape gets busier, not better.

| Shape | What carries it | Cursor |
|---|---|---|
| How it feels to use | One satisfying gesture, with the result appearing under the hand | Yes |
| A flow in an app | A few screens told as one continuous object, payoff on the last; no bolted-on second device | Yes, or touch |
| What the system does | The consequence lands somewhere else, with the link made visible (a value travelling a connector, a card flying into a list) | Usually none |

- A hero loop is 10 to 16 seconds: three to five beats building to a payoff. One gesture and a response can be enough. A repeat is a short beat, never the whole flow twice.
- Beauty decides. The calmer, fuller, better-framed version beats the one with more story.
- Open on a finished screen that works as a still. Real content is on screen before the first beat; a thread opens with a real message, not bars. A short history sits at the top of its pane, never pinned to the bottom under a void.
- The payoff is visible at the shown size: a panel, a window coming forward, a clear state change. A 16px avatar at the edge is not a payoff. It arrives full, never as a blank surface for a quarter second.
- A satellite arrives at the beat it pays off, carrying its payload, or is there from the first frame. Never an empty parked object.
- Test for motion without hierarchy: cover each moving element in turn. If the story gets clearer without it, cut it.
- **Without a cursor there is no stand-in.** Do not walk a focus ring, halo, or spotlight between controls. States and timing carry a system story.

## Loops and resets

- **Every reset has a cause or is invisible.** In order of preference: a seen cause (undo with its keycaps, a Clear button, closing the panel); an exit around an anchor; a snap while hidden.
- **Data never rewinds in view.** Snap it back while off camera, under a closed panel, or behind the exit, or bring the next loop's data in as new.
- A reset removes what the loop added as one thing. A reply and its reaction leave together. Exiting around an anchor: everything the story added leaves in one reverse stagger, 40 to 80ms apart, all moving within half a second, while product content stays. Never everything at once.
- **A loop never plays a navigation backwards.** An app opened from a notification does not shrink back into it; a pushed screen does not slide back in reverse. Undo state in place with a quick reverse stagger (last change first, about 70ms apart), or cut while something covers it. Do not lock the phone to reset an in-app story: a black screen on a white page reads as the demo ending.
- A story that accumulates runs as a conveyor: exit the built batch, bring a fresh one in from the crop, reset unseen.
- The payoff holds about 2s before the exit. Nothing on screen sits still for more than about three seconds. No dead air at the seam: the next action begins within about a second of the exit ending.
- A second scene earns its length by adding something new (a different outcome, surface, or side).
- A looping video file starts on a calm frame, never mid fast motion.
- The loop keeps a complete product picture throughout. A header over a blanked list is not an anchor.

## Pace and easing

- **Two curves, unhurried.** Travel between places: `cubic-bezier(0.45, 0, 0.1, 1)`. Arrival from nowhere: `cubic-bezier(0.25, 0.8, 0.25, 1)` over 0.8 to 1s. Judge distance and overlap, not duration.
- Travel has a departure, a stretch of clear travel, and a soft arrival. Length alone does not make it fluid.
- Choose duration and easing together, by job. One easing everywhere flattens the hierarchy.

| Job | Decision |
|---|---|
| Direct feedback | Starts on the input, at the real product's speed. A presentation delay feels unresponsive |
| A state the click sets (tool picked, row selected, filter on) | Fill and color ease in over about 150ms and out the same; never on in one frame |
| Related responses | Overlap them. The changed setting leads its label, then its dependents; the confirmation still follows its cause |
| Groups | Stagger in reading order 40 to 80ms apart inside a scene; 80 to 120ms between tiles of a grid |
| Related data updates | Recognition, transfer, and the accumulated result may each take a different time; a number may count longer than its transfer took |
| Color between distant hues | About 200ms, because it passes through mud however it is done; let the label carry the slower motion |
| Holding a result | Stop. No new pulse, no repeated count |

- A small expressive icon may overshoot while its card and text settle without bounce. Keep that accent local.
- Do not scale readable text much when introducing a composition.
- Dependent changes that all start together read as one flicker. Offsetting their starts while their movements overlap is often the only change needed; Stageshow's checkout comparison holds layout, curve, and masks constant and varies only the offsets.

## Changing text and values

- **Every change moves.** Text that turns into a pill, one menu replaced by another, a number that jumps: the submenu slides, the text rolls, the surface morphs.
- **Change only what changed.** Animate the changed span and move what follows by its measured width. Never roll words that did not change.
- **A button whose label or icon changes, changes on itself:** same element, label crossfading, width easing so its neighbors move with it. Never swap in a second button. Variants share one slot; check the shortest, the longest, and the pending state.
- Decide a control's footprint before its label transition: hold the largest size, or resize deliberately.
- A status word that changes (Queued, Running, Passed) rolls in a clipped slot; two spans crossfading in place overlap mid-fade and read as a smudge. When several rows change at once, cascade them about 60ms apart; a column changing in unison reads as flicker.
- Numbers roll digit by digit, last digit first, with unchanged digits still. No per-frame interpolation blur. Give the number a fixed slot and hold the finished value.
- A right-pinned value changes against its right edge; a status icon beside it keeps a fixed slot.
- Added content opens its space with its neighbor: an arriving icon's width and gap open together while the label travels, and both close on removal.
- Typed text becomes a chip in place: the words stay and the surface grows around them.
- A draft becomes the posted comment in place: the typing box sits on the comment's own column and holds the finished comment's height from the first keystroke. Posting adds no new line (the time goes on the name's line and fades in).
- An object keeps its identity when it changes: a plus becoming a close rotates the same strokes.
- Result follows press feedback: a small press and surface response, then the state change.
- A spinner is already turning before it is visible and keeps turning through its fade out.
- Text shimmer: inspect the glyphs, not only the box. Keep a transform layer through cleanup; move a label by transform inside a stable grid, since margin travel shifts the shared baseline. Never `will-change` over the whole scene.

## Things that appear, travel, and leave

- **Nothing pops.** Everything has an entrance and stays mounted until its exit finishes.
- **No holes or blank frames.** What replaces something arrives as it leaves.
- **A new row carries the rows below it.** Animate the containing track so the line below moves with the height, or reserve the space. Neighbors make room continuously as the newcomer arrives; its fade rides with its travel.
- A resizing surface moves size, position, and content as one transition, never stretches its text, and retargets from its current geometry when interrupted.
- Keep header, outer surface, and action positions steady while variable content changes inside. Replacing content keeps the container, alignment, and reading interval and masks only the moving slot.
- **Solid things do not fade through.** Windows, phones, and cards arrive by moving, opaque or nearly. A half-transparent phone is a ghost.
- Cards, toasts, pills, and reactions arrive whole from just above. Only rows of text are revealed by a clip.
- Content arrives after its container: a pin's number appears once its circle is nearly full size.
- A popup is sized and scrolled before its first frame. An open popover, menu, or sheet is pinned by the edge it opened from, with height reserved for its longest list, and it closes where it was.
- A moving edge never slices text: fade content before and after the height moves, or mask locally. Never soften the whole interface.
- A dashed edge never changes size; draw it at final size on its own layer and only fade it. Border style does not transition.
- **One object, one trip, ending in its final place.** Open the room, measure the slot, then fly. Never land and then re-lay out around it. A flight's end points are fixed at take-off.
- After motion nothing moves: at a handoff, the flyer and its replacement are the same size, place, and look on the swap frame. Measure the landing element itself, never its padded wrapper (a 4px miss shows).
- A flyer changes to its resting look during the last third of the trip. Landings decelerate over the last third: no bounce, no ring pulse.
- A thing that grows as it travels takes a long settle (600ms or more); a quick ease-in-out lurches.
- A selection ring moving between items keeps its momentum when retargeted. Re-keying its entrance restarts it from the origin.
- A chart draws on from its start: line left to right, area following, end dot landing when the line reaches it. Faded in whole, the trend is never seen.

## The cursor

- **Every move travels to the next action,** follows a held object, or clears the way. Between beats it rests on empty surface near its next move, never on an unused control.
- **The cursor never covers the words it clicks.** Aim inside the target but off its text (about 85% across, 60% down). Rest off a changed label.
- The element under it decides its kind (arrow, hand, I-beam, crosshair, resize), and it switches while crossing the element's edge, not after arriving. Native app buttons keep the arrow. No I-beam over a button.
- It stays where the press happened while the result changes size; never pin it to a moving button edge.
- It changes style by morphing, never popping. One cursor style across a whole site.
- Keyboard stories show the keys pressed; the cursor rests or leaves.
- On a dark stage the I-beam and crosshair turn light with a dark edge.
- A resting cursor fades after a few seconds (Stageshow uses 4s).

## Drags and selection

- **A pointer drag is one motion.** With a mouse, the row follows the pointer the whole way and leaves on release. A short drag then a throw is a finger's flick and reads as two motions under an arrow.
- A drag starts where the thing is. Pickup belongs to the press: press, hold, lift. A file from outside enters already held.
- **The grab offset is where the hand took hold,** and it is kept through travel and release. A held item rides with the cursor exactly on both axes, with no transition.
- A carried card is held, not slid: scale about 1.03, a deeper shadow, a degree or two of tilt, the whole card tilting with its words. It settles flat on drop, with no selection outline in the air.
- Drop targets never travel: the slot appears in a cell and jumps to the next. Moving between lists: the source closes on lift, the destination opens in flight, and the drop aims at the open slot.
- Constrained controls follow their mechanism: a knob's hand moves on a circle.
- **A text selection stays under the I-beam on every frame.** Drive the highlight from the drag's own position and render from a character count. A highlight grown by a timer runs ahead of the cursor on one line and behind on the next. It reads left to right from a word boundary.

## Scrolling and the camera

- Nothing scrolls unless the pointer is on it. Scroll back before the loop ends, never at the seam.
- Scrolling starts with whole rows; fade only the edges that hide content once scrolled, and clear the fade at the end.
- **The camera needs a reason.** Push in only when the payoff would be too small to read at the shown size. Cut any zoom nobody would miss.
- Frame the wide shot as a good still first; a zoom never rescues a weak frame. One push-in per story, in and back out, with the cursor holding still while the view moves.

## Phones in motion

- **Act where people do.** A notification is tapped to open its app, and the reply or purchase happens in the app. A story told through long-press notification actions reads as invented.
- Touch uses a touch indicator, never a desktop arrow. In-app responses are quick: about 0.5s on `cubic-bezier(0.3, 0.75, 0.1, 1)`.
- A swipe is a flick: a third of the screen in about a quarter second, lifting while still moving; the page carries on at the finger's speed over about 0.5s on `cubic-bezier(0.25, 1, 0.5, 1)`. A pause at the hand-over reads as harsh.
- A swiped row stays in its list: the action is the row's own back, the same height and edge to edge, revealed as the row slides off it. Check the frame at the furthest point of the swipe; it is the one people screenshot.
- A reaction is drawn as the app draws it: the real emoji in a small pill on the bubble's lower corner, growing from that corner as room opens on the same clock.
- Dynamic Island: animate the black shape's box and radius together and keep its content on a separate layer that fades into place. Stageshow's timing: about 500ms underdamped growth, 380ms shrink delayed 120ms so content clears first, a press squeeze to 0.965.

## Annotations and connecting lines

A line earns its place by removing an ambiguity. If the layout already shows the relationship, leave it out. Design the product first: a perfectly attached line cannot rescue faint text or weak hierarchy.

| Line | Says | Form |
|---|---|---|
| Leader | What one visible thing is | 1px (1.5px at hero scale) in quiet ink, straight or one bend, from the note's edge to 4 to 6px short of the object, ending in a 4px dot. No arrow, no continuing motion |
| Record link | Two views of the same thing | A fine dotted line, a different weight from any leader nearby |
| Collection | Several inputs make one result | One color through inputs, junction, and output; delivery starts only after every input has arrived |
| Direction | Something was transferred | An arrow with an unambiguous origin. A reply starts from the recipient; solid out, dashed back. Status changes after the line lands |
| Moving phase | Work is ongoing | Slow dots on a fixed route, only while data flows; frozen when it stops; a static directional poster under reduced motion |

- One relationship, one color. Not a hue per input.
- Attach to measured element edges, never to positions guessed from a screenshot. Check the direction of the final segment: a line must not run along the border it lands on, underline its label, or cross the label's interior.
- A line never passes behind or through another surface, and overlap never covers record text.
- The line starts when selection or delivery begins, draws on, holds long enough to read, and clears with an on-screen action. End markers wait for the visible line to reach them.
- If the object moves, put the object and its note in the same moving coordinate space; a separately aimed line jumps ahead.
- At narrow widths, stack the relationship rather than shrinking its type.

## Reduced motion and the poster

- The poster is the frame most people see. Choose the beat that tells the story alone (the row mid-swipe with the action showing, the card over its new column) and leave the result on screen rather than tidying it away. Cover the motion and ask what happened; if the poster cannot answer, choose another beat.
- A poster is never caught mid-change: no digit mid-roll, label mid-morph, or surface mid-fade.
- Under reduced motion each scene shows its poster still, and a moving-phase annotation shows a static directional line. Causality, continuous identity, and legibility hold in every look.
- Pause the demo when it is off screen or the host pauses it; a paused new scene still finishes its first measurements without advancing the story.
