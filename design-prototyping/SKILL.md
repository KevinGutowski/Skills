---
name: design-prototyping
description: "Prototype and present design work across three tiers — fake-it (pictures, Keynote Magic Move, hacked prototypes), real code (SwiftUI as a design tool: on-device feel, real data, parameterized mini-tools, demo-led reviews), and agents (go-wide/remix prompting, agent-as-fake-user content, agent-built tuning panels; agents as collaborators, never designers) — plus the question sets for showing people and the ten rules for presenting design work. Use when validating a design idea before building, choosing a prototyping fidelity, faking a flow in Keynote, prototyping in SwiftUI or with coding agents, planning feedback sessions, structuring a design review or pitch, or handling design feedback. Based on Apple WWDC sessions 223, 818, 811 & 801, 10115, 227 (2014–2026), and two ADA case-study articles. Triggers: prototype, prototyping, fake it, Keynote prototype, Magic Move, SwiftUI prototype, design with code, AI prototyping, tuning panel, test an idea, show people, design review, present design work, design pitch."
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
- **Scaffold, don't script, for collaborators** (PBJ article): hand a collaborator structure that frames the problem (10 acts of storyboards — "a scaffold") while leaving the craft decisions theirs. **Prototype the core loop before the app exists** (CapWords): they validated photo→cutout→LLM-naming by manually feeding VisionKit cutouts into ChatGPT — "we didn't even have an app yet."

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

1. **Go wide, remix, repeat (exploration):** vague prompts anchor you "on a flawed starting point" — be specific about features, give stylistic/mood cues ("the feeling of paper and beautiful typography"), and "most importantly, ask for multiple options" — e.g. 10 variations, **each as its own named `#Preview`**. Then remix: name the promising variants and the elements to recombine. Breadth the hand-coded tier never had.
2. **Agent as fake user (lived-in content):** have the agent "play the role of somebody using your app" — but *you* "stop and think through edge cases" (empty states, unbounded growth: member counts, long titles → truncate/wrap decisions); keep sample content plausible for your audience and **in its own reusable file**. Realistic content surfaces missing blank-slate UI, redundancies, layout breaks. "Nothing beats real-world use… but this is an excellent way to get a head start."
3. **Agent-built tuning panels (key moments):** the 2023 parameterized-mini-tool, now generated on demand — "ask for the animation to be broken into phases. This also gives you and the agent a shared vocabulary"; lay the panel **side by side** with the UI at a wider preview size; works for animations, app states, colors, type, offsets. "Anytime you're trying to manage multiple configurations… make a tuning panel, shorten the feedback loop, and get to what feels optimal."

Two field amplifiers (Evil Martians' "weeks → days" design-engineering case, 2025): **prototype with the full dataset, not sample points** ("working with the full dataset helped us make better design decisions early on… I even tested a few bold chart types I'd never bother coding manually"), and **prototype in the target production stack** so handoff is copy-paste — "the frontend engineer… started by copying the code from my prototype." The expert-led qualifier holds: "my technical knowledge, multiplied by AI" — AI removes friction, not judgment.

A field caution for the mock-to-code direction (Paul Stamatiou testing Claude Design against his own app mock, Apr 2026 — https://x.com/Stammy/status/2045186427491930523): the agent's first pass scored "65/100. promising though" — text weights and sizes "all over the place and inconsistent," colors and rounded corners not respected, spacing inconsistencies, parts of the design missing, a gradient "way too large." When you hand an agent a *finished design* rather than a prompt, **diff the output against the mock element-by-element** — type weights/sizes, exact colors, corner radii, spacing, completeness, gradient scale — before iterating on anything else. The collaborator-not-designer stance covers visual QA too.

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
- **`feature-discoverability`** / **`sound-design`** — both close with "prototype and test"; this is the how.
- **`figma:figma-use`** / **`paper-desktop:design-to-code`** — modern tooling for the same make-fast ethic; the method here is tool-agnostic ("subvert your tools").
- **`swiftui-layout`** / **`swiftui-animation`** — the building blocks for the real-code tier; this skill says *why and when* to prototype in SwiftUI, those say *how*.
- **`agentic-coding`** — when prototyping graduates to production engineering with agents (designer shipping code in the production repo, encoding decisions as rules). Cautionary datum from its case study: prototyping in a tool outside the production stack creates a **two-system tax** — every iteration gets re-ported — so once past concept validation, prototype in the real repo.
