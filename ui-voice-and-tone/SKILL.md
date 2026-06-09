---
name: ui-voice-and-tone
description: "Define an app's writing voice and adapt its tone per situation, and craft the microcopy that carries them — welcome screens, notifications, alerts, buttons, empty states, conversational flows — plus the simplify pass (remove fillers, avoid repetition, lead with the why, keep a word list). Use when establishing or auditing a product's voice, dialing tone for a moment (celebratory, clinical, playful), writing or reviewing UI microcopy, or trimming copy. Defers naming to naming-features-and-labels, failure copy to error-messages, long-form to write-clear-prose. Based on Apple WWDC sessions 10037 (2022), 10140 (2024), and 404 (2025). Triggers: voice and tone, UX writing, microcopy, copy review, welcome screen copy, notification copy, button label wording, empty state copy, dial up tone, filler words."
---

# UI Voice and Tone

**Sources** — this skill aggregates two Apple Human Interface talks on UX writing:
- *Apple WWDC 2024, session 10140 — "Add personality to your app through UX writing" (Alex & Liv, Human Interface design team). https://developer.apple.com/videos/play/wwdc2024/10140/*
- *Apple WWDC 2022, session 10037 — "Writing for interfaces" (Kaely Coon & Jennifer Bush). https://developer.apple.com/videos/play/wwdc2022/10037/*
- *Apple WWDC 2025, session 404 — "Make a big impact with small writing changes" (Liv Huntley & Jennifer Bush). https://developer.apple.com/videos/play/wwdc2025/404/*

Writing is a design discipline, not decoration — when words work seamlessly with the design, you barely notice them, yet they carry every part of the experience. Every app already has a personality whether or not you chose it. This skill **defines the voice, adapts the tone per moment, and writes the microcopy** that expresses both. It owns overall voice/tone and general in-product copy; it routes naming, failure copy, and long-form prose to the skills below.

## Voice vs. tone — the spine

- **Voice** = the expression of your brand and values through words — the things that *don't* change. (Apple's own working set: clarity, simplicity, friendliness, helpfulness.)
- **Tone** = how that voice flexes to the situation — the things that *should* change moment to moment.

The kids'-savings app's voice stays *kind / fun / encouraging* throughout, but its tone goes punchier on a win and gentler on a setback. The 2022 talk and the 2024 talk converge here: **develop the voice first, then vary the tone.**

## Define your voice

The sticky-note exercise (one idea per note, don't filter):
1. **Imagine the app as a person** — who are they? Write every adjective that fits.
2. **Group into themes** — alike words cluster (e.g. *smart / articulate / sharp* → "smart"). Off-theme words you like (e.g. *quick-witted*) can still inform word choice later.
3. **Land on ~3–4 attributes** — these become the definition of your voice.

> The voice attributes you land on **are the names of your tone dials** — this is the hinge into the next section.

*Defer:* choosing the actual word on a button/feature/value is naming, not voice → `naming-features-and-labels`. Here you're defining the felt character of the prose, not the noun.

## Dial the tone for the moment

Apple's four qualities sit in gentle tension (more friendliness costs some simplicity, and vice versa) — that tension is the control surface. Four steps:
1. Pick four qualities that describe your voice.
2. Place them on a spectrum.
3. Decide the balance the **situation** needs.
4. Write to that balance.

**The rule: never turn a dial all the way down — adjust the balance.** (And some qualities, like *smart*, are always on; you don't dial them.)

| Situation | Dial up | Dial down (not off) |
|---|---|---|
| Celebration (hit a goal) | friendliness | simplicity, helpfulness |
| Health / security alert | clarity | friendliness |
| Connectivity / blocking error | helpfulness + clarity | friendliness |
| New-feature intro | friendliness + helpfulness | simplicity |

*Defer:* failure-state tone has its own ruleset (no "Oops!", reassure what's safe, don't blame, give a way out) → `error-messages`. This skill sets where the serious/clinical dial sits in general; that skill owns what to say when something breaks.

## Write the screen — PACE

The 2022 framework is the screen-level craft that carries the voice:

- **Purpose** — name the single most important thing on the screen; use information hierarchy; **know what to leave out**; give every screen (and the whole flow) a purpose.
- **Anticipate** — treat the app as a conversation; develop voice first, vary tone; keep a list of common terms; always answer *"what comes next?"*
- **Context** — write for where/how the person is (driving, at an airport, mid-task); use alerts only for a real confirm/choice; make button labels specific and self-explanatory (not Yes/No, not Confirm/Cancel); write useful empty states.
- **Empathy** — write for everyone in plain language; avoid idioms/humor that won't translate; respect localization (length, vertical space, RTL); make VoiceOver/accessibility text carry *intention and context*, not just appearance, and avoid unnecessary gender.

*Defer:* sentence-level prose mechanics (rhythm, paragraphing, cutting clutter in long copy) → `write-clear-prose`.

## Simplify — four small edits with big impact (2025)

"UX writing is all about economy of language." Fast passes over existing copy:
1. **Remove fillers** — adverbs like *easily/quickly/simply* (test: does each word add value?), interjections (*oops/hooray*), empty pleasantries (*we're sorry* in an alert "sounds insincere"), decorative punctuation. Keep a modifier only when it clarifies behavior ("feed your pets **automatically**").
2. **Avoid repetition** — don't restate the headline in the body; combine. ("Uh oh. We're running late…" collapsed to **"Delivery delayed 10 minutes. Check the app for your driver's location."**)
3. **Lead with the why** — "To get reservation updates, enter your phone number," not the reverse. Especially for errors, notifications, and tips.
4. **Keep a word list** — words you use / words you avoid / definitions ("alias," not Handle/User Name); button labels belong on it; seed from the Apple Style Guide. "Consistency helps provide clarity."

## Keep it useful (the guardrail both talks share)

Personality serves the experience, never the reverse — look for the **special moments** where it can shine, and don't trade away usefulness for it. Then **read it aloud** and ask: *does this sound like the best version of this app?* Avoid jargon; write inclusively.

## Checklist

- [ ] Voice defined as ~3–4 attributes, consistent across screens?
- [ ] Tone dialed to the moment — and **no dial fully off**?
- [ ] Each screen has one clear purpose; everything else cut or moved?
- [ ] Buttons specific and understandable on their own (no Yes/No, no Confirm/Cancel)?
- [ ] Alerts reserved for a real choice; destructive action clearly marked?
- [ ] Empty states educate or guide (not just decorate)?
- [ ] Plain language; no untranslatable idioms; localization-safe?
- [ ] Accessibility text conveys intention + context; no unnecessary gender?
- [ ] Read aloud — sounds conversational and like *us*?

## Relationship to other skills

This skill owns the app's **overall voice and tone** and the general microcopy that carries them. It sits beneath `design-principles` and serves *Delight* (the feeling you want) and *Familiarity* (sounding like one coherent, trustworthy product). Compose with the skills below; defer the specialized units to them.

- **`naming-features-and-labels`** — names the individual *thing* (feature, label, value, button, plan). Voice is the felt character of prose; a name is one chosen word judged on belongs / sets-expectation / travels. Define the voice here; pick and defend the word there. The exercises rhyme (adjective-clustering vs. Think/Feel/Do) but produce different outputs — run the right one.
- **`error-messages`** — owns failure-state copy and its tone rules. This skill sets the general serious/clinical dial; route any "write/review an error" task there.
- **`write-clear-prose`** — long-form nonfiction craft (sentence rhythm, structure, cutting clutter). UI microcopy is a different unit; share the read-aloud instinct, route essays/articles there.
- **`ios-brand-identity`** — places brand in the iOS content layer and names this skill as the voice/tone arm. Decide *where* brand belongs there; define and write the voice here.
- **`user-onboarding`** / **`linear-settings-copy`** — voice applied to specific surfaces (first-run, empty/welcome states; settings IA/rows). Set the voice here; structure and write the surface there.
- **`app-intents-design`** — Siri dialog and snippets are voice-only microcopy with their own constraints (full dialog for AirPods, ≤5 disambiguation options); set the voice here, apply the intent patterns there.
- **`notification-design`** — owns notification *strategy and anatomy* (when to send, grouping, rich content); this skill writes the notification's words in the right tone.

See `references/voice-and-tone-examples.md` for the worked voice-definition exercise, the welcome-screen before→best ladders, the tone-dial notification set, and the PACE before/afters.
