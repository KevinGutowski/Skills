# Delivery System: Interruption Levels, Focus, Summaries, Live Activities

*Scope: the delivery-system decisions the 2017–2018 sessions predate: which interruption level a notification gets, how Focus and the scheduled summary treat it, and when the job belongs to a Live Activity instead. Use when assigning urgency, reviewing Time Sensitive or Critical use, planning how a notification ranks in the summary, or choosing between a stream of notifications and a Live Activity. Triggers: interruption level, Time Sensitive, critical alert, Focus, scheduled summary, relevance score, Live Activity vs notification, stale date, dismissal policy, update budget.*

*Sources: Apple HIG "Managing notifications", "Notifications" and "Live Activities" (change log: October 13, 2026), and ActivityKit / UserNotifications documentation, all read 2026-11-12. Numbers below are Apple's as of that date; they are the volatile part — re-fetch the pages in "Look it up" before quoting one.*

## Contents

- Interruption levels: pick the lowest honest one
- Focus and the scheduled summary
- Live Activity or notification?
- Live Activity lifecycle: start, update, alert, stale, end
- Review checklist
- Look it up

## Interruption levels: pick the lowest honest one

Every noncommunication notification carries one of four system levels (iOS 15+, `UNNotificationInterruptionLevel`). Communication notifications (calls, messages) are ranked by *sender* instead and need the SiriKit communication intents.

| Level | For | Overrides scheduled delivery | Breaks through Focus | Overrides Ring/Silent |
|---|---|---|---|---|
| Passive | view-at-leisure information (a recommendation) | No | No | No |
| Active (default) | worth knowing when it arrives (a score update) | No | No | No |
| Time Sensitive | directly affects the person and needs attention now (account security, a delivery) | Yes | Yes | No |
| Critical | health and safety; "extremely rare" | Yes | Yes | Yes |

Decisions:

- **Default down, not up.** Ask "would the person be annoyed to find this later in the summary?" If no, it is Passive. Active is the default, not the floor.
- **Time Sensitive means now or within the hour.** The HIG test: an event "happening now or will happen within an hour." The system explains Time Sensitive on first delivery and periodically re-asks whether it is working, with a one-tap off switch — over-claiming loses the level for everything you send.
- **Never Time Sensitive for marketing**, even with marketing opt-in. Marketing must never break through a Focus or scheduled delivery.
- **Critical is not a design choice.** It needs an Apple-granted entitlement and is for health, safety and home-security classes of app. Do not propose it for business urgency.
- **Map levels to notification types once**, in a table the team can review (type → level → why), rather than choosing per send. Mis-levelled types are the commonest finding in a notification audit.
- Time Sensitive is enabled by a capability/entitlement, not an authorization option (the old `.timeSensitive` option is deprecated). Verify the current setup steps in the docs before describing them.

## Focus and the scheduled summary

- **A Focus filters; it does not delete.** People choose which contacts and apps may break through; everything else is held. The notification "is available as soon as it arrives" in Notification Center — only the alert is delayed. Design so a held notification still makes sense when read an hour later (no "tap now" copy for Passive/Active types).
- **The scheduled summary batches non-urgent notifications** at times the person picks. Passive and Active notifications can land there; Time Sensitive and Critical bypass it. Assume a large share of your Active notifications will be read in a batch next to other apps' items.
- **Rank within the summary** with the content's relevance score (`relevanceScore`, 0–1): the system uses it to choose the summary's featured notification. Score by value to the person (a message from a close contact above a digest), not uniformly high.
- **Communication apps:** adopt communication notifications so the sender's avatar shows and people can allow specific contacts through a Focus. Without that, a Focus treats your messages as generic app noise.
- **Don't engineer around the filters.** Re-sending, escalating levels, or splitting one event into several notifications to escape the summary is the fatigue pattern the body rules forbid; the HIG also says not to send multiple notifications for the same thing.
- **Mirror the system's controls in-app:** per-type toggles that correspond to your level table, so "turn off promotions, keep delivery alerts" is possible without the all-or-nothing system switch.

## Live Activity or notification?

| Situation | Use |
|---|---|
| One event; the person reads it once and maybe acts | Notification (with actions) |
| A task or event with a defined start and end whose status changes repeatedly over minutes to hours (delivery, ride, match, timer, workout) | Live Activity |
| Ongoing status with no end, or longer than about eight hours | Neither: a widget or in-app surface |
| A change the person must not miss *during* a Live Activity | An alerting Live Activity update — not a separate push for the same update |
| Ads, promotions, re-engagement | Neither surface may carry them without marketing opt-in; a Live Activity never |

The rule of thumb: three or more notifications about the same evolving thing is a Live Activity trying to get out. The reverse also holds: a Live Activity that never changes after it starts should have been one notification.

A Live Activity is not a notification layout. The HIG says "Don't replicate notification layouts" on the Lock Screen, and it must also work in the compact, minimal and expanded Dynamic Island presentations, StandBy, the Mac menu bar, the watchOS Smart Stack and CarPlay. Presentation design, sizes and layout rules: fetch the HIG page. Implementation lives in ActivityKit and WidgetKit; `swiftui` (widget-design) holds the widget-extension side.

## Live Activity lifecycle: start, update, alert, stale, end

- **Start at an expected moment** (order placed, ride requested, followed team's match begins) and give an in-app way to turn it off (unfollow, stop tracking). Unexpected Live Activities push people to disable them all in Settings. An App Shortcut that starts one is recommended.
- **Duration:** active for up to eight hours, then the system ends it; it can stay on the Lock Screen up to four more hours (12 total).
- **Update only when content changes.** There is no fixed public number for the push update budget: the system allows "a certain budget" of ActivityKit pushes per hour and may throttle beyond it. Low-priority pushes (`apns-priority: 5`) do not count toward the budget; send high priority (`10`) only for changes that matter at once, and mix the two. Apps that need many updates per minute (live sports) declare the frequent-updates Info.plist key, which people can switch off in Settings — detect that and reduce server frequency. Static plus dynamic data is capped at 4 KB.
- **Alert sparingly.** An alerting update lights the screen, plays the notification sound and shows the expanded presentation or a banner. Reserve it for changes that need attention (driver arrived, final score), not every tick.
- **Staleness:** set a stale date on each update when the data can go out of date without you (lost connectivity, server lag). At that date the activity state becomes stale and the view's context reports it; design a visibly "may be out of date" state (dimmed value, "last updated" time) instead of showing a confident wrong number.
- **End immediately when the task ends, with final content.** An ended activity leaves the Dynamic Island and CarPlay at once but stays on the Lock Screen, Mac menu bar and Smart Stack for up to four hours by default. Choose a dismissal time proportional to the activity — the HIG says 15 to 30 minutes is usually adequate (a ride summary that allows a tip) — or immediate when the summary has no value.
- **Sensitive content:** Live Activities are visible on the Lock Screen and Always-On display; show an innocuous summary and reveal detail in the app.

## Review checklist

1. Every notification type has an assigned level and a one-line reason; nothing is Time Sensitive that is not about the next hour; no marketing above Active.
2. Passive/Active copy still makes sense read late in a summary; relevance scores differ by value.
3. Messaging-type notifications use communication notifications.
4. No event sends both a push and a Live Activity update; repeated same-topic pushes were considered for a Live Activity.
5. Live Activity has a defined end, an in-app off switch, a stale state, final content on end, and a deliberate dismissal time.
6. Update plan names which updates are high priority and which alert.

## Look it up

Append `.md` to fetch as Markdown (playbook: `apple-design` (hig)).

- HIG: `https://developer.apple.com/design/human-interface-guidelines/managing-notifications`, `.../notifications`, `.../live-activities`
- `https://developer.apple.com/documentation/usernotifications/unnotificationinterruptionlevel` and `.../usernotifications/unnotificationcontent/relevancescore`
- `https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities` (duration, 4 KB limit, stale date, dismissal policy)
- `https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications` (update budget, priorities, frequent updates)
