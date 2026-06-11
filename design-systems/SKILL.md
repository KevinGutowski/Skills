---
name: design-systems
description: "Build, govern, and scale a design system — token architecture, theming/multi-brand, governance, adoption as a measured product, DS-as-AI-context. Use when creating or auditing a design system, designing token taxonomies, naming tokens, planning governance or adoption, or wiring a DS into AI codegen. Based on nine Figma Config talks. Triggers: design system, design tokens, semantic tokens, theming, token naming, governance, Code Connect."
---

# Design Systems

**Sources** — Figma Config talks, 2024–25:
- *"Design systems best practices" (Figma Designer Advocates, 2024)* · *"Unifying design and development through design systems" (panel: Marcel Weekes/Figma, Tali Krakowsky Appel/Coinbase, Samira Rahimi/Uber & ex-Microsoft, 2025)* · *"The value of opinions in design systems" (Nate Baldwin, Intuit, 2024)* · *"Delivering a multi-sub-brand design system for e-commerce" (Zalando, 2024)* · *"Building design systems together" (Jake Albaugh & Chad Bergman, Figma, 2025)* · *"Design systems for XL displays" (Alaska Airlines Auro, 2024)* · *"Programmable colors" (Evil Martians, 2025)* · *"Unlocking creativity with GitHub and Figma" (Diana Mounter & Cole Bemis, 2025)* · *"Typography is the foundation of any design system" (Elliot Jay Stocks, 2025 — type specifics live in `apple-typography`)*. Plus *Ryo Lu (Cursor) — Dive Club + Dialectic interviews, 2025 (the "bricks"/de-slop additions)* and *MDS (Matt D. Smith, Shift Nudge) — https://www.youtube.com/watch?v=4p5LzrAYN30 · https://www.youtube.com/watch?v=PFi9WfNUlps (the dial + handoff sections)*.

A design system is a **product with customers**, not a library: "treat it like a product team — clear OKRs, roadmap, customers — or it won't succeed" (Rahimi). The deeper frame (Henry Modisett, Linear quality series): **"you can invest in systems that make it hard to make things bad… if you make it so hard to make a bad button, you're going to have less bad buttons"** — a DS is quality infrastructure, not just consistency tooling. And sell it honestly: "a design system is not the most efficient way to build things. It's slow and costly… it must have clear business impact and ROI" — the pitch that works is per-stakeholder incentive alignment: "components for free, performance for free, dark mode for free" (Coinbase), accessibility and internationalization free.

## Opinions are the product

- **Unopinionated systems fail** (Baldwin, Intuit): "we were so loosey-goosey it's hard to say if we had a design system" — internal customers "wanted us to tell them no from time to time." A central team that won't take positions forfeits the system.
- But opinions are *listened into existence*: "**if people are breaking the system, it's time the system changed. If two teams are breaking your icon system, you need to change your icon system**" (panel). Same lesson at component level: when a dev exploited an omitted prop to inject a custom icon, Figma's team absorbed it as a considered "custom" variant rather than punishing (Albaugh/Bergman).
- Rules must be **actionable and enforceable or they're vibes**: Intuit's "20% of a product may be uniquely styled" rule died because nobody could measure it. Contrast Uber, whose ~80% adoption target *works* because dashboards measure it per screen.
- **Build, then constrain**: theming workshops deadlocked on abstract constraints; building a live theming editor first let designers react to something real — "opinions should be rooted in a vision" (Baldwin). Zalando corroborates: token system and first theme built *in parallel*, governance principles written only after theme #1 shipped. Don't speculate on future use cases; "product teams move faster than design system teams — address future needs when they're real" (Albaugh/Bergman). Hitting limits is growth, not breakage (the "midlarge" t-shirt size).

## Token architecture

- **The death spiral** (Intuit): 1,347 component tokens × 13 themes × light/dark ≈ **35,000 tokens** — teams imported all of them to reference one value. Cure: a **minimal semantic set** "reusable across the widest range of use cases, named with enough specificity to be useful," plus a formalized taxonomy. Payoff: TurboTax's full visual refresh "in weeks rather than months."
- **Zalando's refinement**: pure-semantic also fails ("we would have ended up with a huge list") — keep **component tokens, but rationed**: a carefully assessed, limited set, and **kept private/unpublished** so consumers never see them. Their whole color system: **~35 semantic tokens** — one shared hover token, one pressed token, one disabled-opacity token (transparent works on any background).
- Naming: short = type + category + function + optional state; **identical names across all themes, only values vary**; negotiate names with iOS + Android + web + design together; mirror codebase syntax onto Figma variables *programmatically* (generate the Figma script from the same source that emits your CSS custom properties, so codegen speaks real token names).
- Figma mechanics: raw values as variables; composite tokens (typography, shadows, gradients) as styles wrapping variables; **publish only the styles, hide backend variables, scope variables to applicable fields** — "hide and scope are your best friends."
- Origin story to remember (Alaska Airlines): tokens were born from an accessibility failure — every engineer "invented a new blue" until one set of subscribed values existed. Consistency across separately-owned UIs emerged "truly because of the discipline of the design system and the use of design tokens," with no overseeing design lead.

## Theming & multi-brand

- Frame the question as a pair: "how much variation can we allow **without breaking the experience**, and what level of brand integrity do we want to maintain?" (Zalando). Often what looks like sub-brands is *distinct categories of one product* needing graded distinction.
- Explore themes on an **incremental / evolutionary / revolutionary** spectrum; derive each theme's personality by **re-weighting existing brand character traits** (luxury = more values-driven, less playful) so themes extend brand architecture rather than fork it.
- Scope rules that held: theme everything **except major layout, motion, and new features**; theme display/headline type only (body styles are too widely embedded); tactical colors (error/success) identical across all themes. Governance principles after theme #1: "**one page, one theme**" and "prioritize coherence — no theme steals the spotlight."
- Theming is also the political answer to "we need our own design system" (Coinbase built Themes after exactly that demand — same architecture, fully distinct skins, eventually customer-facing).
- **Color math** (Evil Martians): use OKLCH so color is *programmable* — rotate hue at fixed lightness/chroma for cohesive accessible families; hover/pressed = arithmetic on L (base + 0.1); dark theme = mirror lightness, keep chroma and hue. Change the brand color, everything recomputes. (Mechanics in `oklch-skill`.)
- **Tooling**: Nate Baldwin's **Leonardo** (leonardocolor.io, Adobe OSS) generates palettes *from target contrast ratios* — adaptive themes (brightness/contrast/saturation dials), CVD simulation, and Design Tokens output with per-swatch contrast + usage notes baked in. Contrast-first generation beats hand-checking every pair.
- Outcome proof (Zalando): engagement doubled, 40+ luxury brands onboarded the next month; 120+ components themed.

## Component API design

- **Variant math forces the decision**: a 16-variant button becomes 80 with an icon variant, 160 with leading+trailing — use **props** instead (icon in an offset frame so designers never detach; code just halves the padding). Variants visualize *states*; props signal *what's overridable*; props can cut component weight ~50% (Figma 2024).
- **Split-the-set tests** — split if either answer is no: (a) is every option crystal clear to a consumer on sight? (b) is every variant used interchangeably in the same use cases? (The cautionary tale: a tracked set with **>20,000 variants**.) Nathan Curtis's diminishing returns: every addition raises cost and dilutes per-component value.
- Order props so related ones stack; action-verb names for booleans; expose nested instances only when key to flows — past an inflection point exposure becomes information overload.
- Spec the invisible: i18n/long-string behavior (truncate vs wrap vs swap), focus-visible, tab order, ARIA, reflow — "code-only concerns designers skip" (Albaugh/Bergman).

## Design–code parity

- "**Pixel-perfect code is often not the right code. The perfect code is aligned to design intent, not pixels**" — four 25% columns become flex-and-gap math; design and code "approach the same destination from different origins," and non-parallel abstractions are fine (Albaugh/Bergman).
- The source of truth is an **"evergreen technical component specification"** shared by design and engineering (Uber) — in a multi-platform company "which codebase?" is unanswerable, so the spec is everything. Never hand engineers a picture: "if a picture is worth a thousand words, a development comp is worth 10,000 different front-end solutions" (Alaska).
- Reframe automation as "**what should be left to touch**" — the flexibility/consistency line is a question of touch. Target "100% of what we can build *together*," not "70% of what I designed."
- Survey datum (Figma's "Decode the Developer," n≈200): **55% of front-end devs wish they were included earlier in design; only 43% work with designers daily.** "Great collaboration isn't throwing designs over a wall" (Mounter).

## Governance, federation & contribution

- **"Federated is the only model that works in large organizations. Design by committee — the worst idea — is actually the best way to get adoption"** (Rahimi, ex-Microsoft/Uber). The working shape: **core team** builds only high-value shared components and guards quality, says *no* to feature-team one-offs; **extension libraries** own anything unique to one product; when **two products** need a thing, the extension contributes it to core. Decisions are made *with* experts pulled from each app; the core team then "normalizes the decision, documents it, shares it."
- **One ecosystem, one system**: unless a product has its own design language *and* token system, it's part of this design system — "'we have our own design system' claims are miscommunication that creates chaos."
- **Move up the stack as you mature** (Coinbase): primitives → complex components (whole screens, empty containers — DS-owned) → **product components** (data + business logic, co-owned via bespoke libraries built in time-boxed sprints with a product-team "ambassador" who goes home an evangelist). Some shared patterns legitimately live as **Figma-documented only, never coded**.
- New apps are allowed to break the rules — they're exploring the system's next version (Microsoft Loop). Respect the platform over the brand: "designing for Android: 80% Android, 20% Microsoft."
- **Deprecation is a feature**: visual "deprecation mode" (shaded/renamed components — Verizon), migration plans tested simplest → most complex → real files, branch + Dev Mode link, merge published in sync with code release. "Almost everything you make in the system, no matter how good, will run its course" (PJ Onori). The DS moves slower than product — no riff-publishing ("is this the flavor of the week?").

## Adoption is a measured product

- **"We never stop the business for the sake of adoption"** (Uber rule #1). Mature surfaces adopt more; exploring products adopt less, and that's natural.
- **~80% is the golden standard** — "the entire experience cannot be design system"; the differentiated 20% *shouldn't* be. Measured per screen (Uber's UTRA dashboard + on-device overlay flagging base/not-base + a11y); Coinbase went single-digit → **94% in four years**, tracked in Datadog and reported to execs every 2–4 weeks.
- The adoption diagnostic questions (Coinbase): Does anyone *need* this component? Is anyone *incentivized* to do the adoption work? Does anyone *know* it exists? Is it usable and documented? ("We'd build things and people just didn't realize they were available.")
- Mandates never work; measure **breadth** (teams using it) and **depth** (% of layers in shipped files derived from the DS); adoption data is product research — "it drives roadmaps." Reward contribution formally: **put DS contribution in leveling charts and performance reviews**; attribute adoption of contributed components to their contributors.
- Champions come in two kinds — the already-enthusiastic (find via library analytics, branch proposals) and the influential (managers, long-tenured) — arm both with reusable education materials.

## Team design

- "Part of designing the system is designing the team." Reference shapes: Coinbase = 3 design ICs + <10 engineers + specialists (a11y, motion, content, iconography) under one manager; Uber started with **3 volunteer iOS engineers** and took a year of leadership work to win 12 dedicated ones — "if you don't have a strong engineering team, everything stays in Figma and the design investment is meaningless." Design engineers are "the superpower of the design system team."
- An **expression team** (motion + icons + illustration) inside the DS org draws the line between brand-owned and product-owned visual decisions — "a lot of brand-led decisions actually hurt the experience inside the app."
- Patience: Fluent "took eight years — eight years of inconsistency." The Frankenstein phase is part of the journey.

## Field operations (Atlassian, Booking.com, GitHub, Back Market — Config 2024)

- **Define adoption as a ratio with a denominator**: adopted ÷ (adopted + native/custom/third-party/hard-coded), per offering (Atlassian: buttons 67% vs color tokens 98% in Jira) — and split **existing code vs new code** (50% existing, "80% of all new development," target ~90% of new dev). **Not all adoption is good adoption**: 33% of Jira's buttons were detached/overridden instances — high numbers don't make sweeping changes safe.
- **Sell developer productivity while the visual refresh isn't ready**: "saving about 130 engineering years this year… building layouts about 35% faster with up to 80% less code." **Primitives beat the 20th card component** — help developers compose instead ("90% of all new layouts use our primitives").
- **Shift enforcement left**: ~100 ESLint rules + codemods surface DS guidance in the IDE; migrations needing product decisions auto-generate tracked issues; and for big changes the **DS team does the migration itself** (feature-flagged, dogfooded) — months → days, at the cost of owning unknown product code ("a fine line between defining what good is… and policing everyone").
- **Release discipline** (Booking): breaking changes **once a year** with a one-month preview + automated migration scripts; monthly role-scoped changelogs; a **design API** enforcing cross-component prop-name consistency ("it's called a start icon in buttons *and* in input fields"); **slots over opinionated components** ("product teams evolve faster than we can support — flexible containers + strict guidelines"); build *integrations* before features (the icon pipeline generalizes to illustrations). Their study: most user time is lost in **documentation** — docs quality is the highest-leverage multiplier.
- **Dark mode is an adoption trojan horse** (GitHub): a wildly popular feature that *visibly exposes* non-compliant UI. And beware the **values oasis**: an autonomous DS team drifting from how the org works — "the longer you've been working in a branch without pulling from main, the more conflicts you'll experience." DS is "a shared responsibility between engineering, product and design"; org placement (design org vs eng org) is a real lever. (The oasis concept is Will Larson's, lethain.com/values-oasis — his durable rule: "**lead through ambiguity, and advocate through disagreement**" — model solutions where process is *missing*; where values *conflict*, advocate for org-wide change rather than modeling a private alternative, or the oasis dries up when you leave.) Tension to hold: Atlassian says adoption "needs to be ground up — if your designers don't like it, it's not going to make it into your product"; GitHub's survival story is all leadership alignment. Both, scale-dependent.
- **A/B test the system** (Back Market): DS teams "make decisions without fully understanding the business implications" — test component changes *product-wide* (a focus improvement helps on one page, pays off on the next; single-page tests misread it). Architecture: per-component bundle splits + a proxy component that picks A/B from a feature flag — no app-code changes, no throwaway code. Humility datum: their expert-intuition star-icon refinement **decreased** conversion — "we want evidence to protect us from ourselves."

## Counter-position: consistency without commodification (Cam Worboys, Cash App)

- "Most design systems I see today are just glorified component libraries." Components don't guarantee quality — he built the worst possible screen entirely within the system; "a poor quality product is the result of bad decisions, not a bad system." The missing layers: **patterns (rules) + product primitives + governance** — a *recipe book*, "quality as an outcome of doing the right things… ingredients alone are not enough to make you a good cook."
- **The speed paradox**: a DS screen took 12 minutes vs 2 hours freehand — but the slow version "designed new and exciting ways." "Great ideas never start with a system, they start with a sketch." Workflow fix: **create-then-lint** — design the ideal screen ignoring the system, then run a linter to translate it into compliance ("give designers more permission to create and then help them translate"). Wise built plugins translating whole screens at scale.
- **The sea of sameness**: "our strive for consistency is coming at the cost of commodification… we cannot conflate consistency with a complete lack of expression." Be "deliberately different… because what's different gets remembered and what's remembered wins" (Wise spent 700 hours on its headline typography; Cash themes the app hot-pink when you buy a hot-pink card). Hold this against the panel's consistency goals — both are true; the failure mode is shipping only the functional half.
- (AI extension from Superside: store the DS **plus unstructured brand data** in one knowledge graph — graph RAG gives token-exact retrieval *and* brand-level abstraction; fine-tune image models (LoRA) on brand art and bring generation back inside the design tool. "That ground truth of your design data is the most valuable thing there is.")

## Systems are a dial, not a switch (MDS)

- Size the investment to the pain: "is this design system solving a legitimate problem? And if it is, how deep do we need to go?" Sometimes "maybe everybody just Pinky promises we're going to use four" and multiples of four beats building a spacer component.
- Explore **outside** the system: "it's almost critical that you don't have a system when you're when you're exploring new ideas" — and "Sometimes it's nice to just break the system completely and then rebuild it in a way that makes more sense to you." (Rhymes with Worboys's create-then-lint above.)
- Loop back: re-evaluate early components as the system grows around them rather than letting them ossify.
- Warning for careers, not just systems: designers who've only ever assembled from a DS lose generative craft — "I'm not even sure where to begin. I've just always used this design system… I just don't even know how to inject any craft."

## Handoff is communication, not a file (MDS)

- "the term handoff is not even really a great way to look at it" — Andy Ingram: the concept "has a strong smell of waterfall." It's an ongoing conversation, not a deliverable.
- Declare your grid as an error-correcting code: "if you see something that's like 27 pixels you know go ahead and feel free to make that 28 or 32" — the stated system lets developers fix your slips.
- Ship at "about 90 complete" with a wiggle-room map: tell developers "which parts of the design are set in stone and which are flexible" — the last 10–20% "is going to have to happen in the browser."
- Cover the four forgotten states — "error empty loading overflow" — plus an interactive-state pack: hover/focus/disabled, motion references, tab order.
- Follow up on a 1/3/5-day cadence, and check the ego at the door: "i need to lose my ego about my great design and and actually listen to the person who's going to be coding it up."

## The design system as AI context

- "The best time to invest in design systems — LLMs are really good at understanding the structure of a design system" (Weekes). Default prompt-to-app output converges on the same generic look; **your DS fed as context (Code Connect, token JSON, component specs) is how generated UI keeps your identity.**
- **Designers write the first draft of the prompt** when product UX is determined by AI behavior (Mounter) — and compare models on your actual use case before defaulting to the fancy one. Use generation's non-determinism as exploration: same prompt 3×, fan out, then build the real component with system touch.
- DS knowledge bots need RAG with permission-awareness and clickable citations; wishlist patterns: AI compliance linting, context-aware approved copy, accessibility assessment.
- Keep the *why* attached to the *what*: rationale scattered across docs/Slack/Jira kills adoption — centralize or link it.
- **Build bricks** (Ryo Lu, Cursor): "because AI is really good at composing parts… we need to like build bricks. Really good bricks" — suck the core patterns out of shipped product into the system so agents compose instead of reinvent. The DS/design team's emerging job: "help people like D slop" — engineers throw a Figma mock at an agent and lose exactly the details the mock encoded ("you want this easing curve to be exactly this value… the AI won't know what that is"). The designers' edge to build on: "AI really sucks at the things you all are good at. It's like all the details that we care about."

## Checklist

- [ ] Does the system have stated opinions someone could violate — and a listening loop for when they do?
- [ ] Token pyramid: primitives → minimal semantic set (~tens, not hundreds) → rationed *private* component tokens only where assessed?
- [ ] Theme names identical across themes; theming scope explicitly bounded (no layout/motion/new-feature theming)?
- [ ] Component sets pass the two split tests; props over variant explosions; invisible states specced?
- [ ] An evergreen spec as source of truth — not pictures thrown over a wall?
- [ ] Federation rules written: who owns, who extends, when extensions graduate to core, who may break rules?
- [ ] Adoption measured (breadth + depth, ~80% target), reported on a cadence, and rewarded in reviews?
- [ ] Deprecation pathway designed (visual mode, tested migrations, code-synced releases)?
- [ ] DS wired into AI tooling as context (Code Connect / token exports), with designers owning first-draft prompts?

## Relationship to other skills

- **`liquid-glass-design-system`** — consuming Apple's *platform* design system; this skill is about *owning* one. The panel's "respect the platform: 80% Android, 20% Microsoft" is the bridge rule.
- **`ios-brand-identity`** — where brand may live inside a platform's system; this skill governs the brand's own token/theming machinery.
- **`oklch-skill`** — the color math behind programmable tokens (hover = L+0.1, dark = mirror L).
- **`apple-typography`** — type mechanics (grade, optical sizes, metrics) that a DS's type layer must encode.
- **`devtool-interface-design`** — the DS team's tooling (dashboards, linters, theming editors) is an internal devtool; its onboarding/AX rules apply.
- **`agentic-coding`** / **`design-prototyping`** — DS-as-AI-context is the constrained-generation stance applied to UI; prototype-with-the-system before codifying ownership.
- **`design-principles`** — Craft/Simplicity judge individual components; this skill governs the system that mass-produces them.

> **Staleness note (Kevin's rule):** auto-captioned 2024–25 talks; tool specifics (Figma variables/modes/Code Connect/Dev Mode, UTRA, Datadog wiring) are point-in-time — verify against current docs. The governance, token-architecture, and adoption rules are the durable layer.
