# Refinement moves: bolder, quieter, distill, delight, polish, harden

## Contents

- The shared contract
- Bolder: raise one part to the system's own conviction
- Quieter: restraint with a point of view
- Distill: remove obstacles, not features
- Delight: one earned moment
- Overdrive: technical ambition, proposed first
- Polish: classify drift, triage, finish the whole path
- Harden: real data, real failures
- Which move?

These are directional verbs for an interface that already exists. They give vague requests like "make it pop" or "it's too much" a concrete playbook. Adapted from Impeccable's command references `bolder`, `quieter`, `distill`, `delight`, `overdrive`, `polish`, and `harden` (Paul Bakaus, Apache-2.0; [sources.md](sources.md)), paraphrased and merged with this skill's methodology. Building a new world → `frontend-design`. Copy-only clarity → `ux-writing`.

## The shared contract

- **Scope is sovereign.** "Everything else stays" is literal. Touch only the named target. Do not restyle its neighbors or add colors, fonts, radii, shadows, or primitives the system does not already own. If the system truly cannot express the direction, ask, and name the exact addition and the job it would do.
- **Refinement preserves.** Keep identity, behavior, factual copy, and claims. If the concept itself is wrong, say so and recommend a redesign. Don't smuggle one in under a refinement verb.
- **Know the surface's mode.** On Persuade and Experience surfaces, drama can carry voice. On Operate and Read surfaces, the same verb means less noise and more precision (`frontend-design` (surface-modes)).
- **Ask when it's unclear.** If purpose, audience, what's working, or the core message cannot be inferred from the code, ask before cutting or amplifying.
- **End with polish.** Each move hands off to a final polish pass over the touched path.

## Bolder: raise one part to the system's own conviction

A section usually reads flat because it opts out of moves its neighbors already make: full-strength display type, the signature motif, structural devices, density shifts. **The reflex answer, more effects, is the opposite of bold. Reject it first.**

- **Amplify what the system owns.** Use its motif and type scale at full strength. The bolder version should look *more* like the same brand.
- **Commit, then clarify.** Make one decisive move completely, then quiet everything around it so the move is legible. If every element got louder, the section got flatter.
- **Give it its own rhythm.** The target should read as a peak in the scroll, a change in density or pace, not more of the same.
- **Skeleton test.** Strip the copy and look at the bare structure. If the section only works once the words return, the boldness is in the text size, not the design. An image placeholder names a job (anchor, evidence), not a cue for a decorative photo.
- **Done when:** everything outside the target is unchanged, no new primitive appeared unasked, actions still work the same way, and it is unmistakably the same brand, only surer of itself.

## Quieter: restraint with a point of view

Quiet design is harder than bold design. **Generic quiet** (gray text on white, one sans at one weight, a grid of identical cards) is a failure, not restraint.

- **Find the intensity sources:** saturation, extreme contrasts, too many heavy weights competing, motion excess, decorative complexity, everything large.
- **Color:** desaturate toward roughly 70–85% of the original, use fewer hues, let neutrals do more work, and use tinted rather than pure grays. Never put gray text on a colored ground: use a darker shade of that hue or transparency.
- **Weight:** step weights down (900→600, 700→500) and carry hierarchy with size, weight, and space instead of color.
- **Simplify:** remove decorative gradients, glows, stacked shadows, and textures, flatten layering, and tame radius extremes.
- **Motion:** shorter travel (10–20px rather than 40px), a gentle ease-out, no bounce. Remove motion that serves no clear purpose.
- **Composition:** smaller scale jumps, rogue elements back on the grid, a more even rhythm.
- **Avoid:** making everything the same size, removing all color, erasing character, weakening affordances, or losing every anchor.
- **Done when:** the task is still easy, it still has character, long reading is more comfortable, and the point of view survived the cuts.

## Distill: remove obstacles, not features

Simplicity removes what stands between users and their goal. Every element must justify itself.

- **Find the essence:** the one primary goal, what is essential versus nice-to-have, what can be hidden, combined, or removed.
- **Information architecture:** one primary action, few secondary actions, the rest tertiary or disclosed. Say each thing once.
- **Visual:** 1–2 colors plus neutrals, one family, 3–4 sizes, 2–3 weights. Remove decoration that serves neither hierarchy nor function. Never nest cards, and drop cards that only do layout work.
- **Layout:** a linear flow where possible, consistent alignment, generous space.
- **Interaction:** fewer choices, smart defaults, inline edits instead of modal flows, fewer steps, one obvious next action.
- **Code:** delete dead CSS and orphaned components, cut variants (three may cover 90%), flatten trees.
- **Avoid:** removing functionality, weakening accessibility, mystery minimalism, hiding information users need to decide, or oversimplifying a domain that is truly complex.
- **Record removals:** what was removed, why, whether it needs another access point, and what feedback to watch.

## Delight: one earned moment

Delight is product character revealed through a useful interaction, a humane response, or a considered detail. Generic whimsy is worse than neutral clarity.

- **Look for moments that earn it:** effort worth acknowledging, waiting that could inform, first use, recovery, mastery, a useful capability worth discovering.
- **One thesis.** In one sentence: what the user should feel and why that feeling belongs to *this* product. Then pick the smallest system that delivers it.
- **Proportion:** celebration scales with consequence and frequency. A milestone can expand; a routine save should just feel certain. Never fake progress or delay completion to stage a flourish. An error leads with the problem and the recovery: warmth is welcome, jokes about money, privacy, deletion, or blocked work are not.
- **Protect the task:** delight never delays or obscures the primary task, overrides platform conventions or accessibility, plays sound without consent, becomes unskippable, or wears out by the hundredth repeat.
- **Specificity test:** a neighboring product could not use the moment unchanged.

## Overdrive: technical ambition, proposed first

"Extraordinary" depends on context. A particle field suits a portfolio and would embarrass a settings page, but instant optimistic saves can make a settings page extraordinary. This move misfires more than any other, so **propose 2–3 directions with trade-offs (support, performance, complexity) and get a pick before writing code.**

- Make functional UI feel exceptional: a dialog that morphs from its trigger (View Transitions), 100k-row virtualized tables, filtering 50k items without a flicker, workers keeping the main thread free.
- Progressive enhancement is non-negotiable: gate with `@supports` or feature detection, and make the fallback look good. Target 60fps, simplify below 50, initialize heavy contexts lazily, pause offscreen work, and test on mid-range devices.
- Never use ambition to mask weak fundamentals, and never stack competing extraordinary moments. Apply the removal test: would anyone miss it?
- Changing what the product *does* (real-time collaboration, offline support) is a product decision, not a UI move.

## Polish: classify drift, triage, finish the whole path

A detector result is defect evidence, not proof of quality. Use the feature yourself at real sizes.

**Classify each drift before fixing it, and fix at the narrowest correct level:**

| Drift | Fix |
| --- | --- |
| Missing token | The system needs a reusable value; add it (→ `design-systems`) |
| One-off implementation | Replace it with the shared component or pattern that already exists |
| Conceptual mismatch | Flow, information architecture, or hierarchy differs from comparable areas; realign it with its neighbors' model |
| Local defect | Just incomplete; finish it |

**Triage order:**

1. Broken or blocked tasks, data loss, misleading state, inaccessible paths.
2. Missing loading, empty, error, success, disabled, and permission states.
3. Flow, hierarchy, responsive, and design-system drift.
4. Visual and motion inconsistencies.
5. Code and asset cleanup.

Don't perfect one corner while the rest of the path stays below the same bar. Match neighbors' terminology, save behavior, and optimistic or pessimistic patterns. Fix optical as well as mathematical alignment. Remove debug output and polish-created duplication. Finish with a source diff that removes accidental churn. Exact values → this skill's polish-principles and surfaces references.

## Harden: real data, real failures

Designs that only work with perfect data are not production-ready.

- **Extreme inputs:** very long and very short text, emoji, RTL, accents, huge numbers, 1,000+ items, nothing at all. Use realistic or schema-backed values, never random strings, and inject them at the fixture boundary behind a dev-only demo/worst-case toggle. The per-field catalog, failure-signature table, and report format are in [worst-case-data.md](worst-case-data.md).
- **Failures:** offline, slow, timeout. Each status code gets a deliberate state: 400 shows field errors, 401 re-authenticates, 403 explains the permission, 404 shows not-found, 429 explains the limit, 500 is generic with a support path. Keep the user's input on any error.
- **Concurrency:** prevent double submission, handle races, use optimistic updates with rollback.
- **Interrupted gestures** (custom sliders, drag surfaces): a second pointer never hijacks the drag, and `pointercancel`, `lostpointercapture`, release outside, and window `blur` all clear drag state, so the next tap works without a reload.
- **Permission and read-only states** say why.
- **Leaks:** clean up listeners, subscriptions, timers, and in-flight requests on unmount.
- **Test** with extreme data, pseudo-localization, throttled network, keyboard only, and a screen reader. Add a behavioral regression test for each confirmed gesture fix.

Owners: overflow, reflow, and RTL → `web-design` (web-layout-design); error copy → `ux-writing` (error-messages); form validation flows → `web-design` (form-design).

## Which move?

| Symptom | Move |
| --- | --- |
| "Bland", "safe", a section that doesn't pull its weight | Bolder |
| "Too much", "loud", "tiring", "overstimulating" | Quieter |
| "Cluttered", "too many options", "confusing" | Distill |
| "Lifeless", "no personality", a key moment that falls flat | Delight |
| "Make it feel extraordinary", "wow" | Overdrive (propose first) |
| "Almost done", "feels off", "ship-ready?" | Polish |
| "Works in the demo, breaks in production" | Harden |
| "The concept is wrong" | Not a refinement: redesign through `frontend-design` |
