# Preserving the Book's Voice

## Why Voice Matters

Good books have a distinctive voice. They mix ideas with stories, principles with examples. This teaching style is what makes concepts memorable and applicable.

**Don't strip the examples out.** They're not decoration—they're what make the concepts stick.

## The Teaching Pattern

Most effective non-fiction follows this pattern:

```
Principle → Concrete example → Principle reinforced
```

### Example from Shape Up

> "When we shape the work, we need to do it at the right level of abstraction: not too vague and not too concrete."

*[Principle stated]*

> A designer who worked in that situation said: "I'll give a wireframe to my designer, and then I'm saying to her: 'I know you're looking at this, but that's not what I want you to design.' It's hard to do that when you're giving them this concrete thing."

*[Concrete quote]*

> On the other end of the spectrum, projects that are too vague don't work either. "Build a calendar view" sounds sensible, but what exactly does it entail?

*[Principle reinforced with another example]*

## Applying This in Skills

### In SKILL.md (One Example)

```markdown
## Fixed Time, Variable Scope

This is the core mindset shift. Don't ask "How long will it take?" 
Ask "How much time is this worth?"

**Example:** Customers wanted a calendar in Basecamp. A full calendar 
takes 6 months—but only 10% of customers used the old one. The 
question became: "What calendar can we build in 6 weeks?" The answer: 
a read-only grid with dots.

The appetite constrains the solution, not the other way around.
```

### In Reference Files (Multiple Examples)

```markdown
## Case Study: The Calendar

Customers wanted a calendar. A full calendar takes 6 months. Only 10% 
of customers used the old one.

The question shifted: "What calendar can we build in 6 weeks?"

The answer: The Dot Grid. A two-month read-only grid. Days with events 
get dots. Click a dot, scroll to the event. No dragging, no multi-day 
spans, no color coding.

**What we didn't do:**
- Drag events between days
- Span multi-day events
- Color code categories

**Why it worked:** It solved the core problem (seeing free spaces) 
within the appetite.

## Case Study: The Permissions Request

A customer asked for complex permission rules. It could have taken 
six weeks.

Instead of taking the request at face value, we dug deeper. Someone 
had archived a file without knowing it would disappear for everyone.

**The reframe:** Instead of permission rules to prevent archiving, 
add a warning on the archive action that explains the impact.

**Result:** A one-day change instead of a six-week project.
```

## Preserving Quotes

Direct quotes from the book add authenticity and voice.

### Effective Use of Quotes

```markdown
A programmer who worked in that situation said:

> "You're solving a problem with no context. You have to be a mind 
> reader. It's like: 'we'll know it when we see it.'"
```

### When to Use Quotes

| Use Quotes When | Example |
|-----------------|---------|
| The original wording is memorable | "We'll know it when we see it" |
| It's a direct testimonial | "I'll give a wireframe and say 'that's not what I want'" |
| The phrasing captures the experience | "You have to be a mind reader" |

### When NOT to Use Quotes

| Don't Quote | Instead |
|-------------|---------|
| Generic explanations | Paraphrase more concisely |
| Long passages | Extract the key insight |
| Technical details | Restructure as decision framework |

## Capturing Subjective Experience

Books often describe how things *feel*. This is valuable context that pure procedures miss.

### Example: The Hill Chart

```markdown
## How It Feels

**At the start (bottom of hill):** You've set the date but haven't 
thought about what to cook. No idea about cuisine or dish. The 
question "What percent complete?" doesn't even make sense.

**Halfway up:** You've decided on Indian but haven't chosen a 
specific dish. You can't estimate shopping time because you don't 
know the recipe yet.

**At the top:** You've chosen the recipe and made a shopping list. 
You can see all the steps. You could even estimate how long each 
will take.

**Going down:** Buy ingredients, prep, cook. Each step moves you 
closer to done. The uncertainty is gone.
```

This subjective description helps someone recognize where they are in their own work.

## Voice Consistency

Keep the voice consistent throughout the skill:

| Do | Don't |
|----|-------|
| Active voice | Passive voice |
| Direct statements | Hedging ("might", "could possibly") |
| Second person "you" | Third person "one" |
| Concrete examples | Abstract explanations |

### Example

❌ **Inconsistent:**
> "The appetite might be considered as a constraint that could potentially limit scope..."

✅ **Consistent:**
> "The appetite constrains the solution. If we only have 6 weeks, we can't build a full calendar."
