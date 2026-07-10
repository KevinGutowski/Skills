# Malleable Software — Sources and Deeper Concepts

Depth material behind `../SKILL.md`. All quotes verified against the named source.

## Contents

- Source trail (full citations + transcript garble key)
- The Ink & Switch essay's frameworks (motivation, gentle slope, tools-not-apps, communal creation)
- Patchwork in depth
- Embark in depth
- AI and malleability: why codegen alone isn't enough
- Interview material not in SKILL.md (origin story, document-centric computing, chat as power-user interface, canvases and Spellburst, the education-startup do-over, coding like a surgeon, learning vs. cheating)
- Reference trail (books, projects, people)
- A note on "the gulf of customization"
- Practitioner notes (2025–26): designers building their own tools — full quotes

## Source trail

1. **Dive Club podcast** — "Geoffrey Litt" episode, host Ridd, 2025. Video ID `zJf0UeCwQqE` (youtube.com/watch?v=zJf0UeCwQqE). Litt is a design engineer at Notion; previously researcher at Ink & Switch and MIT CSAIL PhD. Auto-transcript garbles corrected when quoting: "humanity collaboration" = *human-AI collaboration*; "non-extual" = *non-textual*; "SAS" = *SaaS*; "Incan Switch"/"Incin Switch" = *Ink & Switch*; "Andy Desessa" = *Andrea diSessa*; "Alan K" = *Alan Kay*; "a quick pose by Eric Ron" = *Quickpose* by Eric Rawn.
2. **"Avoid the nightmare bicycle"** — Geoffrey Litt, personal blog, March 3, 2025. https://www.geoffreylitt.com/2025/03/03/the-nightmare-bicycle
3. **"Malleable software: Restoring user agency in a world of locked-down apps"** — Geoffrey Litt, Josh Horowitz, Peter van Hardenberg, Todd Matthews. Ink & Switch, June 2025. https://www.inkandswitch.com/essay/malleable-software/. Section map: Motivation (We want to adapt our environments / Mass-produced software is too rigid / Our goal: malleable software / Existing approaches) → A gentle slope from user to creator → Tools, not apps (Apps are avocado slicers / Sharing data between tools / Composing the user interface) → Communal creation → Ink & Switch prototypes (Infrastructure for malleability / Dynamic documents) → Towards a better future.

## The Ink & Switch essay's frameworks

**Motivation.** "The original promise of personal computing was a new kind of clay—a malleable material that users could reshape at will. Instead, we got appliances: built far away, sealed, unchangeable." People adapt physical environments constantly (workshops, kitchens); mass-produced software denies the digital equivalent. Goal: "a software ecosystem where anyone can adapt their tools to their needs with minimal friction." Existing approaches surveyed include plugins/extensions, spreadsheets, HyperCard, Smalltalk, OpenDoc, Webstrates — each partial.

**1. A gentle slope from user to creator.** Builds on MacLean et al.'s "gentle slope" framing: "each incremental increase in tailoring power should only require a small incremental investment of learning and skill." The failure mode is cliffs: "Going from installing a browser extension to building one yourself is a steep cliff. It requires leaving the browser and doing involved programming," and "Going from installing plugins to *making* one is a chasm that's hard to cross." Spreadsheets are the canonical gentle slope: view → edit cells → tweak formulas → build models, each step small.

**2. Tools, not apps.** "Many applications are avocado slicers. They're a bundle of functionality targeted at some specific use case… Because an app needs to handle many tasks associated with a use case, it sometimes doesn't handle any of them particularly well." Prefer small composable tools operating over shared data; the essay covers data-sharing between tools and composing the user interface from tool pieces rather than monoliths.

**3. Communal creation.** "With the right infrastructure, we can work together to craft our software." Customization shouldn't be a solo power-user act; local groups (a team, a school, a club) adapt shared tools to local context — echoing Alexander's communal pattern languages.

## Patchwork in depth

Ink & Switch's bet that "version control is the thing that matters." A browser-based collaboration environment ("kind of like a Notion clone") in which the lab did essentially all of its work: markdown editing, whiteboarding, spreadsheets. Properties:

- Both **user data and software code live in Automerge documents**; multiple tools can view/edit the same underlying document with live updates.
- **One-button branching:** "on any document in Patchwork, you can hit a button and get a branch. There's no weird commands to run. … That's your private copy off in the corner. … You can send a link to someone so they can review your branch. Kind of like a GitHub pull request but with less ceremony. And when you feel good about your branch, you can merge it." Patchwork "can display diffs on branches of text documents, among other media types."
- **Full-stack investment:** from Automerge's merge semantics up to UI questions like "how do you show branches? Should they even be called branches?"
- **Classroom test:** a Patchwork variant for game development, tested with kids — "Can 12-year-olds understand branches? Turns out actually, yeah, they totally can."
- **AI bots on human infrastructure:** "we added AI bots that use all this shared branching infrastructure… it was a really beautiful fit because we'd nested in this for humans and it worked well for AI too. If you're used to using branches and reviewing stuff, then moving to using AI bots with that isn't a big leap."
- **The crazier end:** every tool in Patchwork was itself malleable — "you should be able to live-edit the software from within the software." The lab vibe-coded new tools mid-essay-writing and live-deployed them. Which is exactly why version control must extend to the software layer: "you can't really live-edit software like you can a Google doc because it's going to break a lot." The essay notes "fully applying the ideas of lightweight universal version control to code" remains an open challenge.

## Embark in depth

Travel planning as the probe for app-boundary failure: maps, calendar, notes, email each fine in isolation, "but there are all these ways in which they fail to combine… why doesn't your weather app know that you're going to be in London next week?" The mega-travel-app fails because "every trip is different. Your business trip to a conference and my week-long vacation with my family just have different needs."

Embark's answer: **document-centric computing**. "You just start writing stuff… then you could start pulling in bits of functionality into your note directly. Instead of going to look up the weather, you just type weather in your note and magically the weather forecast appears — and it knows where you're going because it's in your note." Hierarchical outlines carry structured data (locations, dates); embedded views are "deeply aware of surrounding information — a map view can read and visualize the locations" with synchronized outline↔map interaction. The team used it on real trips; never shipped, published as an in-depth essay with demos (Ink & Switch methodology: "by avoiding the needs of shipping to users today we had a little more freedom to imagine what should this thing really feel like if we think a decade out").

## AI and malleability: why codegen alone isn't enough

The essay: "AI code generation alone does not address all the barriers to malleability," though "AI is a useful complement to a malleable environment." "Even if we presume that every computer user could perfectly write and edit code, that still leaves open some big questions" — composing existing tools, integrating with shared data, precise direct tweaking without invoking AI for every change. The interview's framing of the unlock: pre-LLM end-user programming "was biting around the edges with AppleScript, macro recording, programming by example… Nothing really worked. Then LLMs came along and boom — all of these great ideas people have had for decades in this field… are suddenly relevant." Alan Kay's original vision: "kids are live-editing the rules of a video game while they're playing it."

## Interview material not in SKILL.md

- **Origin story:** ed-tech startup shipping to "thousands and thousands of schools" he'd never worked in — "it is so so so hard to really know what's going to be good… Why are we making these choices for all our users?" The formative observation: users exporting data to Excel — "these crazy spreadsheets… really ugly, maybe had bugs, but they would do exactly what that user wanted… it's so cool that a random principal at some school can actually build their own software tool that works for them rather than having us dictate every little decision."
- **Document-centric computing & Notion:** "you don't go to Notion and see a blank box where it says build an app, because most people don't wake up in the morning wanting to build apps. People just want to get stuff done." On bundling: "the more this thing knows about everything I care about, the better it can work for me" — but "no one application can or should fundamentally have every feature and all of your data… there's a lot of room for interoperability."
- **Conceptual design as the design-engineer job:** "I'm less of a visually oriented designer… how do we thoughtfully design this box of Legos so that people can build stuff and they know what the Legos can do and it feels like they always fit together seamlessly. In some ways that's almost closer to designing a programming language than designing a typical application."
- **AI chat is a power-user interface:** "People think that it's a simple consumer interface, but actually… it's like a good bicycle that shows you the gears. You're just talking to the raw machine." Its two limits: **pointing** ("I can point to things and we can have shared attention on some artifact… it goes both ways — I need to point things out to the AI, AI needs to point things out to me") and **text as output** ("natural language text is really good for human-to-AI input, especially with voice… but for the AI coming back to us, we can be much more creative with non-textual representations and data visualizations"). The wish: "ask ChatGPT or Notion how much money am I going to have when I retire — I want to get back an interactive chart that I can mess with myself, not just a number."
- **Canvases, Spellburst, Quickpose:** Spellburst (Tyler Angert + Stanford collaborators) — canvas for AI-assisted animated sketches in Processing with variations branching into "this tree of exploration." Quickpose (Eric Rawn) — canvas-arranged variations backed by an underlying version control system. Figma's zoomed-out artboard trail as the folk version: "the whole process is just laid out there in space." Litt: "even without AI, people in all creative fields deserve better version control tools. Software engineers have the best ones right now."
- **The education-startup do-over (pattern-language applied):** instead of "five dashboards around key topics… flip it to build-your-own-dashboard. What are the building blocks we can give you… we can educate you around things we're experts in, like statistical analysis so you don't draw mistaken conclusions, or benchmarks against national data. But ultimately the ball's in your court — it's your school."
- **Time-to-value tension:** the design-consultancy thought experiment — if you showed up invested and they instantly handed you yesterday's software, "you would be like, what? I wanted you to at least ask me one question about what I want." Some users need instant value, some want the multi-week custom process; "computers are often really bad at reading the room. Am I in a rush… do I want to go deep and make a beautiful thing?"
- **Coding like a surgeon:** the anti-"every IC becomes a manager" stance. "A surgeon does the damn surgery… they have assistants in the room… prep that happens before they walk into the room because their time is really valuable." Practice: morning brief on the code being touched, overnight drafts and bug-fixes, "and now I just get to go play and be creative… that three-hour sprint that really is what I love to do." Ceramics, not vending: "you're feeling the clay and you're in a feedback loop… losing that would not allow me to do my best work."
- **Learning vs. cheating:** "We have the best learning machines ever invented now, but they happen to also be cheat-on-your-homework machines at the same time. Every day we get to make a choice." Tactics: ask for the plan and do it yourself; demand explanations — "we should be demanding really, really good explanations of what the AI did that bring us along as humans" (even generated teaching artifacts: walkthrough videos, diagrams, comprehension quizzes); AI-assisted PR review ("what's basically going on here… what file should I read in what order") — "AI can help us be more critical with our thinking, not less."

## Reference trail

- **Andrea diSessa, *Changing Minds: Computers, Learning, and Literacy* (MIT Press, 2000)** — source of the nightmare bicycle; an education/computational-literacy book, not a design book. Litt: "one of the best books ever written about design and computational thinking."
- **Don Norman, *Living with Complexity* (MIT Press, 2010)** — "lesser known than his most famous one"; instruments (piano) as simple-but-skill-demanding designs; basis of the 40th-hour frame.
- **Christopher Alexander, *A Pattern Language* (1977) and *The Timeless Way of Building* (1979)** — pattern languages; the Mexicali project (*The Production of Houses*) where Alexander's team "developed a pattern language for that local environment and worked with the families to teach them enough architectural thinking so that they could then make their own choices."
- **Automerge** (automerge.org) — Ink & Switch's local-first CRDT library; "persists and synchronizes JSON documents among users"; Patchwork's substrate; "the whole point of the library was to help merge together work that had happened on different branches… so you didn't end up with these terrible merge conflicts."
- **Spellburst** (Tyler Angert et al., Stanford, UIST 2023) — LLM-powered creative-coding canvas with branching variation exploration.
- **Quickpose** (Eric Rawn et al., CHI 2023) — version control for creative coding, variations arranged on canvas. (Transcript garble: "a quick pose by Eric Ron.")
- **Alan Kay** — origin of the personal-computing-as-clay lineage; vision of kids live-editing a game's rules while playing it.
- **MacLean et al., "User-tailorable systems: pressing the issues with buttons" (CHI 1990)** — origin of the "gentle slope" criterion cited by the Ink & Switch essay.
- **Webstrates, Smalltalk, HyperCard, OpenDoc** — prior art surveyed in the essay's "Existing approaches."

## A note on "the gulf of customization"

This phrase is sometimes used informally for the essay's core gap, but the essay itself never uses the word "gulf." Its own language is the **cliff/chasm**: "Going from installing plugins to *making* one is a chasm that's hard to cross," answered by the **gentle slope** pattern. Cite the chasm + gentle slope wording when precision matters.

## Practitioner notes (2025–26): designers building their own tools — full quotes

Sources (Dive Club, auto-captioned): Ryan [Moshi] (head of design, Column — onQY0PrUulw; surname uncertain in captions), Tommy Geoco (OYNoy468kS8), Marvin Schwaibold (Molly Studio → Shopify — KpJs7mZYErg), Kris Puckett (nPyxVMd1LIA).

- **Tools-of-one** (Ryan): "I get to make it for my exact user needs and not consider like what anyone else needs" — the per-person fit malleability promises, achieved today by building rather than reshaping.
- **Tooling-gravity as a moat** (Ryan): "we tend to gravitate towards the things that our tooling makes easy" — effects awkward in Photoshop but trivial in his own tool become a signature: "it's like kind of making a moat to your brand." Your tools shape your output; owning them shapes it distinctively.
- **Build the tool, not the output** (Ryan): "I don't want it to jump to the end result. I think where AI is really successful is helping you along the way to build a tool or learn the software." Ridd's conversion: "how can I prompt AI to create a tool that I can then use to arrive at the output. And I could have 100xed my iteration speed by thinking about it that way."
- **Deceptively simple** (Ryan, on his first tool): "these tools are deceptively simple to make… Getting a tool to, you know, just run locally and produce an image was very straightforward" — and "the actual like hard part that I don't know how to do myself — it nailed it."
- **Generative-design precedent** (Gross et al., p5.js): the designer stops hand-drawing each output and asks, "How do I abstract?" into rules, repetition, controlled randomness, and parameters. Key guardrail: "True randomness rarely produces compositionally interesting results" — randomness works when "limited and applied in measured doses."
- **The numbers** (Geoco): 59% of designers in his survey data "have built their own like tool for their workflow"; Ramp reported "1,500 vibe coded tools" internally — "how much of that is throwaway? Well, most of it" — and the keepers spread organically: "it's useful, someone tries it, and then it starts to spread like, oh, so and so built a thing for this."
- **The platform view** (Schwaibold): "that whole paradigm of throwaway software and contextual software versus large-tech software, which we're experiencing right now. And we're just entering a world where you'll be able to build tools for your specific workflow." Shopify's direction: "we're looking at more of a malleable interface that morphs and shapes itself around contextual needs of the merchants."
- **The two-hour personal app** (Puckett): a personal health app — Apple Watch metrics synced over a local network to a Mac mini, daily AI review of his HRV and energy — "in terms of like the permissionless building, like I'm able to in 2 hours build this."
