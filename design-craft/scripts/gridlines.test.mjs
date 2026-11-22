// Regression check for the vendored gridlines probe (design-craft/scripts/gridlines/). It pins what
// design-craft/references/alignment-pass.md says the probe does, including its documented limits.
// If a limit case starts failing after re-syncing upstream, the probe got better: update the reference's
// "What the probe gets wrong" section and this case together.
//
// Run: PW_DIR=<dir with playwright> node design-craft/scripts/gridlines.test.mjs
// Uses the same setup as audit.mjs, so one install serves both: the `playwright` package (not playwright-core)
// in the folder named by PW_DIR, or in the current directory when PW_DIR is unset, plus its Chromium
// (or CHROMIUM_PATH). Setup commands: alignment-pass.md → Running the probe. Exits 1 on any failure.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const probe = readFileSync(path.join(here, 'gridlines', 'probe.js'), 'utf8');
const audit = path.join(here, 'gridlines', 'audit.mjs');
const example = path.resolve(here, '..', 'examples', 'gridlines-sidebar.html');

// Resolve playwright exactly as audit.mjs does, and hand the same folder to the CLI case.
const pwDir = path.resolve(process.env.PW_DIR || process.cwd());
let chromium;
try {
  ({ chromium } = createRequire(path.join(pwDir, 'noop.js'))('playwright'));
} catch {
  console.error(`playwright not found from ${pwDir}. Install it there or set PW_DIR (see alignment-pass.md → Running the probe).`);
  process.exit(1);
}

const row = (inner, style = '') =>
  `<div style="display:flex;align-items:center;gap:8px;height:32px;padding:0 12px;${style}">${inner}</div>`;
const sq = (inner = '<rect width="16" height="16" fill="#888"/>') =>
  `<svg width="16" height="16" viewBox="0 0 16 16">${inner}</svg>`;
const page = (body) => `<!doctype html><body style="margin:0;font:14px system-ui">${body}</body>`;

const exampleHtml = readFileSync(example, 'utf8');
// The example with its four planted misses removed.
const fixedHtml = exampleHtml
  .replace('margin-left:auto;margin-right:3px;', 'margin-left:auto;')
  .replace('padding:0 15px;display:flex', 'padding:0 12px;display:flex')
  .replace('position:relative;top:3px;left:2px', '');

const cases = [];
const test = (name, html, check, opts) => cases.push({ name, html, check, opts });
const misses = (r) => r.flatMap((c) => c.outliers.map((o) => `${o.edge} ${o.px} vs ${o.line}`)).sort();
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b) || `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`;

test('example: the four planted misses', exampleHtml, (r) =>
  eq(misses(r), ['label 38 vs 36', 'leading 15 vs 12', 'trailing 15 vs 12', 'vertical-centre 3 vs 0']));
test('example: lines', exampleHtml, (r) =>
  eq(r[0].lines, { lead: 12, iconCentre: 20, label: 36, trailing: 12, trailCentre: 22 }));
test('example fixed: no misses', fixedHtml, (r) => eq(misses(r), []));

// Documented limit 1: a correctly nested child (indented one column) is reported as a miss.
test('limit: nested children are false positives',
  page(`<aside aria-label="n" style="width:240px">${row(sq() + '<span>Parent</span>')}${row(sq() + '<span>Child</span>', 'padding-left:36px')}${row(sq() + '<span>Other</span>')}</aside>`),
  (r) => eq(misses(r), ['icon-column 44 vs 20', 'label 60 vs 36']));

// Documented limit 2: a box on the 16px text line (label lands at 24px) is not flagged.
const btn = 'style="padding:4px 8px;border:0;background:#999;font:inherit"';
test('limit: box on the text line is not flagged',
  page(`<section aria-label="b" style="width:400px">${row('Heading', 'padding:0 16px')}${row('Body', 'padding:0 16px')}${row(`<button ${btn}>Right</button>`, 'padding:0 8px')}${row(`<button ${btn}>Wrong</button>`, 'padding:0 16px')}</section>`),
  (r) => eq([r[0].lines.lead, r[0].lines.box, misses(r).length], [16, 8, 0]));

// Documented limit 3: icons are measured by their element box, so a shape moved inside its SVG is not seen.
test('limit: shape moved inside its SVG is not seen',
  page(`<aside aria-label="s" style="width:240px">${row(sq() + '<span>One</span>')}${row(sq('<rect x="4" width="12" height="16" fill="#888"/>') + '<span>Two</span>')}${row(sq() + '<span>Three</span>')}</aside>`),
  (r) => eq(misses(r), []));

// Documented limit 4: text is measured by its layout box, not painted ink. A leading no-break space
// paints nothing but moves the ink about 4px right; the probe still reports the row on the 12px line.
test('limit: text is a layout box, not ink',
  page(`<aside aria-label="t" style="width:240px">${row('<span>Plain</span>')}${row('<span>&nbsp;Spaced</span>')}${row('<span>Plain</span>')}</aside>`),
  (r) => eq([r[0].rows.map((x) => x.left), misses(r)], [[12, 12, 12], []]));

// Documented limit 6: icons of different widths centred on one column (as the sidebar rule says) put the
// narrower icon's left edge off the lead line, so it is reported as a leading miss even though its centre
// and its label are on their lines.
const icon = (w) => `<span style="width:20px;display:flex;justify-content:center"><svg width="${w}" height="${w}"><rect width="${w}" height="${w}" fill="#888"/></svg></span>`;
test('limit: centred narrower icon is a false leading miss',
  page(`<aside aria-label="c" style="width:240px">${row(icon(20) + '<span>One</span>')}${row(icon(14) + '<span>Two</span>')}${row(icon(20) + '<span>Three</span>')}</aside>`),
  (r) => eq([r[0].lines.iconCentre, r[0].lines.label, misses(r)], [22, 40, ['leading 15 vs 12']]));

test('guides: drawn once per call, none with draw:false', exampleHtml, async (r, p) => {
  const first = await p.evaluate(() => document.querySelectorAll('[data-gridline]').length);
  await p.evaluate(() => window.__gridlines());
  const again = await p.evaluate(() => document.querySelectorAll('[data-gridline]').length);
  await p.evaluate(() => window.__gridlines({ draw: false }));
  const none = await p.evaluate(() => document.querySelectorAll('[data-gridline]').length);
  return eq([first > 0, again === first, none], [true, true, 0]);
});

test('containers: custom selector replaces the defaults',
  page(`<div class="panel" style="width:240px">${row(sq() + '<span>A</span>')}${row(sq() + '<span>B</span>', 'padding-left:15px')}</div>`),
  (r) => eq([r.length, misses(r).includes('leading 15 vs 12')], [1, true]), { containers: '.panel' });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
let failed = 0;
for (const c of cases) {
  const p = await browser.newPage({ viewport: { width: 800, height: 600 } });
  await p.setContent(c.html);
  await p.addScriptTag({ content: probe });
  const r = await p.evaluate((o) => window.__gridlines(o), c.opts || {});
  let verdict;
  try { verdict = await c.check(r, p); } catch (e) { verdict = String(e); }
  if (verdict !== true) failed++;
  console.log(`${verdict === true ? 'ok  ' : 'FAIL'} ${c.name}${verdict === true ? '' : `: ${verdict}`}`);
  await p.close();
}
await browser.close();

// The CLI: runs headless, writes PNG + JSON, prints the four misses.
const cliEnv = { ...process.env, SETTLE_MS: '0', PW_DIR: pwDir };
{
  const out = mkdtempSync(path.join(tmpdir(), 'gridlines-'));
  let verdict = true;
  try {
    const env = cliEnv;
    const stdout = execFileSync(process.execPath, [audit, pathToFileURL(example).href, out, '800'], { env, encoding: 'utf8' });
    const files = readdirSync(out).sort();
    const json = JSON.parse(readFileSync(path.join(out, files.find((f) => f.endsWith('.json'))), 'utf8'));
    verdict = eq([files.length, (stdout.match(/MISS/g) || []).length, misses(json).length, existsSync(path.join(out, files.find((f) => f.endsWith('.png'))))], [2, 4, 4, true]);
  } catch (e) { verdict = String(e).split('\n')[0]; }
  if (verdict !== true) failed++;
  console.log(`${verdict === true ? 'ok  ' : 'FAIL'} cli: PNG + JSON written, four misses printed${verdict === true ? '' : `: ${verdict}`}`);
}

// Documented limit 5: audit.mjs injects the probe as an inline <script>, which a strict CSP blocks.
// The CLI exits non-zero and writes nothing; the documented workaround (evaluate the probe's source)
// still measures the page.
const cspDir = mkdtempSync(path.join(tmpdir(), 'gridlines-csp-'));
const cspPage = path.join(cspDir, 'csp.html');
writeFileSync(cspPage, exampleHtml.replace('<html>', `<html><head><meta http-equiv="Content-Security-Policy" content="script-src 'self'"></head>`));
{
  const out = path.join(cspDir, 'out');
  let verdict;
  try {
    execFileSync(process.execPath, [audit, pathToFileURL(cspPage).href, out, '800'], { env: cliEnv, stdio: 'pipe' });
    verdict = 'CLI succeeded on a strict-CSP page: update alignment-pass.md (limit fixed upstream?)';
  } catch (e) {
    verdict = eq([e.status, existsSync(out)], [1, false]);
  }
  if (verdict !== true) failed++;
  console.log(`${verdict === true ? 'ok  ' : 'FAIL'} limit: CLI fails on a strict-CSP page${verdict === true ? '' : `: ${verdict}`}`);
}
{
  const browser2 = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const p = await browser2.newPage({ viewport: { width: 800, height: 600 } });
  let verdict;
  try {
    await p.goto(pathToFileURL(cspPage).href);
    await p.evaluate(probe);
    verdict = eq(misses(await p.evaluate(() => window.__gridlines())).length, 4);
  } catch (e) { verdict = String(e).split('\n')[0]; }
  await browser2.close();
  if (verdict !== true) failed++;
  console.log(`${verdict === true ? 'ok  ' : 'FAIL'} workaround: evaluating the probe source works under strict CSP${verdict === true ? '' : `: ${verdict}`}`);
}

const total = cases.length + 3;
console.log(`\n${total - failed}/${total} passed`);
process.exit(failed ? 1 : 0);
