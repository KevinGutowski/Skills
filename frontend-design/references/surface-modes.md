# Surface modes, direction, and committing the world

## Contents

- Choose the mode from the surface
- Decide what is already true
- Escaping the default: propose, then assign
- The direction contract
- Commit the world: color, type, form
- Operate depth: product UI rules and permissions
- Read depth: frame the world, calm the column
- Finish: review against the promise

This reference supplies the method behind `frontend-design`'s fast path. It is adapted from Impeccable (Paul Bakaus, Apache-2.0): `SKILL.md` Modes, `new-work`, `operate`, `mode-*.md`, and the July 2026 research note "The model can't roll its own dice" (https://impeccable.style/research). See [sources.md](sources.md). The named tells live in [anti-slop-catalog.md](anti-slop-catalog.md).

## Choose the mode from the surface

The mode names what success looks like for the visitor on *this surface*. Pick it from the requested surface, not from the product. A developer tool's landing page is Persuade, and a fashion house's documentation is Read.

| Mode | The visitor… | Typical surfaces | Where ambition shows |
| --- | --- | --- | --- |
| **Persuade** | decides and acts | landing, campaign, pricing | Full commitment. The world may carry the page, and the working action stays visible. |
| **Operate** | completes a task | app UI, dashboards, editors, admin, settings | Precision and restraint. Familiar patterns earn their place. |
| **Read** | understands something | docs, articles, guides, help, changelogs | The world owns the frame. The reading column stays calm. |
| **Experience** | is inside the work | portfolios, galleries, showcases | The artifact leads from the first viewport. The interface recedes. |

- **Persuade:** the opening makes the offer clear and desirable, puts a *working* primary action in view, and demonstrates something only this product can prove. The action is the one visitors came to take, in working form: a route-and-dates search, open appointment slots, add to cart. A decorative link to it elsewhere does not count. A committed form that hides the offer or the action is unfinished.
- **Operate:** someone fluent in tools like this should know where everything is before they notice the world. The world lends four things only: **type, palette, density, and one signature move.** It never supplies the layout, the navigation model, or the controls.
- **Read:** documentation reads as documentation. The world's palette, type, and signature move commit fully in the masthead, rail, ground, openers, and the treatment of code and tables. The column itself stays a reading face at a real measure, with nothing performing behind the text.
- **Experience:** the work leads. Navigation and chrome stay quiet until needed.

**Costume rule (Operate/Read):** a world taken from a tool the audience operates (terminal, oscilloscope, cockpit, control panel) comes back as a costume of that tool on a working screen. Take only what transfers as type, palette, density, and a signature move. A screen an engineer could not build from standard platform components is a picture of the tool, not the tool.

## Decide what is already true

Before inventing anything, classify the visual authority:

- **Refinement preserves.** Keep the incumbent identity, behavior, copy, and everything outside scope. Ask before replacing factual copy or adding claims.
- **Redesign replaces.** Keep product truth, content, function, native affordances, and constraints. Treat the old look as evidence of what the subject is, not as authority over what it becomes. Never split the difference by polishing a look you were asked to discard.
- **Established world, no DESIGN.md:** a coherent identity in code is still an identity. Inherit and document it rather than replacing it. A missing design file does not make a project greenfield.
- **Local addition** (a section, component, state, or feature inside an established surface): inherit the surface. A local addition is never a new identity exercise.
- **No visual authority:** create a world with the user.

Ask two or three questions that change the work (Persuade: who must act and what proof earns belief; Operate: task, frequency, states, constraints; Read: the reader's question and wayfinding; Experience: what leads and which transition matters). Also ask what must remain untouched and what would make a polished result feel wrong. Never ask for CSS values or canned style lanes.

## Escaping the default: propose, then assign

Impeccable's July 2026 experiments (~200 sampled concepts, ~$2,600 of evaluation) found:

1. **Creative framing does not add variety.** Sixteen creative prompts produced the same concept in 30 of 35 responses. The wording changed, the idea didn't.
2. **Rejection reveals the next default.** "Discard your first three ideas" reliably landed on the model's *second* default.
3. **A varied shortlist still has a predictable winner.** When the model, a simulated user, or a rejection rule picked from its own shortlist, option one won 27 of 30 times. Variety survived only when a script assigned the pick.
4. **Safeguards made the work timid.** A prompt with roughly five discouraging instructions per encouragement produced tentative output. Ordering it as *commit to the concept first, then refine for clarity* was the campaign's largest single quality gain.
5. **A new style can hide the old layout.** Teletext styling sat on a conventional marketing grid. The instruction that survived: **borrow the form's skeleton, not its clothes.**

Apply it as a procedure for a new or replacement world:

1. Name the product's unique mechanism in one sentence, the audience's real scene, its cultural home, and what this surface must prove. Name the page this category always ships and its predictable opposite. Both are the rut, and both stay off the list.
2. From the audience's world, list **seven concrete** visual systems, artifacts, places, rituals, publications, or notation they know well. Give each one line on why it resonates and one on how it looks (ground and main colors, type voices, one signature). If more than three share a material family, dig further.
3. **Assign, don't rank (experimental default).** Unless the exceptions in step 4 apply, let something outside the model choose: a random draw, the user, or a seeded script. Don't let the generating agent pick its favorite from its own list. Keep a re-roll option, and offer the category standard ("canon") as a quiet, always-available exit the user may take. Never recommend it yourself.
4. **Exceptions:** a pinned brief or user-chosen direction beats any draw, and a user who asks for the familiar category standard gets it at full craft. Re-roll on factual grounds (the direction cannot carry the product's truth), never on taste. The evidence is one project's campaign (see `coverage-gaps.md`), so treat this as a strong default to test locally, not a law.

For extensions and narrow refinements, skip the draw: inherit the world and resolve only the new purpose, hierarchy, states, and interaction.

## The direction contract

Before code, write about 150 words in six short blocks. Keep them in a dev-only brief, never in shipped source, comments, data attributes, or metadata:

- **THESIS:** the one idea this surface owns, and the category-default arrangement it refuses.
- **OWN-WORLD:** palette and component language, specific enough to recognize with all content removed.
- **STORY:** what the visitor understands, believes, and does.
- **FIRST VIEWPORT:** the exact composition, what sits where and at what scale, and where the primary action is.
- **FORM:** the chosen form and how it was assigned.
- **FINISH:** the exit condition, which is an independent review against this contract plus updated design documentation.

If a block reads like a mood, the direction is not decided yet. **The memory test:** if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, the concept has not committed.

## Commit the world: color, type, form

**Color strategy first, colors second.** Choose one:

| Strategy | Shape | Typical mode |
| --- | --- | --- |
| Restrained | Neutrals tinted from the world, plus one accent | Operate, Read (color still does real jobs) |
| Committed | One saturated color carries 30–60% of the surface | Persuade, a single Operate surface that earns it |
| Full palette | 3–4 named roles | Persuade, Experience |
| Drenched | The surface *is* the color | Persuade, Experience |

Color commits at page scale, as fields that own regions, not accents scattered over a neutral ground. Pick light or dark from a sentence about the physical scene, never from the category. Exact color math → `web-design` (oklch-skill).

**Faces are objects from the subject's world.** On Operate and Read surfaces, system stacks and workhorse UI sans are well served. On Persuade and Experience surfaces, these training-data defaults mean the search stopped too early: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter as display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans. Naming one needs a reason no other face could satisfy. A subject association (books want a serif, tech wants a mono) is never that reason. Pairing and loading → `web-design` (web-typography).

**Build with full commitment.** Rebuild every atom (nav, buttons, inputs, links) in the form's vocabulary. A stock component inside a committed form is a lapse. Later passes clarify the committed thing and never dilute it. In unattended work, the safe rendition is the known risk.

**Prove, don't claim.** Show the product doing its job. Demonstration data is design material: author it at full fidelity and label it synthetic where a visitor could mistake it for real. Commercial and factual claims stay uninventable: prices, customers, benchmarks, capabilities. Refusing a bold direction because the demo data doesn't exist yet is timidity dressed as honesty.

**Author the assets; never substitute chrome.** Gradients, glass, generic icon tiles, and polygon clip-paths where an authored asset belongs are a gap wearing chrome. When the world names a technique (canvas, WebGL, view transitions), build the technique, not a static imitation.

**Pace the scroll.** Vary density, scale, image, and quiet inside one grammar. A dense passage earns a quiet one, and the page ends on a real close.

**Loaded symbols stay out of the decoration.** A subject's world does not license militarist, supremacist, or hate-movement emblems as motifs. Use that world's neutral forms.

## Operate depth: product UI rules and permissions

The product slop test asks whether a category-fluent user can trust the interface immediately, or has to pause at each slightly-off component. Product UI fails through strangeness without purpose: over-decorated buttons, mismatched controls, display fonts in labels, invented affordances.

- **Type:** one well-tuned family is often right. Use a fixed rem scale, not fluid clamps (a fluid h1 that shrinks in a sidebar looks worse), and a tighter step ratio of ~1.125–1.2. Prose stays at 65–75ch, and tables may run wider.
- **Color:** Restrained is the floor. Standardize the state vocabulary: hover, focus, active, disabled, selected, loading, error, warning, success, info. The accent goes to primary actions, current selection, and state, never decoration. Add a second neutral layer for sidebars and toolbars. Keep inactive states free of heavy color.
- **Layout:** responsive behavior is structural (collapse the sidebar, reflow the table), not fluid type.
- **Components:** every interactive component has default, hover, focus, active, disabled, loading, and error states. Use skeletons in place of mid-content spinners. Empty states teach the interface. Use one button shape, one form-control vocabulary, one icon style. If "Save" looks different in two places, one is wrong.
- **Motion:** 150–250 ms. Motion conveys state, never decoration. No orchestrated page-load sequences, because the product loads into a task.
- **Modals are rarely the first answer.** Exhaust inline and progressive alternatives.
- **Permissions:** system fonts, standard navigation (top bar plus side nav, breadcrumbs, tabs, command palette), density, and consistency over surprise. Save delight for moments, not pages.

Dev-tool specifics → `devtools` (devtool-interface-design).

## Read depth: frame the world, calm the column

Write the first viewport as the document's shell: where the reader stands in the navigation, the title and the opening that answers or frames their question, the reading column, and the way forward (contents, next/previous). Candidates from the world's own publishing traditions transfer best: reference books, type specimens, timetables, field guides, manuals, a newspaper's wayfinding. Code, tables, notes, and figures use the standard forms readers know, set in the world's type and palette. Check with the name covered: could this be any other product's docs? If so, push the frame further. If it reads as an artifact before a document, pull the world back out of the column.

## Finish: review against the promise

- **Batch inspection.** Take one screenshot round at the shipping sizes (desktop and mobile, plus the user's real viewport if known), driving every reachable state. Fix in a batch and confirm with one more round. Two rounds is the ceiling for *your own* inspection: after that, stop hunting for defects yourself and hand off to the reviewer. The ceiling never closes an open repair: the reviewer's verdict decides what happens next.
- **Valid evidence only.** Let entrance motion settle before capturing, capture full pages from the top, and open every capture to confirm it shows what its name claims. A review on a blank or half-loaded capture binds nothing.
- **Fresh reviewer.** Spawn an independent reviewer with no transcript of the build. Give it the request, the direction contract, the screenshots, and the craft floor. It inventories what it sees *before* reading the contract, then judges fidelity, ceiling, each contract promise, truth, and the floor. Its verdict is one of four words: **recapture / rebuild / fix / ship**. Report that word as-is and never soften it. A pass that scored only a fix list is not a whole-surface approval. Judge-loop mechanics → `design-prototyping` (agents tier).
- **Act on the verdict:**
  - **recapture:** the evidence failed, not the build. Recapture what the reviewer named, then run a *full* review on the new captures. A verdict on invalid evidence binds nothing.
  - **rebuild:** fidelity failed wholesale. Skip patching: re-derive the named regions, produce the named assets, and send the result for a fresh full review (not a fix-scoring pass). Tell the user what is happening. Ask before a second rebuild, or when rebuilding would discard content the user approved.
  - **fix:** apply the material fixes in one batch, recapture the same viewports, and send them back to the same reviewer to score each fix resolved, partial, or unresolved, plus any regressions the batch introduced. Partial or unresolved fixes get another batch. Unattended runs stop after two fix rounds and report what is still open. In an attended session, show the open items and let the user choose between shipping as-is and another round. Stop as soon as a round resolves nothing. Work only from the reviewer's list; don't reopen your own hunt.
  - **ship:** report the verdict at the scope it actually covered and move on to documentation.
- **User evidence reopens the review.** If the user answers a ship with their own screenshot or a named mismatch, that outranks your captures: start a fresh full review with their material. Don't patch inline and self-certify.
- **No subagents?** Step fully out of the build context and run the review as a separate pass from the request, contract, screenshots, and craft floor only, not from your memory of building it. Say in one line at finish that the review was not independent. Never substitute it silently.
- **Document the built world.** For a new or replaced world, write the design-system record from the finished build, not before it. Ownership → `design-systems`.
