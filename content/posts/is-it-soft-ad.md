---
title: 软文检测器
date: 2025-09-21T22:58:00+08:00
description: 以及如何（错误地）部署一个 LLM app
tags:
  - LLM
---

读某些新闻网站或公众号的时候，常常会越读越有种隐约的广告感（"这是广告吗？"），直到读到文末才彻底验证（”这果然就是广告吧！“）。之前买了 GLM 20 元一个月的 coding 套餐（agent 用的是 claude code），那就顺手 vibe coding 一个小工具来识别吧。于是就有了”软文检测器“。

- 在线访问: [https://nekonull.me/is-it-soft-ad/](https://nekonull.me/is-it-soft-ad/)
- Github: [https://github.com/jerrylususu/is-it-soft-ad](https://github.com/jerrylususu/is-it-soft-ad)

这个小 app 本身并没有什么特别值得说道的，毕竟只是顺手做的玩具，代码我也没有仔细审查，看起来似乎没啥问题而且也能跑就提交了。作为一个 llm wraper，基本上就是一个 fastapi 后端加一个很简单的 vanilla js 前端（甚至没有用框架），前端提交内容后扔给 llm，然后用 sse 推送响应，来避免前端长时间卡住不出结果。模型上用的是 gemini-flash-2.0，是我能找到的速度-质量-价格最佳平衡点，而且 gemini flash 本身就极其便宜了，极大缓解了我的 llm 用量焦虑。prompt 是 deepseek r1 写的，在 repo 的 json 文件里可以找到，生成后稍微人工调整了一下但没有大改。

有人可能会好奇，在 llm 生成响应的过程中，返回的 json 并不完整，前端是如何保证展示有效内容的呢。实际上这里参考了苹果 wwdc 25 的 [Snapshot streaming](https://wwdcnotes.com/documentation/wwdcnotes/wwdc25-286-meet-the-foundation-models-framework/#Snapshot-streaming)  的做法，虽然 llm 返回的响应并不是完整的 json，但是有库可以尝试从不完整的 json 解析出有效的 json，我用的是 [promplate/partial-json-parser](https://github.com/promplate/partial-json-parser)（原理大概是自定义一个更宽松的parser） ，在后端包一层，就可以确保前端每次 sse 拿到的 event 都是有效 json了（虽然可能部分字段不完整）。

自己稍微玩了玩，确认没啥问题了之后，就开始想怎么部署到公网上。vibe coding 极大简化了写代码（如果你不在乎这个项目的长期可维护性，只是想创建个能用的 mvp）；但是 vibe deploying 并没有成熟度能与之相当的工具链。不少人用 supabase，但是对我这样一个简单的 llm wrapper 来说未免有点太重了，部署在别人的平台上也有点感觉不太安心（担心哪天超过 free tier 被收钱，虽然概率极其之小）。自己部署的话，又有不少前期工作需要做，例如子域名、网关、https、daemon化等等。我之前大部分分享出去的小工具都是纯前端的，扔在 github pages 上就完事了，最多写个 yaml 配置下 ci，带后端的对外工具实际上这还是第一个。最后分享欲还是战胜了嫌麻烦的心态，决定后端扔在一个不怎么用的云服务器上（服务器本身的开销可以忽略不计），前端还是放 github pages。最后满打满算下来，这个项目写代码&自测的时间，可能还没有准备部署环境&实际部署的时间长。

关于 llm 的应用，其实还涉及到一个控制用量（aka 限额）的问题。虽然我倒是不太介意在这种小玩具上每个月花点小钱（一瓶无糖可乐的价格都够一个便宜 llm 模型用很久了），但是我不想失去控制我能花多少钱的能力。一开始想的是在后端自己写个限额，或者直接用现成的库，但感觉涉及到钱的话还是有些危险，于是搁置了。手写限额的话，还需要考虑状态存储，就又多引入了一层复杂性（例如 cloudflare worker kv 每天只有 1k 写额度，上 durable object 或者 d1 也太重了。）顺带吐槽下，国内好几家主流的 LLM 服务提供商，都没有 by api key 限制使用额度的能力，但是在国外（如 openrouter）或各类中转商，这是基础的不能再基础的能力了。最后找了个支持 api key 限额的中转服务商，才算放下心来，知道再怎么刷也不会把我的账户刷爆了。

最后是可观测性，出于一些小小的私心，还是希望看看有多少人用过。为此前端加了 google analytics，后端用 opentelemetry 上报 trace 到 uptrace （他们家免费额度很宽裕）。最后实际上因为没怎么做推广（只在两个论坛上发了简单介绍），当然也没啥人用，最后大概是一天10个请求的样子，我自己的请求可能就占了一半。

一些未来的可能优化点（如果我还有兴趣在这个项目上继续投入的话）：
- 把单纯的是否软文改成一个连续的光谱，或者至少多增加几个层级
- 现在对软文敏感度太高了，正常内容可能也会被认为是软文，看看怎么改 prompt 优化下
- 调查为啥得加 await asyncio.sleep 才能让 sse 正常工作
- 深入分析，补充到文内的引用
- 对文章按照”推广程度“染色（说实话我不太确定技术上这怎么实现）

另外还有一些想法：
- 可能对高级用户 bring your own key 的做法会更好，还能省去我部署后端的开发&运营复杂度；可能可以考虑把这个项目转换成一个支持自己提供 llm 接入和使用现成后端的模式？
	- 进一步地，是否存在这样的生态系统，提供了统一的 llm 接口（例如一个 js/ts sdk），用户只需要装一个插件，在插件内配置一次，各个网站就可以直接使用用户已配置的 llm 服务？（似乎 chrome 有个内置的小模型，但是很多事情小模型还是不太够用）
- 之前试过扣子空间，虽然搭建简单原型没问题，但是分享起来异常困难（例如有审核流程）；如果存在更简单的分享&创作方式，可能这类小但是有意义的 llm wrapper 会更广泛？
- 与其分享一个又一个 llm wrapper ，不如分享结构化 prompt 和支持运行结构化 prompt 的工具？（例如另一个之前的小创作 [llm-prompt-templater](https://pages.nekonull.me/llm-prompt-templater.html) ）

这篇文章有点混乱，想到哪里就写到哪里了，只是我个人的 brain dump。如果你能读到这里，那真是辛苦了。



