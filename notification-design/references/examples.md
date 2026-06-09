# Notification Design — Worked Examples

*Sources: WWDC 2017-817 "Rich Notifications"; WWDC 2018-806 "Designing Notifications" (Jon Dascola & Heena Ko).*

## Strategy (806)

- **History framing:** the original iPhone's "blue box modal alert" era — every notification an interruption "that needed to be dealt with immediately." iOS 12's two-tap Deliver Quietly/Turn Off flipped the power balance: abuse the channel and lose it.
- **Worth sending:** Dark Sky "Rain is starting soon"; DoorDash food-arrived; HQ live-game-starting — something changed or act now.
- **Duolingo's pause:** after missed sessions it *stops* sending reminders rather than escalating — short-term restraint preserves long-term channel access.
- **Headspace:** users pick their own reminder time — "it would be terribly ironic if they were the ones sending me frustrating notifications." CNN asks alert-frequency preference up front.
- **Settings exemplars:** ESPN per-sport granularity; NYT per-section toggles; register the deep link so the system's Turn Off sheet offers your settings as the alternative.
- **Provisional authorization decision:** passive (long-form articles, likes/comments, game promos) → quiet to Notification Center with embedded Keep/Turn Off; timely (breaking news, messages, live games) → ask for lock screen. Prompt only after value is understood (delivery app after the order; travel app for gate changes).
- **Threading:** Messages per conversation, News per publication — but Podcasts kept one "new episodes" group: easier to scan than per-show threads.

## The package (817 + 806)

- **Recap line (817):** "The Short Look should describe what the notification is about. The Long Look should provide some contextually relevant information, and the Quick Actions should provide some quick actions."
- **Calendar:** Long Look shows the event *plus your day's availability* — exactly what you need before tapping Accept inline.
- **Mic:** read the entire breaking-news article inside the Long Look without losing your place.
- **Castro:** title, duration, description, artwork — "typeset just like their app" — plus a start-listening action; the model for carrying design language into notifications.
- **Kuna doorbell:** "If you are telling me someone is at my front door… I just want to play the video back right in the Long Look," with a "Can I help you?" action. (The friend-Chance running gag.)
- **Voicemail:** listen or read the transcription with actions, "without ever having to go into the phone app."
- **Live-updating:** Find My Friends updates location in real time — "if your app updates in real time, your notifications should update in real time" (today this is Live Activities territory). Messages' typing indicator "lets me know to keep the notification open for just a moment longer."
- **Photos / Podcasts richness:** full image with Like/Comment inline; consolidated thread summary with per-episode play buttons via discrete tap regions.

## Apple Watch (806, Heena Ko)

- Alerts route to the most accessible device — phone in a bag means the Watch gets it; design for both.
- Free carry-over: title, body, attachments, quick actions; customize sash/background color, images, inline video.
- Interactive exemplars: DiDi rate-and-pay, PayByPhone parking-extension steppers, Yelp table-hold extension, medication "Take all."
- Journey-tailored: Wallet ticket's QR goes full-screen on venue arrival; Qantas pickup flow with ETA, time-to-leave, map, and a running-late message.
- Watch qualities: informative yet succinct, visually rich, actionable, quick — "we don't want to recreate the app experience."

Quotables: "Everyone likes their likes." / "Send notifications only when they're relevant. Don't spam. Don't send them to boost traffic or engagement." / "Don't think of notifications as just a hook into your app."
