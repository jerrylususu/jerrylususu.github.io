---
title: simpleeval - 受限安全的 Python 表达式评估
date: 2025-05-15T14:38:06.898Z
---

- 提供了一个 Python 的简单子集，限制了高风险操作（例如指数操作在数值过大的时候也可以卡死运行环境(!)）
- 可以被放在各种需要表达式计算能力，但是又需要限制风险的场景下使用（例如拿来给 LLM 当计算器用）
- 底层用 `ast` 库解析语法树，并递归节点求值。
- 核心代码只有一个 py 文件，因此很容易嵌入。
- 需要 Python 3.9+。


src: https://github.com/danthedeckie/simpleeval

via: https://building-with-llms-pycon-2025.readthedocs.io/en/latest/tools.html