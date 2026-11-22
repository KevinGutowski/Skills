# uikit-skill (Fernando Olivares) — DONE 2026-11-02
Screened https://github.com/notolivaresf/uikit-skill (all six skills, Swift + Objective-C references, iOS 27 what's-new, the benchmark-measured list skills, and four evidence docs). Density HIGH. The library had Apple design doctrine and SwiftUI implementation but no UIKit implementation layer, so created the `uikit` platform skill (router + seven references + sources/coverage-gaps) and folded the benchmark/thinning lessons into `creating-skills` (measuring-skill-effect, House Style rule 17). Boundaries updated in `apple-design`, `swiftui`, README, taxonomy, quickstart; smoke probe S41 added. Follow-up: Apple's Xcode 27.2 skills (via the mariusfanu/xcode-skills export mirror) — `app-resizability` folded into `uikit` (uikit-ios27-sdk) and used to correct the `UIRequiresFullScreen` claim; the other ten Apple skills are noted as companions in `uikit`/`swiftui`/`apple-design` and in the ops intake rules, with the SwiftUI audit parked in swiftui coverage-gaps. Full manifest/fold map: `docs/uikit-skill-source-mining-2026-11.md`.

# Joe Bell Apple web app skill — DONE 2026-09-04
Screened `joe-bell/skills` at `3c875dd53150e763d82da3516a8a0dde21adc8c7`: repo guidance plus the `apple-web-app` body and all ten references; no scripts/tests/assets existed. Density HIGH. No new top-level skill: added `web-design` (apple-installed-web-apps) for iOS/iPadOS Home Screen and macOS Add to Dock metadata, zero-safe insets, standalone navigation/install hints, generated launch assets, storage boundaries, volatile Safari escalation, and real-device verification. Follow-up retained the source's concrete implementation value: status-bar modes, fail-open inset readiness, scroll-root and touch CSS, viewport-unit caution, exact startup-image math, conservative icon sizes, and keyboard/overlay diagnostics. Added boundaries in `web-design`, `apple-design`, and `interface-review`. Corroborated core platform behavior against WebKit Safari 17/18/26, Apple Support, and MDN. Corrected rather than copied the upstream PNG-only claim because WebKit says Safari 26 supports SVG icons across web-app surfaces; parked community thresholds, point-release workarounds, device tables, and private 26.6 observations for re-test. Fresh descriptions-only routing probe passed 6/6 across installed-web-app targets, native Apple controls, generic web layout, and frontend-build precedence. Full manifest/fold map: `docs/joe-bell-apple-web-app-source-mining-2026-09.md`.

# Jakub Krehel interface skills — DONE 2026-07-24
Screened https://github.com/jakubkrehel/skills at `f2d1354f9966fd4d03f9c2beb69591ecec22af54`: README, agent files, all seven skill bodies, 23 supporting Markdown references, OpenAI metadata, and license. Created `interface-review` for the missing holistic-audit task shape. A second pass added `web-design` (web-layout-design) and strengthened web-accessibility; current CSS/WCAG mechanics were corroborated against MDN and W3C WAI, while the source's exact layout constants remain labeled heuristics. Typography, color, polish, and writing mostly overlap the deeper local corpus. Full manifest and fold map: `docs/jakubkrehel-skills-source-mining-2026-07.md`.

# Ona Background Agents Summit 2026 — DONE 2026-06-17
Archived the bounded 17-item Ona playlist (`PL3TSF5whlprXNdegxuGPSoa13wqx-dcAw`) plus channel listing using `yt-dlp` metadata and English VTT captions. Generated a local working archive with info JSON, original/normalized VTTs, deduped Markdown transcripts, a source index, and quote candidates. Density HIGH. No new skill: folded background-agent runtime primitives, verification-first factories, runtime security, context SDLC, pain-first adoption, regulated controls, Slack/session UX, and agent-run queue surfaces into `working-with-ai` (agentic-coding + ai-enablement) and `devtools` (agent experience). Source coverage/fold map: `docs/ona-background-agents-summit-2026.md`.

# Linear Conversations on Quality transcript pass — DONE 2026-06-17
Pulled latest main, then fetched YouTube captions for all nine `linear.app/quality/01`-`/09` videos with `yt-dlp` into `/tmp/linear-quality-captions` and normalized ~33k transcript words. Compared against existing folds in `shape-up` (Decisiveness predicts quality), `design-principles/references/practitioner-notes.md`, and `design-craft/references/linear-product-craft.md`. Folded only deltas into `design-craft/references/linear-product-craft.md`: quality triage (wrong problem vs rough execution, repeated-use jank, scope as deletion, mistake correction over permission culture), dogfood/unshipping loops, taste calibration (named decider, rolling 80/20 revisit, engineers trained in craft language, communication as craft prerequisite), interface feel vocabulary, and phase-fit artifacts. Updated `design-craft/references/sources.md` with episode IDs/access method and `docs/linear-design-source-mining-2026-06.md` from caption-blocked to read. Second pass cleaned up README/top-level `design-craft` routing and added a prompt-coverage table against the requested mining checklist. Skipped/left in existing homes: zero bugs, generic quality philosophy, fast-decision doctrine, MVP-to-MLP, broad product/process strategy.

# Kevin Kold polished UI with Claude — DONE 2026-06-17
Source: `x.com/kvnkld/status/2066863634949779464`, an X Article titled "The 10 rules to ship truly polished UI with Claude" (`2064972712729292800`). VxTwitter exposed the article pointer; FxTwitter exposed full article blocks and embedded CSS snippets. Density HIGH. No new skill: lessons routed to existing AI UI direction, frontend generation, design-system AI context, web motion, and design-craft execution references. Folded exact-values-over-adjectives, token-first prompts, explicit Figma/MCP property handoff, house motion variables, magnetic snap zones, state-driven microinteractions, and press-scale theme note. Source coverage/fold map: `docs/kvnkld-polished-ui-source-mining-2026-06.md`.

# Taste / visual-reference skill pipeline — DONE 2026-06-16
Source trail started at Cole's reply to Andrew Wilkinson's Codex-design-taste complaint (`colderoshay/status/2066930925573898433`), which quoted Jaytel's Taste/taste.md post (`Jaytel/status/2058310720274440672`). Opened the parent complaint, Jaytel post/video, hosted site, downloadable `taste-design.zip`, full `jaytel0/taste` repo, generated example skill, comparison images, article/process docs, prompt/config/chunking code, web app components, Skill Lab, AGENTS.md, and tests. Density HIGH. Folded beyond one new guide: `creating-skills/references/converting-visual-references-to-skills.md` (pipeline), `frontend-design` (reference-derived constraints, anti-overfit), `working-with-ai` (taste-auditor overfit check), `design-prototyping` (base vs broad vs specific skill comparisons; Skill Lab baseline/control loop), `design-systems` (DS substrate vs taste context split), `devtools` (copy-to-agent onboarding prompt), `working-with-ai` agentic-coding (agent-facing repo hot-zone/AGENTS.md), README install quickstart, and `docs/skill-library-ops.md` high-touch source-mining protocol. Source coverage and fold map: `docs/taste-source-mining-2026-06.md`.

# Agent quickstart trace — DONE 2026-06-16
Observed an agent trying to install from `KevinGutowski/Skills` with the default `skill-installer` listing path and failing on missing `skills/.curated`. The agent recovered by manually inspecting the GitHub tree, installing explicit root-level paths, and reading the installed `SKILL.md` plus references directly. Folded into repo-level affordances rather than a new skill: root `AGENTS.md`, README agent quickstart, `docs/agent-quickstart.md`, and the agent-facing maintenance section in `docs/skill-library-ops.md`. Lesson: agent-readable repos need a hot-zone install shape, not just a human index.

# Nature of Code / creative-coding — DONE 2026-06-13
Extracted Daniel Shiffman, *The Nature of Code* from local Apple Books EPUB at `~/Library/Mobile Documents/iCloud~com~apple~iBooks/Documents/The Nature of Code.epub` to `/tmp/books/nature-of-code.txt` after updating the temp EPUB extractor to find nested `*.opf` files and include `.html` spine items. Density HIGH. Created `creative-coding` with Gross et al., *Generative Design* as the second source that had been parked for this candidate. Scope: procedural/generative visual systems, not production UI polish (`frontend-design`/`web-design`) and not end-user tool agency (`malleable-software`). Fold routes: randomness/distributions/noise; vectors/forces; particles; physics-library thresholds; steering/flocking; cellular automata; fractals/L-systems; evolutionary variation. Processing/p5 API details are era-tagged and require current-doc verification before exact syntax recommendations. Verified manifest: `docs/quotes-nature-of-code-creative-coding.json`; batch verification passed for all five short quotes across `/tmp/books/nature-of-code.txt` and `/tmp/books/generative-design-p5js.txt`.

# Product-trio book fold — DONE 2026-06-11
Folded Perri (*Escaping the Build Trap*), Gothelf/Seiden (*Lean UX* 1st ed.), and Klein (*Build Better Products*) per `docs/pending-folds-product-trio.md`: no new skill. Main deltas: `user-research/references/validation-and-metrics.md` (assumption stacks, predictive personas, Lean UX validation economics, metrics hygiene, no-neutral decisions), `shape-up` metrics-led fourth school, `user-onboarding` Designing Backward/core-loop-first, `design-org-influence` build-trap/Bungay gaps, `client-engagements` deliverables→outcomes contract note. Conflicts scoped: measurement-led school vs Linear taste-led school; Lean UX speed/fidelity advice era-tagged and limited to validation artifacts.

# Show Your Work book fold — DONE 2026-06-11
Screened Austin Kleon, *Show Your Work!* in full from `/tmp/books/show-your-work.txt`. Density: MED-HIGH for `building-in-public`; no new skill. Folded daily-dispatch, stock/flow, own-your-turf, attribution-as-context, teach-what-you-know, human-spam/open-node behavior, permission email list, and momentum/boundary notes into `building-in-public`. Extracted but not yet screened/folded in this pass: `/tmp/books/made-to-stick.txt`, `/tmp/books/design-for-how-people-learn.txt`.

# Made to Stick targeted fold — DONE 2026-06-11
Screened Chip Heath & Dan Heath, *Made to Stick* from `/tmp/books/made-to-stick.txt` for this queue pass. Density: LOW-MED overall (famous/model-known SUCCESs framework), MED for `design-org-influence` because it strengthens business-case pitch mechanics. No new skill. Folded Commander’s Intent/one-lead framing, meaningful surprise, concrete language, human-scale statistics, and story-as-behavior-carrier into `design-org-influence`. `/tmp/books/design-for-how-people-learn.txt` remains extracted but needs a fuller screen before deciding whether to create/fold learning-design material.

Supplemental audit after review question: Made to Stick should not live only in `design-org-influence`. Added scoped folds to `developer-tool-gtm` (landing-page sticky-message pass: one core, concrete workflow scene, human-scale numbers, story before moral) and `write-clear-prose` (sticky pass for remembered/acted-on prose). Still skipped `ui-voice-and-tone`, `building-in-public`, and `user-onboarding` for now to avoid re-teaching generic SUCCESs where stronger local methods already own the surface.

# Design For How People Learn skill creation — DONE 2026-06-11
Screened Julie Dirksen, *Design For How People Learn* from `/tmp/books/design-for-how-people-learn.txt`. Density: HIGH because the corpus had onboarding, feature discoverability, and people management but no general skill for courses/workshops/internal training/job aids. Created `learning-experience-design` as a single-deep-method skill under the house-style exception: gap diagnosis (knowledge/skill/motivation/environment/communication), learner observation, contextual goals, CCAF, practice/feedback, motivation, and environmental performance support. Added README row and bidirectional boundaries with `user-onboarding`, `feature-discoverability`, and `people-management`.

# The User Experience Team of One targeted fold — DONE 2026-06-11
Extracted Leah Buley, *The User Experience Team of One* via `pdftotext` to `/tmp/books/the-user-experience-team-of-one.txt` (font-weight warnings only; text usable). Density: MED. No new skill: the method catalog largely routes to existing `user-research` and `design-prototyping`, while solo-UX influence routes to `design-org-influence`. Folded principles-over-process, good-enough artifacts, Listening Tour, scope-not-permission framing, and pyramid evangelism into `design-org-influence`; folded participatory sketching and no-async-prototype-drop into `design-prototyping`.

# PR #5 review lesson — ENCODED 2026-06-11
Reviewer fix `24d5001` did not reject the book-fold placements; it enforced the skill-body budget. `design-org-influence` was slimmed from 6,352 to 4,799 o200k tokens and `design-prototyping` from 5,187 to 4,999 by moving quote banks, examples, and source-specific texture to references while leaving the operating rules and one load-bearing quote in the body. Future folds should treat 5k body tokens as a hard cap even when `validate_skills.py` passes, because the validator checks line count, not token budget. Also log attribution corrections explicitly: `Build Better Products` is Laura Klein; Cindy Alvarez is quoted within the book, not the author.

# Universal Principles of Design targeted fold — PASS 1 2026-06-11
Extracted Lidwell/Holden/Butler, *Universal Principles of Design* (2003) to `/tmp/books/universal-principles-of-design.txt`. Density: LOW overall because the 100-entry encyclopedia is mostly model-known and already covered by stronger local sources (`design-principles`, Apple discoverability, Laws of UX, accessibility, polish). Targeted high-signal folds only: `Advance Organizer` → `learning-experience-design` (linear-path orientation; expository vs comparative organizers), `Entry Point` → `user-onboarding` (minimal barriers + points of prospect + progressive lures for first use), `Errors` → `error-messages` (slip vs mistake prevention before writing copy). Quotes verified via `scripts/verify_quotes.py`. This was not an exhaustive 100-entry fold; revisit only if a future candidate entry has a named target skill and non-generic delta.

# The UX Reader targeted fold — DONE 2026-06-11
Extracted unpacked EPUB directory `The UX Reader.epub` via `xmllint` body text to `/tmp/books/the-ux-reader.txt` (textutil helper failed; extraction usable). Density: MED. No new skill: MailChimp's 2014 essays are mostly practice notes that route cleanly into existing UX org/research/system skills. Folded research dissemination channels (posters, coffee hours/lunch-and-learns, newsletters, mini-docs, collaborative reports, evangelists) into `user-research/references/synthesis-and-impact.md`; folded pattern-library prework and slat-system reuse into `design-systems` + `references/field-notes.md`; folded MailChimp's small-team/parallel-cycle/empathy model into `design-org-influence/references/team-building.md`. Quotes/facts verified with `scripts/verify_quotes.py`.

Follow-up fold 2026-06-11: added the remaining high-signal MailChimp deltas from the same verified extraction: SVG animation asset preparation → `frontend-design` (layer hierarchy, named groups/paths, point cleanup, Illustrator export cruft, one coordinated SVG for multi-frame animation) and deliberate cleanup/refinement release budgeting → `shape-up`. Kevin flagged that SVG should be corroborated against already-scanned books before shipping; targeted scan found useful deltas in *Refactoring UI* (intended icon size), *On Web Typography* (SVG over icon fonts), and *Accessibility for Everyone* (avoid bitmap text; SVG text as scalable/stylable option), plus a source-map-only lead in *Animation at Work* (SVG filters/sprites for motion blur). Added `docs/book-source-map.md` as the separate TOC/chapter-summary reference for future skill writing/updating; do not embed TOCs in skill bodies.

# sweep: animations.dev — FINAL 2026-06-10
## Coverage: SWEPT — all 45 lesson nodes + 4 interviews + emil-skill page + vault opened personally; evidence in /tmp/animdev-lessons/ + /tmp/animdev-interview-*.txt
## Lessons (45/45 opened & read)
[read-skip] theory/intro — onboarding logistics
[mined]    theory/what-makes — covered; confirmed no delta
[mined]    theory/easing-blueprint — skill source; NEW: borrow platform curves (Vaul←Ionic iOS-sheet)
[mined]    theory/spring-animations — NEW: bounce-requires-force (drag yes/press no); Vaul size>feel tradeoff
[mined]    theory/timing-and-purpose — NEW: steep-curve-buys-duration (Vaul 500ms, bezier .32,.72,0,1); intro animations run once
[read-skip] theory/taste — fully covered (taste-trained, record+scrub, write-why)
[mined]    theory/train-your-judgement — folded earlier
[mined]    theory/animations-and-ai — installer/upstream diff done
[read-skip] theory/practical-tips — IS PRACTICAL-TIPS.md
[read-skip] css/beauty — CSS-vs-JS covered
[mined]    css/transforms — NEW: translate % over px; rotation→ease-in-out
[mined]    css/transitions — NEW nuance: CSS transitions interruptible vs keyframes not
[read-skip] css/keyframes — mechanics; animation-fill-mode etc covered by motion skill
[mined]    css/clip-path — NEW: duplicate-overlay technique (tabs/theme/compare/reveal)
[read-skip] fm/why, fm/basics, fm/how-i-code, fm/hooks, fm/graph — Motion API; `motion` skill territory
[read-skip] fm/feedback-popover, fm/multi-step, fm/trash — builds; popLayout/MotionConfig takeaways minor
[read-skip] fm/animating-in-public — career; recording tips minor (light mode, QuickTime)
[read-skip] gvg/performance — covered incl. CSS-variable pitfall
[mined]    gvg/accessibility — FIXED contradiction: reduce≠none, keep opacity/color/blur; MotionConfig reducedMotion
[mined]    gvg/future — NEW: morph-don't-replace; design-UI-around-animation; text-morph consequence; fluidity priority
[mined]    family-drawer/* (4) — NEW: easing-first-then-duration; same-curve-family pairing; dynamic opacity duration
[read-skip] dynamic-island/* (4) — build detail; tabular-nums/scale-0.5 covered; blur-consistency minor
[mined]    navigation-menu/* (3) — know-your-tools = research-before-building; Radix/library-choice (shadcn tweet); reduced-motion reminder
[mined]    hero-illustration/* (6) — NEW: desynced idle drift; hover-intent debounce 100ms; two-tap touch pattern; SVG fundamentals covered
[mined]    guest/proof-of-care — folded earlier
## Interviews (4/4) — folded earlier
## Link pass (211 external URLs harvested from snapshots; all 22 content tweets read; key articles read)
[mined]    benji.org/family-values — delight-impact curve; tray system; uniform polish
[mined]    notbor.ing checkbox — windup/long-press/reverse/multi-sensory → touch-interaction-design
[mined]    joshuawootonn sidebar perf — box-shadow expensive
[read-skip] workingtheorys make-something-heavy + taste-is-eating-SV — essays, quote-level
[read-skip] ui.land paco interview — reinforcing ("poor design manifests as slowness")
[read-skip] compoundplanning de cock interview — philosophy, covered
[read-skip] emilkowal.ski posts (toast/drawer/taste/great-animations/clip-path) — blog versions of course content
[read-skip] maximeheckel spring physics + layout animations — technical refs, motion-skill territory
[read-skip] figma spring blog, MDN/Radix/Motion docs, tool sites (easings.co, cubic-bezier, easing.dev) — reference
[pending]  VIDEO refs not watched: Benjamin De Cock "Motion & Playfulness" (youtube fZpTvZuysIo), Stripe craft-and-beauty session, frame.io perf talk, Apple WWDC 10158 (already mined as talk), founders podcast — candidates for a future video pass
[noted]    NEW SOURCE candidates: ui.land (interviews library), index.how, 60fps.design, brianlovin.com/app-dissection, upperstudy.com
[noted]    joshpuckett InterfaceKit alpha (tweet 2037008271492735392) — pushed to IC members; watch the Interface Kit collection

# sweep: interfacecraft.dev RE-COMB — 2026-06-10 (complete)
## Practical Demonstration (8/8 opened & read — TEXT walkthroughs, all mined)
[mined] refining-today — vertical rules, icon unification, tokens, dividers
[mined] refining-presscut — card merging, chart simplification, altitude disclosure, row-background viz, display-font dilution
[mined] redesigning-mobile-web-app 1-3 — critique→architecture→visual language worked example (source of Design Critique skill examples)
[mined] creating-slider-component — the depth-spectrum canonical (value dodge, decile snap, rubber band dead zone, 800ms editable)
[mined] creating-v0-gift-card — layered realism, scratch mask, gesture hint, round-robin sounds/40px
[mined] designing-library-cards — constrained customization (brilliance slider), Lissajous control, mobile fallback
## Collaborating with AI (8/8 opened: interface-craft-skills✓ dial-kit✓ showit✓(video) using-dial-kit/design-critique/storyboard(video+desc) refining-generative-graphic/refining-dial-kit(video; "Agentation" tool noted)
## Interface Kit (4/4 opened: overview=TEXT mined (npm interface-kit, copy-as-prompt diff, Tailwind mode); critique/refinements/details=video)
## Reference Desk (enumerated, 14 curated classics — future source list: Bret Victor ×4, Eames 1972 Q&A, Wilson Miner When We Build, Chimero What Screens Want, Daniel Cook Princess Rescuing, Kurilin What The Best Looks Like, First of Kind, Dive Club, The Web Hasn't Happened Yet, You Have Not Yet Heard Your Favourite Song, Power of Beauty)
## Means & Methods — still all "Soon" (8 unpublished; recheck)
## WK outbound links — content tweets all read earlier; exhibits (gt-standard, torph, stamps, honkish, easing.dev) = visual demos, read-skip

# sweep: Figma Config talks — TRANCHE 1 DONE 2026-06-10
## Inventory: 2025=72 videos (/tmp/config2025-playlist.txt), 2024=88 (/tmp/config2024-playlist.txt); 2023 playlist not yet enumerated
## Tranche 1 (23 transcripts captured /tmp/config-talks/, screened by 3 agents, key quotes verified, folded):
[mined] Saarinen Crafting quality (craft cycle, 0-bug 7d, MVP-internal) → design-principles
[mined] Vazquez quality/perf (castles/tents, metric-bound principles, framing cards) → design-principles
[mined] Modisett Perplexity (anti-chat, sources, machines-not-screens, kill-test, speed law, squint) → ai-experience-design + design-principles + devtool + m-i-f-b
[mined] Figma UI3 (stability-by-default, one-place-to-look, mouse memory) → devtool-interface-design
[mined] Webster Replit (mouse feel, complexity stacking, infinity edge, worse-is-better) → devtool-interface-design
[mined] Tompkins CSS speedrun → m-i-f-b §18
[mined] Hampton (blur 0.3, grain, blend modes) → m-i-f-b §19
[mined] Whitmore/Yuan New Computer (relational AI: analog, boundary protocol, legibility, 6mo trust) → ai-experience-design
[mined] Nan Yu heirloom tomato → shape-up new section
[mined] Wardle (mental models, invisible curation, scarcity, share artifact) → user-onboarding + design-principles
[mined] Allen Serious Play (game feel, sound anatomy, reward curiosity, simulation-over-enums noted) → emil + sound-design + user-onboarding
[mined] Arden obsession (Golden Era framework noted; Hoke maxims) — light fold via design-principles? (maxims only, not folded — LOW density)
[mined] Stocks typography (grade, half-leading, fluid scales, Romney problem) → apple-typography
[mined] Welfle writing (words-away test, button question set, Caviar) → ui-voice-and-tone
[mined] McNamara ornament (hidden ornament, Sullivan corrective) → design-principles + emil
[mined] Lin prototyping (Spectrum, eng-stack rule, recipe) → design-prototyping
[mined] Duolingo (MVP outlawed/V1, show-don't-tell, bet bar neutral, social anxiety) → design-prototyping + ai-experience-design
[mined] Lee play/friction (burdensome-vs-rewarding, friction-as-specialness) → design-principles + ai-experience-design
[mined] Hindle Severance (lookbook, console-first, scale numbers, story-dictates-design) → design-prototyping
[mined] Fryc 3D details (start-in-motion, shot continuity; render pipeline read-skip) → web-animation-design
[mined] Zhang space-filling (7-invitation research method) → emil-design-eng
[mined] Baldwin design systems (35k token death spiral, 80/20 failure, build-then-constrain) — NOT folded: no design-systems skill home; candidate seed for future skill
[FAIL]  vxv_3ZZyZFM "rise of the design engineer" — MISLABELED video (Locofy.ai vendor pitch). Real panel transcript pending re-fetch.
## Pending tranches (~137 talks): notable candidates: 2024 collaborative-precision talk (Stanley+Wayne), teenage engineering (qCliqmX_TQ4), Imran Chaudhri Humane, Wendy Johansson? etc; the "Megan" talk preceding Vazquez; Config 2023 + Config London not enumerated
## Reference trails surfaced (not yet followed): Christopher Alexander Timeless Way; Owen Jones Grammar of Ornament; Writing Is Designing book; Just Enough Research; Mismatch; High Output Management; Spotify squads paper; Steve Swink Game Feel; utopia.fyi; text-box-trim; Worse is Better (Gabriel); Mary Ruefle Deconstruction

# Config TRANCHE 2 (design-systems cluster, 8 talks) — DONE 2026-06-10
[mined] X6_Bakp6xgY panel (federation, 80% golden, 94% Coinbase, team design) → design-systems (NEW SKILL)
[mined] MJTCfSFLUGE best practices (complexity caution, split tests, measurement, deprecation) → design-systems
[mined] En-aD9KDIsE Zalando (35 tokens, theming principles, one-page-one-theme) → design-systems
[mined] kq_lqeIIkPw Albaugh/Bergman (intent-not-pixels, variant math, absorb workarounds) → design-systems
[mined] SR1f4KicAJg Alaska (tokens origin, XL display, dev comp 10k solutions) → design-systems
[mined] kfVUlR9BnYQ Evil Martians OKLCH (programmable color) → design-systems + oklch cross-ref
[read-skip] HW7SFuZCF_g GitHub (mostly demo; designers-write-first-prompt kept) → design-systems
[read-skip] 3QU-EyiUC2Q Coda (vendor pitch; why/how-near-what kept) → design-systems

# Config TRANCHE 3 (14 talks) — DONE 2026-06-10
[mined] BQXTt-NZ2Bs Cash App broken promises (commodification, create-then-lint, recipe model) → design-systems
[mined] -qlAjXbbn6k Atlassian foundations (adoption ratio, 130 eng-yrs, primitives, shift-left, DS-drives-rollout) → design-systems
[mined] 5P1CPwJdlsQ Booking (design API, slots, yearly breaking changes, docs leverage) → design-systems
[mined] 2XuWY2z2TUo GitHub values oasis (dark-mode trojan, org placement) → design-systems
[mined] 5HXMPLkNamg Back Market A/B-the-DS (proxy architecture, intuition-fails) → design-systems
[mined] C06uyfRzAYk Superside AI DS (knowledge graph, graph RAG, LoRA) → design-systems
[mined] A8uSF4KsK-E Hische (refresh-vs-rebrand, blur test, timeless checklist, letterform rules, critique-ruiner) → ios-brand-identity + app-icon-design + design-prototyping
[mined] 8B5JbsnauLg Dziedzic pitching (through line, PSB/SIA, hook, slide rules) → design-prototyping
[mined] UB4Jqd_qp4E when products must die (RADAR, four forces, sunset comms) → shape-up
[mined] zxaHuTyaVfQ trust currency (pyramid of trust, 50ms, familiar analogs) → user-onboarding
[mined] Jq480GEkhZo Walker unlearning design (almost nothing works, test-against-old protocol) → developer-tool-gtm + design-principles tension
[mined] qCliqmX_TQ4 teenage engineering (20-year test, design-vs-styling, play-the-instrument, single-brain counter-model) → design-principles
[mined] SDI8ubVZi7w Wichary old pixel (vanished constraints valuable, find-your-grain, 1800px Chicago) → design-principles + app-icon-design
[mined] epw-TfH2Dig Robinhood/Porto Rocha (one ownable color, equity decay, medium rebalancing) → ios-brand-identity
## Remaining: ~115 talks pending (mostly product demos, AI-platform talks, industry verticals, keynotes); vxv_3ZZyZFM confirmed = Locofy sponsored session titled "rise of the design engineer" (no real panel exists to re-fetch); Config 2023/London not enumerated

# Residual-findings fold pass — DONE 2026-06-10 (zero unfolded findings remain from tranches 1-3)
[mined] Allen simulation-over-enums → chart-experience-design (4th display mode)
[mined] Allen exploded view → devtool-interface-design
[mined] Arden Golden Era + Hoke maxim → design-principles
[mined] Duolingo punitive-vs-pacing → design-principles; bet-bar-neutral → shape-up
[mined] Welfle language research methods → ui-voice-and-tone
[mined] Vazquez load-lifecycle/TTI — SKIPPED deliberately (web-perf metrics; no clean home, candidate for future web-performance skill seed)
[mined] Fryc render-pipeline mechanics — SKIPPED deliberately (3D/AE tooling specifics, low reuse)

# Reference-trail pass (Config talks, level 2) — 2026-06-10
[mined] "Trapped in a Values Oasis" = Will Larson, lethain.com — lead-through-ambiguity/advocate-through-disagreement rule → design-systems
[mined] linear.app/now "Why is quality so rare?" (written form of Saarinen talk) — Belief×Care×Craft, intuition-and-customers-over-data, hiring via work trials → design-principles; linear.app/quality = Conversations on Quality interview series (FUTURE SOURCE, video episodes)
[mined] Anu Atluru "Taste is Eating Silicon Valley" — quotes confirmed, already represented
[mined] Leonardo (leonardocolor.io, Nate Baldwin/Adobe OSS) — contrast-first palette generator w/ token output → design-systems tooling pointer
[pending trail targets — named, unvisited]: Christopher Alexander Timeless Way (book); Owen Jones Grammar of Ornament (1856, public domain — fetchable); Writing Is Designing (book); Just Enough Research (book); Mismatch (book); High Output Management (book); Game Feel/Swink (book); Spotify squads paper (2012 PDF); utopia.fyi (tool); elliotjaystocks.com + his Universal Principles of Typography book; nan.fyi interactive essays; jessicahische.is; Steve Dennis deprecation article; Pinterest adoption-dashboard article; "Decode the Developer" report; Back Market A/B companion article; departure.mono site; Mary Ruefle "Deconstruction"

# Linear "Conversations on Quality" series (linear.app/quality) — SWEPT 2026-06-10
## 10/10 episodes transcribed (/tmp/linear-quality/), screened, verified, folded:
[mined] Ep01 Costolo — quality killers triad, two-week reframe, blame rule, works-the-way-you-work → design-principles + shape-up
[mined] Ep02 Saarinen — values-from-history, purpose-built (mostly corpus overlap)
[mined] Ep03 Weinstein — cancel-the-rest-of-their-day, polish-wrong-product, outage test, "surprisingly great", silence technique → design-principles
[mined] Ep04 Modisett — rolling 80/20, mutable-software amnesty, hard-to-make-bad-button, ownership clarity → shape-up + design-systems
[mined] Ep05 Nadler — switch-vs-stay law, bar-setting, early-birds/skeptic advisory research, learnability≠UX → shape-up + design-prototyping + user-onboarding
[mined] Ep06 Feener — unshipping, three-channel loop, 30-second rule, assume-you-don't-know, name-the-private-shame → shape-up + user-onboarding
[mined] Ep07 Tome — hardware quality (honest-marketing loop, two-sided quality, comms-enables-craft) — NOT folded: hardware-product-quality NEW-SKILL SEED
[mined] Ep08 Twohy — make-right-thing-then-thing-right, one-perfect-day prototype, audience-native medium, signal filters, iceberg → design-prototyping + design-principles
[mined] Ep09 Eismann — MVP→MLP, five craft factors, engineers-own-craft, bet-doc sculpting → design-principles + emil + shape-up
## Trails still pending: nan.fyi, elliotjaystocks.com (+ Universal Principles of Typography book), jessicahische.is, Steve Dennis deprecation article, Pinterest adoption dashboards, Decode the Developer report, Grammar of Ornament (public domain), Weinstein silence-technique→write-clear-prose? (skipped, interview craft)

# Tome resolution (Kevin: hardware-quality not a good frame) — 2026-06-10
DECISION: no standalone skill. Generalizable lessons FOLDED: design-for-least-lying + two-sided quality → design-principles; fake-PDP/story-as-cheapest-prototype + trade-space canvas → design-prototyping; comms-enables-craft → shape-up. Hardware-specifics (surface specs, yield, supply-chain face) dropped as one-talk-deep.
SEED RETAINED: "hardware-product-design" aggregation candidate — needs 2+ more sources from unmined Config tail: teenage engineering (Kouthoofd, mined→principles), Humane eOq1dgyPuHs, ICON robots b0_dCqH8JpA, Work Louder pkQYEfAJo9o, redesigning-the-mouse dJ4DoFzTcBc, Jae Park physical-world uCwVPcwUD6c.

# Growth/marketing cluster (Config tranche 4, 6 talks) — DONE 2026-06-10
[mined] eNI7xwnIu3w Perkins building-in-public — ANCHOR → NEW SKILL building-in-public
[mined] XJkUMoZJYgU Vallaure company-of-one — economics → building-in-public
[mined] _fquRcCZ1qk Smith side projects — compounding, principles-over-tools → building-in-public
[mined] qRcNIJj1S94 Saran design→business — jumbo-button-as-marketing, positioning → building-in-public
[mined] -CYpixuRCgU Zhang Gen Z — funnel inversion + canvases→user-onboarding; emanate-from-community + 150x personal-over-polished → building-in-public
[mined] eFH5B4l4xRc Ramos growth design — sticky CTA, heatmap leak, neutral-as-license, team-size methodology → developer-tool-gtm (noted: generalizes beyond devtools)

# Hardware cluster resolution — 2026-06-10 (continued session)
SEED MATURED → NEW SKILL `hardware-product-design` (6 sources). All 5 pending talks swept (full transcripts read via agent-screen + 46 quotes grep-verified):
[mined] eOq1dgyPuHs "Looking beyond screens" Humane (Chaudhri/Kedenburg, 2024) → hardware-product-design (positioning graph, mockup/rig/parallel-sw, display simulation, old-world-problems smell); AI framings noted in skill cross-refs
[mined] b0_dCqH8JpA "Building a human future with robots" ICON (Ballard, 2024) → hardware-product-design (automate-the-bottleneck, Doom Loop, tech-selection triple) + ai-experience-design (expose-the-design-space output pattern #5)
[mined] pkQYEfAJo9o "Ready, set, IDK" Work Louder (Di Genova, 2024) → hardware-product-design (suppliers, tolerances, inventory, Vickrey pricing, unit-econ gate) + building-in-public new section (sell-the-render, stalk-commenters, Fallout Edition, train/trust/trade)
[mined] dJ4DoFzTcBc "Redesigning the computer mouse" Augmental (Corten Singer + Ryan Hudson-Peralta, 2025) → hardware-product-design (11th finger, failure-mode audit, licker-pad jig, capability ladder, stretchable PCBs, assistive full agency)
[mined] uCwVPcwUD6c "Building for the physical world" panel (Jae Park/Tim Allen, mod. Mike Wittig, 2025) → hardware-product-design (input-method ownership, Kleenex-box spatial prototyping, voice feedback) + ai-experience-design (push/pull model) + design-prototyping (true-spatial-context bullet)
REVIVED: Tome/Fellow hardware-specifics (surface-grade specs, 95→99 yield, part churn) from Linear Ep07 — previously dropped as one-talk-deep, now folded into hardware-product-design Manufacturing section.
Trail candidates (noted, not followed — reasons): Marshall Goldsmith "What Got You Here Won't Get You There" (book, single passing cite); keycult.net (pricing anecdote source, low); ICON Vitruvius/CODEX (product pages, fast-decaying); Augmental silent-speech teaser (unreleased); Imran Chaudhri TED talk (likely redundant with this talk).
Cross-ref edits this pass: design-prototyping (+spatial-context bullet, +relationship), ai-experience-design (+output pattern 5, +relationship), building-in-public (+Work Louder section, 5→6 sources), README (+row). Validator: 73 skills, 0 problems.

# Trail-article pass — 2026-06-10 (continued)
[mined]     nan.fyi/magic-motion — FLIP (First/Last/Inverse/Play), scale-correction childScale=1/parentScale recalc per frame, transformOrigin top-left → fold into motion/web-animation-design after desc-trim pass
[mined]     nan.fyi/keys-in-framer-motion — key change = unmount/remount; keys trigger mount animations + AnimatePresence exits → same fold target
[read-skip] nan.fyi others (database, tokenizer, arrays, debugger, sliding-window, svg-paths) — CS fundamentals / SVG syntax, no corpus fit
[mined]     elliotjaystocks.com/blog/the-old-typography-is-new-again (2026-06-05, Adobe Design) — optical sizing history, opsz axis, auto-mapping (InDesign/Figma/browsers; rem→px→opsz), manual override via font-variation-settings, display/subhead/text/caption, "design for the eye and not just the canvas", Mugikura & Ahrens 2014 ref → fold into apple-typography Stocks section
[mined]     elliotjaystocks.com/blog/responsive-web-typography (2014) — measure 45–75 chars (Bringhurst), Trent Walton asterisk technique, adapt measure via font-size+padding not max-width, leading must respond to size changes, "the web is 99% typography" (Reichenstein) → same fold target
[blocked]   jessicahische.is essays — /thinking 404s; musings index JS-walled; logo-equity already folded from Config talk (ios-brand-identity). Low marginal value.
[blocked]   Steve Dennis "My Five Biggest Design System Mistakes" (Medium, 2022) — member-only paywall; deprecation lessons already in design-systems from his Config talk. Visible fragment (component-token mistake) corroborates existing content.
[pending]   Pinterest adoption dashboards, "Decode the Developer" report, Grammar of Ornament (public domain)
Note: elliotjaystocks.com 403s WebFetch; use curl with browser UA. Evidence: /tmp/trail-articles/*.txt
[blocked]   "Decode the Developer" report — not findable as a distinct public artifact (searched 2026-06-10); likely an in-post reference. Drop unless re-cited.
[read-skip] Pinterest adoption dashboards — internal artifact described in the Config design-systems talk, not public; lessons already in design-systems adoption section.

# Description-trim pass — 2026-06-10
Kevin flagged descriptions near the 1024 cap. Docs check: 1024 = hard cap, official examples ~150–200 chars, descriptions preload into every session. All 51 descriptions >700 trimmed to ~600–650 (3 parallel agents, boundary clauses + triggers preserved). Corpus total 56,198 → ~41,400 chars (~3.6k tokens/session saved). Full routing eval re-run: 44/44, #35 fix holding. validate_skills.py now warns >700. Trail folds landed after trim: Stocks×2 → apple-typography (opsz mechanics, measure 45–75 + asterisk technique); nan.fyi×2 → web-animation-design PRACTICAL-TIPS (FLIP internals, keys-as-animation-tool).

# losmontoya_/MDS judge-pattern trail — 2026-06-10
[mined]   x.com/losmontoya_/status/2064774612739887532 (Carlos Montoya, Dropbox) + parent x.com/mds/status/2064693908018213282 → design-prototyping agents tier #4 (independent fresh-context judge pattern)
[blocked]  Shift Nudge MCP server (MDS) — announced 2026-06-10, unreleased ("will share more soon"). RECHECK: when it ships, evaluate connecting it and/or mining whatever public material accompanies the launch. Shift Nudge curriculum itself is paid ($199–299/mo) — distill-only rules would apply.
[read-skip] losmontoya_ timeline — mostly RTs (Figma Make, pencil.dev, Taskmaster); no public repo of the judge technique found.

# Ryo Lu sweep — 2026-06-11
[mined] x.com/ryolu_/status/1946314616352440655 "designing in layers" → feature-discoverability
[mined] dsZqOPVQTNg "Designing the future of Cursor" (Dive Club) — merge-concepts, container-not-screen, feedback-as-model-training, build-the-doors
[mined] 8ncYSGbfeyY Dialectic "Living Tools" — slack-in-systems, zero/one/end states, horsepower-no-steering-wheel, anti-slot-machine, elevators-not-deletion, taste-is-eating
[mined] RynySryqM_0 YC-website roast — visitor-question order, headline mechanics, de-slop tokens, motion discipline, details-that-melt → developer-tool-gtm + frontend-design + web-animation-design
[mined] PQhcHrCyU8M designers-to-developers — two philosophies, chat-only-bad-floor, human-opinion law, intentional-friction/packaging
[mined] bdh8k6DyKxE design-to-code tutorial — shadcn/Radix substrate, UI archaeology, plan-mode spec, agent topology, release rings
[mined] T8T2gHCKWCE panel (Jin Park/Catherine Wang) — bricks/D-slop, baby-cursor env, Ramp 3-tier ladder, previbe-cleanup pipeline, prompt protocol
32/32 sample quotes grep-verified. Folding via 2 agents across 13 skills (in flight).
Trail candidates noted: Ryo's essays (ryo.lu? "how to make great things", complexity-before-simplicity, slack), Elizabeth Lin "Design as a Party", Brian Lovin prototype playground, Jeffrey Litt chef-knives, jdahl substack (already cited), GUI Galaxy archives. Dialectic ep34 audio = same as 8ncYSGbfeyY.

# MDS public corpus (Playwright pass) — 2026-06-11
[mined-index] mds.is — now a links page (scramble-text animation; old blog gone). Full public index captured: floatlabel.com (→ Dribbble shot), floatprompt.com, introtoicons.com, usecontrast.com, Config 2024 talk (already mined → building-in-public), Dive Club K_7ECqNlTtE (10k words, captured), ~15 podcast/interview appearances.
[read-skip] floatprompt.com — MDS's portable AI-tool text format ("JSON defines behavior. Markdown provides methodology"); parallel invention of the SKILL.md shape; cross-ref note → creating-skills, no deep content to mine on site.
[pending] Dive Club K_7ECqNlTtE + the 14 channel transcripts — screening agent in flight (add K_7ECqNlTtE to next screen).
[read-skip] floatlabel.com → redirects to the 2013 Dribbble shot; pattern history already known.
[blocked]  introtoicons.com — free but email-gated mini-course (3 traits of icon sets, geometry-first, SVG basics); the captured 7zBp4ZNDto4 icons video covers adjacent ground. Kevin could enlist if wanted.

# MDS channel screen results — 2026-06-11
14/14 transcripts screened (agent, quotes grep-verified by screener). Density: 9 HIGH, 3 MED-HIGH/word, 2 MED, 0 LOW.
[mined→folding] wXAa2HNNjM4 (canonical polish pass), qIHSCHkUf8I (layout-primitive literacy — NEW-SKILL FLAG), 4p5LzrAYN30 (craft/systems/AI worldview), ULUNaH-G2uY (5-band contrast system), jSLfQ0sJDCw (end-to-end hour), 7zBp4ZNDto4 (icon micro-interactions: 1px/5°/150ms ease-out), ZRBq8UYLa-0 (status-pill recipe), cpLkOqHUQyc (48px rhythm, CTA monopoly), PFi9WfNUlps (handoff discipline), -VSXVDr5HW0 (layout connectors, negative-space oxygen), k8dcRRgA3T8 (Mud City, keyboard-first), Uno5dpotRgo (pixels are free), z11_gP9VzFQ (10-12 interview), 6153Upr2BDM (vision before visuals)
NEW-SKILL SEED MATURING: "ai-ui-direction" (directing/fixing AI-generated UI in layout-primitive vocabulary) — sources: MDS qIHSCHkUf8I + interview, Ryo de-slop substrate + bricks, Jin previbe pipeline, Stamatiou 65/100 diff. ≥4 sources, coherent task shape → CREATE after Ryo fold batch 2 frees design-prototyping/ai-experience-design (needs cross-refs).
Pending folds (after batch-2 frees files): design-prototyping (prototype-vs-system components, SVG steal, smart-animate naming rule, variant matrix, complexity gate, auto-layout corner), design-principles (sculpture, craft definition, Adidas calibration, intuition-vs-data, project-environment design, most-pressing-first), interface-craft-principles (one-hour-timer ritual, good-enough-vs-excellence, polish-pass skeleton), ios-brand-identity (say-it-once, color-action watering), frontend-design (foundry fonts, imagery 10x, faux fade-out, white-band multiply trick), ai-experience-design (AI pilots, prompt-vs-edit anti-pattern).
[mined→queued] K_7ECqNlTtE Dive Club (MDS × V0 mosaic walkthrough) — HIGH, ~13 new lessons, near-zero overlap: tool-making reflex, control-panels-not-hardcoded, build-your-own-command-D, batch-generate-to-tune-taste, hammer framing, timeless-vs-timepiece kill criterion, don't-over-reference, energy transfer, 85%-Figma-finish-in-code, diagram-as-AI-context, FPS hygiene, load-ready bounce, personal-site identity trap. Folds queued behind Ryo batch 2 (design-prototyping/design-principles busy): final wave = design-prototyping, design-principles, interface-craft-principles, frontend-design, emil-design-eng, ios-brand-identity, ai-experience-design + NEW SKILL ai-ui-direction.
[folded] Final wave complete — Dive Club + interview material into design-prototyping, design-principles, interface-craft-principles, frontend-design, emil-design-eng, ios-brand-identity, ai-experience-design (67 quotes verified; 3 stutter-corrections; 2 source re-attributions caught). Ryo+MDS sweeps now FULLY folded: 6 Ryo talks + 1 tweet + 16 MDS sources across ~25 skills. Corpus: 82 skills, validator clean. ai-ui-direction created; probes 54-56 3/3.

# Direction-3 pass — 2026-06-11
[recheck-done] WWDC26 Group Labs playlist posted (19 labs). Captured+screening: Icon Composer beginners (iaXx7XVK8c8), Accessibility (1juOcrja4bo), SwiftUI (7g-Xg5xiH4o). No captions yet: emR88Imk2lc (2nd SwiftUI), FLH7Ryg8EE0 (Apple Intelligence) — recheck in ~1wk or gpt-4o-transcribe. No dedicated Design lab posted; 8004/8005/8006/8012/8121 still unposted on YT.
[mined] ryo.lu essays: "How to make something great" (Notion) + complexity-first + making-things-true + engineers-path tweets → design-principles Ryo section. ryo.lu home = portfolio only.
[eval] error-messages effectiveness run: MARGINAL (bare preferred 35-34 both passes) → Non-negotiables block front-loaded into the skill from observed failures; re-test queued. design-polish: PULLING WEIGHT (prior run).
[hygiene] 4 over-budget bodies (design-principles 10k, design-prototyping 8.6k, archival-research 8.1k, emil-design-eng 6.7k tok) → progressive-disclosure split agent in flight. design-systems 6.2k noted, deferred.
[queued] frontend-design effectiveness run (next eval candidate).

# Valio Con sweep — 2026-06-11 (Kevin's tip)
16/16 talks captured+screened (2012-14 era; Drew Wilson's conf; 2026 edition upcoming Sept — recheck for new talks after). Density: 4 HIGH (Garland, Brach, Sheldon, GMUNK), 2 MED-HIGH, 5 MED, 4 LOW, 1 SKIP (Dann Petty health talk, scraps only). Fold agent in flight → building-in-public (+ references/valio-field-notes.md), interface-craft-principles, design-prototyping, developer-tool-gtm, design-principles refs, sound-design. Valio Con 2026 (Sept 16-18, Oceanside) ledgered for post-event recheck.
# Ryo deep pass — long-tweet corpus (23 captured, 10 full-fetched) folded: liquid-glass counter-position, devtool instruments-not-appliances, design-principles refs maxim block. work.ryo.lu case studies still pending (low priority — portfolio pages).

# Femke + Futur sweeps — 2026-06-11 (Kevin's channel tips, popularity/relevance-triaged)
[mined] @femkedesign 11/11 screened — NEW SKILL design-org-influence in creation (impact framework, strategic narrative, four lenses, 5 seniority anti-patterns, 4 PM objection scripts, SBI/wins-doc, her stateful review-logging SKILL.md architecture). Queued: uQLAUq4TstI presenting-mechanics deltas → design-prototyping (after Valio agent frees it); portfolio deltas parked (no portfolio skill; thin).
[mined] @thefutur 8/8 screened — NEW SKILL pricing-creative-work in creation (Sequence Flip, price-the-client, objection scripts gold, Stark frameworks). 0begsejrxjI brand-strategy = career interview, two nuggets ride along; a brand-strategy skill would need a different corpus (future tranche candidate: more Futur brand-strategy videos if wanted).
Remaining channel tails: Femke ~100s more videos (career-adjacent, mostly covered shapes); Futur 1000s (next densest: negotiation series, Mo roleplays, Blair Enns guest episodes — ledger for a future tranche).

# Book library located — 2026-06-11
Apple Books (~/Library/Containers/com.apple.BKAgentService/.../Books/ + BKLibrary sqlite catalog), iCloud Downloads, local Downloads. ~40 design titles inventoried.
MINING ORDER: (1) Pricing Design (Mall) + You're My Favorite Client (Monteiro) → pricing-creative-work [extracted to /tmp/books/]; (2) research cluster (Hall Just Enough Research [.mobi, needs convert], Portigal Interviewing Users, Sharon, Klein) → NEW user-research skill; (3) Everyday IA (Martin) → NEW info-architecture; (4) Laws of UX + Universal Principles → design-principles cognition layer; (5) typography trio (Rutter/Latin/Santa Maria); (6) per-skill extenders (Nabors, Kalbag, Metts/Welfle, Walter, Peters, Zhuo, Hogan, Perri, Kleon, Heath).
NOTE: purchased books — distill-only house rules (lessons in own words, short quotes), same as paid-course precedent.

# Book mining progress — 2026-06-11
[mined→folding] Pricing Design (Mall) — third school for pricing-creative-work; forks documented (pricing-the-moment vs never-anchor; Goldilocks vs one-page-one-price; value-trait vs attention tiers; RFP engage vs avoid); convergences (~10%, "I don't have one", round numbers, meal/dinner test)
[mined→creating] You're My Favorite Client (Monteiro) — NEW SKILL client-engagements (qualification gates, honesty preamble, like-ban feedback system, swoop-and-poop/dive-bomb, failure/firing mechanics); pricing engagement-terms extension QUEUED behind Mall fold; Design Is a Job noted as companion future source
[screening] research cluster: Just Enough Research (Hall) + Interviewing Users (Portigal) + Validating Product Ideas (Sharon) → NEW user-research skill proposal pending
[extracted, queued] everyday.txt (Martin, IA), laws-of-ux.txt (Yablonski)

# Making Software (Dan Hollick) — 2026-06-11
[mined→folding] 3/12 chapters fully public (how-a-screen-works, color-spaces — the crown jewel, image-compression); 8 paywalled mid-chapter ($99 early access) but previews substantive (curve math + blur separability survived the paywall); contrast chapter UNRELEASED ("isn't ready yet").
Verdict: fold-in (oklch theory backstop, image-archival why-layer, MIFB blur/corner math, hardware display physics, frontend SVG model) — NOT a new skill at current public volume. FLIP CONDITION ledgered: if Kevin buys early access ($99), 12 full chapters justify a graphics-fundamentals hub skill. RECHECKS: contrast chapter when published (→ apple-visual-accessibility); capacitive-sensing section (→ hardware-product-design); Dan Hollick's typefully threads superseded by book chapters (read-skip).
[UPDATE] Making Software — Kevin PURCHASED + logged in. Flip condition met: full 13-chapter capture in flight → graphics-fundamentals hub skill (GITIGNORED per interface-craft precedent: purchased/members content; generalizable lessons stay distilled in public skills with citation). Supplementary folds queued post-capture: capacitive sensing → hardware-product-design, subpixel AA/font-making → apple-typography, contrast chapter (if released to members) → apple-visual-accessibility.

# Dive Club channel sweep — 2026-06-11 (Kevin's confirmation)
Channel enumerated (~45 episodes). Tranche 1 captured: 14 episodes (~144k words) — Claude Code lead designer, Josh Puckett uncommon-care, Katie Dill Stripe, Modisett Perplexity, Worboys AI-native org, Anthropic/Every/Ramp panel, Madrick handoff, Brian Lovin AI leveling, Geoffrey Litt malleable software, Steve Ruiz tldraw canvas, Ouriach design systems, Claude Code toolkit, Ryan Scott promotion, Karl Koch design-eng tips. 2 screen agents in flight.
Tranche 2 candidates (not captured): Tommy Geoco industry state, Katarina Batina big bets, Rafa Conde memorable, Polly D'Arcy IC→VP, Jacoby taste, Ian Silber OpenAI, Schwaibold Shopify studio, Flora Guo career+AI, Kris Puckett AI-native, Gannon Nano Banana, Julien Martin Amo, 2026 AI Field Report, Emily Campbell AI UX, Rive, Enrico Tartarotti, Matt Sellers portfolio.

## Parking spots / rechecks (updated 2026-06-11)
- **web-information-architecture (new-skill candidate, HOLD at ~2 sources)**: spine = Lisa Maria Martin, *Everyday Information Architecture* (audit-layering + structural-audit spreadsheet, four-factor categorization, org-chart/audience-nav bans, quick-links ban, every-page-next-step, Spencer's information-seeking modes, tag governance/folksonomy decay, categorization-as-power ethics). Corroboration: *Laws of UX* (Miller's-law nav debunk, Hick's, card sorting). Create when a 2nd dedicated IA source lands — natural candidates: Abby Covert *How to Make Sense of Any Mess*, Rosenfeld/Morville polar bear book, Donna Spencer's info-seeking-modes article.
- ~~Deferred book folds~~ DONE 2026-06-11 (commit 8ba23e0): Yablonski psych-as-evidence → design-org-influence; principle→law→rules → design-principles; emphasis-reads-as-ad → design-polish. Dive Club design-systems fold also completed inline (F2 had hit session limit before reaching it).

## Dive Club tranche 2 decisions (2026-06-11)
- **PROMOTED: ai-enablement (new skill, in creation)** — org-level AI knowledge propagation cleared the bar at 5 sources: Shopify Vault/decisions-MCP (Batina 0YjO7wShTkQ), Ramp Glass/context-briefcase/Team Zero (Geoco OYNoy468kS8), Atlassian enablement program (Healey+Hall CqMZTg7L-wE), OpenAI internal data-scientist agent (Silber oM1d9Tau27w), Stripe team skills (Puckett nPyxVMd1LIA). Boundary: repo rules → agentic-coding; DS mechanics → design-systems.
- **EXTEND not create: designer-built-tools → malleable-software** practitioner section (Moshi onQY0PrUulw primary; Geoco 59%/Ramp 1,500 tools; Schwaibold contextual software; Puckett 2-hour app). Extend>new: jigs/tool-making already its territory.
- **STILL PARKED: design-team-leadership** (D'Arcy deep + Batina/Geoco medium = borderline) — hiring material folds into design-org-influence/references/team-building.md instead. Revisit if a 2nd deep source lands.
- **STILL PARKED: one-of-one personalization bounds** — warming (Red OS, Hearth, tools-of-one, Puckett soul/health app) but same social circle; not diverse enough.
- web-information-architecture: nothing new this tranche.
- Remaining unscreened DC episodes (lower priority): Geoco/Batina follow-ups n/a; left on channel: Jamey Gannon Nano Banana, Julien Martin Amo, Tommy Smith side projects, Ryan Stephen storytelling, Hannah Hearth careers, Rive explainer, Xavier Jack 3D, Matt Sellers portfolio, Dessn, Enrico Tartarotti, Nad Chishtie Lovable, Roman Tesliuk, MDS sneak peek, tabletop console, Megan Choy solo eps. Mostly career/tool-demo; screen on demand.
- RECHECK QUEUED (2026-06-11): design-prototyping (~7.9k tokens) and design-systems (~7.8k tokens) SKILL.md bodies are well over the 5k house budget (were over before tranche 2). Needs a slimming pass: push depth to references/, keep front-loaded rules.
- DEFERRED Nabors folds (waiting on slimming agents to release files): motion timing-scales-as-tokens + microanimation vocabularies ("voooooosh"/Amy Lee quarter-note/Salesforce LDS, Ch3-4) → design-systems; storyboard/animatic/prototype documentation matrix (Ch4) → design-prototyping. Source: /tmp/books/animation-at-work.txt.
- logo-design created 2026-06-11 on single-deep-source precedent (Peters method, like Hulick/user-onboarding). RECHECK: OCR Gal Shir *60 Tips for Logo Design* (image-only PDF in iBooks library) and fold as second source before the skill hardens. Flarup macOS App Icon Book → low density, folds to app-icon-design only (pre-Liquid Glass — concept/testing craft only).

- CLOSED 2026-06-11: design-team-leadership parking spot superseded by people-management (created from Scott/Zhuo/Hogan trio; design-specific hiring signals remain in design-org-influence/references/team-building.md).

- CLOSED 2026-06-12: Routing-probe recheck — Codex probes 84–90 spot-checked 7/7 by a fresh descriptions-only judge (both learning-experience-design probes, both photographic-lighting probes, all three controls held).

- CLOSED 2026-06-12: Gal Shir *60 Tips for Logo Design* OCR recheck completed. Rendered 77 image pages via `pdftoppm` to `/private/tmp/gal60-ocr`, OCR'd with Tesseract, assembled `/tmp/books/60-tips-logo.txt`, and verified 19 short quotes. Density MED as a corroborator, not a replacement for Peters. Folded four-lane intake, three keyword lanes, time-boxed sketch warmup, rest/profile-image/application/uniqueness tests, and presentation sequencing into `logo-design`; added TOC/source-map entry. The `logo-design` skill is now two-source, with Peters still primary.

- CLOSED 2026-06-12: Photography lighting pair targeted pass completed. `Light: Science & Magic` extracted to `/tmp/books/light-science-magic.txt`; Tony Northrup DSLR EPUB extracted to `/tmp/books/tony-northrup-dslr.txt`. Created `photographic-lighting` from the coherent task shape: hard/soft source size, direction, reflection/family-of-angles, metal/glass/extreme-surface diagnosis, portraits, fill/bounce/off-camera flash, and field-light constraints. Added README row, source-map entries, and routing probes 88-90. Note: Tony pass was lighting/portrait-targeted, not a whole-book photography screen.

- SCREENED/FOLDED 2026-06-12: Gross et al., *Generative Design* extracted to `/tmp/books/generative-design-p5js.txt` (418-page PDF, p5.js 0.5.11 era). Density MED: strong tutorial/pattern catalog for creative coding, but dated technical guidance and single-source only. No new skill. Folded the abstraction/process precedent (designer as creator of individualized tools; rules/repetition/controlled randomness/parameters) into `malleable-software`. Parked future `creative-coding` candidate pending a second source (Reas/Fry, *Nature of Code*, current p5.js docs, etc.).

## 2026-06-11 — PixelJanitor / Derek Briggs sweep (PR #4 completion)
Cloud agent's PR #4 was a sound base but missed: the 10-tweet shadow-borders thread (production CodePen values), second halves of both cited threads, Chrome 13px baseline bug, flexbox min-size reset, Tailwind-vs-CSS-Modules agent-token experiment (Jun 2026), and ALL video content (Dive Club S4 + Shape FM eps. 3/8 — read in full via yt-dlp). Folded into design-polish, web-animation-design, frontend-design, design-org-influence, design-systems, ai-enablement. All quotes verified (X via vxtwitter; video via transcripts). Parked: Shape FM eps. 1/2 (may contain gradient/shadow talk per ep. 3 reference), button-in-Figma thread 1636415458378407936 (replies unrecoverable), glass-button/Sonner-shadow values (in images, need OCR or manual read), promised dropdown-breakdown thread (likely never posted).

## 2026-06-17 — Linear design articles sweep
User-requested deep comb-through starting from https://linear.app/now/how-we-redesigned-the-linear-ui. Read the dense design subset of Linear's `now/craft` index: the 2024 redesign pair, 2026 calm-interface refresh, output/code/design essays, quality/keynote and Quality Wednesdays, AI-age/workbench essay, Triage Intelligence, Agent Interaction SDK, Liquid Glass mobile redesign, settings essay, contextual-menu detail, and Project Updates. Second pass added `/next`, Self-driving SaaS, Coding Sessions, Designing remote work, and screened all nine `linear.app/quality` episode pages; YouTube caption extraction was blocked by bot check, so no video-only claims were folded. Added manifest/fold map in `docs/linear-design-source-mining-2026-06.md`. Folded into `design-craft` (new `references/linear-product-craft.md` + source routing), `design-principles`, `design-prototyping`, `design-systems`, `web-design` (oklch-skill), `ai-experience-design`, `working-with-ai` (agentic-coding), `shape-up`, and `ux-writing` (linear-settings-copy). Skipped infrastructure-heavy craft posts as low design-rule density for this ticket.

## 2026-06-11 — Soleio Cuervo sweep (PR #6 completion)
Cloud agent's branch was honest and well-routed from written sources (all 8 X posts + Zhuo/Dive/First Round claims verified) but couldn't reach video. Pulled 6 transcripts via yt-dlp, read in full: Dive Club ×2 (WHIXWOmT7_I, ffoMwdLGcFo), Design MBA (hZ3Z2frAWvM — primary for the Like-button experiment, Colombia/Iceland vs Venezuela/Norway), Cults & Culture (vdaGXRvzIq4), PBS (OIAUfZBd_7w), SPC fireside (hNUEaFmPAwc — Soleio is the INTERVIEWER; content is Steve Ruiz's, attributed accordingly). Folded into design-prototyping, design-principles, design-org-influence, people-management, design-systems, user-research, building-in-public, client-engagements. Skipped as out-of-scope: AR/spatial futurism, VC mechanics, brand-as-moat investor framing, engagement-defense PR.

## 2026-06-12 — Consolidation: environment-agnostic clusters (99 → 68 skills)
Kevin's directive: the library must work identically everywhere (other machines, Codex) — no per-machine settings. Retired the skillOverrides overlay entirely; consolidated three low-fire-rate clusters into single skills with members as reference files (git mv, history preserved): rails (16 members), research-cataloging (6), swiftui (9; the swiftui-hub router became the real skill). dhh stays standalone (user-invocable). All cross-refs in other skills, README, and the routing eval remapped. Description demand ~41k → ~29k chars; hot design/book skills keep full descriptions.

## 2026-06-12 — Listing-budget closeout (63 skills, ~23k chars)
Post-consolidation /doctor still showed 23 drops at 1.3%/1% (incl. the new research-cataloging router — perverse most-used eviction). Final repo-native pass: creating-skills absorbed skill-creator + converting-books/codebases-to-skills; research-cataloging absorbed airtable-mcp + openai-transcription-chunking; 47 descriptions trimmed to the 330-380 band (boundary clauses + trigger lists preserved; agent table in transcript); routers trimmed. Fresh-judge spot-check 10 probes: 9/10 first pass; the probe-35 source-sweep-vs-conversion regression refixed by restoring the sweeps-run-FIRST phrase to research-cataloging's description. Demand 41k → ~23k chars.

## 2026-06-12 — Theme merges + rename (61 skills)
Kevin-directed: (1) tufte-viz + chart-selection → `data-viz` (two references; chart-experience-design keeps in-app UX); (2) emil-design-eng → design-polish/references/emil-kowalski.md as a named alternate theme (its animation half already lived in web-animation-design, which is Kowalski-course-based); (3) make-interfaces-feel-better renamed `design-polish` (Kevin: shorter; "interface-design" rejected as too broad — would collide with frontend-design/design-principles/form-design boundary clauses). Trigger phrases preserved in description. Fresh-judge probes 4/4 incl. boundary control.

## 2026-06-12 — apple-design consolidation (54 skills) + before/after experiment
Kevin-directed, experimentally gated. 8 Apple design-doctrine skills (navigation, search, typography, visual-accessibility, liquid-glass, ios-brand-identity, app-icon, app-intents) → `apple-design` with members as references. Kept flat: hig, design-principles, design-prototyping, notification-design, feature-discoverability, naming-features-and-labels, chart-experience-design. BEFORE (flat): 12/13 probes (tab-bar probe drifted to feature-discoverability post-trim). AFTER (consolidated): 13/13 incl. correct second-hop reference selection on all 9 member probes and 4 controls held — the router description's pooled vocabulary fixed the BEFORE miss. 27 outside files remapped + independent grep audit (zero dangling member refs). Trade-off accepted: one extra body read per Apple design question.

## 2026-06-12 — Global taxonomy reorganization (38 top-level skills, ~15.4k chars)
Kevin's directive: deep global pass first ("the details is in the abstractions"; "skill organization + the graph references are key"). Plan: docs/taxonomy-2026-06.md — top-level = platform/activity/cross-domain tool; topics nest under their cluster; nesting never severs access (inbound edges preserved as cluster (member reference) cross-refs — the "connection nodes"). Built gated: web-design (7 members incl. the default motion theme surfaced at router level), ux-writing (4), working-with-ai (3), devtools (3), client-work (2), apple-design extended (+hig — Kevin's call, domain-bound lookup; +chart-experience-design). goal/ gitignored (harness-specific, not library content). Centralized edge remap: 59 files; independent audit 0 dangling. BEFORE 22/24 (misses: CLAUDE.md-rules → init builtin; CLI hero copy → write-clear-prose) → AFTER 24/24 incl. second-hop reference selection and all 6 controls — pooled router vocabulary again fixed scattered-vocabulary misses. Graph rules codified as creating-skills house rule 13a.

## 2026-06-12 — Hyperagent public skills screen
Screened alexmcdonnell-airtable/hyperagent-public-skills (12 JSON skill exports). Routed folds only; no imported scripts or wholesale copied skill bodies.

[folded] `nyt-data-viz` -> `data-viz/references/editorial-interaction.md` plus router entry. High-value deltas: editorial headline/subtitle/source discipline, one-accent color restraint, no rainbow/dual-axis/pie defaults, direct labels before legends, mobile-375 no-hover rule, and D3 interaction bugs (hover hit layer must share mark coordinate space, Delaunay/Voronoi proximity instead of pixel hunting, mark-anchored tooltips, data-derived domains, annotation halos/leader lines).

[folded] `veo-hyperframes` -> `web-design/references/social-video-safe-zones.md`. Durable reusable lesson: for generated vertical video with overlaid text, reserve a full third as a high-contrast text zone in the prompt/storyboard before generation; name the physical contrast source and keep motion/light out of that zone instead of repairing readability afterward.

[parked] Müller-Brockmann grid systems and Vignelli Canon exports are promising for grid/editorial/design-system discipline, especially shared-content-box grid overlays and optical alignment of large display type. Park until verified against primary/public sources or a second corroborating source; do not fold long quoted doctrine from the JSON export alone.

[read-skip] Airtable Kanban tracker, brand-book generator, briefing trailer, claymation video skills, NYC subway campaign, landscaping quote, and business-simulation operator are mostly Hyperagent/demo workflow specifics. Revisit only if this corpus gets a video-production or campaign-generation cluster.

## 2026-06-12 — Book source-map backfill: emotional design + people-management trio
Merged `codex/skill-library-ops` to `main`, pushed, then started `codex/book-folds-next-pass`. Full-screened Aarron Walter's *Designing for Emotion*: density MED, no new skill/fold because its durable lessons already live in `ux-writing` (including error messages), `user-research`, `design-principles`, and `web-animation-design`; added a chapter map so future personality/delight/trust edits cross-check it first. Backfilled chapter maps for the already-folded management trio: Scott's *Radical Candor*, Zhuo's *The Making of a Manager*, and Hogan's *Resilient Management*, all routed to `people-management` and references. No new direct quotes added in this pass.

## 2026-06-12 — Product-trio source-map backfill
Converted the already-verified Perri/Gothelf/Seiden/Klein manifest in `docs/pending-folds-product-trio.md` into `docs/book-source-map.md` chapter maps for *Escaping the Build Trap*, *Lean UX* 1st ed., and *Build Better Products*. Removed the product-trio item from the source-map backfill queue. No skill bodies changed; quote reuse still routes to the existing 100/100 verified manifest.

## 2026-06-12 — Remaining 2026-06-11 book queue source-map backfill
Backfilled `docs/book-source-map.md` chapter maps for the already-folded remainder of the first book queue: Kleon's *Show Your Work!*, Heath & Heath's *Made to Stick*, Dirksen's *Design For How People Learn*, and Buley's *The User Experience Team of One*. No skill bodies changed: existing folds already route to `building-in-public`, `design-org-influence`, `devtools`, `write-clear-prose`, `learning-experience-design`, `user-research`, and `design-prototyping`. Cleared the processed-books-needing-map-backfill list for the 2026-06-11 queue.

## 2026-06-12 — Client-work + user-research source-map backfill
Backfilled `docs/book-source-map.md` maps for already-folded client-work sources: Mall's *Pricing Design* and Monteiro's *You're My Favorite Client*. Backfilled maps for the already-folded research cluster: Hall's *Just Enough Research*, Portigal's *Interviewing Users*, and Sharon's *Validating Product Ideas*. No skill bodies changed; current homes remain `client-work` and `user-research`.

## 2026-06-13 — Information architecture source-map pass
Screened the queued IA pair from `/tmp/books`: Martin's *Everyday Information Architecture* and Yablonski's *Laws of UX*. Added `docs/book-source-map.md` entries and a theme lead for information architecture/findability. Decision: keep `web-information-architecture` parked because Martin is the only dedicated IA source; Yablonski/Sharon corroborate cognitive load, card sorting, tree testing, first-click, and lostness but are adjacent rather than a second dedicated IA spine. No skill bodies changed.

## 2026-06-13 — Practical UI source-map pass
Backfilled `docs/book-source-map.md` for Dannaway's *Practical UI* 2nd ed. Decision: no new skill and no additional skill-body fold in this pass, because the durable high-signal material is already routed into `web-design` (`form-design`, `oklch-skill`) and `web-accessibility`. The map now marks broad layout, typography, and copywriting chapters as corroboration only, with stronger existing homes owning the guidance.

## 2026-06-13 — Web typography trio source-map backfill
Backfilled `docs/book-source-map.md` for the already-folded typography trio: Rutter's *Web Typography*, Santa Maria's *On Web Typography*, and Latin's *Better Web Typography*. Decision: no skill-body changes, because `web-design` (`web-typography`) already contains the durable folds and reference split. The source map now exposes the chapter/section routes for future themed edits around measure, line-height, type scales, pairing, OpenType, web-font loading, responsive type, and SVG/icon-font tradeoffs.

## 2026-06-13 — Local Apple HIG EPUB capture
Located the old Apple interface guides in the local Books catalog, not by filename: `iOS Human Interface Guidelines` at `~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/877942287.epub` and `OS X Human Interface Guidelines` at `~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/930571558.epub`. Extracted them to `/tmp/books/ios-human-interface-guidelines-2014.txt` and `/tmp/books/osx-human-interface-guidelines-2014.txt`. Folded durable historical doctrine into `apple-design/references/classic-hig-principles.md`: iOS deference/clarity/depth, aesthetic integrity, consistency, direct manipulation, user control, standard-control semantics, Mac least-restrictive modality, immediate feedback, drag/drop, keyboard shortcut scarcity, and Help/tooltips. Boundary: current specs still route through `apple-design/references/hig.md`; old visual metrics, iOS 7/Yosemite styling, 3D Touch, and deprecated OS X details are source-map only or skipped.

## 2026-06-13 — Local UX/onboarding candidate recheck
Merged `codex/local-books-round-4` into `main` and pushed (`5a34672`), then opened `codex/local-books-round-5`. Rechecked Samuel Hulick's *The Elements of User Onboarding* from local Apple Books PDF (`/tmp/books/elements-of-user-onboarding.txt`). Verdict: HIGH but already mostly folded in `user-onboarding`; added two missed details only: full adoption-chain audit before changing UI, and an education/nurture path when motivation exists but timing is wrong. Added a chapter map and a 4-quote verification manifest.

Screened nearby local UX PDFs: IDEO.org *The Field Guide to Human-Centered Design* (`/tmp/books/ideo-field-guide-human-centered-design.txt`), UserTesting *A Complete Guide to User Testing Your Next Project* (`/tmp/books/usertesting-complete-guide.txt`), UXPin *The Guide to Usability Testing* (`/tmp/books/uxpin-usability-testing.txt`), and Marcin Treder *UX Design for Startups* (`/tmp/books/ux-design-for-startups.txt`). Verdict: source-map additions only. IDEO is a useful future cross-check for field methods/live prototypes/pilots, but current `user-research` and `design-prototyping` guidance already owns the durable folds. The UserTesting/UXPin/Treder PDFs are vendor-era or broad primers that corroborate existing task-writing, method-selection, and metrics guidance without adding enough to justify body changes.

Parked: Sean Adams, *The Designer's Dictionary of Type* local EPUB (`~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/1450370804.epub`) appears DRM-free in metadata but text extraction is binary/image-like garbage. Needs OCR or image-page inspection before any typography fold.

## 2026-06-14 — Refactoring UI visual-gallery backfill
Kevin flagged that *Refactoring UI* is image-example-heavy and should not be mined as prose alone. Re-rendered selected local PDF pages from `~/Library/Mobile Documents/iCloud~com~apple~iBooks/Documents/Refactoring UI v10.pdf` to `/tmp/refactoring-ui-pages/*.png`, inspected the actual before/after panels, and folded a visual pass into `design-polish`: added `references/refactoring-ui.md` plus a self-contained HTML/CSS bad/good gallery at `design-polish/examples/refactoring-ui-gallery.html`. The gallery recreates the UI patterns in original editable code without committing book screenshots. Source map expanded from the previous icon-only note to full chapter routing.

## 2026-06-15 — Refactoring UI gallery expansion
Kevin correctly challenged the first 9-example gallery as too narrow for a book that is mostly visual paired examples. Extracted all local PDF images to `/tmp/refactoring-ui-extracted-images/` and rendered all 218 pages to `/tmp/refactoring-ui-all-pages/*.png` for temporary reference only. Expanded `design-polish/examples/refactoring-ui-gallery.html` to 45 code-native recreations: 36 compact bad/good lesson pairs covering the full chapter flow plus the original 9 larger panels. No book screenshots or extracted image assets were committed; the durable artifact is editable HTML/CSS plus the source-map note.

Follow-up same day: Kevin flagged that the 36-pair matrix looked good but was not detailed enough. Enlarged the matrix into one inspectable lesson per row and added richer UI detail (form labels, state rows, nav chrome, palettes, chart labels, upload cards, shadows, and button states) while keeping the examples code-native and uncommitted-image-free.

Second review pass: Kevin pointed out that examples like "Spacing scale" still read unclearly. Tightened the weak cards so each visual teaches the actual decision: spacing scale now shows labeled 12/14/16 vs 8/16/32 tokens, markers render as proper badges, choice buttons are labeled, and grid/type/color/depth/upload examples carry explanatory UI detail instead of anonymous bars.

Third review pass: Kevin clarified that weak cards should be improved, not removed. Reversed the pruning pass and restored the full 45-example gallery, then replaced the unclear supplemental cards with more literal mini UI compositions: profile hierarchy page, ranked account buttons, reflow-vs-scale card, product type scale, font specimen, article measure, dense link cards, aligned feature tiles, letterspacing specimen, labeled status rows, and layered flat UI.

## 2026-07-16 — Pocock/Ness wayfinder + grilling-frontend-prototyping sweep
Ticket-driven mine of https://x.com/mattpocockuk/status/2077743625639714850 (Pocock QT, fetched via fxtwitter) and the quoted @WillNessAI post. Source manifest, all read: both tweets; Will Ness's `grilling-frontend-prototyping/SKILL.md` + changeset (github.com/will-ness-ai/skills, a fork of mattpocock/skills — cloned, grepped for the wayfinder wiring); Matt Pocock's `/prototype` SKILL.md + UI.md, `/grilling`, and `/wayfinder` SKILL.md (github.com/mattpocock/skills). Density HIGH on the two ideas Pocock named; 16/16 quotes verified via `verify_quotes.py` against the fetched files. Folded: (1) the converging variant loop — in-context `?variant=` switcher, vacuum rule, 3–5 structural-difference cap + redo move, switcher/state-toggle mechanics, rounds walking the visual design tree, throwaway-branch capture — into `design-prototyping` (Tier-3 pattern 1 + new `agents-field-notes.md` section + sources); (2) plans-route-to-skills / decision-ticket maps + HITL-vs-AFK classification into `working-with-ai` (agentic-coding, orchestrator role + sources); (3) register-skills-where-work-is-created as `creating-skills` House Style rule 16 + sources. Conflict recorded, not blended: Pocock defaults 3 variants (cap 5) in the real repo; Ness runs fixed 5 in a standalone mocked app — routed as quadrant corners (small+existing vs big+blank). Skipped/parked: wayfinder's full tracker mechanics (fog of war, claiming, frontier queries, map body format) — single-source workflow doctrine, revisit if a second planning-skill source corroborates; the forked repo's remaining Pocock skills (tdd, triage, to-spec, to-tickets, domain-modeling, writing-great-skills doc) — out of this ticket's scope, candidates for a future screen.

## 2026-07-17 — Pocock/Ness fold: routing hardening + probes
Follow-up to the 2026-07-16 sweep after a self-audit flagged that the folds were body/reference-level only and the natural phrasings for Ness's loop weren't in any always-loaded routing surface. Changes: promoted the converging variant loop to Tier-3 pattern 5 in `design-prototyping` (was embedded in pattern 1); description edits — `design-prototyping` gained "exploring or converging on UI variants" + triggers "design variants, converge on a look" (447 chars), `working-with-ai` gained "planning big work as agent-sized decision tickets" (400 chars); backlinked agentic-coding's wayfinder bullet to the design-prototyping loop; README row updated to match. Routing probes (fresh descriptions-only judges): BEFORE 4/6 — "converge on a design direction" misrouted to design-craft, "plan this feature as agent-resolvable tickets" misrouted to shape-up; AFTER 6/6, controls held (AI-slop landing page → frontend-design, cycle scoping/betting → shape-up, broken AI-generated layout → working-with-ai). Two application tests with fresh repo-reading agents: the inbox design-directions task routed to design-prototyping and reproduced the full loop mechanics (in-context `?variant=` mounting, switcher behavior, design-tree rounds, throwaway-branch capture); the make-my-custom-skill-get-used task surfaced creating-skills rule 16 plus the wayfinder bullet and produced the register-at-the-planner advice.

## 2026-07-18 — Personal-growth corpus

Archived and screened Ludwin's Streamer University class, Meg Lewis's public Full Time You program plus two Adobe talks and a public article, five selected The Futur talks/interviews, and seven research/institutional sources spanning self-determination, WOOP, behavior design, life design, self-compassion, recovery, and deliberate-practice limits. Density HIGH and task shape coherent; created top-level `personal-growth`. Core method: provisional personal operating profile → multiple futures → small revealing experiment → behavior design/practice/recovery → compassionate trajectory review → persist/modify/pause/stop. Explicitly excluded paid Full Time You material, duplicated clips, therapy-adjacent advice, overwork rhetoric, four-circle ikigai, and unverified pop psychology. Source coverage, fold map, boundaries, and probes: `docs/personal-growth-source-mining-2026-07.md`.

## 2026-07-26 — Anton Sten, *Products People Actually Want*

Ticket attachment `/workspace/.prompt/initial/ppaw-ebook.zip` contained EPUB and PDF.
Extracted the EPUB to `/workspace/ppaw_epub` and normalized chapter XHTML into
`/workspace/ppaw_fulltext.txt` (about 20k words). `pdftotext`/`pdfinfo` were not
installed, so PDF extraction was skipped after confirming the EPUB contained the full
chapter text. Density HIGH, but no new top-level skill: the book is a broad product
design practice source whose durable lessons route into existing task skills.

Folded into:

- `product-decision-making`: user/business/technical fit, whole-journey product judgment, UX strategy shape, problem-before-redesign field notes.
- `user-research`: TEDW follow-up operator, stakeholder/user interview question bank, AI note-taking caveat.
- `design-systems`: meaningful systems frame, parallel product/system build, constraints, adoption over perfection, quality-audit gap.
- `design-org-influence`: business-language translation, knowns-vs-assumptions story prep, fidelity choice as influence lever, pitch reference section.
- `design-craft`: problem-first craft target selection and off-screen touchpoint care.
- `ux-writing` and `write-clear-prose`: writing-before-pixels and concept prewriting passes.
- `user-onboarding`: explain setup asks before extracting user effort; design first-use flows for anxious/distracted contexts.
- `people-management`: design management as craft shift, staying close enough to execution, energy management.
- `design-principles`: option-sprawl caution and functional/reliable/usable/pleasurable sequence.
- Follow-up fold after review: added value-exchange/product-relationship guidance to `product-decision-making` and `design-principles`; situational "design for anyone" checks to `web-design` (web-accessibility); and emotional recovery/completion/empty-state moments to `ux-writing` (error-messages) and `user-onboarding` (empty-states).

Parked/skipped: emotional relationship/value-exchange chapter as corroboration only;
named current tools such as Granola, Visual Electric, Stark, Lovable, Replit, v0, and
Cursor treated as perishable category examples; no long quotes imported.

## 2026-08-13 — Minor Adventures, "The making of Cursor's icons"

Ticket-driven mine of https://www.minoradventures.co/blog/the-making-of-cursors-icons (Marek Minor, Jul 30 2026 — one-year commission: 600+ hand-drawn icons, two sizes/two styles, replacing Cursor's inherited Codicons). Source manifest, all read: the article (raw HTML captured and text-extracted to a temp workspace file for quote verification; 37/37 quotes verified via `verify_quotes.py`); the site homepage; sitemap.xml. The ticket asked to also mine "other blog posts," but the sitemap shows this is the site's **only** blog post (4 URLs total: home, this article, privacy, terms) — nothing else to screen. Density HIGH: the library had no owner for interface icon systems (app icons → `apple-design`, brand marks → `logo-design`, SF Symbols usage → `swiftui`), and half the article is system/governance/pipeline material squarely in `design-systems`' task shape.

Folded by use:

- `design-systems`: NEW reference `references/icon-systems.md` (the primary fold — sizes as optical sizes, stroke-weight-by-eye against the product typeface, anti-grid-snapping counter-position, optical shapes/keylines, construction logic + technical-look rules, directional consistency from the brand pointer, optical adjustments, three-file consistency infrastructure with 155+ tracked elements, one-concept-one-icon governance + tag search, codepoint-stable migration + four-state dashboard, `ship it` pipeline, invisibility standard); new SKILL.md section "Icons are a system asset" + description/trigger edit (icon set, icon font) + checklist item + relationship bullets; sources entry.
- `design-craft`: craft-depth corroborations merged into Conceptual depth (156 hamburger explorations, 0.25px felt differences, true-size device review) and Uncommon care ("the inside of the machine" below-noticing standard); new field-notes section "Icon-craft depth notes (Marek Minor)"; sources entry.
- `frontend-design` (visual-execution): scoped the SVG-over-icon-fonts default with the codepoint-migration exception and a route to `design-systems` (icon-systems). Conflict recorded, not blended: greenfield web → SVG; swap-in-place over an inherited codepoint-referenced set → icon font.
- README: `design-systems` row now names product icon systems.

Skipped/parked: image-only content (45 figures — construction/keyline/optical-break visuals) described via captions only, no assets committed; Cursor file-type icon sub-project (explicitly left out of the article by the author); Minor's product sets (Amicons, Smallbits, TreatOS) — commercial products, not method sources; introtoicons.com remains [blocked] (email-gated, see 2026 entry above). Single-source caveat recorded in the reference header: the drawing doctrine is one practitioner's method; the governance layer is corroborated by the existing DS corpus (deprecation-is-a-feature, stated opinions, source-of-truth rules).

Routing probes after the description edit (two fresh descriptions-only judges, 8 probes each, 16/16): targets — "design a complete icon set," "inherited Codicons drifted, audit and unify," "duplicate icons for the same concept," "migrate our icon font without breaking the product," "SVG or icon font?" → `design-systems`; neighbors held — app icon → `apple-design`, logo/brand mark → `logo-design`; controls held — semantic tokens/theming → `design-systems` (still routes despite trimmed trigger list, which lost "semantic tokens"/"token naming" to the 450-char cap), "settings screen feels off" → `design-craft`, icon hover animation → `motion`/`design-craft` (not design-systems). All validators pass.

## 2026-09-03 — performance.dev (Brotzky) → Rails equivalents

Ticket-driven mine of https://performance.dev: the index and `feed.xml` confirmed exactly four essays (Linear 2026-05-03, Conductor 2026-06-01, ChatGPT 2026-07-02, Wealthsimple 2026-09-03), all fetched with `curl`, text-extracted locally, and read in full. Every essay reverse-engineers a React/TypeScript app, so the fold is an **equivalence map** rather than a port: each principle is quoted, each Rails mechanism was verified against primary docs (Turbo handbook Drive + Page Refreshes, turbo-rails `DriveHelper`, importmap-rails, stimulus-rails, Stimulus actions, Rails API `allow_browser`/`rate_limit`/`preload_link_tag`, Active Storage guide, Flipper optimization docs, rails/rails PR #50528). Density HIGH for `rails`, MEDIUM for `web-design`. No new skill.

Folded: NEW `rails/references/optimizing-rails/perceived-speed.md` (architecture picker from constraints; technique → Rails map; request elimination — N+1/lazy-frame-per-row/Active Storage redirect waterfalls, Flipper-in-ERB flags, cookie-rendered theme, first-party origins; boot — `allow_browser versions: :modern` + importmap, `modulepreload` default vs `preload: false` + dynamic import, `lazyLoadControllersFrom`, `preload_link_tag` font `crossorigin`; navigation — Turbo 8 hover prefetch with hover-URL == click-URL discipline, `data-turbo-preload`, cache preview as render-first/verify-later, morph + stable `dom_id` + `data-turbo-permanent`; mutations — optimistic template, `perform_later` off the critical path, prepaid checks, streaming; one-delta-one-cell targeted streams; paginate-and-cap vs virtualize rule; Stimulus key-filter shortcuts + palette; RUM `performance.mark` + `sendBeacon` and Flipper-cohort A/B of loading strategies; anonymous surfaces with `rate_limit`; the review-tells list; what not to port — sync engine, service-worker precache by default, inlined flag table). Router section + table in `optimizing-rails.md`, checklist items 69–80, `optimizing-rails/sources.md` entry, an "Instant-feel additions" section in `rails-hotwire-realtime.md`, and the `rails/SKILL.md` optimizing-rails bullet now names the second-hop members. `web-design`: Linear timing tokens/asymmetric enter-exit as corroboration in web-animation-design; constraints-first architecture rule in web-performance + sources.

Skipped/parked: sync-engine and CRDT internals (no Rails school), Conductor's Tauri/Bun/process-reclaim desktop material, ChatGPT's bot-defense internals and framework-migration history, Wealthsimple's org/AI-adoption memoir (already owned by design-craft/shape-up/working-with-ai/design-systems). Source manifest, full per-article equivalence tables, and fold map: `docs/performance-dev-source-mining-2026-09.md`.

Follow-up (same day): stable `ps-…` names on checklist items 69–80; application fixture A03 (Rails felt-speed diagnosis) + checker update; `interface-review` domain 9 → `rails` (optimizing-rails, perceived-speed); single-source caveat in `rails/references/coverage-gaps.md`; README row and agent-quickstart mention the playbook. Descriptions-only routing probe 6/6 (targets → `rails`, controls → `web-design`/`motion`), so the `rails` description was left unchanged.

## 2026-09-18 — Gustavo Fior, *Craft* (craft.gustavofior.com) — full live-page sweep

Ticket-driven, in two passes: first the "Optical Alignment" page, then (on request) every page on the site. Source manifest: the site index `/`, `/resources`, `/goats`; the companion repo `gustavo-fior/craft` tree (`content/**/*.mdx` for 34 concepts, plus an installable `skills/craft-design-engineering` skill with four references that mirror the live pages verbatim); every concept slug's Markdown mirror at `/<slug>.md` — **7 return 200 and were read in full** (optical-alignment, tabular-numbers, noise, image-outlines, nested-border-radius, html-background, hover-restraint; captured to a temp workspace dir, 26/26 quotes verified via `verify_quotes.py`), **27 return 404** and match the index's "Soon" labels; the repo README says unreleased `content/` articles are AI placeholders, so their `.mdx` was not mined. Outbound links followed: Jakub Krehel's *Details that make interfaces feel better* (fetched, read — it is the material `design-craft` polish-principles Core Principles 1–22 already encode: text-wrap, concentric radius, icon animation, font smoothing, tabular nums, interruptibility, stagger, subtle exits, optical alignment, shadows-over-borders; no delta), Apple HIG icons (owned by `apple-design`), Emil Kowalski's *You don't need animations* / *7 practical animation tips* (already the basis of `design-craft` emil-kowalski + `web-design` PRACTICAL-TIPS), CSS specs / MDN / Inter features / Wakamai Fondue / Cloud Four radius math / CSS-Tricks grainy gradients (cited where used, not mined). Density MEDIUM overall: about half of each page restates rules the library already carries from Krehel/Kowalski/Briggs; the other half is exact values, diagnostics, and failure cases worth keeping. No new skill.

Fold map (extend only):

- **Optical Alignment** → `design-craft` surfaces: blur test as a measurement method, keep-the-nudge per icon, new Shape Weight subsection (cross-ref `design-systems` icon-systems keylines); polish-principles §2. `web-design` opentype-and-micro: new §12 optical sizing (`opsz`, `font-optical-sizing: auto` default, keep the axis when subsetting, `font-variation-settings` self-override trap); §10 per-glyph negative `text-indent` fallback; web-typography §12 staleness bullet.
- **Tabular Numbers** → `design-craft` typography: proportional-in-prose vs tabular-in-slots, don't switch to monospace, verify `tnum` (Wakamai Fondue), Inter changes numeral *look* under `tnum`; polish-principles §9. `web-design` opentype-and-micro §2: `tnum` verification line.
- **Noise** → `design-craft` surfaces: NEW section Noise / Grain Overlay — `feTurbulence` recipe (fractalNoise, baseFrequency 0.8, 3 octaves, saturate 0, ~8% `overlay`), `isolation: isolate` as non-optional, `baseFrequency` = grain size, live-filter-on-small-surfaces vs 200px tiled SVG data-URI on large/moving surfaces, 2× PNG if seams; polish-principles §19 pointer + two Common Mistakes rows. (Corroborates Hampton's grain-hides-banding line and Hollick's chapter, which had the *why* but no recipe.)
- **Image Outlines** → `design-craft` surfaces: 5–20% strength band with the "every image suddenly has a shape" test, avatars first, paint-over-not-around; polish-principles §11.
- **Nested Border Radius** → `design-craft` surfaces: inset = padding **+ border width**, reverse formula with `max(0px, …)` clamp, worked card/menu values, when to tune by eye (inset varies, inner element doesn't reach the corner, mixed corner shapes).
- **HTML Background** → `design-craft` surfaces: NEW section Document Canvas Background — paint `html` (not just body/wrapper) with the app's background token, per-theme, `theme-color` sync (route to `web-design` apple-installed-web-apps for standalone specifics), `overscroll-behavior: none` as a separate, cautious decision; Common Mistakes row.
- **Hover Restraint** → `web-design` PRACTICAL-TIPS Hover States: scoped rule — the course's 100–150ms applies to a single hovered control, sweep-through highlights (nav/menu/list rows) get *no* transition; tooltip first-delay 400–700ms then instant neighbors. `design-craft` emil-kowalski decision framework: corroboration quotes (frequency and intent, not input device; 250ms slide = speeding ticket; macOS app switcher). Not a conflict: same principle, two scopes; recorded as scoped rather than blended.
- Sources: `design-craft` sources.md (full per-page entry), `web-design` web-typography sources, web-animation-design sources.

Source inconsistency recorded, not imported: the optical-alignment prose says "The play icon moves left," but its own Usage code moves it right (`translate-x-px` / `transform: translateX(1px)`), and the stated reason (a right-pointing triangle's mass sits left) implies a rightward nudge. The library's existing rule (nudge right, centroid over box) stands; the code corroborates it.

Parked / rechecks: the 27 unpublished pages — notably the Sound section (`interface-sfx`, `layering-sounds`) and Data section (`living-charts`, `curve-smoothing`) have no owner in this library yet (data-viz owns charts, but not chart motion), and Craft-section essays (`performance-is-design`, `novelty-budget`, `taste-is-trained`, `timelessness`) would route to `design-craft`/`design-principles`; recheck the `/<slug>.md` mirrors when they publish. The companion skill is not worth a separate external-skill intake — its references are the live pages. The `/resources` page is a link list (Vayo vaults, Devouring Details, Invisible Details, icon libraries, `@web-kits/audio`, Cuelume) — the two sound libraries are leads if an interface-sound owner is ever created.

## 2026-09-18 — Jakub Krehel, *Interfaces* Cheat Sheet (interfaces.dev/cheat-sheet)

Ticket-driven from https://x.com/jakubkrehel/status/2100605819238621632 (fetched via `x-post-reader` → VxTwitter/FxTwitter; the post is an announcement that every item now has a live example, no quote/reply context). Source manifest: the cheat-sheet page (fetched with `curl`; no `.md` mirror at `/cheat-sheet.md` — the markdown is embedded in the RSC payload and was extracted to a temp workspace file), `interfaces.dev/index.md` (site index: 18 paywalled issues, issue 9 = "Details that make interfaces feel better", already mined via the Craft sweep the same day; agent skills are a subscriber perk, distinct from the public `jakubkrehel/skills` repo mined 2026-07-24). 61 rules read in full and matched rule-by-rule against the library with a keyword grep matrix plus context checks. Density MEDIUM: UI 6/6, Animation 10/12, Typography 6/10, Colors 2/8, Accessibility 9/15, Layout 1/2, Writing 5/8 already covered; 22 deltas, all one-liners, concentrated in the sections the July mining marked low-density. No new skill. Quotes verified against the page text with `verify_quotes.py`.

Fold map (extend only):

- `design-craft` animations: NEW Exit-Only for Frequent Menus (under Exit Animations), NEW No Transitions on Theme Switch (H2 + Contents); performance: 1–2px jitter / Safari iOS as the `will-change: transform` trigger; polish-principles §6, §13, §15, §16 (decorative layers `pointer-events: none`) + four Common Mistakes rows; sources entry.
- `web-design` oklch-skill: NEW Token discipline subsection (palette steps have uses, semantic over primitive, purpose naming, accent vs primary, contrast vs immediate background, dark mode as its own palette, one theme-switch mechanism, gradient interpolation space) + five Common Mistakes rows; the existing "reverse the L mapping" row is re-labeled a derivation start, not a shipping rule — recorded as two schools, not blended.
- `web-design` web-typography → opentype-and-micro: NEW §13 (text-transform for display casing, `text-underline-position: from-font` + `skip-ink`, `overflow-wrap`/`nowrap`, truncation must keep full text reachable) + Contents.
- `web-design` web-accessibility §4: `:focus-visible` not `:focus`, icon-only `aria-label`, never `aria-hidden` on focusable, 44/40 product targets labeled as product rule, targets never overlap; §6: `role="status"`/`role="alert"` beside `aria-live`, the submit-error chain (enabled submit → `aria-invalid` → `aria-describedby` → focus first invalid); checklist ×2.
- `web-design` form-design §2: visible `<label>` + matching `type`/`inputmode`, never block paste; §4 enable-and-validate now points at the ARIA chain; checklist.
- `web-design` web-layout-design: `scroll-margin-top` for anchor targets under sticky chrome.
- `ux-writing` ui-voice-and-tone: one advance label per flow (PACE → Anticipate), toggles labeled by on state, "you" not "the user", descriptive link text (Keep it useful); checklist ×2; sources entry.

Already covered, not re-folded: concentric radius, optical alignment, icon-side padding, layered shadows, image outlines, icon stroke weight, `transform-origin` from trigger, subtle/blurred exits, `transition: all`, press scale, icon-swap values, transitions vs keyframes, stagger, no page-load animation, instant hover, WOFF2, tabular nums, measure (Rutter's 45–75 stands beside Krehel's 60–75), `text-wrap`, font smoothing, smart punctuation, native elements, positive `tabindex`, alt text, 24px target floor, `@media (hover: hover)`, reduced motion, color-alone, skip link, 2× group spacing, button verbs, confirmation labels, sentence case, empty states.

Skipped: the page's pricing/subscribe section and paywalled issues. Formatting note: the page's one-sentence rule + bolded decision phrase + Not recommended/Recommended live pair + "show margin/padding/values" overlay is already mirrored by the library's Before/After and Common Mistakes tables; no restructuring.

## 2026-11-05 — Apple Developer iOS freshness pass (iPhone Duo, Siri AI / App Intents)

Ticket-driven sweep of the Apple Developer YouTube videos and streams plus developer.apple.com. Full manifest: `docs/apple-developer-ios-source-mining-2026-11.md`.

- New `apple-design` iphone-duo-design (+ sources), from the HIG page, the Technology Overview and tech talks 111461–111466.
- New `swiftui` swiftui-iphone-duo, covering SwiftUI implementation and the AVFoundation/AVKit camera-direction changes.
- `uikit` uikit-ios27-sdk: the iOS 27.1 section was verified and extended, and the Objective-C table corrected.
- `apple-design` app-intents-design: new second-hop `siri-ai-ios27.md` from WWDC26 240/343/344/345/295/310, plus inline iOS 27 corrections.
- Parked: the Group Lab livestreams (no transcripts), the macOS touch and Live Activities talks, security and App Store Connect talks, and the Sept "Meet with Apple" SwiftUI series.

## 2026-11-09 — Impeccable (impeccable.style, pbakaus/impeccable)

Ticket-driven intake of Paul Bakaus's Impeccable design skill (Apache-2.0, `b3ced85`) and its site (Designing, Docs, Slop, Research). Full manifest, fold map, conflicts, and parked items: `docs/impeccable-source-mining-2026-11.md`. Density HIGH for craft-floor, new-work/modes, critique, the refinement commands, the 62-rule detector registry, and the research note; LOW for clarify, onboard, adapt, optimize, and the native digests. No new skill. New references: `frontend-design` (surface-modes, anti-slop-catalog), `interface-review` (critique-scoring), `design-craft` (refinement-moves). Extended: `working-with-ai` (ai-ui-direction), `creating-skills` (measuring-skill-effect), `design-systems`, `design-prototyping`, `web-design` (web-typography, web-layout-design), `user-onboarding` (empty-states). No descriptions changed.

## 2026-11-10 — Emil Kowalski open skills (aiforui.dev/skills, emilkowalski/skills)

Ticket-driven intake of the 18-skill repository behind aiforui.dev (MIT, `715c180`). Full manifest, fold map, conflicts, and parked items: `docs/emilkowalski-skills-source-mining-2026-11.md`. Deltas only, since the animations.dev course and `emil-design-eng` were already folded. Density HIGH for choreograph, animation-performance, animation-vocabulary, remove-animations, gestures, mobile-native, break-ui; MEDIUM for review-animations, improve-animations, find-animation-opportunities, prototype, pick-ui-library, ask-sonner, apple-design; LOW for animate and emil-design-eng (already local). No new skill. New references: `web-design` (web-animation-design members choreography, animation-performance, animation-vocabulary, gestures, motion-audit; mobile-web-native-feel), `design-craft` (worst-case-data), `frontend-design` (ui-library-picks). Extended: web-animation-design parent and PRACTICAL-TIPS, web-performance, web-accessibility, `design-craft` (emil-kowalski, surfaces, refinement-moves), `design-prototyping` (methods), `swiftui` (touch-interaction-design), `interface-review`. Corrected a stale local claim (Motion shorthands are hardware accelerated from 14.2; changelog-verified). Parked: `animate-expo` (no React Native cluster), `write-swift` (not on the site; Xcode first-party skills outrank). Follow-up the next day: QA accessibility corrections, a line-by-line review of the new references, a `design-craft` trigger for worst-case data, dated Motion 14.2 notes in the `motion` kit, and a scripted probe fixture (`docs/web-motion-routing-probes-2026-11.md`, 18/18 with a fresh judge). Do not rescreen at this revision.

## 2026-11-11 — Kosta, *Tactile design* (kosta.fyi/skills/tactile-design, kosta4a/tactile-design)

Ticket-driven intake of Kosta's tactile-design agent skill (MIT, `30495a2`) and its landing page. Full manifest, fold map, conflicts and parked items: `docs/tactile-design-source-mining-2026-11.md`.

- **Density:** HIGH for SKILL.md, decisions, tokens, controls and surfaces; HIGH but overlapping with existing Emil Kowalski material for motion and mobile; MEDIUM for the landing page demos.
- **New skills:** none.
- **New in `design-craft`:** reference `tactile-design.md` (a third alternate theme) with second hop `tactile-design/` (tokens-and-surfaces, controls, layout-and-data, motion-values, phone).
- **Extended:** `design-craft` (SKILL.md, polish-principles, surfaces, emil-kowalski, sources, coverage-gaps), `web-design` (form-design), `data-viz` (editorial-interaction), `design-systems` (field-notes, plus a pointer in SKILL.md), `web-design` (web-animation-design: Tailwind v4 traps), `working-with-ai` (ai-ui-direction: applying review notes), `interface-review` (review against a committed theme).
- **Conflicts:** recorded as scoped schools (dark-mode lit edges, press scale, button colour, disabled buttons and error placement, type weight).
- **Descriptions:** `design-craft` gained plain triggers on 2026-11-12, verified by blind routing probes V16–V18.

## 2026-11-14 — design.how skills (arla6ka/design.how, Arlan Marat)

Ticket-driven intake of the seven skills under `skills/` (MIT, `148b94c`). Full manifest, fold map, conflicts and parked items: `docs/design-how-source-mining-2026-11.md`.

- **Density:** HIGH for build-design-system, migrate-design-system, token-mapping, component-docs and the boss router; HIGH but overlapping for ui-review and the trap list; make-font is high but bound to unreviewed scripts.
- **New skills:** `make-font` (cross-domain tool; twelve upstream scripts vendored after a security read, then changed in every file after five QA passes and a line-by-line hardening pass on 2026-11-18: it is a maintained fork, see `make-font/references/sources.md`). The design-system suite added no skill; its router became a table in `design-systems` SKILL.md.
- **New references:** `design-systems` (system-from-shipped-ui, token-mapping, component-docs, migration); `interface-review` (behaviour-traps).
- **Extended:** `design-systems` (SKILL.md, sources, coverage-gaps), `interface-review` (SKILL.md, sources, coverage-gaps), `working-with-ai` (agentic-coding: running many agents on one repo, correction pass), `creating-skills` (measuring-skill-effect: suite hygiene), `web-design` (web-typography → choosing-and-pairing: fitting an open-licence base).
- **Descriptions:** `design-systems` changed and `make-font` is new; blind routing probes V19–V24 pass.
- **Not read:** the ten design-system scripts, `systems/` (four design systems) and `vault/` (visual effects). None of those vendored.
- **Parked:** the design-system scripts, `systems/` and `vault/` as future candidates, the no-persona reviewer panel, and the single-source numbers.

## 2026-11-17 — Luke Wroblewski, "why designers still have jobs." (X 2122727731389685951)

Ticket-driven fold: instruct agents that less is more, starting with no supporting copy and then adding a little.

- **Manifest:** the post (text plus one image, read) and the post it quotes, X 2122490348337565697, "remove the 75% of this UI that's agent slop." (read). Fetched through `api.vxtwitter.com` and `api.fxtwitter.com`; the image was downloaded from `pbs.twimg.com` and read directly. Replies (46 and 6) were not read: the public JSON endpoints do not return them. lukew.com was not searched for a longer write-up.
- **Density:** HIGH for one lesson, thin as evidence. The image compares one Share Workspace sheet: generated (39 supporting words in three blocks, three actions, a button icon, a stale "Copied" label) against a designer's (11 words in one caption, two actions). Counts are ours.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Owner:** `frontend-design` (anti-slop-catalog), new section "Copy budget" with rule `copy-budget`: zero supporting copy first, labels before sentences, one admitted line per small surface, the cover test, a cut list, and exceptions (copy-as-content surfaces, high-stakes moments, empty states, accessible names, user-supplied copy). Three rows added to the type and copy tells. `frontend-design/SKILL.md` gained build-contract step 4 and a verification bullet; surface-modes gained an Operate copy bullet.
- **Extended:** `working-with-ai` (ai-ui-direction: the over-explained-surfaces failure mode, the subtract-then-re-admit prompt, a checklist line), `design-craft` (refinement-moves: Distill copy bullet), `ux-writing` (ui-voice-and-tone: "ask whether the line should exist" ahead of the Simplify edits, a checklist line), plus each skill's sources file.
- **Synthesis flagged as ours:** the staged procedure, the one-line budget, the exceptions, and the reason models over-explain. Wroblewski supplied the exhibit and the 75% prompt only.
- **Parked:** single source. Recorded in `frontend-design/references/coverage-gaps.md` with what would promote it: a with/without comparison on the same briefs, a second source, and a container word-count detector. No eval case was added.

## 2026-11-18 — Interfere: Landmines lint rules and agent plugin (X 2122782710414336458)

Ticket-driven fold: fold in Interfere's skills as needed. Full manifest and fold map: `docs/interfere-source-mining-2026-11.md`.

- **Manifest:** Luke Shiels's announcement post (text read; attached video and replies not read), `interfere-inc/landmines` at `92084b1` (README, config, rule messages, allowlist logic), `interfere-inc/plugins` at `f3c066f` (both skills and READMEs), `interfere-inc/docs` AGENTS.md. Other org repos were scanned by filename and skipped.
- **Density:** HIGH for Landmines, MEDIUM for the plugin, LOW for the docs AGENTS.md.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Extended:** `working-with-ai` (agentic-coding: new "Lint the evasions" section, constraint-stack item 4, the merge-without-human-read rule, a checklist line; router bullet; sources; coverage gaps) and `devtools` (devtool-interface-design: vendor agent plugin worked example in the AX file, AX summary bullet, a checklist line; sources; coverage gaps).
- **Skipped:** vendoring the two Interfere skills (bound to their MCP server), the house-style lint rules, any fold into `rails` testing references (Vitest-specific), `superconductor` (rule already present).
- **Parked:** both folds are single-vendor. Promotion conditions are in each skill's coverage-gaps file. `dmmulroy/anti-slop`, linked from the Landmines README, was not read.
- **Second pass (same day):** read `dmmulroy/anti-slop` at `13909c9` and the rejected/allowed case lists in Landmines' `no-test-doubles.test.ts`. Added a type-silencing row, three design moves (chase aliases, define the allowed side, own the rules), and the comment-policy disagreement to the agentic-coding section. The section's core now has two independent sources.
- **Third pass (same day, user asked for more from Interfere):** read the CLI, MCP, and AI Agents docs pages and the CLI's `skill_emitter.rs`. Extended the devtools AX worked example (read-only endpoint, machine CLI surface, spec-generated skills, limits with remedies) and constraint-stack item 6 in agentic-coding (vocabulary mapping in AGENTS.md).

## 2026-11-18 — Pratik (@maybepratikk), menu hover dead zones (X 2122963896042713492)

Ticket-driven question: where should small UI implementation details like this live?

- **Manifest:** the post text (read, via `api.fxtwitter.com` and `cdn.syndication.twimg.com`) and its 12.4s video (the 1440×1080 MP4 from `video.twimg.com`, sampled with ffmpeg at 2 fps into a contact sheet plus two full-size crops, read). The video toggles one context menu between "Margin" (hatched bands labelled "4px dead zone", "Nothing hovered") and "Inset" ("No dead zone", "Copy link hovered"). Replies (4) were not read: the public JSON endpoints do not return them.
- **Density:** HIGH for one lesson. Single source, but the claim is DOM hit-testing behaviour that anyone can reproduce, so it was folded as a rule and not parked.
- **Placement answer:** a detail like this goes in the reference that owns its *mechanism*, as a subsection beside its nearest existing rule, with one-line pointers from the places an agent would be reading when the symptom or the component comes up. Here the mechanism is hit-area geometry, so the owner is `design-craft` (surfaces) → Minimum Hit Area, next to the collision rule it mirrors (never overlap, never gap). It is not a new skill, a new reference, or a SKILL.md body line.
- **Owner:** `design-craft` (surfaces), new subsection "Contiguous Rows: No Dead Zones" with bad/good CSS, a Tailwind line, the padded-wrapper variant, focus-ring placement, a `background-clip` alternative, a check, and where a gap is correct.
- **Pointers:** `design-craft` polish-principles (#16, common-mistakes row, checklist line), linear-product-craft (Interaction Details), tactile-design/controls (menu items and choice rows say "2px apart"; reconciled as a gap between fills, not hit boxes), and `web-design` (web-animation-design PRACTICAL-TIPS → Fix Hover Flicker, which covers a different cause).
- **Synthesis flagged as ours:** the padding variant, the focus-ring note, the `background-clip` alternative, the DevTools check, and the exceptions. The source supplied the diagnosis and `::before { inset: 2px 0 }`.
- **New skills:** none. No descriptions changed, so no routing probes were run.

### Follow-up the same day — Kevin Dukkon (@keviduk), kevdu.co/reads

A second snippet on the same ticket (X 2117975138541146303), then the author's site at the user's request.

- **Manifest:**
  - X post: text (read, via `api.fxtwitter.com`), 15.2s video (1440×1080 MP4, sampled with ffmpeg at 1.6 fps into a contact sheet, read), one still (read). Replies (8) not read.
  - https://www.kevdu.co/reads/sizing-dropdown-menus (4 Nov 2026): fetched with curl, text extracted from the HTML, read in full. Interactive demos were not run; their captions were read.
  - https://www.kevdu.co/reads/tooltip-delay (6 Nov 2026): same method, read in full.
  - https://www.kevdu.co/reads index: read. *Spacing navigation* and *Designing interface icons* are "Coming soon".
  - The articles' cited sources (APG, WCAG, NN/g, HIG, Fluent 2, Material, Primer, shadcn/ui, Radix, Base UI, MUI, React Aria, Microsoft Learn) were not re-read; the two comparison tables are recorded as Dukkon's readings.
- **Density:** HIGH for both articles: each gives one measured default, its bounds, the reason, a comparison across design systems, and code.
- **Owner:** new reference `design-craft` (component-details), organized by component: Dropdown menus (width, rows, keyboard, system table) and Tooltips (timing, when not to wait, closing, content, system table). The dropdown-width rule was first folded into `web-design` (web-layout-design) from the post alone; once the article supplied rows, keys and a second component, it moved here and web-layout-design keeps a one-paragraph pointer.
- **Placement rule, refined:** a rule about one mechanism that applies to many components stays with the mechanism (the dead-zone rule stays in surfaces → Minimum Hit Area). A complete, measured answer for one component goes in component-details, which points to the mechanism rules it depends on.
- **Registered in:** `design-craft/SKILL.md` reference table and the polish-principles quick-reference table. Pointers from surfaces (Contiguous Rows), worst-case-data (failure table), tactile-design controls and tokens-and-surfaces, emil-kowalski/css-techniques (Tooltips), and `web-design` (web-layout-design; web-animation-design PRACTICAL-TIPS).
- **Conflicts, kept as scoped schools:** first-tooltip delay is 400ms here, 400–700ms in Emil Kowalski's notes (compatible), and zero for icon-only names in the tactile theme (theme wins inside that theme). Menu row height is 32px here and 36px in the tactile theme.
- **Synthesis flagged as ours:** `min-width: 0` on the label, trailing columns, the trigger-width floor for selects, the viewport cap.
- **New skills:** none. The `design-craft` description was not changed, so no routing probes were run.
- **Recheck:** kevdu.co/reads for the two unpublished reads.

## 2026-11-18 — Kevin Dukkon, *How to design empty states* (kevdu.co/reads/empty-states)

Ticket-driven: "We already have empty state design in our skills right? This one specifically too?" Answer: yes. `user-onboarding` (empty-states) held Hulick's first-run method plus Impeccable's five-cause table. It did not have this read, which was published 2026-11-18 (the same day as the earlier kevdu.co entry above, but after it).

- **Manifest:** the article, fetched with curl and text extracted from the HTML, read in full. The six interactive demos (seven styles, before/after, page/card/inline, missing/zero, done/no access, no results/hidden by filter) are drawn client-side. The first pass read only their captions, and the user flagged the missing visual examples. Second pass: every tab of each demo was rendered with headless Chromium (Playwright), screenshotted and inspected. The DOM and CSS were read for each style's size, construction, colour tokens and motion. Screenshots were kept out of the repo. The reads index was rechecked: *Spacing navigation* and *Designing interface icons* are still "Coming soon". The cited sources (NN/g, Primer, PatternFly, SAP Fiori, GitLab Pajamas, Atlassian, Carbon, Datawrapper, Grafana) were not re-read; the size table is recorded as Dukkon's reading.
- **Density:** HIGH. The library had causes and first-run copy but nothing on the component: visual style consistency, container sizes, keeping the frame, one action or none, loading/error sequencing, missing vs zero on charts.
- **Fold map (extend only, by use):**
  - Component → `design-craft` (component-details), new "Empty states" section: seven styles table and one-style rule, keep the visual small, page/card/inline sizes with the design-system table, keep the frame, missing is not zero, one action or none, no results and hidden by filter, loading and failure are not empty. Registered in the `design-craft` SKILL.md reference row and the polish-principles quick-reference row.
  - Causes and copy → `user-onboarding` (empty-states): "Write it short" section; the cause table gains "All done" and "No data in range" rows, an example title → action column, and a note that loading is not a cause.
  - Charts → `data-viz` (editorial-interaction → Product Dashboard Conventions): one "Missing is not zero" bullet.
  - Pointers: `design-craft` refactoring-ui (empty-state bullet) and worst-case-data (Related).
  - Visual examples → `design-craft` (component-details → What each style looks like): an anatomy table with measured sizes, shared type/spacing, the one-accent rule, "swap the glyph, not the style", and motion. Plus a code-native gallery, `design-craft/examples/empty-states-gallery.html`: the seven styles, Preview reused across five causes, page/card/inline sizes via a container query, missing vs zero, and before/after. It is original markup and drawings built from the measurements, following the Refactoring UI gallery precedent (no source screenshots or code committed).
- **Conflicts, kept as scoped schools:** Hulick's long benefit copy against Dukkon's five-word title and one sentence. Hulick applies to first-use full pages, Dukkon everywhere else. Both rule out blame and "No data". Refactoring UI's "add a clear illustration" is narrowed to first-use full pages. Its "hide dead supporting controls" is reconciled with "keep the frame": keep the structure that says where you are, and hide controls that have nothing to act on. "Don't use dummy data" is reconciled with Dukkon's Preview style: a faint shape is fine, believable fake content is not. On what to show while loading, polish-principles §17 (preload, then a matching skeleton) stays the owner.
- **Synthesis flagged as ours:** preferring a check or arrow badge mark over a "0" count, the container-query implementation, the explicit `loading | error | empty | ready` status in place of `items.length === 0`, and the keep-frame/hide-controls reconciliation.
- **Apple follow-up (same ticket):** asked whether the Apple skills cover empty states and whether they link to the general rules. They did cover it, but in separate pieces with no links to the general rules: `apple-design` (apple-search-design: no-results view, echo the query, from a talk), `uikit` (uikit-lists: `UIContentUnavailableConfiguration` `.loading()`/`.empty()`/`.search()`), `swiftui` (swiftui-lazy-stacks: `ContentUnavailableView` higher up), and a Liquid Glass case study (empty-state delight). No HIG page exists, but **Writing** has the guideline "Provide clear next steps on any blank screens", including "don't show crucial information that could then disappear". A QA pass found it after the first sweep missed it. It is now cited in component-details (On Apple platforms), user-onboarding (empty-states) and apple-design coverage-gaps. Checked via the Markdown endpoint: writing, loading, onboarding, lists-and-tables, collections, searching, launching, charts. The `ContentUnavailableView` and `UIContentUnavailableConfiguration` API docs were fetched to confirm availability (iOS 17+) and the built-ins. Fold: a new "On Apple platforms" subsection in `design-craft` (component-details → Empty states). It explicitly composes the generic rules with the system component, which is allowed under the platform-separation rule because the subsection is scoped to Apple. Also one-line pointers back from apple-search-design (Relationship), uikit-lists (Empty and loading states, plus a guard against `.empty()` before the first load), swiftui-lazy-stacks and `user-onboarding` (empty-states), and a "no HIG page" note in `apple-design` coverage-gaps. Synthesis flagged as ours: the flash trap in Apple's own `.search` sample, and the long-query rule for search titles (the quoted query is exempt from the five-word cap; truncate it or move it to the line).
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Recheck:** kevdu.co/reads for *Spacing navigation* and *Designing interface icons*.

## 2026-11-18 — Gustavo Fior, *Craft* (craft.gustavofior.com) — delta sweep, four new pages

Ticket-driven: "maybe useful to add to our existing craft skill?" The site was already folded on 2026-09-18 (entry above), so this pass covers only what changed.

- **Manifest:** site index `/` (read; 11 concept links live, 23 marked "Soon"), `/goats` and `/resources` (re-read, link lists only), repo `gustavo-fior/craft` cloned at `586e23b` (2026-10-14): `content/**/*.mdx` for the 11 live concepts read in full, the companion `skills/craft-design-engineering/SKILL.md` read, its four generated references not read separately because the build script generates them from the same `.mdx`. The 23 unreleased `.mdx` files were not mined: the index says "the articles in the repo that are not out yet are AI placeholders." The repo's own `AGENTS.md` / `CLAUDE.md` were not followed. Outbound links were not re-fetched, except shadcn/ui's scroll-fade page, which is client-rendered and yielded no text.
- **Delta:** four pages published 2026-10-14: Button Press, Interruptibility, Font Smoothing, Scroll Fades. The seven earlier pages were spot-checked: six quotes the library already carries still verify against the current `.mdx`. All 24 new quotes verified with `verify_quotes.py`.
- **Density:** MEDIUM. Interruptibility and Button Press mostly restate Krehel and Kowalski rules the library holds, with better mental models and a few failure cases. Scroll Fades is new to the library. Font Smoothing argues the opposite default from ours.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Fold map (extend only):**
  - **Button Press** → `design-craft` animations, Scale on Press: second source for the `0.97`–`0.98` restrained alternate (house `0.96` unchanged), new Tuning and Platform Details subsection (invisible-feedback test, 100–150ms, larger surfaces shrink less, disabled does not press, iOS tap highlight and `:active` listener, reduced motion); the existing CSS and Tailwind examples now guard `:disabled`; polish-principles §12, one Common Mistakes row, checklist.
  - **Interruptibility** → `design-craft` animations, Interruptible Animations: four subsections (A Recording vs. a Destination, Never Gate Input on an Animation, Transition or Spring, When Siblings Join); polish-principles §4, two Common Mistakes rows, checklist. Agrees with `web-design` gestures' release-behaviour table; cross-referenced, not duplicated.
  - **Font Smoothing** → `design-craft` typography: attached to the existing root-application school note (dark mode as trigger, thin-weight risk at 300 and below, `subpixel-antialiased` opt-out, Firefox 128), plus a Platform scope and review subsection (macOS only; a Windows or Linux screenshot proves nothing); polish-principles §8.
  - **Scroll Fades** → `design-craft` surfaces: NEW section (mask not overlay, fade only the scrollable edge, compact `@property` + scroll-timeline recipe with its traps, horizontal rows; the source's always-on `@supports not` fallback was deliberately not imported after QA showed it fading non-overflowing lists, so unsupported browsers get no fade); `design-craft/SKILL.md` and polish-principles routing rows; worst-case-data fix-table link; one bullet in `web-design` (web-layout-design → Discoverable overflow).
- **Conflicts, kept as scoped schools:** (1) Fior applies `antialiased` on `body`; the library's default stays scoped to light-on-dark and display type. (2) Fior hides the scrollbar on horizontal chip rows; `web-design` requires overflow to stay operable, so the fold limits that to short rows that still scroll by keyboard and touch.
- **Source defects noted, not imported:** in `interruptibility.mdx` and `font-smoothing.mdx` some CSS comments are mangled to `/_ … _/`; the scroll-fades page says a visible scrollbar can be saved by masking an inner wrapper, which would move the fade with the content.
- **Verification:** the scroll-fade and press CSS were run in Chromium and Firefox during QA. Still unverified: the inner-wrapper scrollbar variant, the single-source iOS `:active` listener claim, and font smoothing on a Mac. These are in `design-craft/references/coverage-gaps.md`.
- **Parked:** the 23 "Soon" concepts (OKLCH, shadows-not-borders, hit areas, clip-path, squircles, easings, stagger, exits, sound, charts and the five craft essays). Re-check the index; fold each when its page goes live.

## 2026-11-18 — Dmytro, "4 css rules that make safari 35x faster" (X 2122725141285364024)

Ticket-driven fold: keep the Base UI Scroll Area Safari workaround in the skills until it is fixed upstream.

- **Manifest:** the X article 2122725135098814464 (text and six images read through `api.fxtwitter.com` and `pbs.twimg.com`; the embedded video was not watched), the linked agent prompt gist `pqoqubbw/a5d168f571d0283269f2987a7de3728f` (read), Base UI `ScrollAreaViewport.tsx` on `master` (read, confirms the `platform.engine.webkit` skip), the Base UI Scroll Area docs page (read). WebKit bug 325900: title and status read (NEW, "Explicit `inherit` of a non-inherited registered custom property resolves to a stale or sibling value"); comments not read. The four replies were not read.
- **Density:** HIGH for one narrow workaround.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Owner:** `web-design` (web-performance), new section "Custom properties written per frame" holding the general rule and the dated Base UI workaround, plus a checklist line and a Contents block. The older Vaul line in Planning rules now points to it.
- **Extended:** `web-design` (web-animation-design/animation-performance: one symptom row; sources; coverage gaps) and `frontend-design` (ui-library-picks: a Base UI trap pointer; sources).
- **Synthesis flagged as ours:** the general per-frame rule (already supported locally by the Vaul bug and Motion's tier list) and the note that the registered property kills the docs' SSR `var()` fallback before hydration. The second follows from the gist's step 5 and the docs, and was not tested.
- **Not done:** no Safari test here. The 106 ms and 3 ms figures are the author's.
- **Removal:** conditions are in `web-design/references/coverage-gaps.md`. `motion/performance-audit` already teaches `inherits: false` and was left alone (vendored).
- **Second pass (same day, user asked what else Base UI teaches):** read the Base UI docs at 1.9.0 through `llms.txt`: quick start, accessibility, community, six handbook pages, 37 component and 4 utility pages (prose and usage guidelines; demo code and API tables scanned by keyword), and release notes 1.0.0 to 1.9.0 for breaking changes. shadcn's changelog was checked for the Base UI default.
  - **Folded:** `frontend-design` (ui-library-picks: the Scroll Area note became four "Base UI traps" tables covering setup, part choice, composition, and open/close animation; shadcn note corrected; `llms.txt` in Look it up; sources; coverage gaps), `motion` (best-practices/base-ui: one dated library note, vendored text untouched), `web-design` (web-accessibility §4: hover-revealed popups and loading-button focus, plus a checklist line; mobile-web-native-feel: iOS 26 backdrop row; sources; coverage gaps).
  - **Conflict recorded:** the vendored Motion kit says any of `opacity`, `transform`, `filter`, `clipPath` keeps a Base UI popup mounted; Base UI's handbook says Motion animations are detected when they include `opacity`. The note follows Base UI.
  - **Skipped (docs cover it, link out):** styling hooks, TypeScript namespaces, the forms API, per-component props, CSS variables and data attributes. Release notes held three breaking changes after 1.0 (Drawer and OTP Field leaving preview, `sanitizeValue` renamed `normalizeValue`); none earned a row.
  - **Not done:** nothing was run in a project or on a device. The iOS 26 backdrop fix is Base UI's guidance only.
- **Review corrections (same day):** retirement is now tied to the installed Base UI version registering the properties in WebKit, not to the WebKit bug closing; the `var()` fallback claim is limited to registrations with an initial value; the hydration row notes that Base UI's published mask is `none` before hydration either way; the tooltip `aria-label` rule is scoped to triggers without an accessible name (WCAG 2.5.3); the CSP row says `disableStyleElements` needs the scrollbar-hiding rules supplied externally; shadcn's Base UI default is dated July 2026. A review fixture in Playwright WebKit reproduced the workaround's behavior on Base UI 1.9.0; Safari frame timing and the iOS 26 backdrop remain unverified.

## 2026-11-18 — Pasquale Vitiello, *Plotter* (plotter.pasqualevitiello.com)

Ticket-driven: "Lets add these cool skills … probably should fold them into empty state design or something!" Plotter is one installable skill (drawing and animation workflows behind one entry point), not several. It was folded as source material under the External Skill Intake rules, not vendored.

- **Manifest:** site home page (fetched, summary only; the catalogue, grammar and docs pages were read from the repo instead, which holds their sources). Repo `pasqualevitiello/plotter` cloned at `01df092` (2026-11-15), MIT. Read in full: `skills/plotter/SKILL.md`, `README.md`, `NOTICE.md`, and references `direction`, `visual-grammar`, `drawing`, `drafting-standard`, `motion`, `motion-examples`, `approved-references`; `scripts/check.py`; `evals/README.md` and the brief texts; repo `README.md` (first half), `AGENTS.md`, `ATTRIBUTION.md`; site docs `drawing.md` and `customization.md`. Read in part: `catalogue/index.md` (header, Geometry, Empty states rows), `standards-background.md`, `verification-prompt.md` (steps 1–3), `content-state-studies.tsx` and `blueprint-drawing.tsx` (how the site builds compact versions). Rendered and looked at: catalogue drawings EMP-06 and EMP-08 (cairosvg, so without Cal Sans). Not read: `foundation.md` and the helper modules, `export-svg.py`, `render.py`, `build-standard.py`, site docs `animation.md` and `installation.md`, the three HTML motion examples (not played), the other ~100 catalogue SVGs, the website components, and the eval attachment `upload-card.svg`. The repo's own `AGENTS.md` was read as a source and not followed.
- **Density:** HIGH for one narrow task shape (explanatory line illustration). The library had seven empty-state styles and nothing on how to draw the Illustration one.
- **Why not a new top-level skill or a vendored copy:** single source, and the package is 1.4 MB of drawings, scripts and a font. The reference carries the decisions and tells agents how to install the upstream package when they need its catalogue and checker. Revisit if the user wants `/plotter` available from this repo; the `motion` kit is the vendoring precedent.
- **Fold map (by use):**
  - Method → `design-craft` (construction-drawings), NEW reference: three deciding rules, numbers table, marks table, workflow, compact-version derivation, empty-state cause → relationship table, faults, animation, upstream install pointer, scoped conflicts. Registered in the `design-craft` SKILL.md reference table and README row.
  - Empty states → `design-craft` (component-details): pointer in the seven-styles table and a "draw the cause, not the icon" paragraph. `user-onboarding` (empty-states): one pointer under the cause table.
  - Example → `design-craft/examples/construction-drawing-empty-state.html`: one original drawing (no data in range), full and compact, placed in the page and card sizes, plus a don't. Generated from named parameters; no upstream drawing or code is included.
  - Skill authoring → `creating-skills` (measuring-skill-effect → Cold-run briefs for a visual skill): clean-install runs outside the checkout, brief groups, the counter-case brief, planted-fault critique, faults-from-real-output list, one numeric source generating prose tables, script only what a render cannot show.
  - Pointers: `frontend-design` (anti-slop-catalog, illustration row) and `web-design` (web-animation-design/choreography → Reduced motion).
- **Conflicts, kept as scoped schools:** Plotter's no-pictogram rule against Dukkon's "swap the glyph" (glyph styles keep their glyphs; the rule applies once a drawn illustration is chosen). Plotter is flat; Dukkon's demo illustration is isometric with a shadow (two themes for one slot). Plotter's site loops have no controls; WCAG 2.2.2 and choreography's attention-loop rule still apply. Plotter's empty-state drawings label zero counts ("0 matches", "0 unread"); the library's zero-count rule wins.
- **Synthesis flagged as ours:** the cause → relationship table (a reading of the EMP catalogue rows against the library's cause table), the zero-count label rule, the WCAG loop note.
- **Verification:** the example's two SVGs passed upstream `check.py` (full, and `--compact`). The example page was rendered in headless Chromium at 1200px in light and dark and inspected. The page was rendered again at 320px after the QA corrections. Not done: no drawing was produced by a fresh agent using only the new reference, and the motion guidance was not exercised.
- **New skills:** none. **Description edit:** `design-craft` gained the trigger `blueprint illustration` (446 characters). Probes B34–B36 were added to `docs/description-boundary-routing-probes-2026-11.md` and both fixtures were re-run with two fresh blind judges: 18/18 and 36/36 each (recorded in `docs/skill-effectiveness-audit-2026-11.md`).
- **QA corrections (same day):** the example now shows the full drawing at native size in a scrolling panel and keeps the compact drawing visible at a 320px viewport (the container threshold moved from 300px to 240px); its action is a static specimen, not a focusable no-op button. The loop-control note now states WCAG 2.2.2 correctly: autoplay ends within five seconds in total or gets a pause, stop or hide control; playing once is not enough if it runs longer.
- **Parked:** role-token theming (`data-plotter-role`, CSS variables), the arrow/dimension/hatch helpers, the full verification prompt and the ISO/IEC/HABS background. They are implementation of the upstream package; link out.
- **Recheck:** the repo for a changed standard (numbers live in `skills/plotter/assets/foundation/standard.json`) and for new catalogue families.

## 2026-11-18 — Nucleo, *SVG Patterns* (nucleoapp.com/svg-patterns)

Ticket-driven evaluation: is the tool useful for patterns and textures, and can we learn to generate them?

- **Manifest:** the page HTML (fetched with curl; 179 48px tile SVGs, 32 family names from the input ids, How It Works, FAQ, and usage terms all read) and `js/main.js?v=15` (read: `svgToCssUrl`, `generateSvgCode`, layer order and opacity defaults). `js/theme.js` and `Sortable.min.js` were not read because they are UI plumbing. No other pages were read, including the linked icon store.
- **Density:** MEDIUM. The tool works as a picker, and its tile markup teaches the construction method. It has no design guidance.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Owner:** `frontend-design` (visual-execution), new section "Repeating SVG patterns" covering the gate, the picker with its terms, and seven tile rules. The `visual-execution` bullet in the parent `SKILL.md` names it. The `codex-grid-background` row in anti-slop-catalog points to it.
- **New script:** `frontend-design/scripts/svg_pattern.py` (stdlib only) generates seamless layered tiles (grid, lines, dashed and dotted lines, diagonals, dots, staggered dots, crosses, x marks, checker) as SVG, a CSS data URI, or a CSS mask. It refuses periods that don't divide the tile.
- **Read from the source:** shared 48px tile with divisor periods; edge lines drawn on one side only (`x=47.5`); 1px strokes on half pixels and fills on whole pixels; clipPath plus wrapped copies for marks that cross an edge; `currentColor` replaced with a hex at export; default layer opacity 0.15 on `#fafafa`; the `x-grid-pixel` family hard-codes `#0E0E0E`, so the color control skips it (from the code path, not clicked in the UI).
- **Synthesis flagged as ours:** the gate (tie a pattern to the subject's world, in line with the existing anti-slop row), mask-image theming, the `%23` encoding trap, and the inline clipPath id collision.
- **Skipped:** copying any tile, because the terms forbid redistribution and competing libraries.
- **Verified:** headless Chromium (Playwright) rendered every kind, an edge-anchored set, a three-layer stack, and the mask in light and dark, with no seams. A 1x pixel read of 1px lines every 24px showed single dark pixels at 23, 47, 71, and 95 with no blur and no doubled seam line. Safari, Firefox, and HiDPI were not checked.
- **QA corrections (same day):** fractional dashes such as `dash=1,gap=0.5` now render as given. They used to collapse to solid lines, and `0.25/0.25` crashed. `offset` now moves `diag` and `checker`, which both default to 0. Tile size, numbers, and opacity are validated with clean errors, and user-supplied attribute values are escaped. Added `frontend-design/scripts/test_svg_pattern.py` (15 stdlib tests, run in CI). The reference now notes that Nucleo exports an opaque `#fafafa` background unless Background opacity is set to 0%, and that its terms also bar using the tiles in a competing generator.
## 2026-11-18 — UI FX: libraries.dev (Jakub Antalik) plus effect-library and platform surveys

Ticket-driven: a skill for coming up with extra-creative UI effects, from two X posts (border-beam; distortion waves). Full manifest, fold map, conflicts, parked items and probe results: `docs/ui-fx-source-mining-2026-11.md`.

- **Density:** HIGH for the libraries.dev agent references and vendor skill (placement rules, traps) and for the distortion-waves video (staging); MEDIUM for the survey of other effect libraries; HIGH for platform support and accessibility facts.
- **New skill:** `ui-fx` (SKILL.md plus references effect-ideation, libraries-dev, effect-libraries, platform-techniques, sources, coverage-gaps; five eval cases, run three times: latest 21/21 with the skill, 10/21 without).
- **Extended (one-line pointers):** `frontend-design` (SKILL.md, ui-library-picks), `design-craft` (SKILL.md, refinement-moves), `web-design` (SKILL.md, web-animation-design, motion-audit), `creative-coding`, `swiftui` (SKILL.md, swiftui-animation), `ai-experience-design`, `interface-review`. No neighbor description changed.
- **Posture:** revised the same day at the owner's request to be less cautious: say yes and push further, Explore and Finish modes, hard limits reduced to a short shipping floor.
- **Conflicts:** anti-slop tells vs requested effects, settled by the catalog's pin rule (invoking `ui-fx` pins effects for the surface); vendor reduced-motion claim vs its own references.
- **Synthesis flagged as ours:** the gate, moment inventory, seven families, five-beat names, the ladder.
- **Added the same day:** glimm (glimm.dev, npm 0.4.1, `nomanjack/glimm-skill`) as reference `glimm`: sweep transitions for routes and in-app moments, the work/change model, live-DOM movement through HTML-in-Canvas. Second independent source for the staging anatomy.
- **Also added the same day:** ittybitty (ittybitty.dev, `blakecyze/ittybitty-shaders`, MIT) as reference `ittybitty`: 74 copy-in WebGL2 shaders indexed by job and by moment, with usage, layers, shape clipping and device-reach cautions.
- **Later the same day:** an intensity dial for subtle use (from a second border-beam post) and reference `reverse-engineering` for rebuilding effects seen on other sites (from a post listing five kit sites, which were inspected briefly and not folded as dependencies). Three independent reviews and a second pass corrected rule drift across files, about thirty vendor facts, and several accessibility statements; root causes and the ten canonical rules are in the source-mining doc.
- **Pattern study:** the example components of Arc UI and Bencho (free MIT source read in full), and the public pages of HorizonX, uberdesigner and Grainient, were mined for techniques. New references `control-patterns` and `surface-recipes` carry about forty patterns and recipes with original code; no third-party code was copied, and paid-tier source was not read.
- **holospot** (`dmitrykurash/holospot`, MIT, v0.1.0): physically based holographic foil, glitter and hologram materials for three.js, as reference `holospot`, with the transferable shader ideas pulled out.
- **Routing:** X1–X19 19/19 on the latest blind judge; W and B fixtures and the 43-row smoke packet re-run clean.
- **Parked:** React Native ports, on-device models, Pro content, a reduced-motion lint.

## 2026-11-19 — Derek Briggs (@PixelJanitor), soft-close easing set (X 2123512999810089444) + Dive Club "Scaling craft at Shopify"

Ticket-driven fold: "fold this into the skills", with the attached video as optional context. Second pass the next day, after the user pointed at dive.club, mined the full episode.

- **Manifest:**
  - The post: text, plus a 32s silent 2560×1440 demo video, read as a 2s-interval contact sheet.
  - The post it quotes: Ridd (@ridd_design) X 2123484229543854351, text plus a 108s clip, frames read and audio transcribed.
  - The full episode, Dive Club "Scaling craft at Shopify" (2026-11-03, 51 min, YouTube `r4IW73e6tE4`). YouTube refused captions from this sandbox ("Sign in to confirm you're not a bot") on every player client tried. The audio came from the rss.com podcast feed (found via the iTunes lookup for show 1686414242) and was transcribed locally with faster-whisper `small.en` in 5-minute chunks; a single pass ran out of memory.
  - `dive.club/deep-dives/derek-briggs`, rendered with headless Chromium because it is a client-rendered Framer page. It is the Jan 2024 Clerk episode (`z4hP80tzBL4`), already mined, and has no easing content. The 2026 episode was not listed on dive.club/episodes when read; it was found on the YouTube channel.
  - Fetch paths: posts via `api.vxtwitter.com`/`api.fxtwitter.com`, videos via `video.twimg.com`. Replies (4 on each post) were not read because the public endpoints do not return them, so Ridd's 👇 follow-up is unknown.
- **Density:** HIGH. Roughly ten lessons, across motion, choreography, AI enablement, measurement, and influence. The sponsor reads and the hiring/background chat were skipped.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Fold map:**
  - `web-design` web-animation-design: the four-curve soft-close table with use column; bounce into free air vs stop soft against hard (layout-shift reason); momentum carry across linked elements; corrected ease-in-out note; reconciled the 300ms duration rule and review flag.
  - `web-design` choreography: new worked example, the gesture-driven card carousel (Lead settles last, one progress value drives children, mirrored stagger order, ambient canvas, 60fps).
  - `working-with-ai` ai-enablement: "Deploy taste as files, not people" plus a checklist line. Also reconciled the old "Pi likely a garble" note, since Briggs names Pi beside Claude Code and Codex.
  - `working-with-ai` agentic-coding: curate AGENTS.md from review and prune as models improve; the living agent profile.
  - `user-research` validation-and-metrics: "Post-ship agent loops".
  - `design-org-influence`: "Briggs at Shopify: principal-IC influence" plus one routing line in SKILL.md.
- **Synthesis flagged as ours:** the measured 95%-arrival, overshoot, and launch-velocity figures; the bezier single-overshoot limit; the end-event trap; `useTransform` as the Motion mapping for the carousel.
- **Not changed:** `motion` (vendored Motion AI Kit), `design-craft` motion themes (separate themes; the Theme Note forbids mixing). The SVG displacement-map glass and canvas ambient light appear only as one line in the choreography example; no recipe was given.
- **Recheck:** quotes come from a Whisper transcript, not captions; re-verify against YouTube captions when they can be fetched.

## 2026-11-22 — Nil.Dev (@Nil_phy_dreamer), optical icon centring (X 2124194975571230845)

Ticket-driven fold of a design-engineering tip: "Always center your icons based on the weight and size of the icon. See optical alignment not mathematical alignment."

- **Manifest:**
  - Post text (read, via `api.vxtwitter.com`).
  - The 25.2s video: a 3024×2160 MP4 from `video.twimg.com`. Read frame by frame: 1 fps contact sheets for all 25 frames, plus full-resolution crops of the measurement labels (t=6.5s) and the nudge labels (t=12s). It has four beats. "Centred by its box": a dashed box and a red crosshair at `box centre 12.00, 12.00`. "But the eye weighs the shape": a blue weight dot with `weight 11.29, 12.66` / `off by 0.41px left, 0.38px low` for the edit icon and `weight 11.97, 12.29` / `off by 0.17px low` for trash. "Nudge by the weight": `nudge x +0.50 y -0.50 px` and `nudge x 0.00 y -0.25 px`, with an "Optical centring" switch turned on. "Optically centred": the end state.
  - The quoted post X 2123777217994072186: "If you find 2 issues here in this card design done by opus 5.5 (high)…" and its card image (read). Its replies (2) were not read, because the public JSON endpoints do not return them. So the card's second issue is unconfirmed, and nothing was folded about it.
- **Density:** HIGH for one lesson. It has a single source, but the claim is measurable, so it was folded as a method and not parked.
- **Owner:** `design-craft` (surfaces → Optical Alignment), in the new subsection "Measuring the Nudge: Ink Centroid". It holds the worked table, five rules (centre the weight, check each axis, offsets shrink with render size, snap to 0.25px and keep the numbers, review with an overlay and a switch), and the `opticalNudge()` DevTools snippet. Contents line updated.
- **Reconciled:** polish-principles §2. The "symmetric → geometric is fine" rule of thumb is now per axis, and the 1–2px figure is scoped to ~24px (the demo's 14px icons took 0.25–0.5px). The Single glyphs bullet and the checklist line were updated to match. The surfaces line "smallest stable unit" now allows quarter-pixel translates.
- **Pointer:** `working-with-ai` (ai-ui-direction), a "Box-centred icons" bullet in the diagnosis list: the quoted post's generated card, with a repair prompt.
- **Synthesis flagged as ours:** the ~14px render size, inferred from viewBox offset × 14/24 matching all three px figures; the snippet; the 1x-softening caveat; and the Lucide control measurement.
- **Verified:** headless Chromium (Playwright) ran the snippet on 14px Lucide icons. A circle gave 0 / 0. A filled play triangle gave offX −0.8 → nudgeX 0.75 (right, as the existing rule says). `square-pen` and `trash-2` were within 0.1px of centre, so Lucide pre-balances those two. The demo's icon set is not Lucide.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **Same day, cross-links:** `surfaces.md` Optical Alignment now opens with "See also" pointers to `swiftui` (sf-symbols → Glyph craft: Apple's WWDC 2017 optical-positioning rule) and `design-systems` (icon-systems → Optical adjustments, keylines).
- **QA fixes (same day):**
  - `opticalNudge()` takes a `container` and measures against that element's centre, so a misplaced icon box shows up.
  - SVGs without a viewBox are measured in their own px instead of being mis-scaled.
  - Sprite `<use>` targets are copied into the sample.
  - The copy drops `margin` and `transform`, which the box already includes and which shifted the drawing.
  - It throws when nothing paints instead of returning NaN.
  - Re-verified in headless Chromium: a box 3px left of its button gives `nudgeX 3`; a `translateX(1px)` gives `offX 1`; a sprite triangle gives 0.75; a circle with no viewBox gives 0.
  - Size ranges are scoped to the measured icons, and the 2px Play Button Triangles recipe is scoped to ~24px.
- **Second QA pass (same day):**
  - `opticalNudge()` now reads the icon where the browser draws it (`getScreenCTM`) instead of re-creating its layout. Positioning, margins, transforms and mirroring are now counted once. Before, `position: relative; left: -3px` read 0.5 instead of 3, and a mirrored triangle got a nudge with the wrong sign.
  - Paint set by CSS on the `<svg>` itself is now carried into the sample.
  - The section says the nudge is a change from the current position, to be added to the CSS `translate` property.
  - New regression check `design-craft/examples/snippet-checks/check-optical-nudge.mjs` (same pattern as `ui-fx` snippet-checks) extracts the snippet from `surfaces.md` and checks nine cases, each measured, nudged and measured again. It passes 19/19 on the new snippet and fails 14/19 on the previous one.
  - The `working-with-ai` line now credits the box-centring measurement to the follow-up demo, not the quoted screenshot, and calls 0.17–0.41px per-axis offsets.
- **Third QA pass (same day): replaced the DevTools snippet with a script that measures rendered pixels.**
  - **Why.** All three QA rounds found the same kind of bug. The snippet redrew a copy of the SVG off-page and then guessed how that copy mapped back onto the page. Each round found another case the copy got wrong: no viewBox, sprites, margins, mirroring, stylesheet paint on inner shapes, `slice` clipping, a scaled ancestor. Patching case by case would not end that. Page JavaScript can't read screen pixels, so measurement moved to Playwright.
  - **What replaced it.** `design-craft/scripts/optical-nudge.mjs` screenshots each container with the icon shown and with it hidden. It takes the ink centroid from the pixel difference, and prints the nudge and the `translate` value to keep, with any existing translate composed and ancestor scale divided out. `--apply` sets that value and measures again. The blur test stays as the no-tools method.
  - **Regression check.** `design-craft/scripts/optical-nudge.test.mjs` passed 28/28. It covers every earlier case plus QA's: stylesheet paint on inner shapes (matches its attribute twin), `slice` clipping, a `scale(2)` ancestor, an existing standalone `translate`, and a known-geometry square that measures 2.000px.
  - **Re-checked.** The Lucide `square-pen`/`trash-2` claim was measured again with the script.
  - **Out of scope, documented as limits.** Rotated ancestors, and icons that animate or change on hover.
  - **Superseded.** `design-craft/examples/snippet-checks/check-optical-nudge.mjs` tested the removed snippet and should be deleted.
- **Fourth QA pass (same day): the script now observes instead of assuming.**
  - **Why.** The pixel measurement itself held up. The remaining defects came from the surrounding steps assuming things instead of checking them:
    - the screenshot was assumed to start where it was requested, but Playwright trims off-screen areas;
    - an ancestor's scale was computed without its sign;
    - `translate` was parsed as px only;
    - images were decoded inside the inspected page.
  - **Observed instead.**
    - The capture area is kept inside the viewport.
    - The CSS-px-to-screen map is found by moving the icon 4px on each axis and solving, which covers scale, mirroring and rotation.
    - The nudge is added to the existing `translate` as written, keeping `%` and `calc()`.
    - Screenshots are decoded in a separate blank page, so the inspected page's CSP can't block them.
    - It refuses when the ink falls outside the icon's box.
    - Every run measures again with the fix applied, then restores the page unless `--apply`.
    - The CLI exits 1 on any failure.
  - **Tests.** 43/43. New cases: origin at (0, 0) (fails on the unclamped version), percentage centring, mirrored and rotated ancestors, a page left untouched without `--apply`, a strict-CSP page through the CLI, and the CLI exit code. Rotated ancestors moved from limits to supported.
  - **Superseded checker.** `examples/snippet-checks/check-optical-nudge.mjs` now forwards to the new test. It is safe to delete; this session could not delete files.
- **Fifth QA pass (same day): scope frozen.**
  - **Fixes.**
    - The hidden frame now uses `opacity: 0`, restored in `finally`. Before, a descendant with `visibility: visible` kept painting, giving a false 3.5px nudge that still reported centred.
    - The pointer never enters the page. Before, (0, 0) hovered a top-left button, giving a false 5px nudge that still reported centred.
    - `translate` is split at top-level spaces, so nested `calc()`/`min()` survive.
    - The docs now define the ink weight (colour change, not alpha), give the install location, and add the Linux `install-deps` step.
  - **Why the earlier hover check passed.** Its button was round, so (0, 0) fell outside it. The fixture is square now.
  - **Proof.** Both new tests fail on the old behaviour. 47/47 pass now.
  - **Scope.** `surfaces.md` now lists what the script supports, refuses and does not measure. Anything outside that list is out of scope; use the blur test there.

## 2026-11-22 — Sunnie Kapar (@sunniekapar), eased fade + blur (X 2124231120938029373)

Ticket-driven fold of a one-line tip: "adding a slight blur to an eased gradient looks so nice".

- **Manifest:**
  - Post text (read, via `api.fxtwitter.com` and `cdn.syndication.twimg.com`).
  - The 4096×4096 image from `pbs.twimg.com` (read whole, plus full-resolution crops of both label areas). It shows one halftone "Shader prototypes / Halftone spectrum" card twice, labelled "eased fade" and "eased fade + blur". With blur, the dots behind the label melt into smooth colour and the top stays crisp.
  - Replies (2, read via the fxtwitter conversation endpoint): a compliment and a thank-you. Nothing to fold.
- **Density:** MEDIUM for one lesson. Single source and a visual claim, so it was checked in a render before folding.
- **Verified:** headless Chromium (Playwright) rendered a 7px CSS halftone card four ways. The measure is the mean neighbouring-pixel difference in the label band, with labels hidden: linear fade 1.57, eased fade 3.36, eased fade + blur with a leading mask 0.32, eased fade + blur reusing the fade's eased curve as its mask 2.29. Top band 11.39 in every case. Blur radius on the leading mask: 2px 0.70, 3px 0.34, 4px 0.31, 8px 0.32. Playwright `clip` screenshots dropped the `backdrop-filter`, so the numbers come from a full-page screenshot.
- **Owner:** `design-craft` (surfaces → Eased Gradients), new subsection "Fading Over Texture: Add Blur": the quote, the numbers, a CSS layer recipe, and five rules (the blur leads the fade, radius about half the texture pitch, same box as the fade, bake it for static art, check from rendered pixels). Contents line updated.
- **Pointers:** `design-craft` polish-principles (#21 sentence, common-mistakes row, checklist line); `ui-fx` surface-recipes → Progressive blur (one slight layer is enough for a label over texture).
- **Synthesis flagged as ours:** why easing makes the blur matter more (eased fades leave more texture mid-ramp), the leading mask, the half-pitch radius, and the bake-for-static-art note. The source supplied the pairing and the visual.
- **New skills:** none. No descriptions changed, so no routing probes were run.

## 2026-11-22 — Pritam Paul, *gridlines* (github.com/pritamux/gridlines)

Ticket-driven fold of an external agent skill for alignment passes. The full manifest, probe test runs, fold map and conflicts are in `docs/gridlines-source-mining-2026-11.md`.

- **Density:** HIGH. The source is a single method for one task shape, with a working measurement script.
- **Owner:** `design-craft`, in the new reference `references/alignment-pass.md`. The probe, runner and MIT license are vendored in `design-craft/scripts/gridlines/`, and the example is `design-craft/examples/gridlines-sidebar.html`. No new top-level skill.
- **Pointers:** polish-principles, surfaces, component-details, practical-demonstrations, linear-product-craft, `interface-review`, README.
- **Description:** `design-craft` gained the trigger "edges don't line up". The new routing fixture G1–G10 was run twice by a blind judge on all 83 registered probes: every probe passed, with no regressions.
- **Parked:** the Saarinen-specific rules (headers on the icon edge, the top bar centred on the window controls) stay single-source until his redraw is found. The probe's nested-row false positive and box-on-text-line false negative are documented and were not patched in the vendored copy.
- **Skipped:** README media and `npx skills` install steps.
- **QA (same day):** the reference said the probe "measures ink", but it measures layout boxes (text line boxes and SVG element boxes), so the claim was corrected everywhere it appeared. The new `design-craft/scripts/gridlines.test.mjs` (10/10) pins the documented behaviour and limits so the docs can't drift from the script again.
- **Second QA (same day):** the test now loads Playwright the same way `audit.mjs` does, so there is a single setup for both. The runner's failure on strict-CSP pages is documented with a workaround, and the test pins both. 12/12 pass.
- **Third QA (same day):** a narrower icon centred in the icon column is a false leading miss. It is documented and pinned in the test; 13/13 pass.

## 2026-11-22 — gokhan (@gkurttech), *CSS Little-Known* 13–16: scroll snap Parts 1–4 (X)

Ticket-driven fold of three linked posts. The first quotes a fourth, which completes the series.

- **Manifest:**
  - Post text for 2120770568475599138 (Part 1, alignment), 2121145036125450331 (Part 2, padding and margin), 2121882792477016408 (Part 4, `scroll-snap-stop`) and the quoted 2121562958589239668 (Part 3, strictness). All read via `api.vxtwitter.com`.
  - Four 1920×1080 screen recordings, 17–28s each, from `video.twimg.com`. Read as frame sheets, one frame every 3–4s. Each shows a "Trips" card row, the `.row`/`.card` CSS and a one-line caption.
  - Replies: Part 4 has 2, the others 0. Not read.
- **Density:** MEDIUM. Standard properties, but the strictness and `scroll-snap-stop` use cases are practical decisions the library lacked. Existing coverage was only "use scroll snap" pointers in layout, mobile-native-feel and gestures.
- **Verified:** headless Chromium (Playwright 1.65), 400px row with 160px cards and a 16px gap.
  - Type without align: no snap.
  - `start`, `center` and `end` landed on the expected offsets.
  - 48px of padding plus 24px of margin rested the card 72px in.
  - `proximity` snapped a rest 84px from the nearest point.
  - An oversized item scrolled freely under `mandatory`.
  - `scrollBy(700)` across `scroll-snap-stop: always` stopped at the first item. `scrollTo` and `scrollIntoView` did not stop.
  - `scroll-padding-inline-start` offset `scrollIntoView`.
  - Touch flicks were not reproduced.
- **Owner:** `web-design` web-layout-design, new section "Scroll snap": a CSS skeleton, a four-row decision table and six traps. The Contents and the `SKILL.md` layout bullet were updated.
- **Pointers:** mobile-web-native-feel (carousel jitter row), web-animation-design/gestures (build-or-adopt), sources.md.
- **Synthesis flagged as ours:** logical `-inline-start` properties in place of the demos' `-left`. Also the oversized-item, `scrollBy` and `scrollIntoView` traps, and the "long lists keep `normal`" rule, though the source implies it.
- **New skills:** none. The router bullet gained trigger terms, but no description changed, so no routing probes were run.

## 2026-11-22 — @gkurttech, "Scroll-driven animations" parts 1–5 (X)

Ticket-driven fold of a five-post CSS tip series.

- **Manifest:**
  - 2122222357443989782 Part 1 `scroll()`, 2122638812736029133 Part 2 `view()`, 2122947160610115866 Part 3 `animation-range`, 2124074346431799299 Part 4 parallax, 2124450831303090459 Part 5 scroll fade.
  - Text read through `api.vxtwitter.com`. Each post has a 16–34s 1080p video; all five were downloaded and read as frames every 4s, which is how the code was captured. There were no quoted posts or reply parents. Replies were not read.
- **Density:** MEDIUM. Clean teaching and correct code, but the mechanism was already in the library. What's new is the `scroll()`/`view()` split, the range-name table, `entry 25% exit 75%` offsets and the parallax recipe. Part 5 corroborates the existing Scroll Fades recipe.
- **Verified:** Playwright with Chromium 159 and Firefox 159, run in a scratch directory. All post claims hold. The runs also found four traps that the posts do not state, recorded as ours: (1) the `animation` shorthand resets `animation-range`, not just `animation-timeline`; (2) without `both`, a `view()` subject outside a narrowed range shows its un-animated style (`transform: none`); (3) `contain` on a subject taller than the scrollport runs while the subject fills the scrollport; (4) a duration-less shorthand computes to `auto` and works. A non-overflowing `scroll(self)` list keeps both fade lengths at `0px`. Safari was not run.
- **Owner:** `ui-fx` (platform-techniques → Scroll-driven animation), rewritten: timeline table, range table, an example, traps and a parallax recipe. The overscan rule (the image overflows its frame by the travel) is ours.
- **Pointers:** `design-craft` (surfaces → Scroll Fades) adds the second-source paragraph and widens the order trap to `animation-range`. `web-design` (web-animation-design) adds a tool-ladder row. Source entries are in `ui-fx` sources and `design-craft` sources.
- **Synthesis flagged as ours:** the use-it-for column, "`linear`, because easing lags the scroll", and the parallax overscan.
- **New skills:** none. No descriptions changed, so no routing probes were run.

## 2026-11-22 — gokhan (@gkurttech), `sibling-index()` stagger (X 2117575754628128915)

Ticket-driven fold of a one-line CSS tip: "You can implement stagger animations with one line of CSS using sibling-index()", with `animation-delay: calc(sibling-index() * 70ms)`.

- **Manifest:**
  - Post text (read, via `api.fxtwitter.com`).
  - The 3.2s demo video, 1280×720 (read as a frame contact sheet made with ffmpeg). It shows six bars that enter at 70–420ms (`sibling-index() × 70ms`) and leave in reverse (`(sibling-count() - sibling-index()) × 70ms`). The captions say "No nth-child rules, no --i on every item" and "Chrome & Edge 138+".
  - Replies: the conversation endpoint returned none.
  - MDN `sibling-index()` page: 1-based, Baseline 2026, newly available. MDN browser-compat-data 8.1.10 gives Chrome and Edge 138, Safari and iOS Safari 26.2, and Firefox 154 for both `sibling-index()` and `sibling-count()`.
- **Density:** MEDIUM. There is one mechanism, and it directly replaces the `:nth-child` and `--i` stagger snippets in four references.
- **Verified:** in headless Chromium 159 (Playwright), we read the computed `animation-delay` of every formula we published: the tip as posted, zero-based, capped with `min(…, 6)`, reverse, a budget-fitted step through `sibling-count()`, and an eased step through `pow()`. We also checked what the index counts: a heading and a `hidden` sibling take indexes, text nodes do not, and a nested list restarts at 1. Finally we checked that an unparseable declaration drops back to the one before it.
- **Owner:** `web-design` (web-animation-design → choreography), in a new section, "CSS stagger with sibling-index()". It holds the tip, the version to ship, and six rules: count from 1, the cap and appended items, budget-fitting, eased stagger, reverse order, what it counts, and support with fallback. The Tool choice row and the CSS index-stagger note now point there.
- **Reconciled:** `ui-fx` control-patterns (the `sibling-index()` mention now subtracts 1 and caps), `design-craft` animations (CSS-Only Stagger) and emil-kowalski/css-techniques (the `:nth-child` ladders) now include the one-line form and a pointer.
- **Conflict:** the demo staggers the exit in reverse. That goes against choreography's rule that "exits are simultaneous", which `ui-fx` ("Reverse the index for the exit") already broke. We scoped it in choreography Step 5: reverse exits are an effect for demos and showpieces, and product UI keeps exits simultaneous.
- **Not adopted:** the tip's 70ms step without the `- 1`, and no cap. The sixth item then starts at 420ms, well past the ~300ms product budget.
- **New skills:** none. No descriptions changed, so no routing probes were run.
- **QA pass (same day).** QA found two defects. We fixed the class of problem behind each, then each instance.
  - **Unit mismatch between files.** `ui-fx` told readers to put a time-valued `sibling-index()` expression into `--i`, which its rule then multiplied by 40ms again. ms × ms is invalid, so every delay computed to 0s.
    - The convention is now the same everywhere: `--i` is a plain number, `--step` holds the time, and only the delay rule multiplies them.
    - `sibling-index()` supplies `--i` inside `@supports (order: sibling-index())`. In browsers without it the items enter together, and inline `--i` still wins.
    - The `ui-fx` recipe now carries this line in its checked CSS block, not in prose.
  - **The budget ignored duration.** The ~300ms product budget is a *finish* time: (items − 1) × step + duration ≤ ~300ms. The first recipe ended at 500ms; the budget-fitting one ended at 550ms, and at 595ms for 60 items.
    - The choreography recipes now use 30ms steps, a 200ms entrance and a cap of 4. The fit variant reserves the duration.
    - The budget table and long-list rule now state the arithmetic, along with the ~30ms floor at which to fade the group as one.
    - The same "~300ms total" wording was made explicit in PRACTICAL-TIPS, the parent troubleshooting table, the motion-audit fix table and `design-craft` emil-kowalski.
    - The `design-craft` one-liners now reproduce their own ladders, a cap of 3 at 100ms and a cap of 4 at 50ms, not an invented cap of 6. The emil-kowalski one states that its ladder ends at 450ms.
  - **Tests.**
    - New `web-design/examples/stagger-check/check.mjs` (20/20) extracts the recipes from the markdown. It checks finish times at five lengths, ordering, the eased gaps, reduced motion, the no-support fallback, and both mistakes above.
    - `ui-fx` snippet-checks gained the `sibling-index()` index assertion (44/44).
    - Mutation runs confirm each check fails on the defect QA reported.

## 2026-11-22 — skills.sh Design topic (skills.sh/topic/design), 16 listed skills

Index page listing 16 design skills. Ten were unmined and screened. Impeccable's six were already mined at `b3ced85`. Emil Kowalski's `emil-design-eng` was re-diffed from `715c180` to `64eb3de`. Folds: `frontend-design` (copy tells, second generation; Anthropic deltas), `interface-review` (NEW code-pass-checklist from Vercel's Web Interface Guidelines), `design-systems` (code-side composition, persisted overrides, third-party extraction limits), `design-craft` (Emil upstream corrections), `working-with-ai` (turn corrections into standing rules; generator style brief), `design-prototyping` (NEW mockup-to-app), `creating-skills` (finish gates, retrieval relevance, pinned rule files). Parked: `canvas-design`, ui-ux-pro-max catalogs, tasteskill kit internals, Sleek API mechanics. Second pass (same day): Emil `0f2e23b` fixes applied across web-design, swiftui, design-craft, frontend-design, and design-prototyping; tasteskill copy method → `ux-writing`; Vercel writing-guidelines → `ux-writing` and `write-clear-prose`; ui-ux-pro-max guidelines → `web-design` form-design and web-accessibility; routing probes B37–B39 and an `interface-review`/`web-design` description edit; coverage gaps logged. Full manifest, conflicts, and recheck triggers: `docs/skills-sh-design-topic-source-mining-2026-11.md`.
