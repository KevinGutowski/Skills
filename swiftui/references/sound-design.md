# Sound Design

*Scope: Designs sound for apps — when sound helps vs silence, distinguishable notification sounds, sound palettes, pairing with haptics. Use when adding or reviewing app sounds, designing a notification sound or UI click, or deciding whether an interaction needs audio. Sound half of touch-interaction-design. Based on Apple WWDC sessions. Triggers: sound design, notification sound, UI sounds, audio feedback, sound and haptics, earcon.*

**Sources:** [sound-design/sources.md](sound-design/sources.md) — 4 Apple WWDC sound/haptics sessions (Verweij, Moussette) + field notes (PBJ article, Ryo Lu, Netta Marshall, Rafa Conde).

Design isn't just what a product looks like or how it works — it's what it *sounds* like. Sound is a universal language: it gives context, early warning, quick confirmation (the seatbelt click — "you hear the click, and you know you're good to go"), and emotional nuance. The framing question to start any project: **"Imagine the next version of your app will have no graphical UI at all. How would you interact with it? What could that sound like?"** And George Lucas's line: "50% of the experience of a movie is determined by what we hear." Invite sound design *early*, not last.

## When to use sound — and when not

- Ask up front: will the app send frequent notifications? Can sound play a role in branding? How could the UI benefit from an audible component?
- **"Silence is golden."** The absence of sound is as important as its presence — sound on every interaction is "a bit much," and "we don't want every app to sound like a game." In software, unlike physical buttons, you can choose *no* sound — and often that's right.
- **Always provide an off switch** — "the last thing we want is for people to always hit the ringer switch, or even worse, delete your app."
- Whether sound fits depends on category, audience expectations, and context of use (a toast app earns sound because kitchens already speak in audible cues).
- **Design for emotional association** (Netta Marshall, Rdio — Valio Con): the "darling they're playing our tune" theory — "music through Association can actually stimulate the recall of these events," strongest when the events carry strong emotion; it works because "rhythmic responses require little to no mental processing" (why music therapy reaches late-stage dementia patients). Sound is the lowest-processing channel to memory and emotion you have — and when the *content* is the emotional trigger, design steps back: Rdio's player let the "large beautiful artwork" nearly fill the screen — "it kind of brings back these memories" — visuals summoning the listener's own associations rather than the app's chrome.
- **Feedback density should track user maturity** (Ryo Lu, Cursor): early GUIs sounded busy because everything was new — "a lot of people really need more feedback… as we kind of grew out of it, you know, there's like less sounds." Calibrate to the audience's familiarity, and expect to dial feedback *down* over a product's life.

## A good notification sound is…

- **Distinguishable** — people know it's *your* app (identity). The generic default ping is the phone saying "something happened, but I don't really know what."
- **Matched to the app's aesthetic** — cartoony app, cartoony sound; minimal app, simple sound.
- **Meaning-bearing** — Dark Sky's rain alert isn't a literal raindrop, but has "a liquid quality" connecting sound to message. If the notification can mean *anything* (Messages), the sound must be **neutral**.
- **Clear and clean** — cuts through pocket/street noise without being abrasive (the Messages tri-tone survived 380,000 messages/second during the Super Bowl).
- **Short** — notifications duck the user's music; long sounds duck for long.
- **Repeatable** — live with it on your own phone for a week; if you still like it, it's probably good.

## Building a palette

1. Define the essence: what emotion should this sound evoke? What matches the aesthetic?
2. **Record real source material** — "anything that makes a sound can be an inspiration" (the toast app recorded the toaster ejecting, buttering, biting).
3. Build candidates, test **on device**, then *subtract*: "take away the parts we don't like and see what we're left with" (they kept just timer-tick + chime). "First we have to make mistakes to come up with something great."
4. **Tell the whole story, then prune to the moment that matters** — the continuous "toaster heating" drone was cut; the *done* chime is the moment.
5. **Audition the whole set together** — sounds must "family well together because this is the voice of your app."
6. Then hand off: a sound designer for something "more unique, more ownable, and maybe more abstract"; a sound engineer for cleanup.

**Field notes from PBJ – The Musical** (2025 ADA winner; Apple article): for *interactive* music, write **state buffers, not verse-chorus songs** — looping segments that play "organically whenever a player lingers," classified by what the moment is ("Is the action physical, or emotional, or dreamy?"). Analog authenticity scales the real-recordings rule to a whole score: real instruments over digital libraries, real children's voices, and **imperfections kept as features** (the six-year-old narrator's "sparkling mistakes" preserved in the subtitles). And melodic stickiness is a requirement, not a bonus: "they had to be earworms."

## The four building blocks

| Block | Use it for |
|---|---|
| **Timbre** | Character: friendly vs. metallic; what makes a piano not a vibraphone |
| **Frequency/pitch** | Implied size: pitch the eject sound up → "tiny little toaster"; down → "big giant toaster" |
| **Duration** | Frequency of use: a button pressed constantly needs a very short, subtle sound; a once-per-session action can be longer |
| **Loudness** | Stakes: ringtones/alarms must never be missed; UI sounds are a subtle layer (a missed keyboard click is fine) |

## UI sounds, haptics, and the multisensory whole

- UI sounds: sparse, **much quieter than notifications** (the phone is in hand), a subtle layer combined with haptics and animation. What we **see, feel, and hear combine into one single experience**.
- **Sound changes how haptics feel:** the identical haptic tap paired with a sharp sound *feels* sharp; with a soft sound, soft — "we can fool ourselves using sound this way." (iPhone 7's solid home button: a subtle click sound over the Taptic tap creates selectable "click feels.")
- Button clicks are "much more satisfying" with **two clicks — press down and lift off**; a built-in tonal resolution acts "like throwing a checkmark telling you your action succeeded."
- Take real-world cues for *meaning*, but "no need to copy them one-to-one" — software's freedom is the point.

## Audio-haptic design (2019/2021)

Haptics and sound are "little mini-compositions… two instruments; one that you can hear and one that you can feel. They don't always have to play the same thing, but they do have to play in the same tempo." The vocabulary: **transient** (momentary tap/impact) vs. **continuous** events, each tuned by **intensity** and **sharpness** (low = round, organic, rumbly; high = precise, crisp, mechanical).

Three principles:
- **Causality** — it must be obvious what caused the feedback; ground it in physical plausibility (Apple Pay's confirmation ended up as *two simple taps*, not a waveform mimic).
- **Harmony** — "things should feel the way they look, the way they sound." Match feedback to the visual's size, energy, and pace; **synchronization is where the magic happens** — any latency between visual and feedback "is clearly broken." Match *magnitudes across senses* (a dense haptic texture needs a dense visual texture). The Watch crown went further: the *animation* was changed to snap to the sound and haptic.
- **Utility** — feedback only where it adds clear value; "don't add sound and haptics just because you can… it will diminish the value of what's really important."

Andy Allen's checkbox sound anatomy (Config 2024): a satisfying action sound "follows this action with a **lead-up, punctuation, and sustain**" — windup swell, the ka-thunk, and a tail — layered with custom haptics; multi-sensory redundancy matters because digital experiences are "trapped behind a hard pane of glass."

Techniques worth stealing: **ghost-tap priming** (people miss the first of four back-to-back transients — use tap one to "wake up the skin"); **anticipation flips** (Watch alarm ramps the haptic, cuts it, *then* plays the sound "as an answer"); **contrast over literal symmetry** (left/right cues doubled the haptic strikes on one side so they're distinguishable by feel). Practice loop (2021): dissect each moment per sense → audition AHAP assets → mix-and-match haptic and audio events in the JSON → use `CHHapticAdvancedPatternPlayer` for looping/speed-modulated textures. (AHAP = JSON haptic patterns; QuickLook previews them on macOS; haptics need a real device.)

**Motif-first multi-channel design** (Rafa Conde, Dive Club): when haptics, sound, and visual pacing must converge, find one motif and let every channel serve it. Worked example — a retro "unboxing" onboarding slideshow: a haptic fires with each new picture, fast at first, then slowing; tuning it he noticed "I realized with the haptics that I was actually feeling the pacing of the slideshow" — so the sound followed the same arc, "kind of slowing down, focusing on the music and like removing noise. So, once you got that motif, that like metaphor, everything else was just working around that and it fell into place." The search is the expensive part ("maybe I'll spend days in search of the motif"), but once found "everything just unravels from there." This is the 2019 Harmony principle run in reverse: instead of matching feedback to a finished visual, pick the metaphor first and derive haptic, sound, and pacing from it together.

## Production craft

- **Sync precisely** — with haptics, shifting a sound by **as little as 10 ms** changes the experience.
- Read the spectrogram: trim leading silence, denoise, **fade out instead of truncating**, filter out lows the phone speaker can't reproduce.
- Test on the actual target device(s) *and* headphones. Tools ladder: Voice Memos → GarageBand (region trim, automation fades, denoise) → Logic Pro → professionals.

## Checklist

- [ ] Does this moment *need* sound — and is there an off switch?
- [ ] Notification: distinguishable, aesthetic-matched, meaning-true (or neutral), short, repeatable after a week on your phone?
- [ ] Sounds auditioned as a family — one coherent voice?
- [ ] UI sounds quieter than notifications; haptic+sound+animation designed as one?
- [ ] Buttons: down/up click pair; duration scaled to frequency of use?
- [ ] Assets: tight sync (≤10 ms), trimmed, denoised, faded, speaker-tested?

See `sound-design/apple-sound-stories.md` for how Apple's own sounds were made (marimba tri-tone, kalimba Calendar, the Watch's own housing, velocity-sensitive keyboard clicks, Apple TV's doppler-shaped transitions).

## Relationship to other skills

- **[touch-interaction-design.md](touch-interaction-design.md)** — the other half of "The Life of a Button": the visual/touch feedback this sound layer pairs with.
- **`design-principles`** — *Craft* and *Delight*; sound is delight's most easily-overdone channel — "silence is golden" is the trade-off to weigh there.
- **`ios-brand-identity`** — sound is a brand layer beyond the visual (the talk's identity argument); fold a sound palette into the brand decision there.
- **`ui-voice-and-tone`** — sound is tone without words; a celebratory chime and a clinical alert follow the same dial logic as copy.
- **`apple-visual-accessibility`** — sound must never be the *only* channel (mirror of color-alone); pair with visual + haptic.
- **`notification-design`** — whether/when to notify lives there; this skill makes the sound that arrives worth hearing.
