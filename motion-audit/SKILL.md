---
name: motion-audit
description: >
    Animation performance audit tool for CSS & Motion. Ranks animations S-through-F based on render pipeline cost: compositor, main-thread, paint, layout, layout thrashing. Triggers: audit, performance, jank, layout thrash, compositor, will-change, slow animations, animation performance
argument-hint: "[file path, component name, directory, or 'project']"
---

# Motion Audit

Audit Motion & CSS animation code and classify every animation by its render-pipeline cost.

## Tier Overview

| Tier  | Thread              | Cost                                                          | Example                                                                 |
| ----- | ------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **S** | Compositor          | Near-zero — no main-thread work                               | `transform`, `opacity` via CSS/WAAPI                                    |
| **A** | Main → Compositor   | Low — compositor values set from JS                           | `element.style.transform` via rAF/GSAP                                  |
| **B** | Main (setup) → S/A  | One-time DOM read then S/A animation                          | FLIP technique, Motion `layout` prop                                    |
| **C** | Main (paint)        | Medium — repaint affected layers each frame                   | `background-color`, `color`, `border-radius`, CSS variable animations   |
| **D** | Main (layout+paint) | High — layout recalc + paint + composite each frame           | `width`, `height`, `margin`, `top`/`left`, `scrollTop` polling          |
| **F** | Main (thrash)       | Catastrophic — forced synchronous layout per read/write cycle | Interleaved DOM reads/writes, CSS variable inheritance bombs on `:root` |

## Argument Routing

`$ARGUMENTS` determines scope:

-   **File path** (e.g. `src/components/Modal.tsx`) — audit that file only
-   **Directory** (e.g. `src/components/`) — audit all files in directory recursively
-   **`project`** or empty — full project scan of all animation code
-   **Focused sub-audit keywords:**
    -   `will-change` — audit will-change usage specifically
    -   `scroll` — audit scroll-driven animations
    -   `accessibility` or `a11y` — audit prefers-reduced-motion and motion safety

## Audit Process

### Step 1: Discover Animation Code

Search the codebase for animation patterns. Cast a wide net:

**CSS/SCSS/Sass:**

-   `transition:` and `transition-property:`
-   `animation:` and `@keyframes`
-   `will-change:`
-   `scroll-timeline`, `view-timeline`, `animation-timeline`

**JavaScript/TypeScript:**

-   `element.style.*` assignments in loops or rAF callbacks
-   `element.animate()` (WAAPI)
-   `.classList.add/remove/toggle` where the class has transitions
-   `requestAnimationFrame` callbacks that modify style
-   `scrollTop`, `scrollLeft`, `getBoundingClientRect()` in animation loops

**Library imports — read `tier-reference.md` and `references/property-tiers.json` for patterns:**

-   Motion: `animate`, `motion.`, `useAnimate`, `useSpring`, `layout`, `layoutId`, `whileInView`, `scroll()`
-   GSAP: `gsap.to`, `gsap.from`, `gsap.timeline`, `ScrollTrigger`
-   react-spring: `useSpring`, `animated.`
-   anime.js: `anime()`
-   Lottie: `lottie.loadAnimation`, `<Lottie`
-   View Transitions: `document.startViewTransition`, `::view-transition`

### Step 2: Classify Each Animation

For every animation found:

1. Identify ALL values being animated
2. Look up each value's tier in `references/property-tiers.json`
3. **Worst-tier wins** — if an animation touches `opacity` (S) and `width` (D), the animation is D-tier.
4. Factor in the animation method:
    - CSS transitions/animations or WAAPI with compositor props → S-tier
    - JS-driven (rAF, GSAP) with compositor props → A-tier
    - Motion `layout`/`layoutId` → B-tier
    - CSS variable animations → always C-tier minimum, even for compositor values
5. Read `tier-reference.md` for edge cases and caveats

### Step 3: Detect Anti-Patterns

Scan for these specific problems (see `tier-reference.md` for detection details):

| Anti-Pattern                                                 | Severity | Tier |
| ------------------------------------------------------------ | -------- | ---- |
| Layout thrashing (interleaved reads/writes in loops)         | Critical | F    |
| CSS variable on `:root`/`html`/`body` being animated         | Critical | F    |
| `scrollTop`/`scrollLeft` read in animation loop              | High     | D    |
| CSS variable used in compositor value (`opacity: var(--x)`)  | High     | C    |
| Excessive `will-change` (>3 properties or on >10 elements)   | Medium   | —    |
| `filter: blur()` with value >10px on large elements          | Medium   | S\*  |
| Long-running off-screen animations (no IntersectionObserver) | Medium   | —    |
| Missing `prefers-reduced-motion` handling                    | Medium   | —    |
| Multiple DOM-reading libraries without shared scheduling     | Medium   | —    |
| View Transition without interruption handling                | Low      | —    |

### Step 4: Identify Upgrade Paths

For every animation below S-tier, check if an upgrade is possible:

-   **D → S**: Replace `width`/`height` animation with `transform: scale()` if possible
-   **D → S**: Replace `top`/`left` animation with `transform: translate()` if possible
-   **D → B**: Replace `width`/`top` etc with Motion `layout` prop
-   **C → S** (low priority, large elements only): `background-color` transitions on large surfaces (cards, panels, sections, hero areas — not buttons or badges) can be replaced with two absolutely-positioned `::before`/`::after` pseudo-elements crossfaded via `opacity`. Only flag this if profiling shows the paint is a bottleneck.
-   **C → C**: Ensure CSS variables are registered with `@property` and `inherits: false` where applicable. Doesn't prevent paint but will prevent style recalculation wildfire.
-   **A → S**: Replace Motion `x`/`y`/`scale` etc with `transform` to run animation via WAAPI. Only works when values aren't being animated independently, for instance:

```
<motion.div initial={{ x: -100 }} animate={{ x: 0 }} whileHover={{ scale: 2 }} />
```

Or with value-specific transitions.

-   **F → A**: Batch reads/writes Motion's `frame.read()`/`frame.update()`

Only suggest upgrades that are practical. Not every D-tier animation can be upgraded — `font-size` animations genuinely need layout. Say so.

### Step 5: Check Accessibility

-   [ ] `prefers-reduced-motion` media query present and meaningful (not just `animation: none`)
-   [ ] No animations longer than 5 seconds without user control
-   [ ] No rapidly flashing content (>3 flashes per second)
-   [ ] Decorative animations are pausable or respect reduced-motion
-   [ ] Essential motion (e.g. page transitions) has a reduced alternative, not just removal (say crossfade instead of shared element)

## Output Format

Structure every audit report exactly like this.

```
## Motion Performance Audit

**Scope:** [file/component/directory/project]
**Files scanned:** [count]
**Animations found:** [count]

### Scorecard

Render as a code block bar chart. Bar width is proportional to percentage using `█` for filled and `░` for empty, 25 characters total width. Right-align counts and percentages, round percentage to nearest 4% increment. Ensure bars are all the same length.

The overall rank should be a perceptual average rank of the scores. For instance two A's and a C should be a B. 50% S and an evenly spread distribution for other scores should be A. Etc.

```

Rank

:::'███::::
::'██ ██:::
:'██:. ██::
'██:::. ██:
.█████████:
.██.... ██:
.██:::: ██:
..:::::..::

Breakdown
S ██████████████████████░░░░░░░░░░░░░░░░░░░ 14 · 45%
A █████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 6 · 19%
B ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 4 · 13%
C ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 5 · 16%
D █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 1 · 3%
F █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 1 · 3%

```

Each ranking has its own ASCII graphic.

S

```

:'██████::
'██... ██:
.██:::..::
. ██████::
:..... ██:
'██::: ██:
. ██████::
:......:::

```

A

```

:::'███::::
::'██ ██:::
:'██:. ██::
'██:::. ██:
.█████████:
.██.... ██:
.██:::: ██:
..:::::..::

```

B

```

'████████::
.██.... ██:
.██:::: ██:
.████████::
.██.... ██:
.██:::: ██:
.████████::
........:::

```

C

```

:'██████::
'██... ██:
.██:::..::
.██:::::::
.██:::::::
.██::: ██:
. ██████::
:......:::

```

D

```

'████████::
.██.... ██:
.██:::: ██:
.██:::: ██:
.██:::: ██:
.██:::: ██:
.████████::
........:::

```

F

```

'████████:
.██.....::
.██:::::::
.██████:::
.██...::::
.██:::::::
.████████:
........::

```

### Findings

Only list animations that have an actionable upgrade or are B-tier or below. S and A-tier animations with no upgrade path should be omitted from individual findings. Instead, summarise them in a single line, e.g.:

> 14 animations are already S-tier — nice work.

#### [file:line] — Tier [X]
**What:** [property being animated, e.g. "`width` transition on `.card`"]
**Why Tier [X]:** [one sentence — which property triggers which pipeline stage]
**Impact:** [quantified if possible — "triggers layout on ~200 elements per frame"]
**Upgrade:** [specific suggestion or "No practical upgrade — layout is required here"]

(...repeat for each animation with an actionable finding...)

### Anti-Patterns

#### [severity] — [pattern name]
**Location:** [file:line]
**Problem:** [what's happening]
**Fix:** [specific code change]

### Accessibility

Only list issues found. Omit checks that pass — no news is good news.

- ✗ [issue description and location]
- ✗ [issue description and location]

### Top 3 Recommendations

1. **[Highest impact fix]** — [one sentence with expected tier improvement]
2. **[Second highest]** — [one sentence]
3. **[Third highest]** — [one sentence]
```

## Voice Rules

-   Be **specific**: name the exact property, file, and line
-   Be **decisive**: assign a tier, don't hedge with "might be"
-   Be **quantified**: "triggers layout on ~50 elements" not "could be slow"
-   Be **actionable**: every finding has a concrete upgrade path or explicit "no upgrade available"
-   **No false positives**: if a `transform` animation is already S-tier via CSS, don't flag it. Only report problems or upgrades.
-   Don't pad the report — if there are only 2 animations, report 2. If everything is S-tier, say so and move on.

## Library-Specific Notes

**Motion (framer-motion / motion)**

-   Uses WAAPI under the hood → compositor properties are genuine S-tier
-   `animate()` with `transform`/`opacity`/`clipPath`/`filter` → S-tier
-   `layout` / `layoutId` props → B-tier (FLIP technique, one-time layout read)
-   `whileInView` → S-tier (depending on values being animated) + auto-deactivates off-screen (good practice)
-   `scroll()` with compositor targets → S-tier (ScrollTimeline)
-   `frame.read()` / `frame.update()` → prevents layout thrashing across libraries
-   Deferred keyframe resolution batches DOM reads (2.5x faster than unbatched)

**GSAP**

-   Uses `requestAnimationFrame`, not WAAPI → A-tier ceiling for compositor properties
-   `ScrollTrigger` reading `scrollTop` → D-tier unless using native scroll timeline
-   Can animate thousands of elements efficiently due to optimized internals

**CSS Native**

-   `transition` / `@keyframes` with compositor props → S-tier
-   `scroll-timeline` / `view-timeline` → S-tier (hardware accelerated)
-   `@property` registration prevents CSS variable inheritance cost

**View Transitions API**

-   `::view-transition-*` pseudo-elements animate `transform` + `opacity` → S-tier
-   But measuring old/new states triggers layout → overall B-to-D depending on what changes
-   Cannot be interrupted mid-flight without Motion's `animateView` wrapper
