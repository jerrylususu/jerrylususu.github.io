---
title: BOCU-1 - Unicode 的差分编码
date: 2025-05-31T10:59:38.907Z
---

UTF-8 作为变长编码，对 ASCII 很省空间，但是对于中文就不太友好了（一般需要 3 个 byte）。

BOCU-1 是一个变长"差分"编码，每个字符不是被直接编码，而是先计算和一个 `prev` 字符的差值，然后用 1 到 4 个 byte 编码这个差值。对于部分占据较大连续区间的字符组合（例如 CJK 统一汉字），会直接用区间中点作为 `prev`，从而减少存储占用，对中文而言大概是 25%。另外实际实现时，还做了一些特殊优化，来保证 BOCU-1 编码后的二进制排序和原始文本的排序一致（意味着可以用于数据库中压缩有序的字符串列表）。

这段来自 Unicode 文档的伪代码已经很直接了：

```
encode(int &prev, int c) {
    if(c<=0x20) {
        output (byte)c;
        if(c!=0x20) {
            prev=0x40;
        }
    } else {
        int diff=c-prev;
        // encode diff in 1..4 bytes and output them

        // adjust prev
        if(c is Hiragana) {
            prev=middle of Hiragana;
        } else if(c is CJK Unihan) {
            prev=middle of CJK Unihan;
        } else if(c is Hangul) {
            prev=middle of Hangul;
        } else {
            prev=(c&~0x7f)+0x40;
        }
    }
}
```


src: https://www.unicode.org/notes/tn6/

via: https://evanhahn.com/notes-from-may-2025/

impl: https://github.com/aamarks/bocu/blob/master/bocu.js