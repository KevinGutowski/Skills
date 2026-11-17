---
name: design-prototyping
description: "Prototype and present design work across three tiers — fake-it (Keynote Magic Move), real code (SwiftUI), and agents. Use when validating an idea before building, exploring or converging on UI variants, or structuring a feedback session, review, or pitch. Research method → user-research; org buy-in → design-org-influence; visual polish → design-craft. Triggers: prototype, Magic Move, tuning panel, design variants, present design work."
---

# Design Prototyping & Presenting

**References — read on demand:**

- [references/methods.md](references/methods.md) — Tier 1 techniques, question battery, presenting rules, picker harness; read for a fake-it build or a Show/Learn session.
- [references/agents-field-notes.md](references/agents-field-notes.md) — field quotes, variant loop, eval notes; read before Tier 3 work.
- [references/pitch-and-influence.md](references/pitch-and-influence.md) — read before a pitch or vision prototype.
- [references/soleio-field-notes.md](references/soleio-field-notes.md) — read when deciding how early to ship or test social features.
- [references/sources.md](references/sources.md) — sources; [references/coverage-gaps.md](references/coverage-gaps.md) — parked standards.

The trap is *idea → build → disappointment*. "The more prototypes we can put between your idea and your application, the better the result." The mantra: **"Make fake apps, show people, and learn from their feedback. And do that over and over again until the experience of your app feels great."** Prototype to *test* ideas (build the right thing) and to *get new* ideas.

## Choose the tier first

Three questions before making anything: **What needs to be more real?** (the one thing you're testing) · **What can we fake?** (everything else) · **Where will they use it?** (test on-device, in context).

The ladder: **fake-it for concept validation; SwiftUI prototypes for feel, real data, and demos; agents to drive the code tier wide and fast.** ⚠️ 2023 supersedes the older "never real code" absolute; the hack-it ethic survives: prototype code needn't be good code.

Routing rules:
- **The quadrant** (Ridd): size of the work × how much of the material already exists in production. Small+existing → in-codebase agent; big+blank → canvas/AI prototyping tools. Don't rebuild production inside a prototyping tool that doesn't sit on your codebase.
- **First-diamond rule** (Ridd + Haney): divergence stays in cheap media; agents enter when converging. "Designs being disposable is like a good thing."
- **One concern per artifact — a "breakable toy"** (Josh Puckett): name the single question the artifact answers; go only as far as needed — sometimes "dangerously close to a wireframe" is correct. One artifact (or prompt) solving everything produces myopic rabbit holes. Fidelity is set by *audience + the decision at hand*.
- **Concept car → crash test → flag** (Linear): a bold concept earns implementation only after focused crash tests of environment, appearance, and hierarchy; then ship behind a flag with old/new toggles ([references/methods.md](references/methods.md)).
- **Medium-matching** (Rafa Conde; Cursor school): pick by data needs — "I need real data… it is just faster to create a new branch of the main app." Walks + bullet lists for conceptual problems; Figma for exact pixels; code when states and AI behavior matter — AI interactions "you just can't fake" in mocks.
- **Static mocks are hunches, not handoffs** (Stamatiou; Castilho): motion and interaction feel are *never* prototyped in Figma — always tuned in code. Design is "a conversation between design and engineering."
- **Animation docs: pair verbal + visual artifacts** (Nabors, *Animation at Work*, ch. 4 → [references/methods.md](references/methods.md)).

## Tier 1 — fake it at the cheapest fidelity that answers the question

- **Pictures:** start with *many* hand-drawn sketches — "you should not start prototyping from just a single idea." Then Keynote: screenshot a similar app, block areas with shapes, fake the text, photos, and icons. One screen ≈ 10 minutes; defer visual-design decisions; zoom to physical size to check tappability.
- **Animation:** Keynote **Magic Move** = slides as keyframes. "Any animation you choose is communicating something about the relationship these screens have." Run it on the phone — taps advance, so it *feels* interactive.
- **Interaction:** "make pictures move in response to touches, on the device you're prototyping for." Any tool works ("it's about subverting your tools"). **Don't engineer it — hack it.** One tall screenshot dragged by touch deltas fakes a scrolling list.
- Speed buys *breadth*: a working-feeling Keynote timer takes about a minute, so run many parallel explorations across a diverse team.
- **Keep exploration loose — structure later** (Stamatiou): skip auto layout and design systems while exploring wildly different concepts; to break your own tendencies ask **"how would [another company] design this?"**
- **Field notes** ([references/methods.md](references/methods.md)): true spatial context, scaffold-don't-script for collaborators, core loop before the app exists, and Polygon's publishing-scale lessons.
- **Team-of-one adaptation** (Buley): when you need buy-in as much as answers, "turn any meeting into a design session" — sketch live, invite non-designers to sketch ([references/methods.md](references/methods.md)).

## Tier 2 — real code: SwiftUI as a design tool (2023)

- **Dynamic tools surface what static ones hide:** loading states, pressed states, Dynamic Type — "the moment we started making prototypes, they were obvious."
- **Design how it feels, on device:** interactions "give you a sense of how your designs feel, not just how they look" — a too-fast Digital-Crown zoom was fixed by scrubbing sensitivity values live; velocity-aware tuning is the kind of decision only a feel-prototype settles.
- **Find where designs break:** real data and real environments — flat New York routes exposed a Y-axis bug that hilly San Francisco data hid; sunlight drove contrast.
- **Build one-off parameterized mini-tools:** sliders scrubbing line width/opacity/blend-mode over the live UI — "way more variations than we'd be able to do efficiently in a static design tool."
- **Demos lead reviews:** "When people can hold a demo of your work in their hands, designs explain themselves." And the payoff unique to this tier: "you're not just creating a prototype… you can ship what you design."

## Tier 3 — agents driving the code tier (2026)

Coding agents + previews "supercharge the prototyping of key screens and moments" — and the real native code can carry forward. The governing stance: **"Do not delegate critical thinking to these tools… think of coding agents as collaborators in your prototyping process," not as designers** — "the key piece of the puzzle is your judgment." Five patterns:

1. **Go wide, remix, repeat (exploration):** be specific about features and mood, and "most importantly, ask for multiple options" — e.g. 10 variations, each as its own named `#Preview`; then remix the promising ones. Ask for *structurally different concepts, not variants*, and budget divergence deliberately — tooling is depth-biased. Range moves: [references/agents-field-notes.md](references/agents-field-notes.md).
2. **Agent as fake user (lived-in content):** have the agent "play the role of somebody using your app" — but *you* think through edge cases (empty states, unbounded growth); keep sample content plausible and in its own reusable file. Realistic content surfaces missing blank-slate UI and layout breaks.
3. **Agent-built tuning panels (key moments):** the parameterized mini-tool, generated on demand — "ask for the animation to be broken into phases… a shared vocabulary"; panel side by side with the UI, values copied back.
4. **Independent judge in a fresh context (evaluation):** the generating agent is anchored on its own choices, so spawn a *separate* judge with its own context window, loaded only with explicit criteria (Montoya): `design-principles` critique mechanics, `design-craft` facets, checklists, and depth spectrum. Same model is fine, same context is not.
5. **Converge by walking the design tree (convergence):** render 3–5 *structurally different* variants behind a floating live switcher *inside the app* — "a throwaway route on its own is a vacuum: every variant looks fine in isolation" (Pocock). Then rounds of pick-favorites-plus-verdict, each re-prototyping the *current* question one level deeper: overall design → component groups → individual components. Mechanics: [references/agents-field-notes.md](references/agents-field-notes.md); picker harness: [references/methods.md](references/methods.md).

Amplifiers and cautions (full notes: [references/agents-field-notes.md](references/agents-field-notes.md)):
- **Prototype with the full dataset and in the target production stack** (Evil Martians) so handoff is copy-paste; AI removes friction, not judgment.
- **Comp-led vs code-led depends on the surface's mode** (Impeccable, 2026): comps pay off for Persuade and Experience surfaces; default Operate and Read surfaces to code-led. Compare an approved comp region by region — models believe their recreation succeeded when it did not. Single-project evidence; modes → `frontend-design` (surface-modes).
- **Mock-to-code: diff against the mock element-by-element** (Stamatiou vs Claude Design 2026, first pass "65/100") — the checklist below — before iterating on anything else.
- **The Cursor school endpoint**: designers ship code instead of mocks — "Mocks and renders show possibilities. Prototypes show reality." And **"the difference between slop and soulful products is iteration and taste. Most people stop at the first output, rather than using it to begin."**
- **Also in the field notes:** shared lightweight prototyping environments (keep a **baby-cursor**; never ideate in the gigantic slow codebase), visual prompting (the screenshot or sketch *is* the prompt), the MDS finish-in-code workflow, jigs, and start-from-anywhere.
- **Prototype → production seam:** render the idea, don't ship it (Batina) — not shippable ≠ failure; editable stakeholder prototypes and hedged variants (Madrick). Past concept validation, prototype in the real repo — the two-system tax → `working-with-ai` (agentic-coding).

> Perishable layer: Xcode-agents UI specifics (Xcode 26; WWDC26-259) and 2025–26 tool names. Durable layer: the prompt patterns and collaborator-not-designer stance.

## Show — structured, on device, in context

- Show the people the app is *for* ("if your app isn't for engineers, go find some people who are not engineers"), in the real context. A recurring representative outsider works — Stollenmayer's "mom test": voluntary enjoyment, not polite completion.
- **Personalize the sandbox when personalization is the point** (Soleio): a generic screenshot cannot test a personalized experience — use the viewer's own data or realistic personal context.
- During: **Do you know how to do X? · Is it easy? · How can we make this better?** Have theories beforehand; look for evidence for or against. **"Don't argue, defend or dismiss. You're not there to debate — you're there to get information."**
- Review stance for context-rich prototypes (Katie Dill): "Please don't present. Please don't pitch… I just want to see it like a user."
- **Avoid the prototype drop** (Buley): don't release prototypes "into the wild" for async feedback — review synchronously, invite the team to observe ([references/methods.md](references/methods.md)).
- **When words fail on visual nits, draw a caricature**: exaggerate the feature until others see the toned-down real one ([references/methods.md](references/methods.md)).
- **Make shareable, reactable artifacts:** "Make an ad, right? Sell this idea" — under 10 minutes, shot in a hand (Rafa Conde); chase heat with async video (Katarina Batina); Ian Silber's PD-whip channel bans raw musings — "It's got to be a prototype or video."

## Learn — then go around again

After: **What's working? · What's not? · What other ideas does this give us?** Collect open questions — "the goal isn't to answer all of those questions, but to know what you don't know." Triage: some ideas survive; most get recombined; "a few things won't work at all, and it is great when that happens" (the grid-view "concept sucked" — killed by a drawing, not a build).

Budget the loop so insights land: "always leave adequate time after gathering new insights to not only design refinements, but build them and **live with them for a bit** first" — research arriving just before ship buys only a compromise (Stamatiou, "Craft").

**Soleio's rules for the loop** ([references/soleio-field-notes.md](references/soleio-field-notes.md)): speed is a way to collide with reality sooner, not a license to ship junk — prototype the scariest assumption (often the trust moment) first, in front of real users. Test social mechanics in the graph, not in isolation, and measure the downstream behavior the feature might suppress or unlock.

From the prototyping team's 2022 Q&A ([references/methods.md](references/methods.md)): **no hole-in-ones**; **keep multiple directions alive**; **phrase feedback as the experience, not taste**; and don't polish past the question the prototype exists to answer.

## Prototypes as eval fixtures (skill-lab loop)

When a prototype becomes an eval fixture for an agent or skill, keep the fixture hermetic (no external scripts, fonts, images, or stylesheets) and separate retrieval from application: expected skill loaded, references used, before/after artifact, rubric, hidden holdout expectation, and human preference reason. Packaging → `creating-skills`; full notes: [references/agents-field-notes.md](references/agents-field-notes.md).

- **Baseline as control**: keep the current skill as a candidate each round, or every mutation looks like progress because it is merely different.
- **Compare skill effects, not single outputs**: same prompt through base model, broad design skill, and the specific skill; judge movement toward the intended corpus, not "looks better."

## Influencing and pitching with prototypes

Case studies, slide rules, research mechanics: [references/pitch-and-influence.md](references/pitch-and-influence.md).

- **Prototypes win arguments** — "moving away from slide decks, moving away from PRDs" (Ron Goldin). Come with a prototype, not a long doc; "MVP is outlawed" — ship V1s (Duolingo).
- **The Spectrum technique** (Cheechee Lin): align the room on the problem, why it matters, and a spectrum of solutions far apart enough to force a clear conversation. "You just need one that moves the room."
- **Prototype in engineering's stack** when eng says "not possible," against real data and real models.
- **Pitch mechanics** (Dziedzic): attention cap **~20 minutes**; one through line; three-beat arcs — **PSB** (Problem → Solution → Benefit) for logic, **SIA** (Story → Insight → Action) for emotion; **open with a hook, never data**.
- **Sharing explorations** (Femke van Schoonhoven): context → concepts → rationale → **always a recommendation**; show the **MVP next to the future vision**; **name your concepts**. The business case *around* the pitch → `design-org-influence`.
- **"Make the right thing, then make the thing right"** (Twohy): words/low-fi while finding the right thing, then one prototype that feels exactly like the end product, just for one day. **Interpret feedback, don't transcribe it**; ignore "I think I would use it" — look for the people who would find it painful to lose.

## Presenting design work — the ten rules (2018)

"Design is hard but design presentations are way harder" — present badly and the ideas die. Full rules with quotes and texture: [references/methods.md](references/methods.md).

(1) **Know your objectives** — state goals and needed questions up front. (2) **Embrace feedback** — an unworkable offered solution usually wraps a valid *problem*. (3) **Seek advice** — full practice run. (4) **Use your own voice** — opinionated, never arrogant. (5) **Respect your audience** — agenda, recap, prior feedback visibly integrated. (6) **Make it relatable** — first-person narrative; a demo beats a flow diagram. (7) **Engage in dialogue**, not monologue. (8) **Explain why** — agreed one-sentence problem statements; evidence, never taste. (9) **Storytelling** — today vs the better future. (10) **Keep it simple** — one main thing; summarize.

## Checklist

- [ ] Sketched many ideas before prototyping one?
- [ ] Faking everything except the one thing under test; testing on-device, in context?
- [ ] Right tier: fake-it for concept questions, SwiftUI feel-prototype for interaction/data/demo questions?
- [ ] Agent output diffed against the mock — typography, colors, radii, spacing, missing states, gradient scale?
- [ ] Tested with real (ugly, edge-case) data and in real environments — found where it breaks?
- [ ] Feedback sessions use the question sets; no defending or debating?
- [ ] Solo/low-support context: meeting made participatory, not a big reveal or async prototype drop?
- [ ] Open questions logged; ideas triaged (keep / recombine / kill) before the next loop?
- [ ] Presentation: objectives + problem statements up front, story over slides, dialogue over monologue?
- [ ] (Eval fixtures) Compared base vs broad-skill vs specific-skill output under the same prompt, kept the old skill as a baseline candidate, and recorded the human preference reason?

## Relationship to other skills

- **`user-research`** — when the question is discovery/validation rather than artifact feedback: method selection, interviewing craft, screeners; concept-reaction sessions use its neutral-presentation rules with this skill's artifacts.
- **`design-org-influence`** — the business case, stakeholder politics, and objection handling around a pitch; this skill owns the artifact and the session.
- **`client-work` (client-engagements)** — presenting/prototyping inside a client engagement (feedback training, session health); this skill owns the artifact and session craft.
- **`swiftui` (touch-interaction-design)** — "the interactive demo is worth a million static designs" is this skill in action; prototype interactions with these methods, judge them with that skill.
- **`design-principles`** — supplies what to evaluate *against*; this skill supplies the loop that produces evidence.
- **`hardware-product-design`** — the physical tier: non-functional mockups, cabled rigs, test jigs, foam core at true viewing distance.
- **`feature-discoverability`** / **`swiftui` (sound-design)** — both close with "prototype and test"; this is the how.
- **`figma:figma-use`** / **`paper-desktop:design-to-code`** — external plugin skills (not in this repo; use if installed): modern tooling for the same make-fast ethic.
- **`swiftui` (swiftui-layout)** / **`swiftui` (swiftui-animation)** — the *how* of the real-code tier; this skill says *why and when* to prototype in SwiftUI.
- **`design-craft`** — the quality-practice loop; its prototyping moves (breakable toy, live tuning, iterations grid) are folded in above. Route "is it good enough" / how-far-to-push to its depth-spectrum heuristic there.
- **`working-with-ai` (agentic-coding)** — when prototyping graduates to production engineering with agents; owns the **two-system tax** case study.
