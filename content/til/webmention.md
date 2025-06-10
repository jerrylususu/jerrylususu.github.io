---
title: WebMention - 去中心化的网站间互动
date: 2025-06-10T14:36:22.661Z
---

阅读其他人的博客的时候，注意到底部有个 WebMention 提交框。查了下才发现还有这样一个 W3C 标准，用简单的 HTTP 请求就能做到。以下是一些 LLM 生成的说明。

Webmention 是一种 W3C 推荐的开放标准，旨在实现网站之间的去中心化通知。简单来说，当一个网页（称为“源”）链接或提及另一个网页（称为“目标”）时，源网页可以自动通知目标网页，从而让目标网页知道它被引用了。这使得网站能够接收并显示来自其他网站的“评论”、“引用”、“喜欢”或“转发”等互动，而无需依赖中心化的第三方服务。

简要的工作原理：
1.  **用户 A 发布文章：** 用户 A 在自己的源网站上发布了一篇文章，其中包含了指向目标网站的链接。
2.  **发现 Webmention 端点：** 源网站检测到这个外部链接后，会向目标网站发送一个 HTTP GET 请求，以查找目标网站的 Webmention 端点 URL。目标网站会在其 HTML 或 HTTP 头中返回这个信息。
3.  **发送 Webmention 请求：** 源网站获得 Webmention 端点 URL 后，会向该端点发送一个 HTTP POST 请求，其中包含源 URL 和目标 URL。Webmention 端点会立即返回 `HTTP 202 Accepted`，表示请求已收到并正在处理中（这是一个异步过程）。
4.  **目标网站验证：** Webmention 端点（在目标网站上）开始异步验证。它会向源网站发送一个 HTTP GET 请求，抓取源页面的内容，以确认源页面确实包含了指向目标页面的链接。这是为了防止伪造的 Webmention。
5.  **处理与显示：**
    *   **验证成功：** 如果验证通过，目标网站会存储这个 Webmention 数据，并根据其类型（如引用、回复、喜欢等）进行处理。最终，它会在目标页面上显示这个 Webmention（例如，在文章下方显示“此文被 [源网站] 引用”）。
    *   **验证失败：** 如果验证失败（例如，源页面并未链接到目标页面），Webmention 请求将被丢弃。

src: https://indieweb.org/Webmention

via: https://shkspr.mobi/blog/2025/06/book-review-the-secret-world-of-denisovans-the-epic-story-of-the-ancient-cousins-to-sapiens-and-neanderthals-by-silvana-condemi/