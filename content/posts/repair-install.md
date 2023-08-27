---
title: 不丢失数据的重装 - Repair Install
date: 2021-02-18T01:47:01+03:00
description: 实际上就是 Windows 的大版本更新
---

> 本文原载于「小众软件论坛」[link](https://meta.appinn.net/t/topic/21923)

## 前言
最近主力机上的 Windows 10 遇到了一些诡异的问题，开始菜单部分时候无法打开。这种系统层面的问题，第一反应当然是 `sfc`/`dism` 修复，然而无果。各种杂七杂八的方法也都去试了，故障依旧。事已至此，大概只有重装了，然而数据备份，软件安装，想想就头大。但是在偶然间发现了「Repair Install」（试译「修复安装」）这个小技巧，尝试后的确解决了问题。试着搜索了一下论坛，似乎还没有人介绍过，故作此贴。


## 什么是「Repair Install」
作为 Windows 用户的你可能没有听说过 Repair Install，但是大概率你已经体验过了：Windows 10 的大版本更新。在更新完成后，进入 「设置 - 系统 - 关于」，会发现「安装日期」已经被修改为了更新的安装日期。原因在于，**Windows 10 的大版本更新，实际上就是一次保留了用户数据（含文件、应用和设置）的系统重装**。这也是为什么大版本更新通常比一般更新耗时更长，且安装过程中会见到类似于全新安装的进度百分比显示。

换个方向思考，既然 Windows 更新机制可以允许这种特殊的保留用户数据的重装，是否可以让用户自己来进行呢？这实际上就是 Repair Install 的本质了：**用户手动进行的“大版本更新”**。
（此处“大版本更新”带引号，因为实际上并不要求安装介质的版本比已安装系统的版本高，相同版本也是可以进行的）

## 什么场景适合于「Repair Install」
当 Windows 10 出现了奇怪的问题，且其他途径无法修复时，包括但不限于：
* 开始菜单打不开
* UWP 应用打不开
* 字体/图标丢失
* 注册表混乱

## 进行「Repair Install」的前置要求
* 可以正常启动 Windows 进入桌面（如果已经启动不了就无能为力了，只能进安全模式也无法使用这个方法）
* 安装 ISO 需要和当前安装的系统：SKU（家庭/专业）相同、架构体系（x86/x64）相同、语言相同、且安装 ISO 版本高于或等于当前安装系统版本
* 当前系统分区有相对充裕的剩余空间（ tenforums 的说法是至少 8.87 G，不过也不知道这个数字的来源。建议至少保留 15 G 以防重蹈 [MacOS Big Sur 的覆辙](https://mrmacintosh.com/big-sur-upgrade-not-enough-hd-space-serious-issue-possible-data-loss/)。）

## 如何进行「Repair Install」
* 获取 Windows 10 ISO （可以使用微软官网的 [Media Creation Tool](https://www.microsoft.com/en-gb/software-download/windows10) 或第三方直链 [TechBench by WZT (v4.1.1) (rg-adguard.net)](https://tb.rg-adguard.net/public.php)）
* 双击挂载 ISO （也可以用其他虚拟光驱工具）
* 进入挂载驱动器，运行 `setup.exe`
* 一路下一步，在「选择要保留的项目」页选择「保留个人文件、应用和 Windows 设置」
* 耐心等待安装完成

## 参考链接
* [How to: Perform a Repair Upgrade Using the Windows 10 ISO file - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/windows_10-windows_install-winpc/how-to-perform-a-repair-upgrade-using-the-windows/35160fbe-9352-4e70-9887-f40096ec3085)
* [Repair Install Windows 10 with an In-place Upgrade | Tutorials (tenforums.com)](https://www.tenforums.com/tutorials/16397-repair-install-windows-10-place-upgrade.html)
* [How To Reinstall Windows 10 (neosmart.net)](https://neosmart.net/wiki/windows-10-repair-installation/#When_to_repair_install_Windows_10)