# App Intents Design — Worked Examples

*Sources:*
- *WWDC 2022, 10169 — "Design App Shortcuts." https://developer.apple.com/videos/play/wwdc2022/10169/*
- *WWDC 2022 companion code: "Implement App Shortcuts with App Intents"; WWDC 2024 companion: "Bring your app's core features to users with App Intents."*
- *WWDC 2024, 10176 — "Design App Intents for system experiences." https://developer.apple.com/videos/play/wwdc2024/10176/*

Both are design-track talks with no Code-tab samples; the implementation counterparts carry the code. The 2022→2024 guidance shift ("a few habitual tasks" → "anything your app does") is the key historical note.

---

## Phrasing examples (2022)

- **Voice Memos:** "Record Voice Memo" needs explicit synonyms "Start Voice Memo" and "New Voice Memo" or those utterances fail. But not "Save Voice Memo" — "the intent is truly to create, not to save." Synonyms required per shipping language.
- **Panera:** "Start Panera order" — "Panera Bread is the official app name, but the Panera synonym feels more natural in the phrase." App Store alternative names are legal in phrases.
- **Meditation app:** "Start [Sleep] Meditation" — one dynamic parameter from a finite list users know (the meditation types). Each value becomes its own shortcut variant in Shortcuts/Spotlight. Anti-pattern: "Start sleep meditation **with nature sounds**" — the fixed tail reads as a second parameter, inviting "gratitude meditation with ocean sounds," which won't work. Never put open values (times, amounts) in the phrase — collect them in a follow-up.
- The gut check: "If it feels too complicated when you say it aloud, it probably is."

## The collection ladder, worked (2022)

1. **Assume:** "Start meditation" while one is paused → resume it; no question.
2. **Parameter confirmation:** assume the *last-ordered* coffee and ask "Order a large iced chai latte?" — one tap/word to proceed.
3. **Disambiguation:** first-time meditation → "What kind of meditation? Focus, Gratitude, Walking, Compassion, or Sleep?" — **≤5 options** because AirPods users hear the whole list.
4. **Open-ended:** "How many minutes?" — built-in number type gets Siri's NLU + standard visuals free.
5. **Intent confirmation:** reserved for money/destructive/high-stakes (a calendar invite to a big group). Buttons restate the verb — "Order" / "Cancel," never "Confirm" (ambiguous against a Cancel button; same finding as the subscription-alert example in `apple-navigation-design`).

## Output examples (2022)

- **Live Activity vs. snippet:** food order in transit, countdown timer → Live Activity (persists on the Lock Screen until done). A completed order summary → custom snippet on the semitranslucent material with vibrant labels.
- **Dialog:** if the snippet already shows "Large iced chai latte — $4.75," suppress the supporting dialog; but ship **full dialog** ("Your large iced chai latte is ordered — $4.75, ready at 2:15") for AirPods/voice-only.
- **watchOS:** the coffee app moved its address line beneath the header on watch for readability — re-review snippet layouts per platform.

## Structure examples (2024)

- **Flashlight:** "Set Flashlight" with a required on/off asks every single run; **Toggle as the default parameter value** acts immediately.
- **Notes folders:** "Open Folder" with an *optional* folder parameter — unset, it opens the folders view, "providing the full folder-picking experience, instead of asking you which folder you want to open every time."
- **Reminders:** one "Add Reminder" intent with entity parameters — not an intent per list or per reminder.
- **Camera:** the mode parameter summary stays a grammatical sentence for every mode value.
- **Freeform:** "Create Board" finishes by opening directly to the new board — "Open When Run" on by default, off for people chaining it in multi-step shortcuts.
- **Anti-patterns named in the talk:** intents that "tap the cancel button" or "swipe down on a platter" (UI gestures, not tasks); several intents for the same task; required parameters that interrogate on every run.

## Discoverability & ordering (2022)

- First array entry = Spotlight top hit when someone searches your app name; it can even surface before typing if your app is a Siri Suggestion.
- Parameter ordering is dynamic: surface the **most recently / most frequently** used entity first (the chai latte beats the cappuccino) — "so that it doesn't feel random or unpredictable."
- **Siri Tip** placement: "immediately before or after completing an action that they may want to repeat," always dismissible — "respect people's desire to remove this helpful information from their workflow." There's also a system button deep-linking to your app's page in the Shortcuts app.
- Give every shortcut an SF Symbol that reflects the intent; choose a custom accent color for the Shortcuts app tile.
