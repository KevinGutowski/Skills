---
name: notification-design
description: "Design notifications worth receiving — when a notification earns the interruption, timing and frequency, grouping, and the self-contained package incl. Apple Watch. Use for notification strategy, permission flows, threading, or fatigue. Triggers: notification design, push strategy, notification fatigue, deliver quietly, provisional authorization, when to notify."
---

# Notification Design

**Sources/gaps:** [references/sources.md](references/sources.md) — 2 WWDC sessions; current-platform and rule-ID candidates in [references/coverage-gaps.md](references/coverage-gaps.md).

Attention is precious; interrupting people is a privilege — and users can silence or kill a bad channel in two taps. The only sustainable strategy: **fewer, more meaningful, well-organized notifications.** "The best notifications are for connecting people and delivering meaningful information."

## When is a notification worth sending?

- Every notification needs **a specific message or a task to complete** — "not just a reason to get people to launch into your app." Send when something *changes* or the user must act now (rain starting, food arrived, live game starting).
- **Stop sending to the unengaged** — Duolingo *pauses* reminders after missed sessions rather than escalating. Restraint preserves the channel.
- Be considerate about *when*: deliver by time/location; let users pick reminder times and alert frequency up front.
- **Granular in-app settings** (per-topic toggles like ESPN per-sport) — and register the deep link so the system's "Turn Off" sheet routes to *your* settings instead of killing everything.

## The permission moment

- **Prefer provisional/quiet delivery**: skip the prompt; deliver quietly to Notification Center with Keep/Turn Off embedded — people judge your notifications by *seeing real ones*. Right for passive content (articles, likes). Prompt for lock-screen permission only for genuinely timely content (messages, breaking news). ⚠️ **Marketing/promotional notifications are carved out** (current HIG): they require **explicit, dedicated opt-in** ("you must receive their explicit permission") plus an in-app setting to manage them — quiet delivery is *not* consent, and Time Sensitive is never allowed for marketing.
- If you prompt: **never on first launch**; explain the value in context; ask at the moment of understanding (after the order is placed; for flight-delay alerts after booking). Same need-to-know ethic as `feature-discoverability`'s permission rule.

## Grouping & threading

iOS groups by app by default — usually leave it. Thread (`threadIdentifier`) only for *meaningfully distinct* streams: per conversation (Messages), per publication (News). **Don't over-thread** — Podcasts "resisted the temptation" to thread per show; one scannable group beat many scattered ones.

## The self-contained package

"Every notification should be like a little self-contained package of information… I shouldn't have to launch into the app to find value." The anatomy:
- **Short Look** answers *what is this about* — all fields populated, clear and direct.
- **Long Look** adds contextually relevant information — the richness ladder: full truncated content → **your app's own UI/typography** (charts, weather drawn graphically — "show information as it's designed in your app," like Castro's notification "typeset just like their app") → video/audio inline → **live-updating views** ("if your app updates in real time, your notifications should update in real time" — deliveries, flights, scores; Messages even shows the typing indicator).
- **Quick actions** complete the task in place (Accept with availability shown, Like/Comment, play an episode, "Can I help you?" to the doorbell camera) — then the user gets back to what they were doing.
- **Apple Watch:** notifications are "the primary way people interact with apps on Apple Watch," and alerts route to the most accessible device — design for both. Watch qualities: informative yet succinct, visually rich, actionable, quick — "we don't want to recreate the app experience." Tailor to the journey (the ticket QR going full-screen at the venue).

> **Staleness note (Kevin's rule):** 2017–2018 sessions. The strategy and anatomy persist; the delivery system has since gained **interruption levels** (passive/active/time-sensitive/critical, iOS 15), **Focus**, scheduled summaries, and **Live Activities** (which absorb the "live-updating notification" use case — see `apple-design` (app-intents-design)/`swiftui` (widget-design)). Verify current UserNotifications APIs before implementation.

## Checklist

- [ ] Each notification carries a message or task — would the *user* call it valuable?
- [ ] Unengaged users get fewer, not more; timing/frequency user-controllable; per-topic settings + registered deep link?
- [ ] Quiet/provisional delivery for passive content; prompt (if ever) in context, never at first launch?
- [ ] Threads only for meaningfully distinct streams?
- [ ] Complete-the-task-in-place: rich Long Look in your app's design language, useful quick actions, Watch-appropriate?

See `references/examples.md` for the worked examples (Duolingo's pause, the Podcasts threading restraint, the Castro/Kuna/Mic Long Looks, Watch flows).

## Relationship to other skills

- **`ux-writing` (ui-voice-and-tone)** — owns the notification *copy* (tone dialing per moment); this skill owns the *strategy and anatomy* (whether/when/what form).
- **`swiftui` (sound-design)** — the notification sound criteria (distinguishable, short, neutral when content varies) pair with this skill's restraint rules.
- **`feature-discoverability`** — shares the permission ethic: ask in context, value first.
- **`swiftui` (widget-design)** / **`apple-design` (app-intents-design)** — Live Activities now own continuous glanceable state; route persistent-status use cases there.
- **`design-principles`** — *Responsibility* (attention as a resource) and *Utility*; use it to weigh whether a moment earns an interruption.
