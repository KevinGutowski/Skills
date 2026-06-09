---
name: apple-navigation-design
description: "Design navigation and layout for iOS and iPad — tab bars (balanced tabs, no Home catch-alls), push navigation, modality (sheet rules, Cancel/X), menus/pickers (menus vs action sheets, destructive friction), iPad-native layout (sidebars, density, desktop-class toolbars/tables/selection), iPadOS 26 windowing and the menu bar, and the pointer. Use when structuring an app's navigation, deciding tabs vs sidebar, choosing push vs modal, designing sheets/menus or destructive confirmations, making an app iPad-native, or reviewing navigation clarity. Based on Apple WWDC sessions 10001 & 10009 (2022), 10205/10206/10640 (2020), and 208 (2025). Triggers: tab bar design, Home tab, push vs modal, cancel vs close button, sidebar vs tab bar, stretched iPhone app, document menu, browser-style navigation, menu vs action sheet, destructive confirmation, iPad windowing, menu bar iPad, pointer effects."
---

# Apple Navigation Design

**Sources** — this skill aggregates four Apple design sessions:
- *Apple WWDC 2022, session 10001 — "Explore navigation design for iOS" (Sarah McClanahan). https://developer.apple.com/videos/play/wwdc2022/10001/*
- *Apple WWDC 2022, session 10009 — "What's new in iPad app design" (Bryant Jow & Grant Paul). https://developer.apple.com/videos/play/wwdc2022/10009/*
- *Apple WWDC 2020, session 10206 — "Designed for iPad" (Grant Paul & Vince Lane). https://developer.apple.com/videos/play/wwdc2020/10206/*
- *Apple WWDC 2020, session 10640 — "Design for the iPadOS pointer" (Brandon Walkin, Marcos Alonzo, CC Wan, Dylan Edwards). https://developer.apple.com/videos/play/wwdc2020/10640/*
- *Apple WWDC 2020, session 10205 — "Design with iOS pickers, menus and actions" (Cas Lemmens). https://developer.apple.com/videos/play/wwdc2020/10205/*
- *Apple WWDC 2025, session 208 — "Elevate the design of your iPad app" (Rene Lee). https://developer.apple.com/videos/play/wwdc2025/208/*

Great navigation goes unnoticed — people just focus on content. The job is familiarity: when navigation deviates from natural expectations, the app feels hard to use. This skill covers the three foundational iOS patterns (tab bars, push, modality), what makes an app iPad-native rather than a stretched iPhone app, and pointer interaction.

## Tab bars — the app's menu of options

Tabs are global navigation reflecting an *already-clear* information hierarchy; good tab names hint at functionality without showing content. Start from "why do people use this app?" — great apps "aim to do a few things really well."

The five rules (10001):
1. **Reflect the information hierarchy** — each tab self-contained around one mindset ("filtering a map and editing an itinerary are two very different features — and mindsets").
2. **Balance features across tabs** — first tabs get overloaded out of fear people won't explore; distribute.
3. **Don't duplicate functionality into one tab** — duplicating *content* (same songs organized differently) is fine; duplicating *actions* confuses. A "Home" catch-all "becomes the tab where every feature is fighting for real estate" — consider removing it.
4. **Keep the tab bar persistent** — never hide it; never auto-switch tabs (jarring). Each tab preserves its own state.
5. **Clear, concise labels** representative of content.

## Hierarchical navigation (push)

Push is the default for drilling in: content gets more specific, options narrow. The tab bar stays anchored; back-swipe works; the back button shows the **title of the screen you came from** (wayfinding). **A disclosure chevron must always initiate a push** — it points in the transition direction (flipped in RTL); any other behavior breaks the mental model. Use push (not modals) for frequently traversed content — dismissing a modal makes people think about leaving.

## Modality — intentional disruption

Modals rise from the bottom, covering the tab bar, to **reinforce focus on a self-contained task**. Three valid uses: a simple task (new event), a multi-step task (adding a transit card — counterintuitive but it keeps focus), or full-screen content (workout video).

Sheet nav-bar anatomy: title orients; **right = preferred action** — bold, "a concise, affirmative verb," inactive until required fields are filled; **left = Cancel** — if the user entered data, Cancel must warn about data loss (alert/action sheet); untouched, it just dismisses. Use the **X close symbol sparingly** — only for minimal interaction with no input ("If I tap close, will the selections be applied or canceled?"). Limit modals-over-modals; pushes *inside* a modal are fine.

## iPad-native layout

iPad is not halfway between iPhone and Mac — design for what's unique. Four ways to fill the display (10206):
1. **Flatten navigation** — avoid full-screen transitions; update part of the screen. A sidebar makes section-switching one tap and exposes drag-and-drop targets.
2. **Show more content** — density is a feature (Files' icon-size tweak showed ~300% more icons).
3. **Add context** — replace modals/popovers with inline editing at the same level. The anti-pattern: a popover "the same width as the iPhone screen" with an arrow pointing at nothing meaningful.
4. **Go deep** — full-screen immersive content moments (Books, Photos editing) where the hardware disappears.

**Sidebar:** top section = your tab-bar items (same top-level items in both); below = long user-generated lists under collapsible headers (duplicate paths are fine — sidebar items are shortcuts). Don't use a sidebar in compact width, don't surface the entire app, don't force deep hierarchy into it. ⚠️ *HIG June 2026 retires two 2020/22 rules:* the never-mix rule — "you don't need to choose between a tab bar or sidebar… you can adopt a style of tab bar that provides both" (the adaptable style, which also lifted the blanket iOS-sidebar ban); and the outlined-sidebar/filled-tab-bar glyph split — current guidance is "prefer filled symbols," with sidebar icons in your accent color (follow the user's macOS accent; fixed colors only sparingly and meaningfully, like Mail's VIP yellow).

**Desktop-class features (10009):** toolbars with a customizable center section (must-see items go *trailing* — at small sizes only leading/trailing survive); a **document menu** for whole-document actions (Duplicate/Rename/Move/Export — share goes to Share, content edits go elsewhere); **browser-style back/forward** for complex jumpy hierarchies (Files yes, Photos no); nav-bar search for filtering the current view (whole-app search belongs in a search tab — see `apple-search-design`); **multi-column sortable tables** ("not much of a table if it only has a single column") that collapse to lists at compact width; multi-selection without edit mode + context menus on selections and in **empty areas** (create-new); pop-up buttons for in-place option edits ("you change the priority right in place"); inputs: support touch *and* pointer, keyboard shortcuts for all common actions ("if you're on the fence… add it"), and combined inputs (Cmd+tap, Option+drag).

## Menus, pickers, and destructive friction

Menus (any button can have one) appear **right next to where you tapped** — light, non-dimming, concise. Four uses: **disambiguation** (a clear action asks a more specific question — Photos' "+"), **navigation** (hold any back button for the stack history), **selection** (sort options with checkmarks), and **secondary actions** (a "more" button — or a second gesture, like tap-and-hold on Safari's tab button). ⚠️ *The 2020 "menus largely replace action sheets" framing is too strong for the current HIG:* "Use an action sheet — **not a menu** — to provide choices related to an action" — menus are for choices people *choose to reveal*; action sheets are for clarifying choices that follow an action the person already took (destructive confirmations included).

- **Never add a Cancel item** — tapping outside dismisses; "the menu can focus only on the actions to move forwards."
- **Don't hide primary actions in menus** — Messages keeps Compose prominent; Files moved *scattered secondary* actions into one menu so "the view focuses entirely on your content."
- **Destructive actions keep their friction:** confirm in a *different place* than the trigger — a delete menu item raises an action sheet (iPhone) / popover (iPad); "the time and effort… serves as enough friction to avoid accidentally deleting."
- **Pickers:** date pickers are now a calendar grid (tap the month to jump), time is typed; prefer **inline** (Reminders), else **compact** (a tinted date button that pops a modal; tap outside to confirm). The color picker offers grid/spectrum/RGB/eyedropper with a cross-app palette.

## iPadOS 26: windowing, menu bar, and the new pointer

The modern iPad building blocks (2025) — adopt together, "more than the sum of their parts":
- **Windowing:** any app resizes into a floating window; **wrap your toolbar around the window controls** (top-left, leading edge — un-updated apps get a wasteful safe area above the toolbar). Open each document in **its own window** ("Open in Place" is no longer recommended); give every window a **unique descriptive name** (the app menu lists them). Treat rotation/floating as a width change; layout adaptation must be **non-destructive** (resizing never permanently rearranges).
- **Menu bar on iPad:** pointer-to-top or swipe down; app menu → system menus → custom menus. Order items by **frequency, not alphabet**; group into sections; submenu the secondary; give each item the symbol it has in-app + keyboard shortcuts. Populate the **View menu** (tabs + sidebar toggle). **Never hide menus or items — dim them** (hiding breaks spatial memory and discovery).
- **New pointer (supersedes the 2020 model below):** no longer the fingertip circle — tracks **1:1 with no magnetism or rubberbanding**; hover shows a **Liquid Glass platter** over buttons that catches up as you move across clusters. **Re-test your app with it.**
- Navigation: sidebar for numerous/nested content, tab bar for compact immersive apps — "if unsure, start with a tab bar" (it scales into a sidebar; Music's morphs fluidly). Extend content under bars with scroll edge effects (see `liquid-glass-design-system`).

## The iPadOS pointer (2020 foundations)

**Adaptive Precision:** iPad UI was designed for touch, so a pixel-precise arrow would be "a high-precision tool on low-precision controls." The 2020 pointer (a 19pt fingertip-sized circle) adapted — morphing to button shapes, an I-beam at line height for text, snapping to your grid (a 15-minute calendar should snap, not let 2:30 silently become 2:15). Standard controls get it free. ⚠️ *The 2025 pointer replaced the circle, magnetism, and morphing-highlight model — the hit-region and adaptive-precision-for-text reasoning persists; the specific effects are historical.*

Three effects — **try Automatic first**:
- **Highlight** — small, backgroundless controls (bar buttons, tabs); avoid around rectangular objects.
- **Lift** — medium elements with a background (app icons); provide correct size + corner radius.
- **Hover** — large objects (scale/shadow/tint; never shadow without scale); hover also signals intent (wake auto-hidden controls).

Rules: consistency within a group beats per-control theory; no gaps between adjacent hit regions (~12pt padding bezeled, ~24pt bezel-less); use precision to make existing features *faster* — **never add pointer-only features or change layout**; two-finger gestures are yours (three = system); secondary click = free context menu; never enable snapping without a custom pointer; no purely decorative pointer effects.

> **Staleness note (Kevin's rule):** these are 2020–2022 sessions. The **navigation principles persist**, but Liquid Glass changed the visual treatment of tab bars, toolbars, and search placement — for the current material, grouping rules, and scroll edge effects defer to **`liquid-glass-design-system`** (the primary source), plus `apple-search-design` and `ios-brand-identity`; check the current HIG before citing visual specifics.

## Review checklist

- [ ] Tabs reflect hierarchy, balanced, no Home catch-all, persistent, never auto-switched?
- [ ] Chevrons always push; back button names the previous screen?
- [ ] Modals only for focused tasks; preferred action verb-named and gated; Cancel warns on data loss; X only without input?
- [ ] iPad: navigation flattened, density used, inline editing over popovers, immersive content moments?
- [ ] Sidebar mirrors tab bar up top; no sidebar in compact; adaptable tab style where both are wanted?
- [ ] Desktop-class: must-see toolbar items trailing; document menu scoped to whole-document actions; tables collapse gracefully?
- [ ] Pointer: Automatic effects first; no hit-region gaps; nothing pointer-only; two-finger gestures only?

See `references/patterns.md` for the worked examples (cycling-routes app rebalance, Slopes, Home app sidebar, pointer mechanics like magnetism and recentering) and the quotable numbers.

## Relationship to other skills

- **`apple-search-design`** — the sibling: its first question is "how do people navigate my app?" — answer it here, then place search there. Nav-bar search filters the current view; whole-app search gets a search tab (both skills state this boundary).
- **`design-principles`** — *Familiarity* is this skill's engine (chevron = push, persistent tabs); *Flexibility* covers the iPad/input adaptation. Use it for trade-offs.
- **`ios-brand-identity`** — the UI layer (navigation chrome) should stay native; brand lives in the content layer. This skill is what "native navigation" concretely means.
- **`swiftui-layout`** — the SwiftUI implementation of these structures: sidebars → `NavigationSplitView`, desktop-class tables/toolbars/selection menus → `Table`/`.toolbar(id:)`/`contextMenu(forSelectionType:)`. Decide here; build there.
- **`swiftui-lazy-stacks`** / **`swiftui-animation`** — the engineering beneath: scrolling content within these structures, and transitions between them (e.g. the zoom transition for large cells).
- **`linear-settings-copy`** — settings IA is a navigation sub-problem with its own conventions; route settings-specific structure there.
