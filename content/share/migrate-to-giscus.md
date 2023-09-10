---
title: 评论系统从 Disqus 迁移到 Giscus
date: 2023-09-10T22:08:00+08:00
---

之前一直用的是 disqus，但是一来国内访问有时会有问题，二来新用户需要重新注册。考虑到大部分阅读本站的读者应该也是 Github 用户，迁移到 Giscus（一个基于 Github Dicsussion）的评论系统看起来更合适一些。切换评论系统本身并不难，参考[这篇教程](https://blog.arkey.fr/2022/10/16/moving-from-disqus-to-giscus/#_preparing_the_migration)修改 hugo 的模板和配置即可。迁移数据也不算麻烦，毕竟没什么人评论，所以其实只有两条评论，手动迁移也就花不了多少时间（虽然也尝试了[自动的方案](https://github.com/estruyf/disqus-to-github-discussions)但似乎有些问题，迁移过去的评论不显示...）。稍微有些烦人的反倒是 Giscus 明亮/暗黑模式的切换问题。

因为本博客有自己的切换按钮（见[前文](/share/css-filter-dark-mode/)），用户访问的时候可能从 `localstorage` 中取颜色模式偏好，但是目前加载 giscus 是 hugo 在站点生成的时候就将颜色偏好参数写入 html 源码了，因此需要在用户点击按钮切换时，一并切换 giscus 的颜色偏好。参考官方的[这个 issue](https://github.com/giscus/giscus/issues/336) 这一功能并不难实现。然而这样依然有问题，因为 giscus 加载后，用户点击按钮切换颜色模式偏好前，giscus 的颜色偏好是基于我的 hugo 配置文件，而非用户 localstorage 里存储的，结果就是可能用户手动选择了明亮模式，但浏览器设置里有 `prefer-color-scheme: dark`，所以 giscus 显示黑色背景+白色文字。之前的 issue 里对这个问题没有太好的解法，看到有人 `setTimeout` 不断循环，但感觉这不太优雅。读了一下[官方文档](https://github.com/giscus/giscus/issues/336)，发现其实 giscus 会在加载完成后向父窗口发送事件，所以其实只要监听这个事件，在 giscus 加载完后再设置 giscus 的颜色偏好即可。相关实现可参考[这个 commit](https://github.com/jerrylususu/jerrylususu.github.io/commit/8e2c0f1734d645db8bb142f4f281133ecedece7b)。

可能切换了之后会有更多评论？但愿吧。
