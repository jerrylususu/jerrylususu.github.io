---
title: 被浏览器禁用的端口 (or 为什么连不上 6000 端口上的 HTTP 服务）
date: 2025-05-24T10:52:00.431Z
---

- 原因：部分服务对非预期的输入太宽容了，导致可能允许攻击者对这些服务构造特定的 HTTP 请求调用。（跨协议脚本漏洞，Cross-protocol scripting）
  - 例子：SMTP 用换行符分割命令，且会忽略无效命令；攻击者构造了一个网页，里面包含一个 `multipart/form-data` 的表单，插入了一些 SMTP 命令；用户点击后，请求发送到 SMTP 所在端口上，HTTP 头和其他字段被 SMTP 服务忽略，但是剩下的真 SMTP 命令会被执行。
- 表现：Chrome 报错 ERR_UNSAFE_PORT
- 被拦截的端口列表：
  - Chrome: https://chromium.googlesource.com/chromium/src.git/+/refs/heads/master/net/base/port_util.cc
  - FireFox: https://www-archive.mozilla.org/projects/netlib/portbanning (这个链接似乎很旧了，但我没找到更新的)

从列表看，重灾区在 2048 以下的端口，剩下 5000/6000 也有一些，20000 以上的高位端口就没问题了；我用的一般都是 23333，所以没遇到过这个问题。


- via: https://www.keenformatics.com/ports-that-are-blocked-by-browsers
- via: https://jazzy.id.au/2012/08/23/why_does_chrome_consider_some_ports_unsafe.html
- ref: https://superuser.com/questions/188058/which-ports-are-considered-unsafe-by-chrome