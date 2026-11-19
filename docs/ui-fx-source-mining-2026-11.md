# UI FX source mining — 2026-11

Read 2026-11-18. Ticket-driven: "add some skill called ui dazzle, or pop, or maybe it should be added to existing skills … something that can help me come up with some additional effects … UI FX or something. Feel free to research other libraries or tips … I want these to be used when trying to go for something extra creative." Two X posts were given as examples.

Outcome: one new top-level skill, `ui-fx`, with four references, three unrun eval cases, a routing fixture, and one-line pointers in seven neighbors. No neighbor description changed.

## Why a new skill and not a reference

The library's rule is extend > create. A reference was considered in three places and each fit only part of the task:

- `frontend-design` owns a page's whole aesthetic and its anti-slop catalog lists glows and gradient text as tells; an effects reference there would sit under a body that argues against it.
- `web-design` (web-animation-design) owns values for everyday motion and is web-only; the sources ship SwiftUI and React Native kits.
- `design-craft` (refinement-moves) already has Delight and Overdrive, which state the judgment in a paragraph each but carry no effect vocabulary, libraries, or techniques.

The task shape is distinct ("pick the moment for a showy effect, propose options, install or hand-roll it"), spans web and native, has its own trigger words ("make it pop", "dazzle", effect and library names), and rests on more than three independent sources. The ticket also asked for it by name. Name chosen: `ui-fx` (the ticket's own "UI FX"; "dazzle" and "pop" are trigger words in the description).

## Posture (revised 2026-11-18)

The first draft was built around a gate that could answer "no effect here", a one-effect-per-area rule, and a propose-then-wait step. The library owner asked for it to be less cautious: the skill is for exploratory work and for adding a layer to an already great baseline. Revised the same day:

- Mode is "say yes, go further, then build", with two named uses: **Explore** (go wide, build variants, the floor can wait) and **Finish** (additive layer on a strong baseline, floor ships with it).
- The gate became four **aim** questions that sharpen an effect and do not veto it. Atmosphere with no triggering event is allowed.
- The former non-negotiables were split into craft habits ("what makes it good", breakable on purpose) and a short **shipping floor** (honesty, reduced motion, flashing and pausable loops, the UI underneath still works, a fallback, frame rate) that applies only to shipped work.
- Proposals lead with the boldest option and the build proceeds without waiting for a pick, except where a choice is expensive to reverse.
- Invoking the skill pins effects for the surface against the anti-slop defaults, not just one effect.
- The "settings page declines" eval was replaced with "app screen gets a yes".

Sections below describe the fold as first made; where they mention the gate, non-negotiables or propose-first, read them through this revision.

## Manifest and coverage

| Source | Fetched how | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| X 2122990055199477894 (Pontus Abrahamsson, "Just use border-beam") | `api.vxtwitter.com`; image from `pbs.twimg.com` | Text and image | Low alone; points at border-beam | Entry point to libraries.dev |
| X 2122738787667349562 (Jakub Antalik, distortion waves on React) | `api.vxtwitter.com`; 13 s video downloaded, read as frame sheets | Text and video | High: shows the full staging of a transition | Five-beat anatomy in effect-ideation; waves section in libraries-dev |
| Replies to both posts | Not returned by the public endpoints | No | — | Skipped |
| libraries.dev `llms.txt` and seven `/llms/<package>.md` references | curl | Border beam in full; when-to-use, accessibility and common-mistakes sections of the other six | High | libraries-dev: placement rules, traps, reduced-motion table |
| libraries.dev pages: waves, voice-ring, skill, how-to-use, accessibility, introduction | curl, tags stripped | Yes | Medium–high (waves, voice-ring); low (others) | libraries-dev |
| libraries.dev Magnetic UI, Voice position (on-device models) | curl | Skimmed | Low for this skill | Mentioned only as a licence caveat |
| libraries.dev Pro and Studio | Paywalled | No | — | Noted as paid; not folded |
| `Jakubantalik/Libraries.dev` repo: README, tree, distortion-waves package.json and README | GitHub API and raw | Yes | Medium | Port list, MIT, the npm gap |
| `skills/libraries-dev/SKILL.md` in that repo (external skill) | raw | Yes | High for decision rules; its commands are not portable | Wait-length and by-element rules paraphrased; "ask before installing" and "do not run the skill installer" kept; `libraries review/apply/tune` commands not imported |
| npm registry metadata for nine packages | curl | Yes | — | Versions, licences, peers; `distortion-waves` returned 404 |
| Effect libraries (about 27, listed in `ui-fx/references/sources.md`) | Research subagent: npm, GitHub, vendor pages | Summaries with URLs | Medium | effect-libraries |
| Platform features, WCAG, SwiftUI APIs, practitioner articles | Research subagent: MDN compat data, Baseline dataset, Chrome, web.dev, WebKit, Apple docs | Summaries with URLs | High for support status and accessibility | platform-techniques |
| Codrops | Cloudflare bot challenge | No | — | Skipped |

## Addition: glimm (2026-11-18)

The owner asked for <https://glimm.dev/> to be folded in after the first pass.

| Source | Fetched how | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| glimm.dev page | curl, tags stripped | Yes | High | New reference glimm |
| glimm.dev `llms.txt`, `llms-full.txt` | curl | Yes | High: `GlimmScope`, lifecycle, fallbacks | glimm |
| npm `glimm` | registry | Yes | — | Version 0.4.1, MIT, peers |
| `nomanjack/glimm-skill` (external skill, MIT) | GitHub API and raw | SKILL.md wiring, in-app and scope sections; tuning headings and recipes | High for traps and sizing | Traps, sizing table, timing recipes paraphrased. Fit-check veto not adopted; install commands not imported |
| Changelog, package source, eval fixture contents, linked blog posts | — | No | — | Skipped |

Fold: new reference `ui-fx/references/glimm.md`; one rung line, one table row and one routed-depth bullet in SKILL.md; two staging rules and a corroboration sentence in effect-ideation; two rows in effect-libraries; two notes in platform-techniques (masking, HTML-in-Canvas); a cross-link in libraries-dev; sources and coverage-gaps updated. No description changed, so no probes were re-run.

Why its own file and not a row in effect-libraries: it has three usage modes, a lifecycle model worth teaching, and enough wiring traps that a table row would lose them. It is also the only packaged use of HTML-in-Canvas found.

Conflict: the vendor's skill says to recommend against installing on high-frequency UIs. `ui-fx` records that as the author's default and a tuning input.

## Addition: ittybitty (2026-11-18)

The owner sent <https://ittybitty.dev/> ("some more shaders") while glimm was being folded.

| Source | Fetched how | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| ittybitty.dev home page | curl, tags stripped | Yes | Medium | Catalogue shape |
| `llms.txt` | curl | Yes, all 74 summaries | High as an index | Catalogue and moment tables |
| `catalogue.json` | curl | Yes (jobs, reach, flags) | High | Job grouping, reach warnings |
| Drop Ripple detail page and schema | curl | Yes | High: usage, runtime behaviour, layers, shape | How it is used; rules and traps |
| `blakecyze/ittybitty-shaders` | GitHub API | Metadata only | — | MIT confirmed |
| `llms-full.txt` | 404 | — | — | Does not exist |
| Other 73 detail pages, shader source, MCP server | — | No | — | Skipped; schemas are linked for task-time lookup |

Fold: new reference `ui-fx/references/ittybitty.md`; one ladder line, one table row and one routed-depth bullet in SKILL.md; three rows or notes in effect-libraries; one pointer each in effect-ideation and platform-techniques; sources and coverage-gaps updated. No description changed.

Why its own file: 74 shaders need a job-grouped index and a moment table to be findable, it is the only source here that works without React or npm, and it suits the Explore mode directly.

The MCP server was not added to any configuration; the reference tells agents to suggest the command and let the user run it.

## Fold map

- **`ui-fx/SKILL.md`**: the four-question gate, workflow, the five-rung ladder, moment → effect table, non-negotiables, verification.
- **effect-ideation**: moment inventory, meanings, physical metaphors, seven families, five beats, three-option proposal template, worked example, anti-patterns. Mostly synthesis; flagged as such in sources.
- **libraries-dev**: the author's placement rules, the set with versions and ports, distortion waves, shared rules, per-package traps, staleness.
- **effect-libraries**: decision rules, moment → library table, five tiers, licence traps, stale picks.
- **platform-techniques**: idea → technique with support status, CSS/SVG/canvas/WebGL recipes, distorting DOM, pointer and text effects, performance floor, accessibility constraints, SwiftUI equivalents.
- **Pointers added** (one line each, no description edits). Rule used: a pointer goes in a router body when a router-only read would otherwise miss the hand-off, and in a reference where that reference states a rule `ui-fx` extends or depends on. Routers: `frontend-design` (boundary), `web-design` (boundary splits), `design-craft` (diagnosis table: "make it pop" row), `swiftui` (boundary splits), `creative-coding` (relationships), `ai-experience-design` (Waiting and progress), `interface-review` (a requested effect is a pin; review against the non-negotiables). References: `frontend-design` (ui-library-picks), `design-craft` (refinement-moves: Delight and Overdrive), `web-design` (web-animation-design; motion-audit's infinite-loop row), `swiftui` (swiftui-animation relationships). Deliberately not linked: `motion` (vendored tool umbrella), `apple-design` (system materials are not custom effects), `working-with-ai` (ai-ui-direction; it already routes tells through the anti-slop catalog), `data-viz`.
- **README**: listing sentence, a "Showy effects" routing rule, a bundle row (also in agent-quickstart).

## Conflicts and how they were settled

- **Anti-slop catalog vs effects.** The catalog treats glow halos, gradient text and neon as tells when the aesthetic is open. Settled with the catalog's own precedence rule: a requested effect is a pin on that effect only. `ui-fx` adds the requirement that the effect be bound to a moment and state.
- **Motion audit vs ambient loops.** `web-design` (web-animation-design) says an infinite loop on a persistent element should run once or be removed. `ui-fx` agrees: loops run only while a real state is true. The idle "pulse on a primary input" row is the one standing exception and is marked quiet.
- **Vendor accessibility claim vs vendor references.** The site says every library honours reduced motion; four references say otherwise. The references win and the table says so.
- **Overdrive's propose-first rule** is kept and made concrete (three options at different costs), with a non-interactive fallback: build the recommendation and report the alternatives.

## Parked

- React Native ports (no React Native cluster here).
- The on-device models (Magnetic UI, Voice position): input sensing, not effects.
- Pro tuning vocabulary and Studio exports: paywalled.
- A deterministic check (for example, grep for an effect component with no reduced-motion gate nearby): plausible, not built.
- Sound and haptics as an effect family: owned by `swiftui` (sound-design).

## QA follow-up (2026-11-18)

- **Remaining vetoes reconciled.** `web-design` (SKILL.md and web-animation-design) no longer says its frequency and purpose rules decide whether an effect belongs: `ui-fx` decides, frequency sizes the effect, and reduced-motion rules apply when it ships. The motion-audit row now exempts deliberate, pausable atmosphere as well as work-bound loops. In effect-ideation, loops that signal work stop with the work, and atmosphere may run indefinitely; SKILL.md workflow step 5 no longer requires every effect to be state-bound.
- **ittybitty `resume()` trap.** Its runtime documents `resume` as animating "even when reduced motion is preferred" (read from `raw/runtime.js`). The reference now tells shipped integrations to check the media query before resuming from app state.
- **Evals run**, see Not done.

## Second QA follow-up (2026-11-18)

- **GlimmScope and duplicate work.** The reference repeated the vendor's "do not disable controls" without limiting it to the animation. A later `play()` interrupts the animation only; both `work` calls run. The reference now keeps the app's own double-submit guard for payments, upgrades and saves.
- **glimm fallbacks scoped to the adapters.** Confirmed in the 0.4.1 build: reduced motion is checked in the React-layer code, the core `playSweep` has no check, and `createShader` can return `null`. The reference tells vanilla users to check both and update immediately.
- **Motion-audit gate.** The gate in `web-design` (web-animation-design, motion-audit) now opens with a scope note: requested or `ui-fx` effects are pinned, skip the frequency and purpose questions, and are checked against the shipping floor. `interface-review` points at the same exemption.
- **Flash limit applies in Explore.** The three-flashes limit now covers anything a person will look at, prototypes included.
- **Deliverable matches the ask.** New workflow step: a question gets ideas and no project edits; a build request gets the build. New eval case `ideas-only-no-edits`.
- **Evals re-run** against the revised graders with tool grants documented: 16/16 against 6/16.
- **From the re-run:** a user who names a package has given the install go-ahead.

## Third QA follow-up, and why QA kept finding issues (2026-11-18)

**Root causes, as found.**

1. *Rules were stated in several places and patched in one.* Each posture change or QA fix was applied where it was reported, by small text replacements, without re-walking every restatement in the skill's seven references and the neighbouring skills. The library's own fold-reconciliation gate (grep every rule a change introduces and reconcile the older text) was not run after each round.
2. *Vendor behaviour was paraphrased from vendor prose, not checked against the published packages.* glimm's fallbacks and callback timing, ittybitty's `resume()`, and several libraries.dev details were wrong or overstated until the builds were read.
3. *New rules were not traced through concrete scenarios.* "Naming a package is the go-ahead" collided with "ideas-only requests get no edits"; "bound to state" collided with atmosphere; "build without waiting" collided with "ask before installing".
4. *Accessibility statements were written from memory* and were looser than the criteria (five-second rule, `aria-busy`, status messages, pointer-down activation).
5. *Eval scores were recorded and then graders were edited*, so the record was stale by the next review.

**What was done differently this round.** The five reported items were fixed everywhere they were stated. Then three independent reviewers with no shared context were given the files (not the conclusions): one walked twelve concrete scenarios through the skill and its neighbours looking for conflicting instructions; one fact-checked every claim in the three vendor references against the published packages, registry and live sites; one checked accessibility statements against the WCAG and ARIA sources, platform support claims against browser-compat data, and graders against the skill. Their findings were applied. A fourth reviewer then did a second pass against a written list of ten canonical rules, to catch drift introduced by the fixes; those were applied too. Evals and routing probes were re-run last.

**Canonical rules** (every restatement in any file should match these):

1. Deliverable: a question or "just ideas" gets ideas only, even when a package is named; an explicit build request gets a build; a build request naming a package as the means counts as asking for it.
2. Dependencies: only for a build; in a shipped codebase (Explore work inside one included) an unrequested dependency waits for a go-ahead while the dependency-free version is built.
3. Pin: an effect the user asked for, subtle or showy, or one chosen through `ui-fx` for an effects request, is exempt from the anti-slop tells, the craft-floor motion line, the finite-motion and "never decoration" rules, and `web-design`'s gate and verdicts; quality failures are never waived; reviewers use the `ui-fx` floor and ask when unsure.
4. Five seconds: automatic motion beside other content stops within five seconds or has a visible, keyboard-operable control; user-started work indicators may run with a text status; shipped work only.
5. Flash limit applies in every mode.
6. State: a visible still text cue, a pre-existing status region (alert for failures), never on a button; `aria-busy` never a substitute.
7. Actions fire on click, never pointer-down.
8. Intensity dial: whisper, signature, showpiece; the level the user asked for wins.
9. Weak baseline plus an effect request: build the effect, name the fundamentals.
10. The floor is for shipped work; Explore lists what is open.

**Changes in this round** beyond the five reported items: the deliverable check moved to workflow step 1; the anti-slop pin wording unified across `ui-fx`, `frontend-design` (SKILL.md, anti-slop-catalog, surface-modes), `interface-review`, `web-design` and README; the exemption placed at the top of web-animation-design and at each veto point, and extended to budget, function and Reduce in motion-audit, PRACTICAL-TIPS and tactile-design; the floor gained Legible and click-activation items and a corrected status rule; about thirty vendor facts corrected (glimm `onBurst`/`onFail`, helper exports, scope props and timings, `data-glimm-skip` scope, promise semantics; libraries.dev reference URLs, `role="img"` canvases, sizes, SSR, `live`; ittybitty DPR caps, modules, element `aria-hidden`, `reducedMotion`); four platform-support claims corrected.

## Additions: the quiet end of the dial, and reverse-engineering (2026-11-18)

- **Subtle use.** The owner pointed at a second post (X 2123002477226443205) showing a barely visible mono beam on a composer. Added: an intensity dial (whisper, signature, showpiece) in SKILL.md, a three-level table per idea in effect-ideation, a subtle-use note in libraries-dev, a description that says "from subtle to showpiece", a fifth eval case, and probes X17 and X19.
- **Reverse-engineering.** The owner pointed at a list of five kit sites (X 2122916755508998416) and asked for a way to read such previews in place of folding each site in. Added reference `reverse-engineering`: what is fair to take, a description step, a browser pass and a no-browser sniff, a signals → technique table, rebuilding steps, reading a video, a worked reading of the composer beam, and a short dated table of the five sites from a brief inspection of their home pages. Workflow step 2 routes to it; probe X18 covers it.

## Pattern study of the example components (2026-11-18)

The owner clarified that the point of the five-site post was to read the example components and bring their patterns and techniques into the toolkit, and that reading their code to learn from it is wanted. Three research subagents read what each site serves publicly, without a browser.

| Site | Read | Not read, and why |
| --- | --- | --- |
| Arc UI | `llms.txt`, registry index, full source of about thirty free MIT components | Pro source (token-gated; licence forbids rebuilding into a kit) |
| Bencho | `llms.txt`; the public bundle with full source for 48 free MIT blocks; every Pro block's published "how it works" note, knob defaults and CSS | Pro runtime chunks (terms say not to get around the Pro lock) |
| HorizonX | Public descriptions, editor control schemas, cover stills, a blog guide, one free component | Obfuscated preview code (terms forbid circumvention). Terms also restrict using its content in corpora outside licensed projects |
| uberdesigner | The site's own JS and CSS | Template internals (previews are videos) |
| Grainient | Public pages; the shader tool's configuration | Nothing else is code: the products are raster and video assets |

**Fold.** Two new references:

- `ui-fx/references/control-patterns.md`: a motion vocabulary (easings, durations, spring pairs) and about twenty interaction patterns with original code: one number as the state, trigger-to-panel morph, gliding indicator, press acknowledgement, grid-row height reveal, rubber band with flick projection, stacked fan, lift-tilt-drop, rolling digits and stable-width label swaps, clip-path fill, single-keyframe stagger, blur entrances, hover intent, proximity field, decaying energy, attack/release smoothing, small physics, page-level reveals, shared habits, and where to read MIT source.
- `ui-fx/references/surface-recipes.md`: goo merge, pointer-facing edge light, sweep border with parked glows, denting tilt card, shimmer, progressive blur, frosted panel, the dark gradient card, dials and numerals, glow rules, six gradient constructions and grain, resolve-from-blobs filter chain, dissolve to grains, strip-warp pour, page peel, fog wipe, split-flap, shader ideas, performance and fallbacks.

SKILL.md gained a moment-table row for everyday controls, pointers on the ladder and in Routed depth. The kits table in reverse-engineering was rewritten with what each kit is and what may be taken from it. sources and coverage-gaps updated.

**On code.** The MIT sources were read in full to learn from. The code in the two references is written for this library and is not copied; the references point at the MIT registries so an agent can read the originals at task time. Paid-tier source was not read or reproduced, and HorizonX-derived material was kept to general visual observations because of its terms. If the owner holds licences for any paid tier, that source can be read under the licence for a project, but should still not be copied into this library.

**Not verified.** The subagents' readings were not re-checked against the sources, nothing was run in a browser, and values derived from stills or descriptions are estimates. No description changed, so routing probes were not re-run; no workflow rule changed, so the evals were not re-run.

## Fourth QA follow-up and holospot (2026-11-18)

**QA items.**

- *glimm provider can hold back a confirmed result.* On the no-View-Transitions path the provider covers the view before running the update; QA measured about 730 ms in a browser. The reference now says not to use provider `sweep()` for a result that must show at once, and gives two alternatives (`GlimmScope`, or update immediately and run the sweep as a separate visual pass).
- *Hold-to-confirm fired while the pointer was down.* The recipe now arms on completing the hold and commits on release, with cancel by sliding off, a text change when armed, and a plain confirm path for keyboard.
- *Parked-glow sweep ran forever from load and ignored reduced motion.* It now runs only under a `data-active` state, has a static reduced-motion ring, and the text gives the idle-decoration options.
- *ittybitty `aria-hidden`.* Clarified: neither the JavaScript API nor the custom element sets it; the attribute seen in the site's generated snippet is in the markup the caller pastes.
- *Motion helpers.* The spring now uses a fixed 1/120 s step with an accumulator, so 60 Hz and 120 Hz match; the rubber-band helper accepts signed overshoot.
- *Composer eval.* The case now has a real project fixture (`files/` with package.json, a page, `Composer.tsx` using `useChat`, and its CSS module) and `place-files.sh`. Grader 2 judges the edit on disk; a new grader 5 checks every `BorderBeam` prop and value against the documented set and that the install command is given without running it. Both snippet files now state that looping snippets show their stop and reduced-motion paths and that none has been run in a browser.

**holospot.** The owner asked for X 2122691075890704598 to be folded in: an MIT kit of physically based holographic materials for three.js. New reference `ui-fx/references/holospot.md` (what it is, the three calls, materials, what decides the look, rules and traps, the ideas to reuse in your own shaders). Pointers added in SKILL.md, effect-libraries and surface-recipes. Read from the repository's README, agent manual and how-it-works page; the video was not viewed and nothing was run.

## Fifth QA follow-up (2026-11-18)

- *No-op provider sweep as a checkout fallback.* Removed: the provider paints its opaque curtain even when the callback does nothing, which would cover a receipt already on screen. The glimm reference now offers `GlimmScope`, or an immediate update plus translucent or off-to-the-side light from the core `playSweep`. platform-techniques and effect-ideation state the general rule: never lay an opaque cover over a result that is already showing.
- *Audio glow.* The guidance treated smoothing as a flash limit. It is not: a 4 Hz level still swings four times a second. The references now say so, give a reversal limiter in control-patterns, and tell agents to keep a large glow's swing narrow and to check the rendered rate in Explore as well.
- *Composer eval.* Scaffold registered in `case.yaml`; fixture made self-contained with a local streaming hook and confirmed to build; prop grader corrected against the published border-beam 1.4.1 API (the earlier allowlist wrongly rejected `borderRadius` and `duration`); file-content focus on the file graders. The recorded 5/5 against 3/5 was corrected and superseded by a re-run at 7/7 against 5/7. libraries-dev now notes that the vendor's agent reference lists a subset of the published props.
- *Hold-to-confirm label.* Every exit path now restores the idle label on both text layers.

## Sixth QA follow-up (2026-11-18)

- *GlimmScope also hides the result for a while.* It commits promptly but keeps a copy of the outgoing content ahead of the band; a browser test found a receipt still covered more than 500 ms after the commit. The glimm reference no longer offers it as the answer for results that must show at once. The two routes are now: keep the outcome outside the swept area, or use a translucent decorative overlay. The general rule (an outcome the user is waiting to read stays outside the covered area) is in SKILL.md's Honest and "Covers the change" items, effect-ideation and platform-techniques.
- *Hold-to-confirm.* The reduced-motion rule now matches the holding selector's specificity, so there is no wipe under reduced motion, and the hold is bound to one primary pointer's main button, so a right-click or second finger cannot confirm.
- *Prop grader.* Four more valid `colorVariant` values added (`forest`, `candy`, `ice`, `gold`), with a note naming the declarations the list comes from. libraries-dev notes them too.
- *Flash guidance.* The "keep the swing below a tenth" alternative is removed. The rendered-rate cap is the default and the only route relied on; the criterion's thresholds are described in its own terms (relative luminance, the 0.80 condition, the red-flash rule, the area), with a warning that an opacity or channel swing is not a luminance measurement.

No eval was re-run: the grader change only widens what passes, and neither arm of the last run used the added colour values.

## Seventh QA follow-up, browser checks, and visual quality (2026-11-18)

**QA items.**

- *Hold-to-confirm chorded buttons.* With two mouse buttons down, releasing the main one arrives as `pointermove`, so the recipe never saw it and a later secondary release committed. The recipe now cancels on `pointermove` when the main button is no longer held and on lost capture, and commits only on a main-button release. It is now a complete page under `ui-fx/examples/hold-to-confirm/` with a browser regression check that includes that sequence (16 of 16 in headless Chromium).
- *Checkout grader.* Now requires the confirmed outcome to be readable immediately, outside the swept area or under translucent light only, with no fixed hold; the case was re-run (see `docs/skill-evals-2026-11.md`).
- *Eval rerun command.* The Rerun section gives the working command with `--scaffold` and `--allow-tools Write Edit`, and says why Bash is not granted for the composer case.
- *ittybitty under reduced motion.* The claim that clicks still ripple is now scoped: the site says so, a browser test of the published JavaScript API found otherwise, and only one shader and path were tested.

**A browser is now part of the work.** Headless Chromium was installed in the sandbox for this round. `ui-fx/examples/snippet-checks/check.mjs` extracts the copyable JavaScript and CSS from control-patterns and surface-recipes and tests them (24 of 24): the spring at 60 and 120 Hz, the rubber band, flick landing, the reversal limiter under 4, 12 and 30 Hz input, and that the CSS parses, applies and respects reduced motion.

**Visual quality.** The owner said the example screenshots looked poor next to the sources. The recipes were rebuilt as a gallery page (`ui-fx/examples/gallery/index.html`), rendered, and compared with screenshots of bencho.dev, uiarc.dev and libraries.dev's border-beam page over three rounds. What changed: a base surface system (hairline ring, top highlight, two-distance shadow); the beam rebuilt as three layers behind an eased conic window with parked colours, following the structure of the MIT border-beam build; a pointer wash on the edge-light card's face; a gradient card with a dark centre, grain and a conic tick dial; a glass panel with graded tint and edge highlights over a grained blob mesh; and tighter type. surface-recipes gained a section, "What makes these look expensive", and its CSS is now taken from the gallery. Only stills were compared, in one engine.

## Eighth QA follow-up (2026-11-18)

- *Hold-to-confirm drag-out.* The pointer could leave before the hold completed, arm outside the button, return and confirm. While captured, every move is now tested against the button's rectangle: leaving cancels for good, and returning does not re-arm or commit. Two regression checks added (21 of 21).
- *Gallery at phone width.* The grid is now `auto-fit` with a 320 px minimum, the wide tile spans two columns only from 720 px, and every sample is sized `min(fixed, 100%)`. A check at 390 px asserts no horizontal overflow and nothing spilling out of a tile.
- *Gallery previews completed.* The hold button runs the real recipe. The goo shapes and their icons ride one state, and the plus is a real button with `aria-expanded`. The gliding indicator uses plain buttons with `aria-pressed` in a labelled group, since it has no panels or arrow-key model and should not claim tab roles.
- *Gallery follows the floor.* Both beams and their status animations play for 4.5 seconds on load, settle to a still "Done" state, and can be replayed. Tile headings moved from about 2.8:1 to above 4.5:1. Checks assert that the beam angle changes while working, that nothing is still looping five seconds after load, and the contrast ratio.
- *Tests.* The animation-name smoke check was replaced by the checks above plus interactive ones (32 of 32). The checkout graders were made explicit and the case re-run: 4/4 against 0/4.

## Ninth QA follow-up (2026-11-19)

- *Rendered contrast.* Measured from pixels, the glass body copy was as low as 1.8:1 and the armed hold label about 2.9:1. The glass recipe now uses a dark tint with a slightly dimmed backdrop, the hold fill is a darker red, the gradient card keeps its brightest colour away from small text, the muted token is lighter, and a heading over imagery gets a dark chip. The gallery check now measures sixteen text samples from screenshots (text hidden, least favourable pixel behind the glyph box) instead of one computed heading colour. surface-recipes carries the corrected glass and card CSS and a sixth principle: legibility is measured.
- *Shimmer snippet.* It animated regardless of state when copied alone. The recipe is now gated on `data-live` and is still by default; the check asserts still, live, and still again after the state ends, on the snippet extracted from the reference.
- *Inert controls.* The composers' Send buttons now start a run like Replay (pointer and keyboard). The glass sample's "Get Pro" is a non-interactive picture of a button.
- *Low-signal checks.* The CSS rule count was replaced by eleven assertions on the computed result of the declarations each recipe needs. The composer eval's no-install `tool_used` grader was removed because it passes by construction when Bash is withheld.
- *distortion-waves.* The registry now resolves `distortion-waves@0.1.0` (published 2026-11-18 15:27 UTC, after the first read). libraries-dev points at the published package; the earlier 404 stays here as history.

## Tenth QA follow-up (2026-11-19)

- *Holographic card label.* The foil highlight moved behind the edition number and took it to about 2:1. The label now sits on a stable dark plate above the foil layers, and the pixel contrast check measures it with the highlight at rest, on the label, and at the far corner.
- *Selected state in forced colours.* The gliding pill is a background and disappears there. The pressed button now carries a system-colour outline, checked under emulated forced colours.
- *Stacked fan access.* It opened on mouse hover only, so a tap closed it at once and the keyboard could not open it. A native button with `aria-expanded` now pins it open; hover is a mouse-only shortcut. Checked from the keyboard and with touch emulation.
- The three lessons were added to control-patterns and surface-recipes. Checks are now 21 and 38.

## Eleventh QA follow-up (2026-11-19)

- *Focus in forced colours.* The selected-option outline added last round overrode the focus outline, so focusing the selected option showed nothing new. Selection is now an underline and focus an outline; the check tabs onto the selected and an unselected option and asserts both cues. control-patterns states the rule.
- *Beam bloom never left the box.* The blur and the mask were on the same pseudo-element, and a mask is applied after a filter, so the blurred light was clipped at the box edge. The bloom is now a blurred wrapper (`.beam-bloom`) around a masked ring. The check compares pixels at least 8 px outside the composer between active frames and the settled frame and requires light at 14 px or more. surface-recipes carries the corrected recipe and names the mistake.
- *Reduced motion in two recipes.* The grid-row reveal and the staggered entrance in control-patterns had no reduced-motion branch. Both now do, and the check expects no transition and immediate placement.
- *Named-effect workflow.* Step 4 sent named-effect builds straight to step 6, past the dependency and licence approval that lived in step 5. The approval rule now sits in step 6 and applies on every path. Step 9 says alternatives are required for open requests and optional when the user named the effect.

## Routing probes

Fixture: `docs/ui-fx-routing-probes-2026-11.md` (X1–X16), registered in `scripts/check_routing_probe_fixtures.py`.

2026-11-18, fresh descriptions-only judge (new subagent, no forked context), given only the output of `python3 scripts/check_routing_probe_fixtures.py --packet` and `python3 -B scripts/build_skill_smoke_packet.py`:

- After the description was revised for the permissive posture, X1–X16 and the smoke packet were re-run with a second fresh judge; result recorded below under "Re-run".
- X1–X16: 16/16. Five targets routed to `ui-fx`; eleven neighbors and controls stayed with their owners. The judge called X5 (`ui-fx` vs `ai-experience-design`) and X14 (`data-viz` vs `ui-fx`, the word "pop") close and chose as expected.
- Existing fixtures re-run in the same packet for regression: W1–W18 18/18 (W18 answered `none`, an accepted answer), B1–B33 33/33 (B33 answered `none`, as intended).
- Smoke packet: 43/43, including the new `ui-fx` row (S43 then; S44 since main was merged on 2026-11-19).

One run, one judge. No second skill was requested for any X probe.

**Third run** (2026-11-18, after the description changed to "from subtle to showpiece … rebuilds effects seen elsewhere" and probes X17–X19 were added; third fresh judge): X1–X19 19/19, W1–W18 18/18, B1–B33 33/33, smoke 43/43. X17 (subtle composer edge → `ui-fx`) and X19 (subtler modal transition → `web-design`) were both called close and both chosen as expected.

**Re-run** (2026-11-18, after the description was revised to "for exploratory work or an extra layer on a strong baseline … Says yes, pushes further"; second fresh judge, same packets): X1–X16 16/16, W1–W18 18/18, B1–B33 33/33, smoke 43/43. X5 and X14 were again called close and again chosen as expected.

## Not done

- The eval cases were run three times with and without the skill after QA notes (12/12 against 7/12 on three cases; 16/16 against 6/16 on four; 21/21 against 10/21 on five). Details and limits in `docs/skill-evals-2026-11.md`. One run per arm per round; nothing was rendered.
- No library was installed or rendered in a browser.
- `/doctor` was not run for the listing budget (needs a local Claude Code session).

## Merge with main (2026-11-19)

Main had gained 24 commits, including a new `make-font` skill, since this branch started. Conflicts were in four files and were resolved by keeping both sides: the mining ledger (both sets of entries), the smoke-test fixture (`make-font` keeps S43, `ui-fx` becomes S44), the listing-budget note (both checks; recounted at 44 skills and 18,418 description characters), and `frontend-design`'s ui-library-picks (main's fuller local note plus the pointer to `ui-fx`). The blind routing and smoke judge runs recorded above predate the merge and did not include `make-font`'s description; they were not repeated.
