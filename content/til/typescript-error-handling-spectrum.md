---
title: TypeScript 中的错误处理光谱
date: 2025-03-20T15:56:18.346Z
---

看了 Theo 的一个视频，讲到了 TypeScript 中的错误处理，把各种“流派”按照对错误的态度（从不在意到视为核心）划分了一个光谱：

- 完全不管：默认状态，到处 try catch （很不幸我也是这样的）
- 低度关心：认识到错误需要被明确表达，而不是被隐藏在执行流中；用 tryCatch 或类似实现，让错误在调用返回中明确（`const {data, err} = await someFunc()`，类似于 Go 的写法）
- 中等关心：认为需要一个专门的库来封装错误；例如 `neverthrow`，实现了 Rust 风格的 Ok, Err 和 chaining
- 高度关心：认为需要围绕错误和异常状态设计整个应用；例如 effect 作为一个完整的框架，写起来其实已经不像是 TypeScript 了

我自己在写代码的时候，其实有的时候也会对到处 try-catch，catch 了又 throw 有点烦躁，但是不知道什么是更好的做法。看起来可以试试低度关心，再给错误层级有合理封装（至少 throw 之前包一层）。

video: https://www.youtube.com/watch?v=Y6jT-IkV0VM

- tryCatch: https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
- neverthrow: https://github.com/supermacro/neverthrow
- effect: https://effect.website/