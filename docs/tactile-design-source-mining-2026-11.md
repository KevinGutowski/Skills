# Tactile design source mining — 2026-11

Source: https://kosta.fyi/skills/tactile-design (Kosta, lead designer at steel.dev). Repository: https://github.com/kosta4a/tactile-design. License: MIT. Revision: `30495a2db7cb59a72bacea106118ffeab7af00d9` (2026-11-02). The landing page and `/md` export were fetched on 2026-11-11.

Ticket: "Fold in https://kosta.fyi/skills/tactile-design".

Tactile design is one agent skill (SKILL.md plus seven references, about 2,200 lines) for building "tactile, layered, quiet" product UI. It was distilled from one production dashboard and the designer's review notes. Everything below is paraphrased. No skill text was imported verbatim, and the source's install command (`npx skills add`) was not run.

## Manifest and coverage

| Source | How fetched | Read | Density | Decision |
| --- | --- | --- | --- | --- |
| Landing page `kosta.fyi/skills/tactile-design` | `curl` → HTML stripped to text | Yes | Medium | Seven before/after demos (buttons, charts, tables, drawers, controls, dropdowns, inputs). Each demo's bullet list restates rules from the references. The chart demo adds styling details (dotted gridlines, a right-hand mono scale, 3px rounded tops, 35% dim on hover) → `data-viz` and the tactile layout-and-data file. Bio and marketing skipped. |
| `/md` export | `curl` | Yes | Low | Same content as the page. |
| `README.md` | git clone | Yes | Medium | The brand-adaptation steps (neutral, brand scales, typeface, shadow ink, radius, keep the ratios) → tokens-and-surfaces Remap. Credits recorded. |
| `skills/tactile-design/SKILL.md` | git clone | Yes | **High** | Posture, the 10-step decision order, rules-at-a-glance tables, never-ship list → `design-craft` tactile-design.md. |
| `references/decisions.md` | git clone | Yes | **High** | Designer habits → Operating posture. Action weight, elevation, lines, colour, placement, amount of data, modal/sheet/toast decisions → spread across the theme files. Its §15 worked example (a usage page) was not copied; the decision order already carries it. |
| `references/tokens.md` | git clone | Yes | **High** | 12-step roles, contrast gates, the step-shift rule and the redeclare-per-surface gotcha, the shadow ladder, radii from one knob, typeface fit, shadcn/Tailwind mapping → tokens-and-surfaces. The full CSS template and Tailwind v4 `@theme` block (lines 331–500) were skimmed and not copied (link out). |
| `references/buttons-and-controls.md` | git clone | Yes | **High** | → controls.md. The Tailwind recipe strings were not copied. |
| `references/surfaces-and-layering.md` | git clone | Yes | **High** | → tokens-and-surfaces (layer stack, cards, tables, modals, sheets, menus, toasts). The source marks its side-panel section "not in the source; defaults for the designer to confirm", so that section was kept only as a brief default. |
| `references/layout-and-hierarchy.md` | git clone | Yes | High | → layout-and-data (columns, rhythm, placement, amount of data, worst-case data, figures, empty states). The copy rules were already covered by `ux-writing`. |
| `references/motion.md` | git clone | Yes | High | → motion-values. It paraphrases Emil Kowalski, so it overlaps heavily with `design-craft` emil-kowalski and `web-design` web-animation-design. Only the product values and new rules were kept: the frequency-tier table, the spring-overshoot formula, sliding-highlight vs per-row hover, the Tailwind v4 `ease-out` gotcha. |
| `references/mobile.md` | git clone | Yes | High | → phone (native feel, sizes, sheet anatomy, drag physics including pointer-capture handling, phone tables). |
| `LICENSE` | git clone | Yes | n/a | MIT. Attribution kept in every file. |

## Fold map

**Decision: a new reference in an existing skill, no new top-level skill.** The source is one deep, opinionated method for one task shape (polishing product UI). That is exactly what `design-craft` already holds as alternate *themes* (polish-principles, emil-kowalski), and the taxonomy rules say topics live as references. Some of its rules conflict with the existing schools (dark-mode lit edges, press scale, button colour, validation timing), so it became a scoped theme rather than being blended in.

- **`design-craft`**
  - NEW `references/tactile-design.md` (the theme's entry point: scope, posture, decision order, the parent-relative model, elevation per theme, hierarchy, never-ship list, conflicts table).
  - NEW second hop `references/tactile-design/`: `tokens-and-surfaces.md`, `controls.md`, `layout-and-data.md`, `motion-values.md`, `phone.md`.
  - SKILL.md: a new execution-table row naming the second-hop files, the second-hop pattern stated in prose, and the relationship bullet.
  - `polish-principles.md` Theme Note: tactile is a third theme.
  - `surfaces.md`: an alternate dark shadow-as-border school, and a no-lit-top-edge counter-school note under Dark Mode Edge Highlights.
  - `emil-kowalski.md`: sheet-dismissal corroboration (0.11 px/ms) plus the distance cap and tap slop.
  - `sources.md`, `coverage-gaps.md`.
- **`web-design` (form-design)**
  - The 16px-on-touch rule gated on `(pointer: coarse)` rather than width.
  - A scoped dense-product-UI validation school (blur and submit, a box-shadow error ring, the message under the field), recorded against Dannaway's errors-above and no-disabled-buttons rules.
- **`data-viz` (editorial-interaction)**: NEW Product Dashboard Conventions section (bars vs lines, natural periods, quiet frame, hover dimming, no grow-on-load, status dots in tables, one strong figure).
- **`design-systems`**: neutral-roles-not-hex with contrast gates, and the derived-CSS-token declaration gotcha, in `references/field-notes.md` with a one-line pointer from SKILL.md Token architecture.

- **Second pass (same day):**
  - `web-design` (web-animation-design → PRACTICAL-TIPS): the Tailwind v4 `ease-out` and `scale`-property traps.
  - `working-with-ai` (ai-ui-direction): the "apply review notes the way the reviewer works" protocol from decisions §14, plus a checklist item.
  - `interface-review`: review against a committed `design-craft` theme, including tactile-design's never-ship list.

- **Third pass (2026-11-12):**
  - The `design-craft` description now carries plain triggers ("make it look better", "fix the jank") and a frame-drops → `motion` boundary.
  - The SKILL.md body gained a plain-request router that sorts symptoms into visual, interaction, layout, performance and AI-tells, then picks one theme.
  - New routing probes V16–V18 passed a blind fresh judge; see `docs/vercel-routing-probe-results-2026-06.md`.

Earlier passes changed no descriptions.

## Conflicts recorded (scoped, not blended)

| Topic | Tactile | Existing |
| --- | --- | --- |
| Dark edges | Solid 0.5px outline + black drop; no lit top edge | Briggs top-light inset highlight (`surfaces.md`) |
| Shadow depth | Crisp ladder: a ring, a 1px drop and at most one short drop | Briggs natural stacks; Refactoring UI ambient scale |
| Press scale | .99 / .97 / .94 / .92 by target size | House .96; Kold .98 |
| Button colour | Neutral ink-12 primary; hue only on the destructive confirm or an opted-in accent | Dannaway brand-filled primary (`form-design`) |
| Disabled buttons, error placement | Disabled until it can work; errors below the field | Dannaway: avoid disabled buttons; errors above the field |
| Type weight | One rendered weight | Weight steps in web-typography |

## Already covered, not re-folded

These were already in the library: concentric radius, shadows-as-borders, tabular numbers, `transition: all`, transform-origin from the trigger, enter-from-.95, exits faster than entrances, interruptible transitions, reduced motion as softening, 44pt targets, hover under `(hover: hover)`, `100dvh` and safe areas, momentum sheet dismissal, sentence case, verb-plus-noun buttons, confirm labels naming the action, no em dashes, empty-state structure (`user-onboarding`).

## Parked

- The full CSS custom-property template and Tailwind v4 mapping. Instead of copying about 170 lines, short `## Snippets` sections in tokens-and-surfaces, controls and phone excerpt the decisive parts:
  - working steps vs root handles;
  - the light/dark shadow ladder;
  - per-surface redeclaration;
  - `@theme inline` colours with shadows as arbitrary values;
  - the primary/secondary/field/badge recipes;
  - the hover variant, touch target and phone token overrides;
  - the sheet's give curve.

  Each section ends in line-anchored links pinned to `30495a2` (MIT attribution kept).
- The decisions file's "how they think" habits beyond the posture list (e.g., "asks why, then picks the simpler option"), as candidates for `design-org-influence` or `client-work` if a second source corroborates them.
- The single-source numbers listed in `design-craft/references/coverage-gaps.md`.

## Coverage answer

- **Read:** the page, the `/md` export, README, SKILL.md and all seven references. The CSS template was skimmed.
- **Skipped:** marketing copy and the bio; the verbatim recipe code.
- **Changed:** `design-craft`, `web-design`, `data-viz`, `design-systems`.
- **Parked:** see above.
