# Mockup to app: building a working product from generated screens

## Contents

- What a generated mockup is, and is not
- Read the screen set as one app
- Build the feature, not the mockup
- Judge against the right capture
- Definition of done
- React Native porting traps (dated)
- Source

Use this when generated screens (an HTML export from a design generator, a Claude/v0 mock, a set of comps) have to become a real app. The element-by-element mock diff in SKILL.md still applies; this reference covers what the diff cannot see: navigation, data, states, and platform defaults that fail silently.

## What a generated mockup is, and is not

A generated screen is a picture of a working screen, drawn in HTML because HTML is what the tool renders.

- **Structure and styling are the spec.** Element hierarchy, flex direction, spacing, sizes, colors, type, radii, image sources, and icon names. Reproduce them exactly.
- **Content is placeholder unless marked otherwise.** Generated names, counts, avatars, list rows, the highlighted tab, and the pre-filled form usually stand in for state: rebuild the container and feed it real data. Before wiring, sort each value. Approved copy (client-supplied text, legal lines, a headline the user signed off) is spec and ships as written. Values that change at runtime come from data. Anything you cannot classify is a question for the user, not a guess.
- **Icons are part of the spec.** Use the same set and the same glyph names. Swapping to a "close enough" set changes the design. If the project's icon package does not ship that set, embed the exact SVGs.
- **Fonts: read the weights the body uses, not the weights the font link requests.** Generators often request a family's whole weight range. Bundle only the weights the body actually uses.
- **Derived tokens need resolving.** A base `--radius` with `calc()`-derived steps, or a shape flag such as squircle corners, must be resolved to the numbers the target platform supports. Port the inlined theme once into one token module that every screen reads.

## Read the screen set as one app

Each exported screen is a standalone document, so it draws the whole chrome: the same tab bar or header appears baked into every screen. Derive the navigator from the set before building any screen, and let the navigator draw the chrome once.

| Signal in the screens | Structure |
| --- | --- |
| The same bottom bar on several screens | Tab siblings under one layout |
| A back arrow in the header | A stack child of the screen it is reached from |
| A sheet, overlay, or dialog | A modal route if it belongs in history, a local component if it belongs to the current interaction |
| A hamburger menu | A drawer, with its destinations as drawer screens |
| Horizontal tabs inside the content, a floating action button | Components, not routes |

Keep the project's existing navigation system. Style the tab bar and header through the navigator's options while the design fits them; a pill-shaped or floating bar, a raised centre button, or a header with a logo and search field is cheaper as a custom component passed to the navigator.

## Build the feature, not the mockup

A mockup shipped verbatim is a convincing dead app. For each screen, name the feature it represents and wire it: every value that changes at runtime reads from state, props, context, or the API; buttons run actions; forms validate and submit; lists fetch; navigation carries parameters.

A mockup also shows one moment: full, happy, populated. Decide separately what each screen does with zero items, one item, while loading, and on error (`user-onboarding` (empty-states) for the empty case; `design-craft` (worst-case-data) for the extremes). When editing a stored record, load it from the route parameters and fill the fields after the data arrives, then test reopening and reloading so saved fields do not come back blank.

## Judge against the right capture

A viewport-height, device-shaped capture is the one to show the user. It is the wrong one for judging your own work, because everything below the fold is cropped. Judge against a **full-height capture of one screen per image**. Before reporting something as missing, check the full-height capture and the markup: content can sit past a height cap, inside a collapsed section, or on another carousel slide. Content present in the markup can still be invisible to the user.

## Definition of done

Apply each check to every screen in scope and to any shared navigation it changes. Report checks that could not run on a platform as unverified, not as passed.

- [ ] The screen has a route, and its own file draws none of the chrome the navigator owns.
- [ ] Colors, radii, and fonts come from the one token module. Grepping screen files for raw hex or `rgb(` returns nothing.
- [ ] Icons match the mockup's set and names. Fonts match its families at the weights actually used.
- [ ] Grep each screen for display literals (quoted strings and numbers that reach the user) and account for every hit: it reads from data, or it is genuinely static copy.
- [ ] Populated, empty, single-item, loading, and error states were exercised.
- [ ] Each screen was compared with its full-height capture.
- [ ] The report records which platforms actually ran the app and which were only built or exported. A web preview does not prove native layout, insets, or keyboard behaviour.

## React Native porting traps (dated)

Read this only when the target is React Native or Expo. Checked in November 2026 against the source and the React Native 0.88 style docs (Expo SDK 54 and later). Every item names the version it was checked on. Re-verify against current Expo and React Native docs before relying on version-specific details, because the gap with web CSS keeps shrinking. These failures are silent: the app compiles, runs, and is wrong.

- **Flex direction.** Web `display: flex` lays children out in a row; React Native defaults to column. `flex items-center gap-3` from the mockup renders as a vertical stack until it gets an explicit row direction. Give every `flex` in the source an explicit direction.
- **Every string inside `<Text>`**, including strings in `&&` branches, ternaries, and stray `{' '}`. A bare string under a `View` only logs a development-console error; in production it is simply missing. Text styles go on the `Text`, because they do not cross a `View`.
- **Insets, once per edge.** The mockup has no notch, status bar, or home indicator, and Android draws edge-to-edge by default from Expo SDK 54. Use the safe-area package (core's `SafeAreaView` only insets on iOS) with a provider at the root, plus one inside any native modal or route root that `react-native-screens` presents as a separate view hierarchy. Check the insets the presented screen actually receives. Decide each edge's owner from all the navigator chrome around the screen. A stack header insets the top. A standard bottom tab bar already insets the bottom, so a screen inside tabs does not pad it again. A screen under a stack header with no tab bar or other bottom chrome owns its bottom edge. A headerless screen or modal owns whichever edges no chrome covers. Never inset an edge twice (React Navigation, Handling safe area).
- **Shadows.** `boxShadow` takes the CSS shadow (web-like string or object array) on the New Architecture only. On Android, outset shadows need Android 9+ and inset shadows Android 10+ (RN 0.88 docs), so check the app's minimum SDK. On older projects, set the iOS `shadow*` props and Android `elevation` together and give the view a background color so elevation draws.
- **Hover becomes press.** `hover:` styles compile but never fire on touch. Carry the intent to the pressed state.
- **Gradients.** As of the RN 0.88 docs, `backgroundImage` accepts `linear-gradient()` and `radial-gradient()` strings, so a mockup's CSS gradient can often port directly. Confirm that the project's React Native version and architecture support it. On older versions, or for gradients outside that syntax, use a native gradient component (`expo-linear-gradient`). Either way, compare the result against the screenshot.
- **Keyboard.** Every screen with a text input needs keyboard avoidance. With the keyboard open, focus each field and trigger validation: errors and Save/Cancel must stay visible or reachable by scrolling.
- **Styling library sanity check.** With a class-based library (NativeWind, Uniwind), make one throwaway class render visibly before building screens, because a misconfigured setup silently does nothing.
- **Touch targets.** Keep small icons visually small but give their controls usable hit areas. If the app also targets web, make sure inactive routes and covered modal content cannot take keyboard focus; `aria-hidden` alone does not prevent it.

Native platform depth for Apple targets → `apple-design`, `swiftui`, `uikit`. This list is only the HTML-to-React-Native seam.

## Source

Sleek, `design-mobile-apps` skill (listed on skills.sh as `sleek-design-mobile-apps`), https://github.com/sleekdotdesign/agent-skills (MIT), rev `fb90438`: its implementing and designing guides and its SKILL file (user shot vs review shot). Paraphrased and generalized from Sleek's own export format to any generated mockup. Sleek's API workflow, endpoint contracts, version pinning, and Iconify specifics were not imported. Ledger: `docs/skills-sh-design-topic-source-mining-2026-11.md`.
