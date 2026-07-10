# Converting Books to Skills

*Scope: Convert books, guides, or documentation into Claude skills using progressive disclosure patterns.*

> **Prerequisite:** For general skill authoring (structure, naming, descriptions), see the `creating-skills` skill or the [official documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
>
> **Sibling:** If the source is a living codebase with PR-review history (the reasoning lives in review threads, not prose), use `converting-codebases-to-skills` — this skill is for books, docs, and guides.

## Contents

- Quick Start: Book → Skills
- Should I Create One Skill or Multiple?
- SKILL.md Structure
- Reference File Structure
- Writing Effective Descriptions
- Preserving the Book's Voice
- Capturing Mindset, Not Just Process
- Checklist Before Shipping

## Quick Start: Book → Skills

1. **Analyze** — Map the book's structure (parts, chapters, concepts)
2. **Bundle** — Group chapters into phase-based skills (not 1:1)
3. **Structure** — SKILL.md for quick reference, reference files for depth
4. **Write** — Follow the principle → example → principle pattern
5. **Test** — Verify triggers, navigation, and completeness

Details: [workflow-overview.md](converting-books-to-skills/workflow-overview.md)

## Should I Create One Skill or Multiple?

| Book Structure | Skill Strategy |
|----------------|----------------|
| Single coherent topic | One skill with reference files |
| Multiple distinct phases | One skill per phase |
| Unrelated chapters | Separate standalone skills |

**Rule of thumb:** If someone would use chapters A and B in the same work session, bundle them together.

Details: [bundling-strategy.md](converting-books-to-skills/bundling-strategy.md)

## SKILL.md Structure

Keep SKILL.md under **500 lines**. It's the quick reference that Claude loads first.

```markdown
## [Concept Name]

[1-2 sentence narrative — why this matters]

[Decision framework as table or list]

**Example:** [One concrete case from the book]

Details: [reference-file.md](converting-books-to-skills/reference-file.md)
```

(The `reference-file.md` link above is a template placeholder, not a real file — substitute your skill's own reference filename.)

**Key rules:**
- Follow the book's chapter order
- One grounding example per section
- Link to reference files for depth

Details: [writing-skill-md.md](converting-books-to-skills/writing-skill-md.md)

## Reference File Structure

Reference files hold the full narrative. Claude loads these on demand.

**Include:**
- Why this matters (narrative context)
- Multiple concrete examples from the book
- Anti-patterns and common mistakes
- The subjective experience ("how it feels")

**Avoid:**
- Nested references (keep one level deep)
- Duplicating SKILL.md content
- Abstract explanations without examples

Details: [writing-reference-files.md](converting-books-to-skills/writing-reference-files.md)

## Writing Effective Descriptions

The description determines when Claude loads the skill.

| Good | Bad |
|------|-----|
| "Shape product work by setting boundaries and writing pitches. Use during the shaping phase before betting." | "Helps with product work." |
| Says what + when | Vague |

**Template:** "[Action verb] [domain] by [key techniques]. Use when [trigger context]."

Details: [writing-descriptions.md](converting-books-to-skills/writing-descriptions.md)

## Preserving the Book's Voice

Books mix ideas with concrete examples. Preserve this pattern:

```
Principle → Concrete example/quote → Principle reinforced
```

**Example from Shape Up:**
> "Too concrete (wireframes) and you're telling the team 'that's not what I want you to design.' Too abstract and the team becomes mind readers."
> 
> Customers wanted a calendar. A full calendar takes 6 months. The question became: "What can we build in 6 weeks?" The answer: dots on a grid.

Don't strip examples out—they're what make concepts stick.

Details: [preserving-voice.md](converting-books-to-skills/preserving-voice.md)

## Capturing Mindset, Not Just Process

Books teach ideology, not just procedures. Create dedicated reference files for core philosophies.

**Examples of mindsets:**
- "Fixed time, variable scope" (not the reverse)
- "No backlogs" (important ideas come back)
- "Compare to baseline" (not to ideal)

These aren't techniques—they're the ideology that makes techniques work.

Details: [capturing-mindset.md](converting-books-to-skills/capturing-mindset.md)

## Checklist Before Shipping

- [ ] Skill description says what AND when
- [ ] SKILL.md under 500 lines
- [ ] Sections follow book's chapter order
- [ ] Each section has one grounding example
- [ ] Each section links to a reference file
- [ ] Reference files include narrative + examples
- [ ] Core mindsets have dedicated files
- [ ] No nested references (one level deep)

Details: [checklist.md](converting-books-to-skills/checklist.md)
