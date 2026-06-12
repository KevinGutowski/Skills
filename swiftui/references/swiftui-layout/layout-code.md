# Containers & the Layout Protocol — Code

## Contents
- Containers (10031)
- Grid — eager 2D (10056)
- The Layout protocol (10056)


*Sources (verbatim from each session's Code tab):*
- *WWDC 2020, 10031 — "Stacks, Grids, and Outlines in SwiftUI." https://developer.apple.com/videos/play/wwdc2020/10031/*
- *WWDC 2022, 10056 — "Compose custom layouts with SwiftUI." https://developer.apple.com/videos/play/wwdc2022/10056/*

**Staleness:** iOS 14/16-era; `SidebarListStyle()` → `.listStyle(.sidebar)` in modern code; everything else current.

---

## Containers (10031)

**3:57 — Scrollable lazy stack** (lazy only for the *scrolling* container; inner on-screen stacks gain nothing)
```swift
ScrollView {
    LazyVStack(spacing: 0) {
        ForEach(sandwiches) { sandwich in HeroView(sandwich: sandwich) }
    }
}
```

**7:13 — Adaptive grid** (as many equal columns as fit — rotation/resizing free)
```swift
var columns = [ GridItem(.adaptive(minimum: 300), spacing: 0) ]
ScrollView {
    LazyVGrid(columns: columns, spacing: 0) {
        ForEach(sandwiches) { sandwich in HeroView(sandwich: sandwich) }
    }
}
```

**8:47 — Hierarchical list → outline in one change**
```swift
List(graphics, children: \.children) { graphic in
    GraphicRow(graphic)
}
.listStyle(SidebarListStyle())   // modern: .listStyle(.sidebar)
```

**9:52 — Custom outline structure** (List → ForEach → Section → OutlineGroup)
```swift
List {
    ForEach(canvases) { canvas in
        Section(header: Text(canvas.name)) {
            OutlineGroup(canvas.graphics, children: \.children) { graphic in
                GraphicRow(graphic)
            }
        }
    }
}
```

**13:10 — DisclosureGroup for non-data show/hide** (inspectors)
```swift
Form {
    DisclosureGroup(isExpanded: $areFillControlsShowing) {
        Toggle("Fill shape?", isOn: isFilled)
        ColorRow("Fill color", color: fillColor)
    } label: {
        Label("Fill", systemImage: "rectangle.3.offgrid.fill")
    }
}
```

How OutlineGroup works: it expands to a ForEach whose body is a DisclosureGroup; each content is another OutlineGroup over that element's children — and DisclosureGroup content evaluates only when opened, so only the minimum executes.

---

## Grid — eager 2D (10056)

`Grid` loads all views, so it sizes/aligns cells across both axes (lazy grids can't). Each row/column gets the space its largest view needs; flexible views absorb the rest.
```swift
// 5:41 — Leaderboard core
Grid(alignment: .leading) {
    ForEach(pets) { pet in
        GridRow {
            Text(pet.type)
            ProgressView(value: Double(pet.votes), total: Double(totalVotes))
            Text("\(pet.votes)")
                .gridColumnAlignment(.trailing)   // overrides one column
        }
    }
    Divider()   // a view outside any GridRow spans the whole grid
}
```

---

## The Layout protocol (10056)

**10:53 — The two required methods**
```swift
struct MyEqualWidthHStack: Layout {
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout Void) -> CGSize {
        // Return a size.
    }
    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout Void) {
        // Place child views.
    }
}
```

**16:33 — sizeThatFits** (max ideal size × count + system spacing)
```swift
guard !subviews.isEmpty else { return .zero }
let maxSize = maxSize(subviews: subviews)            // max of subview.sizeThatFits(.unspecified)
let spacing = spacing(subviews: subviews)            // from ViewSpacing preferences
let totalSpacing = spacing.reduce(0) { $0 + $1 }
return CGSize(width: maxSize.width * CGFloat(subviews.count) + totalSpacing,
              height: maxSize.height)
```

**16:51 — placeSubviews** (never assume (0,0); offer maxSize so flexible labels fill)
```swift
let placementProposal = ProposedViewSize(width: maxSize.width, height: maxSize.height)
var x = bounds.minX + maxSize.width / 2
for index in subviews.indices {
    subviews[index].place(at: CGPoint(x: x, y: bounds.midY),
                          anchor: .center, proposal: placementProposal)
    x += maxSize.width + spacing[index]
}
```

**15:40 — System spacing, not hardcoded**
```swift
let spacing = subviews.indices.dropLast().map {
    subviews[$0].spacing.distance(to: subviews[$0 + 1].spacing, along: .horizontal)
}
```

**21:08 — ViewThatFits fallback** (big Dynamic Type → vertical)
```swift
ViewThatFits {
    MyEqualWidthHStack { Buttons() }
    MyEqualWidthVStack { Buttons() }
}
```

**23:42 — Per-view data via LayoutValueKey**
```swift
private struct Rank: LayoutValueKey { static let defaultValue: Int = 1 }
extension View { func rank(_ value: Int) -> some View { layoutValue(key: Rank.self, value: value) } }
// read inside the layout: subview[Rank.self]
```

**25:18 — AnyLayout switching** (structural identity preserved → animatable)
```swift
let layout = isThreeWayTie ? AnyLayout(HStackLayout()) : AnyLayout(MyRadialLayout())
layout {
    ForEach(pets) { pet in Avatar(pet: pet).rank(rank(pet)) }
}
.animation(.default, value: pets)
```
Radial `sizeThatFits` tip: return `proposal.replacingUnspecifiedDimensions()` to handle nil dimensions.

**Why not GeometryReader:** it measures its container and sends size *downward*; measuring a child to feed a frame back *up* bypasses the layout engine and can loop or crash. The Layout protocol is the sanctioned replacement.
