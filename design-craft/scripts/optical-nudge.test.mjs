// Regression check for optical-nudge.mjs. Each case measures an icon from rendered pixels, works out the
// nudge, and measures again with it applied. A known-geometry case checks the measurement against an exact
// answer, and the CLI is run against a page with a strict CSP and a page that must fail.
// Run: node design-craft/scripts/optical-nudge.test.mjs   (needs playwright-core or playwright and a Chromium)
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { nudge, measure, run } from './optical-nudge.mjs';

const A = 'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const icon = (inner, extra = '', size = 14) => `<svg ${A} width="${size}" height="${size}" viewBox="0 0 24 24" ${extra}>${inner}</svg>`;
const circle = '<circle cx="12" cy="12" r="9"/>';
const play = '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/>';
const ell = '<path d="M4 20 L20 20 L20 4"/>';
const btn = (id, inner, style = '') =>
  `<button id="${id}" style="width:40px;height:40px;padding:0;border:0;border-radius:50%;background:#eee;color:#222;display:grid;place-items:center;margin:4px;${style}">${inner}</button>`;
const centredAbs = 'style="position:absolute;left:50%;top:50%;translate:-50% -50%"';

const html = `<!doctype html><style>
  body { margin: 0; padding: 60px 8px 8px; background: #fff; }
  .painted path { fill: none; stroke: #222; stroke-width: 2; stroke-linecap: round; }
</style>
${btn('origin', icon(circle), 'position:absolute;left:0;top:0;margin:0;border-radius:0')}
<style>#origin:hover svg { margin-left: 9px; } .keep { visibility: visible; }</style>
<svg width="0" height="0" style="position:absolute"><symbol id="sp-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" fill="#222"/></symbol></svg>
${btn('circle', icon(circle))}
${btn('play', icon(play))}
${btn('noviewbox', `<svg ${A} width="14" height="14"><circle cx="7" cy="7" r="5"/></svg>`)}
${btn('sprite', '<svg width="14" height="14"><use href="#sp-play"/></svg>')}
${btn('positioned', icon(circle, 'style="position:relative;left:-3px"'))}
${btn('margin', icon(circle, 'style="margin-left:-6px"'))}
${btn('mirrored', icon(play, 'style="transform:scaleX(-1)"'))}
${btn('transformed', icon(circle, 'style="transform:translateX(1px)"'))}
${btn('translated', icon(circle, 'style="translate:1px 0"'))}
${btn('pctcentred', icon(circle, centredAbs), 'position:relative;display:block')}
${btn('pctplay', icon(play, centredAbs), 'position:relative;display:block')}
${btn('attrpaint', icon(ell))}
${btn('csspaint', `<svg xmlns="http://www.w3.org/2000/svg" class="painted" width="14" height="14" viewBox="0 0 24 24">${ell}</svg>`)}
${btn('slice', `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 24" preserveAspectRatio="xMidYMid slice"><rect x="0" y="0" width="10" height="24" fill="#222"/><circle cx="24" cy="12" r="8" fill="#222"/></svg>`)}
<div style="transform:scale(2);transform-origin:0 0;width:48px;height:48px;margin:4px">${btn('scaled', icon(circle, 'style="position:relative;left:-1px"'), 'margin:0')}</div>
<div style="height:50px"></div>
<div style="transform:scaleX(-1);width:48px">${btn('reflected', icon(play))}</div>
<div style="transform:rotate(90deg);width:48px">${btn('rotated', icon(play))}</div>
${btn('geometry', `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="12" y="10" width="4" height="4" fill="#222"/></svg>`)}
${btn('visibleChild', `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><circle cx="6" cy="12" r="4" fill="#222"/><circle class="keep" cx="18" cy="12" r="4" fill="#222"/></svg>`)}
${btn('nestedcalc', icon(play, 'style="position:absolute;left:50%;top:50%;translate:calc(-50% + min(20%, 1px)) -50%"'), 'position:relative;display:block')}
${btn('untouched', icon(play, 'style="translate:1px 0"'))}
${btn('unpainted', icon('<path d="M4 4 L20 20" stroke="none"/>'))}`;

// [id, expected nudgeX, expected nudgeY, expected translate]; null = not checked for that case.
const cases = [
  ['origin', 0, 0, null],                    // container at the viewport's (0, 0): capture origin must match,
                                             // and its :hover style (icon 9px right) must not be measured
  ['circle', 0, 0, null],
  ['play', 0.75, 0, null],                   // a right-pointing triangle's ink sits left: nudge right
  ['noviewbox', 0, 0, null],
  ['sprite', 0.75, 0, null],                 // same triangle through <use>
  ['positioned', 3, 0, null],                // box moved 3px left by its own CSS
  ['margin', 3, 0, null],                    // box moved 3px left by layout
  ['mirrored', -0.75, 0, null],              // icon mirrored by its own transform: nudge the other way
  ['transformed', -1, 0, null],              // existing transform: translateX(1px)
  ['translated', -1, 0, '0px 0px'],          // existing translate: 1px composes to 0
  ['pctcentred', 0, 0, '-50% -50%'],         // percentage centring is kept as is
  ['pctplay', 0.75, 0, 'calc(-50% + 0.75px) -50%'],
  ['attrpaint', null, null, null],
  ['csspaint', null, null, null],            // stroke set by a stylesheet on the inner path: must match attrpaint
  ['slice', 0, 0, null],                     // the rect is clipped away by the viewport and must not count
  ['scaled', 1, 0, null],                    // 1px left inside a 2x ancestor = 2 screen px; the fix is 1 CSS px
  ['reflected', 0.75, 0, null],              // scaleX(-1) ancestor: ink sits right on screen, and +x in CSS px moves left, so +0.75
  ['visibleChild', 0, 0, null],              // a child with visibility: visible must still be hidden in the hidden frame
  ['nestedcalc', null, null, null],          // nested math in an existing translate is kept and composed
  ['rotated', 0.75, 0, null],                // rotate(90deg) ancestor: triangle points down, ink sits high; CSS +x moves down on screen
];

const { chromium } = await import('playwright-core').catch(() => import('playwright'));
const browser = await chromium.launch();
const page = await (await browser.newContext({ deviceScaleFactor: 4 })).newPage();
await page.setContent(html);

let failed = 0;
const check = (name, ok, detail) => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${detail})`);
};
const results = {};
for (const [id, ex, ey, et] of cases) {
  const r = await nudge(page, await page.$('#' + id), { apply: true });
  results[id] = r;
  if (ex !== null) check(`${id}: nudge`, r.nudgeX === ex && r.nudgeY === ey, `got ${r.nudgeX}, ${r.nudgeY}; want ${ex}, ${ey}`);
  if (et !== null) check(`${id}: translate value`, r.translate === et, `got "${r.translate}"; want "${et}"`);
  check(`${id}: centred after applying`, r.centred, `before ${r.offX}, ${r.offY}; after ${r.afterX}, ${r.afterY}`);
}
check('nestedcalc: keeps the nested value', results.nestedcalc.translate.includes('min(20%, 1px)'), results.nestedcalc.translate);
check('csspaint: stylesheet paint measured as drawn',
  results.csspaint.nudgeX === results.attrpaint.nudgeX && results.csspaint.nudgeY === results.attrpaint.nudgeY && results.csspaint.nudgeX !== 0,
  `${results.csspaint.nudgeX}, ${results.csspaint.nudgeY} vs attribute twin ${results.attrpaint.nudgeX}, ${results.attrpaint.nudgeY}`);

const g = await measure(page, await page.$('#geometry'));
check('geometry: a square 2px right of centre measures 2.00, 0.00', Math.abs(g.offX - 2) < 0.02 && Math.abs(g.offY) < 0.02,
  `${g.offX.toFixed(3)}, ${g.offY.toFixed(3)}`);

const u = await page.$('#untouched');
await nudge(page, u);
const left = await u.$eval('svg', (n) => n.style.translate);
check('without apply: the icon is left as it was', left === '1px', `style.translate "${left}"`);

const err = await nudge(page, await page.$('#unpainted')).then(() => null, (e) => e.message);
check('unpainted: reports nothing visible', /nothing visible/.test(err || ''), err || 'no error');
await browser.close();

// CLI: a strict CSP on the inspected page must not break decoding; a failed measurement must exit 1.
const dir = mkdtempSync(path.join(tmpdir(), 'optical-nudge-'));
const csp = path.join(dir, 'csp.html');
writeFileSync(csp, `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self'; style-src 'unsafe-inline'">${btn('b', icon(play))}`);
const lines = [];
const code = await run([csp, 'button'], (l) => lines.push(l));
const r = lines[0] ? JSON.parse(lines[0]) : {};
check('cli: strict CSP page measures and exits 0', code === 0 && r.nudgeX === 0.75 && r.centred === true, `exit ${code}, ${lines[0]}`);
const bad = path.join(dir, 'bad.html');
writeFileSync(bad, `<!doctype html>${btn('b', icon('<path d="M4 4 L20 20" stroke="none"/>'))}`);
const badCode = await run([bad, 'button'], () => {});
check('cli: a failed measurement exits 1', badCode === 1, `exit ${badCode}`);

console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
