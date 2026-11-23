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
//                            than the viewport. The first visible match is used.
//                            Waits up to --wait ms (default 5000; 0 = check once,
//                            no waiting) for one to be visible. Or:
//           --x --y --width --height   a rectangle in CSS px (default 0 0 720 340,
//                            or as much of that as the viewport holds)
// Viewport: --viewport WxH   default 1280x800; never changed to suit the crop.
//           The default crop shrinks to fit it; a rectangle you ask for that
//           does not fit is an error (exit 1)
// Timing:   --loop <ms>      the loop's length; sets --count to cover one full
//                            loop plus a second past the seam
//           --every <ms>     between frames (default 500)
//           --count <n>      frames (default 24; ignored when --loop is given)
//           --start <ms>     wait before the first frame (default 0), counted from
//                            when the page has loaded and any --select target is
//                            visible; frame labels count from the first frame
// Sheet:    --cols <n> (default 4), --thumb <scale of each frame> (default 0.5)
// Modes:    --still [--scale 2]   one frame only
//           --reduced             emulate prefers-reduced-motion: reduce
//           --dark                emulate prefers-color-scheme: dark
//           --dry-run             check the arguments, print what would be captured, exit
//
// Arguments are strict: an unknown flag, a flag with no value, or a value of
// the wrong kind stops the run before a browser starts.
//
// Exit codes: 0 written; 1 bad arguments; 2 Playwright missing;
//             3 the page did not load (HTTP error, missing file, no element).

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { mkdirSync, existsSync } from 'node:fs'
import { parseArgs } from 'node:util'

const MAX_FRAMES = 240
const USAGE = 'usage: node contact-sheet.mjs <url-or-file> --out <png> [--select <css> [--wait <ms>] | --x --y --width --height] [--viewport WxH] [--loop <ms> | --count <n>] [--every <ms>] [--start <ms>] [--cols <n>] [--thumb <scale>] [--still [--scale <n>]] [--reduced] [--dark] [--dry-run]'
const fail = (code, message) => {
  console.error(message)
  process.exit(code)
}

// Every flag is declared here. Unknown flags, a flag given without its value,
// and a value that is not what the flag takes are all refused before a browser
// starts, so a typo cannot quietly produce a picture of the wrong thing.
const NUMERIC = {
  // name: [default, minimum, whether the minimum itself is allowed]
  x: [0, 0, true],
  y: [0, 0, true],
  width: [null, 0, false],
  height: [null, 0, false],
  every: [500, 0, false],
  count: [24, 1, true],
  start: [0, 0, true],
  loop: [null, 0, false],
  wait: [5000, 0, true],
  cols: [4, 1, true],
  thumb: [0.5, 0, false],
  scale: [2, 0, false],
}
const STRINGS = ['out', 'select', 'viewport']
const BOOLEANS = ['still', 'reduced', 'dark', 'help', 'dry-run']
let parsed
try {
  parsed = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    strict: true,
    options: Object.fromEntries([
      ...[...Object.keys(NUMERIC), ...STRINGS].map((n) => [n, { type: 'string' }]),
      ...BOOLEANS.map((n) => [n, { type: 'boolean' }]),
    ]),
  })
} catch (e) {
  fail(1, `${e.message}\n${USAGE}`)
}
const { values, positionals } = parsed
if (values.help) {
  console.log(USAGE)
  process.exit(0)
}
if (positionals.length !== 1) fail(1, `expected one page (a URL or a file), got ${positionals.length}\n${USAGE}`)
const target = positionals[0]
const has = (name) => values[name] !== undefined
for (const name of STRINGS) {
  // parseArgs takes the next token as the value, so `--select --still` would
  // make "--still" the selector. A value that looks like a flag is a mistake.
  if (has(name) && (values[name] === '' || values[name].startsWith('--'))) fail(1, `--${name} needs a value\n${USAGE}`)
}
const num = (name) => {
  const [fallback, min, inclusive] = NUMERIC[name]
  if (!has(name)) return fallback
  const v = Number(values[name])
  if (values[name].trim() === '' || !Number.isFinite(v)) fail(1, `--${name} must be a number, got "${values[name]}"`)
  if (inclusive ? v < min : v <= min) fail(1, `--${name} must be ${inclusive ? 'at least' : 'above'} ${min}, got ${v}`)
  return v
}

const every = num('every')
const start = num('start')
const loop = num('loop')
const wait = num('wait')
if (has('loop') && has('count')) fail(1, 'give --loop or --count, not both')
// One full loop, the seam, and a second of the next loop.
const wanted = loop !== null ? Math.ceil((loop + 1000) / every) + 1 : num('count')
const count = Math.max(1, Math.min(MAX_FRAMES, Math.round(wanted)))
if (wanted > MAX_FRAMES) console.log(`note: ${Math.round(wanted)} frames requested, capped at ${MAX_FRAMES}; raise --every to cover the whole loop`)
const cols = Math.round(num('cols'))
const thumb = num('thumb')
const scale = num('scale')
const selector = values.select ?? null
const out = resolve(values.out ?? 'contact-sheet.png')

const vp = /^(\d+)x(\d+)$/.exec(values.viewport ?? '1280x800')
if (!vp || Number(vp[1]) < 1 || Number(vp[2]) < 1) fail(1, '--viewport must look like 1280x800')
// The viewport is never changed to suit the crop: it decides the breakpoint.
const viewport = { width: Number(vp[1]), height: Number(vp[2]) }
const rectFlags = ['x', 'y', 'width', 'height'].filter(has)
if (selector && rectFlags.length) fail(1, `--select and a rectangle (--${rectFlags.join(', --')}) are two ways to say what to capture; give one`)
if (has('wait') && !selector) fail(1, '--wait only applies with --select')
if (has('scale') && !values.still) fail(1, '--scale only applies with --still')
// With no rectangle given, the default 720 x 340 crop shrinks to fit the
// viewport. A rectangle the caller asked for must fit, or it is an error.
const rect = { x: num('x'), y: num('y'), width: 0, height: 0 }
rect.width = num('width') ?? Math.min(720, viewport.width - rect.x)
rect.height = num('height') ?? Math.min(340, viewport.height - rect.y)
if (!selector) {
  if (rect.width < 1 || rect.height < 1) fail(1, 'the crop rectangle is empty; check --x --y --width --height against --viewport')
  if (rect.x + rect.width > viewport.width || rect.y + rect.height > viewport.height) {
    fail(1, `the crop ${rect.width}x${rect.height} at ${rect.x},${rect.y} does not fit the ${viewport.width}x${viewport.height} viewport. Shrink the crop, use --select, or pass the --viewport the page ships at; the viewport is not widened for you because that changes the breakpoint.`)
  }
}

// --dry-run stops here: the arguments are valid and this is what would be captured.
if (values['dry-run']) {
  console.log(`dry run: ${target}  viewport ${viewport.width}x${viewport.height}  ${selector ? `select ${selector} (wait ${wait}ms)` : `crop ${rect.width}x${rect.height} at ${rect.x},${rect.y}`}  ${values.still ? `still at ${scale}x` : `${count} frames every ${every}ms from ${start}ms`}  -> ${out}`)
  process.exit(0)
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
    deviceScaleFactor: values.still ? scale : 1,
    reducedMotion: values.reduced ? 'reduce' : 'no-preference',
    colorScheme: values.dark ? 'dark' : 'light',
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
  const loaded = Date.now()

  let clip = rect
  // A selected element is captured whole, in document coordinates, even when it
  // is taller or wider than the viewport. The viewport still decides the layout.
  let shot = { clip }
  let el = null
  if (selector) {
    // A stage that mounts after load (a hydrated app, a lazy route) is still the
    // stage: wait for it to exist and be visible, up to --wait, before giving up.
    // "The element" is the first *visible* match: a page that keeps a hidden
    // desktop twin before the visible phone one still has one stage on screen.
    const matches = page.locator(selector)
    el = matches.locator('visible=true').first()
    try {
      if (wait === 0) {
        // --wait 0 means "check now", not "wait forever".
        if (!(await el.count())) throw new Error('not visible now')
      } else {
        await el.waitFor({ state: 'visible', timeout: wait })
      }
    } catch (e) {
      const seen = await matches.count().catch(() => 0)
      const when = wait === 0 ? 'at load' : `within ${wait}ms`
      const why = /is not a valid selector|Unexpected token|SyntaxError/i.test(e.message)
        ? `${selector} is not a valid selector`
        : seen
          ? `${selector} matched ${seen} element(s), none visible ${when}`
          : `no element matched ${selector} ${when}`
      throw Object.assign(new Error(`${why}; nothing written`), { exit: 3 })
    }
  }

  // The capture clock starts here: after the page loaded and the selected stage
  // was visible. --start and every frame time are measured from this moment, so
  // time spent waiting for a late stage is never taken out of the sheet.
  const ready = Date.now()
  if (start > 0) await page.waitForTimeout(start)
  const t0 = Date.now()
  if (ready - loaded > 250) console.log(`note: the stage was ready ${((ready - loaded) / 1000).toFixed(1)}s after load; frame times count from then${start ? ` plus the ${start}ms --start` : ''}`)
  if (selector) {
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
  if (values.still) {
    await page.screenshot({ path: out, ...shot })
    console.log(`still: ${out}`)
  } else {
    const frames = []
    for (let i = 0; i < count; i++) {
      const due = i * every
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
