#!/usr/bin/env python3
"""Add OINK type/cascade front matter to the ported content tree."""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent / "content"

SECTIONS = ["posts", "share", "til", "archive"]
SECTION_BLOCK = "type: blog\ncascade:\n  type: blog\n"
STANDALONE_BLOCK = "type: blog\ncomments: false\n"

HEAD = re.compile(r"^\ufeff?\s*---\r?\n", re.MULTILINE)


def insert(path: pathlib.Path, block: str) -> None:
    text = path.read_text(encoding="utf-8")
    if "type: blog" in text:
        print(f"skip (already typed): {path}")
        return
    m = HEAD.match(text)
    if not m:
        raise SystemExit(f"no front matter in {path}")
    patched = text[: m.end()] + block + text[m.end() :]
    path.write_text(patched, encoding="utf-8")
    print(f"patched: {path}")


for section in SECTIONS:
    for name in ("_index.md", "_index.en.md"):
        p = ROOT / section / name
        if p.exists():
            insert(p, SECTION_BLOCK)

for name in ("about.md", "project.md"):
    p = ROOT / name
    if p.exists():
        insert(p, STANDALONE_BLOCK)
