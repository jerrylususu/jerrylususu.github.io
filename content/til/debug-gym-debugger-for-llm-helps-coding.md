---
title: debug-gym - 给 LLM 提供调试工具可以提高代码任务能力
date: 2025-04-01T14:49:50.795Z
---

自 MCP 大爆炸以来，LLM 可以做的事情被大幅扩展了（甚至是 3D 建模！）还有多少 LLM 的能力是因为没有提供足够的工具，而未能被解锁的呢？微软的这篇文章给 LLM 提供了 pdb （Python Debugger），并且（毫不意外地）发现这能提高代码任务的完成成功率。

顺带一提，其中发现相比于 `debug` 策略（从一开始就可以调用调试器），`debug(5)`（前5步禁用调试器，只能用传统方式例如加日志或者改代码运行来调试，5步之后才允许启用）的提升更多。听起来很像人类的做法，先尝试一些简单的修改，实在不行再打开调试工具慢慢查。


src: https://microsoft.github.io/debug-gym/

via: https://simonwillison.net/2025/Mar/31/debug-gym/#atom-everything