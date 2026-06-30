---
name: creating-skills
description: "Create Claude skills following best practices: structure, naming, descriptions, progressive disclosure, testing, and converting sources into skills. Use for authoring or improving skills, or encoding a book, guide, codebase, PR history, or visual reference corpus into skills. Triggers: create a skill, SKILL.md, taste.md, convert this book/repo/images to a skill."
---

## Official Documentation

**Conversion playbooks (read the matching reference):** [references/converting-books-to-skills.md](references/converting-books-to-skills.md) (books/guides/docs -> skills) · [references/converting-codebases-to-skills.md](references/converting-codebases-to-skills.md) (OSS repos + PR history -> skills) · [references/converting-visual-references-to-skills.md](references/converting-visual-references-to-skills.md) (image/reference corpora -> visual-taste skills) · [references/skill-creator.md](references/skill-creator.md) (Anthropic's bundled guide + init/package scripts). Source map: [references/sources.md](references/sources.md); parked candidates: [references/coverage-gaps.md](references/coverage-gaps.md).

- [Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — How skills work, architecture, structure
- [Quickstart](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) — Create your first skill
- [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Authoring guidelines
- [Using Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide) — Programmatic usage

## Core Principles

### 1. Concise is Key

The context window is shared. Only add what Claude doesn't already know.

**Ask yourself:**
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

Details: [conciseness.md](conciseness.md)

### 2. Set Appropriate Degrees of Freedom

| Freedom Level | Use When | Example |
|---------------|----------|---------|
| **High** (text instructions) | Multiple approaches valid | Code review guidelines |
| **Medium** (pseudocode) | Preferred pattern exists | Report generation template |
| **Low** (exact scripts) | Operations are fragile | Database migrations |

Details: [degrees-of-freedom.md](degrees-of-freedom.md)

### 3. Test with All Models

Skills effectiveness depends on the underlying model.

| Model | Consider |
|-------|----------|
| Haiku | Does the skill provide enough guidance? |
| Sonnet | Is the skill clear and efficient? |
| Opus | Does the skill avoid over-explaining? |

## SKILL.md Structure

```
---
name: skill-name (lowercase, hyphens, max 64 chars)
description: What it does + when to use it (max 1024 chars)
---

[Body content - under 500 lines]
```

Details: [skill-structure.md](skill-structure.md)

## Naming Convention

Use **gerund form** (verb + -ing):

| Good | Avoid |
|------|-------|
| `processing-pdfs` | `helper` |
| `analyzing-spreadsheets` | `utils` |
| `managing-databases` | `documents` |

## Writing Descriptions

**Always write in third person.** The description is injected into the system prompt.

**Template:**
```
[What it does]. Use when [trigger context].
```

**Example:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

Details: [writing-descriptions.md](writing-descriptions.md)

## Progressive Disclosure

SKILL.md is an overview that points to detailed materials. Claude reads files on-demand.

```
skill-name/
├── SKILL.md              # Overview (< 500 lines)
├── reference.md          # Detailed guide (loaded when needed)
├── examples.md           # Usage examples
└── scripts/
    └── utility.py        # Executed, not loaded into context
```

**Key insight:** Scripts' outputs consume tokens, not their contents.

Details: [progressive-disclosure.md](progressive-disclosure.md)

## House Style (this corpus — 2026-06 audit)

Rules layered on top of the official guidance, derived from a ~40-skill corpus with a routing eval:

1. **Descriptions: ~350–450 chars, never the 1024 cap.** The cap is an API limit, not a budget; all descriptions preload into every session (~40 × 450 ≈ 4.5k tokens here). Shape: `What it does (verb-led). Use when <3–5 situations>. <Boundary clause>. Based on <credit>. Triggers: <6–8 query-like terms>.` The validator warns >700.
2. **Boundary clauses are sacred.** Dense corpora have near-neighbors (8 Rails skills, 5 SwiftUI skills, 6 motion/polish skills). Clauses like "DEFAULT school; escalate on named pains" or "Distinct from X's perf audit" exist because of real routing misses — compress, never drop. The official one-liner examples assume no neighbors; the *shape* generalizes, the length doesn't.
3. **The routing eval is the gate.** ~/.claude/skill-evals/routing-eval.md: 44 prompts → fresh agent routes by descriptions only. Run after any description change, new skill, or consolidation. Add 1–2 probes (plus a control that must NOT route to the new skill) with every new skill. This is the docs' "build evaluations first" applied to discovery.
4. **Naming: noun phrases by task shape, never by industry** (house divergence from the gerund suggestion below — both are sanctioned; consistency within the corpus is what matters). "hardware-product-design", not "designing-hardware" or "fintech-skills".
5. **Body budget: <5k tokens** (Agent Skills spec recommendation), 500-line hard max. On compaction only the **first 5,000 tokens** of an invoked skill are re-attached (25k shared across skills) — front-load the load-bearing rules; push long quotes, walkthroughs, and per-source detail to `references/`. Reference files >100 lines get a `## Contents` block (partial reads see full scope).
6. **Knowledge-skill anatomy** (talk/article-derived skills): Sources block with titles+speakers → task-shape framing sentence → principle sections with verified, cited quotes (short by default; larger chunks are fine when the passage itself is the load-bearing artifact — always attribute: speaker, work, video ID/URL) → Checklist → "Relationship to other skills" (bidirectional) → staleness note separating durable doctrine from fast-decaying specifics.
7. **Gotchas are the highest-signal content** (Anthropic's internal finding). Populate from observed failures, not anticipation — the corpus analog is the verified-quote + failure-driven-rule discipline (e.g. source-sweep was born from a real sampling failure).
8. **Don't restate what Claude knows.** A skill earns its place with non-obvious, source-verified material: numbers, named techniques, counter-intuitive rules, decision boundaries. "One skill per task shape; the best skills fit cleanly into one category."
9. **Corpus governance:** extend existing > new skill > skip; new skills need ≥2–3 independent sources and a coherent task shape (seed-and-wait in a ledger until then); consolidate clusters under umbrella skills (encapsulation) when descriptions start competing; README.md table = human index; validate_skills.py after every change.
10. **Field triggers for *making* skills** (Dive Club, 2026): build skills from *compiled* sources when docs are agent-unreadable — Kris Puckett hit this on Liquid Glass: "Apple's developer library… is all in JavaScript. LLMs don't read JavaScript very well," so he copy-pasted excerpts to a research agent — "let's compile it all into one skill" (nPyxVMd1LIA). The trigger is repeat-pasting the same material into prompts. Personal explainers written as you learn are proto-skills — "creating explainers as I go with Claude" (Flora Guo, mdV8APhz2j4). And maintain rules by correction, not anticipation — "if I get an output that I don't like, I'm like, yo, never do that again. This is what I want instead" (Tommy Geoco, OYNoy468kS8) — the lightweight everyday form of rule 7's failure-driven discipline.
11. **Batch quote verification** (this corpus): verify quotes with `python3 scripts/verify_quotes.py SOURCE... <<'EOF'` (one quote per line; or `--manifest quotes.json`) — one call for all quotes instead of per-quote greps. It encodes the accumulated normalization rules (curly quotes, OCR mid-word spaces, transcript stutter, ellipsis-split fragments, accent folding). A MISS means do not ship the quote: re-read the source region and fix the wording or drop it. Pipeline rule: when a screening agent has already verified quotes, it should emit a `quotes.json` manifest; downstream fold agents copy quotes from the manifest verbatim (never retype from a prompt) and exhaustively verify only quotes they add themselves, spot-checking ~20% of manifest quotes.
12. **Citation economics** (this corpus): inline citations are short name-tags only — "(Rutter)", "(Klein, ch. 9)", speaker name on a quote — because the NAME does routing work between competing schools and survives editing (numbered [1] refs rot under parallel folds). The bibliographic apparatus (full titles, years, URLs, video IDs, session numbers) lives in `references/sources.md` per skill, with SKILL.md carrying a single pointer line. Sources blocks at the top of a body spend the compaction-surviving budget on provenance — keep the hot zone for rules. Operational notes (⚠️ supersession, caption-garble keys) stay in SKILL.md; pure bibliography moves.
13. **Taxonomy & graph rules** (docs/taxonomy-2026-06.md): top-level = a platform, an activity, or a cross-domain tool; topics nest as reference files under their platform/activity cluster. Nesting never severs access — every inbound edge from another skill becomes an explicit `cluster` (member reference) cross-ref. Any consolidation requires: corpus-wide edge remap, an independent grep audit (zero dangling member names), and before/after routing probes that gate the change (revert if AFTER < BEFORE). Absorbed members keep a `*Scope:*` line; cluster descriptions pool member trigger vocabulary (≤700 chars); user-invocable commands stay top-level.
14. **Write tight from the start** (compaction-pilot finding, 2026-06: bodies compress only ~10% after the fact without content cuts — so author lean instead): clipped fragments over full sentences for example lists; arrow chains for procedures (audit → inventory → group); quote-intro framing cut to "Speaker, context:"; no connective glosses ("this is the hinge..."); cross-ref bullets = distinction + routing rule only. Never compress quotes, rules, or distinct examples — density lives in the framing, not the content.
15. **Agent-standard architecture** (Vercel product-design pattern, 2026): when a skill teaches agents repeated product/design judgment, split the system into trigger/routing, source-grounded guidance, exemplars, coverage gaps, deterministic checks, and a human update loop. Start from repeated review decisions; write scope, rationale, evidence, exceptions, bad/good example, and approver before promoting a candidate into a reusable rule. Use lint/scripts only when the failure is mechanically identifiable and has a concrete fix; keep judgment in prose. Test retrieval separately from application.

## Checklist Before Shipping

**Core quality:**
- [ ] Description says what AND when
- [ ] SKILL.md body under 500 lines
- [ ] Examples are concrete, not abstract
- [ ] File references one level deep
- [ ] Consistent terminology

**Code and scripts:**
- [ ] Scripts solve problems (not punt to Claude)
- [ ] Error handling is explicit
- [ ] Required packages listed
- [ ] Forward slashes only (no Windows paths)

**Testing:**
- [ ] Tested with Haiku, Sonnet, and Opus
- [ ] Tested with real usage scenarios

Details: [checklist.md](checklist.md)
