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

Emil Kowalski, open skills (https://aiforui.dev/skills, repo https://github.com/emilkowalski/skills, MIT), read at rev `715c180` (2026-11-10). `pick-ui-library` and `ask-sonner` were adapted into [ui-library-picks.md](ui-library-picks.md) as one practitioner's dated picks plus Sonner troubleshooting traps; API tables were left to the live docs. Sonner is the author's own library. Full screening ledger: `docs/emilkowalski-skills-source-mining-2026-11.md`.
