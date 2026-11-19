# Coverage Gaps

Uncertainty kept out of the router body.

## Candidate gaps

- **Single vendor, single tool.** Every operating rule comes from one project's own skills (Vercel Labs' agent-browser). The evidence loop is tool-neutral, but the commands are not, and no second browser driver (Playwright, Chrome DevTools MCP) has been written up to the same level.
- **Version pin.** Commands were run on agent-browser 0.43.0 and modern-web-guidance 1.0.1 on 2026-11-18. agent-browser releases often and serves its own version-matched guide; when this skill and `agent-browser skills get core` disagree, the CLI is right and this skill needs a re-read.
- **Cold-cache rule rests on one test page.** The "repeat load reports `cls: 0`" observation was reproduced across three launches on one localhost page with one slow image. Not tested: font-swap shifts, late-injected content, a production build behind a CDN, service workers, or whether a different cache flag is the better recipe. `--disk-cache-size=1` is a Chrome flag passed through `--args`, not a documented agent-browser feature.
- **CLS script: three pages, one machine.** The cold-open, wait, score script was run here on a late-content page (zero when scored at 144 ms, two shifts after waiting), the unsized-image page, and a stable page. The rounding case (0.103125 shown as 0.10) and the exactly-1,000 ms window boundary come from a reviewer's test and Chrome's web-vitals source. Not checked: shifts after user input, a window longer than 5 s, pages where nothing marks the late content as arrived, and running the script inside an iframe (the top-document-only limit comes from a reviewer's test and Chrome's CLS notes).
- **Keyboard recipe and `aria-activedescendant`.** The instruction to read `aria-activedescendant` in listboxes and comboboxes follows the W3C pattern and a reviewer's test; this library ran the radio-group and plain Tab cases only.
- **Lab numbers only.** `vitals` measures one load on the agent's machine. Nothing here covers field data (CrUX, RUM) or how a lab CLS relates to it. INP is not measured by any recipe in this skill.
- **Seven checks, 209 guides.** Recipes exist for layout shift, reduced motion, color scheme, dialog focus, narrow-width overflow, keyboard order and focus ring, and pointer target size (the last three are this library's, each run once on one synthetic page). Most Modern Web Guidance guides (container queries, anchor positioning, view transitions, popovers, forms, on-device AI) have no verification recipe here yet.
- **Guide text not reviewed.** This library has not read the Chrome guides against local doctrine in `web-design`. Conflicts are handled at task time ("follow the project's convention and say so"), not resolved in advance.
- **Screen readers and real devices.** No recipe drives VoiceOver, NVDA, or a physical phone. Those claims stay "unverified" in reports.
- **Exploratory QA has no local exemplar.** The method is distilled from upstream's skill; no dogfood report produced with this library has been reviewed and kept as an example. Recording (`record start`) was not exercised in the re-run (no `ffmpeg` check was made).
- **Not exercised:** auth vault, cookie import, `--allowed-domains`, WebMCP, saved flows, Electron, Vercel deployment protection, cloud browsers. They are described from upstream text only.
- **Output evals: few runs.** History in `docs/skill-evals-2026-11.md`. Latest single runs: dogfood 5/5 against 1/5, injection 4/4 against 3/4, `cls-scored-before-content-settled` 5/5 against 4/5 (the gap is one assertion, cold load per reading).

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
