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
[eval] error-messages effectiveness run: MARGINAL (bare preferred 35-34 both passes) → Non-negotiables block front-loaded into the skill from observed failures; re-test queued. make-interfaces-feel-better: PULLING WEIGHT (prior run).
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
- ~~Deferred book folds~~ DONE 2026-06-11 (commit 8ba23e0): Yablonski psych-as-evidence → design-org-influence; principle→law→rules → design-principles; emphasis-reads-as-ad → make-interfaces-feel-better. Dive Club design-systems fold also completed inline (F2 had hit session limit before reaching it).

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
Cloud agent's PR #4 was a sound base but missed: the 10-tweet shadow-borders thread (production CodePen values), second halves of both cited threads, Chrome 13px baseline bug, flexbox min-size reset, Tailwind-vs-CSS-Modules agent-token experiment (Jun 2026), and ALL video content (Dive Club S4 + Shape FM eps. 3/8 — read in full via yt-dlp). Folded into make-interfaces-feel-better, web-animation-design, frontend-design, design-org-influence, design-systems, ai-enablement. All quotes verified (X via vxtwitter; video via transcripts). Parked: Shape FM eps. 1/2 (may contain gradient/shadow talk per ep. 3 reference), button-in-Figma thread 1636415458378407936 (replies unrecoverable), glass-button/Sonner-shadow values (in images, need OCR or manual read), promised dropdown-breakdown thread (likely never posted).

## 2026-06-11 — Soleio Cuervo sweep (PR #6 completion)
Cloud agent's branch was honest and well-routed from written sources (all 8 X posts + Zhuo/Dive/First Round claims verified) but couldn't reach video. Pulled 6 transcripts via yt-dlp, read in full: Dive Club ×2 (WHIXWOmT7_I, ffoMwdLGcFo), Design MBA (hZ3Z2frAWvM — primary for the Like-button experiment, Colombia/Iceland vs Venezuela/Norway), Cults & Culture (vdaGXRvzIq4), PBS (OIAUfZBd_7w), SPC fireside (hNUEaFmPAwc — Soleio is the INTERVIEWER; content is Steve Ruiz's, attributed accordingly). Folded into design-prototyping, design-principles, design-org-influence, people-management, design-systems, user-research, building-in-public, client-engagements. Skipped as out-of-scope: AR/spatial futurism, VC mechanics, brand-as-moat investor framing, engagement-defense PR.
