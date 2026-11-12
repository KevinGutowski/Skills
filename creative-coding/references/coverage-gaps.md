# Coverage Gaps

Use this file for creative-coding candidates that need current APIs, fixtures, or accepted outputs before becoming reusable guidance.

## Candidate gaps

- **Current APIs:** p5.js, Processing, Canvas, WebGL, Three.js, and export APIs need current verification before prescribing syntax. [current-api-scaffolds.md](current-api-scaffolds.md) now holds scaffolds checked on 2026-11-12 (p5.js 2.x, Canvas 2D sizing and loop, three.js minimal scene, seeded PRNG); the three rows first left unverified (instance-mode async `setup`, `noiseSeed`, three.js addon paths and `setSize`) were then confirmed in the `p5@2.4.0` and `three@0.187.0` package source. Still open: Processing (Java), raw WebGL2 without a library, WebGPU, and frame/video export APIs.
- **Performance fixtures:** Particles, flocking, shaders, and high-count sketches need reproducible scale tests before promoting thresholds.
- **Generative taste examples:** Add before/after or seed/parameter examples only when a generated family was accepted and the rule that improved it is recorded.
- **Accessibility/export:** Interactive sketches need guidance for reduced motion, keyboard controls, screenshots, and frame export when they become user-facing.
- **Boundary with UI skills:** Route production interface polish, layout, and accessibility to `frontend-design`/`web-design`; keep this skill focused on procedural behavior.

## Candidate promotion form

```markdown
Candidate:
Pattern:
Source or accepted sketch:
Runtime/API checked:
Rule:
Parameters/seed:
Exception:
Status: proposed | accepted | rejected
```
