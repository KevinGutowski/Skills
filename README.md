# Skills

A curated library of Claude Code skills. The largest cluster is a design library distilled from ~94 Apple WWDC sessions, the Human Interface Guidelines, and Apple's design case studies — organized by **theme, not by source**: one skill may aggregate several talks, and cross-references route between skills instead of duplicating content.

## Which skill do I want?

### Design strategy & critique
| Skill | Use it for |
|---|---|
| `design-principles` | Whether/why decisions, design critique, trade-offs (purpose, agency, craft, delight…) — the strategic layer the rest sit under |
| `design-prototyping` | Validating ideas before building: fake-it → SwiftUI-as-design-tool → coding agents; presenting design work |
| `naming-features-and-labels` | What to call a feature, label, plan, button |
| `feature-discoverability` | First launches, tips/TipKit, features users can't find |
| `user-onboarding` | First-run flows, empty states, onboarding copy (Hulick method) |
| `shape-up` | Product scoping/betting (Basecamp method) |

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
| `ai-experience-design` | ML/LLM-backed feature design, generative UX, model safety |

### SwiftUI engineering
`swiftui-identity` (the identity/lifetime/dependencies mental model — debug state resets here) · `swiftui-layout` (containers, Layout protocol, navigation structure) · `swiftui-lazy-stacks` (scroll performance) · `swiftui-animation` (springs, transitions, shaders).

### Motion & frontend (web)
`web-animation-design` (the default theme for web motion values) · `motion` / `motion-javascript` / `motion-audit` / `css-spring` / `see-transition` (Motion library, perf audits, spring tooling) · `make-interfaces-feel-better` + `emil-design-eng` (UI polish craft) · `frontend-design` (building distinctive web UI) · `oklch-skill` (color) · `social-video-safe-zones`.

### Writing & content
`write-clear-prose` · `ui-voice-and-tone` (product voice + microcopy) · `error-messages` (failure-state copy) · `linear-settings-copy` (settings IA/copy).

### Data visualization
`chart-selection` (pick the chart type) · `tufte-viz` (integrity/data-ink critique) · `chart-experience-design` (in-app chart UX — listed above).

### Coding (non-Apple)
| Skill | Use it for |
|---|---|
| `agentic-coding` | Running coding agents on real projects: constraints, AGENTS.md/project rules, orchestrator role, vibe-coding security |
| `dhh-style` | Writing Rails the 37signals way (fat models, Hotwire, Solid suite, fixtures/Minitest) |
| `layered-rails` | The competing Evil Martians school: extracted layers, Action Policy, transactional integrity, gem selection, Go/Rust extraction rules |
| `inertia-rails` | React-on-Rails without an API layer (the layered school's frontend) |
| `rails-testing` | Test-suite speed (TestProf, factory cascades) and reliability (flaky taxonomy, quarantine, CI parallelization) |
| `rails-realtime` | WebSocket/Action Cable scale: connection avalanches, delivery guarantees, LLM streaming |
| `rails-docker-dev` | Containerized Rails dev environments (Ruby on Whales) + agent sandboxing |
| `optimizing-rails` | Runtime/production Rails performance (profiling, N+1, caching, Puma, GVL, Sidekiq scaling, GC/JIT tuning) |
| `rails-event-sourcing` | The Arkency school: DDD, events, aggregates, read models, process managers — applied selectively |
| `rails-upgrades` | FastRuby's upgrade methodology: dual boot, deprecations-first, broken-build triage |
| `ruby-refactoring` | thoughtbot's Ruby Science smell→refactoring catalog (extraction-school doctrine — route by project) |

**Rails school rule (default: vanilla):** four positions — `dhh-style` (vanilla, the default) → `layered-rails` (extraction, when models/controllers bloat) → packwerk-style module boundaries (when "200 models, zero modules" but simple processes) → `rails-event-sourcing` (when *processes* are the pain). Escalate only on named pains; pick one school per project and stay consistent; never blend idioms in one codebase. The full router with each school's own warranted/overkill criteria lives in `rails-event-sourcing`.

### Research & cataloging
`archival-research` (research bundles, OCR/transcription corpora) · `catalog-reconciliation-research` · `source-translation-workflow` · `image-archival` · `x-post-reader` · `route-planning`.

### Developer tools as products
`devtool-interface-design` (dev-tool UI: contexts, control flow, zones, CLI UX, devtool onboarding, agent experience) · `developer-tool-gtm` (landing pages, copy, conversion, PMF Compass) · `oss-strategy` (OSS popularity, READMEs, maintainer survival, monetization). Boundary: `devtool-interface-design` makes the tool worth adopting; `developer-tool-gtm` gets it adopted; `agentic-coding` is agents working *on your code* while devtool AX is agents as *customers of your tool*.

### Tooling & meta
`creating-skills` / `skill-creator` / `converting-books-to-skills` (authoring skills) · `goal` (session goals) · `airtable-mcp`, `nocodb-catalog-management`, `openai-transcription-chunking` (integrations).

## Routing rules (overlap boundaries)

- **Strategy vs tactics:** `design-principles` decides *whether/why*; the specific skills decide *how*. Don't restate principles in tactical work.
- **Motion default:** platform unstated → `web-animation-design` values; SwiftUI/iOS stated → `swiftui-animation`. Never cross-apply web timing values to native or vice versa.
- **Overlapping polish skills** (`make-interfaces-feel-better`, `emil-design-eng`, `web-animation-design`) are *themes*: pick one skill's values and apply them consistently; when a genuine choice surfaces, present a menu rather than silently mixing aesthetics.
- **Words:** name the thing in `naming-features-and-labels` → set the voice in `ui-voice-and-tone` → failure copy in `error-messages` → settings rows in `linear-settings-copy`.
- **Charts:** type in `chart-selection` → in-app experience in `chart-experience-design` → integrity critique in `tufte-viz`.
- **Apple specifics vs current truth:** talk-derived skills carry reasoning and craft; the `hig` skill fetches the canonical current spec. When they disagree, the live HIG wins (skills carry ⚠️ supersession notes where this has already happened).

## Conventions

- **Frontmatter:** `name` + single-line `description` (quoted — descriptions contain `:` characters), ≤1024 chars, written as *what + when + sources + trigger keywords*. Descriptions are the always-loaded routing surface; bodies load on demand.
- **Progressive disclosure:** SKILL.md stays under 500 lines; deep material lives in `references/`.
- **Decision rules go high in the file.** Consumers paginate (a real agent trace read only lines 1–220 and missed a tail section) — put the core framework and decision rules before checklists and appendices; when extending a skill, merge into the relevant section rather than appending at the end.
- **Source fidelity:** WWDC-derived skills cite sessions with URLs; code samples are Apple's verbatim, year-tagged.
- **Staleness policy:** principles are stable; API/platform specifics are dated and carry staleness notes ("verify against current docs"). ⚠️ markers flag where newer guidance supersedes a talk. The HIG what's-new page (https://developer.apple.com/design/whats-new/) drives periodic audits.

## Validation

```
python3 scripts/validate_skills.py
```

Checks every `*/SKILL.md` for: strict-YAML frontmatter, required `name`/`description`, description ≤1024 chars, body ≤500 lines, and resolvable local references. Runs in CI on every push.
