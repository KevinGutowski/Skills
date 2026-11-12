---
name: design-principles
description: "Apply Apple's design principles — purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight — plus classic cognitive principles, to guide or critique design decisions. Use for high-level choices or judging whether a feature should work this way. Pixel polish → design-craft; whole-screen web audit → interface-review; HIG specs → apple-design. Triggers: is this good design, design principles, design critique, delight."
---

# Principles of Great Design

**References — read on demand:** [references/critique-guide.md](references/critique-guide.md) (per-principle diagnostic questions, worked examples, critique mechanics — when reviewing a design) · [references/practitioner-notes.md](references/practitioner-notes.md) (practitioner quotes, cases, and counter-positions behind the one-line rules here — when you need the evidence or the story) · [references/sources.md](references/sources.md) (provenance: 4 WWDC sessions + Ryo Lu + MDS interviews) · [references/coverage-gaps.md](references/coverage-gaps.md) (unresolved promotion candidates — before folding new material).
*As of June 2026 the HIG carries a reintroduced, canonical **Design principles** page (fetch via the `apple-design` (hig) skill, slug `design-principles`) — this skill is the reasoning companion; check that page when exact current wording matters.*

Design is **making something with intention** — focusing on what's most important to people. Every feature asks the user for their **time, attention, and trust**, so choosing what to build is often deciding what *not* to include.

Output is not design, and code is not design by itself (Linear): design is the search for fit between form and context. Use tools, code, and AI to explore and execute, but do not mistake a plausible artifact for a solved problem.

These eight principles guide that choice. **There's no formula.** Leaning into one principle can feel like compromising another; that tension is the work — name the trade-off and decide deliberately.

## How to use this skill

- **Generative** (before building): start with Purpose — justify the thing's existence and cut what isn't essential — then pressure-test the design against the rest.
- **Evaluative** (reviewing a design): walk the design through each principle and find where it breaks. The critique checklist below and the critique guide give per-principle diagnostic questions.
- **Resolving conflicts:** when two principles pull apart (e.g. flexibility vs. simplicity), state the trade-off explicitly and choose based on what matters most for *this* feature and audience.

## The eight principles

### 1. Purpose — build with intention
Before a sketch or a line of code, ask whether what you're making has a reason to exist. **Deciding what to build is mostly deciding what to leave out.** Watch for: features added because they're possible, not because they're valuable — craft on a self-serving premise only sharpens the wrong thing (Soleio's Share Bar case → practitioner-notes).

Linear's problem-framing rule: write the problem, name the stakeholders, and repeat the problem before presenting solutions — if the room reacts to the problem statement, stop there.

### 2. Agency — put people in control
People are far more engaged when they control their own experience. **Offer choices**; don't force a pre-determined path. The interface should never stand between a person and what they're trying to do.

**Forgiveness** supports agency — it lets people explore without fear:
- Make actions easy to **undo**. People accidentally send, change, and delete things constantly.
- Before something **destructive**, double-check intent (confirm).
- Use **interruptions sparingly** — only when someone is about to make a big mistake. Over-interrupting erodes the agency you're trying to protect.

### 3. Responsibility — act in people's best interest
**Privacy is a human right.** Don't demand data up front. Responsible interfaces:
- Wait for the **right moment** to ask (not a wall of permission prompts on launch).
- Ask only for **what's necessary**.
- Are **transparent** about what the data is for.

**Safety** — protect anyone using *or affected by* the product. For every feature ask: *How could this be misused? Who would be harmed? How do I prevent it?* This is acute for **AI features**, which can generate something unexpected or inaccurate (the recipe-app allergy case → critique guide). Add safeguards — previews, confirmations, disclaimers — and **remove a feature entirely if its risk to safety outweighs its value.**

### 4. Familiarity — build on what people know
People arrive with a lifetime of real-world experience and conventions learned from other software. Lean on it.
- **Metaphor:** draw on something real so people can predict behavior (trash can = delete, and recoverable). Keep it in the sweet spot — not too *literal*, not too *abstract*. Don't hijack a known symbol for a new meaning, and don't reinvent a common icon — you lose instant recognition.
- **Consistency:** things that look the same should behave the same. Consistent **behavior** lets people anticipate outcomes; consistent **placement** means they don't have to think. Familiarity ≠ recycling one solution everywhere — know which patterns to use *when*.

### 5. Flexibility — adapt to people's actual lives
People use your design in ways as unique as they are. Support the real contexts they're in:
- **Context:** the same task changes by situation (music at home, on a run, driving hands-free). Accommodate each.
- **Device:** design to each device's strengths — iPhone wants quick touch interactions; Mac expects deep workflows and precise pointer control.
- **Ability:** get curious about your audience — age, language, pro vs. novice, accessibility needs — and keep making it more inclusive.
- **Personalization:** when no single layout fits everyone, let people rearrange or hide elements.
- **Constrain customization to always-good outcomes** (Josh Puckett): curate the option space, then expose one perceptual control so every reachable state looks intentional. Agency within a curated range beats unlimited freedom.

### 6. Simplicity — strip away the unnecessary so the purpose shines
**Simple is not minimal.** Burying functionality looks minimal but isn't simple — people should find what they need without effort.
- **Concise:** plain language, no jargon, no redundancy; reduce the number of steps. Respect people's time.
- **Clear:** the design communicates what it does. Build clarity with **hierarchy** — order, spacing, contrast — so the most important thing is the most obvious thing. Clear interfaces answer: *What do I pay attention to? What can I interact with? How do I interact?* Distill complex data (a graphic may beat a table; summarize so people focus on what they care about).
- **Sometimes simple means adding.** A video scrubber showing position and time remaining helps people decide. You've arrived at simplicity when you have *exactly enough.*
- **Options are not value by themselves** (Sten): group choices, reveal power gradually, and protect the core task from option sprawl. Test: can the person achieve the main goal faster and with more confidence?

### 7. Craft — execute the details flawlessly
Craft is the attention to detail that signals you care. People feel a cheap, rushed product instantly — janky scrolling, a lagging button, misaligned icons — and question the quality of everything else. The ingredients:
- High-quality **materials**: beautiful fonts that hold up across devices; colors that adapt across light/dark; clear graphics and iconography; responsive animations that give immediate, natural feedback; reliable, secure SDKs underneath.
- **Iteration:** quality takes time; make every last piece function beautifully.
- **Maintenance / longevity:** great design keeps evolving. When new features or hardware arrive, explore whether they fit your experience.

Sharpeners (full notes: [references/practitioner-notes.md](references/practitioner-notes.md)): the 2018 "Qualities of Great Design" interviews — **quality is earned, never claimed** ("quality has to be earned"), **the durability test** (will this feel dated in 1/5/10 years?), **great design recedes**; **Stamatiou** — ditch MVP for **SLC (Simple, Lovable, Complete)**, cut as a vertical slice; **Puckett** — care lives in the skippable places, and most work ships at 1–3 on the depth spectrum; **MDS** — the Adidas/Crayola/Rolex calibration question, and a senior gut gets you ~70%.

Sten's sequence check: functional → reliable → usable → pleasurable. Polishing a product that does not work, cannot be trusted, or cannot be understood is misordered craft.

**Soleio's shipping counterweight** (Dive Club): teams don't die from lack of craft — they "flailed around in irrelevance because they just refuse to ship." Fix the janky first; defer sheen.

### 8. Delight — create an emotional connection
Hard to define, instantly recognized. Delightful interfaces are satisfying, enriching, and feel **human**. You don't manufacture delight with confetti bolted on at the end. You **identify the emotion** you want people to feel — relaxed, confident, excited — and find ways to reinforce it throughout. Delight is the *sum* of the consideration you put in: the natural result of getting the other seven principles right.

Sten's relationship lens: people remember how a product made them feel in high-stakes moments. Ask whether it leaves them feeling capable, confident, and understood when stressed or recovering from a problem — often that means restraint: clear language, predictable feedback, no decorative celebration.

## Practitioner rules & counter-positions (Config 2024–25 talks)

The sharpest operating rules: Linear's **zero-bug policy (fixed within seven days)** and **MVPs are internal-only**; Perplexity's kill-test — "**If we deleted it, would anybody care?**"; and Stripe's Weinstein — most failure modes are polishing something that shouldn't have existed in the first place. Counter-positions to hold in tension with Simplicity: deliberate friction (protect *rewarding* work), the ornament thesis (minimalism done well is maximal hidden care), scarcity as respect (Wordle), and the testing tension (conversion surfaces answer to tests; durable objects to the 20-year test). Linear's redesign principle: a product that ships constantly periodically needs a holistic reset, warranted only when it rebalances the product around where the company is going. Full notes: [references/practitioner-notes.md](references/practitioner-notes.md).

**Writing your own team principles** (Jon Yablonski, *Laws of UX*): chain principle (goal) → law (observation) → testable rule, e.g. "clarity over abundance of choice" → Hick's → "limit choices to no more than 3 items at a time". Good principles "aren't truisms" — one nobody could disagree with constrains nothing.

## System thinking (Ryo Lu)

Simplicity and Purpose operationalized at the product-architecture level: **merge concepts, don't add them** (collapsing Cursor's five AI entry points into one agent); **complexity first, simplicity second** — "true simplicity emerges only after you've grasped the full complexity first"; and **design the three states** — zero, one, and end — for everything. Interview, essay, and maxim notes: [references/practitioner-notes.md](references/practitioner-notes.md).

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

An order of work: **Structure** (list everything the app does → imagine real usage → cut/rename/group) → **Navigation** (tabs are for navigation, not actions; "each extra tab means one more decision") → **Content** (don't mix types; progressive disclosure; lists beat grids for scanning) → **Visual design** (squint-test the hierarchy; stress-test with long text and large type; semantic colors; accent sparingly). Full sequence with quotes: [references/critique-guide.md](references/critique-guide.md).

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

**Observation prompts:** use the per-observation checklist in `design-craft`'s Noticing section — stay past the first reaction and write down *why*, never just "feels clean."

**Running the critique** (Josh Puckett's method; full mechanics in [references/critique-guide.md](references/critique-guide.md)): context and emotional stakes first → honest first impressions → separate lenses one at a time (visual, interface, consistency/conventions, user context). Write each issue as **[Issue name]** — specific factual observation → user impact → what it could be instead. Order findings structural > behavioral > visual. Be decisive, pair every problem with a direction and a why, and end with the 3–5 highest-impact changes, ranked.

**Project-specific facets:** generic virtues don't settle "is this actually good *for this product*?" — define, score (1–5), and stack-rank ~5 project-specific perceived attributes per `design-craft`'s Facets of quality section, and critique in facet language.

## Relationship to other skills

This is the **strategic / decision-and-critique layer**: it decides *whether and why*; the skills below decide *how*.

- **`design-craft`** — the working practice for *Craft*: the quality-practice loop (range→depth, live tuning, facets, uncommon care) plus pixel-level execution values in its references. Whether/why a feature should exist stays here; "is this good enough / make this detail feel right" goes there.
- **`web-design` (web-animation-design)** (default for motion) and **`motion`** — *Craft*'s responsive feedback and much of *Delight* in motion form (easing, springs, transitions).
- **`frontend-design`** — generative building of distinctive, production-grade UI. This skill guides what it builds.
- **`ux-writing`** — (naming-features-and-labels) *Familiarity* and *Simplicity* at the word level; (error-messages) *Forgiveness* and *Responsibility* in failure-state copy; (ui-voice-and-tone) *Delight* and *Familiarity* in voice and microcopy.
- **`ux-writing` (linear-settings-copy)** and **`user-onboarding`** — *Simplicity* and *Flexibility* in settings IA, personalization, and first-run; *Agency* in letting people choose their path.
- **`apple-design` (apple-search-design)** and **`apple-design` (ios-brand-identity)** — these principles applied to search patterns and to expressing brand within iOS conventions; use them for the iOS specifics and this skill for the underlying trade-offs.
- **`apple-design` (apple-typography)** and **`swiftui` (sf-symbols)** — *Craft* and *Flexibility* (Dynamic Type as accessibility) in Apple type and symbols.
- **`apple-design`**, other parts — (apple-navigation-design) *Familiarity* in app structure; (apple-visual-accessibility) *Flexibility* and *Responsibility* as accessibility settings to honor; (app-intents-design) *Simplicity* and *Agency* on Siri/Spotlight/system surfaces; (chart-experience-design) *Simplicity*'s "complex data better understood as a graphic" for in-app charts.
- **`swiftui` (sound-design)** / **`swiftui` (touch-interaction-design)** / **`swiftui` (widget-design)** — *Craft* and *Delight* in the auditory channel, the press of a control, and the home-screen surface respectively.
- **`apple-design` (liquid-glass-design-system)** — *Familiarity* and *Craft* embodied in the current platform design language.
- **`feature-discoverability`** / **`notification-design`** / **`apple-design` (app-icon-design)** — *Agency*+*Familiarity* in finding features; *Responsibility* toward attention; the icon as concentrated *Simplicity*+*Delight*.
- **`design-prototyping`** — the evidence loop these principles get tested through (make → show → learn; presenting design work).
- **`ai-experience-design`** — *Responsibility*'s anticipate-model-harm mandate, fully worked out (data/metrics/outputs/inputs + generative safety).
- **`apple-design` (hig)** — the canonical Human Interface Guidelines lookup; fetch Apple's current letter-of-the-law on a specific component or pattern there.

When a task is purely tactical (motion, polish, copy), apply that specific skill's values; use this skill to set direction and resolve trade-offs between principles.
