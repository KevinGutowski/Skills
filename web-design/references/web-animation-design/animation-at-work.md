# Animation at Work — verified quotes

Rachel Nabors, *Animation at Work* (A Book Apart, 2017). All quotes verified against the source text. Chapter numbers per the book's table of contents: 1. Human Perception and Animation · 2. Patterns and Purpose · 3. Anatomy of a Web Animation · 4. Communicating Animation · 5. Best Practices and Other Educated Guesses.

## Contents

- Chapter 1 — Human Perception and Animation
- Chapter 2 — Patterns and Purpose
- Chapter 3 — Anatomy of a Web Animation
- Chapter 5 — Best Practices and Other Educated Guesses
- Conclusion — staleness caveat (hers)

## Chapter 1 — Human Perception and Animation

**Where/What systems:**

> "Margaret Livingstone called these the 'Where System' and the 'What System' in her book *Vision and Art: The Biology of Seeing*… Interfaces and designs tickle the more recently evolved What System, helping users identify elements on a screen by their shape and color. But when we design with motion, too, we tap into the older Where System. We can use motion to orient users in an information space and shore up spatial hierarchy."

> "Motion jacks directly into the Where System, which interfaces with all kinds of orienting mechanisms. Meanwhile, having a list item change colors to indicate its availability will tap into the What System."

**The brain's GPU + Hudson & Stasko:**

> "Using animation to explicitly show users the in-betweening keeps those processes on the brain's visual cortex instead. This lets users stay focused and on task. In this way, you can think of animation as a shortcut through the brain's GPU, so to speak."

> Researchers Scott E. Hudson and John T. Stasko found in the early '90s that sudden changes could distract users, and that animation "allows the user to continue thinking about the task domain, with no need to shift contexts to the interface domain. By eliminating sudden visual changes, animation lessens the chance that the user is surprised."

**Cone of Vision (concept):**

> "I like to think of the interplay of peripheral and central vision in terms of a 'Cone of Vision,' with the center of vision reacting more to changes in color and the peripheral being more sensitive to motion."

**Change blindness and animacy habituation:**

> "Change blindness is when a person's Cone of Vision doesn't pick up on a visual change… by animating an element, just a bit, we can harness the Cone of Vision to help users register the change."

> "Much like New Yorkers don't notice the huge flashing LCD signs that advertise shows on Broadway, users quickly become blind to unimportant change. To brains, high-animacy advertisements become nothing more than the wind rustling leaves."

## Chapter 2 — Patterns and Purpose

**The five patterns:**

> "**Transitions** take users from place to place in the information space, or transition them out of one task into another. These tend to have massive impacts on the content on the page, replacing large portions of information."
>
> "**Supplements** bring information on or off the page, but don't change the user's 'location' or task. They generally add or update bits of additional content on the page."
>
> "**Feedback** indicates causation between two or more events, often used to connect a user's interaction with the interface's reaction."
>
> "**Demonstrations** explain how something works or expose its details by showing instead of telling."
>
> "**Decorations** do not convey new information and are purely aesthetic."

**The context test:**

> "That is animation's true purpose: to add context."

> "An easy way to check if an animation provides context is to use your words to describe what benefit or new information it supplies."

Context-quantifying questions: does it show where information came from or went to? indicate progress? move the user through an information space? reinforce physics or branding? explain something faster than words or a video could? "The more boxes an animation ticks and patterns it fulfills, the more likely it is to provide a net gain for your users."

**The 2×2:**

> "I create a graph with 'ease of implementation' on the X-axis (ranging from easy to implement to difficult) and 'justification' on the Y-axis (ranging from nice-to-have to necessary), and plot the animation features on it accordingly." Low-hanging fruit (justified + easy) goes "to the top of the priority heap."

**Cognitive-bottleneck smells:**

> "**Flashes of white** happen when a new page is loaded and painted into the browser window. Why replace the whole page when you can change and animate just the parts that matter?"
>
> "**Content insertion or removal** is a prime candidate for animation: tooltips, menus, dialogs, sequenced information."
>
> "**Wordy descriptions** can indicate something being told instead of shown. Can a demonstration do it better?"

## Chapter 3 — Anatomy of a Web Animation

**Cone of Vision duration modulation:**

> "The Model Human Processor… clocks the time it takes a user's eye to move at between 70 and 700 ms. It follows that animations in the center of the user's Cone of Vision do better with shorter durations (closer to the 70-200 ms spectrum) because the eye has less distance to travel. Animations on the edge of the Cone of Vision benefit from additional time for the user to move their eye, over in the 300-700 ms spectrum."

**Production speed-blindness:**

> "Studio animators working tirelessly on scenes week after week get pulled into a warped sense of time and space where their animation's playback seems faster than it really is. This is why animators have a saying: 'Whatever your pre-production duration is, halve it. Then halve it again!'"

## Chapter 5 — Best Practices and Other Educated Guesses

**Entrance/exit symmetry:**

> "When a piece of information animates onto the screen, it should also animate as it leaves the screen… many alerts beautifully animate into view, only to cut back into the void as soon as the user dismisses them. This gives a UI an unfinished, unreliable feel."

**FOULS / always be loading:**

> "FOULS: Flashes of Unloaded/ing States… We must ensure that users always see loaded states in the correct order—loading to loaded—and never see the unloaded state. This requires building with an 'always be loading' mentality, where the default state of content in a JavaScript-enabled environment is a loading state."

**Frame-rate consistency + mid-trajectory fade:**

> "A 30 FPS animation that consistently runs will appear smoother than a 60 FPS animation that dips from time to time. The human visual system is always looking for inconsistencies. Inconsistencies bog down the brain."

> "For moving graphics across large distances, you might also try fading the object out in the middle part of its trajectory, then back in at the destination. This gives the impression that the element moved so fast that it didn't register."

**Anticipatory signaling:**

> "Hovering over the menu bar option causes the bar to 'lift up,' signaling, 'if you click me, expect me to slide further up.' Hovering over the same options when it's open causes the panel to 'nudge downward,' saying, 'if you click me, I will slide further down.'"

**The waitstaff red flag:**

> "There is nothing so satisfying as hearing a beta tester remark, 'Oh, that's delightful!' upon seeing your first UI animations. However, this could be a red flag. It means that they have noticed an animation, and that means they are spending cognitive power on it—the exact opposite of what animations should do."

**Vestibular disorders and seizures (facts):**

> "As many as 35% of Americans aged 40 years or older have experienced vestibular dysfunction in some form."

> WCAG: "The current guidelines advise that elements flash no more than twice per second."

> iOS 7's Reduce Motion "replaced many other motion-based animations with fades, which do not trigger vestibular disorders."

## Conclusion — staleness caveat (hers)

> "I also want you to be wary of outdated research… most of this research is very old and needs to be revisited."

The book is from 2017: the perception research framing and pattern taxonomy hold up; tooling, browser-support, and implementation mechanics (pre-`prefers-reduced-motion`) are dated.
