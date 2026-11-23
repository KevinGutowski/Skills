#!/usr/bin/env node
// Film a faux-UI scene: capture frames at a fixed interval and tile them into
// one contact sheet, so the whole loop can be read at a glance.
//
// Needs Node 18+ and either `playwright` (with a browser installed) or
// `playwright-core` plus a local Chrome (set CHROME_PATH). Reads only the page
// you point it at and writes only the --out file. Point it at local pages.
//
//   node contact-sheet.mjs page.html --loop 12000 --out shots/loop.png
//   node contact-sheet.mjs http://localhost:5173/ --select '#hero-demo' --loop 16000 --out shots/loop.png
//   node contact-sheet.mjs page.html --viewport 390x800 --select '.demo' --loop 12000 --out shots/phone.png
//   node contact-sheet.mjs page.html --start 2800 --every 50 --count 24 --out shots/drop.png
//   node contact-sheet.mjs page.html --still --scale 2 --out shots/still.png
//
// What is captured (the crop) and how wide the browser is (the viewport) are
// separate. The viewport decides which breakpoint the page lays out at; the
// crop only decides which pixels are kept.
//
// Crop:     --select <css>   the element to capture, whole, even when it is larger
//                            than the viewport (measured after --start), or
//           --x --y --width --height   a rectangle in CSS px (default 0 0 720 340,
//                            or as much of that as the viewport holds)
// Viewport: --viewport WxH   default 1280x800; never changed to suit the crop.
//           The default crop shrinks to fit it; a rectangle you ask for that
//           does not fit is an error (exit 1)
// Timing:   --loop <ms>      the loop's length; sets --count to cover one full
//                            loop plus a second past the seam
//           --every <ms>     between frames (default 500)
//           --count <n>      frames (default 24; ignored when --loop is given)
//           --start <ms>     wait after load before the first frame (default 0)
// Sheet:    --cols <n> (default 4), --thumb <scale of each frame> (default 0.5)
// Modes:    --still [--scale 2]   one frame only
//           --reduced             emulate prefers-reduced-motion: reduce
//           --dark                emulate prefers-color-scheme: dark
//
// Exit codes: 0 written; 1 bad arguments; 2 Playwright missing;
//             3 the page did not load (HTTP error, missing file, no element).

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { mkdirSync, existsSync } from 'node:fs'

const MAX_FRAMES = 240
const args = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args[i + 1]
}
const has = (name) => args.includes(`--${name}`)
const fail = (code, message) => {
  console.error(message)
  process.exit(code)
}
const num = (name, fallback) => {
  const v = Number(flag(name, fallback))
  if (!Number.isFinite(v)) fail(1, `--${name} must be a number`)
  return v
}

const target = args[0]
if (!target || target.startsWith('--')) {
  console.log('usage: node contact-sheet.mjs <url-or-file> --out <png> [--select <css> | --x --y --width --height] [--viewport WxH] [--loop <ms> | --count <n>] [--every <ms>] [--start <ms>] [--still] [--reduced] [--dark]')
  process.exit(has('help') ? 0 : 1)
}

const every = num('every', 500)
if (every <= 0) fail(1, '--every must be above 0')
const start = Math.max(0, num('start', 0))
const loop = has('loop') ? num('loop', 0) : null
if (loop !== null && loop <= 0) fail(1, '--loop must be above 0')
// One full loop, the seam, and a second of the next loop.
const wanted = loop !== null ? Math.ceil((loop + 1000) / every) + 1 : num('count', 24)
const count = Math.max(1, Math.min(MAX_FRAMES, Math.round(wanted)))
if (wanted > MAX_FRAMES) console.log(`note: ${Math.round(wanted)} frames requested, capped at ${MAX_FRAMES}; raise --every to cover the whole loop`)
const cols = Math.max(1, Math.round(num('cols', 4)))
const thumb = num('thumb', 0.5)
const selector = flag('select', null)
const out = resolve(flag('out', 'contact-sheet.png'))

const vp = /^(\d+)x(\d+)$/.exec(flag('viewport', '1280x800'))
if (!vp) fail(1, '--viewport must look like 1280x800')
// The viewport is never changed to suit the crop: it decides the breakpoint.
const viewport = { width: Number(vp[1]), height: Number(vp[2]) }
// With no rectangle given, the default 720 x 340 crop shrinks to fit the
// viewport. A rectangle the caller asked for must fit, or it is an error.
const rect = { x: num('x', 0), y: num('y', 0), width: 0, height: 0 }
rect.width = has('width') ? num('width', 0) : Math.min(720, viewport.width - rect.x)
rect.height = has('height') ? num('height', 0) : Math.min(340, viewport.height - rect.y)
if (!selector) {
  if (rect.width < 1 || rect.height < 1 || rect.x < 0 || rect.y < 0) fail(1, 'the crop rectangle is empty; check --x --y --width --height against --viewport')
  if (rect.x + rect.width > viewport.width || rect.y + rect.height > viewport.height) {
    fail(1, `the crop ${rect.width}x${rect.height} at ${rect.x},${rect.y} does not fit the ${viewport.width}x${viewport.height} viewport. Shrink the crop, use --select, or pass the --viewport the page ships at; the viewport is not widened for you because that changes the breakpoint.`)
  }
}

const isHttp = /^https?:\/\//.test(target)
if (!isHttp && !existsSync(resolve(target))) fail(3, `no such file: ${target}`)
const url = isHttp ? target : pathToFileURL(resolve(target)).href

// Resolve Playwright from the directory the command is run in first (the
// project's node_modules), then from beside this script.
let chromium
const fromCwd = createRequire(pathToFileURL(resolve(process.cwd(), 'noop.js')))
for (const name of ['playwright', 'playwright-core']) {
  if (chromium) break
  try {
    ;({ chromium } = fromCwd(name))
  } catch {
    try {
      ;({ chromium } = await import(name))
    } catch {}
  }
}
if (!chromium) fail(2, 'Playwright not found. In your project: npm i -D playwright && npx playwright install chromium (or playwright-core with a local Chrome and CHROME_PATH).')

const launch = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
const browser = await chromium.launch(launch)
let code = 0
try {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: has('still') ? num('scale', 2) : 1,
    reducedMotion: has('reduced') ? 'reduce' : 'no-preference',
    colorScheme: has('dark') ? 'dark' : 'light',
  })
  const page = await context.newPage()
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[page ${m.type()}] ${m.text()}`) })
  page.on('pageerror', (e) => console.log(`[page error] ${e.message}`))

  let response
  try {
    response = await page.goto(url, { waitUntil: 'load' })
  } catch (e) {
    throw Object.assign(new Error(`could not open ${url}: ${e.message.split('\n')[0]}`), { exit: 3 })
  }
  // file: URLs have no status; for http(s) anything outside 2xx is not the page.
  if (isHttp && response && !response.ok()) {
    throw Object.assign(new Error(`${url} answered HTTP ${response.status()}; nothing written`), { exit: 3 })
  }
  const t0 = Date.now()
  if (start > 0) await page.waitForTimeout(start)

  let clip = rect
  // A selected element is captured whole, in document coordinates, even when it
  // is taller or wider than the viewport. The viewport still decides the layout.
  let shot = { clip }
  if (selector) {
    const el = page.locator(selector).first()
    if ((await el.count()) === 0) throw Object.assign(new Error(`no element matches ${selector}; nothing written`), { exit: 3 })
    const box = await el.evaluate((node) => {
      const r = node.getBoundingClientRect()
      return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height }
    })
    if (box.width < 1 || box.height < 1) throw Object.assign(new Error(`${selector} has no size; nothing written`), { exit: 3 })
    clip = { x: Math.max(0, box.x), y: Math.max(0, box.y), width: box.width, height: box.height }
    shot = { clip, fullPage: true }
    if (box.x + box.width > viewport.width || box.y + box.height > viewport.height) {
      console.log(`note: ${selector} is ${Math.round(box.width)}x${Math.round(box.height)}, larger than the ${viewport.width}x${viewport.height} viewport; captured whole at this viewport's layout`)
    }
  }
  console.log(`viewport ${viewport.width}x${viewport.height}  crop ${Math.round(clip.width)}x${Math.round(clip.height)} at ${Math.round(clip.x)},${Math.round(clip.y)}`)

  mkdirSync(dirname(out), { recursive: true })
  if (has('still')) {
    await page.screenshot({ path: out, ...shot })
    console.log(`still: ${out}`)
  } else {
    const frames = []
    for (let i = 0; i < count; i++) {
      const due = start + i * every
      const now = Date.now() - t0
      if (due > now) await page.waitForTimeout(due - now)
      const at = Date.now() - t0
      const png = await page.screenshot(shot)
      frames.push({ at, data: png.toString('base64') })
    }
    const gaps = frames.slice(1).map((f, i) => f.at - frames[i].at)
    const late = gaps.filter((g) => g > every * 1.6).length
    const w = Math.round(clip.width * thumb)
    const h = Math.round(clip.height * thumb)
    const sheet = await context.newPage()
    await sheet.setViewportSize({ width: cols * (w + 8) + 16, height: h + 40 })
    const cells = frames
      .map((f) => `<figure><figcaption>${(f.at / 1000).toFixed(2)}s</figcaption><img width="${w}" height="${h}" src="data:image/png;base64,${f.data}"></figure>`)
      .join('')
    await sheet.setContent(`<style>body{margin:8px;background:#d9d9d9;font:11px/1.4 ui-monospace,monospace}main{display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px}figure{margin:0}img{display:block;background:#fff}</style><main>${cells}</main>`)
    await sheet.screenshot({ path: out, fullPage: true })
    const span = frames.at(-1).at - frames[0].at
    console.log(`sheet: ${out}  frames=${frames.length}  every=${every}ms  span=${(span / 1000).toFixed(1)}s`)
    if (loop === null) console.log('note: no --loop given, so this sheet may stop before the reset and the seam; pass the loop length in ms')
    else if (span < loop) console.log(`inconclusive: the sheet covers ${(span / 1000).toFixed(1)}s of a ${(loop / 1000).toFixed(1)}s loop; raise --every`)
    if (late) console.log(`inconclusive: ${late} gap(s) over ${Math.round(every * 1.6)}ms between frames; rerun with a larger --every or on a quieter machine`)
  }
} catch (e) {
  console.error(e.message)
  code = e.exit ?? 1
} finally {
  await browser.close()
}
process.exit(code)
