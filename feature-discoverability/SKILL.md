---
name: feature-discoverability
description: Make app features discoverable — design first launches that lead with content (defer signup, ask permissions in context), apply the five discoverability principles (prioritize important features, visual cues, gesture hints with visible alternatives, organize by behavior, convey control over personalization), and use TipKit well (educational not promotional tips, eligibility rules, frequency caps, invalidation). Use when designing a first-run experience, deciding what's visible vs hidden, adding tips or feature hints, making gestures discoverable, fixing features users never find, or reviewing onboarding-free teaching. Based on Apple WWDC sessions 816 (2017), 10126 (2021), and 10229 (2023). Triggers: discoverability, first launch, feature discovery, hidden feature, TipKit, tips, hint at gesture, hamburger menu, empty search field, blank page problem, defer signup, permission prompt timing, users can't find.
---

# Feature Discoverability

**Sources** — this skill aggregates three Apple sessions:
- *Apple WWDC 2017, session 816 — "Love at First Launch." https://developer.apple.com/videos/play/wwdc2017/816/*
- *Apple WWDC 2021, session 10126 — "Discoverable design" (Jiabao Li & Mylène Dreyer). https://developer.apple.com/videos/play/wwdc2021/10126/*
- *Apple WWDC 2023, session 10229 — "Make features discoverable with TipKit" (Ellie Gattozzi & Charlie Parks). https://developer.apple.com/videos/play/wwdc2023/10229/*

"Your app doesn't get a second chance at a first impression" — and onboarding tutorials don't work ("I always skip through these onboarding screens"). Discoverable means people "can look at a screen and, before they touch anything, know what they can do, and how." **Learning by doing beats reading instructions.**

## First launch: remove every barrier (2017)

- **Lead with great content** — never a registration wall; let people browse and use the app within seconds.
- **Defer signup to the moment of commitment** (booking the trip), when the account's benefit is self-evident.
- **Question whether instruction is needed at all** — the Phone app needs zero tooltips. Then **teach by doing**: Lara Croft GO's first levels teach every gesture with no tutorial; "it's been seconds since you first launched this app and you're already using it like a pro."
- **Permissions on a need-to-know basis:** ask in context (location when starting a ride, photos when adding one). If one is genuinely required upfront, make the value obvious *before* asking and reinforce *immediately after* (Transit: tap Allow → map instantly shows nearby departures).

## The five principles (2021)

1. **Prioritize important features** — essentials immediately visible; hamburger menus fail testing ("the three lines don't convey anything about the features inside") → tab bar; but 6+ tabs fails too. Match placement to frequency (frequent = thumb-reachable).
2. **Provide visual cues** — spell out only what can't be inferred from the real world, iOS conventions, or prior use. Icons need **text labels** (a camera glyph could mean photo/scan/QR). Solve the **blank-page problem**: seed inputs with examples. Teach in context with animation + haptics, not onboarding screens.
3. **Hint at gestures — gestures are shortcuts, never the only way.** They're invisible: always keep a visible primary path (swipe-down dismiss *and* a back button; double-tap-to-like *and* a heart). Let animations teach them (the back button's slide-down transition implies the swipe).
4. **Organize by behavior** — categorize by people's real motivations, not exhaustive taxonomy; "when people don't have to type in a search bar, it is usually a sign that your content is discoverable."
5. **Convey control over personalization** — labels state consequences ("Suggest toast like this" beat both hearts and thumbs in testing); disclose implicit signals ("Because you added…"); make recommendation controls inline and quick, not buried in More Options.

## Tips done right: TipKit (2023)

Tips are **education, not promotion**: teach a new feature, surface a hidden one, show a faster way — to "those who would benefit," without "getting in the way."
- **Anatomy:** title = direct action phrase; message = short, instructional, actionable benefit. Not promos, not errors, not FYI announcements. Popover (points at an element) or inline (reflows layout, blocks nothing) — always next to what it describes.
- **Eligibility:** parameter rules (logged in) + event rules (opened the view ≥3 times — let people explore organically first), date-filtered or value-grouped donations for precision.
- **Frequency & exit:** one tip at a time; `DisplayFrequency` (daily/hourly/custom); `invalidate(.userPerformedAction)` the moment they do the thing; `maxDisplayCount` caps unactioned impressions; iCloud sync avoids teaching twice.

> **Staleness note (Kevin's rule):** the 2023 talk uses beta-era API names (`TipsCenter`, `.popoverMiniTip`); the shipped SDK renamed these (`Tips.configure`, `.popoverTip(_:)`, etc.) — verify against current TipKit docs before writing code. The design rules are stable.

## Checklist

- [ ] First launch reaches real content in seconds; signup deferred to commitment; permissions asked in context?
- [ ] Essentials visible (no hamburger burial); icons labeled; inputs seeded against the blank page?
- [ ] Every gesture has a visible alternative; transitions hint at the gestures they mirror?
- [ ] Content organized by motivation; personalization controls labeled with consequences and easy to reach?
- [ ] Tips educational, eligibility-gated, frequency-capped, invalidated on action?

See `references/examples.md` for the worked examples (Jetsetter, Strava, Toasty, the TipKit eligibility code).

## Relationship to other skills

- **`user-onboarding`** — Hulick's flow/persuasion framework (sell the better user, quick wins) for signup and empty states; this skill is the Apple in-app teaching layer (no-tutorial first launch, cues, gestures, tips). Compose: structure the journey there, make features findable here.
- **`touch-interaction-design`** — its teach-by-showing section (clipped content, planes, gesture-aligned animation) is the interaction mechanics behind principle 3.
- **`app-intents-design`** — the Siri Tip is this skill's pattern applied to shortcuts; same dismissibility ethic.
- **`apple-navigation-design`** — tab bars vs hidden menus is its structural domain; this skill supplies the *why* (discoverability testing).
- **`design-principles`** — *Agency* (explore at your own pace) and *Familiarity*; permission timing also lives under its *Responsibility*.
