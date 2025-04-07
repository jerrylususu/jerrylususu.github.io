---
title: PocketFlow - 仅有 100 行的 LLM 工作流框架
date: 2025-04-07T13:53:17.711Z
---

起因是油管给我推送了一个 “Codebase2Tutorial” 的视频，从里面了解到了 PocketFlow 这个框架。特点如下：
- 设计精巧（用 `>>` 和 `-` 连接不同节点）
- 核心代码只有 100 行左右，可以被包含在单个文件中（让我想起了 Header-Only Lib）
- 每个节点分为 `prep`, `exec`, `post` 的设计，以及数据单独存放在 `shared`（有点像 Vue）

因为框架本身很小，让 LLM 帮助写代码的时候也可以很轻松的放在上下文中。

一个示例工作流如下（摘自官方文档）：
```py
review - "approved" >> payment
review - "needs_revision" >> revise
review - "rejected" >> finish 

revise >> review
payment >> finish

flow = Flow(start=review)
```

src: https://github.com/The-Pocket/PocketFlow/blob/main/pocketflow/__init__.py

video: https://www.youtube.com/watch?v=AFY67zOpbSo