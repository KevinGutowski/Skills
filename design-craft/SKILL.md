---
name: design-craft
description: "Raise design quality and feel via craft methodology (noticing, range vs depth, facets, live tuning), execution values (shadows, spacing, radii, alignment, motion, type), and Linear-style rituals/triage. Use to polish, critique, or stress-test UI, build taste, or make quality repeatable. Strategy → design-principles; shaping → shape-up; frame drops → motion. Triggers: make it look better, fix the jank, feels off, worst-case data, quality ritual."
---

# Design Craft

How to raise design quality and make interfaces feel right, at two altitudes: a **quality methodology** (this body) for evaluating work and deciding how far to push it, and **execution values** (references) for the concrete recipes. Decide *how good* and *how far* here; drop into the references to make the pixels right.

*Provenance: [references/sources.md](references/sources.md) maps the craft corpus (read before citing a source); [references/coverage-gaps.md](references/coverage-gaps.md) tracks candidate exemplars and checks (read before promoting a rule). Quote sparingly, always attribute.*

The methodology is one loop: **notice → explore wide → pick → push deep → evaluate against your facets → care past good-enough** — with live tuning and separation of concerns as the working mechanics. *(Header slugs like `/library/noticing` are article paths on Josh Puckett's Interface Craft, interfacecraft.dev — the primary source.)*

## Plain requests: "make it look better", "fix the jank"

Don't start by changing values. First:

1. **Look at it running.** Use real size, both themes and real data. Write down concrete symptoms, never "it feels cheap".
2. **Sort each symptom by kind.** Each kind has a different owner:

   | Symptom | Kind | Go to |
   | --- | --- | --- |
   | Misaligned edges, mismatched siblings, uneven or cramped spacing, heavy borders, muddy hierarchy | visual inconsistency | [polish-principles](references/polish-principles.md) and the Polish move in [refinement-moves](references/refinement-moves.md); for dense app UI (dashboards, settings, tables, modals), the decision order in [tactile-design](references/tactile-design.md) |
   | No press feedback; animation too slow, abrupt or bouncy; sticky touch hover; menus that blink in and out | interaction feel | [animations](references/animations.md) and [emil-kowalski](references/emil-kowalski.md); motion values from `web-design` (web-animation-design) |
   | Content shifts on load; buttons move when a label or loading state changes | layout instability | polish-principles §17; `web-design` (web-performance) for CLS |
   | Breaks with a long name, a missing avatar, a count of 1, or a translated label | data fragility | [worst-case-data](references/worst-case-data.md) |
   | Web app feels like a website on a phone: stuck hover, tap flash, input zoom, wrong heights | mobile platform layer, not animation | `web-design` (mobile-web-native-feel) |
   | Stutter, dropped frames, scroll jank | performance, not styling | the `motion` skill's MotionScore performance audit and `web-design` (web-performance) |
   | AI-generated UI that looks generic | generation tells | `working-with-ai` (ai-ui-direction) and `frontend-design` (anti-slop-catalog) |

3. **Pick one theme.** If the product already has a look, match it (reuse before inventing). If it doesn't, use polish-principles by default, tactile-design for dense product UI, or emil-kowalski when the problem is mostly motion feel. Don't average themes.
4. **Make the smallest changes first and apply them consistently within the scope the user named.** Widen to a system-wide pass only when asked. Then report what changed and where.

## Execution values — make the pixels right

When the question shifts from *"is this good / how far do I push"* to *"what exact value,"* route to these references:

| Reference | For |
| --- | --- |
| [polish-principles](references/polish-principles.md) | Execution overview: concentric radii, shadows-over-borders, optical alignment, spacing scales, press motion, tabular nums, font smoothing |
| [typography](references/typography.md) | Text wrapping, font smoothing, tabular numbers |
| [surfaces](references/surfaces.md) | Border radius, optical alignment, shadows, eased gradients, backdrop blur, image outlines, grain, document canvas background, hit areas |
| [animations](references/animations.md) | Interruptible animations, enter/exit transitions, icon animations (incl. vanilla-CSS recipe), scale on press |
| [performance](references/performance.md) | Transition specificity, `will-change`, perceived performance (spinner choice) |
| [emil-kowalski](references/emil-kowalski.md) | Alternate craft theme (animations.dev): taste-training, component polish, animation decisions. Second hop in `references/emil-kowalski/`: css-techniques (component, transform, clip-path, and stagger code), interaction-and-performance (springs, gesture/drag, performance rules, debugging), taste-and-craft (practitioner habits, Config-talk notes) |
| [tactile-design](references/tactile-design.md) | Alternate theme (Kosta, kosta.fyi) for tactile, layered, quiet product UI: decision order, parent-relative surfaces, light/dark elevation, one-primary hierarchy, never-ship list. Second hop in `references/tactile-design/`: tokens-and-surfaces, controls, layout-and-data, motion-values, phone |
| [refactoring-ui](references/refactoring-ui.md) | Visual refactor passes (hierarchy, spacing, type, color, depth); code-native gallery in `examples/refactoring-ui-gallery.html` |
| [linear-product-craft](references/linear-product-craft.md) | Linear's operating model: redesign debt, scope control, stress tests, feature flags, quality rituals, triage, dogfood/unshipping, taste calibration |
| [worst-case-data](references/worst-case-data.md) | Stress-test a component with worst-case data: per-field catalog, failure-signature → fix table, truncate/wrap/clamp, Broken/Ugly/Fragile report |
| [refinement-moves](references/refinement-moves.md) | Directional verbs for an existing UI: bolder, quieter, distill, delight, overdrive (propose first), polish (drift classification + triage order), harden (real data, failures, interrupted gestures) |
| [practical-demonstrations](references/practical-demonstrations.md) | Worked walkthrough move lists: visual-language audit, mobile architecture exercise, depth-spectrum exemplars (slider, gift card, library cards) |
| [field-notes](references/field-notes.md) | Verbatim practitioner quotes behind the methodology rules (MDS, Valio, Dive Club, Minor, Sten) and the Jaytel reference-to-rule recipe |

Theme discipline: pick one coherent value-set and don't average (polish-principles' Theme Note). `emil-kowalski` and `tactile-design` are complete alternate themes; each keeps its deep files in a same-named subdirectory that only its parent reference links (one sanctioned second hop). For motion *values*, `web-design` (web-animation-design) is the default theme.

## Noticing (`/library/noticing`)

The foundational skill: not "this feels nice/off" but recognizing *why*. First reactions are almost always shallow — the Agassiz sunfish lesson is to **stay with it longer** than feels reasonable.

What to notice (use as an observation checklist):
- **Moments of hesitation** — what caused it?
- **Expectation gaps** — where did your mental model break?
- **Emotional shifts** — the exact moment you got annoyed (or smiled), and the trigger.
- **What's missing** — what were you looking for?
- **What's being assumed** — what does the interface hide vs. surface?
- **How it looks** — cheap or crafted? colors cooperating or fighting? one clear hierarchy or everything competing?
- **How it feels** — fast or sluggish? durable or fragile?

Practice: spend ten minutes only noticing something you use daily and write down *specific* whys — never "it feels clean." Field rep (MDS): time-box one hour on a duplicated before/after copy and write the observations as a numbered list *before* touching pixels.

## Conceptual range (`/library/conceptual-range`)

Your first idea silently commits you to an assumption (photo backup: every "better selection UI" idea assumes users must select at all — the winning concept was *automatic backup, no interface*). Range means **structurally different concepts, not variants**: five numpad layouts are depth, not range; presets vs. slider vs. gamified are range.

Ways to push past the obvious:
- **Remove (or add) a constraint** — what if it weren't a screen? happened automatically?
- **Blend from another domain** — as a game? a physical product? "what if Muji made it?"
- **Invert the problem** — help users eliminate what they don't want instead of find what they do.
- **Set an arbitrary quota** — force 5/12/20 ideas.
- **Optimize for one facet at a time** — what would 10/10 *durable* look like? 10/10 *desirable*?

Also a **hedge against your own taste**: taste is limited by what you've seen; going straight to depth on a familiar idea robs you of directions you'd never otherwise try. (The *Maintenance: Of Everything* cover: ~15 structurally distinct directions before choosing.) And concept outranks execution (Craig Henry): execution facets polish the concept, never substitute for it.

Sten's problem-solver warning: before pushing craft depth, ask whether this is the surface where better craft changes the user's outcome — redesigning an already-working surface is often visual exercise, not product progress ([references/field-notes.md](references/field-notes.md)).

## Conceptual depth (`/library/conceptual-depth`)

"The difference between fine work and great work is rarely the initial idea. It's how far that idea gets pushed." Imagine a **1–10 spectrum**: 1 = exists/technically works, 10 = nothing could be improved. **Most work ships at 1–3** — because it's easy to stop.

Early levels are *fixing* (gaps, edge cases); later levels are *discovery* (you push to find either the best version or the limit that says re-evaluate). Same cover case: 70+ iterations after choosing the direction.

When you don't know what better looks like:
- **Zoom in** — one element, world-class treatment.
- **Remove something** — was it needed?
- **Name what isn't working** — articulate it even without a fix (rubber-duck it).
- **Reference the best** — world-class examples reveal gaps. GMUNK: gather reference at project step zero, and don't lock structure before the work talks back.
- **Generate more** — more output = more information to select from.
- **Critique** — yourself, a teammate, a stranger; against your facets.

Sequencing and deadline rules (field corroborations, quotes in [references/field-notes.md](references/field-notes.md)):
- **Sequence the push** (Polly D'Arcy): function → reliability → performance → excellence.
- **Under deadline** (MDS): ship the version you know works while pushing the better idea in parallel.
- **In AI workflows** (Jacoby/Ridd): cross the good-enough line deliberately — the discovery levels live between the prompts.
- **At system scale** (Marek Minor, Cursor's icons): 156 explorations of one icon, final calls at 0.25px — and judge at true size on a device, outside the file it was drawn in.

## Live tuning (`/library/live-tuning`)

Expose key parameters (duration, easing, spacing, shadows, blur, position, scale) as real-time controls so you *feel* differences instantly instead of edit-save-refresh guessing. Builds intuition faster and surfaces combinations you'd never reach one change at a time (e.g. a grid of N random-parameter iterations). Josh ships **DialKit** (`/library/dial-kit`), a React/Motion tuning-panel library; the underlying move is just "ask the agent for a control panel." For many parameters, drive them all from one position on a Lissajous curve — one fidgetable control.

## Separation of concerns (`/library/separation-of-concerns`)

Resist solving everything in one prompt/artifact. **Before diving in, name the one concern you're resolving or question you're answering** — then use the lightest tool that answers it (sometimes "dangerously close to a wireframe"; a rough "breakable toy" can answer *is this direction worth pursuing?*). Refine only once you know it's necessary. With collaborators, fidelity is set by *audience + decision at hand*. Intentionality, not roughness, is the point.

## Facets of quality (`/library/facets-of-quality`)

Generic virtues (useful, intuitive, reliable) don't answer "is this actually good?" Define ~5 **project-specific, externally perceived attributes** — what you want users to *feel* (IC's: Crafted, Fidgetable, Authentic, Expansive, Inventive). Then:
- **Score on a radar chart** (1–5; 1 = minimum you can live with, 5 = best imaginable) — the low spoke is your next release's plan.
- **Stack-rank them** — if the top-ranked facet scores lowest, don't ship.
- **Critique in facet language**: not "doesn't feel right, needs work" but "this isn't inventive enough — if we're at a 4, this is going backwards."
- Re-score over time; it's a planning instrument and a shared team vocabulary.

## Less, but better (`/library/less-but-better`)

Rams' discipline: fight the urge to add features/scope/flourish. Do as little as possible, executed to an extremely high bar (the IC pre-launch page: one page, two typefaces, three sizes, two neutrals, one button, one key interaction). Pairs with Bruce Lee: "hack away the unessential." Puckett's scope compression: take only the essential scope and execute it to an unseen bar.

## Uncommon care (`/library/uncommon-care`)

"How much did the creator care?" shows up most in **the places you could have skipped**: edge cases, error states, invoices, refunds — "the effort no one would have blamed you for not making" (the Porsche 928 clutch pedal; logo-shaped screw heads; 100 personalized member notes). With AI making *passable* trivial, spend the leverage on what can't be generated. Self-prompts: Where are you stopping at good enough? What's the skeleton in the closet everyone knows is broken? Where are you holding back because leaning in feels uncomfortable?

Sten's whole-journey variant: the care test includes off-screen business surfaces — confirmation emails, invoices, PDFs, fulfillment status, returns, cancellation, support scripts. A crafted main screen still feels careless if these break the promise.

Minor's below-noticing variant: corrections nobody can point at are still the standard — "It's the inside of the machine: nobody opens it, and it should still be tidy."

## Industry standards (`/library/industry-standards`)

Daily-driver apps (iOS, Linear, Figma, Instagram…) set an **invisible bar**; below it, people silently discount your work and never tell you why. The bar is the **floor, not the goal**. Shortcut: **"start with how iOS would design it, then improve"** (web equivalent: default shadcn + Tailwind, then improve) — never from scratch. Exemplars: Family (iOS defaults respected, then innovated on) and Raycast (native-feeling, better-than-Spotlight). Your own bar drifts down without exposure (MDS) — keep seeing fantastic work. And AI-generated imagery is never ship-ready (Katie Dill): hand-rework it.

## Recreate everything (`/library/recreate-everything`)

Anything that makes you ask "how did they do that?" — recreate it immediately, while the curiosity lasts (e.g. a macOS-style genie effect in three rough prompts). Stop when the itch is scratched: the question was *how does this work*, not *ship it*. Share what you make.

## Linear product craft

Linear's public redesign and quality write-ups form a named school for dense professional software: pay design debt in deliberate sweeps, protect the main work surface from chrome, stress-test a direction across real view types, themes, and platform shells before implementation, make old/new comparison cheap (feature flag, local toggle, internal tooling), triage quality by felt risk, and dogfood with permission to unship. For a serious app refresh, a settings/productivity surface, a feature-flagged UI migration, or a repeatable quality program, read [references/linear-product-craft.md](references/linear-product-craft.md) (key moves digest first).

## Practical Demonstrations — the refinement vocabulary (`/library?collection=practical-demonstration`)

Eight worked walkthroughs; full move lists in [references/practical-demonstrations.md](references/practical-demonstrations.md) — read when auditing a visual language (implicit vertical rules, icon families, metadata tokens, dividers), restructuring a mobile app (default iOS first, guiding attributes before visuals), or looking for what "one more level" of depth looks like (The Ultimate Slider, v0 Gift Card, Library Cards' constrained customization).

## Field notes and the reference-to-rule pipeline

Field practitioners outside the IC corpus (MDS/Shift Nudge, Valio Con, Dive Club, Marek Minor, Sten) corroborate the methodology; their rules are distilled above, with verbatim quotes and unpromoted texture in [references/field-notes.md](references/field-notes.md).

**Reference-to-rule pipeline** (Jaytel Taste, 2026 — recipe in the field notes): turn tight reference crops into imperative constraints plus anti-collapse guardrails — "one accent hue" beats "premium". Packaging into a skill → `creating-skills` (converting-visual-references-to-skills); applying as an AI UI auditor → `working-with-ai` (ai-ui-direction).

## Checklist

- [ ] Did you stay with your observations past the first reaction, and write down *why*?
- [ ] Did you explore structurally different concepts (not variants) before committing?
- [ ] Are you polishing the surface where the real user/business problem lives?
- [ ] Where is this on the 1–10 depth spectrum — and what would one more level look like?
- [ ] Are the key parameters live-tunable rather than guess-edit-refresh?
- [ ] What single question is this artifact answering, and is the fidelity matched to it?
- [ ] Are this project's facets defined, scored, and driving the critique language?
- [ ] What can be removed? What overlooked corner deserves uncommon care?
- [ ] Did off-screen touchpoints receive care: emails, invoices, support, recovery, cancellation, fulfillment?
- [ ] Does it clear the industry bar — and did you start from platform defaults before innovating?

## Relationship to other skills

- **`design-principles`** — Apple's eight values judge *what's right to build*; this skill is the *working practice* for getting any chosen thing to quality.
- **`design-prototyping`** — shares DNA on multiple directions ("no hole-in-ones") and agent-built tuning panels (WWDC26-227); route *presenting/feedback-session* questions there, *how-far-to-push and quality-evaluation* questions here. Separation of concerns generalizes its "choose the fidelity tier" rule.
- **Execution-value references** (the table above) — the polish-execution layer *inside this skill*; when depth iteration reaches micro-detail (shadows, easing, optical alignment), their values take over.
- **`working-with-ai` (agentic-coding)** — separation of concerns is the design-side version of its stance: one intention per prompt, review non-delegable.
- **`shape-up`** — owns product shaping (appetite, bets, scope cuts, the Linear operating-school comparison); this skill owns interface quality practice: craft depth, live tuning, dense-app refreshes, quality rituals, felt-risk triage.

> **Source note:** the methodology is distilled from and extended beyond Josh Puckett's Interface Craft (interfacecraft.dev) — quote sparingly, attribute, and send readers to the source.
