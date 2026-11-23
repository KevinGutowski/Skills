#!/usr/bin/env bash
# Test double for agent-browser. Logs each call to $FAKE_AB_LOG and fails the subcommand
# named in $FAKE_AB_FAIL. Used by test_cls_wrapper.py; never installed.
printf '%s\n' "$*" >> "$FAKE_AB_LOG"
if [ "${1:-}" = "session" ]; then echo "cls-0123456789ab"; exit 0; fi
sub=""
for a in "$@"; do case "$a" in open|wait|eval|close) sub="$a"; break ;; esac; done
[ -n "${FAKE_AB_FAIL:-}" ] && [ "$sub" = "$FAKE_AB_FAIL" ] && { echo "boom" >&2; exit 1; }
if [ "$sub" = "eval" ]; then if [ -n "${FAKE_AB_STDIN:-}" ]; then cat > "$FAKE_AB_STDIN"; else cat >/dev/null; fi; default_eval='{"cls": 0, "good": true}'; printf '%s\n' "${FAKE_AB_EVAL:-$default_eval}"; fi
exit 0
