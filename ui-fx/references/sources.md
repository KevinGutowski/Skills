# Sources

## Contents

- The two posts
- Libraries.dev (Jakub Antalik)
- glimm (Noman Ijaz)
- ittybitty (Blake Cyze)
- holospot (Dmitry Kurash)
- Component kits studied for patterns
- Other libraries
- Platform facts
- Local material this skill builds on
- What is ours

Read 2026-11-18 for a ticket that asked for a skill to help come up with extra-creative UI effects, starting from two X posts. Full manifest and fold map: `docs/ui-fx-source-mining-2026-11.md`.

## The two posts

- Pontus Abrahamsson, X 2122990055199477894 (2026-11-18): "Just use border-beam, thank me later", with a code card showing `npm install border-beam` and `<BorderBeam>` wrapping a composer. Read through VxTwitter; image read.
- Jakub Antalik, X 2122738787667349562 (2026-11-17): distortion waves "now available on desktop React", listing edge glows, anticipation movement, chromatic aberration and particles. Text read; the 13-second video was downloaded and read as frame sheets. The five-beat anatomy in [effect-ideation.md](effect-ideation.md) is our reading of that video plus the package's option names (`anticipation`, `travel`, `linger`, `rimFade`); the beat names and time shares are ours.

Both posts lead to the same author's work.

Added later the same day at the library owner's request:

- Pontus Abrahamsson, X 2123002477226443205 (2026-11-18), quoting his border-beam post with a 5-second video: a dark chat app whose composer border carries a faint, colourless moving light while a "Working" chip shows. Video read as a frame sheet. Used for the intensity dial in SKILL.md, the three-level table in [effect-ideation.md](effect-ideation.md), the subtle-use note in [libraries-dev.md](libraries-dev.md) and the worked reading in [reverse-engineering.md](reverse-engineering.md). That the beam is the mono variant at reduced strength is our reading of the video; the post does not state settings.
- MarceloDesignX, X 2122916755508998416 (2026-11-18): a list of five sites (HorizonX, Grainient, Arc UI, uberdesigner, Bencho) with a video of a component wall. The owner asked for a way to reverse-engineer such previews in place of folding each site in. Each home page and its first linked scripts and styles were fetched and searched for technique signals; no product was installed, bought or read in depth. The component wall in the video matches names on HorizonX's page. Used for [reverse-engineering.md](reverse-engineering.md); the method there is ours.

## Libraries.dev (Jakub Antalik)

- <https://libraries.dev>: `llms.txt`, the seven per-library agent references under `/llms/`, and the pages for waves, voice ring, skill, how-to-use, accessibility, introduction, Magnetic UI and Voice position.
- <https://github.com/Jakubantalik/Libraries.dev> (MIT, pushed 2026-11-18): README, tree, `packages/distortion-waves` (package.json, README), `skills/libraries-dev/SKILL.md`.
- npm registry metadata for all nine package names.

Used for: [libraries-dev.md](libraries-dev.md) (placement rules, the set, traps, reduced-motion table) and the wait-length rows in SKILL.md. The placement rules are the author's, paraphrased. The vendor's skill was treated as source material: its `libraries review/apply/tune` commands and install instructions were not imported, and its "ask before installing" and "never run the skill installer" rules were kept.

Corrections made against the source: the site's accessibility page says every library honours reduced motion, while four of its own references say the developer must handle it; `llms.txt` and the README count seven libraries while the site lists nine; `distortion-waves` was absent from npm when first read on 2026-11-18 and was published as 0.1.0 later that day (confirmed 2026-11-19).

Not read: `llms-full.txt` (duplicate of the seven references), Pro and Studio content (paywalled), package source beyond distortion-waves' file list, the React Native and SwiftUI port code, post replies.

## glimm (Noman Ijaz)

Added 2026-11-18 at the library owner's request.

- <https://glimm.dev>: the page, `llms.txt`, `llms-full.txt`.
- npm `glimm` 0.4.1 metadata, and the published build (`dist/`), checked after a QA note for where reduced motion and missing WebGL are handled: in the React-layer code, not in the core `playSweep` / `createShader`.
- <https://github.com/nomanjack/glimm-skill> (MIT, pushed 2026-11-04): its SKILL.md read through the wiring, in-app and scope sections; its tuning reference (headings and recipes); file tree including its five eval cases.

Used for: [glimm.md](glimm.md), the "let the effect follow the work" and "scale to the change" rules in [effect-ideation.md](effect-ideation.md), and the HTML-in-Canvas and masking notes in [platform-techniques.md](platform-techniques.md). It is a second, independent source for the staged-transition anatomy first read from the distortion-waves video.

The vendor skill opens with a fit check that recommends against installing on dashboards and other high-frequency UIs. That is kept as tuning advice (shorter sweeps, opt-outs), not as a veto, to match this skill's posture. Its "implement glimm and nothing else" scope rule and its install commands were not imported.

Not read: the changelog page, the package source, the skill's React-and-vanilla reference beyond its presence, the eval fixtures' contents, the two blog posts the page links about HTML-in-Canvas.

## ittybitty (Blake Cyze)

Added 2026-11-18 at the library owner's request.

- <https://ittybitty.dev>: home page, `llms.txt` (all 74 one-line summaries), the JSON catalogue (jobs, looks, reach and GPU figures, file lists), the Drop Ripple detail page and its schema, and `raw/runtime.js` (the pause/resume and reduced-motion handling, after a QA note).
- <https://github.com/blakecyze/ittybitty-shaders>: repository metadata only (MIT, pushed 2026-11-09).

Used for: [ittybitty.md](ittybitty.md). The moment → shader table is our mapping from the site's summaries. Behaviour claims (offscreen pause, reduced-motion still frame, WebGL2 fallback, five-layer fusion) are from one detail page and assumed to hold across the library through the shared runtime.

Not read: the other 73 detail pages and schemas, any shader source, the MCP server (not connected), the studio's export for site builders.

## holospot (Dmitry Kurash)

Added 2026-11-18 at the library owner's request, from X post 2122691075890704598 (2026-11-17, "I'm opensourcing holospot materials"; the link was in a reply the public endpoints do not return, so the repository was found by search).

- <https://github.com/dmitrykurash/holospot> (MIT, tag `v0.1.0`): its README, agent manual, how-it-works page, the first part of its frameworks page, and the file tree. npm has no `holospot` package (404).

Used for [holospot.md](holospot.md) and two pointers in [surface-recipes.md](surface-recipes.md). The "what to carry into your own shaders" section is our distillation of the author's how-it-works page. The floor guidance there (reduced motion, pausing, fallback) is ours: the documents read do not describe any.

Not read: the post's 20-second video, the engine source, the per-material and scene-settings docs, the recipes, the schema, the tools. Nothing was run.

## Component kits studied for patterns

Added 2026-11-18 after the library owner asked for the example components to be read and their techniques brought into the toolkit. Three research subagents read, without a browser:

- **Arc UI** (uiarc.dev): `llms.txt`, the registry index and catalogue, and the full source of about thirty free MIT components through `/r/<name>.json`. Pro source was not read.
- **Bencho** (bencho.dev): `llms.txt`, the public bundle (which carries full source for 48 free MIT blocks), and each Pro block's published "how it works" note, knob defaults and CSS. Pro runtime chunks were not fetched.
- **HorizonX** (horizonx.so): public page descriptions, editor control schemas, cover stills, one blog guide and one free component. Obfuscated preview code was not decoded. Its terms restrict using its content in corpora outside licensed projects, so nothing specific to its paid components is reproduced: the dark-card, dial and glow notes are general observations from public stills.
- **uberdesigner** (uberdesigner.ai): the site's own JS and CSS. Template internals are not public (previews are videos); page-level patterns attributed to templates are reconstructions from their public descriptions.
- **Grainient** (grainient.supply): public pages and the shader tool's configuration. Gradient and grain recipes are inferred from thumbnails and general practice; the typical values are estimates.

Used for [control-patterns.md](control-patterns.md) and [surface-recipes.md](surface-recipes.md). The values there are as read from those sources on that date. All code in the two files was written for this library; none is copied. On 2026-11-18 the CSS recipes were rebuilt as a gallery page (`examples/gallery/`), rendered, and compared with screenshots of bencho.dev, uiarc.dev and libraries.dev's border-beam page. The layer structure of the three-layer beam (a stroke, an inner glow and a bloom revealed through an eased conic window, with a slow fade-in) follows what the MIT border-beam 1.4.1 build does, re-implemented in our own CSS. The readers' reports were not independently re-checked against the sources.

## Other libraries

Survey by a research subagent against npm, GitHub and vendor pages, 2026-11-18: Magic UI, Aceternity UI, React Bits, Paper Shaders, shadergradient, shaders.com, Motion Primitives, Animate UI, Fancy Components, Cult UI, Unicorn Studio, Rive, dotLottie, canvas-confetti, tsParticles, cobe, Vanta.js, OGL, three.js, react-three-fiber, drei, postprocessing, GSAP, Lenis, NumberFlow, torph, liquid-glass-react. Used for [effect-libraries.md](effect-libraries.md). Reduced-motion findings come from reading individual component sources (Magic UI meteors and globe, React Bits Aurora, Motion Primitives text-effect), not from a full audit.

## Platform facts

Survey by a research subagent, 2026-11-18, from MDN browser-compat data (8.1.9), the Baseline `web-features` dataset, developer.chrome.com, web.dev, webkit.org and developer.apple.com. Used for [platform-techniques.md](platform-techniques.md).

Accessibility:

- WCAG 2.2 Understanding 2.3.1 <https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html>
- 2.2.2 <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- 2.3.3 <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>
- web.dev, prefers-reduced-motion <https://web.dev/articles/prefers-reduced-motion>
- Chrome, prefers-reduced-transparency <https://developer.chrome.com/blog/css-prefers-reduced-transparency>
- WebKit, "Responsive Design for Motion" <https://webkit.org/blog/7551/responsive-design-for-motion/>
- The A11Y Project, vestibular disorders <https://www.a11yproject.com/posts/understanding-vestibular-disorders/>
- Adrian Roselli, "You Know What? Just Don't Split Words into Letters" (2026-02) <https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html>

Practitioners:

- Emil Kowalski, "You Don't Need Animations" <https://emilkowal.ski/ui/you-dont-need-animations>
- Rauno Freiberg, "Invisible Details of Interaction Design" <https://rauno.me/craft/interaction-design>
- Josh Comeau on `backdrop-filter` and `linear()` (URLs in platform-techniques)
- Maxime Heckel on shader light effects (URL in platform-techniques)
- Chrome team, "Misconceptions about view transitions"

## Local material this skill builds on

- `design-craft` (refinement-moves): Delight (one earned moment, the specificity test) and Overdrive (propose 2–3 directions first; progressive enhancement). This skill extends those moves and deliberately leans further toward doing the effect: it is invoked when the user already wants one.
- `frontend-design` (anti-slop-catalog): the precedence rule that makes an effect request a pin.
- `web-design` (web-animation-design): frequency tiers and the motion audit's rule against infinite loops on persistent elements.

## What is ours

The posture (say yes, Explore and Finish modes, a short shipping floor) was set by the library owner on 2026-11-18 after a first, more cautious draft. The four aim questions, the moment inventory, the meaning and physical-metaphor tables, the seven families, the five-beat names, the ladder, and the moment → effect table are synthesis. None has been evaluated; see [coverage-gaps.md](coverage-gaps.md).
