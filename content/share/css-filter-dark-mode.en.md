---
title: Implementing a Simple Dark Mode with CSS Filter
date: 2021-12-23T10:43:25+03:00
description: Easier than imagined
tags:
  - frontend
---

The [Manis theme](https://github.com/yursan9/manis-hugo-theme) used on this blog does not provide native support for dark mode, so I decided to add it myself. Initially, I thought about customizing the CSS with media queries, but it seemed like a bigger change. I did a quick search and found that someone had already proposed the idea of using CSS Filter to implement a simple dark mode, and there was even [code](https://radu-matei.com/blog/dark-mode/) that could be directly applied to a Hugo blog. Compared to media queries, using CSS Filter not only simplifies the implementation, but also allows users to switch between light and dark mode without adjusting the system/browser's global settings.

In the specific CSS implementation, I first used `invert(1)` to invert the colors of the entire webpage, but this also caused a reversal of color tones. Therefore, I used `hue-rotate(180deg)` to bring the tones back. However, while this operation is suitable for text, it affects the display of images, videos, and other elements, making them appear as if they were being X-rayed. So, I had to apply `invert(1) hue-rotate(180deg)` again to these elements that needed to be excluded from the dark mode, in order to revert them back to normal.

```css
html {
    background-color: #ebebeb !important;
}

html {
filter: invert(100%) hue-rotate(180deg);
}

/* using not to exclude certain elements */
img:not(.icon-text, .icon-social),
video,
code {
filter: invert(100%) hue-rotate(180deg) contrast(100%);
}
```

To allow users to switch between light and dark mode, an additional toggle icon needs to be introduced. When clicked, it will insert/remove the CSS tag for dark mode and save the user's preference to `localStorage`. If the user has not explicitly set a preference, the system/browser's global dark mode setting should be followed. Therefore, I used `window.matchMedia` to detect it.

```js
var toggle = document.getElementById("dark-mode-toggle");
var darkTheme = document.getElementById("dark-mode-theme");

// probe system default dark mode setting
var systemDefault = null
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    systemDefault = "dark";
} else {
    systemDefault = "light";
}

// use user preference if possible
var savedTheme = localStorage.getItem("dark-mode-storage") || systemDefault;
setTheme(savedTheme);

toggle.addEventListener("click", () => {
    if (toggle.src.endsWith("/img/moon.svg") ) {
        setTheme("dark");
    } else if (toggle.src.endsWith("/img/sun.svg") ) {
        setTheme("light");
    }

});

function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);

    if (mode === "dark") {
        darkTheme.disabled = false;
        toggle.src = "/img/sun.svg";
    } else if (mode === "light") {
        darkTheme.disabled = true;
        toggle.src = "/img/moon.svg";
    }
} 
```

The complete modifications can be seen in my [Pull Request](https://github.com/yursan9/manis-hugo-theme/pull/22) for implementing dark mode in this theme. A simple example can be found in this [Gist](https://gist.github.com/jerrylususu/c517f091f3d733cf28e29e55b77b50d5). The final result is as follows:

![Demo](/img/css-filter-dark-mode-demo.png)


**Update on 12/27**: The PR has been accepted and merged.