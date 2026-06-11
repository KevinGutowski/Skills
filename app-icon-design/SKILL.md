---
name: app-icon-design
description: "Design app icons for Apple platforms — timeless craft (metaphor, simplicity, small-size testing) and the layered Liquid Glass icon system with appearance modes via Icon Composer. Use when designing or reviewing an app icon, preparing layered icons or dark/tinted/clear variants, or fixing icons that read poorly small. Based on 3 Apple WWDC sessions. Triggers: app icon, icon metaphor, Icon Composer, layered icon, tinted icon, dark mode icon."
---

# App Icon Design

**Sources** — this skill aggregates three Apple sessions (the timeless craft + the current system):
- *Apple WWDC 2017, session 822 — "App Icon Design" (Apple Design). https://developer.apple.com/videos/play/wwdc2017/822/*
- *Apple WWDC 2025, session 220 — "Say hello to the new look of app icons" (Marie). https://developer.apple.com/videos/play/wwdc2025/220/*
- *Apple WWDC 2025, session 361 — "Create icons with Icon Composer" (Lyam). https://developer.apple.com/videos/play/wwdc2025/361/*

"The icon is the face of your app as much as the UI." The craft principles are timeless; the delivery system changed completely in 2025 — icons are now **layered Liquid Glass artworks** that adapt across six appearances, built once and rendered everywhere.

## The timeless craft (2017)

- **Metaphor** — an easily identifiable object/graphic/mark (Keynote's podium since 2003). Retire metaphors that age out (floppy disk) or need learning.
- **Simplicity** — "quick and easy to read"; no clutter; consistent line weight; high contrast; strong silhouette and **edges** (the News icon won by showing all edges of the newspaper — edges and contrast survive small sizes).
- **Connection** — emotional, fun, engaging; the icon can become the brand (Instagram's glyph).
- **Lineage** — "don't change your app icon every single time you update your app. Refine your identity over time." Think of the icon as an investment.
- **Process:** be unique in your category; sketch on paper first; the "only app on the Home screen" test (does it communicate without its name?); **test on the Home screen, in a folder, and in Settings — squint**; "oftentimes it's the simplest design or an early direction that you abandoned that's ultimately right."

Two practitioner data points (Config 2024): the entire personality of Susan Kare's Chicago lives in ~**1,800 pixels** — tiny canvases can carry identity if every pixel is a decision; and Hische's small-size rules apply to icon marks too: less stroke contrast, more white space, simplified details that would vanish (run the **blur test** — a strong mark survives blurring).

## The Liquid Glass icon system (2025)

One artwork now serves iPhone/iPad/Mac/Watch and **six appearances**: default, dark, clear (light/dark mono glass), tinted (dark tint = colored foreground; light tint = color infused in the glass). The material adds edge highlights, frost, translucency — icons "lit from within" — so **your source art should get simpler and flatter** and let the material work.

Rules for a good layered icon:
- **Layer by Z-depth:** one background + up to a few foreground layers; stacking creates real dimensionality (Podcasts went stencil → stacked shapes).
- **Avoid realistic 3D / baked effects** — strip drop shadows, bevels, complex perspective from source art; the material supplies dynamic versions (Chess was flattened to frontal).
- **Less overlap, rounder corners, bolder lines** — let intersections and edge light shine (Photos reduced petal overlap; Settings rounded its gears); thin lines and sharp edges fight the material and die at small sizes.
- **Backgrounds:** soft light→dark gradients matching the system light direction; use the **System Light/Dark gradient presets, not pure white or black**; colored backgrounds give clearer light/dark distinction.
- **Unified grid:** one 1024px canvas (Watch: 1088px circular, same grid); rounder corner radius, concentric with hardware; on macOS the canvas **masks** the design — no elements poking outside the shape anymore.

## Icon Composer workflow (2025)

Design tool → flat layers → Icon Composer → one `.icon` file → Xcode. The split of labor:
- **In your design tool:** flat, opaque vector art ("still my source art down to its graphic essence"); layers split by Z-depth *and by color* (so dark mode needs one fill change); export SVGs numbered in Z-order (text → outlines; gradients/raster → PNG); **never include the rounded-rect/circle mask**; don't export simple backgrounds (Composer provides them).
- **In Icon Composer:** background presets; **groups (max 4** — "the right bounds for how much visual complexity an icon should have") carry the glass properties (specular, blur, shadow neutral/chromatic, opacity, translucency, blend, fill); annotate default/dark/mono and the system derives clear + tinted; per-appearance property variants via the hover-plus.
- **Tuning:** narrow shapes looking "pillowy" → kill specular on the group or glass on the layer; dark mode → fills to rescue colors lost on black; mono → set one prominent element to white, hand-tune the gray mapping; preview against wallpapers, at small sizes, and watch the light move.
- Per-device asset export is **obsolete** — the 2017 "optimize assets per size" advice is superseded by the single `.icon` pipeline.

> **Icon Composer 2 beta (June 2026, macOS Tahoe 26.4+):** adds **per-layer refraction** (light bends through layers, subtle edge bends → lens-like distortion), redesigned **specular highlights** (inside/outside/automatic alignment + a vertical light angle), sharper material rendering (existing `.icon` files re-render automatically — re-check your tuning), and Xcode sync. Platforms unchanged (iPhone/iPad/Mac/Watch). The 2025 workflow above still holds.

## Lab rulings on the new rendering (WWDC26 Group Lab, iaXx7XVK8c8)

Apple's Icon Composer engineers + icon designers, on the iOS 27 update:

- **Specular inside/outside rule of thumb:** automatic usually works, but inside "looks really great when you have a foreground that's darker than the background, and outside is best when you have a background that's darker than the foreground."
- **The refraction control is 2D:** vertical = *height* of the refraction (radius reads rounder as you go up), horizontal = *strength* (pulls more artwork into the shape; negative = inverse refraction that wraps the other way); modifier keys lock one axis. Gotcha: "very small moves in the refraction control can make a really big difference" — re-review small and on device after touching it. Icon Composer's waterfall view cycles all common presentation sizes.
- **Free upgrade, but review translucency:** an existing `.icon` gets the sharper iOS 27 rendering without recompiling the app. Apple itself "reduced the use of translucency" across its own icons this year for sharpness/legibility — "that part doesn't happen automatically"; review per icon. Legacy bitmap icons are auto-segmented into "basic mini icon composer documents," and their iOS-26-era translucency will read more prominent under the new rendering — the trigger to invest in a real `.icon` file.
- **Clear-mode glass is pinned:** it deliberately "does not respond to the slider" (the systemwide glass-transparency setting) — Apple pinned it for legibility, so don't design for slider extremes. One set of "grayscale annotations… support both light clear, dark clear, and all of the tinted modes."
- **Mono/tint legibility recipe:** keep at least one foreground element "white or close to white" (Apple does this in its own files), and "maximize the dynamic range in your mono mode annotations" — dark darks + bright highlights survive the user's tint-color remapping; prefer system backgrounds (custom gradient luminance is the usual mono failure).
- **Blend modes are the norm, not the exception:** nearly all Apple icons use non-normal blends; plus-darker/plus-lighter "retains the vibrancy of the color underneath and it helps sell the glass" (Podcasts uses plus lighter for glass-on-glass pop). Don't trust Figma/Sketch glass previews — "the recipes are a bit different" from Icon Composer's rendering.
- **Construction tricks:** export layers at the full canvas size so relative positions carry into Composer (the Illustrator template's script handles this). Interlocked elements (Developer-app style) mean you "slice those elements up into individual layers" — more layers than visible elements, with shadows selling the pass-under. Flat brand marks: rebuild eraser/subtracted paths as solid stacked shapes (Podcasts) so the layering is real.
- **Xcode wiring (unchanged year-over-year):** the `.icon` file goes "adjacent to the asset catalog, not inside of it" — next to your Swift files; set the App Icon name in the target editor (no `.icon` extension) and remove any old asset-catalog icon.

## Checklist

- [ ] Metaphor identifiable without the app name; unique in its category?
- [ ] Reads at folder size — strong silhouette, edges, contrast (squint test)?
- [ ] Source art flat, opaque, mask-free, layered by depth and color; no baked shadows/bevels?
- [ ] ≤4 groups; rounder corners; bolder lines; reduced overlaps?
- [ ] All six appearances checked — mono has a white anchor element; dark-mode colors rescued with fills?
- [ ] Background from system gradient presets (not pure white/black)?
- [ ] Lineage respected — evolution, not reinvention, of the existing identity?

See `references/examples.md` for the worked redesigns (News, Keynote, Podcasts, Chess, Photos, Home, Translate, Calendar, Dictionary).

## Relationship to other skills

- **`liquid-glass-design-system`** — the same material; that skill covers it in UI, this one in icons (icon-specific rules like the 4-group cap and mono/tint modes live here).
- **`ios-brand-identity`** — the icon is the brand's most concentrated expression; brand strategy there, icon craft here. Its "personality from the app icon's visual language" line (widgets) draws from this.
- **`naming-features-and-labels`** — metaphor selection parallels its naming criteria (identifiable, travels, ages well).
- **`sf-symbols`** — glyph craft inside the app; icon glyphs share the simplicity/scale rules but live on the icon grid, not the type baseline.
