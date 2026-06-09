---
name: ios-brand-identity
description: "Express a brand identity in an iOS app without breaking the native feel — decide where brand belongs (UI layer vs. content layer / Liquid Glass), when to customize a component vs. use a standard one, and how to apply brand color/tint, custom fonts (with Dynamic Type), iconography (vs. SF Symbols), logos, Dark Mode, and widgets. Use when designing or reviewing iOS app branding, deciding how much to customize, moving brand color into the content area, adding custom fonts or icons, supporting Dynamic Type/Dark Mode, or judging whether a custom component hurts the native feel. Based on Apple WWDC 2026 session 251 + the HIG. Triggers: brand identity, branding, iOS branding, custom vs standard components, tint/accent color, color in content area, custom fonts, Dynamic Type, SF Symbols, iconography, logo, Liquid Glass, content layer, UI layer, dark mode, widget branding."
---

# iOS Brand Identity

*Source: Apple WWDC 2026, session 251 — "Communicate your brand identity on iOS" (Sarah, Apple Design Evangelist). https://developer.apple.com/videos/play/wwdc2026/251*

Branding on iOS is both **aesthetic** (typography, color, iconography) and a **feeling** (how your product makes people feel). The goal is brand expression *in service of* the app experience — distinct where it matters, native everywhere it should be. iOS users expect apps to look and feel like iOS, and they usually have no experience of your app on other platforms — so don't default to making your iOS app match your website/retail/other-platform brand. **Each placement should respect its context.** Forcing brand where it oversteps system behavior or confuses familiar conventions compromises the experience.

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
- **Logos:** in iOS people already know which app they're in, so logos waste valuable real estate. *NYT Cooking* shows its logo only on the Home tab and fades it on scroll. Keep branding refined and unobtrusive.
- For symbol *mechanics* — configuration, scales, rendering modes, Variable Color, animations, custom-symbol templates — use **`sf-symbols`**. This section decides custom-vs-system iconography; that skill makes either work.

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
- **`web-animation-design`** / **`motion`** cover web/JS motion; on iOS the brand-through-motion ideas here are realized with SwiftUI — implement with `swiftui-animation` (transitions, effects, shaders) and `swiftui-lazy-stacks` (scroll). Don't cross-apply CSS specifics.
- **`naming-features-and-labels`** / **`ui-voice-and-tone`** — the wording and voice side of brand in the content layer: name the individual thing with the former, define and write the app's voice with the latter.
- **`apple-search-design`** — sibling Apple-platform skill; it notes a branded search field must keep the magnifying glass and native field elements. Use together when search is part of a branded UI.
- **`liquid-glass-design-system`** — the primary source for the Liquid Glass material and its rules (variants, tinting, glass-on-glass, concentric shapes). This skill's UI/content-layer model and tint guidance are that system applied to brand.
- **`apple-typography`** / **`sf-symbols`** — the mechanics beneath this skill's Typography and Iconography sections (Dynamic Type, text styles, widths; symbol configuration, rendering modes, animation, custom symbols).
- **`widget-design`** / **`sound-design`** — brand beyond the app's visuals: widgets extend the palette/imagery to the home screen (the Crumbl example); a sound palette is the brand's auditory voice.
