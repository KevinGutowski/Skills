# Converting Visual References to Skills

*Scope: Convert curated image/reference corpora into concrete design or visual-taste skills.*

Use this when the source material is visual: UI screenshots, product shots, posters,
slides, physical objects, brand examples, spatial compositions, or a taste board. For
book/docs sources use `converting-books-to-skills`; for code + PR history use
`converting-codebases-to-skills`.

Sources: Cole's reply to Andrew Wilkinson's Codex-design-taste complaint
(<https://twitter.com/colderoshay/status/2066930925573898433>), Jaytel's quoted
Taste post (<https://twitter.com/Jaytel/status/2058310720274440672>), the Taste
site (<https://taste.jaytel.com>), and the public repo
(<https://github.com/jaytel0/taste>). The repo includes a live app, article,
pipeline notes, generated example skill, comparison screenshots, prompt code, and
tests.

## Contents

1. Key learning
2. When to use
3. Concrete example: Taste
4. Workflow
5. Implementation details from Taste
6. Routing with neighboring skills
7. Validation checklist

## Key Learning

A visual taste skill should encode *transferable visual rules*, not the subject
matter of the reference images. The model should learn spacing, hierarchy, density,
type, color placement, rhythm, material, composition, medium, and anti-patterns.
It should ignore app function, product category, fake names, data values, device
chrome, and other incidental content unless those details reveal a broader visual
move.

Jaytel's pipeline is useful because it separates the work into evidence-preserving
stages:

1. Curate tight, high-resolution references.
2. Analyze each image independently with two vision models.
3. Fuse each pair of analyses anonymously.
4. Chunk fused notes before deriving rules.
5. Write the skill as concrete constraints and guardrails.

The lesson is not "use Jaytel's neutral dashboard style." The lesson is how to
avoid model-prior collapse: keep the source evidence visible until late, convert
mood labels into observable constraints, and explicitly blacklist only the shortcuts
the reference corpus actually makes risky.

## When to Use

Use this workflow when:

- A user asks for a `taste.md`, personal taste, brand-taste, visual-language, or
  reference-image skill.
- A design skill keeps collapsing into vague mood words such as "premium",
  "editorial", "polished", or "high-end".
- The desired style is easier to show through examples than describe verbally.
- You need a reusable skill that can survive across models and future sessions.

Do not use it when:

- There are fewer than 6 strong references and no coherent repeated signal.
- The images are random inspiration rather than a style corpus.
- The user needs a one-off design critique, not a reusable skill.
- The references are copyrighted/private and the target skill will be public.
- The source is a real design system of tokens/components/specs; use
  `design-systems` first and only add a visual-taste skill for the expressive layer
  the system does not already encode.

## Concrete Example: Taste

The Taste demo compares three agents on the same prompt: "Design a dashboard.
Build in an HTML file. Ask no questions." The base model produces a generic SaaS
dashboard. A broad frontend-design skill produces a highly styled editorial screen.
The generated Taste skill produces a restrained neutral dashboard: left navigation,
a large metric focal card, quiet support modules, pale surfaces, one dark/neutral
anchor, and limited accent color.

The important lesson is not the neutral style itself. It is the failure-resistant
shape of the generated skill:

- It states a domain boundary: platform-agnostic UI, not marketing, device chrome,
  or brand identity.
- It gives numeric/structural constraints: one focal mass, 80-95% neutral tones,
  one saturated accent, broad low-opacity shadows, large radii.
- It defines anti-collapse guardrails: no equal-card grid, beige commerce layout,
  dense dashboard, photo-led layout, fake device mockup, or avatar identity system
  unless requested.
- It separates visual system from content: the design must still work if all text
  becomes "Title", "Label", "Detail", "Item", or "Status".

Borrow that pattern: concrete constraints plus "do not collapse into" lists. Do
not copy the particular neutral palette unless the user's own references support it.

## Workflow

### 1. Curate References

Spend most of the time here. Weak references create weak skills.

Good corpus:

- 8-20 images for a focused taste; Taste's production limit is 20 images.
- High-resolution images. Close crops often beat full screens because details are
  easier to inspect.
- Repeated signals across examples: layout, spacing, type, value contrast, color
  placement, texture, density, rhythm, hierarchy, surface depth.
- A few counterexamples if they clarify what *not* to do.

Bad corpus:

- Random moodboard screenshots with unrelated styles.
- Full-page screenshots where the desired detail occupies 5% of the image.
- References whose style depends on domain content, celebrities, brands, product
  photography, slogans, or one-off illustration.
- Screens where the intended lesson is "it feels nice" but no visual signal recurs.

If the source set is a whole website, feed, course, portfolio, screenshot archive,
or other bounded source that must be covered exhaustively before conversion, run
`research-cataloging` first. This playbook assumes the corpus has already been
curated.

### 2. Index and Dedupe

Assign stable ids before analysis:

```text
01-corpus/
  images.jsonl
  reference-images/
    image-01.png
    image-02.png
```

Deduping exact duplicates matters because repeated files can inflate a rule's
importance. Stable ids let later notes cite image evidence without relying on
fragile filenames. Taste's local runner sorts deterministically, assigns IDs such
as `img_0001`, and hashes bytes to remove exact duplicates.

### 3. Analyze Each Image Independently

Use at least two independent vision passes when the skill will matter. Different
models notice different visual evidence and miss different problems. Keep the
prompt about visual success, not functionality.

Prompt shape:

```text
Analyze this reference only as visual design evidence.
Do not explain what the app/product does.
Extract transferable rules about layout, spacing, typography, hierarchy, color,
surface depth, density, rhythm, composition, and what should be ignored as
incidental content.
Return concrete principles and anti-patterns.
```

Per-image artifact shape:

```text
02-image-notes/
  raw/
    image-01/
      model-a.md
      model-b.md
  synthesized/
    image-01.md
```

The analysis prompt should explicitly forbid subject-matter rules such as "make it
medical", "make it nightlife-themed", or "make it guest-focused." Translate those
observations into scale relationships, type behavior, color roles, edge treatment,
texture systems, image treatment, composition, repetition, and hierarchy.

### 4. Fuse Anonymously

Before fusion, remove provider names from headings and metadata. Present the raw
analyses as source-neutral peer evidence. The fusing model should look at the image
again, adjudicate disagreements, keep sharp visual insights, and discard model
wording that is too functional, content-specific, brand-specific, or unsupported.

The output is one canonical note per image:

```text
02-image-notes/synthesized/image-01.md
```

This avoids a common failure where the final synthesis follows whichever model's
voice is most familiar rather than the image evidence.

### 5. Chunk Before Extracting Rules

Do not ask a model to synthesize a large visual corpus in one jump. Chunking keeps
the final skill from flattening everything into broad mood words.

Recommended shape:

```text
03-rule-set/
  chunks/
    chunk_01-rules.md
    chunk_02-rules.md
  merges/
    merge_01-rules.md
  rule-set.md
```

Each chunk should produce 40-70 specific rules plus numeric or relational
constraints. Relational constraints are acceptable when exact values are unavailable:
"one focal mass dominates secondary modules", "accent color appears in less than
10% of the surface", "supporting type stays visibly quieter than the main label."

### 6. Write the Skill

Turn the rule set into a normal `SKILL.md`. The final skill should not mention the
source images, model names, APIs, chunk IDs, experiments, or the pipeline. Keep only
the reusable directive.

Required sections for a visual-taste skill:

```markdown
# Skill Name

## Use this skill when
## Core directive
## Visual grammar
## Composition and layout
## Typography and lettering
## Color and value
## Imagery, shape, texture, and material
## Content and subject treatment
## Medium-specific rules
## Forbidden shortcuts
## Generation checklist
```

For a public or broadly discoverable skill, keep the `description` short enough to
survive router budgets. Put long examples and source evidence in `references/`.

## Implementation Details From Taste

These details came from the Taste repo's actual prompt code and tests, not just the
marketing page:

- **Bias guard:** anonymize raw model labels and strip artifact frontmatter before
  fusion. The tests verify labels such as `openai/gpt-5.5` and provider metadata do
  not survive into the fusion prompt.
- **Domain guard:** arbitrary visual references are not treated as UI screenshots.
  The analysis prompt is intentionally medium-agnostic: an interface, poster,
  cover, illustration, product page, document, or brand asset may be the target.
- **Label guard:** aesthetic labels such as editorial, atmospheric, cinematic,
  luxury, fashion, handmade, crude, corporate, archival, punk, playful, serif, or
  utilitarian are allowed only when evidence supports them and they are paired with
  visible constraints.
- **Overfit guard:** the pipeline tests that Jaytel's neutral UI phrases are not
  injected into arbitrary prompts. Do not hard-code one example taste as the system's
  default taste.
- **Specificity budget:** chunk and rule-set prompts intentionally allow long output
  because the point is concrete production rules, not a short inspirational summary.
  The final skill can still be compact if a reference file carries the long rule set.
- **Frontmatter boundary:** the model emits tagged `skill-description` and
  `skill-body` blocks; code normalizes/truncates the description and builds YAML
  frontmatter outside the model.
- **Rerunability:** stable image IDs, exact-deduping, raw artifacts, synthesized
  notes, chunk artifacts, and merge artifacts make the run inspectable and
  restartable.
- **Failure tolerance:** production paths can store soft-failure artifacts for a
  model pass, but synthesis should only proceed when the expected raw analyses for
  an image are present or the missing pass is deliberately accepted.

## Routing With Neighboring Skills

- **`working-with-ai` (agentic-coding)** owns the codebase version of this idea:
  before/after code or expert PR review -> AGENTS.md/project rules. This reference
  owns visual-reference corpus -> visual-taste skill.
- **`working-with-ai` (ai-ui-direction)** owns applying an auditor or fixing AI UI
  output. Use this playbook to create the auditor criteria when the source is a
  visual corpus.
- **`design-systems`** owns tokens, components, governance, and DS-as-AI-context.
  A visual taste skill is not a substitute for component specs; it covers the
  expressive layer not already encoded by the system.
- **`design-prototyping`** owns using agents to generate options and running a
  fresh-context judge against the resulting screens. Use it after the skill exists
  to prove the skill actually improves output.
- **`frontend-design`** owns building the actual UI. Use the generated visual skill
  alongside it when a specific taste must override generic "good frontend" defaults.
- **`interface-craft-principles`** owns taste-building and noticing craft. Use it
  when the user wants to improve their eye, then convert the chosen references here
  if they need a reusable agent skill.
- **`research-cataloging`** owns exhaustive source coverage before conversion. Use
  it first when the user asks to mine a whole site, account, archive, or course.

## Validation Checklist

Before calling a visual-reference skill done:

- [ ] Corpus is coherent, high-resolution, and deduped.
- [ ] Each image has raw notes from at least two independent passes, or a documented
  reason why one pass is enough.
- [ ] Per-image synthesis strips provider/model identity and rejects unsupported
  functional/domain claims.
- [ ] Rules are concrete enough to implement without taste guessing.
- [ ] Mood labels are paired with visible constraints.
- [ ] Anti-patterns are tailored to the evidence, not generic taste policing.
- [ ] The final skill does not mention source images, model names, APIs, or the
  extraction process.
- [ ] A fresh generation test shows different output than the base model in the
  intended direction.
- [ ] A separate judge or human reviewer checks whether the output follows the
  reference taste instead of merely looking "better."
