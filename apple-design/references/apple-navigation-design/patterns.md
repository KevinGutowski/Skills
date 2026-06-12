# Navigation Design — Worked Examples & Specifics

## Contents
- Tab bar examples (10001)
- Push details (10001)
- Modality details (10001)
- iPad-native examples (10206)
- Desktop-class iPad (10009)
- Pointer specifics (10640)
- Menus, pickers & actions (10205, added by extension)


*Sources:*
- *WWDC 2022, 10001 — "Explore navigation design for iOS." https://developer.apple.com/videos/play/wwdc2022/10001/*
- *WWDC 2022, 10009 — "What's new in iPad app design." https://developer.apple.com/videos/play/wwdc2022/10009/*
- *WWDC 2020, 10206 — "Designed for iPad." https://developer.apple.com/videos/play/wwdc2020/10206/*
- *WWDC 2020, 10640 — "Design for the iPadOS pointer." https://developer.apple.com/videos/play/wwdc2020/10640/*

All four are design talks with no Code-tab samples. Dated specifics (toolbar layouts, sizes) are pre-Liquid Glass — verify visuals against the current HIG; the reasoning persists.

---

## Tab bar examples (10001)

**The cycling-routes app (running example).** Everything — map, itinerary editing, collections — crammed into tab one. The fix started with a question: *what is a route?* (route → city → places). Rebalancing into **Places** and **Itineraries** tabs gave each feature a self-contained home: "Filtering a map view and editing an itinerary are two very different features — and mindsets."

**The Home-tab trap.** A catch-all Home tab duplicates *functionality* from other tabs to solve a discoverability fear; the result is "the tab where every feature is fighting for real estate," disrupting the hierarchy. "If this is your app, consider removing the Home tab altogether." (Duplicating *content* — the same songs reachable via Library and Search — is fine.)

**Slopes (Apple Design Award winner).** Launches on the middle "Logbook" tab; the tabs read "Record a ski day, browse resorts, compare stats with friends" — core functionality, succinct labels, no filler.

**Music's tabs.** "Listen Now and Radio indicate that this is a content-based app with auditory media" — names that hint at function without showing content.

## Push details (10001)

- Back button shows the **previous screen's title**, so you "never have to remember where you came from."
- The chevron "points in the direction you're expected to transition to"; in RTL (Arabic, Hebrew) the direction flips.
- Messages as the why-push case: if each chat opened modally, "dismissing a modal... makes people have to think about leaving the screen" — push keeps frequent traversal frictionless.

## Modality details (10001)

- Wallet's add-a-transit-card: a *multi-step* flow inside a modal — "counterintuitive… but the purpose is to reinforce focus."
- "New Itinerary" sheet anatomy: title orients; **Add** (bold, affirmative, inactive until the form is valid) on the right; **Cancel** on the left — with a data-loss warning iff the user typed something.
- The X-button ambiguity: with selections made, "If I tap close, will the selections be applied or canceled?" — use X only for read-only/minimal modals (App Store Today article).
- Modals-in-modals: generally jarring, but a photo picker inside the New Itinerary modal is a legitimate "workflow within a workflow." Chevron rows inside a modal still push (within the modal's own nav stack).

---

## iPad-native examples (10206)

**Home app, iPadOS 13 → 14.** Turning on a room's lights took tab → popover → find room → switch — "a little cumbersome, especially if you're in the dark trying to turn on the lights." The sidebar made every room one tap.

**Calendar's fake popover.** A popover "the same width as the iPhone screen," arrow "just pointing to a button called 'Calendars'" — the canonical stretched-iPhone anti-pattern. If the arrow points at nothing meaningful, the context is fake; restructure inline.

**Files density.** An icon-size reduction showed "almost 300% as many icons" — small density changes make an app feel more powerful.

**Sidebar guidance.**
- Top of sidebar = tab-bar equivalent: same top-level items, outlined glyphs (filled in the tab bar).
- Below: long user-generated lists (albums, playlists) under collapsible headers; inline "+" at the bottom of user-configurable sections; duplicated paths are fine — sidebar items are shortcuts.
- Hierarchical apps (Mail, Notes): top-of-tree items only; navigate depth in the content area, don't force it into the sidebar.
- Never: sidebar in compact width (convert to tab bar), sidebar + tab bar in one view, the whole app surfaced in the sidebar.
- Support edit mode and drag-and-drop (drag content onto the sidebar to file/shortcut it).

**Inputs.**
- Keyboard shortcuts for all common actions — "If you're on the fence about whether you should add a shortcut, I would recommend that you do it." (Pays off in Catalyst too.)
- Combined inputs are uniquely iPad: Cmd+tap open-in-tab, Option+drag copy, Shift+tap multi-select; Pencil + touch simultaneously (Loom's dial).
- **Always responsive:** allow interaction *during* animations (scrub a still-animating menu; scroll outside a menu to dismiss-and-scroll in one gesture). "Animations can help give people context rather than getting in the way."

## Desktop-class iPad (10009)

- **Toolbar sections:** leading = navigation + document title/menu (fixed); center = elevated common workflows, customizable, groups collapse at small widths; trailing = inspectors + must-always-see items + overflow. On window resize, center items hide into overflow first; at smallest sizes only leading/trailing remain.
- **Document menu** holds whole-document actions (Duplicate, Rename, Move, Export, Print + custom). Not: share-out actions (→ Share) or in-document content edits (→ toolbar/edit menus).
- **Edit menus** are dual-shaped: horizontal scrollable for touch, full vertical list for pointer — support both; never remove Cut/Copy/Paste; group custom actions near related system ones.
- **Browser-style back/forward** (Files): for complex hierarchies people jump around; keep only navigational buttons left of the title. Photos (shallow, sidebar-reachable) correctly skips it.
- **Nav-bar search (top right):** filters the content below, with suggestions/recents/tokens. "If you want to search your entire app at once, it's better to keep that in a search tab."
- **Selection:** band selection without entering edit mode; Cmd/Shift modifiers; context menu on the whole selection; context menu in empty space creates (new folder, paste event).
- **Pop-up buttons in lists:** "you change the priority right in place" (Reminders) vs. push-and-pop. Use only for well-defined option sets; "If your option is better as a switch, use a switch"; a "Custom" option can reveal deeper controls.
- **Tables:** multi-column, sortable headers; richer lists, not spreadsheets — show only the most important columns (swap by sort: Size ↔ Kind); collapse to one column at compact width with secondary info as a second text line.
- Closing rule: "Evaluate your app design in resizable windows and larger screens. And ensure your app works seamlessly with touch and pointer."

---

## Pointer specifics (10640)

**Why adaptive precision.** The play/pause miss-click: aiming at pause, you "end up rewinding to the beginning of the track" — the interface has three button-sized regions, the arrow has pixel regions. The fix inverts it: the pointer's precision adapts to the control (button-shape morph; I-beam at line height — "impossible to place the pointer in an ambiguous position between two lines"; per-axis precision).

**System mechanics worth knowing (all free with standard controls):**
- *Model pointer* — an invisible true-position pointer does the hit-testing (with touch-style padding); the visible pointer shows snapping with parallax so trackpad motion always maps to on-screen motion.
- *Recentering* — on lift, the pointer re-centers on the control so the next click can't roll off the edge.
- *Auto-hide* — enables fluid trackpad/touch/Pencil switching, even simultaneous pointer + touch.
- *Inertia + magnetism* — flicks project a landing point, scan a fixed radius, and land on the nearest snappable target in the swipe direction: "the pointer just magically reads their mind."

**Effects decision:**
| Element | Effect | Notes |
|---|---|---|
| Small control, no background (bar button, tab) | Highlight | 37pt height at toolbar size; consistent within a group; avoid around rectangular objects |
| Medium element with background (app icon, CC module) | Lift | give true size + corner radius; keep above siblings so the shadow isn't clipped |
| Large object | Hover | scale/shadow/tint; never shadow without scale; hover can wake hidden controls |

First try **Automatic** — the system picks by type/size/shape and may improve in future OS versions. Consistency can override theory: Books' bookmark uses Highlight to match its toolbar neighbors; segmented controls deliberately mix Highlight (unselected) + Lift (selected).

**Hit regions:** ~12pt padding around bezeled elements, ~24pt around bezel-less; **no gaps between adjacent regions** (the pointer otherwise morphs pointlessly back to a circle between buttons — and closing gaps helps touch too).

**Custom pointer shapes:** keep them simple, solid-filled (the pointer constantly recolors; thin strokes lose legibility), weight-balanced against the 19pt circle (a 24pt crosshair). Communicate intent with the working shape, not a tool glyph: a **marker-tip** (not a marker pen) for highlighting; a **target** (not an eyedropper) for color sampling — keeping a centered anchor. Apply standard behaviors to custom UI ("if buttons in a custom navigation bar don't use the standard highlight effect, people might think they are broken"). "Try not to create unnecessary custom pointers… a purely decorative pointer effect can distract and even irritate people."

**Interactions:** use precision to make existing features faster (instant character-level text selection; Numbers' direct column-divider drag) — never pointer-only features, density changes, or layout changes. Click-and-drag may skip long-press disambiguation (instant drag-select, Pages). Trackpad: one finger = point/click, **two fingers = yours**, three = system. Secondary click = free context-menu accelerator. Calendar's scheduling case: a day view that rounds to 15-minute blocks should snap the pointer to blocks rather than let 2:30 silently become 2:15.

---

## Menus, pickers & actions (10205, added by extension)

*Source: WWDC 2020, 10205 — "Design with iOS pickers, menus and actions" (Cas Lemmens). https://developer.apple.com/videos/play/wwdc2020/10205/*

**Why menus replaced most action sheets/popovers (iOS 14):** action sheets dimmed the whole screen ("a heavy transition, especially on iPad"), used oversized rows, supported only actions, and on iPhone "I often have to move my finger all the way to the other side of the screen just to choose an action or cancel out." Menus appear next to the tap, light and non-dimming, and support selection and navigation, not just actions. Two gestures: tap-hold-drag-release, or tap then tap.

**The four menu use cases:**
1. *Disambiguation* — clear action, more specific question: Photos' "+" asks what to add; Notes' add-image asks which kind; Photos' video "Done" asks how to save.
2. *Navigation* — tap-and-hold any back button for stack history (Safari's session history).
3. *Selection* — Podcasts' Sort; selected items get checkmarks.
4. *Secondary actions* — a "more" button for actions "not important enough to be prominently displayed"; or a second gesture (Safari's tab button: tap manages tabs, hold reveals tab actions).

**Rules:** no Cancel item ever (tap outside dismisses — "the menu can focus only on the actions to move forwards"); don't bury primary actions ("hiding all actions in a menu is definitely not an approach we encourage" — Messages keeps Compose prominent; Files iOS 13→14 is the canonical cleanup of *scattered secondary* actions into one menu).

**Destructive friction survives:** confirmation must live in a *different place* than the trigger — Reminders' delete-list menu item raises a bottom action sheet; "the time and effort it takes to do so serves as enough friction to avoid accidentally deleting this list." Mail's save/delete-draft prompt likewise: "we wouldn't want to use menus for this, since it makes it far too easy to accidentally delete a draft."

**Pickers:** date picker = calendar grid (slide months; tap the month label for big jumps); time is typed; works with touch, Pencil, keyboard, cursor. Prefer inline (Reminders); compact mode shows the date "in the key color on top of a light platter" (Contacts' birthday row) and confirms by tapping outside. Color picker: grid / spectrum / RGB / screen eyedropper, with a palette shared across all apps.
