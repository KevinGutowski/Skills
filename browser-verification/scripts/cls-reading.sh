#!/usr/bin/env bash
# One cold layout-shift reading with agent-browser. Fails closed.
#
#   bash cls-reading.sh --url URL (--ready 'JS expression' | --ready-selector 'CSS selector')
#                       [--label NAME] [--frame SELECTOR] [--settle MS] [--timeout MS]
#
# --ready   Required. A JavaScript expression that is true only once the content under
#           test has rendered, e.g. "document.querySelectorAll('[data-review]').length > 0".
#           A heading or container already in the HTML is true at once and hides the shift.
#           With --frame it is evaluated inside that frame's document, not the host's, which
#           needs eval and is blocked by a frame Content-Security-Policy without 'unsafe-eval'.
# --ready-selector  Alternative to --ready: a CSS selector that matches only once the content
#           under test has rendered. Needs no eval, so it also works in a frame with a strict CSP.
# --frame   Score a same-origin iframe (CSS selector in the host page) instead of the host.
# --label   Suffix for the session name (before / after). Default: reading.
# CLS_RUN   Set once per verification pass so concurrent passes do not share a browser.
#
# Prints the reading as JSON and exits 0, or prints UNVERIFIED: <reason> and exits 1.
# A reading is evidence about one cold load of one document. It is not a verdict.
#
# What this script prints is meant to be quoted in reports, so it never echoes its inputs:
# the URL is shown as scheme, host, port and path only (no credentials, query or fragment), and the frame selector, readiness expression and
# readiness selector (which can contain URLs with tokens) are described, never repeated.
set -u
unverified() { echo "UNVERIFIED: $1"; exit 1; }
url=""; ready=""; ready_selector=""; label="reading"; frame=""; settle=1000; timeout=15000
while [ $# -gt 0 ]; do
  case "$1" in
    --url|--ready|--ready-selector|--label|--frame|--settle|--timeout)
      [ $# -ge 2 ] || unverified "option $1 needs a value"
      case "$1" in
        --url) url="$2" ;; --ready) ready="$2" ;; --ready-selector) ready_selector="$2" ;; --label) label="$2" ;;
        --frame) frame="$2" ;; --settle) settle="$2" ;; --timeout) timeout="$2" ;;
      esac
      shift 2 ;;
    --*) unverified "unknown option ${1%%=*}" ;;
    *) unverified "unexpected positional argument; every value needs its option (--url, --ready, ...)" ;;
  esac
done
[ -n "$url" ] || unverified "--url is required"
if [ -n "$ready" ] && [ -n "$ready_selector" ]; then unverified "give --ready or --ready-selector, not both"; fi
[ -n "$ready$ready_selector" ] || unverified "--ready or --ready-selector is required; without a readiness condition the reading can be taken before the content exists"
case "$settle$timeout" in *[!0-9]*) unverified "--settle and --timeout take milliseconds as whole numbers" ;; esac
case "$label" in *[!A-Za-z0-9_-]*|"") unverified "--label may contain only letters, digits, hyphens and underscores" ;; esac
command -v agent-browser >/dev/null 2>&1 || unverified "agent-browser is not installed"
command -v python3 >/dev/null 2>&1 || unverified "python3 is needed to quote the frame selector and readiness condition"
here="$(cd "$(dirname "$0")" && pwd)"
# Shown form of the URL: scheme, host, port and path, rebuilt from a parse. Userinfo
# (user:password@), query string and fragment are never printed.
shown_url="$(printf '%s' "$url" | python3 -c 'import sys
from urllib.parse import urlsplit
try:
    u = urlsplit(sys.stdin.read().strip())
    host = u.hostname or ""
    if ":" in host: host = "[" + host + "]"
    port = ":" + str(u.port) if u.port else ""
    print(u.scheme + "://" + host + port + u.path if u.scheme and host else "the given URL")
except Exception:
    print("the given URL")' 2>/dev/null)"
[ -n "$shown_url" ] || shown_url="the given URL"
json() { printf '%s' "$1" | python3 -c 'import json,sys; sys.stdout.write(json.dumps(sys.stdin.read()))'; }
run="${CLS_RUN:-$(date +%s)-$$}"
base="$(agent-browser session id --scope worktree --prefix cls 2>/dev/null)" && [ -n "$base" ] || unverified "could not derive a session name"
session="$base-$run-$label"
ab() { agent-browser --session "$session" "$@"; }
finish() { ab close >/dev/null 2>&1; exit "$1"; }
fail() { echo "UNVERIFIED: $1"; finish 1; }

# With --frame, the readiness condition runs in the frame's own document. A host element
# that happens to match would otherwise release the wait before the frame's content exists.
if [ -n "$ready_selector" ]; then shown_ready="the --ready-selector"; else shown_ready="the --ready expression"; fi
if [ -n "$ready_selector" ]; then
  if [ -n "$frame" ]; then
    wait_expr="(function(){var f=document.querySelector($(json "$frame"));try{return !!(f&&f.contentDocument&&f.contentDocument.querySelector($(json "$ready_selector")));}catch(e){return false;}})()"
  else
    wait_expr="!!document.querySelector($(json "$ready_selector"))"
  fi
elif [ -n "$frame" ]; then
  wait_expr="(function(){var f=document.querySelector($(json "$frame"));if(!f)return false;try{return !!f.contentWindow.eval($(json "$ready"));}catch(e){return false;}})()"
else
  wait_expr="$ready"
fi
# Why a frame condition could not run, for the UNVERIFIED message.
frame_diagnosis() {
  [ -n "$frame" ] && [ -n "$ready" ] || return 0
  d="$(printf '%s' "(function(){var f=document.querySelector($(json "$frame"));if(!f)return 'no element matches the --frame selector';try{f.contentWindow.eval('1');return '';}catch(e){return e&&e.name==='EvalError'?'the frame blocks eval (Content-Security-Policy); use --ready-selector':String(e&&e.name);}})()" | ab eval --stdin 2>/dev/null | tr -d '"\n')"
  [ -n "$d" ] && printf ' (%s)' "$d"
  return 0
}

# The collector is registered before the first navigation so it sees every layout shift; the
# browser's own buffered history is limited and silently loses later shifts on a busy page.
ab --args "--disk-cache-size=1" --init-script "$here/cls-collector.js" open "$url" >/dev/null 2>&1 || fail "navigation to $shown_url failed"
ab wait --fn "$wait_expr" --timeout "$timeout" >/dev/null 2>&1 || fail "$shown_ready never became true within ${timeout} ms${frame:+ inside the --frame element}$(frame_diagnosis)"
ab wait "$settle" >/dev/null 2>&1 || fail "settle wait failed"
# The scorer is one enclosed function; the frame selector replaces its placeholder argument,
# so nothing is defined on the page.
payload="$(CLS_FRAME_JSON="$(json "$frame")" python3 -c 'import os,sys; sys.stdout.write(open(sys.argv[1], encoding="utf-8").read().replace("\"__CLS_FRAME_SELECTOR__\"", os.environ["CLS_FRAME_JSON"]))' "$here/cls.js")" || fail "could not prepare the scorer"
out="$(printf '%s' "$payload" | ab eval --stdin 2>&1)" || fail "scoring failed"
case "$out" in
  *'"error"'*) fail "$(printf '%s' "$out" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("error", "the scorer reported an error"))
except Exception: print("the scorer reported an error")')" ;;
  *'"cls"'*) ;;
  *) fail "unexpected scorer output" ;;
esac
printf '%s\n' "$out"
if [ -n "$frame" ]; then scored="the --frame document inside"; else scored="the top document at"; fi
echo "conditions: cold launch (disk cache 1 byte), scored $scored $shown_url, waited for $shown_ready, settled ${settle} ms, session $session" >&2
finish 0
