# Gridlines source mining — 2026-11

Source: https://github.com/pritamux/gridlines (Pritam Paul). License: MIT. Revision: `20d0944c8eec66957c1bde9c9919345ab4c6b4eb` (2026-11-21). Cloned and read on 2026-11-22.

Ticket: "Fold in this into the repo https://github.com/pritamux/gridlines".

*gridlines* is one agent skill for alignment passes. It draws vertical guide lines down an interface, finds every item that misses its line, and fixes container padding so sidebars, toolbars, panels, menus and tables share a small set of edges. It is made of a SKILL.md (about 170 lines), an in-page probe (`probe.js`, 221 lines), a headless runner (`audit.mjs`, 64 lines) and a sample sidebar with four planted misses. The prose was paraphrased, not copied. The scripts and the example were vendored, with attribution and the MIT license.

## Manifest and coverage

| Source | How fetched | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| `README.md` | git clone | Yes | Medium | Install, the "What's inside" table, the example report, and credits (Karri Saarinen's Linear sidebar redraw and Apple's HIG layout chapter). The example report omits the `box -` field that `audit.mjs` prints; ours shows the real output. |
| `skills/gridlines/SKILL.md` | git clone | Yes | **High** | Process (draw → read → decide → fix → re-draw → record), the text-line/box-line rule, sidebar, toolbar, panel and frame rules, optical edge corrections, shapes, what never changes, mistakes, checklist. All paraphrased into `design-craft/references/alignment-pass.md`. |
| `skills/gridlines/probe.js` | git clone | Yes, line by line | **High** | Reviewed before vendoring. It only reads the DOM and computed styles and appends `data-gridline` guide `div`s. No network access or storage. Vendored unchanged except for a provenance header. |
| `skills/gridlines/audit.mjs` | git clone | Yes, line by line | High | Playwright runner that writes a PNG and JSON to the output folder. Reviewed and vendored on the same terms. |
| `examples/sidebar.html` | git clone | Yes | Medium | Vendored as `design-craft/examples/gridlines-sidebar.html`, with the run command updated to the new path. |
| `LICENSE` | git clone | Yes | n/a | MIT. Copied beside the scripts. |
| `media/before-after.mp4`, `media/*.png` | git clone | No | n/a | Promotional images; the README text and SKILL.md carry the same rules. Not read. |
| Karri Saarinen's Linear sidebar redraw | Web search, 2026-11-22 | Not found | n/a | Only the source's summary is available. The Linear redesign post ("How we redesigned the Linear UI", already in `design-craft` sources) confirms the sidebar, tabs, headers and panels were adjusted for visual alignment, but gives no rules. The Saarinen-specific rules are recorded as single-source. |

## Probe run (2026-11-22)

Playwright 1.x with Chromium headless shell, Linux (needed `playwright install-deps`).

- The vendored example reproduces the source's four misses (trailing 15 vs 12, leading 15 vs 12, label 38 vs 36, vertical-centre 3px).
- Test page (scratch, not committed) with a correctly nested sidebar: each one-column-indented child row was reported as an `icon-column` miss (44 vs 20) and a `label` miss (60 vs 36). **False positive**, documented.
- Same page with a `section` holding a 16px text line, a button whose box sits correctly on the 8px box line, and a button whose box sits on the 16px text line: the probe found box line 8 and reported no miss for the wrong button. Its leading check accepts any line. **False negative**, documented.

Both are listed under "What the probe gets wrong" in the reference and in `design-craft` coverage-gaps. The vendored script was not patched. Keeping it unchanged lets it be re-synced with the source; fixes belong upstream or in a local test first.

## Fold map

**Decision: a new reference in `design-craft`, no new top-level skill.** An alignment pass is a topic inside interface polish. `design-craft` already holds the "misaligned edges" symptom, optical alignment and its own measurement script (`scripts/optical-nudge.mjs`). The taxonomy rule says topics live as references, and the source is a single method.

- **`design-craft`**
  - NEW `references/alignment-pass.md`: scope and boundaries, the pass, rules, the probe and its limits, mistakes, checklist.
  - NEW `scripts/gridlines/` (`probe.js`, `audit.mjs`, `LICENSE`) and `examples/gridlines-sidebar.html`.
  - NEW `scripts/gridlines.test.mjs` (added after QA, see below).
  - SKILL.md: the plain-request router sends "misaligned edges" to alignment-pass, there is a new execution-table row, and the description gained the trigger "edges don't line up". To stay within the 450-char cap, "craft methodology (…, live tuning)" became "craft method (…)". The body was trimmed to stay under the 5k-token budget (4,994).
  - Pointers from `polish-principles.md` (a common-mistakes row, a checklist item, the reference list), `surfaces.md` (Optical Alignment see-also), `component-details.md` (menu icon column), `practical-demonstrations.md` (implicit vertical rules) and `linear-product-craft.md` (align what users feel).
  - `sources.md`, `coverage-gaps.md`.
- **`interface-review`**: the `design-craft` coordination item names alignment-pass for ragged edges.
- **README**: the `design-craft` row mentions alignment-pass.
- **Routing**: new fixture `docs/gridlines-routing-probes-2026-11.md` (G1–G10), registered in `scripts/check_routing_probe_fixtures.py`.

## Conflicts and reconciliations

| Topic | Gridlines | Existing | Resolution |
| --- | --- | --- | --- |
| Number of left edges | Two or three named lines per container (text, box, icon column) | Puckett: more than about two implicit vertical rules on a page reads as disorder (`practical-demonstrations`) | Scoped. Puckett counts content edges on a page; the box line nests inside the text line within one container. Both files say so. |
| Play triangle offset | "About 1px toward the point" | 2px at ~24px, measured 0.75px at 14px (`surfaces`, `polish-principles` §2) | The edge reference defers to the measured nudge and treats the source's 1px as a 16–24px figure. |
| Round shapes | Overhang the line by about 1px | `design-systems` icon-systems: circles drawn larger than squares | Same idea at a different stage: drawing versus placement. Cross-referenced. |
| Menu icons | One icon column, or centre icons of different widths | `component-details`: every item gets an icon or none does | Compatible; cross-referenced. |

## Not folded

- Install commands for `npx skills add`: not relevant to this library.
- The README media.

## Routing results

The judge was a fresh agent given only the packet from `python3 scripts/check_routing_probe_fixtures.py --packet`, covering all four registered fixtures (83 probes). It was run twice on 2026-11-22:

1. With the first draft of the description, which still had "live tuning" in it and ran 467 chars, over the 450 cap.
2. With the final description. To get under the cap, "methodology" became "method" and "live tuning" was cut from the parenthetical. The body still covers live tuning.

Both runs gave the same result. G1–G4 went to `design-craft`. G5 went to `interface-review`, with `user-onboarding` second. G6 went to `data-viz`, so "gridlines" did not pull chart work into `design-craft`. G7 went to `web-design`, G8 to `uikit`, G9 to `design-systems` and G10 to `rails`. All earlier W, B and X probes kept their expected first skill; W18 and B33 were "none", as their notes allow. No regressions.

## QA pass (2026-11-22)

QA raised two findings. Both came from one problem: the reference made claims about the probe that nothing checked.

- **"Measures ink" was wrong.** `probe.js` uses DOM `Range` rects for text and element boxes for icons (`getBoundingClientRect`). QA showed a shape moved 4px inside its SVG goes undetected. Three places repeated the source's "ink" wording, and all are fixed:
  - the "Running the probe" section, which now says it measures layout boxes and lists exactly what;
  - the 1px pass rule, which said the 1px was for glyph side bearings: side bearings are inside the measured box, so the 1px only absorbs rounding;
  - the "measuring boxes instead of ink" mistake bullet.

  The viewBox-padding rule now says the probe can't see the problem. The Re-draw step and the checklist now name what to check in the capture. The vendored `probe.js` header notes that upstream's "ink edges" means layout boxes.
- **No retained browser test.** New `design-craft/scripts/gridlines.test.mjs`, following the `optical-nudge.test.mjs` precedent. It had 10 cases at first (12 after the second QA pass):
  - the example's four misses and its lines;
  - zero misses once the example is corrected;
  - each documented limit pinned with its current output (nested rows, box on the text line, a shape moved inside its SVG, a text box versus its ink);
  - guides drawn once per call and none with `draw: false`;
  - a custom `containers` selector;
  - the CLI writing a PNG and JSON and printing four misses.

  All passed. A limit case that starts failing after an upstream re-sync means the docs need updating.

The vendored probe was still not patched, for the same reason as before.

## Second QA pass (2026-11-22)

QA raised two findings. Both were the same kind of problem as the first pass: the docs and the test assumed an environment that the vendored runner doesn't support.

- **Setup mismatch.** The test's header advertised `playwright-core` and resolved it relative to the test file. `audit.mjs` only loads `playwright`, from `PW_DIR` or the current directory, so a core-only setup failed the CLI case with `MODULE_NOT_FOUND`. Fixed:
  - the test now finds `playwright` exactly as `audit.mjs` does and passes the same folder to the CLI;
  - without it, the test fails with a clear message instead of a stack trace;
  - the reference states the one setup both share, and its command block now includes the test command.
- **Strict CSP.** `audit.mjs` injects the probe as an inline script (`addScriptTag`), so with `script-src 'self'` it exits 1 before writing anything (reproduced). This is documented as a limit. The workaround is to evaluate the probe's source, through the live-browser route or your own Playwright script, which works under the same CSP. The test pins both the failure and the workaround, so it now has 12 cases, and 12/12 pass.
- **Third QA pass (same day):** QA found that a narrower icon centred in a mixed-width column, which the sidebar rule recommends, is reported as `leading 15 vs 12`. Reproduced and documented under "What the probe gets wrong" with when to ignore it, and pinned as a test case. 13/13 pass. The vendored probe is unchanged.
- **Not done:** patching `audit.mjs` (for example with `bypassCSP`). The vendored files stay unchanged so they can be re-synced. The fix belongs upstream, and the pinned CSP case will flag when it lands. The browser test is also still not in CI; see the first QA pass.
