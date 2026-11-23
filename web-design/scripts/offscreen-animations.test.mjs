// Browser test for offscreen-animations.js. Run from a directory whose
// node_modules has Playwright:  node --test <skill>/scripts/offscreen-animations.test.mjs
// Skipped when Playwright cannot be loaded from the working directory.
//
// One fixture page holds every case the audit has to tell apart; each case is an
// element whose id says what it is, and the test asserts which ids are reported.

import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'offscreen-animations.js'), 'utf8')
const req = createRequire(pathToFileURL(resolve(process.cwd(), 'noop.js')))
let chromium = null
for (const name of ['playwright', 'playwright-core']) {
  try {
    chromium ??= req(name).chromium
  } catch {}
}
const skip = chromium ? false : 'Playwright not installed in the working directory'

const PAGE = `<!doctype html><style>
  body { margin: 0; height: 4000px }
  @keyframes spin { to { transform: rotate(360deg) } }
  @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
  .box { position: absolute; left: 10px; width: 40px; height: 40px; background: #888 }
  .top { top: 10px } .far { top: 3000px }
  #on-loop, #off-loop { animation: spin 1s linear infinite }
  #off-finished { animation: fade 50ms 1 }
  #off-finished-forwards { animation: fade 50ms 1 forwards }
  #off-paused { animation: spin 1s linear infinite paused }
  #off-delay-backwards { animation: fade 1s 60s 1 backwards }
  #off-delay-plain { animation: fade 1s 60s 1 }
  #off-none { animation: spin 1s linear infinite; display: none }
  #off-hidden { animation: spin 1s linear infinite; visibility: hidden }
  #off-pseudo::before { content: ""; display: block; width: 10px; height: 10px; animation: spin 1s linear infinite }
  #off-transition { transition: opacity 30s linear; opacity: 1 }
  #off-transition.go { opacity: 0 }
  #off-scroll { animation: fade linear both; animation-timeline: scroll() }
  #off-cv-wrap { content-visibility: auto; contain-intrinsic-size: 40px }
  #off-cv { animation: spin 1s linear infinite }
</style>
<div id="on-loop" class="box top"></div>
<div id="off-loop" class="box far"></div>
<div id="off-finished" class="box far"></div>
<div id="off-finished-forwards" class="box far"></div>
<div id="off-paused" class="box far"></div>
<div id="off-delay-backwards" class="box far"></div>
<div id="off-delay-plain" class="box far"></div>
<div id="off-none" class="box far"></div>
<div id="off-hidden" class="box far"></div>
<div id="off-pseudo" class="box far"></div>
<div id="off-transition" class="box far"></div>
<div id="off-scroll" class="box far"></div>
<div id="off-cv-wrap" class="box far"><div id="off-cv" style="width:10px;height:10px"></div></div>
<div id="off-host" class="box far"></div>
<script>
  // Nested open shadow roots: host > inner host > animated element.
  const outer = document.getElementById('off-host').attachShadow({ mode: 'open' })
  outer.innerHTML = '<div id="inner-host"></div>'
  const inner = outer.getElementById('inner-host').attachShadow({ mode: 'open' })
  inner.innerHTML = '<style>@keyframes s{to{transform:rotate(360deg)}} #off-nested-shadow{width:10px;height:10px;animation:s 1s linear infinite}</style><div id="off-nested-shadow"></div>'
  // A Web Animations API loop, and a transition started after first paint.
  const w = document.createElement('div'); w.id = 'off-waapi'; w.className = 'box far'; document.body.append(w)
  w.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, iterations: Infinity })
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('off-transition').classList.add('go')))
</script>`

let browser
test.before(async () => {
  if (chromium) browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
})
test.after(async () => {
  await browser?.close()
})

test('reports exactly the animations that are doing work, and which are off screen', { skip }, async () => {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } })
  await page.setContent(PAGE)
  await page.waitForTimeout(400) // the 50ms one-shots have finished
  const report = await page.evaluate(source)
  const ids = (xs) => xs.map((x) => x.target + (x.pseudo || '')).sort()

  assert.deepEqual(ids(report.list.filter((x) => !x.offscreen)), ['#on-loop'])
  assert.deepEqual(
    ids(report.list.filter((x) => x.offscreen)),
    [
      '#off-hidden', // visibility:hidden still ticks
      '#off-loop',
      '#off-nested-shadow', // two shadow roots deep
      '#off-pseudo::before', // reported on its owner
      '#off-transition',
      '#off-waapi',
    ].sort(),
  )
  // Named for the record: each of these must NOT be counted.
  const counted = new Set(report.list.map((x) => x.target))
  for (const id of ['#off-finished', '#off-finished-forwards', '#off-paused', '#off-delay-backwards', '#off-delay-plain', '#off-none', '#off-scroll', '#off-cv']) {
    assert.equal(counted.has(id), false, `${id} is not doing work and must not be counted`)
  }
  assert.equal(report.working, 7)
  assert.equal(report.offscreen, 6)
  assert.ok(report.notSeen.some((s) => /requestAnimationFrame/.test(s)), 'the report says what it cannot see')
  await page.close()
})

test('scrolling the far ones into view moves them out of the off-screen count', { skip }, async () => {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } })
  await page.setContent(PAGE)
  await page.waitForTimeout(200)
  await page.evaluate(() => window.scrollTo(0, 2900))
  await page.waitForTimeout(100)
  const report = await page.evaluate(source)
  assert.ok(report.list.some((x) => x.target === '#off-loop' && !x.offscreen))
  assert.ok(report.list.some((x) => x.target === '#on-loop' && x.offscreen))
  await page.close()
})

test('the audit leaves the page as it found it', { skip }, async () => {
  const page = await browser.newPage()
  await page.setContent(PAGE)
  const before = await page.evaluate(() => ({ keys: Object.keys(window).length, html: document.documentElement.outerHTML.length }))
  await page.evaluate(source)
  const after = await page.evaluate(() => ({ keys: Object.keys(window).length, html: document.documentElement.outerHTML.length }))
  assert.deepEqual(after, before)
  await page.close()
})
