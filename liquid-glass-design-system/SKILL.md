---
name: liquid-glass-design-system
description: "Apply Liquid Glass and Apple's 2025+ design system — the material (lensing, Regular vs Clear, tinting, never glass-on-glass), shapes, toolbars, scroll edge effects, and the adoption playbook. Use when adopting or reviewing the new design language, planning a migration, deciding where glass belongs, or fixing pinched corners. Based on WWDC 2025 sessions. Triggers: Liquid Glass, lensing, glass on glass, glassEffect, concentric, iOS 26 design."
---

# Liquid Glass Design System

**Sources:** [references/sources.md](references/sources.md) — 2 foundational WWDC 2025 sessions + 4 Liquid Glass showcase sessions.

Liquid Glass is "a new digital meta-material that dynamically bends and shapes light" while behaving like a lightweight liquid — not a recreation of a physical material (lineage: Aqua → iOS 7 blurs → iPhone X fluidity → Dynamic Island → visionOS). It forms **one floating functional layer for navigation and controls above content**, unifying design across platforms. This is the primary source behind the Liquid Glass references in `ios-brand-identity`, `apple-search-design`, and `apple-navigation-design`.

## The material (219)

- **Lensing, not scattering:** previous materials scattered light; glass bends and concentrates it in real time — communicating presence and form while content shines through. Elements **materialize by modulating lensing**, not fading.
- **Alive to interaction:** illuminates from within starting under the fingertip; elements can *lift into* glass temporarily (a slider knob becomes a transparent lens); controls **morph between contexts** on one floating plane; menus pop open from the button that spawned them.
- **Adaptive layers:** shadows grow over scrolling text and shrink over light solids; ambient color from content spills onto large surfaces; larger glass reads as *thicker* (deeper shadow, stronger refraction); glass recedes when a window loses focus; small elements (nav/tab bars, glyphs) **flip light↔dark** with the background — big elements (menus, sidebars) adapt but **never flip**.

### The hard rules
- **Glass is the navigation layer only.** Never glass a content view; **never glass-on-glass** (use fills/transparency/vibrancy for elements atop glass).
- **Two variants, never mixed:** **Regular** (default — fully adaptive, any size) and **Clear** (permanently transparent, needs a dimming layer). Use Clear only when all three hold: media-rich content underneath, the dimming layer won't hurt it, and the content above is bold and bright.
- **Tint only primary actions** (one red "View Bag," not everything); the tint maps to a tonal range like real colored glass — solid fills break the material. **Brand color belongs in the content layer.**
- In steady states, avoid content/glass intersections — reposition or scale the content.
- Accessibility is system-level and free: Reduced Transparency (frostier), Increased Contrast (border + black/white), Reduced Motion (less intensity, no elastic behavior).

## The system (356)

### Shapes & concentricity
Three shape types — **fixed** (constant radius), **capsule** (radius = half height), **concentric** (**radius = parent radius − padding**). Hardware bezels now guide UI: radii and margins align around a shared center so shapes nest. Fix pinched/flared nested corners by making the inner shape concentric (auto-calculated); near device edges use capsule + margin (phone) or concentric with the window (iPad/Mac); components used both nested and standalone get **concentric with a fallback radius**. Capsules suit touch; on macOS only Large controls become capsules (Mini–Medium stay rounded rects; new **X-Large** uses glass for emphasis). "Your interface elements should complement the system's rhythm and tone, not clash with it."

### Structure
- **Toolbars:** remove custom backgrounds/borders — "hierarchy should be expressed through layout and grouping, not decoration." Group by function and frequency; secondary actions into a More menu; **never group a symbol with a text button** (reads as one control); the primary action stays separate and tinted.
- **Tab bars:** iOS gains a dedicated bottom **Search tab** (see `apple-search-design`); **accessory views** host persistent features (playback controls) — never screen-specific actions (a checkout button belongs with its content).
- **Sheets & menus:** action sheets spring **from the action itself**, not the screen bottom. Interrupting task → glass + dimming; parallel task → glass alone; dragging a sheet up makes the glass recede and grow more opaque (deeper engagement). Apply the material to the control, not its inner views.
- **Scroll edge effects** — "not decorative": they "ensure controls stay visually distinct" where a scroll view sits *behind* floating elements. ⚠️ *HIG June 2026 update:* **prefer the automatic style** (more opaque separation for control-heavy top toolbars, text outside glass, pinned table headers — all platforms); if you opt into **soft**, "thoroughly test… to ensure your controls maintain legibility"; **hard** is no longer framed as macOS-specific (automatic covers those cases). One per view, never stacked; consistent heights across split-view panes.
- **Sidebars:** inset, made of glass, content flows behind. The **background extension effect** stretches hero images/tinted backgrounds behind the sidebar full-width (visuals stay centered; keep text/controls layered above).

### Continuity
Design the app's anatomy **once** — iPhone is the zoomed-in vertical, Mac the wide canvas, and "iPad is the middle layer of the system stack… where your design learns to scale." Keep groups grouped as layouts adapt; reuse the same symbols everywhere; when a glyph is ambiguous (pencil? checkmark?), **use a text label**. The HIG Icons page now lists preferred glyphs per action. ⚠️ *Menu icons, HIG June 2026 (reverses the 2025 talk):* use icons "sparingly and with purpose" (common actions, key features, file locations, devices, visual concepts like rotate/flip, user-generated content) and within a group **"provide icons for all menu items… or none of them"** — the old one-symbol-introduces-the-group pattern is out. Sidebar icons default to your accent color (and must follow the user's macOS accent choice); sparing fixed colors are OK when they carry meaning (Mail's VIP yellow).

## Adopting it (the showcase lessons)

How real teams moved existing apps onto the system — LTK, Slack, CNN, Tide Guide:

- **Two valid sequencings, sized to the team.** Big org: rebuild the foundation first — a SwiftUI-native design system makes an OS redesign "an upgrade, not a rebuild" (LTK, CNN). Indie: **"adopt, then redesign"** — recompile against the new SDK, take the system components, then refine (Tide Guide). Either way, first step is recompile-for-a-baseline; "some components, like the tab bar and navigation bar, transitioned automatically" (CNN).
- **Roll out by touch frequency, not by screen** (Slack): daily-touch surfaces day one (tab bar, composer, headers); muscle-memory-breaking changes later (glass header, search-to-tab-bar); keep polishing after. "You don't have to start on day one and have the entire app updated."
- **Custom controls are a tax** paid at every OS redesign (Slack's old iPad sidebar blocked day-one adoption); native controls are "an accelerant" and future-proofing. Ride OS-wide convention shifts — moving search to the tab bar is cheapest the season every Apple app does it; LTK's search usage "doubled overnight."
- **Brand survives in content, copy/voice, theming, and expressive touches — not chrome.** All four converge with this skill's tinting rule: "our identity should not compete with creator content" (LTK); Slack's brand "shines through in the voice and tone of our copy… and of course, our emojis."
- **Choose glass treatments by elimination against your real content** (Slack's header ladder): concentric failed (bottom edge didn't resolve), capsule failed (read as a primary button), gradient failed (variable scroll content) — test candidates on device with your actual content and theming constraints.
- **Engineering pitfalls (CNN):** never nest `glassEffect` (double translucency, unpredictable rendering — apply at the highest level needed, write internal guidelines); put padding *outside* the modifier scope (wrap in background/overlay to restore layout); glass is **GPU-intensive** — keep it off lists and high-frequency animations, reserve for static top-level chrome; gate with an iOS-26-only conditional modifier; budget real layout+performance test time.
- **Content-layer glass, used sparingly (Tide Guide):** the *identity* variant (invisible at rest, revealed on interaction) for in-content elements; *interactive* glass on small finger-occluded buttons for instant visible response; glass popovers over deconstructing context menus for fiddly grouped settings. Backport the non-material wins (spacing, hierarchy, concentric corners) below the iOS 26 floor.

See `references/adoption-case-studies.md` for the four case studies with quotes and outcomes.

## The counter-position (carry it into reviews)

Ryo Lu's "stay true to the medium" critique (X, Aug 2025 — the most-cited case against): unified glass is "peak 'design system' gone wrong — when you optimize for visual consistency over interaction fidelity, you lose the soul in each medium." Each input has its own physics — "touch needs bigger targets and gestures; mouse wants click, hover, press, release, precise cursors; keyboards need focus, press, combos and modifiers." His test for any cross-platform unification: are you designing "for the conversation between human and machine, not for the screenshot"? Use this as the adversarial lens when reviewing an adoption — where did visual consistency override the medium's native interaction? (His earlier datum: iPhone buttons ~44px tall vs ~28 on Mac — for input-physics reasons.)

## Checklist

- [ ] Glass only on the navigation layer; no glass-on-glass; no glassed content views?
- [ ] Regular by default; Clear only with media + dimming + bold foreground?
- [ ] Tint reserved for the primary action; brand color in the content layer?
- [ ] Shapes declared as fixed/capsule/concentric; nested corners concentric; fallback radii set?
- [ ] Custom toolbar backgrounds removed; grouping by function/frequency; no symbol+text groups?
- [ ] Scroll edge effects only behind floating UI; automatic style preferred (soft only with legibility testing); one per view?
- [ ] Sidebar background extension used for hero content; text kept above the effect?
- [ ] One anatomy scaling across iPhone/iPad/Mac; ambiguous glyphs labeled?

See `references/material-and-rules.md` for the full rule inventory with the talks' reasoning and quotables.

## Relationship to other skills

This is the **primary source** for the new design language; several skills' staleness notes defer here.
- **`ios-brand-identity`** — its UI-layer/content-layer model is built on this material; its "brand color in the content area" rule is this skill's tinting rule. Brand decisions there; material rules here.
- **`apple-navigation-design`** — tab bars, toolbars, sidebars, menus *structurally* live there; their glass treatment, grouping rules, and scroll edge effects live here. Its pre-Liquid-Glass visual specifics are superseded by this skill.
- **`apple-search-design`** — the dedicated Search tab and glass search-field presentation are this system's expression of its placement patterns.
- **`make-interfaces-feel-better`** — its concentric border-radius principle now has the system formula (radius = parent − padding) and named shape types.
- **`swiftui` (swiftui-animation)** / **`swiftui` (swiftui-lazy-stacks)** — implementation layer for glass morphing, scroll edge behavior, and sheet transitions.
- **`design-principles`** — *Familiarity* and *Craft*; use it to weigh how far to customize within this system.
- **`apple-visual-accessibility`** — Reduced Transparency/Contrast/Motion adaptations are automatic here, but custom surfaces must still honor them.
