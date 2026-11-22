#!/usr/bin/env node
// Measures how far each icon's visible ink sits from the centre of its container, from rendered pixels,
// and works out the CSS `translate` that centres it.
//
// How: screenshot the container with the icon shown and with it hidden; the pixels that differ are the
// icon's ink exactly as drawn (stylesheet paint, sprites, clipping, filters all included). Instead of
// computing how a CSS px maps to the screen through ancestors (scale, mirroring, rotation), it nudges the
// icon by a known amount and observes how far the ink moves, then solves for the correction.
//
// Usage:
//   node optical-nudge.mjs <url-or-file> <container-selector> [--icon svg] [--apply] [--grid 0.25] [--dpr 4]
//   --icon   selector for the icon inside each container (default: svg)
//   --apply  leave the corrected `translate` on the icon and report the re-measured offset
// Prints one JSON line per container: offX/offY (screen px, + = ink right/low), nudgeX/nudgeY (CSS px),
// translate (the full value to put in the icon's CSS), afterX/afterY and centred (measured with it applied).
// Exits 1 if any container could not be measured or did not end up centred.
//
// Needs playwright-core (or playwright) where Node can resolve it from this file, e.g. installed at the repo root,
// plus a Chromium. From the repo root:
//   npm i --no-save playwright-core && npx playwright-core install chromium-headless-shell
//   npx playwright-core install-deps chromium-headless-shell   # bare Linux only: system libraries (needs root)
// Measures what one element paints in its resting state (no hover, animations off). Ink weight is how much
// each pixel's colour changes when the icon is hidden, so a multicolour icon's colours weigh differently.
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const snap = (v, grid) => Math.round(v / grid) * grid + 0;
const PROBE = 4; // CSS px used to observe how the icon's translate maps to the screen

// PNGs are decoded in a separate blank page, so the inspected page's CSP or scripts cannot interfere.
const decoders = new WeakMap();
async function decoderFor(page) {
  if (!decoders.has(page)) decoders.set(page, await page.context().newPage());
  return decoders.get(page);
}

// Ink centroid of one icon relative to its container's centre, in screen CSS px.
export async function measure(page, container, { icon = 'svg' } = {}) {
  const el = await container.$(icon);
  if (!el) throw new Error(`no "${icon}" inside the container`);
  await container.scrollIntoViewIfNeeded();
  const box = await container.boundingBox();
  const ib = await el.boundingBox();
  if (!box || !ib) throw new Error('container or icon is not rendered');
  const vp = await page.evaluate(() => ({ w: innerWidth, h: innerHeight }));
  // Clip to the union of both boxes plus a margin, kept inside the viewport so the capture starts where we say.
  const x0 = Math.max(0, Math.floor(Math.min(box.x, ib.x) - 2));
  const y0 = Math.max(0, Math.floor(Math.min(box.y, ib.y) - 2));
  const x1 = Math.min(vp.w, Math.ceil(Math.max(box.x + box.width, ib.x + ib.width) + 2));
  const y1 = Math.min(vp.h, Math.ceil(Math.max(box.y + box.height, ib.y + ib.height) + 2));
  if (x1 <= x0 || y1 <= y0) throw new Error('container is outside the viewport');
  const clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
  const shot = () => page.screenshot({ clip, animations: 'disabled', caret: 'hide' });
  const shown = await shot();
  // Hide with opacity, not visibility: descendants can override `visibility: hidden`, but not a parent's opacity.
  const prev = await el.evaluate((n) => {
    const v = [n.style.getPropertyValue('opacity'), n.style.getPropertyPriority('opacity')];
    n.style.setProperty('opacity', '0', 'important');
    return v;
  });
  let hidden;
  try {
    hidden = await shot();
  } finally {
    await el.evaluate((n, [v, p]) => {
      if (v) n.style.setProperty('opacity', v, p);
      else n.style.removeProperty('opacity');
    }, prev);
  }

  const c = await (await decoderFor(page)).evaluate(async ([a, b]) => {
    const load = async (b64) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      return img;
    };
    const pixels = (img) => {
      const cv = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, img.width, img.height).data;
    };
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const pa = pixels(ia);
    const pb = pixels(ib);
    let sum = 0, sx = 0, sy = 0;
    for (let i = 0; i < pa.length; i += 4) {
      // Weight = how much the icon changes this pixel, so antialiased edges count partially.
      const w = Math.abs(pa[i] - pb[i]) + Math.abs(pa[i + 1] - pb[i + 1]) + Math.abs(pa[i + 2] - pb[i + 2]);
      if (!w) continue;
      const p = i / 4;
      sum += w;
      sx += w * ((p % ia.width) + 0.5);
      sy += w * (Math.floor(p / ia.width) + 0.5);
    }
    return sum ? { x: sx / sum, y: sy / sum, w: ia.width, h: ia.height } : null;
  }, [shown.toString('base64'), hidden.toString('base64')]);
  if (!c) throw new Error('the icon draws nothing visible here (no ink, or ink the same colour as what is behind it)');
  // Image pixels -> CSS px, from the captured image's own size (no assumption about device scale).
  const inkX = clip.x + (c.x * clip.width) / c.w;
  const inkY = clip.y + (c.y * clip.height) / c.h;
  // Invariant: ink must lie within the icon's box. If not, the coordinate frames disagree; say so.
  if (inkX < ib.x - 1 || inkX > ib.x + ib.width + 1 || inkY < ib.y - 1 || inkY > ib.y + ib.height + 1) {
    throw new Error('measured ink falls outside the icon box; coordinates are inconsistent, result not trusted');
  }
  return { offX: inkX - (box.x + box.width / 2), offY: inkY - (box.y + box.height / 2) };
}

// Splits a computed `translate` value into its x, y, z parts at top-level spaces (nested calc/min/max safe).
function translateParts(value) {
  if (!value || value === 'none') return [];
  const parts = [];
  let depth = 0, cur = '';
  for (const ch of value.trim()) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (cur) parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) parts.push(cur);
  return parts;
}
// Adds a px delta to one part, keeping %, calc() and any other unit as written.
const addPx = (v, d) => (d === 0 ? v : /^-?[\d.]+px$/.test(v) ? `${+(parseFloat(v) + d).toFixed(3)}px` : `calc(${v} + ${d}px)`);
function composeTranslate(current, dx, dy) {
  const [x = '0px', y = '0px', z] = translateParts(current);
  return [addPx(x, dx), addPx(y, dy), z].filter(Boolean).join(' ');
}

// Measure one container, work out the correction, and check it by measuring again with it applied.
// Leaves the icon as it was unless `apply` is set.
export async function nudge(page, container, { icon = 'svg', grid = 0.25, apply = false } = {}) {
  const el = await container.$(icon);
  if (!el) throw new Error(`no "${icon}" inside the container`);
  const original = await el.evaluate((n) => ({ inline: n.style.translate, computed: getComputedStyle(n).translate }));
  const setTranslate = (t) => el.evaluate((n, v) => { n.style.translate = v; }, t);
  try {
    const before = await measure(page, container, { icon });
    // Observe the screen motion of +PROBE px on each axis: the columns of the CSS-px -> screen-px map.
    await setTranslate(composeTranslate(original.computed, PROBE, 0));
    const mx = await measure(page, container, { icon });
    await setTranslate(composeTranslate(original.computed, 0, PROBE));
    const my = await measure(page, container, { icon });
    const a = (mx.offX - before.offX) / PROBE, c = (mx.offY - before.offY) / PROBE;
    const b = (my.offX - before.offX) / PROBE, d = (my.offY - before.offY) / PROBE;
    const det = a * d - b * c;
    if (Math.abs(det) < 1e-3) throw new Error('moving the icon does not move its ink; cannot solve for a nudge');
    // Solve [a b; c d] * [nx; ny] = -[offX; offY].
    const nudgeX = snap((-d * before.offX + b * before.offY) / det, grid);
    const nudgeY = snap((c * before.offX - a * before.offY) / det, grid);
    const translate = composeTranslate(original.computed, nudgeX, nudgeY);
    await setTranslate(translate);
    const after = await measure(page, container, { icon });
    // Centred = within half a grid step on each axis, mapped to screen px; the grid limits how close it can get.
    const tolX = ((Math.abs(a) + Math.abs(b)) * grid) / 2 + 0.03;
    const tolY = ((Math.abs(c) + Math.abs(d)) * grid) / 2 + 0.03;
    return {
      offX: +before.offX.toFixed(2), offY: +before.offY.toFixed(2), nudgeX, nudgeY, translate,
      afterX: +after.offX.toFixed(2), afterY: +after.offY.toFixed(2),
      centred: Math.abs(after.offX) <= tolX && Math.abs(after.offY) <= tolY,
    };
  } finally {
    if (!apply) await setTranslate(original.inline);
  }
}

export async function run(argv, log = console.log) {
  const pos = [];
  const opt = { icon: 'svg', grid: 0.25, dpr: 4, apply: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') opt.apply = true;
    else if (a === '--icon') opt.icon = argv[++i];
    else if (a === '--grid') opt.grid = Number(argv[++i]);
    else if (a === '--dpr') opt.dpr = Number(argv[++i]);
    else pos.push(a);
  }
  if (pos.length < 2) {
    console.error('usage: optical-nudge.mjs <url-or-file> <container-selector> [--icon svg] [--apply] [--grid 0.25] [--dpr 4]');
    return 2;
  }
  const [target, selector] = pos;
  const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(path.resolve(target)).href;
  const { chromium } = await import('playwright-core').catch(() => import('playwright'));
  const browser = await chromium.launch();
  try {
    const page = await (await browser.newContext({ deviceScaleFactor: opt.dpr })).newPage();
    // Measure the resting state: the pointer is never moved into the page, so nothing is hovered.
    await page.goto(url);
    const containers = await page.$$(selector);
    if (!containers.length) {
      console.error(`no element matches "${selector}"`);
      return 1;
    }
    let bad = 0;
    for (const [i, c] of containers.entries()) {
      try {
        const r = await nudge(page, c, opt);
        if (!r.centred) bad++;
        log(JSON.stringify({ i, ...r }));
      } catch (e) {
        bad++;
        log(JSON.stringify({ i, error: e.message }));
      }
    }
    return bad ? 1 : 0;
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  process.exitCode = await run(process.argv.slice(2));
}
