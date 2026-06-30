---
name: design-systems
description: "Build, govern, and scale a design system — token architecture, theming/multi-brand, governance, adoption as a measured product, DS-as-AI-context. Use for creating or auditing a design system, token taxonomies, planning governance or adoption, or wiring a DS into AI codegen. Triggers: design system, design tokens, semantic tokens, theming, token naming, governance, Code Connect."
---

# Design Systems

**Sources:** [references/sources.md](references/sources.md) — 9 Figma Config talks ('24–25) + Dive Club + books; worked examples in [references/field-notes.md](references/field-notes.md); unresolved promotion candidates in [references/coverage-gaps.md](references/coverage-gaps.md).
A design system is a **product with customers**, not a library: "treat it like a product team — clear OKRs, roadmap, customers — or it won't succeed" (Rahimi). The deeper frame (Henry Modisett, Linear): a DS is *quality infrastructure* — "if you make it so hard to make a bad button, you're going to have less bad buttons." Sell it honestly: "a design system is not the most efficient way to build things… it must have clear business impact and ROI" — the pitch that works is per-stakeholder incentive alignment: "components for free, performance for free, dark mode for free" (Coinbase), accessibility and i18n free.

## Opinions are the product

- **Unopinionated systems fail** (Baldwin, Intuit): internal customers "wanted us to tell them no from time to time." A central team that won't take positions forfeits the system.
- But opinions are *listened into existence*: "**if people are breaking the system, it's time the system changed**" (panel). Figma's team absorbed a dev's prop exploit as a considered "custom" variant rather than punishing (Albaugh/Bergman).
- Rules must be **actionable and enforceable or they're vibes**: Intuit's unmeasurable "20% may be uniquely styled" rule died; Uber's ~80% target works because dashboards measure it per screen.
- **Build, then constrain**: theming workshops deadlocked on abstract constraints; a live theming editor gave designers something real — "opinions should be rooted in a vision" (Baldwin). Zalando built token system and theme #1 *in parallel*, wrote governance after. Don't speculate: "product teams move faster than design system teams — address future needs when they're real" (Albaugh/Bergman). Component-level form: use it a few places, "allow the API [to] create itself based on the usage," then document (Briggs). Hitting limits is growth (the "midlarge" t-shirt size).

## Token architecture

- **The death spiral** (Intuit): 1,347 component tokens × 13 themes × light/dark ≈ **35,000 tokens**. Cure: a **minimal semantic set** "reusable across the widest range of use cases, named with enough specificity to be useful" + a formalized taxonomy. Payoff: TurboTax refresh "in weeks rather than months." (Details → field-notes.)
- **Zalando's refinement**: pure-semantic also fails — keep **component tokens, but rationed and private/unpublished**. Their whole color system: **~35 semantic tokens** (one hover, one pressed, one disabled-opacity). (Worked example → field-notes.)
- **Over-tokenization is the symmetric failure** (Ouriach, Dive Club): "an over-tokenization of something can mean it's so robust we can't deviate from it" — place yourself on the experimentation↔commitment line per product stage, and re-ask the value question now that agents read raw values in seconds. Tokens encode opinions; too many encode paralysis.
- Naming: short = type + category + function + optional state; **identical names across all themes, only values vary**; negotiate names with iOS + Android + web + design together; mirror codebase syntax onto Figma variables *programmatically* (generate the Figma script from the same source that emits your CSS custom properties, so codegen speaks real token names).
- Figma mechanics: raw values as variables; composite tokens (typography, shadows, gradients) as styles wrapping variables; **publish only the styles, hide backend variables, scope variables** — "hide and scope are your best friends."
- Remember the origin (Alaska): tokens were born from an accessibility failure — every engineer "invented a new blue" until one subscribed set existed.
- **Motion is a token layer** (Nabors, *Animation at Work*, ch. 3): durations belong on a **timing scale** like a modular type scale — Salesforce's Lightning Design System tokenizes Fibonacci-style durations (100+300=400, 300+400=700) so overlapping animations line up. Amy Lee's orchestra metaphor: "if we agree that a quarter note is 400ms long, then we all can play together at a peppy tempo of 150 beats per minute."
- **Name microanimations; pave the onomatopoeia cowpaths** (Nabors, ch. 4): codify "microanimations with descriptive names like 'pop,' 'fade,' and 'slide'" that compose into macroanimations ("alert"). Vocabularies start as room noises — "Can you make it more like *voooooosh* and less like *voosh*?" — so "adopt the words your company is using already." (Depth → field-notes.)

## Theming & multi-brand

- Frame as a pair: "how much variation can we allow **without breaking the experience**, and what level of brand integrity do we want to maintain?" (Zalando). Often "sub-brands" are *distinct categories of one product* needing graded distinction.
- **Siblings, not twins** (Worboys, Dive Club + Zalando): shared foundations (type, base tokens, grid) "and then there are these unique personalities that get put on top… that allow each of the brands to shine." Zalando's method: explore incremental → evolutionary → revolutionary; derive each theme by **re-weighting existing brand character traits** so themes extend brand architecture, not fork it.
- Scope rules that held (Zalando): theme everything **except major layout, motion, and new features**; theme display type only; tactical colors (error/success) identical everywhere. Governance: "one page, one theme"; "prioritize coherence — no theme steals the spotlight." Outcomes (engagement doubled, 40+ brands, 120+ components) → field-notes.
- Theming is the political answer to "we need our own design system" (Coinbase Themes — same architecture, distinct skins).
- **Color math** (Evil Martians): OKLCH makes color *programmable* — rotate hue at fixed L/C for cohesive accessible families; hover/pressed = arithmetic on L; dark theme = mirror lightness, keep chroma/hue. Change the brand color, everything recomputes (→ `web-design` (oklch-skill)). Baldwin's **Leonardo** (leonardocolor.io) generates palettes *from target contrast ratios* — contrast-first beats hand-checking pairs.
- **Linear's theme-generator pattern:** define a few intent inputs (base color, accent color, contrast), generate aliases for surfaces/text/icons/controls in LCH/OKLCH, and expose contrast as a user/system axis. For redesign work, tune tokens inside the live product with an internal color tool, then sync landed JSON values back to Figma so the system follows reality.

## Component API design

- **Variant math forces the decision**: 16-variant button → 80 with an icon variant, 160 with leading+trailing — use **props** instead (icon in an offset frame so designers never detach). Variants visualize *states*; props signal *what's overridable*; props can cut component weight ~50% (Figma 2024).
- **Split-the-set tests** — split if either is no: (a) is every option crystal clear on sight? (b) is every variant used interchangeably in the same use cases? (Cautionary tale: >20,000 variants.) Nathan Curtis: every addition raises cost and dilutes per-component value.
- Order props so related ones stack; action-verb booleans; expose nested instances only when key to flows — past an inflection point exposure is information overload.
- Spec the invisible: i18n/long-string behavior, focus-visible, tab order, ARIA, reflow — "code-only concerns designers skip" (Albaugh/Bergman).
- **Prework before redesign** (MailChimp): harvest repeated UI into reusable patterns before the visual direction lands; they used CSS size as a proxy and "managed to cut about 120k" before launch. Keep the pattern library as both shortcut and regression test page; deeper slat-system notes → field-notes.

## Design–code parity & handoff

- "**Pixel-perfect code is often not the right code. The perfect code is aligned to design intent, not pixels**" — non-parallel abstractions are fine; design and code "approach the same destination from different origins" (Albaugh/Bergman).
- Source of truth = an **"evergreen technical component specification"** shared by design and engineering (Uber) — in a multi-platform org "which codebase?" is unanswerable. Never hand engineers a picture: "a development comp is worth 10,000 different front-end solutions" (Alaska).
- Reframe automation as "**what should be left to touch**." Target "100% of what we can build *together*," not "70% of what I designed." Datum: 55% of front-end devs wish they were included earlier (Figma survey; Mounter).
- **Handoff is communication, not a file** (MDS): "the term handoff is not even really a great way to look at it" — an ongoing conversation. Rules: declare your grid as an error-correcting code; ship at ~90% with a wiggle-room map (the last 10–20% happens in the browser); cover the four forgotten states — error/empty/loading/overflow — plus hover/focus/disabled, motion refs, tab order; follow up 1/3/5-day; lose the ego. (Mechanics → field-notes.)
- **Apple's designer↔engineer layer** (WWDC 2017 #809): same terminology (the HIG/API docs are the shared dictionary — it's an *Alert*, not a "modal"); one agreed source of truth for deliverables; standard SDK patterns + accessibility *before* custom UI; "show more than tell" — animation spec = curves + values + "the exact API reference" + video; designers open Xcode: "Using the same tool helps build empathy… and thereby build credibility." (Full layer → field-notes; prototyping tiers → `design-prototyping`.)

## Governance, federation & contribution

- **"Federated is the only model that works in large organizations. Design by committee — the worst idea — is actually the best way to get adoption"** (Rahimi). Shape: **core team** builds only high-value shared components, guards quality, says *no* to one-offs; **extension libraries** own product-unique pieces; when **two products** need a thing, the extension contributes it to core. Decisions made *with* experts from each app; core "normalizes the decision, documents it, shares it."
- **One ecosystem, one system**: unless a product has its own design language *and* token system, it's part of this design system — "'we have our own design system' claims are miscommunication that creates chaos."
- **Keep the system alive, not just written down** (Figma blog on Combine, 2017 — https://www.figma.com/blog/meet-the-design-pioneers-taking-on-the-venture-world/): Facebook's cross-product design standards existed, but the hard problem was keeping them from going stale as teams and platforms changed. A design system is not a historical artifact; it needs ownership, contribution paths, and review loops that update the standard at the same pace the product learns.
- **Move up the stack as you mature** (Coinbase): primitives → complex components (DS-owned) → **product components** (co-owned, sprint-built with a product-team "ambassador"). Some patterns legitimately live Figma-documented only, never coded.
- New apps may break the rules — they're exploring the system's next version (Microsoft Loop). Respect the platform over the brand: "designing for Android: 80% Android, 20% Microsoft."
- **Deprecation is a feature**: visual deprecation mode, migrations tested simplest → real files, merges synced with code releases. "Almost everything you make in the system… will run its course" (PJ Onori). The DS moves slower than product — no riff-publishing.
- **Words are a system layer** (Metts & Welfle, *Writing Is Designing*, ch. 8): document functional patterns by *purpose*, not exact wording — "The purpose determines everything else that follows: the structure of the pattern, its content, its presentation" (Kholmatova, via WID). Make content first-class in the system's IA — Shopify's Polaris puts **Content** in the main nav beside Design and Components, a deliberate move ("how we organize information affects how organizations operate"). For style mechanics, adopt an existing style guide rather than writing your own — homegrown guides are "very time-consuming" and steal time from strategic work; pick one and stick to it.
- **Drop the label** (Ouriach): "taking the label of design system off what we're doing… brings you out of the silo and to the center of an organization's change" — from "what is a component" to "the company's system of approaching acceleration."

## Adoption is a measured product

- **"We never stop the business for the sake of adoption"** (Uber rule #1). Mature surfaces adopt more; exploring products less — natural.
- **~80% is the golden standard** — the differentiated 20% *shouldn't* be system. Measured per screen (Uber's UTRA dashboard + on-device overlay); Coinbase: single-digit → **94% in four years**, reported to execs every 2–4 weeks.
- **Define adoption as a ratio with a denominator** (Atlassian): adopted ÷ (adopted + native/custom/hard-coded), per offering; split existing vs new code. **Not all adoption is good adoption** — 33% of Jira's buttons were detached/overridden; high numbers don't make sweeping changes safe.
- Mandates never work; measure **breadth** (teams) and **depth** (% of shipped layers from DS); adoption data is product research — "it drives roadmaps." Run Coinbase's diagnostics (need? incentive? awareness? usable+documented?). **Put DS contribution in leveling charts and performance reviews**; attribute adoption to contributors. Arm both champion kinds — the enthusiastic (library analytics, branch proposals) and the influential (managers, long-tenured) — with reusable education.
- **Field-proven levers** (Config '24, details → field-notes): sell developer productivity ("130 engineering years… 35% faster with up to 80% less code" — Atlassian) and **primitives over the 20th card component**; **shift enforcement left** (ESLint rules, codemods, DS team does big migrations itself); release discipline — breaking changes once a year, automated migrations, a design API for cross-component prop consistency, **slots over opinionated components**, and docs as the highest-leverage multiplier (Booking); **dark mode as adoption trojan horse** — it visibly exposes non-compliant UI (GitHub); **A/B test the system product-wide** — "we want evidence to protect us from ourselves" (Back Market).
- Beware the **values oasis** (GitHub, via Will Larson): an autonomous DS team drifting from how the org works — "lead through ambiguity, and advocate through disagreement." Hold the tension: Atlassian says adoption "needs to be ground up"; GitHub's survival story is leadership alignment. Both, scale-dependent.

## Team design

- "Part of designing the system is designing the team." Reference shapes → field-notes; the rule: "if you don't have a strong engineering team, everything stays in Figma and the design investment is meaningless" (Uber). Design engineers are "the superpower of the design system team."
- An **expression team** (motion + icons + illustration) inside the DS org draws the brand-owned vs product-owned line — "a lot of brand-led decisions actually hurt the experience inside the app."
- Patience: Fluent "took eight years — eight years of inconsistency." The Frankenstein phase is part of the journey.

## The design system as AI context

- "The best time to invest in design systems — LLMs are really good at understanding the structure of a design system" (Weekes). Default prompt-to-app output converges on the same generic look; **your DS fed as context (Code Connect, token JSON, component specs) is how generated UI keeps your identity.**
- **Use the DS as the mechanical substrate, not the whole agent standard** (Vercel product-design pattern): expose tokens, component APIs, recipes, allowed composition paths, lintable rules, and canonical product names. Put product judgment, exceptions, and surface-specific examples in routed skills/references; put missing standards in coverage gaps rather than inventing them from one component.
- **Primitives once, extrapolated forever** (Lovin): "if you spend the time really really really sweating the details on a good set of primitives once, AI's so good at not only reusing, but also extrapolating" — hand-sweat the primitive set, let agents do the long tail. The converse is Ouriach's **landfill warning**: generation without a system "will just pile up like a landfill… somebody's going to have to fix it."
- **Build bricks** (Ryo Lu): "AI is really good at composing parts… we need to build really good bricks" — suck shipped patterns into the system so agents compose instead of reinvent. The DS team's emerging job is de-slop: agents lose exactly the details a mock encoded ("you want this easing curve to be exactly this value… the AI won't know what that is").
- **Make the polish layer token-addressable** (Kevin Kold, 2026): if an agent can only see colors and spacing, it will invent the rest. Export durations, easing curves, spring presets, radii, shadow stacks, press scales, snap thresholds, and state treatments with stable names; mirror those names 1:1 in Figma variables/styles and code. Then prompts can say "use only these tokens, no one-off values" instead of asking for "premium" polish.
- **Designers write the first draft of the prompt** when product UX is determined by AI behavior (Mounter); keep the *why* attached to the *what* — rationale scattered across docs/Slack/Jira kills adoption. (RAG-bot patterns, model comparison, fan-out exploration → field-notes.)
- **The Atlassian playbook** (Healey & Hall — the most complete field implementation; full specifics → field-notes). Rules: hand-code the chrome, let AI modify a working **template** ("very, very good at just changing the code that already exists" — nav errors ~50% → ~0); **config-object constants** kill recurring hallucinations (old logos); **recipes** (code blob + instructions) for add-ons; **AI legibility is a naming criterion** — "why do we call it a lozenge… or our prop appearance versus variant" (Hall); **curate, don't dump** (~2–3k lines, 20–30 components, the 80% mark — full dumps hallucinate more); **generate docs from the monorepo** so context can't drift; plan for the **remit explosion** — "anyone in the organization can essentially ship." Enablement mechanics → `working-with-ai` (ai-enablement).
- **Separate DS context from taste context** (Jaytel Taste, 2026): a DS context pack should expose tokens, component APIs, recipes, names, and allowed composition paths. A visual-taste corpus should expose transferable aesthetic constraints. Do not mix them into one dump. Agents compose better when the design-system substrate and the expressive taste layer are separate, explicit inputs.
- **Peak library?** (Haney): "because everyone's building with them, the AI trains on them more" — established stacks have AI-gravity; weigh that when choosing a DS's underlying stack.

## Counter-positions: consistency without commodification

- "Most design systems I see today are just glorified component libraries" (Worboys, Cash App). Components don't guarantee quality; the missing layers are **patterns (rules) + product primitives + governance** — "ingredients alone are not enough to make you a good cook." (Details, speed paradox, Superside graph-RAG extension → field-notes.)
- **Create-then-lint** (Worboys; same move as MDS's "break the system completely and then rebuild it"): "great ideas never start with a system, they start with a sketch" — design the ideal screen ignoring the system, then lint it into compliance. Explore *outside* the system (MDS: "it's almost critical that you don't have a system when you're exploring new ideas"); loop back and re-evaluate early components rather than letting them ossify.
- **The sea of sameness** (Worboys): "our strive for consistency is coming at the cost of commodification." Be "deliberately different… because what's different gets remembered and what's remembered wins." Hold this against the panel's consistency goals — both are true; the failure mode is shipping only the functional half.
- **Systems are a dial, not a switch** (MDS): "is this design system solving a legitimate problem? And if it is, how deep do we need to go?" — sometimes a pinky-promise spacing scale beats a spacer component. Career warning: DS-only designers lose generative craft ("I just don't even know how to inject any craft").

## Checklist

- [ ] Does the system have stated opinions someone could violate — and a listening loop for when they do?
- [ ] Token pyramid: primitives → minimal semantic set (~tens, not hundreds) → rationed *private* component tokens only where assessed?
- [ ] Theme names identical across themes; theming scope explicitly bounded (no layout/motion/new-feature theming)?
- [ ] Component sets pass the two split tests; props over variant explosions; invisible states specced?
- [ ] An evergreen spec as source of truth — not pictures thrown over a wall?
- [ ] Federation rules written: who owns, who extends, when extensions graduate to core, who may break rules?
- [ ] Adoption measured (breadth + depth, ~80% target), reported on a cadence, and rewarded in reviews?
- [ ] Deprecation pathway designed (visual mode, tested migrations, code-synced releases)?
- [ ] DS wired into AI tooling as context (Code Connect / token exports), including motion/shadow/state tokens, with designers owning first-draft prompts?
- [ ] AI context split into substrate (tokens/components/recipes) and expressive taste rules instead of one vague inspiration dump?

## Relationship to other skills

- **`apple-design` (liquid-glass-design-system)** — consuming Apple's *platform* design system; this skill is about *owning* one. The panel's "respect the platform: 80% Android, 20% Microsoft" is the bridge rule.
- **`apple-design` (ios-brand-identity)** — where brand may live inside a platform's system; this skill governs the brand's own token/theming machinery.
- **`web-design` (oklch-skill)** — the color math behind programmable tokens (hover = L+0.1, dark = mirror L).
- **`apple-design` (apple-typography)** — type mechanics (grade, optical sizes, metrics) that a DS's type layer must encode.
- **`devtools` (devtool-interface-design)** — the DS team's tooling (dashboards, linters, theming editors) is an internal devtool; its onboarding/AX rules apply.
- **`working-with-ai` (agentic-coding)** / **`design-prototyping`** — DS-as-AI-context is the constrained-generation stance applied to UI; prototype-with-the-system before codifying ownership.
- **`creating-skills` (converting-visual-references-to-skills)** — use when the source is a visual taste corpus; this skill owns actual token/component/spec systems. Do not substitute taste rules for DS context when components, tokens, or governance already exist.
- **`working-with-ai` (ai-enablement)** — rollout, pilots, and training for the AI-context layer.
- **`design-principles`** — Craft/Simplicity judge individual components; this skill governs the system that mass-produces them.

> **Staleness note (Kevin's rule):** auto-captioned 2024–25 talks; tool specifics (Figma variables/modes/Code Connect/Dev Mode, UTRA, Datadog wiring) are point-in-time — verify against current docs. The governance, token-architecture, and adoption rules are the durable layer.
