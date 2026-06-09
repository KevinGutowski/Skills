# Liquid Glass — Material Detail & Rule Inventory

*Sources:*
- *WWDC 2025, 219 — "Meet Liquid Glass" (Chan: dynamics; Shubham: adaptivity; Bruno: principles). https://developer.apple.com/videos/play/wwdc2025/219/*
- *WWDC 2025, 356 — "Get to know the new design system" (Maria). https://developer.apple.com/videos/play/wwdc2025/356/*

Both are pure design sessions (no code; their "sample-code" supplements hold chapter summaries). 356 treats 219 as prerequisite.

---

## The material's behavior (219)

**Lensing.** "Whereas previous materials scattered light, this new set of materials dynamically bends, shapes, and concentrates light in real time." Lensing communicates presence, motion, and form while letting content show through. Materialization happens "by gradually modulating the light bending and lensing" — never a plain fade — preserving optical integrity.

**Interaction dynamics.** Touch makes glass "instantly flex and energize with light," illuminating from within starting under the fingertip and spreading to nearby glass. Elements lift *into* glass temporarily (slider knob → transparent lens you can read the value through) and return to a visually quiet resting state. Controls morph between contexts on one floating plane; menus pop open inline from their source button. Rounded floating forms nest in device corners and relate to "the natural geometry of our fingers."

**Adaptivity.**
- Shadow opacity is content-aware: more prominent over scrolling text, lighter over solid light backgrounds.
- Larger glass simulates thicker material: deeper shadows, stronger refraction, softer light scattering.
- Ambient color from content spills onto big surfaces (sidebars) and into their shadows.
- Sidebar + tab bar are one navigational element that fluidly scales with the canvas; glass nests concentrically into window corners on iPad/Mac.
- Light/dark: small elements and glyphs flip with the background; large elements adapt but never flip ("surface area too big, transitions would distract").
- A simulated lighting environment moves highlights around silhouettes (lock/unlock); glass can respond to device motion; recedes when the window loses focus.

**Scroll edge effects (219 + 356).** Dissolve scrolling content to lift glass above it; switch to subtle dimming when dark content triggers dark glass; the **hard style** (uniform across the bar height) separates pinned accessory views like column headers. 356's rules: they are *not decorative*, appear only where floating UI exists, are auto-applied when pinned controls overlap scroll views, soft = default (iOS/iPadOS, interactive glass), hard = mostly macOS (interactive text, background-less controls, pinned headers), never mixed or stacked, one per view, consistent heights across split-view panes.

**Variants.**
- **Regular**: versatile, fully adaptive, any size/content. Default.
- **Clear**: permanently transparent, no adaptive behaviors, requires a dimming layer (localized dimming OK for small footprints). Use only when *all three* hold: media-rich content beneath; dimming won't hurt that content; foreground content is bold and bright.
- Never mix variants.

**Tinting.** A chosen color generates a tonal range mapped to underlying brightness — like real colored glass. Tint primary actions only; solid fills break the material; brand color goes in the content layer.

**Accessibility (system-level, automatic).** Reduced Transparency → frostier, more opaque. Increased Contrast → black/white glass with a contrasting border. Reduced Motion → reduced intensity, elastic properties disabled.

---

## The system rules (356)

**Design language.** System colors retuned across Light/Dark/Increased Contrast for hue differentiation against glass. Typography bolder and left-aligned at key moments (alerts, onboarding).

**Shapes.**
| Type | Definition | Use |
|---|---|---|
| Fixed | constant corner radius | independent elements |
| Capsule | radius = height / 2 | touch-first layouts; macOS Large controls |
| Concentric | **radius = parent radius − padding** | anything nested or near a device/window edge |

Fixes: pinched/flared inner corners → concentric (auto-computed). Phone edge → capsule + extra margin; iPad/Mac → concentric with the window. Dual-use components → concentric with a **fallback radius**. macOS control sizes: Mini/Small/Medium stay rounded-rect; Large → capsule; **X-Large** (new) uses glass for emphasis. "Like playing in the same music key — your interface elements should complement the system's rhythm and tone, not clash with it."

**Toolbars & grouping.** Remove custom backgrounds/borders ("now's the time to clean them up"). Hierarchy via layout and grouping, not decoration. Group by function and frequency; overflow into a More menu; items grouped with the correct API share one background. Never group a symbol button with a text button ("Select" + share-icon reads as a single control) — text buttons get their own containers. The primary action (Done) stays separate and tinted (blue checkmark iOS/iPadOS; prominent text button macOS).

**Tab bars.** iOS adds a dedicated bottom **Search tab**. Accessory views host persistent cross-screen features (media playback); never screen-specific actions (checkout lives with its content).

**Modality.** Action sheets spring from their source action, not the screen bottom; apply glass to the control, not its inner views. Interrupting task → glass + dimming layer; parallel task → glass alone. Dragging a sheet taller → glass recedes, grows more opaque and slightly larger, signaling deeper engagement.

**Sidebars & background extension.** Sidebars are inset, glass-made; content flows behind them; scroll views extend beneath by default (carousels glide through). The **background extension effect** mirrors/extends hero imagery or tinted backgrounds behind the sidebar to full width while the visual stays centered — keep text and controls layered above to avoid distortion; applicable per view.

**Continuity.** One anatomy, three zoom levels: iPhone = narrow vertical, iPad = "the middle layer of the system stack… where your design learns to scale," Mac = wide canvas. Groups stay grouped as layout adapts. Same symbols across devices; ambiguous glyphs get text labels; in menus, one symbol can introduce a group of closely-related actions with text differentiating (don't micro-vary near-identical icons). The HIG Icons page lists preferred glyphs per common action. Components share anatomy and interaction grammar across platforms (popup menu ≈ context menu; tab bars/segmented controls/sidebars signal selection consistently).

---

## Quotables

- "Liquid Glass is a new digital meta-material that dynamically bends and shapes light."
- "Always avoid glass on glass."
- "Scroll edge effects are not decorative."
- "Instead of relying on decoration, hierarchy should be expressed through layout and grouping."
- "iPad is the middle layer of the system stack… It's where your design learns to scale."
- Lineage: Aqua → iOS 7 real-time blurs → iPhone X fluidity → Dynamic Island → visionOS.
