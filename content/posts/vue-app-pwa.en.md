---
title: Turning an Existing Vue App into a PWA
date: 2022-09-03T17:21:00+08:00
description: Add PWA plugin, add icons, and it should be good to go
tags:
  - frontend
---

I previously wrote a small app called "Gojuon Quiz" to assist in memorizing the Japanese phonetic alphabet. Recently, I decided to add Progressive Web App (PWA) functionality to it. This allows the app to be used even without an internet connection after the initial successful loading. Additionally, it provides a user experience that is similar to a native application, without displaying browser address bars or similar controls.

The specific steps to implement PWA are as follows:
1. Install the Vue PWA plugin: `vue add pwa`
2. Generate icons of different sizes and place them in the `img/icons` directory. You can use the [Real Favicon Generator](https://realfavicongenerator.net/).
3. Adjust the PWA plugin configuration in `vue.config.js`. You can refer to the [@vue/cli-plugin-pwa documentation](https://cli.vuejs.org/core-plugins/pwa.html#configuration).
4. (Optional) Add update prompts. Refer to [Handling Service Worker updates in your Vue PWA](https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip).
    > Note: Skipping this step will not affect the automatic update feature. However, users will need to manually close and reopen the app after the update to apply the new version.

After installation, you can see the following indicators to confirm that the PWA functionality has been successfully configured:
- The plus icon appears on the right side of the address bar in Chrome/Edge.
- Debugging information related to the service worker is output to the console.

When debugging, there are a few small issues to keep in mind:
1. PWA is not enabled in development mode (e.g., `vue serve`). You need to first run `vue build` and manually open an HTTP server in the `dist` directory (you can use `python -m http.server`) to enable it.
2. If you are using a device on a local network to access the HTTP server on the development machine, PWA may not be triggered. This is because PWA requires HTTPS (or the server to be on localhost).
3. If you want to customize the name of the PWA, it should be written under `pwa.name`, not in other nested structures. (I previously installed the `i18n` plugin and habitually wrote it under `pluginOptions`.)