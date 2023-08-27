---
title: 给 WSL 安装桌面环境
date: 2020-01-30T02:25:00+08:00
description: WSL 1 + XFCE 4
tags:
  - WSL
---

# 给 WSL 安装桌面环境

> 本文是旧文补完计划的一部分。

可能你需要运行一些只提供 Linux 版本的 GUI 程序，抑或是你厌倦了 VM 的启动/恢复等待，或者只是过年实在无事可做... 总之，你需要在 WSL 下安装一个桌面环境。希望这篇文章能够提供一些小小的帮助。

## 开始之前：对比 WSL 下的桌面环境与 Linux VM

> DE: Desktop Environment 桌面环境

|          | DE in WSL                          | Linux VM                                |
| -------- | ---------------------------------- | --------------------------------------- |
| 启动速度 | 即时可用                           | VM 启动 / VM 状态恢复                   |
| 配置难度 | 相对麻烦                           | 简单，主流 Linux 发行版中都提供良好支持 |
| 资源消耗 | 少，仅额外添加 Win 端 XServer 消耗 | 多，需要考虑 VM Supervisor 的 overhead  |

## 步骤

> 参考自：https://github.com/QMonkey/wsl-tutorial
>
> 其他链接：
> - [如何优雅的在windows_10上装x](https://www.lainme.com/doku.php/blog/2018/07/如何优雅的在windows_10上装x)
> - https://www.jianshu.com/p/c936a8a2180e

> 我自己的环境：Windows 10 1909, WSL 1, Ubuntu 18.04

0. 前置要求：配置好 WSL 1，发行版 Ubuntu 18.04

1. 在 Windows 下安装 [VcXsrv Windows X Server](https://sourceforge.net/projects/vcxsrv/)，安装过程中一路下一步即可。

2. 在 WSL 中安装 `xfce4`, `xfce4-terminal`

   > 为什么用 XFCE：小，资源占用少，比较适合我们当前的需求

   ```
   sudo apt-get update
   sudo apt-get install xfce4-terminal xfce4
   ```

3. 在 WSL 中配置 `dbus`

   ```
   sudo dpkg-reconfigure dbus && sudo service dbus restart
   ```

4. 修改 `~/.bashrc`，加入以下内容，随后运行 `source ~/.bashrc` 使其生效

   ```
   export DISPLAY=:0.0
   export LIBGL_ALWAYS_INDIRECT=1
   ```

5. 在 Windows 中运行 `XLaunch` （先前 `VcXsrv` 安装的一部分），在第一个配置页面选择 `One large window` 或者 `One large window without titlebar`（区别是 Windows 下，DE 的显示窗口是否会有标题栏），随后一路下一步。

6. 在 WSL 中运行 `startxfce4`，观察 Windows 下 `VcXsrv` 是否正确启动。如果一切正常，此时应该会显示 Xfce 4 的默认壁纸，并开始 DE 初始化过程。

如果只是需要一个正常运行的 DE 的话，到此即可。以下步骤为添加中文支持（字体和输入法）。

7. 在 WSL 中安装中文字体和 `fcitx` 输入法框架，并生成 `systemd` Machine ID

   ```
   sudo apt-get install fonts-wqy-microhei fonts-wqy-zenhei xfonts-wqy
   sudo apt-get install fcitx fcitx-pinyin dbus-x11
   sudo systemd-machine-id-setup
   ```

8. 加入输入法设定至 `~/.profile`

   ```
   export GTK_IM_MODULE=fcitx
   export QT_IM_MODULE=fcitx
   export XMODIFIERS=@im=fcitx
   ```

9. 更改 `dbus` 配置让 `fcitx` 能正常启动：向 `/etc/dbus-1/session.conf` 中写入以下内容

   ```
   <listen>tcp:host=localhost,port=0</listen>
   <auth>ANONYMOUS</auth>
   <allow_anonymous/>
   ```

10. 安装[搜狗拼音](https://pinyin.sogou.com/linux/?r=pinyin)

    > 安装搜狗拼音的 deb 的时候，第一次会因为缺少依赖而失败，因此先用 `-f` 补充缺失的依赖，再重新安装，就可以完成了。

    ```
    wget 'http://cdn2.ime.sogou.com/dl/index/1571302197/sogoupinyin_2.3.1.0112_amd64.deb?st=LAPO53d3V5UzEfPO5y_C6g&e=1580122419&fn=sogoupinyin_2.3.1.0112_amd64.deb'
    mv sogoupinyin_2.3.1.0112_amd64.deb\?st\=LAPO53d3V5UzEfPO5y_C6g\&e\=1580122419\&fn\=sogoupinyin_2.3.1.0112_amd64.deb sogoupinyin.deb
    sudo dpkg -i sogoupinyin.deb
    sudo apt-get install -f
    sudo dpkg -i sogoupinyin.deb
    ```

11. 配置搜狗拼音：运行 `startxfce4` 启动 Xfce，右键单击右上角「键盘」图标，选择 Configure。在打开的窗口中点击左下角「+」按钮，搜索并选中「Sogou Pinyin - Chinese (China)」（如果不想搜索可以直接拖到列表底部），点击「OK」完成添加。

12. （可选）测试输入法：安装 `gedit`，并测试能否在其中正确输入中文。输入前，可能需要从右上角「键盘」图标选中 Input Method - Sogou Pinyin 作为当前输入法。

## 原理解析

为什么这个能 Work 呢？其实这就是上古时代的正确用法：Server 进行主要运算，Client 只作为操作终端，提供图形显示和输入。

