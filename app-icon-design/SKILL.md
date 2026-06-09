---
name: app-icon-design
description: "Design app icons for Apple platforms — the timeless craft (metaphor, simplicity, connection, lineage; testing at small sizes) and the layered Liquid Glass icon system (light/dark/clear/tinted appearance modes, the unified cross-platform grid, layering rules, Icon Composer workflow from flat vector source art to one .icon file). Use when designing, redesigning, or reviewing an app icon, preparing layered icons or appearance variants, using Icon Composer, choosing an icon metaphor, or fixing icons that read poorly at small sizes or in tinted/clear modes. Based on Apple WWDC sessions 822 (2017) and 220 & 361 (2025). Triggers: app icon, icon design, icon metaphor, Icon Composer, .icon file, layered icon, icon appearance modes, tinted icon, clear icon, dark mode icon, icon grid, 1024 canvas, icon at small sizes, home screen icon."
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

> **Icon Composer 2 beta (June 2026, macOS Tahoe 26.4+):** adds **per-layer refraction** (light bends through layers, subtle edge bends → lens-like distortion), redesigned **specular highlights** (inside/outside/automatic alignment + a vertical light angle), sharper material rendering (existing `.icon` files re-render automatically — re-check your tuning), and Xcode sync. Platforms unchanged (iPhone/iPad/Mac/Watch). The 2025 workflow above still holds; re-verify the tuning specifics once a WWDC26 Icon Composer session ships.

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
