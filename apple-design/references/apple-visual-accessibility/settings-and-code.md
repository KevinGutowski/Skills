# Visual Accessibility — Settings, APIs & Code

## Contents
- Per-setting reference
- The 2020 code samples (verbatim)
- Worked examples


*Sources:*
- *WWDC 2020, 10020 — "Make your app visually accessible" (code samples verbatim from the session's Code tab). https://developer.apple.com/videos/play/wwdc2020/10020/*
- *WWDC 2019, 244 — "Visual Design and Accessibility" (no Code tab; APIs as spoken). https://developer.apple.com/videos/play/wwdc2019/244/*

**Staleness:** UIKit APIs circa iOS 13–14; all current, but in SwiftUI prefer the environment values listed in the table. Verify names against current docs.

## Per-setting reference

| Setting | UIKit check (2020 talk) | SwiftUI environment (modern) | Your response |
|---|---|---|---|
| Button Shapes | `UIAccessibility.buttonShapesEnabled` (iOS 14) | `\.accessibilityButtonShapes`* | Alternate appearance with visible button affordances |
| Differentiate Without Color | `shouldDifferentiateWithoutColor` (iOS 13) | `\.accessibilityDifferentiateWithoutColor` | Add shapes/symbols wherever color carries meaning |
| Increase Contrast | system colors auto; asset-catalog High Contrast variants | `\.colorSchemeContrast` | Darker in Light Mode, lighter in Dark; ≥4.5:1 |
| Smart Invert | `accessibilityIgnoresInvertColors` on views (iOS 11) | `.accessibilityIgnoresInvertColors()`* | Flag photos/videos/icons to opt out of inversion |
| Bold Text | `UIAccessibility.isBoldTextEnabled` | `\.legibilityWeight` | Heavier weights for custom fonts (system styles free) |
| Larger text | `traitCollection.preferredContentSizeCategory` | `\.dynamicTypeSize` | See [apple-typography.md](../apple-typography.md) |
| Reduce Motion | `UIAccessibility.isReduceMotionEnabled` | `\.accessibilityReduceMotion` | Drop idle/parallax/autoplay motion |
| Cross-Fade Transitions | `UIAccessibility.prefersCrossFadeTransitions` (iOS 14) | — (system nav free) | Replace slides with dissolves in custom transitions |
| Video Autoplay | `UIAccessibility.isVideoAutoplayEnabled` (iOS 13) | `\.accessibilityPlayAnimatedImages`* (related) | Require interaction; show play/pause |
| Reduce Transparency | `UIAccessibility.isReduceTransparencyEnabled` | `\.accessibilityReduceTransparency` | Make custom blurs opaque |

*\* verify exact modern names against current docs.*

Every `UIAccessibility.is…/should…` check has a paired `…DidChangeNotification` — observe it so the UI updates live while the app is foregrounded.

## The 2020 code samples (verbatim)

**3:14 — Button Shapes**
```swift
func observeButtonShapesNotification() {
    // Make buttons more visible by using shapes.
    // If your default design does not include button shapes, observe this notification to make visual changes.
    NotificationCenter.default.addObserver(self, selector: #selector(updateButtonShapes), name: UIAccessibility.buttonShapesEnabledStatusDidChangeNotification, object: nil)
}

@objc func updateButtonShapes() {
    if UIAccessibility.buttonShapesEnabled {
        // Use extra visualizations for buttons.
    } else {
        // Use default design for buttons.
    }
}
```

**3:31 — Differentiate Without Color**
```swift
func observeDifferentiateWithoutColorNotification() {
    // Use symbols or shapes to convey meaning instead of relying on color alone.
    // If your default design does not differentiate without color, observe this notification to make visual changes.
    NotificationCenter.default.addObserver(self, selector: #selector(updateColorAndSymbols), name: NSNotification.Name(UIAccessibility.differentiateWithoutColorDidChangeNotification), object: nil)
}

@objc func updateColorAndSymbols() {
    if UIAccessibility.shouldDifferentiateWithoutColor {
        // Use symbols or shapes to convey meaning.
    } else {
        // Use default design.
    }
}
```

**7:47 — Smart Invert opt-out**
```swift
extension UIView {
    @available(iOS 11.0, tvOS 11.0)
    var accessibilityIgnoresInvertColors: Bool { get set }
}
```

**9:57 — Layout flip at accessibility sizes**
```swift
override func traitCollectionDidChange (_ previousTraitCollection: UITraitCollection?) {

     if (traitCollection.preferredContentSizeCategory
         < .accessibilityMedium) { // Default font sizes

         stackView.axis = .horizontal
         stackView.alignment = .center

     } else { // Accessibility font sizes

         stackView.axis = .vertical
         stackView.alignment = .leading

     }
}
```
(iOS 17+: prefer `registerForTraitChanges` over overriding `traitCollectionDidChange`.)

**11:33 — Bold Text**
```swift
@objc func updateLabelWeight() {
    if UIAccessibility.isBoldTextEnabled {
        // Use bold or heavy font weight
    } else {
        // Use font weight that is default to your design.
    }
}
```

**13:08 — Reduce Motion · 13:51 — Cross-Fade · 15:07 — Reduce Transparency** follow the identical observe-notification + check-flag pattern with `reduceMotionStatusDidChangeNotification` / `prefersCrossFadeTransitionsStatusDidChange` / `reduceTransparencyStatusDidChangeNotification`.

## Worked examples

- **Starstruck (2020 demo app):** zodiac rows distinguished by color *plus* a per-constellation symbol; the "Start Gazing" button gains a shape under Button Shapes; the white-on-purple symbol failed contrast until the background darkened (→ 7.5:1).
- **Peanut-butter tracker (2019):** green/yellow/red circles → check / question mark / X — shipped as the default because it read better for everyone.
- **Causality (2019):** color-only game state → colorblind mode with symbolic flags; "for some users this actually is what makes the game playable."
- **Increase Contrast direction:** colors darken in Light Mode, lighten in Dark Mode — the system palette models it; mirror it in custom colors.
- **Smart Invert framing:** Dark Mode is a design you ship; Smart Invert is asserted *over* you — your job is opting out the content that must not invert.
- Quotables: "one in three people has some form of motion sensitivity"; "large text can be the difference between being unable to use their device and being able to use it."
