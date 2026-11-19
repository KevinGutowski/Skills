# Guidance, Then Verify

*Scope: look up Chrome's Modern Web Guidance for a UI task, apply it, and prove the result in a real browser. Also the check recipes for verifying any UI fix (layout shift, reduced motion, color scheme, dialog focus and inertness, overflow at narrow width, keyboard order and focus ring, pointer target size, accessibility scan, console). Commands re-run on agent-browser 0.43.0 and modern-web-guidance 1.0.1, 2026-11-18.*

## Contents

- [Two tools, two jobs](#two-tools-two-jobs)
- [Get the guidance](#get-the-guidance)
- [Workflow](#workflow)
- [Check: layout shift](#check-layout-shift)
- [Check: reduced motion](#check-reduced-motion)
- [Check: color scheme](#check-color-scheme)
- [Check: dialog focus and inertness](#check-dialog-focus-and-inertness)
- [Check: overflow at narrow width](#check-overflow-at-narrow-width)
- [Check: keyboard order and focus ring](#check-keyboard-order-and-focus-ring)
- [Check: pointer target size](#check-pointer-target-size)
- [Supporting checks](#supporting-checks)
- [When no check exists](#when-no-check-exists)
- [Report and cleanup](#report-and-cleanup)
- [Look it up](#look-it-up)

## Two tools, two jobs

| Tool | What it can do | What it cannot do |
| --- | --- | --- |
| `npx modern-web-guidance@latest` (Chrome) | Return current guides for a UI task, with Baseline browser-support data; statically scan source for legacy patterns | Load or run the page. It cannot tell you the result works |
| `agent-browser` (Vercel Labs) | Load the built page in Chrome, emulate user preferences, read computed styles, the accessibility tree, focus, and Web Vitals | Tell you what the code should have been |

Use the first to decide what to write and the second to check what was built. The work is finished when every rule you applied has a browser check with recorded evidence, or is marked unverified with the reason.

## Get the guidance

`npx` runs the CLI without installing anything. It is a third-party package downloaded at run time: run it when the user asked for Modern Web Guidance or approved it, the same bar `interface-review` sets for scanners.

```bash
npx modern-web-guidance@latest search "animate a dialog"     # JSON list of {id, description}
npx modern-web-guidance@latest retrieve "dialog"
npx modern-web-guidance@latest retrieve "dialog,animate-to-from-top-layer"
npx modern-web-guidance@latest list                          # 209 guides in 1.0.1
npx modern-web-guidance@latest legacy-scan ./src --json      # static; reads files only
npx modern-web-guidance@latest legacy-scan ./src --guide dialog
```

Traps:

- **Long guides are written to a temp file.** When a guide is larger than about 9.5 KB and output is a terminal, the CLI prints only a path (`Output (12.1 KB, 220 lines) saved to …`). Read the whole file before writing code, or redirect to a path you choose (`retrieve "dialog" > dialog.md`).
- **A clean `legacy-scan` proves little.** The scan has rules for only part of the catalog (upstream counted 33 guides at 1.0.0). No findings does not mean the code follows every guide.
- **The catalog is broader than the checks below.** It includes accessibility, CSS layout, performance, fonts, and on-device AI APIs. Search by task; do not assume a guide exists or is absent.
- **`install` is optional and interactive.** The package can install its own agent skill; this workflow needs only `search` and `retrieve`. `set-allow-origin-trials` and `set-allow-volatile-features` opt in to experimental guidance: leave them off unless the user wants pre-Baseline features.
- **Write code from the guide; do not paste the guide into the project.** Cite the guide ID in the report so a reviewer can retrieve the same text.
- **Baseline is a support claim to check against the project.** A guide may use features the project's supported browsers lack. Read the guide's Baseline note and the project's browser targets before adopting it, and keep the fallback the guide gives.

## Workflow

1. **Retrieve.** Search, then retrieve the guides that match the task. List each rule you intend to apply with its guide ID.
2. **Baseline.** If the UI already exists, run the matching check below before editing and keep the output.
3. **Apply.** Implement in the project's code and conventions. Where the guide and a local rule differ (for example motion values owned by `web-design` (web-animation-design)), note the difference and follow the project.
4. **Verify.** Serve the built page with the project's own dev or preview server and run the check for every rule.
5. **Report.** One row per rule: guide, rule, check, result, evidence.

Examples below use `http://localhost:3000` and omit `--session <name>`; add your session to every command (see driving-the-browser).

## Check: layout shift

For guides that reserve space for images, embeds, fonts, or late content (for example `performance`, `visually-stable-font-fallbacks`).

One reading is four steps in one fresh session: cold open, wait until the content under test has arrived, score, close.

```bash
S="$(agent-browser session id --scope worktree --prefix cls)-before"   # use ...-after for the second reading
if agent-browser --session "$S" --args "--disk-cache-size=1" open http://localhost:3000/products \
   && agent-browser --session "$S" wait --fn "document.querySelectorAll('[data-review]').length > 0" \
   && agent-browser --session "$S" wait 1000; then
  cat <<'JS' | agent-browser --session "$S" eval --stdin
(() => {
  const o = new PerformanceObserver(() => {});
  o.observe({type: 'layout-shift', buffered: true});
  const entries = o.takeRecords().filter(e => !e.hadRecentInput); o.disconnect();
  let cls = 0, cur = 0, first = 0, prev = 0;
  for (const e of entries) {
    if (!(cur > 0 && e.startTime - prev < 1000 && e.startTime - first < 5000)) { cur = 0; first = e.startTime; }
    cur += e.value; prev = e.startTime; cls = Math.max(cls, cur);
  }
  return {cls, good: cls <= 0.1, scoredAtMs: Math.round(performance.now()), shifts: entries.map(e => ({
    at: Math.round(e.startTime), value: e.value,
    moved: e.sources.map(s => s.node ? s.node.nodeName.toLowerCase() + (s.node.id ? '#' + s.node.id : '') : null)}))};
})()
JS
  rc=$?
else
  echo "UNVERIFIED: the page or the content under test did not load; no CLS reading taken"; rc=1
fi
agent-browser --session "$S" close; exit $rc
# { "cls": 0.0163, "good": true, "scoredAtMs": 1700, "shifts": [ { "at": 641, "moved": ["p", "button#delete-account"], "value": 0.0163 } ] }
```

**Pass:** `good` is true *and* `cls` is lower than the baseline's. The script returns immediately; a stable page gives `cls: 0` and an empty `shifts`.

What each part is for, because each one has produced a wrong verdict:

- **No reading without the content.** A failed `open` or a timed-out `wait` must stop the reading. Run as separate commands, the scorer still runs on whatever is there and returns a clean `cls: 0`, and the closing command exits 0: a broken page looks like a fixed one. Keep the `if … && …; then` shape (or check each exit code yourself) and report the reading as unverified. Checked here: with the wait text missing, the block printed UNVERIFIED and exited 1.
- **Wait for the content, then score.** The script reads the shifts recorded so far, so the wait condition decides the result. It must be true only once the late content has rendered: a count of the rendered items, text that comes from the data, an app-ready flag. A heading, skeleton or container that is in the initial HTML is true at once: on a page here with a static "Reviews" heading and reviews arriving at 2.5 s, `wait --text "Reviews"` scored `cls: 0` at 1.2 s and waiting for the review items scored the shift at 2.6 s. A reviewer's page went the wrong way entirely on the heading wait (0.04 → 0, "fixed") when the real numbers were 0.078 → 0.111, a regression past the threshold. Check `scoredAtMs` against when the content actually arrives, and if you cannot name a condition, say the reading is unverified rather than waiting a fixed time.
- **Score from the script, not from `vitals`.** `agent-browser vitals <url>` is a quick look (it waits for load plus about three seconds), but its `cls` is rounded to two decimals and is the sum of every shift. A measured 0.103125 prints as `0.10`; two 0.0645 shifts 1.4 s apart print `0.13` when the page's CLS is 0.0645. The script compares before rounding and uses Chrome's session windows (a shift joins the current window only if it starts under 1,000 ms after the previous one and under 5,000 ms after the window's first), following the web-vitals library.
- **Cold cache, one reading per launch.** On an unfixed page with a slow, unsized image, the first load after launch shifted and every repeat load in the same browser reported zero, with `lcp` collapsing to `fcp`, because the image came from cache. Three launches reproduced it. `--args "--disk-cache-size=1"` plus a new session per reading avoids it.
- **Derived session name, used for every command of the reading.** A literal name is shared machine-wide and another agent can reuse or close it. Scoring in a different session than the one that navigated scores `about:blank`. If your harness starts a new shell per command, run the `session id` line once and paste the printed name.
- **The score covers the top document only.** Layout-shift entries are per document: a shift inside an `<iframe>` (an embedded widget, a checkout, an ad) is not in this result, though it counts toward the page's CLS in the field. A reviewer's run reported 0.0129 → 0 for the page while the embedded widget went from 0 to 0.2148. If the change touches embedded content, state that the verdict is for the host document and either run the same script inside the frame (`agent-browser frame <selector>`, then the script; not exercised here) or report the embedded part as unverified.
- **`moved` lists what was pushed, not what pushed it.** The cause is whatever sits above those elements and gained size at that time (above, the unsized image whose load finished at about 640 ms).

Also:

- Same URL, viewport, and server mode before and after. A dev server and a production build shift differently; say which you measured.
- A lab reading on localhost is not field data, and local assets arrive fast, so a real shift can score low (0.0163 above for a full-width hero). Report the numbers, not "fixed", when the baseline was already under 0.1.
- When the value is near the threshold or content arrives at variable times, take three or more cold readings per side and report the median with the range.
- INP needs an interaction and is not covered by this check.

Doctrine for why layout shift matters and how to prevent it lives in `web-design` (web-performance) and `design-craft` (polish-principles); this check only measures it.

## Check: reduced motion

For guides that animate UI (for example `motion`, `animate-to-from-top-layer`, `spinner`).

```bash
agent-browser open http://localhost:3000/account
agent-browser set media reduced-motion
agent-browser eval "matchMedia('(prefers-reduced-motion: reduce)').matches"     # true
agent-browser eval "getComputedStyle(document.querySelector('dialog')).transitionDuration"
# "0.1s, 0.1s, 0.1s"
agent-browser set media
agent-browser eval "getComputedStyle(document.querySelector('dialog')).transitionDuration"
# "0.3s, 0.3s, 0.3s, 0.3s"
```

Read the same computed property under each preference, on the element and property the guide changes (`transitionDuration`, `animationName`, `transform`, `scale`).

**Pass:** the reduced value matches what the guide or the project's motion rule prescribes. **Fail:** identical values under both preferences; the stylesheet ignores the preference.

- **Reduced is not always zero.** The `animate-to-from-top-layer` guide keeps a short fade and drops only the scale, so duration goes `0.3s` → `0.1s`. That matches local doctrine: `web-design` (web-animation-design) asks for a calmer equivalent, not removal of all feedback. Assert against the prescribed value, not against `0s`.
- **Computed style is a proxy.** It shows the declared timing, not what the user sees, and it cannot see JavaScript-driven animation (a `motion` or WAAPI animation needs its own read, for example `document.getAnimations().length` during the interaction, or a recording).
- **Record both for a human** when the motion matters. Recording needs `ffmpeg` on `PATH` (`agent-browser doctor` reports it):

```bash
agent-browser set media reduced-motion
agent-browser record start ./dialog-reduced.webm --fps 60
agent-browser click "#delete-account"
agent-browser wait 500
agent-browser record stop
```

Make the wait longer than the transition (a 300 ms transition is about 18 frames at 60 fps), close the dialog, reset with `set media`, and record the default the same way.

## Check: color scheme

For guides that support light and dark themes (for example `dark-mode`, `color`).

```bash
agent-browser open http://localhost:3000/account
agent-browser set media dark
agent-browser eval "matchMedia('(prefers-color-scheme: dark)').matches"         # true
agent-browser eval "getComputedStyle(document.body).backgroundColor"            # "rgb(17, 17, 17)"
agent-browser eval "getComputedStyle(document.documentElement).colorScheme"
agent-browser screenshot ./account-dark.png
agent-browser set media light
agent-browser eval "getComputedStyle(document.body).backgroundColor"            # "rgb(255, 255, 255)"
agent-browser screenshot ./account-light.png
```

**Pass:** colors differ between `dark` and `light` and match the guide or the project's tokens, and `color-scheme` is set so the browser adapts form controls and scrollbars.

- Each `set media` call sets both preferences: `set media dark` alone turns reduced motion off. Use `set media dark reduced-motion` to test them together.
- This emulates the *system* preference. A site with its own theme toggle (a class or `data-theme` on the root, stored in `localStorage`) needs the toggle clicked as well; test both paths and the first paint after reload, where a flash of the wrong theme shows.
- A background-color read does not prove contrast. Run the accessibility scan below in each scheme, and look at the screenshots: this is one of the places a screenshot is the right evidence. Color doctrine: `web-design` (oklch-skill).

## Check: dialog focus and inertness

For guides about modal dialogs and top-layer UI (for example `dialog`). A modal `<dialog>` opened with `showModal()` should make the rest of the page inert, move focus inside, close on `Esc`, and return focus to the element that opened it.

```bash
agent-browser open http://localhost:3000/account
agent-browser snapshot -i                      # page controls listed
agent-browser click "#delete-account"
agent-browser snapshot -i                      # only the dialog's controls
agent-browser eval "document.activeElement.id || document.activeElement.textContent"
agent-browser click "a[href='/settings']"      # expected to fail
agent-browser press Escape
agent-browser snapshot -i                      # page controls listed again
agent-browser eval "document.activeElement.id" # the trigger's id
```

| Claim | Pass | Fail |
| --- | --- | --- |
| Inertness | Snapshot taken while open lists only the dialog's controls (inert content leaves the accessibility tree) | Background links or buttons still listed |
| Initial focus | `document.activeElement` is inside the dialog, on the element the design chose (for example the `autofocus` button) | Focus still on the trigger or `body` |
| Keyboard containment | From the dialog's first and last control, `press Tab` and `press Shift+Tab` several times; after each, focus is inside the dialog or on `body` (a native modal lets focus pass through the browser's own UI) | Any press lands on a background control. A hand-rolled modal can pass every other row (hidden from the snapshot, click blocked, focus set and restored) and still fail this one |
| Blocked input | The background click errors with "covered by `<dialog>`" | The click succeeds |
| Dismissal and return | After `Esc`, the snapshot lists the page again and `activeElement` is the trigger | Focus lost to `body`, or dialog still open |

Containment check, repeated for each key press (replace the selector with the dialog's):

```bash
agent-browser press Shift+Tab
agent-browser eval "(d => ({el: document.activeElement.id || document.activeElement.tagName, inside: d.contains(document.activeElement)}))(document.querySelector('dialog'))"
# native <dialog>:     { "el": "BODY", "inside": false }   then back inside on the next press: pass
# div with aria-hidden on the background: { "el": "open", "inside": false }   the opener behind the dialog: fail
```

Run on two pages here: a native `showModal()` dialog cycled Cancel → Delete → `BODY` → Cancel in both directions and never reached the page; a `role="dialog"` `div` that set `aria-hidden` and `pointer-events: none` on the background listed only its own two buttons in the snapshot, yet Tab reached the background link and Shift+Tab reached the opener.

This also catches hand-rolled modals (a `div` with a backdrop) that trap nothing: the snapshot still lists the page behind. Which element should take initial focus, and when a non-modal popover is the better choice, are design questions for `web-design` (web-accessibility).

## Check: overflow at narrow width

For guides and fixes about responsive layout and reflow (for example `css-layout`, container-query guides). Content should reflow at 320 CSS px wide without horizontal scrolling.

```bash
agent-browser open http://localhost:3000/orders
agent-browser set viewport 320 800
agent-browser eval "({w: innerWidth, scrollW: document.documentElement.scrollWidth})"
# { "scrollW": 454, "w": 320 }
cat <<'JS' | agent-browser eval --stdin
[...document.querySelectorAll('body *')]
  .filter(e => e.getBoundingClientRect().right > innerWidth + 1)
  .map(e => e.tagName.toLowerCase() + (e.className ? '.' + e.className : '')).slice(0, 5)
JS
# [ "div.card" ]
agent-browser set viewport 1280 800
```

**Pass:** `scrollW` equals `w`. **Fail:** `scrollW` is larger; the second command names the elements whose right edge passes the viewport (the outermost one listed is usually the cause, here a `min-width`).

- A page that hides the problem with `overflow-x: hidden` passes this check while clipping content. Take a screenshot at 320 as well, and see `web-design` (web-layout-design) for why clipping is not a fix.
- Data tables, maps, and code blocks may scroll inside their own container. That is allowed; the page itself should not scroll sideways.
- Reset the viewport afterwards; it persists for the session.

## Check: keyboard order and focus ring

For guides and fixes about focus management and keyboard access (for example `accessibility`).

```bash
agent-browser open http://localhost:3000/orders
agent-browser press Tab
cat <<'JS' | agent-browser eval --stdin
(e => ({el: e.id || e.textContent.trim(), focusVisible: e.matches(':focus-visible'),
  outline: getComputedStyle(e).outlineStyle + ' ' + getComputedStyle(e).outlineWidth,
  shadow: getComputedStyle(e).boxShadow}))(document.activeElement)
JS
# { "el": "quiet", "focusVisible": true, "outline": "none 3px", "shadow": "none" }
```

Repeat `press Tab` and the read for each stop on the path you are checking.

| Claim | Pass | Fail |
| --- | --- | --- |
| Order | The sequence of `el` values follows the visual and reading order, starting with the skip link if there is one | A stop is out of order, or focus disappears into `body` |
| Reachability | Every control can be reached and operated by keyboard using its widget's own model: one Tab stop per standalone control, and one Tab stop per composite widget with arrow keys moving inside it | A clickable element never receives focus by any key (often a `div` with a click handler) |
| Visible focus | `focusVisible` is true and the element shows an indicator: an outline style other than `none`, or a ring drawn with `box-shadow` or a border | `outline: none` with no replacement, as in the output above |

- **A missing Tab stop is not automatically a failure.** A native radio group has one stop (the checked option, or the first when none is checked); the other options are reached with arrow keys. Tab lists, menus, toolbars, listboxes, and grids built to the ARIA patterns work the same way. Before reporting a control as unreachable, `press ArrowRight` or `press ArrowDown` from the group's stop and read `activeElement` again. In listboxes, comboboxes, and grids that manage focus with `aria-activedescendant`, DOM focus stays on the container or input while the active option changes, so `activeElement` will not move: read `document.activeElement.getAttribute('aria-activedescendant')` (then that element's text) or take a `snapshot` and look for the option marked selected or active. Also expected: `disabled` controls and `tabindex="-1"` targets are skipped.
- Keyboard `Tab` presses match `:focus-visible`; a mouse click on a button does not. Test with `press Tab`, not `click`.
- Computed style proves an indicator is declared, not that it is visible against the background. Screenshot one focused control per surface color for a person to judge; contrast rules are in `web-design` (web-accessibility).
- A custom ring on a wrapper (`:focus-within`) will not show on the focused element's own styles. Read the wrapper too before calling it a failure.

## Check: pointer target size

For fixes about small tap targets.

```bash
cat <<'JS' | agent-browser eval --stdin
[...document.querySelectorAll('a,button,input,select,textarea,summary,[role=button],[role=tab],[role=link],[role=menuitem],[role=option],[role=checkbox],[role=radio],[role=switch],[tabindex]:not([tabindex="-1"])')]
  .map(e => ({el: e.id || e.textContent.trim().slice(0, 30), r: e.getBoundingClientRect()}))
  .filter(t => t.r.width < 24 || t.r.height < 24)
  .map(t => ({el: t.el, w: +t.r.width.toFixed(2), h: +t.r.height.toFixed(2)}))
JS
# [ { "el": "tiny", "h": 18, "w": 18 }, { "el": "Skip", "h": 18.5, "w": 33.6 }, … ]
```

This lists candidates under 24×24 CSS px (the WCAG 2.2 AA minimum), compared before rounding (a 23.75 px control is under the minimum) and including ARIA widgets such as tabs. Extend the selector for the project's own interactive roles. It over-reports: links inside a sentence, targets with enough spacing around them, and controls whose hit area is enlarged by padding on a parent or a pseudo-element are exempt or fine. Confirm each candidate before reporting it, and take the project's own target size (often larger on touch) from `web-design` (web-accessibility) and `web-design` (mobile-web-native-feel).

## Supporting checks

- **Accessibility scan:** `agent-browser a11y` (or `a11y <url>`, `--tags wcag2a,wcag2aa`, `--selector "#main"`, `--json`) runs a bundled axe-core against the current page and reports violations with impact, rule ID, and failing selectors. It audits the state the page is in, so open the dialog or menu first. An axe pass covers a fraction of accessibility; it does not replace the keyboard and focus checks above or the testing program in `web-design` (web-accessibility).
- **Console and errors:** `agent-browser errors` and `agent-browser console` after each interaction. A fix that passes its check while throwing a new exception has not passed.
- **Viewport and device:** `set viewport 390 844`, `set device "iPhone 14"`. Re-run layout-shift and overflow checks at the narrow width the project supports.
- **React pages:** launched with `--enable react-devtools`, `react renders start|stop` and `react suspense` report re-renders and Suspense boundaries, and `vitals` adds hydration timing. Use them when the claim is about rendering work (`react` owns the rules).

## When no check exists

Some rules have no browser check in this toolset: screen-reader announcements, real-device behavior, field performance, perceived smoothness. Report them as **unverified** with the reason and what a person would need to do (for example "test with VoiceOver on the confirm step"). An unverified row is a correct result. A pass inferred from the code is not.

## Report and cleanup

Use the table in the skill body: one row per rule, with the command output quoted. Give screenshot and recording paths. State the measured build (dev or production), viewport, and tool versions when numbers are involved.

```bash
agent-browser set media      # reset both preferences
agent-browser close
```

## Look it up

- `agent-browser skills get modern-web-guidance` — upstream's current version of this workflow, matched to the installed CLI.
- `agent-browser skills get core --ref commands` — every command and flag, including `vitals`, `set media`, `a11y`, `record`, and the React commands.
- https://developer.chrome.com/docs/modern-web-guidance — the guides and how Baseline data is attached.
- https://web.dev/articles/cls — how CLS is scored and the 0.1 threshold.
