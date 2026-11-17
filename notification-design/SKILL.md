---
name: notification-design
description: "Design notifications worth receiving on Apple platforms (iOS/watchOS) — when a notification earns the interruption, timing and frequency, grouping, and the self-contained package incl. Apple Watch. Use for notification strategy, permission flows, threading, or fatigue; web push/email/Slack channels are out of scope. Triggers: notification design, push strategy, notification fatigue, deliver quietly, provisional authorization, when to notify."
---

# Notification Design

**Sources/gaps:** [references/sources.md](references/sources.md) — 2 WWDC sessions; current-platform and rule-ID candidates in [references/coverage-gaps.md](references/coverage-gaps.md).

Attention is precious; interrupting people is a privilege — and users can silence or kill a bad channel in two taps. The only sustainable strategy: **fewer, more meaningful, well-organized notifications.** "The best notifications are for connecting people and delivering meaningful information."

**Scope boundary:** this skill is Apple-platform (iOS/watchOS) notification strategy and anatomy. Web push, email, SMS, and Slack/Discord channels are out of scope until channel-specific evidence lands (tracked in [references/coverage-gaps.md](references/coverage-gaps.md)) — the restraint principles may rhyme, but don't apply the iOS mechanics (provisional delivery, threading, Short/Long Look) to them.

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

## Urgency, Focus and Live Activities (current system)

The sessions predate these; rules verified against the HIG and Apple docs on 2026-11-12. Detail, the level table and the Live Activity lifecycle: [references/delivery-system.md](references/delivery-system.md) — read it when assigning urgency or choosing between notifications and a Live Activity.

- **Assign every notification type the lowest honest interruption level:** Passive (view at leisure) → Active (default) → Time Sensitive (about now or the next hour; breaks through Focus and the scheduled summary) → Critical (health/safety, entitlement-gated — never a business choice). Over-claiming gets Time Sensitive switched off for the whole app.
- **Expect to be filtered.** Focus holds alerts and the scheduled summary batches Passive/Active ones; write those so they still make sense read late, and rank them by value with the relevance score instead of escalating or re-sending. Messaging apps adopt communication notifications so people can let specific senders through.
- **A status that keeps changing is a Live Activity, not a stream of notifications:** a task with a defined start and end, updated over minutes to hours (delivery, ride, match). Never send a push and a Live Activity update for the same change; update only when content changes, alert only for the essential ones, mark stale data, and end it with final content and a deliberate dismissal time.

> **Staleness note:** the strategy and anatomy sections above come from 2017–2018 sessions and persist; the section just above tracks a moving system — re-fetch the HIG `managing-notifications`, `notifications` and `live-activities` pages before quoting a number or implementing.

## Checklist

- [ ] Each notification carries a message or task — would the *user* call it valuable?
- [ ] Unengaged users get fewer, not more; timing/frequency user-controllable; per-topic settings + registered deep link?
- [ ] Quiet/provisional delivery for passive content; prompt (if ever) in context, never at first launch?
- [ ] Threads only for meaningfully distinct streams?
- [ ] Each type has the lowest honest interruption level; nothing marketing above Active; copy survives a Focus or summary delay?
- [ ] Evolving status handled by one Live Activity (with stale state and planned end), not repeated pushes?
- [ ] Complete-the-task-in-place: rich Long Look in your app's design language, useful quick actions, Watch-appropriate?

See `references/examples.md` for the worked examples (Duolingo's pause, the Podcasts threading restraint, the Castro/Kuna/Mic Long Looks, Watch flows).

## Relationship to other skills

- **`ux-writing` (ui-voice-and-tone)** — owns the notification *copy* (tone dialing per moment); this skill owns the *strategy and anatomy* (whether/when/what form).
- **`swiftui` (sound-design)** — the notification sound criteria (distinguishable, short, neutral when content varies) pair with this skill's restraint rules.
- **`feature-discoverability`** — shares the permission ethic: ask in context, value first.
- **Live Activities** — the notification-vs-Live-Activity decision and lifecycle rules are in this skill's [references/delivery-system.md](references/delivery-system.md). Neighbours hold only adjacent pieces: `swiftui` (widget-design) the widget-extension side that Live Activity UI is built in, `apple-design` (app-intents-design) the snippet-vs-Live-Activity choice for intents; presentation specs come from the live HIG `live-activities` page.
- **Notifications as automation triggers (iOS 27)** — one design note lives in `apple-design` (app-intents-design), second-hop file `app-intents-design/siri-ai-ios27.md`; this skill has no further automation guidance.
- **`apple-design` (hig)** — the current-spec tiebreaker: this skill's sources are 2017–2018 sessions plus patches, so fetch the live HIG `managing-notifications` and `notifications` pages via that playbook before citing letter-of-the-law behavior or implementing.
- **`design-principles`** — *Responsibility* (attention as a resource) and *Utility*; use it to weigh whether a moment earns an interruption.
