# Degrees of Freedom

Source: [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## The Spectrum

Match the level of specificity to the task's fragility and variability.

## High Freedom (Text-Based Instructions)

**Use when:**
- Multiple approaches are valid
- Decisions depend on context
- Heuristics guide the approach

**Example:**
```markdown
## Code review process

1. Analyze the code structure and organization
2. Check for potential bugs or edge cases
3. Suggest improvements for readability and maintainability
4. Verify adherence to project conventions
```

## Medium Freedom (Pseudocode or Scripts with Parameters)

**Use when:**
- A preferred pattern exists
- Some variation is acceptable
- Configuration affects behavior

**Example:**
```markdown
## Generate report

Use this template and customize as needed:

```python
def generate_report(data, format="markdown", include_charts=True):
    # Process data
    # Generate output in specified format
    # Optionally include visualizations
```
```

## Low Freedom (Specific Scripts, Few or No Parameters)

**Use when:**
- Operations are fragile and error-prone
- Consistency is critical
- A specific sequence must be followed

**Example:**
```markdown
## Database migration

Run exactly this script:

```bash
python scripts/migrate.py --verify --backup
```

Do not modify the command or add additional flags.
```

## The Bridge Analogy

Think of Claude as a robot exploring a path:

**Narrow bridge with cliffs on both sides:**
- There's only one safe way forward
- Provide specific guardrails and exact instructions (low freedom)
- Example: Database migrations that must run in exact sequence

**Open field with no hazards:**
- Many paths lead to success
- Give general direction and trust Claude to find the best route (high freedom)
- Example: Code reviews where context determines the best approach

## Choosing the Right Level

| Situation | Freedom | Why |
|-----------|---------|-----|
| Database migrations | Low | One wrong step = data loss |
| Code generation | Medium | Patterns exist but context varies |
| Code review | High | Every codebase is different |
| File formatting | Low | Consistency matters |
| API integration | Medium | Standard patterns with config |
| Problem analysis | High | Context determines approach |
