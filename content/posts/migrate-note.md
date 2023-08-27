---
title: 博客迁移记录
date: 2019-08-12T23:48:00+08:00
description: 迁移过程的简要记录（内有坑）
---



在之前的文章中有提及，因为各种原因，已经很久没有打理这个博客了，一直荒废到了几周前。本文主要记录从 Hexo 迁移到 Hugo，并配置 Terminal 主题的过程。

## 文章头

大部分静态博客解决方案都通过文章头记录文章元数据，例如标题、创建日期、分类、tag 等。在迁移前，我知道 Hugo 的文章头和 Hexo 略有不同，主要体现在时间格式、数组形式上。但是没想到，Hugo 对 Hexo 下的文章头依然能正常解析，Archive 中有几篇文章就是直接从旧博客中复制过来的。

## 多语言部署

Hugo 支持切换访问语言，具体而言，切换的是主题中的一些字符串。在配置的时候，虽然我在 `zh-CN` 语言环境下进行了设定，但是发现本地没有生效。查询后才发现，需要用 `defaultContentLanguage` 参数设定博客的主语言。

## Section / 文章列表

Hugo 的官方文档中，支持一种名为 Section 的文章组织方案。在 `content` 文件夹下，可以建立不同的 `section`，再在其内部放置文章，从而实现一种类似于 category 的文章层级。但是在我自己测试的时候，虽然可以通过手动构造 URL 访问 section 内的文章，但却无法获取 section 的文章列表。经过一番折腾后，发现可能是 Terminal 主题的缺陷，这一主题在设定文件中要求手动指定主要 section，暗示其可能不支持多 section 架构。查阅文档后，可能原因是 Terminal 主题中缺失对 section 的相关 layout 文件。最后我将 `themes\terminal\layouts\_defaults` 下的 `list.html` 复制到根目录下的 `layout\_default` 文件夹下，再删除了一些过滤条件，总算魔改出了一个能用的 section 视图。后续可能会向主题作者提 issue，或者直接发起 Pull Request。

---

虽然迁移有点点麻烦，不过能复活，总归还是很开心的。

