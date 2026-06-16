---
name: photographic-lighting
description: "Plan and troubleshoot photographic lighting for portraits, product/still-life, and field shoots using hard/soft light, direction, fill, bounce, and family-of-angles tests. Use when lighting a photo or diagnosing glare/shadows/reflections. Use research-cataloging for image compression; graphics-fundamentals for graphics internals. Triggers: photo lighting, glare, softbox, fill flash."
---

# Photographic Lighting

Sources: [references/sources.md](references/sources.md) — Hunter/Biver/Fuqua's *Light: Science & Magic* for lighting physics and surface diagnosis; Tony Northrup for field, flash, and portrait practice.

Use this skill when the user needs to make a photograph work by changing light: portraits, products, shiny objects, glass, black-on-black, white-on-white, room flash, outdoor sun, glare, catchlights, or shadow shape. Do not use it for image file compression (`research-cataloging` (image-archival)) or graphics/rendering internals (`graphics-fundamentals`).

## Start With The Lighting Diagnosis

Ask five things before naming gear:

1. What must the light reveal: shape, texture, material, face, mood, or legibility?
2. What is the subject surface: matte, textured, glossy, metal, glass/liquid, translucent, black, white?
3. What is the current dominant light: sun, sky/shade, window, ceiling, flash, softbox, reflector, screen?
4. What is failing: hard shadow, flatness, glare, missing edge, mixed color, dull eyes, blown white, blocked black?
5. What can move: subject, camera, light, background, reflector/flag/diffuser, time of day, exposure?

Then solve in this order:

1. Size: make the light effectively larger/smaller.
2. Direction: move the light/camera/subject until highlights and shadows describe the form.
3. Reflection: include or exclude the light from the subject's family of angles.
4. Fill/control: add fill, bounce, flags, polarizers, gels, or exposure changes only after the first three are right.

## Hard vs Soft

Hard/soft means shadow-edge definition, not whether the shadow is dark. "A small light source is always a hard light source" (Hunter/Biver/Fuqua, ch. 2). A bare flash, bulb, noon sun, or distant softbox behaves small; clouds, shade, nearby windows, bounce cards, umbrellas, walls, and large softboxes behave large.

Rules:
- Want texture, pores, scratches, bark, fabric weave, or three-dimensional bite? Use harder side/top-side light.
- Want flattering skin, calmer surfaces, or lower contrast? Use larger/closer/diffused light.
- If a light is physically small, make it effectively larger: move it closer, bounce it off a wall/ceiling, shoot through diffusion, or aim it into a softbox/umbrella.
- If a room bounce unexpectedly softens the light, the room has become the source. Watch wall/ceiling color because it becomes color cast.

## Direction

Direction decides what the viewer reads:

| Direction | Use For | Watch For |
| --- | --- | --- |
| Front | Flattening skin texture, reducing nose/blemish shadows | Can make objects and spaces look two-dimensional |
| Side / top-side | Shape, texture, product form, architecture, food, objects | Can exaggerate skin texture and facial asymmetry |
| Back / rim | Silhouette, glow through hair/fur/petals, subject separation | Face/foreground falls into shadow unless filled |
| Top | Natural object/tabletop light, flowers, some wildlife | Usually unflattering for faces; eye sockets go dark |

"Most good lighting is, at least to some extent, side lighting" (Hunter/Biver/Fuqua, ch. 5). If the subject looks flat, move the key off camera axis before adding more lights.

## Reflection And Family Of Angles

For shiny subjects, lighting is reflection management. The light, camera, and subject form a geometry; move any one of them and the visible reflection changes.

Use this loop:

1. Decide whether the direct reflection should appear bright, dark, controlled, or absent.
2. Find the family of angles: the zone where a light reflects from the subject into the camera.
3. Put the light inside that zone to make a mirror-like surface bright; keep it outside to make it dark.
4. Enlarge the source if the bright reflection needs to cover more surface.
5. Use flags/cards/backgrounds to decide what the object reflects, not only what hits it.

Common routes:
- Polished metal: it mostly reflects its environment. Prepare what the metal will see. Bright metal = fill the family of angles with a bright card/source; dark metal = keep light out of that family and give it a dark environment.
- Glass: edge definition matters more than front-surface illumination. Bright-field = dark glass edges on a bright background; dark-field = bright edges on a dark background. Remove distracting light reflections after edge definition works.
- Matte/textured surfaces: direct glare matters less; shadow direction and hardness matter more.
- Polarizers: useful for many non-metallic polarized reflections; weaker as a complete fix for metal.

More: [surface-lighting.md](references/surface-lighting.md).

## Portraits And Field Light

Portraits usually need controlled softness, shape, and eyes. "A single light is adequate for most portraits; the rest are optional" (Hunter/Biver/Fuqua, ch. 8). Add lights only after the key light gives the face a usable shape.

Practical sequence:

1. Key: put a large-ish source above and to one side; watch cheek/nose/chin shadows.
2. Eyes: preserve catchlights. Northrup defines a catchlight as the eye highlight; "Catchlights add life and interest to a subject."
3. Fill: reduce shadow contrast with a reflector, bounce, fill flash, or ambient exposure. Do not erase all shape unless flat glamour/beauty is the goal.
4. Hair/rim/background: add separation only after face shape and eyes work.
5. Exposure/background: for sunset/sky portraits, expose the background first, then add flash/fill for the person.

Outdoor:
- Move people out of hard top light: shade, clouds, open sky, or diffusion.
- Backlight can be flattering because it separates hair/shape and avoids squinting, but it needs fill on the face.
- Fill flash is a field tool, not only a dark-room tool. Northrup: "Flash isn't just for dark spaces."

Indoor:
- Window + sheer curtain = large softbox.
- Bounce flash off a neutral ceiling/wall to turn a small flash into a larger source.
- If bounce is unavailable outdoors/high ceiling/dark ceiling, use a modifier, reflector, or off-camera flash.

More: [portrait-and-field-lighting.md](references/portrait-and-field-lighting.md).

## Extremes

White-on-white and black-on-black need separation before cleverness.

- White-on-white: expose to preserve highlight detail, then light either the background or subject edge slightly differently so the shape remains visible.
- Black-on-black: create controlled highlights, rim edges, or background separation. A black subject still reflects; decide what bright thing it should reflect.
- If edges disappear, fix tonal separation first. Texture and mood are secondary.

## Checklist

- [ ] Named what the light must reveal or hide.
- [ ] Classified the surface before placing gear.
- [ ] Chosen hard/soft by shadow edge, not gear name.
- [ ] Moved the key off camera axis if form is flat.
- [ ] For shiny/glass/metal, checked the family of angles from the camera position.
- [ ] Added fill only after the key light works.
- [ ] Checked eyes/catchlights for portraits.
- [ ] Checked wall/ceiling color before bounce flash.
- [ ] Checked mixed color temperatures before blaming the camera.

## Relationship To Other Skills

- `research-cataloging` (image-archival) owns file size, format choice, and visually lossless compression after images exist.
- `graphics-fundamentals` owns color-space, rasterization, SVG, blur, and image-compression mechanisms.
- `frontend-design` owns choosing imagery for a web/app interface; use this only when the issue is how to light or shoot the image.
- `apple-design` (app-icon-design) and `logo-design` own marks/icons; use this only for photographing physical objects or people.
