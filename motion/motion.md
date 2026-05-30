# Motion (Vanilla JS / HTML / TypeScript)

Rules for using Motion in vanilla JavaScript, TypeScript, and HTML projects.

## Importing

-   Import from `motion`, never from `framer-motion`.

## `animate`

`animate` has three valid syntaxes:

1. **MotionValue**: `animate(motionValue, targetValue, options)`
2. **Plain value**: `animate(originValue, targetValue, options)` — add `onUpdate` to `options`
3. **Element/object**: `animate(objectOrElement, values, options)`

When animating motion values, don't track the current animation in a variable — use `value.stop()` to end the current animation. Starting a new animation on the same value automatically cancels the previous one.

## Easing

Easing is defined via the `ease` option using camelCase: `easeOut`, `easeInOut`, `circOut`, etc. Not `ease-out` or `ease-in-out`.

## Docs & Examples Lookup

When you need API details, usage patterns, or example code, call the `search-motion-codex` MCP tool:

```
search-motion-codex({ platform: "js", searchTerm: "scroll" })
```

If the `search-motion-codex` tool is not available, tell the user to install the Motion Studio MCP server from **https://motion.dev/docs/studio**.
