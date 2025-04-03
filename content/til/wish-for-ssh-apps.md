---
title: Wish - 用 SSH 作为任何 TUI 应用的入口
date: 2025-04-03T14:03:04.330Z
---

从 HackerNews 上看到了一个名为 pico.sh 的项目，可以在不安装第三方工具的前提下，直接使用系统自带的工具（ssh/rsync）来实现发布文章、暴露本地服务等能力。他们的文档有一个 How it works 章节，其中提到底层用的是 wish 的能力。

继续翻 Wish 的文档，是一个看起来很自然但是之前从来没有想过的方向：把 SSH 作为一个通用协议。虽然 SSH 一般都被用于 remote login，但本质上它也提供了一个受加密保护的 tunnel；Server 可以提供一个 shell，也可以提供任何其他的“应用”，例如任意 TUI 应用。Wish 提供了类似于现代 Web 框架的中间件的能力，可以自定义给 client 的返回，可以被用于开发 “SSH Apps”。举个例子，想象一个现有的 TUI 应用，你可以 ssh 到某个机器上然后 ./run-my-app，或者干脆直接让这个应用接管 SSH，不仅用起来更简单，也更安全（因为不需要给出完整的 shell，也不用担心 openssh-server 的各种问题了。

src: https://github.com/charmbracelet/wish

via: https://pico.sh/how-it-works