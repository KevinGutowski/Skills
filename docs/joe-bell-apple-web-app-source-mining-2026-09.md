# Joe Bell Apple web app skill source mining — 2026-09

Source: https://github.com/joe-bell/skills/tree/main/skills/apple-web-app

Revision: `3c875dd53150e763d82da3516a8a0dde21adc8c7`

## Source manifest

The repository was cloned at the revision above. Every content file was read;
there were no scripts, generated examples, tests, media, or image assets.

| Artifact | Read | Density | Decision |
| --- | --- | --- | --- |
| Repository `README.md`, `AGENTS.md`, `CLAUDE.md`, license, config | Yes | Low | Installation and repo-local workflow are not portable content. |
| `skills/apple-web-app/SKILL.md` | Yes | High | Fold durable Apple installed-web-app workflow into `web-design`; do not create a top-level skill. |
| `references/install-ux.md` | Yes | High | Fold hint-vs-prompt, engagement gating, standalone navigation, and storage-boundary lessons. |
| `references/ios-26-notes.md` | Yes | Medium | Fold feature-detect/re-test posture; park point-release workarounds as volatile. |
| `references/ios-devices.md` | Yes | Medium | Fold device-table-as-generated-data rule, not the dated table itself. |
| `references/macos-add-to-dock.md` | Yes | High | Fold the iOS/macOS split, manifest/cookie/navigation rules, and Mac-only test surface. |
| `references/overlays-and-keyboard.md` | Yes | Medium–high | Preserve current-implementation lookup and `visualViewport` escalation; do not copy a large historical workaround. |
| `references/splash-screens.md` | Yes | High | Fold single-source generation, exact-match testing, public asset, and cache rules. |
| `references/tailwind-css-v4.md` | Yes | Low for this corpus | Plain CSS owns the reusable rule; framework spellings remain upstream. |
| `references/theme-color-and-status-bar.md` | Yes | Medium | Fold explicit background/zero-inset invariants; park approximate sampling thresholds. |
| `references/sources.md`, `maintenance.md` | Yes | High meta value | Preserve provenance and drift posture; do not import private observations as standards. |

Primary corroboration read: WebKit's Safari 26 Home Screen change, Safari 17
Mac web-app and cookie-copy behavior, Safari 18 scope-based link capture, Apple
Support's current Add to Dock/settings behavior, and MDN's `env()` reference.

## Key learnings and fold map

The source earns a new **reference**, not a new skill. "Installed Apple web
app" is a coherent web-platform task under `web-design`; routing it to
`apple-design` would apply native HIG/SwiftUI rules to HTML/CSS behavior.

- Added `web-design` (apple-installed-web-apps) with an iOS/iPadOS-versus-macOS
  decision table, dual metadata baseline, zero-safe inset rule, standalone
  navigation/install guidance, generated asset model, storage boundary,
  volatile-bug escalation, and installed-artifact test matrix.
- Added bidirectional boundaries in `web-design`, `apple-design`, and
  `interface-review` so "Apple" does not automatically mean native.
- Linked the existing web-layout safe-area baseline to the new installed-shell
  reference instead of duplicating generic layout rules.
- Updated the web source/gap maps, README index, and taxonomy record.

The strongest reusable lessons are:

1. Treat the manifest and the legacy Apple metadata layer as complementary;
   inspect rendered HTML rather than trusting framework metadata helpers.
2. Design safe-area layouts to remain correct at `0px`; use `base + inset`,
   never inset presence as device detection or readiness.
3. Standalone removes browser assumptions: provide in-app exit/back paths and
   test link scope, authentication, cold launch, keyboard, and orientation in
   the installed shell.
4. Generate optional startup-image links and files from one deduplicated
   device/DPR table; serve all install assets publicly and verify them without
   cookies.
5. Separate platform behavior: most iOS safe-area, startup-image, and touch
   mechanics are irrelevant on macOS Add to Dock, while manifest, scope, and
   one-time cookie handoff carry over.
6. Treat Safari point-release fixes and community-measured constants as a
   re-test queue, not timeless skill doctrine.

Follow-up after review feedback: expanded the reference to retain more of the
source's concrete value rather than only its high-level posture. The promoted
details now include the status-bar mode table, a fail-open safe-area readiness
gate, an owned scroll-root recipe, `100vh`/`100dvh` caution, parsed-before-touch
overscroll containment, scoped tap/select/callout CSS, an explicit startup
image query and pixel calculation, conservative icon sizes, and
`visualViewport`/focus/touch exceptions for keyboard-driven overlays. Volatile
items remain labeled as upstream observations or live-bug lookups.

A final gap pass added background-color parity and label precedence, Safari 26
"every site" resilience, iPadOS window-control overlap, browser-specific
install-hint gating, iOS/macOS link-entry distinctions, manifest-icon behavior,
and an explicit list of iOS mechanics that should not be implemented for a
Mac-only target.

## Correction and parked material

The upstream's blanket statement that iOS accepts only PNG icons was not
folded. WebKit's Safari 26 announcement says SVG icons are supported throughout
Safari's interface and explicitly includes Home Screen/Dock web-app icons.
Opaque PNG remains compatibility advice, not a current exclusivity claim.

Parked pending current primary or device evidence:

- exact Safari 26 status-bar sampling thresholds;
- version-specific iOS 26 fixed-overlay and opaque-overlay workarounds;
- iPad window-control detection and the community `~64px` offset;
- the current device-size table and exact startup-image count;
- private iOS/macOS 26.6 observations about title snapshots, icon selection,
  cookie transfer, window restoration, and link targets.

No external scripts, prompt wording, metadata, or long prose were imported.

## Routing verification

A fresh descriptions-only Codex judge passed 6/6 focused probes after the
`web-design` description change:

- iPhone Home Screen safe-area/startup-image and macOS Add to Dock
  auth/navigation prompts → `web-design` (apple-installed-web-apps);
- native SwiftUI/HIG and native app-icon controls → `apple-design`;
- generic responsive safe-area/RTL/reflow prompt → `web-design`
  (web-layout-design);
- distinctive Home Screen UI build → `frontend-design` first, then
  `web-design` (apple-installed-web-apps).
