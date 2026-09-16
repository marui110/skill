#!/usr/bin/env python3
"""Check every installed skill is mentioned in SKILL_ROUTER or agent workflow rules."""
from __future__ import annotations

import re
import sys
from pathlib import Path

HOME = Path.home()
SKILL_ROOT = HOME / ".claude" / "skills"
ROUTER = HOME / "Documents" / "code" / "skill" / "SKILL_ROUTER.md"
WORKFLOW = HOME / ".cursor" / "rules" / "global-agent-workflow.mdc"
MANIFEST = HOME / ".cursor" / "rules" / "global-agent-manifest.mdc"


def runtime_skills() -> list[str]:
    out: list[str] = []
    if not SKILL_ROOT.exists():
        return out
    for p in SKILL_ROOT.iterdir():
        if p.name.startswith("."):
            continue
        skill = p / "SKILL.md"
        if not skill.exists() and p.is_symlink():
            try:
                skill = p.resolve() / "SKILL.md"
            except Exception:
                continue
        if skill.exists():
            out.append(p.name)
    return sorted(set(out))


def main() -> int:
    texts: list[str] = []
    for path in (ROUTER, WORKFLOW, MANIFEST):
        if path.exists():
            texts.append(path.read_text(encoding="utf-8", errors="replace"))
    combined = "\n".join(texts)
    mentioned = set(re.findall(r"`([a-z][a-z0-9-]{2,})`", combined))
    runtime = runtime_skills()
    uncovered = [n for n in runtime if n not in mentioned]
    print(
        f"runtime={len(runtime)} covered={len(runtime) - len(uncovered)} "
        f"uncovered={len(uncovered)}"
    )
    for n in uncovered:
        print(f"  MISSING {n}")
    return 1 if uncovered else 0


if __name__ == "__main__":
    sys.exit(main())
