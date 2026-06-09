# App Icon Design — Worked Examples

*Sources: WWDC 2017-822 "App Icon Design"; WWDC 2025-220 "Say hello to the new look of app icons"; WWDC 2025-361 "Create icons with Icon Composer."*

## Craft examples (2017)

- **News prototype test:** three candidates; the winner showed **all edges** of the newspaper, high-contrast white on a popping red background, bold and graphic — edges and contrast are what survive folder size. Framing question: "What if your app were the only app on the Home screen — could the icon communicate what it does without its name?"
- **Keynote:** the podium metaphor since 2003, surviving every visual era — lineage in action; warm wood + microphone "set the stage."
- **Paint bucket (classic Mac):** consistent line weight, implied movement, subtle perspective, balanced black/white — craft details that compound.
- **iWork/iLife family:** shared metaphors and palette across Mac and iOS; glyphs simple, white, equal mass, same ground plane — family consistency without identical icons.
- **Music Memos:** sized its circle to the icon grid so it matches Safari's — grid use makes third-party icons feel native.
- Retired metaphors: the floppy disk (aged out), the bomb (too aggressive).

## Layered-icon redesigns (2025-220)

- **Podcasts:** stencil-style flat mark → stacked foreground shapes; layering created true dimensionality.
- **Chess:** realistic 3D perspective → frontal, flat pieces; realism competes with the material. (Counter-example: **Preview** kept its magnifying-glass perspective deliberately — dimension with a purpose.)
- **Photos:** reduced petal overlap so the material's intersections and reflective edges read.
- **Home:** fewer layers, rounder shapes, baked effects stripped — the material recipe supplies dynamic shadows/highlights.
- **Settings:** rounder gear teeth so light can travel along the edges.
- **macOS masking:** Contacts' divider tabs (which poked outside the rounded rect) redrawn inside the shape; Photo Booth redrawn to use the full canvas rather than auto-scaling its unique shape.
- Backgrounds: System Light / System Dark gradient presets instead of pure white/black; soft light→dark gradients harmonize with the system light direction.

## Icon Composer walkthroughs (2025-361)

- **Translate:** type and speech bubbles split into separate layers *by color* — the dark variant then needs a single fill change.
- **Calendar:** the day number looked "complex and pillowy" in glass → switched specular off on that group (alternatively: disable Liquid Glass on the layer).
- **Dictionary:** maroon bookmark vanished on black → per-appearance **fill** variant rescues it in dark mode; PNGs that can't take fills get an alternate-image variant.
- **Home:** uses all **four groups** so each element is its own piece of glass — four is the cap, "the right bounds for how much visual complexity an icon should have."
- **Mono modes:** set at least one prominent element to pure white; remaining colors auto-map to grays — hand-tune contrast.
- **Watch circle:** often zero work from the rounded-rect artwork; re-scale edge-touching elements so they touch again, or design with bleed.
- **Shadows:** neutral (versatile preset) vs. chromatic (color spills onto the background — great for color-on-white); keep neutral in dark/mono via a variant.
- Pipeline: SVG layers numbered in Z-order (Illustrator: Apple's layer-export script); text outlined; one `.icon` file replaces all per-size assets — "spend less time generating assets, and less time in Photoshop trying to recreate a load of glass effects. We've all been there."
- Escape hatch: highly illustrative icons can still ship as images via Xcode and get the specular edge treatment automatically.

## Quotables

- "The icon is the face of your app as much as the UI."
- "Don't change your app icon every single time that you update your app. Refine your identity over time."
- "Still my source art down to its graphic essence, so that it's flat, opaque, and easy to control later."
- "Icon design is moving from a past of simply static images to a future of expressive, multi-layered artworks."
- "Sometimes a pen and paper goes way further than a mouse."
