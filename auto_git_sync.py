#!/usr/bin/env python3
import subprocess
import time
from datetime import datetime
from pathlib import Path

REPO_DIR = Path(__file__).resolve().parent
REMOTE = "origin"
BRANCH = "main"
POLL_SECONDS = 10


def run_git(*args: str) -> tuple[int, str, str]:
    result = subprocess.run(
        ["git", *args],
        cwd=str(REPO_DIR),
        capture_output=True,
        text=True,
    )
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def has_changes() -> bool:
    code, out, _ = run_git("status", "--porcelain")
    return code == 0 and bool(out.strip())


def sync_once() -> None:
    if not has_changes():
        return

    run_git("add", "-A")

    code, _, _ = run_git("diff", "--cached", "--quiet")
    if code == 0:
        return

    message = f"Auto-sync {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    code, _, err = run_git("commit", "-m", message)
    if code != 0:
        if "nothing to commit" in err.lower():
            return
        print(f"Commit failed: {err}")
        return

    code, out, err = run_git("pull", "--rebase", REMOTE, BRANCH)
    if code != 0:
        print(f"Pull failed: {out or err}")
        return

    code, out, err = run_git("push", REMOTE, BRANCH)
    if code != 0:
        print(f"Push failed: {out or err}")
        return

    print(f"Pushed successfully: {out or 'No output'}")


def main() -> None:
    print(f"Watching repository: {REPO_DIR}")
    while True:
        try:
            sync_once()
        except Exception as exc:
            print(f"Auto-sync error: {exc}")
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
