// Browser regression check for the hold-to-confirm recipe.
// Run: npm i playwright-core && npx playwright-core install chromium-headless-shell && node check.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const page_url = pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.html')).href;
const browser = await chromium.launch();
const results = [];
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`); };

async function fresh(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto(page_url);
  const box = await page.locator('#delete').boundingBox();
  return { context, page, x: box.x + box.width / 2, y: box.y + box.height / 2 };
}
const count = (page) => page.evaluate(() => window.confirmCount);
const label = (page) => page.locator('#delete > [data-label]').textContent();

{ // 1. A full hold with the main button, released over the button, confirms once.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(1350);
  check('label says release to confirm once armed', (await label(page)) === 'Release to confirm');
  check('nothing commits while the pointer is still down', (await count(page)) === 0);
  await page.mouse.up();
  check('full hold then release confirms once', (await count(page)) === 1);
  check('label returns to idle after confirming', (await label(page)) === 'Hold to delete');
  await context.close();
}
{ // 2. A short hold does nothing.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(400); await page.mouse.up();
  check('short hold does not confirm', (await count(page)) === 0);
  await context.close();
}
{ // 3. Holding the secondary button does nothing.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down({ button: 'right' }); await page.waitForTimeout(1350); await page.mouse.up({ button: 'right' });
  check('right-button hold does not confirm', (await count(page)) === 0);
  await context.close();
}
{ // 4. Chord: both buttons down, main released early, secondary released after the hold time.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y);
  await page.mouse.down({ button: 'left' }); await page.mouse.down({ button: 'right' });
  await page.waitForTimeout(200); await page.mouse.up({ button: 'left' });
  await page.waitForTimeout(1350); await page.mouse.up({ button: 'right' });
  check('chord with early main-button release does not confirm', (await count(page)) === 0);
  check('label is idle after the chord', (await label(page)) === 'Hold to delete');
  await context.close();
}
{ // 5. Chord: both held past the hold time, secondary released first, then main: still a deliberate main-button release.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y);
  await page.mouse.down({ button: 'left' }); await page.mouse.down({ button: 'right' });
  await page.waitForTimeout(1350); await page.mouse.up({ button: 'right' });
  check('releasing only the secondary button does not confirm', (await count(page)) === 0);
  await page.mouse.up({ button: 'left' });
  check('main-button release after a chord confirms', (await count(page)) === 1);
  await context.close();
}
{ // 6. Sliding off before release cancels and restores the label.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(1350);
  await page.mouse.move(x + 400, y + 300); await page.mouse.up();
  check('release outside the button does not confirm', (await count(page)) === 0);
  check('label is idle after releasing outside', (await label(page)) === 'Hold to delete');
  await context.close();
}
{ // 7. Reduced motion: no wipe while holding, fill shown once armed.
  const { context, page, x, y } = await fresh({ reducedMotion: 'reduce' });
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(300);
  const mid = await page.evaluate(() => { const s = getComputedStyle(document.querySelector('.fill')); return { d: s.transitionDuration, clip: s.clipPath }; });
  check('reduced motion: no transition while holding', mid.d === '0s', mid.d);
  check('reduced motion: fill hidden while holding', /inset\(0(px)? 100% 0(px)? 0(px)?\)/.test(mid.clip), mid.clip);
  await page.waitForTimeout(1050);
  const armed = await page.evaluate(() => getComputedStyle(document.querySelector('.fill')).clipPath);
  check('reduced motion: fill shown once armed', /inset\(0(px)?( 0(px)?)*\)/.test(armed) && !/100%/.test(armed), armed);
  await page.mouse.up();
  check('reduced motion: still confirms on release', (await count(page)) === 1);
  await context.close();
}
{ // 8. Leaving before the hold completes, waiting past the hold time outside, then returning and releasing: no commit.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(300);
  await page.mouse.move(x + 400, y + 300); await page.waitForTimeout(1350);
  check('leaving mid-hold stops the fill and never arms outside', (await label(page)) === 'Hold to delete' && !(await page.evaluate(() => 'armed' in document.getElementById('delete').dataset)));
  await page.mouse.move(x, y); await page.waitForTimeout(100); await page.mouse.up();
  check('leaving mid-hold then returning and releasing does not confirm', (await count(page)) === 0);
  await context.close();
}
{ // 9. Arming, leaving, returning, releasing: the excursion cancels it.
  const { context, page, x, y } = await fresh();
  await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(1350);
  await page.mouse.move(x + 400, y + 300); await page.waitForTimeout(100); await page.mouse.move(x, y); await page.waitForTimeout(100);
  check('label is idle after leaving while armed', (await label(page)) === 'Hold to delete');
  await page.mouse.up();
  check('arming, leaving and returning does not confirm', (await count(page)) === 0);
  await page.mouse.down(); await page.waitForTimeout(1350); await page.mouse.up();
  check('a fresh full hold afterwards still confirms', (await count(page)) === 1);
  await context.close();
}
await browser.close();
const failed = results.filter((ok) => !ok).length;
console.log(`${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
