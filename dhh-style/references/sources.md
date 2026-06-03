# Source Map

Use this map when updating the DHH/Rails style guidance.

## Primary Sources

- DHH X feed: https://x.com/dhh
- DHH recent X RSS fallback: https://nitter.net/dhh/rss
- DHH World posts: https://world.hey.com/dhh
- 37signals Dev: https://dev.37signals.com/
- DHH gists: https://gist.github.com/dhh
- Rails World DHH keynotes: https://www.rubyevents.org/speakers/david-heinemeier-hansson
- Campfire source: https://github.com/basecamp/once-campfire

## Durable Code Sources

- Kamal: https://github.com/basecamp/kamal
- Lexxy: https://github.com/basecamp/lexxy
- Solid Queue: https://github.com/rails/solid_queue
- Solid Cache: https://github.com/rails/solid_cache
- Solid Cable: https://github.com/rails/solid_cable
- rubocop-rails-omakase: https://github.com/rails/rubocop-rails-omakase

## Discovery Sources

- This Week in Rails: https://world.hey.com/this.week.in.rails
- Rails changelog posts: https://rubyonrails.org/blog
- Rails PRs linked from official posts or DHH/37signals commentary

Treat discovery sources as leads. Only promote them into skill guidance after
reading the linked primary material and confirming a durable practice.

When DHH posts on X, follow any linked article, repository, video, gist, or
quoted technical thread before judging relevance. Skip political, product-launch,
work-culture, and personal posts unless they link to durable Rails, Ruby,
architecture, performance, deployment, testing, database, or tooling guidance.

## Confidence Rubric

- High: primary or near-primary source, durable practice, direct fit with the
  skill, and not just release trivia.
- Medium: useful practice but needs review, broader confirmation, or stable
  release context.
- Low: interesting context only; summarize but do not edit.

## Update Discipline

- Check `git status --short` in the skills repo before editing.
- Leave unrelated local changes and untracked archives alone.
- Prefer concise edits in existing reference files.
- Validate with `git diff --check`.
- Commit and push direct skill edits when finished.
