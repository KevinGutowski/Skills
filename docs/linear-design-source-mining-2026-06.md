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
| https://linear.app/quality/01 — Dick Costolo, YouTube `4H02CfUT8sY` | Read via YouTube captions | Medium-high | Two-week assumption deletion, mistake correction vs prevention, small-team vision, communication architecture |
| https://linear.app/quality/02 — Karri Saarinen, YouTube `R1bwdtQL5uU` | Read via YouTube captions | Medium | Quality as a requirement, trust as decision-speed substrate, intuition as accumulated experience |
| https://linear.app/quality/03 — Jeff Weinstein, YouTube `MJAmliXAGLg` | Read via YouTube captions | High | Cancel-the-day problem test, surprisingly-great language, outage/scream signal, avoid polishing wrong product |
| https://linear.app/quality/04 — Henry Modisett, YouTube `T8NWvs99qFY` | Read via YouTube captions | High | Concrete ownership, decisive craft calls, rolling 80/20 loop, weekly revisit of cut corners |
| https://linear.app/quality/05 — Adena Nadler, YouTube `2Q7nROEZp-c` | Read via YouTube captions | Medium | Decision-speed inputs, feature-vs-stability switch/stay rule, bar-setting without overbuilding |
| https://linear.app/quality/06 — Tara Feener, YouTube `j-gjKi-yfmU` | Read via YouTube captions | High | Product-ideas to product-updates to dogfood loop, unship when it feels wrong, leave-out discipline, interrogate literal feature requests |
| https://linear.app/quality/07 — Basheer Tome, YouTube `6DmkIHEHBlw` | Read via YouTube captions | Medium-high | Communication as craft prerequisite, priority enables no, least-lying product story, concept vs execution quality |
| https://linear.app/quality/08 — Kevin Twohy, YouTube `KkmdK6al0dE` | Read via YouTube captions | Medium-high | Make-right-thing vs make-thing-right phase distinction, rough data-model checks, future-perfect prototype, iceberg/pipeline warning |
| https://linear.app/quality/09 — Ethan Eismann, YouTube `BIS78fq1zs8` | Read via YouTube captions | High | Engineers trained in craft language, bets over waterfall definition, sculpt/mold with implementation feedback, five craft factors |
| https://linear.app/quality | Read | Medium | Series index; video transcript details recorded in `design-craft/references/sources.md` |

Skipped as primary design folds: craft-category articles that were primarily infrastructure announcements (`multi-region`, `sync engine`) or product/AI implementation details without a new reusable design rule beyond the files above.

## Fold Map

| Lesson | Owning skill |
| --- | --- |
| Redesign debt, scope, stress tests, feature-flag rollout, Quality Wednesdays, quality triage, dogfood/unshipping, taste calibration | `design-craft` + `design-craft/references/linear-product-craft.md` |
| Design is problem/context fit, not output or code | `design-principles` |
| Concept car, crash tests, view/state matrices, flag toggles for comparison | `design-prototyping` |
| LCH/OKLCH theming, minimal inputs, contrast axis, internal token editor | `design-systems` + `web-design` (oklch-skill) |
| Agent identity, disclosure, sessions, delegated accountability, reasoning panels | `ai-experience-design` |
| Settings as personalization/onboarding surface | `ux-writing` (linear-settings-copy) |
| Agent-era product development as shared context plus review loop | `working-with-ai` (agentic-coding) |
| Remote work/project system as autonomy, focus, and written context | `shape-up` |

## Prompt Coverage Check

| Requested signal | Status | Notes |
| --- | --- | --- |
| Concrete quality rituals | Folded + already covered | Quality Wednesdays comes from the article set; Tara Feener's product-ideas/product-updates/dogfood loop came from episode 06. No distinct transcript evidence for feature roasts or paper-cut programs beyond the existing Quality Wednesdays mechanism. |
| Quality triage rules | Folded | Added wrong product vs rough execution, repeated-use jank/trust leaks, switch-vs-stay, mistake correction over permission culture, and scope deletion as the quality lever. |
| Decision speed | Folded + existing | Named deciders, ownership, and rolling 80/20 revisit were folded into `design-craft`; broader fast-decision doctrine was already in `shape-up`. |
| Unshipping / rollback | Folded | Episode 06 added the internal "feels wrong -> unship" loop and the rule that removing a built feature is quality practice, not failure. |
| Scope as the quality lever | Folded + existing | Costolo's two-week assumption deletion and Modisett's rolling 80/20 sharpened an existing shape-up/design-craft principle. |
| Dogfooding signals | Folded | Internal prototype use, old/new comparison, and product-update context were folded into the dogfood/unshipping loop. |
| Taste calibration | Folded | Added named deciders, engineer craft language, inclusive quality vocabulary, and phase-fit artifacts. |
| Invisible details | Already covered | The contextual-menu safe-area article remains the stronger source; transcripts added examples of "small" or "one step" improvements but no better mechanism. |
| Craft debt | Already covered + no new transcript signal | The article-backed Quality Wednesdays label/tracking mechanism owns this; captions did not add a separate quality-debt system. |
| Interface feel language | Folded | Added "surprisingly great", "feels wrong", "works the way you work", "well-crafted"/"less-crafted", and "switch"/"stay" as critique vocabulary. |

## Parked

- Linear's 2026 press links include interviews and videos that likely add org/process nuance. They were outside the requested article cluster and should be mined separately if the goal becomes Linear company/product operating model rather than design-skill guidance.
- Quality-series transcript pass deliberately skipped generic "quality matters" philosophy and claims already folded in `shape-up` / `design-principles`: zero-bug policy, quality through scope, broad fast-decision doctrine, Belief/Care/Craft, and MVP-to-MLP framing. The new fold only adds sharper mechanisms for design-craft practice: triage, dogfood/unshipping, named deciders, engineer craft language, and phase-fit artifacts.
- `linear-liquid-glass` has SwiftUI shader implementation detail. I folded the design decision and accessibility/material stance, not code recipes; platform-specific implementation should route to `swiftui` or `apple-design` if mined later.
