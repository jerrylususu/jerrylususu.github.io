---
title: 对代码的上下文检索（Contextual Retrieval）
date: 2025-03-17T15:07:18.037Z
---

在用各类 LLM 编程工具的时候，难免会遇到“进一步退两步”的情况，例如改一个功能但是把不相关的代码改坏了，或者是为一个简单的功能引入了完全不必要的抽象层。造成这种现象的原因之一，是 LLM 对于项目的上下文并没有明确的感知（不知道应该改哪里、怎么改、会影响什么）。虽然可能在开干之前会读一些代码，但是考虑到每次对话都是全新的，不难想象这样获取到的上下文实际上是不完备的。

今天在阅读他人的博客时，了解到了一种让模型自动总结现有代码库，主动生成一些摘要的做法。这样可以让模型在遇到问题时参考已经生成过的摘要，从而获得对项目结构和惯用法的了解，让模型的输出结果更有用（或者说更接地气 Grounding？）。摘要大概类似下面这样：
```
1. `Authentication Flow`
   - Importance Score: 99
   - Implementation:
     - User signs up with email/password or OAuth provider
     - Verification email sent with secure token
     - On verification, JWT access and refresh tokens issued
     - Access token used for API requests (1 hour expiry)
     - Refresh token used to obtain new access tokens (7 day expiry)
   - Key Files: 
     - `apps/api/services/authService.ts`
     - `apps/web/hooks/useAuth.ts`
```


突然想到，从代码库里找到一个文件，并将其和代码库里的其他文件联系起来（构建上下文）的流程，其实很类似 RAG 流程里从无数个文档块（chunk）里找到一块（例如用向量搜索），然后将其和文档联系起来的流程。延申想想，去年 Anthropic 出过一个叫做 Contextual Retrieval （上下文检索）的工作，利用前缀缓存，给每个 chunk 用 {full_text} + {chunk} 生成一个 context，再把这个 context 和 chunk 一起存储和检索。这一想法，是否也能应用于代码领域呢？

假设有一个上下文窗口足够大，且开启了前缀缓存的模型，一个可能的示例如下：

构建阶段：
1. 把代码库所有文件拼接为一个巨大的 codebase_str
2. 对每个代码文件 file
    - 用 system_prompt + codebase_str + file 调用 LLM，得到 context（在这个系统里，这段代码的作用是...，和其他代码的联系是...）
    - 把 context 和 code 关联存储（可能是一个 SQLite 数据库，也可能是一个简单的 JSON，原始 code 文件的 path 作为 key）

检索和生成阶段
1. 根据用户的指示，同时在 code 和 context 上做召回
2. 调用 LLM 时，对于每个 code 文件，同时提供其在整个项目的 context

听起来似乎有点希望。

src: https://nmn.gl/blog/cursor-guide

link: https://gigamind.dev/

releated: https://www.anthropic.com/news/contextual-retrieval