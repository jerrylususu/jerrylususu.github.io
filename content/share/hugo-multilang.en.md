---
title: Multilingual Hugo Blog
date: 2023-11-04T20:27:43+08:00 
---

I recently came across a classmate's sharing, mentioning that after making their blog multilingual, they saw a significant increase in traffic. So, I decided to give it a try as well. With the help of OpenAI, translating articles is not a difficult task. However, adding multilingual support to an existing Hugo site is still not a walk in the park. Although Hugo itself has the basic features for multilingual support ([Documentation: Hugo Multilingual](https://gohugo.io/content-management/multilingual/)), if the chosen theme does not support it, modifications to the theme are necessary.

For my blog, I have chosen the "translation by filename" approach, which seems to be the least intrusive solution based on the documentation. In simple terms, if your blog's Markdown file is located at `/content/blog.md`, you can add an `blog.en.md` file at the same level to provide the English translation. After completion, you can access the translated version by appending `/en/` to the domain name. (The default language, in my case, is "Simplified Chinese," so no language suffix is needed for the path.) However, it is unacceptable to expect users to manually add the language route, so a language selector needs to be added to the page. For now, I have added it to the top of the page. And voila, your multilingual blog is ready to go live!

There are still some known issues that I will address when I have the time:
1. Various navigations (e.g., the back button in the top left corner) will return to the root directory of the site (i.e., the Simplified Chinese homepage); the proper way is to return to the corresponding homepage of the current language.
2. The RSS feed link is problematic; the default link provided is still for the primary language, while the English link is under the `/en/` path. Perhaps an integrated RSS feed should be considered?

Most of the core multilingual code can be seen in this commit: [ca7a83d](https://github.com/jerrylususu/jerrylususu.github.io/pull/27/commits/ca7a83d6750f1f3d940a92b95b2179f793d26dd4)

For more reference links:
- [Language switcher in menu](https://discourse.gohugo.io/t/language-switcher-in-menu/11570)
- [Hugo Multilingual Part 1: Content translation](https://www.regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)