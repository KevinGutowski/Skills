# Apple Developer iOS Freshness Pass — Source Mining (2026-11)

Ticket ask: check iOS development coverage for new material, especially iPhone Duo and App Intents/Siri, plus the latest Apple Developer YouTube [videos](https://www.youtube.com/@AppleDeveloper/videos) and [streams](https://www.youtube.com/@AppleDeveloper/streams). Pass run 2026-11-05.

## Source manifest

YouTube listings came from the channel pages' `ytInitialData`. YouTube blocked transcript and caption requests from this machine, so every transcript below comes from the same video's page on developer.apple.com.

| Source | How fetched | Read | Verdict | Folded into |
|---|---|---|---|---|
| HIG "Designing for iPhone Duo" (new, Sept 9, 2026) | HIG Markdown endpoint | full | high | `apple-design` iphone-duo-design (new) |
| Technology Overview "Preparing your app for iPhone Duo" | docs `.md` | full | high | iphone-duo-design, `swiftui` swiftui-iphone-duo (new), `uikit` uikit-ios27-sdk |
| Tech talks 111461 Prepare / 111462 Raise the bar / 111463 Strike a pose / 111464 Multiple displays and scenes / 111465 Camera / 111466 Design for iPhone Duo (YouTube, ~1 month old) | developer.apple.com transcripts | full | high | same three references |
| Symbol pages: ArrangementView, ReservedRegion, toolbarVerticalEdge, ToolbarOverflowMenu, ToolbarVerticalBehavior, ToolbarVerticalCompressionBehavior, ToolbarItemVisibilityPriority, ToolbarItemAxisBehavior, CameraCaptureAccessory, SceneAccessoryContent, defaultTabBarPlacement; UIArrangementViewController, UIViewReservedRegion, UIView.reservedRegions, UIHingeInteraction, UIBarButtonItem.AxisBehavior, UIBarButtonItemVisibilityPriority, UIVerticalBarCompressionBehavior; AVCaptureDeviceDirectionCoordinator; AVCaptureDevice.DeviceType | docs `.md` | declarations + availability | verification | API names in the three references; found ObjC declarations the uikit source called Swift-only (corrected) |
| WWDC26 240 App Schemas, 343 Advanced App Intents, 344 Code-along Siri, 345 New App Intents capabilities, 295 AppIntentsTesting, 310 What's new in Shortcuts | developer.apple.com transcripts (subagent extraction, names re-checked against AppIntents docs) | full | high | `apple-design` app-intents-design + new second-hop `app-intents-design/siri-ai-ios27.md` |
| WWDC26 121 "Announcing Apple's next big step for Siri and iPhone" | transcript | full | skip (promo) | none |
| iPhone Duo Group Labs (9/16, 9/17, 10/13, 10/15 livestreams) | YouTube listing only | no transcript | unknown | parked |
| Apple Intelligence Group Labs (11/4, 11/5, App Intents + Siri AI Q&A) | YouTube description only | no transcript | unknown | parked |
| "Boost your app's speed and efficiency" (Meet with Apple stream, ~10/30) | listing only | no transcript | unknown | parked; recheck for `swiftui` performance |
| Tech talks "Design for Touch on Mac", "Bring Touch to your Mac app", "Bring Live Activities to Mac" (~10/28) | developer.apple.com, no transcript yet | description only | n/a for iOS | parked (macOS) |
| App Store Connect Analytics (2), security talks (Enhanced Security, MIE/PAC, Sanitizers, bounds safety, security-sensitive Swift), "Meet with Apple" SwiftUI series (Sept) | listing only | no | out of scope for this pass | parked; the SwiftUI series is a candidate for a later `swiftui` freshness pass |

## Already covered before this pass

- `uikit-ios27-sdk` already named the 27.1 foldable APIs (from the third-party uikit-skill). This pass verified them against first-party material, fixed the Objective-C table, and added SDK tiers, bar ordering and overflow, and the inner-display window limit.
- `app-intents-design` already carried the June 2026 HIG schema-first overlay. This pass added the WWDC26 implementation model behind it.

## Conflicts and corrections

- **UIRequiresFullScreen:** the iOS 27 reference says iOS 27 ignores the key (from Apple's app-resizability skill). The iPhone Duo talk says Duo still honors it but resizes the app on open and close. Both are recorded, scoped to their contexts.
- **Objective-C:** `UIArrangementViewController` configuration and reserved regions do have Objective-C declarations (`-setViewController:forPlacement:animated:`, `-reservedRegionsOfKind:options:`). The Swift-only table rows were removed and a correction note added.
- **App Intents confirmation and open behavior:** for schema intents, Siri now confirms automatically, and `system.open` is required for deep links. Both are noted inline in the parent reference.
- **Talk vs docs names:** the talk said "IntentValueRepresentation" in one session and "ValueRepresentation" in another. Docs have `IntentValueRepresentation`. The talk named "ExecutionTargets"; docs show `allowedExecutionTargets` / `IntentExecutionTargets`. `onHingeChange` had no doc page and is marked talk-named.
