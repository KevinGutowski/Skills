# Apple Typography — Code Patterns

*Sources (samples transcribed verbatim from each session's Code tab; timestamps preserved):*
- *WWDC 2024, session 10074 — "Get started with Dynamic Type." https://developer.apple.com/videos/play/wwdc2024/10074/*
- *WWDC 2020, session 10175 — "The details of UI typography." https://developer.apple.com/videos/play/wwdc2020/10175/*

*(WWDC 2022, session 110381 — "Meet the expanded San Francisco font family" — is a design talk with no code samples.)*

**Staleness markers:** samples are tagged with their source year. Verified against current docs mid-2026; re-verify before shipping. Known modernization: the UIKit notification-based trait observation (2024 sample) → prefer `registerForTraitChanges` on iOS 17+.

---

## Text styles (the foundation)

**2024 · 3:53 — SwiftUI**
```swift
Text("Hello, World!")
    .font(.title)
```

**2024 · 4:06 — UIKit**
```swift
let label = UILabel(frame: .zero)
setupConstraints()
label.text = "Hello, World!"
label.adjustsFontForContentSizeCategory = true
label.font = .preferredFont(forTextStyle: .title1)
label.numberOfLines = 0
```

**2020 · 17:45 / 18:05 — Emphasized variants** (note the per-style weight mapping)
```swift
// UIKit/Catalyst — body "bold" is 17pt Semibold on iOS
if let descriptor = UIFontDescriptor
    .preferredFontDescriptor(withTextStyle: .body)
    .withSymbolicTraits(.traitBold) {
    let emphasizedBodyFont = UIFont(descriptor: descriptor, size: 0)
}

// AppKit — 13pt Semibold on macOS
let descriptor = NSFontDescriptor
    .preferredFontDescriptor(forTextStyle: .body)
    .withSymbolicTraits(.bold)
let emphasizedBodyFont = NSFont(descriptor: descriptor, size: 0)

// SwiftUI
let emphasizedFootnoteFont = Font.footnote.bold() // 13pt Semibold on iOS
```

**2020 · 20:03 — Leading variants** (tight = −2pt, loose = +2pt line height on iOS/macOS)
```swift
// UIKit/Catalyst — use .traitLooseLeading for loose
if let descriptor = UIFontDescriptor.preferredFontDescriptor(withTextStyle: .title1)
    .withSymbolicTraits(.traitTightLeading) {
    let tightLeadingFont = UIFont(descriptor: descriptor, size: 0) // 36pt line height
}

// AppKit
let descriptor = NSFontDescriptor.preferredFontDescriptor(forTextStyle: .headline)
    .withSymbolicTraits(.tightLeading)
let tightLeadingFont = NSFont(descriptor: descriptor, size: 0) // 14pt line height

// SwiftUI — use .loose for loose
let tightLeadingFootnoteFont = Font.footnote.leading(.tight) // 16pt line height on iOS
```

**2020 · 20:56 / 21:08 — Font designs** (`.rounded` → SF Pro Rounded, `.serif` → New York, `.monospaced` → SF Mono; size/weight/line height preserved)
```swift
// UIKit — Reminders' "Today" large title
if let descriptor = UIFontDescriptor
    .preferredFontDescriptor(withTextStyle: .largeTitle)
    .withSymbolicTraits(.traitBold)?
    .withDesign(.rounded) {
    label.font = UIFont(descriptor: descriptor, size: 0) // SF Pro Rounded Bold
}

// SwiftUI
let roundedBodyFont = Font.system(.body, design: .rounded)
```

---

## Tracking (prefer the system's tables)

**2020 · 12:45 — Let the system tighten (best)**
```swift
// UIKit: UILabel
label.allowsDefaultTighteningForTruncation = true
// AppKit: NSTextField
textField.allowsDefaultTighteningForTruncation = true
// SwiftUI
Text("hamburgefonstiv").allowsTightening(true)
```

**2020 · 12:19 — Custom tracking (exceptional cases only; must be size-specific; never kerning)**
```swift
// UIKit
label.attributedText =
    NSAttributedString(string: "hamburgefonstiv",
        attributes: [kCTTrackingAttributeName as NSAttributedString.Key: -0.5])
// SwiftUI
Text("hamburgefonstiv").tracking(-0.5)
```

---

## Dynamic Type with custom fonts

**2020 · 25:05 — UIKit via UIFontMetrics**
```swift
if let customFont = UIFont(name: "Charter-Roman", size: 17) {
    let bodyMetrics = UIFontMetrics(forTextStyle: .body)
    let customFontScaledLikeBody = bodyMetrics.scaledFont(for: customFont)
    label.font = customFontScaledLikeBody
    label.adjustsFontForContentSizeCategory = true

    // Scaling a layout constant relative to body
    let scaledValue = bodyMetrics.scaledValue(for: 10)
}
```

**2020 · 28:29 — SwiftUI** (since iOS 14, `Font.custom` scales relative to `.body` by default)
```swift
// Scale relative to the role the text plays
Text("Typography").font(.custom("Avenir-Roman", size: 34, relativeTo: .title))
Text("Title").font(.custom("Helvetica", size: 17))           // relative to body (default)
Text("Fixed").font(.custom("Courier", fixedSize: 17))        // opt out of scaling

@ScaledMetric(relativeTo: .title) private var spacing: CGFloat = 10.0
```

---

## Dynamic layouts at accessibility sizes

**2024 · 7:20 — SwiftUI: flip stack axis by size**
```swift
struct FigureCell: View {
    @Environment(\.dynamicTypeSize)
    private var dynamicTypeSize: DynamicTypeSize

    var dynamicLayout: AnyLayout {
        dynamicTypeSize.isAccessibilitySize ?
        AnyLayout(HStackLayout()) : AnyLayout(VStackLayout())
    }

    let systemImageName: String
    let imageTitle: String

    var body: some View {
        dynamicLayout {
            FigureImage(systemImageName: systemImageName)
            FigureTitle(imageTitle: imageTitle)
        }
    }
}
```

**2024 · 8:20 — UIKit: drive the stack axis from the size category**
```swift
class ViewController: UIViewController {
    private var mainStackView: UIStackView = UIStackView()

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        NotificationCenter.default.addObserver(self, selector: #selector(textSizeDidChange(_:)),
            name: UIContentSizeCategory.didChangeNotification, object: nil)
    }

    @objc private func textSizeDidChange(_ notification: Notification?) {
        let isAccessibilityCategory = self.traitCollection.preferredContentSizeCategory.isAccessibilityCategory
        mainStackView.axis = isAccessibilityCategory ? .vertical : .horizontal
        setupConstraints()
    }
}
// iOS 17+: prefer registerForTraitChanges over the notification.
```

---

## Scaling images and symbols with text

**2024 · 11:05 — SwiftUI: content image via @ScaledMetric**
```swift
struct ContentView: View {
    @ScaledMetric var imageWidth = 125.0
    var body: some View {
        VStack {
            Image("Spatula")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: imageWidth)
            Text("Grill Party!")
                .frame(alignment: .center)
        }
    }
}
```

**2024 · 10:30 — UIKit: inline image scales with the text**
```swift
func attributedStringWithImage(systemImageName: String, imageTitle: String) -> NSAttributedString {
    let attachment = NSTextAttachment()
    attachment.image = UIImage(systemName: systemImageName)

    let attachmentAttributedString = NSMutableAttributedString(attachment: attachment)
    attachmentAttributedString.append(NSAttributedString(string: imageTitle))
    return attachmentAttributedString
}
```

**2024 · 11:38 — UIKit: symbol tied to a text style**
```swift
func imageWithBodyConfiguration(systemImageName: String) -> UIImage? {
    let imageConfiguration = UIImage.SymbolConfiguration(textStyle: .body)
    return UIImage(systemName: systemImageName, withConfiguration: imageConfiguration)
}
```

(SwiftUI `List` rows and SF Symbols inline in `Text` scale automatically — 2024 · 10:12.)

---

## Large Content Viewer (bars that can't grow)

**2024 · 13:15 — SwiftUI**
```swift
struct FigureBar: View {
    @Binding var selectedFigure: Figure

    var body: some View {
       HStack {
            ForEach(Figure.allCases) { figure in
                FigureButton(figure: figure, isSelected: selectedFigure == figure)
                    .onTapGesture { selectedFigure = figure }
                    .accessibilityShowsLargeContentViewer {
                        Label(figure.imageTitle, systemImage: figure.systemImage)
                    }
            }
        }
    }
}
```

**2024 · 13:45 — UIKit**
```swift
class FigureCell: UIStackView {
    init(systemImageName: String, imageTitle: String) {
        super.init(frame: .zero)
        self.systemImageName = systemImageName
        self.imageTitle = imageTitle
        setupFigureCell()

        self.addInteraction(UILargeContentViewerInteraction())
        self.showsLargeContentViewer = true
        self.largeContentImage = UIImage(systemName: systemImageName)
        self.scalesLargeContentImage = true
        self.largeContentTitle = imageTitle
    }
}
// Custom gesture recognizers: see UILargeContentViewerInteraction.gestureRecognizerForExclusionRelationship.
```

---

## Quick facts worth keeping

- 7 default text sizes + 5 accessibility sizes; default is "Large"; Text Size can live in Control Center.
- SF Pro's optical-size axis transitions Text→Display between **17 and 28pt**, automatically.
- Body text style: 22pt line height → 20pt tight / 24pt loose.
- "Leading" is named for the strip of lead between lines of metal type; kerning belongs to the type designer.
- A tab bar that scaled with accessibility text would consume ~¼ of the screen — that's why the Large Content Viewer exists.
- Catalyst: "Scale to Match iPad" renders iOS sizes at 77%.
- CSS: `system-ui`, `ui-rounded`, `ui-serif`, `ui-monospace`.
