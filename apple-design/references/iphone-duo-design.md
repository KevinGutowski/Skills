# iPhone Duo Design

*Scope: Designing iOS apps for iPhone Duo, Apple's first folding, two-display iPhone (iOS 27.1). Use when adapting layouts to the outer and inner displays, device poses, the fold, vertical (side) bars, toolbar overflow, Split View multitasking on the inner display, or camera UI that spans both displays. Triggers: iPhone Duo, foldable iPhone, folding display, inner display, outer display, hinge, fold, partially folded, tent / laptop pose, vertical bar, controls on the side, reserved region, arrangement view, displacement.*

**Sources:** [iphone-duo-design/sources.md](iphone-duo-design/sources.md) — the HIG page "Designing for iPhone Duo" (Sept 2026), Apple's "Preparing your app for iPhone Duo" overview, and the six iPhone Duo tech talks (Sept–Oct 2026). Implementation names: SwiftUI → `swiftui` (swiftui-iphone-duo); UIKit → `uikit` (uikit-ios27-sdk).

**The core rule: "you're still designing for iPhone."** Don't design one layout per pose. Design for two size classes — **compact width on the outer display, regular width on the inner display** — build with layout margins and safe area insets, and let the system do the rest. An app that already resizes well (iPad, iPhone Mirroring, iPhone-only app on iPad) is most of the way there.

## Contents

- The device in one paragraph
- Layout fundamentals
- Vertical controls (bars on the side)
- Toolbar items: order, representation, overflow
- Inner display: what to do with the space
- The fold: displacement and reserved regions
- Arrangement views: split vs overlay
- Sheets, presentations, multitasking
- Camera experiences
- Games and full-width layouts
- Review checklist
- Relationship to other references

## The device in one paragraph

Closed, the **outer display** is wider and shorter than a classic iPhone; its front camera sits in a corner and is always visible. Open, the **inner display** is the largest iPhone display yet, with an under-display front camera that is hidden until the camera is active. A center hinge allows **poses**: partially folded like a book, set on a table like a laptop (inner display facing you), or standing on its edges like a tent. The inner display supports 50/50 **Split View multitasking** (drag an app sideways with the Home gesture) and a pinned Picture in Picture strip that shrinks your app vertically. People open and close the device constantly mid-task.

## Layout fundamentals

- **Target size classes, not screens.** Outer display: compact width (regular height in portrait, compact/compact in landscape). Inner display: regular/regular. Never key layout off fixed widths, breakpoints, device metrics, idiom, or interface orientation — the inner display **doesn't honor your supported orientations**.
- **Don't reinvent the app when it resizes.** Let the existing layout expand. Keep **the same information hierarchy and the same functionality in every pose**; it's fine to show one *additional* hierarchy level on the inner display (Mail: list *or* message closed, list *and* message open). Never tie a feature to a pose.
- **Asymmetry is normal.** Controls on one edge mean safe areas and layout margins differ left vs right. Content usually needs an offset so the side controls don't cover it; aligning to horizontal safe area insets gives that offset automatically.
- **Corners:** use the system concentricity tools so UI fits the new screen corners (`apple-design` (liquid-glass-design-system) covers concentric shapes).
- **Test** in Xcode 27.1 Device Hub with the iPhone Duo simulator (buttons open, close, rotate and fold it), including Split View on the inner display with your app on *each* side.

## Vertical controls (bars on the side)

- **On the outer display and in landscape on the inner display, navigation bars, toolbars and tab bars move to the side** (the trailing edge, beside the camera), sharing that strip with the status bar and the Dynamic Island (which grows vertically for Live Activities). **Only the inner display in portrait keeps horizontal bars.** Controls stay put between closed and open-landscape so the transition feels continuous.
- **You get this for free only with standard containers and bars** (navigation stack/split view, tab view, their toolbars). Custom bars built from raw toolbar/navigation-bar/tab-bar views don't participate. Rebuild with the iOS 27.1 SDK to opt in.
- **Bars are hardware-aligned:** they keep the same position relative to the camera and **stay on the same side in right-to-left languages**; content adapts around them.
- In Split View multitasking each app puts its controls on its **outer** edge — the left app's controls are on the left. So never assume the bar is trailing.
- **In general, don't override the default bar placement** — it's a core platform pattern. Exceptions where turning off the vertical bar is reasonable: a single-page, bottom-heavy app (Calculator-style), and a control-heavy sheet with only one bar item (a lone Close button).
- **Controls belong near the content they affect.** In a split view only the **detail** column's items go vertical; sidebar/content columns keep horizontal bars above their pane (Mail's list controls stay above the list). Inspectors keep horizontal bars.
- Keyboard accessory bars stay attached to the keyboard. Vertical bars have no scroll edge effect by default, but gain a background with Reduce Transparency — keep custom content legible either way.

## Toolbar items: order, representation, overflow

- **Top-to-bottom order:** primary navigation first (Back or Close), then the prominent action (Done), then remaining items **in their original groups**; the system inserts a gap between items that came from the top bar and the bottom bar. Tab bars stay bottom-aligned.
- **Give every non-text item both a title and a symbol.** Vertical bars have fixed width and flexible height, so they show symbols; horizontal bars prefer the symbol; overflow shows both. **Title-only items and custom views stay horizontal** (a custom view can opt in to vertical if it has a vertical layout that fits the fixed width).
- **Minimize text buttons.** Ask: does the text only reinforce the symbol (drop it; use a **badge** for counts — the iOS 26 badge API) or carry standalone information (a cart total — keep it horizontal)?
- **Keep related items on one axis.** An item that switches between a symbol and text (Edit ↔ Done) must stay horizontal — the system Edit button already does.
- **Don't add manual spacing;** group items instead (flexible spacers collapse to zero vertically).
- **Overflow is normal here** — outer landscape is short, and the keyboard or pinned PiP steals more. Decide per view which compresses first:
  - **Navigation-focused view → toolbar compresses first** (default), keeping tab destinations reachable.
  - **Task-focused view → tab bar compresses first**, keeping the task's actions.
- **Prioritize overflow:** items overflow **bottom to top** by default; assign visibility priority to groups first, then items. Keep frequent actions (Compose, New Note) and status-bearing items (badges) visible longest.
- **One overflow menu:** fold any app-owned "more" menu into the system overflow menu; **reserve the ellipsis for overflow** and give other menus a distinct symbol (no symbols borrowed from other platforms).

## Inner display: what to do with the space

Don't ship a stretched iPhone layout. Three proven options, in order of how much they change:

1. **Split view** — surface two hierarchy levels at once; it collapses to one stack when closed and adjusts column widths to a symmetric 50/50 when folded.
2. **Reflow content for width** — a vertical stack that becomes two columns when there's horizontal room (Music).
3. **Sidebar instead of tab bar** — opt-in, best for information-dense apps (Health); not for every app.

Optional extra: a **table-top (laptop) layout** — media in the top half, tappable controls on the stable bottom half. Only if it keeps all the same controls and hierarchy as other poses.

## The fold: displacement and reserved regions

When partially folded, the display curves through the center: text and images there are hard to read and **buttons are hard to tap**. The fold is a *reserved region* — treat it like other areas layouts already avoid (window controls on iPad, the Dynamic Island).

- **Reserved regions:** the outer camera (always present; grows into the Dynamic Island), the inner camera (present only while active — UI moves aside to reveal it), and the fold (**division**, active only when partially folded; zero width when flat). Kinds: **division** splits an area into usable halves; **occlusion** covers part of it (cameras).
- **System components already avoid the fold:** sheets, alerts, menus, popovers, action sheets, toolbar buttons, split view columns. Use them and you inherit fold avoidance.
- **Displacement** = moving or resizing existing elements so they stay visible and reachable when folded. Rules:
  - Move **only what's necessary**; small adjustments beat rearrangement. Avoid extreme changes and long-distance moves that break an element's link to its source.
  - **Scope it to the content:** move an independent element alone; move cooperating elements together (a photo and its context menu align around the fold together).
  - **Continuous scrolling content (articles, feeds, documents, lists) doesn't displace** — scrolling already handles it.
  - **Purpose decides the destination.** Book pose: alerts go to the trailing side (where the experience continues when the device closes). Laptop pose: glanceable content goes to the top half (visible from a distance), tappable controls to the bottom half (stable surface).
  - Stay contextual: search stays over the view it searches, narrowing as the device folds.
  - Grids: **prefer an even number of columns** whenever a division region exists, even inactive; keep outer margins and widen the gutter at the hinge so no cell straddles it.
- **No control, text, or image focal point across an active division region**; only decorative or scrollable content may cross it. Keep important content clear of the inner camera when its viewfinder matters.

## Arrangement views: split vs overlay

An **arrangement view** is a layout container (between navigation containers and content containers) holding a **primary** and **secondary** view, laid out from size class, aspect ratio, and active division regions. iOS 27.1.

- **Split:** divides space side by side when wider than tall, stacked when taller than wide, and adapts to the fold. Restrict axes when one orientation should show only the primary view. Choose it for **main–detail** content where neither view may be obscured (Podcasts' Now Playing + transcript).
- **Overlay:** primary layered over secondary when flat; side by side when partially folded. The secondary can collapse. Choose it for a clear **foreground/background** relationship where partial obscuring is fine (playback controls over video, Accessibility Reader controls over text). Its z-order changes on fold — use that to switch a compact/expanded form.
- **Translate existing patterns:** HStack/VStack-style two-pane → split; ZStack-style layering → overlay.
- **Not a navigation container.** Never put navigation split views or tab views inside one, and never put an arrangement view inside a list, scroll view, grid, or split view — part of it can become inaccessible.

## Sheets, presentations, multitasking

- **Outer display:** sheets put their toolbar on the side by default. For a sheet with a single bar button, consider disabling the vertical bar — the sheet then stops short of the camera and the status bar repositions.
- **Inner display:** sheets are centered with horizontal bars. If you place a sheet left or right, a left sheet gets no vertical bar and a right sheet does. When partially folded, sheets slide off the fold.
- **Multiple windows:** iPhone Duo is the first iPhone with multiple instances of an app's UI — but **new windows can be created only on the inner display**. Hide "New Window" affordances when unavailable (the system's scene activation action does this) and handle a failed scene request.

## Camera experiences

- Two **square, ultra-wide front cameras**: outer (up to 4K/120 fps) and inner under-display (1080p/60 fps). The automatic **virtual front camera** follows open/close for you but is limited to the common subset (1080p/60, **no depth**).
- **"Front" no longer means "facing the user."** Displays can face opposite ways; a rear camera can face the person (flip the open device for a rear-camera selfie). Decide UI from the camera's *direction relative to the view showing it*, and re-decide on every open/close/flip. Mirror the preview when the camera faces the person.
- **Use both displays:** while capturing on the inner display, show content to the subject on the outer display (teleprompter, something fun for a child, a group-call view). Disable the toggle for it when unavailable (device closed).
- The inner display around a full-field rear preview has spare room — offset the preview and group controls there, or fill the display; with the square front sensors, a landscape aspect ratio can fill the inner display.

## Games and full-width layouts

- **Games:** playable in every pose. You may lock to portrait or landscape, but fill the screen as the pose changes; keep text and control sizes consistent; prefer changing aspect ratio over letter-/pillarboxing (if unavoidable, fill the padding with art).
- **Full display width is allowed for immersive, non-scrolling UIs** that need no bars (Calculator reflows to five columns of four on the outer display) as long as nothing interactive collides with the Dynamic Island or status bar. Hybrid: full-width background/header, inset scrollable foreground holding every interactive element.

## Review checklist

1. Built with the iOS 27.1 SDK; every screen checked closed, open, rotated, folded, and in Split View on both sides.
2. Layout uses size classes, margins and safe areas; no screen-, idiom-, or orientation-based layout; asymmetric insets handled per edge.
3. Bars come from standard containers; every non-text item has a symbol and title; top of the vertical stack is Back/Close then Done.
4. Per view: compression preference chosen; visibility priorities set; one system overflow menu; ellipsis reserved.
5. Inner display uses split view, reflow, or sidebar — not a stretched phone layout; same functions in every pose.
6. Nothing tappable or important sits in an active fold; grids prefer even columns; custom two-pane layouts use an arrangement view.
7. Camera apps pick cameras by direction, handle switching, and consider the outer display for the subject.

## Relationship to other references

- Resizing, size-class and multi-window doctrine: [apple-navigation-design.md](apple-navigation-design.md) (iPad-native layout, windowing). Bars and the Liquid Glass design language: [liquid-glass-design-system.md](liquid-glass-design-system.md).
- SwiftUI implementation (arrangement views, reserved regions, hinge, toolbar APIs, scene accessories, camera direction): `swiftui` (swiftui-iphone-duo).
- UIKit implementation and SDK-behavior changes: `uikit` (uikit-ios27-sdk).
- Exact current wording: the live HIG page `designing-for-iphone-duo` via [hig.md](hig.md).
