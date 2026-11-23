---
name: faux-ui
description: "Build faux product UI for marketing pages: a mocked app screen as a still, feature card, bento grid, or animated cursor demo that reads as the real product. Covers restraint, crop and framing, loop story, motion, and filmed verification. Real product screens → frontend-design; product animation values → web-design; charts → data-viz. Triggers: fake UI, product mockup, product shot, feature card, bento grid, cursor demo, product walkthrough."
---

# Faux UI

A miniature of a product, drawn for a marketing page, docs hero, or feature card: one still, or a short animation in which one thing happens. The viewer should recognize the screen and see that one thing.

**Source:** Benji Taylor's Stageshow skill and React kit (MIT, `299140f`, skill version 1.1.1) and his write-up at benji.org/stageshow. The rules below are this library's distillation; the kit, the gold examples, and the filming scripts stay upstream. See [references/sources.md](references/sources.md) and [references/coverage-gaps.md](references/coverage-gaps.md).

## The one test

**It reads as a real product, simplified to what the viewer needs, framed on purpose, and every motion has a cause.**

Five ways it fails. Name which one you are looking at before fixing anything:

| Failure | What it looks like | First fix |
|---|---|---|
| **Too much** | Real text in every row, numbers everywhere, no air. More detail makes it look more generated, not less | Count the real strings (3 to 7); the rest become placeholder bars |
| **Wireframe** | Two gray blobs and a button; built too small or stripped of what made the product recognizable | Design at shown size; put back real chrome, the product's icons, its signature content |
| **Boxed** | A whole window shrunk into a card with even margins, like a pasted screenshot | Crop: bleed the window off one or two edges, one gutter elsewhere |
| **Flat** | Every object the same weight in the same bordered card | One hero object, one or two satellites, depth by shadow and surface |
| **Bland** | A gray window and a cursor whatever the brief asked for | Take the brief's look in full (blueprint, glass, mascot, poster color), then apply these rules to it |

The cure for the first two is the same sentence: **simplify the words, not the context.** A full, structured screen in quiet grays; real words only on what the story is about; placeholder lines for the rest. An empty corner, a void under a list, or rows spread out to fill a pane reads as unfinished, not calm.

These are authored illustrations. A "click" draws a cursor pressing and then changes scene state; nothing automates a live app and nothing calls a live service.

## With or without the Stageshow kit

**Use the kit whenever the result will ship.** The rules here work in any stack, but rules alone do not get the result: Stageshow's author found that an agent told to run a window off the edge of the frame barely did, and got it right when shown an example that does. A local comparison agrees. On the same two briefs, builds made from these rules alone in plain HTML came out with oversized type, heavy weights, and fewer kinds of tile, while builds that started from an upstream gold example with the kit were close to the gold's caliber ([references/sources.md](references/sources.md), Local comparison). Treat the no-kit path as a fallback for a quick still, a non-React stack, or a place the kit cannot be installed, and say so when you take it.

```sh
npx skills add benjitaylor/skills --skill stageshow
```

- **Installed:** follow its workflow literally. Film the closest gold example, copy that folder as the starting point, keep its stage size, type sizes, and structure, then replace look and content; use its kit parts and its `film.mjs --gate`. Practical notes from running it are in [references/rehearsal.md](references/rehearsal.md). Where the installed Stageshow text and this skill disagree, the installed version is newer; follow it and note the difference.
- **Not installed or not React (fallback):** do not start from a blank file. Copy the closer of this skill's two exemplars and keep its structure (stage or tile frame, type sizes, row pitch, shadows, the filler track that takes the crop), then replace the look tokens and all the content with the brief's product: [examples/still-hero.html](examples/still-hero.html) for a still, card, or the first frame of a demo (corner bleed, one window, one satellite), [examples/bento.html](examples/bento.html) for a grid (hero UI, dark stat, diagram, one component, an object, with a two-column composition below about 1030px and one column for phones). They are plain HTML and CSS with the tile plan and the reasons in comments. A copy that only changes the names is not done. Film with `scripts/contact-sheet.mjs` (frames at an interval tiled into one image; needs Playwright). It takes pictures only: the named faults in [references/rehearsal.md](references/rehearsal.md) are checked by eye.
- Review what you install like any external skill. A static read of its scripts at `299140f` found nothing malicious ([references/sources.md](references/sources.md), Security read): point its filming scripts only at local URLs, keep output paths relative, and note that `npm run dev` starts a third-party local proxy (`portless`); to skip it, run Vite on the playground directly, as that section shows. Its bundled app icons are not under the MIT license, and its brand marks carry their own per-file licenses and their owners' usage terms.

## Workflow

Most of the quality is decided before code. Write the plan first: where it sits, the focal object, the action, the payoff, what is left out.

1. **Medium and place.** Still, or animation (loop, once in view, or on hover). The page it sits on, that page's ground color, the width it is shown at. Design at shown size and display at 1:1: roughly 720 × 340 for a hero beside copy, 900 to 1100 wide for a full-width hero, 400 × 300 for a card. A demo is never under about 320 wide. Anything that can land in a phone column gets a second, recomposed design at 358 wide, not a scaled-down copy. A grid of tiles is planned as one set first ([references/bento-grids.md](references/bento-grids.md)).
2. **Look.** If the product's code or site is at hand, read its tokens and map them (accent, surfaces, three text grays, line, font, radii, control and row heights); see [references/looks-and-grounds.md](references/looks-and-grounds.md). Otherwise choose a theme, one accent, and a fidelity: *minimal* (all bars), *standard* (words where they carry meaning), *realistic* (real content everywhere). Default to light, one accent, standard; go realistic at hero scale, for a named real product, or for a still whose subject is a list or page.
3. **Story** (animation only). Pick its shape: how the product feels to use (a cursor does one satisfying thing), a flow told as one continuous object, or what the system does (the consequence lands somewhere else, usually no cursor). Three to five beats and a payoff, 10 to 16 seconds. No cursor move you cannot explain. Between a richer story and a calmer frame, choose the frame.
4. **Frame it before building the screen.** Choose a layout from the table in [references/framing.md](references/framing.md) and crop to the panel the story happens in. Short form: one gutter everywhere; a full gutter or well past it, never a sliver; only filler is cropped; what the story opens stays in frame; a window keeps a plausible shape; the page is the ground, so no tinted plate behind a hero on a white or dark page. Render one still at both widths before any motion work.
5. **The screen.** Build to [references/still-frame.md](references/still-frame.md). Budget words, not elements: a calendar still needs a populated week. Fit every control's text before anything moves. Name the elements the cursor touches and measure their positions at runtime; never hard-code coordinates.
6. **Choreograph.** Build to [references/demo-motion.md](references/demo-motion.md). Keep everything that appears mounted so exits can animate. Animate relationships, not only objects: a new row carries the rows below it; a resizing surface never stretches its text. Beats overlap, groups stagger, the payoff holds, the loop ends where it began or resets with a visible cause (the cursor presses Delete, Undo, or Clear, or the reset happens off stage). Fading out the row the loop added is not a cause.
7. **Rehearse.** Choose the poster frame first: most people see only that frame (thumbnail, reduced motion, screenshot), so it must tell the story alone and must not be caught mid-change. Then film the whole loop, not a single screenshot, at the shown width and at 390, and step through each press, morph, and the loop seam at 40 to 80 ms. Fix the largest visible fault first, in this order: framing, hierarchy, motion, polish. Finish with a fresh-context review and a short handover note saying what was and was not watched ([references/rehearsal.md](references/rehearsal.md)).

## Faults that come back every round

Check these before handing over. Each has its rule in the named reference.

- Content that **swaps** in one frame instead of moving (demo-motion, Changing text and values).
- **Gray bars where the eye lands.** Filler belongs at the edges and under the crop (still-frame, Restraint).
- A **plate behind the window**, or a window floating whole with air on four sides. The hero window or phone fills at least two thirds of the stage width and runs off an edge (framing).
- **Empty bands**, and controls or shadows sliced by the stage edge (framing, rule 4).
- **Stock AI decoration and invented logos:** sparkles, wands, purple as "the AI color", a letter in a colored square (still-frame, Icons and logos).
- **Busy rows and uneven insets:** real detail on every row, or content sitting closer to one edge than the other (still-frame, Restraint; still-frame, Spacing and alignment).
- **Long holds, and a reset with no cause** (demo-motion, Loops and resets).
- A **text selection that is not under the I-beam** on every frame (demo-motion, Drags and selection).
- A **status bar or home indicator drawn by hand** (still-frame, Chrome and devices).
- A **centered amount centered with its currency sign**, so the digits sit right of center (still-frame, Spacing and alignment).

## References

| File | Read it when |
|---|---|
| [references/still-frame.md](references/still-frame.md) | Building any screen: restraint and the word budget, type, spacing and alignment values, icons and logos, color, chrome and devices |
| [references/framing.md](references/framing.md) | Deciding the crop: the twenty framing rules, the seventeen named layouts with their insets, small formats, phones |
| [references/demo-motion.md](references/demo-motion.md) | Anything moves: story shapes, loops and resets, the two curves, changing text and numbers, arrivals and flights, the cursor, drags, camera, phones, annotation lines |
| [references/bento-grids.md](references/bento-grids.md) | More than one tile: which tiles show UI at all, tile kinds, layouts, the tile-list plan |
| [references/looks-and-grounds.md](references/looks-and-grounds.md) | Matching a product's look from its code or public site, backgrounds and materials, real brand marks, studies of real products |
| [references/rehearsal.md](references/rehearsal.md) | Verifying: how to film, the named faults, the you-see/you-do table, the fresh-eye review brief, the handover note |

## Boundaries

- **The real product screen** (layout, states, accessibility of a working UI) → `frontend-design`; polish of real components → `design-craft`. This skill deliberately breaks product rules: placeholder bars, cropped windows, a title that is a `div` rather than a heading.
- **Animation values for a working product** → `web-design` (web-animation-design). The slow storytelling curves here are for a demo's travel and arrivals only; inside the demo, press and hover feedback stays as quick as the real product. Never carry the demo curves back into product UI.
- **The landing page around the demo** (copy, section order, conversion) → `devtools` (developer-tool-gtm) or `frontend-design`. Bento tile copy is page type and belongs to the page.
- **A chart as the subject** → `data-viz` for the chart's form; this skill only frames it.
- **Hand-drawn or generated illustration and photography** are out of scope: this skill cannot draw. Use a real asset or pick another tile kind. Brand marks and app icons → the owner's official artwork; original marks → `logo-design`.
- **A design to evaluate before building the real thing** → `design-prototyping`. A faux UI sells a product that exists; a prototype tests one that does not.
