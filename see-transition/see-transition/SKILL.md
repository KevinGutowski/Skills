---
name: see-transition
description: >
    Visualise CSS easings and Motion transitions. Triggers on: see, visualise
argument-hint: "[easing to visualise, e.g. 'spring bounce 0.3' or 'cubic-bezier(0.4, 0, 0.2, 1)']"
---

## Usage

Based on the user's input, call the appropriate MCP tool:

### Spring Visualisation

For spring-based easing, call `visualise-spring`:

-   **bounce** (number, -1 to 1): How bouncy the spring is
-   **duration** (number, seconds): Duration of the spring animation

Or raw physics parameters:

-   **stiffness**, **damping**, **mass**

### Cubic Bezier Visualisation

For cubic-bezier easing, call `visualise-cubic-bezier`:

-   **x1**, **y1**, **x2**, **y2** (numbers): The four control points

### Detecting Intent

-   "spring", "bounce", "stiffness", "damping" → `visualise-spring`
-   "cubic-bezier", "bezier", "ease", "easeIn", "easeOut", "easeInOut" → `visualise-cubic-bezier`
-   Named easings map to cubic-bezier: `ease` = `(0.25, 0.1, 0.25, 1)`, `easeIn` = `(0.42, 0, 1, 1)`, `easeOut` = `(0, 0, 0.58, 1)`, `easeInOut` = `(0.42, 0, 0.58, 1)`

### Examples

User: "Show me a bouncy spring"
→ Call `visualise-spring` with `{ "bounce": 0.25, "duration": 0.8 }`

User: "Visualise cubic-bezier(0.4, 0, 0.2, 1)"
→ Call `visualise-cubic-bezier` with `{ "x1": 0.4, "y1": 0, "x2": 0.2, "y2": 1 }`

User: "See easeOut"
→ Call `visualise-cubic-bezier` with `{ "x1": 0, "y1": 0, "x2": 0.58, "y2": 1 }`

## If MCP Tools Not Available

If `visualise-spring` or `visualise-cubic-bezier` tools are not found, tell the user:

> Easing visualisation requires the Motion Studio MCP server.
>
> Install it from: **https://motion.dev/docs/studio**
>
> Once installed, this command will render visual easing curve previews directly in your editor.
