# Vercel-Pattern Routing Probe Results

Probe source: `docs/vercel-routing-probes-2026-06.md`
Packet builder: `python3 scripts/build_vercel_probe_packet.py`

## 2026-06-26 Deterministic Fixture Check

Command: `python3 -B scripts/check_vercel_routing_probes.py`

Result: pass. The fixture has 15 contiguous probes, every expected skill exists in the local skill set, the generated probe packet includes each probe ID and prompt, and `~/.claude/skill-evals/routing-eval.md` probes 115-129 match the repo-local prompt and first-skill expectations when present.

## 2026-06-29 Fresh Descriptions-Only Judge

Judge: Kepler (`019f15ca-9c65-7251-b637-4c96f47c92b4`)
Authorization: user approved the fresh-judge/subagent pass on 2026-06-29.
Setup: `fork_context=false`; the judge was instructed to use only the generated routing packet descriptions and probes, not skill bodies, repo files, or external context.

Result: pass, 15/15 probes.

| Probe | First skill | Second skill if needed | Result | Rationale |
| --- | --- | --- | --- | --- |
| V1 | `creating-skills` | `working-with-ai` | Pass | Converting repeated PR feedback into reusable agent guidance, examples, and checks is skill authoring; agent behavior rules also need AI-workflow guidance. |
| V2 | `working-with-ai` |  | Pass | CLAUDE.md rules for coding agents are explicitly covered by `working-with-ai`. |
| V3 | `design-systems` |  | Pass | The description directly covers design systems as AI context. |
| V4 | `design-systems` | `creating-skills` | Pass | The core issue is design-system component governance; agent-facing documentation/checks may require skill guidance. |
| V5 | `design-craft` |  | Pass | "Feels off" and repeated polish debates match `design-craft`'s quality rituals and UI polish remit. |
| V6 | `frontend-design` |  | Pass | Building a distinctive landing page that avoids generic AI aesthetics is exactly `frontend-design`. |
| V7 | `ai-experience-design` |  | Pass | Confidence display and calibration without raw percentages match AI experience design. |
| V8 | `ai-experience-design` |  | Pass | Designing AI suggestions inside an existing workflow is an AI/agent UX problem. |
| V9 | `ux-writing` | `creating-skills` | Pass | Settings-page copy rules start with UX writing; making agents cite source rules in reviews requires encoding guidance/checks. |
| V10 | `user-onboarding` |  | Pass | Empty dashboard, first-run path, and example states are onboarding/empty-state strategy. |
| V11 | `product-decision-making` |  | Pass | Choosing setting vs default behavior vs onboarding step is a product decision. |
| V12 | `design-prototyping` |  | Pass | Validating a prototype before production maps to prototype validation and review structure. |
| V13 | `creating-skills` |  | Pass | Folding repo and PR-history lessons into skills is explicitly `creating-skills`. |
| V14 | `design-systems` |  | Pass | Generated UI using tokens and component APIs is design-system architecture and adoption. |
| V15 | `creating-skills` |  | Pass | Auditing trigger text, sources, examples, and tests is skill-library maintenance. |

## 2026-06-26 Current-Agent Sanity Pass

This pass was not a formal fresh-context judge. The available subagent tool requires explicit user authorization for delegation, so this record only captures a descriptions-and-boundaries sanity pass from the current agent. Treat it as weaker evidence than the existing routing-eval fresh-agent results.

| # | Expected | Result | Notes |
| --- | --- | --- | --- |
| V1 | `creating-skills` + `working-with-ai` | Pass | Evidence-to-skill architecture triggers both; packaging first. |
| V2 | `working-with-ai` | Pass | CLAUDE.md/repo-agent wording should beat `ux-writing`. |
| V3 | `design-systems` | Pass | Design system as agent context is explicit in description. |
| V4 | `design-systems` + `creating-skills` | Pass | Component misuse/lint decision starts in DS, then packaging. |
| V5 | `design-craft` | Pass | "feels off", polish, review quality ritual all route there. |
| V6 | `frontend-design` | Pass | Bold landing page and generic AI output are generation/aesthetic signals. |
| V7 | `ai-experience-design` | Pass | Confidence display for an AI feature is explicit. |
| V8 | `ai-experience-design` | Pass | Product workbench where AI suggestions land is product-agent UX. |
| V9 | `ux-writing` + `creating-skills` | Pass | Copy rule source and settings-page wording route to `ux-writing`, packaging second. |
| V10 | `user-onboarding` | Pass | Empty dashboard and first-run path match description. |
| V11 | `product-decision-making` | Pass | Setting/default/onboarding choice is a product decision before UI. |
| V12 | `design-prototyping` | Pass | Prototype eval fixture route is explicit after the P1 note. |
| V13 | `creating-skills` | Pass | Source repo and PR history folding match conversion trigger. |
| V14 | `design-systems` | Pass | Tokens/component APIs/raw classes is DS-as-agent-context. |
| V15 | `creating-skills` | Pass | Collection-level skill audit and missing tests match skill authoring/improvement. |

Next formal step: rerun `python3 scripts/build_vercel_probe_packet.py` and repeat the fresh descriptions-only judge after future description or routing-probe changes.
