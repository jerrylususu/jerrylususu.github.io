---
title: Claude 的 Text Editor Tool
date: 2025-03-14T13:45:33.145Z
---

Claude 最近新支持了一个特殊的工具：Text Editor Tool，本质上是一组预定义的接口，让 LLM 可以实现文本编辑（不过看起来更像是为了代码编辑准备的）。具体定义的接口有 view, create, str_replace, insert, undo_edit。

文档里一些比较有趣的点：
1. view 文件的时候，可以指定特定的 range（有助于处理特别大的文件）
2. view 的时候，推荐把行号也塞进去（例如`1:import os`），这样能有助于编辑（因为 insert 需要指定行号）
3. str_replace 的时候应该只有一个精确匹配，匹配不存在或者有多个匹配都是 error

一些自己的思考：
- 对比其他基于 diff 的编辑方式（例如 cline），用行号来声明编辑范围的确会更省 token，但是也对模型能力提出了更高要求（算不对行号的话很容易导致编辑失败）。
- str_replace 只能有一个精确匹配的行为也比较诡异，且参数没有 range，感觉上对于重构似乎不太友好（例如把一个文件里的所有 var1a 换成 slight_better_name）
- 只有 create / insert，但没有 update / delete / remove？难道真就只增不减了？

这个工具具体是否有用，还是等各路开发者的验证了。毕竟官方只定义了接口，具体实现当然是“留作练习”了。 

src: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/text-editor-tool

via: https://simonwillison.net/2025/Mar/13/anthropic-api-text-editor-tool/#atom-everything