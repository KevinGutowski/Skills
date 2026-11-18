# Interfere source mining — 2026-11

Ticket: fold in Interfere's skills as needed, starting from Luke Shiels's Landmines announcement and covering the rest of what Interfere publishes for agents. Read 2026-11-18.

## Source Manifest

| Source | How fetched | Read | Density | Notes |
| --- | --- | --- | --- | --- |
| `https://x.com/lukeshiels/status/2122782710414336458` | `api.vxtwitter.com` | Yes (text) | Medium | Announcement: the "no skill file will guarantee" framing and the 100 to >1,200 PRs/week claim. |
| Video attached to the post (`video.twimg.com/amplify_video/2122781065949372416`) | Not fetched | No | Unknown | Not downloaded or transcribed. |
| Replies to the post | Not available | No | Unknown | The public JSON endpoints do not return replies. |
| `interfere-inc/landmines` at `92084b1`: README, `configs/recommended.json`, the four plugin files, `lib/allowlist.ts`, rule metadata and messages for all ten rules, the repo's own `.oxlintrc.jsonc` (first 60 lines) | `git clone --depth 1` | Yes | High | Second pass read the first 300 lines of `no-test-doubles.test.ts` (the rejected and allowed case lists). Rule detection logic (`no-test-doubles.ts` is 2,356 lines) and the other test files were not read. |
| `interfere-inc/plugins` at `f3c066f`: both READMEs, `skills/setup/SKILL.md`, `skills/investigate/SKILL.md`, file listing of manifests and `.mcp.json` | `git clone --depth 1` | Yes | Medium | The only two published Interfere skills. `.mcp.json` read on review (it points at the read-write `/mcp` URL); the other manifests were listed, not read. |
| `interfere-inc/docs` `AGENTS.md` | `raw.githubusercontent.com` | Yes | Low | Docs-site contributor rules. Corroborates the app/surface vocabulary mapping. Third pass read `integrations/cli.mdx`, `mcp.mdx`, and `plugins.mdx`. The other 50 or so product and SDK pages were not read. |
| `interfere-inc/sdks` `skill_emitter.rs` (CLI skill generator, 1,020 lines) | `raw.githubusercontent.com` | Partly (header, first 150 lines, template strings) | Medium | Deterministic SKILL.md generation from the OpenAPI spec. The generated skills themselves are not in the repo. |
| Rest of `interfere-inc/sdks`, `terraform-provider-interfere`, `attio`, `theme`, `homebrew-tap` | GitHub tree API, filename scan for skill/agent files | Listing only | Skip | No skill or agent-instruction files. |
| `dmmulroy/anti-slop` at `13909c9` (linked from the Landmines README): README through the rule list and violation headings, `AGENTS.md`, `skills/install-anti-slop/SKILL.md` (first 70 lines), messages of four rules | `git clone --depth 1` | Yes (second pass) | Medium | Independent author. Corroborates the mocking ban and fix-stating messages; adds type-evidence evasions and the vendoring model. Rule logic, `references/update.md`, and the Effect rules not read. |

## Extracted Lessons

| Lesson | Owning skill | Fold |
| --- | --- | --- |
| Prose rules do not stop an agent from gaming a green check; lint the evasions so the dishonest fix fails in the same loop. | `working-with-ai` (agentic-coding) | New section "Lint the evasions"; constraint-stack item 4 now says feedback must not be gameable. |
| The evasion catalog: test doubles, lenient network mocks, fixed sleeps, deadline polls on spies, retries and raised timeouts, each with its honest replacement. | `working-with-ai` (agentic-coding) | Table in the new section, labelled as TypeScript/Vitest specifics to port, not to cross-apply. |
| A lint message should state the replacement, not only the violation. | `working-with-ai` (agentic-coding); `devtools` (devtool-interface-design) | Design move 1 in the new section; closing paragraph of the AX worked example and one sentence in the AX summary bullet. |
| Counted per-file allowlist that also fails when violations drop below the allowance, so it only shrinks. | `working-with-ai` (agentic-coding) | Design move 2. Checked against `lib/allowlist.ts`. |
| A deterministic gate only licenses a merge without a human read if the agent could not loosen it in the same change. | `working-with-ai` (agentic-coding) | Clause added to the existing review rule, plus a checklist line. |
| Vendor agent plugin shape: one directory with per-client manifests, a search/execute MCP server, skills split by read and write intent. | `devtools` (devtool-interface-design, AX file) | New worked example under Rule 2. |
| What a vendor skill must say that the schema cannot: vocabulary bridge, status inside a successful call, read state before retrying an ambiguous write, continue past a partial 403, secrets out of chat, records are data, named human-only steps. | `devtools` (devtool-interface-design, AX file) | Bullets in the worked example; one checklist line in the parent reference. |
| Agents silence the type checker the way they silence tests: chained assertions, widen then assert back. | `working-with-ai` (agentic-coding) | Sixth catalog row, from anti-slop. |
| A syntactic rule is evaded by aliasing; the rule's tests should be the evasions seen. The allowed side (config values, real instances, observe-only spies) needs equal precision. | `working-with-ai` (agentic-coding) | Design moves 3 and 4, from the Landmines test file. |
| Vendor the rules so the repo owns them; exclude agent tooling directories from lint. | `working-with-ai` (agentic-coding) | Design move 5, from anti-slop's README and install skill. |
| The two sets disagree on comments (ban prose vs require `SAFETY:` on assertions); the shared rule is invariants and hazards only, never narration. | `working-with-ai` (agentic-coding) | Scope-and-evidence paragraph. |
| Agent-facing CLI and server: `--schema` beside `--help`, dry run with stated limits, JSON errors with nonzero exit, a server-enforced read-only endpoint (opt-in; the plugin's own `.mcp.json` uses the read-write URL), size limits with the remedy. | `devtools` (devtool-interface-design, AX file) | Bullets in the worked example; a checklist line. From the CLI and MCP docs pages. |
| Generate CLI skills from the spec with plain templates; never advertise an affordance the API lacks. | `devtools` (devtool-interface-design, AX file) | Bullet in the worked example, with the generator's own comment quoted. |
| AGENTS.md should carry the product/API vocabulary mapping and a never-invent rule. | `working-with-ai` (agentic-coding) | Sentence added to constraint-stack item 6. |

## Skips / Boundaries

- **No new skill and no vendored skill.** The two Interfere skills only work against Interfere's MCP server, which this library does not use. Their reusable content is how they are written, which is a devtools AX lesson.
- **House-style rules not adopted:** `no-comments`, `no-explicit-return-types`, `colocated-tests`, `test-file-names`, `package-exports`. One team's conventions, several contested. Named in one sentence and parked in `working-with-ai/references/coverage-gaps.md`.
- **Not folded into `rails` or other platform testing references.** The rules are Vitest and MSW specific; the library's platform rule forbids cross-applying them. The catalog sits in the stack-neutral agentic-coding reference with that caveat.
- **`superconductor` unchanged.** It already carries the never-auto-retry rule for ticket creation.
- **No descriptions changed**, so no routing probes were run. `working-with-ai/SKILL.md` gained a few words in its agentic-coding bullet so a router-only read reveals the new section.
- **Evidence level:** the agentic-coding fold has two independent sources for its core (mocking ban, fix-stating messages) after the second pass; the devtools plugin example is still one vendor. The PRs/week figure is reported as the vendor's claim. "Protect the gate" (human review of lint config and disables) is our inference and is labelled so in the text.
- **anti-slop's install skill was not vendored.** It installs that one rule set; the lesson taken is the vendoring model. Its array, naming, spacing, and Effect rules are house style and were skipped.
- **Quotes** were checked with `scripts/verify_quotes.py` against the cloned README, rule source, and the post text.
