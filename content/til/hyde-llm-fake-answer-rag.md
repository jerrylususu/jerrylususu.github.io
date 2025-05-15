---
title: HyDE - 用生成的假答案来搜索嵌入 (2212.10496)
date: 2025-05-15T14:32:27.694Z
---

在读 Simon 的文章时，偶然学到这个精妙的小技巧（be like 这也行？）：

> A neat trick is you can ask an LLM to entirely synthesize a potential answer to the user’s question—then embed that artificial answer and find your own content that’s nearby in vector space!
> 
> 一个巧妙的小技巧是，你可以让大语言模型（LLM）完全合成一个用户问题的潜在答案——然后将这个人工生成的答案进行向量嵌入，并在向量空间中找到与你自有内容最接近的部分！

搜了下，原来 2022 年就有文章提出这个方法了，名叫 HyDE (Hypothetical Document Embeddings) 。

src: https://arxiv.org/abs/2212.10496

via: https://simonwillison.net/2025/May/15/building-on-llms/