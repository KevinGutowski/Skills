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
| Typography systems | Rutter, *Web Typography*; Santa Maria, *On Web Typography*; Latin, *Better Web Typography*; MailChimp, *The UX Reader*, "Tightening Type and Relative Font Sizing"; Elliot Jay Stocks articles | Rutter/Santa Maria/Latin already own `web-design` (`web-typography`). MailChimp has a vertical-rhythm/baseline-grid case study; use it only as corroboration unless a future theme needs MailChimp-specific org practice. |
| Information architecture / findability | Lisa Maria Martin, *Everyday Information Architecture*; Jon Yablonski, *Laws of UX*; Sharon, *Validating Product Ideas* ch. 8; Apple naming/labels material | `web-information-architecture` remains parked until a second dedicated IA source lands. Martin is the spine for audits, categories, labels, structure, navigation, tags, and taxonomy governance. Yablonski/Sharon corroborate cognitive load, card sorting, tree testing, first-click testing, lostness, and Miller's-law misuse. |
| Roadmaps / release cycles / cleanup | Perri, Gothelf/Seiden, Klein product trio; MailChimp, *The UX Reader*, "Release Cycles and Roadmaps" and "Iteration and the Feature/Refinement Balance"; Linear quality series | Product trio owns measurement-led strategy; MailChimp adds a craft/org practice for annual cleanup releases and feedback-fed refinement. |
| Research impact / synthesis | Product trio; Buley; MailChimp, *The UX Reader*, research section | MailChimp adds distribution channels and parallel-cycle research cadence; Buley owns solo-UX influence mechanics. |
| User research methods | Erika Hall, *Just Enough Research*; Steve Portigal, *Interviewing Users*; Tomer Sharon, *Validating Product Ideas*; product-trio validation sources; Buley | Hall owns scoping/rigor/bias and research politics; Portigal owns interview craft and field impact; Sharon owns lean method selection and participant sourcing; product trio owns assumption/metric validation. |
| Onboarding / first-run behavior | Samuel Hulick, *The Elements of User Onboarding*; Klein, *Build Better Products* ch. 8; Lidwell et al., *Universal Principles of Design* "Entry Point"; product/onboarding field notes | Hulick is the primary method: adoption-chain audit, sell the user's improvement, quick win/base camp, safe landing, blank states, setup quests, and lifecycle emails. Klein adds behavior/core-loop design; Universal Principles adds entry-point mechanics. |
| Human-centered design / service prototyping | IDEO.org, *The Field Guide to Human-Centered Design*; Buley; Hall; Sharon; Apple prototyping sessions | IDEO is a compact method catalog for field inspiration, participatory synthesis, rough prototypes, live prototypes, pilots, and implementation planning. Current homes are `user-research` and `design-prototyping`; use as a future cross-check before adding field/service-design material. |
| Client work / pricing | Mike Monteiro, *You're My Favorite Client*; Dan Mall, *Pricing Design*; Chris Do/Futur + Jonathan Stark corpus | Current home is `client-work`: Monteiro owns engagement mechanics and client feedback; Mall adds the third pricing school and value-trait options; Do/Stark remain competing schools for one-price/attention-tier defaults. |
| Emotional design / product personality | Aarron Walter, *Designing for Emotion*; Metts/Welfle, *Writing Is Designing*; MailChimp, *The UX Reader*; Apple UX writing sessions | Walter owns the design-persona method, surface-specific tone tapering, delight-layer constraints, trust repair, and risk-managed experiments. Already folded across `ux-writing` (including error messages), `user-research`, `design-principles`, and `web-animation-design`; check before adding more personality/delight advice. |
| Practical UI mechanics | Adham Dannaway, *Practical UI*; Wathan/Schoger, *Refactoring UI* | `Practical UI` already owns `web-design` form/buttons mechanics, color roles/state layers in `oklch-skill`, and contrast tactics in `web-accessibility`. Broad layout/type/copy advice is mostly model-known or covered by stronger dedicated skills; check the chapter map before adding duplicate polish notes. |
| People management | Kim Scott, *Radical Candor*; Julie Zhuo, *The Making of a Manager*; Lara Hogan, *Resilient Management* | These are the three primary book sources for `people-management`. Scott owns candor/career-conversation/team-result systems; Zhuo owns new-manager transitions, meetings, hiring, delegation, and culture; Hogan owns 1:1 discovery, BICEPS, four support hats, team charters, comms plans, and manager resilience. |
| Logo design | Allan Peters, *Logos that Last*; Gal Shir, *60 Tips for Logo Design* | Peters remains the primary method source. Shir corroborates the process and adds practical checks: four-lane intake, keyword lanes, time-boxed sketch warmup, rest overnight, profile-image/uniqueness tests, and presentation sequencing. |
| Photographic lighting | Hunter/Biver/Fuqua, *Light: Science & Magic*; Tony Northrup, *Tony Northrup's DSLR Book* | Created `photographic-lighting` from a targeted lighting pass. Check here for photo shoots, glare/reflections, metal/glass, hard/soft light, fill/bounce flash, portraits, and product/still-life lighting. |
| Creative coding / generative visuals | Gross et al., *Generative Design*; Daniel Shiffman, *The Nature of Code* | Created `creative-coding` 2026-06-13. Generative Design owns the designer/tool/pattern-catalog side; Nature of Code owns simulation primitives: distributions/noise, vectors/forces, particles, steering/flocking, automata, fractals, and evolution. |
| Classic Apple HIG doctrine | Apple, *iOS Human Interface Guidelines* (2014); Apple, *OS X Human Interface Guidelines* (2014); current HIG lookup | Folded to `apple-design/references/classic-hig-principles.md`. Use for durable rationale only: deference/clarity/depth, aesthetic integrity, user control, standard-control semantics, Mac modality/keyboard/help. Current component specs still route through `apple-design` (`hig`). |

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

Extraction: `/tmp/books/refactoring-ui.txt`; local PDF visual pages rendered to
`/tmp/refactoring-ui-all-pages/*.png` and images extracted to
`/tmp/refactoring-ui-extracted-images/` for the example pass. Density: HIGH for
visual UI refactoring. Primary fold target is
`design-polish/references/refactoring-ui.md` plus the code-native gallery at
`design-polish/examples/refactoring-ui-gallery.html`; color-scale mechanics also
corroborate `web-design` (`oklch-skill`), and image/icon sizing corroborates
`frontend-design`. The gallery now recreates 32 visual examples in editable
HTML/CSS; weak supplemental sketches were pruned after review, so prefer clear
examples over total image coverage and never commit book screenshots.

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Starting from Scratch | Start from a real feature, defer details, design in cycles, choose personality, and limit choices before polishing. | `design-polish/references/refactoring-ui.md`; `design-prototyping` for build-real-early overlap. |
| Hierarchy is Everything | De-emphasize secondary content, use weight/color instead of only size, avoid unnecessary labels, separate semantic/document hierarchy from visual hierarchy, and rank actions by importance. | `design-polish/references/refactoring-ui.md`; form/button hierarchy cross-check in `web-design` (`form-design`). |
| Layout and Spacing | Start with too much whitespace, use a non-linear spacing/sizing scale, avoid over-relying on grids, reject proportional scaling, and make group spacing unambiguous. | `design-polish/references/refactoring-ui.md`; spacing scale also in `design-polish/SKILL.md`. |
| Designing Text | Establish a type scale, choose practical fonts, constrain measure, baseline-align mixed text, tune line-height, color links deliberately, and letterspace only suitable text. | `design-polish/references/refactoring-ui.md`; deeper rules route to `web-design` (`web-typography`). |
| Working with Color | Use perceptual color controls, build real palettes with greys/primary/accent shades, define shades up front, keep saturation alive, tint greys, and solve contrast without hijacking hierarchy. | `web-design` (`oklch-skill`, `web-accessibility`); summarized in `design-polish/references/refactoring-ui.md`. |
| Creating Depth | Emulate overhead light, use elevation/shadow scales, combine cast + ambient shadows, create flat depth with color, and overlap layers/images intentionally. | `design-polish/surfaces.md`; summarized in `refactoring-ui.md`. |
| Working with Images | Use good photos, control text contrast over images, respect intended size for icons/screenshots, and constrain user-uploaded content with fixed crops/inner rings. | `design-polish/references/refactoring-ui.md`; SVG/icon sizing folded to `frontend-design`. |
| Finishing Touches | Supercharge defaults, add accent borders, decorate low-contrast backgrounds, prioritize empty states, use fewer borders, and break component assumptions carefully. | `design-polish/references/refactoring-ui.md`; empty-state copy route stays `user-onboarding`. |

Verified quote: "Don't scale up icons".

## Adham Dannaway, *Practical UI* (2nd ed.)

Extraction: `/tmp/books/practical-ui.txt`. Density: MED. No new skill: this is a
single-source practical method already routed into the `web-design` cluster. High-signal
folds are complete for forms/buttons, color roles/state layers, and contrast metrics.
Broad fundamentals, layout, typography, and copywriting are useful corroboration but
mostly covered by stronger existing homes. No direct quotes added in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Fundamentals | Familiar patterns, design systems, accessibility, consistency, interaction states, and cost-aware 80/20 prioritization. | Source-map only; already covered by `design-principles`, `design-systems`, and `web-accessibility`. |
| 2. Less is More | Remove unnecessary information/styles, use progressive disclosure, keep important content visible, design smallest-screen-first, reduce or group choices. | Mostly model-known; `design-principles` only if a future pass needs corroboration. |
| 3. Colour | Contrast, color-not-alone, status colors, black-and-white-first workflow, six-role palette, transparent foreground palette, state layers, systematic color naming. | Folded to `web-design` (`oklch-skill`) palette roles/state layers and `web-accessibility` contrast nuance. |
| 4. Layout and Spacing | Group related elements, visual hierarchy, squint test, depth, box model, 8pt spacing options, relationship-based spacing, 12-column grids, text alignment, robust layout. | Mostly covered by `design-polish` and `frontend-design`; no extra fold unless a concrete UI-review checklist needs corroboration. |
| 5. Typography | Single sans default, optional heading face, regular/bold weights, type scale, long-body sizing, line-height, measure, left alignment, photo text, avoid light grey/pure black. | `web-design` (`web-typography`) owns stronger Rutter/Santa Maria/Latin depth; source-map corroboration only. |
| 6. Copywriting | Concision, sentence case, simple language, front-loading, chunking, descriptive headings, specific link/error/button text. | Mostly covered by `ux-writing`; form/button crumbs folded in `web-design` (`form-design`). |
| 7. Buttons | Three button weights, one primary action, avoid disabled buttons, left-align/order web buttons, verb+noun button text, 48pt targets, icon/text balance, destructive friction ladder. | Folded to `web-design` (`form-design`) with Apple-platform conflict scoped. |
| 8. Forms | Single-column forms, required/optional markings, opt-ins, field width, conventional field styles, hints above fields, label placement, dropdown alternatives, checkbox/toggle choice, validation modes. | Folded to `web-design` (`form-design`) and details reference. |

## Richard Rutter, *Web Typography*

Extraction: `/tmp/books/web-typography-epub.txt`. Density: HIGH for `web-design`
(`web-typography`). Already folded as the backbone for measure, line-height, type
scales, rhythm, alignment, tracking, OpenType detail, web-font loading, and tables.
No new quotes added in this map pass.

### Section Map

| Section | Short summary | Routing |
| --- | --- | --- |
| Embracing the medium / Preparing the ground | Web type starts from reader control, liquid media, content knowledge, and reader context. | Folded to `web-design/references/web-typography.md` stance. |
| How to use this book | Three-part guideline structure; typeface choice comes last because text setting is the craft. | Folded to `web-typography` stance and `rutter-guidelines.md`. |
| Setting Type to be Read | Body text sizing, measure, line-height, rhythm, hierarchy, alignment, justification, and tables. | Folded to `web-typography.md` core sections and table notes. |
| Typographic Detail | Letterspacing, ligatures, small caps, numeral styles, punctuation, hanging punctuation, drop caps, and OpenType CSS. | Folded to `web-typography/opentype-and-micro.md`. |
| Choosing and Using Fonts | Typeface description, genre taxonomy, web-font formats, subsetting, FOUT/FOIT, fallback matching, and loading strategy. | Folded to `web-typography/choosing-and-pairing.md`, `web-typography.md`, and `web-performance` cross-ref. |
| Guideline index | Consolidated list of named guidelines for quick lookup. | Folded to `web-typography/rutter-guidelines.md`. |

## Jason Santa Maria, *On Web Typography*

Extraction: `/tmp/books/on-web-typography.txt`. Density: HIGH for type selection,
pairing, and composition judgment inside `web-design` (`web-typography`). Already
folded across the main typography reference and `choosing-and-pairing.md`; the
SVG/icon-font note also corroborates `frontend-design`. No new quotes added in this
map pass.

### TOC / Chapter Map

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Introduction | Typography frames and mediates reading; the web changes control, constraints, and rendering. | Folded to `web-typography` stance. |
| 1. How We Read | Reading texture, rhythm, readability versus legibility, and why type quality shapes willingness to read. | Folded to `web-typography` stance. |
| 2. How Type Works | Web-font mechanics, type rendering basics, icon-font limitations, SVG icon alternative, OpenType and punctuation basics. | Folded to `web-typography` and lightly to `frontend-design` SVG/icon guidance. |
| 3. Evaluating Typefaces | Typeface anatomy, x-height, contrast, apertures, distinct letterforms, language coverage, web-service practicalities, and free-font caution. | Folded to `web-typography/choosing-and-pairing.md`. |
| 4. Choosing and Pairing Typefaces | Moment-versus-live-with distinction, word association, appropriateness/history, ready-made avoidance, narrowing candidates, and pairing judgment. | Folded to `web-typography/choosing-and-pairing.md`. |
| 5. Typographic Systems | Type scales, hierarchy, relative font sizing, display sizing, and system consistency. | Folded to `web-typography.md`; corroborates MailChimp typography lead. |
| 6. Composition | Layout, grids, baseline-grid skepticism, measure, whitespace, and responsive composition for reading. | Folded to `web-typography.md`; baseline-grid caution corroborates Rutter. |
| Resources / References | Tool and reading list, mostly 2014-era. | Source discovery only; verify current tooling before reuse. |

Verified quote: "SVG is the more flexible solution".

## Matej Latin, *Better Web Typography for a Better Web*

Extraction: `/tmp/books/better-web-typography.txt`. Density: HIGH as a worked
companion to Rutter and Santa Maria. Already folded into `web-design`
(`web-typography`) for the body-text triangle, language adjustments, scale/rhythm
tradeoffs, pairing traces, responsive type, and micro-typography. No new quotes added
in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction to web typography | Frames typography as shaping information for readers, not choosing fashionable fonts. | Folded to `web-typography` stance. |
| Anatomy of a typeface | Explains type anatomy and evaluation vocabulary. | Supports `web-typography/choosing-and-pairing.md`. |
| Choosing typefaces | Choose from content, goals, reader expectations, text length, weights/styles, language support, and loading cost. | Folded to `web-typography/choosing-and-pairing.md`. |
| Equilateral triangle of a perfect paragraph | Treats font size, line-height, and line length as a coupled body-text decision. | Folded to `web-typography.md` body-text triad. |
| Combining typefaces | Anchor-first pairing process, evaluate combinations, and make contrast clear or absent. | Folded to `web-typography/choosing-and-pairing.md`. |
| Rhythm in web typography | Paragraph spacing, heading margins, baseline/rhythm grids, and vertical flow. | Folded to `web-typography.md` rhythm section. |
| Modular scale and meaningful typography | Type scales for font sizes, reconciling scale with leading/rhythm, and optical tiebreakers. | Folded to `web-typography.md` scales/hierarchy. |
| Page composition | Grid/layout composition around the text block. | Corroborates `design-polish`/`frontend-design`; no direct fold beyond `web-typography`. |
| Responsive web typography | Breakpoint/fluid type treatment for measure, line-height, and reading context. | Folded to `web-typography.md` with modern `clamp()` staleness note. |
| Micro Typography | Ligatures, small caps, numerals, punctuation, drop caps, and detail characters. | Folded to `web-typography/opentype-and-micro.md`. |

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

## Apple Inc., *iOS Human Interface Guidelines* (2014)

Extraction: local Apple Books EPUB
`~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/877942287.epub`,
extracted to `/tmp/books/ios-human-interface-guidelines-2014.txt`. Density: MED-HIGH
for durable Apple doctrine, LOW for current component specs. Folded to
`apple-design/references/classic-hig-principles.md`; current HIG lookup remains the
source of truth for exact specs. Quotes verified via `scripts/verify_quotes.py`.

### TOC / Section Map

| Section | Short summary | Routing |
| --- | --- | --- |
| Designing for iOS | iOS 7-era deference, clarity, and depth; content-first UI, negative space, key color, borderless buttons, hierarchy through layers and motion. | Folded as historical doctrine; current material treatment routes to `liquid-glass-design-system.md`. |
| Anatomy / Layout and Appearance | Bars, content views, controls, temporary views, view-controller anatomy, size classes, Auto Layout, and adaptive layouts. | Source-map only; current implementation/specs route to `swiftui` and `hig.md`. |
| Navigation / Modal Contexts | Hierarchical, flat, and content-driven navigation; modal tasks as short, narrow, escapable interruptions; alerts as essential/actionable only. | Folded to `classic-hig-principles.md`; modern navigation specifics route to `apple-navigation-design.md`. |
| Interactivity, Feedback, Animation | Feedback helps people understand action/results; animation should communicate status, direct manipulation, and mental model, not decorate. | Folded to `classic-hig-principles.md`; implementation routes to `swiftui` animation references. |
| Branding / Color / Text / Iconography | Content-first branding, color as interactivity/state cue, text clarity, and semantic icon use. | Folded partly to `classic-hig-principles.md`; current brand guidance routes to `ios-brand-identity.md`. |
| Integration / Standard UI Elements | Use standard UIKit controls for standard actions; do not misuse system icons; custom controls must be task-driven and tested. | Folded to `classic-hig-principles.md`. |
| Design Principles / Process | Aesthetic integrity, consistency, direct manipulation, feedback, metaphors, user control, customization caution, and user testing. | Folded to `classic-hig-principles.md`. |
| Technologies / UI Elements / Icons | 2014-era technologies and component specs including 3D Touch, old bars, old metrics, and image matrices. | Skip for current specs; use `hig.md` if needed. |

## Apple Inc., *OS X Human Interface Guidelines* (2014)

Extraction: local Apple Books EPUB
`~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks/Books/930571558.epub`,
extracted to `/tmp/books/osx-human-interface-guidelines-2014.txt`. Density: HIGH for
Mac interaction doctrine, LOW for current visual/API specifics. Folded to
`apple-design/references/classic-hig-principles.md`; current HIG lookup remains the
source of truth for exact specs. Quotes verified via `scripts/verify_quotes.py`.

### TOC / Section Map

| Section | Short summary | Routing |
| --- | --- | --- |
| Designing for Yosemite / App Anatomy | Mac app styles, windows plus system menu bar, containment-heavy app structure, and content-focused Yosemite simplification. | Folded to `classic-hig-principles.md`; current window implementation routes to `swiftui`/macOS skills. |
| Starting and Stopping / Modality | Start instantly, defer setup, onboarding as last resort, Resume/Auto Save, least restrictive modality, visible modes, easy exits, alerts only when necessary. | Folded to `classic-hig-principles.md`; onboarding cross-check with `user-onboarding`. |
| Interoperability / Feedback | Standard file formats, Finder/Spotlight/Quick Look integration, immediate feedback, partial results, progress, failure explanation. | Folded to `classic-hig-principles.md`. |
| Menus / Windowing / Controls | Menu bar, contextual menus, windows, sheets, toolbars, controls, labels, and view layout. | Source-map only unless a Mac-specific design task needs historical rationale; current specs route to `hig.md`. |
| Accessibility / Assistance | Keyboard-only alternatives, no overriding accessibility shortcuts, platform Help menu, context help, and concise help tags/tooltips. | Folded to `classic-hig-principles.md`; current settings route to `apple-visual-accessibility.md`. |
| Drag and Drop / Keyboard Shortcuts / Pointers | Background selection, drag images, destination feedback, undo/confirmation for non-undoable drops, shortcut scarcity, modifier hierarchy. | Folded to `classic-hig-principles.md`. |
| Icons and Graphics | Mac app-icon tailoring vs iOS reuse, toolbar/sidebar icon semantics, template images, and system image meanings. | Folded to `classic-hig-principles.md`; current app icon work routes to `app-icon-design.md`. |

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

## Hunter / Biver / Fuqua, *Light: Science & Magic*

Extraction: `/tmp/books/light-science-magic.txt` from Apple Books PDF via `pdftotext`.
Density: HIGH for photographic lighting. Pass type: targeted lighting pass across the
book's core chapters, not a general photography screen. Some extracted text has
PDF/OCR drift (`Te`, `sofer`, `refection`), so verify any direct quote before use.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Light: the Beginning | Lighting is governed by principles rather than gear: effective source size, reflection types, and family of angles. | Created `photographic-lighting` framing. |
| 2. Light: The Raw Material of Photography | Brightness/color/contrast, hard vs soft shadows, source size vs effective size, and light-vs-lighting distinction. | Folded hard/soft decision rules. |
| 3. The Management of Reflection and the Family of Angles | Diffuse, direct, and polarized direct reflection; angle of incidence/reflection; family-of-angles placement. | Folded surface/reflection workflow. |
| 4. Surface Appearances | Surface texture, diffuse/direct balance, copy-lighting setups, and controlling flat surfaces. | Folded lightly through surface diagnosis. |
| 5. Revealing Shape and Contour | Depth clues, perspective vs tonal variation, light size/distance, and front/side/back/top direction. | Folded direction and shape rules. |
| 6. Metal | Polished metal as environment reflection; bright/dark metal controlled by filling or avoiding the family of angles. | Folded to surface reference. |
| 7. The Case of the Disappearing Glass | Glass edge definition, bright-field and dark-field setups, and removing distracting reflections. | Folded to surface reference. |
| 8. Making Portraits | Single-key portrait setup, soft source size, catchlights, key triangle, fill, hair/kicker/background lights. | Folded to portrait reference. |
| 9. The Extremes | White-on-white and black-on-black need lighting plus exposure to preserve edge separation and detail. | Folded to extremes checklist. |
| 10. Traveling Light / Working on Location | Portable flash/LED/location constraints, exposure, off-camera flash, bounce, and practical quality fixes. | Folded to field-lighting reference. |
| 11. Setting Up a Studio | Studio space/equipment planning and practical setup considerations. | Source-map only for now. |

Verified clean quotes used/foldable: "A small light source is always a hard light source"; "Most good lighting is, at least to some extent, side lighting."; "A single light is adequate for most portraits; the rest are optional."

## Tony Northrup, *Tony Northrup's DSLR Book: How to Create Stunning Digital Photography*

Extraction: `/tmp/books/tony-northrup-dslr.txt` from unpacked Apple Books EPUB
directory via `xmllint`. Density: MED overall, HIGH as a practical corroborator for
field lighting, flash, and portraits. Pass type: targeted lighting/portrait pass; the
camera/composition/genre chapters remain available for future screens if needed.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction | Advanced readers can start at lighting; beginners should read early camera chapters. | Context only. |
| 1. Quick Tips | Field checklist; includes fill/bounce flash reminders. | Folded only where lighting-specific. |
| 2. Composition | Focal point, frame-edge scan, foreground/background, story planning. | Mostly skipped as model-known; quote parked for future composition pass. |
| 3. Lighting and Flash | Natural light, hard/soft, direction, environmental reflection, golden hour, sun control, fill flash, bounce flash, modifiers, off-camera flash, white balance. | Folded practical flash/field moves. |
| 4. Controlling your Camera | Exposure modes, aperture/shutter/ISO, focus, RAW, stabilization, histogram. | Not routed in this pass. |
| 5. Problem Solving | Troubleshooting blur, exposure, focus, noise, dynamic range. | Not routed in this pass. |
| 6. Portraits | Outdoor/indoor portraits, locations, sun behind subject, shade/clouds, diffusers/reflectors, posing, studio basics, groups. | Folded portrait/field moves. |
| 7. Weddings | Event coverage, bounce/fill practice, batteries/recycle, venue scouting. | Lightly informs event flash; no separate fold. |
| 8. Animals | Catchlights, off-camera fill, umbrellas, polarizers for wildlife/aquariums. | Source-map only for future wildlife/photo pass. |
| 9. Landscapes | Golden hour, polarizers, water reflection, long exposure. | Not routed in this pass. |
| 10. Night Photography | Tripods, light painting, stars/fireworks/night scenes. | Not routed in this pass. |
| 11. HDR | Exposure bracketing and high-dynamic-range workflow. | Not routed in this pass. |
| 12. Close-up/Macro Photography | Macro technique and lighting constraints. | Not routed in this pass. |
| 13. Underwater | Underwater equipment, light/color loss, backscatter. | Not routed in this pass. |

Verified quotes used/foldable: "You always have some control over the lighting."; "Flash isn’t just for dark spaces."; "Use fill flash outdoors when your subject is backlit to fill in shadows and create catch lights in your model’s eyes."; "Use bounce flash indoors to softly light both the foreground and the background."; "Everything in the picture is part of the story, so plan every element carefully."; "Catchlights add life and interest to a subject."

## Gross / Bohnacker / Laub / Lazzeroni, *Generative Design: Visualize, Program, and Create with JavaScript in p5.js*

Extraction: `/tmp/books/generative-design-p5js.txt` from Apple Books PDF via
`pdftotext`. Density: MED-HIGH as a tutorial/pattern catalog for creative coding,
but dated as technical p5.js guidance (book code targets p5.js 0.5.11). Current route:
folded with Shiffman's *The Nature of Code* into `creative-coding`; earlier
designer-built-tool / abstraction-process precedent remains in `malleable-software`.

### TOC / Chapter Map

| Section | Short summary | Routing |
| --- | --- | --- |
| I.0-I.3 Introduction / Projects | Frames generative design as the designer shifting from hand performer to conductor of computer-aided variation; includes 13 project examples from daily sketches to data art, computational fashion, and type installations. | Folded process stance lightly to `malleable-software`. |
| P.0 Introduction to p5.js | p5.js/Processing lineage, browser editor vs local workflow, JavaScript basics, setup/draw, variables, loops, functions, arrays. | Dated technical tutorial; skip for now. |
| P.1 Color | Interactive HSB spectra, palette interpolation, extracting palettes from images, rule-bounded random palettes, ASE export. | Parked for future creative-coding/color-tool skill; stronger color theory remains `oklch-skill`/`graphics-fundamentals`. |
| P.2 Shape | Grids, moire, random/grid movement, SVG modules, agents, growth structures, circle packing, pendulum traces, drawing tools. | Parked; useful pattern bank for future generative visuals. |
| P.3 Type | Time-based text, text as blueprint, character frequency diagrams, treemaps, font-outline points, kinetic/noise type. | Parked; possible future typography/creative-coding corroboration. |
| P.4 Image | Image cutouts, image collections, pixel-value graphics, type from pixels, real-time image/camera values, emoji/pixel translation. | Parked; possible future creative-coding/image-processing skill. |
| A.1 Looking ahead / Reflection | Process reflection: abstract vague ideas into executable rules; use repetition, controlled randomness, logic, parameters, and interaction; designers become creators of individualized tools. | Folded to `malleable-software`. |

Verified quotes: "How do I abstract?"; "True randomness rarely produces compositionally interesting results."; "randomness is limited and applied in measured doses"; "Perhaps the most important aspect of this increase in possibilities is that the designer is now the creator of individualized tools"; "customized software tool".

## Daniel Shiffman, *The Nature of Code*

Extraction: local Apple Books EPUB
`~/Library/Mobile Documents/iCloud~com~apple~iBooks/Documents/The Nature of Code.epub`,
extracted to `/tmp/books/nature-of-code.txt`. Density: HIGH for `creative-coding`.
Processing APIs and library names are historical; use the concepts, then verify exact
syntax against current canvas/p5/Three/WebGL docs. Folded with *Generative Design*
to create `creative-coding`.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Acknowledgments / Preface | Processing lineage, course/story framing, ecosystem project, and syllabus arc from vectors through neural networks. | Source context only. |
| Introduction | Random walks; uniform, weighted, Gaussian, custom probability, Monte Carlo qualification, and Perlin noise. Warns against unbounded randomness as a design answer. | Folded to `creative-coding` randomness ladder. |
| 1. Vectors | Vectors as motion state; location/velocity/acceleration; magnitude, normalization, static/non-static vector operations, target acceleration. | Folded to `creative-coding` motion primitive. |
| 2. Forces | Newtonian force as vector; force accumulation; mass; gravity, friction, drag, attraction/repulsion; direction/magnitude decomposition. | Folded to `creative-coding` forces section. |
| 3. Oscillation | Angular motion, trigonometry, polar/cartesian conversion, sine waves, amplitude/period, pendulums, springs. | Folded as motion-pattern source for `creative-coding`; web UI timing still routes to `web-design`/`motion`. |
| 4. Particle Systems | Particle lifecycle, system manager, inheritance/polymorphism, global/per-particle forces, repellers, textures, alpha, additive blending. | Folded to `creative-coding` systems section. |
| 5. Physics Libraries | Custom physics vs libraries; Box2D/toxiclibs examples; world/body/shape/fixture/joint model; pixel-world vs simulation-world translation. | Folded to `creative-coding` library threshold. |
| 6. Autonomous Agents | Steering force formula, arrive/seek/flee, flow fields, path following, separation, behavior weights, flocking, and spatial subdivision for O(n^2) neighbor checks. | Folded to `creative-coding` steering/agents and performance. |
| 7. Cellular Automata | Grid cells, finite states, neighborhoods, generations, elementary CA, Wolfram rules, Game of Life, CA variation. | Folded to `creative-coding` automata pattern. |
| 8. Fractals | Recursion, Cantor/Koch examples, tree branching, L-systems, stochastic variations, fractals in visual/audio/text media. | Folded to `creative-coding` recursive/fractal pattern. |
| 9. The Evolution of Code | Genetic algorithms; genotype/phenotype; fitness, mating pool, crossover, mutation, interactive selection, ecosystem evolution. | Folded to `creative-coding` evolutionary variation. |
| 10. Neural Networks | Perceptron basics, steering brain, network diagrams, feed-forward animation; backprop beyond scope. | Source-map only for creative visualization; modern ML product UX routes to `ai-experience-design`. |

Verified quotes: "How do we define the rules that govern the behavior of our objects?"; "Defaulting to randomness is not a particularly thoughtful solution to a design problem"; "A library is great, but it provides a limited set of features."

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
| Errors | Separate slips from mistakes; prevent where possible with constraints, affordances, confirmations, and forgiving recovery. | Folded to `ux-writing/references/error-messages.md`. |
| Hierarchy / Hierarchy of Needs | Organize perceived importance and satisfy basic functional needs before higher-order delight. | Skipped for now; covered by `design-principles`, onboarding, and polish sources. |
| Iteration | Design and development iteration improve fitness over cycles. | Skipped as model-known and already covered by Shape Up/product process sources. |
| Layering | Organize information into related groupings, exposing only needed layers at a time. | Skipped for now; possible future IA/progressive-disclosure corroboration. |
| Signal-to-Noise Ratio | Maximize relevant signal, reduce irrelevant noise. | Skipped; covered by `data-viz`, visual accessibility, and UI polish sources. |
| Similarity / Self-Similarity | Similar elements are perceived as related; repeated structures reduce learning cost. | Skipped; covered by design-system/pattern and visual hierarchy material. |

## Aarron Walter, *Designing for Emotion*

Extraction: `/tmp/books/designing-for-emotion.txt`. Density: MED. Full screen completed
2026-06-12. No new skill/fold in this pass: the durable material is already routed
through `ux-writing`, `user-research`, `design-principles`, and `web-animation-design`.
Use this map as a cross-check before adding advice about delight, personality, tone,
trust, or playful failure handling. No direct quotes were added in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Emotional Design | Pleasure sits above functional, reliable, and usable foundations; emotion deepens memory, trust, and attachment but cannot substitute for utility. Wufoo and Betabrand are used as personality-heavy examples. | Already covered by `design-principles` hierarchy/delight constraints and `ux-writing` voice/tone. |
| 2. Designing for Humans | Human-perception hooks include baby-face bias, contrast, proportion, Hick's Law, and the aesthetic-usability effect. | Mostly skipped as covered by `design-principles`, `design-polish`, and Universal Principles material. |
| 3. Personality | The design persona artifact specifies traits, avoid-traits, voice, visual lexicon, copy examples, engagement methods, and where personality should appear or recede. | Already folded to `ux-writing/references/ui-voice-and-tone.md`; cross-check for brand/personality work. |
| 4. Emotional Engagement | Surprise, anticipation, exclusivity/status, priming, and variable rewards can deepen engagement, but delight must not carry critical feedback or interrupt workflows. | Already folded across `ux-writing`, `design-principles`, and `web-animation-design`; useful as a guardrail source. |
| 5. Overcoming Obstacles | Addresses skepticism, laziness, and apathy through trust signals, task momentum, content usefulness, and emotional-response research prompts. | Already folded to `user-research` and design-principles trust/obstacle framing. |
| 6. Forgiveness | Failure response should lead with facts, cadence, and repair before personality; goodwill helps but does not excuse weak incident handling. | Already folded to `ux-writing/references/error-messages.md`. |
| 7. Risk & Reward | Emotional-design risk should be bounded with small experiments, opt-out or fallback paths, one meaningful metric, and a clear tie to business goals. | Source-map lead for future `design-org-influence` or experiment-design edits; no new fold needed now. |

## Kim Scott, *Radical Candor*

Extraction: `/tmp/books/radical-candor.txt`. Density: HIGH for direct-report management.
Already folded as one of the three primary sources for `people-management`; quotes there
are verified. This backfill maps the book's chapter shape so future manager/feedback
edits can check the right source without rereading. No direct quotes were added in this
map pass.

### TOC / Chapter Map

| Part / chapter | Short summary | Routing |
| --- | --- | --- |
| Part I. A New Management Philosophy | Establishes the direct-report relationship model and the care/challenge axes, with failure modes for over-soft, harsh, and political behavior. | `people-management/SKILL.md` trust core; `feedback-and-guidance.md` candor framing. |
| 1. Build Radically Candid Relationships | Treats management as relationship work: caring personally, challenging directly, adapting to listener context, and building trust. | `people-management` trust core and 1:1 expectations. |
| 2. Get, Give, and Encourage Guidance | Builds the feedback system: solicit criticism first, give clear praise/criticism, reward candor, and avoid vague or biased guidance. | `people-management/references/feedback-and-guidance.md`. |
| 3. Understand What Motivates Each Person on Your Team | Uses career conversations, growth trajectories, rock-star/superstar distinctions, and growth plans to align work with individual motivation. | `people-management/references/growth-and-careers.md`. |
| 4. Drive Results Collaboratively | Separates listening, debate, decision, execution, and learning loops; warns against hierarchy-based decision drift. | `people-management/references/meetings-and-comms.md`. |
| Part II. Tools & Techniques | Converts the philosophy into repeatable manager rituals and org mechanisms. | All `people-management/references/` files. |
| 5. Relationships | Concrete practices for getting criticism from reports, public upward criticism, and skip-level support. | `feedback-and-guidance.md` and `meetings-and-comms.md`. |
| 6. Guidance | Tactics for giving praise/criticism, gauging whether it landed, and navigating bias around directness. | `feedback-and-guidance.md`. |
| 7. Team | Hiring, firing, and sustaining a mix of growth trajectories without neglecting steady high performers. | `growth-and-careers.md` and `hiring-and-firing.md`. |
| 8. Results | Staff meetings, debate/decision meetings, written updates, and management systems that make work move faster together. | `meetings-and-comms.md`. |

## Julie Zhuo, *The Making of a Manager*

Extraction: `/tmp/books/making-of-a-manager.txt`. Density: HIGH for first-time and
growing-team managers. Already folded as one of the three primary sources for
`people-management`; this map is a backfill. No direct quotes were added in this map
pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction. Great Managers Are Made, Not Born | Frames management as a learnable craft rather than an innate trait. | Context for `people-management`. |
| 1. What Is Management? | Defines the manager's job around outcomes, people, purpose, and future team health; separates leadership from title. | `people-management/SKILL.md` grading and delegation. |
| 2. Your First Three Months | Names transition archetypes: apprentice, pioneer, new boss, successor; each has different trust and change risks. | `people-management/SKILL.md` first-90-days section. |
| 3. Leading a Small Team | Establishes trust, human relationship, strengths, intolerable behavior, and quick people moves. | `people-management/SKILL.md` trust core and 1:1 guidance. |
| 4. The Art of Feedback | Sets expectations early, makes feedback specific and resonant, avoids compliment sandwiches, and uses feedback to improve outcomes. | `feedback-and-guidance.md`. |
| 5. Managing Yourself | Covers imposter feelings, self-awareness, best/worst self, confidence, and support needs. | Lightly routed to `people-management` support/Voltron; future manager-self-care edits should also check Hogan. |
| 6. Amazing Meetings | Classifies meetings by intended outcome, trims attendance, prepares better, and ends with owners/next steps. | `meetings-and-comms.md`. |
| 7. Hiring Well | Treats hiring as the manager's responsibility and a funnel system; emphasizes role clarity, outreach, interviews, debriefs, and weak-hire rejection. | `hiring-and-firing.md`. |
| 8. Making Things Happen | Links concrete vision, execution, priorities, process evolution, and team learning. | `people-management/SKILL.md` grading/delegation and `meetings-and-comms.md`. |
| 9. Leading a Growing Team | Covers delegation, scaling trust through managers, shared vision, struggling leaders, and making yourself less necessary to daily operations. | `people-management/SKILL.md` delegation and grading. |
| 10. Nurturing Culture | Defines culture through values, incentives, traditions, and what the team gives up to preserve values. | `meetings-and-comms.md` culture/incentives; possible `design-org-influence` cross-check for team norms. |

## Lara Hogan, *Resilient Management*

Extraction: `/tmp/books/resilient-management.txt`. Density: HIGH for practical manager
rituals, especially individual support, team expectations, comms plans, and resilience.
Already folded as one of the three primary sources for `people-management`; this map is
a backfill. No direct quotes were added in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction | Frames the book around management skills matched to team-stage needs, with coaching questions after each chapter. | Context for `people-management`. |
| 1. Meet Your Team | Uses BICEPS needs, 1:1 discovery questions, feedback preferences, personal operating style, and trust-building to understand each teammate. | `people-management/SKILL.md` trust core and BICEPS diagnosis. |
| 2. Grow Your Teammates | Distinguishes mentoring, coaching, sponsoring, and feedback; explains when each mode is useful and how to balance them over time. | `growth-and-careers.md` and `feedback-and-guidance.md`. |
| 3. Set Clear Expectations | Documents roles, responsibilities, vision, mission, strategy, objectives, team norms, and collaborative processes. | `growth-and-careers.md` structural clarity; `meetings-and-comms.md` culture/process. |
| 4. Communicate Effectively | Builds communication plans for change, confidentiality, disagree-and-commit, audience reactions, message repetition, and recap channels. | `meetings-and-comms.md`. |
| 5. Build Resiliency | Protects manager/team energy through support networks, crisis handling, input loops, and manager self-management. | `people-management/SKILL.md` Voltron/support and crisis script. |

## Melissa Perri, *Escaping the Build Trap*

Extraction: `/tmp/books/escaping-build-trap.txt`. Density: HIGH for product strategy,
metrics-led discovery, and product-led org design. Screened and folded with Gothelf/
Seiden and Klein; verified quote manifest lives in `docs/pending-folds-product-trio.md`
and should remain the source for verbatim reuse. This map is a backfill only.

### TOC / Chapter Map

| Part / chapter | Short summary | Routing |
| --- | --- | --- |
| Part I. The Build Trap | Defines output obsession, value exchange, projects/products/services, product-led orgs, and knowledge gaps. | `design-org-influence` build-trap diagnosis; `shape-up` metrics-led school. |
| 1-2. Value exchange and constraints | Frames value as reciprocal customer/business exchange, then shows constraints that block it. | `design-org-influence`; `user-research` for value validation. |
| 3-5. Projects, products, services, product-led orgs, known/unknown | Separates project funding from product learning and asks what the org actually knows about customers and outcomes. | `shape-up` product strategy; `design-org-influence` org diagnosis. |
| Part II. Role of the Product Manager | Defines bad archetypes, good PM behavior, career path, and team organization. | Mostly `design-org-influence`; not a standalone PM skill. |
| 6-9. PM archetypes, great PM, career path, teams | Warns against waiter/order-taker/project-manager PM modes; emphasizes customer problem ownership and team structures. | `design-org-influence`; some `shape-up` routing for team boundaries. |
| Part III. Strategy | Turns strategy into a decision framework with strategic gaps, company intent, product vision, and portfolio levels. | `shape-up` metrics-led product strategy school. |
| 10-14. Strategy framework, gaps, intents, vision, portfolio | Covers Bungay-style gaps, strategic intents, product vision, portfolio decisions, and strategy deployment. | `shape-up`; `design-org-influence` for executive communication gaps. |
| Part IV. Product Management Process | Introduces Product Kata, success metrics, problem exploration, solution exploration, and outcome-gated building. | `user-research/references/validation-and-metrics.md`; `shape-up`. |
| 15-19. Product Kata through solution optimization | Uses current-state metrics, obstacle diagnosis, hypothesis tests, MVP learning, and outcome-based done criteria. | `user-research` validation/metrics; `shape-up` done/scope rules. |
| Part V. Product-Led Organization | Covers outcome communication, incentives, safety, budgeting, customer centricity, and a product-led case narrative. | `design-org-influence`; `shape-up` budgeting and roadmap/sales-roadmap split. |
| 20-25 + Afterword + Appendix | Builds product ops/communication systems, warns about incentives tied to shipping, reframes budgeting, and gives product-led diagnostic questions. | `design-org-influence`; `shape-up`; appendix questions as diagnostic probes. |

## Jeff Gothelf and Josh Seiden, *Lean UX* (1st ed.)

Extraction: `/tmp/books/lean-ux.txt`. Density: MED/HIGH as a validation-process source,
but era-tag heavily: some process/tool/fidelity advice predates current AI generation
and current polish standards. Screened and folded with Perri and Klein; verified quote
manifest lives in `docs/pending-folds-product-trio.md`.

### TOC / Chapter Map

| Part / chapter | Short summary | Routing |
| --- | --- | --- |
| Preface / framing | Explains Lean UX as collaborative, cross-functional, outcome-oriented product design with lighter deliverables. | Context; conflict-scoped against polish doctrine where needed. |
| Part I. Introduction and Principles | Establishes cross-functional teams, small batches, continuous discovery, shared understanding, externalized work, learning over growth, and outcomes over output. | `user-research` validation cadence; `design-org-influence` org/practice shifts. |
| 1. Why Lean UX? | Software distribution reduces the cost of learning, pushing designers toward shorter cycles and tighter team collaboration. | `design-org-influence`; era-tag old software-distribution claims. |
| 2. Principles | Lists the operating principles for problem-focused teams, reduced waste, small batches, discovery, and getting out of deliverables. | `user-research`; `design-org-influence`; `client-work/references/client-engagements.md` for deliverables/outcomes. |
| Part II. Process | Converts principles into hypotheses, collaborative design, MVP experiments, and continuous feedback. | `user-research/references/validation-and-metrics.md`. |
| 3. Vision, Framing, and Outcomes | Declares assumptions, writes problem statements and hypotheses, breaks hypotheses into subhypotheses, and uses proto-personas/features as testable claims. | `user-research` hypotheses/benchmarks. |
| 4. Collaborative Design | Runs design studio, style-guide collaboration, and distributed collaborative design practices. | Mostly skipped as covered by `design-prototyping`/design-systems; use as corroboration. |
| 5. MVPs and Experiments | Maps prototype fidelity and non-prototype MVP types to what needs to be learned. | `user-research`; conflict note that AI changes fidelity economics but not artifact-to-feedback matching. |
| 6. Feedback and Research | Describes continuous collaborative research, 3-12-1 cadence, Meetup case, test-everything rule, and contradiction triage. | `user-research/references/validation-and-metrics.md`. |
| Part III. Making It Work | Adapts Lean UX into Agile and organizational change. | `design-org-influence`; `client-work/references/client-engagements.md`. |
| 7. Integrating Lean UX and Agile | Fits validation, kickoff, themes, and shared vision into Scrum-like rhythms. | Light corroboration for `design-org-influence`; skip stale Agile mechanics unless asked. |
| 8. Making Organizational Shifts | Covers outcomes, roles, new UX skills, cross-functional teams, UX debt, agencies, vendors, documentation, and managing up. | `design-org-influence`; `client-work/references/client-engagements.md`; UX-debt framing. |

## Laura Klein, *Build Better Products*

Extraction: `/tmp/books/build-better-products.txt`. Density: HIGH for research-backed
product validation, onboarding behavior, prioritization, metrics, and team shape.
Screened and folded with Perri and Gothelf/Seiden; verified quote manifest lives in
`docs/pending-folds-product-trio.md`.

### TOC / Chapter Map

| Part / chapter | Short summary | Routing |
| --- | --- | --- |
| Part I. Goal | Starts from measurable business need and lifecycle funnel math while warning that business goals alone can distort product work. | `shape-up` initiative shaping; `user-research` measurement setup. |
| 1. Defining a Better Business Need | Turns business need into measurable, achievable goals and user-lifecycle math. | `shape-up`; `user-research` metrics. |
| Part II. Empathy | Defines the user, picks research methods, and improves listening/interviewing. | `user-research`. |
| 2. Understand Your User Better | Uses provisional/predictive personas, problem patterns, and user maps; warns against overbroad persona claims. | `user-research` predictive personas and sell-it tests. |
| 3. Do Better Research | Chooses research topics and methodologies matched to what needs to be learned. | `user-research` method selection. |
| 4. Listen Better | Builds empathy through goal-directed interviewing, question discipline, and better listening. | `user-research`; some `ux-writing` interview-copy adjacency if needed. |
| Part III. Creation | Generates, prioritizes, designs, and drives behavior from user tasks and constraints. | `shape-up`; `user-onboarding`. |
| 5. Have Better Ideas | Roots idea generation in user-defined tasks, customer journeys, and problem evidence. | `design-org-influence` idea-source correction; `user-research`. |
| 6. Prioritize Better | Uses user behavior, quick estimates, and Finding the Core to identify what must be built. | `shape-up` scope hammering. |
| 7. Design Better | Starts from context and flow, asks what happens next, matches inputs/outputs, and uses style guides/patterns. | `shape-up`; `design-prototyping`/design-systems as secondary. |
| 8. Create Better User Behavior | Designs backward from behavior, gives new users tasks, maps triggers, and prioritizes core loops before onboarding/discovery/mastery. | `user-onboarding`; `shape-up` behavior-before-feature stance. |
| Part IV. Validation | Identifies assumptions, turns them falsifiable, and chooses validation methods. | `user-research/references/validation-and-metrics.md`. |
| 9. Identify Assumptions Better | Categorizes assumptions, finds risky stacks, and creates falsifiable statements with two-number evidence rules. | `user-research`. |
| 10. Validate Assumptions Better | Chooses validation methods, tracks hypotheses, and treats danger metrics/no-neutral results as part of experiment design. | `user-research`. |
| Part V. Measurement | Builds metrics early, distinguishes metric types, and warns about gaming and reporting-only analytics. | `user-research` metrics hygiene. |
| 11. Measure Better | Covers business, UX, engineering, health, leading, feature-specific, and vanity metrics plus segmentation/cohort concerns. | `user-research/references/validation-and-metrics.md`. |
| 12. Build a Better Team | Compares silos, communes, dictators, anarchies, and a heist-team model for product teams. | `design-org-influence`; possible future team-shape cross-check. |

## Austin Kleon, *Show Your Work!*

Extraction: `/tmp/books/show-your-work.txt`. Density: MED-HIGH for public craft practice
and audience-building habits. Already folded to `building-in-public`; this is a map
backfill only. No direct quotes added in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| A New Way of Operating | Frames public work as a repeatable operating system, not a launch campaign. | `building-in-public`. |
| 1. You Don't Have to Be a Genius | Treats creativity as networked participation, attribution, and showing up inside a scene rather than lone-genius performance. | `building-in-public` audience/network stance. |
| 2. Think Process, Not Product | Share process, drafts, influences, questions, and working traces, not only finished artifacts. | `building-in-public` rough-beats-polished and daily dispatch. |
| 3. Share Something Small Everyday | Build a daily cadence; separate flow from durable stock; keep small dispatches from becoming performative noise. | `building-in-public` daily-dispatch and stock/flow. |
| 4. Open Up Your Cabinet of Curiosities | Share influences and source trails with context; curation becomes part of the work. | `building-in-public`; possible `write-clear-prose` attribution/citation cross-check. |
| 5. Tell Good Stories | Put work inside a narrative so others can understand stakes, sequence, and meaning. | `building-in-public`; `write-clear-prose` if shaping the story itself. |
| 6. Teach What You Know | Teaching builds audience and clarifies practice without waiting for expert status. | `building-in-public`; possible `learning-experience-design` only when designing a real course/workshop. |
| 7. Don't Turn Into Human Spam | Be an open node: contribute, listen, credit, and avoid self-promotion without reciprocity. | `building-in-public` human-spam/open-node behavior. |
| 8. Learn to Take a Punch | Public work requires filtering criticism, protecting boundaries, and continuing after feedback. | `building-in-public` criticism/momentum guardrails. |
| 9. Sell Out | Build owned surfaces, mailing lists, and value exchange without treating commerce as betrayal. | `building-in-public` own-your-turf and permission list. |
| 10. Stick Around | Momentum, archives, restarts, and long-term rhythm matter more than a single burst. | `building-in-public` long-game practice. |

## Chip Heath and Dan Heath, *Made to Stick*

Extraction: `/tmp/books/made-to-stick.txt`. Density: LOW-MED overall because SUCCESs is
model-known, MED as a scoped source for stakeholder pitches, devtool landing pages, and
prose that must be remembered and acted on. Already folded to `design-org-influence`,
`devtools/references/developer-tool-gtm.md`, and `write-clear-prose`; this is a map
backfill only. No direct quotes added in this map pass.

### TOC / Chapter Map

| Chapter / section | Short summary | Routing |
| --- | --- | --- |
| Talking Strategy / Teaching That Sticks / Unsticking an Idea | Added-material sections apply the same checklist to internal strategy communication, teaching, and replacing sticky false beliefs. | Source-map lead for future strategy-comms or learning-design corroboration; no current fold needed. |
| Intro / What Sticks | Defines sticky ideas as understandable, memorable, and behavior-changing; names the Curse of Knowledge as the villain. | `design-org-influence` pitch framing and `write-clear-prose` sticky pass. |
| 1. Simple | Find the core, make it compact, and use schemas/analogies without losing decision-useful meaning. | `design-org-influence` one-lead framing; `devtools` landing-page core message. |
| 2. Unexpected | Break patterns in service of the core; open knowledge gaps that sustain attention. | `design-org-influence`; use carefully in `write-clear-prose`, not as gimmick advice. |
| 3. Concrete | Make abstract ideas sensory, specific, and shared enough for novices and cross-functional groups to coordinate. | `design-org-influence`; `devtools` concrete workflow scenes. |
| 4. Credible | Make evidence believable through authority, anti-authority, convincing detail, human-scale statistics, and testable credentials. | `design-org-influence`; `devtools` human-scale metrics and proof. |
| 5. Emotional | Make people care through identity, self-interest, and one-person concreteness rather than abstract importance. | `write-clear-prose`; `design-org-influence` stakeholder care-making. |
| 6. Stories | Stories simulate action and inspire behavior; the story should carry the moral, not merely decorate it. | `write-clear-prose`; `design-org-influence`; `devtools` story before moral. |
| What Sticks / symptoms and solutions | Recasts the checklist as a diagnostic for communication failures: attention, understanding, belief, care, and action. | `write-clear-prose` revision lens; no separate skill. |

## Julie Dirksen, *Design For How People Learn*

Extraction: `/tmp/books/design-for-how-people-learn.txt`. Density: HIGH. Created
`learning-experience-design` as a single-deep-method skill because no existing skill
owned courses, workshops, internal training, job aids, practice, feedback, and
performance-support design. This is a map backfill only. No direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Where Do We Start? | Diagnose the real gap: knowledge, skill, motivation, environment, or communication; learning is a journey toward doing. | `learning-experience-design` gap diagnosis. |
| 2. Who Are Your Learners? | Understand learner context, prior knowledge, motivation, and constraints; observe instead of assuming. | `learning-experience-design` learner observation; `user-research` only for broader product research. |
| 3. What's The Goal? | Define the destination behavior clearly enough to design and evaluate against it. | `learning-experience-design` goals and performance outcomes. |
| 4. How Do We Remember? | Applies memory, context, retrieval, recognition vs recall, and cognitive load to learning design. | `learning-experience-design`; `design-principles` only as secondary cognition corroboration. |
| 5. How Do You Get Their Attention? | Attention is prerequisite; use relevance, social context, and curiosity without confusing entertainment for learning. | `learning-experience-design`; possible `user-onboarding` cross-check for first-run attention. |
| 6. Design for Knowledge | Teach knowledge through context, examples, learner engagement, and application across circumstances. | `learning-experience-design` knowledge design. |
| 7. Design for Skills | Skills require practice, feedback, progression, and realistic scenarios. | `learning-experience-design` practice/feedback core. |
| 8. Design for Motivation | Addresses the "I know, but..." gap through motivation-to-learn and motivation-to-do. | `learning-experience-design`; possible `user-onboarding` behavior-change cross-check. |
| 9. Design for Environment | Sometimes the right solution is environmental support, job aids, process change, or information in the world. | `learning-experience-design` performance support; `design-org-influence` for org-process barriers. |
| 10. Conclusion | Reasserts capability in the real world as the goal of learning design. | Context only. |

## Leah Buley, *The User Experience Team of One*

Extraction: `/tmp/books/the-user-experience-team-of-one.txt` via `pdftotext`; text is
usable despite font-weight warnings. Density: MED. No new skill: the method catalog
routes to `user-research` and `design-prototyping`, while solo-UX influence routes to
`design-org-influence`. This is a map backfill only. No direct quotes added here.

### TOC / Chapter Map

| Part / chapter | Short summary | Routing |
| --- | --- | --- |
| Part I. Philosophy | Explains solo UX conditions: establish enough UX practice to make progress without waiting for a full team or formal mandate. | `design-org-influence` team-of-one stance. |
| 1. UX 101 | Defines UX broadly, where the field comes from, and how different backgrounds enter the work. | Context only; model-known. |
| 2. Getting Started | Get to know the UX toolkit, establish a point of view, learn users, and start designing. | `design-org-influence`; `user-research` for user-learning methods. |
| 3. Building Support for Your Work | Favors principles over process, handles people/org issues, and responds to objections. | `design-org-influence/references/influence-field-notes.md`. |
| 4. Growing Yourself and Your Career | Uses communities, continuing education, and career-growth cases for solo practitioners. | Possible `design-org-influence` career-growth cross-check; not a current fold target. |
| Part II. Practice | Method catalog chosen for lightweight execution, stakeholder involvement, and education-by-doing. | Route by method family below. |
| 5. Planning and Discovery Methods | UX questionnaire, project plan, listening tour, opportunity workshop, project brief, strategy workshop. | `design-org-influence` Listening Tour/scope-not-permission; `user-research` planning. |
| 6. Research Methods | Learning plan, guerrilla research, proto-personas, heuristic markup, comparative assessment, content patterns. | `user-research`; `design-org-influence` for lightweight adoption constraints. |
| 7. Design Methods | Design brief, design principles, sketching, sketchboards, task flows, wireframes. | `design-prototyping`; especially participatory sketching and visible artifacts. |
| 8. Testing and Validation Methods | Paper/interactive prototypes, black-hat session, quick usability test, five-second test, UX health check. | `design-prototyping`; `user-research` for validation setup. |
| 9. Evangelism Methods | Bathroom UX, mini case studies, peer learning community, pyramid evangelism. | `design-org-influence` pyramid evangelism and support-building. |
| 10. What's Next? | Looks forward to UX maturation and sustaining the practice. | Context only. |

## Dan Mall, *Pricing Design*

Extraction: `/tmp/books/pricing-design.txt`. Density: HIGH as a compact pricing-school
source. Already folded into `client-work/references/pricing-creative-work.md`; this is
a map backfill only. No direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction | Frames pricing as a business skill designers can practice, not a mysterious rate-card exercise. | `client-work/references/pricing-creative-work.md`. |
| 1. Pricing Methods | Compares cost-plus, market-rate, and value-based pricing; shows why provider-only math caps upside and ignores buyer context. | `client-work` pricing schools; route conflicts against Do/Stark defaults. |
| 2. Value-Based Pricing | Prices value, risk, trust, scarcity, and client-specific upside rather than hours or deliverables. | `client-work/references/pricing-creative-work.md`. |
| 3. A Pricing Case Study | Works through Goldilocks/three-option pricing, deliberately different value traits, and incomparable units. | `client-work` pricing mechanics. |
| 4. Value Pricing: What to Expect | Sets expectations for higher loss rate, better-fit clients, objections, and confidence while applying value pricing. | `client-work` qualification and negotiation. |

## Mike Monteiro, *You're My Favorite Client*

Extraction: `/tmp/books/favorite-client.txt`. Density: HIGH for client engagement
mechanics. Already folded into `client-work/references/client-engagements.md` and its
pricing terms references; this is a map backfill only. No direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction | Written to clients, but useful from both chairs: good design work requires prepared buyers and accountable designers. | `client-work/references/client-engagements.md`. |
| 1. Why You Need Design | Explains design as problem-solving under business constraints, not decoration or magic. | `client-work`; `design-org-influence` only for internal design-value advocacy. |
| 2. Hiring a Designer | Covers in-house vs outside help, designer seniority, portfolio/communication signals, trust, and fit. | `client-work` qualification and hiring. |
| 3. Working Together | Sets up discovery, goals, decision roles, client participation, business model clarity, and project collaboration. | `client-work` kickoff/sign-off mechanics. |
| 4. Evaluating Work and Giving Feedback | Teaches feedback discipline: discuss the work, avoid prescriptive solutions, resolve internal disagreement, and train honest critique. | `client-work` feedback system; `design-prototyping` for presentation/session craft. |
| 5. When Things Go Well | Covers healthy collaboration, sign-off, testing, iteration, and sustaining momentum. | `client-work` engagement health. |
| 6. When Things Go Wrong | Handles mistakes, trust breakdowns, firing/being fired, kill fees, and recovery after bad engagements. | `client-work` health-and-failure reference. |
| Glossary / Resources | Defines client-service vocabulary and points to companion design/client books. | Source discovery; no fold needed. |

## Erika Hall, *Just Enough Research* (2nd ed.)

Extraction: `/tmp/books/just-enough-research.txt`. Density: HIGH as one of the three
primary sources for `user-research`. Already folded into `user-research` and references;
this is a map backfill only. No direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Enough is Enough | Defines practical research, research purposes, and the politics of doing enough to make better decisions. | `user-research/SKILL.md` fundamentals. |
| 2. The Basics | Covers research roles, collaboration, responsibilities, ethics, bias, rigor, and objections. | `user-research/references/research-fundamentals.md`; `study-logistics.md`. |
| 3. The Process | Moves from problem definition to approach selection, recruiting, data collection, analysis, and reporting. | `user-research` study setup and synthesis. |
| 4. Organizational Research | Researches stakeholders, organizations, constraints, and internal systems before user-facing work. | `user-research`; `design-org-influence` if the task is org change. |
| 5. User and Customer Research | Covers interviews, contextual inquiry, focus groups, and when each method fits. | `user-research/references/method-selection.md`; `interviewing-craft.md`. |
| 6. Competitive Research | Uses competitive/brand audits and market context without mistaking competitors for users. | `user-research`; possible `design-org-influence` strategy input. |
| 7. Evaluative Research | Usability testing, heuristic analysis, and other evaluative methods for improving designs. | `user-research`; `design-prototyping` only for prototype session craft. |
| 8. Analysis and Models | Turns observations into models, personas, journey/workflow artifacts, and shared understanding. | `user-research/references/synthesis-and-impact.md`. |
| 9. Surveys | Treats surveys as hard-to-design quantitative instruments, not a fallback for blocked qualitative research. | `user-research/references/method-selection.md`. |
| 10. Analytics | Frames analytics/split testing as optimization and measurement, with limits on what numbers explain. | `user-research`; product-trio metrics cross-check. |

## Steve Portigal, *Interviewing Users*

Extraction: `/tmp/books/interviewing-users.txt`. Density: HIGH for interview craft and
research impact. Already folded into `user-research/references/interviewing-craft.md`,
`study-logistics.md`, and `synthesis-and-impact.md`; this is a map backfill only. No
direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. The Importance of Interviewing in Design | Sets interviewing apart from other methods and explains why fieldwork reframes product assumptions. | `user-research` fundamentals. |
| 2. A Framework for Interviewing | Defines the interviewer stance: worldview, curiosity, rapport, and being in the participant's context. | `user-research/references/interviewing-craft.md`. |
| 3. Getting Ready to Conduct Your Interviews | Identifies objectives, stakeholders, recruiting, participants, field guides, logistics, and consent. | `user-research/references/study-logistics.md`. |
| 4. More Than Just Asking Questions | Uses stimuli, artifacts, homework, activities, and co-created materials to deepen interviews. | `user-research` method selection and interview craft. |
| 5. Key Stages of the Interview | Manages crossing the threshold, objectives, kickoff, awkwardness, tipping point, reflection, and soft close. | `user-research/references/interviewing-craft.md`. |
| 6. How to Ask Questions | Question palette, follow-ups, contrasts, projection, silence, and wording choices. | `user-research/references/interviewing-craft.md`. |
| 7. Documenting the Interview | Note taking, recordings, photos, debriefs, and field highlights. | `user-research/references/study-logistics.md`; `synthesis-and-impact.md`. |
| 8. Optimizing the Interview | Troubleshoots reluctant participants, awkward dynamics, team roles, and interviewer improvement. | `user-research/references/interviewing-craft.md`. |
| 9. Making an Impact with Your Research | Turns data into themes, findings, organizational learning, and research leadership. | `user-research/references/synthesis-and-impact.md`. |

## Tomer Sharon, *Validating Product Ideas*

Extraction: `/tmp/books/validating.txt`. Density: HIGH as a lean validation-method
source. Already folded into `user-research` alongside Hall/Portigal, with method
selection and logistics details distributed across references. This is a map backfill
only. No direct quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. What Do People Need? | Uses experience sampling to understand needs before a product exists. | `user-research/references/method-selection.md`. |
| 2. Who Are the Users? | Uses interviewing to identify audiences and understand people in context. | `user-research/references/interviewing-craft.md`. |
| 3. How Do People Currently Solve a Problem? | Uses observation to understand current behavior and workarounds. | `user-research/references/method-selection.md`. |
| 4. What Is the User's Workflow? | Uses diary studies to capture complex or repeated processes over time. | `user-research/references/method-selection.md`; `study-logistics.md`. |
| 5. Do People Want the Product? | Uses concierge MVPs and fake doors to test demand and marketing before building. | `user-research`; product-trio validation cross-check. |
| 6. Can People Use the Product? | Uses online usability testing for sketches, prototypes, or working products. | `user-research`; `design-prototyping` for prototype craft. |
| 7. Which Design Generates Better Results? | Uses A/B testing where traffic and decision stakes justify it. | `user-research` metrics/method selection. |
| 8. How Do People Find Stuff? | Uses tree testing, first-click testing, and lostness metrics for findability. | `user-research`; parked IA skill candidate if paired with stronger IA sources. |
| 9. How to Find Participants for Research? | Treats recruiting as the research bottleneck and covers participant sourcing. | `user-research/references/study-logistics.md`. |

## Samuel Hulick, *The Elements of User Onboarding*

Extraction: `/tmp/books/elements-of-user-onboarding.txt` from local Apple Books PDF
via `pdftotext -layout`. Density: HIGH, but primary material already lives in
`user-onboarding`; this recheck added only two small folds: adoption-chain audit
before UI changes, and an education/nurture path when timing is wrong.

### TOC / Chapter Map

| Section / chapter | Short summary | Routing |
| --- | --- | --- |
| Section 1, Crossing the onboarding chasm | Frames onboarding as the bridge from stranger to thriving user across marketing and product boundaries. | `user-onboarding/SKILL.md`; adoption-chain audit backfilled 2026-06-13. |
| 1. Retracing Your Steps to Success | Starts from a successful user and works backward through every step that got them there. | `user-onboarding/SKILL.md` customer journey. |
| 2. Making Better People | Defines onboarding around the user's improvement rather than product feature exposure. | `user-onboarding/SKILL.md` core philosophy. |
| Section 2, Helping users envision their improvement | Pre-signup persuasion: dream, attention, switching pain, emotion, rational support, and reduced friction. | `user-onboarding/references/selling-the-dream.md`. |
| 3. Selling the Dream | Lead with the better version of the user, not the product object. | `selling-the-dream.md`. |
| 4. From "I'm listening..." to "I get it!" | Create the aha moment before signup by connecting the offer to the user's real life. | `selling-the-dream.md`. |
| 5. The Painful Joy of Switching | Name current workarounds and lower migration, learning, and habit-change costs. | `selling-the-dream.md`. |
| 6. The Emotional Tie That Binds | Use emotional resonance and product personality to make the change feel worth it. | `selling-the-dream.md`; Walter cross-check for personality. |
| 7. Providing Rational Ammunition | Give social proof, parity/difference claims, and decision evidence users can justify. | `selling-the-dream.md`. |
| 8. Clearing the Runway for Takeoff | Remove or defer signup friction and disconnects before asking for commitment. | `user-onboarding/SKILL.md`; form/copy adjacency. |
| Section 3, Helping users achieve their improvement | First-run and habit formation: quick win, safe landing, tailored starts, momentum, and recurring use. | `user-onboarding` references. |
| 9. Picking Out the Quick Win | Choose a first success that demonstrates core value, fits one sitting, and avoids dependency on others. | `first-impressions.md`; `empty-states.md`. |
| 10. Planning the First-Run Experience | Shape the path to base camp around the user's first meaningful result. | `first-impressions.md`. |
| 11. Designing for a Safe Landing | Help users land after signup with context, orientation, and a next useful action. | `first-impressions.md`; `empty-states.md`. |
| 12. Tailoring the First Impressions | Use the user's arrival context and intent to adapt the first-run path. | `first-impressions.md`. |
| 13. Driving to Victory | Use setup quests, progress, encouragement, and lifecycle messaging to keep momentum. | `driving-momentum.md`. |
| 14. Creating "Regulars" | Continue onboarding into recurring use and advanced adoption rather than stopping at signup. | `driving-momentum.md`. |

## IDEO.org, *The Field Guide to Human-Centered Design*

Extraction: `/tmp/books/ideo-field-guide-human-centered-design.txt` from local PDF
via `pdftotext -layout`. Density: MED-HIGH as a method catalog, but no new skill
or body fold in this pass: `user-research` and `design-prototyping` already cover
the durable rules. Use this map as a future cross-check for service design, field
methods, co-design, and live/pilot prototypes.

### TOC / Section Map

| Section / method cluster | Short summary | Routing |
| --- | --- | --- |
| Mindsets | Human-centered design stance: learn from people, make tangible artifacts, iterate, and keep impact practical. | `design-principles`; `design-prototyping` only when shaping practice. |
| Inspiration | Frame the challenge, plan research, recruit across context, interview, group/expert interview, immerse, observe, and seek analogous inspiration. | `user-research` method selection, logistics, interviewing craft. |
| Participatory field methods | Card sort, peers observing peers, immersion, analogous inspiration, collage, guided tour, draw it, resource flow, and related activities. | `user-research`; future field-method expansions. |
| Ideation synthesis | Download learnings, share stories, find themes, create insight statements, and turn insights into How Might We questions. | `user-research/references/synthesis-and-impact.md`; `design-prototyping` for artifact decisions. |
| Ideation generation | Brainstorm, bundle ideas, get visual, mash-ups, design principles, concept creation, and co-creation session methods. | `design-prototyping`; `design-org-influence` if the problem is facilitation buy-in. |
| Prototyping | Determine what to prototype, storyboard, role play, rapid prototype, get feedback, and iterate. | `design-prototyping`; existing one-question-per-artifact and cheap-fidelity rules remain stronger. |
| Implementation | Live prototype, roadmap, resource assessment, partnerships, staffing, funding, pilot, define success, monitor, and evaluate. | `design-prototyping` for live/pilot tests; `design-org-influence` or product strategy only if implementation planning is the task. |

## UserTesting, *A Complete Guide to User Testing Your Next Project*

Extraction: `/tmp/books/usertesting-complete-guide.txt` from local PDF via
`pdftotext -layout`. Density: LOW-MED and vendor/tool-adjacent. No fold: it
corroborates existing `user-research` guidance on focused objectives, task writing,
question wording, piloting a study, error sources, and result analysis.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Define your objective | Keep the study objective clear and singular before writing tasks. | `user-research/references/study-logistics.md`. |
| Identify what you need to measure | Pair tasks with metric or response types that answer the objective. | `user-research`; product-trio metrics cross-check. |
| Create your tasks | Use broad-to-specific flow, concise tasks, and realistic participant actions. | `user-research`; no new fold. |
| Write great questions / question types | Avoid jargon and leading wording; choose open response, ratings, multiple choice, or verbal response deliberately. | `user-research/references/interviewing-craft.md`. |
| Test out your test | Pilot the study with one participant before launch. | Already present in `user-research` checklist. |
| Beware of errors / analyze results | Watch researcher and respondent errors, then analyze against hypotheses and questions. | `user-research` rigor and synthesis. |

## UXPin, *The Guide to Usability Testing*

Extraction: `/tmp/books/uxpin-usability-testing.txt` from local PDF via
`pdftotext -layout`. Density: MED as a broad taxonomy, but no body fold. It
mostly corroborates `user-research` and the parked IA candidate with testing
types, participant planning, card sorting, tree testing, first-click tests, field
and diary studies, desirability testing, concept testing, and mobile testing.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Introduction | Frames usability testing as behavioral verification, not opinions about a design. | `user-research`. |
| 2. Usability Testing Goals | Defines objectives, metrics, and benchmark questions. | `user-research`; product-trio metrics. |
| 3. Choosing Your Test and Participants | Maps test types, target audience, recruiting, and test-plan structure. | `user-research/references/method-selection.md`; `study-logistics.md`. |
| 4. Scripted Tests | Moderated/unmoderated tradeoffs, tree testing, benchmark testing, and hallway testing. | `user-research`; IA source-map cross-check. |
| 5. Decontextualized Tests & Heuristic Reviews | Card sorting, interviews, and heuristic evaluation. | `user-research`; parked IA candidate. |
| 6. Natural & Near-Natural Tests | A/B, first-click, diary/field, eye tracking, and beta testing. | `user-research`; product validation. |
| 7. Hybrid Tests | Desirability, concept, and participatory testing. | `user-research`; `design-prototyping` for concept artifacts. |
| 8. Website & Mobile Usability Testing | Web/mobile-specific setup, device constraints, and platform coverage. | `user-research`; platform skills only for current technical specs. |

## Marcin Treder, *UX Design for Startups*

Extraction: `/tmp/books/ux-design-for-startups.txt` from local PDF via
`pdftotext -layout`. Density: LOW-MED; broad startup UX primer with dated tooling
and mostly covered advice. No fold in this pass. Useful as corroboration for
startup-context research, lightweight wireframes/prototypes, and behavior metrics.

### TOC / Chapter Map

| Section | Short summary | Routing |
| --- | --- | --- |
| The Age of User Experience Design | Defines UX as product/business practice around user behavior and startup risk. | Source-map only; product skills already stronger. |
| Get to Know Your Users | Getting out of the building, guerrilla research/testing, and communicating findings. | `user-research`; Buley/Hall/Sharon are stronger. |
| Efficient Design Techniques | Analog sketching, wireframes, mockups, prototypes, and iteration. | `design-prototyping`; no new fold. |
| Growth and Design Hacking | Measurement, economic and behavioral metrics, repeated optimization, and conversations. | Product-trio validation metrics; source-map only. |
| Get It Optimised | Optimization through technically working flows and behavioral metrics. | `user-research`; product strategy cross-check. |
| Tools, Tools, Tools | 2013-era tooling survey. | Skip as perishable. |

## Lisa Maria Martin, *Everyday Information Architecture*

Extraction: `/tmp/books/everyday.txt`. Density: HIGH for web information architecture.
Current route: parked `web-information-architecture` candidate, not a new skill yet,
because this is one dedicated IA source plus adjacent corroborators rather than the
2-source dedicated bar. Already lightly folded to
`ux-writing/references/naming-features-and-labels.md` for label craft. No direct quotes
added in this map pass.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| Introduction | Information organization changes how people understand and use knowledge; categorization and labels have ethical consequences. | Parked IA mindset; possible `design-principles` ethics/categorization lead. |
| 1. Systems of Organization | Frames IA as systems work: constraints, organization schemes, and deliberate structure rather than page-by-page cleanup. | Parked `web-information-architecture` candidate. |
| 2. Content Analysis | Uses audits/inventories, purpose-driven spreadsheets, structure analysis, content effectiveness, and governance questions. | Parked IA skill; `user-research` only when the task is research data collection. |
| 3. Categories and Labels | Categorization criteria, label clarity, naming power, and the difference between internal mental models and user-facing terms. | Already folded lightly to `ux-writing/references/naming-features-and-labels.md`; future IA skill spine. |
| 4. Site Structure | Structural audits, hierarchy, IDs, sitemaps, org-chart navigation risks, and page relationships. | Parked IA skill; possible `web-design` routing only for implementation of nav UI. |
| 5. Navigation and Wayfinding | Navigation structures, wayfinding signals, next steps, and avoiding navigation that mirrors internal politics over user needs. | Parked IA skill; `user-onboarding` only for first-use flows. |
| 6. Tags and Taxonomies | Taxonomy design, tag governance, user-applied tags, folksonomy decay, and content retrieval over time. | Parked IA skill; possible future `design-systems` metadata/governance cross-check. |
| Conclusion / Resources | Points to deeper IA sources such as the Rosenfeld/Morville polar-bear book and Donna Spencer. | Source discovery for meeting the 2-source bar. |

## Jon Yablonski, *Laws of UX*

Extraction: `/tmp/books/laws-of-ux.txt`. Density: LOW-MED overall because many laws are
model-known, but useful as IA/cognition corroboration for the parked IA candidate and
for specific design-principles checks. Current route: no new skill; map only. No direct
quotes added here.

### TOC / Chapter Map

| Chapter | Short summary | Routing |
| --- | --- | --- |
| 1. Jakob's Law | Users bring expectations from other sites/products; familiarity can reduce learning cost without forcing sameness. | `design-principles`; IA corroboration for conventional structure. |
| 2. Fitts's Law | Target size and distance shape pointing effort. | `design-principles`; `web-design` for UI implementation if needed. |
| 3. Hick's Law | Choice complexity increases decision time; includes card sorting as a way to organize choices around user mental models. | Parked IA corroboration; `design-principles`. |
| 4. Miller's Law | Corrects the common "seven nav items" misuse; chunking organizes information but does not license arbitrary menu limits. | Parked IA corroboration; `design-principles`. |
| 5. Postel's Law | Be forgiving in input and precise in output. | `web-design` forms and `ux-writing` error-message adjacency. |
| 6. Peak-End Rule | People remember intense moments and endings disproportionately. | `user-onboarding`, `ux-writing`, or `design-polish` only when a concrete flow needs memory shaping. |
| 7. Aesthetic-Usability Effect | Aesthetic interfaces are often perceived as more usable. | `design-polish`; already covered by stronger polish sources. |
| 8. von Restorff Effect | Distinct items stand out; useful for emphasis but dangerous when overused. | `design-principles`; `data-viz`/UI emphasis cross-check. |
| 9. Tesler's Law | Complexity can be moved but not eliminated; decide whether the system or user bears it. | `design-principles`; possible `web-design` flow simplification. |
| 10. Doherty Threshold | Responsiveness keeps attention and productivity. | `design-principles`; future web-performance candidate if broader sources land. |
| 11. With Power Comes Responsibility | Psychological principles can manipulate; designers must use them ethically. | `design-principles` ethics. |
| 12. Applying Psychological Principles in Design | Team workflow for identifying, applying, circulating, and advocating psychological principles. | Source-map only; useful for design-principles facilitation. |

## Processed Books Needing Map Backfill

These books have been screened/folded in `docs/mining-ledger.md` but do not yet have
chapter-level maps here. Backfill when a future theme pass needs them:

- None currently from the 2026-06-11 book-fold queue.
