---
title: Constructing a RegEx that matches all emojis
date: 2021-12-13T16:50:43+03:00 
tags:
- hack
---


While researching a CSS custom emoji font issue, I came across a RegEx that can match all emojis (up to the 2018 version) and it also provides corresponding test examples. You can find it here: [Regex to match all emoji - Regex Tester/Debugger](https://www.regextester.com/106421)

```
(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])
```

After reading it, I was skeptical because the RegEx seemed too simple. So, I manually converted it to check the corresponding Unicode codepoint range, and I found that there is indeed a problem. The matching range of this RegEx is too broad, excluding the Copyright and Registered symbols (u+00a9, u+00ae), the remaining ranges are [u+2000, u+3300] and [u+1f000, u+1fbff]. The latter range seems reasonable, as it corresponds to the newly added emoji codepoints according to the Unicode plane mapping on Wikipedia. However, the former range is too extensive, even including Japanese Hiragana and Katakana characters. (Although it does cover almost all emoji codepoints, it misses some corner cases like selectors.)

So, how can we create a RegEx that accurately matches emojis? The idea is simple. First, we need to obtain the Full Emoji List from the Unicode official website, parse all the codepoints that belong to emojis, sort them, and finally merge adjacent codepoints into ranges. However, this is easier said than done. From the perspective of RegEx, characters are in UTF-16 (if using the form \uabcd), so codepoints higher than u+ffff need to be represented using surrogate pairs.

The final result is as follows: (Test link: [regex101](https://regex101.com/r/uGUM1M/1))
```
(\u00a9|\u00ae|\u203c|\u2049|\u20e3|\u2122|\u2139|[\u2194-\u2199]|[\u21a9-\u21aa]|[\u231a-\u231b]|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\u24c2|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|[\u2600-\u2604]|\u260e|\u2611|[\u2614-\u2615]|\u2618|\u261d|\u2620|[\u2622-\u2623]|\u2626|\u262a|[\u262e-\u262f]|[\u2638-\u263a]|\u2640|\u2642|[\u2648-\u2653]|[\u265f-\u2660]|\u2663|[\u2665-\u2666]|\u2668|\u267b|[\u267e-\u267f]|[\u2692-\u2697]|\u2699|[\u269b-\u269c]|[\u26a0-\u26a1]|\u26a7|[\u26aa-\u26ab]|[\u26b0-\u26b1]|[\u26bd-\u26be]|[\u26c4-\u26c5]|\u26c8|[\u26ce-\u26cf]|\u26d1|[\u26d3-\u26d4]|[\u26e9-\u26ea]|[\u26f0-\u26f5]|[\u26f7-\u26fa]|\u26fd|\u2702|\u2705|[\u2708-\u270d]|\u270f|\u2712|\u2714|\u2716|\u271d|\u2721|\u2728|[\u2733-\u2734]|\u2744|\u2747|\u274c|\u274e|[\u2753-\u2755]|\u2757|[\u2763-\u2764]|[\u2795-\u2797]|\u27a1|\u27b0|\u27bf|[\u2934-\u2935]|[\u2b05-\u2b07]|[\u2b1b-\u2b1c]|\u2b50|\u2b55|\u3030|\u303d|\u3297|\u3299)|(\ud83c(\udc04|\udccf|[\udd70-\udd71]|[\udd7e-\udd7f]|\udd8e|[\udd91-\udd9a]|[\udde6-\uddff]|[\ude01-\ude02]|\ude1a|\ude2f|[\ude32-\ude3a]|[\ude50-\ude51]|[\udf00-\udf21]|[\udf24-\udf93]|[\udf96-\udf97]|[\udf99-\udf9b]|[\udf9e-\udff0]|[\udff3-\udff5]))|(\ud83d([\udc00-\udcfd]|[\udcff-\udd3d]|[\udd49-\udd4e]|[\udd50-\udd67]|[\udd6f-\udd70]|[\udd73-\udd7a]|\udd87|[\udd8a-\udd8d]|\udd90|[\udd95-\udd96]|[\udda4-\udda5]|\udda8|[\uddb1-\uddb2]|\uddbc|[\uddc2-\uddc4]|[\uddd1-\uddd3]|[\udddc-\uddde]|\udde1|\udde3|\udde8|\uddef|\uddf3|[\uddfa-\ude4f]|[\ude80-\udec5]|[\udecb-\uded2]|[\uded5-\uded7]|[\udedd-\udee5]|\udee9|[\udeeb-\udeec]|\udef0|[\udef3-\udefc]|[\udfe0-\udfeb]))|(\ud83e([\udd0c-\udd3a]|[\udd3c-\udd45]|[\udd47-\uddff]|[\ude70-\ude74]|[\ude78-\ude7c]|[\ude80-\ude86]|[\ude90-\udeac]|[\udeb0-\udeba]|[\udec0-\udec5]|[\uded0-\uded9]|[\udee0-\udee7]))|(\udb40([\udc62-\udc63]|\udc65|\udc67|\udc6c|\udc6e|[\udc73-\udc74]))
```

The ultimate question: Should you really use regex to handle emojis?

Postscript: After reinventing the wheel, I discovered that someone has already done this work in the [emoji-test-regex-pattern](https://github.com/mathiasbynens/emoji-test-regex-pattern) repository. Moreover, compared to my single character matching approach, the regex in this repo can match sequences of characters that represent emojis (such as the Chinese flag = flag + China), which is more in line with the specification.