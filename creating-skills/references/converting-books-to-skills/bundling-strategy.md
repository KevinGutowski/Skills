# Bundling Strategy: How to Group Chapters into Skills

## The Core Principle

Don't create one skill per chapter. This fragments the knowledge and forces users to know which skill to trigger.

Instead, bundle chapters into **phase-based skills** that match how the work actually happens.

## Decision Framework

### When to Bundle Together

| Signal | Example |
|--------|---------|
| Same phase of work | All "shaping" chapters → one skill |
| Sequential dependencies | Chapter 3 builds on Chapter 2 → bundle |
| Same user context | Used in the same work session → bundle |
| Shared vocabulary | Same terms and concepts → bundle |

### When to Separate

| Signal | Example |
|--------|---------|
| Different phases of work | "Shaping" vs "Building" → separate |
| Different user contexts | "For managers" vs "For developers" → separate |
| No dependencies | Standalone topics → can be separate |
| Different triggers | Would need different keywords → separate |

## Common Patterns

### Pattern 1: Phase-Based (Most Common)

The book describes a workflow with distinct phases.

**Example: Shape Up**
- Phase 1: Shaping → `shaping-work`
- Phase 2: Betting → `betting-on-work`
- Phase 3: Building → `building-work`

### Pattern 2: Role-Based

The book has different guidance for different roles.

**Example: A management book**
- For ICs → `practicing-technique`
- For managers → `coaching-technique`
- For executives → `scaling-technique`

### Pattern 3: Single Skill with Topics

The book covers one coherent topic with sub-areas.

**Example: A technical guide**
```
technique-name/
├── SKILL.md
├── basics.md
├── advanced.md
├── troubleshooting.md
└── examples.md
```

### Pattern 4: Collection of Standalone Skills

The book is really a collection of independent techniques.

**Example: A cookbook of patterns**
- `pattern-one/` (standalone)
- `pattern-two/` (standalone)
- `pattern-three/` (standalone)

## How Many Skills?

| Book Type | Typical Count |
|-----------|---------------|
| Single-topic technical guide | 1 skill |
| Methodology book (like Shape Up) | 3-5 skills |
| Comprehensive handbook | 5-10 skills |
| Encyclopedia/reference | 10+ skills or 1 large skill with many references |

## Anti-Patterns

### Too Granular

❌ **Bad:** 15 skills for 15 chapters
- User must know which skill to pick
- Skills are too small to be useful
- Fragmented knowledge

✅ **Good:** 3 skills for 3 phases
- Skills trigger on work context
- Each skill is substantial
- Cohesive knowledge

### Too Monolithic

❌ **Bad:** 1 giant skill with 2000 lines in SKILL.md
- Too much loaded at once
- Hard to navigate
- Wastes context window

✅ **Good:** 1 skill with SKILL.md (< 500 lines) + reference files
- Quick reference loads first
- Details load on demand
- Efficient context use

### Arbitrary Grouping

❌ **Bad:** Group by chapter number (1-5, 6-10, 11-15)
- Doesn't match how work happens
- Artificial boundaries

✅ **Good:** Group by workflow phase
- Matches user's mental model
- Natural boundaries
