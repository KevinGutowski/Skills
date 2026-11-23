# Vercel Skills Intake Routing Probes

Purpose: test the two skills added by the Vercel skills intake ([ledger](vercel-skills-source-mining-2026-11.md)), `react` and `browser-verification`, against their nearest neighbors. The first pass edited no existing description. A follow-up pass the same day edited two (`write-clear-prose`, `design-systems`); R18 and R20–R24 cover those edits and their controls.

Blind packet (descriptions and prompts, no expected answers): `python3 scripts/check_routing_probe_fixtures.py --packet docs/vercel-skills-routing-probes-2026-11.md`
Fixture check: `python3 scripts/check_routing_probe_fixtures.py`

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| R1 | "I added width and height to the hero image to fix layout shift. Open the page and prove the CLS actually went down." | `browser-verification` | Target: runtime proof. `web-design` is an accepted second skill. |
| R2 | "Dogfood our staging app and give me a bug report with repro steps and screenshots for each issue." | `browser-verification` | Target: exploratory QA. Must not go to `interface-review`. |
| R3 | "Use Chrome's modern web guidance to rebuild this confirm dialog, then check focus and reduced motion in a real browser." | `browser-verification` | Target: guidance-then-verify. `web-design` is an accepted second skill. |
| R4 | "Log into our preview deployment with agent-browser and confirm the new settings page renders in dark mode." | `browser-verification` | Target: tool trigger. |
| R5 | "Review this Next.js page: it awaits the session, then the config, then three queries one after another. What do I fix first?" | `react` | Target: waterfall review. |
| R6 | "Our Composer component has nine boolean props like isThread and isEditing. How should I restructure it?" | `react` | Target: composition. Must not go to `design-systems` or `frontend-design`. |
| R7 | "The settings route ships a 900 KB client bundle. The rich text editor and analytics load on first paint. How do I cut it?" | `react` | Target: bundle. `web-design` is an accepted second skill. |
| R8 | "Add a shared-element morph from the product card to the detail page with React's ViewTransition in the App Router." | `react` | Target: view transitions API. `web-design` is an accepted second skill for values. |
| R9 | "Do a full UX audit of this checkout flow and rank the problems by severity." | `interface-review` | Neighbor: design audit must not go to `browser-verification`. |
| R10 | "What's a good LCP budget for a marketing page, and how should we triage what to defer?" | `web-design` | Neighbor: performance doctrine must not go to `react` or `browser-verification`. |
| R11 | "Build a striking landing page hero for a synth company in React and Tailwind." | `frontend-design` | Neighbor: distinctive UI generation must not go to `react`. |
| R12 | "Our AnimatePresence exit animation doesn't run on route change. We're on motion/react." | `motion` | Neighbor: library work must not go to `react`. |
| R13 | "How long should a dropdown's open animation be, and what easing?" | `web-design` | Neighbor: motion values. |
| R14 | "Write AGENTS.md rules and a review loop so coding agents stop breaking our monorepo." | `working-with-ai` | Neighbor: agent workflow must not go to `browser-verification`. |
| R15 | "Should this skill ship as a stub that asks the CLI for its docs, or as a normal skill with references?" | `creating-skills` | Neighbor: skill authoring (new delivery-patterns reference). |
| R16 | "Fix the Turbo Frame that flashes a spinner on every navigation in our Rails app." | `rails` | Control: must not go to `react`. |
| R17 | "My SwiftUI list loses scroll position when the data refreshes." | `swiftui` | Control. |
| R18 | "Review this API docs page for voice, headings, and code sample formatting." | `write-clear-prose` | Target after the 2026-11-18 description edit ("documentation pages" added). `devtools` is an accepted second skill. |
| R19 | "Our CLI hangs in CI waiting on a confirm prompt and agents can't parse its errors. How should --yes, --json, stderr and exit codes behave?" | `devtools` | Neighbor: CLI contract (new cli-for-humans-and-agents reference). Must not go to `working-with-ai`. |
| R20 | "Our Button drops consumer refs and classNames, and teams keep copying it. Review its API contract and decide whether we ship via npm or a shadcn-style registry." | `design-systems` | Target after the 2026-11-18 description edit ("component API contracts", "component library"). `react` is an accepted second skill. |
| R21 | "Define semantic color tokens and a theming strategy for our three brands." | `design-systems` | Regression control for the edited description. |
| R22 | "Design an icon set for our product and decide between an icon font and SVG components." | `design-systems` | Regression control: the "icon font" trigger was removed to make room. |
| R23 | "Tighten this essay and cut the clutter without losing my voice." | `write-clear-prose` | Regression control for the edited description. |
| R24 | "Rewrite the error message and button label on this delete dialog." | `ux-writing` | Regression control: UI words must not move to `write-clear-prose`. |

## Scoring

- **Retrieval pass:** the judge's first skill matches, or matches an accepted pair named in Notes.
- **Boundary pass:** neighbors and controls are not taken by `react` or `browser-verification`.
- **Regression rule:** a new description that wins its targets but takes a neighbor or control is not done.

## Results

Recorded in [vercel-skills-source-mining-2026-11.md](vercel-skills-source-mining-2026-11.md) under "Routing probes".
