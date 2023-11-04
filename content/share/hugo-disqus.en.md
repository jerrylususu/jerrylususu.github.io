---
title: Integrating Disqus with Hugo
date: 2021-04-03T22:30:00+03:00 
tags:
  - Pitfall
---

Hugo has built-in support for Disqus. In theory, you only need to set the `disqusShortname` attribute at the top level of your site's `config.toml` file. However, there are some pitfalls when actually using it. Here are the specific steps.

1. Register your own account on the Disqus website.
2. After logging in to the Disqus website, go to Settings in the upper right corner, then select Moderation on the left side. Here, create a new site, and the site name (`{site_name}.disqus.com`) should be used as the value for `disqusShortname`.
3. Once the site is created, choose the Free Plan on the Billing page.
4. Set the `disqusShortname` in the `config.toml` file of Hugo.

Other minor issues:
- No comments displayed locally: In the theme's `disqus.html` file (located at `{site_folder}\themes\{theme_name}\layouts\partials\disqus.html`), the comment box will not load when the condition (`indow.location.hostname == "localhost"`) is met. If you need to debug, you can add a comment to this condition, and it will display normally locally.