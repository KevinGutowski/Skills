# Guidance, Then Verify

*Scope: look up Chrome's Modern Web Guidance for a UI task, apply it, and check the result in a real browser. For each check: what to read, what outcome it supports, and the blind spots that have produced false clean results (layout shift, reduced motion, color scheme, dialog focus, overflow, keyboard, pointer targets, accessibility scan). Commands and scripts run on agent-browser 0.43.0 and modern-web-guidance 1.0.1, 2026-11-18 to 2026-11-22.*

## Contents

- [Two tools, two jobs](#two-tools-two-jobs)
- [Get the guidance](#get-the-guidance)
- [Workflow](#workflow)
- [What a check can conclude](#what-a-check-can-conclude)
- [Layout shift](#layout-shift)
- [Reduced motion](#reduced-motion)
- [Color scheme](#color-scheme)
- [Dialog focus and inertness](#dialog-focus-and-inertness)
- [Overflow, keyboard, targets](#overflow-keyboard-targets)
- [Accessibility scan and console](#accessibility-scan-and-console)
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
2. **Baseline.** If the UI already exists, run the matching check below before editing and keep the output. A fix can only be called verified if this baseline shows the defect.
3. **Apply.** Implement in the project's code and conventions. Where the guide and a local rule differ (for example motion values owned by `web-design` (web-animation-design)), note the difference and follow the project.
4. **Verify.** Serve the built page with the project's own dev or preview server and run the check for every rule.
5. **Report.** One row per rule: guide, rule, check, outcome (see the next section), evidence.

## What a check can conclude

Every recipe below was, at some point, caught reporting a clean result on a page that was still broken: scored too early, sampled too late, read from the wrong element, the wrong document, or a rounded number. Treat a check as an instrument with blind spots, and use four outcomes:

| Outcome | When | What to write |
| --- | --- | --- |
| **Failed** | The check observed the defect | The observation, quoted |
| **Fixed** | The same check, under the same stated conditions, observed the defect before the change and does not after | Both observations and the conditions |
| **Not observed** | The check ran and saw no defect, but there is no baseline that shows it can see this one | "Not observed under: …", with the conditions. This is not a pass |
| **Unverified** | The check could not run, the content did not load, or no check covers the claim | The reason and what a person would do |

Two rules follow. A clean baseline does not mean the complaint was wrong and does not mean the tool is broken; it means this run did not demonstrate the defect, so nothing after it can be called fixed until a run does. And each section's "blind spots" are part of the check: read them before trusting a clean result.

Examples use `http://localhost:3000`, `"$S"` for the session name (built once per pass), and `"$SKILL_DIR"` for the directory containing this skill's `SKILL.md`; both are set up in driving-the-browser.

## Layout shift

For guides that reserve space for images, embeds, fonts, or late content (for example `performance`, `visually-stable-font-fallbacks`). Use the script next to this skill; it exists because the hand-run version of this check went wrong six different ways.

```bash
export CLS_RUN="$(date +%s)-$$"        # once per pass
bash "$SKILL_DIR/scripts/cls-reading.sh" --label before --url http://localhost:3000/products \
  --ready "document.querySelectorAll('[data-review]').length > 0"
# { "cls": 0.0163, "good": true, "document": "http://localhost:3000/products", "scoredAtMs": 1700,
#   "shifts": [ { "at": 641, "moved": ["p", "button#delete-account"], "value": 0.0163 } ], ... }
# edit, rebuild, then the same command with --label after
```

The script (`scripts/cls-reading.sh`, scorer in `scripts/cls.js`, collector in `scripts/cls-collector.js`) launches a fresh browser with the cache disabled, registers the collector as an init script so every layout shift is recorded from navigation on, waits for your readiness condition, scores, closes, and prints `UNVERIFIED: <reason>` with exit code 1 if the page, the condition, or the frame is missing. `cls` is Chrome's largest session window, unrounded; `good` is `cls <= 0.1` compared before rounding; `document` is the origin and path of the document that was scored and `frame` says whether that was a frame. The script's output is made to be quoted, so it never repeats its inputs: URLs are rebuilt as scheme, host, port and path (no `user:password@`, query string or fragment), and the frame selector and readiness condition (which can contain URLs with tokens) are described, not echoed. Keep your own command out of a report if it carries a token; `moved` lists the elements that were pushed (the cause is whatever sits above them and gained size at that time).

**You supply the one thing it cannot know: the readiness condition.** `--ready '<JavaScript expression>'` or `--ready-selector '<CSS selector>'` must be true only once the content under test has rendered: a count of rendered items, a selector that matches only rendered items, text that comes from the data, an app-ready flag.

Blind spots, each seen in testing:

- **A readiness condition that is true too early.** A heading or container in the initial HTML is true at once: with a static "Reviews" heading and reviews arriving at 2.5 s, waiting for the heading scored 0 and waiting for the items scored the shift. One reviewer's page went the wrong way entirely on a heading wait (0.04 → 0) while the real numbers were 0.078 → 0.111. `body.textContent` also contains inline script source, so a text test on it can match the string in the code. Check `scoredAtMs` and `lastShiftAtMs` against when the content actually arrives.
- **The browser's own shift history is limited.** Its buffered `layout-shift` list keeps a fixed number of entries (150 in the Chromium tested). On a page with 170 small shifts followed by a large one, a scorer that read only that buffer returned `good: true` while the real value was far over the threshold. The script therefore records from navigation with its collector (`source: "collector"` in the output). If you evaluate `cls.js` by hand in a session opened without the collector, it falls back to the buffer (`source: "buffered"`) and returns an error instead of a score when the buffer is full or the browser reports dropped entries. The collector adds one object to the page, `window.__browserVerificationLayoutShifts`.
- **Only one document is scored.** Shifts inside an `<iframe>` are not in the host's result, though they count toward the page in the field. `--frame '<selector>'` scores a same-origin frame through its own window and reports its URL (here: host 0, frame 0.067). A frame whose Content-Security-Policy forbids `eval` cannot run a `--ready` expression (the script says so in its UNVERIFIED message); use `--ready-selector`, which needs no eval. With `--frame`, the readiness condition is evaluated inside the frame: a host element that matched the same selector once released the wait at 1.07 s and the frame scored 0, against 0.191 when the condition ran in the frame. `agent-browser frame` does not do this: it changes the snapshot, but `eval` still runs in the host. A cross-origin frame cannot be read; the script says so and the embedded part is unverified.
- **`agent-browser vitals` is a quick look, not a verdict.** Its `cls` is rounded to two decimals and is the sum of every shift: a measured 0.103125 shows as `0.10`, and two 0.0645 shifts 1.4 s apart show as `0.13`.
- **Warm cache.** A second load in the same browser reported zero on an unfixed page because the late image came from cache. The script always launches cold; do not reuse a session for a reading.
- **One load, one machine.** Local assets arrive fast, so a real shift can score low here. Same URL, viewport, and server mode (dev or production) on both sides; near the threshold or with variable timing, take three or more readings per side and report the median and range. INP is not covered.

Doctrine for why layout shift matters and how to prevent it lives in `web-design` (web-performance) and `design-craft` (polish-principles).

## Reduced motion

For guides that animate UI (for example `motion`, `animate-to-from-top-layer`, `spinner`). The question is whether a specific movement is gone, or toned down as the guide prescribes, when the user asks for reduced motion.

```bash
agent-browser --session "$S" open http://localhost:3000/account
agent-browser --session "$S" set media reduced-motion
agent-browser --session "$S" eval --stdin < "$SKILL_DIR/scripts/motion-probe.js"     # arms: { "armed": true, "reducedMotion": true }
agent-browser --session "$S" click "#delete-account"
agent-browser --session "$S" wait 800
agent-browser --session "$S" eval --stdin < "$SKILL_DIR/scripts/motion-probe.js"     # reads; repeat while "pending" is above 0
# { "conclusion": "movement measured", "pending": 0, "armed": false,
#   "moved":   [ {"target":"div#pad","kind":"transition","properties":["paddingLeft"],"measured":"box","measuredChange":159.4,"result":"moved"} ],
#   "unknown": [ {"target":"div#clip","kind":"transition","properties":["clipPath"],"measuredChange":0,"result":"unknown"} ],
#   "still":   [ {"target":"div#fade","kind":"transition","properties":["opacity"],"measuredChange":0,"result":"still"} ] }
```

**What `motion-probe.js` does.** Every frame while armed it asks the browser which animations exist (CSS transitions, CSS animations, and Web Animations API animations, in the document and in open shadow roots, including ones still waiting out a delay) and measures each element's rendered box and its contents' box against the first frame it was seen. It never concludes movement from what a stylesheet declares or from a computed value.

| Result | Meaning |
| --- | --- |
| `moved` | Measured: the element's rendered box moved or resized by more than 1 px at some frame. Never reported for a pseudo-element |
| `still` | The animation finished (or loops forever), nothing was measured changing, and the only properties whose keyframe values differ are ones that cannot move or resize anything: opacity, colors, visibility. A pseudo-element qualifies only this way |
| `unknown` | Everything else: not finished; a property that could move or reshape something (`transform`, `clip-path`, `filter`, `max-height`) animates and no change was measured; or any pseudo-element animation beyond a fade or recolor, because a `::before` or `::after` has no box that script can read. Such a record carries `computedGeometryChanged` as a hint for the person watching the recording, not as a result |

**The scripts leave the page alone.** Both `cls.js` and `motion-probe.js` are single enclosed functions: evaluating them defines no globals, so a page with its own `classify()` or `scoreShifts()` is unaffected (an earlier version overwrote one and changed what a button did). The probe keeps one state object, `window.__browserVerificationMotionProbe`, while armed and removes it when it disarms. If you write your own snippet for `eval`, wrap it the same way; a bare `function` or `var` at the top level of an `eval` becomes a global on the page under test.

**Compare the same target before and after the fix.** The probe supports a claim about a named element, not about the page:

| Evidence | Outcome |
| --- | --- |
| Under reduced motion, `moved` lists a target the guide or the project's motion rule says should be still | **Failed** |
| Before the change, under reduced motion, the target was in `moved`. After it, with `pending` 0, the same interaction lists that target only in `still`, or not at all | **Fixed** for that target. A fade that remains is usually correct: `web-design` (web-animation-design) asks for a calmer equivalent, not for removing all feedback |
| `pending` above 0 | Not finished. The probe stays armed and keeps its records: wait and read again |
| The target is in `unknown`, or there was no "before" reading that showed it moving | **Not observed**. Record the interaction (`record start <file>.webm`, needs `ffmpeg`) and say that a person should look |

A clean read is a statement about the animations the browser listed during that interaction. It is never "nothing on this page moves". A read with `pending` 0 disarms the probe; evaluating it again arms a fresh one, so re-trigger the interaction after that.

Blind spots:

- **Durations prove nothing about movement.** A dialog that still slid 180 px read `0.3s` by default and `0.1s` reduced. Equal durations in both modes are fine if the movement is gone.
- **Declarations and computed values prove nothing, in either direction.** Seven designs of this check were wrong before this one, each time by inferring instead of measuring: a list of "movement" properties missed a `padding-left` slide; start and end boxes missed movement that returns to its start; the element's box missed its `::before`; "any `transform` is movement" failed a fade whose keyframes both said `translateX(0)`; "changing transform keyframes on a pseudo-element are movement" failed a correct fix that pins `transform` with an `!important` rule; counting only animations whose start event had fired called a page clean while a delayed slide was still waiting; and treating a pseudo-element's changed computed `top` as movement failed a marker that `position: static` kept in place. The probe measures rendered boxes, takes its list of animations from the browser, and says `unknown` for what it cannot measure.
- **Pseudo-elements.** Motion on `::before` and `::after` (spinners, markers, underlines) is never confirmed or cleared by the probe unless it only fades or recolors. Record it.
- **A neighbor can move an element.** `measuredChange` is how far the element went while its own animation ran; if a sibling's growth pushed it, it is still listed as moved. Read the targets.
- **Not seen at all:** motion driven by `requestAnimationFrame` or by setting styles from script (no animation object exists), closed shadow roots, cross-origin frames, and animations shorter than one frame. Movement that changes no box (`background-position`, `clip-path`, `filter`) is `unknown`, not `still`. For any of these, the recording is the evidence.
- **`set media` sets both preferences on every call.** `set media dark` turns reduced motion off; use `set media dark reduced-motion` for both, and `set media` alone to reset.

## Color scheme

For guides that support light and dark themes (for example `dark-mode`, `color`).

```bash
agent-browser --session "$S" set media dark
cat <<'JS' | agent-browser --session "$S" eval --stdin
(el => { for (let n = el; n; n = n.parentElement) {
    const c = getComputedStyle(n).backgroundColor;
    if (c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent')
      return {paintedBy: n.nodeName.toLowerCase() + (n.id ? '#' + n.id : ''), background: c, text: getComputedStyle(el).color};
  } return {paintedBy: 'canvas default', background: null, text: getComputedStyle(el).color};
})(document.querySelector('#card'))
JS
# { "background": "rgb(32, 35, 38)", "paintedBy": "html", "text": "rgb(255, 255, 255)" }
agent-browser --session "$S" screenshot ./card-dark.png
```

Repeat with `set media light`. Point the selector at the surface the claim is about.

- Compare each scheme's values with what the project specifies for that surface (its tokens or the design). **Failed:** a value differs from the specified one, or the surface the claim is about does not change when the design says it should.
- Sameness alone is not a failure. A brand surface, or white text on both a dark and a mid-tone background, can be specified to stay the same in both schemes. With no specification to compare against, report the two readings as observations.
- A difference shows the scheme switches. It does not show contrast: run the accessibility scan in each scheme and look at the screenshots, which are the right evidence here. Color doctrine: `web-design` (oklch-skill).

Blind spots:

- **Reading `body`.** On a page that sets its background on the root, `body` read transparent in both schemes while the root changed. Walk up to the element that actually paints, as the snippet does.
- **System preference only.** A site with its own toggle (a class or `data-theme`, stored in `localStorage`) needs the toggle exercised too, and the first paint after reload checked for a flash of the wrong theme.
- Also read `getComputedStyle(document.documentElement).colorScheme`: without `color-scheme`, form controls and scrollbars stay light.

## Dialog focus and inertness

For guides about modal dialogs and top-layer UI (for example `dialog`). A modal should make the rest of the page inert, move focus inside, close on `Esc`, and return focus to the element that opened it.

```bash
agent-browser --session "$S" snapshot -i                      # page controls listed
agent-browser --session "$S" click "#delete-account"
agent-browser --session "$S" snapshot -i                      # only the dialog's controls
agent-browser --session "$S" eval "document.activeElement.id || document.activeElement.textContent"
agent-browser --session "$S" click "a[href='/settings']"      # expected to fail: covered by the dialog
agent-browser --session "$S" press Shift+Tab                  # repeat with Tab, several times each
agent-browser --session "$S" eval "(d => ({el: document.activeElement.id || document.activeElement.tagName, inside: d.contains(document.activeElement)}))(document.querySelector('dialog'))"
agent-browser --session "$S" press Escape
agent-browser --session "$S" eval "document.activeElement.id" # the trigger's id
```

| Claim | Failed when |
| --- | --- |
| Inertness | The snapshot taken while open still lists background links or buttons |
| Initial focus | `activeElement` is still the trigger or `body` after opening |
| Blocked input | The background click succeeds |
| Keyboard containment | Any Tab or Shift+Tab press lands on a background control. Focus on `body` is fine: a native modal lets focus pass through the browser's own UI |
| Dismissal and return | After `Esc` the dialog is still open, or focus is not on the trigger |

Blind spot: **the first three rows can all be clean on a modal that leaks focus.** A `role="dialog"` `div` with `aria-hidden` and `pointer-events: none` on the background listed only its own buttons, blocked the click, set and restored focus, and Tab still reached the page behind it. Always run the containment row. Which element should take initial focus, and when a non-modal popover is the better choice, are design questions for `web-design` (web-accessibility).

## Overflow, keyboard, targets

Three reads a model can write unaided. What is worth keeping is where each one misleads.

**Overflow at narrow width.** `set viewport 320 800`, then compare `document.documentElement.scrollWidth` with `innerWidth`; list offenders with elements whose `getBoundingClientRect().right` exceeds `innerWidth`. Failed when the page scrolls sideways.

- A page that hides the problem with `overflow-x: hidden` reads clean while clipping content. Screenshot at 320 as well; `web-design` (web-layout-design) explains why clipping is not a fix.
- Tables, maps, and code blocks may scroll inside their own container. The viewport persists for the session; reset it.

**Keyboard order and focus ring.** `press Tab`, then read `document.activeElement`, whether it matches `:focus-visible`, and its `outlineStyle`/`outlineWidth` and `boxShadow`. Failed when a control is unreachable by its widget's keyboard model, the order contradicts reading order, or a focused control declares no indicator.

- A missing Tab stop is not a failure by itself. A radio group, tab list, menu, toolbar, listbox, or grid has one stop and moves inside with arrow keys; `disabled` and `tabindex="-1"` are skipped.
- In listboxes and comboboxes that use `aria-activedescendant`, `activeElement` does not move: read that attribute or take a `snapshot`.
- Use `press Tab`, not `click`: a mouse click on a button does not match `:focus-visible`.
- A declared indicator is not a visible one (transparent ring, ring the color of the background), and a ring drawn on a wrapper with `:focus-within` is not on the focused element's styles. Screenshot one focused control per surface color.

**Pointer target size.** Query interactive elements (native controls, `summary`, `[role=button|tab|link|menuitem|option|checkbox|radio|switch]`, positive `tabindex`) and compare `getBoundingClientRect()` width and height with 24 CSS px **before rounding** (23.75 is under). The result is a candidate list only.

- It over-reports: inline links, targets with enough spacing, and controls whose hit area is enlarged by a parent's padding or a pseudo-element are exempt or fine under WCAG 2.2.
- It under-reports any interactive role you did not select. The project's own target size (often larger on touch) is in `web-design` (web-accessibility) and `web-design` (mobile-web-native-feel).

## Accessibility scan and console

- `agent-browser a11y` (`--tags wcag2a,wcag2aa`, `--selector`, `--json`) runs a bundled axe-core on the page **in its current state**: open the dialog or menu first, and run it in each color scheme. A clean axe run covers a fraction of accessibility; it is "not observed", never a pass for keyboard, focus, or screen-reader behavior.
- `agent-browser errors` and `console` after each interaction. A change that reads clean while throwing a new exception has failed.
- On React pages launched with `--enable react-devtools`, `react renders start|stop` and `react suspense` report re-renders and Suspense boundaries (`react` owns the rules).

## Report and cleanup

One row per rule, in the outcome vocabulary above, with the command output quoted and screenshot or recording paths. State the build measured (dev or production), viewport, tool versions, and for every clean result the conditions it was observed under. Screen-reader announcements, real devices, field performance, and perceived smoothness have no check here: report them as unverified with what a person would need to do.

```bash
agent-browser --session "$S" set media      # reset both preferences
agent-browser --session "$S" close
```

## Look it up

- `agent-browser skills get modern-web-guidance` — upstream's current version of this workflow, matched to the installed CLI.
- `agent-browser skills get core --ref commands` — every command and flag, including `set media`, `a11y`, `record`, and the React commands.
- https://developer.chrome.com/docs/modern-web-guidance — the guides and how Baseline data is attached.
- https://web.dev/articles/cls — how CLS is scored, session windows, and how the API differs from the metric.
