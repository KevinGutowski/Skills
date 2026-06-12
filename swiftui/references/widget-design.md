# Widget Design

*Scope: Designs home-screen widgets that are personal, informational, and contextual — content strategy per size, configuration over cramming, Smart Stack relevance, the don'ts (no logos, app names, timestamps). Use when designing or reviewing a widget, deciding sizes or content, or auditing glanceability. Based on WWDC 2020; predates lock-screen/interactive widgets. Triggers: widget design, WidgetKit, widget sizes, smart stack, glanceable.*

*Source: Apple WWDC 2020, session 10103 — "Design great widgets" (Mac & Christian, Human Interface design). https://developer.apple.com/videos/play/wwdc2020/10103/*

Widgets are "all about content": surface the most useful information people repeatedly open your app for. The process splits into **ideation** (what to surface) and **creation** (sizes, layout, personality). A widget is *not* a mini-app and *not* a launcher — it's glanceable content that happens to deep-link.

## Ideation — personal, informational, contextual

- **Personal** — enable emotional connection (Calendar's present glyph on a contact's birthday; Photos surfacing "the best photos instead of just the most recent ones," and memories from this day in past years).
- **Informational** — a top-level overview that "can save people from doing commonly repeated actions in your app."
- **Contextual** — use signals to anticipate: Maps shows the parked car when away from home, travel time before a scheduled event, ETA home in the evening; Weather **raises forecast resolution to minute-level when it's raining**. Broaden relevance across the hour/day/week — Calendar shows *tomorrow* when today is done, never a blank.
- **Smart Stacks:** widgets rotate by behavior and context (weather in the morning, music on the commute, traffic in the afternoon) — supply relevance so yours surfaces at the right moment.
- **Configuration over cramming:** editing "eliminates the need to create complex widget layouts" — let people add several configured widgets (two weather cities side by side) instead of one dense one. Defaults must work with zero setup (current location). Consider multiple widget *kinds* (Stocks: watchlist summary + single symbol).

## Sizes & tap behavior

| Size | Content | Taps |
|---|---|---|
| **Small** | One most-useful idea; **max ~4 pieces of information** | 2020 said single-target; ⚠️ *current HIG:* widgets of **all sizes** may include interactive elements (buttons/toggles via App Intents) — only **inline accessory widgets** are single-target. Keep smalls near-single-purpose anyway. |
| **Medium/Large** | More content; large must *earn* it (Screen Time adds a bigger chart + detail, not a scale-up) | Multiple targets, each deep-linking to what was tapped |

Two layout strategies: **expanding** (same layout gains info per size — Weather) or **unique per size** (News: one rich story small, several medium). **"Make sure not to scale up your smaller widget into your larger widget"** — and don't support a size the idea doesn't justify. Tap styles: fill (whole widget), cell (content in its own shape), content (uncontained).

## Layout & personality rules

- **16pt default margins**; **11pt** tighter margins for graphic shapes (circles, inset platters).
- Corners near the widget edge should be **concentric with the widget's radius** — radius varies by device, so use the system container, don't hardcode.
- Type: SF Pro / SF Mono / SF Pro Rounded; a brand font only if the widget "still feels at home alongside other widgets." Support **light and dark**.
- **Placeholder required:** base graphics + blocked-in text areas, so live data lands "without having the layout or color shift around."
- Personality comes from the app's look (Weather's condition backgrounds, Calendar's red) or the **app icon's** visual language (Notes' notepad, Podcasts' purple gradient).

## The don'ts

- **No logos** — unless the app aggregates third-party content (then top-right corner only); **never word marks**.
- **Never the app icon or app name** in the widget (the home-screen label already says it).
- **No instructional text** that talks at the user — communicate graphically.
- ⚠️ **Timestamps — the 2020 "never" is reversed.** Current HIG: "If people are likely to check your widget more frequently than you can update it, consider displaying text that describes when the data was last updated." Default to none; add one only when freshness genuinely lags checking frequency.

> **Staleness note (Kevin's rule):** this is the iOS 14 foundation. Widgets have since gained Lock Screen/StandBy/CarPlay variants and **interactive widgets** (iOS 17+ — see the sizes table). Design for the **rendering modes**: full-color, **accented** (accent + primary groups), and **vibrant** (Lock Screen grayscale — "white or light gray for the most prominent content"), plus light/dark/clear/tinted appearances. Widgets refresh periodically, never continuously — use system date/time refresh, keep animations ≤2s, and "offer Live Activities to show real-time updates." Check current WidgetKit docs/HIG before citing specifics.

## Checklist

- [ ] Content is personal/informational/contextual — would someone keep this on their home screen?
- [ ] Small widget = one idea, ≤4 info pieces; interactivity only where it serves the glance?
- [ ] Larger sizes add value (not scaled-up smalls); unsupported sizes omitted?
- [ ] Configuration instead of cramming; zero-setup default; relevance supplied for Smart Stacks?
- [ ] Margins 16pt (11pt graphic), concentric corners via the system container, light+dark, placeholder stable?
- [ ] No logo, app name, or instructions; timestamp only when data lags checking frequency?

## Relationship to other skills

- **`apple-design` (ios-brand-identity)** — widgets extend brand beyond the app (its Crumbl example); decide the brand expression there, apply these widget rules here.
- **`apple-design` (app-intents-design)** — widget configuration and (iOS 17+) interactive widgets run on App Intents; structure the intents there.
- **`apple-design` (chart-experience-design)** — a chart in a widget is a small static platter: no grids/labels, preview of a detail chart "a tap away."
- **`apple-design` (apple-typography)** / **[sf-symbols.md](sf-symbols.md)** — the type and symbol mechanics inside the widget.
- **`design-principles`** — *Simplicity* ("exactly enough" is the entire widget brief) and *Flexibility* (contextual relevance).
