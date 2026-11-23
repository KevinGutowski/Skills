# Reference to Build Prompt

*Scope: turn a reference (a live page, a screen recording, or an existing HTML file) into trustworthy evidence, then into a build prompt an agent can execute, without cloning the reference. Use when someone says "make something like this", hands over a URL or video of a site they admire, or asks for a prompt that recreates an interaction. Fixing output the agent already produced → [ai-ui-direction.md](ai-ui-direction.md). Triggers: recreate this page, prompt from a video, capture this site, full-page screenshot is blank, is this too close to the reference.*

**Sources:** [reference-to-build-prompt/sources.md](reference-to-build-prompt/sources.md) — seven of Meng To's open agent skills plus one capture-validity skill (MIT, `3cc9345`). Single author; the numbers are his working defaults.

The job has three parts and they fail in different ways. Capture fails silently (a blank band looks like a design choice). Specs fail by vagueness ("similar animation"). The boundary fails by drift (a copied statistic survives three rewrites). Do them in order and keep the evidence.

## Contents

- [The position on exact recreation](#the-position-on-exact-recreation)
- [Capture evidence](#capture-evidence)
- [Analyze and write the spec](#analyze-and-write-the-spec)
- [Set the reference boundary](#set-the-reference-boundary)
- [Audit originality after the build](#audit-originality-after-the-build)
- [Checklist](#checklist)
- [Relationship to other skills](#relationship-to-other-skills)

## The position on exact recreation

The source skills offer two modes, "exact recreation" and "inspired adaptation", and open the prompt by naming which one applies. This library keeps the opening line and narrows the first mode:

- **Exact recreation is for the user's own work only:** rebuilding their own page in a new stack, restoring a lost source, porting their own prototype. Ask if ownership is unclear.
- **For anyone else's shipped page, the prompt is always an adaptation** with a written boundary (below). Do not write a prompt whose goal is a clone of a third party's page, and do not carry over its brand, copy, people, numbers, or media.
- Technique is reusable; identity is not. A pinned scrubbed section is a mechanism anyone may build. That page's choreography, in that order, with those words, is the page.

## Capture evidence

### Stitched full-page capture

A browser's one-shot full-page screenshot is unreliable on lazy-loaded, scroll-animated, or canvas-heavy pages (site-builder exports are the usual case): sections that mount on scroll come out blank, while a scroll video of the same page looks fine. Capture settled viewports and stitch them.

1. Open the real page URL, not a marketplace listing, cover image, or thumbnail. For a template marketplace, find the live preview URL and record that.
2. Scroll top to bottom once so lazy media and reveal sections mount, then return to the top.
3. Step down by slightly less than the viewport height so slices overlap (the source's defaults: a 1440 × 1100 viewport, 950px steps).
4. Wait about 2 seconds after every stop before capturing, so reveals, lazy media, and sticky state changes settle.
5. Stitch the slices into one tall image. That stitched image is the source of truth.
6. Cut section crops **from the stitched image only**: contiguous, in page order, hero through footer, with each crop's y-start and y-end kept in a manifest rather than captioned under the image. Overlap is allowed only where a sticky element forces it.

**Reject the capture** when it has blank, gray, or white bands; very little visual content; an extremely narrow content column; missing lower sections; or obvious disagreement with the scroll video. Check the pixel dimensions are as wide and tall as expected, and that the crops end at the image's full height. A native full-page shot may be kept as a comparison candidate, never as the truth unless it matches the stitch.

### The evidence bundle

Per reference, collect:

| Item | Rule |
|---|---|
| Page URL | The live page itself; record it |
| Representative still | One still saved locally, usually the first viewport |
| Scroll video | A slow scroll of the real page: first viewport, section reveals, sticky nav, any carousel or parallax, lower sections. Never a pan or zoom across a cover image presented as site motion |
| Stitched full page and section crops | As above |
| Motion frames | At least four from the video: opening hero, a hover or settled state, a scroll transition, a lower section. Real page states, not repeated crops of one image |
| Manifest | Paths, URL, capture method, viewport, crop coordinates, and a fallback reason if anything could not be captured |

- If live capture is blocked, prefer swapping in another reference over faking motion from stills. If a fallback is unavoidable, write the reason in the manifest and next to the evidence.
- For a recurring collection, dedupe against earlier manifests by normalized title and URL before capturing.
- The video proves the page can render while scrolling. It does not replace the still evidence, and the stills do not replace the video.

### Capture validity

- **Look at every image before using or sending it.** Recapture on stray toasts or hover pins, half-loaded art, missing fonts, the wrong scene, or stale numbers. A picture that does not show what its caption claims is not evidence.
- **Actuate before capture.** Move the pointer for cursor effects, hover the card, scroll into the pinned section, wait for the canvas.
- **Before, key moment, result share one framing:** same viewport, camera, and state.
- **A hidden browser pane stalls `requestAnimationFrame`** and returns stale or black frames; use a headless capture then. WebGL and 3D scenes need about 3 to 5 seconds to settle headless.
- **Run captures one at a time.** Parallel headless browsers on a busy machine drop frames.
- **Label honestly.** "Headless browser capture." A 390 × 844 viewport is a phone-sized browser check, not a device test. A staged moment is named as staged.
- A still misses what moves: take a burst of frames through the effect, or a strip.

## Analyze and write the spec

### When the HTML exists, the source is the truth

Do not infer an effect from a screenshot when you can read it. Search the HTML, CSS, and scripts for the interaction's fingerprints: `pointermove`, `mousemove`, `requestAnimationFrame`, `canvas`, `webgl`, `sticky`, `ScrollTrigger`, `pin`, `parallax`, `shader`, `animation`. Then split the work by reusable interaction idea, not by line count: one prompt per idea (a pointer-following particle field, a cursor glow on cards, a section reveal system).

### When only a video exists

Read duration, dimensions, and frame rate with `ffprobe`. Extract frames at about one per second; for a long or scroll-heavy video also add the start, middle, end, and each visible transition, because uniform sampling misses the beats. If the video is referenced but not accessible, ask for the file before inventing details.

### Six layers

Analyze in this order and write each down before drafting:

1. **Story:** purpose, emotional arc, section order, how one beat hands to the next.
2. **Layout:** viewport framing, grids, sticky zones, cards, media, overlays, margins, nav, footer.
3. **Motion:** reveal timing, easing, parallax, masks, pinned sections, scroll scrubbing, hover and tap states, ambient loops, camera moves.
4. **Visual design:** type, palette, surfaces, borders, shadows, texture, iconography, image and video treatment.
5. **Rebuild technology:** which mechanism produces each effect (below).
6. **Accessibility and performance:** reduced motion, mobile, touch and keyboard states, lazy loading, pixel-ratio caps, static fallbacks.

### Name the mechanism

"Similar animation", "nice transitions", and "make it beautiful" are not instructions. Name what produces the effect: a pinned section, a scrubbed timeline, scroll progress mapped to `video.currentTime`, a parallax layer, an opacity reveal, a transform, a mask, a shader, a particle field, a carousel with drag physics. This is the same rule as prompting buildable values rather than adjectives in [ai-ui-direction.md](ai-ui-direction.md), applied to motion.

Pick the lightest mechanism that does the job, and let the project's existing stack win:

| Need | Reach for |
|---|---|
| Hover, focus, simple state changes, decorative loops | CSS transitions and keyframes |
| Reveal on scroll with no timeline control | IntersectionObserver or the Web Animations API |
| Component entrances, layout and shared-element transitions | The project's animation library (`motion` covers Motion) |
| Pinned sections, scrubbed timelines, multi-layer parallax, image-sequence scrubbing | A scroll-timeline library; `position: sticky` first when no timeline control is needed |
| Smooth-scroll engine | Only when the choreography needs it, never as generic polish. (This library adds: never two at once) |
| Horizontal strips | CSS scroll-snap first; a carousel library only for controls, looping, or drag physics |
| Real 3D, shaders, particles | WebGL, with capped pixel ratio, offscreen pause, reduced mobile density, and a static fallback |

For values inside the rebuilt page, the durations belong to `web-design` (web-animation-design), not to the reference: a cinematic reference's slow reveals (roughly 0.75 to 1.2s in the source's cinematic skills) are a school for Experience-mode pages, not a default for product UI.

### Prompt structure

Open with the thing to build and the reference boundary. Then, in order: asset map (real URLs, local filenames, or clearly marked placeholders; separate prompts for any generated images or clips), brand and content, global design system, motion system, per-section anatomy, responsive requirements, accessibility and performance, and a success check.

**Section anatomy, seven fields per section, in page order:**

| Field | Holds |
|---|---|
| Purpose | What the section does for the story, trust, or conversion |
| Layout | Grid, columns, media placement, sticky regions, CTA placement, how it collapses |
| Visual details | Type, color behavior, surfaces, borders, shadows, media treatment, density |
| Animation | Initial state, trigger, easing, duration, stagger, settled state |
| Interaction | Hover, focus, tap, pressed, keyboard, loading, disabled, error |
| Scroll behavior | Reveal threshold, pinned beat, scrubbed values, handoff to the next section |
| Mechanism | The API or library, and the reduced-motion fallback |

**The success check has four lines:** what the first viewport must show, what happens during scroll, what the final section does, and a closing "the build fails if" line listing concrete failures (autoplay-only video where scroll-scrubbing was required, text overlap, generic landing-page sections, mismatched stock media).

**Always include mobile behavior and reduced-motion behavior.** Not when relevant: every time.

**Portable prompts avoid hard-coded values.** Unless the work is the user's own and an exact rebuild is the goal, say "derive colors from the page theme" and "scale density to the layout and device"; do not lock the prompt to one color, size, threshold, DOM id, or asset. Screenshots travel with the prompt as evidence of the motion idea, not as a style spec.

The prompt should be long enough to rebuild the interaction without seeing the reference. Before handing over, check that every asset path in it exists or is marked as a placeholder.

## Set the reference boundary

Write the boundary before generating anything.

**The similarity dial.** The numbers communicate intent; they are not measurements. The source defines this dial for generated brand imagery; applying it to pages is this library's extension.

| Dial | Keeps | Changes |
|---|---|---|
| 30%, distant inspiration | Abstract principles: mood, density, contrast | Everything visible |
| 50%, recognizable influence | Medium and emotional tone | Palette, composition, subjects, type system |
| 70%, adjacent family | Composition logic, texture, palette relationships, amount of human presence, wordmark and type scale | Subjects, actions, arrangement, letterforms |
| 85%, close neighbor | Most high-level visual grammar | At least four signature elements; never an exact commercial identity |

"Inspired, not copying" holds at every setting. The source defaults to 70% when someone asks for "not too different".

**Two lists.**

- *Reusable grammar:* density and depth layers, palette relationships rather than exact swatches, surface and medium, lighting and temperature, type scale and placement logic, the rhythm of forms, section-level techniques.
- *Protected signature:* brand name, logo, wordmark and its letterforms, slogans, exact copy, people and poses, testimonials, figures, dates, plans and prices, URLs, legal text, interface screenshots, photography, the exact motif arrangement and negative-space shape, a distinctive choreography reproduced across several sections. Where a reference has one famous feature, keep the principle behind it and drop the feature.

**The replacement identity is coherent.** Define the new brand as one system before building: name, audience, offer, vocabulary, figures. A new statistic agrees everywhere it appears; pricing, testimonials, locations, product UI, and footer details all belong to the replacement. Invented proof is still bound by the truth rules in `frontend-design`: sample data is labeled as sample, and nothing is presented as a real customer or metric.

## Audit originality after the build

An evidence exercise, not an impression. Audit only, unless fixes were also asked for.

**Scope.** Build a registry of every reference supplied (stills, full-page captures, crops, videos, URLs, briefs, credits) and prefer the evidence captured at brief time, since a live reference may have changed. Inspect rendered output and source, including metadata, alt text, and hidden labels. Do not trust filenames; check the bytes and the repository history for material that was renamed, recolored, cropped, or deleted. If a promised reference is missing, stop and report the gap; never shrink a full-page and motion audit to one cover image.

**Eight categories:** text, brands, numbers, images, assets (fonts, icons, textures, code), videos, structure and motion, history.

**Evidence hierarchy, strongest first:**

1. Identical file bytes, or a match in repository history.
2. Identical or near-identical rendered text.
3. Matching source-brand names, marks, numbers, or URLs.
4. Matching image crops, video frames, or audio.
5. Several distinctive composition, layout, or motion elements combined.
6. Generic style resemblance.

Levels 1 to 4 support a confident finding. Levels 5 and 6 need judgment and a stated caveat.

**False-positive controls.** These are not findings on their own: black and white, one accent color, large sans-serif type, the hero-to-footer section order, fade, slide, marquee, or parallax effects, a common icon library, ordinary stock subjects, the same framework. Escalate when generic ingredients reproduce a distinctive arrangement, sequence, identity, or asset. A short functional phrase ("Learn more") needs a second signal. A source name inside a test that forbids it is not shipped copy.

**Every finding cites two locations,** one in the build and one in the reference, reproducibly (file and line, URL and section, asset path and hash, video timestamp), and states what overlaps, what differs, a severity, and the smallest fix. Keep fact, inference, and unknown separate.

**Fix rules.**

- Copy: rewrite from the replacement brand's audience and offer.
- Identity: replace names, marks, URLs, people, and legal references as one system.
- Numbers: create internally consistent new facts. **Do not nudge a copied number.**
- Images: change subject, composition, perspective, and provenance. **Recoloring is not a fix.**
- Video: new footage and edit structure; changing playback speed is not enough.
- Layout and motion: keep the abstract principle and rebuild the visible sequence around the new content.

**Verdict vocabulary,** one of: *Clear in checked scope* · *Clear with low-risk similarities* · *Changes recommended* · *Block release* · *Blocked by missing evidence*. Missing evidence never becomes a pass. Call findings overlaps or originality risks: severity is not a legal conclusion, and copyright, trademark, and license questions may need counsel.

## Checklist

- [ ] Ownership settled: exact rebuild only for the user's own work, adaptation with a written boundary otherwise?
- [ ] Evidence captured from the live page, with a stitched full-page image that passed the rejection checks?
- [ ] Every image looked at; captures labeled as headless or staged where they are?
- [ ] Source read and grepped where HTML exists; mechanisms named, no "similar animation"?
- [ ] Each section has all seven anatomy fields; mobile and reduced motion present; a "the build fails if" block closes the prompt?
- [ ] Similarity dial stated; reusable grammar and protected signature written as two lists; replacement identity coherent?
- [ ] After the build: eight categories audited, each finding with two evidence locations, one verdict, gaps reported?

## Relationship to other skills

- **[ai-ui-direction.md](ai-ui-direction.md)** — directing and repairing what the agent built from this prompt; its "rip techniques from reference URLs" move is the one-technique version of this workflow.
- **`frontend-design`** — owns the direction and the truth rules for the new page; a reference sets a craft bar, not the direction.
- **`creating-skills` (converting-visual-references-to-skills)** — when the goal is reusable taste criteria from a corpus of references, not one build prompt. That reference warns against full-page shots as taste input; here they are layout evidence.
- **`research-cataloging` (archival-research)** — capture for preservation and citation, where the page must not be altered or re-staged.
- **`interface-review`** — auditing the built page's quality; the originality audit here only asks how close it is to its reference.
- **`web-design` (web-animation-design)** — the motion values for the rebuilt page.
