---
name: hardware-product-design
description: "Design and ship a physical product — position the form factor first, prototype physical things, choose input methods, survive manufacturing reality. Use when designing hardware or a connected device, planning physical prototyping, or working with manufacturers. Triggers: hardware product, industrial design, form factor, tolerances, yield, enclosure, wearable."
---

# Hardware Product Design

**Sources:** [references/sources.md](references/sources.md) — 5 Config talks + Fellow/Linear. ⚠️ Humane's process lessons stand, but the Ai Pin failed in market — treat its strategy claims skeptically.

The task shape: you're making a *thing* — atoms, maybe with software inside. The costs invert vs software (iteration is slow and physical, mistakes ship permanently, inventory is capital), so the discipline inverts too: validate before tooling, parallelize hardware and software, and treat manufacturing as part of the design.

## Position the form factor first

- **Map freedom × presence before designing.** Humane used "a positioning graph… on the scales of freedom and presence — where do existing form factors sit today" (desktop: low freedom/high presence; smart speaker: high presence/low freedom) and designed *into the empty corner*. Make the map; if your device lands on top of an existing form factor, you're competing on execution, not category.
- **Own the input method to own the category** (Jae Park): "the ones who had a really strong point of view on the input method are the ones who tend to be successful in creating the new vessel category" — Mac/mouse, iPhone/touch. IoT, automotive, and AI devices are still "loose" on input — that looseness is the opening. (For AI products specifically: "there's not a strong point of view on what that input model should be.")
- **Watch for inherited "old-world problems."** Humane caught themselves debating "where do we put the back button" — "problems that we were bringing with us from our current interfaces." Name the smell when prior-paradigm UI debt sneaks into a new paradigm. The inverse tell (Park): radio buttons on a phone — "that's a mouse UI, why is it on my phone?" Paradigm-mismatch moments are where "purposeful innovation will happen."
- **Don't wait for a tech shift as permission to redesign** (Park, on electric cars): "nothing really was standing in the way of people redesigning that from before."

## Prototype physical things

- **Start with a non-functional mockup as North Star.** Humane's first model did nothing — but "when building hardware you want to really have a good sense of what's going to feel right"; physical delineations for inputs and sensors rallied the team around one object.
- **Build the ugly cabled rig.** A deliberately unshippable "Iron Man" rig "enabled us to actually start building software, which is really critical… you've got a bunch of parallel processes." Hardware lead times are the long pole; never let software wait for enclosures.
- **Build a test jig so you don't fabricate per iteration.** Augmental's dev board had a "licker pad, so that you can lick the sensor and test the tongue detection without making a retainer every single time." Decouple sensor/electronics iteration from enclosure fabrication — the jig is the hardware analog of a hot-reload loop.
- **Ladder capability.** Augmental's arc: "just a simple on-or-off detector" → a 3×3 grid → a full trackpad. Prove the riskiest signal exists before designing the product around it (Humane's banana-calories demo: "super primitive but so critical… to convince ourselves that we could teach a computer to see").
- **Prototype at true spatial context.** Jae Park measured Bezos's conference table ("it was two Kleenex boxes short"), brought a foam-core Echo Show model with a 7-inch tablet, and made the room stand 10 feet away — beating a PRD spec'd from desk distance. Screens in space "aren't flat… it's a different down angle"; evaluate at the real distance, angle, and lighting. (Fake-it tier mechanics → `design-prototyping`.)
- **Simulate displays that don't exist yet in tools that do.** Humane simulated "the hand, the device, the LEDs, the touchpad" in Origami Studio and later "got Figma up and running on the laser."
- **Demo or die — with a backup.** Augmental pre-recorded a fallback video; the live Bluetooth failure happened on stage and the demo survived.

## Choose the input

- **Pick input sites by neural bandwidth.** Augmental chose the tongue because "there's a super large chunk of neurons in the brain dedicated to the control and sensing of the tongue — we call it the 11th finger."
- **Audit the alternatives by failure mode before inventing**: eye trackers "fatigue pretty quickly, and they don't work well under the sun"; voice "fails in terms of privacy"; chin joysticks put "a physical barrier between your face" and others; brain implants are "too far out in the future — and people need solutions yesterday." A comparative-failure table is the entry point, not a competitive afterthought.
- **Design feedback for the channel you have.** Echo's light ring showed the device "can perceive where the voice is coming from — that helps you trust it"; successful commands got *silence*: "there's no response, it just plays the song — that's how you know it understood you." Far-field screens pace information to speech ("show enough information as she's talking"), not to information density.
- **Benchmark against the scariest comparator**: Augmental's top user "essentially matched the performance score that Neuralink has released… we don't require brain surgery." And time-to-productive matters: a new user "up and running clicking and moving the mouse" in ~20 minutes.

## Display & input physics (briefing layer)

When the product has a screen or touch surface, brief from this layer before spec'ing. (Dan Hollick, *Making Software* — makingsoftware.com/chapters/how-a-screen-works and /chapters/touch-screens; quotes verbatim.)

- **The master tradeoff is transmissive vs self-emissive.** LCD (transmissive): sub-pixels filter a backlight — weakness is "light bleeding from the backlight resulting in poorer contrast and narrower viewing angles," strengths are brightness, cost, lifespan. OLED (self-emissive): each sub-pixel emits its own light — "their weakness is usually brightness and lifespan, as they can burn-in over time, but they are energy efficient, responsive, and able to produce pure black by turning off individual pixels." Pick by duty cycle: static bright UI for years → LCD; contrast/thin/flexible/power → OLED.
- **LCD panel types in one line each:** TN — fastest response, cheapest, worst angles and color; IPS — widest angles, best color, costliest, moderate contrast; VA — highest contrast (~2500:1–6000:1+), slowest response, mid-range cost.
- **Current frontier:** Tandem OLED ("two OLED panels glued together" — brighter, longer-lived at lower voltage per layer; Apple's latest iPad) and MicroLED (inorganic micro-LEDs, no burn-in, very bright, but placed individually so still ruinously expensive below billboard sizes).
- **The framebuffer/refresh contract:** "The display controller reads from the framebuffer at the refresh rate of the display and so it's up to the system to make sure that the framebuffer is updated in time." Your SoC/GPU budget must close this loop at the panel's refresh rate — choose panel and silicon together.
- **Resistive touch:** two ITO-coated layers held apart by spacers; touch closes the circuit. "This is why you have to actively apply pressure when you interact with them, to make sure that the two layers touch and the circuit completes." Position read as a voltage gradient, axis by axis; cheap, works with gloves/styluses, but spongy and effectively no multi-touch. (ITO — Indium Tin Oxide — is the transparent conductor both technologies depend on.)
- **Capacitive touch:** perpendicular electrode rows/columns; driving columns are energized "one at a time in sequence multiple times per second," and a finger disturbing the electrostatic field changes mutual capacitance at row/column intersections — which is what makes precise multi-touch possible. Touch centers come from a weighted average over tens of intersections; hysteresis thresholds suppress hover flicker.
- **History check for positioning decks:** the first capacitive-touch phone honor "belongs to the LG Prada," not the iPhone — capacitive was also invented *before* resistive, "another case of the superior technology being invented too early."

## Manufacturing reality

- **One supplier per part, never one manufacturer for everything** (Work Louder): "if there was a problem… I would need to start from zero if I decide to switch manufacturers." And demystified: finding them "is as simple as going to Google, typing in custom plastic mold manufacturers."
- **Manufacturers build your mistakes faithfully.** "Our manufacturers overseas would be happy to make anything for us, even if it was riddled with mistakes" — Work Louder's keycaps "sprung off the keyboard" because the tolerances were off. Your spec is the only quality gate.
- **Spec like Fellow**: "very detailed specifications… it needs to be this grade surface, here is the exact percent deviation you're allowed" — plus reviewing samples and "dictating the process with our suppliers." Quality is an engineering process with the factory, not an inspection at the end.
- **Yield fixes are invisible and bleed deadlines** (Tome): "half the time when we're fixing stuff, we're fixing the ones you never saw — we redesigned this part entirely so that it wouldn't fail, and 99% of them now come out of the factory instead of 95." Hardware is "very organic… parts come and go; sometimes a manufacturer who makes this resistor decides they don't want to" — plan for part churn, not just rev cycles.
- **Inventory is the existential risk**: "the worst thing to do in any kind of physical product business is buy too much inventory — if you can't sell it you're stuck."
- **Gate on unit economics before building**: "can we sell this thing for more than we could make it" — priced to cover "our mistakes, our future developments, everything right down to the Wi-Fi," with an explicit break-even count (65 keyboards).
- **Let the community price it**: Work Louder ran a sealed-bid Vickrey-style auction of the first 10 units and "took the average of the bids" — "our community picked it for us."
- **Design the defect recovery yourself** — the factory's best offer was 10% off the *next* order. Work Louder rebranded a gray-instead-of-matte-black batch "the Fallout Edition" and converted 94% of pre-order backers. (The marketing side → `building-in-public`.)
- **Automate the bottleneck, not the whole** (ICON): "it's the wall system that is the slowest, most expensive, most labor-intensive part" — pick the first robot by cost × meaning leverage. Their technology-selection triple: "simple high-performance supply chain, labor could approach zero, and you'd leave a ton of design freedom still on the table."
- **The Doom Loop diagnosis** (ICON): in an optimized-to-death industry the only affordability levers left are "reduce the quality of the materials, the labor, or the design" → regulation tightens → "this Doom Loop of rising price and falling quality." Escaping requires a new production method, not better trade-offs inside the old one.

## Research & values

- **Watch-and-learn beats A/B for physical products** (Park): the F-150 Lightning's power-on-board patterns (working all day off the battery; "guardian angels" powering neighbors) came from field observation, not metrics.
- **Customers are co-designers — ship full agency.** Augmental's wheelchair control came from customer requests; on late-night use: "better or for worse, doing the doom scroll… it should be an option, whether it's good or bad." Assistive design means the user gets the whole life, not the curated parts. And Ryan Hudson-Peralta's maxim: "what's good design for people with disabilities is good design for everyone."
- **Design so marketing does "the least amount of lying"** (Tome): the story must carry "from the marketing page and the price point… down to how it feels when you buy it and use it" — claims feel good because the product was designed to make them true (the two-sided quality doctrine lives in `design-principles`).
- **"Design is not the pretty thing you do at the end"** (Ballard) — and his closing bar: "holding together high design and high technology and forcing them to cooperate instead of compete."

## Checklist

- [ ] Form factor mapped against existing devices (freedom × presence) — designing into an empty corner, with a strong point of view on the input method?
- [ ] Old-paradigm UI debt named and removed (no "back button" debates)?
- [ ] Non-functional mockup exists as North Star; ugly rig unblocking software in parallel?
- [ ] Test jig decouples electronics iteration from enclosure fabrication; riskiest capability proven with a primitive demo?
- [ ] Prototypes evaluated at true spatial context (distance, angle, lighting)?
- [ ] Input site chosen by bandwidth, alternatives audited by failure mode, feedback designed for the channel?
- [ ] One supplier per part; tolerances and surface grades spec'd with percent deviations; samples reviewed?
- [ ] Unit economics gated before tooling; inventory exposure bounded; defect-recovery plan owned by you, not the factory?
- [ ] Field observation (watch-and-learn) feeding the roadmap?

## Relationship to other skills

- **`design-prototyping`** — the general prototyping tiers (fake-it / real code / agents); this skill adds the physical tier: mockups, rigs, jigs, foam core at true distance.
- **`design-principles`** — Teenage Engineering/Kouthoofd's craft values and Tome's two-sided quality + least-lying doctrine live there; this skill is their shop-floor counterpart.
- **`building-in-public`** — Work Louder's audience/GTM mechanics (render-before-product, community pricing, defect-as-edition marketing) from the same talk.
- **`ai-experience-design`** — input/output models when the device is AI-first (push vs pull, presenting a design space); Humane's and the panel's AI framings live there.
- **`touch-interaction-design`** / **`sound-design`** — the interaction-feel layers once the hardware exists.
- **`shape-up`** — comms-enables-craft and appetite-setting for hardware's cliff deadlines.

> **Staleness note (Kevin's rule):** auto-captioned 2024–25 talks; company specifics (Humane's fate, ICON's Vitruvius/CODEX, Augmental's roadmap) decay fast — the positioning map, rig/jig discipline, supplier rules, and yield/inventory economics are the durable layer.
