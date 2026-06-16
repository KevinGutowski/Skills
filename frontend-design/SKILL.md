---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Theme Note

This skill represents a **bold/distinctive aesthetic theme** — deliberately different from the restrained "invisible polish" themes of `design-polish` (including its emil-kowalski reference) and `web-design` (web-animation-design). These themes shouldn't be mixed: a single project should pick one direction and commit.

For motion-specific work, `web-design` (web-animation-design) is the default theme — defer to its values when both are loaded. When this skill triggers alongside the restraint-focused skills, surface the choice as a menu rather than blending — "bold/distinctive vs restrained/invisible" is a real design decision, not noise.

When AI generated the UI and the task is directing or repairing it (layout diagnosis, prompt-vs-edit decisions), use `working-with-ai` (ai-ui-direction) — this skill owns generation itself.

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

## SVG mental model

For hand-tuning the custom vectors this skill calls for. (Dan Hollick, *Making Software*, makingsoftware.com/chapters/scalable-vector-graphics — quotes verbatim.)

- **viewBox is a coordinate-system override**: the viewport (CSS/width/height) sets the default coordinate system; the viewbox is "a way of overriding the default coordinate system for the SVG by creating a user space coordinate system." Its `x y w h` pan (origin can be negative) and scale the infinite canvas — this decoupling is what makes SVG responsive.
- **preserveAspectRatio = anchor + scaling behavior.** First parameter anchors on a 3×3 grid (`xMin|xMid|xMax` × `YMin|YMid|YMax`, default `XMid YMid`). Second parameter: `meet` scales the viewbox to fit inside the viewport ("sort of like when you set an image to fit") and `slice` "behaves more like fill in image terms" — fills the viewport and lets it crop. `none` allows non-uniform squash.
- **Path data reads as function calls**: in `d`, "the letter is basically a function call, telling the renderer which command to use, and the numbers are the parameters." Uppercase = absolute coordinates, lowercase = relative to the previous position (relative deltas are smaller, so they compress better).
- **Prepare animation assets before coding** (MailChimp, *The UX Reader*): "layer hierarchy is key" when scripts need to target groups/paths; name layers, keep frame groups consistent, and remove excess anchors because fewer groups, paths, and points keep SVG code "light and legible." On final export, deselect "Preserve Illustrator Editing Capabilities" to avoid browser-weight cruft. For multi-frame vector animation, prefer one coordinated SVG over several fragments when viewport/coordinate mismatches would make transitions brittle; then watch JS-driven animation for "layout thrashing."
- **Vector still has an intended size** (Wathan/Schoger, *Refactoring UI*): "Don’t scale up icons" just because they are SVG; a 16-24px icon enlarged 3-4x will not blur, but it will look chunky and under-detailed. Keep the glyph near its drawn size inside a larger colored shape. For web icons generally, prefer SVG over icon fonts when you need flexible sizing/coloring and cleaner accessibility; "SVG is the more flexible solution" (Santa Maria, *On Web Typography*).

| Command | Letter | Does |
| --- | --- | --- |
| Move | `M/m` | Moves the pen without drawing |
| Line | `L/l` | Straight line |
| Quad curve | `Q/q` | Curve, one control point |
| Smooth quad | `T/t` | Reflects previous control point |
| Cubic curve | `C/c` | Curve, two control points |
| Smooth cubic | `S/s` | Reflects previous control point |
| Arc | `A/a` | Ellipse/circle segment (radii, rotation, large-arc + sweep flags, end point) |
| Close path | `Z/z` | Straight line back to start |

## Demonstration over decoration

The hero visual must *truthfully demonstrate* the product's core mechanic, not decorate around it: if you draw a calendar, align events to its real time axis; if you show data, make the numbers internally consistent. A blind A/B eval (2026-06-11) found a distinctive page lost to a plainer one solely because its hero artifact was fake under inspection — "polish is surface-level in exactly the place that matters most." Distinctiveness never excuses a dishonest artifact. Also: no perpetual motion (marquees/loops that never rest), and prefer system/self-hosted fonts over CDN dependencies in self-contained artifacts.

Production layouts must also survive real text: "English, a very compact language, contains words that can expand up to 300% when translated into a less compact language such as Italian" — and user font-size overrides (Amazon's header gracefully drops lower-priority links as text grows). Never size containers to ideal-length English. (Yablonski, *Laws of UX*, ch. 5.)

## Fidelity survives implementation

PixelJanitor / Derek Briggs' recurring design-engineering lesson: "Users don't see your Figma design files, so they're only as good as their implementations. Sweat the details in the code too." (Briggs). His UI Engineering 101 course (Maven) centers on translating high-fidelity Figma components into polished HTML/CSS — layout, states, interactions, SVG motion, concentric radii, stacked shadows, elevation highlights. When building a distinctive frontend, prefer visual ideas you can implement exactly, then inspect the live result at real size. If the production artifact drops the lighting, state behavior, responsive fit, or motion intent, the design is unfinished.

- **Re-engineer Figma effects, don't transliterate them.** Progressive blur is GPU-expensive live: "a designer might use a progressive blur to get that sharp edge at the top of the of the gradient to like I wouldn't use that in in development. Like that would be really expensive processing" (Briggs, Shape FM). Rebuild it as a radial-gradient base + inset box-shadows — "if you use a negative spread on that it'll pull it in" to recover the sharp edge. The principle: design in Figma one way, implement differently, as long as it looks the same. (Div/CSS-only progressive blur is achievable — Briggs shipped one for a nav overlay — but no public code.)
- **Feasibility heuristics when reviewing a Figma file** (Briggs, Shape FM): near-duplicate font families = font-loading/CDN cost for marginal visual difference — consolidate before implementing. Figma corner smoothing (squircles): "recently Chrome added the corner-shape superellipse property... but it's not available in Firefox or Safari [yet]" — elsewhere it needs clip masks or SVGs; budget for that or use plain radii.

Bibliographic detail (course link, post/episode IDs): [references/sources.md](references/sources.md).

## De-slop substrate (Ryo Lu, Cursor — interviews, 2025)

- **Build on proven primitives**: use shadcn/Radix for every standard control — keyboard nav and accessibility come free, and AI "is really good at composing patterns that exist."
- **Then theme by hand**: a custom layer overrides the styles — "paint it in a way that… fits the thing I want. But underneath, there are still these pretty standard shared components."
- **Banned slop tells**: "massive shadows, purple gradients," purple buttons, the default icon set "AI will just pick." His safe fallback when unsure — "you just use system fonts" — sets the floor (never slop defaults); this skill's distinctive-type guidance above sets the ceiling.
- **Tokens make AI composable**: "with like a really robust like foundational set of tokens and components, AI is able to compose them pretty well."
- **Seed the brand early** (Ron Goldin, ex-Google/Shopify/Uber Eats — Dive Club UkQpgslyR3A; second practitioner vote for the anti-generic doctrine): "don't wait till like the very end to think about branding and differentiation" — once you know what the product is, establish the visual language up front so AI extrapolates *your* aesthetic instead of defaulting to slop.
- **Reference-derived taste beats adjectives** (Jaytel Taste, repo/post, 2026): when a specific visual direction matters, do not prompt "premium/editorial/polished" and hope. Turn a tight image corpus into concrete constraints first: focal-mass count, neutral/accent ratio, type roles, radius/shadow rules, what content must stay incidental, and anti-collapse bans. Then generate from those constraints. If the user provides references, route the extraction to `creating-skills` (converting-visual-references-to-skills); this skill owns the actual UI build from the resulting rules.
- **Do not hard-code another corpus' taste** (Jaytel Taste tests): the pipeline explicitly guards against injecting its neutral UI defaults into arbitrary prompts. Treat every reference set as evidence. Preserve labels like editorial, cinematic, serif, or luxury only when the images support them and pair the label with visible constraints; otherwise the model falls back to stereotypes.
- **Global flexbox reset** (Briggs): "Pretty much all flexbox woes have gone away by adding this to the global css of every new project." `*, ::after, ::before { min-width: 0; min-height: 0; }` (his post has a stray trailing comma in the selector; this is the corrected form). "If you add this to an existing project, check for ui regressions (most likely will be some!)."

## MDS field tactics (Matt D. Smith, Shift Nudge — YouTube -VSXVDr5HW0, Uno5dpotRgo, k8dcRRgA3T8, jSLfQ0sJDCw; Dive Club K_7ECqNlTtE)

- **Buy a real typeface**: "find a font foundry try out the trial fonts download a good font and buy a good font especially for your brand it's just going to make you stand out."
- **Imagery is a multiplier**: "great images are going to make your designs 10 times better than subpar images" — Nike would sell fewer shoes with bad photos; source or create deliberately.
- **Image-seam tricks**: faux fade-out — duplicate the image area, sample "the color that's like the darkest in that," then lay "a gradient that is the same color" (100%→0) over the seam to "create like a faux Fade Out into that section." White-band fix: raise the image's highlights and "set the blend mode to multiply and that'll get rid of that White Band."
- **Vision-first AI prompting**: "they will produce slop if you're trying to oneshot a website, which is a sloppy prompt"; "You're not going to swing a hammer and accidentally build your dream home" — your dream home comes from your vision (bedrooms, stories, site). Bring a concrete end goal, then iterate with curiosity — the tool produces whatever you direct it to.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
