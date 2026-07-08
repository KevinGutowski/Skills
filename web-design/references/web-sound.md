# Web Sound

*Scope: UI sound on the web — when audio feedback earns its place, accessibility defaults, HTMLAudio/AudioContext playback mechanics, and Web Audio synthesis recipes for clicks and confirmations. Use when adding or reviewing UI sounds in a web app. Sound philosophy, palettes, notification-sound qualities → `swiftui` (sound-design). Triggers: UI sound, audio feedback, Web Audio API, AudioContext, click sound, sound effects.*

**Sources:** Raphael Salaja's skill library (sounds-on-the-web, generating-sounds-with-ai), https://github.com/raphaelsalaja/skill — the source's absolute rules are restated here as defaults with rationale.

This file is the **web implementation layer**. For *whether* a product should make sound at all, palette building, the four building blocks (timbre, pitch, duration, loudness), and audio-haptic pairing, read `swiftui` (sound-design) — its "silence is golden" doctrine and notification-sound qualities are Apple-scoped in sourcing but platform-agnostic in substance; this file assumes them rather than restating them.

## Contents

- Decision rules
- The appropriateness matrix
- Accessibility defaults
- Playback mechanics (HTMLAudio, AudioContext)
- Synthesis recipes (clicks, confirmations, envelopes)
- Tuning by adjective
- Relationship to other skills

## Decision rules

1. **Sound never replaces visual feedback** — every audio cue needs a visual equivalent, or muted/deaf/headphones-off users lose information (Salaja).
2. **Sound confirms significance, not activity**: payments, submissions, errors, off-screen events — yes. Typing, hover, scroll, keyboard navigation — no (see matrix).
3. **Default gain ~0.3, never 1.0**, with a user volume control independent of system volume and an explicit off switch in settings.
4. **No `prefers-reduced-sound` media query exists** — gate autoplayed UI audio on `prefers-reduced-motion` as the nearest sensory-sensitivity proxy.
5. **Weight and duration match the action**: a soft ~50ms click for a toggle, a richer chime for a purchase; never a 2-second whoosh for an instant action, and a progress sound should track the process it narrates.
6. **Inform, don't punish**: validation errors get a gentle alert, never a harsh buzzer — the user already knows something went wrong.

## The appropriateness matrix (Salaja, sounds-on-the-web)

| Interaction | Sound? | Reason |
| --- | --- | --- |
| Payment success | Yes | Significant confirmation |
| Form submission | Yes | User needs assurance |
| Error state | Yes | Can't be overlooked |
| Notification | Yes | May not be looking at screen |
| Button click | Maybe | Only for significant buttons |
| Typing | No | Too frequent |
| Hover | No | Decorative only |
| Scroll | No | Too frequent |
| Navigation | No | Keyboard nav would be noisy |

The "no" rows are the web restatement of the frequency rule in [`web-animation-design`](web-animation-design.md): anything triggered dozens of times a minute must stay silent.

## Accessibility defaults

```tsx
function playSound(name: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { volume, soundEnabled } = preferences; // user-controlled; off switch honored
  if (!soundEnabled) return;
  const audio = sounds[name];
  audio.volume = volume; // default 0.3, never 1.0
  audio.currentTime = 0;
  audio.play();
}
```

Pair every cue with visible state (`data-status`, toast + persisted message) — sound is a redundant channel, mirroring web-accessibility's rule that no meaning rides on a single sense.

## Playback mechanics

**HTMLAudio (sample playback):** instantiate and preload at app init, not on demand — `new Audio(src)` at click time adds fetch latency to the exact moment that needed instant feedback. Rewind before replay: an `Audio` element that's still playing ignores a second `.play()`, so set `audio.currentTime = 0` first to support rapid triggering (Salaja).

**AudioContext (synthesis):** create **one shared `AudioContext`** for the app — never one per sound. Browsers' autoplay policies start a context created before a user gesture in the `suspended` state, so resume-if-suspended before every play:

```ts
let ctx: AudioContext | null = null;
function getCtx() {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
```

Disconnect nodes when a sound ends (`source.onended = () => { source.disconnect(); gain.disconnect(); }`) — orphaned node graphs accumulate.

## Synthesis recipes (Salaja, generating-sounds-with-ai)

- **Clicks/taps = filtered noise burst, not a tonal beep.** An oscillator "click" reads as a beep. Instead: a 5–15ms white-noise buffer with per-sample exponential decay, through a bandpass filter at **3000–6000Hz** (below ~3000 sounds muffled) with **Q 2–5** (focused but not resonant-harsh).
- **Confirmations/pops = oscillator *with* pitch movement.** A static frequency sounds flat and synthetic; sweep the pitch — e.g. `osc.frequency.setValueAtTime(400, t)` then `exponentialRampToValueAtTime(600, t + 0.04)` — the rise is what reads as "done, positive."
- **Envelopes:** always `setValueAtTime` the initial gain before ramping (skipping it glitches); decay **exponentially, never linearly** — linear ramps cut off audibly, exponential is how physical sound dies; and `exponentialRampToValueAtTime` cannot target 0 — ramp to **0.001**.

```ts
const t = ctx.currentTime;
gain.gain.setValueAtTime(0.3, t);
gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
```

## Tuning by adjective (Salaja)

Translate feedback on a synthesized sound into parameter changes:

| User says | Parameter change |
| --- | --- |
| "too harsh" | Lower filter frequency, reduce Q |
| "too muffled" | Higher filter frequency |
| "too long" | Shorter duration, faster decay |
| "cuts off abruptly" | Use exponential decay |
| "more mechanical" | Higher Q, faster decay |
| "softer" | Lower gain, triangle wave |

## Relationship to other skills

- **`swiftui` (sound-design)** — owns sound *philosophy*: when sound helps vs. silence, palette/family coherence, notification-sound qualities, audio-haptic pairing. Read it before deciding a product should make sound; this file implements the decision on the web.
- **[`web-animation-design`](web-animation-design.md)** — the frequency rule and `prefers-reduced-motion` doctrine this file borrows; sound and motion are the same feedback budget.
- **[`web-accessibility`](web-accessibility.md)** — never single-channel meaning; the off switch and volume control are the audio siblings of its inclusive defaults.

> **Staleness note:** browser autoplay policies, `AudioContext` gesture requirements, and any future `prefers-reduced-sound`-style query are drift-prone — verify against current MDN before exact guidance (tracked in [coverage-gaps.md](coverage-gaps.md)).
