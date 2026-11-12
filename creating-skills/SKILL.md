---
name: creating-skills
description: "Create Claude skills following best practices: structure, naming, descriptions, progressive disclosure, testing, and converting sources into skills. Use for authoring or improving skills, or encoding a book, guide, codebase, PR history, or visual reference corpus into skills. Triggers: create a skill, SKILL.md, taste.md, convert this book/repo/images to a skill."
---

# Creating Skills

House Style comes first because it is the rule set for this repository. Where upstream Anthropic guidance and a house rule differ, the house rule is the rule; the upstream default is noted in one line and not otherwise taught here.

**Conversion playbooks (read the matching reference):** [references/converting-books-to-skills.md](references/converting-books-to-skills.md) (books/guides/docs -> skills) · [references/converting-codebases-to-skills.md](references/converting-codebases-to-skills.md) (OSS repos + PR history -> skills) · [references/converting-visual-references-to-skills.md](references/converting-visual-references-to-skills.md) (image/reference corpora -> visual-taste skills) · [references/skill-creator.md](references/skill-creator.md) (Anthropic's bundled guide + init/package scripts). Source map: [references/sources.md](references/sources.md); parked candidates: [references/coverage-gaps.md](references/coverage-gaps.md).

**One of each:** the one shipping checklist is [references/authoring-checklist.md](references/authoring-checklist.md) (run it before every ship); the one description guide is [references/description-writing.md](references/description-writing.md) (read before writing or editing any description). Other files point to these two instead of restating them.

**Second hop:** two references keep deep material in a same-named subdirectory, reached through the parent reference. `converting-books-to-skills/`: workflow-overview, bundling-strategy, writing-skill-md, writing-reference-files, writing-descriptions (book-specific examples only), preserving-voice, capturing-mindset, checklist (book-specific items only). `skill-creator/`: `references/` workflows and output-patterns, `scripts/` init_skill.py, package_skill.py and quick_validate.py, LICENSE.txt.

## House Style

**The enforced core** (details in the numbered rules):

| Decision | House rule | Rule |
|---|---|---|
| Name | Noun phrase by task shape, lowercase-hyphen, ≤64 chars | 4 |
| Description | Third person; what + when + boundaries + trigger terms; ~350–450 chars, hard cap 450 | 1, 2 |
| Description edit | Requires routing probes: fixture in `docs/`, registered in `scripts/check_routing_probe_fixtures.py` | 3 |
| Body | ≤500 lines and ≤ ~5k tokens; decisive rules first | 5 |
| References | One level deep plus the declared `references/<name>/` second hop; `## Contents` over 100 lines | 18 |
| Folding a source | Fold into the owning text and reconcile; body gets one line, reference gets the texture | 19 |
| Evidence | ≥3 eval scenarios, with-skill vs without-skill | Evaluate, 17 |

1. **Descriptions: ~350–450 chars; 450 is a hard cap** (`scripts/check_vercel_overhaul.py` fails above it). The platform allows 1024 and Claude Code truncates description + `when_to_use` at 1,536, but those are limits, not budgets: every description preloads into every session (~40 × 450 ≈ 4.5k tokens here). Third person. Shape: `What it does (verb-led). Use when <3–5 situations>. <Boundary clause>. Based on <credit>. Triggers: <6–8 query-like terms>.` Upstream default: a one-line "what + Use when", with no length target. The one description guide: [references/description-writing.md](references/description-writing.md).
2. **Boundary clauses are sacred.** Dense corpora have near-neighbors (here: `design-craft`/`design-principles`/`interface-review`, `web-design`/`frontend-design`/`motion`, `swiftui`/`uikit`/`apple-design`). Clauses like "DEFAULT school; escalate on named pains" or "Distinct from X's perf audit" exist because of real routing misses — compress, never drop. The official one-liner examples assume no neighbors; the *shape* generalizes, the length doesn't.
3. **The routing eval is the gate.** After any description change, new skill, or consolidation, run routing probes: give a fresh agent the descriptions only and a set of realistic prompts, and check each routes to the intended skill. Add 1–2 probes (plus a control that must NOT route to the new skill) with every new skill. Keep the prompts in a fixture under `docs/` and register it in `scripts/check_routing_probe_fixtures.py` (its `--packet` flag prints the blind descriptions-only packet; method in `docs/skill-library-ops.md`). This is the docs' "build evaluations first" applied to discovery.
4. **Naming: noun phrases by task shape, never by industry.** "hardware-product-design", not "designing-hardware" or "fintech-skills". Lowercase, hyphens, ≤64 chars, no `helper`/`utils`. Upstream default: gerund form (`processing-pdfs`); do not use it here.
5. **Body budget: ≤500 lines and ≤ ~5k tokens.** After compaction Claude Code keeps only the **first 5,000 tokens** of an invoked skill (25k shared across skills) — front-load the load-bearing rules; push long quotes, walkthroughs, and per-source detail to `references/`. Upstream default: the 500-line limit alone.
6. **Knowledge-skill anatomy** (talk/article-derived skills): Sources block with titles+speakers → task-shape framing sentence → principle sections with verified, cited quotes (short by default; larger chunks are fine when the passage itself is the load-bearing artifact — always attribute: speaker, work, video ID/URL) → Checklist → "Relationship to other skills" (bidirectional) → staleness note separating durable doctrine from fast-decaying specifics.
7. **Gotchas are the highest-signal content** (Anthropic's internal finding). Populate from observed failures, not anticipation — the corpus analog is the verified-quote + failure-driven-rule discipline (e.g. source-sweep was born from a real sampling failure).
8. **Don't restate what Claude knows.** A skill earns its place with non-obvious, source-verified material: numbers, named techniques, counter-intuitive rules, decision boundaries. "One skill per task shape; the best skills fit cleanly into one category."
9. **Corpus governance:** extend existing > new skill > skip; new skills need ≥2–3 independent sources and a coherent task shape (seed-and-wait in a ledger until then); consolidate clusters under umbrella skills (encapsulation) when descriptions start competing; README.md table = human index; validate_skills.py after every change.
10. **Field triggers for *making* skills** (Dive Club, 2026): build skills from *compiled* sources when docs are agent-unreadable — Kris Puckett hit this on Liquid Glass: "Apple's developer library… is all in JavaScript. LLMs don't read JavaScript very well," so he copy-pasted excerpts to a research agent — "let's compile it all into one skill" (nPyxVMd1LIA). The trigger is repeat-pasting the same material into prompts. Personal explainers written as you learn are proto-skills — "creating explainers as I go with Claude" (Flora Guo, mdV8APhz2j4). And maintain rules by correction, not anticipation — "if I get an output that I don't like, I'm like, yo, never do that again. This is what I want instead" (Tommy Geoco, OYNoy468kS8) — the lightweight everyday form of rule 7's failure-driven discipline.
11. **Batch quote verification** (this corpus): verify quotes with `python3 scripts/verify_quotes.py SOURCE... <<'EOF'` (one quote per line; or `--manifest quotes.json`) — one call for all quotes instead of per-quote greps. It encodes the accumulated normalization rules (curly quotes, OCR mid-word spaces, transcript stutter, ellipsis-split fragments, accent folding). A MISS means do not ship the quote: re-read the source region and fix the wording or drop it. Pipeline rule: when a screening agent has already verified quotes, it should emit a `quotes.json` manifest; downstream fold agents copy quotes from the manifest verbatim (never retype from a prompt) and exhaustively verify only quotes they add themselves, spot-checking ~20% of manifest quotes.
12. **Citation economics** (this corpus): inline citations are short name-tags only — "(Rutter)", "(Klein, ch. 9)", speaker name on a quote — because the NAME does routing work between competing schools and survives editing (numbered [1] refs rot under parallel folds). The bibliographic apparatus (full titles, years, URLs, video IDs, session numbers) lives in `references/sources.md` per skill, with SKILL.md carrying a single pointer line. Sources blocks at the top of a body spend the compaction-surviving budget on provenance — keep the hot zone for rules. Operational notes (⚠️ supersession, caption-garble keys) stay in SKILL.md; pure bibliography moves.
13. **Taxonomy & graph rules** (docs/taxonomy-2026-06.md): top-level = a platform, an activity, or a cross-domain tool; topics nest as reference files under their platform/activity cluster. Nesting never severs access — every inbound edge from another skill becomes an explicit `cluster` (member reference) cross-ref. Any consolidation requires: corpus-wide edge remap, an independent grep audit (zero dangling member names), and before/after routing probes that gate the change (revert if AFTER < BEFORE). Absorbed members keep a `*Scope:*` line; cluster descriptions pool member trigger vocabulary inside the same 450 cap; user-invocable commands stay top-level.
14. **Write tight from the start** (compaction-pilot finding, 2026-06: bodies compress only ~10% after the fact without content cuts — so author lean instead): clipped fragments over full sentences for example lists; arrow chains for procedures (audit → inventory → group); quote-intro framing cut to "Speaker, context:"; no connective glosses ("this is the hinge..."); cross-ref bullets = distinction + routing rule only. Never compress quotes, rules, or distinct examples — density lives in the framing, not the content.
15. **Agent-standard architecture** (Vercel product-design pattern, 2026): when a skill teaches agents repeated product/design judgment, split the system into trigger/routing, source-grounded guidance, exemplars, coverage gaps, deterministic checks, and a human update loop. Start from repeated review decisions; write scope, rationale, evidence, exceptions, bad/good example, and approver before promoting a candidate into a reusable rule. Use lint/scripts only when the failure is mechanically identifiable and has a concrete fix; keep judgment in prose. Test retrieval separately from application.
16. **Register skills where work is *created*, not only where it's requested** (Pocock/Ness wayfinder pattern, 2026): description-matching at request time is one routing surface; a planning skill that charts work into tickets is another. Its ticket-type definitions and plan notes can name the skill that resolves each ticket — Will Ness wired his new frontend-prototyping skill into Pocock's `/wayfinder` planner with one routing sentence, so every future plan containing novel frontend work generates a ticket that invokes it ("this is a very powerful pattern for planning work"). When authoring a skill meant to fire at a specific workflow moment, add a routing clause to the orchestrator/planner skill that creates that moment's work — the workflow-mechanics side lives in `working-with-ai` (agentic-coding).
17. **Measure application, not just routing** (Olivares uikit-skill benchmark, 2026): run the skill against a no-skill control on a real task and score behaviours → agent cost (turns, builds, tokens) → model gap → runtime. Transcripts showed SKILL.md read once at turn 1-2 and references opened 0-2 times, so code-changing rules belong in the body; cut rules the no-skill controls already follow, surfaces the task lacks, and process lines no transcript followed; say "these rules say how to build, not a list to test". Method, isolation gotchas and hygiene: [references/measuring-skill-effect.md](references/measuring-skill-effect.md).
18. **References: one level deep, plus one sanctioned second hop.** Every reference is linked from `SKILL.md` with a when-to-read hint. A reference may push deep material into a same-named subdirectory (`references/<name>/…`) only if the parent reference links every file, the `SKILL.md` router bullet names the members, and `SKILL.md` declares the pattern in prose. Nothing deeper. References over 100 lines open with a `## Contents` block (`scripts/check_reference_hygiene.py`), so a partial read still sees the full scope. Upstream default: strictly one level.
19. **Fold into, not beside.** When folding a source, grep the parent file and its sibling references for every number and API name the fold introduces, and reconcile each hit in the same change — the new rule and the old example must not disagree. The body gets one line or one table row; the reference gets the texture (quotes, examples, per-source detail). Never append a per-source paragraph to a body that already states the rule.

## Evaluate

Routing probes (rule 3) show that a skill is picked. They do not show that it helps. For that:

- **At least three eval scenarios per skill**, each a realistic task the skill should change the outcome of.
- **Baseline first:** run every scenario with the skill and without it, and compare. A rule the without-skill run already follows is a rule to cut (rule 17).
- **Case layout:** `evals/<case-name>/{prompt.md,case.yaml,graders/}`, runnable with `claude plugin eval`.
- **Tools:** `/skill-doctor` (usage and context cost per skill) · `/doctor` (skill-listing budget; shows truncated or dropped descriptions) · `claude plugin validate` (structure) · the skill-creator plugin, if installed.
- Method, isolation gotchas, and what to score: [references/measuring-skill-effect.md](references/measuring-skill-effect.md). Run the scenarios on each model tier the skill will be used with: a small model shows whether the guidance is sufficient, a large one whether it over-explains.

## Core Principles

### 1. Concise is Key

The context window is shared. Only add what Claude doesn't already know.

**Ask yourself:**
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

Details: [references/conciseness.md](references/conciseness.md)

### 2. Set Appropriate Degrees of Freedom

| Freedom Level | Use When | Example |
|---------------|----------|---------|
| **High** (text instructions) | Multiple approaches valid | Code review guidelines |
| **Medium** (pseudocode) | Preferred pattern exists | Report generation template |
| **Low** (exact scripts) | Operations are fragile | Database migrations |

Details: [references/degrees-of-freedom.md](references/degrees-of-freedom.md)

### 3. Test with All Models

Skills effectiveness depends on the underlying model.

| Model | Consider |
|-------|----------|
| Haiku | Does the skill provide enough guidance? |
| Sonnet | Is the skill clear and efficient? |
| Opus | Does the skill avoid over-explaining? |

## Structure and Progressive Disclosure

```
skill-name/
├── SKILL.md              # frontmatter (name, description) + router and decisive rules
├── references/
│   ├── topic.md          # loaded on demand; linked from SKILL.md with a when-to-read hint
│   └── topic/            # optional second hop (rule 18)
└── scripts/
    └── utility.py        # executed, not loaded into context
```

**Key insight:** Scripts' outputs consume tokens, not their contents.

Details: [references/skill-structure.md](references/skill-structure.md) (format, frontmatter limits, loading order) · [references/progressive-disclosure.md](references/progressive-disclosure.md) (directory patterns, token economics).

## Before Shipping

Run the single checklist in [references/authoring-checklist.md](references/authoring-checklist.md), then the repo validators listed there.

## Official Documentation

Upstream defaults; the House Style above overrides them where they differ. Re-check before changing mechanics or limits.

- [Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — How skills work, architecture, structure
- [Quickstart](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) — Create your first skill
- [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Authoring guidelines
- [Using Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide) — Programmatic usage
