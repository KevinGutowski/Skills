# Kevin Kold polished-UI article source mining — 2026-06

## Source Manifest

| Source | How fetched | Read | Density | Notes |
| --- | --- | --- | --- | --- |
| `https://x.com/kvnkld/status/2066863634949779464?s=46` | `api.vxtwitter.com/kvnkld/status/2066863634949779464` | Yes | Medium | The public post points to an X Article and exposes title/preview only. |
| X Article `2064972712729292800`, "The 10 rules to ship truly polished UI with Claude" | `api.fxtwitter.com/kvnkld/status/2066863634949779464`, `tweet.article.content.blocks` + `entityMap` snippets | Yes | High | Full article body and embedded CSS snippets available through FxTwitter. |
| Direct `https://x.com/i/article/2064972712729292800` | `curl -A "Mozilla/5.0"` | Attempted | Low | Returned logged-out X app shell; no article extraction used. |

## Extracted Lessons

| Lesson | Owning skill | Fold |
| --- | --- | --- |
| Prompt exact values instead of adjectives: curves, durations, offsets, blur, shadows, state list. | `working-with-ai` (ai-ui-direction), `frontend-design`, `web-design` (web-animation-design) | Added AI UI direction polish prompt protocol, frontend de-slop bullet, and motion-spec guidance. |
| Lead with tokens and forbid one-off values; mirror Figma variables and code names. | `design-systems`, `working-with-ai` | Added DS-as-AI-context polish layer and Figma handoff rules. |
| Treat Figma as a hypothesis; list every property the agent must read from the selection. | `working-with-ai` (ai-ui-direction) | Added explicit Figma/MCP handoff bullet. |
| Use a coherent house easing set rather than default CSS keyword easings. | `web-design` (web-animation-design) | Added as a tokenized house-curve example with theme warning. |
| Draggable controls should feel physical: velocity/momentum, soft bounds, and snap points with pull-in/release zones. | `design-craft` (animations) | Added Magnetic Snap Points section; existing motion/slider material already covered momentum/rubber-banding. |
| Entrances combine opacity, small rise, and blur; reduced-motion must be specified. | `web-design` (web-animation-design), `design-craft` (animations) | Existing enter-animation section already covered the recipe; added AI motion-spec wording. |
| Layered shadow stacks, hairline rings, low-opacity depth. | `design-craft` (surfaces/polish-principles) | Mostly already covered by Briggs/Refactoring UI; source added, no duplicate recipe needed. |
| Clickable elements need tactile press feedback; article's restrained value is `0.98`. | `design-craft` (animations/polish-principles) | Added as a theme alternate while preserving existing `0.96` house value. |
| Components are state systems discovered through live use, not static pictures. | `working-with-ai` (ai-ui-direction), `design-craft` (animations) | Added live-state discovery rule and State-Driven Microinteractions section. |

## Skips / Boundaries

- Did not create a new top-level skill: the article is a dense single source but maps cleanly to existing AI direction, frontend generation, motion, craft, and design-system skills.
- Did not copy long prompt blocks or the full CSS snippets into skills. Existing sources already own most numeric recipes; this fold kept the durable rules and added only short values where they change behavior.
- Did not overwrite the library's existing motion theme values. Conflicts such as press scale `0.96` vs `0.98` are documented as theme choices.
