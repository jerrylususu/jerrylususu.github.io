---
title: 用 PATH 里的脚本是更好的别名
date: 2025-03-06T14:10:10.642Z
---

我自己的 .bashrc 里有不少小工具，但是要每次改起来得写 shell script 着实烦人（即使能用 LLM 写，也免不了来回调试几次才能满意）。读到这篇文章，我才意识到原来可以写脚本放到 script 里，还有一些额外的优势（不用手动 source 重载、用 shell script 之外的任何语言、各种 shell 都能用）。


src: https://evanhahn.com/why-alias-is-my-last-resort-for-aliases/