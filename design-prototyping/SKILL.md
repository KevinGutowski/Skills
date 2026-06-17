---
name: design-prototyping
description: "Prototype and present design work across three tiers — fake-it (Keynote Magic Move), real code (SwiftUI as a design tool), and agents (collaborators, never designers). Use when validating an idea before building, planning feedback sessions, or structuring a review or pitch. Triggers: prototype, fake it, Magic Move, SwiftUI prototype, tuning panel, present design work."
---

# Design Prototyping & Presenting

**Sources:** [references/sources.md](references/sources.md) — 6 WWDC sessions + 2 ADA articles + Config, Dive Club, and field sources.
The trap is *idea → build → disappointment*. "The more prototypes we can put between your idea and your application, the better the result." The mantra: **"Make fake apps, show people, and learn from their feedback. And do that over and over again until the experience of your app feels great."** Prototype to *test* ideas (build the right thing) and to *get new* ideas.

## Choose the tier first

Three questions before making anything: **What needs to be more real?** (the one thing you're testing) · **What can we fake?** (everything else) · **Where will they use it?** (test on-device, in context).

The ladder: **fake-it for concept validation; SwiftUI prototypes for feel, real data, and demos; agents to drive the code tier wide and fast.** ⚠️ 2023 supersedes the older "never real code" absolute — SwiftUI "lowers the floor for simple tasks and raises the ceiling" (non-engineer Maps designers); the hack-it ethic survives: prototype code needn't be good code.

Routing rules:
- **The quadrant** (Ridd): x-axis = size of the work (quick P3 fix ↔ zero-to-one ambiguous idea); y-axis = how much of the material already exists in production. Small+existing → in-codebase agent; big+blank → canvas/AI prototyping tools (names rotate; the axes are durable). The trap: "trying to rebuild production inside of an AI prototyping tool that doesn't sit on top of your production codebase."
- **First-diamond rule** (Ridd + Steven Haney): "if I am operating in that first diamond there is no way that I'm going to start in [Claude] code" — divergence stays in cheap media; agents enter when converging. "Designs being disposable is like a good thing."
- **One concern per artifact — a "breakable toy"** (Josh Puckett): name the single question the artifact answers; go only as far as needed — sometimes "dangerously close to a wireframe" is correct. One artifact (or prompt) solving everything produces myopic rabbit holes. Fidelity is set by *audience + the decision at hand*.
- **Concept car → crash test → flag** (Linear): a bold concept makes the future easier to say yes to, but it earns implementation only after focused crash tests. Test the environment (native shells, browser, platform controls), appearance (light/dark/custom themes, contrast), and hierarchy (every major view type and state). Then ship behind a feature flag with old/new toggles so dogfood feedback compares reality, not memory.
- **Medium-matching** (Rafa Conde; Cursor school): pick by data needs — "I need real data… it is just faster to create a new branch of the main app." Walks + bullet lists for conceptual problems; Figma for exact pixels; code when states and AI behavior matter — AI interactions "you just can't fake" in mocks.
- **Static mocks are hunches, not handoffs** (Stamatiou "Craft" 2022; Castilho): "It's not until I start building and really using it that I get more signal"; motion and interaction feel are *never* prototyped in Figma — always tuned in code. Design is "a conversation between design and engineering."
- **Animation docs: pair verbal + visual artifacts** (Nabors, *Animation at Work*, ch. 4 → [references/methods.md](references/methods.md)).

## Tier 1 — fake it at the cheapest fidelity that answers the question

- **Pictures:** start with *many* hand-drawn sketches — "you should not start prototyping from just a single idea." Then Keynote: screenshot a similar app, block areas with shapes, fake the text, photos, and icons. One screen ≈ 10 minutes; defer visual-design decisions; zoom to physical size to check tappability.
- **Animation:** Keynote **Magic Move** = slides as keyframes. "Any animation you choose is communicating something about the relationship these screens have." Identical shapes avoid cross-fades; stagger list items; duplicate slide 1 as slide 3 for the free reverse. Run it on the phone — taps advance, so it *feels* interactive.
- **Interaction:** "make pictures move in response to touches, on the device you're prototyping for." Any tool works ("it's about subverting your tools"). **Don't engineer it — hack it.** Big screenshots dragged by touch deltas fake a scrolling list; an image sequence fakes a keyboard.
- The 60-second bar: a working-feeling Keynote timer "in less time than it took you to brush your teeth." Speed buys *breadth* — many parallel explorations across a diverse team.
- **Keep exploration loose — structure later** (Stamatiou): auto layout / design systems are "the worst thing when you're quickly exploring wildly different concepts"; to break your own tendencies ask **"how would [another company] design this?"**
- **Field notes** ([references/methods.md](references/methods.md)): prototype at true spatial context (Jae Park; physical tier → `hardware-product-design`); scaffold, don't script, for collaborators (PBJ); prototype the core loop before the app exists (CapWords); at publishing scale (Vox/Polygon): real content gut-checks everything, embed the front-end dev in exploration, plan polish as an end stage, the decoy mood board, verify production dependencies early.
- **Team-of-one adaptation** (Buley): when you need buy-in as much as answers, "turn any meeting into a design session" — sketch live, invite non-designers to sketch ([references/methods.md](references/methods.md)).

## Tier 2 — real code: SwiftUI as a design tool (2023)

- **Dynamic tools surface what static ones hide:** loading states, pressed states, Dynamic Type — "the moment we started making prototypes, they were obvious."
- **Design how it feels, on device:** interactions "give you a sense of how your designs feel, not just how they look" — a too-fast Digital-Crown zoom was fixed by scrubbing sensitivity values live; velocity-aware tuning is the kind of decision only a feel-prototype settles.
- **Find where designs break:** real data and real environments — flat New York routes exposed a Y-axis bug that hilly San Francisco data hid; sunlight drove contrast. "It's important to find out where my designs break."
- **Build one-off parameterized mini-tools:** sliders scrubbing line width/opacity/blend-mode over the live UI — "way more variations than we'd be able to do efficiently in a static design tool."
- **Demos lead reviews:** "When people can hold a demo of your work in their hands, designs explain themselves." And the payoff unique to this tier: "you're not just creating a prototype… you can ship what you design."

## Tier 3 — agents driving the code tier (2026)

Coding agents + previews "supercharge the prototyping of key screens and moments" — and the real native code can carry forward. The governing stance: **"Do not delegate critical thinking to these tools… think of coding agents as collaborators in your prototyping process," not as designers** — "the key piece of the puzzle is your judgment." Four patterns:

1. **Go wide, remix, repeat (exploration):** be specific about features and mood, and "most importantly, ask for multiple options" — e.g. 10 variations, each as its own named `#Preview`; then remix the promising ones. Make options *structurally different concepts, not variants* (Josh Puckett); current tooling is depth-biased, so budget divergence deliberately (Ian Silber). Range moves: [references/agents-field-notes.md](references/agents-field-notes.md).
2. **Agent as fake user (lived-in content):** have the agent "play the role of somebody using your app" — but *you* think through edge cases (empty states, unbounded growth); keep sample content plausible and in its own reusable file. Realistic content surfaces missing blank-slate UI and layout breaks.
3. **Agent-built tuning panels (key moments):** the parameterized mini-tool, generated on demand — "ask for the animation to be broken into phases… a shared vocabulary"; panel side by side with the UI. "Make a tuning panel, shorten the feedback loop, and get to what feels optimal." Converging field versions (Kyle Santos's effect studios, Kris Puckett's copy-values-back round-trip, MDS's tool-making reflex, Josh Puckett's live tuning + **iterations grid**): [references/agents-field-notes.md](references/agents-field-notes.md).
4. **Independent judge in a fresh context (evaluation):** don't let the generating agent grade its own output — it's anchored on its own choices. Spawn a *separate* judge with its own context window, loaded only with explicit criteria ("create an independent judge with its own context window to evaluate your output" — Carlos Montoya, Dropbox, X 2026; used "to raise the pixel craft of frontier models"). Loadout from this corpus: `design-principles` facets + critique mechanics, `design-craft` checklists, `design-craft` depth spectrum — score against those, not vibes. Same model is fine, same context is not. Full notes incl. the MDS/Shift Nudge MCP: [references/agents-field-notes.md](references/agents-field-notes.md).
5. **Skill-lab loop for design rules** (Jaytel Taste repo, 2026): when evaluating a generated design skill, keep the current skill as a baseline candidate, generate bounded mutation hypotheses, render each candidate against the same prompt in self-contained HTML, collect a human preference vote plus reason, then update the skill from the preference history. The baseline-as-control matters: otherwise every round looks like progress because it is merely different.

Amplifiers and cautions (full notes: [references/agents-field-notes.md](references/agents-field-notes.md)):
- **Prototype with the full dataset and in the target production stack** (Evil Martians) so handoff is copy-paste — "my technical knowledge, multiplied by AI"; AI removes friction, not judgment.
- **Mock-to-code: diff against the mock element-by-element** (Stamatiou vs Claude Design 2026, first pass "65/100") — the checklist below — before iterating on anything else.
- **The Cursor school endpoint** (Ryo Lu; Jin Park/Notion; Catherine/Ramp): designers ship code instead of mocks — "Mocks and renders show possibilities. Prototypes show reality." And **"the difference between slop and soulful products is iteration and taste. Most people stop at the first output, rather than using it to begin."**
- **Shared lightweight prototyping environments:** keep a **baby-cursor** — never ideate in the gigantic slow codebase (Ryo Lu); Notion's 80/20 shared playground, fidelity per-question (Brian Lovin); Ramp's three-tier fidelity ladder (vibes stack → real-component sandbox → real repo); Stripe's Protodash prototypes inside the surrounding product — "no product is like ever felt by your user in isolation" (Katie Dill).
- **Visual prompting:** the screenshot or sketch *is* the prompt (Steve Ruiz, Make Real — iterate by drawing arrows on the output; paste a reference image); storyboard-as-prompt, but don't dial fidelity in Figma — "Figma's a lie. It's not your actual code base" (Josh Puckett).
- **Compare skill effects, not single outputs** (Jaytel Taste demo): run the same prompt through base model, broad design skill, and the specific taste skill before trusting a new design skill. The dashboard/chat comparisons exposed a useful difference: a broad frontend skill can make output more stylish while the reference-derived skill makes it more *specifically constrained*. Judge whether the skill moves the output toward the intended corpus, not merely whether the screen looks better.
- **Keep eval artifacts hermetic** (Jaytel Skill Lab): generated candidates should render in an iframe without external scripts, fonts, images, or stylesheets when the test is about the skill, not network luck or asset taste. This makes side-by-side preference less noisy and easier to replay.
- **MDS workflow:** 85%-in-Figma, finish in code — hover states designed *only* in code ("it's all about how it feels"); components only when they pay — too many too early constrains creativity.
- **Jigs** (Geoffrey Litt): disposable one-project tools an agent makes economical. **Start from anywhere** (Luis Ouriach): "the canvas is very important for ideation… but the browser is where we commit" — "not faster, but further."
- **Prototype → production seam:** render the idea, don't ship it (Katarina Batina — "Just render the whole idea and then use that as the thing you talk to engineering with"; not shippable ≠ failure). Editable stakeholder prototypes, hedged variants, the playground-to-production one-shot (Andy Madrick). The two-system tax (→ `working-with-ai` (agentic-coding)): past concept validation, prototype in the real repo.

> Perishable layer: Xcode-agents UI specifics (Xcode 26; WWDC26-259) and 2025–26 tool names. Durable layer: the prompt patterns and collaborator-not-designer stance.

## Show — structured, on device, in context

- Show the people the app is *for* ("if your app isn't for engineers, go find some people who are not engineers"), in the real context. A recurring representative outsider works — Stollenmayer's "mom test": voluntary enjoyment, not polite completion.
- **Personalize the sandbox when personalization is the point** (Soleio Cuervo, First Round, 2014): a generic screenshot cannot test a personalized experience. Pull in the stakeholder's/user's own graph data or realistic personal context so they feel what the product would actually know, infer, and change. The feedback quality jumps when the prototype is experienced through a personal lens.
- During: **Do you know how to do X? · Is it easy? · How can we make this better?** Have theories beforehand; look for evidence for or against. **"Don't argue, defend or dismiss. You're not there to debate — you're there to get information."**
- Review stance for context-rich prototypes (Katie Dill): "Please don't present. Please don't pitch… I just want to see it like a user."
- **Avoid the prototype drop** (Buley): don't release prototypes "into the wild" for async feedback — review synchronously, invite the team to observe ([references/methods.md](references/methods.md)).
- **When words fail on visual nits, draw a caricature** (type-designer technique, 2018-801): exaggerate the feature until others see the toned-down real one — find "the joint gaze" ([references/methods.md](references/methods.md)).
- **Make shareable, reactable artifacts:** "Make an ad, right? Sell this idea" — under 10 minutes, shot in a hand (Rafa Conde); chase heat with async video (Katarina Batina); Ian Silber's PD-whip channel bans raw musings — "It's got to be a prototype or video."

## Learn — then go around again

After: **What's working? · What's not? · What other ideas does this give us?** Collect open questions — "the goal isn't to answer all of those questions, but to know what you don't know." Triage: some ideas survive; most get recombined; "a few things won't work at all, and it is great when that happens" (the grid-view "concept sucked" — killed by a drawing, not a build).

Budget the loop so insights land: "always leave adequate time after gathering new insights to not only design refinements, but build them and **live with them for a bit** first" — research arriving just before ship buys only a compromise (Stamatiou, "Craft").

**Soleio's reality-collision rule** (Julie Zhuo interview, 2026; Design Buddies recap, 2025): the Like button was one of many shipped experiments, while Dropbox Carousel paid for hiding from users too long — full camera-roll access collided with storage-quota anxiety late. Treat speed as a way to collide with reality sooner, not a license to ship junk. If the scary assumption is "will people trust this?", prototype the trust moment first and get it in front of real users before polishing the rest.

**Test social mechanics in the graph, not in isolation** (Soleio, Design MBA + PBS): the Like button sat in "product purgatory" on the fear it "would cannibalize commenting" — "our intuition was just dead wrong." The unblocking experiment: "we chose two pairs of networks where there was high friend density," ship vs. control countries — likes *increased* commenting ("a social lubricant"). Pick test cells where network effects can appear; measure the downstream behavior the feature might suppress or unlock. More: [references/soleio-field-notes.md](references/soleio-field-notes.md).

From the prototyping team's 2022 Q&A ([references/methods.md](references/methods.md)): **no hole-in-ones** ("If we're not getting feedback on something, we're just not showing it to the right people"); **keep multiple directions alive**; **phrase feedback as the experience, not taste**; and the trap — "we sometimes get caught up in trying for a perfectly polished prototype" — always remember the question the prototype exists to answer.

## Influencing via prototypes (Config 2024–25; full case studies: [references/pitch-and-influence.md](references/pitch-and-influence.md))

**Prototypes win arguments** — "moving away from slide decks, moving away from PRDs" (Ron Goldin, whose same-day counter-demo overturned a VP "can't be done"; Duolingo as policy: come with a prototype, "MVP is outlawed" — ship V1s). The strongest moves: **the Spectrum technique** (Cheechee Lin) — align the room on the problem, why it matters, and a spectrum of solutions far apart enough to force a clear conversation ("You just need one that moves the room"); and **prototype in engineering's stack** when eng says "not possible," against real data and real models. Reference adds: vision-prototype recipe, lookbook pitch, spreadsheet chatbot, concept-as-its-own-ad.

## Presenting design work — the ten rules (2018)

"Design is hard but design presentations are way harder" — present badly and the ideas die. Texture: [references/methods.md](references/methods.md).
1. **Know your objectives** — imagine success, work backwards; state goals and needed questions up front.
2. **Embrace feedback** — "there is no failure, only feedback"; an unworkable offered solution usually wraps a valid *problem* — clarify it; never pretend to understand unclear feedback.
3. **Seek advice** — sense-check the deck; full practice run; "do not deliver it blind."
4. **Use your own voice** — genuine, opinionated ("you are the expert here"), never arrogant.
5. **Respect your audience** — agenda, recap, their prior feedback visibly integrated, no working files.
6. **Make it relatable** — first-person narrative, not users as "a distant third party"; a prototype demo beats a flow diagram.
7. **Engage in dialogue** — design for the aha moment; "do not deliver a monologue."
8. **Explain why** — "define each problem in a single sentence" and get agreement; evidence, never "because I like it."
9. **Storytelling** — "people won't remember your slides. They'll remember how your story made them feel." Contrast today with the better future (Duarte).
10. **Keep it simple** — "keep the main thing the main thing"; summarize.

## Pitch mechanics (Wojtek Dziedzic, Config 2025)

"Ideas do not matter… it's how we sell it." Attention cap **~20 minutes**; one through line; three-beat arcs — **PSB** (Problem → Solution → Benefit) for logic, **SIA** (Story → Insight → Action) for emotion; **open with a hook, never data**. Slide rules and Hische's critique-ruiner exercise: [references/pitch-and-influence.md](references/pitch-and-influence.md).

## Fidelity laddering & feedback signals (Kevin Twohy + Browser Co.)

**"Make the right thing, then make the thing right"** — words/low-fi while finding the right thing, then one prototype that feels exactly like the end product, just for one day. **Interpret feedback, don't transcribe it**; ignore "I think I would use it" — look for "a core set of people who truly love it… it would be very painful for them if it was taken away." Medium-to-audience matching, research mechanics, humility cases: [references/pitch-and-influence.md](references/pitch-and-influence.md).

## Sharing explorations (Femke van Schoonhoven, Uber Eats)

Four-part structure: context → concepts → rationale → **always a recommendation**. Match fidelity to audience; show the **MVP next to the future vision** (pre-answers "why not X"); **name your concepts**; lay flows next to P0/P1/P2 requirements for async readers; keep a personal sandbox page. The business case *around* the pitch → `design-org-influence`.

## Checklist

- [ ] Sketched many ideas before prototyping one?
- [ ] Faking everything except the one thing under test; testing on-device, in context?
- [ ] Right tier: fake-it for concept questions, SwiftUI feel-prototype for interaction/data/demo questions?
- [ ] Agent output diffed against the mock — typography, colors, radii, spacing, missing states, gradient scale?
- [ ] If testing a new visual/design skill, compared base vs broad-skill vs specific-skill output under the same prompt?
- [ ] If iterating a skill, kept the old skill as a baseline candidate and recorded the human preference reason?
- [ ] Tested with real (ugly, edge-case) data and in real environments — found where it breaks?
- [ ] Feedback sessions use the question sets; no defending or debating?
- [ ] Solo/low-support context: meeting made participatory, not a big reveal or async prototype drop?
- [ ] Open questions logged; ideas triaged (keep / recombine / kill) before the next loop?
- [ ] Presentation: objectives + problem statements up front, story over slides, dialogue over monologue?

References: [methods.md](references/methods.md) — Toast Modern walkthrough, Keynote techniques, quotables; [agents-field-notes.md](references/agents-field-notes.md) — all agents-tier field quotes; [pitch-and-influence.md](references/pitch-and-influence.md) — pitch case studies.

## Relationship to other skills

- **`user-research`** — when the question is discovery/validation rather than artifact feedback: method selection, interviewing craft, screeners; concept-reaction sessions use its neutral-presentation rules with this skill's artifacts.
- **`design-org-influence`** — the business case, stakeholder politics, and objection handling around a pitch; this skill owns the artifact and the session.
- **`client-work` (client-engagements)** — presenting/prototyping inside a client engagement (feedback training, session health); this skill owns the artifact and session craft.
- **`swiftui` (touch-interaction-design)** — "the interactive demo is worth a million static designs" is this skill in action; prototype interactions with these methods, judge them with that skill.
- **`design-principles`** — supplies what to evaluate *against*; this skill supplies the loop that produces evidence.
- **`hardware-product-design`** — the physical tier: non-functional mockups, cabled rigs, test jigs, foam core at true viewing distance.
- **`feature-discoverability`** / **`swiftui` (sound-design)** — both close with "prototype and test"; this is the how.
- **`figma:figma-use`** / **`paper-desktop:design-to-code`** — modern tooling for the same make-fast, tool-agnostic ethic ("subvert your tools").
- **`swiftui` (swiftui-layout)** / **`swiftui` (swiftui-animation)** — the building blocks for the real-code tier; this skill says *why and when* to prototype in SwiftUI, those say *how*.
- **`design-craft`** — the quality-practice loop; its prototyping moves (breakable toy, live tuning, iterations grid) are folded in above. Route "is it good enough" to `design-principles`' depth-spectrum heuristic.
- **`working-with-ai` (agentic-coding)** — when prototyping graduates to production engineering with agents (designer shipping production code, encoding decisions as rules); owns the **two-system tax** case study.
