# Coverage Gaps

Use this file to preserve SwiftUI/API uncertainty instead of overfitting the router.

## Candidate gaps

- **API freshness by deployment target:** Animation, widgets, SF Symbols, concurrency, Observation, and layout APIs need SDK-target checks before naming an API in final guidance. The check is now cheap — fetch the symbol page with `.md` appended and read the `availability` block in its leading comment (see the router body, or `apple-design` (hig) for the full playbook).
- **Apple's Xcode skills — reconciled 2026-11-12, tensions resolved in Apple's favour:** `swiftui-specialist`, `swiftui-whats-new-27` and `building-document-based-swiftui-applications` were read from the public mirror at commit `047c090` (Xcode 27.2, build 27B52; pin and procedure in `apple-design` (xcode-agent-skills)) and compared with `swiftui-identity`, `swiftui-layout`, `swiftui-lazy-stacks`, `swiftui-animation` and their second-hop code files. Apple's skill wins where they differ.
  - *Resolved — setup in `init`:* `swiftui-lazy-stacks.md` Rule 5 now says a row must be ready on its first body pass because the model layer prepared it, and that a view initializer only copies inputs. In `swiftui-lazy-stacks/code-patterns.md` the two session samples that used `State(initialValue:)` in a row initializer were replaced by one adapted sample (a store that keeps per-row `@Observable` models).
  - *Resolved — non-private `@State`:* every `@State` in `swiftui/` samples is `@State private var`; the rule is core rule 12 and in `swiftui-identity.md`.
  - *Resolved — row fixes:* `swiftui-identity.md` has a section saying List/ForEach rows with several shapes get one root container, that a `@ViewBuilder` helper or `Group` does not provide one, and that modifiers-over-branches is for two states of one view only.
  - *Resolved — soft-deprecated spellings in samples:* `Section(header:)`, `SidebarListStyle()`, `showsByDefault:`, the one-parameter `onChange(of:)`, a hand-written `TransactionKey` and a hand-forwarded `animatableData` were modernised in `swiftui-layout/layout-code.md`, `swiftui-layout/structure-code.md` and `swiftui-animation/code-patterns.md`; each file's staleness line names what changed. A search of `swiftui/` for the other entries in Apple's list (`NavigationView`, `foregroundColor`, `cornerRadius`, `tabItem`, `navigationBarLeading/Trailing`, `presentationMode`, `accentColor`, `navigationBarTitle`, `edgesIgnoringSafeArea`, old alert/action-sheet forms) found no uses in samples.
  - *Deferred to Apple (this library keeps a fallback rule at most; the router table in `SKILL.md` names the Apple file):* `@State`/`@Observable`/`@Bindable` data flow and `onChange` isolation; ForEach identity and row structure; view factoring and initializer cost; conditional modifiers and `AnyShapeStyle`; custom environment keys and `@Entry`; the `@Animatable` macro; localization; the soft-deprecated API list and its when-to-migrate policy; everything new in the 27 SDK; document-based apps.
  - *Kept as this library's own (Apple's skills do not cover it):* the identity/lifetime/dependencies model and WWDC26 lab findings; container choice, `Layout` protocol, styles-over-wrappers, data-driven navigation; lazy-stack estimation, prefetching and scroll rules; springs, gesture velocity, transitions, keyframes, shaders.
  - *Not verified:* nothing was compiled — there is no Swift toolchain where this was done. That covers every sample marked "adapted, not compiled" (the lazy-stack store sample, `@Animatable` on a `ViewModifier`, `@Entry` on `Transaction`, the `defaultCustomization(.hidden)` placement, the trailing-`header:` section). The `TextRenderer` sample still hand-writes `animatableData`; whether the macro works on a `TextRenderer` was not checked.
  - *Left unconverted on purpose:* the 2022 `ObservableObject`/`@EnvironmentObject`/`@StateObject` models in `swiftui-layout/structure-code.md` (conversion changes bindings and the save loop — flagged in its staleness line), and the lazy-stack samples' `@Query` configured in a view initializer (the session's SwiftData pattern; Apple's skill does not address it, so check before treating it as cheap).
  - *Re-audit trigger:* when the pin in `apple-design` (xcode-agent-skills) moves to a new Xcode build — the mirror's HEAD already tracks an Xcode 27.3 beta. Re-read the three skills, re-run the soft-deprecated search over `swiftui/`, and update the router table if a reference file was renamed.
- **iPhone Duo API freshness:** `swiftui-iphone-duo.md` names iOS 27.1 APIs verified on 2026-11-05, except `onHingeChange`, which is named in a tech talk but had no doc page then. Verify its exact signature before using it in final guidance.
- **Missing source maps:** `swiftui-identity.md` and `widget-design.md` cite their sources inline (one session; one session plus HIG/WidgetKit pages) but have no same-named `sources.md`; add one if they become rule-promoting references. (`swiftui-lazy-stacks.md` and `swift-concurrency.md` now cite named 2026 sources inline — see `sources.md`.)
- **Performance fixtures:** Scroll/lazy-stack and animation guidance would benefit from small reproducible fixtures that show the failure and the fix.
- **Concurrency migration examples:** The skill needs accepted examples for Sendable/actor isolation fixes that avoid both over-annotating and papering over warnings.
- **Widget-design refreshed 2026-11-12, not exhaustive:** `widget-design.md` now covers families per platform, intent-backed interactivity, removable container backgrounds, StandBy/CarPlay, rendering modes and controls, checked against the HIG Widgets page (change log October 13, 2026), the HIG Controls page and WidgetKit docs. Not distilled: visionOS mounting/treatment styles and distance thresholds, Apple HomeView, watchOS Smart Stack relevance APIs, per-device dimensions, timeline budgets and push-driven reloads — the reference links out for those. No widget sample here has been compiled.
- **Widget interactivity examples:** Add concrete code examples only after building them against the target OS.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Apple/Swift source checked:
Deployment target:
Observed project failure or accepted review:
Rule:
Exception:
Status: proposed | accepted | rejected
```
