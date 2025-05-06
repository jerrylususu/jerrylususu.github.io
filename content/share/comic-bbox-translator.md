---
title: comic-bbox-translator - 用 LLM 生成带边界框的翻译
date: 2025-05-06T22:25:05+08:00
---

起因是在看推上的日语同人；如果用 LLM 直接翻译的话，无论加了什么prompt，最后翻译出来的顺序也是乱的（可能是因为视觉模型内在的处理顺序问题？），需要脑内重排序，不太爽；正巧之前看到过其他人的博客，说[现在视觉模型可以输出边界框了](https://simonwillison.net/2024/Aug/26/gemini-bounding-box-visualization/)，于是趁着放假 vibe coding 了一把，果然还真可以用；虽然边界框偶尔不太准，但是大部分场景下也足够了。起初用 Python 写了一个版本，但后面意识到其实可以直接用 Web 技术实现，省的用户另外配置环境了。

- Repo: https://github.com/jerrylususu/comic_bbox_translator
- Web Version: https://nekonull.me/comic_bbox_translator/