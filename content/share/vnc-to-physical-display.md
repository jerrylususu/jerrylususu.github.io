---
title: VNC 连接到物理屏幕
date: 2021-12-13T16:50:43+03:00 
tags:
- 坑
---

如果搜索 `Linux 远程桌面`，大部分教程基本上都是 `xrdp + xfce4` 的组合。一般情况下这样的组合的确不错，不过有一些诡异的特殊需求的时候就没那么好用了。在我的使用场景中，有的时候在实验室的 Linux 工作站上开启了一个比较长时间的任务，回到宿舍后可能需要检查下运行过程是否正常。如果是一般的 CLI 程序，用 `screen` 或者 `tmux` 之类的 terminal multiplexer （终端多路复用器）就绰绰有余了，可惜我用的是一个 GUI 程序。因此试着搜索了一番，发现是可以实现 VNC 连接到一个进行中的 X session 的，效果和 teamviewer 之类的工具差不多，具体操作如下。

1. 安装 TigerVNC 服务端
2. 运行 `vncpasswd` 创建 VNC 密码
3. 启动 TigerVNC 服务
4. 使用 `x0vncserver` 开启一个连接到 Display 0 的 VNC 会话
   ```bash
    x0vncserver -display :0 -PasswordFile=/home/{username}/.vnc/passwd 
   ```
5. 在其他设备上使用 VNC 客户端连接

在 Windows 上，根据我自己的体验，似乎 RealVNC Viewer 的使用体验比 TigerVNC Viewer 更好。

另一个可能会影响使用体验的问题是缩放与屏幕分辨率。实验室的工作站是 4K 屏幕，使用 200% 缩放，在用 1080p 的笔记本连接的时候不免感觉字太小。TigerVNC 似乎有一个 auto-scaling 功能，然而因为我们是把 VNC 会话连接到物理屏幕上，这一功能似乎无法使用。我自己的解决方式是先连上去，再手动改远端系统内的分辨率设置（一般改到 2560x1440 就足够了），然后重启 x0vncserver 再重新连接。虽然稍微有些麻烦，但是至少解决能用的问题了。


