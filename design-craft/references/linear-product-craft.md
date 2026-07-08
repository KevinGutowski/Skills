# Linear Product Craft

## Contents
- Source Set
- When To Use This Reference
- Linear's Redesign Doctrine
- Concept To Ship Workflow
- Dense App Chrome
- Color And Theme Craft
- Quality Rituals
- Quality Triage
- Dogfood And Unshipping Loops
- Taste Calibration
- Interaction Details
- Checklist

## Source Set

Primary Linear sources:

- https://linear.app/now/a-design-reset
- https://linear.app/now/how-we-redesigned-the-linear-ui
- https://linear.app/now/behind-the-latest-design-refresh
- https://linear.app/now/why-is-quality-so-rare
- https://linear.app/now/quality-wednesdays
- https://linear.app/now/output-isn-t-design
- https://linear.app/now/design-is-more-than-code
- https://linear.app/now/linear-liquid-glass
- https://linear.app/now/invisible-details
- Linear *Conversations on Quality* episodes 01-09, YouTube captions fetched with `yt-dlp` on 2026-06-17; see `references/sources.md`.

Companion folds live in `design-principles`, `design-prototyping`, `design-systems`, `web-design` (oklch-skill), `ai-experience-design`, and `ux-writing` (linear-settings-copy). This file owns the reusable product-craft operating model.

## When To Use This Reference

Use it for dense professional software, app chrome, settings/productivity tools, redesigns, product-wide refreshes, and quality programs. Do not use it to make every interface look like Linear. Use the moves: restrained hierarchy, real-state testing, feature-flag comparison, theme tooling, and quality habits.

## Linear's Redesign Doctrine

Redesigns are justified when incremental product growth has unbalanced the whole experience. A mature product changes one feature at a time, but users experience it holistically; at some point the seams become design debt.

Operating rules:

- **Tie the reset to product direction.** Linear's 2024 redesign made space for the product to evolve from issue tracker into product-development system. If the product vision has not changed, a visual refresh may be styling rather than strategy.
- **Pay design debt in sweeps.** Updating only one module at a time can make the total product feel more disjointed. A reset should rebalance shared chrome, surfaces, hierarchy, and theme together.
- **Get leadership air cover.** Product-wide resets need authority because they touch surfaces owned by many teams. Leadership does not need to dictate pixels; it must protect the project from local vetoes.
- **Use the concept-car frame.** Early explorations can be bold because they are directional, not yet promises. The concept helps the company become familiar with the future before it is practical.
- **Do not disassemble the whole product.** Linear explicitly avoided turning navigation into a larger interaction migration when that would have added risk. A redesign should feel like an evolution, not a self-inflicted rewrite.

## Concept To Ship Workflow

1. **Name the pressures.** Product evolution, chrome clarity, navigation, hierarchy, density, theme, platform shell, and upcoming features are different questions. Pick the few the reset actually owns.
2. **Generate complete flows, not mood fragments.** Linear explored hundreds of screens by designing full views and flows: Inbox, roadmap, projects, upcoming features. This catches system stress earlier than isolated hero screens.
3. **Choose a north star and ask how real it can become.** Keep the concept visible while prototyping. The practical question is not "can we copy the mock" but "how close can the working product get without breaking real states?"
4. **Run crash tests before implementation.** Test environment, appearance, and hierarchy before engineers are locked into a path.
5. **Document behavior once the direction hardens.** Define sidebar, tabs, app headers, view headers, state transitions, and removability rules.
6. **Ship behind a flag.** Start with internal dogfood, then private beta, then staged rollout, then GA. Keep old/new comparison one click away during refinement.
7. **Keep feedback in the work graph.** Linear connected Slack discussion and project updates back to Linear so testing context did not scatter across tools.
8. **Match artifact fidelity to the question.** Kevin Twohy's quality interview splits the work into "make the right thing" and "make the thing right": early design may need words, low-fi sketches, and engineering questions about the rough data model; sometimes it needs a future-perfect prototype that skips production detail so the team can feel the destination. Do not spend pixel-perfect effort while the real uncertainty is concept, data shape, update frequency, or operational pipeline.

## Dense App Chrome

Linear's chrome principle: the interface can be dense without every element competing for attention.

Practical moves:

- **Earn attention.** Main content gets the strongest contrast. Navigation, inactive tabs, secondary icons, and orientation chrome recede once the user has reached the working surface.
- **Structure should be felt, not seen.** Borders, separators, and panels are there to explain relationships. If the line does not clarify a relationship, soften it or remove it and let spacing/grouping carry the structure.
- **Compress support surfaces.** Tabs and sidebar items can be smaller and quieter than content controls. Compact chrome is not a density flex; it is attention budgeting.
- **Reduce icon noise.** Icons help recognition, but too many colored or treated icons become visual static. Scale down, remove decorative backgrounds, and reserve treatments for status or identity.
- **Align what users feel, not just what screenshots show.** Linear spent time aligning labels, icons, and buttons vertically and horizontally in tiny surfaces. Users may not identify the change, but the product feels calmer after minutes of use.

## Color And Theme Craft

Linear's color-system lesson is about controllable relationships, not a fixed palette.

- **Use perceptual color spaces for generated themes.** LCH/OKLCH makes lightness and chroma operations closer to what users perceive than HSL.
- **Minimize source inputs.** Linear's theme system moved from dozens of hand-authored variables toward base color, accent color, and contrast, with aliases generated for surfaces, text, icons, and controls.
- **Make contrast a first-class axis.** A contrast variable allows higher-contrast themes for accessibility without creating a separate hand-maintained palette family.
- **Limit brand chroma in chrome.** Linear moved toward a more neutral timeless appearance by limiting how much blue influenced chrome calculations. In dense products, brand color should support recognition without tinting the whole workbench.
- **Tune in the real app.** Linear built an internal color tool in the dev toolbar exposing hue, chroma, lightness, contrast, and individual tokens, then copied landed values back into Figma. The live product was the tuning surface.

## Quality Rituals

Quality Wednesdays converts craft from taste-talk into a habit.

How to adapt it:

- Ask each person to find and fix one small defect that degrades the experience but may not be a conventional bug.
- Keep the fix small, often under an hour, so the ritual is sustainable.
- Let people hunt by theme: menus, keyboard navigation, accessibility, mobile width, button sizes, composer resizing, animation timing.
- Show the fix in a recurring forum. The shared noticing is as important as the patch.
- Track the work with a label so the compounding effect becomes visible.

The deeper effect is preventative: after enough reps, engineers and designers begin seeing common pitfalls before they ship.

When ritual or refresh work surfaces design-system deviations, name the root cause before fixing. Paul Bakaus's Impeccable polish pass (github.com/pbakaus/impeccable) classifies every deviation as a **missing token** (the value should exist in the system but doesn't), a **one-off implementation** (a shared component exists but wasn't used), or a **conceptual misalignment** (the feature's flow, IA, or hierarchy doesn't match neighboring features) — and the fix differs by class: patch the value, swap to the shared component, or rework the flow. "Fixing the symptom without naming the cause is how drift compounds," and "polish without alignment is decoration on top of drift." Treat automated drift detectors as defect evidence only: "a clean script result is never proof that the design is strong" — gather browser evidence and inspect the real interaction path.

## Quality Triage

The quality-series delta is not "raise the bar"; it is how to decide which quality work earns immediate attention.

- **Separate wrong product from rough execution.** Jeff Weinstein's cancel-the-day test asks whether the problem is urgent enough before polishing the solution. If nobody would scream during an outage, or the problem is not big enough for the audience, more finish is strategy theater. Fix problem choice before craft depth.
- **Use the repeated-use test for jank.** A tiny interaction cost becomes must-fix when it repeats all day, sits in the primary workflow, or makes the product feel untrustworthy. A delight detail can wait; a repeated hesitation, broken expectation, or trust leak cannot.
- **Let scope pay for quality.** Dick Costolo's two-week reframe is a deletion exercise: remove review paths, launch rings, fidelity, audience breadth, or feature branches until the quality-critical thing can ship at the intended bar.
- **Do not punish fast wrongness.** Costolo's leadership rule is to correct mistakes quickly, not prevent all mistakes. If people get blamed for the wrong call, they ask permission next time and decision speed collapses.
- **Protect both switch and stay.** Adena Nadler frames commodity software as needing interesting features to make people switch and stability to make them stay. Triage cannot choose novelty or reliability permanently; each release must know which side is carrying the product promise.

## Dogfood And Unshipping Loops

Internal use changes the quality signal when the builders live inside the product.

- **Turn prototypes on for the company.** Tara Feener describes Browser Company's loop as product ideas -> product updates -> dogfood, with prototypes enabled internally before member rollout. The point is not a survey; it is the team feeling the interaction in daily work.
- **Make unshipping a normal outcome.** If internal use shows that a feature feels wrong, remove it quickly. Treat that as quality practice, not failure. The artifact taught the team something; keeping it because it was built is the failure.
- **Look for the private shame.** When a user asks for a literal feature, Feener's rule is to assume you do not yet know the problem. Interrogate the need beneath the request, especially when the request names a workaround for an embarrassing or hard-to-admit pain.
- **Keep old/new comparison cheap.** The redesign article's feature-flag practice and the interview dogfood loop reinforce the same mechanism: fast taste decisions need live comparison, not memory of last week's mock.

## Taste Calibration

Shared judgment is trained through decision rights, language, and who is allowed to notice.

- **Name the decider before debate.** Henry Modisett's craft-speed mechanism is concrete ownership: everyone can reason holistically, but each major product or technical decision needs a named owner. Without that, taste becomes consensus and decisions slow down.
- **Circle back on the last 80/20.** Perplexity's rolling 80/20 is not permission to leave rough edges forever; it is a weekly revisit loop. If a cut corner is still on the main path after learning more, it returns to the quality queue.
- **Train engineers in craft language.** Ethan Eismann's Slack practice: engineers should be able to tell well-crafted from less-crafted experience and independently improve it, then refine with design. Craft cannot live only in designer comments because engineers are the people who make the final interaction real.
- **Make communication part of craft.** Basheer Tome's Fellow lesson is that clear priority and "who's on first" recovery paths create the focus needed for craft. Leave room in the plan for wrong turns; when something goes wrong, the quality question is who owns diagnosis, decision, and communication.
- **Keep a shared feel vocabulary.** Pull phrases from usage, not brand adjectives: "surprisingly great" means the solution exceeded the problem; "feels wrong" is a dogfood unship signal; "works the way you work" tests workflow fit; "well-crafted" vs "less-crafted" gives engineers critique language; "switch" vs "stay" separates novelty from reliability. Shared words make critique faster without flattening taste into consensus.

## Interaction Details

Linear's contextual-menu safe-area post is the archetype: a tiny invisible detail can remove repeated friction for high-frequency users.

Rules:

- Prefer the natural shortest pointer path over a path imposed by the menu geometry.
- Account for submenu forgiveness with safe areas, hover delays, or other mechanisms that preserve intent.
- Use contextual menus as discoverability surfaces for keyboard shortcuts: the mouse path executes the action, while the shortcut hint teaches the faster path.
- Judge interaction details by repetition. A one-second cost matters if a manager repeats it hundreds of times per day.

## Checklist

- [ ] Is the redesign tied to a product-direction shift or accumulated design debt, not novelty?
- [ ] Is risky scope explicitly excluded?
- [ ] Have environment, appearance, and hierarchy crash tests been run?
- [ ] Do test screens cover the real view types and states?
- [ ] Can internal users toggle old/new quickly?
- [ ] Is there a live tuning surface for theme or motion variables?
- [ ] Does chrome recede once users reach the work surface?
- [ ] Are borders/separators explaining relationships rather than decorating?
- [ ] Does the color system expose contrast as a controllable axis?
- [ ] Is quality practiced as a recurring habit, not a launch-phase cleanup?
- [ ] Is there a named decider for each craft-sensitive decision?
- [ ] Have repeated-use jank and trust leaks been separated from optional delight?
- [ ] Can the team dogfood, compare, and unship without treating removal as failure?
