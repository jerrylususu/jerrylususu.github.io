---
title: Think Tool - 用 Noop Tool Call 让 LLM 记录自己的思考
date: 2025-03-22T12:28:12.361Z
---

给可用工具列表新增一个 `think` 工具，只有一个必填参数 `thought`；这个工具什么都不做，唯一的作用就是让 thought 可以在后续对话中被 tool_call 块携带。

因为是标准的 tool call，所以对于非推理模型也能用。看起来似乎在 prompt 对应调优过的情况下表现最佳，但是单独用似乎也不错。值得一试。

src: https://www.anthropic.com/engineering/claude-think-tool

via: https://simonwillison.net/2025/Mar/21/the-think-tool/#atom-everything