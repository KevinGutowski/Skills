# Feature Discoverability — Worked Examples

*Sources: WWDC 2017-816 "Love at First Launch"; WWDC 2021-10126 "Discoverable design"; WWDC 2023-10229 "Make features discoverable with TipKit."*

## First launch (2017)

- **The two metaphors:** a great first launch is Apple Union Square — walk in, touch everything; a bad one is a landlord demanding your passport and paystubs before showing the apartment.
- **Jetsetter:** browse, search, and drill into destinations within seconds of first launch; registration appears only at booking — the moment its benefit is self-evident.
- **Strava:** location requested when you start a ride; photo access when you tap "add a photo"; contacts when you look for friends — "a need to know basis."
- **Transit (upfront permission done right):** value made obvious before the prompt; tap Allow and the map instantly zooms to nearby departures — ask, then immediately reward.
- **Lara Croft GO / Streaks:** first levels/intro teach the core gestures and metaphors through play — zero tooltips, zero floating hands.
- Maxims: "Always lead with great content." "Teach through interactive experiences." "Only ask for what's needed when it's needed."

## The Toasty walkthroughs (2021)

- **Hamburger menu failure:** in testing, the closed menu's "three lines don't convey anything about the features inside" — replaced with a tab bar; but 6+ tabs shrank targets and added complexity. "Not all pixels are created equal."
- **Camera icon ambiguity:** photo? document scan? QR? — the text label "New" disambiguated; even recognizable icons are vague alone.
- **Blank-page problem:** the empty search field was seeded with example ingredients/places/friends.
- **In-context teaching:** the toast-scanning camera used an outline to guide framing, a disabled shutter that explains itself, and a haptic at the right moment — instruction when relevant, not in onboarding.
- **Gesture + visible pair:** swipe-down dismiss paired with a back button whose slide-down transition *teaches* the swipe; double-tap-to-like paired with a visible heart (double-tap means zoom elsewhere); peeking neighbor images hint horizontal swiping.
- **Personalization controls:** heart read as "favorite," thumbs confused testers; the winner was the literal label "Suggest toast like this" (more/less) — labels state consequences. Implicit signals disclosed as "Because you added avocado toast." The recommendation edit lived inline ("Suggest Less" / "Stop Suggesting"), not in a More menu. When the designers disagreed, they prototyped and tested.

## TipKit (2023) — the load-bearing code (beta names; see staleness note)

```swift
struct FavoriteBackyardTip: Tip {
    var title: Text { Text("Save as a Favorite") }
    var message: Text { Text("Your favorite backyards always appear at the top of the list.") }
    var actions: [Action] { [Tip.Action(id: "learn-more", title: "Learn More")] }

    @Parameter static var isLoggedIn: Bool = false
    static let enteredBackyardDetailView = Event<DetailViewDonation>(id: "entered-backyard-detail-view")

    var rules: Predicate<RuleInput...> {
        #Rule(Self.$isLoggedIn) { $0 == true }
        #Rule(Self.enteredBackyardDetailView) { $0.count >= 3 }   // explore organically first
    }
    var options: [Option] { [.maxDisplayCount(5)] }
}
// Donate from the view:  .onAppear { FavoriteBackyardTip.enteredBackyardDetailView.donate() }
// Invalidate on success: favoriteBackyardTip.invalidate(reason: .userPerformedAction)
// Frequency:             TipsCenter.shared.configure { DisplayFrequency(.daily) }
// Date-filtered rule:    $0.donations.filter { $0.date > Date.now.addingTimeInterval(-5*60*60*24) }.count >= 3
// Testing:               TipsCenter.showAllTips() / launch arg com.apple.TipKit.ShowAllTips 1
```
Shipped-SDK renames: `TipsCenter` → `Tips.configure`, `.popoverMiniTip` → `.popoverTip(_:)` — verify current docs.

Quotables: "You work on features that you know people will love, but first, they need to discover them." / "Great design requires trial and error. So, make things, show them to people, and learn from their feedback."
