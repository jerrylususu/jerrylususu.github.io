---
title: MS RDP 无法连接到在使用了 802.1x 认证的无线网络中的电脑
date: 2021-07-12T13:00:00+03:00 
tags:
  - 坑
---

昨天遇到了一个诡异的 bug，笔记本电脑放在 lab，连上了学校的 WiFi，但是回宿舍后却无法用 RDP 连接上。具体表现是一开始可以 ping 通，使用 RDP 连接时卡几分钟，随后超时断开，最后远端（笔记本电脑）就再也 ping 不通了。

以「RDP wifi disconnect」为关键词进行搜索，找到了微软知识库里的一篇文章：[Remote laptop disconnects from wireless network | Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/troubleshoot/remote-laptop-disconnects-wireless-network)，描述的症状和我体验的很相似。文章大意是说 RDP 在遇上 802.1x 认证的时候会有一些 bug，需要调整网络认证方式为「用户或计算机认证」或「计算机认证」。

找到了解决方案就很简单了，不过文中提到的设置界面并不是很好找，以下为正确的设置方式：

1. 打开「设置」应用，选择「网络和 Internet / WLAN」，在右侧相关设置选择「网络和共享中心」

2. 在「查看活动网络」下找到自己连接到的 WiFi，点击蓝色文字

   ![网络设置](/img/ms-rdp-bug-1.png)

3. 点击「无线属性」，选择「安全」选项卡，点击「高级设置」

4. 在「指定身份验证模式」中，选择「用户或计算机身份认证」

5. 至此无线连接会中断。点击任务栏的 WiFi 图标，重新输入用户名密码连接到网络。

设置完成后，建议使用手头的设备（平板 / 手机）尝试在同一网络下用 RDP 连接，如果能正常连接应该就没问题了。

