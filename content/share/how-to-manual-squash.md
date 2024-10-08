---
title: 如何手动 squash
date: 2024-10-07T13:56:00+08:00
tags:
- Git
---

最近帮解决了一个因为提交流程不规范导致的诡异 Git 分支问题，特此记录下，以备后用。

背景：主干分支 main，特性分支 feat，在特性分支上开发特性的时候，多次合入了主干分支（仅快进，没有合并冲突）；模拟的 Git 历史如下图所示，其中 `m*` 是主干提交，`f*` 是特性分支提交

```
* 5fb94b2 (HEAD -> main) m4
| * 83c6299 (feat) f3
| *   ff5c5af Merge branch 'main' into feat
| |\
| |/
|/|
* | 1698c3c m3
* | 05199a8 m2
| * 68a7e1d f2
| * eb5b169 f1
|/
* ae79b7c m1
```

问题：如何把特性分支上的所有提交合并为一个提交？（类似于 squash 的 Merge 策略，但是手动做到这一点）

思路：找到主干和特性分支的第一个分叉点，以此为基准生成 patch，然后在一个新分支上 apply patch 得到一个纯净的 commit。

（非人工写作提示：以下是 LLM 根据我自己的笔记生成的内容。欢迎将反馈贴在评论区，这将决定我以后是否会更积极地使用 LLM 进行创作。）

---

在日常开发中，我们经常会遇到这样的问题：由于开发流程、代码审查或其他原因，特性分支（Feature Branch）和主干（Main Branch）上的提交记录混杂在一起，难以管理。为了让代码历史更为清晰、整洁，我们通常需要手动进行 `squash` 操作，将特性分支上的多次提交合并成一个提交点。

这篇文章将带你一步步了解如何手动进行 `squash` 操作，并确保不丢失任何数据。这种方法适用于已经有部分提交合并进主干，并且历史记录较为复杂的场景。

## 场景问题

假设你正在开发一个新功能，但在开发过程中，特性分支 `feat` 和主干分支 `main` 上的提交混杂在一起。这样一来，不仅使代码历史难以追溯，还会影响代码审查和后续维护。因此，我们希望将 `feat` 分支上的所有提交整合成一个提交点，并保持代码历史的清晰度。

## 前置准备工作

在进行操作前，我们需要做一些准备工作，确保不会出现数据丢失的风险：

1. **创建备份分支并推送到远程：** 在特性分支 `feat` 上创建一个备份分支，并推送到远程仓库，以确保操作过程中的数据安全。

   ```bash
   git checkout feat
   git checkout -b feat-backup
   git push origin feat-backup
   ```

   这样，即使后续操作中出现意外，我们依然可以通过 `feat-backup` 分支恢复数据。

## 步骤详解

### 1. 确定变更点

首先，我们需要找到 `feat` 分支和 `main` 分支的**最后一个重合点**（也就是 `main` 分支中包含但 `feat` 中不包含的最后一个提交）。这样我们就可以清晰地识别出哪些提交属于 `feat`，而哪些提交是混杂进来的。

#### 如何找到变更点？

1. 使用以下命令，找出 `feat` 分支中第一个与 `main` 分支分叉的提交：

   ```bash
   git log --oneline main...feat --reverse --pretty=format:"%H" | head -n 1
   ```

   此命令将列出 `feat` 分支中所有提交的哈希值（`commit hash`），并按照时间顺序排列，其中 `head -n 1` 取出第一个分叉点的哈希值，记为 `{first_diverge_commit}`。

2. 然后使用以下命令查找 `main` 与 `feat` 最后一个重合点的哈希值：

   ```bash
   git rev-list --parents -n 1 {first_diverge_commit} --reverse | head -n 1
   ```

   取命令结果的**右边部分**，这就是 `main` 和 `feat` 的最后重合点，记为 `{last_share_commit}`。

### 2. 计算差异（Patch）

现在我们已经知道了 `main` 分支和 `feat` 分支的分叉点和最后重合点，我们可以提取出 `feat` 中相对于 `main` 的所有变更。

使用 `git diff` 生成差异文件：

```bash
git diff main feat > ~/my_patch
```

**注意：** 请将 `patch` 文件存放在仓库目录外，例如 `~/my_patch`，因为后续执行 `git reset` 时会重置仓库目录内的所有文件，导致 `patch` 文件丢失。

### 3. 回溯到最后重合点

接下来，我们要将当前 `feat` 分支的状态回退到 `main` 分支的最后重合点。

```bash
git reset --hard {last_share_commit}
```

该命令将 `feat` 分支的状态重置到 `{last_share_commit}` 提交。**注意：** `reset --hard` 会丢失所有当前分支的更改，因此确保之前的 `patch` 文件已备份。

### 4. 快进主干（Fast-Forward Merge）

现在，我们需要让 `feat` 分支快进（fast-forward）到主干 `main` 的最新状态。

```bash
git merge main --ff-only
```

`--ff-only` 参数表示如果不能进行快进合并，则不会合并。这一步确保 `feat` 分支的历史记录与 `main` 分支保持一致。

### 5. 应用补丁（Apply Patch）

回退和快进操作完成后，我们将 `feat` 分支上原本存在的所有提交变更（即 `patch` 文件）重新应用到当前分支。

```bash
git apply ~/my_patch
```

### 6. 提交变更并推送

现在，我们可以创建一个新的提交，将 `feat` 分支的所有变更整合到一个提交中。

```bash
git add .
git commit -m "Squashed all feature changes into a single commit."
```

接着，将 `feat` 分支强制推送到远端，以确保远程仓库与本地分支一致：

```bash
git push origin feat --force
```

## 总结

通过上述操作，我们成功地将 `feat` 分支的所有提交整合成了一个提交点，并且与主干保持了清晰的历史记录。完整步骤如下：

1. 找出特性分支和主干的分叉点与重合点。
2. 生成 `patch` 文件保存变更。
3. 回溯到重合点并进行快进合并。
4. 应用 `patch` 文件，合并所有更改。
5. 提交合并后的变更，并推送到远端。

通过这种手动 `squash` 方法，你可以灵活地调整提交历史，确保代码库的整洁度和可读性。

## 勘误
- 感谢评论区 @Certseeds 的指正，第 2 步的 diff 计算指令错误地将 last_share_commit 作为了 diff 开始点，实际上应该为 main（主干分支）；原文已修复。