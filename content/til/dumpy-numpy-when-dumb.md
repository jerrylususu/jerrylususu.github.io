---
title: DumPy - 没有聪明技巧，用起来更省心的 Numpy 封装
date: 2025-05-23T15:23:59.830Z
---

NumPy 功能多，速度快，但是广播机制容易引发错误，高维操作时 dim 和 None 到处乱飞，用起来心智负担很重。鉴于此，作者封装了 DumPy，用类似循环的语法​（显式索引）表达高维操作，但实际通过​向量化编译​来加速执行；计算时使用的维度也需要显式声明表达意图，再也不用瞎猜了。

src: https://dynomight.net/dumpy/

related: https://dynomight.net/numpy/