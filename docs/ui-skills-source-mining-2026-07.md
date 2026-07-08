# ui-skills.com Source Mining — 2026-07

Ticket: review and extract useful information and skills from ui-skills.com. Protocol: `docs/skill-library-ops.md` §High-Touch Source Mining.

**What the source is:** ui-skills.com is a curated registry of design-engineering skills by Julien Thibeaut (@ibelick, Interface Office), backed by github.com/ibelick/ui-skills (MIT). It aggregates ~80 skills — five first-party plus external repos referenced by raw URL — behind a flat `registry.txt`, per-skill `llms.txt` pages, and an `npx ui-skills` CLI with a root routing skill. The site model itself was mined (→ `creating-skills` published-skill-field-patterns), then every registry entry was screened.

## Capture

- Site HTML, `llms.txt`, `skills/registry.txt`: fetched 2026-07-07 (curl; WebFetch was 403). Working copies in `/tmp/uiskills*.txt`.
- `ibelick/ui-skills` repo cloned to `/workspace/ui-skills-src` (skills read in full; CLI/site internals skimmed — README + root skill carry the model).
- External skills fetched by raw URL to `/tmp/uiskills-screen/{raphaelsalaja,flagship,audit,misc}/` by four screening agents; linked references fetched where they existed.

## Source manifest and verdicts

### First-party (ibelick/ui-skills) — all read in full

| Skill | Verdict | Disposition |
|---|---|---|
| ui-skills-root | HIGH (meta) | Folded: selection rules + distribution model → `creating-skills` (published-skill-field-patterns) |
| baseline-ui | HIGH | Folded as a named de-slop school → `working-with-ai` (ai-ui-direction); stack rules (Tailwind/motion-react/Base UI) noted as stack-scoped |
| fixing-motion-performance | HIGH | Folded → `web-design` (web-animation-design: render-pipeline audit rules, measurement/scroll, view transitions; web-performance keeps the cross-line) |
| fixing-accessibility | MED-HIGH | Folded → `web-design` (web-accessibility): priority-ordered audit protocol, tool-boundary discipline, toast/disabled-submit/paste rules |
| fixing-metadata | MED-HIGH | **PARKED — top recheck candidate.** Page metadata/SEO (titles, canonical, OG/Twitter cards, JSON-LD, hreflang) has no owning cluster; single source this pass. Seed: a `web-design` (page-metadata) reference once corroborated by a second source or the primary specs (ogp.me, Google Search docs). Local snapshot: `/workspace/ui-skills-src/skills/fixing-metadata/SKILL.md`; adjacent homes to cross-link when created: `devtools` (developer-tool-gtm), `web-design` (social-video-safe-zones for share-surface family) |

### Already in the library (no action; verified)

- `anthropics/frontend-design` → is our `frontend-design` (local version is a superset).
- `emilkowalski/emil-design-eng` → `design-craft` (emil-kowalski), folded 2026-06.
- `jakubkrehel/make-interfaces-feel-better` → `design-craft` core (folded as design-polish 2026-06). **Re-verified this pass** against current upstream (last commit 2026-04-19): local fold is a superset; no missed deltas.
- `jakubkrehel/oklch-skill` → `web-design` (oklch-skill).
- `vercel-labs/web-design-guidelines` → processed in the 2026-06 Vercel overhaul. `antfu/web-design-guidelines` is a 39-line WebFetch wrapper around the same rules — zero rule deltas; its `SYNC.md` provenance convention noted in field-patterns.

### External, screened this pass

| Source | Verdict | Disposition |
|---|---|---|
| pbakaus/impeccable | HIGH | Folded → `frontend-design` (second-order category-reflex check, physical-scene sentence, color-strategy axis, dated checkable slop bands, reveal-animation blank-section bug), `working-with-ai` (model-specific defect catalogs), `design-craft` (drift root-cause taxonomy). Command/scripts machinery parked; format noted in field-patterns |
| Leonxlnx/taste-skill v2 | HIGH | Folded → `frontend-design`: Design Read, mechanical pre-flight counts, Jane Doe content-authenticity + copy self-audit, image-asset ladder, official-design-system routing. (Registry's `gpt-tasteskill` repo is deleted — superseded by taste-skill; LOW on its own) |
| Dammyjay93/interface-design | HIGH | Folded → `working-with-ai` (deslop two-pass + "what is NOT slop" guardrail), `frontend-design` (token-name test, domain-exploration protocol), `design-craft` (dark-mode elevation arithmetic +7/+9/+12%, swap test) |
| raphaelsalaja/skill (6 of 7) | mastering-animate-presence HIGH; sounds-on-the-web + generating-sounds-with-ai HIGH; pseudo-elements MED; morphing-icons MED; 12-principles LOW | Folded → `motion` (AnimatePresence pitfalls), NEW `web-design/references/web-sound.md` (matrix, gain defaults, reduced-motion gating, HTMLAudio/AudioContext mechanics, synthesis recipes, adjective→parameter table), `web-design` (web-animation-design: context-menu instance, View Transitions lifecycle, ::backdrop, hit-target inset), `design-craft` (animations: popLayout rationale, icon-morph fixed-slot principle). 12-principles skipped as duplicate. **Recheck: `to-spring-or-not-to-spring`, a 7th skill found in the tree, unscreened** |
| dimillian/skills (swiftui-ui-patterns) | HIGH | Folded → `swiftui` references (state-ownership table, sheet doctrine + SheetDestination routing, matched-transition tool choice, scroll-progress reveals, HapticManager). Attributed to Ricouard, never as Apple guidance; ~30 per-component refs parked fold-on-demand |
| AccessLint (audit/scan/diff) | HIGH (workflow), MED (content) | Folded → `web-design` (web-accessibility: fixability taxonomy, diff-granularity gating, report discipline) + `creating-skills` (workflow patterns). Registry note: its 5 entries collapse to one skill set, since restructured |
| addyosmani (frontend-ui-engineering, web-quality-audit) | MED | Folded → `working-with-ai` (AI-aesthetic tells-with-causes), `web-design` (web-performance: Speculation Rules/next-page LCP, 75th-percentile field data), `creating-skills` (counter-rationalization tables, shipped evals). React state-management half out of scope. Has a dangling reference file in the wild — cited in field-patterns |
| millionco (react-doctor, budge) | react-doctor: content SKIP, workflow HIGH; budge MED | react-doctor playbook → `creating-skills` only (no React cluster). Budge → `design-craft` live tuning (token snapping, coupled parameters) + `creating-skills` (mechanical trigger tests) |
| 0xdesign/design-lab | MED | Folded → `design-prototyping` (project-token inference, five variant axes, structured feedback overlay). Its DESIGN_PRINCIPLES compendium is re-synthesized public material — not credited as a source; its Rauno-derived gesture rules parked as a pointer to the primary (see Parked) |
| zarazhangrui/frontend-slides | MED | Folded → `design-prototyping` (show-don't-tell previews, preview-authenticity, rendered-screenshot verification) + `creating-skills` (three-tier asset disclosure, naming model biases). Presentation domain itself parked (needs 2–3 sources for a new skill) |
| zeke/swiss-design-skill | MED | Folded → `design-craft` (surfaces: `color-scheme: light dark` gotcha, opacity-not-hue hierarchy clause) + `creating-skills` (scope-and-defer with precedence). Theme content itself not imported (themes stay menu choices) |
| wshobson (wcag-audit-patterns, interaction-design) | SKIP / LOW | WCAG skill is textbook restatement, fully covered. Interaction-design yielded one fold (interruptibility/never-gate-input → web-animation-design); two-tier format noted |
| rams.ai | LOW (content) | One compact fold (grep-able a11y source-pattern inventory → web-accessibility code review). Commercial-skill embed (mandatory footer ad/UTM, scripted upsell) recorded as an intake caution |
| anthropics/canvas-design | MED (technique) | Prompting levers → `creating-skills` field-patterns (two-phase self-prompt, pre-baked critique, refine-don't-add). No design rules extracted |
| nextlevelbuilder/ui-ux-pro-max | MED (architecture), LOW (content) | Generation dials + master/page-override persistence → field-patterns. Its reasoning CSVs institutionalize category reflexes (e.g. "SaaS → glassmorphism, trust blue") that impeccable/taste-skill ban — recorded as a conflict, content not folded |
| bencium/bencium-innovative-ux-designer | SKIP (derivative) | Copies anthropics/frontend-design description verbatim with a weaker body; cited in field-patterns as the description/body-mismatch supply-chain case |

### Out of scope for this library (skipped, reason: framework/tool engineering with no owning cluster and no portable design lesson)

antfu suite (antfu, nuxt, pinia, pnpm, slidev, tsdown, turborepo, unocss, vite, vitepress, vitest, vue, vue-best-practices, vue-router/testing, vueuse) · vuejs-ai suite (8) · CloudAI-X three.js suite (10) · vercel-labs (next-best-practices, next-cache-components, next-upgrade, react-best-practices, agent-browser) · remotion-dev · sveltejs/svelte-code-writer · microsoft/playwright-cli · remix-run/react-router-framework-mode · callstackincubator/react-native-best-practices. If the library ever grows a web-framework platform cluster, this registry is a ready source index.

## Fold map (what changed where)

- `web-design`: web-animation-design.md (render-pipeline audit rules, measurement/scroll section, View Transitions section, context-menu/backdrop/hit-target lines, interruptibility, Contents block) · web-performance.md (75th percentile, Speculation Rules) · web-accessibility.md (audit ordering, tool boundaries, grep inventory, AccessLint CI disciplines, Contents block) · NEW references/web-sound.md · SKILL.md (Sound routing bullet; description gains "UI sound feedback" — probes below) · sources.md/coverage-gaps.md.
- `working-with-ai`: ai-ui-direction.md (deslop two-pass, not-slop guardrail, model-tell catalogs, tells-with-causes, baseline-ui school) + its sources/gaps.
- `frontend-design`: SKILL.md (Design Read, physical-scene, category-reflex, color axis, Jane Doe, image ladder, DS routing, token-name test, checkable slop tells §) + sources/gaps.
- `design-craft`: SKILL.md (live-tuning token snapping/coupled params, swap test) · surfaces.md (elevation arithmetic, color-scheme, opacity hierarchy) · linear-product-craft.md (drift taxonomy) · animations.md (popLayout rationale, icon-morph principle) + sources/gaps.
- `motion`: best-practices/react.md (AnimatePresence section).
- `swiftui`: swiftui-identity.md, swiftui-layout.md, swiftui-animation.md, touch-interaction-design.md, sound-design.md, SKILL.md routing tweak + sources/gaps.
- `design-prototyping`: SKILL.md (variant axes, token inference, feedback overlay, show-don't-tell, preview authenticity, screenshot verification) · agents-field-notes.md (full detail) + sources/gaps.
- `creating-skills`: NEW references/published-skill-field-patterns.md + SKILL.md routing line + sources/gaps candidates (design-memory files, SYNC.md stubs, selection-budget rule).
- `docs/skill-library-ops.md`: External Skill Intake gains the remote-fetch red-flag bullet.
- `README.md`: web-design row now lists web-sound.

## Conflicts and resolutions

Resolution policy applied (Kevin-ratified, 2026-07): full school-of-thought structure only when the opposing position is multi-source, has a project-level routing condition, and misrouting has real blast radius. Below that bar, in order of preference: scope split → in-reference divergent-tradition note → reject with ledger line. None of this sweep's conflicts met the school bar.

1. **Exit easing** — Salaja's 12-principles mandates ease-in exits; house theme (web-animation-design, Kowalski-based) is ease-out for both. The opposing position is the legitimate Disney/Material accelerate-on-exit tradition, but it's a value inside a theme, not a project architecture → resolved as a **divergent-tradition note** in web-animation-design (§ease-in): named lineage, house default kept, follow-the-project rule for codebases already using accelerate-on-exit consistently.
2. **Ask-first protocol** (bencium) — gates generation on user approval; contradicts house proceed-with-stated-assumptions and comes from a derivative source → **rejected**, ledger only.
3. **Category-reflex defaults** (ui-ux-pro-max product-type→style CSVs) — encodes the exact reflexes the anti-slop doctrine names as slop; not a coherent position → **rejected**, ledger only.
4. **Token naming** — interface-design's world-evoking names vs shadcn/system semantic tokens → resolved as a **scope split** in the frontend-design fold: semantic tokens for the system layer, world-evoking names for the brand layer.
5. **Exit-matches-initial** (Salaja AnimatePresence) vs design-craft's asymmetric enter/exit doctrine — house position kept; **ledger-only pending a second corroborating source** before even a tradition note.

## Parked / rechecks

- **fixing-metadata** → see first-party table; top candidate for a new `web-design` reference on corroboration.
- **raphaelsalaja `to-spring-or-not-to-spring`** — discovered in tree, unscreened.
- **Rauno Freiberg "Invisible Details"** — the primary behind design-lab's gesture rules (`touch-action: pan-y` containment, `setPointerCapture`, 5px drag-vs-click threshold, gesture state machine); library has no web-side gesture coverage (grep clean). Mine from the primary, not the compendium.
- **dimillian per-component cookbook** (~30 refs) — fold-on-demand, link in swiftui coverage-gaps.
- **Presentations task shape** (frontend-slides + antfu/slidev = 2 adjacent sources, different stacks) — seed for a future skill if a third source appears; frontend-slides' fixed-stage/1920×1080 + visibility-not-display rules are the durable kernel.
- **Impeccable detector scripts + edit hooks** — mechanical slop detectors are prior art if we ever build lint-side anti-slop checks.
- **morphing-icons full component recipe**, **Budge widget runtime** — principles folded, artifacts linked in coverage-gaps.

## Validation

- Read: all 5 first-party skills (full), 30+ external SKILL.md files + key linked references (saved under /tmp/uiskills-screen/), registry.txt + llms.txt (full), ibelick repo README/root skill (full), CLI internals (skim).
- Skipped without full read: the out-of-scope framework suites (descriptions only) — logged above so the next agent doesn't rescreen.
- `validate_all.py` 38 skills 0 problems · `check_xrefs.py` 0 errors · `check_vercel_routing_probes.py` pass · `git diff --check` clean. `check_vercel_overhaul.py` fails with `extra=['goal']` **pre-existing on main** (reproduced on stashed clean tree) — needs a separate fix.
- web-design description edit ("UI sound feedback" term added): fresh-judge routing probes recorded below.

### Routing probes (web-design description edit)

| Probe | Expected | Result |
|---|---|---|
| "Add a subtle click sound when users tap buttons in my web app" | `web-design` | pass |
| "Add sound effects and haptics to the buttons in my iOS SwiftUI app" | `swiftui` (not web-design) | pass |
| "Compose a soundtrack for my product launch video" | no skill | pass |
