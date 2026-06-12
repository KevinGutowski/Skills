<!-- ARCHIVE: compaction-pilot variant of ui-voice-and-tone (2026-06-11).
Finding: only 10.8% compressible under keep-everything rules; corpus scan found
14 filler phrases across 94 skills — verbosity is density, not flab. Fleet-wide
compaction REJECTED (risk of meaning slips > ~10% on-load savings, concentrated
in cold skills). Patterns codified as creating-skills house-style rule 13. -->

---
name: ui-voice-and-tone
description: "Defines an app's writing voice, adapts tone per situation, and crafts the microcopy that carries them. Use when establishing a product's voice, dialing tone for a moment, writing or reviewing UI microcopy, or trimming copy. Defers naming to naming-features-and-labels, failure copy to error-messages, long-form to write-clear-prose. Triggers: voice and tone, UX writing, microcopy, copy review, empty state copy, dial up tone."
---

# UI Voice and Tone

**Sources:** [references/sources.md](references/sources.md) — 4 Apple WWDC sessions + Writing Is Designing + Designing for Emotion.

Writing is design, not decoration — words that fit the design go unnoticed yet carry the experience. Every app has a personality, chosen or not. This skill **defines the voice, adapts tone per moment, writes the microcopy**; naming, failure copy, and long-form prose route below.

## Voice vs. tone — the spine

- **Voice** = brand and values in words — what *doesn't* change. (Apple's set: clarity, simplicity, friendliness, helpfulness.)
- **Tone** = how the voice flexes to the situation — what *should* change.

Kids'-savings app: voice stays *kind / fun / encouraging*; tone punchier on a win, gentler on a setback. The 2022 and 2024 talks converge: **develop the voice first, then vary the tone.**

**Tone is a channel switcher, not a volume knob** (Metts & Welfle ch. 7). Marketing style guides map content types to *how much* brand voice; in product UI the user's situation, not content type, drives the change — switch per moment. Tone exists even when neutral: "When you write in a short, neutral, terse style, that's a tone decision. Choosing not to emphasize the emotional aspects of an interface is also a tone choice" — fine for 70–80% of interface writing, but chosen, not defaulted. Stakes (researcher Melanie Polkosky): tone is "the thing that kills most interfaces" — the social skills that read jerk-or-respectful in seconds "govern our perception of technology, as well as humans."

## Define your voice

Sticky-note exercise (one idea per note, don't filter):
1. **Imagine the app as a person** — write every adjective that fits.
2. **Group into themes** — alike words cluster (*smart / articulate / sharp* → "smart"); keep off-theme favorites (*quick-witted*) to inform word choice later.
3. **Land on ~3–4 attributes** — your voice's definition.

> These attributes **are the names of your tone dials**.

*Defer:* picking the actual word on a button/feature/value → `naming-features-and-labels`. Here: the prose's felt character, not the noun.

## Document the voice — and know where it recedes

- **Brand voice ≠ product voice.** Derive the latter from the former; don't paste marketing's register into the UI.
- **This-but-not-that** — two sources converge. Mailchimp via Metts & Welfle: "Fun but not childish … Weird but not inappropriate" — first word baseline; second (the first at its extreme) hard outer limit. Walter's design persona (ch. 3), for Freddie: "Brand traits: Fun, but not childish. Funny, but not goofy. Powerful, but not complicated. Hip, but not alienating. Easy, but not simplistic. Trustworthy, but not stodgy. Informal, but not sloppy." Attach each attribute's failure mode. (Full lists → references.)
- **Declarative statements** — the other format (Mailchimp's 2018 rebrand): flat assertions of what the voice is.
- **Tie voice to strategy — Pickard's priority stack** (Slack): "'Clear' makes work simpler. 'Concise' makes work productive. And 'human' makes work pleasant." Each principle connects to the mission; the order resolves conflicts.
- **Voice recedes in urgent flows.** Geico is gecko-friendly until accident reporting and roadside assistance, where "the friendly phrases and exclamation marks drop away" — emergency-dispatcher mode.
- **Plan the surface taper** (Walter ch. 3; Dave Gorum of Carbonmade): "We lay it on pretty thick in our marketing site, dial it back a bit in our admin tools, and remove it all together on the product." Decide personality density per surface, deliberately.

## Dial the tone for the moment

Apple's four qualities sit in gentle tension (more friendliness costs some simplicity, vice versa) — the tension is the control surface. Steps: pick four qualities describing your voice → place on a spectrum → decide the balance the **situation** needs → write to it.

**Rule: never turn a dial all the way down — adjust the balance.** (Some qualities, like *smart*, are always on; don't dial them.)

| Situation | Dial up | Dial down (not off) |
|---|---|---|
| Celebration (hit a goal) | friendliness | simplicity, helpfulness |
| Health / security alert | clarity | friendliness |
| Connectivity / blocking error | helpfulness + clarity | friendliness |
| New-feature intro | friendliness + helpfulness | simplicity |

**Scale with tone profiles** (Metts & Welfle ch. 7) when intuition stops covering the product: **audit** workflows → **inventory** messages (with examples; even one- or two-word labels make tone choices) → **flag** failures of the four questions (*contextual? empathetic? inclusive? ready for translation?*) → **group** by scenario, one profile per group — via the Facebook Content Strategy questions (likely *doing*? *mindset*? our *intention* in the UI? how *receptive*?) plus per-profile user factors (emotion, receptiveness, stress) → give each profile **tactical rules** ("lead with the value of performing this action," "be respectful of the user's time"). "Tone profiles give you and your team a framework that you can use to evaluate tone decisions." Revisit quarterly — gaps, dead profiles. Drill (one password-reset message in four tones, read back, cut what sounds ridiculous) → references.

*Defer:* failure-state tone (no "Oops!", reassure what's safe, don't blame, give a way out) → `error-messages`. This skill sets the general serious/clinical dial; that one owns copy when something breaks.

## Write the screen — PACE

The 2022 framework — screen-level craft carrying the voice:

- **Purpose** — name the screen's single most important thing; use information hierarchy; **know what to leave out**; every screen (and flow) gets a purpose.
- **Anticipate** — treat the app as a conversation; voice first, tone varied; keep a common-terms list; always answer *"what comes next?"*
- **Context** — write for where/how the person is (driving, airport, mid-task); alerts only for a real confirm/choice; button labels specific and self-explanatory (not Yes/No, not Confirm/Cancel); useful empty states.
- **Empathy** — plain language for everyone; no idioms/humor that won't translate; respect localization (length, vertical space, RTL); VoiceOver/accessibility text carries *intention and context*, not just appearance; no unnecessary gender.

*Defer:* sentence-level mechanics (rhythm, paragraphing, cutting clutter in long copy) → `write-clear-prose`.

## Simplify — four small edits with big impact (2025)

"UX writing is all about economy of language." Fast passes over existing copy:
1. **Remove fillers** — adverbs like *easily/quickly/simply* (test: does each word add value?), interjections (*oops/hooray*), empty pleasantries (*we're sorry* in an alert "sounds insincere"), decorative punctuation. Keep a modifier only when it clarifies behavior ("feed your pets **automatically**").
2. **Avoid repetition** — don't restate the headline in the body; combine. ("Uh oh. We're running late…" collapsed to **"Delivery delayed 10 minutes. Check the app for your driver's location."**)
3. **Lead with the why** — "To get reservation updates, enter your phone number," not the reverse. Especially errors, notifications, tips.
4. **Keep a word list** — words used / avoided / definitions ("alias," not Handle/User Name); button labels belong on it; seed from the Apple Style Guide. "Consistency helps provide clarity." Metts & Welfle: **one term per action** — label it "Delete" here and "Erase" there and "the user will have to pause whatever they are doing and think about it." Choosing the one word (with rationale) → `naming-features-and-labels`.

Two boundaries (Metts & Welfle ch. 3):
- **When words can't fix it, the module is wrong.** Welfle, stuck on an overloaded notification string: "We either need to be concise, or we need to simplify the functionality." Escalate to design/product; don't write around complexity.
- **Strategy before writing.** Kristina Halvorson: "strategy tells you what to do . . . and, by default, what not to do" — align on a directional statement first; the cheapest copy-review filter.

## Localization-ready writing (2017 global-audience layer)

Extends PACE's Empathy — write so copy survives translation, partial or full:

- **When near-synonyms exist, pick the term that travels.** Picture vs photo are interchangeable in English, but "Photo is the clear winner for multilingual clarity" — check key terms against target languages before they ossify into the word list.
- **If you can't translate everything, prioritize**: headings/titles (orientation), the important information in instructions, common terms — and "make sure that users can read error messages just in case something goes wrong."
- **Slang and figures of speech aren't banned** — they add character — but offense-check them and "offer contextual clues" so a reader who misses the idiom still gets the meaning. (Stricter than PACE's avoid-idioms default: allowed, with a safety net.)
- Plan: key-term translations *before* needed; batch second-market artwork in one pass; check iTunes Connect/App Store analytics — your audience map may surprise you.
- Cheap research: informal focus groups by language/cultural background, language-learning and travel references, libraries. Visual/cultural symbols (gestures, iconography, associations) → `apple-visual-accessibility`.

## Keep it useful (the guardrail both talks share)

Personality serves the experience, never the reverse — find the **special moments** where it shines; don't trade away usefulness. Then **read it aloud**: *does this sound like the best version of this app?* No jargon; write inclusively.

**Delight-layer ground rules** (Walter ch. 4 — Freddie, the anti-Clippy): the personality layer never carries function. "He's not there to help. He's simply a layer of fun that enhances a usable workflow, and above all, he has to stay out of the way" — no feedback, stats, or error delivery through the fun layer. And "Blocking a busy user's workflow is always a bad idea."

**Defend a defined voice with opt-out plus measurement** (Walter ch. 7): when stakeholders fear alienating users, ship a toggle and count — Mailchimp's "party pooper mode" settled it: "only 0.007% of users actually turn on party pooper mode."

**Inclusive-language rules** (Metts & Welfle ch. 5): singular "they" — "It's okay to use the singular 'they.' And, in fact, it's preferred"; avoid language assigning value (positive or negative) to traits, especially disability; describe what the product helps people *do*, not which people it's "for." Deeper: the Conscious Style Guide — recommended by both Metts & Welfle and Kalbag's *Accessibility for Everyone*.

From Andy Welfle's "Writing is designing" (Config 2025):
- **Take-the-words-away test** (via Mig Reyes): strip all text from a screen — brand survives, usability dies. Fastest proof that words are design.
- **Button-copy question set** — "what should this button say?" is never answerable alone: entered from where? what happens after? is a button the right component? what's the inverse action? truncates in Norwegian? matches voice and tone?
- **Voice run amok kills usability**: Caviar's "Eat a salad cuz sure" — brand personality where a person just needs to order food. Balance the triad: *usable* (helps do), *useful* (does what's wanted), *responsible* (serves stress cases — "content designers are the connective tissue").
- **Research the language itself**: harvest users' own words from interviews; card sorts for taxonomy and mental models; usability-test for language gaps. Vocabulary comes from users, not the org chart (cautionary tale: a transit kiosk's "Accept an e-cash upgrade" meaning "add $20").

## Checklist

- [ ] Voice defined as ~3–4 attributes, consistent across screens?
- [ ] Tone dialed to the moment — and **no dial fully off**?
- [ ] Each screen has one clear purpose; everything else cut or moved?
- [ ] Buttons specific and understandable on their own (no Yes/No, no Confirm/Cancel)?
- [ ] Alerts reserved for a real choice; destructive action clearly marked?
- [ ] Empty states educate or guide (not just decorate)?
- [ ] Personality density decided per surface (marketing → admin → product taper), and voice receding in urgent flows?
- [ ] One term per action everywhere (no Delete/Erase splits)?
- [ ] Plain language; no untranslatable idioms; localization-safe?
- [ ] Accessibility text conveys intention + context; no unnecessary gender?
- [ ] Read aloud — sounds conversational and like *us*?

## Relationship to other skills

Owns **overall voice and tone** and the general microcopy carrying them; sits beneath `design-principles`, serving *Delight* (the feeling you want) and *Familiarity* (one coherent, trustworthy product). Compose with these; defer the specialized units.

- **`naming-features-and-labels`** — names the *thing* (feature, label, value, button, plan): one chosen word judged on belongs / sets-expectation / travels, vs. voice as felt character of prose. Define voice here; pick and defend the word there. The exercises rhyme (adjective-clustering vs. Think/Feel/Do) but differ in output — run the right one.
- **`error-messages`** — failure-state copy and tone rules. This skill sets the general serious/clinical dial; route any "write/review an error" task there.
- **`write-clear-prose`** — long-form nonfiction craft (sentence rhythm, structure, cutting clutter). UI microcopy is a different unit; shared read-aloud instinct, essays/articles go there.
- **`ios-brand-identity`** — places brand in the iOS content layer; names this skill the voice/tone arm. Decide *where* brand belongs there; define and write the voice here.
- **`user-onboarding`** / **`linear-settings-copy`** — voice on specific surfaces (first-run, empty/welcome states; settings IA/rows). Set voice here; structure and write the surface there.
- **`app-intents-design`** — Siri dialog and snippets: voice-only microcopy with own constraints (full dialog for AirPods, ≤5 disambiguation options); set voice here, apply intent patterns there.
- **`notification-design`** — notification *strategy and anatomy* (when to send, grouping, rich content); this skill writes the words in the right tone.

See `references/voice-and-tone-examples.md` for the worked voice-definition exercise, welcome-screen before→best ladders, tone-dial notification set, PACE before/afters, full this-but-not-that lists (Mailchimp + Walter's design persona), four-tone password-reset drill, and tone-profile worksheet.
