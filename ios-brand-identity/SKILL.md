---
name: ios-brand-identity
description: "Express brand identity in an iOS app without breaking the native feel — UI layer vs content layer (Liquid Glass), custom vs standard components, brand color, fonts, logos, Dark Mode, widgets. Use when designing or reviewing iOS branding, deciding how much to customize, or judging whether a custom component hurts the native feel. Based on WWDC 251 + the HIG. Triggers: brand identity, iOS branding, custom vs standard components, tint color, logo."
---

# iOS Brand Identity

*Source: Apple WWDC 2026, session 251 — "Communicate your brand identity on iOS" (Sarah, Apple Design Evangelist). https://developer.apple.com/videos/play/wwdc2026/251*

Branding on iOS is both **aesthetic** (typography, color, iconography) and a **feeling** (how your product makes people feel). The goal is brand expression *in service of* the app experience — distinct where it matters, native everywhere it should be. iOS users expect apps to look and feel like iOS, and they usually have no experience of your app on other platforms — so don't default to making your iOS app match your website/retail/other-platform brand. **Each placement should respect its context.** Forcing brand where it oversteps system behavior or confuses familiar conventions compromises the experience.

A practitioner who built an almost-fully-custom app puts the base rate bluntly (Paul Stamatiou, "Stocketa," 2023 — https://paulstamatiou.com/stocketa/): "going custom is almost always the absolutely wrong thing to do 99% of the time. The operating system… has invested a ton in a highly-considered suite of components. They're remarkably accessible, well-tested, and work on a variety of devices." When custom *does* make sense and you accept the added scope and responsibility, "the app becomes your canvas to do whatever you want and make it yours" — but that's an explicit, costed decision, never the default.

## The core mental model: two layers (Liquid Glass, iOS 26)

- **UI layer** — global navigation and actions (tab bars, top toolbars). It floats above the content. **Lean into familiar iOS patterns here; don't reinvent the wheel.** Establishing platform familiarity is what lets people instinctively know how to use your app. (What "native navigation" concretely means — tabs, push, modality, sidebars — lives in `apple-navigation-design`.)
- **Content layer** — everything beneath the controls: your features, imagery, words. **This is your canvas — the best place to express brand identity.**

*Gentler Streak* has a clearly distinct identity (playful illustrations, detailed data viz) while its tab bar and top-toolbar actions stay fully native. Keep the foundation familiar; spend your brand budget in the content.

## Components: customize vs. standard

Expect to customize *some* components — but keep them feeling iOS:
- *Slack*'s custom top toolbar shows channel info in the middle, yet button sizes, floating-action placement, and popover behavior all feel iOS.
- *Moonlitt*'s custom lunar-cycle calendar uses the iOS design language: a Liquid Glass backing, a primary action to dismiss, and a sheet with **concentric edges** matching the hardware. Unique, yet clearly belongs on iOS.

Rules of thumb:
- **Custom components take refinement** — spend that effort on the **high-impact areas** that make your content stand out. Then **audit for functional areas where a standard component is better**.
- **Don't custom-build utilitarian components.** A custom version of something tried-and-true (e.g. a context menu) rarely reinforces brand and often makes the app feel *less* native, even dated. Standard components (grid views, grouped tables, context menus) are flexible and free with SwiftUI — context menus can carry icons, grouped sections with headers, and secondary menus/modals.

## Content layer = your canvas

- **Imagery / video** — make it purposeful, not generic. *Crumbl* uses full-bleed weekly-flavor videos that change weekly; *Moonlitt* goes edge-to-edge with night-sky color and 3D elements. Content should have a clear reason to be immersive.
- **Words / voice & tone** — words shape feeling. Be deliberate about the emotion you're targeting (playful, trustworthy, etc.). (Copywriting is its own craft — see `naming-features-and-labels` for naming/labels, and `ui-voice-and-tone` for defining and writing the app's voice.)
- **Motion** — people experience content *through* transitions and animation. *NYT Cooking* uses Zoom Transitions that tie the tap target to the transition state; *Gentler Streak*'s spring animations emphasize hierarchy and make content pop. But delayed loads or dropped frames read as low quality even when people can't say why.

## Color

- **Move brand color into the content area** (the scroll view), not onto solid toolbars/tab bars. Pre-iOS 26 solid bars were bulky and letterboxed the content; now Liquid Glass controls sit above the content and **pick up your brand color dynamically** as it scrolls.
- **Use color for meaning, not decoration** — hierarchy, grouping, interaction. That's why color lives mostly on controls and actions: your **accent/tint color**. (Liquid Glass tightened this further: tint **only primary actions** on glass — see `liquid-glass-design-system`.) *Slack* tints primary actions, new-info sections, unread badges, new-message, and the selected tab — communicating status, feedback, and selection. Too much color overwhelms; exercise restraint.
- **Don't water down a color's definition** (MDS, Shift Nudge YouTube -VSXVDr5HW0): "if you're defining action with a color and i recommend it that you don't go watering down that definition by using it for the background color and the header and the highlight color" — every off-definition use dilutes what the color means.
- **Dark Mode is not optional.** iPhone is deeply personal and Dark Mode is a comfort/accessibility preference; ship a refined low-light palette. Skipping it gives people a negative experience that reflects on your product.
- **Brand extends past the app** — e.g. *Crumbl*'s Widgets carry their pastel palette and imagery and are instantly recognizable.

## Typography

- Type can be expressive, bold, or elegant, but must always be **functional**. *Crumbl* uses a custom typeface (Crumbl Sans) in memorable moments like large flavor headers.
- **Custom fonts must support Dynamic Type.** It's built into Apple's system fonts; with custom fonts you must build and test it. Done right (like Crumbl), increasing the system font size **reflows to multiple lines rather than truncating**. Dynamic Type also enlarges standard components (tab labels and icons grow).
- **The system font, San Francisco, is a strong option** — consistent, legible, friendly, 150+ languages. Variants: **SF Pro** (default), **SF Compact** (small sizes), **SF Mono** (rows/columns, good for code), **New York** (serif). *Gentler Streak* uses system fonts entirely — mixing widths and SF Rounded for variety and hierarchy while still feeling distinct.
- For the *mechanics* — text styles, Dynamic Type APIs (incl. custom fonts), widths, tracking/leading — use **`apple-typography`**. This section decides whether type expresses brand; that skill makes it work.

## Iconography

- You can use custom iconography almost anywhere (content and controls). *NYT Cooking*'s icons have sharper edges and a line-weight variant — unique but **not over-detailed, so they scale to small sizes** — used consistently on tab bar, toolbars, and inline.
- **Respect platform conventions even in a custom style.** NYT Cooking's Share icon differs across iOS/Android/Web yet each stays true to that platform's sharing pattern. Icons should be **identifiable and purposeful**, not heavily stylized.
- **Not every app needs custom icons. SF Symbols** (7,000+, free) are built like a font (scale like text), neutral, with line weights plus accessibility and localization support — and built into Xcode, so no export/handoff.
- **Logos:** in iOS people already know which app they're in, so logos waste valuable real estate. *NYT Cooking* shows its logo only on the Home tab and fades it on scroll. Keep branding refined and unobtrusive. Say-it-once test (MDS critiquing a coffee-shop app, Shift Nudge YouTube k8dcRRgA3T8): "we're saying waves and coffee three different times in this one area" — logo, wordmark, *and* branded imagery — "we only need to say wave coffee once… it can be implied or it can be direct"; pick one carrier per view.
- For symbol *mechanics* — configuration, scales, rendering modes, Variable Color, animations, custom-symbol templates — use **`swiftui` (sf-symbols)**. This section decides custom-vs-system iconography; that skill makes either work.

## Logo & wordmark equity (Jessica Hische + Robinhood/Porto Rocha, Config 2024–25)

- **Refresh vs rebrand decision rule**: refresh when legibility/accessibility problems, tech-era drafting artifacts ("things drafted in the 90s have a 90s feel because that's what the software was capable of"), or maturation; rebrand only for a pivot, a new audience, or "you never actually had a well-articulated voice."
- **The blur test**: "a brand has strong equity if you blur it and you can still recognize it." Before touching anything, inventory the equity — literally list every formal feature (NY Mag: "unique N and Y forms, long swashes with teardrop terminals"). Color is one of the top equity holders.
- **Timelessness checklist**: stay in continuous use; avoid trendy gimmicks (random ligatures, decorative cuts, "extreme thicks and thins, digital ink traps"); never set the logo in a free font ("nothing guarantees a sea of similar logos more than using a font available to everyone"). And ship it flawless: "if there's anything you can critique, it's going to get thrown out at the next refresh."
- Letterform micro-rules: one pen logic informs all letterforms (inconsistency "feels unsafe"); shorten script entrance/exit strokes to feel bespoke; don't round internal corners (reads as ink bleed); lean tall strokes back optically or they "look like they're falling forward"; **small-size variants get less stroke contrast, more white space, sometimes a higher x-height**.
- **Equity decays when copied** (Robinhood): their once-distinctive illustration style became the fintech category default — when your style is the genre, it's no longer equity. Their rebalance: make one medium precise (geometric illustration) and move the emotion into another (metaphor-by-closeup photography). Palette rationing: neutrals + **one ownable signature color** used only when it means something — "expand the content, not the colors." (Same move as teenage engineering's "own one attribute" — claim transparency, claim a color, and every sighting recalls you.)

## Review checklist

- [ ] Is the **UI layer** native (tab bar, toolbars), with brand concentrated in the **content layer**?
- [ ] Are custom components reserved for high-impact areas, with standard components used for utilitarian ones?
- [ ] Do custom components still feel iOS (sizes, placement, popovers, concentric edges, Liquid Glass)?
- [ ] Is color in the **content area**, used for **meaning** (tint on actions/state), and restrained?
- [ ] **Dark Mode** supported with a refined palette?
- [ ] Custom fonts support **Dynamic Type** (reflow, not truncate)? Considered SF variants?
- [ ] Custom icons recognizable, consistent, scalable, and platform-true — or SF Symbols where custom adds nothing?
- [ ] Logo restrained (or absent) rather than occupying prime space?
- [ ] Does the brand **complement** the experience rather than fight system conventions?

See `references/examples.md` for the full app-by-app breakdown (Gentler Streak, Slack, Moonlitt, Crumbl, NYT Cooking).

## Relationship to other skills

- **`design-principles`** is the parent — this is *Familiarity* (honor platform patterns) balanced against brand expression, plus *Craft* and *Delight*. The talk even closes on the same note: "people remember how a product makes them feel… satisfying, enriching, a joy to use." Use `design-principles` to weigh brand vs. convention; use this skill for the iOS specifics.
- **`make-interfaces-feel-better`** / **`emil-design-eng`** — the component-level craft this relies on (concentric radii, optical detail, polish). Route "make this custom component feel right" there.
- **`web-animation-design`** / **`motion`** cover web/JS motion; on iOS the brand-through-motion ideas here are realized with SwiftUI — implement with `swiftui` (swiftui-animation) (transitions, effects, shaders) and `swiftui` (swiftui-lazy-stacks) (scroll). Don't cross-apply CSS specifics.
- **`naming-features-and-labels`** / **`ui-voice-and-tone`** — the wording and voice side of brand in the content layer: name the individual thing with the former, define and write the app's voice with the latter.
- **`apple-search-design`** — sibling Apple-platform skill; it notes a branded search field must keep the magnifying glass and native field elements. Use together when search is part of a branded UI.
- **`liquid-glass-design-system`** — the primary source for the Liquid Glass material and its rules (variants, tinting, glass-on-glass, concentric shapes). This skill's UI/content-layer model and tint guidance are that system applied to brand.
- **`apple-typography`** / **`swiftui` (sf-symbols)** — the mechanics beneath this skill's Typography and Iconography sections (Dynamic Type, text styles, widths; symbol configuration, rendering modes, animation, custom symbols).
- **`swiftui` (widget-design)** / **`swiftui` (sound-design)** — brand beyond the app's visuals: widgets extend the palette/imagery to the home screen (the Crumbl example); a sound palette is the brand's auditory voice.
