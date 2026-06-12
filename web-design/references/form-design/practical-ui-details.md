# Practical UI — verified detail

Source: Adham Dannaway, *Practical UI*, 2nd ed. (2024), chapters 7 (Buttons) and 8 (Forms), plus chapter 6 (Copywriting) for the label rules. All quotes verified against the text. Web-scoped — see SKILL.md platform scope.

## Contents

- The 9 button failure modes (full)
- Button alignment rationale (incl. the dialog-box debate)
- Disabled-button alternatives (full)
- Validation: three approaches with full tradeoffs
- Multi-step form tips
- Autocomplete and stepper tips
- Required/optional marking nuances
- Icon + text pairing

## The 9 button failure modes (full)

Dannaway walks through nine "problematic" button-set examples to avoid, judged against WCAG 2.1 AA:

1. **Secondary fill <3:1 against the background.** "User interface components like form fields, buttons, and tabs, need to have a colour contrast ratio of at least 3:1." The fill isn't decorative — "The fill is needed to identify the secondary button as a button." Fix: add a high-contrast border.
2. **Light-grey secondary.** "Could be mistaken as being unavailable or in a disabled state due to its light grey colour"; its text misses 4.5:1 and its border misses 3:1.
3. **Primary and secondary share one style, differing only by color.** Hierarchy confused; colorblind users can't tell them apart; contrast between the buttons <3:1.
4. **Similar style + lack of contrast** between primary and secondary, plus secondary text below 4.5:1.
5. **Identical styles <3:1 apart** — contrast between buttons is the only differentiator. "Buttons should have a clear visual hierarchy that isn't reliant on colour."
6. **Tertiary border below 3:1** (and styles too similar overall).
7. **Tertiary indicated by color alone** — "colour is the only indicator that it's interactive," so it reads as plain text to colorblind users. Hence the underline on tertiary buttons.
8. **Inconsistent shapes.** "Why are the primary and secondary button shapes different…? Do they function differently? Elements that function the same should look the same."
9. **Ambiguous hierarchy** — "the primary and secondary buttons have similar visual weight or prominence," plus a sub-3:1 secondary background.

Recommended default styles: primary = rounded rectangle, solid brand fill, white text; secondary = unfilled with brand-color border and text (avoid light-grey fills — disabled lookalike; avoid other solid fills — conflicts with primary); tertiary = underlined brand-color text (underline so colorblind users can tell it's interactive).

Spacing: "Make sure there's sufficient space between buttons so people don't mistakenly press the wrong one. I usually use 16pt to be safe" (8pt is his floor).

## Button alignment rationale (web)

Order left to right, most → least important:
- "English is read from left to right, downwards in an F-shaped pattern. People naturally look to the left edge as they move down the screen."
- "Right aligned buttons can be missed on larger screens and by those using screen magnifiers."
- The most-used button placed first decreases interaction cost.
- Mobile: stack top to bottom, most → least important, full-width (one-handed reach for left- and right-handers).

**Small dialog boxes — the honest debate.** Dannaway left-aligns "for consistency" but concedes "Right alignment can work well too, as long as buttons have a clear visual hierarchy." For right: forward/backward momentum mapping, and "It's a familiar pattern used widely on operating systems like Mac OS." For left: Windows-OS/web familiarity and product-wide consistency. (Apple platforms: follow Apple — `apple-design` (apple-navigation-design).)

**Multi-step forms.** Right-aligned primary + bottom-left Back is problematic: prominent Back invites mis-clicks that "lose the data they just entered"; the primary lands further from the fields. Instead keep the primary left-aligned and "Put a tertiary 'Back' button at the top left of the form" — matching browser/breadcrumb convention and letting people go back without scrolling to the bottom.

**Exception:** single-field forms (search, email subscribe) attach the primary button to the field's right "to save space" and reinforce the field-button relationship.

## Disabled-button alternatives (full)

Why disabled buttons fail: "They can cause people to get stuck, as they generally don't provide feedback on why they're not actionable"; "Their low contrast makes them hard for those with poor eyesight to see"; "They're not keyboard accessible."

1. **Enable + validate on submit.** "Instead of disabling the submit button, enable it and display error messages on submit." His example: a user misses the first payment field and is "stuck wondering why they can't press the pay button"; the enabled button "instantly makes them aware that they missed the first field."
2. **Remove unavailable actions** "and letting people know why they're unavailable" — e.g., a private profile shows only "Request follow" plus an explanation, not disabled Message/Call buttons.
3. **Lock icon on a regular button** — keeps actions discoverable at full contrast; "works especially well for premium features." Pair with a message near the buttons or shown on press.
4. **If you must disable:** message near the button ("You need to fill out all fields to register"), a tooltip explaining why and what to do, and keep the button keyboard-focusable so assistive tech can trigger the tooltip.

## Validation: three approaches, full tradeoffs

"There are 3 main approaches to validate forms": validate on submit; validate after people leave a field; validate instantly as people type. "The first is the simplest and easiest to design and build. Each subsequent approach becomes more complex" — and approaches can be mixed per question type.

### 1. On submit
- Display the error message **above** the invalid field — "The space below form fields can be covered by autofill menus and on-screen keyboards."
- Red border + background shade + **icon** ("Never rely on colour alone").
- Multiple errors: count them and list them at the top of the form; "Make the listed errors links that take people to the corresponding invalid field."
- "Don't disable the submit button."
- Advantages: simple; "Allows people to focus on form completion without distractions."
- Disadvantages: no in-progress feedback; "People could be overwhelmed and frustrated by facing multiple errors all at once"; users re-navigate the form having lost context; useless "when someone requires help creating a password that meets specific criteria."

### 2. After leaving a field (inline / "on blur")
- "Remove the error message once the error has been resolved" (which itself requires as-you-type validation).
- Advantages: immediate feedback; "People can fix errors faster while they still have context"; can confirm correct input positively.
- Disadvantages: distracting switching between answering and fixing; "It doesn't work well for groups of inputs, such as a list of checkboxes"; relatively complex.

### 3. Instantly as people type
- Wait for a typing pause before validating, "to help prevent premature error messages."
- Advantages: "It helps people work toward an answer. For example, creating a password that needs to meet certain criteria or checking if a username is available"; immediate feedback with context.
- Disadvantages: "Premature error messages can frustrate people… Since people type at different speeds, it's difficult to know when they've finished typing"; complex.

## Multi-step form tips

- Tell people up front how long the form takes and what they'll need.
- "Break up a 30 question form into 6 steps of 5 related questions, rather than 30 steps."
- "Order questions from easiest to hardest so people achieve early wins."
- Show progress ("Step 2 of 3") — motivation rises near the end (Goal-Gradient Effect).
- Provide a review-and-change step before submit; after submit, show success + what happens next.
- Can't split a long form? "Group related fields together under headings."

## Autocomplete and stepper tips

**Autocomplete** (vs long dropdown): for fields where "people know what they're looking for" (country of birth, a product). Keep suggestions to ~10 or fewer (choice paralysis); "Highlight the differences between suggestions in bold." When people must *browse* instead, split one long dropdown into two (industry → occupation).

**Steppers:** the guest-count example — 2 adults, 1 child, 1 infant costs "6 clicks plus 3 scrolls" with dropdowns, "only 4 clicks" with steppers. Buttons ≥48×48pt, laid out horizontally (more separation), "+/−" rather than up/down chevrons (which read as dropdown/accordion). "Steppers aren't suitable for making large numeric changes."

## Required/optional marking nuances

- Why both: "instructions are often skipped, as people scan an interface… Marking both required and optional fields is an accessibility requirement for screen reader users, so it makes sense to do the same for sighted users."
- Asterisk: concise and familiar, lets people scan how much work remains; still include "Required fields are marked with an asterisk *" at the top; "Avoid colouring the asterisks red, as red commonly indicates an error."
- "(required)" in words: "crystal clear," needs no top-of-form instructions — "Sure, it adds clutter, but it's clearer."
- Skip marking only when: no optional fields exist in the product; short familiar forms (login, single-field subscribe); one-question-per-screen flows with explained purpose; or usability testing validates it.

## Icon + text pairing (buttons)

Match icon weight/thickness and size to the text. When you can't, balance by **contrast**: drop the icon's contrast (e.g., a weaker stroke color) so an oversized icon doesn't outshine its label.
