# Sources

Provenance map for the `browser-verification` skill. Catalog of every Vercel skill screened in the same pass: `docs/vercel-skills-source-mining-2026-11.md` at the repository root.

## Trigger

- **Chris Tate (Vercel Labs), X post, 2026-11-17**, https://x.com/ctatedev/status/2122816672625275030 — announces agent-browser's `modern-web-guidance` skill: the agent looks up Chrome's Modern Web Guidance, applies it, then checks the result in a real browser (layout shift, reduced motion, dark mode, dialog focus). The attached image shows `vitals` reporting CLS 0.14 → 0 after adding image dimensions and `contain-intrinsic-block-size`.

## Primary sources

- **vercel-labs/agent-browser** (Apache-2.0), https://github.com/vercel-labs/agent-browser, read 2026-11-18 at `deda8ef`; CLI 0.43.0 installed and run. Skills read in full: the installable discovery stub (the repository's `skills/agent-browser` directory) and the CLI-served `modern-web-guidance`, `core`, and `dogfood` skills with dogfood's issue taxonomy and report template. Core references read: trust-boundaries, session-management (part), video-recording (part), commands (targeted: `vitals`, `set media`, `a11y`, React commands, console/errors). Skimmed for the routing table only: `electron`, `protected-vercel-deployments` (source directory `vercel`), `vercel-sandbox`, `agentcore`, `derive-client`, `webmcp-gen`, `slack`.
- **Chrome, Modern Web Guidance**, https://developer.chrome.com/docs/modern-web-guidance — CLI `modern-web-guidance` 1.0.1 run 2026-11-18 (`--help`, `list` returning 209 guides, `search`). Individual guide texts were not folded into this library; the skill retrieves them at task time.

## What this library re-ran (2026-11-18)

A local test page (slow, unsized hero image; a modal `<dialog>` with a scale-and-fade transition; `light-dark()` colors) and a fixed variant, served on localhost, driven with agent-browser 0.43.0 and Chrome 158 on Linux:

| Check | Observed |
| --- | --- |
| `vitals`, unfixed page, first load after launch (`--args "--disk-cache-size=1"`, three launches) | `cls: 0.02`, `lcp` about 650 ms, one `entries` item at about 656 ms |
| `vitals`, unfixed page, repeat load in the same browser (three launches) | `cls: 0`, `lcp` equal to `fcp` (about 30–50 ms) |
| `vitals`, fixed page (image `width`/`height`), first load after launch | `cls: 0`, `lcp` about 644 ms |
| `set media reduced-motion` + computed `transitionDuration`, unfixed / fixed | `0.3s` under both preferences / `0.1s` reduced, `0.3s` default |
| `set media dark` / `light` + computed body background | `rgb(17, 17, 17)` / `rgb(255, 255, 255)` |
| Dialog: snapshots, `activeElement`, background click, `Esc` | Open snapshot listed only Cancel and Delete; focus on the `autofocus` button; background click failed with "covered by `<dialog>`"; focus returned to the trigger |
| `a11y` on the test page | axe-core 4.12.1 report with two landmark violations |
| Viewport 1280 → 320 on a second page with a `min-width: 420px` card | `scrollW` 1280 = `w` 1280; then `scrollW` 454 vs `w` 320, offender list `["div.card"]` |
| Five `press Tab` stops, reading `activeElement` | Order Skip → OK → No ring → Close → Search; `:focus-visible` true on each; the `outline: none` button read `none 3px`, the others `auto 1px` |
| `vitals --json` on a page with shifts at 356 ms and 1,756 ms, then the session-window script in the same session | `score` 0.05 with entries 0.0469 and 0.0039 (the sum); windowed value 0.0469. Confirms a reviewer's report that `vitals` printed 0.13 for two 0.0645 shifts 1.4 s apart |
| Tab ×3 and Shift+Tab ×4 with a dialog open, reading `activeElement` and containment, on the native dialog and on a `role="dialog"` `div` with `aria-hidden` background | Native: Delete → `BODY` → Cancel → …, never a page control. `div`: snapshot listed only its two buttons, but Tab reached the background link and Shift+Tab the opener |
| Score script on a page whose second block arrives at 2.2 s: run 144 ms after `open`, then after `wait --text` plus 1 s | `cls: 0`, no shifts; then `cls: 0.03125` with shifts at 337 ms and 2,237 ms and their moved elements. On a stable page it returned `cls: 0` at once |
| Same script on a page with a static "Reviews" heading and review items arriving at 2.5 s: `wait --text "Reviews"` against `wait --fn` on the item count | `cls: 0` scored at 1,162 ms; `cls: 0.0132` with the shift at 2,565 ms scored at 3,646 ms |
| Host page embedding the late-content page in a same-origin iframe (2026-11-22): `frame "#w"` then `eval "location.pathname"`; host script; script run through the frame's `contentWindow` | `eval` still returned the host path after `frame`; host script `cls: 0`; frame-window script returned the frame's path, `cls: 0.0667`, two shifts |
| Dialog that slides 180 px with only its duration shortened under reduced motion (2026-11-22) | `transitionDuration` `0.1s` reduced; `getAnimations()` right after the click listed `opacity` and `translate`, 100 ms each |
| `session id --scope worktree --prefix task`, twice (2026-11-22) | The same id both times |
| `scripts/cls-reading.sh` (2026-11-22): rendered-items condition; condition never true; no `--ready`; unreachable URL; `--frame` on a same-origin frame; host of the same page; stable page; missing frame | Reading with the 2.5 s shift; `UNVERIFIED` exit 1 (three cases); frame `cls` 0.0667 with the frame's URL; host `cls` 0; `cls` 0; `UNVERIFIED` frame not found. A condition on `body.textContent` matched the string inside an inline script and scored early |
| `scripts/motion-probe.js` under reduced motion on a page with a 50 ms slide plus 200 ms fade, a keyframe animation, and a correctly reduced element, read 600 ms after the click (2026-11-22) | Listed the `translate` transition and the `transform` keyframes as movement; the reduced element showed only `opacity` |
| Painted-surface color read on a page that sets its background on the root (2026-11-22) | `body` transparent in both schemes; walk-up read `html` `rgb(32, 35, 38)` dark, `rgb(246, 246, 245)` light |
| Review round ten, reproduced in `test_browser_integration.py` (2026-11-22): `--frame` with a host element matching the readiness selector; a `padding-left` transition; a 5 s transition read at 300 ms; a URL with a token and fragment | Frame reading includes the late shift and names the frame's document; `moved` with 160 px; `unknown`; no query or fragment in any output |
| Review round eleven, in `test_browser_integration.py` (2026-11-22): a keyframe animation that travels 240 px and returns; a `transform` on `::before`; a `clip-path` wipe; an infinite opacity pulse; a 2 s transition read at 300 ms and again after it ends | `moved` 223 px; `moved` on `div#pseudo::before`; `unknown`; `still` with nothing pending; first read `pending: 1` and still armed, second read `pending: 0` with the record kept |
| Review round twelve, in `test_browser_integration.py` (2026-11-22): a fade whose keyframes both declare `transform: translateX(0)`; a 200 px slide inside an open shadow root; a shadow root attached after arming | `still` with `changing: ["opacity"]`; `moved` 200 px with one root watched; conclusion inconclusive with `shadowRootsNotWatched: 1` |
| Review round thirteen, in `test_browser_integration.py` (2026-11-22): a `::before` whose keyframes translate it while a reduced-motion rule pins `transform: none !important`; a 100 ms fade plus a 200 ms slide delayed 1.5 s, read at 500 ms and again later; a Web Animations API `animate()` call; a same-origin frame with `script-src 'self'` | Reduced: not in `moved` (default run: `moved`); first read `pending: 1` and inconclusive, second read `moved` 186 px; `moved` with `kind: script`; `--ready` reports the CSP and `--ready-selector` returns a reading |
| Review round fourteen, in `test_browser_integration.py` (2026-11-22): a `::before` animating `top` from 0 to 160px while reduced motion sets `position: static`; a `::before` that visibly rotates; a `::before` that only fades | Not in `moved`; `unknown` with `computedGeometryChanged: true`; `still` |
| Review round fifteen (2026-11-22): a page that defines its own `classify()`, `scoreShifts()` and two same-named variables, with both scripts injected; a `--frame` selector and URL carrying a sentinel token | The page's button gave the same result before and after injection and no instrument global remained; the sentinel appeared in neither stdout nor stderr on success or on any failure path |
| Review round seventeen (2026-11-23): a page with 170 small shifts then a large late one, read through `cls-reading.sh` and by evaluating `cls.js` alone | Wrapper: `source: "collector"`, 170 shifts counted, the 0.31 shift present, `good: false`. Scorer alone: error, "150 entries kept, 20 reported dropped", no score. A frame reading also reported `source: "collector"` |
| Buffered `layout-shift` observer after a cold `open` of the unfixed page | One entry: `value` 0.0163 at 657 ms, `moved` `["p", "button#delete-account"]` (the elements below the image) |
| Target-size query | All five controls under 24 px in one dimension were listed (18×18 icon button; default-height buttons, link, and input at 19–21 px), which is why the recipe calls its output candidates |

The cold-cache rule in guidance-then-verify comes from the first three rows. It is this library's observation, not an upstream statement. The session-window rule is also ours (the windowing definition is Chrome's, https://web.dev/articles/cls). The overflow, keyboard, and target-size recipes are also this library's: upstream's skill covers four checks.

## Where the routed references came from

| Reference | Source |
| --- | --- |
| scripts (`cls.js`, `cls-collector.js`, `cls-reading.sh`, `motion-probe.js`) and their tests | Written here. Window rules follow GoogleChrome/web-vitals `LayoutShiftManager` and https://web.dev/articles/cls. Tests: `test_cls.py` (scorer arithmetic and motion classification, Node), `test_cls_wrapper.py` (wrapper control flow and the no-echo rule against a fake `agent-browser`), `test_isolation.py` (neither script defines or replaces a global, Node `vm`), `test_docs_examples.py` (examples name a session and a resolved script path), `test_browser_integration.py` (fixture pages in a real browser; skipped without agent-browser). 66 tests passed here on 2026-11-23, the twenty-four browser ones on agent-browser 0.43.0 |
| guidance-then-verify | agent-browser `modern-web-guidance` skill; `commands` reference; the re-run above |
| exploratory-qa | agent-browser `dogfood` skill, its issue taxonomy and report template |
| driving-the-browser | agent-browser `core` skill; trust-boundaries and session-management references; the discovery stub |

## Local neighbors checked for overlap

`interface-review` (runtime inspection and third-party scanner vetting), `web-design` (web-performance, web-accessibility, web-animation-design), `design-craft` (linear-product-craft dogfood loops, polish-principles layout stability), `working-with-ai` (agentic-coding: agents self-verifying frontend work in a browser).
