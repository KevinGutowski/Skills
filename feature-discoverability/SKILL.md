---
name: feature-discoverability
description: "Make app features discoverable — first launches that lead with content, the five discoverability principles, and TipKit done well. Use when designing a first-run experience, deciding what's visible vs hidden, adding tips or gesture hints, or fixing features users never find. Based on WWDC sessions. Triggers: discoverability, first launch, TipKit, hidden feature, hint at gesture, defer signup, users can't find."
---

# Feature Discoverability

**Sources:** [references/sources.md](references/sources.md) — 3 WWDC sessions + Ryo Lu.

"Your app doesn't get a second chance at a first impression" — and onboarding tutorials don't work ("I always skip through these onboarding screens"). Discoverable means people "can look at a screen and, before they touch anything, know what they can do, and how." **Learning by doing beats reading instructions.**

## First launch: remove every barrier (2017)

- **Lead with great content** — never a registration wall; let people browse and use the app within seconds.
- **Defer signup to the moment of commitment** (booking the trip), when the account's benefit is self-evident.
- **Question whether instruction is needed at all** — the Phone app needs zero tooltips. Then **teach by doing**: Lara Croft GO's first levels teach every gesture with no tutorial; "it's been seconds since you first launched this app and you're already using it like a pro."
- **Permissions on a need-to-know basis:** ask in context (location when starting a ride, photos when adding one). If one is genuinely required upfront, make the value obvious *before* asking and reinforce *immediately after* (Transit: tap Allow → map instantly shows nearby departures).

Field datum shipping these rules solo (Paul Stamatiou, "Stocketa," 2023 — https://paulstamatiou.com/stocketa/): "I didn't want the onboarding flow to be too long or required, opting to get people into the app sooner" — a short skippable intro, then a **tips card living in the main feed** teaching the core interactions (chart scrubbing, swipe actions) at the user's own pace. Onboarding gets them in; in-context tips do the teaching.

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

## Designing in layers (Ryo Lu)

Discoverability over a product's lifetime, not just first launch — software should grow with the user through layers that "reveal themselves exactly when you need them" (tweet). In the Alan Kay open-the-hood lineage: "the goal isn't to hide complexity — it's to sequence its reveal."
- **The hard part is transitions.** Outgrowing the defaults "shouldn't feel like hitting a wall. it should feel like discovering a secret door that was always there" (tweet).
- **Layered, not additive.** Secondary capabilities must stay "layers of the core concepts… not kind of linearly like additive" thrown "all at you at once" — each layer reuses the concepts the user already holds.
- **Migration ethic.** Move defaults as the world moves, but bring existing users "onto better ways to do things… without feeling like they're behind" — "carry them over instead of like teleporting them to the new world." Nudges and defaults are the most powerful levers; always leave a way out.
- **Design re-entry for churned users.** Lu himself tried Cursor and churned three times before the agent hooked him — people who bounced "kind of lost their trust" "and then they never" return on their own; the comeback path ("to come back cuz it's good now") is a discoverability surface too.

## Checklist

- [ ] First launch reaches real content in seconds; signup deferred to commitment; permissions asked in context?
- [ ] Essentials visible (no hamburger burial); icons labeled; inputs seeded against the blank page?
- [ ] Every gesture has a visible alternative; transitions hint at the gestures they mirror?
- [ ] Content organized by motivation; personalization controls labeled with consequences and easy to reach?
- [ ] Tips educational, eligibility-gated, frequency-capped, invalidated on action?

See `references/examples.md` for the worked examples (Jetsetter, Strava, Toasty, the TipKit eligibility code).

## Relationship to other skills

- **`user-onboarding`** — Hulick's flow/persuasion framework (sell the better user, quick wins) for signup and empty states; this skill is the Apple in-app teaching layer (no-tutorial first launch, cues, gestures, tips). Compose: structure the journey there, make features findable here.
- **`learning-experience-design`** — courses, workshops, internal training, job aids, and practice/feedback systems. This skill owns teaching inside the app surface; learning-experience-design owns broader instruction and transfer.
- **`touch-interaction-design`** — its teach-by-showing section (clipped content, planes, gesture-aligned animation) is the interaction mechanics behind principle 3.
- **`app-intents-design`** — the Siri Tip is this skill's pattern applied to shortcuts; same dismissibility ethic.
- **`apple-navigation-design`** — tab bars vs hidden menus is its structural domain; this skill supplies the *why* (discoverability testing).
- **`design-principles`** — *Agency* (explore at your own pace) and *Familiarity*; permission timing also lives under its *Responsibility*.
