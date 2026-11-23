# Looks and Grounds

Making the miniature look like the product it stands for, and choosing what it sits on. Distilled from Stageshow's looks, backgrounds, brands, and product-study references.

## Contents

- [A look is a token set](#a-look-is-a-token-set)
- [From the product's code](#from-the-products-code)
- [From a public site](#from-a-public-site)
- [What a look does not change](#what-a-look-does-not-change)
- [Grounds](#grounds)
- [Brand marks](#brand-marks)
- [Borrowing from real products](#borrowing-from-real-products)

## A look is a token set

A look is color, type, shape, and density expressed as tokens that every part of the scene reads, so one change restyles every window, field, menu, and badge. Use the product's own look whenever there is one: a demo in the product's real colors, radii, and type reads as that product rather than a generic mock.

The token groups worth defining, with Stageshow's defaults as a starting point:

| Group | What to set | Stageshow default |
|---|---|---|
| Surfaces | Canvas, surface, chrome, well, raised | Warm grays and white |
| Lines | A line and a fainter line | Translucent black |
| Text | Strong, normal, faint | Three grays |
| Icons | Normal and faint, both opaque | Grays |
| Accent | Accent, a second step, a soft fill, text-on-accent | Blue |
| Status | Success, danger, warning, each with a soft fill and a text color | Green, red, amber |
| Type | One sans stack, one mono stack | System stacks |
| Shape | Small, medium, large, window, pill radii | 6, 8, 10, 12, 999px |
| Density | Control height (a text field) and row height (a menu row) | 34 and 26px |
| Shadows | Hero, window, satellite, ground, float, lift, card | See [framing.md](framing.md) |

Keep a product's look in one file beside its demos and use it on every stage for that product.

Three settings sit above the tokens: **theme** (light, dark, and stylized grounds such as blueprint or frosted glass), **palette** (accent or mono), and **fidelity** (minimal, standard, realistic). Write filler once and let fidelity decide whether it renders as bars or words.

## From the product's code

When the product's code is at hand, its look is already written down. Read it before building anything.

1. **Find the tokens.** CSS custom properties, a Tailwind config (`colors`, `borderRadius`, `fontFamily`), a theme file or tokens JSON, or a component library's provider. Failing that, read the computed styles of the real components: a button, an input, a menu, a card.
2. **Map them.** Primary color to the accent. Page and card backgrounds to canvas and surface. The text scale to the three text tokens. Borders to the line. The font stack. The radius scale by role: the product's button or input radius is the medium radius, its menu item the small one, its popover or card the large one. Its input height is the control height; its menu row is the row height.
3. **Write the look file** and use it by default.

If the requester wants their own components in the demo (their buttons, rows, avatars), import those inside the stage in place of generic small parts. The stage, frames, cursor, and motion still do their jobs around them. Real components bring real density, so the restraint rules still apply: words where they carry meaning, quiet filler elsewhere. A component that fetches data or needs app context gets fixed props or a small wrapper.

For extracting a whole design system from shipped UI, rather than a look for one demo, use `design-systems` (system-from-shipped-ui).

## From a public site

When the product is someone else's, approximate it from its public site: open it, read the computed styles of a button, an input, a menu, and a card, and map them the same way. **Take the values, not the assets:** no unlicensed fonts or images.

**Check it.** Put a still of the demo beside a screenshot of the real product at the same scale. Accent, the grays' temperature, radii, and type should match at a glance. If a control looks foreign, read its real computed styles again rather than nudging by eye.

## What a look does not change

A look sets visual tokens only. The scene still takes on the product's own motion and interaction habits; keep real interaction timing where it helps recognition, then give the audience reading time. Causality, continuous identity, legibility, and reduced motion hold in every style. A brief with a style (kawaii, paper, a poster color, skeuomorphic material) gets that style in full: its colors, radii, mascot, and motion, still built to the framing and restraint rules. Skeuomorphic can mean restrained material depth in software UI, not an imitation appliance; keep the information clear and the physical cues behind it.

Changing the accent color alone does not make a new identity. Typography, content, layout, imagery, material, and motion all have to support the same idea.

## Grounds

Choose the ground for what it does.

| Ground | Does | Watch for |
|---|---|---|
| Quiet solid or tint | Gives dense UI room to read | Separate the foreground with a clear step in value before adding a shadow |
| Color field or graphic pattern | Makes a sparse picture distinctive; gives direction or scale | Keep a calm area behind useful text. Crisp bands show what a glass surface blurs; a glow everywhere cannot |
| Colorful gradient | A mood, when its direction and color relationships are chosen on purpose | Strong color goes behind an opaque surface, or the glass gets enough density to keep its text readable. A vivid ground does not also need vivid controls, a colored shadow, and a glow |
| Material (paper, glass, metal, plastic) | Physical character | Each needs its own edges, highlights, and shadows, used consistently. Texture never sits over text or stands in for hierarchy |
| Photography or artwork | A real subject | A licensed local asset, credited where required. Never present a CSS landscape as a photograph |
| Dark | Identity, or contrast for a light mockup | Choose text, borders, and raised surfaces together. Black behind a white mockup and a coherent dark product are different compositions |

- Banded grounds need a hierarchy: a dominant field, a supporting color, an optional narrow highlight.
- Judge adjacent colors as a pair and a grid as a silhouette.
- A muddy halo standing in for foreground contrast is not a ground.
- On a white or dark page the page itself is the ground ([framing.md](framing.md), Small formats and the page).

Stageshow's `examples/backgrounds/` shows one small interface over twenty grounds; treat it as a study of relationships, not a preset list.

## Brand marks

- A real company named in the scene carries its real mark. An initial in a brand-colored tile beside a real name is an invented logo.
- Use current official artwork. Check the brand's own source before trusting a third-party icon catalog; catalogs keep outdated colors and logos.
- Keep original proportions and colors, even in a monochrome UI. Marks ship as local files; never call an icon service at runtime.
- Size by footprint height. App marks get a square footprint; wide payment marks get a proportionate width. Align a row of marks by eye, on equal tracks: different silhouettes do not excuse ragged labels.
- Use only the integrations or payment methods the scene needs. A row of logos explains a relationship; it does not fill spare space.
- Full-color artwork without a dark variant keeps a light tile on a dark surface. If the tile is removed, check the bare mark against its real background.
- A fictional product gets a plain text wordmark or a neutral initial tile, and never a made-up logo beside real ones.
- Trademarks and bundled artwork remain their owners'. A source license on the code around them (Stageshow's MIT, for example) does not cover them. Record where each mark came from.

## Borrowing from real products

Studying a recognizable product (a design tool's canvas selection, an issue tracker's command menu, a mail client's hover actions) is useful when the brief needs product fidelity, denser content, native chrome, or a specific interaction.

- **Borrow the interaction, never another product's identity.** The result must read as the brief's product. A copy that only changes the name is not done.
- Open the real product at the intended width before borrowing. A recognizable interface can still have a weak crop, reset, or transition, so it gets the same rehearsal as a new scene.
- Illustrations of real products are not affiliated with them. Say so where the page could imply otherwise.
