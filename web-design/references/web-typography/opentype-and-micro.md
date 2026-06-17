# OpenType features & micro-typography

CSS recipes and character craft, almost entirely from Rutter, *Web Typography* (2017), part 'Typographic Detail' (with Latin, *Better Web Typography*, Part II corroborating). Quotes verified against the source.

## Contents

1. The cardinal rule: `font-variant-*` over `font-feature-settings`
2. Numerals (old-style, lining, tabular, proportional)
3. Small caps and all-small-caps
4. Subscripts and superscripts
5. Ligatures (common, discretionary, historical) + the letterspacing interaction
6. Kerning
7. Swashes, alternates, stylistic sets
8. Feature-tag reference table
9. Micro-typography characters: dashes, quotes, primes, spaces, ellipsis, accents, math
10. Hanging punctuation
11. UTF-8 over entities

## 1. The cardinal rule

Always prefer the high-level `font-variant-*` properties. `font-feature-settings` is low-level and **overrides itself** — reapplying it anywhere discards every inherited feature tag not repeated in the new declaration (set `onum` on body, then `"dlig" 1` on a class, and old-style numerals silently turn off there). Rutter's legacy-bridge pattern (mostly unnecessary today — see SKILL.md §12):

```css
body { font-feature-settings: "liga" 1; }
@supports (font-variant-ligatures: common-ligatures) {
  body {
    font-feature-settings: normal;
    font-variant-ligatures: common-ligatures;
  }
}
```

Sibling rule: **"Automate character substitution whenever possible"** — smart quotes, dashes, ellipses belong in the CMS/build pipeline, not in authors' heads.

## 2. Numerals

Forms: **old-style** (lowercase-like, ascending/descending: 1234567890-as-words) vs **lining** (cap-height, even); each in **proportional** or **tabular** widths.

- **Old-style in running text** (Rutter, 'Use old-style numerals in running text'): "Just as a string of capital letters in the middle of a sentence SHOUTS at your reader, so numbers set in lining numerals call undue attention to themselves. **Are pounds, dollars, dates and quotas really more important than the words and ideas which give them context and meaning?**" Inherit from the body:

```css
body { font-variant-numeric: oldstyle-nums; }   /* legacy tag: "onum" */
```

- **Lining in headings** and anywhere readers scan/compare numbers (lists, tables, data): `font-variant-numeric: lining-nums;` (`lnum`). Old-style numerals "replicate the patterns of words in running text" — which is exactly wrong for data.
- **Tabular lining in tables of numbers**: `font-variant-numeric: lining-nums tabular-nums;` (`lnum`+`tnum`) so columns align; pair with right-alignment and decimal alignment.
- **Proportional** when you need it back: `proportional-nums` (`pnum`).
- (Modern UI corollary, same mechanism: `tabular-nums` on any dynamically updating number — see `design-craft`.)

## 3. Small caps

"True small caps are not simply capital letters made smaller; they are drawn differently… usually squatter and bolder than equivalently resized uppercase letterforms" — shrunken capitals look "skinny, spindly and generally out of place" (Rutter, 'Use real small caps'). Use for strings of capitals (NASA, UNESCO) that shouldn't SHOUT mid-sentence.

```css
abbr.smallcaps { font-variant-caps: small-caps; }      /* smcp: lowercase → small caps */
abbr.smallcaps { font-variant-caps: all-small-caps; }  /* smcp + c2sc: caps too */
```

Warning: if the font has no small-caps glyphs, `font-variant-caps` makes browsers **simulate** them (shrunken caps — the exact ugliness you're avoiding). Verify the font carries `smcp`/`c2sc` first. Latin (ch. 'Small caps and figures'): fonts with small caps usually carry old-style figures too — use both or neither.

## 4. Subscripts & superscripts

Browser default `<sub>`/`<sup>` styling shrinks and shifts ordinary numerals — wrong weight, wrong position, disturbed line spacing. Real sub/superior glyphs:

```css
sub { font-variant-position: sub; }     /* legacy tag: subs */
sup { font-variant-position: super; }   /* legacy tag: sups */
@supports (font-variant-position: sub) {
  sub { vertical-align: baseline; font-size: 100%; }  /* undo the browser fake only when real glyphs apply */
}
```

Keep the `@supports` guard: unconditionally resetting `vertical-align`/`font-size` gives non-supporting browsers C8H10N4O2. Use for formulas and footnote references ("Reference notes with superscripts").

## 5. Ligatures

Three classes (the type designer decides which is which):

- **Common/standard** (`liga`) — collision-fixers (fi, fl, ff…): on by default per CSS; keep on. `font-variant-ligatures: common-ligatures;`
- **Discretionary** (`dlig`) and **historical** (`hlig`) — decoration: "use them with discretion… avoid using them unless the text you are designing requires a specific historical setting or deliberate sense of pretentiousness (or grandeur, at a push)." Fine in display settings: `font-variant-ligatures: discretionary-ligatures historical-ligatures;`
- **Letterspacing interaction** (Rutter, 'Turn off ligatures if increasing letterspacing'): tracked text must drop ligatures — the ligated pair stays fused while everything else spreads. When letterspacing caps/digit runs or display text, add `font-variant-ligatures: no-common-ligatures;` (or `none` for all).

## 6. Kerning

`font-kerning: normal` enables the font's kern table. Prefer it over `font-feature-settings: "kern" 1` — with the low-level property, applying `letter-spacing` removes kerning; with `font-kerning` it survives.

## 7. Swashes, alternates, stylistic sets

Display-text "hidden gems" (Rutter, 'Make the most of a font's hidden gems'): swashes, stylistic alternates (`salt`), stylistic sets (`ss01`–`ss20`), titling alternates. Swashes are font-specific and indexed, so they go through `@font-feature-values`:

```css
@font-feature-values "Trilogy Fatface" {
  @swash { swirly: 1; swoopy: 2; }
}
h1 { font-variant-alternates: swash(swoopy); }  /* ignored if a fallback renders */
```

Most fonts lack contextual programming — apply alternates to *marked-up individual characters*, or "you would get an unappetising mess instead of a delicious concoction" (Bookmania's Margarita example).

## 8. Feature-tag reference

| Tag | Feature | High-level CSS |
|-----|---------|----------------|
| `liga` | common ligatures | `font-variant-ligatures: common-ligatures` |
| `dlig` | discretionary ligatures | `font-variant-ligatures: discretionary-ligatures` |
| `hlig` | historical ligatures | `font-variant-ligatures: historical-ligatures` |
| `smcp` | small caps | `font-variant-caps: small-caps` |
| `c2sc` | caps → small caps | (with smcp) `font-variant-caps: all-small-caps` |
| `onum` | old-style numerals | `font-variant-numeric: oldstyle-nums` |
| `lnum` | lining numerals | `font-variant-numeric: lining-nums` |
| `tnum` | tabular numerals | `font-variant-numeric: tabular-nums` |
| `pnum` | proportional numerals | `font-variant-numeric: proportional-nums` |
| `sups` | superscripts | `font-variant-position: super` |
| `subs` | subscripts | `font-variant-position: sub` |
| `kern` | kerning | `font-kerning: normal` |
| `swsh` | swashes | `font-variant-alternates: swash(<name>)` |

## 9. Micro-typography characters

**Dashes** (Rutter, 'Don't use a hyphen instead of a dash'):
- En dash (–, `&ndash;`) for ranges: 4–5 minutes, 2005–2016, unspaced (hair space if touching).
- British style: spaced en dashes – like this – for asides; American style: em dashes—separated with *hair spaces*—for asides.
- Em dash (—, `&mdash;`) also for quote attribution and dialogue. Replace typewriter double-hyphens.

**Quotes & apostrophes** ('Use proper and appropriate quotation marks and apostrophes'): always ‘ ’ “ ” in running text — "Being directional they usher along the flow of the text, whereas neutral primes appear as tiny hindering wedges." Separate nested closing quotes with a thin space.

**Primes** ('Use the appropriate punctuation marks'): feet/inches and minutes/seconds take primes, not quotes: 6′ 4″ (`&prime;`, `&Prime;`); a real degree symbol ° (`&deg;`), never a superscript o.

**Ellipsis**: one … (`&hellip;`), never three full stops.

**Spaces** ('There is more than one space'):
- Non-breaking `&nbsp;` — keep "Page 2", initials + surname, "14 March" together; widow prevention in headings.
- Thin space `&thinsp;` (~1/6em) — between nested quote marks; optionally between initials.
- Hair space `&#8202;` (~1/24em) — keep adjacent characters from touching (around em dashes, dashes touching glyphs).
- Narrow no-break space `&#8239;` — initials that mustn't wrap; between numbers and units.

**Accents & math**: "If a word has an accent, use it" — and especially in names. In running text use a real minus (−), not a hyphen; a division sign rather than a slash; don't italicise brackets; keep ampersands plain unless decoration is the point.

## 10. Hanging punctuation

Quote marks and bullets sitting *inside* the measure dent the optical edge. Hang them:

```css
blockquote p { hanging-punctuation: first last; }   /* still Safari-only */
@supports not (hanging-punctuation: first last) {
  blockquote p::before { content: '\201C'; margin-left: -0.83ch; }  /* generated content + negative margin */
}
```

Generated content keeps the marks out of the HTML (and out of text selection). Same idea visually centres display text whose first line starts with punctuation; trailing marks can take a negative-margin `::after`. (Rutter, 'Hang punctuation' and 'Visually centre text or hang punctuation'.)

## 11. UTF-8 over entities

"Use UTF-8 in preference to entities" — declare `<meta charset="utf-8">` and type the real characters (— – ‘ ’ “ ” … ° ′ ″ −) directly; entities are a fallback for invisible/ambiguous characters (`&nbsp;`, `&thinsp;`, `&#8239;`) where a literal would be unreadable in source.
