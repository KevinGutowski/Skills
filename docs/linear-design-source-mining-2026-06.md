# Linear Design Source Mining, 2026-06

## Scope

The user pointed at Linear's 2024 UI redesign write-up and asked for a deep fold of Linear design articles into the skill library. I screened the full Linear `now/craft` index as of 2026-06-17, then read the design-dense posts rather than folding every engineering announcement.

## Source Manifest

| Source | Read | Density | Fold |
| --- | --- | --- | --- |
| https://linear.app/now/a-design-reset | Yes | High | Redesign timing, design debt, CEO air cover, concept car framing |
| https://linear.app/now/how-we-redesigned-the-linear-ui | Yes | High | Scope control, stress tests, milestones, feature-flag dogfood, color system, small-team execution |
| https://linear.app/now/behind-the-latest-design-refresh | Yes | High | Attention hierarchy, structure felt-not-seen, dev toolbar, internal color picker, agents for exploration |
| https://linear.app/now/output-isn-t-design | Yes | High | Design as fit between form and context; generated output is not problem resolution |
| https://linear.app/now/design-is-more-than-code | Yes | High | Problem framing, conceptual vs execution stage, code as material after intent |
| https://linear.app/now/why-is-quality-so-rare | Yes | High | Quality as business strategy; belief/care/craft; internal-only MVPs; no handoffs |
| https://linear.app/now/quality-wednesdays | Yes | High | Team ritual for noticing and fixing small quality defects |
| https://linear.app/now/design-for-the-ai-age | Yes | High | AI workbench, form around function, beyond chat |
| https://linear.app/now/how-we-built-triage-intelligence | Yes | High | AI reasoning visibility, source/reasoning transparency, natural workflow integration |
| https://linear.app/now/our-approach-to-building-the-agent-interaction-sdk | Yes | High | Agent identity, disclosure, scoped permissions, session state, delegation vs assignment |
| https://linear.app/now/linear-liquid-glass | Yes | Medium-high | Own material when product constraints need it; ProKit-style clarity over flourish; accessibility parity |
| https://linear.app/now/settings-are-not-a-design-failure | Yes | Medium-high | Settings as comfort, onboarding, education, and preferences rather than failure |
| https://linear.app/now/invisible-details | Yes | Medium | Context-menu safe-area detail; shortcuts discovered through menus |
| https://linear.app/now/how-we-built-project-updates | Yes | Medium | Move work reports into the context of work; qualitative status beats only metrics |
| https://linear.app/next | Yes | High | Context/agents as the post-handoff product-development system |
| https://linear.app/now/self-driving-saas | Yes | High | Autonomy ladder; AI should move work forward, not only wait for prompts |
| https://linear.app/now/coding-sessions-for-linear-agent | Yes | High | Shared agent sessions, issue context, review beside product discussion |
| https://linear.app/now/designing-remote-work-at-linear | Yes | Medium-high | Remote work as designed operating system: autonomy, focus, flags, written updates, goalie rotation |
| https://linear.app/quality/01 ... /09 | Screened | Medium | Episode pages expose title/guest/summary only; YouTube captions blocked by bot check, so no unsupported transcript fold |
| https://linear.app/quality | Screened | Medium | Already represented through existing Linear quality-series folds; retained as source context |

Skipped as primary design folds: craft-category articles that were primarily infrastructure announcements (`multi-region`, `sync engine`) or product/AI implementation details without a new reusable design rule beyond the files above.

## Fold Map

| Lesson | Owning skill |
| --- | --- |
| Redesign debt, scope, stress tests, feature-flag rollout, Quality Wednesdays | `design-craft` + `design-craft/references/linear-product-craft.md` |
| Design is problem/context fit, not output or code | `design-principles` |
| Concept car, crash tests, view/state matrices, flag toggles for comparison | `design-prototyping` |
| LCH/OKLCH theming, minimal inputs, contrast axis, internal token editor | `design-systems` + `web-design` (oklch-skill) |
| Agent identity, disclosure, sessions, delegated accountability, reasoning panels | `ai-experience-design` |
| Settings as personalization/onboarding surface | `ux-writing` (linear-settings-copy) |
| Agent-era product development as shared context plus review loop | `working-with-ai` (agentic-coding) |
| Remote work/project system as autonomy, focus, and written context | `shape-up` |

## Parked

- Linear's 2026 press links include interviews and videos that likely add org/process nuance. They were outside the requested article cluster and should be mined separately if the goal becomes Linear company/product operating model rather than design-skill guidance.
- YouTube captions for Linear's *Conversations on Quality* episodes were not available without a bot-check login. The episode pages were screened, but I did not fold claims from inaccessible video content.
- `linear-liquid-glass` has SwiftUI shader implementation detail. I folded the design decision and accessibility/material stance, not code recipes; platform-specific implementation should route to `swiftui` or `apple-design` if mined later.
