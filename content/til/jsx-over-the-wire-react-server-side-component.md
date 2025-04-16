---
title: JSX Over The Wire - 对 React 服务端组件的自然推导
date: 2025-04-16T15:04:40.528Z
---

一篇介绍 React Server Component 的文章，第一次让我有了一种“原来如此！”的感觉。作者分两条线，分别从概念和历史层面介绍了 RSC 的设计思想。十分推荐的 deepdive 文章！

- 概念：Model -> ViewModel -> REST -> Backend For Frontend
- 历史：CGI -> PHP -> XHP -> Async XHP -> Server Driven UI

src: https://overreacted.io/jsx-over-the-wire

---

以下是我自己尝试复现这个推导过程：
- Stage 1
  - Q：为了展示一个前端页面，可能需要请求很多不同的后端接口，造成前端性能差（request waterfall）
  - A：那就为了每个前端页面，创建一个专门用于这个页面的后端接口，刚好返回这个页面所需的所有信息（Backend For Frontend）
- Stage 2
  - Q：不同的前端页面可能有共享的内容（文章列表 / 文章内容），后端接口实现存在很多代码重复
  - A：提供可组合的后端实现 （Composable BFF)，例如文章列表屏幕接口调用文章内容屏幕的接口，用参数控制所需内容（是否需要截断正文）
- Stage 3
  - Q：现在虽然后端可以返回一个大 JSON，恰好包含本页面前端所需的所有信息，但是前端的每个组件都需要自己解析 JSON，从里面取出自己需要的一部分塞到 Prompt 里，还是有点繁琐
  - A：后端返回的 JSON 中，除了组件的数据（props），还加上组件的结构；后端返回一个组件树，前端直接渲染这棵树（Server Driven UI）
- Stage 4
  - Q：这一切都很棒，但是需要自己手动协调前后端的一致性，避免前后端 desync
  - A：让框架来做（React Server Side Component）