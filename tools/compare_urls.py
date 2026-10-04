#!/usr/bin/env python3
"""Compare the OINK rebuild's page URLs against the live-site baseline."""
import pathlib
import urllib.parse

BASE = pathlib.Path("/home/jerrylu/260923-blog-rebuild")
SITE = BASE / "blog-oink"

# --- baseline: the two live sitemaps -------------------------------------
baseline = set()
for name in ("zh-urls.txt", "en-urls.txt"):
    for line in (BASE / name).read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line:
            baseline.add(urllib.parse.unquote(line))

# --- generated: every HTML page in public/ -------------------------------
generated = set()
for path in (SITE / "public").rglob("*.html"):
    rel = path.relative_to(SITE / "public")
    parts = list(rel.parts)
    if parts[-1] != "index.html":
        continue
    url = "/" + "/".join(parts[:-1])
    url = url.rstrip("/") + "/"
    if url == "//":
        url = "/"
    # print output is a relocation of a real page, not a target the old site
    # ever served; report on it separately.
    if "/_print/" in url or url.startswith("/_print/"):
        continue
    generated.add(urllib.parse.unquote(url))

missing = sorted(baseline - generated)
extra = sorted(generated - baseline)

print(f"baseline URLs : {len(baseline)}")
print(f"generated URLs: {len(generated)}")
print(f"identical     : {len(baseline & generated)}")
print()
print(f"--- MISSING ({len(missing)}) : live serves them, the rebuild does not ---")
for u in missing:
    print("   ", u)
print()
print(f"--- EXTRA ({len(extra)}) : the rebuild adds them ---")
for u in extra:
    print("   ", u)
