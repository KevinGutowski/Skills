# App Structure — Split Views, Tables, Toolbars (Code)

## Contents
- NavigationSplitView (10058 · 16:55)
- Table with sorting + selection (10058 · 3:18 / 10:25)
- Selection-aware context menus (10058 · 12:34)
- Toolbars: from More-menu to system overflow (110343)
- Titles, rename, documents (110343 · 0:13–0:17)
- Data-driven navigation (WWDC 2022 · 10054, added by extension)


*Sources (verbatim from each session's Code tab):*
- *WWDC 2022, 10058 — "SwiftUI on iPad: Organize your interface" (Raj Ramamurthy). https://developer.apple.com/videos/play/wwdc2022/10058/*
- *WWDC 2022, 110343 — "SwiftUI on iPad: Add toolbars, titles, and more" (Harry Lee). https://developer.apple.com/videos/play/wwdc2022/110343/*

**Staleness:** iOS 16-era, current as of 2026 except: `showsByDefault:` → `defaultCustomization(.hidden)` (iOS 17); `.navigationBarLeading/Trailing` → `.topBarLeading/Trailing`; one-param `onChange(of:)` deprecated (iOS 17); `@EnvironmentObject` → `@Observable`-era patterns.

---

## NavigationSplitView (10058 · 16:55)

```swift
struct ContentView: View {
    var body: some View {
        NavigationSplitView {
            SidebarView()
        } detail: {
            Text("Select a place")
        }
    }
}
```
Two columns (sidebar+detail) or three (sidebar + content + detail). Styles: `.automatic` (recommended), `.balanced`, `.prominentDetail`. Collapses to a stack in compact size classes.

## Table with sorting + selection (10058 · 3:18 / 10:25)

```swift
struct PlacesTable: View {
    @EnvironmentObject var modelData: ModelData
    @State private var sortOrder = [KeyPathComparator(\Place.name)]
    @State private var selection: Set<Place.ID> = []

    var body: some View {
        Table(modelData.places, selection: $selection, sortOrder: $sortOrder) {
            TableColumn("Name", value: \.name) { place in
                PlaceCell(place)
            }
            TableColumn("Comfort Level", value: \.comfortDescription).width(200)
            TableColumn("Noise", value: \.noiseLevel) { place in
                NoiseLevelView(level: place.noiseLevel)
            }
        }
        .onChange(of: sortOrder) {
            modelData.sort(using: $0)   // Table never sorts your data itself
        }
    }
}
```
Compact width shows only the **first column** — keep the Table (scroll position + selection survive size-class changes); make column one the compact representation. iPad tables don't scroll horizontally.

## Selection-aware context menus (10058 · 12:34)

```swift
Table(modelData.places, selection: $selection, sortOrder: $sortOrder) { … }
.contextMenu(forSelectionType: Place.ID.self) { items in
    if items.isEmpty {
        AddPlaceButton()                       // empty area → create
    } else {
        if items.count == 1 {
            FavoriteButton(isSet: $modelData.places[items.first!].isFavorite)
        }
        AddToGuideButton(items)                // single AND multiple
    }
}
```

## Toolbars: from More-menu to system overflow (110343)

```swift
// ❌ Hand-rolled More menu (0:01) → ✅ just give the system the controls (0:03)
.toolbar {
    ToolbarItemGroup(placement: .primaryAction) {
        FavoriteToggle(place: $place)
        AdjustImageButton(place: $place)
        AdjustMapButton(place: $place)
    }
}
// → overflow menu appears automatically when space runs out.

// 0:04–0:05 — secondary actions + editor role (title moves leading; center renders secondaries)
.toolbar {
    ToolbarItemGroup(placement: .secondaryAction) { … }
}
.toolbarRole(.editor)
```

**Customizable toolbar (0:07–0:11)** — stable ids everywhere; iPadOS customizes secondary actions only:
```swift
.toolbar(id: "place") {
    ToolbarItem(id: "favorite", placement: .secondaryAction) {
        FavoriteToggle(place: $place)
    }
    ToolbarItem(id: "image", placement: .secondaryAction) {
        ControlGroup {
            AdjustImageButton(place: $place)
            AdjustMapButton(place: $place)
        } label: {
            Label("Edits", systemImage: "wand.and.stars")
        }
    }
    ToolbarItem(id: "share", placement: .secondaryAction, showsByDefault: false) {
        ShareLink(item: place)   // iOS 17+: defaultCustomization(.hidden) instead of showsByDefault
    }
}
.toolbarRole(.editor)
```

## Titles, rename, documents (110343 · 0:13–0:17)

```swift
PlaceDetailContent(place: $place)
    .navigationTitle($place.name) {     // Binding → editable title
        MyPrintButton()
        RenameButton()                  // triggers inline rename
    }
    .navigationDocument(place.url)      // draggable doc header + macOS proxy icon
```
"You can kind of think of this like the File menu on macOS" — works for document-like screens even outside `DocumentGroup`.

---

## Data-driven navigation (WWDC 2022 · 10054, added by extension)

*Source: "The SwiftUI cookbook for navigation" (Curt Clifton). https://developer.apple.com/videos/play/wwdc2022/10054/*

**6:05 — Pushable stack** (path = data; links append values; destinations map values → views)
```swift
struct PushableStack: View {
    @State private var path: [Recipe] = []
    @StateObject private var dataModel = DataModel()

    var body: some View {
        NavigationStack(path: $path) {
            List(Category.allCases) { category in
                Section(category.localizedName) {
                    ForEach(dataModel.recipes(in: category)) { recipe in
                        NavigationLink(recipe.name, value: recipe)
                    }
                }
            }
            .navigationTitle("Categories")
            .navigationDestination(for: Recipe.self) { recipe in
                RecipeDetail(recipe: recipe)
            }
        }
        .environmentObject(dataModel)
    }
}
// Deep link: set `path`. Pop to root: path = []. Mixed types: NavigationPath.
```

**14:10 — Stack inside a split-view column; destination OUTSIDE the lazy container**
```swift
NavigationSplitView {
    List(Category.allCases, selection: $selectedCategory) { category in
        NavigationLink(category.localizedName, value: category)
    }
} detail: {
    NavigationStack(path: $path) {
        RecipeGrid(category: selectedCategory)
    }
}

struct RecipeGrid: View {
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns) {
                ForEach(dataModel.recipes(in: category)) { recipe in
                    NavigationLink(value: recipe) { RecipeTile(recipe: recipe) }
                }
            }
        }
        .navigationDestination(for: Recipe.self) { recipe in   // outside the lazy grid
            RecipeDetail(recipe: recipe)
        }
    }
}
```
"Lazy containers don't load all of their views immediately... the destination might not be loaded, so the surrounding NavigationStack might not see it."

**18:12 — Codable navigation model: ids, not values; tolerant decode; SceneStorage**
```swift
class NavigationModel: ObservableObject, Codable {
    @Published var selectedCategory: Category?
    @Published var recipePath: [Recipe] = []

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encodeIfPresent(selectedCategory, forKey: .selectedCategory)
        try c.encode(recipePath.map(\.id), forKey: .recipePathIds)   // ids, not stale values
    }

    required init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        selectedCategory = try c.decodeIfPresent(Category.self, forKey: .selectedCategory)
        let ids = try c.decode([Recipe.ID].self, forKey: .recipePathIds)
        recipePath = ids.compactMap { DataModel.shared[$0] }          // drop deleted items
    }
    enum CodingKeys: String, CodingKey { case selectedCategory, recipePathIds }
}

// Wiring: restore on appear, save on every change
@SceneStorage("navigation") private var data: Data?
// .task { if let data { navModel.jsonData = data }
//         for await _ in navModel.objectWillChangeSequence { data = navModel.jsonData } }
```
(2022-era `ObservableObject`; modern code uses `@Observable`. NavigationStack/SplitView/NavigationPath remain the current model.)
