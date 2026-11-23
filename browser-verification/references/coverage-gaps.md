# Coverage Gaps

Uncertainty kept out of the router body.

## Candidate gaps

- **Single vendor, single tool.** Every operating rule comes from one project's own skills (Vercel Labs' agent-browser). The evidence loop is tool-neutral, but the commands are not, and no second browser driver (Playwright, Chrome DevTools MCP) has been written up to the same level.
- **Version pin.** Commands were run on agent-browser 0.43.0 and modern-web-guidance 1.0.1 on 2026-11-18. agent-browser releases often and serves its own version-matched guide; when this skill and `agent-browser skills get core` disagree, the CLI is right and this skill needs a re-read.
- **Cold-cache rule rests on one test page.** The "repeat load reports `cls: 0`" observation was reproduced across three launches on one localhost page with one slow image. Not tested: font-swap shifts, late-injected content, a production build behind a CDN, service workers, or whether a different cache flag is the better recipe. `--disk-cache-size=1` is a Chrome flag passed through `--args`, not a documented agent-browser feature.
- **CLS script.** `cls-reading.sh` has unit tests for its arithmetic, control-flow tests against a fake `agent-browser`, and browser tests on fixture pages that run only where agent-browser is installed (not in CI). The collector depends on agent-browser's `--init-script` running in every document before page scripts (seen for the top document and a same-origin frame on 0.43.0); the 150-entry buffer limit is what this Chromium build showed, and the fallback also trusts the browser's dropped-entries count. Not checked: shifts after user input on a real page, a window longer than 5 s on a real page, cross-origin frames (reported unverified by design), `--frame` readiness on a frame that navigates after load. A `--ready` expression cannot run in a frame whose CSP forbids eval; `--ready-selector` is the supported path there. If a later agent-browser changes `eval`, `wait --fn`, or `session id`, run `test_browser_integration.py`.
- **Keyboard recipe and `aria-activedescendant`.** The instruction to read `aria-activedescendant` in listboxes and comboboxes follows the W3C pattern and a reviewer's test; this library ran the radio-group and plain Tab cases only.
- **Lab numbers only.** `vitals` measures one load on the agent's machine. Nothing here covers field data (CrUX, RUM) or how a lab CLS relates to it. INP is not measured by any recipe in this skill.
- **Two scripted checks, the rest are reads.** Layout shift and motion have scripts. Color scheme and dialog have tested snippets. Overflow, keyboard, and pointer targets are described with their blind spots, not shipped as code. Most of the 209 Modern Web Guidance guides have no check here.
- **The motion probe measures rendered boxes of what the browser lists; its claim is per target.** Each frame it reads the browser's animation list (document and open shadow roots; CSS transitions, CSS animations, Web Animations API; delayed ones included) and measures each element's box and its contents' box. `moved` is only ever that measurement. Pseudo-elements cannot be measured, so their animations are `unknown` unless they only fade or recolor. It does not see `requestAnimationFrame` or direct style writes, closed shadow roots, cross-origin frames, or sub-frame animations; movement that changes no box is `unknown`. Eighteen fixture cases on one page, one browser version. This is the eighth design; treat a clean result as "not observed" unless the same target was measured moving before the change.
- **Output disclosure.** The scripts do not echo their inputs, and URLs are rebuilt from a parse as scheme, host, port and path. The path is kept, so a token placed in a path segment would still be printed. They do print things the page controls: element tag names and ids in `moved` and probe targets, and the scored document's path. A page that puts a secret in an element id or a path segment would have it quoted. Snippets a reader writes for `eval` are not covered by the isolation or no-echo tests.
- **Blind-spot lists are what review found, not a proof of completeness.** Nine review rounds each found a new way for a recipe to read clean on a broken page. The outcome vocabulary ("not observed under …") is the mitigation; expect more blind spots.
- **Guide text not reviewed.** This library has not read the Chrome guides against local doctrine in `web-design`. Conflicts are handled at task time ("follow the project's convention and say so"), not resolved in advance.
- **Screen readers and real devices.** No recipe drives VoiceOver, NVDA, or a physical phone. Those claims stay "unverified" in reports.
- **Exploratory QA has no local exemplar.** The method is distilled from upstream's skill; no dogfood report produced with this library has been reviewed and kept as an example. Recording (`record start`) was not exercised in the re-run (no `ffmpeg` check was made).
- **Not exercised:** auth vault, cookie import, `--allowed-domains`, WebMCP, saved flows, Electron, Vercel deployment protection, cloud browsers. They are described from upstream text only.
- **Output evals: few runs.** History in `docs/skill-evals-2026-11.md`. Latest run, all three cases at the 2026-11-22 wording: 14/14 with the skill against 6/14 without. One run per arm.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Tool and version it was run on:
Page or project it was run against:
Observed output (quoted):
Rule:
Exception:
Status: proposed | accepted | rejected
```
