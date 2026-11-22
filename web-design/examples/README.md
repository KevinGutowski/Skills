# web-design examples

Checks that keep the copyable snippets in `../references/` honest.

| Path | What it is |
| --- | --- |
| `stagger-check/check.mjs` | Extracts the CSS blocks from `references/web-animation-design/choreography.md` (CSS stagger with sibling-index()) and runs them in headless Chromium. It checks that every recipe (base, fit, eased, reverse) has its last item *finished* by 300ms at lengths 1, 2, 3, 6 and 60, that the first item starts at once, that each item really animates (it scrubs the running animation: hidden and offset during its delay, in place at the end, so a missing `@keyframes` fails), that the eased gaps shrink, and that nothing animates under reduced motion. It removes the `@supports` block to check the no-support fallback: the items enter together and inline `--i` still staggers. It also checks the two mistakes the text warns about: the tip as posted, with the sixth item starting at 420ms, and a time written into `--i`, which collapses every delay to 0s. |

## Running the checks

```bash
cd web-design/examples
npm install --no-save playwright-core
npx playwright-core install chromium-headless-shell     # add: npx playwright-core install-deps chromium-headless-shell on a bare Linux box
node stagger-check/check.mjs
```

`node_modules/` is git-ignored. Last run 2026-11-22 in headless Chromium 159: 20 of 20. Re-run after editing a stagger recipe in choreography.md.
