---
name: creative-coding
description: "Build procedural/generative visual systems: canvas/p5/Processing sketches, particles, steering agents, automata, fractals, noise, and evolutionary variation. Use when making generative art, interactive sketches, simulation-driven visuals, or code-first visual studies. UI polish → frontend-design/web-design; end-user tool reshaping → malleable-software. Based on Shiffman + Generative Design."
---

# Creative Coding

**Sources:** [references/sources.md](references/sources.md) — Shiffman, *The Nature of Code* (2012) + Gross/Bohnacker/Laub/Lazzeroni, *Generative Design* (p5.js edition). API examples are era-tagged: Processing and p5.js details date; verify current canvas/p5/Three/WebGL APIs before prescribing exact syntax.

Use this skill for code-first visual systems whose output comes from rules, parameters, simulation, or data. The operating question is Shiffman's: "How do we define the rules that govern the behavior of our objects?"

## Route the sketch

| User asks for | Use this pattern |
| --- | --- |
| Organic variation, textures, terrain, jitter, hand-drawn feel | Randomness ladder: uniform → weighted → Gaussian → custom distribution → Perlin/noise field. |
| Moving things that feel physical | State loop: position, velocity, acceleration; update every frame; clear frame-local acceleration/forces. |
| Many ephemeral elements: smoke, sparks, trails, confetti | Particle system: emitter, particle lifecycle, global forces, per-particle forces, death/removal, texture/blend mode. |
| Creatures, cursor-following, flocking, avoidance, path following | Steering agents: desired velocity → steering force = desired - velocity; combine weighted behaviors. |
| Pattern generation from local rules | Cellular automata, recursive/fractal rules, L-systems. |
| Search/exploration of design variants | Evolutionary loop: genotype, phenotype, fitness/selection, crossover, mutation; include human selection when taste is the evaluator. |
| Realistic collision, joints, cloth, constraints | Use a physics library once collision/joints/constraints dominate; still model units, draw conversion, and library overhead explicitly. |

## Start With Rules, Not Random Stuff

Defaulting to random positions, colors, and sizes is fast but usually shallow. Shiffman warns: "Defaulting to randomness is not a particularly thoughtful solution to a design problem"; *Generative Design* adds that true randomness rarely produces good compositions.

Progression:

1. State the visual behavior in one sentence: e.g. "embers drift up, slow, and cluster near warm regions."
2. Choose the distribution: uniform for equal chance, weighted buckets/ranges for bias, Gaussian for clustering around a mean, custom/Monte Carlo for shaped likelihoods, Perlin/noise for smooth correlated change.
3. Expose the knobs: seed, count, rate, scale, amplitude, decay, friction, attraction, behavior weights.
4. Evaluate the generated family, then change the rule or parameter range. Do not hand-fix individual outputs unless the sketch is no longer generative.

## Motion Primitive

For moving bodies, make the state loop explicit:

```text
forces/desires for this frame -> acceleration
velocity += acceleration
position += velocity
acceleration = 0
draw from current state
```

Keep the conceptual variables even if the runtime API differs. `location`, `velocity`, and `acceleration` make it clear where behavior belongs; direct position nudges hide the rule.

Rules:

- **Direction + magnitude.** Compute a direction vector, normalize it, then scale it. This prevents accidental speed from leaking out of distance.
- **Forces accumulate per frame.** Add wind, gravity, attraction, repulsion, etc.; clear acceleration after update so stale forces do not compound forever.
- **Mass changes response.** Divide force by mass; copy vectors before mutating if the same force object is reused.
- **Use "good enough" physics deliberately.** Creative sketches can invent forces; physics formulas are case studies for direction/magnitude decomposition, not mandatory realism.

## Systems

**Particles.** Encapsulate `Particle` plus `ParticleSystem`. The system owns creation/removal and forwards global or per-particle forces. Add texture, alpha, and blend mode after behavior works; the same algorithm can look like dots, smoke, fire, or dust depending on rendering.

**Steering agents.** Convert desire into force:

```text
desired = target - position
desired = desired.normalized * maxSpeed
steer = desired - velocity
steer = limit(steer, maxForce)
```

Return forces from behaviors, weight them in one place, then apply: seek, flee, arrive, wander, flow-field follow, path follow, separation, alignment, cohesion. For flocking, short-range neighbor relationships matter; avoid global averages unless the effect wants centralized behavior.

**Automata and fractals.** Use them when local rules or recursive instructions are the design material: cell state from previous-neighborhood state; recursive branch/split/stop; L-system string rewrite → drawing instructions. These are pattern engines, not motion systems by default.

**Evolutionary systems.** Use genetic algorithms when the search space is huge and you can score candidates. Define genotype separately from phenotype. For visual work, the fitness function is often human selection: present variants, let taste choose parents, then crossover/mutate within bounded ranges.

## Library Thresholds

Libraries save work once their model matches the sketch. Shiffman's Box2D rule: if "collisions" is central, or you need joints, hinges, motors, pulleys, or constraints, use a physics engine. Otherwise, custom vectors/forces are clearer and more malleable.

When adopting a library:

- Map units explicitly: simulation world units vs pixels/CSS/canvas coordinates.
- Keep a small adapter layer for setup, stepping, and drawing conversion.
- Expect new vector/body/fixture names; concepts transfer, syntax does not.
- Treat the library's feature set as a constraint. "A library is great, but it provides a limited set of features."

## Performance Checks

- Neighbor interactions are often O(n^2). If each agent checks every other agent, add spatial partitioning/grid buckets before scaling counts.
- Avoid allocating throwaway vector objects inside large per-frame loops; reuse common targets where clarity allows.
- Compare squared distances when only thresholds matter; avoid unnecessary square roots.
- Cache expensive trig tables only when profiling or scale shows it matters.
- Separate update from render so you can pause, step, seed, replay, or export frames deterministically.

## Relationship to Other Skills

- **`frontend-design` / `web-design`** — owns production UI layout, SVG hygiene, web motion values, accessibility, and CSS polish. This skill owns procedural visual behavior and sketch systems.
- **`malleable-software`** — owns end-user-resculptable products and designer-built tools. This skill can build the procedural engine inside such a tool; `malleable-software` decides the agency model.
- **`motion` / `web-design` (web-animation-design)** — owns animation timing and transitions for interfaces. This skill owns simulation loops, agents, particles, and generative motion.
- **`data-viz`** — owns truthful charts and analytical graphics. Route data art here only when the visual grammar is generative/expressive rather than chart interpretation.
