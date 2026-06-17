# Skills

A curated library of Claude Code skills. The largest cluster is a design library distilled from ~94 Apple WWDC sessions, the Human Interface Guidelines, and Apple's design case studies — organized by **theme, not by source**: one skill may aggregate several talks, and cross-references route between skills instead of duplicating content.

## How this library is organized

Top-level entries are one of three things: a **platform** you target (`rails`, `swiftui`, `apple-design`, `web-design`), an **activity** you do (consolidated clusters like `ux-writing`, `working-with-ai`, `devtools`, `client-work`, plus flat activity skills), or a **cross-domain tool** (`motion`, `x-post-reader`, `route-planning`, …). Topics don't get top-level slots: they live as reference files inside the platform or activity cluster they serve, and the cluster's body routes to them. The graph of boundary clauses — the "Boundary:" lines and the Routing rules below — is the routing fabric between clusters; a `cluster` (member) reference in those clauses points at a specific reference file. Full reorganization plan: [docs/taxonomy-2026-06.md](docs/taxonomy-2026-06.md).

Operational maintenance rules for growing the library live in [docs/skill-library-ops.md](docs/skill-library-ops.md): source intake, source maps, folding, external skill screening, routing probes, and validation gates.

## Installing From This Repo

This repo stores skills at the repository root, not under OpenAI's default `skills/.curated` path. When using Codex's `skill-installer`, pass explicit root-level paths:

```bash
python /root/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo KevinGutowski/Skills \
  --path design-craft devtools working-with-ai
```

Common bundles:

| Task | Install |
|---|---|
| UI polish / frontend cleanup | `design-craft frontend-design web-design` |
| Admin or developer-tool UI | `devtools design-craft data-viz` |
| AI-generated UI repair | `working-with-ai design-prototyping design-craft frontend-design` |
| Skill authoring / source conversion | `creating-skills research-cataloging x-post-reader` |

After installing, restart Codex for automatic skill routing. In the same session, read the installed `SKILL.md` files directly. Fuller agent guidance: [docs/agent-quickstart.md](docs/agent-quickstart.md).

## Which skill do I want?

### Design strategy & critique
| Skill | Use it for |
|---|---|
| `design-principles` | Whether/why decisions, design critique, trade-offs (purpose, agency, craft, delight…) — the strategic layer the rest sit under |
| `design-prototyping` | Validating ideas before building: fake-it → SwiftUI-as-design-tool → coding agents (incl. Cursor's design-in-code endpoint); presenting design work |
| `design-craft` | The craft skill (merged: the former `design-polish` is now its execution layer). Body = quality methodology (Josh Puckett): noticing, range→depth, facets of quality, live tuning, uncommon care. References = concrete execution values (shadows, spacing scales, concentric radii, optical alignment, motion, type) plus the Emil Kowalski theme and Refactoring UI. Use for "feels off" / "make it polished" / "how far do I push this" |
| `logo-design` | Brand marks, badges, identity systems — the Peters method (brand nouns → 50 sketches → B/W presentation); app icons → `apple-design` (app-icon-design) |
| `feature-discoverability` | First launches, tips/TipKit, features users can't find |
| `user-onboarding` | First-run flows, empty states, onboarding copy (Hulick method) |
| `learning-experience-design` | Courses, workshops, internal training, tutorials, job aids — gap diagnosis, practice, feedback, motivation, transfer (Dirksen method) |
| `photographic-lighting` | Lighting photos: portraits, products/still life, field shoots, glare/reflections, softbox/fill/bounce, metal/glass/black-on-black/white-on-white |
| `shape-up` | Product scoping/betting (Basecamp method) + the competing Linear school (design as reference, no handoff/PMs, taste over data) and routing between them |
| `product-decision-making` | Product judgment before the bet: problem clarity, data-informed decisions, metrics-vs-design, optimization vs new behavior, proposal reviews (Julie Zhuo) |
| `hardware-product-design` | Physical products: form-factor positioning, mockups/rigs/jigs, input selection, manufacturing/supplier reality |
| `design-org-influence` | Designer influence in the org: business cases, stakeholder objections, PM partnership, promotion/reviews |
| `people-management` | Running a team of direct reports: 1:1s, feedback, career conversations, hiring/firing, team comms (Scott + Zhuo + Hogan); influence up/sideways → `design-org-influence` |
| `client-work` | Client services — one consolidated skill; its body routes to reference files: client-engagements (running client projects: qualification, kickoff, the feedback system, health signals, failure/firing — Monteiro), pricing-creative-work (client-services pricing & negotiation: value-based pricing — Do/Stark/Mall three schools, objection scripts, terms) |
| `user-research` | Research planning & methods: question→method map, interviewing craft, validation, synthesis (Hall/Portigal/Sharon) |

**Boundary (the working-designer chain):** evidence → `user-research` · product judgment → `product-decision-making` · internal buy-in/career → `design-org-influence` · external client relationship → `client-work` (client-engagements) · money → `client-work` (pricing-creative-work) · the pitch/demo artifact itself → `design-prototyping` · training/curriculum/job aids → `learning-experience-design`.

### Apple platform design (HIG-grounded)
`apple-design` — one consolidated skill; its body routes to reference files: hig (**lookup router**: topic map + fetch method for the canonical HIG; current letter-of-the-law specs; staleness tiebreaker), classic-hig-principles (2014 iOS/OS X doctrine: deference, clarity, depth, aesthetic integrity, user control, Mac modality/keyboard/help), apple-navigation-design (tabs, push, modality, menus, iPad layout/windowing, pointer), apple-search-design (search placement, suggestions, scope bars/tokens, no-results), apple-typography (SF family, Dynamic Type, text styles), apple-visual-accessibility (accessibility settings, contrast, inclusive design), liquid-glass-design-system (the current design language: the glass material, system anatomy, migration playbook), ios-brand-identity (expressing brand without breaking native feel), app-icon-design (icon craft + the layered Liquid Glass icon system / Icon Composer), app-intents-design (App Intents/App Shortcuts across Siri, Spotlight, widgets, controls), chart-experience-design (in-app charts and the experience around them — Swift Charts/Audio Graphs; general viz stays in `data-viz`).

System-surface and interaction *craft* — sf-symbols (symbol usage, rendering modes, animations, custom symbols), widget-design, sound-design (audio/haptics), touch-interaction-design (gesture feel and fluid interfaces) — lives as references under `swiftui` (see SwiftUI engineering). `notification-design` remains a standalone activity skill for that surface.

### AI & agents
| Skill | Use it for |
|---|---|
| `ai-experience-design` | Designing AI/ML-backed *features*: confidence, corrections, agent surfaces, pattern vocabulary (wayfinders/tuners/governors), model safety |
| `working-with-ai` | You and your team working *with* AI — one consolidated skill; its body routes to reference files: ai-ui-direction (directing/fixing AI-*generated* UI: layout-primitive diagnosis, prompt-vs-edit, the fresh-context judge loop), agentic-coding (running coding agents on *your repo* — the workflow/mechanics layer, also listed in Coding below), ai-enablement (rolling AI out across an *org*: decision archives behind MCP, company-specific agents, team skills, enablement programs — Shopify, Ramp, Atlassian, OpenAI) |
| `malleable-software` | Software *users* can reshape: expose structure not modes (nightmare bicycle), 40th-hour design, interop/jigs, human-AI work as version control (Litt, Ink & Switch) |

**Boundary:** designing the AI feature → `ai-experience-design` · fixing what AI generated → `working-with-ai` (ai-ui-direction) · agents working on your code → `working-with-ai` (agentic-coding) · getting a team/org to adopt AI → `working-with-ai` (ai-enablement) · letting end users reshape the product → `malleable-software`. The DS-as-AI-context mechanics live in `design-systems`.

### SwiftUI engineering
`swiftui` — one consolidated skill; its body routes to reference files: swiftui-identity (the identity/lifetime/dependencies mental model — debug state resets here), swiftui-layout (containers, Layout protocol, navigation structure), swiftui-lazy-stacks (scroll performance), swiftui-animation (springs, transitions, shaders), swift-concurrency (structured concurrency, sendability, Swift 6 migration), plus platform craft: touch-interaction-design, widget-design, sf-symbols, sound-design.

### Motion & frontend (web)
`web-design` — one consolidated skill; its body routes to reference files: web-typography (CSS/web type practice: measure/leading/scales, choosing & pairing, OpenType craft, font loading — from Rutter, Santa Maria, Latin; Apple platforms → `apple-design` (apple-typography)), web-accessibility (web-scoped a11y practice: AT discipline, semantic-HTML-first priority order, focus mechanics, accessible writing, testing program, org policies — Kalbag + Metts/Welfle; Apple platforms → `apple-design` (apple-visual-accessibility)), web-animation-design (the default theme for web motion values), web-performance (load + interaction speed: fluid-UI frame budgets, Core Web Vitals, perf culture), form-design (web form structure, field types, buttons, validation flows — the Dannaway method; form copy → the words chain; Apple forms → `apple-design` (apple-navigation-design)), oklch-skill (color), social-video-safe-zones (9:16 vertical-video safe zones).

Alongside it: `motion` (the Motion AI Kit umbrella — encapsulates best-practices, docs search, CSS spring generation, performance audit, transition visualisation as sub-capabilities) · `design-craft` (the craft skill — quality methodology + execution values incl. the Emil Kowalski theme and Refactoring UI; listed in Design strategy above) · `frontend-design` (building distinctive web UI) · `creative-coding` (procedural/generative visual systems: canvas/p5/Processing sketches, particles, steering agents, automata, fractals, noise, evolutionary variation) · `photographic-lighting` (shoot lighting: portraits, products, glare, flash/fill/bounce) · `graphics-fundamentals` (purchased source — Dan Hollick's *Making Software*; adapted): the mechanism layer beneath all of these (screens, color spaces, rasterization, blurs, compression) — route "how/why does X actually work" questions there.

### Writing & content
`write-clear-prose` · `ux-writing` — one consolidated skill; its body routes to reference files: ui-voice-and-tone (product voice + microcopy), error-messages (failure-state copy), linear-settings-copy (settings IA/copy), naming-features-and-labels (what to call a feature, label, plan, button).

### Data visualization
`data-viz` (pick the chart type + Tufte integrity/data-ink critique + editorial/interactive chart craft) · `apple-design` (chart-experience-design) (in-app chart UX — listed above).

### Coding (non-Apple)
| Skill | Use it for |
|---|---|
| `working-with-ai` (agentic-coding) | Running coding agents on real projects: constraints, AGENTS.md/project rules, orchestrator role, vibe-coding security |
| `rails` | ALL Ruby/Rails work — one consolidated skill; body routes to reference files: four schools (dhh-style vanilla default, layered-rails, packwerk, rails-event-sourcing), webhooks, migrations, security/multitenancy, jobs, both testing schools, Hotwire/realtime, websocket scale, Docker dev, performance, upgrades, Inertia, ruby-refactoring |
| `dhh` | `/dhh` — review a diff in DHH's literal review voice (calibrated against ~200 of his Fizzy review comments) |

**Rails school rule (default: vanilla):** four positions — dhh-style (vanilla, the default) → layered-rails (extraction, when models/controllers bloat) → packwerk-style module boundaries (when "200 models, zero modules" but simple processes) → rails-event-sourcing (when *processes* are the pain); all are reference files under `rails/references/`. The vanilla school has seven vendored 37signals satellites (`dhh` plus the webhooks/migrations/security/jobs/hotwire/fixtures references — from `marckohlbrugge/37signals-skills`, mined from Fizzy's PRs); testing split: rails-testing is the *factories* school, rails-fixtures-testing the *fixtures* school — route by the project's existing choice. Escalate only on named pains; pick one school per project; never blend idioms in one codebase. The full router with each school's warranted/overkill criteria lives in rails/references/rails-event-sourcing.md.

### Research & cataloging
`research-cataloging` — one consolidated skill; its body routes to reference files: source-sweep (exhaustive coverage of bounded sources), archival-research (research bundles, OCR/transcription corpora), catalog-reconciliation-research, source-translation-workflow, image-archival. Standalone utilities: `x-post-reader` · `route-planning`.

### Developer tools as products
`design-systems` (tokens, theming, governance/federation, adoption metrics, DS-as-AI-context — from 9 Config talks) · `devtools` — one consolidated skill; its body routes to reference files: devtool-interface-design (dev-tool UI: contexts, control flow, zones, CLI UX, devtool onboarding, agent experience), developer-tool-gtm (landing pages, copy, conversion, PMF Compass), oss-strategy (OSS popularity, READMEs, maintainer survival, monetization) · `building-in-public` (audience-led indie growth: rough-beats-polished content, prototype-stage validation, company-of-one economics). Boundary: `devtools` (devtool-interface-design) makes the tool worth adopting; `devtools` (developer-tool-gtm) gets it adopted; `working-with-ai` (agentic-coding) is agents working *on your code* while devtool AX is agents as *customers of your tool*.

### Tooling & meta
`creating-skills` (authoring skills + conversion playbooks for books/docs, living repos with PR history, and visual/reference corpora — its references/). Airtable MCP, NocoDB, and transcription-chunking integrations live in `research-cataloging`'s references.

## Routing rules (overlap boundaries)

- **Strategy vs tactics:** `design-principles` decides *whether/why*; the specific skills decide *how*. Don't restate principles in tactical work.
- **Motion default:** platform unstated → `web-design` (web-animation-design) values; SwiftUI/iOS stated → `swiftui` (swiftui-animation reference). Never cross-apply web timing values to native or vice versa.
- **Generative visuals:** procedural sketches, particles, agents, noise, automata, fractals, and evolutionary visual systems → `creative-coding`; production UI layout/SVG hygiene/accessibility → `frontend-design`/`web-design`; end-user-resculptable tools → `malleable-software`.
- **Typography split:** web/CSS → `web-design` (web-typography); Apple platforms → `apple-design` (apple-typography); rendering internals (why fonts look different) → `graphics-fundamentals`. Never cross-apply platform conventions.
- **AI chain:** design the AI feature → `ai-experience-design`; fix AI-generated UI → `working-with-ai` (ai-ui-direction); agents on your repo → `working-with-ai` (agentic-coding); org rollout/context sharing → `working-with-ai` (ai-enablement); users reshaping the product → `malleable-software`.
- **Overlapping polish themes** (`design-craft` and its Emil Kowalski reference, `web-design` (web-animation-design)) are *themes*: pick one theme's values and apply them consistently; when a genuine choice surfaces, present a menu rather than silently mixing aesthetics.
- **Words:** name the thing in `ux-writing` (naming-features-and-labels) → set the voice in `ux-writing` (ui-voice-and-tone) → failure copy in `ux-writing` (error-messages) → settings rows in `ux-writing` (linear-settings-copy).
- **Charts:** type + integrity critique in `data-viz` → in-app experience in `apple-design` (chart-experience-design).
- **Apple specifics vs current truth:** talk-derived skills carry reasoning and craft; the `apple-design` (hig) skill fetches the canonical current spec. When they disagree, the live HIG wins (skills carry ⚠️ supersession notes where this has already happened).

## Conventions

- **Frontmatter:** `name` + single-line `description` (quoted — descriptions contain `:` characters), ≤1024 chars, written as *what + when + sources + trigger keywords*. Descriptions are the always-loaded routing surface; bodies load on demand.
- **Progressive disclosure:** SKILL.md stays under 500 lines and under the ~5k-token body budget; deep material lives in `references/`. Keep the body to routing rules, durable operating moves, and one load-bearing quote per point; move quote banks, examples, and source texture to references even when the validator is clean.
- **Decision rules go high in the file.** Consumers paginate (a real agent trace read only lines 1–220 and missed a tail section) — put the core framework and decision rules before checklists and appendices; when extending a skill, merge into the relevant section rather than appending at the end.
- **Source fidelity:** WWDC-derived skills cite sessions with URLs; code samples are Apple's verbatim, year-tagged.
- **Staleness policy:** principles are stable; API/platform specifics are dated and carry staleness notes ("verify against current docs"). ⚠️ markers flag where newer guidance supersedes a talk. The HIG what's-new page (https://developer.apple.com/design/whats-new/) drives periodic audits.

## Validation

```
python3 scripts/validate_all.py
```

Runs the repo validator plus strict skill-creator-compatible frontmatter checks. It verifies every `*/SKILL.md` for strict-YAML frontmatter, required `name`/`description`, description ≤1024 chars, body ≤500 lines, resolvable local references, allowed frontmatter keys, and descriptions that avoid angle brackets. Runs in CI on every push.

It also runs the **cross-reference guard** (`scripts/check_xrefs.py`), which catches the routing-fabric bug a 2026-06 manual audit found by hand: a reference *file* cited in prose as if it were a top-level skill (e.g. `` `oklch-skill` `` instead of `` `web-design` (oklch-skill) ``), or a `` `cluster (member)` `` whose cluster isn't a real skill. Reference names are distinctive, so false positives stay near zero; descriptive prose that names the owning skill on the same line is exempt. Run it alone with `python3 scripts/check_xrefs.py` (add `--strict` to also fail on advisory warnings).
