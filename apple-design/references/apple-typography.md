# Apple Typography

*Scope: Use typography well on Apple platforms — the San Francisco family, optical sizes, text styles, and full Dynamic Type support including custom font scaling. Use when choosing system fonts, fixing truncated text at large sizes, or supporting Dynamic Type in SwiftUI or UIKit. Triggers: Dynamic Type, text styles, ScaledMetric, UIFontMetrics, SF Pro, New York font, optical size.*

**Sources:** [apple-typography/sources.md](apple-typography/sources.md) — 3 Apple WWDC sessions + MDS + Hollick's font internals.

Great UI typography is about the *dynamic behavior* of text — optical sizes, tracking, and leading are legibility mechanics, not aesthetic trivia. The system fonts handle them automatically; your job is to use **text styles** and system APIs so you inherit that engineering, and to keep it working when type scales up. (For SF Symbols — which are typographic objects too — see `swiftui` (sf-symbols).)

**The HIG legibility floor:** minimum text sizes 11pt (iOS/iPadOS), 10pt (macOS), 23pt (tvOS), 12pt (watchOS) — defaults 17/13/29/16 — and "avoid Ultralight, Thin, and Light font weights" in UI text.

## The San Francisco family — who does what

- **SF Pro / SF Pro Rounded** — the system fonts on iOS, iPadOS, macOS, tvOS.
- **SF Compact / SF Compact Rounded** — narrow columns and small sizes; default on watchOS.
- **SF Mono** — monospaced (code, row/column alignment).
- **New York** — the serif system font, for reading and display.
- **SF Arabic / SF Arabic Rounded** — full nine-weight Naskh-style family with Arabic-specific optical sizes.

Access designs without leaving text styles: `Font.system(.body, design: .rounded)` in SwiftUI, or `withDesign(.rounded/.serif/.monospaced)` on a font descriptor — size, weight, and line height are preserved.

### Width styles (SF Pro): Condensed · Compressed · Expanded
All widths share vertical proportions and language coverage (Latin/Greek/Cyrillic — **have a fallback plan if you localize beyond those**); only horizontal proportions change. Center of the weight×width map = neutral voice; the perimeter = expressive.
- **Condensed** — fits more text without being overly present (a long headline in 4 lines instead of 5).
- **Compressed** — most compact, graphical; ideal as a *display* style; too tight for long passages.
- **Expanded** — open and striking; works at display sizes *and* for small labels/captions (Maps uses it for mountain ranges).
- Pairing recipes: one width + contrasting weights; one weight + contrasting widths; or both for maximum contrast. Two or three styles are enough for most hierarchies. Always weigh legibility before a non-Regular width.

## The mechanics you usually shouldn't touch

- **Optical sizes** are automatic: SF Pro is a variable font whose Text→Display axis transitions **between 17 and 28pt** (wider spacing and sturdier strokes at small sizes, refined details at large).
- **Tracking ≠ kerning.** Kerning is the type designer's pair-specific correction — leave it alone. To fit a truncating string, prefer `allowsDefaultTighteningForTruncation` / `.allowsTightening(true)` so the system applies the font's size-specific tight-tracking table within legibility bounds; "there is such a thing as too much tracking — better to let things truncate." If you must set custom tracking, it has to be size-specific.
- **Leading:** tight = −2pt line height, loose = +2pt (iOS/macOS) via `.traitTightLeading`/`.traitLooseLeading` or `Font.leading(.tight)`. The system already adds leading for tall scripts (e.g. Arabic). Note macOS has text styles but **no Dynamic Type**.

### Under the hood: font files, optical lies, and rasterization

The layer beneath the mechanics above (Dan Hollick, *Making Software*):

- **A font file is a structured container**, not just outlines: vector outlines per glyph + spacing metrics + kerning tables + hinting instructions + metadata. Format lineage: PostScript Type 1 (1984, cubic Béziers, 256-glyph cap) → TrueType (quadratic Béziers — simpler curves, more points — plus built-in hinting) → OpenType (either outline flavor, up to 65,536 glyphs, layout tables for ligatures/small caps/alternates) → variable fonts: one file holding design axes (weight, width, slant, optical size) interpolated between masters at runtime — the machinery behind SF Pro's automatic Text↔Display axis, and one network request instead of five weight files on the web.
- **Vertical metrics:** baseline, x-height, cap height; ascenders typically rise above cap height, descenders drop below the baseline. X-height runs "between 50-66% of the cap height," and taller x-height reads better small — why screen-optimized faces have tall lowercase, and the physics under Stocks's "apparent size is x-height" point above.
- **Spacing is half the job:** every glyph carries sidebearings (the built-in space on each side); the goal is *even color* — body text "should appear as a uniform shade of grey at arm's length, with no light gaps or dark clumps." Kerning is the exception layer on top — thousands of class-based pair adjustments for combos like AV that sidebearings can't fix. This is why the kerning rule above says hands off: it's deliberate per-pair craft, not a default to tweak.
- **Letters lie on purpose:** round and pointed letters overshoot the cap height and baseline by ~1–2% (a circle drawn to the same height as a square looks smaller); crossbars sit above the mathematical center to look centered; horizontal strokes are drawn thinner than verticals to look equal — even in Helvetica. Type designers "fool the human eye into seeing balance where the measurements are deliberately uneven" — the same reason UI alignment is optical, not mathematical.
- **Outlines vs bitmaps → hinting:** bitmap fonts scale badly (a resampling problem — aliasing artifacts), so vector outlines won; but rasterizing outlines small loses legibility, so **hinting** snaps stems and x-heights to the pixel grid. Verdana famously shipped hand-drawn variants of all "890 characters for every point size between 9 and 60." Platform split that still shapes how your type looks: Windows grid-fits aggressively, while "macOS prefers to preserve the original intention of the font" — same font, crisper on Windows, truer but softer on a Mac.
- **Anti-aliasing and gamma:** bi-level rasterization (pixel on/off) gives jagged aliasing — the signal sampled too coarsely. Grayscale AA instead shades each pixel by how much the glyph covers it (analytical area coverage), and the coverage blend needs gamma correction "to create a smooth fall off" — mishandle it and antialiased text visibly shifts weight. **Sub-pixel rendering** (ClearType-style) exploits the R/G/B sub-pixel layout to triple horizontal resolution: rasterize the glyph at 300% horizontal scale, map it onto sub-pixels, filter the resulting color fringing. It has faded — "Apple moved away from it when they brought out Retina displays which have a high enough resolution that it wasn't worth it" — so don't expect sub-pixel AA on modern macOS.

*(Dan Hollick, Making Software, makingsoftware.com/chapters/how-to-make-a-font and makingsoftware.com/chapters/rasterisation-and-anti-aliasing.)*

## Build hierarchy with text styles

Text styles are predefined weight+size+leading combos forming a hierarchy — use them instead of fixed fonts: `.font(.title)` in SwiftUI; `preferredFont(forTextStyle:)` + `adjustsFontForContentSizeCategory = true` + `numberOfLines = 0` in UIKit. The **emphasized** variant (`.traitBold` / `Font.body.bold()`) maps to the right weight per style (body "bold" is actually 17pt *Semibold* on iOS).

## Dynamic Type — the rules

People choose from 7 default sizes + 5 accessibility sizes; supporting them is not optional, and a dynamic UI also adapts across screens and platforms.

1. **Use text styles everywhere** (above). The two failure modes to hunt: *truncated* text (not enough lines) and *clipped* text (fixed frames).
2. **Custom fonts still scale:** UIKit `UIFontMetrics(forTextStyle:).scaledFont(for:)` / `.scaledValue(for:)`; SwiftUI `Font.custom(name, size:, relativeTo:)` (custom fonts scale relative to `.body` by default since iOS 14; `fixedSize:` opts out). Each text style has a different scaling curve — match `relativeTo` to the role.
3. **Scale layout constants** with `@ScaledMetric(relativeTo:)`.
4. **Adapt layout direction at accessibility sizes:** read `@Environment(\.dynamicTypeSize)` and check `.isAccessibilitySize`, swap `AnyLayout(HStackLayout())` ↔ `AnyLayout(VStackLayout())` — or let `ViewThatFits` pick automatically (see `swiftui` (swiftui-layout)); UIKit: drive `UIStackView.axis` from `traitCollection.preferredContentSizeCategory.isAccessibilityCategory`.
5. **Images:** decorative images should *not* grow (wrap text under them; at the largest sizes you may drop purely decorative views — never functionality). Content images scale via `@ScaledMetric`; inline symbols in `Text` scale free; UIKit inline images via `NSTextAttachment`, symbols via `UIImage.SymbolConfiguration(textStyle:)`.
6. **Bars that can't grow get the Large Content Viewer** (a tab bar that scaled would eat ~¼ of the screen): system bars are free; custom bars use `.accessibilityShowsLargeContentViewer { … }` (SwiftUI) or `UILargeContentViewerInteraction` + the `UILargeContentViewerItem` properties (UIKit).
7. **Test:** Xcode Previews → Dynamic Type Variants; the debugger's Dynamic Type override; and run **accessibility audits** (also available in UI tests).

> **Staleness note (Kevin's rule):** code above verified against current docs as of mid-2026. The UIKit size-category observation shown in the 2024 talk uses `UIContentSizeCategory.didChangeNotification`; on iOS 17+ prefer `registerForTraitChanges`. Web equivalents: `system-ui`, `ui-rounded`, `ui-serif`, `ui-monospace`. Re-verify API names against developer.apple.com/documentation when applying.

## Type mechanics beyond the Apple stack (Elliot Jay Stocks, Config 2025)

- **Grade vs weight**: "whereas weight is designed to serve as a differentiator, **grade exists to unify**" — and grade changes don't change character widths, so no reflow. Modern use: keeping type optically consistent across **light/dark mode** (dark backgrounds make light text bloom; drop a grade). SF has grades; Roboto Flex exposes a GRAD axis.
- **There's no such thing as a shared font size across typefaces** — apparent size is x-height, not font-size; the em square is an invisible container. CSS adds **half-leading** above and below, so you can't set a true visual gap between text blocks without trimming: `text-box-trim` (CSS), Figma's vertical-trim, or measure optically from x-height ("cap height to baseline is exactly how all design apps should have been treating text frames forever").
- **Fluid type scales**: pick one modular scale for small viewports and a higher-contrast scale for large, then interpolate (utopia.fyi) — "design for extremes and let the browser do all the hard parts in between."
- **Optical sizing mechanics** (Stocks, "The old typography is new again," Adobe Design 2026): for 500 years every metal-type size was a distinct design — small sizes got sturdier stems, open counters, higher x-height; large sizes earned contrast and personality. Named optical sizes run display → subhead → text → caption. With a variable font's `opsz` axis, InDesign, Figma, and most browsers **auto-map font size to optical size** (rem → px → opsz); override deliberately with `font-variation-settings: "opsz" N` at breakpoints when context beats canvas — "always design for the eye and not just the canvas" (a billboard across a park and a phone at arm's length can present the same *perceived* size).
- **Measure (line length): 45–75 characters** (Bringhurst, via Stocks). As the viewport grows, fix an over-long measure by increasing font size or container padding at breakpoints — Stocks resists `max-width` as a first resort. **Trent Walton's asterisk technique**: drop asterisks at characters 45 and 75; add a breakpoint whenever both land on one line. And leading must respond when size or measure changes — gaps that look right at one width open up at another.
- **Typography failure modes are semantic**: the Mitt Romney webfont problem (Zach Leatherman) — an italic font failed to load with no fallback and the word "not" vanished, inverting the headline's meaning. Always define italic/weight fallbacks.
- Maxims: "if you have a typeface and you have a color then you have a brand" (Spiekermann); "Good typographers… obsess over the detail so that readers don't have to" (Boardley).

### MDS field numbers (Matt D. Smith, Shift Nudge — live sessions)

- **iOS size pairs:** "iOS is really big on using 17. a lot of their stuff is 17 and 15 not necessarily 16 and 14." And 11 "is the smallest that you'll see Apple using for legal copy" — treat it as the legal-copy floor, nothing else.
- **Display threshold (practitioner's cut):** when picking SF Pro Display vs Text by hand, "you don't want to use display unless you're at 20 or or larger."
- **Component budget:** "three font sizes is typically the maximum that I would want to use in any particular component," paired with at most two weights — same constraint-builds-the-system logic as his one-border-color rule.
- **All-caps optical compensation:** "when you go all caps it's going to make your font size seem larger than it really is" — he pairs 12px all-caps against 14px regular; size caps labels a step down.
- **Line height:** start UI text at "100% line height" and control spacing with component padding, not leading — he'll even drop to 97% to land an even 48px button height.
- **One-size exercise:** "you can do a lot of really good design with one font size" — hierarchy from weight, case, and color before reaching for another size.

## Picking a custom font (WWDC 2017, Sander)

When SF isn't the answer, answer two questions before opening the font menu: **what is my intended use** (functional) and **what impression do I want to make** (stylistic). The vocabulary: **structure** (ductus — the path the tool follows: single-stroke *cursive* = dynamic, constructed strokes = static) and **contrast** (stroke modulation, thick vs thin).

- **Display vs text is a contrast-and-spacing decision, not a name.** High contrast looks sharp large, but scaled down "the thin strokes will eventually disappear" and reading becomes unpleasant; text faces need sturdier (lower) contrast and *looser* spacing at small sizes, headlines look better tightly spaced. Avoid extremes of weight or style for text — "A good reading experience is usually the one you don't notice." (Complements the MDS 20pt Display/Text cut below.)
- **Don't pick a typeface by its name** — the "LTypI" (Lack of Typographic Imagination) trap: a sign-painter font for a sign-painting app is fine only if the style *also* serves the function; "a matching name should really just be the cherry on top of the cake."
- **Point size ≠ apparent size.** Glyphs are drawn inside a font body; "at the same point size, two fonts can appear to have different scales because of their design." When pairing, set candidates side by side at one point size and prefer the closest apparent-scale match — otherwise you'll tweak point sizes at every pairing site. (Same x-height physics as Stocks's "no shared font size" point above.)
- **Pairing strategy:** start with two typefaces, add only if truly needed. Easiest win: one family, contrast by weight. If pairing styles, make the stylistic difference (structure *and* contrast) strong enough to be obvious. A "strong display typeface and using the system font" for text is a legitimate pattern — your style on top, SF as the workhorse. "The key element is typographic contrast" — via size, weight, or style; books run low display/text contrast (long reading), news layouts run high (grab attention, then read with ease).
- Style perception is learned association (geometric sans ≈ "fresh" yet ~100 years old; book faces feel "literary" from exposure) — learn the layers, old and new, rather than trusting first impressions.

## Checklist

- [ ] Text styles (not fixed fonts) everywhere; UIKit labels have `adjustsFontForContentSizeCategory` + `numberOfLines = 0`?
- [ ] Custom fonts wired through `UIFontMetrics` / `Font.custom(relativeTo:)` with role-matched styles?
- [ ] Layout constants `@ScaledMetric`; layout direction flips at `.isAccessibilitySize`?
- [ ] No truncated or clipped text at the largest accessibility sizes (audited)?
- [ ] Decorative images don't scale; content images and inline symbols do?
- [ ] Custom bar controls adopt the Large Content Viewer?
- [ ] System tracking/leading/kerning left alone unless exceptional (and then size-specific)?
- [ ] Width styles chosen for hierarchy with legibility first; fallback plan for non-Latin scripts?

See `apple-typography/code-patterns.md` for all 23 verbatim code samples from the talks, organized by rule.

## Relationship to other skills

- **`swiftui` (sf-symbols)** — the sibling: symbols are typographic objects (baseline-aligned, weight-matched, scaled by Dynamic Type). Type questions here; symbol rendering/animation there.
- **[ios-brand-identity.md](ios-brand-identity.md)** — owns the brand decision (custom typeface vs. system fonts, where type expresses brand); this skill owns the *mechanics* of making either choice work (Dynamic Type, text styles, widths). Its typography section routes here.
- **`design-principles`** — *Craft* (typographic detail) and *Flexibility* (Dynamic Type as accessibility); use it to weigh trade-offs.
- **`swiftui` (swiftui-lazy-stacks)** — fixed-height text in lazy stacks (line limits, reserved space) interacts with Dynamic Type; check both when text lives in scrolling content.
- **`design-polish`** — web-oriented typography polish (font smoothing, tabular numbers); this skill is the Apple-platform counterpart.
- **`web-typography`** — the full web/CSS typography discipline (measure, line-height, scales, pairing, web-font loading); never cross-apply its rules to Apple platforms or vice versa.
- **[apple-visual-accessibility.md](apple-visual-accessibility.md)** — the audit layer: Dynamic Type/Bold Text are accessibility settings first; audit there, implement the type mechanics here.
