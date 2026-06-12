---
name: malleable-software
description: "Design software users can reshape — expose structure instead of modes, design for the 40th hour, human-AI collaboration as version control. Use for customization, end-user tooling, or AI features that modify the product. Tool-UI conventions → devtool-interface-design; AI patterns → ai-experience-design. Triggers: extensibility, end-user programming, plugins, nightmare bicycle."
---

# Malleable Software

**Sources:** [references/sources.md](references/sources.md) — Litt: Dive Club interview + nightmare-bicycle post + Ink & Switch essay. ⚠️ Dive Club quotes come from the auto-transcript with garbles corrected: "humanity collaboration" = human-AI collaboration, "non-extual" = non-textual, "SAS" = SaaS, "Incan/Incin Switch" = Ink & Switch, "Andy Desessa" = Andrea diSessa.

The worldview: "The original promise of personal computing was a new kind of clay—a malleable material that users could reshape at will. Instead, we got appliances: built far away, sealed, unchangeable" (Ink & Switch). Goal: "a software ecosystem where anyone can adapt their tools to their needs with minimal friction." Use this skill as a value system when deciding how much of a product users may reshape, and how.

## 1. The nightmare bicycle: expose structure, don't label modes

From diSessa's *Changing Minds* (Litt: "one of the best books ever written about design and computational thinking"): a nightmare bicycle replaces numbered gears with mode buttons — "gravel mode, downhill mode, uphill mode… crossing the railroad mode" — because some PM decided "people don't understand numbers… put it on the tin." The failure: "what do you do when you want to go uphill on gravel? … There's no coherent structure that you see, just these modes that magically are supposed to do a good job in some situation." And "what do you do if your chain falls off? … You don't even know what's going on there."

- **The rule (Litt's blog, as quoted on the show):** "good design exposes systemic structure and trusts that people will figure out how to use it." Bad designs "paper over the structure with superficial labels that hide the underlying system."
- **Exposing structure IS simplicity** — not in tension with it: "that's how you get simplicity. … The nightmare bicycle has a million buttons. Your bike probably has one or two knobs with numbers on it. … That's what true simplicity is: when you expose the fundamental structure and let people take advantage of it." The microwave version: skip per-food buttons — "you can just have a time (and power) button. People will figure out how to cook stuff."
- **Design for the 40th hour of use.** Day one, the nightmare bicycle may be "easier." Norman's *Living with Complexity* piano: "a very simple design in a way, but you can't just walk up to it and play it." Litt: "Real simple, I think, is when someone's invested that full-time week and they feel empowered and comfortable, not the first minute." Budget deliberately for the on-ramp: examples, structured education, virtuosity paths.
- "Humans are pretty damn smart. … Kids can figure out what gears do." When software "is teaching people very specific bits of functionality, not deeper structures," it's a nightmare bicycle.

## 2. Malleable ≠ disposable

"When I say malleable software, I do not mean only disposable software." The primary metaphor is furniture, not ephemera: "designing my interior space in my house… when I come home I don't want everything to be rearranged. … If I want to move the furniture or put things on the wall, I want to have the right to do that."

- **Malleability can mean MORE stability:** "sometimes malleable software results in more stable software because I have more control. So people really far away in some corporate office aren't pushing weird redesigns on me every day." Think "long-lasting software that evolves gradually through use," shared and predictable for a team.
- **The agency mindset is the point:** malleability "cultivates a mindset of agency — of believing that you can change your environments and your surroundings," trained by trying a change and feeling the loop close. Litt wants people "thinking 'what can I change?' and not 'here is what is handed to me.'" (His parenting analogy: let the kid decorate her room "within these boundaries.")
- Disposable, AI-generated-on-the-fly UI is "a time and place… maybe a subcategory," not the definition.

## 3. The preconditions: interop and distribution

Coding ability was the bottleneck; LLMs opened it. "The other bottlenecks are now infrastructural."

- **Interop.** "If I buy a new knife, I can bring that into my existing kitchen. … In the world of bits, often you end up with such silos. One of the greatest sins of typical SaaS software is it makes it really hard to extend your existing universe with new custom tools." New tools must work on existing data in place — no migration, no starting over.
- **Distribution.** Sharing a tool should feel like sharing a document: in Notion or Google Sheets "you don't ship through an app store. You just send a link around. Boom — you have a new tool, and the editor for that tool is available to everyone using the tool. That's the fundamental conditions required to enable malleability." Contrast: "if you have an iPhone, you can't make software for the iPhone on the iPhone," and app stores "designed for the needs of big corporations… not an appropriate mechanism for you to share some weird little tool that you made with your friend."
- **The Ink & Switch patterns** (the essay's three): **a gentle slope from user to creator** (no cliffs — "going from installing plugins to *making* one is a chasm that's hard to cross"; spreadsheets are the model), **tools, not apps** ("apps are avocado slicers" — bundles of use-case functionality that compose poorly; prefer small tools sharing common data), and **communal creation** ("with the right infrastructure, we can work together to craft our software"). Detail in `references/sources-and-concepts.md`.

## 4. The designer's new role: pattern languages and defaults

Christopher Alexander (*A Pattern Language* / *The Timeless Way of Building*): beautiful old towns weren't designed by developers; locals were steeped in shared patterns and adapted them to their site. "The role of Chris Alexander as an architect or designer isn't to design your house. It is to design a set of patterns and teach you that set of patterns, and then you go design your house." Litt: "There is a role for design expertise, but it's more about designing the system and then teaching the user to do the actual design themselves."

- **Product-as-defaults is ~70% of it.** The host's reframe — product design becomes "a set of defaults… and the building blocks and systems around it" — "totally resonates. It's like 70% of the way there." Malleable software is "not everyone starting from scratch every time. You start somewhere someone else already thought about, and when you want to tweak, you can."
- **The other 30% is fluency.** Handed a big template, users unfamiliar with the building blocks "might not even think about what you would change." AI's deeper role isn't dev-on-demand but teacher: "can AI help you learn about the primitives… because ultimately the really best tools are only going to come if you actually are becoming fluent in the primitives." Prefer AI interactions that teach over ones that "just feel like automation and getting as far away from the details as possible."

## 5. Human-AI collaboration is a version-control problem

Litt's lens: "human-AI collaboration is fundamentally a version control problem" — version control meaning the creative process itself: "exploring different ways of doing stuff, trying things out, hitting dead ends, coming back, trying something new." It matters doubly with AI because "the AI mostly does bad stuff. Occasionally does good stuff. … If I'm in an environment where it's hard to undo or suggest or review, that feels terrible. Whereas [with branches] it feels fantastic because 50% of the time my little alien intelligence shows up with awesome stuff… and the other half I just iterate or I throw it away."

- **Make branch/review/merge one button.** Patchwork (Ink & Switch): "on any document… you can hit a button and get a branch. There's no weird commands to run. … Send a link to someone so they can review your branch. Kind of like a GitHub pull request but with less ceremony." Built on Automerge so branches merge without conflict-fighting.
- **It works for non-programmers.** "Can 12-year-olds understand branches? Turns out actually, yeah, they totally can" (Patchwork-for-game-dev tested in classrooms).
- **The Trojan horse:** "get people used to thinking in terms of variations and review for *any* kind of work, and then use that for AI." AI bots slotted into Patchwork's human branching infrastructure with no new concepts — same reason coding agents landed easily: "every software engineer knows how to use GitHub already."
- **Editing software live needs this too:** "you can't really live-edit software like you can a Google doc because it's going to break a lot. What you need is the ability to clone it, try out stuff, and when it feels good, share it with your team. Same concept. It's just branches." The essay flags "fully applying the ideas of lightweight universal version control to code" as still open.

## 6. Jigs: disposable one-project tools

The sanctioned home for disposable software: "I call these tools jigs, from woodworking — you make a tool just for the purpose of making one project." Litt's example: instead of reviewing an unreadable AI migration script, he asked for "a command center that will walk me through the process of doing this port myself but visualize the entire process" — old/new site previews live, stepwise file diffs — "that tool is a one-time thing just for this one PR, but I was able to economically build that because AI exists." Jigs still require the preconditions: "I'm not going to make a new disposable tool if that requires me to totally migrate all my data… I need my new tool to fit with my existing ecosystem."

## 7. Designers building their own tools (2025–26 practitioner notes)

Field grounding for the Litt/Ink & Switch philosophy: by 2025–26 the malleable thesis stopped being speculative — working designers routinely make their own tools. Sources (Dive Club, auto-captioned): Ryan [Moshi] (head of design, Column — onQY0PrUulw; surname uncertain in captions), Tommy Geoco (OYNoy468kS8), Marvin Schwaibold (Molly Studio → Shopify — KpJs7mZYErg), Kris Puckett (nPyxVMd1LIA).

- **Tools-of-one** (Ryan): "I get to make it for my exact user needs and not consider like what anyone else needs" — the per-person fit malleability promises, achieved today by building rather than reshaping.
- **Tooling-gravity as a moat** (Ryan): "we tend to gravitate towards the things that our tooling makes easy" — effects awkward in Photoshop but trivial in his own tool become a signature: "it's like kind of making a moat to your brand." Your tools shape your output; owning them shapes it distinctively.
- **Build the tool, not the output** (Ryan): "I don't want it to jump to the end result. I think where AI is really successful is helping you along the way to build a tool or learn the software." Ridd's conversion: "how can I prompt AI to create a tool that I can then use to arrive at the output. And I could have 100xed my iteration speed by thinking about it that way." Litt's AI-as-teacher-of-primitives stance, in production use.
- **Deceptively simple** (Ryan, on his first tool): "these tools are deceptively simple to make… Getting a tool to, you know, just run locally and produce an image was very straightforward" — and "the actual like hard part that I don't know how to do myself — it nailed it." The coding bottleneck Litt says LLMs removed is, empirically, removed.
- **Generative-design precedent** (Gross et al., p5.js): this tool-building stance predates LLMs. The designer stops hand-drawing each output and asks, "How do I abstract?" into rules, repetition, controlled randomness, and parameters; the computer becomes a tireless variation engine, while the designer evaluates and changes the underlying abstraction. Key guardrail: "True randomness rarely produces compositionally interesting results" — randomness works when "limited and applied in measured doses."
- **The numbers** (Geoco): 59% of designers in his survey data "have built their own like tool for their workflow"; Ramp reported "1,500 vibe coded tools" internally — "how much of that is throwaway? Well, most of it" — and the keepers spread organically: "it's useful, someone tries it, and then it starts to spread like, oh, so and so built a thing for this." Communal creation plus jig-grade disposability, at company scale.
- **The platform view** (Schwaibold): "that whole paradigm of throwaway software and contextual software versus large-tech software, which we're experiencing right now. And we're just entering a world where you'll be able to build tools for your specific workflow." Shopify's direction: "we're looking at more of a malleable interface that morphs and shapes itself around contextual needs of the merchants" — a large vendor designing for reshaping rather than against it.
- **The two-hour personal app** (Puckett): a personal health app — Apple Watch metrics synced over a local network to a Mac mini, daily AI review of his HRV and energy — "in terms of like the permissionless building, like I'm able to in 2 hours build this." Software far below any commercial viability line, built anyway because the cost fell to an evening.

Read against §2 and §6: most of this wave is jigs and tools-of-one, not yet the interop + document-style distribution the essay calls for — Ramp's spread pattern is the closest thing to communal creation in the wild.

## Checklist

- [ ] Any "mode" buttons that paper over a learnable system? Could numbered-gear-style structure replace them?
- [ ] Are you designing for minute one or hour 40? Is there an on-ramp (examples, education) to virtuosity?
- [ ] Can users change a thing and have it *stay* changed — stable, shared, not rearranged by upstream redesigns?
- [ ] Can a new/custom tool operate on existing data in place (knife into kitchen), or does it demand migration?
- [ ] Does sharing a user-made tool feel like sharing a document — link, no app store, editor included?
- [ ] Is the product framed as defaults + building blocks, with patterns taught, not just features shipped?
- [ ] Are AI changes branchable, reviewable, and discardable in one gesture — for content AND for the software itself?
- [ ] Do AI features teach primitive fluency, or only automate at arm's length?
- [ ] If something is disposable, is it a jig (one project, interops with the ecosystem) rather than the whole philosophy?

> **Staleness note:** this is an active research area — Ink & Switch projects (Patchwork, Embark, Automerge tooling) evolve, and Litt's Notion work is in flight; specific product examples and project states date fast. The durable layer is the value system: exposed structure, 40th-hour design, interop + document-like distribution, pattern-language design, version control as the human-AI substrate.

## Relationship to other skills

- **`devtool-interface-design`** — owns tool-UI conventions (zones, control flow, CLI). Its "instruments, not appliances" (Ryo Lu) and this skill's 40th-hour design are the same value system — mastery available, black boxes refused; cite either, apply both.
- **`ai-experience-design`** — owns AI interaction/feedback patterns (confidence, corrections). This skill supplies the limits-of-chat critique (pointing at shared artifacts; non-textual AI output — "I want back an interactive chart that I can mess with myself, not just a number") and where personalization bounds sit.
- **`design-principles`** — Apple's familiarity/metaphor and agency principles are the HIG-flavored cousins of exposed structure and the agency mindset; route platform-convention critiques there.
- **`agentic-coding`** — jigs in practice: one-PR tools, review-first agent workflows, branch-everything discipline on real repos.
