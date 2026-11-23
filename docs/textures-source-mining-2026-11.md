# Textures (textures.dev) source mining — 2026-11

Read 2026-11-22. Ticket-driven: "This project looks really cool! We should fold the general ideas and some specific examples into the skills https://textures.dev/".

Outcome: no new skill. One new `ui-fx` reference (`textures.md`), pointers in four `ui-fx` references and `frontend-design` (visual-execution), a second vendor worked example in `devtools` (data-viz-and-agents) with a checklist line, one new eval case, two routing probes, and a trigger swap in the `ui-fx` description.

## What the source is

Textures sells about 40 animated "hover textures": fields of lines, dots, cells or circles that answer the pointer, each a single self-contained React file. Twelve are free and MIT (`Textures-dev/textures`); the rest are Pro. The product is built for coding agents: markdown twins of every page, `llms.txt`, a shadcn registry, an MCP server, a vendor agent skill, and a "Copy to Agent" prompt per item.

## Manifest and coverage

| Source | Fetched how | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| Home page | curl, tags stripped | Yes | Low (marketing, the 12 free names) | Entry point |
| `llms.txt` | curl | Yes | High: catalogue with use-when tags, the three ways in, the paywall rule | textures.md, devtools |
| `llms-full.txt` (403 KB, 40 entries) | curl | Headings and metadata lines of all 40; the Glow and Magnet entries in full; Rails lines grepped | High | Families, measured weights, reduced-motion modes, Pro paywall text |
| `/agents.md` | curl with `Accept: text/markdown` | Yes | High for AX (per-client MCP setup, the rules block) | devtools; textures.md agent-surface section |
| `/skill.md` (vendor skill) | curl | Yes | High: description with "Not for" list, install order, consent protocol | Treated as source material; not installed or imported |
| `/s/beam.md` with `beam.tsx` | curl | Yes, code read in full | High: the engine | Anatomy list in textures.md (ours, from reading) |
| `/r/registry.json`, `/r/beam.json` | curl | Yes | Medium | Registry shape, `docs` field |
| `/api/textures` | curl | Yes (the free set and teaser) | Medium: mood, intensity, aliases | Choosing section |
| `robots.txt` | curl | Yes | — | `/mcp`, `/embed/`, `/api/` disallowed for crawlers; MCP not called |
| GitHub `Textures-dev/textures` | GitHub API, raw | README, CONTRIBUTING, CHANGELOG, tree | High: three props, mount example, generated repo, SHA prefixes | textures.md, devtools |
| Pro code, `/embed/` previews, clips, pricing and terms in full | — | No | — | Paywalled or not needed |
| `/legal/licenses` | curl | 404 | — | Licence taken from the repo's LICENSE (MIT) |
| MCP server | — | No | — | Disallowed in `robots.txt`; tools taken from docs |

## Fold map

| Lesson | Evidence | Owner | Notes |
| --- | --- | --- | --- |
| Hover texture as a category: quiet marks that answer the pointer; atmosphere and touch in one | Catalogue, briefs | `ui-fx` (textures), SKILL.md ladder rung 3, effect-ideation Atmosphere row | Sits at whisper/signature on the dial |
| The 12 free examples, by response | README, `llms.txt`, API | `ui-fx` (textures) | Descriptions rewritten in our words |
| Design-space grid: mark × property × falloff × coupling | Our synthesis across the 40 one-liners | `ui-fx` (textures) | Ours |
| Install routes, the three props, two mounts | README, twins | `ui-fx` (textures) | Subject to this skill's go-ahead rule |
| Size the host, never the Texture | Every twin | `ui-fx` (textures) | Matches glimm's "give a GlimmScope a size" |
| Pro without access: tell the user and stop | `llms.txt`, twins | `ui-fx` (textures), devtools | Same as reverse-engineering's paywall rule |
| Touch ambient mode and the five-second rule | `beam.tsx` engine | `ui-fx` (textures) | Conflict, settled below |
| Engine anatomy: idle costs nothing, one sprung weight, passive reads, design-space viewBox, neighbours make room, focus as hover, reduced-motion snap | `beam.tsx` | `ui-fx` (textures); pointer from control-patterns' proximity field | Ours, from reading the code |
| An original skeleton | Ours | `ui-fx` (textures) | Run once in headless Chromium |
| Markdown twins, ordered ways in, small search-first MCP tool list, registry as install door, SHA provenance, fixed per-item brief with token estimate, paid stop message, consent-gated rules block, commit provenance | `llms.txt`, agents.md, skill.md, repo | `devtools` (data-viz-and-agents worked example; checklist line) | Corroborates Interfere's search-then-act shape in design, not its exact two-tool count |
| Hover-reactive pattern vs static pattern tile | — | `frontend-design` (visual-execution) one-line pointer | Static tiles stay there |

## Conflicts and how they were settled

- **Ambient touch play vs the five-second rule.** The vendor's touch mode runs for as long as the panel is on screen. `ui-fx`'s floor requires automatic motion beside content to stop within five seconds or to have a control. The floor wins for shipped work. The reference gives the remedies read from the code: `data-motion` set to anything other than `ambient` on an ancestor, or the `static` prop behind a reduce-effects switch.
- **"Use as delivered" vs "copy-paste components are your code".** The vendor's rule is to change only the two tokens. Under effect-libraries rule 4 an installed MIT file belongs to the project. Settled: retheme with the tokens, the knob the vendor tuned for. Behaviour changes are allowed, but note them in the commit because a reinstall overwrites them.
- **Which layer is `pointer-events: none` behind content.** The vendor's markdown recipe and its README disagree. Both are documented with their effect. Because the prompt asks for lines that react, eval grader 03 requires the README arrangement: the texture takes the pointer, the content layer is `pointer-events: none`, and the controls are set back to `auto`.
- **Vendor skill's offer to write `AGENTS.md`.** This skill does not make that offer or install the vendor skill. The consent protocol is recorded as a pattern in `devtools`.
- **Licence wording.** The twin says "Free (MIT)" and the file header says "free to use". We rely on the repository's MIT LICENSE.

## Description change

`ui-fx`'s trigger list changed from "make it pop, dazzle, wow, UI FX" to "make it pop, dazzle, hover textures", which keeps the description at 449 characters, under the 450 cap. "UI FX" is the skill's own name, and "wow" was the weakest trigger. Probes X20 (target) and X21 (static-pattern neighbour) were added to `docs/ui-fx-routing-probes-2026-11.md`.

Routing run, 2026-11-22: one fresh descriptions-only judge on the blind packet (X1–X21). 21/21 passed. X20 went to `ui-fx` (second `creative-coding`). X21 went to `web-design`, not `frontend-design`, so `web-design` is now recorded as an accepted first skill; the boundary that matters, keeping `ui-fx` off a static pattern, held. All nineteen earlier probes kept their expected owners.

## Eval run

`ui-fx/evals/hover-texture-hero`, 2026-11-22. One fresh subagent per arm on the session's model, each in an empty directory with web access. The with-skill arm read `ui-fx/SKILL.md` and followed its routing; the baseline read no skill files. Graded by the author against the four graders, not blind.

| Arm | Install, not imitate | Sizes the host | Content still works | Touch ambient handled | Score |
| --- | --- | --- | --- | --- | --- |
| With `ui-fx` | Pass | Pass | Pass | Pass: plays 5 s on touch, then `static`, with a visible Play/Pause button | 4/4 |
| Baseline | Pass | Pass | Pass | Fail: described the ambient play as "works on phones with no extra code" | 3/4 |

The baseline fetched the vendor's docs and got install, mount and pointer-events right on its own. The skill's effect here is the five-second rule on touch, which is what the reference adds beyond the vendor's docs. One run per arm and author-graded, so treat it as a signal and not a measurement.

## QA follow-up (2026-11-22)

- **The skeleton's spring blew up at 30 fps.** It used semi-implicit Euler with `K = 30` and a `dt` capped at 1/30 s, and it diverged at that cap. After 60 frames the weight was about −1e11, and it kept requesting frames. It was replaced with the exact critically damped update (`stepWeight`), which is stable for any `dt`. `ui-fx/examples/snippet-checks/check.mjs` now pulls the snippet out of `textures.md` and checks it at 30, 60 and 120 Hz, with and without a stubbed DOM. The old integration fails that check.
- **The eval let a texture that ignores the pointer pass.** Grader 03 accepted `pointer-events: none` on the texture layer, even though the prompt asks for lines that react. It now requires the texture to take the pointer and the button to stay clickable. Both arms of the earlier run let the texture take the pointer, so their scores stand.

## Parked

- The vocabulary terms `llms.txt` attributes to `/agents.md` (Displace, Clear, Glow, pattern families, fit, Light). Not on the page when read; recheck.
- The "Light" badge budget. Not published.
- Pro Textures' mechanics beyond their one-liners.
- A rendered example page of an original hover texture under `ui-fx/examples/`, with a browser check. Worth adding if hover textures get used often.

## Not done

- No Texture was installed into a project or viewed moving; the skeleton was run once headless.
- The MCP server was not called.
