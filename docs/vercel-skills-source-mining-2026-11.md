# Vercel agent skills source mining — 2026-11

Trigger: https://x.com/ctatedev/status/2122816672625275030 (Chris Tate, Vercel Labs, 2026-11-17): "New skill: modern-web-guidance. Your agent looks up Chrome's Modern Web Guidance, applies it to your code, then checks the result in a real browser." Install line in the post: `npx skills add vercel-labs/agent-browser`.

Ticket-driven: "Catalog and fold in the vercel skills to the repo… add other vercel skills not just that one… use your judgement… you may make new skills too."

Read 2026-11-18. This pass is separate from the 2026-06 product-design overhaul ([ledger](vercel-product-design-overhaul-2026-06.md)), which folded one Vercel blog post about governance; this one catalogs Vercel's published skills.

## Result in one table

| Change | Where |
| --- | --- |
| New skill | `browser-verification` (agent-browser `core`, `dogfood`, `modern-web-guidance`; commands re-run locally) |
| New skill | `react` (agent-skills `react-best-practices`, `composition-patterns`, `react-view-transitions`; the six Next.js workflow skills as a chooser) |
| New reference | `interface-review` (code-compliance-sweep) from Vercel's Web Interface Guidelines |
| New reference | `write-clear-prose` (technical-docs) from Vercel's Writing Guidelines |
| New reference + house rule 20 | `creating-skills` (skill-delivery-patterns): stub + CLI-served guides, bundled docs, live-fetch wrappers, passive context vs skills, scripts around judgment, `npx skills` mechanics, third-party vetting |
| Extended | `web-design` (web-accessibility, form-design, mobile-web-native-feel, web-layout-design, oklch-skill, web-performance, web-animation-design), `write-clear-prose` (revision-moves, editing-rubric), `ux-writing` (ui-voice-and-tone), `working-with-ai` (agentic-coding pointer), each with sources and coverage-gaps entries |
| Repo docs | README (rows, bundles, a claim-vs-proof routing rule, `npx skills` install line), AGENTS.md and agent-quickstart (install line, bundles), taxonomy, audit matrix, smoke fixture S43–S44, routing probes R1–R18 |
| Follow-up pass, same day | `devtools` (devtool-interface-design: new cli-for-humans-and-agents; docs an agent can act on), `design-systems` (new component-api-contracts), three more tested checks and shift attribution in `browser-verification`, sweep patterns tightened on a real repository, evals run, two description edits re-probed. Details under "Follow-up pass" |
| Cataloged, not folded | the remaining skills in about 30 Vercel repositories, with a verdict each (below) |

## Manifest and coverage

| Source | How read | Density | Decision |
| --- | --- | --- | --- |
| The X post and its image | fxtwitter JSON; image downloaded and read | Low (announcement) | Trigger only. The image's CLS 0.14 → 0 flow was reproduced on a local page |
| vercel-labs/agent-browser `deda8ef` (Apache-2.0): the installable stub, `modern-web-guidance`, `core`, `dogfood` + taxonomy + template, trust-boundaries | Full | High | New skill `browser-verification` |
| agent-browser core references: commands, session-management, video-recording | Targeted sections | Medium | Named as search terms; syntax left to `agent-browser skills get` |
| agent-browser `electron`, `protected-vercel-deployments`, `vercel-sandbox`, `agentcore`, `slack`, `derive-client`, `webmcp-gen` | Screened (frontmatter, outline, key rules) | Low–medium | Routing table in `browser-verification` (driving-the-browser); `derive-client` and `webmcp-gen` parked |
| agent-browser CLI 0.43.0 + Chrome 158, run on a local test page | Run | — | Every check recipe executed; found the warm-cache CLS trap (recorded in `browser-verification` sources) |
| Chrome `modern-web-guidance` CLI 1.0.1 | Run (`--help`, `list`, `search`) | — | Guide texts not folded; retrieved at task time |
| vercel-labs/agent-skills `1a2c79d` (MIT): `react-best-practices` (70 rule files), `composition-patterns`, `react-view-transitions` | Full | High | New skill `react` |
| agent-skills `web-design-guidelines` → vercel-labs/web-interface-guidelines rule file | Full (191 lines) | High, mostly corroboration | `interface-review` (code-compliance-sweep) + eight small folds into `web-design` owners |
| agent-skills `writing-guidelines` → vercel-labs/writing-guidelines rule file | Full (257 lines) | High for docs writing | `write-clear-prose` (technical-docs) + merges into revision-moves and editing-rubric; three lines in `ux-writing` |
| agent-skills `vercel-optimize` (SKILL, doctrine, verification, gates/sanitizers code) | Read for architecture | High as an authoring exemplar | `creating-skills` (skill-delivery-patterns), "Scripts around judgment" |
| agent-skills `react-native-skills`, `deploy-to-vercel`, `vercel-cli-with-tokens` | Screened | Low for this library | Link out |
| vercel/next.js canary `ad2642a9` `skills/` (six workflow skills); vercel-labs/next-skills tombstone README `c522619` | SKILL.md files read; rig/test templates not read | Medium | `react` (nextjs): chooser and pointers, no API teaching |
| vercel-labs/skills `57217cf` (MIT): README, commands doc, discovery source, `find-skills` | Read | Medium | `creating-skills` (skill-delivery-patterns); install line in README/AGENTS/quickstart |
| `npx skills add <local path> --list` against this repository | Run | — | Found all 44 root-level skills. The GitHub path was not run |
| vercel/ai `486e08f`: `use-ai-sdk`, migration skill, `adr-skill`, 9 contributor skills | Screened | Low | Authoring pattern only (bundled-docs stub) |
| vercel-labs/portless `6c8b988`, vercel-labs/json-render `9301e64` | Screened; `core`, `chat`, `mcp` read | Medium | Parked (single-source tool doctrine) |
| 22 further repositories (list below) | Frontmatter and outlines | Mixed | Cataloged; three flagged for a future pass |
| Vercel blog, "AGENTS.md outperforms skills in our agent evals" (2026-01-27) | Fetched and read | High for one claim | Figures quoted in `creating-skills` (skill-delivery-patterns) with scoping caveats |

Not read: the skills.sh launch post, agent-browser blog posts, replies to the X post, and the roughly 40 skills.sh-listed Vercel repositories that were not cloned (names only).

## Catalog

Shape legend: **stub** (points at a CLI or bundled docs) · **CLI-served** · **wrapper** (fetches live rules) · **pack** (rule or reference pack) · **workflow** · **scripted** (deterministic scripts around the model) · **internal** (contributor-only).

### vercel-labs/agent-browser — `npx skills add vercel-labs/agent-browser`, then `agent-browser skills get <name>`

| Skill | What it does | Shape | Verdict |
| --- | --- | --- | --- |
| `agent-browser` | Discovery stub: triggers, then "run `skills get core`" | stub | Pattern folded into `creating-skills`; install upstream |
| `core` | Snapshot-and-ref loop, waits, sessions, auth, troubleshooting, 10 references | CLI-served | **Folded** → `browser-verification` (driving-the-browser), judgment only |
| `modern-web-guidance` | Retrieve Chrome's guides, apply, verify four behaviors in the browser | CLI-served | **Folded** → `browser-verification` (guidance-then-verify) |
| `dogfood` | Exploratory QA with repro evidence and a report template | CLI-served | **Folded** → `browser-verification` (exploratory-qa) |
| `electron` | Drive Electron apps over CDP | CLI-served | Link out |
| `protected-vercel-deployments` (source directory `vercel`) | Protected deployments via short-lived OIDC; per-browser flag overrides | CLI-served | Link out; its "do not change shared state" rule is in `browser-verification` |
| `vercel-sandbox`, `agentcore` | Browser in Vercel Sandbox / AWS Bedrock AgentCore | CLI-served | Link out |
| `derive-client` | Record a HAR, derive a standalone API client | CLI-served | Parked → candidate for `devtools` |
| `webmcp-gen` | Build and validate WebMCP tools for a page | CLI-served | Parked (experimental API); its untrusted-metadata rule is in `browser-verification` |
| `slack` | Slack through the browser | CLI-served | Skip (product-specific) |
| `technical-writer` (also in portless, json-render, chat and others) | Vercel docs-writing standard | internal | Skip as install; corroborates the Writing Guidelines fold |

### vercel-labs/agent-skills — `npx skills add vercel-labs/agent-skills --skill <frontmatter name>`

The selector is the frontmatter `name`. The four React packs are named with a `vercel-` prefix their directories lack: `vercel-react-best-practices`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `vercel-react-native-skills`. The table lists directory names. Commit hashes in this document are short provenance IDs, not pins. To pin an install use `owner/repo#<branch, tag, or full hash>`; after `@`, only a dotted version tag or a full hash is read as a pin, and anything else (`@v1`, a short hash) is read as a skill name and silently installs the default branch. Check the commit in `skills-lock.json` afterwards.

| Skill | What it does | Shape | Verdict |
| --- | --- | --- | --- |
| `react-best-practices` | 70 React/Next.js performance rules in 8 impact-ordered categories | pack | **Indexed, mostly linked out** after review → `react` (react-performance) keeps the impact order, upstream's rule IDs and titles, and five rules checked here; install upstream for rule text |
| `composition-patterns` | Compound components over boolean props; React 19 notes | pack | **Folded** → `react` (react-composition) |
| `react-view-transitions` | `<ViewTransition>`, transition types, Next.js integration, CSS recipes | pack | **Mostly linked out** after review: `react` (react-view-transitions) keeps only react.dev-checked activation rules and this library's motion positions; install upstream for patterns |
| `web-design-guidelines` | Fetches the Web Interface Guidelines rule file, reviews UI code | wrapper | **Folded** → `interface-review` (code-compliance-sweep) and `web-design` owners |
| `writing-guidelines` | Fetches the Writing Guidelines rule file, reviews docs prose | wrapper | **Folded** → `write-clear-prose` (technical-docs), `ux-writing` |
| `vercel-optimize` | Metrics-first cost/performance audit with gates, claim verification, sanitizers | scripted | Architecture **folded** → `creating-skills`; content is platform ops, link out |
| `react-native-skills` (name `vercel-react-native-skills`) | React Native / Expo rules | pack | Link out; pointer in `react` (nextjs) |
| `deploy-to-vercel` | Detect project state, pick a deploy path, preview by default | workflow | Link out |
| `vercel-cli-with-tokens` | Token-based CLI use | workflow | Skip (platform ops) |

### vercel/next.js — `npx skills add vercel/next.js --skill <name>`

`next-dev-loop`, `next-bundle-optimizer`, `next-cache-components-adoption`, `next-cache-components-optimizer`, `next-partial-prefetching-adoption`, `next-partial-prefetching-optimizer`. All workflows. Verdict: link out through the chooser in `react` (nextjs). Reference knowledge (`next-best-practices`, `next-upgrade`) is no longer a skill: it ships as bundled docs and a generated agent rules file.

### vercel-labs/skills — `npx skills add vercel-labs/skills --skill find-skills`

| Skill | Verdict |
| --- | --- |
| `find-skills` (search skills.sh, vet by installs/source/stars) | Gate **folded** as a first filter only → `creating-skills` (skill-delivery-patterns), with the stricter local intake rules on top |
| `pr-labeling`, `triage` | internal, skip |

### vercel/ai — `npx skills add vercel/ai --skill ai-sdk`

| Skill | Verdict |
| --- | --- |
| `use-ai-sdk` (name `ai-sdk`): "never write SDK code from memory; read the bundled docs" | Pattern folded → `creating-skills`; install upstream for SDK work |
| `migrate-ai-sdk-v6-to-v7` | Link out; version-bound, would expire here |
| `adr-skill` | Parked → candidate for `working-with-ai` (agents consult the ADR index before architectural changes) |
| 9 contributor skills (`add-provider-package`, `major-version-mode`, …) | internal, skip |

### vercel-labs/portless — `npx skills add vercel-labs/portless --skill portless`

`portless` (stable named `.localhost` URLs, worktree prefixes) and `oauth` (why providers reject `.localhost` subdomains). Parked → candidate for `working-with-ai` (agentic-coding): named dev URLs per worktree so parallel agents do not guess ports. Single source for a single tool.

### vercel-labs/json-render — `npx skills add vercel-labs/json-render --skill <name>` (add `--rename json-render-<name>` for the generic ones)

About 33 skills: `core`; 14 renderer skills (`react`, `vue`, `svelte`, `solid`, `next`, `react-native`, `ink`, `react-pdf`, `react-email`, `remotion`, `chat`, …); component kits; 4 state adapters; tooling (`devtools`, `codegen`, `directives`, `yaml`, `mcp`); two vendored third-party skills. Verdict: link out. The generic names collide with other skills (`core`, `react`, `mcp`); use `--rename`. Parked → candidate for `ai-experience-design`: catalog-constrained generative UI (the model emits a spec against a developer-defined catalog, never code; stream patches; validity is not authorization).

### Other Vercel repositories (screened by frontmatter and outline)

| Repository | Skills | Verdict |
| --- | --- | --- |
| vercel/vercel-plugin `8a9039d` | 39 product skills + 6 contributor skills; installs as a plugin | Skip content (Vercel platform). Vendored-upstream-plus-overlay layout noted in `creating-skills` |
| vercel/vercel `155eacf` | `vercel-cli`; contributor skill `cli-ux` | **`cli-ux` folded (follow-up pass)** → `devtools` (devtool-interface-design: cli-for-humans-and-agents). `vercel-cli` is platform ops: skip |
| vercel/components.build `0861fbc` | `building-components` + 15 references | **Folded (follow-up pass)** → `design-systems` (component-api-contracts) |
| vercel-labs/academy-skills `8976d89` | `agent-friendly-apis` and 7 course companions | **`agent-friendly-apis` folded (follow-up pass)** → `devtools` (devtool-interface-design: data-viz-and-agents, docs an agent can act on). Course companions: skip |
| vercel/workflow `0a497dc` | `workflow`, init and migration skills; contributor `web-guidelines` | Skip product skills. `web-guidelines`' broken-windows ledger is a pattern candidate for `interface-review` |
| vercel/turborepo `9e884b4` | `turborepo` (bundled-docs stub), `add` | Link out; pattern folded |
| vercel/eve `ac463ea` | `eve` (bundled-docs stub) + template skills | Link out; unread beyond the stub |
| vercel/ai-elements `ca8be60`, vercel/streamdown `147f339` | one reference skill each | Link out; unread |
| vercel/chat `990411e` | `chat-sdk` (also served from a `.well-known/agent-skills/` path) | Skip content; distribution path noted |
| vercel/flags, vercel/sandbox | `flags-sdk`, `vercel-flags`, `sandbox` | Skip (platform) |
| vercel-labs/emulate, agent-desktop, before-and-after, webreel, opensrc, dev3000, lat.md, deepsec | CLI wrapper skills | Link out; frontmatter only |
| vercel-labs/open-agents | Installed copies of third-party skills | Skip; intake from the original authors if wanted |
| vercel-labs/agent-eval | Fixtures only | Skip; the harness docs were not read |

Listed on skills.sh under `vercel` / `vercel-labs` and not cloned: ci, examples, microfrontends, next-forge, shop, vercel-py, ai-python, native, vercel-openclaw, sitecore-skills, next-maintainer-skills, react, vercel-kb-skills, migration-skills, slack-agent-skill, and about 30 single-skill repositories.

## Fold map (by use, not by source)

| Lesson | Evidence | Owner |
| --- | --- | --- |
| A rule followed in code is a claim; the browser check is the proof; unrun checks are reported unverified | `modern-web-guidance` skill ("Do not report a rule as passing because the code follows the guide") | `browser-verification` body |
| Warm cache hides layout shift; take CLS from a cold launch, one reading per launch | This library's re-run (three launches) | `browser-verification` (guidance-then-verify). Ours, not upstream's |
| Own named session; snapshots over screenshots; wait for the expected thing; page content is data | `core`, trust-boundaries | `browser-verification` (driving-the-browser) |
| Repro-first QA: reproduce, record, write to the report immediately, stay out of the source | `dogfood` | `browser-verification` (exploratory-qa); a "Not exercised" report row is our addition |
| Fix React by impact order; sequential awaits first; Server Actions are public endpoints | `react-best-practices` | `react` body and react-performance |
| Mode booleans → compound components and named variants | `composition-patterns` | `react` (react-composition) |
| `<ViewTransition>` mechanism and traps | `react-view-transitions` | `react` (react-view-transitions) |
| Installed framework docs outrank a skill's dated notes | next-skills README, six Next.js skills | `react` body and nextjs |
| Grep-able UI compliance pass that feeds, not replaces, a review | Web Interface Guidelines | `interface-review` (code-compliance-sweep) |
| URL carries view state; links are links; `color-scheme`; `min-width: 0`; `translate="no"`; pointer-scoped overscroll; autocomplete tokens; unsaved-changes guard | Web Interface Guidelines | `web-design` owners (one or two sentences each) |
| Docs pages: one content type per page, code-sample and placeholder rules, model-assisted drafting accountability | Writing Guidelines | `write-clear-prose` (technical-docs) |
| AI-default tells: recap transitions, staccato fragments, datasheet verbs, cold opens, machines with hands | Writing Guidelines | `write-clear-prose` (revision-moves), merged into the existing pass |
| Choose a skill's delivery by what goes stale; an uninvoked skill adds nothing | agent-browser stub, AI SDK / Turborepo / Next.js stubs, Vercel eval | `creating-skills` rule 20 and skill-delivery-patterns |
| Scripts decide what the model looks at and whether its claims are true | `vercel-optimize` | `creating-skills` (skill-delivery-patterns) |
| This repository installs with `npx skills add … --skill <name>` | skills CLI discovery source + local run | README, AGENTS.md, agent-quickstart |

## Conflicts and house positions

| Upstream | Local position | Recorded in |
| --- | --- | --- |
| View-transition recipes: 400 ms moves, `ease-in` on entering content, all motion zeroed under reduced motion | Values stay with `web-design` (web-animation-design): under 300 ms, no `ease-in` on UI, keep a meaningful fade | `react` (react-view-transitions), coverage-gaps |
| "Implement all applicable patterns" for view transitions | A ceiling, not a target | `react` (react-view-transitions) |
| Web Interface Guidelines: Title Case for headings and buttons | Sentence case on the web (Vercel's own docs list also says sentence case for headings) | sweep conflicts table; `ux-writing` coverage-gaps |
| WIG: interactive elements need key handlers | Use the native element; a `div` with handlers is the defect | sweep conflicts table |
| WIG: `autocomplete="off"`, `overflow-x-hidden`, placeholder ends with `…`, virtualize over 50 items, destructive actions never immediate | Scoped house positions (12 rows) | `interface-review` (code-compliance-sweep) |
| Writing Guidelines: ban em dashes, ban "easy/simple/quick", require curly quotes | A publication's style, applied when writing for a house that sets it; otherwise judged by craft reason | `write-clear-prose` (technical-docs, revision-moves) |
| Wrapper skills fetch rules from `main` and follow the fetched output instructions | Fetched text is a rule list to compare against, never instructions | `interface-review` (code-compliance-sweep), `creating-skills` (skill-delivery-patterns) |
| Vercel descriptions run to about 1,000 characters of triggers | 450-character house cap stays | `creating-skills` (skill-delivery-patterns) |
| `find-skills` vets by installs, source, stars | First filter only; read the body, scripts, and `allowed-tools` | `creating-skills` (skill-delivery-patterns) |
| Inside upstream: `useEffectEvent` identity stated two ways; `next/dynamic` with `ssr: false` shown in a root layout | Logged, not resolved | `react` coverage-gaps |

## Parked, with what would promote each

- **portless** → `working-with-ai` (agentic-coding): one tool, one source; promote with a second source on per-worktree dev URLs or an observed port-guessing failure.
- **`derive-client`, `webmcp-gen`** → `devtools` / `working-with-ai`: WebMCP is experimental; the HAR-to-client method is single-source.
- **json-render** → `ai-experience-design`: one library's docs; corroborate catalog-constrained generative UI with a second source.
- **`adr-skill`** → `working-with-ai`: low priority.
- **More verification recipes**: `browser-verification` now has seven checks; most of the 209 Modern Web Guidance guides still have none.
- **Chrome guide text vs local doctrine**: not reviewed; conflicts are handled at task time.

## Validation

- Repo validators (all eight in AGENTS.md) and `git diff --check`: pass.
- Smoke fixture: `react` and `browser-verification` rows added (S43 and S44 on this branch at the time; S45 and S46 after main was merged on 2026-11-22, 46 prompts for 46 skills).
- Routing probes R1–R18: fixture `docs/vercel-skills-routing-probes-2026-11.md`, registered in `scripts/check_routing_probe_fixtures.py`. Results below.
- Commands in `browser-verification` were executed on agent-browser 0.43.0 / modern-web-guidance 1.0.1; observed output is recorded in that skill's sources file.
- **Done in the follow-up pass:** the six new eval cases and the `write-clear-prose` re-run (one run per arm), and the sweep's patterns on a real repository. See "Follow-up pass".
- **Still not done:** `npx skills add` against the GitHub remote (local path only); replacements for the three eval cases that did not discriminate. The two eval-driven fixes were re-run after a review (dogfood 5/5 against 1/5; composer 5/6 against 4/6 with one new gap); see the re-runs table in `docs/skill-evals-2026-11.md`.
- **Eighth review fixes (2026-11-22):** iframe CLS measured through the frame's own window (or reported unverified), reduced-motion check lists running animations, session names carry a run suffix, the sweep's label row separates unnamed from unlabeled, and three `react` wording fixes. Details in `docs/skill-evals-2026-11.md`.
- **Paraphrase cut (2026-11-18, maintainer-approved):** react-performance reduced to the impact order, a generated index of upstream rule IDs, and five rules checked here; the Next.js workflow-skill table reduced to a one-line chooser. The three `react` eval cases scored 15/15 with the cut skill.
- **Seventh review fixes (2026-11-18):** CLS verdicts are scoped to the top document; the nested-fetch example regained its outer `Promise.all`; the Next.js Cache Components and Partial Prefetching notes were removed in favor of the installed guides; the sweep's label row skips hidden inputs and accepts native names; the flat bundle eval was swapped for a nested-fetch regression guard. Details in `docs/skill-evals-2026-11.md`.
- **Sixth review fixes (2026-11-18):** the CLS example waits on rendered content, not a static heading; react-view-transitions cut to a short react.dev-checked file; react-performance categories 7–8 replaced with a pointer; sweep label and date rows corrected; `next/image` LCP advice clarified; a vacuous composer grader replaced. Details in `docs/skill-evals-2026-11.md`.
- **Fifth review fixes (2026-11-18):** the CLS reading fails closed when content is missing; `default="none"` advice narrowed to match React's reference; pointer-target query, sweep command paths, cached-read retry, memoization claim, and the Skills CLI nested-layout fallback corrected; the sweep's focus-ring filter removed. Details in `docs/skill-evals-2026-11.md`.
- **Fourth review fixes (2026-11-18):** the CLS recipe waits for late content before scoring and keeps one session per reading; the flat CLS eval case was replaced by one built from that failure; `ssr: false` and module-scope read advice corrected in react-performance; two sweep patterns corrected; `next/image` `priority` updated. Details in `docs/skill-evals-2026-11.md`.
- **Third review fixes (2026-11-18):** CLS verdicts use unrounded windowed values; the dialog check tests Tab and Shift+Tab containment; the sweep's focus-ring filter no longer hides `focus:outline-none`; the waterfall graders fail unhandled promises and sequential auth/config. `react/SKILL.md` was trimmed of rules the baseline already follows, on the maintainer's steer. Details in `docs/skill-evals-2026-11.md`.
- **Second review fixes (2026-11-18):** CLS verdicts use the largest session window (`vitals` prints the sum); upstream install commands use frontmatter names (`vercel-react-best-practices` and siblings) and pins need a tag or full hash; the waterfall example no longer leaves a started promise unhandled; the keyboard recipe reads `aria-activedescendant`; CLS session names are derived; the sweep defaults to its dated snapshot. Each defect was reproduced before the fix; details in `docs/skill-evals-2026-11.md`.
- **Review fixes (2026-11-18):** the agent-browser guide for protected deployments is served as `protected-vercel-deployments`, not `vercel` (the source directory name); the keyboard check no longer treats every missing Tab stop as a failure (radio groups and other composite widgets use arrow keys); QA session names are derived per worktree; two eval graders tightened and one added.

## Routing probes

Fresh descriptions-only judge (new subagent, no forked context, 2026-11-18) read only the packet from `python3 scripts/check_routing_probe_fixtures.py --packet docs/vercel-skills-routing-probes-2026-11.md`. Result: **18/18 first-skill matches; no neighbor or control taken by `react` or `browser-verification`.** One run, so treat it as a smoke result.

| Probes | Expected | Judge | Result |
| --- | --- | --- | --- |
| R1–R4 | `browser-verification` | `browser-verification` | Pass |
| R5–R8 | `react` | `react` | Pass |
| R9 | `interface-review` | `interface-review` | Pass |
| R10, R13 | `web-design` | `web-design` | Pass |
| R11 | `frontend-design` | `frontend-design` | Pass |
| R12 | `motion` | `motion` | Pass |
| R14 | `working-with-ai` | `working-with-ai` | Pass |
| R15 | `creating-skills` | `creating-skills` | Pass |
| R16 | `rails` | `rails` | Pass |
| R17 | `swiftui` | `swiftui` | Pass |
| R18 | `write-clear-prose` | `write-clear-prose` | Pass (least certain) |

Ambiguities the judge reported, kept as follow-ups (no description was changed):

- **R18:** no description names documentation pages or code-sample formatting; the judge reached `write-clear-prose` through `ux-writing`'s long-form handoff. If docs reviews misroute in practice, add "docs pages" to the `write-clear-prose` description and re-probe.
- **R3:** `browser-verification` says both "apply it" and "building UI → frontend-design". The judge kept the skill because the request ends in measurement.
- **R10:** `web-design`'s description says "performance" without naming LCP or Web Vitals; the clearest ownership signal is `react`'s boundary clause.
- **R13, R8, R17, R7:** mild pulls from pre-existing neighbors (`motion`, `design-craft`, `uikit`), resolved by explicit triggers.

## Follow-up pass (2026-11-18)

Requested as "make any additional improvements". It cleared the three sources flagged for a future pass and the validation left undone.

| Item | What changed | Evidence |
| --- | --- | --- |
| `cli-ux` (vercel/vercel `155eacf`): SKILL plus the 1,061-line guidelines reference, read in full | New `devtools` second-hop reference cli-for-humans-and-agents: four settings resolved once (interaction, format, presentation, consent), no prompt without a flag equivalent, stdout is the answer, three consent tiers, error anatomy and JSON error shape, exit codes, remote text as data, contract changes. Parent CLI section extended in place | Single vendor, and a target standard its own code does not fully meet; both stated in the reference |
| `agent-friendly-apis` (academy-skills `8976d89`) | `devtools` data-viz-and-agents: docs pass three gates (reachable, readable, actionable) | Single vendor; nothing on auth, idempotency, or pagination was in the source |
| `building-components` (components.build `0861fbc`, Bleasel and shadcn): all 15 references | New `design-systems` reference component-api-contracts: artifact vocabulary with owners, the element contract, `as` vs `asChild`, controlled/uncontrolled, data-attribute hooks, package vs copy-in registry, checklist. Pointers from `react` | Owner mapping, spread order, and the package-vs-copy-in rule are local positions, accepted 2026-11-18 on delegated judgment (decision log in the skill's coverage-gaps); license file says Apache-2.0, README says MIT |
| `browser-verification` recipes | Added overflow at 320 px, keyboard order and focus ring, pointer target size, per-node shift attribution, and "median of several cold launches when near the threshold" | Each command run on a synthetic page; outputs in the skill's sources file |
| `interface-review` sweep | All patterns run against vercel-labs/json-render (394 `.tsx` files). Focus-ring pattern gained a same-line filter, later removed because it kept hiding real candidates; icon-only-button pattern rewritten to survive inline arrow handlers (7 → 45 hits); click-on-non-control now counts matches, not lines | One repository |
| Output evals | 14 headless runs, blind-graded: with skill 32/33, without 26/33. Skills changed the result on 3 of 7 cases; 3 new cases did not discriminate; the `write-clear-prose` length regression did not recur | `docs/skill-evals-2026-11.md` addendum |
| Eval-driven fixes | exploratory-qa: skip destructive actions instead of stalling on "is this throwaway?". react-composition: inventory what each flag changed before calling a variant done | Not re-run |
| Descriptions | `write-clear-prose` gained "documentation pages"; `design-systems` gained "component API contracts" and "component library" and lost "multi-brand", "icon font", and the adoption phrase to stay under 450 | Probes below |

Conflicts recorded in the follow-up: "variant" means a style prop in components.build and a named component per use case in `react` (scoped: style axis is a prop, mode axis is parts plus named components); the spec's 44 px target minimum against the local 24×24 WCAG floor (local wins); CLI example placeholders against the API-docs rule for runnable real values (scoped by surface); full CLI error detail against generic errors for anonymous actors (scoped by actor).

### Routing probes after the follow-up

One fresh descriptions-only judge read a single packet with all five probe sets and no expected answers: W1–W18, B1–B33, R1–R24, S01–S44, V1–V18 (137 prompts).

- **R1–R24: 24/24**, including the new R19 (`devtools` CLI contract), R20 (`design-systems` component contract), and controls R21–R24 for the two edited descriptions.
- **S01–S44: 44/44**, including S12 (the "multi-brand" smoke prompt still routes to `design-systems`).
- **W and B: all pass.** W18 and B33 came back `none`, which is the pass condition in their notes.
- **V: 17/18.** V9 again went to `working-with-ai` first, the drift already recorded in `docs/vercel-routing-probe-results-2026-06.md`; none of those descriptions were edited here. V12, which had also drifted, matched this time.

One judge, one run. The judge's most-torn list named R10 and R18 again and added nothing involving the edited descriptions except V14 ("DS-to-AI codegen" against `working-with-ai`), which it still routed to `design-systems`.

## Review pattern and scope (2026-11-22)

Fifteen QA rounds, about seventy findings. Sorted by kind rather than by round:

| Kind | Share | Examples | Structural response |
| --- | --- | --- | --- |
| A check that read clean on a broken page | about half | CLS scored early, late, rounded, summed, on the wrong document; reduced motion judged by duration; modal that leaks focus; `body` read for color | Scripts with tests for the two fragile checks; four outcomes instead of "pass"; blind spots listed per check |
| A third-party fact paraphrased wrong | about a third | React rule code, Next.js build behavior and version floors, view-transition rules, Skills CLI selector and pin syntax | Removed, generated from source, or replaced by a discovery command; each remaining fact says whether it was run or read |
| An owner's rule restated wrong in a second place | a few | The sweep's accessible-name and locale criteria | The sweep names owners and stops |
| A new script with only its arithmetic tested, or "unknown" treated as "fine" (round ten) | seven | Frame readiness evaluated in the host, an argument loop, a property allowlist that missed `padding-left`, examples without a session | Three test layers (logic, control flow against a fake tool, real browser on fixtures), measurement instead of a property list, an examples lint |
| An eval grader that rewarded the wrong thing | a few | Vacuous `forwardRef` check, compound assertions, "zero means broken" | Graders rewritten from observed failures; flat cases dropped or kept only as regression guards |

**In scope and delivered:** the catalog with a verdict per skill; `browser-verification` as the tweet's workflow (guidance, then evidence from a real browser) with its two fragile checks scripted; `react` as an impact order, a generated rule index, and the handful of rules verified here; the two Vercel guideline folds; the delivery-patterns reference; the `devtools` and `design-systems` folds.

**Deliberately not in scope:**

- Being a manual for agent-browser, the Skills CLI, React, or Next.js. Those are version-matched upstream; the library points at them.
- Certifying that a page has no motion. After eight designs of the reduced-motion probe, the claim was narrowed: it measures named element targets (never pseudo-elements) and supports "fixed" only for a target it measured moving before the change and not after. Everything else is "not observed" plus a recording.
- A complete instrument for every web check. Overflow, keyboard, and target-size reads are described with their blind spots, not certified. Screen readers, real devices, cross-origin frames, INP, field data, and JavaScript-driven animation are reported unverified.
- A full eval suite at one wording. Cases were run singly as the skills changed; the latest runs per skill are in `docs/skill-evals-2026-11.md`. The reviewer could not re-run them (no model access in its environment), so those scores are this session's.
- Line-by-line verification of the single-vendor design references (`devtools` cli-for-humans-and-agents, `design-systems` component-api-contracts, `write-clear-prose` technical-docs). They are judgment guidance labeled with their source, not instruments or fact tables, and review found nothing in them; they were not re-audited.

## Reconciled with main (2026-11-22)

While this branch was open, main merged a separate intake of the skills.sh Design topic that folded two of the same Vercel sources:

- **Web Interface Guidelines.** Main added `interface-review` (code-pass-checklist), pinned to an upstream revision, covering the rules by owner, the disagreements, and the output format. This branch's `interface-review` (code-compliance-sweep) covered the same ground. Kept: main's checklist as the one write-up, and the sweep reduced to what the checklist lacks, the tested ripgrep commands for its grep step. Where this document says the guidelines were folded into code-compliance-sweep, read code-pass-checklist for the rules and code-compliance-sweep for the commands.
- **`vercel-composition-patterns`.** Main summarized it in `design-systems` (field-notes) from the design-system side; this branch has the React mechanics in `react` (react-composition). Both stay, each pointing at the other.
- Main's expanded form rules in `web-design` (form-design) replaced this branch's unsaved-changes sentence; the autofill naming rule from this branch was kept.
