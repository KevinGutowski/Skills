# Animations

## Contents
- Interruptible Animations
- Enter Animations: Split and Stagger
- Exit Animations
- Contextual Icon Animations
- Sequenced Toggle Motion
- Magnetic Snap Points
- State-Driven Microinteractions
- Scale on Press
- Skip Animation on Page Load


Interruptible animations, enter/exit transitions, and contextual icon animations.

## Interruptible Animations

Users change intent mid-interaction. If animations aren't interruptible, the interface feels broken.

### CSS Transitions vs. Keyframes

| | CSS Transitions | CSS Keyframe Animations |
| --- | --- | --- |
| **Behavior** | Interpolate toward latest state | Run on a fixed timeline |
| **Interruptible** | Yes — retargets mid-animation | No — restarts from beginning |
| **Use for** | Interactive state changes (hover, toggle, open/close) | Staged sequences that run once (enter animations, loading) |
| **Duration** | Adapts to remaining distance | Fixed regardless of state |

```css
/* Good — interruptible transition for a toggle */
.drawer {
  transform: translateX(-100%);
  transition: transform 200ms ease-out;
}
.drawer.open {
  transform: translateX(0);
}

/* Clicking again mid-animation smoothly reverses — no jank */
```

```css
/* Bad — keyframe animation for interactive element */
.drawer.open {
  animation: slideIn 200ms ease-out forwards;
}

/* Closing mid-animation snaps or restarts — feels broken */
```

**Rule:** Always prefer CSS transitions for interactive elements. Reserve keyframes for one-shot sequences.

## Enter Animations: Split and Stagger

Don't animate a single large container. Break content into semantic chunks and animate each individually.

### Step by Step

1. **Split** into logical groups (title, description, buttons)
2. **Stagger** with ~100ms delay between groups
3. **For titles**, consider splitting into individual words with ~80ms stagger
4. **Combine** `opacity`, `blur`, and `translateY` for the enter effect

### Code Example

```tsx
// Motion (Framer Motion) — staggered enter
function PageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        Welcome
      </motion.h1>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        A description of the page.
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
      >
        <Button>Get started</Button>
      </motion.div>
    </motion.div>
  );
}
```

### CSS-Only Stagger

```css
.stagger-item {
  opacity: 0;
  transform: translateY(12px);
  filter: blur(4px);
  animation: fadeInUp 400ms ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

## Exit Animations

Exit animations should be softer and less attention-grabbing than enter animations. The user's focus is moving to the next thing — don't fight for attention.

### Subtle Exit (Recommended)

```tsx
// Small fixed translateY — indicates direction without drama
<motion.div
  exit={{
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" },
  }}
>
  {content}
</motion.div>
```

### Asymmetric Properties (Enter Moves, Exit Dissolves)

The asymmetry doesn't have to be only speed — you can animate *different properties* in each direction. Movement (`translateX`/`translateY`) announces an arrival; a dissolve (blur + opacity, no translation) lets a departure recede in place. As Jakub Krehel puts it: "Exiting elements often don't need the same level of attention as entering ones" — in his example `translateX` animates on enter, while blur and opacity animate on exit (https://x.com/jakubkrehel/status/2064726630874959958).

```tsx
<motion.div
  initial={{ opacity: 0, x: 16 }}            // enter: spatial movement
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, filter: "blur(4px)" }} // exit: dissolve in place, no movement
>
  {content}
</motion.div>
```

### Full Exit (When Context Matters)

```tsx
// Slide fully out — use when spatial context is important
// (e.g., a card returning to a list, a drawer closing)
<motion.div
  exit={{
    opacity: 0,
    x: "-100%",
    transition: { duration: 0.2, ease: "easeIn" },
  }}
>
  {content}
</motion.div>
```

### Good vs. Bad

```css
/* Good — subtle exit */
.item-exit {
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 150ms ease-in, transform 150ms ease-in;
}

/* Bad — dramatic exit that steals focus */
.item-exit {
  opacity: 0;
  transform: translateY(-100%) scale(0.5);
  transition: all 400ms ease-in;
}

/* Bad — no exit animation at all (element just vanishes) */
.item-exit {
  display: none;
}
```

**Key points:**
- Use a small fixed `translateY` (e.g., `-12px`) instead of the full container height
- Keep some directional movement to indicate where the element went
- Exit duration should be shorter than enter duration (150ms vs 300ms)
- Don't remove exit animations entirely — subtle motion preserves context

## Contextual Icon Animations

When icons appear or disappear contextually (on hover, on state change), animate them with `opacity`, `scale`, and `blur` rather than just toggling visibility.

### Motion Example

```tsx
import { AnimatePresence, motion } from "motion/react";

function IconButton({ isActive, icon: Icon }) {
  return (
    <button>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={isActive ? "active" : "inactive"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
```

### CSS Transition Approach (No Motion)

If the project doesn't use Motion (Framer Motion), keep both icons in the DOM and cross-fade them with CSS transitions. Because neither icon unmounts, both enter and exit animate smoothly.

The trick: one icon is absolutely positioned on top of the other. Toggling state cross-fades them — the entering icon scales up from `0.25` while the exiting icon scales down to `0.25`, both with opacity and blur.

```tsx
function IconButton({ isActive, ActiveIcon, InactiveIcon }) {
  return (
    <button>
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-[opacity,filter,scale] duration-300",
            "cubic-bezier(0.2, 0, 0, 1)",
            isActive
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]"
          )}
        >
          <ActiveIcon />
        </div>
        <div
          className={cn(
            "transition-[opacity,filter,scale] duration-300",
            "cubic-bezier(0.2, 0, 0, 1)",
            isActive
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0"
          )}
        >
          <InactiveIcon />
        </div>
      </div>
    </button>
  );
}
```

The non-absolute icon (InactiveIcon) defines the layout size. The absolute icon (ActiveIcon) overlays it without affecting flow.

### Plain HTML + Vanilla CSS (no Tailwind, no Motion)

The same recipe with zero dependencies — same values (scale `0.25`→`1`, opacity `0`→`1`, blur `4px`→`0`, `300ms`, `cubic-bezier(0.2, 0, 0, 1)`). Toggle `.is-active` on the button:

```html
<button class="icon-btn">
  <span class="icon icon--active">✓</span>
  <span class="icon icon--inactive">+</span>
</button>
```

```css
.icon-btn { position: relative; display: inline-grid; place-items: center; }
.icon {
  grid-area: 1 / 1;                 /* stack both in the same cell — inactive sizes the box */
  transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1),
              transform 300ms cubic-bezier(0.2, 0, 0, 1),
              filter 300ms cubic-bezier(0.2, 0, 0, 1);
}
.icon--active   { opacity: 0; transform: scale(0.25); filter: blur(4px); }
.icon--inactive { opacity: 1; transform: scale(1);    filter: blur(0); }
.icon-btn.is-active .icon--active   { opacity: 1; transform: scale(1);    filter: blur(0); }
.icon-btn.is-active .icon--inactive { opacity: 0; transform: scale(0.25); filter: blur(4px); }

@media (prefers-reduced-motion: reduce) { .icon { transition-duration: 1ms; } }
```

`display: grid` + `grid-area: 1 / 1` replaces the absolute-positioning trick — both icons occupy one cell, the visible one sizes the button, no `position: absolute` bookkeeping.

### Choosing Between Motion and CSS

| | Motion (Framer Motion) | CSS transitions (both icons in DOM) |
| --- | --- | --- |
| **Enter animation** | Yes | Yes |
| **Exit animation** | Yes (via `AnimatePresence`) | Yes (cross-fade — icon never unmounts) |
| **Spring physics** | Yes | No — use `cubic-bezier(0.2, 0, 0, 1)` as approximation |
| **When to use** | Project already uses `motion/react` | No motion dependency, or keeping bundle small |

**Rule:** Check the project's `package.json` for `motion` or `framer-motion`. If present, use the Motion approach. If not, use the CSS cross-fade pattern — don't add a dependency just for icon transitions.

### When to Animate Icons

| Animate | Don't animate |
| --- | --- |
| Icons that appear on hover (action buttons) | Static navigation icons |
| State change icons (play → pause, like → liked) | Decorative icons |
| Icons in contextual toolbars | Icons that are always visible |
| Loading/success state indicators | Icon labels (text next to icon) |

**Important:** Always use exactly these values for contextual icon animations — do not deviate:
- `scale`: `0.25` → `1` (never use `0.5` or `0.6`)
- `opacity`: `0` → `1`
- `filter`: `"blur(4px)"` → `"blur(0px)"`
- `transition`: `{ type: "spring", duration: 0.3, bounce: 0 }` — **bounce must always be `0`**, never `0.1` or any other value

## Sequenced Toggle Motion

For custom switches, segmented controls, and pill indicators, avoid treating state change as a single linear slide when the object can morph in a way that explains the transition. Briggs' Campsite switch (thread in [references/sources.md](sources.md)) used a middle-state swap:

1. Idle state.
2. Thumb stretches to full width.
3. State changes while the thumb spans both ends.
4. Thumb contracts into the final side.

His implementation: "In motion you can write async functions to sequence animation. The magic happens with a middle state swap. After going full width, the state change tells the parent to either flex-start or flex-end based on state, and once that's done, motion animates from `100%` to `auto`." (Briggs)

```tsx
async function animateToggle(nextChecked: boolean) {
  // 1. Stretch the thumb across the flex track
  await controls.start({
    width: "100%",
    transition: { type: "spring", duration: 0.22, bounce: 0 },
  });

  // 2. Middle-state swap: the parent's justify-content flips
  //    (flex-start ↔ flex-end) based on the new state — invisible
  //    while the thumb spans the full width
  setChecked(nextChecked);

  // 3. Contract from the new anchor side
  await controls.start({
    width: "auto",
    transition: { type: "spring", duration: 0.26, bounce: 0 },
  });
}
```

This works because the temporary full-width shape hides the justification jump and makes the control feel elastic without animating position at all.

Related sequencing moves (Briggs; sources.md):

- **Pill dot swap indicators**: framer-motion's `Reorder` "with drag disabled and an active index with some other touches for added detail" — reorder machinery as a swap animation, no dragging.
- **Modal stacks**: polish stacked-modal transitions "with some opacity duration offset and movement stagger" — opacity on a different duration than movement, layers staggered.

Use this only for controls with enough physical space for the middle state. For tiny toggles or frequently repeated rows, a standard translate transition is usually clearer and cheaper.

## Magnetic Snap Points

For sliders, scrubbers, ranges, and draggable controls with meaningful values, snapping can provide the "haptic" feeling the web lacks. Use it only where the snap value matters: month boundaries, presets, marks, detents, chapters, or validated thresholds.

The satisfying version has two zones (Kevin Kold, 2026):

1. **Pull-in zone** — a smaller radius around the snap point where the handle magnetizes into place.
2. **Release zone** — a larger radius before it breaks free, so the user must intentionally pull away once caught.

Add a tiny visual acknowledgement when it catches: pulse the label, brighten the mark, or briefly emphasize the value. Keep drags precise outside the snap zones; global snapping makes the control feel sticky and untrustworthy.

## State-Driven Microinteractions

A polished component is a state system, not a static picture. Before signing off, list and exercise the states the live build actually needs: idle, hover, pressed, loading/working, disabled, success/error, empty/overflow, reduced-motion, and any domain-specific state such as "snap caught" or "drag released."

Microinteraction patterns that often replace hard cuts:

- **Numbers:** roll, cross-fade, or at least use `tabular-nums`; never let changing digits shift layout.
- **Working state:** for short, controlled waits, a calm shimmer/sweep over the label can feel more integrated than a spinner. Use a system spinner for slow/uncontrolled waits where blame assignment matters (see [performance.md](performance.md)).
- **Icon state swaps:** cross-fade + scale + blur as in Contextual Icon Animations; don't unmount and pop.
- **Play/pause or start/stop:** animate the change between symbols so causality reads as one object changing, not two icons replacing each other.

## Scale on Press

A subtle scale-down on click gives buttons tactile feedback. Always use `scale(0.96)`. Never use a value smaller than `0.95` — anything below feels exaggerated. Use CSS transitions for interruptibility — if the user releases mid-press, it should smoothly return.

Not every button needs this. Add a `static` prop to your button component that disables the scale effect when the motion would be distracting.

Theme note: Kevin Kold's Claude-polish article uses `0.98` as a lighter press value. That is a valid restrained alternate, but this reference's house value remains `0.96`; pick one press scale per project and keep it consistent.

### CSS Example

```css
.button {
  transition-property: scale;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.button:active {
  scale: 0.96;
}
```

### Tailwind Example

```tsx
<button className="transition-transform duration-150 ease-out active:scale-[0.96]">
  Click me
</button>
```

### Motion Example

```tsx
<motion.button whileTap={{ scale: 0.96 }}>
  Click me
</motion.button>
```

### Static Prop Pattern

Extract the scale class into a variable and conditionally apply it based on a `static` prop:

```tsx
const tapScale = "active:not-disabled:scale-[0.96]";

function Button({ static: isStatic, className, children, ...props }) {
  return (
    <button
      className={cn(
        "transition-transform duration-150 ease-out",
        !isStatic && tapScale,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Usage
<Button>Click me</Button>           {/* scales on press */}
<Button static>Submit</Button>       {/* no scale */}
```

## Skip Animation on Page Load

Use `initial={false}` on `AnimatePresence` to prevent enter animations from firing on first render. Elements that are already in their default state shouldn't animate in on page load — only on subsequent state changes.

### When It Works

```tsx
// Good — icon doesn't animate in on mount, only on state change
<AnimatePresence initial={false} mode="popLayout">
  <motion.span
    key={isActive ? "active" : "inactive"}
    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
  >
    <Icon />
  </motion.span>
</AnimatePresence>
```

Works well for: icon swaps, toggles, tabs, segmented controls — anything that has a default state on page load.

### When It Breaks

Don't use `initial={false}` when the component relies on its `initial` prop to set up a first-time enter animation, like a staggered page hero or a loading state. In those cases, removing the initial animation skips the entire entrance.

```tsx
// Bad — initial={false} would skip the staggered page enter entirely
<AnimatePresence initial={false}>
  <motion.div initial="hidden" animate="visible" variants={...}>
    ...
  </motion.div>
</AnimatePresence>
```

Verify the component still looks right on a full page refresh before applying this.
