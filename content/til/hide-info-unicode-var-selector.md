---
title: 用 Unicode 变体选择器隐藏信息
date: 2025-03-02T13:46:14.075Z
---

用 variation selector (VS 变体选择器） 把二进制数据藏在 unicode 字符串里；VS 有 256 个（VS1~VS256），刚好一个 byte 一个，二进制数据甚至不需要特殊处理（例如 base64）

- 一般应用（如浏览器）不会渲染出来
- LLM 可以阅读（很适合做 prompt injecting）

src: https://paulbutler.org/2025/smuggling-arbitrary-data-through-an-emoji/