---
title: JavaFX 打包并设定 UTF-8
date: 2021-04-02T02:25:00+08:00 
tags:
  - Java
  - 编码
---

IDEA 可以自动为 JavaFX 打包，会带上依赖 jar 和 Java Runtime，具体方法见[视频](https://www.youtube.com/watch?v=_KHCHiH2RZ0)。

然而这样打包生成的文件，在没有加 VM 参数时默认使用系统编码，在中文 Windows 环境下即使用 GBK，代码中若含有中文会造成乱码。

解决此问题的方法也很简单，只需要在打包后找到 `{artifact_name}/app/{artifact_name}.cfg` 文件，找到 `[JVMOptions]` 一行，在其后追加 `-Dfile.encoding=utf-8` 即可。然而需要每次打包后手动修改，并非最佳方法。

