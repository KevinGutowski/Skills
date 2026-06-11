---
name: design-prototyping
description: "Prototype and present design work across three tiers — fake-it (Keynote Magic Move), real code (SwiftUI as a design tool), and agents (collaborators, never designers). Use when validating an idea before building, choosing prototyping fidelity, planning feedback sessions, or structuring a review or pitch. Based on six WWDC sessions and two ADA articles. Triggers: prototype, fake it, Magic Move, SwiftUI prototype, tuning panel, present design work."
---

# Design Prototyping & Presenting

**Sources** — this skill aggregates three Apple design-process sessions (one continuous toast-themed curriculum):
- *Apple WWDC 2014, session 223 — "Prototyping: Fake It Till You Make It" (Jeff Bernstein, Linda Dong, Julian Missig, Mark Hauenstein — the Apple Prototyping team). https://developer.apple.com/videos/play/wwdc2014/223/*
- *Apple WWDC 2017, session 818 — "60-Second Prototyping." https://developer.apple.com/videos/play/wwdc2017/818/*
- *Apple WWDC 2018, session 811 — "Presenting Design Work." https://developer.apple.com/videos/play/wwdc2018/811/*
- *Apple WWDC 2023, session 10115 — "Design with SwiftUI" (Will & Philip, Maps design team). https://developer.apple.com/videos/play/wwdc2023/10115/*
- *Apple WWDC 2018, session 801 — "The Qualities of Great Design" (Lauren Strehlow + 13 designer interviews) — techniques only; its values feed `design-principles`. https://developer.apple.com/videos/play/wwdc2018/801/*
- *Apple Developer articles: "PBJ – The Musical" (Philipp Stollenmayer) and "CapWords" (Ace Lee & Clu Soh) — ADA-winner process lessons. https://developer.apple.com/articles/pbj-the-musical/ · https://developer.apple.com/articles/capwords/*
- *Apple WWDC 2026, session 227 — "Create UI prototypes using agents in Xcode" (Sam, prototyper, Apple Design Team). https://developer.apple.com/videos/play/wwdc2026/227/*
- *"Meet the prototypers" (Apple Prototyping team Q&A incl. Julian Missig, 2022). https://developer.apple.com/news/?id=97dgimaa*

The trap is *idea → build → disappointment*. "The more prototypes we can put between your idea and your application, the better the result." The mantra: **"Make fake apps, show people, and learn from their feedback. And do that over and over again until the experience of your app feels great."** Prototype to *test* ideas (build the right thing) and to *get new* ideas. (Your corpus's other talks agree: "the interactive demo is really worth a million static designs.")

## Make — fake it at the cheapest fidelity that answers the question

Ask three questions first: **What needs to be more real?** (the one thing you're testing) · **What can we fake?** (everything else — it's just a picture) · **Where will they use it?** (test on-device, in context).

- **Pictures:** start with *many* hand-drawn sketches — "you should not start prototyping from just a single idea." Then Keynote: screenshot a similar real app, block areas with shapes, color-pick the chrome, reuse three photos everywhere, fake the text, special characters as icons. One screen ≈ 10 minutes; defer all visual-design decisions; zoom to physical size to check tappability.
- **Animation:** Keynote **Magic Move** = slides as keyframes. "Any animation you choose is communicating something about the relationship these screens have." Tricks: identical shapes on both slides to avoid cross-fades; stagger list items so they move at different speeds; duplicate slide 1 as slide 3 for the free reverse. Run it on the phone — taps advance, so it *feels* interactive. "It's so much easier to pare down… when you don't have to throw away code."
- **Interaction:** "make pictures move in response to touches, on the device you're prototyping for." Any tool works ("it's about subverting your tools"). **Don't engineer it — hack it**: "It doesn't have to be good code or reusable code." Big screenshots dragged by touch deltas fake a scrolling list; a sequence of images fakes a keyboard.
- The 60-second bar: a working-feeling timer in Keynote "in less time than it took you to brush your teeth." Speed buys *breadth* — many parallel explorations, and a diverse team "will let you stumble upon things you never would have on your own."
- **Keep exploration loose — structure later.** Field note (Paul Stamatiou, 2022 — https://x.com/Stammy/status/1488310850008104960): "figma auto layout is great when you have mature designs, ready to scale / componentize. but auto layout is the worst thing when you're quickly exploring wildly different concepts and you spend most of your time fighting it." The same defer-the-engineering ethic as "hack it, don't engineer it" — don't pay the systemization tax during divergence. His "Craft" essay extends it to design systems and a divergence prompt (https://paulstamatiou.com/craft/): for new products don't start from the design system — "applying your design systems thinking… all too eagerly may prevent you from noticing the obvious"; to break your own aesthetic tendencies, ask **"how would [another company] design this?"** and mock up their answer — "I may hate it, but it will get me thinking."
- **Prototype at true spatial context** (Jae Park, Config 2025): for anything viewed off-desk, fake it at real distance/angle — his foam-core Echo Show model with a 7-inch tablet, evaluated from 10 feet across a conference table ("it was two Kleenex boxes short"), beat a PRD spec'd at desk distance. Full physical-tier methods (mockups, rigs, jigs) → `hardware-product-design`.
- **Scaffold, don't script, for collaborators** (PBJ article): hand a collaborator structure that frames the problem (10 acts of storyboards — "a scaffold") while leaving the craft decisions theirs. **Prototype the core loop before the app exists** (CapWords): they validated photo→cutout→LLM-naming by manually feeding VisionKit cutouts into ChatGPT — "we didn't even have an app yet."
- **Figma diverges, code decides** (Mariana Castilho, poolside/Vercel): use the drawing tool only for fast divergent exploration and flow communication — "most of the times I don't even finish my designs in Figma… 99% of the times the final output in code looks nothing like my initial sketch." Component motion and interaction feel are *never* prototyped in Figma — always tuned in code where the real parameters live.
- **One concern per artifact — build a "breakable toy"** (Josh Puckett): before diving in, name the single concern you're resolving or question you're answering, then go only as far as needed to answer it — sometimes that's "dangerously close to a wireframe," and that's correct. Solving everything in one artifact (or one AI prompt) produces myopic rabbit holes and compounding rework; refine only once the direction has earned it. With collaborators, fidelity is set by *audience + the decision at hand* — sketches for some rooms, shippable fidelity for others. Intentionality, not roughness, is the point.

## The real-code tier — SwiftUI as a design tool (2023)

> ⚠️ **Supersedes the older "never real code" absolute.** The 2014–18 talks predate SwiftUI as a designer tool; the 2023 stance from non-engineer Maps designers: "common things should be easy and complex things should be possible" — SwiftUI "lowers the floor for simple tasks and raises the ceiling." The ladder now: **fake-it for concept validation; SwiftUI prototypes for feel, real data, and demos.** The hack-it ethic still applies — prototype code needn't be good code.

- **Dynamic tools surface what static ones hide:** loading states, pressed states, Dynamic Type — "easily hidden in static design tools but quickly surfaced when working in a dynamic tool"; "the moment we started making prototypes, they were obvious."
- **Design how it feels, on device:** interactions "give you a sense of how your designs feel, not just how they look" — on-device testing caught a Digital-Crown zoom that was "much too fast," fixed by scrubbing sensitivity values live. Velocity-aware tuning (slow input → threshold + haptic; fast input → tighter spring) is the kind of decision only a feel-prototype settles.
- **Find where designs break:** test with real data and in real environments — hilly San Francisco elevation data hid a Y-axis bug that flat New York routes exposed ("as if you were hiking a mountain"); sunlight glare drove contrast adjustments. "I can get carried away designing for ideal scenarios… it's important to find out where my designs break."
- **Build one-off parameterized mini-tools:** sliders scrubbing line width/opacity/blend-mode over the live UI — "way more variations than we'd be able to do efficiently in a static design tool."
- **Demos lead reviews:** "When people can hold a demo of your work in their hands, designs explain themselves… we were able to spend more of our time evaluating them." "No slide deck in the world can compare with one spectacular demo." And the payoff unique to this tier: "you're not just creating a prototype. You're making an app… you can ship what you design."
- **Static mocks are hunches, not handoffs** (Stammy, "Craft," 2022 — https://paulstamatiou.com/craft/): "Figma is where initial hunches live; a starting point. Not final designs. It's not until I start building and really using it that I get more signal to understand what aspects of the design feel good." And the collaboration corollary: "never treat design as something you just handoff to engineers… Treat it more like a conversation between design and engineering."

## The agents tier — driving the real-code tier with AI (2026)

Coding agents + Xcode previews "supercharge the prototyping of key screens and moments" — and since "agents produce real native code, you will be in a position to carry that code forward." The stance that governs everything: **"Do not delegate critical thinking to these tools… think of coding agents as collaborators in your prototyping process," not as designers** — "the key piece of the puzzle is your judgment." Three prompt patterns:

1. **Go wide, remix, repeat (exploration):** vague prompts anchor you "on a flawed starting point" — be specific about features, give stylistic/mood cues ("the feeling of paper and beautiful typography"), and "most importantly, ask for multiple options" — e.g. 10 variations, **each as its own named `#Preview`**. Then remix: name the promising variants and the elements to recombine. Breadth the hand-coded tier never had. Make the options *structurally different concepts, not variants* (five numpad layouts are depth, not range — Josh Puckett); to push past the obvious: remove or add a constraint ("what if it weren't a screen? happened automatically?"), blend another domain ("as a game? if Muji made it?"), invert the problem (eliminate what users don't want instead of find what they do), or set an idea quota. Your first instinct silently commits you to an assumption — range explorations exist to test the assumption, not just the rendering.
2. **Agent as fake user (lived-in content):** have the agent "play the role of somebody using your app" — but *you* "stop and think through edge cases" (empty states, unbounded growth: member counts, long titles → truncate/wrap decisions); keep sample content plausible for your audience and **in its own reusable file**. Realistic content surfaces missing blank-slate UI, redundancies, layout breaks. "Nothing beats real-world use… but this is an excellent way to get a head start."
3. **Agent-built tuning panels (key moments):** the 2023 parameterized-mini-tool, now generated on demand — "ask for the animation to be broken into phases. This also gives you and the agent a shared vocabulary"; lay the panel **side by side** with the UI at a wider preview size; works for animations, app states, colors, type, offsets. "Anytime you're trying to manage multiple configurations… make a tuning panel, shorten the feedback loop, and get to what feels optimal." Two extensions of the move (Josh Puckett's "live tuning"): expose *any* parameter you're dialing in (duration, easing, spacing, shadow, blur, scale) as real-time controls so you feel differences instead of guess-edit-refreshing; and for generative/visual work, ask the agent for an **iterations grid** — "give me a toggle that renders N copies with randomized parameters" — to surface combinations you'd never reach tuning one slider at a time.

Two field amplifiers (Evil Martians' "weeks → days" design-engineering case, 2025): **prototype with the full dataset, not sample points** ("working with the full dataset helped us make better design decisions early on… I even tested a few bold chart types I'd never bother coding manually"), and **prototype in the target production stack** so handoff is copy-paste — "the frontend engineer… started by copying the code from my prototype." The expert-led qualifier holds: "my technical knowledge, multiplied by AI" — AI removes friction, not judgment.

A field caution for the mock-to-code direction (Paul Stamatiou testing Claude Design against his own app mock, Apr 2026 — https://x.com/Stammy/status/2045186427491930523): the agent's first pass scored "65/100. promising though" — text weights and sizes "all over the place and inconsistent," colors and rounded corners not respected, spacing inconsistencies, parts of the design missing, a gradient "way too large." When you hand an agent a *finished design* rather than a prompt, **diff the output against the mock element-by-element** — type weights/sizes, exact colors, corner radii, spacing, completeness, gradient scale — before iterating on anything else. The collaborator-not-designer stance covers visual QA too.

**The endpoint of this tier — Cursor's design org** (Ryo Lu, Head of Design; jdahl Substack 2025, Creator Economy 2025, a16z Show notes — https://jdahl.substack.com/p/cursors-ryo-lu-on-soulful-design · https://creatoreconomy.so/p/design-to-code-with-cursor-head-of-design-ryo-lu · https://www.podchemy.com/notes/ryo-lu-cursor-ai-turns-designers-to-developers-46831311791): designers ship code instead of mocks, and the prototype *is* the product. The stance restated from the material side — **"Mocks and renders show possibilities. Prototypes show reality"**; "you learn by making, not planning"; Figma "felt like painting," designing in code is "sculpting clay or finding David in the marble." Their version of collaborator-not-designer: agents get you "60–70% complete on the first attempt," and **"the difference between slop and soulful products is iteration and taste. Most people stop at the first output, rather than using it to begin"** — taste is "a process of selection," the human specifying "what is good, what is right, how I want to do it." Organizationally it collapses handoff entirely: roles between designers/PMs/engineers are deliberately "muddy… we just do what it takes based on each person's unique strengths and use the AI agent to tie everything together" — the team-process side of this school (Linear's reference-not-deliverable version) lives in `shape-up`'s Linear-school extension.

> Perishable layer: the Xcode-agents UI specifics (Xcode 26; mechanics in WWDC26-259 "Xcode, agents, and you"). Durable layer: the prompt patterns and collaborator-not-designer stance — they transfer to any coding agent.

## Show — structured, on device, in context

- Show the people the app is *for* ("if your app isn't for engineers, go find some people who are not engineers"), in the real context (timing a pH test, solving a cube). A recurring representative outsider works too — Stollenmayer's "mom test": "If she wants to play it, that's the best feedback I can get" (voluntary enjoyment, not polite completion, is the bar).
- During: **Do you know how to do X? · Is it easy? · How can we make this better?** Have theories beforehand; look for evidence for or against them. **"Don't argue, defend or dismiss. You're not there to debate — you're there to get information."**
- **When words fail on visual nits, draw a caricature** (type-designer technique, 2018-801): redraw the shape "with exaggerated features… through that drawing, usually the other people can start seeing that much more toned down but existing feature." Finding "the joint gaze… is the key of a successful collaboration in design." And budget patience: "you can't hire more people to get there faster. You just have to sit with it."

## Learn — then go around again

After: **What's working? · What's not? · What other ideas does this give us?** Collect open questions — "the goal isn't to answer all of those questions, but to know what you don't know, so you can strategically choose what to pursue next." Triage: some ideas survive intact; most are partially right and get recombined; "a few things won't work at all, and it is great when that happens" (the grid view "concept sucked" — discovered by a drawing, not a build).

Budget the loop so insights can actually land: "always leave adequate time after gathering new insights to not only design refinements, but build them and **live with them for a bit** first. It's too easy to compromise on quality in the face of existing timelines" — research that arrives just before the ship date buys you nothing but a less-than-ideal compromise (Stammy, "Craft," 2022 — https://paulstamatiou.com/craft/).

From the team's 2022 Q&A:
- **No hole-in-ones:** "If we're not getting feedback on something, we're just not showing it to the right people."
- **Keep multiple directions alive** — several prototypes, or one with sliders/preferences; when feedback conflicts with the current direction, "we keep both around to let people compare."
- **Phrase feedback as the experience, not taste:** not "I don't like this color" but "I think blue instead of red would better communicate what the experience is about."
- **Refocus on what wins hearts:** with dozens of ideas competing, advance the two or three people loved; "no one true winner" is fine — the rest recycle into future work. And the recurring trap: "we sometimes get caught up in trying for a perfectly polished prototype" — always remember the question the prototype exists to answer.

## Influencing via prototypes (Config 2024–25: Cheechee Lin/Instagram; Duolingo; Figma UI3; Severance's Jeremy Hindle)

- **The Spectrum technique** (Lin): align the room on (1) the problem, (2) why it matters, (3) a *spectrum* of solutions — "either end doesn't need to be what you ship, but it does need to be far apart enough to force a clear conversation." "You don't need a perfect prototype. You just need one that moves the room."
- **Prototype in engineering's stack to save craft details**: when eng says "not possible," build it in their language — the Stories ring animation was prototyped in iOS code days before code cut; "engineering realized, wait, we can port this code over." Prototype against **real data and real models** (a feed-ranking simulator with knobs avoided the sunk-cost trap; real generative models surface loading time and error states).
- **The vision-prototype recipe**: know the audience and what they care about + start the conversation at the right time + "details just right enough so the first step feels inspiring yet believable" — including putting the decision-maker's own face in the demo. Opening maxim: "The best way to complain is to make things."
- **Show, don't tell as policy** (Duolingo handbook): "we don't want people to come with a long doc. We want them to come with a prototype." Their bar: **"MVP is outlawed" — ship V1s** ("not sacrificing quality, but cutting the right corners"); feedback loops run as screen-recordings over Slack.
- **Try the hard thing first** (Figma UI3): "the most interesting aspects of the redesign were hidden behind the most scary and daunting challenges" — start from a point of view and work backwards.
- **The lookbook pitch + console-first world-building** (Hindle, Severance): sell a direction with found reference images annotated with rules ("It should be winter always. It should always be emotionally real"); then nail the one core artifact first — "once people believe this set… you can do whatever you want after that."
- **Match the prototype medium to the experience**: a chatbot was prototyped in a *spreadsheet* — "don't mistake making a deliverable with making a difference" (Michael Metts). Conversation UIs don't need Figma.
- **Validate the concept as its own ad** (Basheer Tome, Fellow): front-load every decision onto one infinite canvas, group into a clear story per feature *with its cost trade-offs*, distill the elevator answer ("why buy this thing"), then mock a **fake product-detail page or render** and ask: "if you saw this as an ad, would it be interesting?" If the story doesn't sell as a fake PDP, the product isn't ready to build — the story is the cheapest prototype.

## Presenting design work — the ten rules (2018)

"Design is hard but design presentations are way harder" — present badly and the ideas die.
1. **Know your objectives** — imagine success, work backwards; state goals and the questions you need answered up front.
2. **Embrace feedback** — "there is no failure, only feedback"; when an offered solution is unworkable, the underlying *problem* is usually valid — clarify it; never pretend to understand unclear feedback.
3. **Seek advice** — sense-check the deck; full practice run; "do not deliver it blind."
4. **Use your own voice** — genuine, opinionated ("you are the expert here"), never arrogant.
5. **Respect your audience** — agenda, recap of last time, their prior feedback visibly integrated, no working files ("lazy and disrespectful of people's time").
6. **Make it relatable** — first-person narrative, not users as "a distant third party"; a prototype demo beats a flow diagram.
7. **Engage in dialogue** — design for the aha moment; "do not deliver a monologue."
8. **Explain why** — "define each problem in a single sentence" and get agreement on it; evidence, never "I chose this color because I like it."
9. **Storytelling** — "people won't remember your slides. They'll remember how your story made them feel." Contrast today's reality with the better future (Duarte).
10. **Keep it simple** — "the main thing is to keep the main thing the main thing"; summarize.

## Pitch mechanics (Wojtek Dziedzic, Config 2025) + critique hardening

"Ideas do not matter… it's how we sell it." Attention cap: **~20 minutes**.
- **Through line**: one unifying theme; cut anything that doesn't connect (he cut ~80% of his material).
- **Micro-structures**: build three-beat arcs — **PSB** (Problem → Solution → Benefit) for logic, **SIA** (Story → Insight → Action) for emotion; invaluable when speaking spontaneously.
- **Open with a hook, never data**: "a novel and subversive framing of your big idea" ("What if every new user became a regular user immediately after signup?") — "when presented with complex details, the brain literally turns off." Pair every number with the user feedback behind it.
- **Slide rules**: ban title-plus-bullets; "50 slides cost as much as one slide" — one point/word/visual per slide; motion transition = same point continuing, hard cut = new point, theme flip = new chapter; occasional blank slide returns focus to the speaker.
- **Critique-ruiner exercise** (Jessica Hische): assign reviewers fixed adversarial hats ("you think everything's sexist; you think everything looks like a hot dog") to bulletproof work before it meets real stakeholders.

## Fidelity laddering & feedback signals (Kevin Twohy + Browser Company — Linear quality series)

- **"Make the right thing, then make the thing right"** — match the artifact to the phase: words/low-fi sketches while finding the right thing; then **skip all production steps and build one prototype that feels exactly like the end product, just for one day** (NYT Audio commissioned real audio for shows that didn't exist yet, a year pre-launch).
- **Match the medium to the audience's native thinking**: editors think in stories → walk through with linearity; analytics people think in funnels; a writer-CEO keys on language and emotion. Crazy-8s for non-sketchers = write a *headline* instead. "You can't get a great idea for an audio show from sitting around a Figma" — pick the medium that elicits the kind of idea you need.
- **Interpret feedback, don't transcribe it**: a visual comment may really be emotional or sequencing feedback — hear what's *expressed*. And tell domain experts when their input changed the design — they "feel unqualified" and clam up unless shown their reactions count.
- **Signal filters**: be immune to "I love it but this one thing is a dealbreaker" and to "I think I would use it" — look for "a core set of people who truly love it… it would be very painful for them if it was taken away." Beware late negative feedback from non-customers steering you off when the treasure is nearly uncovered.
- **Research mechanics** (Adena Nadler): a weekly "early birds" pre-release group; recruit *skeptics* by paying the doubtful friends of loyal users (screened to exclude early adopters) into an 8–10-week advisory board. Two humility cases: interviewees feared auto-archive — shipped anyway, beloved ("you can only get so far before you have a product"); and "a simpler learning experience is not the same as the better UX."

## Checklist

- [ ] Sketched many ideas before prototyping one?
- [ ] Faking everything except the one thing under test; testing on-device, in context?
- [ ] Right tier: fake-it for concept questions, SwiftUI feel-prototype for interaction/data/demo questions?
- [ ] Agent output diffed against the mock — typography, colors, radii, spacing, missing states, gradient scale?
- [ ] Tested with real (ugly, edge-case) data and in real environments — found where it breaks?
- [ ] Feedback sessions use the question sets; no defending or debating?
- [ ] Open questions logged; ideas triaged (keep / recombine / kill) before the next loop?
- [ ] Presentation: objectives + problem statements up front, story over slides, dialogue over monologue?

See `references/methods.md` for the full Toast Modern walkthrough, the Keynote techniques, and quotables.

## Relationship to other skills

- **`touch-interaction-design`** — "the interactive demo is worth a million static designs" (Fluid Interfaces) is this skill in action; prototype interactions with these methods, judge them with that skill.
- **`design-principles`** — supplies what to evaluate *against*; this skill supplies the loop that produces evidence.
- **`hardware-product-design`** — the physical tier: non-functional mockups, ugly cabled rigs, test jigs, foam core at true viewing distance.
- **`feature-discoverability`** / **`sound-design`** — both close with "prototype and test"; this is the how.
- **`figma:figma-use`** / **`paper-desktop:design-to-code`** — modern tooling for the same make-fast ethic; the method here is tool-agnostic ("subvert your tools").
- **`swiftui-layout`** / **`swiftui-animation`** — the building blocks for the real-code tier; this skill says *why and when* to prototype in SwiftUI, those say *how*.
- **`interface-craft-principles`** *(Kevin-local, not in the shared repo)* — Josh Puckett's full quality-practice loop; its prototyping-relevant moves (one-concern-per-artifact/breakable toy, live tuning, iterations grid) are folded into the sections above, so nothing here depends on it. Route "how far do I push this / is it good enough" to `design-principles`' depth-spectrum heuristic.
- **`agentic-coding`** — when prototyping graduates to production engineering with agents (designer shipping code in the production repo, encoding decisions as rules). Cautionary datum from its case study: prototyping in a tool outside the production stack creates a **two-system tax** — every iteration gets re-ported — so once past concept validation, prototype in the real repo.
