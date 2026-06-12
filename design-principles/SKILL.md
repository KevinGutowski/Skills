---
name: design-principles
description: "Apply Apple's eight design principles — purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight — to guide and critique design decisions. Use when making high-level design choices, evaluating whether a feature is well-designed, or reviewing a UI against principles. Based on Apple's 'Principles of great design' (WWDC 2026). Triggers: is this good design, design principles, design critique, delight."
---

# Principles of Great Design

**Sources:** [references/sources.md](references/sources.md) — 4 WWDC sessions + Ryo Lu + MDS interviews.
*As of June 2026 the HIG carries a reintroduced, canonical **Design principles** page (fetch via the `hig` skill, slug `design-principles`) — this skill is the reasoning companion; check that page when exact current wording matters.*

Design is **making something with intention** — focusing on what's most important to people so you build something they'll truly value. Every feature you add asks the user for their **time, attention, and trust** — valuable things you can't waste. So choosing what to build is often a matter of deciding what *not* to include.

These eight principles guide that choice. **There's no formula.** Leaning into one principle can feel like compromising another; that tension is the work. Use these to reason and critique, then apply judgment — name the trade-off and decide deliberately.

## How to use this skill

- **Generative** (before building): start with Purpose — justify the thing's existence and cut what isn't essential — then pressure-test the design against the rest.
- **Evaluative** (reviewing a design): walk the design through each principle and find where it breaks. The critique checklist below and `references/critique-guide.md` give per-principle diagnostic questions.
- **Resolving conflicts:** when two principles pull apart (e.g. flexibility vs. simplicity), state the trade-off explicitly and choose based on what matters most for *this* feature and audience. Don't pretend there's one right answer.

## The eight principles

### 1. Purpose — build with intention
Before a sketch or a line of code, ask whether what you're making has a reason to exist. Every feature spends the user's time, attention, and trust. **Deciding what to build is mostly deciding what to leave out.** Watch for: features added because they're possible, not because they're valuable — craft on a self-serving premise only sharpens the wrong thing (Soleio's Share Bar case → practitioner-notes).

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

The 2018 "Qualities of Great Design" interviews sharpen Craft three ways: **quality is earned, never claimed** ("being cool doesn't involve saying you're cool… quality has to be earned"); **the durability test** — will this feel dated in 1/5/10 years?; and **great design recedes** ("you're not at all aware of an interface which has been well designed"). Full notes: [references/practitioner-notes.md](references/practitioner-notes.md).

Practitioner corroboration, distilled — **Stamatiou** ("ship, then iterate" is a trap — "it ends up being more *shiterate*"; ditch MVP for **SLC — Simple, Lovable, Complete**, cut as a vertical slice; target feeling: "someone has already thought of you"), **Puckett** (care lives in the skippable places; the **depth spectrum** — most work ships at 1–3 of 10 because it's easy to stop pushing; the industry bar is the floor, not the goal), and **MDS** (craft is "spending an obscene amount of time on the details," checked against a user goal; the Adidas/Crayola/Rolex calibration question; a senior gut gets you ~70%). Full notes: [references/practitioner-notes.md](references/practitioner-notes.md).

**Soleio's shipping counterweight** (Dive Club): teams don't die from lack of craft; they "flailed around in irrelevance because they just refuse to ship"; designers "hide behind craft." Fix the janky ("the soup tastes funny"); defer sheen.

### 8. Delight — create an emotional connection
Hard to define, instantly recognized. Delightful interfaces are satisfying, enriching, and feel **human**. You don't manufacture delight with confetti or flourishes bolted on at the end. You **identify the emotion** you want people to feel — relaxed, confident, excited — and find ways to reinforce it throughout. Delight is the *sum* of the consideration you put in: the natural result of getting the other seven principles right.

## Practitioner rules & counter-positions (Config 2024–25 talks)

The sharpest operating rules: Linear's **zero-bug policy, fixed within seven days** and **MVPs are internal-only** ("once something goes live for everyone, it hits the standards"; quality = **Belief × Care × Craft**, decided by "intuition & customers over data"); Perplexity's kill-test — "**If we deleted it, would anybody care?**"; and Stripe's Weinstein — "the vast majority of failure modes are attempting to polish something that shouldn't have existed in the first place." Counter-positions to hold in tension with Simplicity: deliberate friction (protect *rewarding* work), the ornament thesis (minimalism done well is maximal hidden care), scarcity as respect ("Wordle only wants three minutes of your day"), and the testing tension — conversion surfaces answer to tests ("almost nothing works"), durable objects to the 20-year test. Full notes (Linear quality series, Golden-Era diagnostic, all counter-positions): [references/practitioner-notes.md](references/practitioner-notes.md).

**Writing your own team principles** (Jon Yablonski, *Laws of UX*, ch. 12): operationalize a principle as a three-part chain — "a clear framework… that consists of a goal (design principle) and an observation (law)" which then "establishes guidelines (rules)". Example chain: principle "clarity over abundance of choice" → law (Hick's) → testable rule like "limit choices to no more than 3 items at a time". His quality tests for the principles themselves: good ones "aren't truisms," solve real questions, are opinionated, and are memorable. A principle nobody could disagree with constrains nothing.

## System thinking (Ryo Lu)

Simplicity and Purpose operationalized at the product-architecture level: **merge concepts, don't add them** ("instead of five discrete little things, you just make the circle big" — collapsing Cursor's five AI entry points into one agent was "probably the biggest reason we took off"); **complexity first, simplicity second** ("true simplicity emerges only after you've grasped the full complexity first. you can't abstract away what you don't fully comprehend"); and **design the three states** — zero, one, and end — for everything. Closing bar: "this is the work. not making things pretty. making things true." Full interview + essay notes: [references/practitioner-notes.md](references/practitioner-notes.md).

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
