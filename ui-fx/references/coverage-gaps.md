# Coverage Gaps

## Unverified or thin

- **Output evals run three times.** Blind-graded on 2026-11-18: 12/12 against 7/12 on three cases; 16/16 against 6/16 on four; then, on five cases and 21 graders, 21/21 against 10/21; the composer case was afterwards given a scaffolded, offline project fixture and seven graders checked against the published border-beam API, and re-run alone at 7/7 against 5/7 (6/6 against 4/6 after a grader that could not fail was removed) (`docs/skill-evals-2026-11.md`; an earlier 5/5 against 3/5 was scored with a wrong prop list and is corrected there). The case has not been run under `claude plugin eval` itself. The checkout case tied 3/4 against 3/4 on one re-run (the skill arm did not name an alternative direction); after the workflow's report step was strengthened and the graders made explicit about the first readable frame and a costed alternative, a further re-run scored 4/4 against 0/4. One run per arm each time, so treat the swing as noise plus stricter graders, not as a measured effect. One run per arm per round on one model, nothing rendered, tool limits set by instruction and not enforced, four assertions do not discriminate, and the last round's runs predate the final wording fixes. Next: a project fixture for the composer case, a harder ideas-only case, and a run under `claude plugin eval` where its tool grants apply.
- **glimm core fallbacks** were established by reading the 0.4.1 build (no reduced-motion check in `playSweep`, `createShader` can return `null`), not by running it. Recheck on upgrade.
- **Nothing was rendered.** No library here was installed and viewed in a browser during the fold. Traps come from vendor references and source reading.
- **`distortion-waves`** resolved on npm as 0.1.0 when rechecked on 2026-11-19 (it returned 404 on the morning of 2026-11-18; that is kept in the source ledger). Still to do: confirm the capture behaviour (CORS, frozen content) in a real app.
- **The five-beat anatomy** now has two independent sources that agree on the shape (distortion waves, glimm). The time shares are still ours and unmeasured.
- **glimm** was read, not run. `GlimmScope` and its page effect are labelled experimental and depend on HTML-in-Canvas (Chrome 157+). The 16-context limit is the author's figure.
- **Wait-length thresholds (2 s, 3 s)** are one author's rule for his own libraries. Plausible, uncorroborated.
- **Safari and SVG filters:** "CPU rasterised" is a vendor statement; the primary evidence is WebKit bug reports of slow turbulence filters. No measurement here.
- **ittybitty** was read, not run. Its shared-runtime behaviours were confirmed on one shader's page only; reach percentages are the site's own estimates with no stated method; the no-WebGL2 fallback in a self-hosted embed was not checked.
- **WebGL context cap** ("about 16") is from memory, and matches the figure glimm's author gives; still not checked against a primary source.
- **Library facts not verified:** shaders.com pricing and WebGL fallback; React Bits Pro price; Skiper UI terms; uilabs.dev licence; reduced-motion coverage across gallery components beyond the few read; bundle weights (only unpacked sizes were available).
- **SwiftUI:** `TextRenderer` minimum OS conflicts between the docs data and its WWDC24 introduction. The libraries.dev SwiftUI kits were not built.
- **No critique source names the gallery effects.** The claim that aurora, meteors and sparkles read as stock is ours, supported only by their presence in every gallery and by the general anti-slop catalog.
- **React Native** ports exist for several libraries.dev packages; this library has no React Native cluster, so they are listed and nothing more.

- **Reverse-engineering method** is ours and was exercised only in its no-browser form, on five home pages. The DevTools pass is written from general practice and was not run in this environment.
- **Intensity levels** (whisper, signature, showpiece) and the suggested strength ranges are ours. The composer example's settings were read off a video.
- **The five kits** in reverse-engineering were skimmed; prices, tiers and licences were not verified.
- **Fact-check pass (2026-11-18):** glimm, libraries.dev and ittybitty claims were checked against the published packages, registry and live pages by an independent reviewer and corrected. Still vendor-stated and unverified: glimm's 11 KB figure, the nested-layout remount, the 16-context limit, ittybitty's reach figures.

- **Pattern and recipe references** (control-patterns, surface-recipes) come from static reading of other people's components by research subagents, not from running them. The CSS recipes were rendered in headless Chromium as a gallery page and compared by eye with screenshots of the source sites, and the copyable JavaScript helpers and CSS are covered by the checks under `examples/` (21 and 42 checks, passing on 2026-11-19). Not covered: Safari and Firefox rendering, the canvas and shader sketches, the proximity-field and decaying-energy sketches, and any judgement of motion (only stills were compared). Measured values are as reported by those readers; spot-check before relying on an exact figure. Recipes derived from stills or descriptions (the dark gradient card, dials, gradient constructions, grain percentages) are estimates.

- **holospot** was read, not run, one day after its first release. Whether it handles reduced motion, offscreen pausing or missing WebGL 2 was not established from the documents read; the reference assumes it does not. Its bundle weight is the unminified file size, not a measured transfer size.
- **Textures** was read, not run. No Texture was installed or viewed moving; the anatomy comes from reading `beam.tsx` and the vendor's agent briefs, and the claim that the other free files share its engine is the vendor's. The weights and p95 frame costs are the vendor's measurements, and the budget behind its "Light" badge is not published. The touch-ambient remedy (`data-motion="hover"`) was read from the code, not tested on a device. The hover-texture skeleton in [textures.md](textures.md) is covered by `examples/snippet-checks/check.mjs`. It checks that the weight spring stays bounded, does not overshoot, and settles at 30, 60 and 120 Hz and on a 5 s frame. It also runs the whole skeleton against a stubbed DOM at those rates. A QA pass found that the first version, using semi-implicit Euler, blew up at 30 fps, so the spring is now the exact critically damped update. The skeleton was also run once in headless Chromium on 2026-11-22, with no visual judgement. The `hover-texture-hero` eval was run once per arm on 2026-11-22, author-graded: 4/4 with the skill against 3/4 without. The only difference was the touch-ambient grader (`docs/textures-source-mining-2026-11.md`).
- **glimm provider delay:** the roughly 730 ms hold on the curtain path is a QA measurement in a browser test, not ours.

## Recheck schedule

Library versions, licences, prices and browser support in this skill are dated 2026-11-18. Recheck on use, and sweep the ten references each half-year: Baseline status of view transitions (cross-document), scroll-triggered animations, `random()`, `corner-shape`, HTML-in-Canvas, WebGPU; and the libraries.dev set, which adds packages often.

## Candidate promotion form

```markdown
Candidate:
Moment and effect:
Source or accepted build:
Evidence artifact (recording, code, device tested):
Rule:
Check possible:
Exception:
Status: proposed | accepted | rejected
```
