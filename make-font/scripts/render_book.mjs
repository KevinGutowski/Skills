#!/usr/bin/env node
// render_book.mjs: print the font book that font_book.py wrote, as page PNGs and one PDF. Node 18+ and Playwright.
//
//   node render_book.mjs <book-dir> [--pages 1,3] [--no-pdf] [--root <dir with node_modules/playwright>]
//
// Writes <book-dir>/pages/NN-slug.png (2x) and <book-dir>/fontbook.pdf (1600 x 1000 px pages).
// Before printing it checks two things and exits 1 if either fails:
//   - fallback: every element set in the book face renders only with the book's own fonts, never a system font
//     standing in for a missing glyph (read through the DevTools protocol, per element);
//   - overflow: nothing runs past a page's margins.
// Playwright comes from --root, the current folder or the global install. PW_CHROMIUM may point at any Chrome or Chromium.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) {
  console.log("usage: node render_book.mjs <book-dir> [--pages 1,3] [--no-pdf] [--root <dir>]");
  process.exit(args.length ? 0 : 2);
}
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const dir = resolve(args[0]);
const only = opt("--pages");
const book = JSON.parse(readFileSync(join(dir, "pages.json"), "utf8"));

async function launch() {
  // Local change (KevinGutowski/Skills): upstream first imported find-chromium.mjs from a sibling
  // build-design-system skill. That skill is not part of this library, and loading code from a neighbouring
  // folder by name is not something this copy does.
  const places = [opt("--root"), process.cwd()].filter(Boolean);
  try { places.push(dirname(execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim())); } catch {}
  for (const p of places) {
    for (const name of ["playwright", "playwright-core"]) {
      let pw;
      try { pw = createRequire(join(p, "noop.js"))(name); } catch { continue; }
      try {
        const exe = process.env.PW_CHROMIUM;
        return await pw.chromium.launch(exe ? { executablePath: exe } : {});
      } catch (e) {
        // Local change: Playwright was found and the browser did not start. Upstream said "no Playwright found".
        console.error(`found ${name} in ${p}, but Chromium did not start: ${String(e.message).split("\n")[0]}`);
        console.error("Run `npx playwright install chromium` (and on Linux `npx playwright install-deps chromium`), or set PW_CHROMIUM.");
        process.exit(2);
      }
    }
  }
  console.error("no Playwright found. Run `npm i -D playwright && npx playwright install chromium`, or pass --root.");
  process.exit(2);
}

const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const failed = [];
page.on("requestfailed", (r) => failed.push(r.url()));
await page.goto(pathToFileURL(join(dir, "index.html")).href);
await page.evaluate(async () => {
  await Promise.all([...document.fonts].map((f) => f.load().catch(() => null)));
  await document.fonts.ready;
});
const faces = await page.evaluate(() => [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.status}`));
console.log("fonts:", faces.join(", "));
let bad = 0;
if (failed.length) { console.log("failed requests:", failed); bad++; }

// fallback check
const cdp = await ctx.newCDPSession(page);
await cdp.send("DOM.enable");
await cdp.send("CSS.enable");
const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "section *:not(.g):not(.g *)" });
const fallbacks = [];
for (const id of nodeIds) {
  const { computedStyle } = await cdp.send("CSS.getComputedStyleForNode", { nodeId: id });
  const fam = computedStyle.find((p) => p.name === "font-family")?.value || "";
  if (!fam.includes(`${book.family} Book`)) continue;
  const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId: id });
  for (const f of fonts) {
    if (!f.isCustomFont) {
      const { outerHTML } = await cdp.send("DOM.getOuterHTML", { nodeId: id });
      fallbacks.push(`${f.familyName} x${f.glyphCount}: ${outerHTML.slice(0, 120)}`);
    }
  }
}
console.log(`fallback glyphs: ${fallbacks.length}`);
fallbacks.slice(0, 20).forEach((f) => console.log("  ", f));
if (fallbacks.length) bad++;

// overflow check
// Local change (KevinGutowski/Skills): upstream compared element boxes with the page margins. A box keeps its own
// width when its text is too long for it, so a word wider than its column overlapped the next column, or left the
// page, and still counted as no overflow. The check now also measures the text itself, against the page margins
// and against the block that holds it.
const over = await page.evaluate(() => {
  const out = [];
  const name = (el) => `${el.tagName.toLowerCase()}.${el.className?.baseVal ?? el.className}`;
  for (const sec of document.querySelectorAll("section.page")) {
    const r = sec.getBoundingClientRect();
    const outside = (b) => b.right > r.right - 40 || b.bottom > r.bottom - 24 || b.left < r.left + 40 || b.top < r.top;
    for (const el of sec.querySelectorAll("*")) {
      if (el.closest(".g")) continue;
      const b = el.getBoundingClientRect();
      if (!b.width) continue;
      if (outside(b))
        out.push(`${sec.id} ${name(el)} right ${Math.round(b.right - r.left)} bottom ${Math.round(b.bottom - r.top)}`);
      // The text, against the page margins and against the block that holds it.
      let block = el;
      let clips = false;
      while (block && block !== sec) {
        if (getComputedStyle(block).overflowX !== "visible") clips = true;
        if (block.clientWidth) break;  // an inline element has no client box: its block ancestor does
        block = block.parentElement;
      }
      if (clips || !block) continue;
      const box = block.getBoundingClientRect();
      for (const node of el.childNodes) {
        if (node.nodeType !== 3 || !node.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const t = range.getBoundingClientRect();
        if (!t.width) continue;
        if (outside(t))
          out.push(`${sec.id} ${name(el)} text right ${Math.round(t.right - r.left)} bottom ${Math.round(t.bottom - r.top)}`);
        else if (t.right > box.right + 1 || t.left < box.left - 1)
          out.push(`${sec.id} ${name(el)} text ${Math.round(t.width)}px wide in a ${Math.round(box.width)}px box`);
      }
    }
  }
  return out;
});
console.log(`overflow: ${over.length}`);
over.slice(0, 30).forEach((o) => console.log("  ", o));
if (over.length) bad++;

mkdirSync(join(dir, "pages"), { recursive: true });
for (const [n, slug] of book.pages) {
  if (only && !only.split(",").includes(String(n))) continue;
  const el = await page.$(`#p${String(n).padStart(2, "0")}`);
  await el.screenshot({ path: join(dir, "pages", `${String(n).padStart(2, "0")}-${slug}.png`) });
}
if (!only && !args.includes("--no-pdf")) {
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: join(dir, "fontbook.pdf"), width: "1600px", height: "1000px", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", join(dir, "fontbook.pdf"));
}
console.log(`wrote ${book.pages.length} page images to ${join(dir, "pages")}`);
await browser.close();
process.exit(bad ? 1 : 0);
