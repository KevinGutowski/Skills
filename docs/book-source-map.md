# Book source map

Working index for already-processed local books. Use this before writing or updating
skills so a themed edit can check related book material without rereading the whole
library. Keep this doc factual and compact: TOC/chapter shape, short chapter summaries,
density verdict, routed folds, and cross-reference candidates.

Rules:
- This is an authoring aid, not skill-loading content. Do not copy TOCs into `SKILL.md`.
- Add entries after screening a book in full. If only a targeted pass happened, mark it.
- Use short chapter summaries in original words only after reading the source.
- Preserve routing decisions: folded target, parked candidate, or skipped-as-known.
- Add theme leads when a chapter may matter later: SVG, typography, sketching, metrics,
  research synthesis, roadmap/cycle design, IA, pricing, etc.

## Theme leads

| Theme | Processed sources to check | Notes |
| --- | --- | --- |
| SVG / vector animation | Dan Hollick, *Making Software*, "Scalable Vector Graphics"; MailChimp, *The UX Reader*, "High Five for SVGs"; Wathan/Schoger, *Refactoring UI*, "Everything has an intended size"; Santa Maria, *On Web Typography*, icon-font discussion; Kalbag, *Accessibility for Everyone*, rich-media chapter; Nabors, *Animation at Work*, frame-rate chapter; animations.dev hero-illustration lessons | Hollick owns coordinate/path fundamentals already folded into `frontend-design`. MailChimp adds asset-prep and exporter hygiene. Refactoring UI + On Web Typography corroborate icon sizing and SVG-over-icon-font practice. Kalbag owns bitmap-text/SVG accessibility. Nabors mentions SVG filters for motion blur, but only as a special-project lead. |
| Sketching / lo-fi artifacts | Leah Buley, *The User Experience Team of One*; MailChimp, *The UX Reader*, "Why You Should Sketch, And How" | Buley remains the stronger method source for facilitation and solo-UX artifacts; MailChimp mainly reinforces sketch-to-comp handoff and lo-fi signal. |
| Typography systems | MailChimp, *The UX Reader*, "Tightening Type and Relative Font Sizing"; Rutter/Santa Maria/Butterick typography books already extracted; Elliot Jay Stocks articles | MailChimp has a vertical-rhythm/baseline-grid case study, but stronger dedicated typography sources own most future folds. |
| Roadmaps / release cycles / cleanup | Perri, Gothelf/Seiden, Klein product trio; MailChimp, *The UX Reader*, "Release Cycles and Roadmaps" and "Iteration and the Feature/Refinement Balance"; Linear quality series | Product trio owns measurement-led strategy; MailChimp adds a craft/org practice for annual cleanup releases and feedback-fed refinement. |
| Research impact / synthesis | Product trio; Buley; MailChimp, *The UX Reader*, research section | MailChimp adds distribution channels and parallel-cycle research cadence; Buley owns solo-UX influence mechanics. |
| Logo design | Allan Peters, *Logos that Last*; Gal Shir, *60 Tips for Logo Design* | Peters remains the primary method source. Shir corroborates the process and adds practical checks: four-lane intake, keyword lanes, time-boxed sketch warmup, rest overnight, profile-image/uniqueness tests, and presentation sequencing. |

## MailChimp, *The UX Reader* (2014)

Extraction: `/tmp/books/the-ux-reader.txt` from unpacked EPUB directory via `xmllint`
body text. Density: MED. No new skill; route practice notes into existing UX/product
skills. Era note: specific tools such as Snap.svg, Paper for iPad, and 2014 email
workflow details should be treated as historical examples, not current recommendations.

### TOC / Chapter Map

| Part / article | Short summary | Routing |
| --- | --- | --- |
| Intro | Frames the book around MailChimp's UX practice: collaboration/teamwork, research, design, development, and ongoing refinement. | Context only. |
| Collaboration | Small UX team inside a product org; empathy for colleagues; parallel research and development cycles; research recommendations feeding roadmap decisions. | Folded to `design-org-influence/references/team-building.md`. |
| Research | Research cadence, note taking, participant handling, and making findings travel through posters, coffee hours, lunch-and-learns, newsletters, mini-docs, collaborative reports, and evangelists. | Folded to `user-research/references/synthesis-and-impact.md`; cross-check future research-impact edits here. |
| Design — "Why You Should Sketch, And How" | Sketch early, use roughness to signal idea-stage work, photograph/share sketches, and move from sketches to comps with notes. | Skipped as covered by `design-prototyping`/Buley unless a future sketching pass needs corroboration. |
| Design — pattern library / slats | Six-month pre-redesign CSS reduction, reusable patterns, slat/list-table reuse, and redesigning high-traffic dashboards from sketches to prototypes. | Folded to `design-systems` and `design-systems/references/field-notes.md`. |
| Design — "High Five for SVGs" | Prepare SVG animation assets: layer hierarchy, named groups/paths, fewer anchors/points, final-export cleanup, stroke/shape tradeoffs, one coordinated SVG for multi-frame animation, and layout-thrashing risk. | Folded to `frontend-design`; check for future SVG/theme folds. |
| Development — responsive email | Email blueprinting, breakpoints, tables, testing, and client constraints in a 2014 MailChimp workflow. | Parked/skip for now; no email-design skill home and specifics are stale. |
| Development — typography | Baseline grid, relative font sizing, single-direction margins, modular vertical spacing, and content-out rhythm. | Mostly skipped; cross-check only for web-typography/system-spacing corroboration. |
| Release Cycles and Roadmaps | Five-week release rhythm, code freeze/QA, design lead time, parts bin, and scope reduction through time limits. | Mostly covered by `shape-up`/product-trio schools; use as historical org practice. |
| Refinement — feature/refinement balance | Bugs/confusing workflows erode trust; support/social/analytics/interviews/surveys/account-closing reasons feed refinement; annual cleanup/maintenance release. | Folded to `shape-up`. |
| Resources | Recommended UX reading list. | Context only; useful for source discovery. |

### Verified follow-up quotes

- "layer hierarchy is key"
- "Creating fewer groups, paths, and points in a layer helps keep the SVG code light and legible"
- "deselect “Preserve Illustrator Editing Capabilities”"
- "layout thrashing"
- "When a user encounters a bug, or when part of your application confuses them and costs them time, it erodes their trust in your product"
- "At least once a year, we have an entire release focused solely on cleanup and maintenance"

## Adam Wathan and Steve Schoger, *Refactoring UI*

Extraction: `/tmp/books/refactoring-ui.txt`. Prior screen treated the core advice as
mostly model-known, but the SVG/icon sizing passage is useful corroboration.

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| "Everything has an intended size" / "Don't scale up icons" | Vector icons do not blur when enlarged, but small icons drawn for 16-24px lack the detail and proportions for 3-4x display; keep the icon near its intended size inside a larger shape. | Folded to `frontend-design` SVG mental model. |

Verified quote: "Don't scale up icons".

## Jason Santa Maria, *On Web Typography*

Extraction: `/tmp/books/on-web-typography.txt`. Mostly typography-source territory.

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Icon-font discussion | SVG keeps icons scalable, CSS-colorable, and bundled while avoiding icon-font screen-reader remapping problems. | Folded lightly to `frontend-design`; future icon accessibility work should also check `web-accessibility`. |

Verified quote: "SVG is the more flexible solution".

## Laura Kalbag, *Accessibility for Everyone*

Extraction: `/tmp/books/accessibility-for-everyone.txt`. Already a primary source for
`web-accessibility`.

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Ch. 4, rich media / text in images | Bitmap text cannot resize, be read by screen readers, be indexed, be translated, or be revised cheaply; logos are the real exception; SVG text can keep graphic text scalable/stylable when handled accessibly. | Folded to `web-accessibility` rich media. |

Verified quote: "text in JGPs, GIFs, and PNGs can’t be resized" (source typo preserved in extraction).

## Rachel Nabors, *Animation at Work*

Extraction: `/tmp/books/animation-at-work.txt`. Already folded into `web-animation-design`
for motion principles. SVG is a minor implementation lead, not a new fold by itself.

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Ch. 5, frame rates | For strobing or large-distance movement, manual motion blur via SVG filters or sprites can help special projects, but the book treats it as beyond scope. | Source-map lead only; current `web-animation-design` frame-rate/perception guidance is stronger. |

Verified quote: "manually add motion blur using SVG filters or sprites".

## Gal Shir, *60 Tips for Logo Design* (2025)

Extraction: OCR'd image-only PDF from Apple Books with `pdftoppm` + Tesseract to
`/tmp/books/60-tips-logo.txt`. Density: MED for `logo-design` as a corroborator,
not a replacement for Peters. Source is a purchased ebook; use distill-only rules
and short verified quotes.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Purpose | Defines a logo as a brand-identification tool and distinguishes logo from brand ecosystem. | Corroborates `logo-design` framing. |
| 2. Researching | Intake across business, audience, brand, client taste, term/trait/object keywords, and competitor logo boards. | Folded four-lane intake + keyword lanes to `logo-design`. |
| 3. Sketching | Fast rough sketches, quantity before quality, object/characteristic/letter connections, combining sketches, and concept elimination. | Folded time-boxed warmup; Peters' 50-sketch standard remains stricter. |
| 4. Cleaning | Simplify repeatedly, use grids, geometry, symmetry, shared radii, and shared angles. | Mostly covered by Peters; useful corroboration for geometric vectorization. |
| 5. Personality | Tune balance, shape, weight, orientation, and color to match brand character. | Covered by existing logo/app-icon/design-principles material; no separate fold. |
| 6. Wordmark | Match capitalization, weight, style, spacing, baseline, line weight, negative space, radius, and angles between symbol and wordmark. | Lightly reinforces `logo-design` wordmark geometry in tests/presentation; possible future depth. |
| 7. Testing | Test readability at scales, rest overnight, profile image alignment, applications, color/contrast, and uniqueness via image search. | Folded to `logo-design` tests. |
| 8. Showcasing | Set context, let the mark speak first, explain symbolism/characteristics, show sizes/colors/mockups, and present confidently. | Folded to `logo-design` presentation protocol. |

Verified short quotes include: "A logo is a tool representing a brand"; "A logo is like a handshake between a business and its audience"; "Don’t spend more than 30 seconds on each sketch"; "Let it rest overnight"; "Test for uniqueness"; "Let the logo speak first"; "Show mockups".

## Lidwell / Holden / Butler, *Universal Principles of Design* (2003)

Extraction: `/tmp/books/universal-principles-of-design.txt`. Density: LOW overall
because the encyclopedia entries are mostly design-psychology staples already covered
by stronger local sources. Targeted pass only; do not treat the whole 100-entry set as
fully routed.

### TOC / Chapter Shape

The book is an alphabetical encyclopedia of 100 design principles, each usually
presented as a short definition, example discussion, illustrations, and related
principles. Current fold pass only touched entries with a clear, non-generic target.

| Entry / cluster | Short summary | Routing |
| --- | --- | --- |
| Advance Organizer | Pre-learning orientation that helps learners connect new material to prior knowledge; distinguishes expository and comparative organizers. | Folded to `learning-experience-design`. |
| Entry Point | First impressions should minimize barriers, expose points of prospect, and lure progressive exploration. | Folded to `user-onboarding`. |
| Errors | Separate slips from mistakes; prevent where possible with constraints, affordances, confirmations, and forgiving recovery. | Folded to `error-messages`. |
| Hierarchy / Hierarchy of Needs | Organize perceived importance and satisfy basic functional needs before higher-order delight. | Skipped for now; covered by `design-principles`, onboarding, and polish sources. |
| Iteration | Design and development iteration improve fitness over cycles. | Skipped as model-known and already covered by Shape Up/product process sources. |
| Layering | Organize information into related groupings, exposing only needed layers at a time. | Skipped for now; possible future IA/progressive-disclosure corroboration. |
| Signal-to-Noise Ratio | Maximize relevant signal, reduce irrelevant noise. | Skipped; covered by `tufte-viz`, `chart-selection`, visual accessibility, and UI polish sources. |
| Similarity / Self-Similarity | Similar elements are perceived as related; repeated structures reduce learning cost. | Skipped; covered by design-system/pattern and visual hierarchy material. |

## Processed Books Needing Map Backfill

These books have been screened/folded in `docs/mining-ledger.md` but do not yet have
chapter-level maps here. Backfill when a future theme pass needs them:

- Melissa Perri, *Escaping the Build Trap*; Jeff Gothelf and Josh Seiden, *Lean UX*;
  Laura Klein, *Build Better Products* — product-trio manifest exists in
  `docs/pending-folds-product-trio.md`.
- Austin Kleon, *Show Your Work!* — folded to `building-in-public`.
- Chip Heath and Dan Heath, *Made to Stick* — folded to `design-org-influence`,
  `developer-tool-gtm`, and `write-clear-prose`; useful for future sticky-message
  cross-checks.
- Julie Dirksen, *Design For How People Learn* — created `learning-experience-design`.
- Leah Buley, *The User Experience Team of One* — folded to `design-org-influence`
  and `design-prototyping`; useful for future sketching, solo-UX, and influence checks.
