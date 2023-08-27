---
title: Hugo 的 Disqus 整合
date: 2021-04-03T22:30:00+03:00 
tags:
  - 坑
---

Hugo 是内置了 Disqus 支持的，理论上只需要在站点的 `config.toml` 的顶层设定 `disqusShortname` 属性即可，不过实际用起来稍微有些坑。具体步骤如下。

1. 在 Disqus 官网注册自己的账户
2. 在 Disqus 官网登陆后，选择右上角 Settings - 左侧 Moderation，然后在这里新建一个站点，站点名字 （`{site_name}.disqus.com`）就是 `disqusShortname` 应该用的值
3. 站点创建完成后，Billing 页选择 Free Plan
4. 在 Hugo 的 `config.toml` 文件中设定 `disqusShortname`


其他小问题：
- 本地没有评论显示：主题的`disqus.html`中（位于`{site_folder}\themes\{theme_name}\layouts\partials\disqus.html`），在本地执行（`indow.location.hostname == "localhost"`）的时候不会加载评论框。如果调试需要，可以给这个判断加上注释，即可在本地正常显示了。
