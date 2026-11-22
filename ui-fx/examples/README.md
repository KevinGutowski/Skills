# ui-fx examples

Runnable pages for the recipes in `../references/`, and the checks that keep the copyable snippets honest.

| Path | What it is |
| --- | --- |
| `gallery/index.html` | Ten recipes rendered together on one dark page, responsive down to a phone width, with working controls. The two beams play for 4.5 seconds on load and then settle, with a Replay button, so the page follows the five-second rule it teaches. Recipes: border beam (signature and whisper), the dark gradient card with a tick dial, edge light, frosted panel over a blob mesh with grain, hold-to-confirm, gliding indicator, stacked fan, holographic tilt, goo merge. Open it in a browser. The CSS in `references/surface-recipes.md` is taken from it. |
| `hold-to-confirm/index.html` | The hold-to-confirm recipe as a complete page. |
| `hold-to-confirm/check.mjs` | Browser regression check: full hold, short hold, right-button hold, two chorded-button sequences, release outside, leaving mid-hold and returning, leaving after arming and returning, reduced motion. |
| `snippet-checks/check.mjs` | Extracts the JavaScript and CSS snippets from the two recipe references and tests them: spring step at 60 and 120 Hz, rubber band, flick landing, reversal limiter, and (with `--browser`) that the CSS parses, applies, and respects reduced motion. It checks the computed result of each declaration a recipe depends on (a browser silently drops what it cannot parse), and that the shimmer is still until its state is live and stops when the state ends. It checks that `sibling-index()` supplies a unitless stagger index capped at the sixth step, and that an inline `--i` still wins. Under reduced motion it expects the reveal to open with no transition and the stagger items to be in place at once. For the gallery it checks that the beam moves and that its bloom is painted at least 14 px outside the composer (by comparing pixels with the settled frame), that nothing is still looping five seconds after load, that Replay and Send both start a run (pointer and keyboard), text contrast for eighteen samples measured from rendered pixels (including the holographic card's label with the highlight moved onto it), the stacked fan's button from keyboard and touch, in forced colours that selection (an underline) and keyboard focus (an outline) are separate cues on the option buttons, the live hold button, the goo toggle, the selection buttons, and that at 390 px nothing overflows or spills out of a tile. |

## Running the checks

```bash
cd ui-fx/examples
npm install --no-save playwright-core
npx playwright-core install chromium-headless-shell     # add: npx playwright-core install-deps chromium-headless-shell on a bare Linux box
node hold-to-confirm/check.mjs
node snippet-checks/check.mjs --browser
```

`node snippet-checks/check.mjs` without `--browser` needs no install and covers the JavaScript helpers only. `node_modules/` is git-ignored.

Last run 2026-11-22 in headless Chromium: 21 of 21 (2026-11-19) and 44 of 44. Re-run both after editing a snippet in the references or the gallery.
