# Sources

## Primary

- **Stageshow**, Benji Taylor. Repository `benjitaylor/skills`, folder `stageshow/`, commit `299140f`, skill metadata version 1.1.1. MIT (code and text). Read in full on 2026-11-18: `SKILL.md`, both READMEs, the notices file, and the references `craft`, `framing`, `motion`, `bento`, `choreography`, `looks`, `backgrounds`, `products`, `review`, `verify`. Read in part: `teaching` (all sections, long lines truncated), `rehearse` (through the film-line tables), `annotations` (through "Show the cause"), `brands` (through the registry table), `kit` (headings only).
- **"Stageshow"**, benji.org/stageshow, 31 October 2026. The author's account of what the skill is for, how it was developed, and its limits.
- Reached through Meng To's list of design skills (x.com/MengTo/status/2122984275566076395, 18 November 2026) and the quoted launch post (x.com/benjitaylor/status/2116593247854453244).

## What was taken and what was not

- **Taken, in this library's words:** the one-idea test and five failure modes, the seven-step workflow, the restraint, type, spacing, icon, color and chrome rules, the twenty framing rules and seventeen layouts, the motion rules, the bento rules, the look-mapping method, the rehearsal method, the fault names, and the review brief.
- **Not vendored:** the React kit (`kit/`), the 71 example folders, the teaching pairs, the playground, and the scripts (`film.mjs`, `jumps.mjs`, `layout.mjs`, `class-clash.mjs`). None of it is copied into this skill. The kit and its film script were installed and run here to build two comparison scenes (Local comparison, below), and the scripts, lockfile, and configs had a static security read (Security read, below). The skill tells the reader to install upstream and to review it.
- **Not taken:** the kit's API surface (component and prop names, the `Act` script API, token names beyond the group list). Those belong to the installed version and change with it.
- **Carved out by upstream's notice:** app icons taken from app bundles are not covered by the MIT license; the brand-mark registry carries its own per-file licenses (MIT, Apache 2.0, CC0, and official assets), with brand usage terms remaining with the owners; the license grants no trademark rights in product names and marks.

## Security read

A static read of the upstream folder at `299140f` on 2026-11-18 (nothing installed or run) found no malicious behavior: no `fetch`, XHR, WebSocket, telemetry, `eval`, or remote import anywhere in the kit, examples, teaching pairs, playground, or scripts, and every lockfile entry resolves to the npm registry with an integrity hash. What a cautious user should know:

- **`npm run dev` starts `portless`** (an optional dependency, a third-party local reverse proxy that serves a `*.localhost` name and keeps state in the home directory). Its source was not read. To avoid it, install normally and start Vite yourself instead of `npm run dev`: `npx vite playground --config playground/vite.config.ts`. Do not use `npm install --omit=optional`: on Linux that also drops Rollup's native package, which is an optional dependency, and Vite then fails to start (reproduced in QA on 2026-11-18).
- **The filming scripts drive a real local Chrome** (system Chrome or `CHROME_PATH`, through `playwright-core`, which downloads no browser) to whatever URL they are given, and inject measurement code into that page. Point them only at the local dev server. A label read from the filmed page is written into the contact sheet unescaped, which matters only if the page is hostile.
- **Output paths are not confined to the project.** Keep `--out` and `--report` relative.
- **The dev server allows file serving from the whole skill folder,** on loopback only.
- **Install scripts:** only `esbuild`'s usual binary fetch (and `fsevents` on macOS).

Not read line by line: the larger check modules (`film-checks`, `motion-watch`, the `-core` files), most of the kit and examples (pattern-searched only), and all dependency source.

## This skill's own exemplars

`examples/still-hero.html` and `examples/bento.html` were written for this library on 2026-11-18, for a fictional booking product. They share no code with Stageshow's examples or kit; they were tuned by rendering them beside captures of the upstream gold (`static-card`, `bento`) until type size, density, and tile variety were in the same range, and they follow this skill's rules (word budget, one gutter, only filler under the crop, one window per grid, no name repeated across tiles). They exist because the local comparison below showed that builders working from the rules alone got scale and density wrong. They use no icons, logos, or photographs, so nothing in them needs a license. Limits: two layouts out of seventeen, stills only, light theme only, and tuned on one machine whose fallback sans is Liberation Sans.

## This skill's own script

`scripts/contact-sheet.mjs` was written for this library on 2026-11-18 and shares no code with Stageshow's `film.mjs`. It opens one page, takes clipped screenshots at an interval, and tiles them; it measures nothing and names no faults. A browser smoke test sits beside it (`contact-sheet.test.mjs`, seven cases: element and rectangle crops at a fixed viewport, a narrow viewport, an HTTP 404, a missing element, and loop-length frame counts); it passes on Node 24 with Playwright's Chromium and skips itself where Playwright is absent. The viewport/crop split, the HTTP check, and `--loop` were added after QA found that the first version changed the page's breakpoint when cropping an offset stage, saved a 404 page as a picture, and stopped short of a 16-second loop's seam. It reads only the page it is given and writes only the output file.

## Local comparison: rules alone against the kit

On 2026-11-18 the same two briefs (a 720 × 340 hero for a support inbox, and a five-tile feature bento) were built both ways.

- **Rules alone, plain HTML and CSS,** by a mid-tier model in one pass each (the eval's skill arm). Framing, restraint, and tile planning followed the rules, and the builds beat a no-skill baseline. Beside the upstream gold they were still visibly weaker: UI type at 15 to 19px where the gold uses 11 to 14, bold weights throughout, every bento tile on the same ground, text chips where the gold has real marks, no object or diagram tile, and crop faults at tile edges.
- **Kit path,** by a stronger model with about 25 to 40 tool calls each: film the closest gold, copy its folder, replace look and content, film with `--gate`, fix, repeat four or five times. The bento came out with a dark stat tile, a routing diagram, real integration marks from the kit's registry, and one window; the hero with real-size type, a quiet list, and an Undo toast as the loop's visible reset. (The builds were made twice the same day; the second pair is the one kept, with its sources.) Both gates ended `rehearsal passed`.

The two arms differ in model, effort, and path at once, so this does not isolate the kit's contribution. What it supports: starting from a gold example fixes scale and density, which the rules state and builders working from rules alone still got wrong. Renders are in `docs/evidence/faux-ui-evals-2026-11/` (the `kit-path-` files). The kit-path sources and the commands that rendered them are kept beside the renders (`kit-path/`), under Stageshow's MIT license since they derive from its examples. They are evidence, not part of this skill, and they do not run without the upstream kit.

## How to treat the numbers

Every pixel value, percentage, duration, and curve in this skill is Stageshow's, from one practitioner's kit at one revision. They are internally consistent (the film script enforces many of them) and they came from reviewing real attempts, but no second source corroborates them here. See [coverage-gaps.md](coverage-gaps.md).

The author states the method behind the rules: give a fresh agent the skill and a short prompt, give the same prompt to an agent without it, compare; when something looks wrong, write the problem down, change the skill, and re-run from scratch rather than hand-fixing the output. Two observations from that process shaped this skill's design: rules alone were not enough (an example to copy succeeded where a rule failed), and some rules stop mattering as models improve while framing and motion rules have held.

## Re-check

Stageshow is young and moving (the write-up is from 31 October 2026 and the skill is already at 1.1.1). When this skill is next used in earnest, compare against upstream `SKILL.md` and `references/` and note the revision here. If the installed copy and this text disagree, the installed copy wins at task time.
