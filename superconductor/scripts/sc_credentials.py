#!/usr/bin/env python3
"""Per-device credential lookup for the Superconductor API helper.

Kept separate from the API workflow so another secure platform adapter
(Linux Secret Service, Windows Credential Manager, ...) can be added by
registering one function in ``ADAPTERS`` without touching ``sc_api.py``.

Rules every adapter must follow:
- Return the token string or raise ``CredentialError``.
- Never print, log, cache, or put the token in an exception message.
- Never pass the token as a command-line argument.
- Never create, delete, or rotate credentials.
"""

from __future__ import annotations

import getpass
import os
import subprocess
import sys
from typing import Callable

KEYCHAIN_SERVICE = "com.superconductor.api"
TOKEN_PREFIX = "sc_"  # Live docs (verified 2026-11-06): "Tokens start with sc_".


class CredentialError(RuntimeError):
    """Credential is missing or unusable. Messages never contain the token."""


MACOS_SETUP = (
    "No Superconductor token found in the login Keychain "
    f"(service '{KEYCHAIN_SERVICE}', account '$USER').\n"
    "Set one up on this device (do not paste the token into chat):\n"
    "  1. Superconductor > Account Settings > Developer > Personal access tokens:\n"
    "     create a token named for this device, e.g. 'Codex on <device>'.\n"
    "  2. In your own terminal, run the command below and paste the token at the\n"
    "     hidden prompt (the trailing -w with no value makes `security` prompt):\n"
    f'     security add-generic-password -U -a "$USER" -s "{KEYCHAIN_SERVICE}" -w\n'
    "  3. Re-run the request."
)


def _current_user() -> str:
    return os.environ.get("USER") or getpass.getuser()


def macos_keychain(run: Callable[..., subprocess.CompletedProcess] = subprocess.run) -> str:
    """Read the token from the login Keychain via `security` (no token in argv)."""
    cmd = [
        "security",
        "find-generic-password",
        "-a",
        _current_user(),
        "-s",
        KEYCHAIN_SERVICE,
        "-w",
    ]
    try:
        result = run(cmd, capture_output=True, text=True, check=False, timeout=30)
    except FileNotFoundError as exc:
        raise CredentialError("macOS `security` tool not found; cannot read the Keychain.") from exc
    except subprocess.TimeoutExpired as exc:
        raise CredentialError(
            "Timed out reading the Keychain (a Keychain access prompt may be waiting). "
            "Approve it on the device and re-run."
        ) from exc
    if result.returncode != 0:
        # 44 = errSecItemNotFound. Any other failure (locked keychain, denied
        # access) gets the same setup guidance plus the exit code; stderr is
        # not echoed because it is not needed and should never hold secrets.
        if result.returncode == 44:
            raise CredentialError(MACOS_SETUP)
        raise CredentialError(
            f"Could not read the Keychain item (security exit {result.returncode}). "
            "Unlock the login Keychain or allow access, then re-run.\n\n" + MACOS_SETUP
        )
    token = result.stdout.strip()
    if not token:
        raise CredentialError(MACOS_SETUP)
    if not token.startswith(TOKEN_PREFIX):
        raise CredentialError(
            f"The Keychain item '{KEYCHAIN_SERVICE}' does not look like a Superconductor "
            f"token (expected prefix '{TOKEN_PREFIX}'). Replace it with step 2 below.\n\n"
            + MACOS_SETUP
        )
    return token


ADAPTERS: dict[str, Callable[[], str]] = {
    "darwin": macos_keychain,
}


def get_token(platform: str | None = None) -> str:
    platform = platform or sys.platform
    adapter = ADAPTERS.get(platform)
    if adapter is None:
        raise CredentialError(
            f"No secure credential adapter for platform '{platform}' yet. "
            "Supported: macOS login Keychain. Add an adapter in sc_credentials.py "
            "rather than putting a token in files, env dumps, or command arguments."
        )
    return adapter()
