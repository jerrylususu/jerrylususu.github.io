---
title: 用连字实现图标
date: 2025-04-02T15:05:37.556Z
---

在阅读一篇关于“连字”（ligature）的文章时，了解到原来 Google 的 Material Icon 库用连字实现了图标选择（特定字符在一起会被直接替换为图标）。有趣！

顺带一提，这篇（via）关于连字的文章写的也很棒。强烈推荐阅读。

```html
<span class="material-icons">face</span>
```

（还有，连 Office 也支持连字，不过得自己打开 OpenType 特性开关。）

src: https://developers.google.com/fonts/docs/material_icons?hl=zh-cn#using_the_icons_in_html

via: https://webzhao.me/posts/ligature/

office: https://support.microsoft.com/zh-cn/office/-%E5%AD%97%E4%BD%93-%E5%AF%B9%E8%AF%9D%E6%A1%86%E4%B8%AD%E7%9A%84-opentype-%E9%80%89%E9%A1%B9-1033d3a7-511a-4d77-a2e2-d10d32889e28