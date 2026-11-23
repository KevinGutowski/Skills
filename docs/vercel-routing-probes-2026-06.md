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
| V16 | "Make this settings page look better." | `design-craft` | Plain polish request on existing UI; control against `frontend-design` (new build). |
| V17 | "Fix the jank on our dashboard: buttons shift when data loads and the menus just blink in." | `design-craft` | Visual/interaction jank on existing UI, not frame drops. |
| V18 | "Scrolling this list drops frames; audit the animation code for jank." | `motion` | Control: performance jank must not route to `design-craft`. |
| V19 | "We hardcode colors everywhere and have five different buttons. Sort it out." | `design-systems` | Hands-on extraction from shipped UI; control against `design-craft` (polish) and `frontend-design` (new build). |
| V20 | "Move every screen in the app onto our new component library and prove nothing broke." | `design-systems` | Migration run; control against `working-with-ai` (generic agent fleet). |
| V21 | "Write the docs entry for our Select component from its code and where we actually use it." | `design-systems` | Component docs; control against `ux-writing` and `devtools`. |
| V22 | "Check the checkout page before I ship. It feels laggy on my phone." | `interface-review` | Control: one named screen must not route to `design-systems`. |
| V23 | "I love these three typefaces but can't license them for the app. Can you build us our own font that feels like them?" | `make-font` | New tool skill; control against `web-design` and `logo-design`. |
| V24 | "Which two fonts should we pair for the marketing site, and how do I set the type scale?" | `web-design` | Control: choosing and setting existing fonts must not route to `make-font`. |
| V25 | "Our landing page hero needs a fake version of the app with a cursor clicking through the assign flow, looping." | `faux-ui` | New skill; control against `frontend-design` (the real screen) and `web-design` (animation values). |
| V26 | "Lay out a bento grid for the features section. Right now every tile is a tiny screenshot of the dashboard." | `faux-ui` | Bento set planning; control against `frontend-design` and `devtools` (landing page). |
| V27 | "The assign menu in our actual dashboard animates too slowly and the dropdown feels janky. Fix the timing." | `web-design` | Control: motion in the working product must not route to `faux-ui`. |
| V28 | "Build the settings page for the app: sections, form fields, save states." | `frontend-design` | Control: a real product screen must not route to `faux-ui`. |
| V29 | "I want to draw a little hand-made SVG spot illustration of a person holding a phone for the empty state." | `frontend-design` | Control: illustration is outside `faux-ui`; the svg-illustration reference owns it. |
| V30 | "Here's a screen recording of a landing page I love. Turn it into a prompt my agent can build from without ripping it off." | `working-with-ai` | New reference-to-build-prompt member; control against `frontend-design` and `creating-skills`. |
| V31 | "My three.js chrome sphere looks flat and gray and the far water shimmers. How do I light and filter the scene properly?" | `creative-coding` | New threejs-scene-craft reference; control against `graphics-fundamentals` and `motion`. |

## Scoring

- **Retrieval pass:** expected first skill or explicitly accepted pair.
- **Boundary pass:** nearest-neighbor controls do not take over.
- **Application pass:** the agent reports mode, loaded references, evidence source, and whether the outcome is guidance, exemplar, lint/eval, coverage gap, or no change.
- **Regression rule:** a description change that improves one probe but breaks a control is not done.
