// Checks that the copyable snippets in ../../references/control-patterns.md, surface-recipes.md and textures.md behave as their text says.
// The code under test is extracted from the markdown, so the check fails if a snippet is edited into something broken.
// Run: node check.mjs            (helpers only, no browser)
//      node check.mjs --browser  (also parses and applies the CSS in headless Chromium; needs playwright-core and a browser)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(path.join(here, '../../references', name), 'utf8');
const blocks = (md, lang) => [...md.matchAll(new RegExp('```' + lang + '\\n([\\s\\S]*?)```', 'g'))].map((m) => m[1]);
const control = read('control-patterns.md'), surface = read('surface-recipes.md');
const js = blocks(control, 'js');
const find = (needle) => { const b = js.find((code) => code.includes(needle)); if (!b) throw new Error('snippet not found: ' + needle); return b; };

const results = [];
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`); };

// --- spring: same motion at 60 Hz and 120 Hz, comes to rest, survives a long frame
{
  const { springStep } = new Function(find('function springStep') + '\nreturn { springStep };')();
  const run = (hz, ms) => { const s = { x: 0, v: 0 }; const dt = 1000 / hz; let rest = false; for (let t = 0; t < ms; t += dt) rest = springStep(s, 100, dt); return { x: s.x, rest }; };
  const a = run(60, 300), b = run(120, 300);
  check('spring: 60 Hz and 120 Hz agree after 300 ms', Math.abs(a.x - b.x) < 1.5, `${a.x.toFixed(2)} vs ${b.x.toFixed(2)}`);
  const end = run(60, 4000);
  check('spring: reaches target and reports rest', Math.abs(end.x - 100) < 0.01 && end.rest === true, end.x.toFixed(4));
  const s = { x: 0, v: 0 }; springStep(s, 100, 5000);
  check('spring: a 5 s frame does not explode', Number.isFinite(s.x) && Math.abs(s.x) < 250, s.x.toFixed(2));
}
// --- one number is the state
{
  const { mix, windowed, staggered } = new Function(find('const mix =').split('function render')[0] + '\nreturn { mix, windowed, staggered };')();
  check('mix: endpoints', mix(240, 340, 0) === 240 && mix(240, 340, 1) === 340);
  check('windowed: zero before start, one at end', windowed(0.5, 0.55) === 0 && windowed(1, 0.55) === 1);
  check('staggered: last item finishes at p = 1', Math.abs(staggered(1, 4, 5) - 1) < 1e-9 && staggered(0, 4, 5) === 0);
}
// --- rubber band and flick landing
{
  const { rubber, landing } = new Function(find('const rubber =') + '\nreturn { rubber, landing };')();
  check('rubber: signed, finite, bounded by the limit', rubber(-120) === -60 && rubber(120) === 60 && Math.abs(rubber(-1e6)) < 120 && rubber(0) === 0, `${rubber(-120)}, ${rubber(1e6).toFixed(2)}`);
  check('landing: projects velocity then snaps', landing(90, 600, [0, 100, 200, 300]) === 200 && landing(90, 0, [0, 100, 200]) === 100);
}
// --- reversal limiter: a 4 Hz and a 12 Hz level never produce more than 4 reversals in any second
{
  const { limitReversals } = new Function(find('function limitReversals') .split('// each frame')[0] + '\nreturn { limitReversals };')();
  for (const hz of [4, 12, 30]) {
    const st = { out: 0, dir: 0, lastFlip: -Infinity }; const flips = []; let prev = 0, prevDir = 0;
    for (let t = 0; t <= 5000; t += 1000 / 60) {
      const out = limitReversals(st, 0.5 + 0.5 * Math.sin((2 * Math.PI * hz * t) / 1000), t);
      const dir = Math.sign(out - prev); if (dir !== 0 && prevDir !== 0 && dir !== prevDir) flips.push(t); if (dir !== 0) prevDir = dir; prev = out;
    }
    let worst = 0; for (const t of flips) worst = Math.max(worst, flips.filter((u) => u >= t && u < t + 1000).length);
    check(`limiter: ${hz} Hz input gives at most 4 reversals in any second`, worst <= 4, `worst ${worst}`);
  }
}

// --- hover-texture skeleton (textures.md): the weight spring stays bounded and settles at 30, 60 and 120 Hz
{
  const sk = blocks(read('textures.md'), 'js').find((code) => code.includes('function stepWeight'));
  if (!sk) throw new Error('snippet not found: function stepWeight');
  const { stepWeight } = new Function(sk.split('const spring =')[0] + '\nreturn { stepWeight };')();
  const run = (hz, ms, target = 1) => { const s = { w: 0, v: 0 }; let lo = 0, hi = 0, restAt = null;
    for (let i = 0, n = Math.round((ms * hz) / 1000); i < n; i++) { const t = (i * 1000) / hz; const rest = stepWeight(s, target, Math.min(1 / hz, 1 / 30)); lo = Math.min(lo, s.w); hi = Math.max(hi, s.w); if (rest && restAt === null) restAt = t; }
    return { w: s.w, lo, hi, restAt }; };
  for (const hz of [30, 60, 120]) {
    const r = run(hz, 1000);
    check(`texture spring at ${hz} Hz: bounded, no overshoot, at rest within 0.5 s`, r.lo >= 0 && r.hi <= 1 && r.w === 1 && r.restAt !== null && r.restAt < 500, `range ${r.lo.toFixed(3)}..${r.hi.toFixed(3)}, rest at ${r.restAt?.toFixed(0)} ms`);
  }
  const a = run(60, 100), b = run(120, 100);
  check('texture spring: 60 Hz and 120 Hz agree after 100 ms', Math.abs(a.w - b.w) < 0.02, `${a.w.toFixed(3)} vs ${b.w.toFixed(3)}`);
  const big = { w: 0, v: 0 }; stepWeight(big, 1, 5);
  check('texture spring: a 5 s step lands on the target', Number.isFinite(big.w) && Math.abs(big.w - 1) < 0.01, big.w.toFixed(4));

  // Whole skeleton with a stubbed DOM and a fixed frame clock: hover in, rest, leave; frames stop each time.
  for (const hz of [30, 60, 120]) {
    const handlers = {}; let queue = [], now = 0, requested = 0;
    const el = () => ({ style: {} });
    const marks = Array.from({ length: 20 }, (_, i) => ({ el: el(), x: 36 * i, y: 258 }));
    const env = {
      W: 732, H: 516, REACH: 60, marks,
      root: { addEventListener: (type, fn) => { handlers[type] = fn; } },
      svg: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 732, height: 516 }) },
      matchMedia: () => ({ matches: false }),
      requestAnimationFrame: (fn) => { requested++; queue.push(fn); return requested; },
    };
    new Function(...Object.keys(env), sk)(...Object.values(env));
    const pump = (maxFrames) => { let n = 0; while (queue.length && n < maxFrames) { const q = queue; queue = []; now += 1000 / hz; for (const fn of q) fn(now); n++; } return n; };
    handlers.pointerenter(); handlers.pointermove({ pointerType: 'mouse', clientX: 360, clientY: 258 });
    const inFrames = pump(200);
    const scaled = marks.some((m) => /scale\(/.test(m.el.style.transform || ''));
    const finite = marks.every((m) => !/NaN|Infinity/.test(m.el.style.transform || ''));
    handlers.pointerleave(); const outFrames = pump(200);
    const cleared = marks.every((m) => !m.el.style.transform);
    check(`texture skeleton at ${hz} Hz: hover settles and leave clears, and the frame loop stops both times`, inFrames < 200 && outFrames < 200 && queue.length === 0 && scaled && finite && cleared, `in ${inFrames} frames, out ${outFrames} frames`);
  }
}

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright-core');
  const css = [...blocks(control, 'css'), ...blocks(surface, 'css')].join('\n');
  const svg = blocks(surface, 'html').join('\n');
  const html = `<!doctype html><style>:root{--ink:#111;--paper:#fff;--muted:#777;--c1:#f0f;--c2:#0ff}</style><style id="snippets">${css}</style>${svg}
    <div class="reveal" id="rev"><div class="inner"><p style="margin:0;height:80px">content</p></div></div>
    <div class="beam" id="beam" style="width:220px"><div class="beam-bloom" id="bloom"></div><div class="beam-inner"></div><div class="beam-body" style="height:80px"></div></div>
    <p class="shimmer" id="shim">Thinking…</p><div class="widget" id="w"><div class="dial" id="dial"></div></div>
    <div class="edge" id="card" style="--lit:1"></div><div class="glass" id="glass">x</div><ul><li class="item" style="--i:2" id="item">x</li></ul><ul id="autoIdx"><li class="item">x</li><li class="item">x</li><li class="item">x</li><li class="item">x</li><li class="item">x</li><li class="item">x</li><li class="item">x</li><li class="item">x</li></ul><button class="hold"><span>Hold</span><span class="fill" id="holdfill"><span>Hold</span></span></button>`;
  const browser = await chromium.launch();
  for (const reduced of [false, true]) {
    const ctx = await browser.newContext({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage(); const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
    await page.setContent(html);
    const r = await page.evaluate(async () => {
      const cs = (sel, pseudo) => getComputedStyle(document.querySelector(sel), pseudo);
      // A browser drops a declaration it cannot parse, so check the computed result of each one a recipe needs.
      const decl = {
        beamStrokeMask: /conic-gradient/.test(cs('#beam', '::before').maskImage || cs('#beam', '::before').webkitMaskImage || ''),
        beamBloomBlur: /blur/.test(cs('#bloom').filter) && cs('#bloom', '::before').filter === 'none',   // blur on the wrapper, mask on its child
        beamBloomRing: /linear-gradient/.test(cs('#bloom', '::before').maskImage || cs('#bloom', '::before').webkitMaskImage || '') && cs('#bloom', '::before').paddingTop === '10px',
        beamParkedColours: (cs('#beam', '::before').backgroundImage.match(/radial-gradient/g) || []).length === 4,
        edgeRing: /radial-gradient/.test(cs('#card', '::before').backgroundImage) && cs('#card', '::before').paddingTop === '1px',
        widgetGradients: (cs('#w').backgroundImage.match(/radial-gradient/g) || []).length === 4,   // three in one hue plus the dark centre
        dialTicks: /repeating-conic-gradient/.test(cs('#dial', '::before').backgroundImage) && /radial-gradient/.test(cs('#dial', '::before').maskImage || cs('#dial', '::before').webkitMaskImage || ''),
        glassBackdrop: /blur\(18px\)/.test(cs('#glass').backdropFilter || cs('#glass').webkitBackdropFilter || '') && /saturate/.test(cs('#glass').backdropFilter || cs('#glass').webkitBackdropFilter || ''),
        revealGrid: cs('#rev').display === 'grid' && cs('#rev .inner').overflow === 'hidden',
        staggerKeyframe: cs('#item').animationName === 'rise',
        revealAnimates: cs('#rev').transitionDuration.split(', ').some((d) => d !== '0s'),
        holdFillClip: /inset\(/.test(cs('#holdfill').clipPath) && cs('#holdfill').position === 'absolute',
        shimmerClip: (() => { const el = document.getElementById('shim'); el.dataset.live = ''; const v = cs('#shim').backgroundClip || cs('#shim').webkitBackgroundClip; delete el.dataset.live; return v === 'text'; })(),
      };
      const out = { decl, closed: cs('#rev').gridTemplateRows, sweepIdle: cs('#beam').animationName, beamIdleOpacity: cs('#beam', '::before').opacity, shimmerIdle: cs('#shim').animationName,
        widgetBg: cs('#w').backgroundImage.includes('radial-gradient'), cardMask: cs('#card', '::before').maskImage || cs('#card', '::before').webkitMaskImage,
        itemDelay: cs('#item').animationDelay, autoDelays: [...document.querySelectorAll('#autoIdx > .item')].map((e) => getComputedStyle(e).animationDelay).join(' '), itemTransform: cs('#item').transform, itemOpacity: cs('#item').opacity, revealChildTransition: cs('#rev .inner > *').transitionDuration, goo: !!document.getElementById('goo'), grain: !!document.getElementById('grain'),
        dialTicks: cs('#dial', '::before').backgroundImage.includes('repeating-conic-gradient'), glass: (cs('#glass').backdropFilter || cs('#glass').webkitBackdropFilter || '').includes('blur') };
      document.getElementById('rev').dataset.open = 'true'; document.getElementById('beam').dataset.active = ''; document.getElementById('shim').dataset.live = '';
      await new Promise((res) => setTimeout(res, 700));
      out.openHeight = document.querySelector('#rev .inner').getBoundingClientRect().height;
      out.sweepActive = cs('#beam').animationName; out.beamActiveOpacity = cs('#beam', '::before').opacity;
      out.shimmerLive = cs('#shim').animationName; delete document.getElementById('shim').dataset.live; out.shimmerAfter = cs('#shim').animationName;   // the work ended
      return out;
    });
    const tag = reduced ? 'reduced motion' : 'motion';
    // Under reduced motion some of these are meant to differ: the beam's window becomes a plain ring, the shimmer drops its
    // clipped gradient, the stagger keyframe is off and the reveal has no transition.
    const expected = { ...Object.fromEntries(Object.keys(r.decl).map((k) => [k, true])), ...(reduced ? { beamStrokeMask: false, shimmerClip: false, staggerKeyframe: false, revealAnimates: false } : {}) };
    const wrong = Object.keys(expected).filter((k) => r.decl[k] !== expected[k]);
    check(`${tag}: no page errors, and the declarations each recipe depends on survived parsing`, errors.length === 0 && wrong.length === 0, wrong.join(', ') || `${Object.keys(expected).length} declarations`);
    check(`${tag}: grid reveal is closed, then opens to content height`, r.closed === '0px' && Math.abs(r.openHeight - 80) < 1, `${r.closed} -> ${r.openHeight}`);
    check(`${tag}: beam is invisible and still until active`, r.sweepIdle === 'none' && r.beamIdleOpacity === '0', `${r.sweepIdle} ${r.beamIdleOpacity}`);
    check(`${tag}: beam ${reduced ? 'shows but stays still when active' : 'shows and turns when active'}`, (reduced ? r.sweepActive === 'none' : r.sweepActive === 'beam-turn') && Number(r.beamActiveOpacity) > 0.3, `${r.sweepActive} ${r.beamActiveOpacity}`);
    // The index comes from sibling-index() (capped at the sixth step) and must stay unitless; inline --i (#item above) still wins.
    check(`${tag}: sibling-index() supplies the stagger index, capped at six`, r.autoDelays === (reduced ? Array(8).fill('0s').join(' ') : '0s 0.04s 0.08s 0.12s 0.16s 0.2s 0.2s 0.2s'), r.autoDelays);
    if (reduced) check('reduced motion: the stagger item is in place at once and the reveal opens with no transition', r.itemTransform === 'none' && r.itemOpacity === '1' && r.revealChildTransition.split(', ').every((d) => d === '0s'), `${r.itemTransform} ${r.itemOpacity} ${r.revealChildTransition}`);
    check(`${tag}: shimmer is still until its state is live, ${reduced ? 'stays still when live' : 'sweeps while live'}, and stops when the state ends`,
      r.shimmerIdle === 'none' && r.shimmerAfter === 'none' && (reduced ? r.shimmerLive === 'none' : r.shimmerLive === 'shimmer-sweep'), `${r.shimmerIdle} / ${r.shimmerLive} / ${r.shimmerAfter}`);
    check(`${tag}: gradient card, tick dial, glass, edge-light mask, stagger delay and SVG filters apply`, r.widgetBg && r.dialTicks && r.glass && r.cardMask !== 'none' && r.itemDelay === (reduced ? '0s' : '0.08s') && r.goo && r.grain, `${r.cardMask.slice(0, 30)}… ${r.itemDelay}`);
    await ctx.close();
  }
  const galleryUrl = 'file://' + path.join(here, '../gallery/index.html');
  { // gallery, desktop: loads cleanly, the beam really moves, then stops inside five seconds, and replays
    const ctx = await browser.newContext({ viewport: { width: 1300, height: 1200 }, colorScheme: 'dark' }); const page = await ctx.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(String(e))); page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(galleryUrl); await page.waitForTimeout(500);
    const angle = () => page.evaluate(() => getComputedStyle(document.querySelector('[data-demo="beam"] .beam')).getPropertyValue('--beam-angle'));
    const state = () => page.evaluate(() => ({ active: document.querySelectorAll('.beam[data-active]').length, live: document.querySelectorAll('.status[data-live]').length,
      running: document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations === Infinity).length,
      text: document.querySelector('[data-status-text]').textContent }));
    const beamBox = await page.locator('[data-demo="beam"] .beam').first().boundingBox(); const PAD = 34;
    const beamClip = { x: Math.floor(beamBox.x - PAD), y: Math.floor(beamBox.y - PAD), width: Math.ceil(beamBox.width + PAD * 2), height: Math.ceil(beamBox.height + PAD * 2) };
    const activeFrames = []; const a1 = await angle();
    for (let i = 0; i < 4; i++) { activeFrames.push((await page.screenshot({ clip: beamClip })).toString('base64')); await page.waitForTimeout(220); }
    const a2 = await angle(); const early = await state();
    const tiles = await page.evaluate(() => [...document.querySelectorAll('.tile')].filter((t) => t.getBoundingClientRect().height > 100).length);
    check('gallery: loads with no errors and ten tiles', errors.length === 0 && tiles === 10, `${tiles} tiles, ${errors.length} errors`);
    check('gallery: the beam angle changes over time while working', a1 !== a2 && early.active === 2 && early.text === 'Working', `${a1} -> ${a2}`);
    await page.waitForTimeout(4700);                                   // 5.6 s after load
    const late = await state();
    check('gallery: nothing is still looping five seconds after load', late.active === 0 && late.live === 0 && late.running === 0 && late.text === 'Done', JSON.stringify(late));
    { // the bloom must reach past the box: compare the pixels at least 8 px outside the composer while active against the settled frame
      const settled = (await page.screenshot({ clip: beamClip })).toString('base64'); const dec = await ctx.newPage();
      const spill = await dec.evaluate(async ({ frames, settled, pad, w, h }) => {
        const load = async (b64) => { const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode(); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return { d: x.getImageData(0, 0, c.width, c.height).data, W: c.width, H: c.height }; };
        const base = await load(settled); const s = base.W / (w + pad * 2); let far = 0, lit = 0;
        for (const f of frames) { const cur = await load(f);
          for (let y = 0; y < base.H; y++) for (let x = 0; x < base.W; x++) { const cx = x / s - pad, cy = y / s - pad;                 // CSS px relative to the box
            const out = Math.max(-cx, cx - w, -cy, cy - h); if (out < 8) continue; const i = (y * base.W + x) * 4;
            const diff = Math.max(Math.abs(cur.d[i] - base.d[i]), Math.abs(cur.d[i + 1] - base.d[i + 1]), Math.abs(cur.d[i + 2] - base.d[i + 2]));
            if (diff >= 6) { lit++; far = Math.max(far, out); } } }
        return { lit, far: Math.round(far) }; }, { frames: activeFrames, settled, pad: PAD, w: beamBox.width, h: beamBox.height });
      await dec.close();
      check('gallery: the beam bloom is painted well outside the composer (at least 14 px) while active', spill.lit > 400 && spill.far >= 14, JSON.stringify(spill));
    }
    await page.locator('[data-demo="beam"] .replay').first().click(); await page.waitForTimeout(300);
    check('gallery: Replay starts the beam again', (await state()).active === 1);
    // Text contrast, measured from rendered pixels (so backdrop-filter, gradients and grain are included): hide the text,
    // screenshot what is behind it, and compare the text colour with the least favourable pixel.
    const decoder = await ctx.newPage();
    async function contrast(selector, prepare) {
      if (prepare) await page.evaluate(prepare);
      const loc = page.locator(selector).first(); await loc.scrollIntoViewIfNeeded();
      const color = await loc.evaluate((el) => { const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d'); cx.fillStyle = getComputedStyle(el).color; cx.fillRect(0, 0, 1, 1);   // resolves oklab(), color-mix() and alpha to 8-bit RGBA
        const px = cx.getImageData(0, 0, 1, 1).data; const al = px[3] / 255; const c = al ? [px[0], px[1], px[2], al] : [0, 0, 0, 0]; el.dataset.prevColor = el.style.color; el.style.setProperty('color', 'transparent', 'important'); el.style.setProperty('-webkit-text-fill-color', 'transparent', 'important'); return c; });
      // Sample only where the glyphs are (the text's own box), not the element's padding or rounded corners.
      const clip = await loc.evaluate((el) => { const range = document.createRange(); range.selectNodeContents(el); const r = range.getBoundingClientRect();
        return { x: Math.floor(r.left + scrollX), y: Math.floor(r.top + scrollY), width: Math.max(1, Math.ceil(r.width)), height: Math.max(1, Math.ceil(r.height)) }; });
      const png = (await page.screenshot({ clip, fullPage: true })).toString('base64');
      await loc.evaluate((el) => { el.style.removeProperty('color'); el.style.removeProperty('-webkit-text-fill-color'); });
      return decoder.evaluate(async ({ png, color }) => {
        const img = new Image(); img.src = 'data:image/png;base64,' + png; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data; const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); const [tr, tg, tb, ta = 1] = color; let worst = Infinity;
        for (let i = 0; i < d.length; i += 4) { const r = tr * ta + d[i] * (1 - ta), g = tg * ta + d[i + 1] * (1 - ta), b = tb * ta + d[i + 2] * (1 - ta);
          const a = lum(r, g, b), bg = lum(d[i], d[i + 1], d[i + 2]); worst = Math.min(worst, (Math.max(a, bg) + 0.05) / (Math.min(a, bg) + 0.05)); }
        return worst; }, { png, color });
    }
    const targets = [['.tile > h2', 'tile heading'], ['.tile.wide > h2', 'heading over the mesh'], ['.composer .placeholder', 'composer placeholder'], ['.pill', 'pill label'], ['[data-demo="beam"] ~ [data-demo="beam"] [data-status-text]', 'status text, settled'],
      ['.widget header > span', 'card header'], ['.dial small', 'dial caption'], ['.widget footer > span', 'card footer label'], ['.edge p', 'edge card body'],
      ['.glass h3', 'glass heading'], ['.glass p', 'glass body copy'], ['.toast[style*="--d:0"] span', 'toast secondary text'], ['.holo .meta', 'holo card label, resting'], ['.holo .meta', 'holo card label, highlight on it', () => { const h = document.getElementById('holo'); h.style.setProperty('--px', '35%'); h.style.setProperty('--py', '92%'); }],
      ['.holo .meta', 'holo card label, highlight at the far corner', () => { const h = document.getElementById('holo'); h.style.setProperty('--px', '95%'); h.style.setProperty('--py', '98%'); }], ['#hold > [data-label]', 'hold label, idle'],
      ['#hold .fill > [data-label]', 'hold label, armed', () => { document.getElementById('hold').dataset.armed = ''; }], ['#tabs button[aria-pressed="false"]', 'unselected option']];
    const low = [];
    for (const [sel, name, prep] of targets) { const r = await contrast(sel, prep); if (r < 4.5) low.push(`${name} ${r.toFixed(2)}`); }
    await page.evaluate(() => { delete document.getElementById('hold').dataset.armed; }); await decoder.close();
    check(`gallery: rendered text contrast is at least 4.5:1 for ${targets.length} text samples`, low.length === 0, low.join('; ') || 'all pass');
    await page.locator('[data-demo="beam"] .send').first().click(); await page.waitForTimeout(250);
    check('gallery: Send starts a run, like Replay', (await page.evaluate(() => document.querySelector('[data-demo="beam"] [data-status-text]').textContent)) === 'Working');
    await page.locator('[data-demo="beam"] .send').nth(1).focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(250);
    check('gallery: Send works from the keyboard too', (await page.evaluate(() => document.querySelectorAll('[data-demo="beam"] [data-status-text]')[1].textContent)) === 'Working');
    check('gallery: no focusable control is inert (the glass sample has no button)', (await page.evaluate(() => document.querySelectorAll('.glass button, .glass a').length)) === 0);
    // interactions
    const box = await page.locator('#hold').boundingBox(); const hx = box.x + box.width / 2, hy = box.y + box.height / 2;
    await page.mouse.move(hx, hy); await page.mouse.down(); await page.waitForTimeout(1350); await page.mouse.up();
    check('gallery: the hold button is live and confirms on release', (await page.evaluate(() => window.galleryConfirmCount)) === 1 && (await page.locator('#hold-result').textContent()) === 'Deleted');
    await page.locator('#goo-toggle').click(); await page.waitForTimeout(700);
    const goo = await page.evaluate(() => ({ expanded: document.getElementById('goo-toggle').getAttribute('aria-expanded'), icons: [...document.querySelectorAll('.goo-icons span')].map((s) => getComputedStyle(s).opacity),
      shapes: [...document.querySelectorAll('.goo-layer i')].slice(1).map((i) => Math.round(i.getBoundingClientRect().left)) }));
    check('gallery: collapsing the goo hides the satellite icons and gathers the shapes', goo.expanded === 'false' && goo.icons.every((o) => o === '0') && new Set(goo.shapes).size === 1, JSON.stringify(goo));
    await page.locator('#tabs button').first().click(); await page.waitForTimeout(450);
    const sel = await page.evaluate(() => { const g = document.getElementById('tabs'), b = g.querySelector('button'), pill = g.querySelector('.pill-bg').getBoundingClientRect(), r = b.getBoundingClientRect();
      return { pressed: b.getAttribute('aria-pressed'), roles: g.querySelectorAll('[role="tab"], [role="tablist"]').length, aligned: Math.abs(pill.left - r.left) < 1.5 && Math.abs(pill.width - r.width) < 1.5 }; });
    check('gallery: selection buttons use aria-pressed, no tab roles, and the pill lands on the pressed one', sel.pressed === 'true' && sel.roles === 0 && sel.aligned, JSON.stringify(sel));
    // stacked fan: the button opens it from the keyboard and it stays open
    await page.locator('#fan-toggle').focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(500);
    const fan = await page.evaluate(() => ({ open: document.getElementById('toasts').hasAttribute('data-open'), expanded: document.getElementById('fan-toggle').getAttribute('aria-expanded'),
      tops: [...document.querySelectorAll('.toast')].map((t) => Math.round(t.getBoundingClientRect().top)), text: [...document.querySelectorAll('.toast > b')].map((b) => getComputedStyle(b).opacity) }));
    check('gallery: the stacked fan opens from the keyboard, reports aria-expanded, and reveals every card', fan.open && fan.expanded === 'true' && new Set(fan.tops).size === 3 && fan.tops[1] - fan.tops[0] > 40 && fan.text.every((o) => o === '1'), JSON.stringify(fan));
    await ctx.close();
  }
  { // forced colours: the selected option is still distinguishable
    const ctx = await browser.newContext({ viewport: { width: 1300, height: 1200 }, forcedColors: 'active' }); const page = await ctx.newPage();
    await page.goto(galleryUrl); await page.waitForTimeout(300);
    const read = () => page.evaluate(() => [...document.querySelectorAll('#tabs button')].map((b) => { const c = getComputedStyle(b); return { pressed: b.getAttribute('aria-pressed') === 'true', underline: c.textDecorationLine.includes('underline'), outline: c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) >= 2, focused: document.activeElement === b }; }));
    const rest = await read();
    check('gallery in forced colours: only the selected option is underlined, and nothing is outlined at rest', rest.every((b) => b.underline === b.pressed && !b.outline), JSON.stringify(rest));
    await page.locator('#tabs button').first().focus(); await page.keyboard.press('Tab'); const onSelected = await read();        // keyboard focus lands on the selected option
    check('gallery in forced colours: focusing the selected option adds an outline on top of its underline', onSelected.some((b) => b.focused && b.pressed && b.outline && b.underline) && onSelected.filter((b) => !b.focused).every((b) => !b.outline), JSON.stringify(onSelected));
    await page.keyboard.press('Tab'); const onOther = await read();
    check('gallery in forced colours: focusing an unselected option shows an outline and no underline', onOther.some((b) => b.focused && !b.pressed && b.outline && !b.underline), JSON.stringify(onOther));
    await ctx.close();
  }
  { // touch: a tap on the fan's button opens it and it stays open (the hover path is mouse only)
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true }); const page = await ctx.newPage();
    await page.goto(galleryUrl); await page.waitForTimeout(300);
    await page.locator('#fan-toggle').scrollIntoViewIfNeeded(); await page.locator('#fan-toggle').tap(); await page.waitForTimeout(700);
    const afterTap = await page.evaluate(() => document.getElementById('toasts').hasAttribute('data-open'));
    await page.locator('#toasts').tap(); await page.waitForTimeout(400);
    const afterStackTap = await page.evaluate(() => document.getElementById('toasts').hasAttribute('data-open'));
    await page.locator('#fan-toggle').tap(); await page.waitForTimeout(400);
    const closed = await page.evaluate(() => !document.getElementById('toasts').hasAttribute('data-open'));
    check('gallery on touch: tapping the button opens the fan, tapping the cards does not close it, tapping the button again does', afterTap && afterStackTap && closed, JSON.stringify({ afterTap, afterStackTap, closed }));
    await ctx.close();
  }
  { // gallery, phone width: no horizontal overflow, and every sample fits inside its tile
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, colorScheme: 'dark' }); const page = await ctx.newPage();
    await page.goto(galleryUrl); await page.waitForTimeout(500);
    const n = await page.evaluate(() => { const out = { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, spill: [] };
      for (const t of document.querySelectorAll('.tile')) { const tr = t.getBoundingClientRect();
        for (const c of t.children) { const r = c.getBoundingClientRect(); if (c.classList.contains('mesh')) continue; if (r.left < tr.left - 1 || r.right > tr.right + 1) out.spill.push(t.querySelector('h2').textContent); } }
      out.tileWidth = Math.round(document.querySelector('.tile').getBoundingClientRect().width); return out; });
    check('gallery at 390 px: single column, no horizontal overflow, nothing spills out of a tile', n.overflow <= 0 && n.spill.length === 0 && n.tileWidth > 300, JSON.stringify(n));
    await ctx.close();
  }
  await browser.close();
}
const failed = results.filter((ok) => !ok).length;
console.log(`${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
