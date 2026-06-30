---
name: design-craft
description: "Raise design quality and interface feel through craft methodology, execution values (shadows, spacing, radii, alignment, motion, type), and Linear-style quality rituals/triage. Use to critique or polish UI, build taste, decide wider vs deeper, or make quality practice repeatable. Strategy → design-principles; shaping/bets → shape-up. Triggers: feels off, make it polished, quality ritual, dogfood, unship."
---

# Design Craft

The craft skill: how to raise design quality and make interfaces feel right. It holds two altitudes in one place — a **quality methodology** (this body) for evaluating work and deciding how far to push it, and the **execution values** (references) for the concrete recipes once you know what to build. Decide *how good* and *how far* here; drop into the references when it's time to make the pixels right.

*Sources/gaps: [references/sources.md](references/sources.md) maps the craft corpus; [references/coverage-gaps.md](references/coverage-gaps.md) tracks candidate exemplars/checks. Quote sparingly, always attribute, and send readers to the originals.*

A methodology for consistently producing work above the bar. The articles form one loop: **notice → explore wide → pick → push deep → evaluate against your facets → care past good-enough** — with live tuning and separation of concerns as the working mechanics.

## Execution values — make the pixels right

When the question shifts from *"is this good / how far do I push"* to *"what exact value,"* route to these references (formerly the standalone `design-polish` skill, now this skill's execution layer):

| Reference | For |
| --- | --- |
| [polish-principles](references/polish-principles.md) | Execution overview: concentric radii, shadows-over-borders, optical alignment, spacing scales (25% rule), split/stagger + press motion, tabular nums, scoped font smoothing |
| [typography](references/typography.md) | Text wrapping, font smoothing, tabular numbers |
| [surfaces](references/surfaces.md) | Border radius, optical alignment, shadows, eased gradients, backdrop blur, image outlines, hit areas |
| [animations](references/animations.md) | Interruptible animations, enter/exit transitions, icon animations (incl. vanilla-CSS recipe), scale on press |
| [performance](references/performance.md) | Transition specificity, `will-change`, perceived performance (spinner choice) |
| [emil-kowalski](references/emil-kowalski.md) | Alternate craft theme (animations.dev): taste-training, component polish, animation decisions |
| [refactoring-ui](references/refactoring-ui.md) | Visual refactor passes (hierarchy, spacing, type, color, depth); code-native gallery in `examples/` |
| [linear-product-craft](references/linear-product-craft.md) | Linear's product-craft operating model: redesign debt, scope control, stress tests, feature flags, internal tools, quality rituals, dense-app chrome |

Theme discipline applies across these: pick one coherent value-set and don't average (see polish-principles' Theme Note). For motion *values*, `web-design` (web-animation-design) is the default theme. The methodology below is *how to evaluate*; the table above is *how to execute*.

## Noticing (`/library/noticing`)

The foundational skill: not "this feels nice/off" but recognizing *why*. First reactions are almost always shallow — the Agassiz sunfish lesson is to **stay with it longer** than feels reasonable; subtleties only emerge with sustained attention.

What to notice (use as an observation checklist):
- **Moments of hesitation** — what caused it? uncertainty about consequences? lack of trust?
- **Expectation gaps** — where did your mental model break? what did you assume, and why?
- **Emotional shifts** — the exact moment you got annoyed (or smiled), and the trigger.
- **What's missing** — what were you looking for? does it matter?
- **What's being assumed** — what does the interface hide vs. surface, and why those choices?
- **How it looks** — cheap or crafted? typography just right or slightly hard? colors cooperating or fighting? one clear hierarchy or everything competing?
- **How it feels** — fast or sluggish? responds as expected or a subtle disconnect? durable or fragile?

Practice: pick something you use daily, spend ten minutes only noticing, write down *specific* whys — never "it feels clean."

## Conceptual range (`/library/conceptual-range`)

Your first idea silently commits you to an assumption (the photo-backup example: every "better selection UI" idea assumes users must select at all — the winning concept was *automatic backup, no interface*). Range means **structurally different concepts, not variants**: five numpad layouts are depth, not range; presets vs. slider vs. gamified are range.

Ways to push past the obvious:
- **Remove (or add) a constraint** — what if it weren't a screen? happened automatically?
- **Blend from another domain** — as a game? a physical product? "what if Muji made it?"
- **Invert the problem** — help users eliminate what they don't want instead of find what they do.
- **Set an arbitrary quota** — force 5/12/20 ideas.
- **Optimize for one facet at a time** — what would 10/10 *durable* look like? 10/10 *desirable*?

Also a **hedge against your own taste**: taste is limited by what you've seen; going straight to depth on a familiar idea robs you of directions you'd never otherwise try. (Reference case: the *Maintenance: Of Everything* cover — ~15 structurally distinct directions before choosing.)

## Conceptual depth (`/library/conceptual-depth`)

"The difference between fine work and great work is rarely the initial idea. It's how far that idea gets pushed." Imagine a **1–10 spectrum**: 1 = exists/technically works, 10 = nothing could be improved. **Most work ships at 1–3** — not because more wasn't possible, but because it's easy to stop.

The journey changes character: early levels are *fixing* (gaps, edge cases, what's in front of you); later levels are *discovery* (no longer clear what better means — you push to find either the best version or the limit that says re-evaluate). Same cover case: 70+ iterations after choosing the direction.

When you don't know what better looks like:
- **Zoom in** — one element, world-class treatment.
- **Remove something** — was it needed?
- **Name what isn't working** — articulate it even without a fix (rubber-duck it).
- **Reference the best** — world-class examples reveal gaps.
- **Generate more** — more output = more information to select from.
- **Critique** — yourself, a teammate, a stranger; against your facets.

## Live tuning (`/library/live-tuning`)

Expose key parameters (duration, easing, spacing, shadows, blur, position, scale) as real-time controls so you *feel* differences instantly instead of edit-save-refresh guessing. Builds intuition faster and surfaces combinations you'd never reach one change at a time (e.g. a "generate N random-parameter iterations in a grid" toggle for generative graphics). Josh ships **DialKit** (`/library/dial-kit`), a React/Motion tuning-panel library; the underlying move is just "ask the agent for a control panel."

## Separation of concerns (`/library/separation-of-concerns`)

Resist solving everything in one prompt/artifact. **Before diving in, name the one concern you're resolving or question you're answering** — then use the lightest tool that answers it (sometimes "dangerously close to a wireframe"; a rough "breakable toy" answered *is this direction worth pursuing?* for the IC homepage cards). Refine only once you know it's necessary. With collaborators, fidelity is set by *audience + decision at hand* — sketches sometimes, shippable fidelity other times. Intentionality, not roughness, is the point.

## Facets of quality (`/library/facets-of-quality`)

Generic virtues (useful, intuitive, reliable) don't answer "is this actually good?" Define ~5 **project-specific, externally perceived attributes** — what you want users to *feel* (IC's: Crafted, Fidgetable, Authentic, Expansive, Inventive). Then:
- **Score on a radar chart** (1–5; 1 = minimum you can live with, 5 = best imaginable) — the low spoke is your next release's plan.
- **Stack-rank them** — if the top-ranked facet scores lowest, don't ship.
- **Critique in facet language**: not "doesn't feel right, needs work" but "this isn't inventive enough — if we're at a 4, this is going backwards."
- Re-score over time; it's a planning instrument, and a shared quality vocabulary for teams.

## Less, but better (`/library/less-but-better`)

Rams' discipline: fight the urge to add features/scope/flourish. Do as little as possible, executed to an extremely high bar (the IC pre-launch page: one page, two typefaces, three sizes, two neutrals, one button, one key interaction). Pairs with Bruce Lee: "hack away the unessential."

## Uncommon care (`/library/uncommon-care`)

"How much did the creator care?" shows up most in **the places you could have skipped**: edge cases, error states, invoices, refunds — "the effort no one would have blamed you for not making" (the Porsche 928 clutch pedal; logo-shaped screw heads; 100 personalized member notes). With AI making *passable* trivial, the bar for good-enough collapses — leverage buys you time to pour into what can't be generated. Self-prompts: Where are you stopping at good enough? What's the skeleton in the closet everyone knows is broken? Where are you holding back because leaning in feels uncomfortable?

## Industry standards (`/library/industry-standards`)

Daily-driver apps (iOS, Linear, Figma, Instagram…) set an **invisible bar**; below it, people silently discount your work — portfolios, prototypes, MVP demos alike — and never tell you why. The bar is the **floor, not the goal**. Shortcut: **"start with how iOS would design it, then improve"** (web equivalent: default shadcn + Tailwind, then improve) — never from scratch. Exemplars: Family (iOS defaults respected, then innovated on every aspect) and Raycast (native-feeling, better-than-Spotlight).

## Recreate everything (`/library/recreate-everything`)

Anything that makes you ask "how did they do that?" — recreate it immediately, while the curiosity spark lasts (e.g. reverse-engineering a macOS-style genie effect in three rough prompts). Stop when the itch is scratched: rough is fine, the question was *how does this work*, not *ship it*. Bias toward doing; share what you make.

## Linear product craft

Linear's public redesign and quality write-ups form a named school for dense professional software: pay design debt in deliberate sweeps, protect the main work surface from chrome, test design across real view types and platform environments, and turn quality into operating mechanics: triage, dogfood loops, unshipping, named decision rights, and shared feel language. When the task is a serious app refresh, a settings/productivity surface, a feature-flagged UI migration, or a repeatable quality program, read [references/linear-product-craft.md](references/linear-product-craft.md).

Key moves:
- **Redesign for product evolution, not novelty.** The trigger is accumulated design debt or a broadened product vision; scope the reset around the surfaces that need rebalancing, not every tempting navigation or IA problem.
- **Stress-test before implementation.** Crash the direction against environment, appearance, and hierarchy: browser/native shells, light/dark/custom themes, every dense view type, long labels, side panels, headers, tabs, and empty/error/loading states.
- **Make comparison cheap.** Ship behind a feature flag, add a local toggle, and build internal tooling so designers, engineers, and dogfooders can flip old/new instantly and tune tokens in the real product.
- **Triage quality by felt risk.** Fix repeated-use jank, trust leaks, wrong-problem signals, and stability promises before optional delight; use scope deletion and named deciders to keep craft decisions fast.
- **Dogfood with permission to unship.** Turn prototypes on internally, compare old/new cheaply, and remove features that feel wrong without treating removal as failure.
- **Train noticing.** A small weekly quality ritual works because each person sees different defects; small fixes compound and teach the team to prevent the next paper cut.
- **Promote evidence, not vibes.** When a quality ritual repeatedly catches the same issue, write the concrete decision, source surface, consequence, exception, and before/after example before making it reusable agent guidance. If code can detect it reliably, move it toward a check; if not, keep it as routed judgment.

## Practical Demonstrations — the refinement vocabulary (`/library?collection=practical-demonstration`)

Eight worked walkthroughs applying the principles. The recurring critique/refinement moves:

**Visual-language audit moves** (Refining Today / Presscut):
- Count the **implicit vertical rules** — more than ~2 left-edge alignment lines reads as disorder; consolidate to one content edge.
- **Unify icon families**: one stroke width, one fill style, one color treatment across the interface.
- **Tokenize metadata**: style category labels/secondary data as visually distinct tokens so they never read as user content.
- **Standardize one divider treatment** — or try removing dividers entirely and see if spacing carries it.
- Merge sibling cards into one container ("they're effectively all siblings"); reserve the display font for the page title only — using it on every section header dilutes it; lighten strokes; fix three-line stat cards by inlining the supporting value.
- **At summary altitude, progressively disclose**: don't stuff overview tables with every column — the row click is the details view. Replace cramped inline progress bars with **row-background fills** (same information, calmer).

**Architecture exercise** (Redesigning a Mobile Web App, parts 1–3): start from "what would default iOS give us" (tab bar + table views) → *evaluate* the default against the product (chat/profile weren't peers → header + composer) → explore structures that keep grouping without tap-in friction (phase accordion auto-expanded to the current phase; completed phases collapsed behind a card stack) → sheets over pushes for short tasks (anchored, fluid, tight feedback loop). Define **guiding attributes first** (trustworthy/calming/confident), then derive every visual decision from them: system body font ("undesigned in a good way"), display serif chosen by attribute-fit (Source Serif: modern authority), **corner radius as the technical↔friendly dial**, sharp icons counterweighting soft shapes, warm neutrals + one hopeful accent, blur instead of strokes, and **language warming** ("Form Preparation" → "Your Paperwork"). One primary action per step; time estimates + "what you'll need" reduce anxiety.

**Depth-spectrum exemplars**:
- *The Ultimate Slider*: full-bleed track as its own container → subtle hover-only handle (scales in on x) → track brightens on presence → value **dodges** the handle → handle clamps at extremes → hover-only hash marks → **snap-to-deciles on click only** (generous targets; drags stay precise) softened by a spring → value becomes editable after an 800ms hold → **rubber-banding past bounds with a dead zone**. Each step "communicates we're thinking about your experience."
- *v0 Gift Card*: layered pseudo-realism (two grain layers, halftone, holographic parallax, cursor-following specular, spotlight mask to constrain intensity), scratch-off via canvas-generated CSS mask with custom SVG brushes, an animated **gesture hint that exits on first hover**, and **round-robin sound variations fired every ~40 dragged pixels** so audio feels organic, not looped.
- *Library Cards*: the **constrained-customization pattern** — never hand users a raw color picker ("room to make an ugly card"); curate the palette, then expose one perceptual **"brilliance" slider** that moves H/S/L together along always-good values. For multi-parameter generative controls, drive all parameters from one slider mapped along a **Lissajous curve projected in 3D** (huge expressive range from one fidgetable control; linear mapping fallback on mobile). Agency within a curated range.

*(Interface Kit collection: Josh's visual editor — click any element, tweak style/typography/layout visually, "Copy as prompt" exports a diff for your coding agent; npm `interface-kit`, dev-only. Video walkthroughs. Reference Desk: curated classics — Bret Victor ×4, Eames Q&A, Wilson Miner "When We Build", Frank Chimero, Dive Club, First of Kind — future source list.)*

## Field rituals (Matt D. Smith / Shift Nudge — YouTube jSLfQ0sJDCw, wXAa2HNNjM4; "Good Enough UI" interview 4p5LzrAYN30)

Corroborating practices from outside the IC corpus — the same loop, drilled on camera:

- **The one-hour timer:** "I set a one hour timer inside of figma and see how much of an existing design I can improve" — a bounded depth-push rep. Setup matters: duplicate the design as before/after at identical widths ("that one's 430 I want to make sure that one is like right at 4 30 as well just so we have like a side-by-side comparison"), and in critique mode, write the observations as a numbered list before touching pixels ("make them a list so we have some numbers to reference") — noticing first, fixing second.
- **Place everything before judging anything:** rough the whole layout in, *then* tweak — "it's hard to make design decisions like one by one you kind of need to see everything all in place."
- **The good-enough verdict:** "good enough has a place but pushing for excellence does as well" — and the bar drifts down without exposure: "it takes me seeing something like fantastic to be like, 'Oh yeah, we can make things fantastic.'" (Reference-the-best, restated as recalibration.)
- **Ship the safe thing, explore the better one in parallel:** under deadline, "I will try to go ahead and produce something that I know that can work and then I will try to spend as much possible time on this other idea" — depth-pushing without betting the deliverable on it.

## Valio field notes (Valio Con 2012–14 talks, Drew Wilson's conference — GMUNK, Craig Henry)

- **Reference first** (GMUNK): "when you start a project, that's the first thing you should do is start looking at reference, looking at everything… that'll spark your own take on things." His license, via Godard: "it's not where you take things from, it's where you take them to." (The IC "reference the best" move, promoted from depth-rescue to project step zero.)
- **The over-planning failure mode** (GMUNK, his Tycho music-video post-mortem): "I was too organized. It was too structured… Everything was laid out to the every third second… and I followed that and I feel like I shouldn't have." Structure that's locked before the work talks back forecloses the discovery levels of depth — leave room to break your own breakdown.
- **Concept is the special sauce** (Craig Henry): what made his work land "wasn't nice colors and it wasn't intricate Line work or cool lighting… they ended up not being really the special sauce… it comes down to the concept and having a really… great story behind the work." Execution facets polish a concept; they can't substitute for one.
- **Reference-to-rule pipeline** (Jaytel Taste, public repo/post, 2026): when the goal is reusable taste rather than one critique, collect a tight set of high-resolution crops with repeated visual signals, ask independent vision models why each reference works visually (not functionally), fuse the notes anonymously, chunk them before extracting rules, then write imperative constraints plus anti-collapse guardrails. Concrete output beats mood words: "one dominant focal mass", "80-95% neutral tones", "one accent hue", "no fake device chrome", not "premium/polished/tasteful." Preserve labels like editorial/serif/luxury only when they are evidence-backed and tied to visible constraints; do not let one example style become the generic default. For packaging this into a skill, use `creating-skills` (converting-visual-references-to-skills); for applying it as an AI UI auditor, use `working-with-ai` (ai-ui-direction).
- **The passion inventory** (Henry): "figure out what you're passionate about and then when you get the chance to step away from client work and create for yourself focus on those" things — name your recurring themes explicitly and aim self-directed work at them; that's where taste compounds fastest.

## Dive Club deltas (Josh Puckett — wym3V9FycTk; Katie Dill, Stripe — Dpy-yyYXhgU; tranche 2 below)

New from Josh's Dive Club interview, beyond the IC corpus:

- **The three-slider problem → Lissajous solution.** When parameters would each demand a labeled slider, ask "how do we basically get like one slider that can control three different values at one time?" — drive them all from one position on a Lissajous curve. General move: **AI as cross-field prior-art finder** — "how is there prior art out there in other fields that I can run with?"
- **Fidgetability as a named quality attribute** — "things that feel tactile, you can move with them." Supports: constrained co-creation so the result feels "oh, it's mine" (not "picking one of five presets"); play thresholds + sound.
- **Labels-off mystery.** Chunky controls with "no labels on them… as you start to experiment with it, you get rewarded" — for small expert audiences.
- **Scope compression doctrine.** "Instead of creating more scope… take the limited amount of scope that is really essential and just execute it to a bar that folks maybe have never seen before." Backed by the Shakers — "make it as well as you can and make it as simple as you can" — and Bruce Lee: "not daily increase, but the daily decrease."
- **Tokens with functional value.** Mailbox's redeemable waitlist coin → his library-card onboarding → gift cards you literally scratch off for credits. The artifact does something, not just looks like something.
- **Audience-scoped liability.** "I'm okay taking more potential liability from like a usability perspective or accessibility perspective, because I know it's a small audience and this is also my thing." Risk tolerance scales with audience.
- **Reps economics.** Kanye: "I made five beats a day for three summers." "The only shortcut is like, cool, make a lot of things." And AI "compresses your ability to… reach" — far ideas become buildable; keep reach exceeding grasp.

Katie Dill corroborations (Stripe):
- **The 10% skim test:** "you read only 10% of the words on the page — do you get a sense?" Imagery must carry the gist unread.
- **The sentence-H1 pattern:** Stripe's hero is a full sentence; she preferred the short option, the team overruled her ("the team felt strongly… and honestly I think they're right").
- **Beauty as utility:** "beauty for the sake of beauty is a wonderful thing. And there quite literally is utility in that" — without it "you would probably just skim right by."
- **Collison's standing prompt:** "what are the things that modernism left behind" — recovering what the ultra-clean, "sometimes sterile" look lost.
- **AI imagery is never ship-ready:** generated images get hand-reworked; skip it and "subconsciously… you would feel that something's off" — eroding perceived care everywhere else.

Tranche 2 (Polly D'Arcy, Wealthsimple — vdYBohOQYm0; Katarina Batina, Shop app — 0YjO7wShTkQ; Brandon Jacoby, ex-Cash App/Capital/X — RaKFP_DuqpA):

- **The quality hierarchy** (D'Arcy): "at like the bottom of this diagram is functionality" — the thing must literally work — "then we need to make sure that it's reliable… The third layer being performance… we only really can dig into those details and make the experience excellent once those foundations are in place. And if we do it the other way around, it can sort of be a waste" — sequence the depth push: function → reliability → performance → excellence. (Industry-standards floor, ordered.)
- **The "shoplifting" ritual** (Batina): "this funny thing we do called shoplifting… these two to four weeks where design just goes ham on every surface horizontally" — roughly annual, a small group asking what would make the whole product feel a step better. Institutionalized horizontal noticing: depth pushes usually run vertical on one feature; this sweeps the seams between them.
- **Taste = calibrated rule-breaking** (Jacoby): "the tastemakers know when to break the rules and when to push beyond the boundaries of what exists today and when to quiet and to go with the flow. And I think that is actually the like core ability that AI doesn't allow for right now" — knowing that balance is the unautomated layer of craft.
- **Between-the-prompts discovery** (Jacoby): "when you're in between the prompts essentially, being able to like discover… it's not just A or B, but it's some weird C thing that you didn't think of originally that like you stumbled upon as like a happy accident." Ridd's corollary: "you almost always have to cross over the this is probably good enough line in order to get to the some weird C thing." The depth spectrum restated for AI workflows — the discovery levels live past good-enough, in the gaps the prompts don't reach.

## Checklist

- [ ] Did you stay with your observations past the first reaction, and write down *why*?
- [ ] Did you explore structurally different concepts (not variants) before committing?
- [ ] Where is this on the 1–10 depth spectrum — and what would one more level look like?
- [ ] Are the key parameters live-tunable rather than guess-edit-refresh?
- [ ] What single question is this artifact answering, and is the fidelity matched to it?
- [ ] Are this project's facets defined, scored, and driving the critique language?
- [ ] What can be removed? What overlooked corner deserves uncommon care?
- [ ] Does it clear the industry bar — and did you start from platform defaults before innovating?

## Relationship to other skills

- **`design-principles`** — Apple's eight values judge *what's right to build*; this skill is the *working practice* for getting any chosen thing to quality. Craft/Simplicity there ↔ depth/less-but-better here.
- **`design-prototyping`** — shares DNA on multiple directions ("no hole-in-ones") and agent-built tuning panels (WWDC26-227); route *presenting/feedback-session* questions there, *how-far-to-push and quality-evaluation* questions here. Separation of concerns = its "choose the fidelity tier" rule generalized to one-question-per-artifact.
- **Execution-value references** (`references/polish-principles.md`, `references/emil-kowalski.md`, and the typography/surfaces/animations/performance files) — the polish-execution layer *inside this skill*; when depth iteration reaches micro-detail (shadows, easing, optical alignment), their values take over (theme discipline applies). These were formerly the standalone `design-polish` skill.
- **`working-with-ai` (agentic-coding)** — separation of concerns is the design-side version of its constrained-generation stance: one intention per prompt, review non-delegable.
- **`shape-up`** — facets/stack-ranking complement betting and appetite at the project-planning level.

> **Source note:** the methodology is distilled from and extended beyond Josh Puckett's Interface Craft (interfacecraft.dev) — quote sparingly, attribute, and send readers to the source. Unmined collections for future passes: Means & Methods (8 technique articles: layout/alignment, visual style errors, color/blending, typographic errors, interpolation/map-range, compositing, wave functions, masks), Collaborating with AI (8 entries incl. DialKit and agent skills), Practical Demonstration, Interface Kit, Reference Desk.
