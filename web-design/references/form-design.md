# Form Design (Practical UI)

*Scope: Design web forms — the Dannaway method: single column, field types, 3 button weights, destructive friction. Use for web forms, confirm dialogs, or buttons. Failure copy → ux-writing; signup → user-onboarding; Apple forms → apple-design. Triggers: form layout, radio vs dropdown, checkbox vs toggle, disabled button, destructive action, multi-step form.*

Form structure, field selection, buttons, validation, and destructive-action friction from Adham Dannaway, *Practical UI*, 2nd ed. (2024) — a single-source method skill: attribute guidance to Dannaway. Fuller rationale, the nine button failure modes, and validation tradeoffs live in [references/practical-ui-details.md](form-design/practical-ui-details.md).

## Contents

- Platform scope — read first
- 1. Form architecture
- 2. Field-type selection
- 3. Validation
- 4. Buttons
- 5. Destructive-action friction ladder
- 6. Copy crumbs that ride along
- Checklist
- Relationship to other skills
- Staleness

## Platform scope — read first

Dannaway's conventions are **web-scoped**. Two known conflicts with Apple platforms — never cross-apply:

- **Button alignment.** Dannaway left-aligns buttons everywhere, ordered "from left to right, most important to least important" (he acknowledges right alignment is "a familiar pattern used widely on operating systems like Mac OS"). Apple platforms put the primary action on the right. For Apple-platform forms, sheets, and confirmations, route to `apple-design` (apple-navigation-design) and `apple-design` (hig).
- **Capitalization.** Dannaway: sentence case everywhere — title case "is also harder to read, as the capital letters of each word interrupt scanning." Apple uses title case for many controls; follow `apple-design` (hig) conventions on Apple platforms.

## 1. Form architecture

- **Single column.** "Stack forms in a single column layout, as it decreases interaction cost by maintaining a consistent downward momentum." Less cognitive load, fewer missed fields (screen-magnifier users can miss a second column). Exception: short related fields (expiry date + CVC) side by side within the column's bounds.
- **Labels stacked on top of inputs** — never to the left. Stacked closely, "your eyes can see both the label and input in a single focus." Stack checkboxes and radios vertically too.
- **Hints ABOVE fields, not below.** Two reasons, and the rationale is the lesson: (1) it preserves downward momentum — "If a password needs to be at least 6 characters long, tell people before they fill out the password field, not after"; (2) "the space below form fields can be covered by autofill menus and on-screen keyboards."
- **No placeholder-as-label.** It disappears on typing, makes fields look pre-filled, and its contrast is "almost always inaccessible." (Exception: single search fields with ≥4.5:1 placeholder contrast and an accessible label.) A placeholder that stays is an example value, not an instruction; Vercel's guidelines also end it with `…`, which is their house style and not adopted here.
- **Mark BOTH required and optional fields.** Asterisk * or "(required)" for required; "(optional)" for optional. "All fields are required unless marked optional" instructions get skipped while scanning. Don't color asterisks red — "red commonly indicates an error." Skippable only for short familiar forms (login, single-field subscribe).
- **Opt-ins over optional fields.** Replace an optional field with a checkbox that reveals a required field: `☐ Receive updates via text message` → on check, `Mobile number *`. "Those who aren't interested in receiving updates don't need to see the extra mobile number field."
- **Never ask for the same thing twice in one process** (WCAG 2.2 SC 3.3.7 Redundant Entry, Level A): auto-fill what the user already gave, or let them pick it ("Billing address same as delivery"). Exceptions: re-entry that is essential, needed for security, or when the earlier value is no longer valid.
- **Minimize fields**; match field width to intended input (a 4-digit postcode gets a 4-character-wide field); group related fields under headings; break long forms into steps (a 30-question form → "6 steps of 5 related questions, rather than 30 steps").
- **Field borders ≥3:1 contrast** — "Low contrast form fields are one of the most common UI design mistakes."

## 2. Field-type selection

| Situation | Use | Why (Dannaway) |
|---|---|---|
| ~10 options or fewer | Radio buttons, not dropdown | Dropdowns "require multiple precise interactions," hide options, "can be mistaken as being filled and accidentally skipped" |
| Long list, user knows the answer | Autocomplete search | Country-of-birth: typing beats scrolling; keep suggestions to ~10, bold the differences |
| Long list, user must browse | Split into multiple dropdowns | e.g., occupation → "industry" + "occupation" |
| Small numeric changes | Stepper, not dropdown | Selecting 2 adults + 1 child + 1 infant: dropdowns cost "6 clicks plus 3 scrolls," steppers "only 4 clicks." Use +/− (not chevrons), horizontal, ≥48pt targets |
| On/off, takes effect on submit | Checkbox | "Use a single checkbox when a user needs to press a submit button before the option will take effect" |
| On/off, immediate effect | Toggle switch | "Use a toggle switch for options that take immediate effect" |

**Positive-phrasing test for checkboxes:** "replace the selected checkbox with the word 'yes'." "Yes, don't allow automatic updates" fails → rephrase as "Allow automatic updates."

**Input mechanics that ride along** (Krehel, Interfaces Cheat Sheet):
- **Every input gets a visible `<label>`**, and its `type` and `inputmode` match what people should enter — `type="email"` / `inputmode="numeric"` bring up the right keyboard on touch devices, which a placeholder-only field with `type="text"` never does.
- **Name the field for autofill** (Vercel, Web Interface Guidelines; WCAG 1.3.5 Identify Input Purpose for personal-data fields): a meaningful `name` and the specific `autocomplete` token (`email`, `given-name`, `street-address`, `cc-number`, `current-password` / `new-password`, `one-time-code`). House position where upstream advises `autocomplete="off"` on non-auth fields: keep `off` for fields where a suggestion would be wrong (a search-like or one-off value), never as a blanket default.
- **Never block paste.** "People paste in things like passwords and one-time codes." Paste-blocking on confirmation and OTP fields punishes password managers and the users who follow security advice. Validate the pasted value instead. Normalize only fields whose meaning allows it (§3); passwords and other secrets are compared exactly as entered.
- **Login must not be a memory test** (WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum), Level AA). A step that relies on recalling or transcribing something (a password typed from memory, a code copied by hand, a puzzle) needs an alternative or a helping mechanism. Letting password managers fill the field and allowing paste satisfies it for passwords; passkeys, OAuth, email links, and `autocomplete="one-time-code"` for OTPs are the other routes. The criterion applies to *every* step. In multi-factor login, each step on the path must either avoid a cognitive function test or provide one of the four exceptions: an alternative method, a helping mechanism, object recognition, or personal content. A password step that supports password managers does not excuse a later OTP that blocks paste, or a text CAPTCHA. Blocking paste or autofill in an authentication field fails the criterion (W3C failure F109) unless another method is available for that step. Audit the whole path, step by step (W3C, Understanding SC 3.3.8).
- **Enter-to-submit must not fire during IME composition.** Korean, Japanese, and Chinese input methods use Enter to confirm a candidate. A custom Enter handler (chat composer, search box, inline add) works in this order. When the key is Enter and the product's newline modifier (usually Shift) is not held, call `event.preventDefault()` first, so native implicit submission or a textarea newline cannot run alongside your handler. Then return early if `event.isComposing` is true or `event.keyCode === 229` (Safari can report composition late; keep this check under the Enter test, because some mobile keyboards send 229 for ordinary keys). Then return if `event.repeat` is set. Only then submit, through `form.requestSubmit()` so validation and submit handlers still run. Keep a visible `<button type="submit">` for virtual keyboards. Never submit from `compositionend`. Native implicit submission from a plain `<input>` with no custom handler needs none of this, because browsers suppress it while an IME consumes Enter. Test with a real IME in Safari as well as Chromium; a synthetic event test does not prove it (W3C UI Events, composition key events).
- **16px field text on any touch screen, gated on pointer, not width** (Kosta, tactile-design). iOS zooms into a field set below 16px and stays zoomed. Gate the rule on `(pointer: coarse)`, not only a phone breakpoint, so an iPad's wider layout gets it too. Desktop fields can match the body size.

## 3. Validation

Three approaches — pick deliberately, mix per question type (full tradeoffs in [references/practical-ui-details.md](form-design/practical-ui-details.md)):

1. **Validate on submit** — simplest to build; user works undistracted; but errors arrive all at once, context lost. List errors at the top as links to the invalid fields; error message *above* each invalid field (autofill/keyboard cover the space below); red border + shade **plus an icon** — never color alone.
2. **Validate after leaving a field** (inline / "on blur") — immediate feedback with context; but interrupts flow, "doesn't work well for groups of inputs," more complex. Remove the error as soon as it's fixed.
3. **Validate instantly as people type** (after a pause) — best for working toward an answer (password criteria, username availability); risk of "premature error messages."

**Dense product-UI school (tactile-design).** `design-craft` (tactile-design) makes different calls, and they are scoped to dense app UI rather than blended with Dannaway's:
- validate on blur and on submit, never per keystroke;
- show the invalid state as a 1px red ring drawn with `box-shadow`, so nothing shifts;
- put the message directly *under* the field, replacing its help text, with `role="alert"`;
- keep Create disabled until its required field has content, then leave it enabled and surface errors on submit.

Pick one school per product. Dannaway's errors-above and no-disabled-buttons rules come from long public forms, where autofill and keyboards cover the space below fields. GOV.UK's error-message component corroborates the placement: the message sits after the label and hint, directly above the input.

**Official timing guidance splits three ways, and maps onto the approaches above.** Baymard: once a field shows an error, re-check it as the user types, so the error goes away the moment the value is right. Ontario Design System: validate on blur. GOV.UK: validate on submit, with an error summary. Choose by form: long public service forms fit GOV.UK's submit-first approach; product forms fit blur-plus-live-recheck.

**What the schools agree on, and where they still differ** (Baymard, Ontario, GOV.UK, NN/g, WCAG 2.2 Understanding for 3.3.1 and 3.3.3). The first, third, fourth, and fifth rules below hold in every school. The second rule's *timing* follows whichever school you picked:
- **No error before the user has entered something.** Do not validate on focus, on the first keystrokes of a new entry, or when an untouched empty field loses focus. Empty required fields are reported on submit. As-you-type feedback is only for rules people work toward while typing (password criteria, character limits, username availability).
- **An error never outlives its cause, but when it clears depends on the school.** Baymard: re-check a field that shows an error as the user types, and clear it the moment the value passes. Ontario: re-check a corrected field on blur and avoid keystroke validation. GOV.UK: re-check on the next submit. In every school, clearing removes the message, the error styling, and `aria-invalid` together, re-checks dependent fields (a password confirmation), and drops stale error-summary items on resubmit.
- **A failed submit keeps everything the user typed.** Redisplay passing and failing values exactly as entered and mark only the fields that need changing. Passwords may be cleared per the product's security policy. Never call `form.reset()` or reload an empty form after a validation or server error.
- **Normalize before validating, by field.** Where the field's meaning allows it: trim leading and trailing whitespace; ignore spaces, hyphens, and brackets in phone numbers, card numbers, and formatted codes; accept names with accents, hyphens, and apostrophes. Never normalize passwords, passphrases, API keys, or other opaque credentials, because whitespace can be part of a valid secret (OWASP Authentication Cheat Sheet). Pass them through exactly as entered unless the authentication contract defines a normalization. Reject only values that are wrong or ambiguous (Kalbag's "the burden should be on the developers" in [web-accessibility.md](web-accessibility.md) §6).
- **Errors stay until fixed or dismissed.** Never report a failed save, payment, or validation only in a toast that closes on a timer. Auto-dismiss is for non-critical confirmations the user can find elsewhere. (This restates WCAG 2.2's Understanding note on timed messages and a WCAG 3 working-draft requirement. It is not a WCAG 2.2 success criterion; treat it as a strong default.)

**Where focus goes after a failed submit is two schools.** *With an error summary* (GOV.UK, long forms): move focus to the summary at the top of the form; each item links to its field, and inline errors stay. *Without a summary* (Krehel's chain, §4 below and [web-accessibility.md](web-accessibility.md) §6; short forms and dialogs): move focus to the first invalid field. Either way, never move focus on blur.

Error message *copy* itself → `ux-writing` (error-messages).

## 4. Buttons

**Three weights:** primary (solid brand fill, white text — exactly one per screen: "If everything is considered important, then nothing stands out as the most important"), secondary (outlined, brand-color text/border — also for multiple equal-importance actions), tertiary (underlined text link — for least important and for de-emphasizing destructive actions). Hierarchy must not depend on color alone.

**Accessible specs (WCAG 2.1 AA framing):**
- "The contrast ratio of the button shape must be at least 3:1"
- "The button text contrast ratio must be at least 4.5:1"
- Identical-style buttons need ≥3:1 contrast *between* them
- Target "at least 48pt by 48pt" (aligns to the 8pt grid; above WCAG's 44px AAA target) and "separate them by at least 8pt" (Dannaway personally uses 16pt)

**The 9 failure modes** (his nine "problematic" button examples, condensed — full list in references): ① secondary fill <3:1 against background; ② light-grey secondary reads as disabled (+ low text/border contrast); ③ primary/secondary identical styles differing only by color; ④ similar styles + low text contrast; ⑤ identical styles <3:1 apart; ⑥ tertiary border <3:1; ⑦ tertiary distinguished by color alone — looks like plain text; ⑧ inconsistent shapes ("Elements that function the same should look the same"); ⑨ ambiguous hierarchy — primary and secondary with similar visual weight.

**Disabled-button avoidance playbook.** Disabled buttons strand users (no feedback why), are low-contrast, and aren't keyboard-focusable. In order of preference:
1. **Enable + validate:** "Instead of disabling the submit button, enable it and display error messages on submit." Keep it enabled until the request starts; while the request is in flight, show progress, ignore further presses, and send an idempotency key so a double-click creates one record (GOV.UK's button guidance covers the double-click case). Then wire the error chain: `aria-invalid="true"` on failing fields, each message linked by `aria-describedby`, focus moved to the error summary or the first invalid field (§3) — mechanics in [web-accessibility.md](web-accessibility.md) §6.
2. **Remove unavailable actions** and say why they're unavailable.
3. **Lock icon** on a regular full-contrast button (great for premium features) + message on press or nearby.
4. If you must disable: message near the button explaining why and how to proceed, tooltip, and keep it keyboard-accessible.

**Multi-step forms:** keep the primary button left-aligned (web scope); put a tertiary "Back" at the **top left** — a prominent bottom back button gets mis-clicked and loses entered data.

## 5. Destructive-action friction ladder

Match friction to severity, in increasing order:

1. **Initial friction:** make the action less prominent (tertiary weight), move it away, or progressively disclose it. "Don't colour the action red, as this makes it more prominent."
2. **Light:** plain confirmation dialog.
3. **Moderate:** "highlight the confirmation message in red."
4. **Heavy:** "use red and include a checkbox" that must be checked before the destructive button works.
5. **Undo:** "consider allowing people to undo or reverse destructive actions… it removes a lot of risk."

**Discarding unsaved edits is a destructive action too.** Track a dirty state. While it is set, ask before the user leaves: a router guard for in-app navigation, `beforeunload` for closing the tab, and the dialog's close handler for Cancel or Escape. Offer clear choices ("Discard changes" / "Keep editing"). Skip the prompt when nothing changed or right after a successful save; a prompt on every navigation teaches people to click through it (NN/g, confirmation dialogs).

Corroborated by Wathan & Schoger, *Refactoring UI*: a destructive action that isn't the page's primary action gets secondary/tertiary treatment — "Combine this with a confirmation step where the destructive action actually is the primary action, and apply the big, red, bold styling there." Red belongs in the confirmation, not the entry point. Apple destructive confirmations (action sheets, red menu items) → `apple-design` (apple-navigation-design).

## 6. Copy crumbs that ride along

- **The my/your rule:** "Avoid using the word 'my' on form labels" — the interface is the speaker, so "My email" reads as *its* email. "Your" is clearer "but unnecessary in most cases" — just "Email". Never mix my and your.
- **Button text = verb + noun**, meaningful out of context: "Save post", "Discard message", "Edit article" — never "Ok". Screen-reader users jump straight to buttons.
- No instructional verbs in labels ("Type your email" → "Email").
- Broader voice system → `ux-writing` (ui-voice-and-tone); this skill's copy rules stop at form labels and button text.

## Checklist

- [ ] Single column; labels stacked on top; related short fields may share a row
- [ ] Hints above fields; no placeholder-as-label
- [ ] Both required (*) and optional ("(optional)") marked; asterisk not red
- [ ] Optional fields replaced by opt-in checkboxes where possible
- [ ] Field types: radio ≤~10 / autocomplete / stepper / checkbox-vs-toggle by effect timing
- [ ] Checkbox labels pass the "yes" test
- [ ] Every input has a visible label with matching `type`/`inputmode`, a `name`, and its `autocomplete` token; paste never blocked
- [ ] Validation approach chosen deliberately; errors above fields; icon + color; on submit `aria-invalid` + `aria-describedby` + focus to the error summary (if one exists) or the first invalid field
- [ ] No error before input; errors clear on the chosen school's trigger (keystroke, blur, or resubmit) and never outlive their cause; failed submit keeps every value; input normalized by field before validating; no error only in a timed toast
- [ ] Nothing asked twice in one process (3.3.7); every login step works with a password manager, autofill, and paste, or offers another method (3.3.8); credentials never trimmed or reformatted; custom Enter handlers skip IME composition
- [ ] Submit guarded while in flight (idempotency key); unsaved edits prompt before leaving, only when dirty
- [ ] One primary button; shape ≥3:1, text ≥4.5:1, ≥48×48pt, ≥8pt apart
- [ ] No disabled buttons — enabled+validate, removed, or locked instead
- [ ] Destructive friction matches severity; red only at confirmation
- [ ] Labels avoid my/your; buttons are verb+noun
- [ ] Platform check: web conventions only — Apple forms routed to apple-design (apple-navigation-design)/hig

## Relationship to other skills

- **error-messages** — owns the failure-state copy this skill's validation flows trigger.
- **user-onboarding** — owns signup-step cutting and which fields exist at all; this skill lays out the fields that survive.
- **ui-voice-and-tone** — owns the overall voice; this skill carries only form-label/button-text crumbs.
- **[web-accessibility](web-accessibility.md)** — owns contrast floors and accessible-form mechanics in depth; the 3:1 / 4.5:1 / 48pt specs here are Dannaway's working subset.
- **`apple-design`** (apple-navigation-design) + **hig** — own Apple-platform forms, sheets, and destructive confirmations. Never cross-apply Dannaway's left-aligned buttons or sentence-case-everywhere to Apple platforms.
- **linear-settings-copy** — owns settings rows and settings IA.

## Staleness

Durable: single-column momentum, interaction-cost reasoning, friction ladder, positive phrasing, disabled-button alternatives. Decays: exact WCAG numbers track 2.1 AA (recheck against current WCAG and [`web-accessibility`](web-accessibility.md)); 48pt target and OS alignment conventions are 2024 snapshots; component fashions (steppers, toggles) evolve faster than the selection logic behind them.
