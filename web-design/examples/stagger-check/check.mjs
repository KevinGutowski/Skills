// Checks that the CSS stagger recipes in ../../references/web-animation-design/choreography.md
// ("CSS stagger with sibling-index()") behave as the text says.
// The CSS under test is extracted from the markdown, so the check fails if a recipe is edited into something broken.
// Run from web-design/examples:
//   npm install --no-save playwright-core && npx playwright-core install chromium-headless-shell
//   node stagger-check/check.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const md = readFileSync(path.join(here, '../../references/web-animation-design/choreography.md'), 'utf8');
const section = md.slice(md.indexOf('## CSS stagger with sibling-index()'), md.indexOf('## Deliverable: the timeline'));
const css = [...section.matchAll(/```css\n([\s\S]*?)```/g)].map((m) => m[1]);
const tip = css.find((c) => /^li \{/m.test(c));
const recipe = css.filter((c) => c.includes('.list')).join('\n');
if (!tip || !recipe.includes('.list.fit')) throw new Error('recipe blocks not found in choreography.md');
// Remove every @supports block (balanced braces) to stand in for a browser without sibling-index().
const withoutSupports = (src) => {
  let out = '', i = 0;
  for (let at; (at = src.indexOf('@supports', i)) !== -1; ) {
    out += src.slice(i, at);
    let depth = 0, j = src.indexOf('{', at);
    for (; j < src.length; j++) { if (src[j] === '{') depth++; else if (src[j] === '}' && --depth === 0) break; }
    i = j + 1;
  }
  return out + src.slice(i);
};

const BUDGET = 300, EPS = 0.5;
const results = [];
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + JSON.stringify(detail) + ')' : ''}`); };
const lengths = [1, 2, 3, 6, 60];
const variants = ['', 'fit', 'eased', 'reverse'];

const browser = await chromium.launch();
const measure = async (styles, reduced, extraHtml = '') => {
  const ctx = await browser.newContext({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const lists = variants.flatMap((v) => lengths.map((n) => `<ul class="list ${v}" data-v="${v || 'base'}" data-n="${n}">${'<li>x</li>'.repeat(n)}</ul>`)).join('');
  await page.setContent(`<!doctype html><style>:root{--ease-out:cubic-bezier(.23,1,.32,1)}</style><style>${styles}</style>${lists}${extraHtml}`);
  const r = await page.evaluate(() => {
    const ms = (t) => parseFloat(t) * (t.endsWith('ms') ? 1 : 1000);
    const lists = [...document.querySelectorAll('ul.list:not([data-extra])')].map((ul) => ({
      v: ul.dataset.v, n: +ul.dataset.n,
      items: [...ul.children].map((li) => { const cs = getComputedStyle(li); return { delay: ms(cs.animationDelay), dur: ms(cs.animationDuration), name: cs.animationName }; }),
    }));
    const extra = [...document.querySelectorAll('[data-extra] > *')].map((e) => getComputedStyle(e).animationDelay);
    return { lists, extra };
  });
  await ctx.close();
  return r;
};

// 1. The tip as posted: the sixth item starts at 420ms.
{
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.setContent(`<style>${tip}</style><ul>${'<li>x</li>'.repeat(6)}</ul>`);
  const d = await page.evaluate(() => [...document.querySelectorAll('li')].map((e) => getComputedStyle(e).animationDelay));
  check('tip as posted: first item waits a step, sixth starts at 420ms', d[0] === '0.07s' && d[5] === '0.42s', d);
  await ctx.close();
}

// 2. With motion: every recipe finishes by the budget at every length; first item starts at once; order holds.
{
  const { lists } = await measure(recipe, false);
  for (const v of ['base', ...variants.slice(1)]) {
    const mine = lists.filter((l) => l.v === v);
    const ends = mine.map((l) => Math.max(...l.items.map((i) => i.delay + i.dur)));
    check(`${v}: last item finishes by ${BUDGET}ms at lengths ${lengths.join(', ')}`, ends.every((e) => e <= BUDGET + EPS), ends.map((e) => +e.toFixed(1)));
    const six = mine.find((l) => l.n === 6).items.map((i) => +i.delay.toFixed(1));
    const ordered = v === 'reverse' ? six.every((d, k) => k === 0 || d <= six[k - 1]) && six[5] === 0 : six.every((d, k) => k === 0 || d >= six[k - 1]) && six[0] === 0;
    check(`${v}: ${v === 'reverse' ? 'last' : 'first'} item starts at once and the order holds`, ordered, six);
    check(`${v}: every item animates`, mine.every((l) => l.items.every((i) => i.name === 'rise')));
  }
  const base6 = lists.find((l) => l.v === 'base' && l.n === 6).items.map((i) => +i.delay.toFixed(1));
  check('base: 30ms steps, held after the fourth item', JSON.stringify(base6) === JSON.stringify([0, 30, 60, 90, 90, 90]), base6);
  const eased = lists.find((l) => l.v === 'eased' && l.n === 6).items.map((i) => i.delay);
  const gaps = [1, 2, 3].map((k) => eased[k] - eased[k - 1]);
  check('eased: gaps shrink down the list', gaps[0] > gaps[1] && gaps[1] > gaps[2], gaps.map((g) => +g.toFixed(1)));
  const fit3 = lists.find((l) => l.v === 'fit' && l.n === 3).items.map((i) => +i.delay.toFixed(1));
  check('fit: short lists get up to 60ms steps', JSON.stringify(fit3) === JSON.stringify([0, 50, 100]), fit3);
}

// 3. Reduced motion: no animation at all.
{
  const { lists } = await measure(recipe, true);
  check('reduced motion: nothing animates', lists.every((l) => l.items.every((i) => i.name === 'none')));
}

// 4. No sibling-index() support: items enter together, and inline --i still staggers.
{
  const extra = '<ul class="list" data-extra><li style="--i:0">a</li><li style="--i:1">b</li><li style="--i:2">c</li></ul>';
  const { lists, extra: inline } = await measure(withoutSupports(recipe), false, extra);
  check('no support: every item enters at once and still animates', lists.every((l) => l.items.every((i) => i.delay === 0 && i.name === 'rise')));
  check('no support: inline --i still staggers', JSON.stringify(inline) === JSON.stringify(['0s', '0.03s', '0.06s']), inline);
}

// 5. The unit mistake the text warns about: a time written into --i makes every delay 0s.
{
  const extra = '<style>[data-extra] > * { --i: calc((min(sibling-index(), 4) - 1) * 40ms); }</style><ul class="list" data-extra><li>a</li><li>b</li><li>c</li></ul>';
  const { extra: bad } = await measure(recipe, false, extra);
  check('a time in --i collapses every delay to 0s', bad.every((d) => d === '0s'), bad);
}

await browser.close();
const passed = results.filter(Boolean).length;
console.log(`\n${passed}/${results.length} checks passed`);
process.exit(passed === results.length ? 0 : 1);
