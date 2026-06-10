---
name: converting-codebases-to-skills
description: Extract Claude skills from an open-source codebase and its pull-request history — mining PR descriptions, review threads, and iteration sequences for the reasoning behind the code, not just the final state. Use when the user wants to turn a repo (e.g. a 37signals release, a well-reviewed OSS project) into skills or a style guide.
---

> **Prerequisites:** For general skill authoring see `creating-skills`. For book/documentation sources see `converting-books-to-skills` — this skill is for *living repos with PR history*; the boundary is whether the source has a review process to mine.

## Why PRs, Not Just Code

"Reading the code shows the outcome. Pull requests show the decisions." (Rob Zolkos.) PRs carry the options considered, the review pushback, the failed first attempt, the trade-offs that survived. A skill distilled only from source code captures conventions; one distilled from PRs also captures decision rules — which is what agents actually need.

**Case study:** [`marckohlbrugge/37signals-skills`](https://github.com/marckohlbrugge/37signals-skills) — 8 skills + a 35-topic guide from 265 PRs in Basecamp's Fizzy repo, seeded by [Rob Zolkos's PR catalog](https://www.zolkos.com/2025/12/10/fizzys-pull-requests). Its evolution is the lesson: v1 analyzed *code only* ([gist](https://gist.github.com/marckohlbrugge/d363fb90c89f71bd0c816d24d7642aca)); v2 added the PR/review mining; v3 packaged installable skills and re-ran with a newer model. Seven of its skills are vendored into this library as `dhh-style` satellites.

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

## Honesty & Licensing

- State that content is LLM-extracted and may contain inaccuracies; tell readers to verify against the actual implementations.
- Code excerpts keep the **source repo's license** (Fizzy → O'Saasy); your analysis and skill text can be licensed separately (MIT).
- "Unofficial / not affiliated" disclaimer when mining a named company's repo.

## When NOT to Use This Skill

- Source is a book, talk series, or docs site → `converting-books-to-skills`.
- You only need the final conventions of a small codebase → read the code directly; the catalog step isn't worth it below ~50 substantive PRs.
- Repo has no public PR history (mirrored exports, force-pushed mains) → fall back to `git log` archaeology: commit messages and revert/fix chains carry a weaker version of the same signal.
