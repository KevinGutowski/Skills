# skills.sh Design topic — source mining, 2026-11

Source: https://www.skills.sh/topic/design ("Design & UI skills", Vercel's skills.sh directory), fetched 2026-11-22 as HTML and converted to text.

Ticket: "Fold in knowledge from https://www.skills.sh/topic/design."

The page is an index, not a source. It lists 16 skills, gives one line per skill and an FAQ (impeccable's skills are "stylistic operators", `web-design-guidelines` is "prescriptive"; start with `critique` on existing UI). The page's own copy had nothing to fold. The 16 listed skills were each screened under the External Skill Intake rules in `docs/skill-library-ops.md`. Everything below is paraphrased. No skill text, scripts, data files, hooks, or assets were imported, and nothing here installs or runs any of them.

## Manifest and coverage

| # | Listed skill | Repo, revision | Read | Density | Decision |
| --- | --- | --- | --- | --- | --- |
| 1 | `frontend-design` | anthropics/skills `e4bb5d9` (2026-11-16), skill license file | SKILL.md in full | Medium (mostly already covered) | Deltas → `frontend-design`. |
| 2 | `web-design-guidelines` | vercel-labs/agent-skills `5a37a63` + vercel-labs/web-interface-guidelines `434b7f9` (MIT) | SKILL.md, `command.md` in full, AGENTS.md, README | **High** | New `interface-review` (code-pass-checklist). Pinning lesson → `creating-skills`. |
| 3 | `vercel-composition-patterns` | vercel-labs/agent-skills `5a37a63` (MIT) | SKILL.md and all 8 rule files | Medium-high | → `design-systems` (SKILL.md Component API bullet + field-notes). |
| 4 | `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill `6ec2bb5` (MIT) | SKILL.md (first 140 lines), data-provenance.json (head), 2 of 4 journals, CSV inventory | Medium (method), low (catalog) | Query contract, relevance measurement, provenance → `creating-skills`. Master + page overrides → `design-systems` field-notes. Catalogs parked (conflict below). |
| 5 | `sleek-design-mobile-apps` | sleekdotdesign/agent-skills `fb90438` (MIT) | SKILL.md, `designing.md`, `implementing.md` in full; `endpoints.md` and styling files inventoried | **High** (implementing), low (API) | New `design-prototyping` (mockup-to-app). Style-direction brief → `working-with-ai` (ai-ui-direction). |
| 6 | `canvas-design` | anthropics/skills `e4bb5d9` | SKILL.md in full | Low | Parked (below). |
| 7–12 | `polish`, `critique`, `bolder`, `delight`, `distill`, `quieter` | pbakaus/impeccable | Already mined at `b3ced85` | — | No rescreen. See `docs/impeccable-source-mining-2026-11.md`. The FAQ's "operators vs prescriptive" split already matches `design-craft` (refinement-moves) vs `interface-review`. |
| 13 | `extract-design-system` | arvindrk/extract-design-system `1873741` (MIT) | SKILL.md, both references, README, `normalize.ts`, `audit.ts`, `color-matcher.ts` | Low-medium | Limits of third-party extraction → `design-systems` field-notes + a routing row in system-from-shipped-ui. |
| 14 | `design-taste-frontend` | Leonxlnx/taste-skill `f6b7657` (tasteskill 2.5.1, MIT) | SKILL.md house rules and §1, CHANGELOG 2.5.0–2.5.1, `references/copy-tells.md` in full; other 20 references inventoried | **High** (copy-tells, gate design), low (house style) | Copy tells and over-correction table → `frontend-design` (anti-slop-catalog). Gate design and field-test lessons → `creating-skills`. |
| 15 | `high-end-visual-design` | Leonxlnx/taste-skill | Not present at `f6b7657` | — | The repo now ships one skill (`skills/taste-skill`, name `design-taste-frontend`); 2.5.0 replaced the earlier skill set. The directory listing is stale. Nothing to read. |
| 16 | `emil-design-eng` | emilkowalski/skill `64eb3de` (2026-11-15, MIT) | Diff since our mined `715c180`; `learn-taste` in full | Medium | Upstream corrections applied to `design-craft` (emil-kowalski). `learn-taste` → `working-with-ai` (ai-ui-direction). |

Note on the repo name: skills.sh links `emilkowalski/skill`; the earlier ledger cites `emilkowalski/skills`. Both resolve to the same history (the earlier mined commit `715c180` is in this clone's log).

## Fold map

- **`frontend-design`**
  - anti-slop-catalog:
    - New rows: the SaaS-card kit, the single-word headline accent, template chrome strings (middle-dot meta, `WORD — fragment`, `→` on every link), and reflex near-black. The `#D97757` note was added to saturated look 1. All are marked (A).
    - New section "Copy tells, second generation" with the over-correction table and the placeholder-facts rule, marked (T).
    - The `→` row has two sources: Anthropic and tasteskill's "an arrow after each link's words".
  - SKILL.md build contract step 1: test the plan against a similar brief, and keep a log of tried directions. Corroborated by Anthropic ("jot down notes about what you've tried") and tasteskill (deals palettes away from the folder's last twelve). One sentence was added to the body.
  - visual-execution: the selector-specificity trap.
  - sources updated.
- **`interface-review`**
  - NEW `references/code-pass-checklist.md`: Vercel's rules regrouped by local owner, the grep-then-confirm procedure, a severity map, five disagreements, and the code-only output format.
  - SKILL.md: one "Source pass" paragraph in Recon.
  - sources updated.
- **`design-systems`**
  - SKILL.md Component API: one bullet, "in code, a boolean that changes structure is a missing variant".
  - field-notes: a new section covering code-side composition, persisted MASTER plus page overrides, and seeding tokens from a third-party site.
  - system-from-shipped-ui: one routing row.
  - sources updated.
- **`design-craft` (emil-kowalski)**
  - Upstream commit `0f2e23b` applied:
    - the 300ms rule's modal/drawer/sheet/toast exceptions;
    - enter 250ms / exit 200ms (it was 2s);
    - compositor-only wording for CSS animations;
    - the `clip-path` acceleration claim dropped in two files;
    - non-uniform stagger delays (0/50/90/120);
    - `useSpring` + `useTransform` from `motion/react`.
  - sources updated.
- **`working-with-ai` (ai-ui-direction)**
  - New section "Turn corrections into standing rules" (learn-taste), plus a checklist line. Step 6's pointer now targets it.
  - The style-direction brief for design generators (Sleek) was added to step 2.
  - sources updated.
- **`design-prototyping`**
  - NEW `references/mockup-to-app.md`, routed from one Tier 3 amplifier bullet.
  - sources updated.
- **`creating-skills` (measuring-skill-effect)**
  - New section "Finish gates, retrieval-backed skills, and pinned rule files".
  - sources updated.

No new top-level skill. *(First pass: no description changed. Superseded in the second pass, where routing probes B37–B39 led to description edits on `interface-review` and `web-design`; see "Second pass", item 5.)*

## Conflicts and how they were resolved

- **Category-derived style (ui-ux-pro-max) vs `frontend-design`.** ui-ux-pro-max's `--design-system` mode maps a product type ("beauty spa wellness") to a style, palette, and font pairing. `frontend-design` treats "could someone guess the aesthetic from the category alone" as the failure test. The catalog was not folded. Named-style lookup is the only use that does not conflict, and `frontend-design` does not need it.
- **tasteskill's house style vs this library's schools.** Its nine house rules (one section per screen, no image captions, hover micro-animations on every page, a dealt scroll moment on every page) are one corpus's style, not universal rules. The same reasoning was applied to Jaytel's Taste in `docs/taste-source-mining-2026-06.md`. Its "shader effects only on technical trades" rule is a sound default, but `ui-fx` is deliberately permissive when effects are requested, so the rule was not imported as a ban.
- **Vercel copy rules vs `ux-writing`.**
  - Title Case versus sentence case: house style wins, and the default is sentence case.
  - "Placeholders end with …": the label and hint carry meaning (`web-design` (form-design)).
  - `autocomplete="off"` on non-auth fields: use correct tokens instead.
  - All five are listed in the checklist's disagreement table.
- **Emil durations vs `web-design` (web-animation-design).** Emil's corrected exceptions (modals up to 500ms) differ from the default theme's table (modals 200–300ms). These are separate themes, which the library never averages, so each file keeps its own values.
- **Anthropic's "avoid all caps for labels"** is broader than this library's eyebrow ban, which targets the kicker above a heading. Not adopted beyond the existing ban, because short uppercase labels with tracking are allowed in `web-design` (web-typography).

## Parked or skipped

- **`canvas-design`** (Anthropic). It is a two-step prompt: write a named "art movement" manifesto, then render one PNG/PDF. Most of the text is prompt pressure (repeat "master-level craftsmanship"; "the user already said it isn't perfect enough"), which this library does not copy. Two usable ideas are already covered or thin:
  - refine by subtraction, not addition (`design-craft` refinement-moves: distill and quieter);
  - nothing overlaps or leaves the canvas (craft-floor occlusion checks).
  - Static poster art has no owning skill here, and `creative-coding` covers generative work. Recheck if a poster/print skill is ever created.
- **Sleek API workflow.** Projects, chat runs, polling, idempotency keys, credits, and the device-flow key handoff. These are tool mechanics. The device flow (the user confirms a code and the key is handed over once) is a decent pattern for `devtools` agent experience, but it is single-source. Parked.
- **ui-ux-pro-max catalogs** (styles, 194 product palettes, 74 font pairings, GSAP presets, stack guides). Parked for the conflict above. The RTL suitability levels per style (`full` / `partial` / `caveats`) are an interesting idea for `web-design` (web-layout-design), but they are tied to its catalog.
- **tasteskill kit internals**: dealers, page models, WebGL effects, photo search via Wikimedia Commons (CC0/BY/BY-SA only, no NC/ND, credits in one footer line), and tap-size thresholds (FAIL under 32×24 when another target is within 8px, WARN under 44). Its image-licence rule is sound and could join `frontend-design` visual-execution if a second source agrees. Its tap thresholds roughly match WCAG 2.5.8 and add nothing over `web-design`.
- **Vercel `react-best-practices`, `react-native-skills`, `react-view-transitions`** (same repo, not listed on the topic page). Out of scope for this ticket. They are a candidate source if a React/React Native skill is ever created.
- **Recheck triggers:** the Vercel guidelines pin moving past `434b7f9`; a tasteskill minor release (its tells are dated and move each model generation); new Emil `fix` commits; the skills.sh Design topic adding skills.

## Second pass (same day): follow-ups

**1. Emil Kowalski's `0f2e23b` fixes, applied wherever his skills were folded.** The first pass patched only the `emil-design-eng` material. This pass covered the rest of the 29-file diff from `715c180` to `64eb3de`:

- `web-design` (web-animation-design):
  - choreography: per-item `--delay` stagger with shrinking gaps instead of `calc(var(--step) * var(--i))`, the five-item cap, and the checkmark starting about 0.1s before the square ends. Completion gating was reworded, because upstream removed its `useRef` recipe.
  - animation-performance: the composite tier is narrowed to `transform`/`opacity`, `filter` and `drop-shadow` are measured per engine, and the `clip-path` and accordion exceptions are named.
  - gestures: the projected endpoint replaces the velocity sign.
  - motion-audit: the drawer and toast exceptions and the Sonner `ease` are no longer findings.
  - sources updated.
- `swiftui` (touch-interaction-design, fluid-interfaces): "commit or reverse" is now decided by the projected endpoint (upstream `mobile-native`).
- `web-design` (mobile-web-native-feel): corrected the `(pointer: fine)` rationale. A stylus is a fine pointer; the media query excludes coarse touchscreens that claim hover.
- `design-craft`:
  - worst-case-data: `a@b.test`, initials skipping suffixes, a relative-time switch after 7 days, "no limit found", the `-webkit-line-clamp` recipe.
  - emil-kowalski: prefer `transform`/`opacity` with named exceptions; the reduced-motion example now defines its `fade` keyframes.
- `frontend-design` (ui-library-picks): Sonner multiple-toaster semantics, `onDismiss` also firing on `toast.dismiss()`, stacking versus clipping, and DialKit dropped from his list.
- `design-prototyping` (methods): validation of the `?v=` index, hover-gated picker styles, and the integrated-not-picked completion criterion.

Checked and already right: the `popLayout`/`sync` description in choreography, and the layout-thrashing definition in animation-vocabulary. Not folded: `animate-expo` and `write-swift`, which have no owning reference here; `ask-emil`, which is a router over his own skills.

**2. tasteskill copy method → `ux-writing`.** New member `ui-voice-and-tone/marketing-page-copy.md`, built from its copy, copy-voice, copy-registers and copy-moves references:

- a fact sheet from the brief;
- a voice card;
- registers condensed into one table;
- page shape from the reader's questions;
- moves for each part of the page;
- a budget per device;
- the checks.

Kit tooling and house-style word counts were skipped. Conflicts:

- **Question headings:** none in product UI or docs; one is allowed on a marketing page when a fact follows.
- **Capitalisation:** house style wins, otherwise sentence case.
- **Category-naming hero:** a default here, not mandatory.

**3. Vercel `writing-guidelines`.** Source repo vercel-labs/writing-guidelines `83e2316`.

- `ux-writing`: unit format and the rhetorical-question conflict.
- `write-clear-prose`: sentence-level AI shapes added to the AI-Default Pass (recap transitions, stop-start fragments, spec-sheet voice, cold opens, personified artifacts, metaphor verbs, weasel quantities, template framing, second-read test), and a product-documentation block in form-playbooks.
- The local rule that punctuation is a rhythm choice was kept over Vercel's em-dash ban.
- Contrast with its sibling: this skill fetches its rules from `main` unpinned, while `web-design-guidelines` pins a commit and a hash. Noted in `creating-skills` (measuring-skill-effect).

**4. ui-ux-pro-max guidelines × `web-design`** (form-design, web-accessibility), each tied to the official source the CSV cites:

- Validation timing as three schools (Baymard, Ontario, GOV.UK), with a shared floor.
- Focus after a failed submit as two schools.
- Idempotent submit, unsaved-changes prompt, and Enter-to-submit skipped during IME composition.
- WCAG 3.3.7, 3.3.8, 2.5.7, 3.2.6 and 4.1.3, plus the APG modal pattern.
- Fixed a local error: 2.4.11 is Focus Not Obscured, not Focus Appearance (that is 2.4.13).
- Source errors not adopted: error placement below the field while citing GOV.UK, which puts it above; and its own conflicting toast rows. Logged in `web-design` coverage-gaps.

**5. Routing.** Probes B37–B39 were added to `docs/description-boundary-routing-probes-2026-11.md`.

- The first blind judge routed the code-review prompts to `web-design`.
- `interface-review`'s description gained "UI-code/PR audits" and the trigger "review UI code" (446 characters). `web-design` gained the boundary "reviewing UI code or a PR → interface-review" (431).
- On a second blind judge, B37 and B38 passed; all other probes held except B15 (judge variance, recorded in `docs/skill-effectiveness-audit-2026-11.md`).

**6. Coverage gaps** were logged for every single-source fold in `frontend-design`, `design-prototyping`, `creating-skills`, `interface-review`, `design-systems` and `working-with-ai`.

**7. Stand-in photo licensing → `frontend-design` (visual-execution).** The second source is the licence terms themselves (Creative Commons and Wikimedia's reuse guide). The rule admits CC0, public domain, CC BY and CC BY-SA; NC and ND are out; it requires attribution and a check of the file's own licence page. Logged as a coverage gap until a second practitioner source agrees.

**8. Taxonomy decision: React left out for now (owner, 2026-11-22).** Vercel's `react-best-practices`, `react-native-skills` and `react-view-transitions`, and skills.sh's React and Mobile topics, have no owning skill. React composition lives in `design-systems`, and React Native porting traps sit in `design-prototyping` (mockup-to-app) only as a narrow seam. If React or React Native work becomes routine, a platform skill (`react`, matching `rails`/`swiftui`/`uikit`) is the taxonomy-consistent home. It would meet the 2–3 independent sources bar: Vercel's three skills plus Sleek's porting guide. After the agent raised this as an open question, the owner replied "Sure can leave out react" (2026-11-22, ticket conversation). Recorded scope: no React skill was created, and Vercel's `react-best-practices`, `react-native-skills` and `react-view-transitions` were not screened. That is deferred, not rejected. Ask the owner again only if a later source or task makes React work routine.

## QA corrections (same day)

A QA review raised six findings. Each was checked against the files and primary sources.

1. **Validation schools blended (fixed).** `web-design` (form-design) presented "errors clear immediately" as a floor every school shares, but Ontario re-checks corrected fields on blur and avoids keystroke validation. The section now lists what all schools share and states each school's clearing trigger (Baymard: as the user types; Ontario: on blur; GOV.UK: on resubmit). The checklist line was updated to match.
2. **Skill-hook lifetime (fixed).** `creating-skills` (measuring-skill-effect) said a hook runs whether or not the skill is invoked. Claude Code's hooks docs say a skill-frontmatter hook starts only on invocation and then stays registered for the rest of the conversation, while a settings hook runs for its whole scope. Both are now stated, with `once` and the docs link.
3. **React decision (kept, reworded).** The finding said no user decision existed. The owner did reply "Sure can leave out react" (2026-11-22), after the review's snapshot. The entry now quotes those words and records the scope as deferred rather than rejected. The earlier "do not re-raise" instruction went beyond what the owner said and was removed.
4. **WCAG 3.3.8 (corrected twice).** The first version said blocked paste is always a failure, and QA called that an overclaim. The first fix overcorrected: it claimed the criterion passes if *any* step has a conforming alternative. The W3C Understanding document says all steps need to comply. Blocking paste or autofill in an authentication field is a listed failure (F109) unless another method is available for that step. The final text states the per-step rule. The 4.1.3 line was scoped: the criterion requires programmatically determinable status changes, and "3 items in cart" phrasing is good practice beyond it.
5. **Mockup content (fixed).** `design-prototyping` (SKILL.md and mockup-to-app) now treats generated content as placeholder unless marked approved. Each value is sorted into approved copy, runtime data, or a question for the user.
6. **React Native version bounds (fixed).** Checked against the RN 0.88 style docs. `backgroundImage` accepts `linear-gradient()`/`radial-gradient()` strings, so the "gradients do not port" claim was wrong for current versions. `boxShadow` is New Architecture only, with outset shadows needing Android 9+ and inset Android 10+. The list now names the docs version it was checked against.

Root causes, and the process fix: findings 1, 4 and 5 were absolutes the sources do not support, and 6 was a version-bound fact left open-ended. Finding 1 came from a delegated fold that was accepted without that check. `docs/skill-library-ops.md` (Evaluation Gates) gained a **Claim audit** gate covering these failures, subagent output, and recording user decisions without extending them. The same audit was run over every line added in this ticket. The remaining absolutes are scoped style defaults inside their own skills (for example, the copy-tell bans and "never block paste"), so they were left as they are.

## Second QA round (same day)

A second review raised six more findings. All were substantiated and all were fixed.

- **3.3.8 per-step rule (fixed).** See item 4 above. The first-round fix had inverted the criterion.
- **Credential normalization (fixed).** The paste rule said "trimmed", and the shared "normalize before validating" rule had no exception for secrets. Normalization is now per field: passwords, passphrases, and API keys are compared exactly as entered (OWASP allows whitespace in passwords). The checklist matches.
- **Choreography click gating (fixed).** The first-pass rewrite kept the "click works only after the hover buildup finished" behaviour and only changed how the flag is stored. Upstream removed the guard entirely. The rule is now that actions work at once and interrupt or retarget decorative animation.
- **Gestures (fixed).** The release-phase method still said "decide by the sign of the velocity" while the table and checklist said "projected endpoint". All three now use the projection, with the nearly-closed-sheet case spelled out.
- **clip-path acceleration (fixed).** PRACTICAL-TIPS still said "hardware-accelerated", and two `design-craft` lines grouped the `clip-path` and accordion exceptions under "running on the GPU". All now say only `transform`/`opacity` are compositor-only, and to measure the exceptions.
- **Focus after a failed submit (fixed).** The code-pass checklist and the web-accessibility checklist still required focusing the first invalid field. Both now accept the error summary (GOV.UK) or the first invalid field, and flag only a submit that moves focus nowhere.

Types and process: four of the six are **incomplete reconciliation**. A rule was changed in one place, and sibling sections, checklists, or other files kept the old wording. The Fold reconciliation gate already requires that sweep, so the miss was in running it, not in the gate's wording. This round grepped the whole repo for each changed rule (velocity sign, `clip-path` acceleration, first-invalid-field focus, trimming, hover gating) rather than only the cited lines, and also caught the two `design-craft` "GPU" lines QA had not listed. Two are **corrections that were not checked against the primary text**: the 3.3.8 fix and the gating rewrite. Both have now been verified, against the W3C Understanding page and the upstream diff. `docs/skill-library-ops.md` Fold reconciliation now says: re-verify a correction against the primary source before applying it, and sweep every file for the superseded wording, not just the cited line.

## Third QA round (same day)

A third review raised three findings. All were substantiated and fixed:

- **`inert` while dragging.** The code-pass checklist told agents to make dragged elements `inert`. That is Vercel's rule, but inert removes focus from an active keyboard-drag handle in Chromium. It now applies only to non-interactive drag ghosts and clones, and is marked as a local narrowing of Vercel's wording.
- **Bottom insets under tab bars** (mockup-to-app). Sleek's "unless a tab bar or other navigator chrome covers it" had been dropped. Each edge's owner is now decided from all the enclosing chrome.
- **CC BY / BY-SA attribution** (visual-execution). The 4.0 elements are now listed: creator, copyright notice, licence link, source link, an indication of changes, and keeping earlier modification notices. Crops and grades count as changes.

Type: all three are **qualifiers lost while condensing a single source**. Rather than wait for review to find them one at a time, a fresh reader compared every single-source condensed fold in this ticket against its source and listed only dropped exceptions that would cause a real defect. It found eight more, which were checked against the sources and fixed:

- **Rubber-band suppression on hybrid devices** (code-pass-checklist): the `pointer: fine` caveat and the test note were missing.
- **A safe-area provider inside natively presented modals** (mockup-to-app) was missing.
- **Render props that pass data back** (field-notes) stay, as in `renderItem`.
- **Numbers and stories** (marketing-page-copy): odd numbers, failure and luck, and values with numbers now apply only when the brief supplies them, with no invented figures.
- **No humour on money or health purchases** beyond microcopy (marketing-page-copy).
- **Only the user's taste** becomes a rule (ai-ui-direction).
- **Propose, don't edit, CLAUDE.md/AGENTS.md** pointers (ai-ui-direction).
- **The buzzword row** keeps literal trade words and the client's own name (anti-slop-catalog).

The anti-slop copy-tells section was clean. `docs/skill-library-ops.md` (Claim audit) now names this fifth failure type and requires that source-versus-condensed comparison for single-source folds.

## Fourth QA round (same day)

Two findings, both substantiated and fixed in `web-design`:

- **IME-safe Enter handler** (form-design). The order now follows Chrome's IME-safe Enter guide. `preventDefault()` runs first, inside the Enter-without-newline-modifier test. The composition guard (`isComposing` or 229, kept under the Enter test) comes next, then the repeat guard, then `form.requestSubmit()`. QA reproduced a double submission without the cancellation. Plain inputs with no custom handler need nothing extra.
- **Typing validation** (web-accessibility §6). Kalbag's "validate as people type, after they have entered something" contradicted form-design's blur and submit schools. It now follows the chosen timing policy and reserves as-you-type feedback for fields built for it, or for re-checking an existing error.

Type: the IME item is a sequence a single-source fold got right in content but wrong in order. The typing item is the reconciliation miss again: a sibling file kept the pre-schools wording. Both are covered by the existing Claim audit and Fold reconciliation gates, so no process change.

## Fifth QA round (same day)

Three non-blocking items, all fixed:

- `readOnly` inputs are exempt from the `value`-needs-`onChange` check (code-pass-checklist); React warns only for editable inputs.
- A duplicated IME testing sentence was removed (form-design).
- The first-pass "no description changed" notes, here and in the probe fixture, are marked superseded by the second-pass description edits.
