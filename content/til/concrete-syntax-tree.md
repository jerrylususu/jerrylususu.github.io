---
title: Concrete Syntax Tree 具体语法树
date: 2025-04-11T16:59:46.516Z
---

在阅读一个用 LLM 给 Python 加 docstring 的工具`llm-docsmith`的创作笔记[^llm-docsmith]时，首次了解到了 Concrete Syntax Tree 具体语法树这个概念（之前只知道 AST 抽象语法树）。

搜索了一些相关资料，看起来可以按照抽象层级从低到高这样排序：
- 源代码：抽象层级最低，信息最丰富
- CST：抽象层级略高（有语言 grammer 能有的全部信息），信息较为丰富，但是视解析器可能丢失一些语言 grammer 没有的信息（例如缩进）
- AST：抽象层级最高，只含有相对必要的信息（例如 `(a+b)` 的左右括号在 CST 里存在，但是 AST 里没有，因为可以通过 AST 树上节点的父子关系推断出来。）

大部分时候我们所需要的是 AST （例如实际 eval 某个程序），解析器实现则基本可以分为(1)源代码->AST，(2)源代码->CST->AST两种。（注意 CST->AST 可能不是 trivial 的，需要一些复杂的转换操作。）但是如果你想重构/格式化代码而不影响其他现存代码，CST 里包含的丰富信息就很重要了，这意味着可以在修改树结构之后，再重新用 CST 生成源代码，且对于未修改的 CST 部分，生成的代码和原始输入的代码（基本）一致。

对于 Python，libcst[^libcst] 实现了最精确的解析，可以无损从 CST 转换为原始代码（含缩进/空格/注释）；对于其他语言，则可以考虑用通用的 tree-sitter[^tree-sitter]，其实现了多个语言的 CST 解析器（但我似乎还没太弄清楚是否能像 libcst 那样精确）。

相关链接：
- https://eli.thegreenplace.net/2009/02/16/abstract-vs-concrete-syntax-trees/ （一篇 AST vs CST 的深入对比）
- https://zed.dev/blog/syntax-aware-editing (tree-sitter 的作者也是 zed 的作者？）
- https://marketplace.visualstudio.com/items?itemName=ms-vscode.anycode （在语言服务不可用的时候，VS Code 会用 tree-sitter 来实现基本的语言理解，支持 outline，jump to symbol 等功能）


[^llm-docsmith]: llm-docsmith blog: https://mathpn.com/posts/llm-docsmith/

[^libcst]: libcst: https://libcst.readthedocs.io/en/latest/why_libcst.html

[^tree-sitter]: tree-sitter: https://tree-sitter.github.io/tree-sitter/7-playground.html