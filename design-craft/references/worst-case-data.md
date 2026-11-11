# Worst-case data: stress-testing a component against realistic extremes

## Contents

- Decision rules
- Method: map, build, toggle, break, report
- Worst-case catalog by value type
- Failure signatures and fixes
- Truncate, wrap, or clamp
- Report format
- Boundaries

*Source: Emil Kowalski's `break-ui` skill and its catalog (github.com/emilkowalski/skills, MIT, rev `715c180`, 2026-11), adapted in this library's words. One practitioner's method; the CSS and `Intl` fixes are standard platform behavior. Provenance: [sources.md](sources.md).*

Use this when asked to stress-test, break, or find edge cases in a component or screen, and as the data half of the Harden move in [refinement-moves.md](refinement-moves.md). Demo data is picked, usually without anyone noticing, to flatter the design: names that fit on one line, counts that need no separator, every optional field filled. This method undoes that choice one field at a time.

## Decision rules

1. **Plausible or schema-backed, never random.** Every worst-case value is either a real pattern (a hyphenated surname, a long corporate email) or the actual limit from the validation schema, database column, or API contract. A 5,000-character string of `a` proves nothing; the designer answers, in the source's words, "that never happens" and stops listening. If no limit exists anywhere, record the field as *unbounded*. That is itself a finding.
2. **Short and missing break more than long.** Long names are the obvious test. What ships broken is the two-letter name, the absent avatar, the count of exactly 1, the empty list, and the translated badge.
3. **"Change the data, not the component."** The worst case enters through the same boundary the demo data does: the fixture, mock, props, or API stub. Editing markup or CSS to force a break tests your edit.
4. **One dataset, many failures, spread across rows.** Row 1 gets the long name, row 2 the long email, row 3 the one-letter name. Real data mixes failures; stacking them all into one row hides which value caused what. The first rows matter most because they are on screen.
5. **Report before fixing.** Some breaks are design decisions (truncate or wrap, hide an empty role or show a dash). List every break with a proposed fix, then stop. Fix only what the user names.
6. **The toggle never ships.** Gate it to the dev environment or a prototype route.
7. **Keep the fixture.** After fixes land, the worst-case fixture stays as the regression check for the next change, unless the user says otherwise.

## Method: map, build, toggle, break, report

**1. Map the surface.** List every rendered value with its source, type, limit, and whether it is optional. Include the ones people forget: header counts, relative timestamps, badge and status text, button labels that come from data, tooltips, avatar images, and the list's own length. Find limits in the validation schema (Zod, Yup, Valibot), migrations, API types, and `maxLength` attributes. Note where frontend and backend disagree: a 50-character input saving to a 255-character column will eventually receive something longer through an import or the API. Done when every value has a source and either a limit or "unbounded".

**2. Build the worst case.** Pick values from the catalog below and assemble one fixture next to the demo data, in the same shape and file conventions. Three cases don't fit a single dataset and still need covering: **empty** (zero items, no results), **one** (a single item, every count at exactly 1), and **huge** (the realistic upper bound; 1,000+ rows if the list is unpaginated, which is a performance break as well as a visual one). Use `example.com`, `example.org`, or `.test` domains so a fixture never points at a real inbox or site.

**3. Wire the toggle.** A segmented control labeled *Demo data / Worst case*, with extra segments for Empty, One, and the huge case. Swap the fixture at the data boundary.

- In a project with a dev server: a URL parameter read where the fixture is chosen, or a prototype route. The selection lives in the URL so a reload keeps it.
- No project: one self-contained HTML file with the component and all datasets inline.
- The control is harness chrome, fixed at bottom-center, plain and neutral. Switching is instant, with no animation on the content. (The same chrome rule governs the variant picker in `design-prototyping`.)

**4. Break it.** View the worst case at the component's **real container width** (a sidebar list is not a full-page list), then at 320px and at the widest supported layout; at 200% browser zoom or a raised root font size, because text grows and fixed boxes don't; and in dark mode and `dir="rtl"` if the product supports them. Screenshot both states at each width when browser tooling exists. When it doesn't, reason from the CSS and say which findings were seen and which were inferred.

**5. Report and stop.** Use the report format below and leave the toggle running. After any requested fix, flip through *every* state again, Demo included: a worst-case fix must not regress the demo.

## Worst-case catalog by value type

Use the rows that match the fields in the map. Example values are illustrative shapes; substitute ones that fit the product's locale and schema.

| Value type | Try | What it tends to break |
| --- | --- | --- |
| **Person name** | Long hyphenated with diacritics (`Aleksandra Wiśniewska-Kowalczyk`); long with a suffix (`… Montgomery III`) | Wrapping, single-line rows, initials (`CI`) |
| | Two letters (`Jo`), one letter (`J`), all lowercase | Empty-looking column, one-character initials, tiny click target, uncapitalized initials |
| | CJK with no spaces (`王秀英`); RTL (Arabic); stacked Vietnamese diacritics | "First + last word" initials, punctuation side without `dir="auto"`, clipping under tight `line-height` |
| | Lowercase particles (`de la Cruz y …`); apostrophes | Initials, "last name" sorting, escaping, search |
| | Emoji first (`🦊 Fox`); ZWJ sequence | `.charAt(0)` returns half a surrogate pair; slicing splits the emoji |
| | Leading, trailing, and doubled spaces; no name at all (email only) | Initials from empty words; the fallback itself |
| **Email, URL, identifier** | Long corporate email; many subdomains with a two-part TLD | No wrap opportunities, so siblings get pushed off the row; "domain" extraction |
| | Shortest realistic (`a@b.co`); plus-addressing | Layout sized for long values looks empty; validation rejecting `+` |
| | Long URL with query string; UUID | Overflow; end-truncation hides the part that differs |
| | File name with version and brackets; camera file name with uppercase extension | End-truncation hides version and extension |
| | Handle at minimum and maximum length | Both extremes of the slot |
| **Labels and copy from data** | Long job title; long status text in a badge | Three-line secondary slot; badge wraps or squeezes the name |
| | German compound (`Benachrichtigungseinstellungen`); French expansion of a short English label | Unbreakable label; translated copy running longer |
| | Twelve tags on one item; one tag wider than its container | Tag wall with no `+N` overflow |
| | Empty string, whitespace-only, `Untitled` | Collapsed heading, zero-height row |
| | `<script>…</script>`, `&amp;`, `**bold**` | Escaping: must render as literal text |
| | Newline inside a single-line field; a 2,000-character pasted description | Doubled row height or silent drop; clamp, "show more", textarea growth |
| **Numbers and money** | `0`, `1` | Zero states, division by zero in percentages, "1 members" |
| | `1284`, `1000000`, eight-digit currency | Missing separator, badge width, overflowing totals column |
| | Negative; `0.1 + 0.2`; `142%` and `-3%` | Sign and color logic; raw float; meters past their bounds |
| | `null`, `undefined`, `NaN` | Rendered literally |
| | Same number in `de-DE` and `en-US`; a live change `99` → `100` | Hardcoded separators; width jump without tabular figures |
| **Collections** | 0 items; 1 item | Whether an empty state exists; grids that look broken with one card |
| | Exactly page size, and page size + 1 | Off-by-one counts, an empty page 2 |
| | 1,000+ unpaginated; one item 10× the others; identical names | Scroll and render cost; rows stretched to the tallest item; nothing to tell items apart |
| **Time** | Now; 12 days, 11 months, 3 years ago; a future date | "0 seconds ago"; relative-time thresholds; "-3 days ago" |
| | `1970-01-01`; a late-evening timestamp with an offset; a very long duration | Zero timestamp shown as real; different day in UTC vs local; hours that never roll up to days |
| **Images and media** | Avatar URL that 404s; no avatar | Broken-image icon; fallback parity with real avatars |
| | 4000×200 and 200×4000 images | Distortion without `object-fit: cover`; blown-out card height |
| | Transparent or dark logo in dark mode; slow-loading image | Invisible mark; layout shift without dimensions or `aspect-ratio` |
| **States** | Loading; API error | Skeleton that doesn't match final layout; raw error text |
| | Partial data across rows; every enum status in one list | Misaligned rows; varying badge widths |
| | No permission; the current user appearing in the list | Disabled actions changing row layout; actions that shouldn't apply to yourself |
| **Environment** | 320px; a 280px sidebar placement; 2560px | Every overflow at once; a full-width component reused narrow; stranded content |
| | 200% zoom or large text; dark mode; `dir="rtl"`; touch | Fixed heights clipping text; hardcoded colors; icon and action order; hover-only actions unreachable |

Arabic-script digit, date, and bidi handling → `web-design` (web-layout-design), which already owns it.

## Failure signatures and fixes

Each of these is visible in a screenshot, and the listed cause is nearly always the right one.

| What you see | Cause | Fix |
| --- | --- | --- |
| Avatar or icon squashed into an oval | Flex child shrinking | `flex-shrink: 0` on every fixed-size box |
| Text overflows instead of wrapping or truncating | Flex/grid child keeps `min-width: auto` | `min-width: 0` on the text column; `minmax(0, 1fr)` in grid |
| Email or URL runs past the edge | No break opportunity | `overflow-wrap: anywhere` on that element |
| Trailing action pushed off-screen | Middle content took all the space | `min-width: 0` on the middle, `flex-shrink: 0` on the action |
| Badge wraps to two lines | Badge allowed to shrink | `white-space: nowrap; flex-shrink: 0`, then decide what yields instead |
| Avatar adrift beside a three-line name | `align-items: center` on rows of varying height | Top-align once text can wrap |
| Last row cut off mid-glyph | Fixed-height container, no scroll affordance | Visible scrollbar or fade mask; confirm the `overflow` is intended |
| Heading breaks mid-word | `word-break: break-all` | `overflow-wrap: anywhere`, which breaks only when it must |
| Wrong initials (`J`, `CI`, `�`) | `.split(' ')[0][0]`-style code | Grapheme clusters via `Intl.Segmenter`, first + last word, icon fallback |
| Orphaned dash or blank line for a missing field | Placeholder rendered for an optional value | Omit the line, or reserve its height on purpose |
| "1 members", "0 member" | Hardcoded plural | `Intl.PluralRules`, or separate strings per count |
| Numbers jitter or columns misalign | Proportional figures | `font-variant-numeric: tabular-nums` |
| `1284`, long float tails, `NaN`, `undefined` | Raw number rendered | `Intl.NumberFormat` with the user's locale; guard null |
| Translated button label overflows | Fixed-width button | Width from content plus `min-width` |
| Diacritics or tall scripts clipped | Tight `line-height` with `overflow: hidden` | Looser `line-height`, or no clipping on text boxes |
| Broken-image icon in the avatar | No error fallback | Fall back to initials; `object-fit: cover` |
| Truncated text with no way to read it | Ellipsis and nothing else | The full value in a detail view or expandable row, plus a tooltip that also opens on keyboard focus and touch (`title` alone reaches neither) |
| 1,000 rows stutter | Every row rendered | Virtualize or paginate, and say which |
| Raw `<b>`, `&amp;`, or `**text**` on screen | Wrong escaping layer | Escape once, at render; never inject user data as HTML |

Relative and absolute time come from `Intl.RelativeTimeFormat` and `Intl.DateTimeFormat`, never hand-built strings.

## Truncate, wrap, or clamp

Every long string forces this choice. Make it per field, never globally.

- **Wrap** what the user needs in full to identify a thing: names, titles in a detail view. Two lines is fine. Four means the column is too narrow.
- **Truncate at the end** when the start carries the meaning: role, description, message preview. Always pair it with a way to read the full value.
- **Truncate in the middle** when items differ at the *end*: file names, emails sharing a long domain, paths, hashes. End-truncation makes them look identical.
- **Clamp** to a line count for multi-line previews in cards, so card heights stay predictable.
- **Never truncate** numbers, amounts, dates, or anything the user compares.

## Report format

1. **What broke.** One row per break, worst first: severity, field, the worst-case value, what happens, the fix, and the `file:line` where the fix goes. Three severities:
   - *Broken*: content unreadable, an action unreachable, or wrong data shown.
   - *Ugly*: readable but visibly wrong (squashed avatar, wrapped badge).
   - *Fragile*: fine today, one realistic step from breaking (no limit, no fallback).
2. **Decisions for you.** Breaks with more than one right answer: truncate vs wrap, what an empty role shows, paginate vs virtualize. One line each with a recommendation and its reason.
3. **What held up.** The worst cases the component already survives. This shows the test was real and tells the user what not to touch.

Close with where the toggle lives and which states it has. Keep the tone matter-of-fact: the component was built against kind data, which is how nearly everything gets built. A short report on a sturdy component is a good result.

## Boundaries

- Reflow thresholds, logical properties, RTL mirroring, and Arabic-script data → `web-design` (web-layout-design). This file supplies the data and the diagnosis table; that one owns the layout rules.
- Network failures, status-code states, double submission, and interrupted gestures → the Harden move in [refinement-moves.md](refinement-moves.md).
- Empty-state content and first-run design → `user-onboarding`. Error wording → `ux-writing` (error-messages).
- Redesigning the component, or comparing alternative directions → `design-prototyping`.
