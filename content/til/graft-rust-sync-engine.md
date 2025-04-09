---
title: Graft - 支持部分复制的同步引擎
date: 2025-04-09T14:38:37.252Z
---

一个新的同步引擎，可以在此之上构建需要同步功能的应用（当然是用 Rust 写的）。

主要特性是将数据视作多个页面（page），页面本身存储在对象存储上；客户端使用（例如需要读取数据时）先获取元数据，再根据实际需要获取所需的页面，而不需要每次都拉取全量数据。每个页面可以有多个版本，由此可以得到快照和时间点恢复。

当然和任何分布式系统一样，某个客户端可能会尝试在一个旧版本上写入再提交。（想象在 git 中一个在旧未更新的分支上 commit 再 push）对这种情况，Graft 提供了多种冲突处理方式，可以让客户端在最新版本上重放变更（rebase），或是尝试和新版本做语义合并（merge），或是干脆分叉出一个新的分支。

作者的博客描述了和现有各种方案的对比，看起来在易用性和功能上取得了最佳的平衡。


src: https://github.com/orbitinghail/graft

blog: https://sqlsync.dev/posts/stop-syncing-everything/

via: https://simonwillison.net/2025/Apr/8/stop-syncing-everything/#atom-everything