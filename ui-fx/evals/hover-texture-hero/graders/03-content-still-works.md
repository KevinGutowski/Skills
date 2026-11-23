---
type: llm
focus: output
weight: 1
---

The lines react to the cursor: the texture layer receives the pointer (it does not have `pointer-events: none`, and no layer above it blocks the pointer over the hero), for example because the content layer is `pointer-events: none`. The "Start free" button stays clickable and keyboard reachable: any content layer that ignores the pointer sets `pointer-events: auto` again on the button and on any other links or inputs. The texture layer is marked decorative (`aria-hidden`, or the answer notes that the component already hides itself), and the answer deals with headline contrast over the lines (a lighter `--texture-ink`, a scrim, or a contrast check).
