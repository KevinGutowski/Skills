# faux-ui eval evidence, round 2 (2026-11-18)

Builds and renders behind the `faux-ui` section of `docs/skill-evals-2026-11.md`.

| File | What it is |
| --- | --- |
| `<case>-with.html`, `<case>-without.html` | Each arm's build, exactly as the builder left it |
| `hero-with-skill.png`, `hero-without-skill.png` | The hero stills at 2x |
| `bento-with-skill.png`, `bento-without-skill.png` | The bento grids, full page, at 1.5x |
| `loop-with-skill-sheet.png`, `loop-without-skill-sheet.png` | Contact sheets of the loop, 41 frames at 0.5s |

| `round3-hero-with-skill.png`, `round3-bento-with-skill.png`, `round3-*-with.html` | Round 3: the hero and bento rebuilt on the fallback path after the skill gained its two exemplars. Same capture commands as the round 2 stills |
| `kit-path-hero-still.png`, `kit-path-hero-loop-sheet.png`, `kit-path-bento.png` | The same hero and bento briefs built with Stageshow's kit installed, starting from its gold examples. Not graded |
| `kit-path/relay-hero/`, `kit-path/relay-bento/` | The sources of those two builds: one `index.tsx` and one CSS file each. They import Stageshow's kit and cannot run without it. Derived from Stageshow's `hero-demo` and `bento` examples (MIT, Benji Taylor); its license text is `kit-path/LICENSE-stageshow.txt` |

Every PNG here is a generated output of an HTML or TSX file in this directory. If a checkout has the sources and not the PNGs, regenerate them with the commands below.

## Regenerate

Run from a directory whose `node_modules` has Playwright and a browser, with `S` set to `faux-ui/scripts/contact-sheet.mjs` and `D` to this directory.

```sh
# Hero stills: the 720 x 340 illustration plus 20px of page, at 2x
for arm in with without; do
  node "$S" "$D/hero-still-beside-copy-$arm.html" --viewport 760x380 --width 760 --height 380 --still --scale 2 --out "$D/hero-$arm-skill.png"
done

# Bento: the 1000px grid plus 20px of page. The rectangle must fit the viewport, so a
# build taller than 900px needs both --viewport and --height raised together.
for arm in with without; do
  node "$S" "$D/bento-five-features-$arm.html" --viewport 1040x900 --width 1040 --height 900 --still --scale 1.5 --out "$D/bento-$arm-skill.png"
done

# Round 3 (the fallback path with exemplars): same framing as the two above
node "$S" "$D/round3-hero-still-beside-copy-with.html" --viewport 760x380 --width 760 --height 380 --still --scale 2 --out "$D/round3-hero-with-skill.png"
node "$S" "$D/round3-bento-five-features-with.html" --viewport 1040x900 --width 1040 --height 900 --still --scale 1.5 --out "$D/round3-bento-with-skill.png"

# Loop: one sheet per arm, sized past the longer loop's seam
for arm in with without; do
  node "$S" "$D/upload-loop-with-cursor-$arm.html" --loop 19000 --cols 5 --out "$D/loop-$arm-skill-sheet.png"
done
```

The original hero and bento images were taken with an equivalent one-off Playwright script (same viewports and scales; the bento as a full-page capture). The loop sheets were taken with the command shown. The graders also saw four full-size loop frames per arm, taken with `--start 0|4000|8000|12000 --still --scale 1`.

A loop sheet differs slightly on every run because frames are sampled on a wall clock.

## Regenerate the kit-path renders

These need Stageshow at the revision the sources were written against, a Chrome, and network access for `npm install`. `E` is this directory.

```sh
git clone https://github.com/benjitaylor/skills stageshow-src
cd stageshow-src && git checkout 299140f && cd stageshow
npm install
cp -r "$E/kit-path/relay-hero" "$E/kit-path/relay-bento" examples/

# Serve the playground without the optional local proxy that `npm run dev` starts
npx vite playground --config playground/vite.config.ts --port 5173 --strictPort &

# If a capture says "Unknown example", re-save playground/preview.tsx and playground/catalog.ts unchanged and retry
export CHROME_PATH=/path/to/chrome     # only when no system Chrome is installed

# Hero: the poster still and the loop's contact sheet, with upstream's film script
node scripts/film.mjs "http://127.0.0.1:5173/?capture=relay-hero" --select '#example' --gate --still --reduced --out "$E/kit-path-hero-still.png"
node scripts/film.mjs "http://127.0.0.1:5173/?capture=relay-hero" --select '#example' --gate --out "$E/kit-path-hero-loop-sheet.png" --every 1000 --count 16

# Bento: the whole grid at 2x, with this library's script (run where Playwright is installed)
node "$S" "http://127.0.0.1:5173/?capture=relay-bento" --viewport 1280x1000 --select '#example' --start 2500 --still --scale 2 --out "$E/kit-path-bento.png"
```

Both gates printed `rehearsal passed` when these were made on 2026-11-18. The hero's loop run also printed `film: inconclusive` and exited 2 (sampling gaps in headless Chrome; expect the same when regenerating), and the bento printed two `lopsided` candidate lines on its routing pills. The builds were made by a stronger model than the eval's arms, in about 25 tool calls each, and were not graded blind.

These renders replace an earlier pair of kit-path builds from the same day whose sources were not kept. The briefs and method were the same; the pictures differ in detail.
