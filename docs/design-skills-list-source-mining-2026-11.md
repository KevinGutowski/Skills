# Meng To's design-skills list — source mining, 2026-11

Ticket: "Check out these skills and the stage show skill. Fold them into the repo, maybe add a new skill or two."

Entry point: x.com/MengTo/status/2122984275566076395 (18 November 2026), "My personal list of UI design skills that give your agent real taste". VxTwitter returned only the first line of the note tweet; FxTwitter returned the full text with its six links. The post quotes Benji Taylor's Stageshow launch (x.com/benjitaylor/status/2116593247854453244, 31 October 2026).

Everything below is paraphrased. No skill text, kit code, script, palette, or asset was imported, and no upstream script was run.

## Sources

| # | Source | Revision read | License | Prior intake | Density | Outcome |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Impeccable (impeccable.style, `pbakaus/impeccable`) | `d41d986` (2026-11-16) | Apache-2.0 | `b3ced85`, see `impeccable-source-mining-2026-11.md` | Delta only | Six small folds |
| 2 | Emil Kowalski's skills (aiforui.dev/skills, `emilkowalski/skills`) | `64eb3de` (2026-11-15) | MIT | `715c180`, see `emilkowalski-skills-source-mining-2026-11.md` | Delta only | Six small folds, one new section |
| 3 | Meng To's skills (`MengTo/skills`) | `3cc9345` | MIT | None | Mixed: HIGH for 9 codex skills, illustration craft, 3D; LOW or SKIP for most of the 92 web-design skills and all game skills | Three new references, five extensions |
| 4 | Stageshow (`benjitaylor/skills`, benji.org/stageshow) | `299140f`, skill 1.1.1 | MIT (bundled marks and app icons excepted) | None | HIGH | **New skill `faux-ui`** |
| 5 | Open Design (`nexu-io/open-design`) | `0725880` | Apache-2.0, per-folder exceptions | None | HIGH for five prompt sources; SKIP for the app, templates, catalogs, and 83 pointer stubs | Extensions only |
| 6 | Solid Glass (`deeplethe/solid-glass`) | `6e8903e` | MIT (most components are shadcn/ui's) | None | HIGH for the stylesheet and material docs; MEDIUM-HIGH for the agent components | One new theme reference, one new section |

## Decisions

**One new top-level skill: `faux-ui`.** Stageshow describes a task the library did not cover (a mocked product screen drawn to sell the product) and deliberately breaks product-UI rules to do it (placeholder bars, cropped windows, slow storytelling curves), so folding it into `frontend-design` or `web-design` would have put contradictory values next to each other. The skill is a distillation: router plus six references. The React kit, 71 example folders, teaching pairs, and filming scripts stay upstream; the skill tells the reader to install Stageshow for React work and to review it first. It is a single-source skill, admitted under the "narrow task shape" exception in `skill-library-ops.md` and recorded as such in its coverage gaps.

**No second top-level skill.** Three other task shapes were absent locally and each came from one author, so each became a reference under its owner:

- `working-with-ai` (reference-to-build-prompt): capture a reference, write a build prompt, hold a reference boundary, audit originality.
- `frontend-design` (svg-illustration): hand-written spot illustration.
- `creative-coding` (threejs-scene-craft): lit three.js scenes.

**One new theme.** Solid Glass joins `design-craft` as a fourth whole theme (solid-glass), scoped to dark, text-dense agent workspaces on shadcn and Tailwind 4, with its conflicts against tactile-design, the house press scale, Apple's Liquid Glass rules, and the anti-slop glass tell written into the file.

## Fold map

### New files

| File | From | Holds |
| --- | --- | --- |
| `faux-ui/SKILL.md` and six references (still-frame, framing, demo-motion, bento-grids, looks-and-grounds, rehearsal), plus sources, coverage gaps, three eval cases, and an own `scripts/contact-sheet.mjs` (not Stageshow code) | Stageshow | The one-idea test and five failure modes; seven-step workflow; word budget and spacing values; twenty framing rules and seventeen layouts; story shapes, loop resets, the two demo curves, cursor and drag rules, annotation lines; bento set planning and tile kinds; look-mapping from a product's tokens, grounds, brand marks; filming method, named faults, fresh-eye review brief, handover note |
| `working-with-ai/references/reference-to-build-prompt.md` (+ its sources file) | Meng To, codex skills | Stitched full-page capture and rejection checks, the evidence bundle, capture validity, six analysis layers, seven-field section anatomy, mechanism naming, similarity dial, reusable grammar vs protected signature, originality audit with an evidence hierarchy and verdict vocabulary |
| `frontend-design/references/svg-illustration.md` | Meng To, illustration skills | When to draw at all, the inline-file contract, hands and pose, transferable techniques, the render-compare-zoom loop, judge variance |
| `creative-coding/references/threejs-scene-craft.md` | Meng To, 3D skills | Tone-map order, environments for metal, footprint fade, renderer and composer pixel ratio, silent failures, a verification table against three.js source |
| `design-craft/references/solid-glass.md` | Solid Glass | The four rules, thickness ladder, pane recipe, one-state rule, fields and focus, light-theme differences, reduced-transparency fallback, motion, conflicts |

### Extended

- **`ai-experience-design`** (patterns): new "Agent-turn surfaces" section from Solid Glass's agent components (status line, tool-call rows, reasoning, task notices, composer, context ring). Single-source; two tensions with existing rules left stated.
- **`design-craft`**: surfaces (opaque token swap, seven edge-drawing traps), refinement-moves (two Impeccable corrections), worst-case-data (initials skip suffixes).
- **`frontend-design`**: anti-slop-catalog (Open Design's lintable rows; a section on invented proof, filler, and leftover scaffolding; a scoped exception for the solid-glass theme), surface-modes (what counts as a pinned direction; Open Design's inferred direction as a counter-position; the Keep / Change / Do-not-copy contract), ui-library-picks (Sonner corrections, Vaul added, DialKit dropped), visual-execution (id prefixes for inline SVG).
- **`interface-review`** (critique-scoring): scoring discipline, an audit-only contract, two non-adopted contrasts, one RTL line.
- **`working-with-ai`** (ai-ui-direction): when to ask before building, brand source means extract, pointers to the new member and to taste capture.
- **`creating-skills`**: converting-codebases-to-skills (one technique from code you built: mechanism, staging, incidental), measuring-skill-effect (visual skills, from the Stageshow write-up; rules that reach the model by more than one path, from Open Design).
- **`design-prototyping`** (agents-field-notes): numeric judge protocol folded into the independent-judge section.
- **`design-systems`** (field-notes): capturing session corrections as rules (Kowalski's learn-taste); one Solid Glass restyle-layer note.
- **`web-design`**: web-animation-design (capture-based review evidence and five continuity failures, a scroll tool ladder, named 300ms exceptions, scoped notes for cinematic and faux-UI timing), PRACTICAL-TIPS (hover never moves a neighbor), gestures (attribution), motion-audit, animation-performance (work that runs off screen), web-performance, web-typography (optical label centering with `text-box`, CJK leading), web-layout-design (RTL audit rules), mobile-web-native-feel (`pointer: fine` corrected).
- **`x-post-reader`**: VxTwitter silently truncated this long post; the skill now says to use FxTwitter for long posts, with the date.
- **`creative-coding`**, **`graphics-fundamentals`**, **`swiftui`**: one routing line each (the last is an attribution fix in fluid-interfaces).

### Repo docs

README (new row, bundle recipe, routing rule, reference mentions), `agent-quickstart.md` (bundle recipe), audit row, smoke test S44, routing probes V25–V31 and their results, listing budget, the `faux-ui` section of `skill-evals-2026-11.md`, this file, `mining-ledger.md`.

## Descriptions changed

| Skill | Change | Why |
| --- | --- | --- |
| `faux-ui` | New (444 chars) | New skill |
| `frontend-design` | Adds "hand-drawn SVG illustration" and the "illustration" trigger; drops "distinctive UI" and shortens two phrases (444) | The first blind judge found no owner for an illustration prompt (V29) |
| `working-with-ai` | Adds "reference page/recording → build prompt" (441) | The new member had no trigger |
| `creative-coding` | Adds "three.js/WebGL scenes" (416) | The new reference had no trigger |

## Conflicts and how they were resolved

- **Demo motion vs product motion.** Stageshow's travel curve and 0.8 to 1s arrivals contradict the web theme's 300ms ceiling. Both are kept and scoped: the slow values apply to an authored demo's travel and arrivals only, press and hover feedback inside the demo stays product-fast, and both skills say never to carry values across.
- **Placeholder bars and no headings vs product rules.** `faux-ui` asks for both. Its Boundaries section says so, and the real screen stays with `frontend-design`.
- **Meng To's "exact recreation" mode.** Kept only for the user's own work. For anyone else's page the prompt is an adaptation with a written boundary.
- **Meng To's site skills forbid model-drawn illustration; his illustration skills do it.** The new reference opens with a decision list that takes drawing last.
- **Meng To's cinematic timing and upstream Emil's 500ms modals.** Recorded as scoped schools; the local table keeps centered modals at 200 to 300ms.
- **Open Design's single inferred direction vs assign-don't-rank,** and its **single-session weighted jury vs the isolated two-pass review.** Recorded as counter-positions, not adopted.
- **Open Design's demo-controls ban vs the in-app variant switcher** in `design-prototyping`. Scoped to final artifacts.
- **Solid Glass vs tactile-design** (lit top edge, large soft shadows, identical hover and selected, raised fields, no press scale), **vs Liquid Glass** (glass on content and on glass), **vs the anti-slop glass tell.** Whole themes are picked, not blended; each conflict is listed in the theme file.
- **Corrections to local text:** `pointer: fine` does not exclude styluses (MDN); a Sonner `Toaster` with an `id` shows only toasts targeted at it (Sonner source); text on a colored ground must not rely on transparency (Impeccable); the reverse-vs-commit gesture rule is credited to the projected endpoint.

## Verified against primary sources

- three.js source at r162, r163, and `dev` for four API claims in threejs-scene-craft.
- MDN and browser-compat-data for `text-box` (Chrome 133, Safari 18.2, Firefox 154) and `pointer: fine`.
- Sonner's source for `Toaster` id filtering. The duplicate-toast and overflow rows rest on the skill text alone and say so.
- Independent reviewers then compared the other four new references with their sources. Meng To's three: about 95 numbers checked with none fabricated and no rule inverted; 18 findings (stripped conditions, mis-attached values, one arithmetic slip, one internal contradiction), all applied, and the four three.js API claims re-confirmed in source. Solid Glass: about 80 values checked with one mis-attached pair; 15 findings applied, the most important being that the reduced-transparency fallback is partial, that the theme targets shadcn's Base UI components and not Radix ones, and two wrong rows in the edge-drawing traps table.
- A static security read of Stageshow's scripts, lockfile, and configs found nothing malicious; the cautions are recorded in `faux-ui/references/sources.md`.
- An independent reviewer compared `faux-ui` with the upstream Stageshow text and the author's write-up: about 230 numeric occurrences checked with no wrong value, all 20 framing rules, 17 layouts, and 10 recurring faults present. It raised 12 findings of paraphrase drift (one recurring fault renamed, one misquoted claim, three dropped conditions, a merged fault definition, an over-broad license sentence, list numbering); all were applied.

## Parked or skipped

- **Stageshow:** the kit, examples, teaching pairs, and scripts (not vendored; not security-reviewed); the kit's API names.
- **Meng To:** about 40 one-look style recipes (several are looks the anti-slop catalog lists as tells), the library how-tos, all game skills, the media skills bound to his own editor and a TTS vendor, `workflow-ship-change` (it grants standing authority to push and publish), `ui/*/ARTICLE.md` (not read), palettes and kits, numeric three.js constants.
- **Open Design:** the app, 115 design templates, 153 design-system packages, 107 prompt templates, the stubs and vendored copies of skills already local. Parked pending corroboration: loading and retry thresholds, text-overflow fates, the image-ratio rule. Its upstreams `huashu-design` and `refero_skill` were not read; prefer them before crediting Open Design further.
- **Solid Glass:** shadcn's stock components and examples; the theme's use of raw palette classes where it has status tokens (noted, not folded).
- **Impeccable:** the `foundations` ship-readiness roadmap (mostly repo hygiene bound to its CLI), capture CLI, seeded worlds, hooks, live mode.
- **Emil Kowalski:** `ask-emil` (a router over his own skills); `animate-expo` and `write-swift` remain parked.

## Coverage statement

- **Read in full:** Stageshow's SKILL.md and ten references; Solid Glass's stylesheet, docs, contributing guide, and six agent components; Meng To's nine capture and meta skills, the shared illustration craft file, and six 3D skills; Open Design's discovery prompt, core system prompt, prompt-composition doc, and four craft files; every Impeccable and Emil skill file changed since the last intake.
- **Read in part:** Stageshow's teaching, rehearse, annotations, brands, and kit references; 22 of Meng To's 92 web-design skills; Open Design's directions, orchestration, and lint rule list.
- **Not read:** Stageshow's example and kit source; Meng To's other 70 web-design bodies, scripts, and demos; Open Design's app code and catalogs.
- **Eval:** `faux-ui` was run with and without the skill on three cases and graded blind from rendered images, twice: 18/18 against 9/18 on the first wording, then 17/18 against 8/18 after the skill and graders were revised (see `skill-evals-2026-11.md`; renders in `docs/evidence/faux-ui-evals-2026-11/`).
- **QA follow-up:** `contact-sheet.mjs` now separates the viewport from the crop, refuses pages that fail to load, and sizes the sheet from the loop length, with a browser smoke test beside it. Corrected: the proxy-free Stageshow setup, the claim that presentation attributes protect inline SVG from host CSS, and the scope of Solid Glass's shared highlight treatment.
- **Kit path:** a hero loop and a bento were then built with Stageshow installed, starting from its gold examples. Both passed its gate and are clearly closer to its examples than the no-kit builds; the skill now recommends the kit for anything that ships. Not graded blind.
- **Exemplars:** `faux-ui` gained two original plain-HTML exemplars for the fallback path (a still hero and a bento), tuned beside captures of the upstream gold. Rebuilt from them, the hero and bento eval cases scored 6/6 and 5/6 against 3/6 and 2/6, with real-size type and density.
- **Not done:** the other new references have no with/without eval, and `/doctor` was not run after the description changes.
