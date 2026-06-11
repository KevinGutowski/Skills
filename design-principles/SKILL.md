---
name: design-principles
description: "Apply Apple's eight design principles — purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight — to guide and critique design decisions. Use when making high-level design choices, evaluating whether a feature is well-designed, or reviewing a UI against principles. Based on Apple's 'Principles of great design' (WWDC 2026). Triggers: is this good design, design principles, design critique, delight."
---

# Principles of Great Design

**Sources:**
- *Apple WWDC 2026, session 250 — "Principles of great design" (Linda & Doug, Design Evangelism). https://developer.apple.com/videos/play/wwdc2026/250/*
- *Apple WWDC 2017, session 802 — "Essential Design Principles" (Mike Stern, Design Evangelism) — the classic cognition-based principles. https://developer.apple.com/videos/play/wwdc2017/802/*
- *Apple WWDC 2025, session 359 — "Design foundations from idea to interface" (Majo, Design Evangelism). https://developer.apple.com/videos/play/wwdc2025/359/*
- *Apple WWDC 2018, session 801 — "The Qualities of Great Design" (Lauren Strehlow + 13 designer interviews) — the earned-quality/durability additions under Craft; its techniques live in `design-prototyping`. https://developer.apple.com/videos/play/wwdc2018/801/*
- *Ryo Lu (Head of Design, Cursor; first designer at Notion) — 2025 interviews: Dive Club (youtube.com/watch?v=dsZqOPVQTNg), Dialectic (8ncYSGbfeyY), Async Z podcast (PQhcHrCyU8M) — the System thinking cluster below.*
- *Matt D. Smith (MDS, Shift Nudge) — "Good Enough UI" interview (youtube.com/watch?v=4p5LzrAYN30), Dive Club (K_7ECqNlTtE), Shift Nudge critiques (ZRBq8UYLa-0, 6153Upr2BDM) — the MDS craft notes under Craft.*

*As of June 2026 the HIG carries a reintroduced, canonical **Design principles** page (fetch via the `hig` skill, slug `design-principles`) — this skill is the reasoning companion; check that page when exact current wording matters.*

Design is **making something with intention** — focusing on what's most important to people so you build something they'll truly value. Every feature you add asks the user for their **time, attention, and trust** — valuable things you can't waste. So choosing what to build is often a matter of deciding what *not* to include.

These eight principles guide that choice. **There's no formula.** Leaning into one principle can feel like compromising another; that tension is the work. Use these to reason and critique, then apply judgment — name the trade-off and decide deliberately.

## How to use this skill

- **Generative** (before building): start with Purpose — justify the thing's existence and cut what isn't essential — then pressure-test the design against the rest.
- **Evaluative** (reviewing a design): walk the design through each principle and find where it breaks. The critique checklist below and `references/critique-guide.md` give per-principle diagnostic questions.
- **Resolving conflicts:** when two principles pull apart (e.g. flexibility vs. simplicity), state the trade-off explicitly and choose based on what matters most for *this* feature and audience. Don't pretend there's one right answer.

## The eight principles

### 1. Purpose — build with intention
Before a sketch or a line of code, ask whether what you're making has a reason to exist. Every feature spends the user's time, attention, and trust. **Deciding what to build is mostly deciding what to leave out.** Watch for: features added because they're possible, not because they're valuable.

### 2. Agency — put people in control
People are far more engaged when they control their own experience. **Offer choices**; don't force a pre-determined path. Let people dive in and explore at their own pace; the interface should never stand between a person and what they're trying to do.

**Forgiveness** supports agency — it lets people explore without fear:
- Make actions easy to **undo**. People accidentally send, change, and delete things constantly.
- Before something **destructive**, double-check intent (confirm).
- Use **interruptions sparingly** — only when someone is about to make a big mistake. Over-interrupting erodes the agency you're trying to protect.

### 3. Responsibility — act in people's best interest
**Privacy is a human right.** Don't demand data up front — it's like a stranger insisting on your phone number before saying why. Responsible interfaces:
- Wait for the **right moment** to ask (not a wall of permission prompts on launch, before the person knows what the app does).
- Ask only for **what's necessary**.
- Are **transparent** about what the data is for.

**Safety** — protect anyone using *or affected by* the product. For every feature ask: *How could this be misused? Who would be harmed? How do I prevent it?* This is acute for **AI features**, which can generate something unexpected or inaccurate. (A recipe app that knows an allergy must anticipate the model suggesting a dangerous ingredient.) Add safeguards — previews, confirmations, disclaimers — and **remove a feature entirely if its risk to safety outweighs its value.**

### 4. Familiarity — build on what people know
People arrive with a lifetime of real-world experience and conventions learned from other software. Lean on it.
- **Metaphor:** draw on something real so people can predict behavior (trash can = delete, and recoverable). Keep it in the sweet spot — not so *literal* people don't recognize the in-app concept, not so *abstract* the idea doesn't land. Don't hijack a known symbol for a new meaning, and don't reinvent a common icon — you lose instant recognition.
- **Consistency:** things that look the same should behave the same. Consistent **behavior** lets people anticipate outcomes; consistent **placement** (e.g. close a Mac window always in the top-left) means they don't have to think. Familiarity ≠ recycling one solution everywhere — know which patterns to use *when*.

### 5. Flexibility — adapt to people's actual lives
People use your design in ways as unique as they are. Support the real contexts they're in:
- **Context:** the same task changes by situation — music at home via speakers, on a run via AirPods + Watch, driving fully hands-free. Accommodate them.
- **Device:** design to each device's strengths — iPhone wants quick touch interactions; Mac expects deep workflows and precise pointer control. Every device deserves a solution that uses what makes it unique.
- **Ability:** get curious about your audience — age, language, pro vs. novice, accessibility needs. You won't solve for everyone on day one, but keep making it more inclusive.
- **Personalization:** when no single layout fits everyone (e.g. controls), let people rearrange or hide elements to suit their workflow. Flexibility is an investment that proves you designed with *them* in mind.
- **Constrain customization to always-good outcomes** (Josh Puckett): a raw color picker gives users "a lot of room to make an ugly card" — curate the option space, then expose one perceptual control (a single "brilliance" slider moving hue/saturation/lightness together) so every reachable state looks intentional. Agency within a curated range beats unlimited freedom.

### 6. Simplicity — strip away the unnecessary so the purpose shines
**Simple is not minimal.** Burying functionality in one place looks minimal but isn't simple. Simple designs are frictionless and intuitive — people find what they need without effort.
- **Concise:** plain language, no jargon, no redundancy; reduce the number of steps. Respect people's time.
- **Clear:** the design communicates what it does. Build clarity with **hierarchy** — order, spacing, contrast — so the most important thing is the most obvious thing. Clear interfaces answer: *What do I pay attention to? What can I interact with? How do I interact?* Distill complex data (a graphic may beat a table; summarize so people focus on what they care about).
- **Sometimes simple means adding.** A video scrubber that shows position and time remaining adds information that helps people make informed decisions. You've arrived at simplicity when you have *exactly enough.*

### 7. Craft — execute the details flawlessly
Craft is the attention to detail that signals you care. People feel a cheap, rushed product instantly — janky scrolling, a button that lags, misaligned icons, a layout that breaks on rotation — and they question the quality of everything else. Crafted work inspires confidence. The ingredients:
- High-quality **materials**: beautiful fonts that hold up across devices; colors that adapt across light/dark; clear graphics and iconography; responsive animations that give immediate, natural feedback; reliable, secure SDKs underneath.
- **Iteration:** quality takes time; make every last piece function beautifully.
- **Maintenance / longevity:** great design keeps evolving. When new features or hardware arrive, explore whether they fit your experience. Evolving with them makes people feel supported.

The 2018 "Qualities of Great Design" interviews sharpen Craft three ways:
- **Quality is earned, never claimed** — "being cool doesn't involve saying you're cool… quality has to be earned." Every touchpoint communicates it (App Store screenshots, the description, even review replies), and labels saying "premium quality" are anti-signals. "It's often the little things that are the telltale signs about craftsmanship" (the audio-booth panel-gap test: variable gaps mean it wasn't well crafted).
- **The durability test (timelessness)** — Apple's sound team designs ringtones to "still be a great ringtone after 5 years": ask whether a choice will feel dated in 1/5/10 years; "we could all design to be a little less trendy and definitely more durable."
- **Great design recedes** — "you're very aware of an interface which has been poorly designed, and you're not at all aware of an interface which has been well designed." And care has two lenses: did *I* care enough to make it the best it could be, and do I care about what *your* experience is.

Field corroboration from a practitioner who cites that same 2018 talk (Paul Stamatiou, "Craft," 2022 — https://paulstamatiou.com/craft/; 9 yrs Twitter design → Rewind co-founder):
- **Quality is all-encompassing, not a veneer** — "not just words designers toss around when referring to some veneer of polish... It's accessibility so that everyone can use it. It's performance and ease of use... reliability... durability with designs and components that can scale." The target feeling: "someone has already thought of you."
- **"Ship, then iterate" is a trap** — "it ends up being more *shiterate*." The imagined fast-follow V1.1 rarely happens (re-orgs, new initiatives intervene); "don't rely on a future release to clean up today's mess." Ditch "MVP" for **SLC — Simple, Lovable, Complete**: cut scope as a *vertical* slice of the cake "so you can taste all the layers, including the icing," never just the bottom layer. "It's just an experiment" deserves the same bar — successful experiments ramp to 100% without their neglected quality issues ever being fixed.
- **Small quality tickets compound** — one alignment fix moves nothing; "when you've fixed a dozen or so? It's noticeable." They lose every prioritization fight against crashers if there's only one work queue — dedicate sprint time to each type of work. And never label them "polish" or "design debt": "most people tend to think it's defined as optional, obsessive and unnecessary details."
- **Quality is a way of working, not a later phase** — define what quality means for *your* product (reliability-and-speed vs. delight-and-detail), set the bar explicitly, and know when to push vs. compromise: "everyone will hate working with you if you hold a high quality bar but don't know how to work within the context of your business goals."

Craft heuristics from practitioner sources (Josh Puckett):
- **Care lives in the skippable places:** what people remember and retell are the corners no one would have blamed you for ignoring — edge cases, error states, invoices, the conditions only a few users hit (the Porsche 928's clutch pedal spelling "928" in its tread). As AI makes *passable* output trivial, this is the differentiator: spend the leverage on what can't be generated. Self-check: where are you stopping at good enough? What's the skeleton in the closet everyone knows is broken?
- **The depth spectrum:** place any piece of work on an imaginary 1–10, where 1 = technically works and 10 = nothing could possibly be improved. Most work ships at 1–3 — not because more wasn't possible, but because it's easy to stop pushing. The difference between fine and great work is rarely the initial idea; it's how far the idea gets pushed. When critiquing, ask: what would one more level look like? Early levels are *fixing* (gaps, edge cases); later levels are *discovery* (zoom in on one element, remove something, name what isn't working, reference world-class examples, generate more options to select from).
- **The industry bar is the floor, not the goal:** daily-driver apps set an invisible execution standard; work below it gets silently discounted — people assume the whole product is poorly made and never say why (portfolios, stakeholder prototypes, and MVP demos are all screened against it). Practical shortcut: start with how the platform would design it (iOS conventions; on the web, polished defaults), *then* innovate — never from a blank page. Exemplars: Family and Raycast, which respect platform defaults and exceed them on every axis.

MDS craft notes (Matt D. Smith, Shift Nudge — "Good Enough UI" interview 4p5LzrAYN30; Dive Club K_7ECqNlTtE; critiques ZRBq8UYLa-0, 6153Upr2BDM):
- **Craft, defined and tempered:** craft is "spending an obscene amount of time on the details" — but "you're definitely not… painting the cysteine chapel when you're designing a button"; the check is whether the time is serving a user goal. His working model: "I like to treat UI design as like sculpture and you're removing things until you're there."
- **The Adidas calibration question** (cheapest possible alignment tool): before designing, ask the client "is it more like Adidas? Is it more like Crayola? Is it more like Rolex?" — "sometimes that conversation alone saves you 20 hours of designing."
- **Critique mechanics:** "tackle the most pressing problem first"; "begin the critique by giving a compliment"; and split the target — are "you critiquing the work or you critiquing me… two different things."
- **Intuition vs data:** a senior designer's gut should get it ~70% right — "just go with your your gut ultimately and you're 70% of the way there"; "you can have a lot of data and still produce really bad design." The float-label pattern was designed with no data at all ("I didn't look at any data whatsoever") — but at Amazon/Facebook scale, test.
- **Design the project, not just the pixels:** "we can sort of design the way the project might go" — shaping expectations and sequencing is design work too.
- **Vision filters:** choose the adjectives first, then kill directions that fail them — a direction died because "this feels like a time piece… I wanted something that that felt more timeless." Mid-project, "don't look at too many references" — a cooler launch at 50% done just derails you.
- **Energy transfer:** "if I put fun and creativity and a good time into my project, hopefully that transfers to the person" experiencing it. You can't schedule magic, but "allow yourself some time to explore and maybe put a a time limit on it."
- **When clarity struggles, suspect the business model, not the pixels:** a hero that won't resolve usually means the offering hasn't — "everything is like a buffet and I don't know where to begin."

### 8. Delight — create an emotional connection
Hard to define, instantly recognized. Delightful interfaces are satisfying, enriching, and feel **human**. You don't manufacture delight with confetti or flourishes bolted on at the end. You **identify the emotion** you want people to feel — relaxed, confident, excited — and find ways to reinforce it throughout. Delight is the *sum* of the consideration you put in: the natural result of getting the other seven principles right.

## Practitioner rules & counter-positions (Config 2024–25 talks)

**Operating rules that make quality real** (Karri Saarinen/Linear; Ricardo Vazquez/Dropbox-Shopify; Henry Modisett/Perplexity):
- **Watch the craft cycle**: new technology → optimization → process-worship → craft forgotten. The tell: "we started replacing purpose with metrics… we stopped asking 'does this feel right?' and started asking 'does it convert?'" Someone has to bring craft back deliberately.
- Linear's mechanics: **zero-bug policy, fixed within seven days**; **MVPs are internal-only** — limited betas are fine, but "once something goes live for everyone, it hits the standards"; small teams, no handoffs, iterating together toward "the feeling of right." The written version ("Why is quality so rare?", linear.app/now) adds: quality = the intersection of **Belief × Care × Craft**; decide by "**intuition & customers over data**" — evaluate "does this improve quality?", not shipping velocity; "hire only people who show craft and care" (evidence via work trials); quality creates *gravity* — organic adoption with "effectively zero marketing spend." Companion interview series: linear.app/quality.
- Dropbox's scoping rule: **"we don't build castles when tents will do just fine."** Bind each quality principle to a measurable ("smooth like butter" → FPS; "don't make me wait" → load time) and review them on **problem-framing cards** in critique — "true craft begins with understanding the problem."
- Perplexity's kill-test for features: "Did we make something better than the alternative? Do I actually need this thing, or am I just proud that I made it? **If we deleted it, would anybody care?**" And: "reliability is what builds fandom" — being fast, useful and trustworthy *every single time* beats occasional brilliance.

**From Linear's "Conversations on Quality" series (linear.app/quality, 2024):**
- **Pick problems people would "cancel the rest of their day to solve"** (Jeff Weinstein, Stripe) — "the vast majority of failure modes are attempting to polish something that shouldn't have existed in the first place"; failures are "errors of strategy, not errors of execution." The outage test: if it goes down and nobody screams, it isn't a burning problem. Focus also makes quality *cheaper*: "you're no longer having to polish all the corners of all possible things."
- **Say "surprisingly great," not "quality"** (Weinstein): "quality feels exclusionary" — surprisingly-great can be the welcome email, one removed step, a faster load; anyone on the team can produce it.
- **Quality killers triad** (Dick Costolo): monetization creep ("nobody says that out loud, it just starts to happen"), dogma (beliefs data already disproved), and dilution of singular vision as the org grows. Defense: "the best product teams stay as small as possible as long as possible"; a founder should "sacrifice anything but I'm responsible for what the product looks and feels like." Blame rule: "it's the job of leaders to correct mistakes quickly, not to prevent mistakes from happening" — punishment teaches permission-asking. His bar for excellent: "the product works the way you work."
- **MVP → MLP** (Ethan Eismann, Slack): "a shift from minimal viable product, which is just useful and usable, to a **minimal lovable product** — useful, usable, and well crafted and delightful." His superlative test: utility ("the most valuable thing I can possibly have") × usability × craft — craft decomposed into five factors: visual design, **motion** ("in the real world things don't snap from point A to point B… no quantum jumps"), interactivity, materiality/ergonomics (the Watch crown's detent pop), and voice & tone. Enterprise software is an office people inhabit for hours — "you can work in a popcorn-ceiling cubicle or a beautiful office; why don't we think about our software that way."
- **The iceberg** (Kevin Twohy): products whose surface "you could design in two days" are hard because of the production pipeline underneath (daily scripting, CMS, aligned humans) — "how hard can it be, look at how the app looks" is how things go wrong. Groundedness check: work on "things normal people care about… I like having an answer at a dinner party."
- **Design for the least amount of lying** (Basheer Tome, Fellow): "set up our marketing team to do the least amount of lying… they feel really good about the claims because how they would have to explain the product was thoroughly considered in how we designed the product." Carry one story "from the marketing page and the price point all the way down to how it feels when you buy it and use it." His two-sided quality test: **"is it what we say it is, and is what we're saying it is good?"** — concept quality (validated by domain experts) and execution quality (empirical specs) are separate questions; answer both.

- **The "Design Golden Era" diagnostic** (Jenny Arden, Zillow — Config 2024): great design eras need four ingredients — a leader with clarity (any tenacious vision-holder, "not necessarily an exec," repeating the why "in every format"); a team that actually cares; a company that values quality (test: *Is the business strategy tied to the quality of the work? Does everyone understand what quality means? Is everyone incentivized to make it happen?*); and an environment at the brink of change. John Hoke (Nike): "No one remembers a deadline. No one remembers a budget… they remember the output. If it's below the standards, stand up for yourself — it's not good enough, go make it great."
- **Punitive vs pacing mechanics** (Duolingo, Config 2025): Hearts were "too punitive"; Energy is "a pacing mechanism" with positive reinforcement. When constraining usage, prefer mechanics that *pace* over mechanics that *punish*.

**Counter-positions worth holding in tension with Simplicity:**
- **Deliberate friction** (Michelle Lee, IDEO Play Lab): not all work should be made efficient — distinguish *burdensome* work (automate it) from *rewarding* work (protect it: "writing isn't just about writing, writing is about thinking"). Friction also creates specialness (Elmo hangs up after every call; the strapless VR viewer that tires kids' arms governs usage). Ask: "where should we instead be designing for deliberate friction?"
- **The ornament thesis** (Keegan McNamara): "Apple's design is ornamental, but the ornament is abstract and hidden" — the care once spent carving acanthus leaves became care for curvature continuity you only see in the reflections. Louis Sullivan coined "form follows function" while ornamenting lavishly: "ornament had a function. It gave an object identity. It gave it a soul." Minimalism done well is maximal hidden care, not absence.
- **Scarcity as respect** (Josh Wardle): endless-play Wordle prototypes were abandoned in 20 minutes; once-a-day made it beloved — "Wordle only wants three minutes of your day." Designing for *less* engagement can be the user-respecting choice.
- **Vanished constraints can still be valuable constraints** (Marcin Wichary): old pixels, type grids, channel limits — "what used to be technical constraints that no longer exist can still be valuable constraints." Find your grain size: "a pixel that's not too big, because then you can't do as much, but not too small, because then it's suffocating — too many options, too much time."
- **The testing tension, both poles true**: Grace Walker (Spellbook) — "our best performing landing pages were not all that beautiful… marketing collateral that is harmonious and unified is often ignorable"; six beautiful rebrand pages all lost to the ugly old one; the CEO's maxim: "**almost nothing works**" — persistence beats brilliance on conversion surfaces. Versus Jesper Kouthoofd (teenage engineering) — no group decisions ("you don't know why people say what they say"), design for yourself, and the **20-year test**: "everything you do from now on, you should think you will look at it in 20 years and still be proud of it… if you like it then, it will include all those good values — it's timeless, it has quality, it's respectful." Resolution: know the artifact's job — conversion surfaces answer to tests; durable objects answer to the 20-year test. His other knives: design vs styling ("why do you want a car to look like a spaceship?" — no answer = styling) and **play the instrument before you design it** (five years of nightly organ practice before designing one).

## System thinking (Ryo Lu)

Simplicity and Purpose operationalized at the product-architecture level:
- **Merge concepts, don't add them.** When features feel related, "all of these things are the same thing… instead of five discrete little things, you just make the circle big" — one concept with n ways in. Collapsing Cursor's five AI entry points into one agent was "probably the biggest reason we took off."
- **Two named philosophies:** user-centric design vs system design. System design asks "how do I design the most simple system, fewest number of concepts, fewest code paths to do the most things for most people." User-centric is easier but "limits you from the beginning" — solutions only work for those specific people, so teams pile on features until "The simple thing is no longer simple."
- **Marie-Kondo simplification:** "You don't have to take things away. You just tuck them away maybe or like you build like elevators" — the easiest path for most people, little pathways for the rest.
- **Slack tolerates shipped imperfection:** "the best systems have slack in them" — redundancy is optionality. Let an ugly addition ship, "let it simmer," then periodically unify it back into the core concepts.
- **Design the three states:** "you need to design the zero state, the one state and the end state… for everything and then see how they melt together."
- **Feedback triage as model training:** "It's like training a model… you're just feeding more data, you're building your intuition." Extract what the person really wants; as for "your solution, I don't care."
- **Taste maintenance:** "taste is eating food" — keep consuming *and* making; selection ability decays without both.

## The classic principles (2017) — the cognitive layer

The 2026 principles are *values*; these eleven are *perception mechanics* — "they don't tell us how to do specific things in our design, they tell us why we should do those things." Designing serves four human needs: safety/predictability, understanding, achievement, and joy.

1. **Wayfinding** — every screen answers: Where am I? Where can I go? What will I find there? What's nearby? How do I get out? (Audit one screen at a time.)
2. **Feedback** — status, completion, warning, error; "clear, immediate, and understandable"; prefer *preventing* errors (inline validation; Things 3 silently fixing "June 31"). "Good feedback is like having a conversation with the person who designed it."
3. **Visibility** — usability rises when controls and information are visible; weigh against clutter.
4. **Consistency** — platform conventions beat cross-platform brand consistency (use the iOS share glyph, not the web one); internal consistency builds "a deeper sense of a product's integrity." "Being consistent takes self-control and restraint."
5. **Mental models** — system model + interaction model; match = "intuitive." The Mortimer faucet warning for redesigns: "prove to yourself beyond a shadow of a doubt that your innovations are objectively better."
6. **Proximity** — nearness implies connection; put controls where they're needed.
7. **Grouping** — structure through relationships; need grows with screen size.
8. **Mapping** — controls resemble and mirror what they affect; "you will often find labels when mapping is unclear — it is a telltale sign"; the best mapping is direct manipulation.
9. **Affordances** — a relationship between person and object, not an attribute; hint via form and animation (Weather's launch nudge implies scrolling).
10. **Progressive disclosure** — simple → complex; resolve what to hide with the **80/20 rule** (the print dialog).
11. **Symmetry** — reflectional, radial, translational; repetition of like elements gives structure and order.

Principles conflict — "designing is so often about resolving those differences. Too much feedback is annoying. Too much visibility is distracting."

## From idea to interface (2025) — the build sequence

The principles operationalized into an order of work: **Structure** (write down everything the app does → imagine real usage → cut/rename/group; every screen answers *where am I / what can I do / where can I go*) → **Navigation** (tabs are for navigation, not actions; "each extra tab means one more decision"; toolbar carries the screen title + essential actions) → **Content** (don't mix types; progressive disclosure — hidden content "is not missing, it's just behind a tap"; group by time/progress/patterns; lists beat grids for scanning) → **Visual design** (squint-test the hierarchy; stress-test with long text and large type; semantic colors "named after their purpose, not their appearance"; accent color sparingly). "Design is never really finished, and there's no single right answer."

## Design critique checklist

Walk a design through these — each maps to a principle:

- [ ] **Purpose:** does every feature earn the time/attention/trust it asks for? What should be cut?
- [ ] **Agency:** are people in control with real choices? Can they undo? Are destructive actions confirmed, and interruptions rare?
- [ ] **Responsibility:** is data requested at the right moment, minimally, and transparently? What's the misuse/harm case (especially for AI), and is there a safeguard?
- [ ] **Familiarity:** do metaphors and icons match real-world/established meaning? Is behavior and placement consistent across screens?
- [ ] **Flexibility:** does it adapt across contexts, devices, and abilities? Can people personalize where one layout won't fit all?
- [ ] **Simplicity:** plain language, fewest steps, strong hierarchy? Is it *clear*, not just *minimal*? Is anything missing that would add needed context?
- [ ] **Craft:** fonts, color (light/dark), icons, animation feedback, layout robustness — does any detail feel rushed?
- [ ] **Delight:** what emotion is intended, and where is it reinforced? Does it feel human?

**Observation prompts for critique sessions** (Josh Puckett's "noticing" practice — first reactions are shallow; stay with the thing longer and write down *why*, never just "feels clean"):
- Moments of hesitation — what caused it: uncertainty about consequences, lack of trust?
- Expectation gaps — where did the mental model break, and what was assumed?
- Emotional shifts — the exact moment of annoyance or a smile, and its trigger.
- What's missing, and what's being assumed — what does the interface hide vs. surface, and why those choices?
- Looks: cheap or crafted? colors cooperating or fighting? one clear hierarchy or everything competing?
- Feels: fast or sluggish? responds as expected or a subtle disconnect?

**Running the critique** (mechanics from Josh Puckett's critique methodology):
- **Sequence:** context first (what is this, and what's the emotional stakes of the task — a divorce-filing app demands different care than a podcast player) → honest first impressions → then separate lenses one at a time: visual design, interface design, consistency/conventions, user context. Don't merge the lenses — a beautiful interface can be unusable and vice versa; judge each on its own terms before synthesizing.
- **Issue format:** **[Issue name]** — specific factual observation → impact on the user → what it could be instead. Count things, name colors, quote text ("four background colors competing" beats "too many colors"). Frame interface-design gaps as *missed opportunities* ("we're missing a chance to reward progress").
- **Severity ladder:** *structural* (wrong mental model, IA, missing function — changes what it *is*) > *behavioral* (flow, feedback, expectation-setting — changes how it *feels*) > *visual* (color, type, shadows — changes how it *looks*). Order findings accordingly.
- **Voice:** decisive, no hedging, no praise-sandwich padding; every problem paired with a direction and a why. End with the 3–5 highest-impact changes, ranked.

**Project-specific facets:** generic virtues don't settle "is this actually good *for this product*?" Define ~5 externally *perceived* attributes you want users to feel (e.g. crafted, playful, authentic, substantial, inventive), score each 1–5, and critique in facet language ("not inventive enough — if we're at a 4, this is going backwards"). The lowest-scoring, highest-ranked facet is the next release's plan; if the top-ranked facet scores lowest, don't ship.

## Relationship to other skills

This is the **strategic / decision-and-critique layer**. It decides *whether and why*; the skills below decide *how*. Use this to choose and justify; defer to these for tactical depth:

- **`interface-craft-principles`** *(Kevin-local, not in the shared repo)* — the full Josh Puckett quality-practice loop (range→depth, live tuning, uncommon care). Its core heuristics (depth spectrum, industry-bar floor, noticing, facets) are folded into this skill above, so nothing here depends on it.
- **`make-interfaces-feel-better`** and **`emil-design-eng`** — the *Craft* principle at pixel level (spacing, shadows, optical alignment, micro-interactions, component polish). When the task is "make this detail feel right," use those.
- **`web-animation-design`** (default for motion) and **`motion`** — *Craft*'s responsive feedback and much of *Delight* in motion form (easing, springs, transitions). Route animation specifics there.
- **`frontend-design`** — generative building of distinctive, production-grade UI. This skill is the principles layer that should guide what it builds.
- **`naming-features-and-labels`** — *Familiarity* and *Simplicity* at the word level (clear labels, metaphor-true names, plain language).
- **`error-messages`** — *Forgiveness* and *Responsibility* in failure-state copy (recover, reassure, don't blame).
- **`ui-voice-and-tone`** — *Delight* and *Familiarity* at the level of the product's writing voice and microcopy. Set direction here; define and write the voice there.
- **`linear-settings-copy`** and **`user-onboarding`** — *Simplicity* and *Flexibility* in settings IA, personalization, and first-run; *Agency* in letting people choose their path.
- **`apple-search-design`** and **`ios-brand-identity`** — these principles applied to specific Apple-platform domains (search patterns; expressing brand within iOS conventions). They lean heavily on *Familiarity*, *Simplicity*, *Flexibility*, *Craft*, and *Delight*; use them for the iOS specifics and this skill for the underlying trade-offs.
- **`apple-typography`** and **`sf-symbols`** — *Craft* and *Flexibility* (Dynamic Type as accessibility) in Apple type and symbols; the mechanics layer beneath `ios-brand-identity`.
- **`apple-navigation-design`** — *Familiarity* applied to app structure (tabs, push, modality, iPad layout, pointer).
- **`apple-visual-accessibility`** — *Flexibility* and *Responsibility* made concrete: the accessibility settings and how to honor them.
- **`app-intents-design`** — *Simplicity* and *Agency* in exposing app functionality to Siri/Spotlight/system surfaces.
- **`chart-experience-design`** — *Simplicity*'s "complex data better understood as a graphic," fully worked out for in-app charts.
- **`sound-design`** / **`touch-interaction-design`** / **`widget-design`** — *Craft* and *Delight* in the auditory channel, the press of a control, and the home-screen surface respectively.
- **`liquid-glass-design-system`** — *Familiarity* and *Craft* embodied in the current platform design language; the material and system rules everything Apple-visual now sits on.
- **`feature-discoverability`** / **`notification-design`** / **`app-icon-design`** — *Agency*+*Familiarity* in finding features; *Responsibility* toward attention; the icon as concentrated *Simplicity*+*Delight*.
- **`design-prototyping`** — the evidence loop these principles get tested through (make → show → learn; presenting design work).
- **`ai-experience-design`** — *Responsibility*'s anticipate-model-harm mandate, fully worked out (data/metrics/outputs/inputs + generative safety).
- **`hig`** — the canonical Human Interface Guidelines lookup (topic map + fetch method); when a question needs Apple's current letter-of-the-law on a specific component or pattern, fetch it there.

Per the user's preference on overlapping design skills: when a task is purely tactical (motion, polish, copy), apply that specific skill's values; use this skill to set direction and resolve trade-offs between principles.

See `references/critique-guide.md` for per-principle diagnostic questions and the talk's worked examples.
