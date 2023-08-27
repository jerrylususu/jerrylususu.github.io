---
title: 将已有的 Vue App 变为 PWA
date: 2022-09-03T17:21:00+08:00
description: 加 PWA 插件，加图标，然后基本就能用了
tags:
  - 前端
---

之前写过一个用来辅助五十音记忆的小 App: [Gojuon Quiz](https://nekonull.me/gojuon-quiz/) ([源代码](https://github.com/jerrylususu/gojuon-quiz))，最近心血来潮决定给它加上 PWA (Progressive Web App) 功能，这样一来用户首次加载成功后，后续就算没有网络也依然可用，二来打开的时候不会显示浏览器地址栏之类的控件，体验上基本和一个原生应用接近了。

具体操作起来其实很简单，基本上就是以下几步：
1. 安装 Vue PWA 插件：`vue add pwa`
2. 生成不同大小的图标，放置于 `img/icons` 下：可以用 [Real Favicon Generator](https://realfavicongenerator.net/)
3. 在 `vue.config.js` 中稍微调整下 PWA 插件的配置：可以参考 [@vue/cli-plugin-pwa 文档](https://cli.vuejs.org/core-plugins/pwa.html#configuration)
4. （可选）增加更新提示：参考 [Handling Service Worker updates in your Vue PWA](https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip)
    > 不过不做这一步也不会影响自动更新功能，只是需要更新完成后用户手动关闭再重新开启，才会应用新的版本。

安装完成后，可以看到以下标志，证明 PWA 功能成功配置了：
- Chrome / Edge 地址栏右侧出现加号
- console 输出 service worker 相关调试信息

调试的时候有一些小问题需要注意：
1. PWA 在开发模式（如 `vue serve`）下是不会启用的，需要先 `vue build` 之后，手动在 dist 目录下开一个 HTTP 服务器（可以用 `python -m http.server）才会启用。
2. 如果是用局域网的设备，访问开发机上的 HTTP 服务器，也可能无法触发 PWA。原因是 PWA 触发需要 HTTPS（或服务器在本地 localhost）。
3. PWA 自定义名称的话，需要写在 `pwa.name` 下，而不是其他内层结构里。（之前装了 `i18n` 插件，习惯性的写到 `pluginOptions` 里了。）