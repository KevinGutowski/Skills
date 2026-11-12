---
name: design-systems
description: "Build, govern, and scale a design system — tokens, theming/multi-brand, governance, adoption as a measured product, DS-as-AI-context, icon systems. Use for creating or auditing a design system or icon set, token taxonomies, adoption planning, or wiring a DS into AI codegen. Apple platform → apple-design; brand marks → logo-design; org AI rollout → working-with-ai. Triggers: design system, design tokens, theming, Code Connect, icon set, icon font."
---

# Design Systems

**References — read on demand:**

- [references/field-notes.md](references/field-notes.md) — worked examples, outcome numbers, full quotes, and playbook specifics behind every rule below. Read the matching section before applying a rule at full depth.
- [references/icon-systems.md](references/icon-systems.md) — interface icon-set method; read for any icon-set build, audit, or migration.
- [references/sources.md](references/sources.md) — source list (9 Figma Config talks '24–25, Dive Club, books); [references/coverage-gaps.md](references/coverage-gaps.md) — unresolved promotion candidates.

A design system is a **product with customers**, not a library: "treat it like a product team — clear OKRs, roadmap, customers — or it won't succeed" (Rahimi). Sell it honestly: "a design system is not the most efficient way to build things… it must have clear business impact and ROI" — the pitch that works is per-stakeholder incentive alignment: "components for free, performance for free, dark mode for free" (Coinbase), accessibility and i18n free.

These rules have a dial, not a switch — read Counter-positions (below) before applying them at full depth.

## Opinions are the product

- **Unopinionated systems fail** (Baldwin, Intuit): internal customers "wanted us to tell them no from time to time."
- But opinions are *listened into existence*: "**if people are breaking the system, it's time the system changed**" (panel).
- Rules must be **actionable and enforceable or they're vibes**: an unmeasurable rule dies (Intuit's "20% may be uniquely styled"); a dashboarded target holds (Uber's ~80%).
- **Build, then constrain — in parallel with the product**: theming workshops deadlocked on abstract constraints until a live editor existed — "opinions should be rooted in a vision" (Baldwin). A system designed fully upfront freezes guesses; one extracted afterwards forces rebuilds (Sten). Don't speculate: "product teams move faster than design system teams — address future needs when they're real" (Albaugh/Bergman). Codify a component after a few real uses (Briggs).
- **Audit what the system amplifies before selling speed** (Sten): efficiency, consistency, and scale only help when the pattern is worth reproducing; a system can also accelerate bad work.
- **Constraints create room to work**: fix requirements early (composition model, token taxonomy, variants/states, theme modes, accessibility, localization) to get a smaller, clearer creative field.

## Token architecture

- **The death spiral** (Intuit): 1,347 component tokens × 13 themes × light/dark ≈ **35,000 tokens**. Cure: a **minimal semantic set** plus a formalized taxonomy.
- **Zalando's refinement**: pure-semantic also fails — keep **component tokens, but rationed and private/unpublished**; their whole color system is **~35 semantic tokens**.
- **Over-tokenization is the symmetric failure** (Ouriach): "an over-tokenization of something can mean it's so robust we can't deviate from it." Tokens encode opinions; too many encode paralysis.
- Naming: short = type + category + function + optional state; **identical names across all themes, only values vary**; negotiate names with iOS + Android + web + design together; mirror codebase syntax onto Figma variables *programmatically*.
- Figma mechanics: raw values as variables; composite tokens (typography, shadows, gradients) as styles wrapping variables; **publish only the styles, hide backend variables, scope variables** — "hide and scope are your best friends."
- **Motion is a token layer** (Nabors): put durations on a **timing scale** like a modular type scale, and name microanimations ("pop," "fade," "slide") with the words the company already uses.
- **Neutral roles and derived tokens** (Kosta, tactile-design): write components against a 12-step neutral's step *jobs*, rerun contrast gates after a remap, and redeclare derived CSS tokens on every surface class. Details: [field-notes](references/field-notes.md#tactile-design-neutral-roles-and-derived-tokens).

## Theming & multi-brand

- Frame as a pair (Zalando): how much variation can we allow without breaking the experience, and how much brand integrity must hold?
- **Siblings, not twins** (Worboys + Zalando): shared foundations (type, base tokens, grid) with distinct personalities on top; derive each theme by **re-weighting existing brand character traits** so themes extend brand architecture, not fork it.
- Scope rules that held (Zalando): theme everything **except major layout, motion, and new features**; theme display type only; tactical colors (error/success) identical everywhere. Governance: "one page, one theme."
- Theming is the political answer to "we need our own design system" (Coinbase Themes — same architecture, distinct skins).
- **Color math** (Evil Martians): OKLCH makes color *programmable* — rotate hue at fixed L/C for cohesive accessible families; hover/pressed = arithmetic on L; dark theme = mirror lightness, keep chroma/hue (→ `web-design` (oklch-skill)). Leonardo (leonardocolor.io) generates palettes *from target contrast ratios*.
- **Linear's theme-generator pattern:** a few intent inputs (base color, accent color, contrast) generate the aliases; tune tokens inside the live product, then sync landed values back to Figma.

## Component API design

- **Variant math forces the decision**: a 16-variant button becomes 160 with leading+trailing icons — use **props** instead. Variants visualize *states*; props signal *what's overridable*.
- **Split-the-set tests** — split if either is no: (a) is every option crystal clear on sight? (b) is every variant used interchangeably in the same use cases? Every addition raises cost and dilutes per-component value (Curtis).
- Order props so related ones stack; action-verb booleans; expose nested instances only when key to flows — past an inflection point exposure is information overload.
- Spec the invisible: i18n/long-string behavior, focus-visible, tab order, ARIA, reflow — "code-only concerns designers skip" (Albaugh/Bergman).
- **Prework before redesign** (MailChimp): harvest repeated UI into reusable patterns before the visual direction lands; keep the pattern library as both shortcut and regression test page.

## Icons are a system asset

A product's interface icon set is a governed sub-system with its own optical sizing, drawing rules, audit infrastructure, and publish pipeline. Read [references/icon-systems.md](references/icon-systems.md) before drawing, auditing, or migrating an icon set. The durable rules:

- **"Sets drift when nobody owns them"** (Minor): inherited libraries drift in style *and* miss product-specific vocabulary. Audit both axes before deciding a redraw.
- **One concept, one icon**: a concepts table pins each product concept to exactly one icon; tag-based search covers the concepts people can't name.
- **Migrate by keeping the addressing scheme stable** — remap every old glyph at the same codepoint/name, retire the rest deliberately, and keep a one-command publish pipeline: "A set that can't grow decays."

## Design–code parity & handoff

- "**Pixel-perfect code is often not the right code. The perfect code is aligned to design intent, not pixels**" (Albaugh/Bergman) — non-parallel abstractions are fine.
- Source of truth = an **"evergreen technical component specification"** shared by design and engineering (Uber) — in a multi-platform org "which codebase?" is unanswerable. Never hand engineers a picture: "a development comp is worth 10,000 different front-end solutions" (Alaska).
- Reframe automation as "**what should be left to touch**." Target "100% of what we can build *together*," not "70% of what I designed."
- **Handoff is communication, not a file** (MDS): declare your grid as an error-correcting code; ship at ~90% with a wiggle-room map; cover the four forgotten states — error/empty/loading/overflow — plus hover/focus/disabled, motion refs, tab order; follow up 1/3/5-day.
- **Apple's designer↔engineer layer** (WWDC 2017 #809): shared platform terminology (it's an *Alert*, not a "modal"), one agreed source of truth, standard SDK patterns + accessibility *before* custom UI, "show more than tell." (Prototyping tiers → `design-prototyping`.)

## Governance, federation & contribution

- **"Federated is the only model that works in large organizations. Design by committee — the worst idea — is actually the best way to get adoption"** (Rahimi). Shape: **core team** builds only high-value shared components, guards quality, says *no* to one-offs; **extension libraries** own product-unique pieces; when **two products** need a thing, the extension contributes it to core.
- **One ecosystem, one system**: unless a product has its own design language *and* token system, it's part of this design system — "'we have our own design system' claims are miscommunication that creates chaos."
- **Keep the system alive, not just written down**: standards go stale as teams and platforms change; give them ownership, contribution paths, and review loops that move at the pace the product learns.
- **Move up the stack as you mature** (Coinbase): primitives → complex components → **product components** (co-owned with a product-team "ambassador").
- New apps may break the rules — they're exploring the system's next version (Microsoft Loop). Respect the platform over the brand: "designing for Android: 80% Android, 20% Microsoft."
- **Deprecation is a feature**: visual deprecation mode, migrations tested simplest → real files, merges synced with code releases. The DS moves slower than product — no riff-publishing.
- **Words are a system layer** (Metts & Welfle): document functional patterns by *purpose*, not exact wording; make content first-class in the system's IA (Polaris); adopt an existing style guide rather than writing your own.
- **Adoption beats perfection** (Sten): a simple system everyone uses beats a perfect library no one reaches for; treat non-use as product feedback.
- **Drop the label** (Ouriach): reframe from "what is a component" to "the company's system of approaching acceleration."

## Adoption is a measured product

- **"We never stop the business for the sake of adoption"** (Uber rule #1). Exploring products adopt less than mature surfaces, and that is fine.
- **~80% is the golden standard** — the differentiated 20% *shouldn't* be system. Measure per screen (Uber's UTRA dashboard + on-device overlay) and report to execs on a cadence (Coinbase).
- **Define adoption as a ratio with a denominator** (Atlassian): adopted ÷ (adopted + native/custom/hard-coded), per offering; split existing vs new code. **Not all adoption is good adoption** — detached/overridden instances inflate the number.
- Mandates never work; measure **breadth** (teams) and **depth** (% of shipped layers from DS), and treat adoption data as product research. Diagnose non-adoption (need? incentive? awareness? usable+documented?). **Put DS contribution in leveling charts and performance reviews**, and arm both enthusiastic and influential champions with reusable education.
- **Field-proven levers** (Config '24): sell developer productivity and **primitives over the 20th card component**; **shift enforcement left** (ESLint rules, codemods, DS team does big migrations itself); release discipline — breaking changes once a year, automated migrations, a design API for prop consistency, **slots over opinionated components**, docs; **dark mode as adoption trojan horse**; **A/B test the system product-wide**.
- Beware the **values oasis** (GitHub, via Will Larson): an autonomous DS team drifting from how the org works. Hold the tension: ground-up adoption (Atlassian) and leadership alignment (GitHub) are both true, scale-dependent.

## Team design

- "Part of designing the system is designing the team." The rule: "if you don't have a strong engineering team, everything stays in Figma and the design investment is meaningless" (Uber).
- An **expression team** (motion + icons + illustration) inside the DS org draws the brand-owned vs product-owned line.

## The design system as AI context

- "The best time to invest in design systems — LLMs are really good at understanding the structure of a design system" (Weekes). Default prompt-to-app output converges on the same generic look; **your DS fed as context (Code Connect, token JSON, component specs) is how generated UI keeps your identity.**
- **Use the DS as the mechanical substrate, not the whole agent standard** (Vercel product-design pattern; Jaytel Taste): expose tokens, component APIs, recipes, allowed composition paths, lintable rules, and canonical product names. Product judgment, exceptions, and surface examples go in routed skills/references; aesthetic taste rules go in a separate, explicit input; missing standards go in coverage gaps.
- **Primitives once, extrapolated forever** (Lovin) and **build bricks** (Ryo Lu): hand-sweat the primitive set and pull shipped patterns into the system so agents compose instead of reinvent; generation without a system "will just pile up like a landfill" (Ouriach). The DS team's emerging job is de-slop.
- **Make the polish layer token-addressable** (Kevin Kold, 2026): export durations, easing curves, spring presets, radii, shadow stacks, press scales, snap thresholds, and state treatments with stable names mirrored 1:1 in Figma and code, so prompts can say "use only these tokens, no one-off values."
- **Designers write the first draft of the prompt** when product UX is determined by AI behavior (Mounter); keep the *why* attached to the *what* — rationale scattered across docs/Slack/Jira kills adoption.
- **The Atlassian playbook** (Healey & Hall): hand-code the chrome, let AI modify a working **template**; **config-object constants** kill recurring hallucinations; **recipes** for add-ons; **AI legibility is a naming criterion**; **curate, don't dump** (~2–3k lines, 20–30 components); **generate docs from the monorepo**; plan for the **remit explosion**. Enablement mechanics → `working-with-ai` (ai-enablement).
- **Give agents a record split by authority, written from the built world** (Impeccable, 2026): PRODUCT.md holds product truth, DESIGN.md holds tokens plus usage prose, a per-surface brief holds one route's strategy. Document after the first build lands, never overwrite an existing DESIGN.md silently, treat off-system values as drift questions, and extract after about three uses *with the same intent*.

## Counter-positions: consistency without commodification

- "Most design systems I see today are just glorified component libraries" (Worboys, Cash App). Components don't guarantee quality; the missing layers are **patterns (rules) + product primitives + governance**.
- **Create-then-lint** (Worboys, MDS): "great ideas never start with a system, they start with a sketch" — design the ideal screen ignoring the system, then lint it into compliance. Explore *outside* the system.
- **The sea of sameness** (Worboys): "our strive for consistency is coming at the cost of commodification." Be "deliberately different… because what's different gets remembered and what's remembered wins." Consistency goals stay true too; the failure mode is shipping only the functional half.
- **Systems are a dial, not a switch** (MDS): "is this design system solving a legitimate problem? And if it is, how deep do we need to go?" — sometimes a pinky-promise spacing scale beats a spacer component. DS-only designers lose generative craft.

## Checklist

- [ ] Does the system have stated opinions someone could violate — and a listening loop for when they do?
- [ ] Token pyramid: primitives → minimal semantic set (~tens, not hundreds) → rationed *private* component tokens only where assessed?
- [ ] Theme names identical across themes; theming scope explicitly bounded (no layout/motion/new-feature theming)?
- [ ] Component sets pass the two split tests; props over variant explosions; invisible states specced?
- [ ] An evergreen spec as source of truth — not pictures thrown over a wall?
- [ ] Federation rules written: who owns, who extends, when extensions graduate to core, who may break rules?
- [ ] Adoption measured (breadth + depth, ~80% target), reported on a cadence, and rewarded in reviews?
- [ ] Deprecation pathway designed (visual mode, tested migrations, code-synced releases)?
- [ ] Icon set owned as a system: one-concept-one-icon table, tracked recurring elements, stable codepoints/names on migration, publish pipeline?
- [ ] DS wired into AI tooling as context (Code Connect / token exports), including motion/shadow/state tokens, with designers owning first-draft prompts?
- [ ] AI context split into substrate (tokens/components/recipes) and expressive taste rules instead of one vague inspiration dump?

## Relationship to other skills

- **`apple-design` (liquid-glass-design-system)** — consuming Apple's *platform* design system; this skill is about *owning* one. The panel's "respect the platform: 80% Android, 20% Microsoft" is the bridge rule.
- **`apple-design` (ios-brand-identity)** — where brand may live inside a platform's system; this skill governs the brand's own token/theming machinery.
- **`logo-design` / `apple-design` (app-icon-design) / `swiftui` (sf-symbols)** — brand marks, app icons, and Apple system-symbol usage respectively; this skill's icon-systems reference owns the product's *interface* icon set. Icon-craft depth methodology (exploration volume, below-noticing corrections) → `design-craft`.
- **`web-design` (oklch-skill)** — the color math behind programmable tokens.
- **`apple-design` (apple-typography)** — type mechanics (grade, optical sizes, metrics) that a DS's type layer must encode.
- **`devtools` (devtool-interface-design)** — the DS team's tooling (dashboards, linters, theming editors) is an internal devtool; its onboarding/AX rules apply.
- **`working-with-ai` (agentic-coding)** / **`design-prototyping`** — DS-as-AI-context is the constrained-generation stance applied to UI; prototype-with-the-system before codifying ownership.
- **`creating-skills` (converting-visual-references-to-skills)** — use when the source is a visual taste corpus; this skill owns actual token/component/spec systems. Do not substitute taste rules for DS context when components, tokens, or governance already exist.
- **`working-with-ai` (ai-enablement)** — rollout, pilots, and training for the AI-context layer.
- **`design-principles`** — Craft/Simplicity judge individual components; this skill governs the system that mass-produces them.

> **Staleness note:** auto-captioned 2024–25 talks; tool specifics (Figma variables/modes/Code Connect/Dev Mode, UTRA, Datadog wiring) are point-in-time — verify against current docs. The governance, token-architecture, and adoption rules are the durable layer.
