# Liquid Glass Adoption — Case Studies

*Sources: Apple "Meet with Apple" Liquid Glass showcase series (2025–26). Series page: https://developer.apple.com/videos/play/meet-with-apple/208/*
- *254 — LTK (Jeseka Hahn, VP Product Design). https://developer.apple.com/videos/play/meet-with-apple/254/*
- *255 — Slack (Jaime DeLanghe, product lead; Akshay Bakshi, mobile product director). https://developer.apple.com/videos/play/meet-with-apple/255/*
- *256 — CNN (Kevin Long, Director of Apps). https://developer.apple.com/videos/play/meet-with-apple/256/*
- *257 — Tide Guide (Tucker MacDonald, indie, Condor Digital). https://developer.apple.com/videos/play/meet-with-apple/257/*

These are adoption *practice*; the material/system rules live in SKILL.md and `material-and-rules.md`.

---

## LTK — rebuild the foundation first

Context: aging layered framework — "years of layering onto an aging framework had made our app too heavy, too slow, and too expensive to evolve." Full SwiftUI rebuild in a self-imposed 4 months, *before* iOS 26 landed.

- **Start small:** the design system ("Runway") began with "a single humble button" → patterns → screens → shared language.
- **Audit before adopting:** "We audited the information architecture. We questioned every flow, every pattern to see what truly added value" — found duplicate solutions ("solving the same problem in multiple ways, even for something as simple as a product card") and cut via "brutal prioritization," which "wasn't just about cutting features… it meant slowing down to rebuild the right way."
- **Leadership buy-in tactic:** a principal engineer "built a side by side demo, showing how long it took to build a page with our design system in SwiftUI versus without… once our leaders and founders saw this, the debate ended."
- **Brand-on-glass:** "Our identity should not compete with creator content. It should complement it." Pre-glass they spent "weeks trying to fine tune the layout… But with Liquid Glass, the controls blended in seamlessly and creators content finally took center stage."
- Outcomes (illustrative, not rules): compile time −70%, app size −~50%, time-in-app +138% post-relaunch, "since the iOS 26 launch, search usage doubled overnight" (new dedicated Search tab). Framing: "adopting iOS 26 wasn't just another rebuild. It became an upgrade."

## Slack — sequence by touch frequency

- Rationale: "if the whole OS is shifting to Liquid Glass, why should Slack be different? Why should Slack be extra Slack?"
- **Brand:** "wouldn't going more native affect our product's brand? Well, not really, because in Slack our product's brand shines through in the voice and tone of our copy, the user customization and theming, and of course, our emojis."
- **The header prototype-reject ladder** (test treatments against real content):
  - *Concentric* — "fit great into the device's shape, but that bottom edge didn't resolve quite well."
  - *Capsule* — "felt really nice. But… it sometimes felt like a primary button."
  - *Gradient* (first-party style) — "with the variability of the content in our scroll views, it didn't work quite well."
  - Landed near the previous design but accentuating glass containers; constraint: headers must support theming, because "theming in Slack is not just about esthetics. It's how users differentiate between their personal and professional workspaces."
- **Search to the tab bar:** deep-navigation pain pulled the change forward — "iOS 26 kind of convinced us… we moved up our roadmap." Pitch leverage: "it just decreased the user learning curve. Every single Apple app would be getting updated in the fall, and users could learn this with all the other apps."
- **Rollout order:** iPad scoped down because old custom sidebar/nav controls "slowed us down on the engineering front" (day one = windowing + menu bar). iPhone day one = create menu, tab bar, conversation headers, composer ("the most important elements that people would be interacting with every single day"). Next month: "the bigger and riskier changes, the things that we knew would be a rewiring of muscle memory" (glass header, search tab). Then media chrome, canvas controls, landscape. — "You don't have to start on day one and have the entire app updated."
- **Native controls payoff:** "when we use native controls, it really felt like we were swimming with the OS and the OS was propelling us forward… It also future proofs us… use the OS as kind of an accelerant."

## CNN — the engineering pitfalls

Pre-work: a 3-year CMS migration forced a client rewrite from Objective-C/Swift/UIKit/React Native mix to SwiftUI; article elements went from per-element nib/ViewModel stacks to "a single file per element."

- **First step:** "we recompile the app in Xcode 26 to see how it looked. This gave us a baseline." Tab bar and navigation bar "transitioned automatically and looked great out of the box." Then: "focus on getting the basics right, especially top level navigation, and build quickly from there."
- **Pitfall 1 — nested glass:** "Avoid nested glass effect modifiers. Applying the glass effect to both a parent and child views led to visual redundancy. Double translucency, layered blur, and unpredictable rendering. We resolved this by applying the modifier only at the highest level where the effect was needed, and… created internal guidelines to prevent accidental nesting." (The material rule "never glass-on-glass" with the failure mode and the fix.)
- **Pitfall 2 — padding:** `glassEffect` "didn't always respect padding as expected. Sometimes stretching or clipping content. We found that wrapping the effect in background or overlay methods helped restore some predictable layout behavior, and we adjusted the padding to sit outside of the modifier scope."
- **Pitfall 3 — GPU cost:** "The effect is GPU intensive, especially in scrollable or frequently updated views. We limit its use in high frequency UI areas like list and animations, reserving it for static or top level components like the tab bar and toolbars."
- **Scoped rollout:** a custom view modifier "conditionally applies the glass effect only on iOS 26" — selective enhancement (e.g. video-player button overlays).
- Warning: "Just make sure your team has enough time to test thoroughly, especially around layout and performance."

## Tide Guide — adopt, then redesign (indie scale)

- **Sequencing:** "a redesign is certainly not required to adopt the new design. In fact, my process was more adopt and then redesign. Many of the best aspects come from just using the latest version of system components."
- **Interactive glass on small buttons:** "particularly useful on smaller buttons, ones that are normally covered by your finger when you tap them… you get an immediate reaction when touching it, and it makes the interface feel much more responsive." (Plus morphing day-of-week buttons with haptics.)
- **Identity variant** (invisible until interaction): "This effect doesn't change the appearance of a view until you interact with it" — used under the tidal wave (soft highlight while sliding), on chart cards (replacing a scale animation; "makes the cards feel more cohesive within the rest of the app and the platform"), and on chart container backgrounds while scrubbing.
- **Glass as delight in flat moments:** refraction rings in an empty-state radar animation — glass "can bring a bit of delight to moments that might otherwise feel flat or overlooked."
- **Context menu → glass popover:** grouped chart settings in a context menu meant "the whole menu deconstructs every time" (many taps); a flattened menu was "very hard to read at first glance"; the fix was "a glass popover instead, using the same components from inside the menu" — tweak without dismissal, escalate to a sheet, and the collapse back into the ellipsis menu gives "a sense of origin to all of these settings."
- **Backporting:** "many of the changes that I've made to padding and hierarchy, I haven't cordoned off to just the latest OS version." Concentricity praise: "soft corners throughout interfaces… makes screens feel much more welcoming."
- Framing quote: Liquid Glass "lets interfaces feel alive without being overweight, expressive and functional without being distracting." "What surprised me most… is how subtle many of the improvements can be, yet how dramatically they can refine the feel of the interface."
