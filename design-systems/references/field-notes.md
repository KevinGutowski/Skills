# Design Systems — Field Notes

Depth moved out of SKILL.md: full source list, worked examples, outcome numbers, and playbook specifics. SKILL.md keeps the rules and one load-bearing quote per lesson; this file keeps everything else.

## Contents

- [Full source list](#full-source-list)
- [Intuit: the token death spiral](#intuit-the-token-death-spiral)
- [Zalando: multi-sub-brand worked example](#zalando-multi-sub-brand-worked-example)
- [Field operations details (Atlassian, Booking, GitHub, Back Market — Config 2024)](#field-operations-details-atlassian-booking-github-back-market--config-2024)
- [MDS: handoff mechanics](#mds-handoff-mechanics)
- [Apple WWDC 2017 session 809: the designer↔engineer layer](#apple-wwdc-2017-session-809-the-designerengineer-layer)
- [Atlassian: the DS-as-AI-context playbook](#atlassian-the-ds-as-ai-context-playbook)
- [Worboys counter-position details](#worboys-counter-position-details)
- [MDS: systems are a dial details](#mds-systems-are-a-dial-details)
- [Dive Club deltas — full quotes](#dive-club-deltas--full-quotes)
- [Motion as a design-system layer (Nabors)](#motion-as-a-design-system-layer-rachel-nabors-animation-at-work-a-book-apart-2017)
- [MailChimp pattern-library prework](#mailchimp-pattern-library-prework-the-ux-reader-2014)
- [Soleio: UFI, Canon, and the Dropbox illustration strip-out](#soleio-ufi-canon-and-the-dropbox-illustration-strip-out)
- [Misc details](#misc-details)

## Full source list

Moved to [sources.md](sources.md).

## Intuit: the token death spiral

(Nate Baldwin, Intuit, Config 2024)

- The math: **1,347 component tokens × 13 themes × light/dark ≈ 35,000 tokens**. Teams imported all of them to reference one value.
- Cure: a **minimal semantic set** "reusable across the widest range of use cases, named with enough specificity to be useful," plus a formalized taxonomy.
- Payoff: TurboTax's full visual refresh shipped "in weeks rather than months."
- Companion failure: Intuit's "20% of a product may be uniquely styled" rule died because nobody could measure it — rules must be actionable and enforceable or they're vibes. Contrast Uber's ~80% adoption target, which works because dashboards measure it per screen.
- "We were so loosey-goosey it's hard to say if we had a design system" — internal customers "wanted us to tell them no from time to time."
- Theming workshops deadlocked on abstract constraints; building a live theming editor first let designers react to something real — "opinions should be rooted in a vision."

## Zalando: multi-sub-brand worked example

(Config 2024)

- **Token refinement**: pure-semantic also fails ("we would have ended up with a huge list") — keep component tokens, but rationed: a carefully assessed, limited set, **kept private/unpublished** so consumers never see them.
- Their whole color system: **~35 semantic tokens** — one shared hover token, one pressed token, one disabled-opacity token (transparent works on any background).
- Token system and first theme were built **in parallel**; governance principles were written only after theme #1 shipped.
- Theming frame: "how much variation can we allow without breaking the experience, and what level of brand integrity do we want to maintain?" Often what looks like sub-brands is *distinct categories of one product* needing graded distinction.
- Themes explored on an **incremental / evolutionary / revolutionary** spectrum; each theme's personality derived by **re-weighting existing brand character traits** (luxury = more values-driven, less playful) so themes extend brand architecture rather than fork it.
- Scope rules that held: theme everything **except major layout, motion, and new features**; theme display/headline type only (body styles are too widely embedded); tactical colors (error/success) identical across all themes.
- Governance principles after theme #1: "**one page, one theme**" and "prioritize coherence — no theme steals the spotlight."
- **Outcomes**: engagement doubled; 40+ luxury brands onboarded the next month; 120+ components themed.

## Field operations details (Atlassian, Booking, GitHub, Back Market — Config 2024)

- **Atlassian — adoption as a ratio**: adopted ÷ (adopted + native/custom/third-party/hard-coded), per offering (buttons 67% vs color tokens 98% in Jira); split existing code vs new code (50% existing, "80% of all new development," target ~90% of new dev). **Not all adoption is good adoption**: 33% of Jira's buttons were detached/overridden instances — high numbers don't make sweeping changes safe.
- **Atlassian — sell developer productivity** while the visual refresh isn't ready: "saving about 130 engineering years this year… building layouts about 35% faster with up to 80% less code." Primitives beat the 20th card component — help developers compose instead ("90% of all new layouts use our primitives").
- **Atlassian — shift enforcement left**: ~100 ESLint rules + codemods surface DS guidance in the IDE; migrations needing product decisions auto-generate tracked issues; for big changes the **DS team does the migration itself** (feature-flagged, dogfooded) — months → days, at the cost of owning unknown product code ("a fine line between defining what good is… and policing everyone").
- **Booking — release discipline**: breaking changes **once a year** with a one-month preview + automated migration scripts; monthly role-scoped changelogs; a **design API** enforcing cross-component prop-name consistency ("it's called a start icon in buttons *and* in input fields"); **slots over opinionated components** ("product teams evolve faster than we can support — flexible containers + strict guidelines"); build *integrations* before features (the icon pipeline generalizes to illustrations). Their study: most user time is lost in **documentation** — docs quality is the highest-leverage multiplier.
- **GitHub — dark mode as adoption trojan horse**: a wildly popular feature that *visibly exposes* non-compliant UI.
- **GitHub — the values oasis**: an autonomous DS team drifting from how the org works — "the longer you've been working in a branch without pulling from main, the more conflicts you'll experience." DS is "a shared responsibility between engineering, product and design"; org placement (design org vs eng org) is a real lever. The oasis concept is Will Larson's (lethain.com/values-oasis); his durable rule: "**lead through ambiguity, and advocate through disagreement**" — model solutions where process is *missing*; where values *conflict*, advocate for org-wide change rather than modeling a private alternative, or the oasis dries up when you leave.
- **Tension to hold**: Atlassian says adoption "needs to be ground up — if your designers don't like it, it's not going to make it into your product"; GitHub's survival story is all leadership alignment. Both, scale-dependent.
- **Back Market — A/B test the system**: DS teams "make decisions without fully understanding the business implications" — test component changes *product-wide* (a focus improvement helps on one page, pays off on the next; single-page tests misread it). Architecture: per-component bundle splits + a proxy component that picks A/B from a feature flag — no app-code changes, no throwaway code. Humility datum: their expert-intuition star-icon refinement **decreased** conversion — "we want evidence to protect us from ourselves."

## MDS: handoff mechanics

(Matt D. Smith, Shift Nudge — youtube 4p5LzrAYN30 · PFi9WfNUlps)

- "The term handoff is not even really a great way to look at it" — Andy Ingram: the concept "has a strong smell of waterfall." It's an ongoing conversation, not a deliverable.
- Declare your grid as an error-correcting code: "if you see something that's like 27 pixels you know go ahead and feel free to make that 28 or 32" — the stated system lets developers fix your slips.
- Ship at "about 90 complete" with a wiggle-room map: tell developers "which parts of the design are set in stone and which are flexible" — the last 10–20% "is going to have to happen in the browser."
- Cover the four forgotten states — "error empty loading overflow" — plus an interactive-state pack: hover/focus/disabled, motion references, tab order.
- Follow up on a 1/3/5-day cadence, and check the ego at the door: "i need to lose my ego about my great design and and actually listen to the person who's going to be coding it up."

## Apple WWDC 2017 session 809: the designer↔engineer layer

(*"Communication Between Designers and Engineers"*, lost session, via WWDC Index archive)

- **Same terminology** — use platform-correct names (that "pop-up/modal" is an *Alert*; it's a *Navigation Bar*, a *Tool Bar*, a *Switch* — not header/drawer/toggle); the HIG and API reference docs are the shared dictionary. Cheap fixes: a 30-minute terms-only postmortem, or a report of breakdowns caused by terminology confusion.
- **One source of truth** — agree up front on the "single place where all of the approved deliverables can be accessed"; no mockups-on-a-server + strings-on-a-wiki + assets-by-email.
- **Thoughtful focus before custom UI** — write down all use cases together, start from "standard patterns and resources you get for free in the SDK" (free accessibility, stable implementations), and "build accessibility considerations up front"; *then* ask whether custom is worth it.
- **"Show more than tell"** — an animation spec = curve graphics + parameter value pairs + "the exact API reference," coupled with a video; designers opening Xcode (asset catalog, storyboards, the object library's real control names) pays twice: "Using the same tool helps build empathy, keeps you informed, and thereby build credibility." Review face-to-face while in context — "grab your designer or engineer teammate while your project is still open and before you're about to check in your work." (Prototyping tiers and tooling → `design-prototyping`.)

## Atlassian: the DS-as-AI-context playbook

(Louis Healey & Kyler Hall, Dive Club, CqMZTg7L-wE — the most complete field implementation of DS-as-AI-context to date)

- **Pre-coded template hybrid — hand-code the chrome, let AI modify.** Don't make the model generate your shell from instructions; give it a working template: "the agent… is actually very, very good at just changing the code that already exists, when before… it was taking nothing and trying to build everything." Error rate "from maybe half of the prototypes [having navigation issues] to probably nearly zero." Chrome fidelity is what the template buys: before it, "people were spending like maybe two or three hours just trying to get that topnav and side navigation pixel perfect, because that's what makes you feel like you're in an Atlassian experience" — and customer tests need that frame to read as real.
- **Config-object constants kill recurring hallucinations.** The model's pre-trained knowledge "would just pull in a really old Jira logo" — fixed by "a configuration object of just some hard constants" (logos, brand values) the agent reads instead of remembers.
- **Recipes for add-ons:** "a code blob with some instructions" per modification (e.g. paste-in dark-mode switch) — packaged moves for the things the template doesn't cover.
- **AI legibility is now a naming criterion.** Every component doc carries "a translating from Tailwind section — if you see these class names, actually it should be this React code" (Healey). And the naming question has a new judge: "why do we call it a lozenge component if the industry doesn't have a lozenge component, or why do we call our prop appearance versus variant" (Hall) — idiosyncratic names the model can't predict are a tax you now pay per generation.
- **Curate, don't dump.** "We try and describe, I guess, the 80% mark for most of these components… if you give it all of those different types, it will hallucinate more and more" and start cross-breeding props. Their context file: ~5,000 lines vibe-coded at first, "settled on something more 2 to 3,000 lines" covering 20–30 components — not the full library.
- **Generate docs from the monorepo.** The old failure: "if we want to document something, [we] document in five different places." Docs now derive from the code source of truth, so the AI context can't drift from the components.
- **The remit explosion.** "The design system remit has just blown up into like anyone in the organization can essentially ship" — the DS team's surface is no longer "just this 1% box that is the design system" but everyone whose agent emits UI. Plan headcount and docs for that audience.
- Enablement and adoption mechanics around all this (pilot teams, distribution, training) → `working-with-ai` (ai-enablement).

## Worboys counter-position details

(Cam Worboys, Cash App — Dive Club, KH9GBasDTI8)

- Components don't guarantee quality — he built the worst possible screen entirely within the system; "a poor quality product is the result of bad decisions, not a bad system." The missing layers: **patterns (rules) + product primitives + governance** — a *recipe book*, "quality as an outcome of doing the right things… ingredients alone are not enough to make you a good cook."
- **The speed paradox**: a DS screen took 12 minutes vs 2 hours freehand — but the slow version "designed new and exciting ways." "Great ideas never start with a system, they start with a sketch."
- Create-then-lint at scale: Wise built plugins translating whole screens into compliance.
- Expression examples: Wise spent 700 hours on its headline typography; Cash themes the app hot-pink when you buy a hot-pink card. "Be deliberately different… because what's different gets remembered and what's remembered wins."
- AI extension (Superside): store the DS **plus unstructured brand data** in one knowledge graph — graph RAG gives token-exact retrieval *and* brand-level abstraction; fine-tune image models (LoRA) on brand art and bring generation back inside the design tool. "That ground truth of your design data is the most valuable thing there is."

## MDS: systems are a dial details

- Size the investment to the pain: "is this design system solving a legitimate problem? And if it is, how deep do we need to go?" Sometimes "maybe everybody just Pinky promises we're going to use four" and multiples of four beats building a spacer component.
- "It's almost critical that you don't have a system when you're when you're exploring new ideas" — and "Sometimes it's nice to just break the system completely and then rebuild it in a way that makes more sense to you."
- Loop back: re-evaluate early components as the system grows around them rather than letting them ossify.
- Career warning: designers who've only ever assembled from a DS lose generative craft — "I'm not even sure where to begin. I've just always used this design system… I just don't even know how to inject any craft."

## Dive Club deltas — full quotes

- **Primitives once, extrapolated forever** (Brian Lovin, Notion, dvEwb1Ajkwo): "if you spend the time really really really sweating the details on a good set of primitives once, AI's so good at not only reusing, but also extrapolating" — e.g. "take that general idea and just extrapolate it" when a tertiary button moves to a taller card. The economics of DS investment flip: hand-sweat the primitive set, let agents do the long tail.
- **The landfill warning** (Luis Ouriach, Figma, Pn2G7JhxNKc): "the less we invest in a system, the more we're going to generate just honestly rubbish into our systems that will just pile up like a landfill over the next couple of years, and somebody's going to have to fix it." The alternative: "treat those systems as a centerpiece for change" or budget for the consultant who shovels it later.
- **Drop the label** (Ouriach): "taking the label of design system off what we're doing is going to help. It's going to bring you out of the corner and out of the silo and to the center of an organization's change" — reframe from "what is a component" to "the company's system of approaching acceleration."
- **Over-tokenization** (Ouriach): "an over-tokenization of something can mean it's so robust we can't deviate from it." Place yourself on the experimentation↔commitment line per product stage — and re-ask the question now that agents read raw values in seconds: "does the tokenization actually help you at that point?" (Complements Baldwin's opinions-are-the-product: tokens encode opinions; too many encode paralysis.)
- **Siblings, not twins** (Cam Worboys, KH9GBasDTI8): multi-brand DNA done right is "shared foundations that make it feel like it's a block designed product, whether that's type, some shared like base tokens, approach to the grid, and then there are these unique personalities that get put on top of it that allow each of the brands to shine."
- **Peak library?** (Steven Haney, Y0n6F9VlLVc): "is this peak library?… because everyone's building with them, the AI trains on them more. It gets better at them" — established stacks have AI-gravity; weigh that lock-in when planning a DS's underlying stack.
- **Codify late** (Derek Briggs, PixelJanitor — Dive Club S4 "Creating a design culture of craft"): build a component, use it in a few places, and "allow the API [to] create itself based on the usage" (bracket fixes a caption garble) — only then document it into the system. Codifying on first use freezes a guessed API; usage reveals the real one.
- **Build bricks** (Ryo Lu, Cursor, Dive Club + Dialectic '25): "because AI is really good at composing parts… we need to like build bricks. Really good bricks" — suck the core patterns out of shipped product into the system so agents compose instead of reinvent. The DS/design team's emerging job: "help people like D slop" — engineers throw a Figma mock at an agent and lose exactly the details the mock encoded ("you want this easing curve to be exactly this value… the AI won't know what that is"). The designers' edge to build on: "AI really sucks at the things you all are good at. It's like all the details that we care about."

## Motion as a design-system layer (Rachel Nabors, *Animation at Work*, A Book Apart, 2017)

- **Timing scales as tokens** (ch. 3, "Anatomy of a Web Animation"): "Just as with easings, durations can be arranged into reusable sets, with different durations for color changes, localized reactions like button presses, and large movements… we can use timing scales. The concept is similar to modular scales in typography: all values are related, and if you combine them with a vertical rhythm, a piece exhibits overall harmony." "You can generate a timing scale the same way you generate a typographic scale" — her example is Fibonacci-inspired (100 + 300 = 400, 300 + 400 = 700), which makes it "easy to line overlapping animations up to end at the same time." Salesforce's Lightning Design System "uses timing scales to let developers tokenize their timing values."
- **The orchestra metaphor** (Amy Lee, "prototyper at Salesforce by day and musician by night," who first introduced Nabors to interlocking timing values on Lightning): a timing scale "is about an agreed-upon synchronization of animation choreography. Imagine how an orchestra might play together. Without a common timing system, each player would drift through the score at their own rate. However, if we agree that a quarter note is 400ms long, then we all can play together at a peppy tempo of 150 beats per minute."
- **Microanimation vocabularies** (ch. 4, "Communicating Animation"): combine easing + duration + properties "to create microanimations with descriptive names like 'pop,' 'fade,' and 'slide.'" Microanimations compose into macroanimations — "a modal that fades onto the screen then pops to grab user attention. We might then label that combined animation as an 'alert,' and use it over and over again." Codified, they "form animation vocabularies that yield huge benefits when it comes time to document visual deliverables with text." Lightning ships these as composable presets — "Salesforce engenders brand compliance by providing easy-to-reach-for defaults," choosing "to lead by examples and easy, composable presets, providing a path of least resistance" over lengthy rationale docs.
- **Pave the onomatopoeia cowpaths**: "Many of these microanimation names start as friendly onomatopoeias around a meeting room table: swoosh, zoom, plonk, boom." People "hold a sound longer to indicate extended duration: 'Can you make it more like *voooooosh* and less like *voosh*?' It makes sense to 'pave the cowpaths' and adopt the words your company is using already."

## MailChimp pattern-library prework (*The UX Reader*, 2014)

- **Refactor before the redesign screenshot exists.** MailChimp started months before seeing the new look, combining repeated CSS into reusable patterns so the redesign had a substrate. Their proxy metric was total CSS size; before launch they "managed to cut about 120k from our CSS."
- **Pattern library as shortcut + test page.** The first internal "cheat sheet" gave front-end developers a faster way to use shared classes and a page that exposed whether pattern CSS changes broke app screens.
- **Systemize the boring surfaces.** The slat pattern began on high-traffic dashboards, then generalized to Segments, Conversations, and Exports. The payoff was speed plus quality: "Adapting our slat system to the Exports dashboard took me all of 45 minutes," including mobile.
- **Parallelize foundation and interior.** One group refined the slat pattern while others worked forms, page structure, and navigation; the shared system let them work independently from "a common place."

## Linear theme tooling and redesign substrate

- **Minimal inputs, generated aliases.** Linear's redesign moved theme creation toward three knobs: base color, accent color, and contrast. The system then generated aliases for surfaces, text, icons, controls, elevated layers, and translucent parts. This keeps theme variation coherent because teams adjust relationships, not dozens of independent swatches.
- **Contrast as a product token.** Contrast is not only an accessibility audit after the fact; it is an input that can generate higher-contrast themes and make light/dark modes more legible without forking the palette.
- **Live product as the color editor.** During the 2026 refresh, Linear used an internal dev-toolbar color picker exposing hue, chroma, lightness, contrast, and individual design tokens. People could experiment in the actual app, share recipes, copy token JSON, and import it into Figma. This inverts the usual laggy loop of Figma mock → PR → preview → review.
- **Chrome chroma budget.** The refresh limited how much Linear's blue influenced chrome calculations so the product felt more neutral and timeless. Treat brand color in dense tools as a scarce resource: too much tint makes the workbench feel saturated and competes with content.

## Soleio: UFI, Canon, and the Dropbox illustration strip-out

Soleio Cuervo (early Facebook design, Dropbox Head of Design); quotes are verbatim auto-caption text, garble fixed in [brackets]; video IDs in [sources.md](sources.md).

- **Ship the controversial feature as a rider on consolidation** (Soleio, Design MBA): the Like button reached production inside a platform-consolidation project — "we staffed a project that we called the ufi the universal feedback interface… we had years of commenting code across all the different products and features that we had built that needed to be standardized we needed to have one component for how it appeared to the end user one point of integration into privacy into Newsfeed into all the algorithms and ideally like a an interface that could be hot swappable across different contexts." The DS lesson cuts both ways: standardizing scattered implementations into one component is real system work — and the consolidation project is also how a years-blocked feature gets to ship.
- **Icon choices are brand decisions** (Soleio, Design MBA): thumbs-up beat heart/star "because of poke and because of the universality of the hand as a visual symbol it just felt very face Booky to use a hand" [Facebooky].
- **Facebook's first UI library was named Canon** (Soleio, Cults & Culture): "we had our our first UI Library we called Canon" — naming the library is part of making the system an institution rather than a folder.
- **The Dropbox illustration strip-out** (Soleio, Cults & Culture): "we had gone through a short work Sprint where we stripped out all the illustrations from Dropbox and it felt cold and utilitarian and… we sort of lost the soul of of the business." The reversal's rationale: "we are visual communicators we can convey really abstract Concepts visually in a manner that like no 10 or 12 or 15 words can really capture" (e.g. the laptop-on-fire support illustration) — and it led to "an official illustration team." Expression layers (illustration, motion, icons) are system content, not decoration; cf. the expression-team rule in SKILL.md's Team design section.

## Misc details

- **Quality-infrastructure frame** (Henry Modisett, Linear quality series): "you can invest in systems that make it hard to make things bad… if you make it so hard to make a bad button, you're going to have less bad buttons."
- **Alaska Airlines token origin story**: tokens were born from an accessibility failure — every engineer "invented a new blue" until one set of subscribed values existed. Consistency across separately-owned UIs emerged "truly because of the discipline of the design system and the use of design tokens," with no overseeing design lead.
- **Leonardo** (Nate Baldwin; leonardocolor.io, Adobe OSS): generates palettes *from target contrast ratios* — adaptive themes (brightness/contrast/saturation dials), CVD simulation, Design Tokens output with per-swatch contrast + usage notes baked in. Contrast-first generation beats hand-checking every pair.
- **Variant math** (Figma 2024): a 16-variant button becomes 80 with an icon variant, 160 with leading+trailing; props can cut component weight ~50%; icon in an offset frame so designers never detach (code just halves the padding). Cautionary tale: a tracked set with **>20,000 variants**.
- **Survey datum** (Figma's "Decode the Developer," n≈200): 55% of front-end devs wish they were included earlier in design; only 43% work with designers daily. "Great collaboration isn't throwing designs over a wall" (Mounter).
- **Coinbase team shape**: 3 design ICs + <10 engineers + specialists (a11y, motion, content, iconography) under one manager. Uber started with 3 volunteer iOS engineers and took a year of leadership work to win 12 dedicated ones. Coinbase adoption went single-digit → 94% in four years, tracked in Datadog, reported to execs every 2–4 weeks.
- **Coinbase adoption diagnostics**: Does anyone *need* this component? Is anyone *incentivized* to do the adoption work? Does anyone *know* it exists? Is it usable and documented? ("We'd build things and people just didn't realize they were available.")
- **Coinbase maturity ladder**: primitives → complex components (whole screens, empty containers — DS-owned) → product components (data + business logic, co-owned via bespoke libraries built in time-boxed sprints with a product-team "ambassador" who goes home an evangelist). Some shared patterns legitimately live as Figma-documented only, never coded. Coinbase built Themes after a "we need our own design system" demand — same architecture, fully distinct skins, eventually customer-facing.
- **Deprecation mechanics**: visual "deprecation mode" (shaded/renamed components — Verizon), migration plans tested simplest → most complex → real files, branch + Dev Mode link, merge published in sync with code release. "Almost everything you make in the system, no matter how good, will run its course" (PJ Onori).
- **Microsoft Loop**: new apps are allowed to break the rules — they're exploring the system's next version. Respect the platform over the brand: "designing for Android: 80% Android, 20% Microsoft."
- **Fluent patience datum**: "took eight years — eight years of inconsistency." The Frankenstein phase is part of the journey.
- **AI-context misc** (Config panel/Mounter): compare models on your actual use case before defaulting to the fancy one; use generation's non-determinism as exploration (same prompt 3×, fan out, then build the real component with system touch); DS knowledge bots need RAG with permission-awareness and clickable citations; wishlist patterns: AI compliance linting, context-aware approved copy, accessibility assessment.
