# Behaviour traps and measured probes

A review aid: interaction defects that hold in any web app, each with a stable ID a finding, a spec line, and a lint rule can all cite; plus the probes that turn "feels off" into a measurement. Source: design.how `ui-review` and the `build-design-system` trap list (Arlan Marat, MIT, screened at `148b94c`, 2026-11-14) — see [sources.md](sources.md). Paraphrased and trimmed. The IDs are the source's, kept so findings stay citable against its lint; they are labels, not a second rulebook. Each trap's underlying rule still belongs to its domain owner (`web-design`, `design-craft`, `ux-writing`), and where an owner's school differs, the owner wins.

## Contents

- How to use this file
- Symptom to trap
- Probes: measure, don't infer
- Criteria the domain passes can miss
- Edge cases: shown or not shown
- Traps: actions and forms
- Traps: choice, overlays, menus, feedback
- Traps: navigation, data, layout, touch
- Traps: motion
- What not to report

## How to use this file

- Use the symptom table when the person describes a feeling instead of a component.
- Cite a trap ID in the finding's Why column next to the owning domain.
- **A trap outranks the app's majority.** When the app does it everywhere, it is still a finding; the conflict goes to the person as a decision whose default is the fix.
- Flag a finding **system-caused** when its root is a token, preset, or shared component (every menu opening on a slow preset). It merges every screen it hits, and the fix goes to the system — this is the "shared-token fix outranks a leaf fix" rule with a label.

## Symptom to trap

| They say | Look at |
| --- | --- |
| "laggy", "slow to respond" | `press-delayed`, `motion-input-lag`, `motion-blocks-input` |
| "it jumps" | `loading-layout-shift`, `numbers-shift`, `weight-shift` |
| "fine on my laptop, not my phone" | `touch-hover-flash`, `hover-unguarded`, `touch-input-zoom`, `viewport-height` |
| "I can't click it" | `decor-pointer`, `list-dead-gap`, `exit-eats-input` |
| "the focus ring comes and goes" | `hover-beats-focus`, `open-trigger-unfocused`, `disabled-drops-focus` |

All IDs below are written without their `trap/` prefix.

## Probes: measure, don't infer

The render is the evidence; a description, DOM text, or source only supports it. Run probes on a local build, and do not click anything that writes to shared data.

- **Capture** each screen at the narrowest and widest supported widths (390 and 1280 when unknown), one fresh navigation per width, in the states that matter. Save the accessibility tree with each capture.
- **Responsiveness to input cannot be judged from a screenshot** — neither as a finding nor as a pass. Measure press feedback with the Event Timing API (a `PerformanceObserver` on `event` entries); each duration should be under 100 ms.
- **Focus rings are the reverse:** reach the control with real Tab presses and judge the ring from the capture. A container that draws the ring through `:has(:focus-visible)` leaves the focused element itself reporting no outline, so a computed-style check gives a false failure.
- Probe per screen: the keyboard path, focus after close, loading and error states, a throttled tab, reduced motion, and a touch width. **Every probe gets a measured result or a reason it did not run.**
- Measure control heights and reachability; do not read them from source. Row controls are measured *inside the scroll container*, not against the window.
- An inferred finding is written as the check that would settle it. An inferred blocking finding makes the verdict "pending that check", not a pass and not a block.
- State each fix as **a check that fails on the current build** ("Enter in Email sends exactly one request"), so the fix can be verified rather than eyeballed.

## Criteria the domain passes can miss

A domain-by-domain pass can clear every owner's rules while the screen still fails as a task. Walk these at each width:

1. **Purpose on arrival** — title, main heading, and primary action name the same task.
2. **One action leads** — no two actions compete for first.
3. **Visual order follows importance** — blur the capture; name the one element that still reads first. None is a finding.
4. **Where am I** — the step, list item, or section is visible, and so is the way back.
5. **Feedback sits at its trigger** — a copy action shows a brief inline check on its button, not a notification; a form error marks the field itself; an optimistic update that fails puts the change back and says so where it happened.
6. **Shown equals sent** — a field shows the value that will be sent. When it does not, and the hidden value grants access, spends money, or picks a recipient, the finding is HIGH; otherwise MEDIUM.
7. **Confirmation fits reversibility** — irreversible actions confirm; reversible ones offer undo, and a confirm on a reversible action is itself a LOW finding.
8. **Nothing asked twice** — a value the app already knows is prefilled.
9. **Same look, same behavior** — a departure has a reason in code, a spec, or a comment, or it is a finding.

Severity note from the source that fits this skill's scale: a user who *believes the task finished when it did not* cannot finish — that is HIGH. When a finding could go either way, choose the milder level and say why in one sentence.

## Edge cases: shown or not shown

Mark each one shown or not shown. A case not shown is a question for the designer, not a defect.

Empty · loading and slow loading · error, including a failed save · partial data · long and very short content · narrowest and widest width plus one where the layout switches · first use and a returning user with lots of data · no permission or a read-only role · offline · success after the main action · stand-in content at a realistic length. On touch: no hover that flashes or sticks, no zoom on input focus, no keyboard before the user asked. Motion: reduced motion on, the same action repeated quickly, a throttled CPU.

## Traps: actions and forms

| ID | Smell | Fix |
| --- | --- | --- |
| `button-div`, `role-button` | A click handler or `role="button"` on a non-button | A `button`, or an `a` when it navigates; do not rebuild Enter, Space, and disabled by hand |
| `link-as-button`, `link-wraps-button` | A link styled as a button beside the Button component, or one nested in the other | One element; two tab stops for one action is the bug |
| `button-type` | A button in a form with no `type` submits it | Default `type="button"` |
| `button-label-wrap` | A label wrapping to two lines at 390 | No-wrap, a shorter label, or a full-width button |
| `control-height` | Button, input, and select side by side at different heights | One height token per size; more than 1 px apart, measured, fails |
| `submit-repeat` | A pending submit accepts a second click or Enter | `aria-disabled` and an early return, focus kept |
| `loading-label-swap`, `loading-layout-shift` | The label changes to "Saving…" or the box changes size while pending | Keep the idle label, spinner inside the same box, `aria-busy`; any size change fails |
| `disabled-drops-focus` | A focused control turns `disabled` while it runs and focus falls to `body` | `aria-disabled` while pending |
| `disabled-still-hovers` | A disabled control still reacts to hover | Hover styles skip disabled states |
| `hover-beats-focus` | Hover removes a focus ring or border | Focus and invalid outrank hover |
| `weight-shift` | Font weight changes on hover or selection, shifting neighbors | Show the state with color, fill, or underline |
| `focus-ring-shape` | The ring ignores the radius or is clipped by a parent's `overflow` | An outline that follows the radius |
| `field-label`, `label-unbound` | Placeholder as the only name, or a label that does not focus its control | A visible bound label |
| `field-form-enter` | Fields outside a `form`, so Enter does nothing | One form, one submit |
| `field-affix-focus` | An icon or prefix beside the input, outside its hit area | Inside the hit area, or its own named button |
| `field-keeps-input` | A failed request clears what was typed | Keep every entered value — never a product decision |
| `date-local-midnight` | A date-only value passed through a local-midnight `Date` | Keep it a date string or UTC; test west of UTC |
| `required-everywhere` | A required marker on every field | Mark the rarer of required and optional |
| `touch-autofocus` | Autofocus on a page field opens the keyboard uninvited | Drop it on touch unless typing is the only job |

Error timing (first on blur or submit, then live), error linkage (`aria-invalid` plus `aria-describedby`), input types, 16 px inputs on touch, and never disabling zoom are already owned by `web-design` (form-design, web-accessibility); cite the owner.

## Traps: choice, overlays, menus, feedback

| ID | Smell | Fix |
| --- | --- | --- |
| `select-value-lost` | A select drops its value when the form errors or options reload | The value outlives errors and refetches |
| `select-empty-value` | No way back to "none" in an optional field | A clear control or an explicit empty option |
| `select-async` | "No results" flashes while the search runs | Loading wins over empty; empty-state anatomy and copy → `design-craft` (component-details → Empty states) |
| `toggle-switch-submit` | A switch that only applies on Save | A switch acts at once; otherwise it is a checkbox |
| `toggle-indeterminate` | "Select all" with no mixed state | Three defined states |
| `overlay-conditional-render` | The dialog is mounted only while open, so it cannot animate out or restore focus | Keep it mounted and pass `open` |
| `overlay-focus-return` | Focus lands on `body` after close | Return to the opener, or a named fallback when it is gone |
| `overlay-destructive` | A destructive confirm that closes on an outside click | Only Cancel and Escape dismiss it |
| `overlay-pending-dismiss` | Cancel or Escape closes a dialog mid-submit | Block dismissal while pending |
| `overlay-no-max-height` | A dialog taller than a short screen with no scroll | A max height from `dvh` and its own scroll |
| `escape-nested` | Escape closes the dialog behind an open menu | Escape closes the top layer only |
| `exit-eats-input` | A press during the exit animation reopens the layer or is lost | The exiting layer takes no pointer input |
| `open-trigger-unfocused` | An open menu's trigger looks like it does at rest | Keep the focus look while open |
| `menu-navigation` | Navigating menu items built as buttons | Links, so open-in-new-tab works |
| `menu-only-path` | An action reachable only by right-click or hover | A visible second path |
| `menu-diagonal` | A submenu closes on a diagonal pointer path | A short delay or a safe triangle |
| `tooltip-essential`, `tooltip-disabled-trigger` | Information only a tooltip holds, including why a button is disabled | Put the text on the page; keep the button focusable with `aria-disabled` |
| `tooltip-interactive` | A link inside a hover tooltip | Anything clickable is a popover |
| `toast-errors` | An error that needs action shown only in a timed toast | Persist until closed or acted on |
| `toast-timer` | The timer keeps running under the pointer or in a hidden tab | Pause on hover, focus, and hidden |
| `live-region-double` | Two layers announce one message | One announcing layer |

## Traps: navigation, data, layout, touch

| ID | Smell | Fix |
| --- | --- | --- |
| `tabs-routes` | Tabs that change the URL built as a tablist | Links with `aria-current`, or panels — not both |
| `current-unmarked` | The current item looks different but is not marked | `aria-current` or `aria-selected` |
| `narrow-hidden-nav` | At 390, nav links or columns sit past a clipped edge with no cue | A menu button, a wrap, or an edge fade; list each hidden item for the person |
| `link-cue` | A body-copy link with the text's color and no underline | A resting cue |
| `table-divs` | A table made of divs | A table, or the grid role with its full keyboard model |
| `chosen-text-truncated` | A name the user chose to identify something, cut with an ellipsis | Wrap it; it never truncates |
| `empty-value` | A blank cell here, a dash there, "N/A" elsewhere | One primitive for empty values, announced as "None" |
| `list-dead-gap` | Rows separated by margin, so the gaps do nothing | Padding, so hit areas touch |
| `overflow-scrollbar` | `overflow: auto` on a box a pixel or two short of its content | Leave room, or clip |
| `scroll-chain` | Scrolling a panel to its end scrolls the page | Contain overscroll; lock the page under a modal |
| `decor-pointer` | A glow or gradient layer above content takes clicks | No pointer events on decoration |
| `touch-tap-highlight` | The tap highlight removed with no pressed style in its place | A pressed state from pointer-down |
| `press-delayed` | Press feedback waits for release or an animation | Feedback within 100 ms of pointer-down |
| `surface-double-edge` | A border and a shadow on one surface, undecided | Border on resting surfaces, shadow on raised ones (a committed `design-craft` theme may say otherwise) |
| `weight-synthesized` | A weight token the loaded font files lack | Name only weights that exist; `font-synthesis: none` exposes the gap |
| `illustration-announced` | An HTML illustration read out as fragments | An image role with a label, or hidden from the tree |
| `loader-small-dots` | A dot loader under 20 px | A thin ring |
| `gesture-drag`, `gesture-axes` | A drag that drops when the pointer leaves, or page and element both move on one swipe | Pointer capture, ignore extra touches, set `touch-action` to the owned axis |

Tabular numbers, color-only status, measure, `dvh`, safe areas, and hover under `(hover: hover)` are owned by `web-design` and `design-craft`; cite the owner.

## Traps: motion

Most are owned by `web-design` (web-animation-design) and `design-craft`: no `transition: all`, enters ease out, exits shorter than enters, transform and opacity only, origin from the trigger, interruptible retriggers, reduced motion as softening, no transitions on theme switch. The ones worth naming in a review because they are behavioral:

| ID | Smell | Fix |
| --- | --- | --- |
| `motion-blocks-input` | An entrance that ignores clicks until it ends | Take input at once |
| `motion-input-lag` | An element that follows the pointer through an easing curve | Track input each frame; carry release velocity |
| `motion-frequent` | Entrance motion on nav, list rows, or primary actions | None, or first open only |
| `loop-offscreen` | A loop running off screen or in a hidden tab | Pause out of view |
| `demo-on-timers` | A showcase demo stepping on timeouts | Wait on the animations' own finished promises |

## What not to report

- Preferences no criterion supports — these go to Considered but rejected.
- Rewritten copy. Flag the unclear text and say what is unclear; `ux-writing` owns the rewrite when asked.
- Console errors and other code defects: mention once so they reach QA.
- Motion that uses a named preset correctly and still looks wrong: hand it over with a slow-playback capture rather than a verdict.
- Product decisions behind a fix: list them for a person to decide. Keeping the user's input is never one of them.
