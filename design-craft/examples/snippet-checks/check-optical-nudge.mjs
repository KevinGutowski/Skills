// Checks that opticalNudge() in ../../references/surfaces.md (Optical Alignment) measures what the browser draws.
// The code under test is extracted from the markdown, so the check fails if the snippet is edited into something broken.
// Each case measures, applies the nudge with the CSS `translate` property (added to any existing value), and re-measures.
// Run from design-craft/examples:
//   npm install --no-save playwright-core && npx playwright-core install chromium-headless-shell
//   node snippet-checks/check-optical-nudge.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const md = readFileSync(path.join(here, '../../references/surfaces.md'), 'utf8');
const snippet = [...md.matchAll(/```js\n([\s\S]*?)```/g)].map((m) => m[1]).find((c) => c.includes('async function opticalNudge'));
if (!snippet) throw new Error('opticalNudge snippet not found in surfaces.md');

const A = 'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const icon = (inner, extra = '') => `<svg ${A} width="14" height="14" viewBox="0 0 24 24" ${extra}>${inner}</svg>`;
const circle = '<circle cx="12" cy="12" r="9"/>';
const play = '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/>';
const btn = (id, svg) => `<button id="${id}" style="width:40px;height:40px;padding:0;border:0;display:grid;place-items:center;margin:4px">${svg}</button>`;

const html = `<style>.rootpaint{fill:none;stroke:black;stroke-width:2}</style>
<svg width="0" height="0" style="position:absolute"><symbol id="sp-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" fill="black"/></symbol></svg>
${btn('circle', icon(circle))}
${btn('play', icon(play))}
${btn('noviewbox', `<svg ${A} width="14" height="14"><circle cx="7" cy="7" r="5"/></svg>`)}
${btn('sprite', '<svg width="14" height="14"><use href="#sp-play"/></svg>')}
${btn('positioned', icon(circle, 'style="position:relative;left:-3px"'))}
${btn('margin', icon(circle, 'style="margin-left:-6px"'))}
${btn('mirrored', icon(play, 'style="transform:scaleX(-1)"'))}
${btn('translated', icon(circle, 'style="transform:translateX(1px)"'))}
${btn('rootcss', `<svg xmlns="http://www.w3.org/2000/svg" class="rootpaint" width="14" height="14" viewBox="0 0 24 24"><path d="M4 20 L20 20 L20 4"/></svg>`)}
<span id="unpainted"><svg width="14" height="14" viewBox="0 0 24 24"><use href="#missing"/></svg></span>`;

// [id, expected nudgeX, expected nudgeY] before any correction
const cases = [
  ['circle', 0, 0], ['play', 0.75, 0], ['noviewbox', 0, 0], ['sprite', 0.75, 0],
  ['positioned', 3, 0], ['margin', 3, 0], ['mirrored', -0.75, 0], ['translated', -1, 0],
  ['rootcss', null, null],  // an L-shaped stroke: ink centroid ~2.33px right and low as a stroke; ~1.56px if it were wrongly filled
];

const { chromium } = await import('playwright-core');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html);
await page.addScriptTag({ content: snippet });

let failed = 0;
const check = (name, ok, detail) => { if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${detail})`); };

for (const [id, ex, ey] of cases) {
  const r = await page.evaluate(async (id) => {
    const b = document.getElementById(id), svg = b.querySelector('svg');
    const before = await opticalNudge(svg, { container: b });
    const [tx = 0, ty = 0] = (getComputedStyle(svg).translate.match(/-?[\d.]+/g) || []).map(Number);
    svg.style.translate = `${tx + before.nudgeX}px ${ty + before.nudgeY}px`;
    const after = await opticalNudge(svg, { container: b });
    return { before, after };
  }, id);
  const { before: b, after: a } = r;
  if (ex !== null) check(`${id}: nudge`, b.nudgeX === ex && b.nudgeY === ey, `got ${b.nudgeX}, ${b.nudgeY}; want ${ex}, ${ey}`);
  else check(`${id}: root CSS paint kept`, b.offX > 2 && b.offY > 2, `off ${b.offX}, ${b.offY}`);
  check(`${id}: centred after applying`, Math.abs(a.offX) <= 0.125 && Math.abs(a.offY) <= 0.125, `off ${a.offX}, ${a.offY}`);
}
const err = await page.evaluate(() => opticalNudge(document.querySelector('#unpainted svg')).then(() => null, (e) => e.message));
check('unpainted: throws instead of returning NaN', /Nothing painted/.test(err || ''), err || 'no error');

await browser.close();
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
