# Human Interface Guidelines (lookup)

*Scope: Look up Apple's Human Interface Guidelines — the canonical reference for Apple platform conventions and component specs. A *lookup* skill (topic map + JSON-endpoint fetch; HTML fetches empty), not copied content. Use when a question needs Apple's authoritative guidance or exact specs. Triggers: HIG, Human Interface Guidelines, what does Apple say about, component spec, alerts.*

*Canonical source: https://developer.apple.com/design/human-interface-guidelines — Apple's living design reference. This skill points at it; it never copies it (the HIG changes with every OS release, so copies rot).*

## How to fetch a page

HIG pages are JS-rendered — `WebFetch`/`curl` on the HTML returns an empty shell. **Use the JSON endpoint:**

```
https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json
```

Extract the prose with:

```python
import json, urllib.request
d = json.load(urllib.request.urlopen(
    "https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json"))
txts = []
def walk(o):
    if isinstance(o, dict):
        if o.get("type") == "text": txts.append(o.get("text",""))
        if o.get("type") == "codeListing": txts.append("\n".join(o.get("code",[])))
        for v in o.values(): walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
walk(d.get("primaryContentSections"))
print(" ".join(txts))
```

Headings/anchors live in `d["primaryContentSections"]` as `heading` nodes; platform-specific guidance is inline under "Platform considerations." Each page's `references` dict links related pages — follow it to navigate.

## Checking for HIG updates

**https://developer.apple.com/design/whats-new/** — dated changelog of HIG additions and updates (new pages, changed guidance, new design resources). Unlike HIG pages, this one is plain HTML — fetch it directly (WebFetch/curl both work). Check it when auditing skills for staleness or after a WWDC: a "what's new" entry naming a topic an existing skill covers is a signal to re-verify that skill against the linked page.

Related plain-HTML hub pages: **/design/get-started/** (Apple's curated learning path — HIG sections + foundational talks) and **/design/** (the design hub, which also surfaces Apple's design case-study articles under `/articles/<slug>/`; there is no index at /articles/ itself — articles are discovered from the hub or news).

## Topic map (slugs)

**Foundations:** accessibility, app-icons, branding, color, dark-mode, icons, images, immersive-experiences, inclusion, layout, materials, motion, privacy, right-to-left, sf-symbols, spatial-layout, typography, writing

**Patterns:** charting-data, collaboration-and-sharing, drag-and-drop, entering-data, feedback, file-management, going-full-screen, launching, live-viewing-apps, loading, managing-accounts, managing-notifications, modality, multitasking, offering-help, onboarding, playing-audio, playing-haptics, playing-video, printing, ratings-and-reviews, searching, settings, undo-and-redo, workouts

**Components** (grouped; all slugs flat under the same path):
- *Content:* charts, image-views, text-views, web-views
- *Layout & organization:* boxes, collections, column-views, disclosure-controls, labels, lists-and-tables, lockups, outline-views, split-views, tab-views
- *Menus & actions:* activity-views, buttons, context-menus, dock-menus, edit-menus, home-screen-quick-actions, menus, pop-up-buttons, pull-down-buttons, the-menu-bar, toolbars
- *Navigation & search:* path-controls, search-fields, sidebars, tab-bars, token-fields
- *Presentation:* action-sheets, alerts, page-controls, panels, popovers, scroll-views, sheets, windows
- *Selection & input:* color-wells, combo-boxes, digit-entry-views, image-wells, pickers, segmented-controls, sliders, steppers, text-fields, toggles, virtual-keyboards
- *Status:* activity-rings, gauges, progress-indicators, rating-indicators
- *System experiences:* app-shortcuts, complications, controls, live-activities, notifications, snippets, status-bars, top-shelf, watch-faces, widgets

**Inputs:** action-button, apple-pencil-and-scribble, camera-control, digital-crown, eyes, focus-and-selection, game-controls, gestures, gyro-and-accelerometer, keyboards, nearby-interactions, pointing-devices, remotes

**Technologies:** airplay, always-on, app-clips, apple-pay, augmented-reality, carekit, carplay, game-center, generative-ai, healthkit, homekit, icloud, id-verifier, imessage-apps-and-stickers, in-app-purchase, live-photos, mac-catalyst, machine-learning, maps, nfc, photo-editing, researchkit, shareplay, shazamkit, sign-in-with-apple, siri, tap-to-pay-on-iphone, voiceover, wallet

**Platforms:** designing-for-ios, designing-for-ipados, designing-for-macos, designing-for-watchos, designing-for-tvos

## When to use this vs. the talk-derived skills

The talk skills carry the *reasoning and craft* (why, trade-offs, worked examples); the HIG carries the *current letter of the law* (specs, platform tables, every component). Route:
1. **A talk skill owns the topic** → use it first; pull the HIG page only for exact specs or platform-considerations detail (e.g. `apple-design` (apple-navigation-design) for tab-vs-sidebar reasoning, then `tab-bars` for current specs).
2. **No talk skill covers it** (alerts, sliders, pickers, drag-and-drop, undo, CarPlay, watchOS…) → fetch the HIG page directly.
3. **Currency matters** (post-2025 Liquid Glass changes ripple through component pages) → the HIG is the tiebreaker over any talk-era claim; this is the staleness rule's reference target.

## Relationship to other skills

HIG-grounded siblings (deep dives; prefer them when they match): `design-principles`, `apple-design` (apple-navigation-design), `apple-design` (apple-search-design) (search-fields, searching), `apple-design` (apple-typography) (typography), `swiftui` (sf-symbols) (sf-symbols), `apple-design` (apple-visual-accessibility) (accessibility, inclusion), `apple-design` (liquid-glass-design-system) (materials), `apple-design` (app-icon-design) (app-icons), `apple-design` (ios-brand-identity) (branding), `swiftui` (widget-design) (widgets, complications), `notification-design` (managing notifications), `apple-design` (chart-experience-design) (charts, charting-data), `apple-design` (app-intents-design) (app-shortcuts, siri, snippets), `swiftui` (sound-design) (playing-audio, playing-haptics), `feature-discoverability` (onboarding, offering-help), `ai-experience-design` (generative-ai, machine-learning), `ux-writing` (ui-voice-and-tone) (writing), `swiftui` (touch-interaction-design) (gestures, feedback).
