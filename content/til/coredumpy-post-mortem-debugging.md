---
title: coredumpy - 实现事后调试的 Python 库
date: 2025-03-30T13:07:41.550Z
---

Coredump 已经是一个被广为人知的概念了，想法是在出错的时候把当前的完整状态保存下来以供事后分析（Post-mortem debugging）。`coredumpy` 为 Python 实现了这一功能，出现异常的时候生成一个 dump 文件，后续可以用 pdb 或者是 VSCode 的调试工具加载，还原事故现场。这个库有一个优势是没有使用 `pickle`，因此不要求故障环境和调试环境完全一致，也避免了不安全代码的意外执行。在一个示例中，作者用它调试了一个 CI 问题，看起来比传统排查效率高非常多。

src: https://github.com/gaogaotiantian/coredumpy

video: https://www.bilibili.com/video/BV1nRQkYoE2c