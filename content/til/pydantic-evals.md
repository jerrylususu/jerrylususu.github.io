---
title: Pydantic Evals - 给 LLM 的单元测试
date: 2025-04-01T14:55:44.982Z
---

最近工作上需要临时当一次 prompt engineer，很快就发现 vibe-based prompting （凭着感觉改 prompt）是不可靠的。理想情况下，应该和传统 ML 类似，有明确定义的 eval set 让我来测试。最后是写了个小脚本来做，但是总觉得有点太粗糙了。今天看到了 Pydantic 的这个 Evals 框架，看起来是一个更干净更系统化的解决方案，抽象也很合理，未来可以试试。

src: https://ai.pydantic.dev/evals/

via: https://simonwillison.net/2025/Apr/1/pydantic-evals/#atom-everything