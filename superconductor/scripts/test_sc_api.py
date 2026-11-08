#!/usr/bin/env python3
"""Offline tests for sc_api.py. No live token or network: HTTP and Keychain are stubbed.

Run: python3 -m unittest discover -s superconductor/scripts -p 'test_*.py'
"""

from __future__ import annotations

import contextlib
import http.server
import threading
import io
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import sc_api  # noqa: E402
import sc_credentials  # noqa: E402

FAKE_TOKEN = "sc_test_SECRET_do_not_leak_123"

USER = {"id": "U1", "name": "Ada", "email": "ada@example.com"}
CREATED = {
    "id": "d7KDGFMKkzbq", "friendly_id": "142",
    "url": "https://www.superconductor.com/tickets/d7KDGFMKkzbq",
    "title": "Retry failed webhook deliveries", "status": "idle",
    "implementation_launches": [{"profile": "default"}],
}


def project(pid: str, name: str, ws: str = "W1") -> dict:
    return {"id": pid, "name": name, "url": f"https://www.superconductor.com/projects/{pid}",
            "created_at": "2026-10-14T16:02:11Z", "workspace": {"id": ws, "name": f"Workspace {ws}"}}


def ticket(tid: str, title: str, description: str) -> dict:
    return {"id": tid, "friendly_id": "1", "url": f"https://www.superconductor.com/tickets/{tid}",
            "title": title, "status": "idle", "description": description,
            "created_at": "2026-11-06T00:00:00Z", "last_activity_at": "2026-11-06T00:00:00Z",
            "creator": None}


class StubTransport:
    """Records every call; replies from a queue of (status, body) or exceptions."""

    def __init__(self, *responses):
        self.responses = list(responses)
        self.calls: list[dict] = []

    def __call__(self, method, url, headers, body, timeout):
        self.calls.append({"method": method, "url": url, "headers": dict(headers),
                           "body": json.loads(body) if body else None})
        reply = self.responses.pop(0)
        if isinstance(reply, Exception):
            raise reply
        status, payload = reply
        raw = payload if isinstance(payload, bytes) else json.dumps(payload).encode()
        return status, raw


def run_cli(argv, transport, stdin: str = "", token_provider=lambda: FAKE_TOKEN):
    client = sc_api.Client(token_provider=token_provider, transport=transport)
    out, err = io.StringIO(), io.StringIO()
    old_stdin = sys.stdin
    sys.stdin = io.StringIO(stdin)
    try:
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            code = sc_api.run(argv, client=client)
    finally:
        sys.stdin = old_stdin
    return code, out.getvalue(), err.getvalue()


class CredentialTests(unittest.TestCase):
    def fake_security(self, returncode: int, stdout: str = ""):
        seen = {}

        def run(cmd, **kwargs):
            seen["cmd"] = cmd
            return subprocess.CompletedProcess(cmd, returncode, stdout=stdout, stderr="")
        return run, seen

    def test_missing_keychain_item_gives_setup_without_secret(self):
        run, seen = self.fake_security(44)
        with self.assertRaises(sc_credentials.CredentialError) as ctx:
            sc_credentials.macos_keychain(run=run)
        message = str(ctx.exception)
        self.assertIn("security add-generic-password", message)
        self.assertIn("-w", message)
        self.assertIn("com.superconductor.api", message)
        self.assertEqual(seen["cmd"][:2], ["security", "find-generic-password"])
        self.assertEqual(seen["cmd"][-1], "-w")  # read with -w, never pass a secret in argv

    def test_missing_credential_cli_fails_before_any_request(self):
        transport = StubTransport()

        def missing():
            raise sc_credentials.CredentialError(sc_credentials.MACOS_SETUP)

        code, out, err = run_cli(["whoami"], transport, token_provider=missing)
        self.assertEqual(code, sc_api.EXIT_CREDENTIAL)
        self.assertEqual(out, "")
        self.assertEqual(transport.calls, [])
        self.assertIn("security add-generic-password", json.loads(err)["error"]["message"])

    def test_found_token_is_returned_but_wrong_shape_is_not_echoed(self):
        run, _ = self.fake_security(0, FAKE_TOKEN + "\n")
        self.assertEqual(sc_credentials.macos_keychain(run=run), FAKE_TOKEN)
        run, _ = self.fake_security(0, "not-a-token-SECRET\n")
        with self.assertRaises(sc_credentials.CredentialError) as ctx:
            sc_credentials.macos_keychain(run=run)
        self.assertNotIn("SECRET", str(ctx.exception))

    def test_unsupported_platform_fails_closed(self):
        with self.assertRaises(sc_credentials.CredentialError):
            sc_credentials.get_token(platform="plan9")


class ReadTests(unittest.TestCase):
    def test_whoami_returns_structured_user_and_never_prints_token(self):
        transport = StubTransport((200, USER))
        code, out, err = run_cli(["whoami"], transport)
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(out), USER)
        call = transport.calls[0]
        self.assertEqual(call["url"], "https://www.superconductor.com/api/v1/user")
        self.assertEqual(call["headers"]["Authorization"], f"Bearer {FAKE_TOKEN}")
        self.assertNotIn(FAKE_TOKEN, out + err)

    def test_tickets_query_and_url_id(self):
        page = {"data": [ticket("T1", "A", "desc")], "next_cursor": None}
        transport = StubTransport((200, page))
        code, out, _ = run_cli(["tickets", "https://www.superconductor.com/projects/P1",
                                "--sort", "last_activity", "--include-implementations",
                                "--limit", "5"], transport)
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(out)["data"][0]["id"], "T1")
        url = transport.calls[0]["url"]
        self.assertTrue(url.startswith("https://www.superconductor.com/api/v1/projects/P1/tickets?"))
        self.assertIn("sort=last_activity", url)
        self.assertIn("include=implementations", url)

    def test_resolve_project_refuses_to_guess(self):
        page = {"data": [project("P1", "Billing"), project("P2", "billing", "W2"),
                         project("P3", "Billing service")], "next_cursor": None}
        code, _, err = run_cli(["resolve-project", "Billing"], StubTransport((200, page)))
        self.assertEqual(code, sc_api.EXIT_API)
        error = json.loads(err)["error"]
        self.assertEqual(error["kind"], "ambiguous_project")
        self.assertEqual({c["id"] for c in error["candidates"]}, {"P1", "P2"})

        code, _, err = run_cli(["resolve-project", "Billing svc"], StubTransport((200, page)))
        self.assertEqual(json.loads(err)["error"]["kind"], "project_not_found")

        code, out, _ = run_cli(["resolve-project", "Billing service"], StubTransport((200, page)))
        self.assertEqual((code, json.loads(out)["id"]), (0, "P3"))

    def test_documented_error_is_actionable(self):
        body = {"error": {"code": "not_found", "message": "Not found"}}
        code, _, err = run_cli(["chat", "C1"], StubTransport((404, body)))
        self.assertEqual(code, sc_api.EXIT_API)
        error = json.loads(err)["error"]
        self.assertEqual(error["status"], 404)
        self.assertIn("Re-resolve", error["message"])
        self.assertNotIn(FAKE_TOKEN, err)

    def test_unexpected_shape_fails_clearly(self):
        drifted = {"id": "C1", "url": "https://x", "title": None}  # missing required fields
        code, out, err = run_cli(["chat", "C1"], StubTransport((200, drifted)))
        self.assertEqual(code, sc_api.EXIT_DRIFT)
        self.assertEqual(out, "")
        error = json.loads(err)["error"]
        self.assertEqual(error["kind"], "schema_drift")
        self.assertIn("status", error["message"])
        self.assertIn("openapi", error["docs"])

    def test_non_json_and_undocumented_status_fail_closed(self):
        code, _, err = run_cli(["whoami"], StubTransport((200, b"<html>")))
        self.assertEqual(code, sc_api.EXIT_DRIFT)
        code, _, err = run_cli(["whoami"], StubTransport((302, b"")))
        self.assertEqual((code, json.loads(err)["error"]["kind"]),
                         (sc_api.EXIT_DRIFT, "unexpected_status"))


class CreateTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.desc_path = Path(self.tmp.name) / "desc.md"
        self.description = 'Retry with backoff. $(rm -rf /) `whoami` "quoted"\n'
        self.desc_path.write_text(self.description)

    def tearDown(self):
        self.tmp.cleanup()

    def test_create_requires_explicit_authorization(self):
        transport = StubTransport()
        code, _, err = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path)], transport)
        self.assertEqual(code, sc_api.EXIT_API)
        self.assertEqual(transport.calls, [])
        self.assertEqual(json.loads(err)["error"]["kind"], "not_authorized")

    def test_create_sends_intended_payload_once_with_launch(self):
        transport = StubTransport((201, CREATED))
        code, out, err = run_cli(["create-ticket", "P1", "--title", "Retry failed webhook deliveries",
                                  "--description-file", str(self.desc_path), "--launch-default",
                                  "--confirm-external-write"], transport)
        self.assertEqual(code, 0, err)
        self.assertEqual(len(transport.calls), 1)
        call = transport.calls[0]
        self.assertEqual(call["method"], "POST")
        self.assertEqual(call["url"], "https://www.superconductor.com/api/v1/projects/P1/tickets")
        self.assertEqual(call["body"], {
            "ticket": {"title": "Retry failed webhook deliveries", "description": self.description},
            "implementations": [{"profile": "default"}],
        })
        result = json.loads(out)
        self.assertEqual(result["ticket"]["url"], CREATED["url"])
        self.assertEqual(result["implementation_launches"], [{"profile": "default", "launched": True}])
        self.assertNotIn(FAKE_TOKEN, out + err)
        self.assertNotIn("Authorization", out + err)

    def test_create_from_stdin_without_title_or_launch(self):
        created = dict(CREATED, title=None, implementation_launches=[])
        transport = StubTransport((201, created))
        code, out, _ = run_cli(["create-ticket", "P1", "--description-file", "-",
                                "--confirm-external-write"], transport, stdin=self.description)
        self.assertEqual(code, 0)
        self.assertEqual(transport.calls[0]["body"], {"ticket": {"description": self.description}})
        self.assertFalse(json.loads(out)["implementation_requested"])

    def test_launch_error_is_reported_not_hidden(self):
        created = dict(CREATED, implementation_launches=[{"profile": "default", "launch_error": "No agent"}])
        code, out, _ = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path),
                                "--launch-default", "--confirm-external-write"],
                               StubTransport((201, created)))
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(out)["implementation_launches"][0],
                         {"profile": "default", "launched": False, "launch_error": "No agent"})

    def test_network_ambiguity_does_not_retry(self):
        transport = StubTransport(sc_api.TransportError("TimeoutError: timed out"), (201, CREATED))
        code, out, err = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path),
                                  "--confirm-external-write"], transport)
        self.assertEqual(code, sc_api.EXIT_AMBIGUOUS)
        self.assertEqual(len(transport.calls), 1)
        self.assertEqual(out, "")
        self.assertIn("check-create", json.loads(err)["error"]["message"])

    def test_server_error_and_bad_201_are_ambiguous(self):
        for reply in [(502, b"bad gateway"), (201, {"id": "x"}), (201, b"not json")]:
            transport = StubTransport(reply, (201, CREATED))
            code, _, err = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path),
                                    "--confirm-external-write"], transport)
            self.assertEqual(code, sc_api.EXIT_AMBIGUOUS, reply)
            self.assertEqual(len(transport.calls), 1)

    def test_422_is_definitive_failure(self):
        body = {"error": {"code": "invalid_ticket", "message": "Description can't be blank"}}
        code, _, err = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path),
                                "--confirm-external-write"], StubTransport((422, body)))
        self.assertEqual(code, sc_api.EXIT_API)
        error = json.loads(err)["error"]
        self.assertFalse(error["created"])
        self.assertEqual(error["api_error"]["code"], "invalid_ticket")

    def test_check_create_finds_matching_recent_ticket(self):
        page = {"data": [ticket("T9", "Other", "nope"), ticket("T1", "Retry", self.description)],
                "next_cursor": None}
        transport = StubTransport((200, page))
        code, out, _ = run_cli(["check-create", "P1", "--title", "Retry",
                                "--description-file", str(self.desc_path)], transport)
        self.assertEqual(code, 0)
        self.assertEqual([m["id"] for m in json.loads(out)["matches"]], ["T1"])
        self.assertEqual(transport.calls[0]["method"], "GET")
        self.assertIn("sort=created", transport.calls[0]["url"])


class HardeningTests(unittest.TestCase):
    """Regression tests for credential leaks, truncated bodies, and mistyped fields."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.desc_path = Path(self.tmp.name) / "desc.md"
        self.desc_path.write_text("Do the thing.")

    def tearDown(self):
        self.tmp.cleanup()

    def create_argv(self, *extra):
        return ["create-ticket", "P1", "--description-file", str(self.desc_path),
                "--confirm-external-write", *extra]

    def test_token_with_embedded_newline_is_rejected_without_leaking(self):
        bad = "sc_SECRETPART\nInjected: SECRETTAIL"
        run = lambda cmd, **kw: subprocess.CompletedProcess(cmd, 0, stdout=bad + "\n", stderr="")
        with self.assertRaises(sc_credentials.CredentialError) as ctx:
            sc_credentials.macos_keychain(run=run)
        self.assertNotIn("SECRET", str(ctx.exception))

        # Any provider is re-validated by the client before headers are built,
        # and the real urllib transport is never reached.
        def must_not_send(*args):
            raise AssertionError("request was sent")
        client = sc_api.Client(token_provider=lambda: bad, transport=must_not_send)
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            code = sc_api.run(["whoami"], client=client)
        self.assertEqual(code, sc_api.EXIT_CREDENTIAL)
        self.assertNotIn("SECRET", out.getvalue() + err.getvalue())

    def test_transport_errors_never_quote_request_data(self):
        headers = {"Authorization": "Bearer sc_SECRET\nX: y"}  # what urllib would reject
        with self.assertRaises(sc_api.TransportError) as ctx:
            sc_api.urllib_transport("GET", "https://www.superconductor.com/api/v1/user", headers, None, 1)
        self.assertNotIn("SECRET", str(ctx.exception))

    def test_mistyped_fields_fail_closed(self):
        created = dict(CREATED, id=None, url=None)
        transport = StubTransport((201, created))
        code, out, err = run_cli(self.create_argv(), transport)
        self.assertEqual((code, out), (sc_api.EXIT_AMBIGUOUS, ""))
        self.assertIn("check-create", json.loads(err)["error"]["message"])
        self.assertEqual(len(transport.calls), 1)

        page = {"data": [dict(project("P1", "x"), name=42)], "next_cursor": None}
        code, _, err = run_cli(["resolve-project", "x"], StubTransport((200, page)))
        self.assertEqual(code, sc_api.EXIT_DRIFT)
        self.assertIn("wrong type", json.loads(err)["error"]["message"])

        code, _, _ = run_cli(["whoami"], StubTransport((200, dict(USER, name=None))))
        self.assertEqual(code, 0)  # documented nullable field stays accepted

    def test_launch_count_mismatch_is_ambiguous_but_reports_ticket(self):
        for argv, launches in ((self.create_argv("--launch-default"), []),
                               (self.create_argv(), [{"profile": "default"}])):
            transport = StubTransport((201, dict(CREATED, implementation_launches=launches)))
            code, out, err = run_cli(argv, transport)
            self.assertEqual((code, out), (sc_api.EXIT_AMBIGUOUS, ""))
            error = json.loads(err)["error"]
            self.assertEqual(error["kind"], "ambiguous_launch")
            self.assertEqual(error["ticket"]["url"], CREATED["url"])
            self.assertEqual(len(transport.calls), 1)


class _TruncatingHandler(http.server.BaseHTTPRequestHandler):
    """Promises more body bytes than it sends, so the client sees IncompleteRead."""

    status = 201
    posts = 0

    def do_POST(self):
        type(self).posts += 1
        self.rfile.read(int(self.headers.get("Content-Length", 0)))
        self.send_response(self.status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", "500")
        self.end_headers()
        self.wfile.write(b'{"id": "trunc')
        self.wfile.flush()
        self.close_connection = True

    def log_message(self, *args):
        pass


class RealUrllibBoundaryTests(unittest.TestCase):
    def setUp(self):
        _TruncatingHandler.posts = 0
        self.server = http.server.HTTPServer(("127.0.0.1", 0), _TruncatingHandler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = f"http://127.0.0.1:{self.server.server_port}"
        self.tmp = tempfile.TemporaryDirectory()
        self.desc_path = Path(self.tmp.name) / "desc.md"
        self.desc_path.write_text("Do the thing.")

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.tmp.cleanup()

    def local_transport(self, method, url, headers, body, timeout):
        local = url.replace(sc_api.API_BASE, self.base)
        return sc_api.urllib_transport(method, local, headers, body, 5)

    def test_truncated_bodies_are_ambiguous_after_one_post(self):
        for status in (201, 502):
            _TruncatingHandler.status = status
            _TruncatingHandler.posts = 0
            code, out, err = run_cli(["create-ticket", "P1", "--description-file", str(self.desc_path),
                                      "--confirm-external-write"], self.local_transport)
            self.assertEqual((code, out), (sc_api.EXIT_AMBIGUOUS, ""), status)
            self.assertEqual(_TruncatingHandler.posts, 1)
            error = json.loads(err)["error"]
            self.assertEqual(error["kind"], "ambiguous_create")
            self.assertIn("check-create", error["message"])
            self.assertNotIn(FAKE_TOKEN, err)


class RedirectTests(unittest.TestCase):
    def test_redirects_are_not_followed(self):
        self.assertIsNone(sc_api._NoRedirect().redirect_request(None, None, 302, "", {}, "https://evil.example"))

    def test_bad_ids_rejected(self):
        for bad in ["../user", "https://evil.example/projects/P1", "a/b", ""]:
            with self.assertRaises(sc_api.ApiError):
                sc_api.clean_id(bad, "project_id")


if __name__ == "__main__":
    unittest.main()
