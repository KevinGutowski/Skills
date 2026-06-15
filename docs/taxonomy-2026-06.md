# Library taxonomy (2026-06-12 reorganization plan)

The organizing principle (Kevin: "the details is in the abstractions" / "skill organization + the graph references are key"):

**Top-level = a platform you target, an activity you do, or a cross-domain tool. Topics nest under the platform or activity they serve. Nesting never severs access: every inbound edge from another skill is preserved as an explicit cross-reference to `cluster` (member reference) — the "connection nodes."**

## Levels

- **Platform clusters:** `rails` · `swiftui` · `apple-design` (+hig, +chart-experience-design per this plan) · `web-design` (new)
- **Activity skills (flat):** frontend-design (build UI) · design-polish (refine) · design-systems · design-principles (judge) · design-prototyping (validate) · user-research · user-onboarding · shape-up · product-decision-making · logo-design · learning-experience-design · photographic-lighting · hardware-product-design (literally physical goods) · malleable-software · ai-experience-design (designing AI INTO the product — deliberately apart from working-with-ai) · design-org-influence (influence up/sideways) · people-management (manage down) · building-in-public · feature-discoverability · notification-design
- **Activity clusters (new):** `ux-writing` · `working-with-ai` · `devtools` · `client-work`
- **Existing knowledge clusters:** data-viz · creating-skills · research-cataloging
- **Cross-domain tools (flat):** x-post-reader · route-planning · motion (vendor kit) · write-clear-prose · dhh (user-invocable /dhh — commands must stay top-level to remain invocable)
- **Local-only (gitignored):** graphics-fundamentals · interface-craft-principles · goal

## This reorganization

| Cluster | Members |
|---|---|
| `web-design` (new) | web-typography, web-accessibility, web-animation-design (stays the DEFAULT motion theme — stated at router level), web-performance, form-design, oklch-skill, social-video-safe-zones* |
| `ux-writing` (new) | ui-voice-and-tone, error-messages, linear-settings-copy, naming-features-and-labels |
| `working-with-ai` (new) | agentic-coding, ai-ui-direction, ai-enablement |
| `devtools` (new) | devtool-interface-design, developer-tool-gtm, oss-strategy |
| `client-work` (new) | client-engagements, pricing-creative-work |
| `apple-design` (extend) | + hig (domain-bound lookup tool; cross-domain reach preserved via inbound edges), + chart-experience-design (Swift Charts/Audio Graphs — general viz stays in data-viz) |

*Flagged loose fit: social-video-safe-zones is screen composition for social video, not strictly web; placed here as nearest family. Revisit if a media/composition cluster ever forms.

Flagged-and-rejected: building-in-public into client-work (audience-building ≠ client service); feature-discoverability+notification-design pairing (cross-platform activities, forced grouping worse than a longer list); nesting `motion` (vendor kit with own sub-capabilities).

## Graph rules (binding for any future consolidation)

1. Corpus-wide edge remap: every mention of a member in other skills' descriptions/bodies becomes `cluster` (member reference); arrow targets in descriptions become `→ cluster`.
2. Independent grep audit after the remap: zero dangling member names outside the cluster and docs/ history.
3. Before/after routing probes gate the change (targets + keyword-free + controls); revert if AFTER < BEFORE.
4. Every absorbed member keeps a `*Scope: <old description>*` line so its routing vocabulary survives for readers.
5. Cluster descriptions pool the members' trigger vocabulary (≤700 chars); boundary clauses are bidirectional.
6. User-invocable commands (dhh, goal) cannot be nested — invocation requires top-level listing.

End state: ~33 top-level skills, one altitude.
