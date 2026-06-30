# Vercel-Pattern Routing Probes

Purpose: test whether the Vercel-pattern overhaul loads the right skill before judging whether the skill follows the rule. These probes should be run with a fresh descriptions-only judge after description edits or after adding exemplars/coverage-gap conventions.

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| V1 | "We keep giving the same PR feedback on destructive modals. Turn it into agent guidance, examples, and checks." | `creating-skills` + `working-with-ai` | Target: evidence-to-skill architecture. |
| V2 | "Write CLAUDE.md rules so our coding agent stops reinventing product copy patterns." | `working-with-ai` | Control: should not route first to `ux-writing`; this is repo-agent behavior. |
| V3 | "Our design system should be usable as context for agents building screens." | `design-systems` | Target: token/component substrate. |
| V4 | "Agents keep using the wrong component from our design system. Should this be linted or documented?" | `design-systems` + `creating-skills` | Must separate mechanical rule from judgment guidance. |
| V5 | "This dashboard feels off and the team keeps debating the same polish issues in review." | `design-craft` | Target: quality ritual -> evidence loop. |
| V6 | "Build a bold landing page that does not look like generic AI output." | `frontend-design` | Control: should not route to Vercel governance work. |
| V7 | "The AI feature needs to explain confidence without exposing raw model percentages." | `ai-experience-design` | Control: product AI UX, not repo-agent standards. |
| V8 | "Design a workbench where AI suggestions land in our existing triage UI." | `ai-experience-design` | Product-agent surface. |
| V9 | "Make agents follow our settings-page copy rules and cite the source rule in reviews." | `ux-writing` + `creating-skills` | Copy rule IDs/exemplars. |
| V10 | "Users land on an empty dashboard; design the first-run path and decide which states need examples." | `user-onboarding` | Onboarding surface examples. |
| V11 | "Should we build this workflow as a setting, default behavior, or onboarding step?" | `product-decision-making` | Product decision before UI execution. |
| V12 | "Validate this prototype with an eval fixture before we turn it into production UI." | `design-prototyping` | Prototype/eval route. |
| V13 | "Go through this source repo and its PR history and fold the lessons into my skills." | `creating-skills` | Conversion/source-mining route. |
| V14 | "Make our app's generated UI use our tokens and component APIs instead of raw class names." | `design-systems` | Mechanical substrate and possible linting. |
| V15 | "Audit every skill and tell me where trigger text, sources, examples, and tests are missing." | `creating-skills` | Collection-level audit. |

## Scoring

- **Retrieval pass:** expected first skill or explicitly accepted pair.
- **Boundary pass:** nearest-neighbor controls do not take over.
- **Application pass:** the agent reports mode, loaded references, evidence source, and whether the outcome is guidance, exemplar, lint/eval, coverage gap, or no change.
- **Regression rule:** a description change that improves one probe but breaks a control is not done.
