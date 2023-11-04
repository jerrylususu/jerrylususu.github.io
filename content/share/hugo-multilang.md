---
title: 多语言的 Hugo 博客
date: 2023-11-04T20:27:43+08:00 
---

之前看到了某位同学的分享，提到他在将博客多语言化之后，访问量有了显著的上升，于是也想试试看。在 OpenAI 的加持下文章翻译并不是什么难事，但是想要给一个现存的 Hugo 站点增加多语言支持依然不轻松。虽然 Hugo 本身自带了多语言支持的基本特性（[文档：Hugo Multilingual](https://gohugo.io/content-management/multilingual/)），但是倘若选用的主题不支持，则还需要对主题进行改造。

目前对本博客，我选择了"按文件名翻译"的做法，从文档来看这似乎是对现有文件结构侵入最小的方案。简单来说，如果你的博客 Markdown 文件位于 `/content/blog.md`，在同层级下新建一个 `blog.en.md` 即可补充英文翻译。完成后可以通过在域名后补充 `/en/` 路径的方式来访问。（主语言，在我这里是"简体中文"的路径不受影响，即无需补充语言后缀。）然而让用户手动补充语言路由显然是不可接受的，于是得在页面某处加一个语言选择器。这里我暂时加到了顶部。然后你的多语言博客就可以上线了。

目前已知还存在的一些问题，待之后有空再来慢慢解决吧：
1. 各种导航（例如左上角的后退）会回到站点根目录（也就是简体中文主页）；合理的做法是回到当前语言的对应主页
2. RSS feed 链接有问题，默认提供的仍然是主语言的 RSS 链接，英文的链接在 `/en/` 路径下；这里可能要考虑一个整合的 RSS？

大部分的核心多语言代码可以从这个 commit 看到：[ca7a83d](https://github.com/jerrylususu/jerrylususu.github.io/pull/27/commits/ca7a83d6750f1f3d940a92b95b2179f793d26dd4)

更多参考链接：
- [Language switcher in menu](https://discourse.gohugo.io/t/language-switcher-in-menu/11570)
- [Hugo Multilingual Part 1: Content translation](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)
