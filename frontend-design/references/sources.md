# Sources

Derek Briggs (PixelJanitor; ex-PlanetScale/Campsite/Clerk/Notion, now Design+Code at Shopify) — the "Fidelity survives implementation" section + global flexbox reset:

- Course: *UI Engineering 101 for Designers* (Maven, with Mariana Castilho) — https://maven.com/pixeljanitor/uiengineering-101-for-designers
- "Users don't see your Figma design files…" — X thread root 1623358514440859649 (Feb 8 2023)
- Progressive-blur re-engineering (radial gradient + negative-spread inset shadows) — Shape FM ep. 3 "Motion and animation with intent" (with James McDonald, 2025), YouTube sHVKuJuseYo, ~34:54
- Div/CSS-only progressive blur (Clerk changelog nav overlay; video only, no public code) — X 1715106187958481023 (Oct 2023)
- Figma-review feasibility heuristics (font-family consolidation, Chrome `corner-shape` superellipse) — Shape FM ep. 8 "Figma design review", YouTube HQHZbKdPJP0
- Global flexbox min-size reset — X 2059675006322585647 (May 2026)

Kevin Kold / @kvnkld — X Article 2064972712729292800, "The 10 rules to ship truly polished UI with Claude" (2026-06-16). Folded for numeric polish prompts, token-first constraints, and state-driven UI generation.

Impeccable (Paul Bakaus; https://impeccable.style, repo https://github.com/pbakaus/impeccable, Apache-2.0) — read at commit `b3ced85` (2026-11-09) plus the live site's Designing, Slop, Docs, and Research pages. Adapted (paraphrased, not copied) into [surface-modes.md](surface-modes.md) and [anti-slop-catalog.md](anti-slop-catalog.md):

- the skill source (`SKILL.src`) — brief-wins, refine-vs-redesign semantics, loaded symbols, the four visitor modes.
- `craft-floor` — verify checks, refuse list, browser surfaces.
- `new-work`, `mode-persuade`, `mode-operate`, `mode-read`, `operate` — visual-authority classification, seven-candidate derivation, assigned direction plus canon exit, direction contract, color strategies, reflex-face list, saturated-look calibration, Operate/Read depth, finish review.
- the detector registry (antipatterns JSON under `crates/live/assets`) — the 62 detector rules and their IDs (cited by ID in the catalog).
- the `impeccable-finish-reviewer` agent — the fresh reviewer's evidence-first order and four-word disposition.
- Research note "The model can't roll its own dice" (https://impeccable.style/research, July 2026) — the variety and commit-first findings. Its numbers are the project's own evaluation, not independent replication.

Full screening ledger: `docs/impeccable-source-mining-2026-11.md`.

Emil Kowalski, open skills (rechecked at rev `64eb3de`, 2026-11-15: the Sonner rows in [ui-library-picks.md](ui-library-picks.md) now follow his `0f2e23b` API fixes for multiple toasters, `onDismiss`, and stacking versus clipping, and DialKit left his list; ledger `docs/skills-sh-design-topic-source-mining-2026-11.md`) (https://aiforui.dev/skills, repo https://github.com/emilkowalski/skills, MIT), read at rev `715c180` (2026-11-10). `pick-ui-library` and `ask-sonner` were adapted into [ui-library-picks.md](ui-library-picks.md) as one practitioner's dated picks plus Sonner troubleshooting traps; API tables were left to the live docs. Sonner is the author's own library. Full screening ledger: `docs/emilkowalski-skills-source-mining-2026-11.md`.

Luke Wroblewski / @LukeW — X 2122727731389685951 (2026-11-17, "why designers still have jobs.") with its image, a Frontier AI vs Human Designer comparison of one Share Workspace sheet, quoting his own X 2122490348337565697 (2026-11-17, "remove the 75% of this UI that's agent slop."). Read through the VxTwitter and FxTwitter JSON endpoints; the image was read directly and its word and action counts are ours. Folded as rule `copy-budget` in [anti-slop-catalog.md](anti-slop-catalog.md). The staged procedure, cut list, exceptions, and the explanation of why models over-explain are this library's synthesis, not his words. Ledger: `docs/mining-ledger.md` (2026-11-17).

Dmytro / @pqoqubbw — X article "4 css rules that make safari 35x faster" (post 2122725141285364024, 2026-11-17). A pointer only in [ui-library-picks.md](ui-library-picks.md); the workaround itself lives in `web-design` (web-performance). Ledger: `docs/mining-ledger.md` (2026-11-18).

Base UI documentation (https://base-ui.com, `@base-ui/react` 1.9.0, read 2026-11-18 as Markdown through `llms.txt`): quick start, accessibility, community, the six handbook pages, all 37 component and 4 utility pages (prose and usage guidelines; demo code and API tables scanned, not read line by line), and release notes 1.0.0 to 1.9.0 for breaking changes. Folded as the "Base UI traps" tables in [ui-library-picks.md](ui-library-picks.md). The shadcn/ui default was checked against shadcn's changelog ("Base UI as the Default", July 2026, https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default).

Nucleo, *SVG Patterns* (https://nucleoapp.com/svg-patterns/, read 2026-11-18): the page HTML (179 tile SVGs in 32 families, FAQ, and usage terms) and its `js/main.js?v=15` (layer, preview, and export code). Folded as "Repeating SVG patterns" in [visual-execution.md](visual-execution.md). The tile construction rules were read from the tile markup. The `currentColor` and data-URI rules come from the export code. The mask-based theming route, the pixel-snapping explanation, and `scripts/svg_pattern.py` are this library's own. No tiles were copied, because the terms forbid redistribution. Ledger: `docs/mining-ledger.md` (2026-11-18).

skills.sh Design topic (https://www.skills.sh/topic/design, read 2026-11-22). Two of its listed skills fed this skill directly. Anthropic `frontend-design` (https://github.com/anthropics/skills, rev `e4bb5d9`, 2026-11-16): the single-word headline accent, the template-chrome strings, the reflex near-black, the SaaS-card kit, the `#D97757` note on saturated look 1, the plan-versus-similar-brief check, the log of tried directions, and the selector-specificity trap. Rows from it are marked (A) in [anti-slop-catalog.md](anti-slop-catalog.md). Leon's tasteskill 2.5.1 (`design-taste-frontend`, https://github.com/Leonxlnx/taste-skill, MIT, rev `f6b7657`, 2026-11-07): the second-generation copy tells, the over-correction table, and the placeholder-facts rule, from its copy-tells reference and the house rules, marked (T). Both are paraphrased. tasteskill's page kit, dealers, checker, and gate scripts were not imported. Ledger: `docs/skills-sh-design-topic-source-mining-2026-11.md`.
