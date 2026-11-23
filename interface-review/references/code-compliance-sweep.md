# Code Compliance Sweep: tested grep commands

*Scope: the ripgrep commands for the "grep first" step of [code-pass-checklist.md](code-pass-checklist.md). That checklist owns the rules, their owners, the severity map, the disagreements with Vercel's guidelines, and the output format; this file only finds candidates. It was a second full write-up of the same source until the two were reconciled on 2026-11-22, when everything but the commands was cut in favor of the checklist.*

## Contents

- How to use the commands
- Commands
- What a command cannot tell you

## How to use the commands

Run the ones that match the files under review, then confirm each hit in context as the checklist says. A hit is a candidate. Whether it is a finding is the owner's rule, named in the third column, and for anything about computed names, focus, or rendering it is decided in a browser (`browser-verification`), not from markup.

Patterns are ripgrep, written against `src/`: replace it with the project's source directory and add `-g` globs for its extensions. Always give the first `rg` a path. Without one, ripgrep reads standard input whenever that is not a terminal, which is the normal case inside an agent's shell, and prints nothing (reproduced here: no path, exit 1 and no output; with a path, the hit). Inside this table a pipe is written `\|` so the table renders; type a plain pipe in the shell. They were run on 2026-11-18 against a 394-file React and Tailwind monorepo (vercel-labs/json-render at `9301e64`); three were tightened from that run. Each returns candidates to read, not verdicts. This table does not say what makes a candidate a finding: that is the owner's rule, named in the third column, and for anything about computed names, focus, or rendering it is decided in a browser, not from markup. Earlier versions restated the owners' rules in this column and got them wrong (accessible names, locale formatting), so the column now carries only the owner and what the pattern cannot see. The patterns are exercised by `scripts/test_sweep_patterns.py` against small hit and miss fixtures; add a fixture when you change one.

| Flag | Pattern | Owner and pattern limits |
| --- | --- | --- |
| Zoom disabled | `rg -n 'user-scalable\s*=\s*(no\|0)\|maximum-scale\s*=\s*1(\.0)?\b' src/` | `web-design` (web-accessibility). Any hit is a finding |
| Paste blocked | `rg -n -A4 'onPaste\|"paste"' src/ \| rg preventDefault` | `web-design` (form-design) |
| `transition: all` | `rg -n 'transition:\s*all\|transition-all\|transition-property:\s*all' src/` | `web-design` (web-animation-design). Report once, at the shared primitive |
| Focus ring removed | `rg -n 'outline-none\|outline:\s*(none\|0)' src/` | `web-design` (web-accessibility). Read every hit; no same-line filter is offered because each one tried hid real candidates. Whether a replacement indicator is visible is a browser question (`browser-verification`, keyboard read) |
| `:focus` where `:focus-visible` belongs | `rg -n ':focus\b[^-]\|\bfocus:(ring\|outline\|shadow)' src/` | `web-design` (web-accessibility) |
| Click handler on a non-control | `rg -U --count-matches '<(div\|span\|li\|td\|tr\|img\|svg)\b[^>]*?onClick' src/`, then `-nU` per file | `web-design` (web-accessibility). Count matches, not lines; misses elements with an arrow function in an earlier attribute |
| Navigation without a link | `rg -n 'onClick=\{[^}]*(router\.push\|navigate\(\|location\.(href\|assign))' src/` | `web-design` (web-accessibility) |
| Image without dimensions | `rg -nUP '<img\b(?![^>]*\bwidth=[^>]*\bheight=)(?![^>]*\bheight=[^>]*\bwidth=)[^>]*>' src/` | `web-design` (web-performance). Matches an image missing either attribute; framework image components and CSS `aspect-ratio` are outside the pattern |
| Icon-only button without a name | `rg -nU '<(button\|Button)\b(?:[^>]\|=>)*>\s*<(svg\|[A-Z]\w*)\b[^>]*/>\s*</(button\|Button)>' src/` | `web-design` (web-accessibility). Whether the button has a name is read from the accessibility snapshot (`browser-verification`), not from the markup. Matches only buttons whose single child is one self-closing element |
| Control without a label | `rg -n '<(input\|select\|textarea)\b' src/` | `web-design` (web-accessibility) and (form-design). Lists every control, including hidden inputs, which need no name. The computed accessible name comes from the snapshot; a control named only by `title` or `placeholder` has a name and no visible label, which is a different finding |
| Hand-built dates and numbers | `rg -n 'getMonth\(\)\|getFullYear\(\)\|toFixed\(\|MM/DD\|YYYY' src/` | `web-design` (web-layout-design), locale rules. The pattern finds hand-assembled formats; locale-aware calls are not matched and not findings |
| `autoFocus` | `rg -n -i '\bautofocus\b' src/` | `web-design` (mobile-web-native-feel) |
| Animated GIF | `rg -n '\.gif\b' src/` | `web-design` (web-performance) |
| Three-dot ellipsis | `rg -n "[A-Za-z]\.\.\.['\"<]" src/` | `web-design` (web-typography). Visible strings only |
| Motion with no reduced-motion path | `rg -c 'prefers-reduced-motion\|motion-reduce\|useReducedMotion' src/` against `rg -c '@keyframes\|animate-\|transition' src/` | `web-design` (web-animation-design). File counts only: zero files on the left with many on the right is one systemic candidate. What actually moves under reduced motion is a browser question (`browser-verification`) |
| Gesture-only action | `rg -n 'onPointerMove\|onTouchMove\|useDrag\|onDrag\|onPan\b' src/` | `web-design` (web-animation-design, gestures) and (web-accessibility) |
| Overflow hidden as a fix | `rg -n 'overflow-x-hidden\|overflow-x:\s*hidden' src/` | `web-design` (web-layout-design). House flag, the reverse of upstream; see conflicts |
| Sheet or modal that chains scroll | `rg -n -i 'dialog\|drawer\|sheet\|modal' -l src/` then `rg -n 'overscroll' src/` in those files | `web-design` (mobile-web-native-feel). Confirm on a device |
| Unvirtualized list | `rg -n '\.map\(' src/` in list and table components | `web-design` (web-performance). Finds every `.map(`; the question is what bounds the array |

Rules with no reliable pattern (heading order, long-content handling, URL state, destructive friction, hover states, copy) are found by reading the components in scope.

## What a command cannot tell you

- A clean result proves only that these patterns are absent from the files searched.
- Multi-line patterns miss elements written in ways the pattern did not anticipate; the third column lists the known misses.
- Nothing here sees runtime behavior. Whether a focus ring is visible, a control has a computed name, or motion is reduced goes to `browser-verification` and is reported as not verified until checked there.
