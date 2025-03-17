---
title: 浏览器内置的默认 HTML 样式
date: 2025-03-17T14:07:45.292Z
---

HTML 如果没有指定一个元素的样式，那么会用“默认”样式展示。（在 DevTools 里似乎被标记为“用户代理样式表”）。之前一直有些疑惑到底是在哪里定义的，今天在读其他信息的时候发现了。

src: https://github.com/chromium/chromium/blob/main/third_party/blink/renderer/core/html/resources/html.css

via: https://simonwillison.net/2025/Mar/16/backstory/