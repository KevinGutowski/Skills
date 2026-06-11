# Rutter's guideline index — "If you read nothing else, read this"

Richard Rutter closes *Web Typography* (2017) with a complete index of the book's named guidelines, grouped by the book's parts. This file distills that index: every guideline name, with a one-line gloss where the name alone doesn't carry the rule. "These are not rules and you should not take them as such. But if you do work around these guidelines, do so knowingly and with good reason."

His final advice — **Don't trust computers**: "don't trust browser defaults – use your own judgement… If you find yourself using a browser's default value for text size, or line spacing, or width, or margin, or colour… then question it."

## Contents

1. We are all Typographers (4 guidelines)
2. Setting Type to be Read (31)
3. Typographic Detail (~85): characters · OpenType · hierarchy & scale · paragraphs & openings · emphasis & numerals · tables · tracking · display text · rhythm & layout
4. Choosing and Using Fonts (~50): rendering · requirements · describing & choosing · combining · loading

## 1. We are all Typographers

- **Good typography induces a good mood** — Larson & Picard 2005: perceived reading speed and mood improve even when actual speed doesn't.
- **Learn to relinquish control** — the reader, not the designer, controls the medium.
- **Know what you are designing and for whom**
- **Honour the text, don't dominate it**

## 2. Setting Type to be Read

- **We read in hops, skips and jumps… and pauses** — saccades and fixations, not smooth scanning; set type for the way eyes actually move.
- **Use rems for global sizing; use ems for local sizing**
- **Choose a comfortable measure** — 45–75 characters, ~66 ideal; ≈23–38em.
- **Lean on six centuries of typesetting experience**
- **Set text for mobile first**
- **Use a liquid setting** — widths in relative units so text reflows.
- **Use the default font size for paragraphs** — 16px browser default is the *starting point*, not a cage.
- **Take small print into account** — if small print becomes illegible one step down, raise the body size.
- **Adjust the font size if the typeface requires it** — small x-height or diacritic-constrained fonts (Calibri) need upsizing.
- **Use rems to size your text**
- **Line height should suit text size and measure**
- **Use unitless values to set line-height**
- **Increase line spacing from the browser default** — `normal` ≈ 1.2 is too tight on screens; start at 1.4.
- **Adapt the line spacing to suit the typeface** — darker/heavier faces need more.
- **Justify well or not at all; if in doubt, align left**
- **Don't justify the final line of a paragraph**
- **Don't justify without hyphenating**
- **Hyphenate judiciously and with care** — `hyphens: auto` plus correct `lang`.
- **Limit the number of consecutive hyphenated lines** — `hyphenate-limit-lines: 2`; 3+ is a "ladder".
- **Limit the word length and the number of characters before and after a hyphen** — `hyphenate-limit-chars: 6 3 2`.
- **Reduce hyphenation by setting a hyphenation zone** — `hyphenate-limit-zone: 8%` for ragged text.
- **Avoid leaving the stub of a hyphenated word as the last line of a paragraph** — `hyphenate-limit-last: always`.
- **Don't centre long passages of text**
- **Adapt your design to the reading context**
- **Use ems rather than pixels to determine the screen width** — media queries in ems respect zoomed text.
- **Adjust type size according to reading distance** — arcminutes: phone ~16px, laptop/tablet 18–19px, large desktop ~22px.
- **Calculate text sizes for different devices**
- **Keep your big text under control**
- **Beware of the tablet problem** — bed/knee/breakfast reading distances are undetectable; test all three.
- **Test your design in a responsive prototype** — a single live page of real content, styled up gradually.
- **Stepping back and squinting are no substitute for reading**

## 3. Typographic Detail

### Characters (see opentype-and-micro.md for recipes)
- **There is more than one space** — nbsp, thin, hair, narrow no-break.
- **If a word has an accent, use it** / **Pay particular attention to accented names**
- **Use the appropriate punctuation marks**
- **Don't use a hyphen instead of a dash** — en dash for ranges, en/em for asides.
- **In running text use a proper minus** (−, not a hyphen)
- **Use a division symbol rather than a slash**
- **Use proper and appropriate quotation marks and apostrophes** — never neutral primes for quotes.
- **Don't use italic brackets**
- **Don't overuse or over-elaborate ampersands**
- **Use UTF-8 in preference to entities**
- **Automate character substitution whenever possible** — smart-quote/dash conversion in the CMS or build step.

### OpenType
- **Use standard ligatures for improved legibility** — on by default; keep them on.
- **Hide legacy OpenType support from modern browsers** — `@supports (font-variant-…)` resets `font-feature-settings`.
- **Use alternative ligatures judiciously** — discretionary/historical ligatures are decoration for display sizes.
- **Use real small caps** — `font-variant-caps`; faux shrunken capitals look "skinny, spindly".

### Hierarchy & scale
- **Establish the structure up front** / **Establish the semantics up front**
- **Don't rely on size alone for differentiation** — weight, style, caps, colour, spacing, proximity; change one attribute at a time.
- **Always size type using a scale** — classic scale: 6 7 8 9 10 11 12 14 16 18 21 24 36 48 60 72.
- **Choose your smallest size first** — reference (small) / reading (medium) / display (large).
- **Use alternative modular scales to suit the content** — base size × culturally/content-relevant ratio.
- **Adjust the text size and scale for different screens** / **Take screen height into account**
- **Tighten up leading in headings** — possibly down to `line-height: 1` (setting solid).
- **Avoid clash (unless it's a deliberate choice)** — descenders catching ascenders on wrapped tight headings.

### Paragraphs & openings
- **Mark the opening of each passage of text**
- **Implement drop caps accurately or not at all** — baseline + cap-height alignment; `initial-letter`.
- **A standfirst should stand first**
- **Demarcate paragraphs appropriately** — indent *or* space, not both.
- **Indent paragraphs at least 1 em** / **Separate paragraphs by no more than 1 em**
- **Don't use stylised paragraph breaks without good reason**
- **Not all block quotes need to look like pull-quotes** — inset, italicise *or* shrink, not both.
- **Hang punctuation** — `hanging-punctuation: first last` (Safari); negative-margin generated content elsewhere.
- **Treat lists as text to be read**

### Emphasis, links & numerals
- **Avoid using underlines for emphasis** / **Avoid faux bolds and italics**
- **Make links clear but unobtrusive**
- **Use old-style numerals in running text** — "Are pounds, dollars, dates and quotas really more important than the words and ideas which give them context and meaning?"
- **Use lining numerals in headings**
- **Use proper subscripts and superscripts** — `font-variant-position`, not shrunken raised glyphs.
- **Reference notes with superscripts** / **Show footnotes in context**

### Tables
- **Set tables as text to be read** / **Don't stretch tables**
- **Keep table furniture and fills to a minimum** — Tufte's data-ink ratio applied to tables.
- **Left-align text, right-align numbers, and align headings with data**
- **Align to the decimal point**
- **Use tabular lining numerals in tables of numbers**
- **Put white space to work to group and separate** / **Do not over-stylise tables**
- **Adapt tables to small screens** — "It's better to have a readable table that requires scrolling than an unreadable one which doesn't."
- **Consider setting oblique headings to save space**
- **Let the browser handle tables with horizontal scrolling** — set no width; `white-space: nowrap` where needed.
- **Linearise simple tables into lists** / **Make tables responsive according to their purpose**

### Tracking & kerning
- **Kern your text to improve readability** — `font-kerning: normal`.
- **Letterspace your text rarely and carefully**
- **Don't letterspace lowercase without good cause**
- **Letterspace all strings of capitals and all long strings of digits** — ~`0.05em`; not initials, not small caps.
- **Eliminate erroneous spaces after last letters** — negative right margin equal to the tracking on centred text.
- **Gently tighten big, bold and wide fonts** — −1% to −3%.
- **Turn off ligatures if increasing letterspacing**

### Display text
- **Set text at display sizes, even on small screens**
- **Resize display text as you would an image** — `vmin`, or hybrid `calc(0.5rem + 2.5vmin)`.
- **Attend to wide, shallow screens** — vertical media queries.
- **Pay attention to the shape of the text**
- **Visually centre text or hang punctuation**
- **Prevent widows in headings** — `&nbsp;` (today `text-wrap: balance`).
- **Adjust line spacing for evenness of colour** — solid (1) for big/bold; <1 (try 0.75) for all-caps; looser for thin/ornate.
- **Make the most of a font's hidden gems** / **Seek out OpenType features** — swashes, alternates, style sets.

### Rhythm & layout
- **Apply vertical space in measured intervals** — body line-height as the spacing unit; asymmetric heading margins summing to whole units.
- **Use a basic reset to ensure consistency**
- **Allow embedded media to break the rhythm** — restart the beat after; don't crop content to fit maths.
- **Don't slavishly follow a baseline grid**
- **Design layouts from the content out** / **Adopt a mobile-first philosophy**
- **Stage the main text block for scanning** / **Bring the design into the margins**
- **Use active white space** / **Show relationships and draw attention**
- **Use compound grids for maximum flexibility** / **Choose odd over even grid systems**
- **Restrict column length to the viewport height**

## 4. Choosing and Using Fonts

### Rendering
- **Accept the limits of screen resolution** / **Understand how fonts render on screens**
- **Accept rendering differences between platforms** / **Check your type across platforms**
- **Don't disable subpixel rendering except when text is reversed out** — (historical: subpixel AA has since been retired on macOS)

### Requirements before aesthetics
- **Don't jump straight into choosing fonts** / **Understand the purpose and requirements**
- **Use a typeface with the necessary characters** — language coverage, accents.
- **Make sure your typeface has the requisite styles** — real italics/bolds you'll actually use.
- **Choose fonts with the features and special effects you require** — small caps, numeral sets, etc.
- **Consider your fonts' performance**
- **Work within your means, but be wary of free**
- **Be pragmatic in the face of branding requirements**

### Describing & choosing (see choosing-and-pairing.md)
- **Learn how to describe typefaces** — skeleton / flesh / skin.
- **Type genres are more useful than classifications** — the 10-genre taxonomy.
- **Know your history** / **Understand type categories**
- **Remove the friction between reader and text**
- **Choose robust faces for better readability on screens** — generous x-height, open apertures, sturdy strokes.
- **Choose active texture and even colour for a smoother read**
- **Choose faces in keeping with the text** / **There's no such thing as a neutral typeface**
- **Choose a face whose history and culture resonates with the text** / **Do some detective work**
- **Make a specimen to reduce your shortlist** / **Judge typefaces in context** — real content, real browsers.
- **Trust your personal preference** / **Don't be reverential, dogmatic or ordinary**
- **Influence the way people feel through type** / **Favour personalities over flexibility**
- **Use display styles for display text** / **Choose display faces that reinforce the structure of the text face**
- **Keep inspired, and play**
- **Clearly distinguish functional text from body text** / **Choose open, distinct letterforms for functional text**

### Combining (see choosing-and-pairing.md)
- **Combine typefaces for a reason**
- **Start your combination with an anchor typeface** — preferably the body face.
- **Find typefaces that complement the anchor**
- **Combine typefaces with similar structure and form** — same column of the form/contrast matrix.
- **Find complements through contrast** — diagonal moves; serif + sans sharing a skeleton.
- **Stick with a single type family** — superfamilies are the safest pairing source.
- **Consider pairing typefaces from the same designer** / **Pair typefaces from the same foundry**

### Loading
- **Don't specify local fonts without due diligence**
- **Reduce your payload** / **Limit the number of fonts you use**
- **Always provide a WOFF2 option** — ~30% smaller than WOFF.
- **Subset as much as you can, but no more**
- **Optimise page render timing** / **Avoid the flash of invisible text** — FOUT over FOIT.
- **Use font-display to tailor browsers' behaviour** — `fallback` in most cases.
- **Preload the critical font** / **Fine-tune your web font strategy with font events** / **Load web fonts asynchronously**
- **Choose the best fallbacks** / **Adjust fallback font size to match x-height** — `font-size-adjust` with the web font's aspect value.
- **Develop your own taste and preferences** / **Steal inspiration, don't copy**
- **Get what you pay for, and pay for what you get**
- **Typomania is incurable but not lethal**
