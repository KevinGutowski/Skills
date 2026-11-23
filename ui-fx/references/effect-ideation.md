# Effect ideation: coming up with an effect that belongs

## Contents

- The method in one pass
- Step 1: inventory the moments
- Step 2: name what the moment means
- Step 3: borrow a physical behaviour
- The palette: seven families of effect
- Loud or quiet: the same idea at three levels
- Step 4: stage it in five beats
- Step 5: offer a spread, lead with the boldest
- Signature or stock: making it yours
- Worked example
- What tends to fall flat

Use this when the request is open ("make it pop", "something extra here", "what could we do that's special") and no effect has been named. If the user named the effect or the library and asked for it to be built, skip to the build; if they named one but only asked whether it would suit, answer with ideas and build nothing (SKILL.md, workflow step 1).

This is a way to generate more and better ideas, not a filter. Aim to come out with a long list, push the best ones further than feels safe, and let the user cut. In exploratory work, build several.

## The method in one pass

1. Inventory the surface's **moments**; each one is a place an effect could go.
2. Say what the moment **means** in a sentence a user would agree with.
3. Find a **physical behaviour** with the same meaning.
4. Stage it in **five beats**, so it has a start, a peak and an end.
5. **Offer a spread** at different costs, leading with the boldest.

Starting from the moment is what makes an effect feel like the product's own instead of a component anyone could install. Browsing a gallery for raw material is fine and often the fastest way to find a direction: take what catches the eye, then run it through steps 2–4 to make it specific.

## Step 1: inventory the moments

Walk the surface and list where something *happens*. Events and states are where effects hit hardest; regions (a hero, an empty state, a background) can carry atmosphere.

| Moment | What is true for the user | Frequency |
| --- | --- | --- |
| **Arrival** | First view of a page or product; nothing is understood yet | Once per visit |
| **Invitation** | One control is the thing to do next (the prompt box, the primary CTA) | Persistent, so make it one that wears well |
| **Commit** | They pressed the button that matters: pay, send, publish, generate | Rare |
| **Waiting** | The system is working for more than about two seconds | Varies; can be long |
| **Presence** | Something is alive on the other side: an agent, a mic, a collaborator | Continuous while true |
| **Transformation** | One state becomes another: draft to sent, prompt to image, list to detail | Per action |
| **Arrival of a result** | The wait is over and the thing exists | Per action |
| **Achievement** | A milestone, first success, streak, completion | Rare by design |
| **Touch** | Pointer or finger meets a surface: hover, press, drag | Constant, so brief and instant |
| **Atmosphere** | The page or a region has a mood: a hero, a backdrop, an empty state | Persistent; slow, and better when it reacts to pointer or scroll. A hover texture (a quiet field of marks that answers the pointer, [textures.md](textures.md)) is atmosphere and touch in one |
| **Premium** | A thing costs money or is special: a plan, a badge, a limited item | Persistent, small area |

Use two axes to size each idea, not to rule it out: **consequence** (how much does the user care that this happened) and **frequency** (how often will they see it). High consequence and low frequency can take the full showpiece. High frequency wants something short that still looks good the hundredth time.

List every moment that could carry something. In exploratory work, design for many of them and see which survive. When finishing a shipped product, lead with the two or three strongest and offer the rest as a backlog.

## Step 2: name what the moment means

Write one sentence: *"When ___ happens, the user should feel ___ because ___."* A "because" about the product ("because the money has actually left their account") gives the strongest effects. A "because" about mood ("because this brand should feel like liquid chrome") is a fine reason for atmosphere and material; name the mood precisely.

Useful meanings and the question each answers:

- **"It heard me."** Did my press register? (touch, commit)
- **"It's working, and here's on what."** Is anything happening? (waiting, presence)
- **"It's alive / it's listening."** Is something there? (presence)
- **"It changed, and this is what it became."** What just happened? (transformation)
- **"It's done, and it worked."** Can I stop paying attention? (result, achievement)
- **"This one is the special one."** Where should I look? (invitation, premium)
- **"This place has a feeling."** What is this product like? (atmosphere, arrival)

## Step 3: borrow a physical behaviour

Effects read instantly when they behave like something the viewer has watched in the world. Ask: *what physical thing does what this moment means?*

| Meaning | Physical behaviours to borrow |
| --- | --- |
| Energy travelling, work in progress | Light running along an edge, a pulse through a wire, a scanning beam, a tide line |
| Something alive or attentive | Breathing, a pupil tracking, a flame leaning toward sound, cloth settling |
| A change sweeping through | A wave front, a ripple from a dropped stone, a page being wiped, heat shimmer, ink spreading |
| Two things becoming one | Droplets merging, wax melting, mercury pooling, magnets snapping |
| Material and value | Brushed metal catching light, glass refracting what is behind it, foil, a holographic sticker tilting |
| Assembly, becoming | Developing film, dust settling into a shape, pixels resolving, frost forming, a sketch being inked |
| Release, celebration | A burst that falls under gravity, a cork, a struck bell's ring, sparks |
| Weight and response | A surface dimpling under a press, a card tilting on a pivot, a spring overshooting |

Then keep the physics honest. Light has a source and a direction. Waves start somewhere and travel outward at a believable speed. Things with mass anticipate before they move and settle after. Bursts obey gravity. An effect that breaks its own physics looks like a filter.

## The palette: seven families of effect

A vocabulary for proposals, with what each is good and bad at. Technique names point to [platform-techniques.md](platform-techniques.md). For a wall of ready examples across most of these families, browse the catalogue in [ittybitty.md](ittybitty.md). For buildable recipes, see [control-patterns.md](control-patterns.md) (how controls move) and [surface-recipes.md](surface-recipes.md) (light, glass, grain, dissolves).

| Family | Examples | Says | Watch for |
| --- | --- | --- | --- |
| **Edge light** | Travelling border beam, breathing glow, rim that lingers after a change, focus spotlight following the pointer | Energy, activity, "this one" | The most copied family, so make it yours: drive it from state and take the palette from the product |
| **Material** | Liquid metal, glass refraction, foil and holographic tilt, grain, plush or fabric shading | Value, tangibility | Richest when one material family runs through the page |
| **Distortion** | Wave front, ripple from touch, lens, chromatic fringing, heat shimmer, displacement on hover | Force passing through, transformation | Text is unreadable while it runs, so use it across a change or on imagery, and keep passes short |
| **Liquid** | Gooey merge, blob morph, melt, stretch and trail on a moving indicator | Cohesion, playfulness | Filter cost on Safari; needs things that actually move or meet |
| **Particles** | Dust gathering before a wave, confetti, sparks on completion, a pixel mosaic resolving into an image | Assembly, release | Counts climb fast; give particles a life and a floor |
| **Living indicators** | Thinking orbs with named states, a voice ring that bends with level, an avatar that looks at the pointer | Presence, attention | Must follow real state; an idle loop that never changes is wallpaper |
| **Depth and type** | Tilt and parallax on a card, shared-element morphs, variable-font weight breathing, text that assembles | Space, emphasis | Parallax and zoom are the main vestibular triggers; split text breaks screen readers, and an `aria-label` on the wrapper does not fix it: animate a mask over intact text, or keep the real string beside an `aria-hidden` animated twin |

Sound and haptics are an eighth family on native platforms; they belong to `swiftui` (sound-design).

## Loud or quiet: the same idea at three levels

Every family above has a whisper version, and the whisper is often what ships on a product that is already good. One of the posts behind this skill shows it: a chat composer whose border carries a faint, colourless light that drifts along the edge while a small "Working" chip sits above it. It is the same border beam as the rainbow demos, turned to mono and low strength. Nobody would call it an effect, and the composer still feels alive.

| Idea | Whisper | Signature | Showpiece |
| --- | --- | --- | --- |
| Edge light on a composer | Mono hairline, ~30% strength, slow drift while working | Brand-hue beam, full strength while streaming | Spectrum beam with outer bloom and a pulse on arrival |
| Commit transition | 150 ms tint sweep across the button, receipt crossfades | A band from the button reveals the receipt, rim lingers | Full distortion wave with fringing and dust |
| Premium card | A one-pass sheen on hover | Foil edge that follows the pointer | Liquid-metal fill and holographic tilt |
| Atmosphere | Static grain and a single slow gradient shift | A slow mesh gradient in two brand hues | A reactive shader scene |
| Presence | A dot that breathes beside the label | A small orb with named states | An avatar that looks at the pointer |

To move down a level, change the effect's own parameters: palette to mono or one hue, opacity and strength down, band narrower, blur softer, speed slower, travel shorter, particle count down, area smaller. To move up, do the reverse and add a second beat (anticipation, a lingering rim). Propose at least a whisper and a showpiece of the strongest idea so the user can feel the range.

## Step 4: stage it in five beats

A rich effect is a short piece of choreography. The distortion-waves demo that prompted this skill shows the full shape on a payment card, and glimm arrives at the same shape independently (content gathers toward the pressed control while the request runs, the band breaks away when the result arrives, the change happens behind the band, the view settles). The shape transfers to any consequential transition:

| Beat | What happens in the demo | General rule | Rough share of the time |
| --- | --- | --- | --- |
| **1. Anticipation** | The card's content pulls slightly toward the pressed button; faint colour fringing; dust gathers | A small move *toward the source*, opposite to the main motion. It tells the eye where to look and makes the release feel caused | 10–15% |
| **2. Release from the source** | A blurred, coloured lens leaves the button, leaning toward where it was pressed | The effect originates at the thing the user touched, never from nowhere or the centre of the screen | — |
| **3. Travel covers the swap** | The wave crosses the card; under it "Sending to" becomes "Sent to" and the avatar becomes a check | Change the content while the effect hides it. The user sees a before and an after, never the cut. The new content starts showing behind the front as soon as it leaves the source (within about 300 ms of the real response); do not cover everything first and reveal later, and never lay an opaque cover over a result that is already showing. When the user is waiting on the outcome (paid, saved, sent), state it in text outside the swept area the moment it is known, so reading it never depends on the effect finishing. Then move focus to the new view or announce the outcome | 40–50% |
| **4. Linger** | The middle clears first; colour and a hairline stay on the card's edges | Leave a quiet trace on the boundary so the eye has an after-image while it reads the new state | 25–35% |
| **5. Rest** | The card is plain again, in its new state | End at a fully static frame. The end state must be complete without the effect | 0 |

Rules that fall out of this:

- **The press responds at once.** The visual anticipation may start on pointer-down. The action itself (the request) fires in the `click` handler, the up-event, never on pointer-down, so it can be cancelled by sliding off and also fires from the keyboard. It fires at the click, not after beat 5: the effect never delays the action.
- **Let the effect follow the work.** Anticipation can stretch for as long as the request runs: the content leans in on press and the release happens when the real response arrives, so the effect adds no wait. glimm's `work` / `change` split in [glimm.md](glimm.md) is the cleanest statement of this.
- **Never fake the outcome.** If the result is not known yet, hold in a waiting state (an indicator, a beam, the lean-in) and play the wave when the real response arrives. Playing "success" before the server answers is a lie the user will catch the first time it fails.
- **Give failure a version too.** Decide what the same moment looks like when it fails: usually no flourish, a clear message, the form intact.
- **Reversible.** If the state can go back, the effect should be able to collapse into its source.
- **Colour means something.** In the demo the transfer runs multicolour and "credits added" runs green. Tie the palette to the outcome or the brand; do not default to rainbow. Colour reinforces the outcome and never carries it alone: the text or icon says it too.
- **Never blocks input.** Navigation, Escape and presses on other controls go through while the effect runs. A repeat press on an action that must not run twice (pay, send) is stopped by the app's own in-flight guard, not by the animation.
- **Scale to the change.** A whole-view change takes a full-view sweep; a single card refreshing keeps the effect inside that card, with its edges feathered so it does not look cut off.
- **Total length:** about a second or less for a transition the user triggered, since they are waiting to read the result; a rare showpiece can run longer. An indicator or beam on work the user started runs for as long as the work does and stops with it. Atmosphere (a shader field, a slow material) can run indefinitely in a prototype; when it ships it is automatic motion, so it stops within five seconds or has a visible, keyboard-operable pause control (the floor in SKILL.md).

Smaller effects use fewer beats. A press ripple is beats 2 and 4. A breathing glow or an atmospheric field is a loop with no beats: let it follow something (state, pointer, scroll, audio) so it stays alive instead of repeating.

## Step 5: offer a spread, lead with the boldest

Offer at least three directions per moment, one line each, at different rungs of the ladder in SKILL.md, with what each costs and what it degrades to. Include one that is further than the user probably expects. Recommend the boldest the surface can carry, or the level the user asked for.

Template:

```markdown
Moment: <which, and why this one>
Meaning: <the one sentence from step 2>

A. Quiet (CSS only): <effect>. Cost: none. Fallback: static.
B. Signature (hand-rolled <technique>): <effect>. Cost: <bundle / paint>. Fallback: <A or crossfade>.
C. Showpiece (<library or shader>): <effect>. Cost: <dependency, WebGL, support>. Fallback: <…>.

Recommend: <letter>, because <reason>.
Also worth trying: <other moments on this surface and a one-line idea for each>.
```

If the user asked a question and not for a build, stop here: the spread is the deliverable. Otherwise build without waiting for a pick; only a paid licence, or a new dependency in a shipped codebase the user has not asked for, waits (SKILL.md workflow step 6: build the dependency-free version now). Exploring: build several as variants behind a switch so they can be compared live. Finishing: build the recommendation and list the others in a line each.

## Signature or stock: making it yours

A stock component dropped in with default props is recognisable as that component. Three moves turn it into the product's own:

1. **Palette from the product.** Replace the default spectrum with the brand's two or three hues, or a mono version. Most libraries expose this.
2. **Source from the interaction.** Start the effect at the element and point the user touched.
3. **Bind to the product's own state names.** "Searching the web", "Reading files", "Sent": the effect's states should be the product's vocabulary.

Then run the specificity test from `design-craft` (refinement-moves): could a neighbouring product use this moment unchanged? If yes, it is still stock.

## Worked example

*Request: "The export flow in our video editor feels flat. Make it pop."*

- **Moments:** press Export (commit), render progress for 20–90 s (waiting, determinate), file ready (result). Hover on timeline clips is constant, so it stays as it is.
- **Meaning:** "When the render finishes, the user should feel it's done and it worked, because they've been waiting a minute and may have looked away."
- **Behaviour:** developing film; the frame resolving.
- **Proposals:** A. the progress bar's fill carries a soft travelling highlight while rendering and the thumbnail crossfades in (CSS). B. the thumbnail starts as a coarse mosaic of the video's own colours and resolves into the poster frame as progress climbs, ending with a single light sweep across it (canvas or an image-reveal library; fallback A). C. on completion a wave leaves the Export button and carries the dialog into its "Ready" state (WebGL transition; fallback crossfade).
- **Recommend B plus C:** the wait is long and determinate, so the effect can *be* the progress, and it uses the user's own content. Then let C land the finish: the wave carries the dialog into "Ready" when the render completes. They are two beats of one idea, so they stack. The progress bar keeps its number and stays a native `<progress>` (or `role="progressbar"` with a name and `aria-valuenow`) either way.
- **Also worth trying:** a magnetic, tilting Export button; clip thumbnails that catch a sheen under the pointer; a grain-and-light backdrop behind the export dialog.

## What tends to fall flat

Notes on why an idea may not be landing, with the stronger version of each. None of these is a ban.

| If it looks like this | It usually reads as | Stronger version |
| --- | --- | --- |
| A default-props gallery background (aurora, meteors, particle field) | The same as other sites that installed it | Keep the atmosphere; give it the product's palette, a subject, and a response to pointer or scroll |
| The same entrance on every section | Wallpaper by the third scroll | Vary by section, or save the big move for one |
| A loop that never changes on a persistent element | Something the eye learns to ignore | Drive it from state, input or audio; or let it settle to a still frame within five seconds |
| Two unrelated showpieces side by side | Noise | Give one the lead, or merge them into one staged effect |
| A flourish that plays before the result is known | A fake, the first time it fails | Wait state, then the real result |
| Distortion or blur held over text being read | In the way | Run it across a change, briefly, or on imagery |
| A hidden or replaced system cursor | A bug to anyone with an enlarged pointer | Add to the cursor (a trail, a glow) and leave the pointer itself |
