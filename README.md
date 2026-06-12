# Skills

A curated library of Claude Code skills. The largest cluster is a design library distilled from ~94 Apple WWDC sessions, the Human Interface Guidelines, and Apple's design case studies — organized by **theme, not by source**: one skill may aggregate several talks, and cross-references route between skills instead of duplicating content.

## Which skill do I want?

### Design strategy & critique
| Skill | Use it for |
|---|---|
| `design-principles` | Whether/why decisions, design critique, trade-offs (purpose, agency, craft, delight…) — the strategic layer the rest sit under |
| `design-prototyping` | Validating ideas before building: fake-it → SwiftUI-as-design-tool → coding agents (incl. Cursor's design-in-code endpoint); presenting design work |
| `interface-craft-principles` | *(local-only, gitignored — members-only source)* Quality practice (Josh Puckett): noticing, range→depth, facets of quality, live tuning, uncommon care. Its core heuristics are also folded into `design-principles` and `design-prototyping` |
| `naming-features-and-labels` | What to call a feature, label, plan, button |
| `logo-design` | Brand marks, badges, identity systems — the Peters method (brand nouns → 50 sketches → B/W presentation); app icons → `app-icon-design` |
| `form-design` | Web form structure, field types, buttons, validation flows — the Dannaway method; form copy → the words chain; Apple forms → `apple-navigation-design` |
| `feature-discoverability` | First launches, tips/TipKit, features users can't find |
| `user-onboarding` | First-run flows, empty states, onboarding copy (Hulick method) |
| `learning-experience-design` | Courses, workshops, internal training, tutorials, job aids — gap diagnosis, practice, feedback, motivation, transfer (Dirksen method) |
| `shape-up` | Product scoping/betting (Basecamp method) + the competing Linear school (design as reference, no handoff/PMs, taste over data) and routing between them |
| `hardware-product-design` | Physical products: form-factor positioning, mockups/rigs/jigs, input selection, manufacturing/supplier reality |
| `design-org-influence` | Designer influence in the org: business cases, stakeholder objections, PM partnership, promotion/reviews |
| `people-management` | Running a team of direct reports: 1:1s, feedback, career conversations, hiring/firing, team comms (Scott + Zhuo + Hogan); influence up/sideways → `design-org-influence` |
| `pricing-creative-work` | Client-services pricing & negotiation: value-based pricing (Do/Stark/Mall three schools), objection scripts, terms |
| `client-engagements` | Running client projects: qualification, kickoff, the feedback system, health signals, failure/firing (Monteiro) |
| `user-research` | Research planning & methods: question→method map, interviewing craft, validation, synthesis (Hall/Portigal/Sharon) |

**Boundary (the working-designer chain):** evidence → `user-research` · internal buy-in/career → `design-org-influence` · external client relationship → `client-engagements` · money → `pricing-creative-work` · the pitch/demo artifact itself → `design-prototyping` · training/curriculum/job aids → `learning-experience-design`.

### Apple platform design (HIG-grounded)
| Skill | Use it for |
|---|---|
| `hig` | **Lookup router**: topic map + fetch method for the canonical HIG; current letter-of-the-law specs; staleness tiebreaker |
| `liquid-glass-design-system` | The current design language: the glass material, system anatomy, migration playbook |
| `apple-navigation-design` | Tabs, push, modality, menus, iPad layout/windowing, pointer |
| `apple-search-design` | Search placement, suggestions, scope bars/tokens, no-results |
| `apple-typography` | SF family, Dynamic Type, text styles |
| `sf-symbols` | Symbol usage, rendering modes, animations, custom symbols |
| `apple-visual-accessibility` | Accessibility settings, contrast, inclusive design |
| `ios-brand-identity` | Expressing brand without breaking native feel |
| `app-icon-design` | Icon craft + the layered Liquid Glass icon system / Icon Composer |
| `widget-design`, `notification-design`, `app-intents-design` | Those system surfaces |
| `chart-experience-design` | In-app charts and the experience around them |
| `sound-design`, `touch-interaction-design` | Audio/haptics; gesture feel and fluid interfaces |

### AI & agents
| Skill | Use it for |
|---|---|
| `ai-experience-design` | Designing AI/ML-backed *features*: confidence, corrections, agent surfaces, pattern vocabulary (wayfinders/tuners/governors), model safety |
| `ai-ui-direction` | Directing/fixing AI-*generated* UI: layout-primitive diagnosis, prompt-vs-edit, the fresh-context judge loop |
| `agentic-coding` | Running coding agents on *your repo* (listed in Coding below — the workflow/mechanics layer) |
| `ai-enablement` | Rolling AI out across an *org*: decision archives behind MCP, company-specific agents, team skills, enablement programs (Shopify, Ramp, Atlassian, OpenAI) |
| `malleable-software` | Software *users* can reshape: expose structure not modes (nightmare bicycle), 40th-hour design, interop/jigs, human-AI work as version control (Litt, Ink & Switch) |

**Boundary:** designing the AI feature → `ai-experience-design` · fixing what AI generated → `ai-ui-direction` · agents working on your code → `agentic-coding` · getting a team/org to adopt AI → `ai-enablement` · letting end users reshape the product → `malleable-software`. The DS-as-AI-context mechanics live in `design-systems`.

### SwiftUI engineering
`swiftui-identity` (the identity/lifetime/dependencies mental model — debug state resets here) · `swiftui-layout` (containers, Layout protocol, navigation structure) · `swiftui-lazy-stacks` (scroll performance) · `swiftui-animation` (springs, transitions, shaders) · `swift-concurrency` (the language layer beneath the trio: structured concurrency, sendability, Swift 6 migration, measure-first performance features).

### Motion & frontend (web)
`web-performance` (load + interaction speed: fluid-UI frame budgets, Core Web Vitals, perf culture) · `web-typography` (CSS/web type practice: measure/leading/scales, choosing & pairing, OpenType craft, font loading — from Rutter, Santa Maria, Latin; Apple platforms → `apple-typography`) · `web-animation-design` (the default theme for web motion values) · `motion` (the Motion AI Kit umbrella — encapsulates best-practices, docs search, CSS spring generation, performance audit, transition visualisation as sub-capabilities) · `make-interfaces-feel-better` + `emil-design-eng` (UI polish craft) · `frontend-design` (building distinctive web UI) · `oklch-skill` (color) · `social-video-safe-zones` · `web-accessibility` (web-scoped a11y practice: AT discipline, semantic-HTML-first priority order, focus mechanics, accessible writing, testing program, org policies — Kalbag + Metts/Welfle; Apple platforms → `apple-visual-accessibility`) · `graphics-fundamentals` *(local-only, gitignored — purchased source)*: the mechanism layer beneath all of these (screens, color spaces, rasterization, blurs, compression) — route "how/why does X actually work" questions there.

### Writing & content
`write-clear-prose` · `ui-voice-and-tone` (product voice + microcopy) · `error-messages` (failure-state copy) · `linear-settings-copy` (settings IA/copy).

### Data visualization
`chart-selection` (pick the chart type) · `tufte-viz` (integrity/data-ink critique) · `chart-experience-design` (in-app chart UX — listed above).

### Coding (non-Apple)
| Skill | Use it for |
|---|---|
| `agentic-coding` | Running coding agents on real projects: constraints, AGENTS.md/project rules, orchestrator role, vibe-coding security |
| `dhh-style` | Writing Rails the 37signals way (fat models, Hotwire, Solid suite, fixtures/Minitest) |
| `dhh` | `/dhh` — review a diff in DHH's literal review voice (calibrated against ~200 of his Fizzy review comments) |
| `rails-webhooks` | Webhook systems: outbox deliveries, failure classification, delinquency circuit breakers, signing, SSRF |
| `rails-migrations` | Safe schema changes: staged rollouts, script backfills, constraint discipline, multi-DB/adapter |
| `rails-security-multitenancy` | Tenant boundaries, Identity→Session→User auth, scoped lookups, SSRF defense, rate limiting |
| `rails-jobs` | Active Job design: `_later`/`_now` naming, idempotency, Solid Queue, recurring jobs, error taxonomy |
| `rails-fixtures-testing` | Testing the fixtures school's way: coverage budget, fixture craft, Turbo/broadcast assertions, multi-tenant test wiring — factory/RSpec suites go to `rails-testing` |
| `rails-hotwire-realtime` | App-level Turbo/Stimulus/broadcast patterns (streams-only vs cable-augmented, morph, optimistic UI) — websocket *scale* goes to `rails-realtime` |
| `layered-rails` | The competing Evil Martians school: extracted layers, Action Policy, transactional integrity, gem selection, Go/Rust extraction rules |
| `inertia-rails` | React-on-Rails without an API layer (the layered school's frontend) |
| `rails-testing` | Test-suite speed (TestProf, factory cascades) and reliability (flaky taxonomy, quarantine, CI parallelization) |
| `rails-realtime` | WebSocket/Action Cable scale: connection avalanches, delivery guarantees, LLM streaming |
| `rails-docker-dev` | Containerized Rails dev environments (Ruby on Whales) + agent sandboxing |
| `optimizing-rails` | Runtime/production Rails performance (profiling, N+1, caching, Puma, GVL, Sidekiq scaling, GC/JIT tuning) |
| `rails-event-sourcing` | The Arkency school: DDD, events, aggregates, read models, process managers — applied selectively |
| `rails-upgrades` | FastRuby's upgrade methodology: dual boot, deprecations-first, broken-build triage |
| `ruby-refactoring` | thoughtbot's Ruby Science smell→refactoring catalog (extraction-school doctrine — route by project) |

**Rails school rule (default: vanilla):** four positions — `dhh-style` (vanilla, the default) → `layered-rails` (extraction, when models/controllers bloat) → packwerk-style module boundaries (when "200 models, zero modules" but simple processes) → `rails-event-sourcing` (when *processes* are the pain). The vanilla school has seven vendored 37signals satellites (`dhh`, `rails-webhooks`, `rails-migrations`, `rails-security-multitenancy`, `rails-jobs`, `rails-hotwire-realtime`, `rails-fixtures-testing` — from `marckohlbrugge/37signals-skills`, mined from Fizzy's PRs); note the testing split: `rails-testing` is the *factories* school, `rails-fixtures-testing` the *fixtures* school — route by the project's existing choice. Escalate only on named pains; pick one school per project and stay consistent; never blend idioms in one codebase. The full router with each school's own warranted/overkill criteria lives in `rails-event-sourcing`.

### Research & cataloging
`source-sweep` (exhaustive coverage of bounded sources: inventory, ledger, open every node) · `archival-research` (research bundles, OCR/transcription corpora) · `catalog-reconciliation-research` · `source-translation-workflow` · `image-archival` · `x-post-reader` · `route-planning`.

### Developer tools as products
`design-systems` (tokens, theming, governance/federation, adoption metrics, DS-as-AI-context — from 9 Config talks) · `devtool-interface-design` (dev-tool UI: contexts, control flow, zones, CLI UX, devtool onboarding, agent experience) · `developer-tool-gtm` (landing pages, copy, conversion, PMF Compass) · `building-in-public` (audience-led indie growth: rough-beats-polished content, prototype-stage validation, company-of-one economics) · `oss-strategy` (OSS popularity, READMEs, maintainer survival, monetization). Boundary: `devtool-interface-design` makes the tool worth adopting; `developer-tool-gtm` gets it adopted; `agentic-coding` is agents working *on your code* while devtool AX is agents as *customers of your tool*.

### Tooling & meta
`creating-skills` / `skill-creator` / `converting-books-to-skills` / `converting-codebases-to-skills` (authoring skills — books/docs vs. living repos with PR history) · `goal` (session goals) · `airtable-mcp`, `nocodb-catalog-management`, `openai-transcription-chunking` (integrations).

## Routing rules (overlap boundaries)

- **Strategy vs tactics:** `design-principles` decides *whether/why*; the specific skills decide *how*. Don't restate principles in tactical work.
- **Motion default:** platform unstated → `web-animation-design` values; SwiftUI/iOS stated → `swiftui-animation`. Never cross-apply web timing values to native or vice versa.
- **Typography split:** web/CSS → `web-typography`; Apple platforms → `apple-typography`; rendering internals (why fonts look different) → `graphics-fundamentals`. Never cross-apply platform conventions.
- **AI chain:** design the AI feature → `ai-experience-design`; fix AI-generated UI → `ai-ui-direction`; agents on your repo → `agentic-coding`; org rollout/context sharing → `ai-enablement`; users reshaping the product → `malleable-software`.
- **Overlapping polish skills** (`make-interfaces-feel-better`, `emil-design-eng`, `web-animation-design`) are *themes*: pick one skill's values and apply them consistently; when a genuine choice surfaces, present a menu rather than silently mixing aesthetics.
- **Words:** name the thing in `naming-features-and-labels` → set the voice in `ui-voice-and-tone` → failure copy in `error-messages` → settings rows in `linear-settings-copy`.
- **Charts:** type in `chart-selection` → in-app experience in `chart-experience-design` → integrity critique in `tufte-viz`.
- **Apple specifics vs current truth:** talk-derived skills carry reasoning and craft; the `hig` skill fetches the canonical current spec. When they disagree, the live HIG wins (skills carry ⚠️ supersession notes where this has already happened).

## Conventions

- **Frontmatter:** `name` + single-line `description` (quoted — descriptions contain `:` characters), ≤1024 chars, written as *what + when + sources + trigger keywords*. Descriptions are the always-loaded routing surface; bodies load on demand.
- **Progressive disclosure:** SKILL.md stays under 500 lines and under the ~5k-token body budget; deep material lives in `references/`. Keep the body to routing rules, durable operating moves, and one load-bearing quote per point; move quote banks, examples, and source texture to references even when the validator is clean.
- **Decision rules go high in the file.** Consumers paginate (a real agent trace read only lines 1–220 and missed a tail section) — put the core framework and decision rules before checklists and appendices; when extending a skill, merge into the relevant section rather than appending at the end.
- **Source fidelity:** WWDC-derived skills cite sessions with URLs; code samples are Apple's verbatim, year-tagged.
- **Staleness policy:** principles are stable; API/platform specifics are dated and carry staleness notes ("verify against current docs"). ⚠️ markers flag where newer guidance supersedes a talk. The HIG what's-new page (https://developer.apple.com/design/whats-new/) drives periodic audits.

## Validation

```
python3 scripts/validate_skills.py
```

Checks every `*/SKILL.md` for: strict-YAML frontmatter, required `name`/`description`, description ≤1024 chars, body ≤500 lines, and resolvable local references. Runs in CI on every push.
