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
`dhh-style` (Rails/37signals conventions) · `optimizing-rails` (Rails performance) · `agentic-coding` (running coding agents on real projects: constraints, AGENTS.md/project rules, orchestrator role, vibe-coding security).

### Research & cataloging
`archival-research` (research bundles, OCR/transcription corpora) · `catalog-reconciliation-research` · `source-translation-workflow` · `image-archival` · `x-post-reader` · `route-planning`.

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
- **Source fidelity:** WWDC-derived skills cite sessions with URLs; code samples are Apple's verbatim, year-tagged.
- **Staleness policy:** principles are stable; API/platform specifics are dated and carry staleness notes ("verify against current docs"). ⚠️ markers flag where newer guidance supersedes a talk. The HIG what's-new page (https://developer.apple.com/design/whats-new/) drives periodic audits.

## Validation

```
python3 scripts/validate_skills.py
```

Checks every `*/SKILL.md` for: strict-YAML frontmatter, required `name`/`description`, description ≤1024 chars, body ≤500 lines, and resolvable local references. Runs in CI on every push.
