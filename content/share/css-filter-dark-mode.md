---
title: 用 CSS Filter 反色实现简易黑暗模式
date: 2021-12-23T10:43:25+03:00
description: 比想象中的简单
tags:
  - 前端
---

本博客使用的 [Manis 主题](https://github.com/yursan9/manis-hugo-theme) 并没有提供原生的黑暗模式支持，于是考虑着自己加一个。一开始的想法是定制 CSS 加上 media query，然而这样改动面似乎会比较大。随手搜索了一下，发现已经有[前人](https://www.zhangxinxu.com/wordpress/2020/11/css-mix-blend-mode-filter-dark-theme/)提出了使用 CSS Filter 实现简易黑暗模式的想法，甚至有[代码](https://radu-matei.com/blog/dark-mode/)可以直接应用于 Hugo 博客。相较于 media query，直接使用 CSS Filter 不仅操作上更简单，也允许用户直接切换明亮/黑暗模式，而不需要调整系统/浏览器的全局设定。

具体 CSS 实现中，先使用 `invert(1)` 对整个网页的颜色反相，但这一操作也会引起颜色的色调反转，因此需要再用 `hue-rotate(180deg)` 将色调转回来。然而这样的操作对文字而言很合适，但是会影响图片、视频等元素的显示，如同被 X 射线照射一般，最后还需要对这些需要被黑暗模式排除的元素再用一次 `invert(1) hue-rotate(180deg)` 负负得正转回来。

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

为了让用户能够切换明亮/黑暗模式，需要引入一个额外的切换图标，点击时会对应插入/删除黑暗模式的 CSS tag，并将用户的设定保存到 `localstorage`。在用户未明确设定偏好时，应遵循系统/浏览器全局的黑暗模式设定，因此这里又用 `window.matchMedia` 来探测。

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

完整修改可见于我给这一主题实现黑暗模式的 [Pull Request](https://github.com/yursan9/manis-hugo-theme/pull/22)，一个简单的示例可见于 [Gist](https://gist.github.com/jerrylususu/c517f091f3d733cf28e29e55b77b50d5)。最后的效果如下。

![Demo](/img/css-filter-dark-mode-demo.png)


**12/27 更新**：PR 已被接收并合并。