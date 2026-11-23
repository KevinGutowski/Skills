# Converting Codebases to Skills

*Scope: Extract Claude skills from an open-source codebase and its pull-request history — mining PR descriptions, review threads, and iteration sequences for the reasoning behind the code.*

> **Prerequisites:** For general skill authoring see `creating-skills`. For book/documentation sources see `converting-books-to-skills` — this reference is for *living repos with PR history*; the boundary is whether the source has a review process to mine.

## Contents

- Why PRs, Not Just Code
- Qualify the Source First
- Step 1 — Catalog Before Extracting
- Step 2 — Deep-Dive Per Topic
- Step 3 — Two-Layer Output
- One technique from code you built
- Honesty & Licensing
- When NOT to Use This Skill

## Why PRs, Not Just Code

"Reading the code shows the outcome. Pull requests show the decisions." (Rob Zolkos.) PRs carry the options considered, the review pushback, the failed first attempt, the trade-offs that survived. A skill distilled only from source code captures conventions; one distilled from PRs also captures decision rules — which is what agents actually need.

**Case study:** [`marckohlbrugge/37signals-skills`](https://github.com/marckohlbrugge/37signals-skills) — 8 skills + a 35-topic guide from 265 PRs in Basecamp's Fizzy repo, seeded by [Rob Zolkos's PR catalog](https://www.zolkos.com/2025/12/10/fizzys-pull-requests). Its evolution is the lesson: v1 analyzed *code only* ([gist](https://gist.github.com/marckohlbrugge/d363fb90c89f71bd0c816d24d7642aca)); v2 added the PR/review mining; v3 packaged installable skills and re-ran with a newer model. Seven of its skills are vendored into this library as `rails` (dhh-style) satellites.

## Qualify the Source First

Not every repo is minable. Check:

- **PRs with real descriptions and review threads** — `review_comments > 0`, multi-paragraph bodies. A repo of squash-merged single-commit PRs with empty bodies has nothing to extract beyond the code.
- **Named experts whose review comments carry signal** (e.g. DHH reviewing Fizzy PRs). Their pushback is the most concentrated teaching material in the repo.
- **Volume in the topics you care about** — a handful of PRs per topic is enough for a guide section; one PR is an anecdote.

```bash
# Quick litmus: do recent PRs have substance?
curl -s "https://api.github.com/repos/{owner}/{repo}/pulls?state=closed&per_page=20" \
  | python3 -c "import json,sys; [print(p['number'], p['user']['login'], '|', (p['body'] or '')[:80]) for p in json.load(sys.stdin)]"
```

**Authenticate before mining.** Unauthenticated GitHub API = 60 core calls/hour and 10 searches/minute; a single PR deep-dive costs 3–4 calls, so a 265-PR catalog is impossible without auth. Use `gh api` or set `GITHUB_TOKEN` (5,000/hour). Save the litmus test and one-off lookups for unauthenticated mode.

## Step 1 — Catalog Before Extracting

Don't deep-dive PR-by-PR from page 1. Build an index first: **who built what, organized by topic**.

1. **Author footprint** — maps contributors to domains (in Fizzy: Jorge → backend domain modeling, flavorjones → infrastructure, etc.). Whose PRs you read first depends on which topic you're extracting.
   ```bash
   curl -s "https://api.github.com/search/issues?q=repo:{owner}/{repo}+type:pr+author:{login}&per_page=1" # .total_count
   ```
2. **Topic → PR list** — sweep titles/labels (paginate `pulls?state=closed&per_page=100&page=N`), bucket into the topic map that will become your guide's table of contents.
3. **Filter for educational PRs.** Skip dependabot, version bumps, routine chores. Rank by `review_comments` count, body length, and expert authorship/reviewers. Two practical wrinkles: the list endpoint's payload omits `review_comments` (only the per-PR detail call has it), and the fastest expert shortlist is a search qualifier, not a sweep:
   ```bash
   # All PRs an expert weighed in on (verified: 30 hits for dhh on fizzy) — then detail-call just these
   curl -s "https://api.github.com/search/issues?q=repo:{owner}/{repo}+type:pr+commenter:{login}"   # or reviewed-by:{login}
   ```
4. **Find sequences.** PR bodies cite prior attempts ("takes inspiration from @x's prior attempt in #743"), and titles betray iteration ("Introduce tenanting" → "Tenanting attempt 2" → "Tenanting v3"). Follow these chains — the *difference* between attempt 1 and the merged version is often the lesson.
5. **Order each topic's path by progression**, not PR number: spike/foundation → iterations → edge-case fixes → upgrades → "when NOT to" PRs (e.g. Fizzy's caching path ends with *CSRF vs HTTP caching — when not to cache*). The ordered path is what makes the catalog teachable rather than a link dump.

## Step 2 — Deep-Dive Per Topic

One research session per topic (matches the repo's theme-not-source organization). A PR's teaching material lives in four channels — know which you're reading:

```bash
curl -s ".../pulls/{n}"            # body: the author's framing & why — often an essay (Fizzy #483: 2,600 chars)
curl -s ".../pulls/{n}/comments"   # INLINE review threads: line-level lessons (#108: 17 comments incl. DHH's)
curl -s ".../issues/{n}/comments"  # top-level discussion: scope debates, decisions to defer
curl -s -H "Accept: application/vnd.github.diff" ".../pulls/{n}"  # the full diff in ONE call (vs paginating /files)
```

(Or `gh pr view {n} --json body,reviews,comments,files` when `gh` is available.) Note `comments` vs `review_comments` in the detail payload count channels 2 and 3 separately — a PR with 0 issue comments can still hide 17 inline review lessons.

Extract per pattern: **the pattern → why it matters → implementation excerpt → PR citation**. Always keep the PR number — it's the evidence link that lets readers verify and lets you re-check when the upstream code moves.

Pair the PR pass with a **code-only sweep** (routes, models, concerns, tests, config) — it catches steady-state conventions no single PR teaches. Two lenses unique to the code sweep:

- **What's deliberately absent** (no Devise, no Redis, no service objects) — often more revealing than what's present.
- **Philosophy inferred from implementation choices** — when the same trade-off recurs across files, it's doctrine, not accident.

## Step 3 — Two-Layer Output

Mirror the proven shape: long-form guide first, terse skills distilled from it.

| Layer | Content | Loads |
|---|---|---|
| `guide/{topic}.md` | Full narrative: pattern + why + code + **PR links** | On demand, for humans & deep dives |
| `skills/*/SKILL.md` | Terse, rule-based distillation; transferable patterns only, no app-specific business logic | Agent context |

Skill packaging rules from the case study:

- **One auto-activating core skill** (baseline conventions) + **specialized on-demand skills** marked `disable-model-invocation: true` so they don't bloat every request.
- Optionally one **persona review skill** (e.g. `/dhh`) when the source has a distinctive reviewer voice worth replaying. Its source material is the reviewer's verbatim comments collected in Step 2 — quotes like "We should never let our desire for ease of testing bleed into the application itself" are the persona; don't paraphrase them away.
- Keep guide and skills in sync; the skill cites the guide topic, the guide cites the PRs.

## One technique from code you built

A different starting point from a repo with review history: the thing works, you built it, and the knowledge is trapped in one file. From Meng To's `web-technique-to-skill` and `article-prompts-to-skills` (https://github.com/MengTo/skills, MIT, `3cc9345`); single author, written for visual web techniques, and the method carries to any working mechanism.

1. **Write the mechanism in one sentence first:** the one thing that, removed, makes the effect stop working. Test it by changing the subject, the palette, and the layout in your head. If the sentence still holds, it is the mechanism; if it stops making sense, you named the staging. No sentence means there is a look here and no skill yet. One mechanism per skill; a page that turned out well usually holds several.
2. **Sort every part of the source into three piles and keep the first.**

   | Pile | Goes | Examples |
   |---|---|---|
   | Mechanism | The skill | The maths, the state model, an ordering constraint, a budget |
   | Staging | The demo only | Palette, copy, imagery, page layout, brand |
   | Incidental | Nowhere | Selector names, a font choice, a one-off asset path |

3. **Every rule names the wrong result, not the right adjective.** "Vary the rotation for a natural feel" is untestable; "drive rotation from the tumble angle, because an independent sine reads as a wobble" can be checked. If you cannot say what goes wrong, you probably never tried the alternative: cut the rule or go and find out.
4. **Carry numbers, not adjectives.** Ship the constants you landed on, as ranges per layer or state, and say which were tuned by measurement and what was measured. Three or more parameters that vary together go in a table.
5. **Write the expensive gotchas symptom-first,** so a reader recognizes the bug they are staring at. The ones that cost hours and cannot be re-derived from the code are usually one of: color space (right in the editor, wrong on screen), layout timing (measured once, before layout happened), stacking and compositing (a context created three ancestors up), ordering (two correct operations, wrong in one order), or a property that silently does nothing on one engine. This is house rule territory already (gotchas are the highest-signal content); the symptom-first form is the addition.
6. **Disclose the verified stack.** Name the runtime, the renderer or API, and the technique layer, checked against the imports and not guessed from the look. Where the result could be mistaken for a heavier stack, say what is absent ("no WebGL").
7. **State the boundary against the nearest existing skill in the opening lines,** and extend that skill instead if it already covers the mechanism.
8. **State the cost honestly:** profile before claiming, then name the real bottleneck, the cheap lever, and the thing that does not matter.

Four ways the extraction fails: **page clone** (the layout came across and the mechanism did not), **mega-skill** (independent techniques merged into one vague skill), **micro-fragments** (every sentence became a skill with no reusable behavior), and **theme lock-in** (the source's palette, assets, or copy hard-coded into the rules).

The source also asks for a demo that reproduces the original staging exactly; that only applies to staging you own. Building from someone else's page → `working-with-ai` (reference-to-build-prompt).

## Honesty & Licensing

- State that content is LLM-extracted and may contain inaccuracies; tell readers to verify against the actual implementations.
- Code excerpts keep the **source repo's license** (Fizzy → O'Saasy); your analysis and skill text can be licensed separately (MIT).
- "Unofficial / not affiliated" disclaimer when mining a named company's repo.

## When NOT to Use This Skill

- Source is a book, talk series, or docs site → `converting-books-to-skills`.
- You only need the final conventions of a small codebase → read the code directly; the catalog step isn't worth it below ~50 substantive PRs.
- The source is one working technique you built, with no review history → skip Steps 1 to 3 and use "One technique from code you built" above.
- Repo has no public PR history (mirrored exports, force-pushed mains) → fall back to `git log` archaeology: commit messages and revert/fix chains carry a weaker version of the same signal.
