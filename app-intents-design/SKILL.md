---
name: app-intents-design
description: "Design App Intents and App Shortcuts across Siri, Spotlight, widgets, controls, and the Action button. Use when deciding which features to expose as intents, writing invocation phrases, structuring parameters, or choosing snippet vs Live Activity. Triggers: App Intents, App Shortcuts, invocation phrase, parameter summary, interactive snippet, Siri."
---

# App Intents Design

**Sources:** [references/sources.md](references/sources.md) — 3 Apple WWDC design sessions (2022–2025).

App Intents are units of your app's functionality the *system* can run — surfaced in Siri, Spotlight, widgets, controls, the Action button, Apple Pencil squeeze, and the Shortcuts app, available the moment the app is installed. The recurring design theme: **make it memorable, and make it readable as a sentence.**

> **Current guidance (2024+): "anything your app does should be an app intent."** Prioritize the most common functionality first, and balance "a rich set of flexible app intents" against "unclear, brittle" ones. (Historical note: 2022 guidance said expose only a few habitual tasks — superseded; the App Shortcuts *selection* advice below still applies to the curated shortcut set.)
>
> **Schema-first overlay (HIG, June 2026):** if your app is in a common domain (email, music, photos…), "consider adopting **app schemas** instead" — preset templates the system already understands, letting Siri AI surface features contextually "without the need to adopt individual App Shortcuts." App Shortcuts remain "useful for exposing unique features or custom content… in areas not covered by app schemas." Siri AI can also resolve "this/that" references when you **annotate onscreen views with app entities**; donate entities to the Spotlight index curated for *personal relevance* (recents, favorites — not the whole catalog, except email/messaging-type apps). And "only provide a custom response if built-in responses don't meet your app's needs." (App Shortcuts aren't supported on macOS; the underlying intents work via the Shortcuts app.)

## What makes a good intent

- **A task, not a UI gesture.** Model the underlying job (save draft, delete draft) — never "tap the cancel button." Start from the fundamental verbs: Open, Create, Get, Edit, Delete, Toggle/Set, Search.
- **Self-contained and straightforward** (the App Shortcut bar): completable without the app in focus, effortless to get through. "Start sleep meditation" yes; a multistep survey no.
- **One flexible intent, not many rigid ones** — not one intent per reminder; one intent with the reminder as a parameter.
- **Few and focused for App Shortcuts:** hard max 10, but "in most cases, the key features of your app can be captured in **two to five** high-quality app shortcuts."
- Background-runnable where possible — Live Activities, audio playback, recording can all run without foregrounding.

## The invocation phrase (App Shortcuts)

- Brief, memorable, function-revealing — it's what people *say*. **The app name must be in the phrase**, woven naturally ("Record Voice Memo", "Start Panera order" — an App Store *alternative name* like "Panera" counts).
- **Synonyms are mandatory work:** "Record Voice Memo" won't match "Start Voice Memo" or "New Voice Memo" unless you list them — in **every shipping language**. Stay on-meaning ("the intent is truly to create, not to save").
- **At most one dynamic parameter in the phrase**, and only for a finite, predictable list users already know (meditation types, rooms) — never open values like times. Beware fixed words that *look* like a second parameter ("…with nature sounds" invites "…with ocean sounds"). Gut check: **"If it feels too complicated when you say it aloud, it probably is."**

## Parameters

- The **parameter summary** must read as a grammatical sentence for *every* possible value.
- Type ladder: built-in types (numbers, dates, text — free dialog/visuals and Siri NLU) → static option set (your tabs) → **app entity** for options that change over time (user-created folders).
- **Prefer optional parameters** — they let the intent act immediately; an unset optional degrades gracefully (Notes' "open folder" with no folder just opens the folders view). Require a parameter only when the intent is useless without it (Search needs a query).
- **Binary states default to Toggle** — "Set Flashlight" should toggle by default, not interrogate "on or off?" every run.

## Collecting information — lightest pattern first

1. **Assume** and proceed (resume the in-progress meditation).
2. **Parameter confirmation** — present a meaningful default (last used, most popular).
3. **Disambiguation** — short list, **5 or fewer** (Siri reads them all aloud on AirPods).
4. **Open-ended request** — for numbers/locations/strings; make the expected type obvious; prefer built-in types.
5. **Intent confirmation** — *sparingly*, only for consequential actions (money, destructive, high-stakes). Buttons restate the action with a **verb — never "Confirm."**

## Output: snippets and dialog

- Snippets sit on a **semitranslucent material** — don't paint an opaque background; use vibrant label colors (Dark Mode handled).
- **Live Activity vs. snippet:** continuous glanceable state (order in transit, timer) → Live Activity; self-contained result → snippet. ⚠️ *HIG June 2026:* snippets are **iOS/iPadOS/macOS only — not supported on watchOS** (or tvOS/visionOS); this corrects the earlier watchOS claim. Confirmation snippets get a system Cancel + a primary button (default label **"Continue"** — prefer a specific verb via `ConfirmationActionName`); result snippets get a single **Done**. Dialogue text renders *above* the custom view by default — design the view to carry the meaning and omit redundant dialogue text from it.
- **Dialog:** suppress supporting dialog that just repeats the visual, but always provide **full dialog** for voice-only contexts (AirPods) carrying everything critical.

### Interactive snippets (2025)
Snippets now support **buttons and live-updating data**, appearing at the top of the screen (Spotlight/Siri/Shortcuts) and persisting until confirmed, canceled, or swiped away.
- **Glanceable:** text larger than system defaults; breathing room; margins via `ContainerRelativeShape`; stay well under the height cap — the 2025 talk said ~340pt, **the HIG (June 2026) sets the maximum at 400 points** (scrolling = "unexpected friction") — link into the app for more.
- **Lightly interactive:** buttons are simple supplements to the main task (one "add water" button); **update the data in the snippet itself** as success feedback so "people can build trust in your App Intent for their routines."
- **Two types:** **result** (outcome/info; only bottom button is "Done") vs. **confirmation** (action needed first; button is a clear **action verb** like "Order"). The confirmation → result sequence shows an intent starting and completing.
- Vibrant brand backgrounds are welcome, but check contrast "beyond standard contrast ratios" — including from a distance. And "challenge yourself to make your snippet understandable on its own, even if the dialog isn't shown or heard."

## Opening the app (2024 update)

Foregrounding is no longer a last resort — it's how people *see the result*. Two patterns: an intent that inherently opens a view (Clock → Stopwatch) conforms to **OpenIntent**; an intent that finishes with a UI change or results (Create Freeform Board → land on the board) gets the **"Open When Run" toggle (default on)**, which people can turn off when chaining intents in multi-step shortcuts.

## Discoverability & ordering

- The **Siri Tip** (replaces Add to Siri): show it right before/after an action someone may want to repeat — and keep it dismissible.
- The first shortcut in your array is the Spotlight top-hit; give each an accurate **SF Symbol**; pick a custom Shortcuts-app color ("don't just stick with the default").
- Parameter/entity ordering is dynamic — lead with **recency or frequency** "so it doesn't feel random."

## Checklist

- [ ] Intents model tasks (verbs), not UI elements; one flexible intent per task?
- [ ] 2–5 App Shortcuts; phrases brief with the app name woven in; synonyms per language?
- [ ] ≤1 dynamic phrase parameter, finite list only; passes the say-it-aloud test?
- [ ] Summary reads as a sentence for every value; optionals preferred; binaries toggle?
- [ ] Lightest collection pattern; disambiguation ≤5; confirmation only when consequential, verb-labeled?
- [ ] Snippet on system material; full dialog for voice-only; Live Activity where state is continuous?
- [ ] Open-the-app behavior deliberate (OpenIntent vs. Open When Run)?
- [ ] Siri Tip placed at the moment of value and dismissible?

See `references/patterns.md` for the worked examples (meditation app, Voice Memos phrasing, coffee-order disambiguation, flashlight toggle, Notes optional-folder).

## Relationship to other skills

- **`naming-features-and-labels`** — invocation phrases and intent names *are* naming problems (belongs / sets-expectation / travels, plus the say-it-aloud test both skills share). Pick the words there; structure the intent here.
- **`ui-voice-and-tone`** — Siri dialog is microcopy in your voice; dial it with that skill (concise + helpful turned up for voice-only).
- **`design-principles`** — *Simplicity* (lightest collection pattern) and *Agency* (confirmation only when consequential).
- **`apple-navigation-design`** — intents bypass navigation; when an intent opens the app, it should land where navigation would have taken you.
- **`error-messages`** — when an intent fails, failure dialog follows that skill's rules.
- **`swiftui` (widget-design)** — widget configuration and interactive widgets run on App Intents; design the widget there, structure its intents here.
- **`ai-experience-design`** — disambiguation/confirmation are its low-confidence patterns applied to voice; for LLM-backed intents, its prompting and safety rules apply.
