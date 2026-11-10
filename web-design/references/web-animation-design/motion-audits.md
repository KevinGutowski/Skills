# Motion audits — review, sweep, find, remove, plan

Deep dive for [web-animation-design.md](../web-animation-design.md). The parent file has the values and the Before/After review table. This file adds four audit jobs with fixed outputs, plus a plan shape for handing a finding to another agent. Paraphrased from Emil Kowalski's `review-animations`, `improve-animations`, `find-animation-opportunities`, and `remove-animations` skills at `715c180` (MIT; [sources.md](sources.md)).

Pick one job per run and say which. A whole-interface review with motion as one domain → `interface-review`, which owns severity and the final verdict; use this file for the motion rows.

## Contents

- Before any audit
- Review a diff
- Sweep shipped motion
- Find missing motion
- Remove motion
- Executor-ready plans
- Conflicts with other references

## Before any audit

- **Recorded decisions are not findings.** If the project's design docs or a comment beside the rule give a value and a reason, it stays. Note the difference separately if it matters.
- **Cite `file:line` and exact values** for every row. Take target values from the project's own tokens or nearest precedent before reaching for this library's defaults.
- **Separate what the code shows from what needs eyes.** Feel cannot be judged from a diff; say which rows need a recording or a device.
- **Report first.** Review, sweep, and find produce a report. Remove edits, then reports.

## Review a diff

Measure every animation the diff adds or changes against ten standards. A miss is a finding.

1. It has a nameable purpose and suits how often it is seen.
2. Entrances and exits ease out; nothing the user waits on eases in.
3. UI durations sit inside the parent file's budget, or carry a written reason.
4. Origin is right: anchored surfaces grow from their trigger, nothing starts from `scale(0)`.
5. Anything retriggerable or draggable is a transition or spring, not keyframes.
6. Only `transform` and `opacity` animate, with properties listed (no `transition: all`).
7. Reduced motion is handled; hover motion is gated to hover-capable pointers.
8. Deliberate and system phases have different timing where both exist (press vs release, hold vs snap-back).
9. It matches what the product already does for the same kind of element.
10. Several elements moving together follow [choreography.md](choreography.md).

**Fix preference.** Propose the earliest that works: delete, reduce, fix the easing, fix the origin, make it interruptible, move it to composite properties, make timing asymmetric, polish, then accessibility and cohesion.

**Output.** The parent file's `Before | After` table with a third `Why` column, one row per issue. Then remaining commentary grouped by impact, highest first, empty tiers omitted: feel-breaking regressions; motion to remove or cut down; performance; interruptibility and timing; origin and cohesion; accessibility.

**Verdict.**

- **Block:** a feel-breaking regression, motion on a keyboard or high-frequency surface, `scale(0)` or ease-in on an entrance, or a layout-property animation with an easy transform equivalent.
- **Approve:** none of those, durations and easing in bounds, interruption handled where it can occur, reduced motion respected.

## Sweep shipped motion

The same ten standards applied to what already shipped.

1. **Map first.** Search styles, templates, and scripts for every animated element: its driver (transition, keyframes, WAAPI, a library, pointer writes), its properties, and how often it is seen. A sweep that reads only the components misses motion defined in CSS.
2. **Judge** each against the standards.
3. **Re-read every finding at its `file:line` before listing it.** Drop what is by design, recorded, or exempt (a centered dialog keeps a center origin).

**Output.** One table ordered by leverage (impact over effort):

| # | Severity | Location | Finding | Fix |
| --- | --- | --- | --- | --- |

- **High:** feel-breaking. Ease-in on an entrance, motion on a keyboard or high-frequency surface, dropped frames, `scale(0)`.
- **Medium:** noticeably off. Wrong origin, keyframes on something retriggerable, movement with no reduced-motion handling.
- **Low:** polish and token consolidation.

Then two to four missed opportunities, listed apart because they add rather than correct. Stop there and let the owner choose.

## Find missing motion

The default answer is that nothing is missing. This audit succeeds when it returns a short list, or an empty one.

Every candidate passes four questions in order. The first "no" rejects it.

1. **Frequency:** is it seen rarely enough to carry motion?
2. **Purpose:** which named purpose does it serve (feedback, continuity, spatial orientation, attention, a rare moment of delight)?
3. **Speed:** can it do that inside the duration budget?
4. **Function:** does motion help the task, or decorate data someone is reading?

Where real gaps tend to be:

- **No feedback:** a pressable element with no pressed state.
- **Teleporting state:** content that swaps or appears with nothing bridging it; a surface that enters with motion and leaves without.
- **No spatial story:** a panel with no visual tie to its trigger.
- **Gesture seams:** something draggable that snaps without tracking.
- **Rare moments rendered flat:** empty states, a completed milestone, a first visit.

**Output.** Five to seven rows at most, ordered by leverage:

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |

Each suggestion carries exact values, the precedent it borrows from, and its reduced-motion behavior.

Then a required **Rejected candidates** section: two to five places considered and turned down, each with the question that rejected it. This is what makes the short list trustworthy. Close with one paragraph: how much motion the surface needs, and the single highest-leverage row.

## Remove motion

Only subtract: delete an animation, reduce it, or remove code it orphaned. Do not retune curves or add anything. An animation that should stay but is badly built goes in the report for a later change.

**The gate, per animation.** Record the branch that decided it.

```
Opened or driven from the keyboard?                    -> delete
Seen 100+ times a day (nav, tabs, rows)?               -> delete
On data being read (counts, tables, refreshed grids)?  -> delete, unless it shows a real change of value
No nameable purpose?
    a rare, first-time moment?                         -> keep
    otherwise                                          -> delete
Has a purpose:
    seen tens of times a day?                          -> reduce
    over budget, or travel where a fade says the same? -> reduce
    otherwise                                          -> keep
```

**Reducing** means a smaller version of the same motion:

| Today | Reduced to |
| --- | --- |
| Hover with scale, lift, or a growing shadow | Color or opacity only, 150ms or less |
| Slide or scale entrance on a frequent surface | Opacity only, 150ms ease-out |
| UI animation over 300ms | 200–250ms, same curve |
| Stagger over 80ms an item or 300ms in total | 30ms an item, or fade the group as one |
| An endless loop on a persistent element | Run once, or keep the static end state |

If the reduced version no longer carries the purpose, delete it.

**Hazards.** Check each before deleting. They are why removal is not a find-and-replace.

- **Hidden start states.** A keyframe with fill-mode `both` or `backwards` from `opacity: 0`, or a class a script removes to reveal the element, leaves it invisible once the animation is gone. Remove the start state with the animation.
- **Code waiting on the animation.** `animationend` and `transitionend` listeners, `animation.finished`, and timeouts sized to a duration. Without the animation the event never fires; move the work to the moment of the state change.
- **Delayed swaps.** A router or framework hook that holds a DOM swap for an exit animation, or code that waits before removing a node.
- **Motion hiding a jump.** Remove a size or position transition and a layout shift may appear. If it does, keep the animation and report the shift.
- **Focus moved after motion.** It must now move immediately.
- **Tests** that wait on an animation class or duration need the same removal.

**Cleanup.** Delete what the removals orphaned: `@keyframes`, easing and duration tokens with no remaining reference, and script code that only served the animation. Search for each removed name to confirm nothing references it.

**Output.**

| # | Location | Was | Verdict | Deciding branch |
| --- | --- | --- | --- | --- |

Order by how often the user meets it. Then a required **Kept** section: two to five animations considered and left, each with the purpose that saved it. Then the orphaned code removed, and what needs a person to check on a device.

## Executor-ready plans

When a sweep finding will be fixed later or by a less capable agent, write one plan per finding. The plan must be executable without the audit conversation:

- **Header:** status, the commit the plan was written against, severity, category, files in scope.
- **Problem:** `file:line` and the current code quoted verbatim, so drift is detectable.
- **Target:** exact values (duration, curve, properties), never "make it snappier."
- **Repo conventions:** the tokens to use and one existing exemplar to copy.
- **Steps:** one edit per step.
- **Boundaries:** what not to touch, and an instruction to stop and report if the quoted code no longer matches.
- **Verification:** the mechanical checks (lint, tests, a search that should now return nothing), then a feel check at 10% playback speed and with reduced motion toggled.
- **Done when:** observable conditions, not "looks good."

General principles for agent handoffs live in `working-with-ai` (agentic-coding); this is the motion-specific shape.

## Conflicts with other references

- **Verdict vocabulary.** `interface-review` uses Block / Needs changes / Approve. The source's motion review has only Block and Approve. Inside a broader review, use the three-way verdict; standalone motion reviews may use two.
- **Restraint record.** "Rejected candidates" and "Kept" are the motion form of `interface-review`'s "Considered but rejected." Same purpose; keep both names recognizable.
- **Severity.** High / Medium / Low here map directly onto `interface-review`'s scale.
