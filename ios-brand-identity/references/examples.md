# iOS Brand Identity — App Examples

*Source: Apple WWDC 2026, session 251 — "Communicate your brand identity on iOS." https://developer.apple.com/videos/play/wwdc2026/251*

The talk's example apps, each illustrating how to be distinctly branded while staying native. Reason by analogy when reviewing or designing a branded iOS app.

---

## Gentler Streak — distinct content, native UI

A fitness-routine app with an unmistakable identity: playful illustrations and detailed data visualizations. Yet its navigation — the tab bar and top-toolbar actions — is entirely native; it doesn't heavily customize the UI or deviate from patterns. Lesson: establish a baseline of platform familiarity (otherwise people must *learn* your app), and put the personality in the content. It also uses **system fonts only** — mixing font widths and variants like SF Rounded to get variety and hierarchy while still feeling distinct — and uses **spring animations** on its monthly recap so activities feel almost magical, with motion emphasizing hierarchy.

## Slack — customized component that still feels iOS

Slack built a **custom top toolbar** whose middle action shows Channel information. But the overall component — button sizes, placement of floating actions, popover behavior — all feel very iOS. Slack also uses **color sparingly and for meaning**: tint on primary actions, sections with new information, unread badges, new-message creation, and the selected tab state. And it moved its formerly solid top-toolbar color **into the content area** so it scrolls away, letting content spread edge to edge.

## Moonlitt — a unique custom component, grounded in iOS

Tracks the lunar cycle for photography and moon phases. The UI is simple — a flat hierarchy that doesn't need a tab bar. Its **custom lunar-cycle calendar** shows moon phases across the month at a glance, but leverages the iOS design language: a **Liquid Glass backing**, a **primary action to dismiss**, and a **sheet with concentric edges** that match the hardware. Totally unique, yet clearly belongs on iOS. Moonlitt also uses a **standard Context Menu** for settings — note the built-in animation that deliberately morphs from the tapped action (free with SwiftUI). Its content goes **edge-to-edge** with night-sky color and 3D elements that portray your position relative to the moon — immersive because it's relevant to the content.

## Crumbl — brand through content, type, and widgets

Uses **full-bleed videos** to highlight weekly flavors — not generic assets; they change weekly and deepen the connection to the product. Built a **custom typeface, Crumbl Sans**, used across marketing and in memorable iOS moments like large cookie-flavor headers. Crucially, it supports **Dynamic Type**: as the system font size grows, labels reflow to multiple lines rather than truncating, staying legible. Its **Widgets** carry the pastel palette and distinct imagery — immediately recognizable outside the app.

## NYT Cooking — restrained, platform-true custom iconography

Uses **custom icons** with sharper edges and a line-weight variant — unique to the app but not overly detailed, so they scale well to small sizes — applied consistently across the tab bar, top toolbars, and inline content actions. Respects **platform conventions**: the Share icon has different iOS/Android/Web versions, each true to that platform's sharing pattern. Uses SwiftUI **Zoom Transitions** for recipe comments, connecting the tap target to the transition state. And it treats its **logo** with restraint — shown only on the Home tab and fading on scroll, an understated, unobtrusive nod to brand.

---

## Cross-cutting lessons

- Keep the **UI layer** (navigation/actions) native; express brand in the **content layer**.
- Customize components only where impact is high, and keep them feeling iOS; use standard components for utilitarian needs (custom utilitarian elements can look dated/misplaced).
- Put **color in the content area**, use it for **meaning** (tint on actions/state), and support **Dark Mode**.
- Custom **fonts** must support **Dynamic Type**; **System fonts** (SF Pro/Compact/Mono, New York, SF Rounded) can carry brand on their own.
- Custom **icons** should be recognizable, consistent, scalable, and platform-true; **SF Symbols** are a strong free default. Keep **logos** unobtrusive.
- Branding should **complement** the experience and never override or confuse system behavior.
