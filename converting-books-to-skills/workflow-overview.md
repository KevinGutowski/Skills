# Workflow Overview: Book to Skills

## The Full Process

Converting a book into skills happens in five phases:

### Phase 1: Analyze the Book

Before creating any skills, map the book's organization:

1. **Identify major parts/phases** — Most books have 2-5 major sections
2. **List all chapters** — Note the order and what each covers
3. **Identify core concepts** — The big ideas that everything else builds on
4. **Note concrete examples** — Case studies and stories you'll want to preserve
5. **Find the mindsets** — The underlying philosophy, not just the techniques

**Output:** A structure map showing what belongs where.

### Phase 2: Bundle into Skills

Group chapters into skills based on **how the work actually happens**, not how the book is organized.

| Question | Answer |
|----------|--------|
| Would someone use chapter A and B in the same session? | Bundle together |
| Are these chapters about the same phase of work? | Bundle together |
| Could these chapters be used independently? | Separate skills |

**Example:** Shape Up has 15 chapters but only 3 skills:
- `shaping-work` (chapters 2-6)
- `betting-on-work` (chapters 7-9)
- `building-work` (chapters 10-15)

### Phase 3: Structure Each Skill

Create the skill folder with:

```
skill-name/
├── SKILL.md           # Quick reference (< 500 lines)
├── concept-one.md     # Detailed guide
├── concept-two.md     # Detailed guide
└── ...
```

For each major concept in the skill:
1. Write a section in SKILL.md (decision framework + one example)
2. Create a reference file with full narrative and multiple examples

### Phase 4: Write the Content

**SKILL.md sections follow this pattern:**
```markdown
## [Concept Name]

[1-2 sentence narrative]

[Decision framework as table]

**Example:** [One concrete case]

Details: [link.md](link.md)
```

**Reference files follow this pattern:**
```markdown
# [Concept Name]

## Why This Matters
[Narrative context from the book]

## How It Works
[Explanation with examples]

## Case Study: [Name]
[Concrete example from the book]

## Common Mistakes
[Anti-patterns to avoid]
```

### Phase 5: Test and Refine

1. **Trigger test** — Say keywords; does the skill activate?
2. **Navigation test** — Do internal links work correctly?
3. **Completeness test** — Can you answer common questions?
4. **Scanability test** — Can you find answers quickly in SKILL.md?

## Time Estimates

| Book Size | Analysis | Bundling | Writing | Testing | Total |
|-----------|----------|----------|---------|---------|-------|
| Short (< 100 pages) | 30 min | 15 min | 2-3 hours | 30 min | ~4 hours |
| Medium (100-300 pages) | 1 hour | 30 min | 4-6 hours | 1 hour | ~8 hours |
| Long (300+ pages) | 2 hours | 1 hour | 8-12 hours | 2 hours | ~15 hours |

## Example: Shape Up Conversion

**Input:** 176-page book with 15 chapters across 3 parts

**Analysis output:**
- Part 1: Shaping (how to define work before betting)
- Part 2: Betting (how to choose what to build)
- Part 3: Building (how to execute and ship)

**Bundling decision:** 3 skills matching the 3 parts

**Final structure (3 skills):**
```
shaping-work/
├── SKILL.md (90 lines)
└── 8 reference files (642 lines)

betting-on-work/
├── SKILL.md (88 lines)
└── 6 reference files (608 lines)

building-work/
├── SKILL.md (104 lines)
└── 9 reference files (832 lines)
```

**Total:** 3 SKILL.md files (282 lines) + 23 reference files (2,082 lines)
