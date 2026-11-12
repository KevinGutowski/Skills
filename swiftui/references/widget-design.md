# Widget Design

*Scope: Designs home-screen widgets that are personal, informational, and contextual — content strategy per size, configuration over cramming, Smart Stack relevance, the don'ts (no logos, app names, timestamps). Use when designing or reviewing a widget, deciding sizes or content, or auditing glanceability. Ideation from WWDC 2020; families, interactivity, backgrounds and rendering modes re-checked against the HIG and WidgetKit docs on 2026-11-12. Triggers: widget design, WidgetKit, widget sizes, smart stack, glanceable.*

*Source: Apple WWDC 2020, session 10103 — "Design great widgets" (Mac & Christian, Human Interface design). https://developer.apple.com/videos/play/wwdc2020/10103/ — plus the current HIG Widgets and Controls pages and WidgetKit docs (HIG Widgets change log: October 13, 2026).*

## Contents

- Ideation — personal, informational, contextual
- Families and where they appear
- Interactivity and deep links
- Backgrounds, StandBy and rendering modes
- Layout & personality rules
- Updates, and when it is not a widget
- The don'ts
- Checklist
- Look it up
- Relationship to other skills

Widgets are "all about content": surface the most useful information people repeatedly open your app for. The process splits into **ideation** (what to surface) and **creation** (sizes, layout, personality). A widget is *not* a mini-app and *not* a launcher — it's glanceable content that happens to deep-link.

## Ideation — personal, informational, contextual

- **Personal** — enable emotional connection (Calendar's present glyph on a contact's birthday; Photos surfacing "the best photos instead of just the most recent ones," and memories from this day in past years).
- **Informational** — a top-level overview that "can save people from doing commonly repeated actions in your app."
- **Contextual** — use signals to anticipate: Maps shows the parked car when away from home, travel time before a scheduled event, ETA home in the evening; Weather **raises forecast resolution to minute-level when it's raining**. Broaden relevance across the hour/day/week — Calendar shows *tomorrow* when today is done, never a blank.
- **Smart Stacks:** widgets rotate by behavior and context (weather in the morning, music on the commute, traffic in the afternoon) — supply relevance so yours surfaces at the right moment.
- **Configuration over cramming:** editing "eliminates the need to create complex widget layouts" — let people add several configured widgets (two weather cities side by side) instead of one dense one. Defaults must work with zero setup (current location). Consider multiple widget *kinds* (Stocks: watchlist summary + single symbol).

## Families and where they appear

| Family | Where (verified against the HIG, 2026-11-12) | Content |
|---|---|---|
| **System small** | iPhone Home Screen, Today View, **StandBy and CarPlay** (background removed, scaled up); iPad Home/Lock Screen; Mac desktop and Notification Center; visionOS surfaces | One most-useful idea; 2020 talk: **max ~4 pieces of information** |
| **System medium / large** | Home Screen, Today View, Mac, visionOS | More layers of the *same* purpose; large must *earn* it (Screen Time adds a bigger chart + detail, not a scale-up) |
| **System extra large** | iPad, Mac, visionOS — not iPhone | As large; check the family before assuming it exists on the target |
| **Accessory circular / rectangular** | iPhone and iPad Lock Screen; watch complications and the watchOS Smart Stack | A very limited amount of information |
| **Accessory inline** | iPhone and iPad Lock Screen; watch complications | One line of text; **one tap target only** |
| **Accessory corner** | watchOS complications only | — |

- Declare only the families the idea justifies (`supportedFamilies(_:)`). HIG: "It's more important to create one widget in the size that best represents the content than providing the widget in all sizes."
- Two layout strategies: **expanding** (same layout gains info per size — Weather) or **unique per size** (News: one rich story small, several medium). **"Make sure not to scale up your smaller widget into your larger widget."**
- Branch on the family in the view (`@Environment(\.widgetFamily)`) rather than squeezing one layout into every size.

## Interactivity and deep links

- Tapping anywhere that is not a control opens the app — **deep link to the content that was tapped** (`widgetURL(_:)` for the whole widget, `Link` for separate targets in larger families), never to the app's front door.
- **Interactive widgets (iOS 17+):** `Button(intent:)` and `Toggle(isOn:intent:)` run an App Intent without launching the app; buttons and toggles are the interactive elements WidgetKit documents, so don't design text entry, scrolling or custom gestures into a widget. An intent-backed control "should do more than open the app" (Apple) — opening the app is `Link`/`widgetURL`'s job. The 2020 "small = single target" rule is gone; only **inline accessory** widgets are single-target.
- HIG limits: "Offer simple, relevant functionality and reserve complexity for your app" and "avoid creating app-like layouts in your widgets". Size targets so they can be hit confidently; keep a small widget near-single-purpose even though it may hold a button.
- After `perform()` returns, the system reloads the timeline — finish the write that the timeline reads *before* returning. A `Toggle` flips optimistically while `perform()` runs; other views wait for the reload, which can be slow (iPhone widgets on Mac), so mark values that will change with `invalidatableContent()` (iOS 17+). Structure the intents in `apple-design` (app-intents-design).
- **Controls (iOS 18+) are not widgets with buttons:** a `ControlWidget` is a button or toggle for Control Center, the Lock Screen and the Action button, built from a symbol, title and optional value (`ControlWidgetButton`, `ControlWidgetToggle`). On the Lock Screen only the symbol shows, so the symbol must carry the meaning; give toggles an on and an off symbol. Design guidance: the HIG Controls page.

## Backgrounds, StandBy and rendering modes

The most common current-SDK mistake is painting the background inside the widget's view.

- **Put the background in `containerBackground(for: .widget) { … }`** (iOS 17+), not in a `ZStack` or `.background`. That is what lets the system remove it. Apple's docs: without a removable background (or an explicit opt-out via `containerBackgroundRemovable(false)`), Xcode overlays a warning on the widget during development.
- **StandBy and CarPlay** show the small system family with the **background removed and scaled up**; in low light StandBy renders it monochrome with a red tint. HIG: limit rich images or colour as carriers of meaning there, and scale up and rearrange text for distance. Read `showsWidgetContainerBackground` to adapt the layout when the background is gone.
- **Three rendering modes** (`@Environment(\.widgetRenderingMode)`), all of which a shipping widget will meet:
  - *Full color* — Home Screen light/dark, Mac, visionOS.
  - *Accented* — tinted and clear Home Screen appearances, watchOS. The system drops the background and tints two groups; mark the accent group with `widgetAccentable()`. Full-colour images are desaturated by default; `widgetAccentedRenderingMode(_:)` (iOS 18+) controls that per image — use full colour "judiciously" (HIG).
  - *Vibrant* — iPhone/iPad Lock Screen, StandBy at night. Opacity and brightness are the only hierarchy: "white or light gray for the most prominent content", darker greys for secondary, everything at full opacity.
- Never let colour alone carry meaning — every mode above except full colour discards it.
- Preview each family in each rendering mode before calling a widget done; a design reviewed only in full colour on the Home Screen is unreviewed.

## Layout & personality rules

- **16pt default margins**; **11pt** tighter margins for graphic shapes (circles, inset platters). The system applies the content margins (smaller on the Mac desktop and the Lock Screen, including StandBy) — don't add a second hard-coded inset on top; `contentMarginsDisabled()` is for edge-to-edge content only.
- Corners near the widget edge should be **concentric with the widget's radius** — radius varies by device, so use `ContainerRelativeShape`, don't hardcode.
- Type: SF Pro / SF Mono / SF Pro Rounded; a brand font only if the widget "still feels at home alongside other widgets." Support **light and dark**.
- **Placeholder required:** static components plus semi-opaque shapes standing in for dynamic content, so live data lands "without having the layout or color shift around." The gallery preview shows realistic data (simulated if real data is slow); the gallery description starts with a verb, never "This widget shows…".
- Personality comes from the app's look (Weather's condition backgrounds, Calendar's red) or the **app icon's** visual language (Notes' notepad, Podcasts' purple gradient).

## Updates, and when it is not a widget

- Widgets refresh on a **timeline the system budgets**; they "don't support continuous, real-time updates". Design for the content being minutes old: use system-rendered dates and timers (`Text(date, style: .timer)`) for anything that must tick.
- Animate data changes with ordinary SwiftUI transitions, **up to two seconds** (HIG).
- **Real-time, time-boxed progress is a Live Activity, not a widget** (HIG: "Offer Live Activities to show real-time updates"). Same framework and views, different lifecycle (ActivityKit, push updates, hours not days). Choose between a Live Activity and a notification, and get the lifecycle limits, in `notification-design` (delivery-system).
- Supply relevance (`TimelineEntryRelevance`) so Smart Stacks surface the widget when it matters.

## The don'ts

- **Logos:** the 2020 talk said none unless the app aggregates third-party content. Current HIG is the same in spirit — "people seldom need your logo or app icon"; if multiple sources make one useful, "a small logo in the top-right corner is sufficient". **Never word marks.**
- **Never the app icon or app name** as widget content (the Home Screen label already says it), and don't build a widget that is just a launcher.
- **No instructional text** that talks at the user — communicate graphically. Exception from the HIG: say so when signing in unlocks content ("Sign in to view reservations").
- **Don't mirror the widget's appearance inside the app** — a look-alike that doesn't behave like a widget confuses people (HIG).
- **Timestamps — the 2020 "never" is reversed.** Current HIG: "If people are likely to check your widget more frequently than you can update it, consider displaying text that describes when the data was last updated." Default to none; add one only when freshness genuinely lags checking frequency.

## Checklist

- [ ] Content is personal/informational/contextual — would someone keep this on their home screen?
- [ ] Only justified families declared; larger sizes add value (not scaled-up smalls); extra large not assumed on iPhone?
- [ ] Taps deep-link to the tapped content; buttons/toggles are few, intent-backed, and comfortably sized; inline accessory single-target?
- [ ] Background in `containerBackground(for: .widget)`; layout still reads with the background removed (StandBy, CarPlay)?
- [ ] Legible in accented and vibrant modes — accent group marked, no meaning carried by colour alone?
- [ ] System margins respected, concentric corners via `ContainerRelativeShape`, placeholder stable, gallery description verb-first?
- [ ] Nothing pretends to be real-time; ticking values use system date styles; live progress moved to a Live Activity?
- [ ] No logo wall, app name, launcher grid or instructions; timestamp only when data lags checking frequency?

## Look it up

Availability and signatures change; check these (append `.md` for Markdown) rather than trusting this file. Availability quoted above was read from Apple's documentation on 2026-11-12.

- https://developer.apple.com/design/human-interface-guidelines/widgets — families per platform, rendering-mode table, dimensions per device, visionOS and Apple HomeView specifics (not distilled here).
- https://developer.apple.com/design/human-interface-guidelines/controls and https://developer.apple.com/design/human-interface-guidelines/live-activities
- https://developer.apple.com/documentation/widgetkit — hub: timelines, interactivity, controls, Live Activities.
- https://developer.apple.com/documentation/widgetkit/displaying-the-right-widget-background — `containerBackground(_:for:)`, removable backgrounds.
- https://developer.apple.com/documentation/widgetkit/adding-interactivity-to-widgets-and-live-activities — `Button(intent:)`, `Toggle(isOn:intent:)`.
- https://developer.apple.com/documentation/widgetkit/widgetrenderingmode and https://developer.apple.com/documentation/widgetkit/widgetfamily

## Relationship to other skills

- **`apple-design` (ios-brand-identity)** — widgets extend brand beyond the app (its Crumbl example); decide the brand expression there, apply these widget rules here.
- **`apple-design` (app-intents-design)** — widget configuration and (iOS 17+) interactive widgets run on App Intents; structure the intents there.
- **`apple-design` (chart-experience-design)** — a chart in a widget is a small static platter: no grids/labels, preview of a detail chart "a tap away."
- **`apple-design` (apple-typography)** / **[sf-symbols.md](sf-symbols.md)** — the type and symbol mechanics inside the widget.
- **`design-principles`** — *Simplicity* ("exactly enough" is the entire widget brief) and *Flexibility* (contextual relevance).
