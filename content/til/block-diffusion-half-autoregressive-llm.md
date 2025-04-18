---
title: Block Diffusion - 分块扩散的半自回归模型 (2503.09573)
date: 2025-03-20T15:47:10.864Z
---

又是一个 “middle ground” 的好主意！

- 自回归模型：效果好，输出长度范围大，但是没法并行
- 扩散模型：效果差，输出长度固定，但是很好并行

分块扩散模型：输出分成多个块，块间自回归，块内扩散；既有自回归的效果（虽然没有纯自回归那么好），又有扩散模型的高并行度（虽然也没有纯扩散模型那么高）。

不过其实我对扩散模型有好感，其实是因为去噪过程中 token 是可以变化的，意味着模型“原生”就可以改主意。这不像自回归模型一旦 token 输出了就 commit 不能再改了；即使有 reasoning token 这种突破，但是本质上还是存在输出的不可改变性。

src: https://arxiv.org/abs/2503.09573