---
title: LLMSerp - 把大语言模型当作搜索引擎
date: 2025-03-02T09:31:58.439Z
---

LLM 内部已经存储了很多事实性信息。如果通过一些 prompt，让 LLM 输出 [{title, abstract, url}]，就能实现一个搜索引擎。通过把这个"假"搜索引擎和真搜索引擎（例如 Google）的结果混合，Jina.AI 发现可以解决 RAG 中“什么时候需要调用外部搜索”的问题（可以阅读他们的博客文章了解更多信息）。但即使没有这个作用，单纯把 LLM 当作搜索引擎用也是一个很神奇的想法。

demo：https://jina.ai/llm-serp-demo/

blog: https://jina.ai/news/llm-as-serp-search-engine-result-pages-from-large-language-models