---
name: ruby-refactoring
description: "Diagnose Ruby/Rails code smells and pick the right refactoring with thoughtbot's Ruby Science catalog — 13 smells with thresholds (Long Method at flog ≥10, Large Class at >7 methods or flog ≥50, Long Parameter List at ≥3 args, plus Rails-specific STI and Callback smells) mapped to 20 solutions (Extract Method/Class/Value Object, Replace Conditional with Polymorphism/Null Object, Form/Parameter Objects, Replace Mixin with Composition). Governing rule: 'Don't treat code smells as bugs… Not every smell is the symptom of a problem.' Use when reviewing or refactoring Ruby code, deciding whether/how to extract, or untangling god classes, feature envy, shotgun surgery, callback soup, or mixin overuse. NOTE: the extraction school — conflicts with dhh-style on callbacks; route by project school. Based on thoughtbot's Ruby Science. Triggers: code smell, refactor Ruby, extract class, god class, feature envy, shotgun surgery, long method, flog, form object, null object, value object, replace conditional."
---

# Ruby Refactoring (thoughtbot's Ruby Science)

*Source: "Ruby Science" — thoughtbot's code-smell → refactoring catalog. https://thoughtbot.com/ruby-science · repo: github.com/thoughtbot/ruby-science*

The governing rule: **"Don't treat code smells as bugs. It will be a waste of time to 'fix' every smell. Not every smell is the symptom of a problem."** Smells are review-time indicators; refactoring can itself introduce new smells. ⚠️ *School note:* Ruby Science is the **extraction school** — it lists Callback as a smell and prescribes class extraction where `dhh-style` keeps fat models and treats callbacks as idiomatic. Apply within the project's chosen school (see `rails-event-sourcing`'s router); on a 37signals-style codebase, use the *diagnosis* half and temper the extraction prescriptions.

## The smell catalog (with thresholds)

| Smell | Tell | Threshold | Reach for |
|---|---|---|---|
| **Long Method** | "If you can't tell exactly what a method does at a glance, it's too long"; >1 nesting level; mixed abstraction levels | flog ≥ 10 (starting point) | Extract Method; Replace Temp with Query; then check feature envy |
| **Large Class** | Can't describe it in one sentence; changes for >1 reason | >7 methods or flog ≥ 50 | Move Method; Extract Class/Value Object/Decorator; Replace Conditional with Polymorphism |
| **Feature Envy** | "a method… that would work better on a different class": params used more than own ivars; method names containing a class name (`invite_user`); Demeter violations | — | Extract Method → Move Method |
| **Case Statement** | "a sign that a method contains too much knowledge" — switching on class or type codes | — | Replace Type Code with Subclasses; Replace Conditional with Polymorphism |
| **Shotgun Surgery** | "the same small change across several different files" — usually a symptom of another smell | — | Polymorphism / Null Object; Extract Decorator; Parameter Object |
| **Divergent Change** | One class changing for multiple unrelated reasons | — | Extract Class; Extract Validator; Introduce Form Object |
| **Long Parameter List** | Heavy test setup; brittle call sites | ≥ 3 arguments | Introduce Parameter Object; Extract Class |
| **Duplicated Code** | Copy-paste; duplicated conditionals and nil checks | — | Extract Method/Class/Partial; Polymorphism / Null Object |
| **Uncommunicative Name** | Similar names, dissimilar behavior; redundant/type-bearing names | — | Rename; Extract; Inline |
| **STI** | Subclasses that need to become each other; behavior shared unevenly | — | Replace Subclasses with Strategies; polymorphic associations |
| **Comments** | Comments inside method bodies restating code; TODOs; dead code | — | Explaining Variable; Extract Method; TODOs → tracker; delete dead code |
| **Mixin** | Mixin methods ignoring host state; logic unusable without the mixin; can't inject dependencies ("mixins can't take parameters") | — | Extract Class; Replace Mixin with Composition |
| **Callback** *(Rails-specific)* | Business logic in callbacks (payments!); skip-flags; `save_without_sending_email` methods | — | Replace Callback with Method "when callback logic is unrelated to persistence" |

The STI and Callback smells are Ruby Science's distinctive Rails additions to the classic Fowler taxonomy.

## The solution catalog (20)

Extract Method · Extract Class · Extract Partial · Extract Validator · Extract Value Object · Extract Decorator · Introduce Explaining Variable · Introduce Form Object · Introduce Parameter Object · Inject Dependencies · Inline Class · Move Method · Rename Method · Replace Callback with Method · Replace Conditional with Null Object · Replace Conditional with Polymorphism · Replace Mixin with Composition · Replace Subclasses with Strategies · Use Class as Factory · Use Convention over Configuration.

Selection logic: start from the smell column above; prefer the cheapest move (Extract Method) and escalate only when the smell recurs; after any extraction, re-check for feature envy (the extracted method may belong on another class — Move Method completes it).

## Checklist

- [ ] Smell confirmed as a *problem* (change friction, bugs, test pain) — not fixed for its own sake?
- [ ] Thresholds consulted (flog 10/50, 7 methods, 3 args) as starting points, not laws?
- [ ] Cheapest refactoring first; extraction followed by a feature-envy re-check?
- [ ] School respected — extraction prescriptions tempered on vanilla/dhh-style codebases?
- [ ] No new smells introduced by the refactoring itself?

> **Staleness note:** the catalog is Fowler-lineage and essentially evergreen; flog tooling and specific Rails APIs in the book's examples date. The book is free at thoughtbot.com/ruby-science.

## Relationship to other skills

- **`dhh-style`** — the competing doctrine on callbacks and extraction; diagnosis transfers, prescriptions route by school.
- **`layered-rails`** — the nearest school: form objects, validators, and extracted classes are its layer moves; this skill supplies the *when* (smells + thresholds).
- **`rails-event-sourcing`** — when the smell is *process state on entities*, the answer is that school, not a local extraction.
- **`rails-testing`** — heavy test setup is both a smell signal here (Long Parameter List, Mystery Guest territory) and a performance problem there.
- **`agentic-coding`** — don't patch, build the gating abstraction: this catalog names the abstractions.
