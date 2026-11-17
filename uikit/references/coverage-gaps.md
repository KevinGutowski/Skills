# Coverage Gaps

UIKit uncertainty kept out of the router body.

## Candidate gaps

- **Single external source:** every reference distills one author's skill set (see [sources.md](sources.md)). Its API facts cite Apple docs, WWDC and SDK headers, but this library has not re-verified each symbol. Before promoting a rule into the router, check the symbol's availability via the docs `.md` page. Sweep log below.
- **iOS 27 / 27.1 freshness:** `uikit-ios27-sdk` was written against the iOS 27 SDK as of Oct 2026 and its iPhone Duo (27.1) section re-checked against Apple's first-party docs and tech talks on 2026-11-05 — that check found Objective-C declarations for `UIArrangementViewController` and reserved regions that the third-party source called Swift-only. Re-verify after each SDK point release; the iPhone Duo Group Lab livestreams were not read (no transcripts).
- **Measured recipe scope:** the `uikit-live-lists` recipe was measured on one chat-list task, mostly on simulators (iPhone 17 sim, iOS 26.4) plus an iPhone 12, with Opus and one Codex model. Unmeasured: prefetching while finger-flinging, keyboard/inset changes, media rows, RTL, VoiceOver, day sections, the general-list wording (`v1.1.0-general1`). The 0.1 s flush timer vs next-turn flush trades latency for CPU and the source's own evidence disagrees; treat it as a default to measure, not a law.
- **Table-view path:** the source cut its table-view alternative (no build used it). `UITableView` live-list guidance here is thin.
- **Objective-C coverage:** kept as notes per reference, not full examples. Mixed Swift/Objective-C interop beyond annotations is not covered.
- **Mac Catalyst / visionOS:** only incidental notes.

## Availability sweep log

**2026-11-12 — every API named in the SKILL.md core rules, checked against the developer.apple.com doc JSON (`/tutorials/data/documentation/uikit/<symbol>.json`, `metadata.platforms`).** Re-run after each SDK point release and when a core rule gains an API name.

| API | iOS availability (docs, 2026-11-12) | Action |
|---|---|---|
| `textView(_:editMenuForTextIn:suggestedActions:)` | 16.0, **deprecated 27.0** | Core rule and three references reconciled to the replacement below |
| `textView(_:editMenuForTextInRanges:suggestedActions:)` | 26.0; Swift and Objective-C; docs: falls back to the single-range method with the union range when unimplemented | Now the named method |
| `UIScreen.main` | 2.0, **deprecated 26.0** ("Use `UIWindowScene.screen`") | Already a "never" in the core rule |
| `UIMenuController` | 3.0, deprecated 16.0 ("Use `UIEditMenuInteraction`") | Already in `uikit-deprecated-apis` |
| `UINavigationItem.navigationBarMinimization` | 27.0; **Objective-C property exists** (`UIBarMinimization *`) | "Swift-only" row removed from `uikit-ios27-sdk` |
| `UIView.LayoutRegion.bar(onEdge:extent:)` | 27.1; Objective-C `+[UIViewLayoutRegion layoutRegionForBarOnEdge:extent:]` exists | "Swift-only" row removed |
| `UITextView(usingTextLayoutManager:)`, `UIEditMenuInteraction` | 16.0 | none |
| `registerForTraitChanges(_:handler:)` | 17.0 | none |
| `keyboardLayoutGuide`, `reconfigureItems` (snapshot and collection view) | 15.0 | none |
| `viewIsAppearing(_:)` | 13.0 (back-deployed) | none |
| `updateConfiguration(using:)` | 14.0 | none |
| `UICollectionViewCompositionalLayout`, `UICollectionViewDiffableDataSource`, snapshot `reloadItems` | 13.0 | none |
| `UICollectionView`, `performBatchUpdates(_:completion:)`, `UITableView`, `UITextView`, `UILabel`, `layoutSubviews()`, `viewWillLayoutSubviews()`, `viewDidLoad()`, `UIDevice.userInterfaceIdiom` | long-standing, not deprecated | none |

Not swept: APIs named only in references (the single-source caveat above still applies to them), and the "iPhone apps are resizable from the iOS 27 SDK" behaviour claim, which rests on `uikit-ios27-sdk` and Apple's `app-resizability` skill rather than a symbol page.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Apple source checked (doc .md availability / WWDC / header):
Deployment target:
Observed project failure or accepted review:
Rule:
Exception:
Status: proposed | accepted | rejected
```
