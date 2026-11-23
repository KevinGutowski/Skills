// Browser smoke test for contact-sheet.mjs. Run from a directory whose
// node_modules has Playwright and a browser:
//
//   node --test <skill>/scripts/contact-sheet.test.mjs
//
// Every case is skipped when Playwright cannot be loaded from the working
// directory, so the file is safe to run anywhere.

import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const script = join(dirname(fileURLToPath(import.meta.url)), 'contact-sheet.mjs')
const req = createRequire(pathToFileURL(resolve(process.cwd(), 'noop.js')))
let chromium = null
for (const name of ['playwright', 'playwright-core']) {
  try {
    chromium ??= req(name).chromium
  } catch {}
}
const skip = chromium ? false : 'Playwright not installed in the working directory'

const dir = mkdtempSync(join(tmpdir(), 'contact-sheet-'))
test.after(() => rmSync(dir, { recursive: true, force: true }))

// A centered 720 x 340 stage that changes color below a 1000px viewport, the
// way a page with a breakpoint would recompose.
const fixture = join(dir, 'centered.html')
writeFileSync(
  fixture,
  `<!doctype html><style>
  body{margin:0;background:#fff}
  #stage{width:720px;height:340px;margin:120px auto 0;background:rgb(0,128,0)}
  @media (max-width: 999px){#stage{background:rgb(200,0,0)}}
  </style><div id="stage"></div>`,
)

const run = (...a) => spawnSync(process.execPath, [script, ...a], { encoding: 'utf8', cwd: process.cwd() })

// Read the color of the center pixel of a PNG by loading it in the browser.
async function centerPixel(png) {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
  try {
    const page = await browser.newPage()
    const data = readFileSync(png).toString('base64')
    return await page.evaluate(async (src) => {
      const img = new Image()
      img.src = src
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const g = c.getContext('2d')
      g.drawImage(img, 0, 0)
      const [r, gr, b] = g.getImageData(img.width >> 1, img.height >> 1, 1, 1).data
      return { r, g: gr, b, width: img.width, height: img.height }
    }, `data:image/png;base64,${data}`)
  } finally {
    await browser.close()
  }
}

test('--select crops a centered stage without changing the breakpoint', { skip }, async () => {
  const out = join(dir, 'select.png')
  const r = run(fixture, '--select', '#stage', '--viewport', '1200x800', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /viewport 1200x800 {2}crop 720x340 at 240,120/)
  const px = await centerPixel(out)
  assert.deepEqual([px.width, px.height], [720, 340])
  assert.deepEqual([px.r, px.g, px.b], [0, 128, 0], 'wide-layout color: the breakpoint did not fire')
})

test('an offset rectangle keeps the default viewport', { skip }, async () => {
  const out = join(dir, 'rect.png')
  const r = run(fixture, '--viewport', '1200x800', '--x', '240', '--y', '120', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  const px = await centerPixel(out)
  assert.deepEqual([px.r, px.g, px.b], [0, 128, 0])
})

test('a narrow viewport is honored when asked for', { skip }, async () => {
  const out = join(dir, 'narrow.png')
  const r = run(fixture, '--viewport', '800x800', '--select', '#stage', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  const px = await centerPixel(out)
  assert.deepEqual([px.r, px.g, px.b], [200, 0, 0], 'narrow-layout color')
})

test('a phone viewport with no crop flags stays a phone viewport', { skip }, async () => {
  const out = join(dir, 'phone-default.png')
  const phone = join(dir, 'phone.html')
  writeFileSync(
    phone,
    `<!doctype html><style>body{margin:0;background:rgb(0,128,0)}
    @media (max-width: 999px){body{background:rgb(200,0,0)}}</style>`,
  )
  const r = run(phone, '--viewport', '390x800', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /viewport 390x800 {2}crop 390x340 at 0,0/)
  const px = await centerPixel(out)
  assert.deepEqual([px.width, px.height], [390, 340])
  assert.deepEqual([px.r, px.g, px.b], [200, 0, 0], 'narrow-layout color: the viewport was not widened')
})

test('an explicit rectangle wider than the viewport is refused', { skip }, () => {
  const out = join(dir, 'too-wide.png')
  const r = run(fixture, '--viewport', '390x800', '--width', '720', '--still', '--out', out)
  assert.equal(r.status, 1)
  assert.match(r.stderr, /does not fit the 390x800 viewport/)
  assert.equal(existsSync(out), false)
})

test('an HTTP 404 exits 3 and writes nothing', { skip }, async () => {
  const server = createServer((_, res) => {
    res.statusCode = 404
    res.end('<h1>Not found</h1>')
  })
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok))
  const out = join(dir, 'missing.png')
  try {
    const { port } = server.address()
    // spawnSync would block the server's event loop, so run it async.
    const { spawn } = await import('node:child_process')
    const result = await new Promise((ok) => {
      const child = spawn(process.execPath, [script, `http://127.0.0.1:${port}/nope`, '--still', '--out', out], { cwd: process.cwd() })
      let err = ''
      child.stderr.on('data', (d) => (err += d))
      child.on('close', (status) => ok({ status, err }))
    })
    assert.equal(result.status, 3)
    assert.match(result.err, /HTTP 404/)
    assert.equal(existsSync(out), false)
  } finally {
    server.close()
  }
})

test('a missing element exits 3 and writes nothing', { skip }, () => {
  const out = join(dir, 'noel.png')
  const r = run(fixture, '--select', '#absent', '--wait', '300', '--still', '--out', out)
  assert.equal(r.status, 3)
  assert.match(r.stderr, /no element matched #absent within 300ms/)
  assert.equal(existsSync(out), false)
})

test('a stage that mounts after load is waited for', { skip }, async () => {
  const late = join(dir, 'late.html')
  writeFileSync(
    late,
    `<!doctype html><style>body{margin:0}#late{width:200px;height:100px;background:rgb(0,128,0)}</style>
    <script>setTimeout(() => { const d = document.createElement('div'); d.id = 'late'; document.body.append(d) }, 600)</script>`,
  )
  const out = join(dir, 'late.png')
  const r = run(late, '--select', '#late', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  const px = await centerPixel(out)
  assert.deepEqual([px.width, px.height, px.r, px.g, px.b], [200, 100, 0, 128, 0])
})

test('an element that exists but never shows exits 3', { skip }, () => {
  const hidden = join(dir, 'hidden.html')
  writeFileSync(hidden, `<!doctype html><div id="h" style="display:none;width:10px;height:10px"></div>`)
  const out = join(dir, 'hidden.png')
  const r = run(hidden, '--select', '#h', '--wait', '300', '--still', '--out', out)
  assert.equal(r.status, 3)
  assert.match(r.stderr, /never became visible within 300ms/)
  assert.equal(existsSync(out), false)
})

// The argument contract. None of these reach a browser, so none is skipped.
const BAD = [
  [['--select'], /--select/],
  [['--select', '--still'], /--select/],
  [['--out'], /--out/],
  [['--viewport'], /--viewport/],
  [['--viewport', 'wide'], /--viewport must look like/],
  [['--selct', '#stage'], /Unknown option '--selct'/],
  [['--width', 'abc'], /--width must be a number/],
  [['--width', '0'], /--width must be above 0/],
  [['--every', '0'], /--every must be above 0/],
  [['--count', '0'], /--count must be at least 1/],
  [['--x=-5'], /--x must be at least 0/],
  [['--x', '-5'], /--x/],
  [['--loop', '2000', '--count', '5'], /--loop or --count, not both/],
  [['--select', '#stage', '--width', '300'], /two ways to say what to capture/],
  [['--wait', '100'], /--wait only applies with --select/],
  [['--scale', '2'], /--scale only applies with --still/],
]
for (const [flags, message] of BAD) {
  test(`bad arguments are refused: ${flags.join(' ')}`, () => {
    const out = join(dir, `bad-${flags.join('_').replace(/[^a-z0-9_-]/gi, '')}.png`)
    const extra = flags.includes('--out') ? [] : ['--out', out]
    const r = run(fixture, ...extra, ...flags)
    assert.equal(r.status, 1, `expected exit 1, got ${r.status}: ${r.stdout}${r.stderr}`)
    assert.match(r.stderr, message)
    assert.equal(existsSync(out), false, 'nothing may be written')
  })
}

// Every command shown in the skill's docs must be one the script accepts. The
// commands are read from the Markdown, so a doc edit that breaks one fails here.
const DOCS = [
  join(dirname(fileURLToPath(import.meta.url)), '..', 'references', 'rehearsal.md'),
  join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'evidence', 'faux-ui-evals-2026-11', 'README.md'),
]
const documented = []
for (const doc of DOCS) {
  if (!existsSync(doc)) continue
  const text = readFileSync(doc, 'utf8')
  for (const block of text.matchAll(/```sh\n([\s\S]*?)```/g)) {
    for (const line of block[1].split('\n')) {
      const m = /contact-sheet\.mjs"?\s+(.*)$/.exec(line) || /node "\$S"\s+(.*)$/.exec(line)
      if (m) documented.push({ doc, args: m[1].replace(/\s+#.*$/, '') })
    }
  }
}
test('the docs show commands to lint', () => {
  assert.ok(documented.length >= 8, `found only ${documented.length} documented commands`)
})
for (const { doc, args } of documented) {
  test(`documented command is accepted: ${args.slice(0, 70)}`, () => {
    // Split like a shell would for these simple lines: quoted strings stay whole.
    const parts = (args.match(/'[^']*'|"[^"]*"|\S+/g) || []).map((p) => p.replace(/^['"]|['"]$/g, ''))
    const r = spawnSync(process.execPath, [script, ...parts, '--dry-run'], { encoding: 'utf8' })
    assert.equal(r.status, 0, `${doc}\n${args}\n${r.stderr}`)
    assert.match(r.stdout, /^dry run: /)
  })
}

test('no page, or two pages, is refused', () => {
  assert.equal(run('--still').status, 1)
  assert.equal(run(fixture, fixture, '--still').status, 1)
})

test('--help prints usage and exits 0', () => {
  const r = run('--help')
  assert.equal(r.status, 0)
  assert.match(r.stdout, /usage: node contact-sheet\.mjs/)
})

test('a selection taller than the viewport is captured whole, undistorted', { skip }, async () => {
  // A 300 x 1700 column, red on top and blue below 800px, in a 390 x 800 viewport.
  const tall = join(dir, 'tall.html')
  writeFileSync(
    tall,
    `<!doctype html><style>body{margin:0}
    #col{width:300px;height:1700px;background:linear-gradient(rgb(200,0,0) 0 800px, rgb(0,0,200) 800px)}</style><div id="col"></div>`,
  )
  const out = join(dir, 'tall.png')
  const r = run(tall, '--select', '#col', '--viewport', '390x800', '--still', '--scale', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /crop 300x1700 at 0,0/)
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
  try {
    const page = await browser.newPage()
    const got = await page.evaluate(async (src) => {
      const img = new Image()
      img.src = src
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const g = c.getContext('2d')
      g.drawImage(img, 0, 0)
      const at = (y) => Array.from(g.getImageData(150, y, 1, 1).data.slice(0, 3))
      return { width: img.width, height: img.height, top: at(400), seamAbove: at(790), seamBelow: at(810), bottom: at(1650) }
    }, `data:image/png;base64,${readFileSync(out).toString('base64')}`)
    assert.deepEqual([got.width, got.height], [300, 1700])
    assert.deepEqual(got.top, [200, 0, 0])
    assert.deepEqual(got.seamAbove, [200, 0, 0], 'the color change must sit at 800px, not stretched')
    assert.deepEqual(got.seamBelow, [0, 0, 200])
    assert.deepEqual(got.bottom, [0, 0, 200], 'the part below the viewport must be in the picture')
  } finally {
    await browser.close()
  }
})

test('--loop covers a real loop past its seam', { skip }, async () => {
  // A 2s CSS loop: green for the first half, blue for the second. A sheet that
  // covers the loop and its seam shows green, then blue, then green again.
  const moving = join(dir, 'moving.html')
  writeFileSync(
    moving,
    `<!doctype html><style>body{margin:0}
    #s{width:200px;height:100px;animation:k 2s steps(1) infinite}
    @keyframes k{0%{background:rgb(0,128,0)}50%{background:rgb(0,0,200)}}</style><div id="s"></div>`,
  )
  const out = join(dir, 'moving.png')
  const r = run(moving, '--select', '#s', '--loop', '2000', '--cols', '7', '--thumb', '1', '--out', out)
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /frames=7 /)
  assert.doesNotMatch(r.stdout, /inconclusive|no --loop/)
  // Frames are 200px wide, 8px apart, after an 8px margin.
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
  let colors
  try {
    const page = await browser.newPage()
    colors = await page.evaluate(async (src) => {
      const img = new Image()
      img.src = src
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const g = c.getContext('2d')
      g.drawImage(img, 0, 0)
      return Array.from({ length: 7 }, (_, i) => {
        const [r, gr, b] = g.getImageData(8 + i * 208 + 100, img.height - 40, 1, 1).data
        return gr > b ? 'green' : b > r ? 'blue' : 'other'
      })
    }, `data:image/png;base64,${readFileSync(out).toString('base64')}`)
  } finally {
    await browser.close()
  }
  assert.equal(colors[0], 'green')
  assert.ok(colors.includes('blue'), `second half of the loop missing: ${colors}`)
  assert.ok(colors.slice(colors.indexOf('blue') + 1).includes('green'), `the sheet stops before the seam: ${colors}`)
})

test('without --loop the sheet says it may miss the seam', { skip }, () => {
  const r = run(fixture, '--count', '2', '--every', '100', '--out', join(dir, 'short.png'))
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /no --loop given/)
})
