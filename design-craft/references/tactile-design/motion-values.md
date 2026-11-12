# Tactile Design — motion

Deep file for [../tactile-design.md](../tactile-design.md). Source: `kosta4a/tactile-design` (MIT), its motion reference, paraphrased. The source credits its motion principles and sheet-drag conventions to Emil Kowalski; where they overlap, [../emil-kowalski.md](../emil-kowalski.md) is the fuller treatment and these are the product's tuned values. Siblings: [layout-and-data.md](layout-and-data.md), [phone.md](phone.md).

## Contents
- Motion: the decision order
- Curves, durations, springs, travel, blur
- Motion patterns

## Motion: the decision order

Stop as soon as the answer is "don't animate".

1. **Who caused it?** Things settled on load or by the system snap into place, with no animation on first paint. Things the user caused get the strong ease-out at once. The system speaking ("live", "listening") gets a slow linear or breathing loop.
2. **How often is it seen?**

   | Tier | Examples | Treatment |
   |---|---|---|
   | Constant | hover, typing, chart hover, scrolling | colour or opacity only, ≤150ms, no movement |
   | Frequent | press, toggle, tab, copy, menu | 150–200ms, or a spring that retargets |
   | Occasional | modal, sheet, step change, alert | 200–320ms, with a small blur as the bridge |
   | Rare, first time | onboarding, reward, first success | the delight budget: bounce up to .45, shapes, choreography |

   Keyboard actions, drag and resize never animate.
3. **Name one purpose:** feedback, state, spatial, bridge, or (rare tier only) delight. Data and the words being read never move for style.
4. **Use the cheapest tool:**
   - **CSS transitions** for state changes, because they retarget.
   - **Keyframes** only for one-shot mount entrances.
   - **A registered `@property`** for mask lengths.
   - **WAAPI** for a one-off measured height.
   - **A motion library** for springs, shared layout and exits.
   - **Raw pointer events** for drags.
5. **Animate the right properties:** transform and opacity, blur as a bridge, clip-path for reveals. Name every property; never `transition: all`.
6. **Exits are faster than entrances.**
7. **Re-triggerable motion uses transitions or springs**, never keyframes.
8. **Nothing around it moves:** swapping states share a grid cell, and measurement happens before paint.
9. **Reduced motion ships with it:** fewer and gentler, not zero.

## Curves, durations, springs, travel, blur

| Curve | Value | Use |
|---|---|---|
| strong ease-out | `cubic-bezier(.23, 1, .32, 1)` | the default for anything the user caused, hover and colour included |
| move | `cubic-bezier(.22, 1, .36, 1)` | long moves of large objects (400–450ms) |
| drawer | `cubic-bezier(.32, .72, 0, 1)` | a sheet after release: spring back 400ms, slide out 300ms |
| Material standard | `cubic-bezier(.4, 0, .2, 1)` | optional, for measured width and height changes; pick one per product |
| linear / ease-in-out | | constant loops / breathing pulses only |

Never ease-in on UI. **Tailwind v4 gotcha:** the bare `ease-out` class is `cubic-bezier(0, 0, .2, 1)` unless `--ease-out` is redefined in `@theme`, so write `ease-[var(--ease-out)]`.

| Element | In | Out |
|---|---|---|
| Menu, dropdown, popover | 150ms from `scale(.97)` + fade, origin at the trigger | 120ms |
| Desktop modal | 240ms from 16px below, 4px blur, opacity 0; it stays centred and doesn't scale from its trigger | 200ms |
| Desktop side panel | 240ms from `translateX(100%)`, no fade or blur | 200ms |
| Phone sheet | 320ms up, solid the whole way (no fade, no blur) | 200ms |
| Text or panel swap | 250ms | 150ms |

- **Springs** are written as `{ bounce, duration }`, never as stiffness and damping. Bounce rises with rarity:

  | Bounce / duration | Use |
  |---|---|
  | 0 / 0.5s | a camera pan |
  | .12 / 0.4s | a segmented toggle's pill |
  | .2 / 0.35–0.5s | height reveals, the page-entrance rise, progress fills |
  | .2 / 0.45s | a switch knob |
  | .28–.45 / 0.4–0.7s | rare celebrations only |

- **Overshoot grows with travel:** roughly travel × e^(−π·(1−b)/√(1−(1−b)²)) for bounce b. Size the bounce to the room the part has.
- **Travel grows with the size of what moves:** 4px for a phone menu, 6px for label swaps, 8px for step blocks, 16px for sections and modals, 24px for a toast exit.
- **Blur follows the size of what swaps:** 2px for small text, 4px for panels and icons, 6px for headline text or a whole step, 8px for a large panel. Flat, minimal pages can skip blur.
- **Scale:** press .97; enter from .95–.97, never from 0; icon swaps .5↔1. **Stagger** 40–80ms between children.

## Motion patterns

- **Hover:** each row fades its own fill in place over about 150ms. One shared highlight sliding from row to row makes the list look as if it is shuffling.
- **Menu:** keep it mounted and use `visibility: hidden` after the exit, so a quick reopen retargets.
- **Chevrons:** a menu chevron rotates 180° over 150ms. A disclosure chevron that also changes ink doesn't rotate; stack the two glyphs and crossfade them with a small blur.
- **Choreograph in steps:** content out, frame resizes, content in. Rows appearing or leaving follow the same three beats: fade out about 100ms, height about 140ms, fade in about 120ms. Lines reveal before text.
- **Content arriving after a choice:** opacity plus a 4px blur, about 200ms, with no travel. A swap isn't an arrival.
- **Step change in a flow:** the old step leaves as one block (about 150ms, −8px, 6px blur). The new one un-blurs over 250ms while its blocks rise 8px, 40ms apart. Fields take input at once.
- **Page entrance:** sections fade up 16px over 300ms, 60ms apart, on route mount only, and the same on every page.
- **Shake when blocked:** `x: [0, -6, 6, -4, 4, 0]` over about 420ms, plus a line that says why.
- **Live states:** a shimmer on a waiting title. Skeletons pulse between two alpha steps, with no gradient sweep. Status dots ping on one shared clock.
- **Toasts wider than about 600px only fade.** A wide expansion reads as a stretch.
- **Reduced motion:** travel, blur, scale and spin become a 150–200ms crossfade. State-carrying loops keep only their opacity pulse. Height changes are instant. A toggle pill becomes a 150ms tween, and a switch knob moves instantly. Press scale may stay, because it is feedback, not travel.
