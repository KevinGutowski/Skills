// Layout checks for the two exemplars in ../examples, at the widths they claim
// to handle. Run from a directory whose node_modules has Playwright:
//
//   node --test <skill>/scripts/examples.test.mjs
//
// Skipped when Playwright cannot be loaded from the working directory.
//
// What is asserted, at every width: the page does not scroll sideways; the
// thing each picture is about is whole inside its stage or tile; no element
// with real words is cut by the stage edge; every piece of text meets WCAG AA
// contrast against what is behind it; and each picture's accessible label
// names nothing that this width hides.

import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const examples = join(dirname(fileURLToPath(import.meta.url)), '..', 'examples')
const req = createRequire(pathToFileURL(resolve(process.cwd(), 'noop.js')))
let chromium = null
for (const name of ['playwright', 'playwright-core']) {
  try {
    chromium ??= req(name).chromium
  } catch {}
}
const skip = chromium ? false : 'Playwright not installed in the working directory'
const WIDTHS = [358, 390, 600, 759, 760, 820, 1031, 1032, 1280]

let browser
test.before(async () => {
  if (chromium) browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
})
test.after(async () => {
  await browser?.close()
})

async function measure(file, width, script) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  try {
    await page.goto(pathToFileURL(join(examples, file)).href)
    return await page.evaluate(script)
  } finally {
    await page.close()
  }
}

// Runs in the page. `stageSel` clips its contents; `mustBeWhole` are the
// elements the picture is about; `wordSel` selects elements holding real words.
const probe = ({ stageSel, mustBeWhole, wordSel }) => {
  const inside = (r, s) => r.left >= s.left - 0.5 && r.right <= s.right + 0.5 && r.top >= s.top - 0.5 && r.bottom <= s.bottom + 0.5
  const shown = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'
  const out = { overflowX: document.documentElement.scrollWidth - window.innerWidth, missing: [], cutWhole: [], cutWords: [], labels: [] }
  for (const stage of document.querySelectorAll(stageSel)) {
    const s = stage.getBoundingClientRect()
    for (const sel of mustBeWhole) {
      for (const el of stage.querySelectorAll(sel)) {
        if (!shown(el)) out.missing.push(sel)
        else if (!inside(el.getBoundingClientRect(), s)) out.cutWhole.push(sel)
      }
    }
    for (const el of stage.querySelectorAll(wordSel)) {
      if (!shown(el) || !el.textContent.trim()) continue
      // Use the text's own box, not the element's, so a wide grid track does not count.
      const range = document.createRange()
      range.selectNodeContents(el)
      const r = range.getBoundingClientRect()
      const partly = r.right > s.left && r.left < s.right && r.bottom > s.top && r.top < s.bottom
      if (partly && !inside(r, s)) out.cutWords.push(el.textContent.trim().slice(0, 30))
    }
  }
  // Contrast of every piece of real text against what is actually behind it.
  const parse = (c) => {
    const m = /rgba?\(([^)]+)\)/.exec(c)
    if (!m) return null
    const p = m[1].split(/[,\s\/]+/).filter(Boolean).map(Number)
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }
  }
  const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 })
  const lum = ({ r, g, b }) => [r, g, b].map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0)
  const backdrop = (el) => {
    const layers = []
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n)
      const grad = cs.backgroundImage.includes('gradient') ? parse(cs.backgroundImage) : null
      const bg = grad || parse(cs.backgroundColor)
      if (bg && bg.a > 0) layers.push(bg)
      if (bg && bg.a === 1) break
    }
    return layers.reduceRight((under, top) => over(top, under), { r: 255, g: 255, b: 255, a: 1 })
  }
  out.lowContrast = []
  for (const el of document.querySelectorAll(stageSel + ' *')) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (!own || !shown(el)) continue
    const cs = getComputedStyle(el)
    let alpha = 1
    for (let n = el; n; n = n.parentElement) alpha *= Number(getComputedStyle(n).opacity)
    const ink = parse(cs.color)
    const bg = backdrop(el)
    const fg = over({ ...ink, a: ink.a * alpha }, bg)
    const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a)
    const ratio = (hi + 0.05) / (lo + 0.05)
    const px = parseFloat(cs.fontSize)
    const large = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700)
    if (ratio < (large ? 3 : 4.5)) out.lowContrast.push(`${el.textContent.trim().slice(0, 24)} ${ratio.toFixed(2)}`)
  }
  for (const pic of document.querySelectorAll('[role="img"]')) {
    const label = pic.getAttribute('aria-label') || ''
    const leaves = [...pic.querySelectorAll('*')].filter((el) => el.children.length === 0 && el.textContent.trim().length > 2)
    const visibleText = leaves.filter(shown).map((el) => el.textContent.trim().toLowerCase())
    // Words that exist only in hidden elements; the same words shown elsewhere are fine.
    const hiddenWords = leaves
      .filter((el) => !shown(el))
      .map((el) => el.textContent.trim())
      .filter((w) => !visibleText.includes(w.toLowerCase()))
    out.labels.push({ label, namesHidden: hiddenWords.filter((w) => label.toLowerCase().includes(w.toLowerCase())) })
  }
  return out
}

const CASES = [
  {
    file: 'still-hero.html',
    args: {
      stageSel: '.fx',
      mustBeWhole: ['.fx-row[data-on] .fx-name', '.fx-row[data-on] .fx-pill', '.fx-title'],
      wordSel: '.fx-name, .fx-meta, .fx-pill, .fx-title, .fx-card-name, .fx-card-sub, .fx-card-total',
    },
  },
  {
    file: 'bento.html',
    args: {
      stageSel: '.bx-tile',
      mustBeWhole: ['.bx-event', '.bx-stat-num', '.bx-node', '.bx-toggle', '.bx-seg', '.bx-pass-time'],
      wordSel: '.bx-copy, .bx-event b, .bx-event em, .bx-stat-num, .bx-stat-label, .bx-node, .bx-panel-title, .bx-panel-sub, .bx-seg span, .bx-pass-time, .bx-pass-what, .bx-cal-head, .bx-day > span',
    },
  },
]

for (const { file, args } of CASES) {
  for (const width of WIDTHS) {
    test(`${file} at ${width}px`, { skip }, async () => {
      const m = await measure(file, width, `(${probe.toString()})(${JSON.stringify(args)})`)
      assert.ok(m.overflowX <= 0, `page scrolls sideways by ${m.overflowX}px`)
      assert.deepEqual(m.missing, [], 'the subject of the picture is hidden')
      assert.deepEqual(m.cutWhole, [], 'the subject of the picture is cut by its stage or tile')
      assert.deepEqual(m.cutWords, [], 'real words are cut by the stage or tile edge')
      assert.deepEqual(m.lowContrast, [], 'text below WCAG AA contrast (4.5:1, or 3:1 for large text)')
      assert.ok(m.labels.length > 0 && m.labels.every((l) => l.label.length > 10), 'every picture needs an accessible label')
      assert.deepEqual(m.labels.flatMap((l) => l.namesHidden), [], 'an accessible label names content this width hides')
    })
  }
}

test('the stat keeps its unit on the number\'s line', { skip }, async () => {
  for (const width of [358, 820, 1280]) {
    const lines = await measure('bento.html', width, `(() => { const n = document.querySelector('.bx-stat-num'); return n.getClientRects().length && Math.round(n.getBoundingClientRect().height / parseFloat(getComputedStyle(n).lineHeight)) })()`)
    assert.equal(lines, 1, `stat wraps at ${width}px`)
  }
})
