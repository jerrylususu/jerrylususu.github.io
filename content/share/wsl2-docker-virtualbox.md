---
title: WSL2, Docker, Virtualbox
date: 2020-10-29T02:25:00+08:00 
tags:
  - WSL
  - Docker
  - VM
---

> 2021/4/9 更新:
> VMWare Player 16+ 无须配置，在检测到 Hyper-V 启动后自动调用 Hyper-V 后端了。

Docker 在 Windows 上运行，实际上都是靠一个 Linux 虚拟机。早期 Docker 官方出了一个叫做 Docker Toolbox 的工具，其实就是 VirtualBox 加上一个精简过的只能运行 Docker 的 VM。后来 Docker 放弃了 Virtualbox 路线，转而使用 Windows 内置的 Hyper-V 作为底层 VM。但是 Hyper-V 平台一旦启用，就会导致 Virtualbox / VMWare 等其他虚拟机工具不可用，这一问题直到 VirtualBox 6 之后才算解决，此时 VirtualBox / VMWare 都可以调用 Windows 内置的 Hypervisor API 作为 VM 的执行引擎。

所以来到 2020 年，在 Windows 10 20H2 上同时运行 WSL 2, Docker 和 VirtualBox 已经几乎是 painless 的了，只需要记住
- WSL 2 底层是一个跑在 Hyper-V 里的 VM
- 因为 WSL 2 是一个真正的 VM，Docker 可以直接安装到 WSL 2 中，而不会遇到 WSL 1 的不兼容问题
- VirtualBox 通过 Hypervisor API 调用 Hyper-V 来执行 VM

步骤也很简单：
1. Windows 开启相关功能：Hyper-V, 虚拟机监视器，虚拟机平台
2. WSL 迁移到 version 2 (如果喜欢也可以留一个 WSL 1，毕竟比 VM 轻量，日常也基本够用)
3. Docker Desktop 安装最新稳定版
4. VirtualBox 安装最新版（大版本号 6 及以上）

注意：
- VirtualBox 因为换了虚拟化后端，已有的暂停的虚拟机，启动的时候会丢失数据，建议关机之后再迁移
- VirtualBox 的 VM 性能可能会下降，64-bit Guest 尤其严重，32-bit Guest 还好（如果用 Hyper-V 作为后端，可以看到 VM 执行界面右下角是一个乌龟图标）