# Prototyping & Presenting — Methods Detail

*Sources: WWDC 2014-223 "Prototyping: Fake It Till You Make It"; WWDC 2017-818 "60-Second Prototyping"; WWDC 2018-811 "Presenting Design Work." The 2018 talk deliberately reuses 2014's toast motif — one curriculum.*

## Toast Modern (2014) — the canonical fake app

An artisanal-toast discovery app demoed convincingly on stage: "Except it's not. None of this is real. It's just a prototype." Built by faking:
- Screens in **Keynote**: screenshot the Music app, block out areas with shapes, color-pick the real nav bar, reuse **three photos of toast for every screen**, invent the text ("toast with goat butter and trout... not a thing"), Special Characters palette as icons (★ for ratings), a text-box "+" as a button — "you've designed an icon in five seconds." Orange theme "because it's the toastiest color of the rainbow."
- **Animation via Magic Move**: slides as keyframes; identical shapes on both slides prevent cross-fades; stagger list items horizontally so they animate at different speeds and "feel like distinct items"; duplicate the first slide as the third for the free reverse animation. Keynote runs on iPhone; taps advance — fake interactivity.
- **Interaction by hacking**: a `Layer` convenience class over UIImageView; the "list" is one tall screenshot moved by touch deltas (constrain to y); the map is an oversized screenshot with pins "sprinkled in an artisanal way"; typing is a slideshow of keyboard images. "Don't engineer it, just hack it together as quick as you can."
- The payoff lesson: the grid-view concept was killed by **a drawing** — "would've taken a whole bunch of real code. For our prototype, we just made a quick drawing, which was enough to realize that this concept sucked."

Marching orders by role: company devs — tell management prototyping saves time and money; solo devs — "draw, animate and hack before you go and build something"; designers — "don't just draw pictures, also make animated and interactive things"; managers — "make time for your designers and engineers to prototype."

## The 60-second timer (2017)

Keynote doc at iPhone size; shapes for the clock face and Start button; the **rotation-pivot trick** — copy the clock hand, paste an invisible mirrored twin below, group them so rotation pivots on the clock's center; rotate with **no easing** "to make it look just like a real clock." On-device tests in context: a coworker timing a pH test; David solving a Rubik's Cube (verdicts: Start button too small, wants a countdown, wants digital time). v2: bold red face, white hand, whole lower half as the tap region, a "Timer Done" slide. Parallel explorations followed — film-developing timer, steak timer, a tooth-brushing timer for a kid. Triage: "a few things won't work at all, and it is great when that happens. You've just learned something very valuable… and you're not going to be spending designing time or programming time building things that would not have worked out."

## Presenting (2018) — the texture behind the ten rules

- The audience caricature: "detectives of design crime, guardians of good sense, Draculas of deadlines, and captains of code."
- On stubborn problems: "When you have exhausted all possibilities, remember this: you really haven't."
- Recaps work "like that 30-second refresher" before a TV episode; assert when you'd like feedback ("it almost certainly won't work that way but still do try").
- Relatability demo: "ding, a handy reminder it's time for breakfast… just one swipe down and we're toasting" — first-person narrative; flow diagrams suit engineers but disconnect for concepts; a live prototype is strongest.
- Duarte structure applied: "Today, people are frustrated — cold, joyless toast. It's an epidemic. But imagine happy, flawless toast at the top of the button on your iPhone."
- "If I had more time, I would have written a shorter letter."

## The complete question battery

Before making: what needs to be more real? · what can we fake? · where will they use it?
While showing: do you know how to do X? · is it easy? · how can we make this better?
After: what's working? · what's not? · what other ideas does this give us?
