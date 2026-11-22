# Component docs — one component's entry, written only from its sources

How to draft the documentation entry for a single component from its code, stories, and real call sites, so the usage rules sit next to the examples and nothing is invented. Source: design.how `component-docs` (Arlan Marat, MIT, screened at `148b94c`, 2026-11-14) — see [sources.md](sources.md). Paraphrased. The body's lever "docs as the highest-leverage multiplier" (Booking) and "generate docs from the monorepo so context can't drift" (Atlassian) are the why; this is the how for one entry. Foundation pages and pages that span components are out of scope.

## Operating rule

**Gaps are marked, not filled.** The entry does not judge the design, does not edit the component, and publishes nothing. Every variant, prop, token name, example, and use has a listed source; a planned use says planned. A behavior that looks like a bug is written as it is, followed by a `Defect:` line to the owner stating what goes wrong for the user and the smallest fix.

## Steps

1. Paste the nine headings into the draft, empty.
2. Find the component: code, props type, styles, stories. Record each as a Sources line.
3. Find **two real uses** by call-site search or from the ask.
4. Trace which source gave each example, variant, prop, state, and token. Each disagreement between sources is a Conflicts line with the quoted rule that settles it, or "no rule, not chosen".
5. Fill each section from sourced facts, copying token names and example code character for character.
6. Write usage rules last (shape below).
7. List every judgment call under "Guessed at", one line each.

## The nine headings, in order

The order follows a Geist-style component page: the job and copyable examples first, then variants and states, then API, usage, and accessibility. Take the structure from a reference system, never its values or names. Swap in the team's own format if it has one.

1. **Description** — one sentence on the job the component does, never how it looks. Then one line: import, client or server, source path, registry status. A part also used on its own gets a Parts subsection; a compound component is one entry.
2. **Examples** — the default example first, copied verbatim from a story with its path. With none, the most common real call site, simplified only by dropping unrelated props, labelled as simplified from that path. Then a table of example files: the default, every variant value and state that looks or behaves differently, and one composition inside a parent.
3. **Variants** — one subsection per axis, named after its prop; one line per value with the job it covers. When two values cover the same job, say so. No variant prop → "None" with the reason.
4. **States** — one line per state that exists, saying what the user can do in it. Check default, hover, focus, pressed, disabled, pending, error; drop what it lacks. State precedence goes here when states overlap. Never invent a state or a precedence order to make the section look complete.
5. **Props** — from code only: name, type, default, when to change it.
6. **Usage** — six fixed subsections:
   - *When to use / When not to use:* two to four lines each, phrased as a situation the designer is in, not a property of the component. Each "when not" names the other component.
   - *Rules:* states over time, input methods, focus, feedback, composition, placement, density.
   - *Content:* per copy slot — casing, template, length, forbidden words.
   - *Anti-slop:* what an agent writes by default that this app does not. Find it by giving one fresh agent a task with the component and comparing its code with the real call sites; "not applicable" with the reason when nothing differs.
   - *Limits:* a number set below a measured break, or "needs review (not measured)" and what to measure.
7. **Accessibility** — the native element or primitive underneath, role, operating keys, where focus goes after, the accessible name in every variant, and which facts came from code versus a rendered story.
8. **Tokens** — names grouped by what they control, spelled as the source spells them, read from named references in the styles and never inferred from a raw value.
9. **Related** — components people confuse with this one, each with when to pick it instead.

A section with nothing sourced reads `Not applicable: <reason>`.

## Usage-rule shape

```
- `rule/<component>-<slug>`: When <condition>, <action> instead of <alternative>, because <reason>.
  Evidence: <two call sites | a measurement with its path | a named principle | the person's words>.
  Check: <lint | test | probe | review> <what runs>.
  - Don't: <one line of real code that breaks it>
  - Do: <the fix>
```

- Stable rule IDs let reviews, lint, and the entry cite one thing — the same reason the Vercel pattern in the body asks for named rules.
- **A rule you cannot break with a snippet is cut.** Write the violating snippet and confirm a check or reviewer catches it.
- **Negate the rule;** if the opposite sounds just as fine, sharpen it.
- Sweep every call site: each follows the rule or is a listed exception.

Example of the shape (a toast): *when tone is error, keep the toast until it is closed or its action runs, because Retry is the only path back to the failed request. Evidence: single use, one call site. Check: review. Don't: an error toast with a six-second duration.*

## Stops

| Missing after searching | Why it stops |
| --- | --- |
| The code | Nothing else sources the variants, props, or behavior |
| The variant list (props type or stories) | A guessed list documents a different component |
| Any use, real or planned | Invented uses read like real ones, and readers copy them first |

A props type with no variant prop is an empty list, not a stop. One real use, planned uses, and a deprecated predecessor are marked as such. A stopped run returns the stop, the facts sourced so far by section, and the smallest reply that unblocks it.

## Output and done

The entry, then Sources, Conflicts, Guessed at, and Gates (a question with its default) only where a rule adds one. Save as a draft, clearly marked on line 1. Reply with the path, what the entry covers, up to three questions with defaults, and the next step.

Done when every variant, prop, token, and example has a Sources line; every usage rule has evidence and a Don't line; every conflict is shown; the nine headings are present in order.
