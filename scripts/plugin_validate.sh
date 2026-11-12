#!/usr/bin/env bash
# Run `claude plugin validate` over the skills in this repo.
#
# The CLI wants a directory named `skills` that holds only skill folders, and it
# does not follow symlinks, so this copies each tracked skill directory into a
# temporary `skills/` directory first.
# Skips (exit 0) when the Claude Code CLI is not installed.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v claude >/dev/null 2>&1; then
  echo "claude CLI not found; skipping plugin validate"
  exit 0
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir "$tmp/skills"

git ls-files '*/SKILL.md' | while read -r skill_md; do
  skill="$(dirname "$skill_md")"
  cp -R "$skill" "$tmp/skills/$skill"
done

claude plugin validate "$tmp/skills"
