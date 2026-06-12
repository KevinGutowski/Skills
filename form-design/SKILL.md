---
name: form-design
description: "Design web forms — the Dannaway method: single column, field types, 3 button weights, destructive friction. Use for web forms, confirm dialogs, or buttons. Failure copy → error-messages; signup → user-onboarding; Apple forms → apple-navigation-design. Triggers: form layout, radio vs dropdown, checkbox vs toggle, disabled button, destructive action, multi-step form."
---

# Form Design (Practical UI)

Form structure, field selection, buttons, validation, and destructive-action friction from Adham Dannaway, *Practical UI*, 2nd ed. (2024) — a single-source method skill: attribute guidance to Dannaway. Fuller rationale, the nine button failure modes, and validation tradeoffs live in [references/practical-ui-details.md](references/practical-ui-details.md).

## Platform scope — read first

Dannaway's conventions are **web-scoped**. Two known conflicts with Apple platforms — never cross-apply:

- **Button alignment.** Dannaway left-aligns buttons everywhere, ordered "from left to right, most important to least important" (he acknowledges right alignment is "a familiar pattern used widely on operating systems like Mac OS"). Apple platforms put the primary action on the right. For Apple-platform forms, sheets, and confirmations, route to `apple-navigation-design` and `hig`.
- **Capitalization.** Dannaway: sentence case everywhere — title case "is also harder to read, as the capital letters of each word interrupt scanning." Apple uses title case for many controls; follow `hig` conventions on Apple platforms.

## 1. Form architecture

- **Single column.** "Stack forms in a single column layout, as it decreases interaction cost by maintaining a consistent downward momentum." Less cognitive load, fewer missed fields (screen-magnifier users can miss a second column). Exception: short related fields (expiry date + CVC) side by side within the column's bounds.
- **Labels stacked on top of inputs** — never to the left. Stacked closely, "your eyes can see both the label and input in a single focus." Stack checkboxes and radios vertically too.
- **Hints ABOVE fields, not below.** Two reasons, and the rationale is the lesson: (1) it preserves downward momentum — "If a password needs to be at least 6 characters long, tell people before they fill out the password field, not after"; (2) "the space below form fields can be covered by autofill menus and on-screen keyboards."
- **No placeholder-as-label.** It disappears on typing, makes fields look pre-filled, and its contrast is "almost always inaccessible." (Exception: single search fields with ≥4.5:1 placeholder contrast and an accessible label.)
- **Mark BOTH required and optional fields.** Asterisk * or "(required)" for required; "(optional)" for optional. "All fields are required unless marked optional" instructions get skipped while scanning. Don't color asterisks red — "red commonly indicates an error." Skippable only for short familiar forms (login, single-field subscribe).
- **Opt-ins over optional fields.** Replace an optional field with a checkbox that reveals a required field: `☐ Receive updates via text message` → on check, `Mobile number *`. "Those who aren't interested in receiving updates don't need to see the extra mobile number field."
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

## 3. Validation

Three approaches — pick deliberately, mix per question type (full tradeoffs in [references/practical-ui-details.md](references/practical-ui-details.md)):

1. **Validate on submit** — simplest to build; user works undistracted; but errors arrive all at once, context lost. List errors at the top as links to the invalid fields; error message *above* each invalid field (autofill/keyboard cover the space below); red border + shade **plus an icon** — never color alone.
2. **Validate after leaving a field** (inline / "on blur") — immediate feedback with context; but interrupts flow, "doesn't work well for groups of inputs," more complex. Remove the error as soon as it's fixed.
3. **Validate instantly as people type** (after a pause) — best for working toward an answer (password criteria, username availability); risk of "premature error messages."

Error message *copy* itself → `error-messages`.

## 4. Buttons

**Three weights:** primary (solid brand fill, white text — exactly one per screen: "If everything is considered important, then nothing stands out as the most important"), secondary (outlined, brand-color text/border — also for multiple equal-importance actions), tertiary (underlined text link — for least important and for de-emphasizing destructive actions). Hierarchy must not depend on color alone.

**Accessible specs (WCAG 2.1 AA framing):**
- "The contrast ratio of the button shape must be at least 3:1"
- "The button text contrast ratio must be at least 4.5:1"
- Identical-style buttons need ≥3:1 contrast *between* them
- Target "at least 48pt by 48pt" (aligns to the 8pt grid; above WCAG's 44pt) and "separate them by at least 8pt" (Dannaway personally uses 16pt)

**The 9 failure modes** (his nine "problematic" button examples, condensed — full list in references): ① secondary fill <3:1 against background; ② light-grey secondary reads as disabled (+ low text/border contrast); ③ primary/secondary identical styles differing only by color; ④ similar styles + low text contrast; ⑤ identical styles <3:1 apart; ⑥ tertiary border <3:1; ⑦ tertiary distinguished by color alone — looks like plain text; ⑧ inconsistent shapes ("Elements that function the same should look the same"); ⑨ ambiguous hierarchy — primary and secondary with similar visual weight.

**Disabled-button avoidance playbook.** Disabled buttons strand users (no feedback why), are low-contrast, and aren't keyboard-focusable. In order of preference:
1. **Enable + validate:** "Instead of disabling the submit button, enable it and display error messages on submit."
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

Corroborated by Wathan & Schoger, *Refactoring UI*: a destructive action that isn't the page's primary action gets secondary/tertiary treatment — "Combine this with a confirmation step where the destructive action actually is the primary action, and apply the big, red, bold styling there." Red belongs in the confirmation, not the entry point. Apple destructive confirmations (action sheets, red menu items) → `apple-navigation-design`.

## 6. Copy crumbs that ride along

- **The my/your rule:** "Avoid using the word 'my' on form labels" — the interface is the speaker, so "My email" reads as *its* email. "Your" is clearer "but unnecessary in most cases" — just "Email". Never mix my and your.
- **Button text = verb + noun**, meaningful out of context: "Save post", "Discard message", "Edit article" — never "Ok". Screen-reader users jump straight to buttons.
- No instructional verbs in labels ("Type your email" → "Email").
- Broader voice system → `ui-voice-and-tone`; this skill's copy rules stop at form labels and button text.

## Checklist

- [ ] Single column; labels stacked on top; related short fields may share a row
- [ ] Hints above fields; no placeholder-as-label
- [ ] Both required (*) and optional ("(optional)") marked; asterisk not red
- [ ] Optional fields replaced by opt-in checkboxes where possible
- [ ] Field types: radio ≤~10 / autocomplete / stepper / checkbox-vs-toggle by effect timing
- [ ] Checkbox labels pass the "yes" test
- [ ] Validation approach chosen deliberately; errors above fields; icon + color
- [ ] One primary button; shape ≥3:1, text ≥4.5:1, ≥48×48pt, ≥8pt apart
- [ ] No disabled buttons — enabled+validate, removed, or locked instead
- [ ] Destructive friction matches severity; red only at confirmation
- [ ] Labels avoid my/your; buttons are verb+noun
- [ ] Platform check: web conventions only — Apple forms routed to apple-navigation-design/hig

## Relationship to other skills

- **error-messages** — owns the failure-state copy this skill's validation flows trigger.
- **user-onboarding** — owns signup-step cutting and which fields exist at all; this skill lays out the fields that survive.
- **ui-voice-and-tone** — owns the overall voice; this skill carries only form-label/button-text crumbs.
- **web-accessibility** — owns contrast floors and accessible-form mechanics in depth; the 3:1 / 4.5:1 / 48pt specs here are Dannaway's working subset.
- **apple-navigation-design** + **hig** — own Apple-platform forms, sheets, and destructive confirmations. Never cross-apply Dannaway's left-aligned buttons or sentence-case-everywhere to Apple platforms.
- **linear-settings-copy** — owns settings rows and settings IA.

## Staleness

Durable: single-column momentum, interaction-cost reasoning, friction ladder, positive phrasing, disabled-button alternatives. Decays: exact WCAG numbers track 2.1 AA (recheck against current WCAG and `web-accessibility`); 48pt target and OS alignment conventions are 2024 snapshots; component fashions (steppers, toggles) evolve faster than the selection logic behind them.
