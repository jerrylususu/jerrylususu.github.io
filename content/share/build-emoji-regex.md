---
title: 构造能匹配所有 emoji 的正则表达式
date: 2021-12-13T16:50:43+03:00 
tags:
- hack
---


在研究一个 CSS 定制 Emoji 字体问题的时候，看到了一个 RegEx，可以匹配所有的 Emoji（至 2018 年版本），也给出了相应的测试例子，见此：[Regex to match all emoji - Regex Tester/Debugger](https://www.regextester.com/106421)

```
(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])
```

看完之后我半信半疑，因为这个 RegEx 太简单了，于是手动转换成了对应的 Unicode codepoint 范围检查了一下，结果发现的确有问题：这个 RegEx 的匹配范围太大了，忽略 Copyright 和 Registered 符号（u+00a9, u+00ae），剩下的区间分别是 [u+2000, u+3300] 和 [u+1f000, u+1fbff]。后者还算合理，查 Wikipedia 上 Unicode 平面映射，基本上也就是新增 Emoji 的对应 codepoint；然而前一个区间就太过广泛了，甚至连日文平假名、片假名都会被匹配上。（不过的确覆盖了几乎完全的 Emoji codepoint，虽然有些类似于 Selector 之类的边角没覆盖到）

那么怎么做一个能精确匹配 Emoji 的 RegEx 呢？思路很简单，首先从 Unicode 官网获取 Full Emoji List，解析其中所有属于 Emoji 的 codepoint，排序，最后把相邻的 codepoint 合并成一个 range。然而说起来容易做起来难，RegEx 的视角中，字符是 UTF-16 的（如果要用 \uabcd 的形式的话），因此需要把高于 u+ffff 的 codepoint 用代理对的方式表示。

最后结果如下：(测试地址：[regex101](https://regex101.com/r/uGUM1M/1) ）
```
(\u00a9|\u00ae|\u203c|\u2049|\u20e3|\u2122|\u2139|[\u2194-\u2199]|[\u21a9-\u21aa]|[\u231a-\u231b]|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\u24c2|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|[\u2600-\u2604]|\u260e|\u2611|[\u2614-\u2615]|\u2618|\u261d|\u2620|[\u2622-\u2623]|\u2626|\u262a|[\u262e-\u262f]|[\u2638-\u263a]|\u2640|\u2642|[\u2648-\u2653]|[\u265f-\u2660]|\u2663|[\u2665-\u2666]|\u2668|\u267b|[\u267e-\u267f]|[\u2692-\u2697]|\u2699|[\u269b-\u269c]|[\u26a0-\u26a1]|\u26a7|[\u26aa-\u26ab]|[\u26b0-\u26b1]|[\u26bd-\u26be]|[\u26c4-\u26c5]|\u26c8|[\u26ce-\u26cf]|\u26d1|[\u26d3-\u26d4]|[\u26e9-\u26ea]|[\u26f0-\u26f5]|[\u26f7-\u26fa]|\u26fd|\u2702|\u2705|[\u2708-\u270d]|\u270f|\u2712|\u2714|\u2716|\u271d|\u2721|\u2728|[\u2733-\u2734]|\u2744|\u2747|\u274c|\u274e|[\u2753-\u2755]|\u2757|[\u2763-\u2764]|[\u2795-\u2797]|\u27a1|\u27b0|\u27bf|[\u2934-\u2935]|[\u2b05-\u2b07]|[\u2b1b-\u2b1c]|\u2b50|\u2b55|\u3030|\u303d|\u3297|\u3299)|(\ud83c(\udc04|\udccf|[\udd70-\udd71]|[\udd7e-\udd7f]|\udd8e|[\udd91-\udd9a]|[\udde6-\uddff]|[\ude01-\ude02]|\ude1a|\ude2f|[\ude32-\ude3a]|[\ude50-\ude51]|[\udf00-\udf21]|[\udf24-\udf93]|[\udf96-\udf97]|[\udf99-\udf9b]|[\udf9e-\udff0]|[\udff3-\udff5]))|(\ud83d([\udc00-\udcfd]|[\udcff-\udd3d]|[\udd49-\udd4e]|[\udd50-\udd67]|[\udd6f-\udd70]|[\udd73-\udd7a]|\udd87|[\udd8a-\udd8d]|\udd90|[\udd95-\udd96]|[\udda4-\udda5]|\udda8|[\uddb1-\uddb2]|\uddbc|[\uddc2-\uddc4]|[\uddd1-\uddd3]|[\udddc-\uddde]|\udde1|\udde3|\udde8|\uddef|\uddf3|[\uddfa-\ude4f]|[\ude80-\udec5]|[\udecb-\uded2]|[\uded5-\uded7]|[\udedd-\udee5]|\udee9|[\udeeb-\udeec]|\udef0|[\udef3-\udefc]|[\udfe0-\udfeb]))|(\ud83e([\udd0c-\udd3a]|[\udd3c-\udd45]|[\udd47-\uddff]|[\ude70-\ude74]|[\ude78-\ude7c]|[\ude80-\ude86]|[\ude90-\udeac]|[\udeb0-\udeba]|[\udec0-\udec5]|[\uded0-\uded9]|[\udee0-\udee7]))|(\udb40([\udc62-\udc63]|\udc65|\udc67|\udc6c|\udc6e|[\udc73-\udc74]))
```

最后的灵魂问题：你真的应该用正则处理 Emoji 吗？

后记：自己造完了轮子之后，才发现已经有人做过这样的工作了，[emoji-test-regex-pattern](https://github.com/mathiasbynens/emoji-test-regex-pattern)。而且相比我的单字符匹配方式，这个 repo 里的 Regex 可以匹配代表 Emoji 的字符序列（如中国国旗=国旗+中国），更加符合 spec。