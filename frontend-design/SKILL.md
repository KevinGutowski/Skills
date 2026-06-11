---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Theme Note

This skill represents a **bold/distinctive aesthetic theme** — deliberately different from the restrained "invisible polish" theme of `emil-design-eng` and `make-interfaces-feel-better`. These themes shouldn't be mixed: a single project should pick one direction and commit.

For motion-specific work, `web-animation-design` is the default theme — defer to its values when both are loaded. When this skill triggers alongside the restraint-focused skills, surface the choice as a menu rather than blending — "bold/distinctive vs restrained/invisible" is a real design decision, not noise.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

## Demonstration over decoration

The hero visual must *truthfully demonstrate* the product's core mechanic, not decorate around it: if you draw a calendar, align events to its real time axis; if you show data, make the numbers internally consistent. A blind A/B eval (2026-06-11) found a distinctive page lost to a plainer one solely because its hero artifact was fake under inspection — "polish is surface-level in exactly the place that matters most." Distinctiveness never excuses a dishonest artifact. Also: no perpetual motion (marquees/loops that never rest), and prefer system/self-hosted fonts over CDN dependencies in self-contained artifacts.

## De-slop substrate (Ryo Lu, Cursor — interviews, 2025)

- **Build on proven primitives**: use shadcn/Radix for every standard control — keyboard nav and accessibility come free, and AI "is really good at composing patterns that exist."
- **Then theme by hand**: a custom layer overrides the styles — "paint it in a way that… fits the thing I want. But underneath, there are still these pretty standard shared components."
- **Banned slop tells**: "massive shadows, purple gradients," purple buttons, the default icon set "AI will just pick." His safe fallback when unsure — "you just use system fonts" — sets the floor (never slop defaults); this skill's distinctive-type guidance above sets the ceiling.
- **Tokens make AI composable**: "with like a really robust like foundational set of tokens and components, AI is able to compose them pretty well."

## MDS field tactics (Matt D. Smith, Shift Nudge — YouTube -VSXVDr5HW0, Uno5dpotRgo, k8dcRRgA3T8, jSLfQ0sJDCw; Dive Club K_7ECqNlTtE)

- **Buy a real typeface**: "find a font foundry try out the trial fonts download a good font and buy a good font especially for your brand it's just going to make you stand out."
- **Imagery is a multiplier**: "great images are going to make your designs 10 times better than subpar images" — Nike would sell fewer shoes with bad photos; source or create deliberately.
- **Image-seam tricks**: faux fade-out — duplicate the image area, sample "the color that's like the darkest in that," then lay "a gradient that is the same color" (100%→0) over the seam to "create like a faux Fade Out into that section." White-band fix: raise the image's highlights and "set the blend mode to multiply and that'll get rid of that White Band."
- **Vision-first AI prompting**: "they will produce slop if you're trying to oneshot a website, which is a sloppy prompt"; "You're not going to swing a hammer and accidentally build your dream home" — your dream home comes from your vision (bedrooms, stories, site). Bring a concrete end goal, then iterate with curiosity — the tool produces whatever you direct it to.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.