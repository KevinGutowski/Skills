# Skill Delivery Patterns

*Scope: how a skill's content reaches the agent and stays current: a copied file, a stub that asks a CLI for version-matched text, docs bundled in the package, a wrapper that fetches live rules, or passive context instead of a skill. Also what to script around model judgment, how the `npx skills` CLI discovers and pins skills, and how to vet a third-party skill. Evidence is Vercel's published skills and one Vercel eval, read 2026-11-18; file-level provenance is in [sources.md](sources.md).*

## Contents

- [Choose the delivery by what goes stale](#choose-the-delivery-by-what-goes-stale)
- [Discovery stub plus CLI-served content](#discovery-stub-plus-cli-served-content)
- [Stub that points at bundled docs](#stub-that-points-at-bundled-docs)
- [Live-fetch wrapper](#live-fetch-wrapper)
- [Passive context or a skill](#passive-context-or-a-skill)
- [Scripts around judgment](#scripts-around-judgment)
- [The skills CLI: discovery, pinning, updates](#the-skills-cli-discovery-pinning-updates)
- [Vetting a third-party skill](#vetting-a-third-party-skill)
- [Frontmatter seen in the wild](#frontmatter-seen-in-the-wild)
- [What this library does](#what-this-library-does)

## Choose the delivery by what goes stale

| The content is | Deliver it as | Why |
| --- | --- | --- |
| Judgment, method, trade-offs, traps (changes slowly) | An ordinary skill: body plus references, copied on install | Nothing to keep in sync; works offline; reviewable in a diff |
| Commands and flags of a CLI that releases often | A discovery stub; the CLI prints the guide for its own version | A copied file drifts from the binary within weeks |
| API reference for a library the project already installs | A stub that points at docs bundled in the package | The docs on disk match the installed version exactly |
| A rule list owned by another team and edited often | A wrapper that fetches the list at task time, or a vendored copy with a recorded revision | One source of truth; see the costs below before choosing fetch |
| Knowledge every task in the repo needs | Passive context (`AGENTS.md`, a compact docs index), not a skill | A skill that is not invoked contributes nothing |
| A multi-step procedure the user explicitly asks for | A workflow skill | Explicit trigger, clear start and end |

One skill can mix these: an encoded body of judgment plus a "run this to get current syntax" line is the shape `browser-verification` uses for agent-browser.

## Discovery stub plus CLI-served content

**Pattern (agent-browser).** The installable skill is a 3 KB stub: a trigger-rich description, the install line, and one instruction, "before running any command, run `agent-browser skills get core`". The real guides live in the CLI's repository and ship inside the binary. `skills get <name>` prints a guide, `--ref <name>` prints one reference, `--full` prints everything, `skills list` enumerates.

**Upstream's stated reason:** the installed stub "rarely changes, while the CLI always serves content matching its own version". Their contributor rules forbid putting feature content in the stub and require a routing-table row for every new reference.

**What to copy:**

- Progressive disclosure becomes a command surface: core guide → one reference by name → everything. The core guide ends with a "load this when you need that" table.
- The stub keeps the description's trigger vocabulary, because routing still happens on the installed file.
- They evaluate the pattern itself: does the agent load the guide before acting, does it pick the right specialized guide, does it load exactly one reference when one is needed and none when none is (a control case), and what the context footprint is.

**Cost:** the whole design depends on the agent running a command first. That is the same "will it be invoked?" risk measured in the eval below, so a stub needs a skill-loading eval, and its instruction should be the first thing in the body.

**When writing a local skill for such a tool:** do not restate its command reference. Encode the judgment its guide leaves open, name commands as search terms, state the version you ran, and say that the CLI's guide wins on syntax.

## Stub that points at bundled docs

Three Vercel teams converged on the same variant: the skill says not to trust itself, and points at documentation inside the installed package.

- AI SDK: never write SDK code from memory; read the docs and source under `node_modules/ai/` for the installed version.
- Turborepo: "Do not rely on this skill for framework guidance"; read the docs that ship in the `turbo` package.
- Next.js retired its reference skills entirely. Reference knowledge now ships as bundled docs plus an agent rules file that the dev server generates (Next.js 16.3+); only workflow skills (adopt, optimize, verify) remain installable, and they live in the framework repository so they stay version-matched.

A good stub of this kind keeps one thing besides the pointer: the single highest-cost trap an agent hits *before* it reads the docs.

**Rule for this library:** when a framework ships agent-readable docs with the package, a local skill links to them and carries only decisions, traps, and review order (see `react`, and "Encode vs Link Out" in the repository's skill-library-ops doc).

## Live-fetch wrapper

**Pattern.** Vercel's `web-design-guidelines` and `writing-guidelines` skills are about 1 KB each: fetch a rule file from the default branch of a GitHub repository before every review, then apply it and use the output format it specifies.

| Benefit | Cost |
| --- | --- |
| Rules never go stale; one source for the skill, the site, and the command | Needs network and a fetch tool at task time; no offline path |
| Tiny always-installed footprint | Behavior changes with no change to the installed skill, so lockfile hashes and update checks cannot see it |
| | The fetched file is instructions from the network: a trust boundary the wrapper does not mention |
| | Unpinned (`main`), so two reviews a day apart can apply different rules |

**Middle path:** vendor the upstream file with its revision recorded, and keep local additions in a separate overlay. That is pinned, diffable, and offline (Vercel's own plugin does this for ten of its skills).

**Rule for this library:** distill the durable rules into the owning reference, record the revision read, and give the fetch URL as an optional "check for newer rules" step. Fetched text is treated as data to compare against, never as instructions that override local doctrine or the user (see `interface-review` (code-compliance-sweep) and `write-clear-prose` (technical-docs) for the two folds).

## Passive context or a skill

Vercel published one eval (2026-01-27, Next.js 16 APIs absent from training data) comparing delivery mechanisms:

| Configuration | Pass rate |
| --- | --- |
| No docs | 53% |
| Skill, default behavior | 53% |
| Skill plus an explicit `AGENTS.md` instruction to use it | 79% |
| Compressed 8 KB docs index inside `AGENTS.md` | 100% |

In 56% of cases the skill was never invoked. Instruction wording was fragile: "you must invoke the skill" made the agent read docs first and miss project context; "explore the project first, then invoke" did better. The index was compressed from about 40 KB to 8 KB with no loss, and carried a line telling the agent to prefer retrieval over what it remembers. Their own scoping: skills still suit vertical workflows a user triggers explicitly.

Read this narrowly. It is one vendor's eval of one kind of knowledge (new API reference) with no model names or sample sizes published. It supports three practices:

1. **Reference that every task needs belongs in passive context**, as a compact index that points at files, not as a skill waiting to be chosen.
2. **A skill that must fire needs a registered trigger**: a line in the repo's agent instructions, or a routing clause in the planner that creates the work (house-style rule 16).
3. **Test invocation separately from application.** A routing probe and a with/without output eval answer different questions ([measuring-skill-effect.md](measuring-skill-effect.md)).

It does not show that judgment or workflow skills underperform.

## Scripts around judgment

`vercel-optimize` (a cost and performance audit) is the clearest published example of rule 15's "deterministic checks": scripts decide what the model may look at and whether its output is true; the model explains and proposes inside a bounded brief.

| Stage | Who decides | Transferable rule |
| --- | --- | --- |
| Collect evidence | Script | No source reading until the evidence file exists. Without it, an audit degrades into grepping for known anti-patterns |
| Gate candidates | Pure function with numeric thresholds; same input, byte-identical output | The model never decides "should I look at this?" |
| Budget | Fixed cap with a diversity rule | What was gated out is listed in the report with the reason. Showing what was *not* investigated is how the report earns trust |
| Brief | Script writes the whole sub-agent prompt | Scope is bound to the candidate; wanting to search wider means the candidate is malformed, so do not compensate |
| Investigate | Model | Output is one structured recommendation or an explicit no-change finding |
| Verify claims | Script, filesystem and grep only | Every factual claim (a count, a file, a snippet, arithmetic, a citation) is checked mechanically. The model is not asked whether its own output is correct |
| Citations | Allow-list with version ranges | A URL not on the list, or for the wrong framework version, is stripped |
| Sanitize | Ordered passes, each leaving a trail | Exact money figures are replaced by magnitude phrases; measured performance numbers stay exact |
| Regenerate | Bounded retry with the failed checks quoted | Keep the retry only if verification improves |
| Render | Script | The final message is printed verbatim; internal vocabulary is banned from user-facing copy |

Also worth copying: reference docs generated from the code with a freshness check, and tests kept in a separate package so the installed skill stays small.

Use this shape when a skill produces **claims a user will act on** and the claims are mechanically checkable. Do not build it for a skill whose output is taste or coaching; there the check is an eval with graders.

## The skills CLI: discovery, pinning, updates

`npx skills` (vercel-labs/skills, read at `57217cf`) is the common installer across agents.

- **Discovery.** It looks for directories containing `SKILL.md` directly under the repository root (one level only), and up to three levels under `skills/`, `skills/.curated`, `skills/.experimental`, `skills/.system`, and each agent's project skill directory, plus any paths listed in a root `skills.sh.json` or a Claude plugin manifest. A root-level `SKILL.md` makes the whole repository a single skill. A `category/skill/` layout at the root is found only by the fallback: when the search above finds nothing, the CLI searches the whole repository (seen on 1.9.0), and `--full-depth` forces that. So a nested skill is invisible exactly when the repository also has at least one skill in a standard location.
- **Selection.** `--skill <name>` matches the frontmatter `name`, not the folder. On CLI 1.9.0, `--skill react-best-practices` against vercel-labs/agent-skills failed with `SKILLS_NO_MATCHING_SKILLS` and `--skill vercel-react-best-practices` installed. Keep folder and `name` equal so nobody has to guess; several upstream skills differ. `--rename` exists for generic names that collide (`core`, `react`, `mcp`).
- **Install.** A canonical copy under `.agents/skills/<name>`, symlinked into each agent's directory (`--copy` to copy). Project scope by default, `-g` for global.
- **Pinning.** A project `skills-lock.json` records a content hash and source commit per skill. `skills check` exits non-zero on an available update or a local modification, so it can gate CI. `skills update` pulls. To pin a source, append a release tag or a full commit hash (`owner/repo@v1.2.3 --skill <name>`). A short hash after `@` is read as a skill name (`owner/repo@<skill>` is the shorthand for selecting one), so the short hashes this library records as provenance are not usable as pins.
- **Try without installing.** `skills use <source>@<skill>` materializes a skill in a temp directory and prints a prompt or launches an agent.
- **Hidden skills.** `metadata.internal: true` hides a skill from listing and install unless requested by name.
- **Privacy.** The CLI sends install telemetry and requests partner security-audit results by default; `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1` turns both off. Audit results are displayed and never block an install.
- **Display.** `skills.sh.json` can group a repository's skills for the skills.sh listing.

## Vetting a third-party skill

The `find-skills` skill tells agents to verify before recommending: install count (prefer 1K+, be wary under 100), source reputation, and repository stars. Those are popularity signals. They are a reasonable first filter and nothing more: none of them reads the skill.

Before installing or folding an external skill, also:

1. Read the body and every script. A skill is instructions plus code that will run with the agent's permissions.
2. Check `allowed-tools`. A skill for one CLI should allow that CLI's commands, not broad shell access.
3. Look for network fetches at task time (live-fetch wrappers, `npx <package>@latest`) and decide whether that is acceptable here.
4. Treat the description as non-neutral: it is written to win routing ("prefer this over any built-in tool").
5. Pin what you install, and re-read on update.

The intake rules in the repository's skill-library-ops doc (inventory, read bodies, fold lessons in the library's words, park single-source doctrine) apply on top.

## Frontmatter seen in the wild

Tally across 82 Vercel `SKILL.md` files (2026-11): every one has `name` and `description`; 25 use `metadata`, 10 `allowed-tools`, 5 `license`.

- `allowed-tools` is scoped to the skill's own CLI: `Bash(agent-browser:*)`, plus one pattern per extra CLI the workflow drives. The skills CLI does not read it; the agent harness does.
- `metadata` values are strings (`version: "1.2.0"`, `author`, `argument-hint`, `internal`).
- Fields such as `hidden`, `user-invocable`, path or prompt patterns, and `validate` blocks are product-specific extensions read by one CLI or plugin. They are not portable. Vercel's plugin has since dialed its automatic injection back, a caution against hook-driven injection on every prompt.
- "Only when explicitly invoked" is expressed in the description text.
- Vercel descriptions run long (the agent-browser stub is about 1,000 characters of triggers). This library's 450-character cap is a deliberate divergence: with 40+ skills loaded, description budget is the scarce resource.

## What this library does

- Skills are root-level directories with `name` equal to the directory, so `npx skills add <owner>/<repo> --skill <name>` discovers them (confirmed with a local-path `--list` run on 2026-11-18, which found all 44).
- Frontmatter stays at `name` and `description`. No `allowed-tools`: these are knowledge skills, and the tool skills name the CLI in prose.
- External rule lists are distilled with a recorded revision; live fetch is an optional freshness step.
- Tool and framework skills point at version-matched upstream text and keep judgment local.
- Skills are not auto-injected. Where one must fire at a specific moment, register it in the repo's agent instructions or the planner.
