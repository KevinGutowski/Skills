---
name: css-spring
description: >
    Generate CSS springs as linear() easing curves and durations. Triggers: css spring, spring easing, linear(), bounce, css easing, spring css
argument-hint: "[bounce and duration, e.g. 'bounce 0.3 duration 0.8']"
---

## Usage

Call the `generate-css-spring` MCP tool with the user's spring parameters.

### Parameters

The tool accepts spring configuration:

-   **bounce** (number, -1 to 1): How bouncy the spring is. 0 = no bounce, positive = overshoot, negative = underdamp. Default: 0.
-   **duration** (number, seconds): Duration of the spring animation. Default: 0.8.

Or raw physics parameters:

-   **stiffness** (number): Spring stiffness coefficient
-   **damping** (number): Damping coefficient
-   **mass** (number): Mass of the spring

### Example

User: "Generate a bouncy spring for a modal entrance"

→ Call `generate-css-spring` with `{ "bounce": 0.3, "duration": 0.6 }`

The tool returns a CSS `linear()` easing function and duration that can be used in CSS `transition`, `transition-timing-function` or `animation-timing-function` etc.

## If MCP Tool Not Available

If the `generate-css-spring` tool is not found, tell the user:

> The CSS spring generator requires the Motion Studio MCP server.
>
> Install it from: **https://motion.dev/docs/studio**
>
> Once installed, this command will generate CSS `linear()` spring easing functions directly in your editor.

Then explain the concept: CSS springs use the `linear()` easing function, enabling spring animations in pure CSS without JavaScript.
