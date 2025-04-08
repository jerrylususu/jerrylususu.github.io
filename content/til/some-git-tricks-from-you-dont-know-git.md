---
title: 来自「You don't know Git」演讲的一些 Git 小技巧
date: 2025-04-08T15:01:33.410Z
---

油管给我推送了一个名为「You don't know Git」的演讲[^video]，其中提到了一些我之前不知道的小技巧，特此记录下：
- git recover：只要某个变更被放入过暂存区（例如 git add 过），即使没有提交，也会被写入 object database，在意外丢失后依然可以从 git 内部数据库中捞回来（似乎有个两周的时间期限）；`git-recover` 是一个简化了恢复过程的小工具[^git-recover]
- git diff --word-diff：可以把变更在行内直接显示（而不是分别显示 old 和 new 分行显示）；一些情况下能更直接看出来哪里修改了
- git blame -C -C -C：每一个 -C 都增加了搜索深度，从而能更好确认当前行的来源（例如是否是之前从其他文件复制过来的）；但是也会耗时更长
- mergetool：配置文件里可以用 mergetool 自定义出现合并冲突的时候用的处理工具（虽然我自己一般都用 vscode 自带的那个）；sgdm[^sgdm] 看起来是一个不错的 3-way merge tool
- ·* text=auto`：放在 `.gitattribute` 里，自动正确处理跨系统的 CRLF 问题

顺带一提，Github 最近发布了一个和 Linus 在 Git 20 年的访谈[^talk]，有兴趣的话也可以去看看。

[^git-recover]: https://github.com/ethomson/git-recover

[^sgdm]: https://www.sourcegear.com/diffmerge/

[^video]: https://www.youtube.com/watch?v=DZI0Zl-1JqQ&pp=0gcJCX4JAYcqIYzv

[^talk]: https://github.blog/open-source/git/git-turns-20-a-qa-with-linus-torvalds/