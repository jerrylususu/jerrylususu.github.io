---
title: 用 apt-file search 找缺失的文件属于哪个包
date: 2025-05-26T14:46:35.529Z
---

虽然搜索/问 LLM 可能更快些，但是原来还可以这样找缺失的文件在哪个软件包里。

```bash
$ apt install -q --yes apt-file && apt-file update
$ apt-file search pcre2posix.h
libpcre2-dev: /usr/include/pcre2posix.h
$ apt-file search libpcre2-posix.so
libpcre2-dev: /usr/lib/x86_64-linux-gnu/libpcre2-posix.so
libpcre2-posix3: /usr/lib/x86_64-linux-gnu/libpcre2-posix.so.3
libpcre2-posix3: /usr/lib/x86_64-linux-gnu/libpcre2-posix.so.3.0.6
```

via: https://optimizedbyotto.com/post/debian-packaging-from-git/