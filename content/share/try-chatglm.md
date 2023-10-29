---
title: 用 mitmproxy 让 ChatGLM 适配 OpenAI 接口
date: 2023-10-29T19:41:00+08:00
tags:
    - LLM
    - 网络
---

最近看到了几篇关于智谱 AI 的推送文章，才想起来他们的大模型（ChatGLM 系）已经上线好久了。回想 6B 模型刚公布的那会还在 AutoDL 上自己跑过，不过因为模型本身太小，所以其实能做的并不算多。注册了个开发者账户看了看文档，目前可以广泛使用的是 [ChatGLM-Turbo](https://open.bigmodel.cn/pricing)，上下文窗口 32k token，定价 0.005 元/千token，还是很便宜的。更不用说因为 GLM 系模型以中文语料为主，所以同等长度的中文文本，用 GLM 的 token 消耗比用 GPT 系列的 token 消耗会小很多（测试下来大概在 4x 左右）。

官网的 Playground 玩了一会感觉还不错，生成的中文明显感觉更自然，没有 GPT 系那么浓烈的翻译腔，于是想着怎么接入到我自己用的客户端 [Chatbox](https://github.com/Bin-Huang/chatbox) 中日常使用。Chatbox 有内置的 ChatGLM 支持，一般直接设置下 token 就可以了。但是因为我主要用的还是 GPT 系模型，而 Chatbox 又只能全局设置一个 API 服务器字段，所以如果要同时使用 GPT 和 ChatGLM 的话，还是得用之前提到的 mitmproxy，手动完成请求的中转（没有什么是加一个抽象层不能解决的）。这里用 mitm 方式让 GLM 适配 GPT 接口还有个额外的好处，那就是只支持 OpenAI 的第三方应用也可以自动支持 GLM 了（虽然我还没这么用过）。

和之前适配 OpenRouter 不一样，这次除了修改请求头，还要修改 SSE 响应体。不知道出于什么考虑，GLM 系列模型的响应事件和 GPT 系列的完全不同，修改起来还是有些复杂的。但总之调试了几个小时之后总算是改完了，代码在此：(不建议在生产环境使用，后果自负)

[https://gist.github.com/jerrylususu/3ebcf6262d110da89ce58d1e8d55bc22](https://gist.github.com/jerrylususu/3ebcf6262d110da89ce58d1e8d55bc22)

<script src="https://gist.github.com/jerrylususu/3ebcf6262d110da89ce58d1e8d55bc22.js"></script>

改请求头比较简单，修改如下：
1. 换 host 和 path
2. 换 Authorization 头：参考 GLM 开发文档的"鉴权"一节即可（注意这里要用 `PyJWT` 库，直接二进制安装的 `mitmproxy` 带的 Python 环境不支持安装包，需要走 `pipx` 安装，可参考[官方文档](https://docs.mitmproxy.org/stable/overview-installation/#installation-from-the-python-package-index-pypi)）
3. 消息列表（`messages`）修改：GLM 系里叫做 `prompt`，而且根据实测只能支持 `user`-`assistant` 交替，如果存在 `system` 或是有两个连续的 `user` 消息都会报错；这里稍微转换了下，把所有的非 `user`/`assistant` 消息都转成 `user`，然后手动连接下连续的同 role 消息，保证最后构造的消息列表是两个角色交替。
4. 开启增量返回：默认似乎是全量返回，这里和 OpenAI 对齐，也改成增量

比较烦人的是改响应体，如下所示分别是 GLM 系的返回和 GPT 系的返回。可以发现 GLM 系列比较简单，只有事件类型、流 ID 和增量数据；GPT 系列就更复杂一些，返回的是个 JSON，里面还有嵌套结构。

```python
# GLM
b'event:add\nid:8065135252561182716\ndata:\xef\xbc\x8c\n\n'
# GPT
b'data: {"id": "chatcmpl-8EymH9k9DS9iQQvIH3BguHaZqmib9", "object": "chat.completion.chunk", "created": 1698580913, "model": "gpt-3.5-turbo-0613", "choices": [{"index": 0, "delta": {"content": "?"}, "finish_reason": null}]}\n\n'
```

这里的改造思路其实很明确，先解析 GLM 的响应体，再据此拼装成 GPT 的相应格式，然后返回给应用就可以了，然而具体做起来还是有不少坑。
- 一开始想的是直接 decode 之后分行解析，后来发现不太确定是信道问题还是服务器问题，有的时候接收到的 SSE 事件只有一半（导致 utf-8 decode 失败），或者是两个事件被合并成了一个事件（一个 SSE data 里面有两个 add 事件）。用国内的术语来说这个算粘包？为了解决这个问题，先把行解析改成了正则解析，然后用补充了一个 buffer，如果发现这次的事件不完整就先扔 buffer 里，等下一个事件凑齐了再一起解析。
- 改完发现可以正常显示回复了，但是一直不能结束。还需要参考 OpenAI 的响应，额外补充 `DONE` 事件。
- 这样改完倒是基本能用了，但接下来发现还是不太对劲，生成代码的时候会多一个空格。这里看了响应数据，返回响应的确如此，于是在 data 开头两个空格的时候手动删掉一个。
- 然后发现生成 markdown 列表的时候换行消失了。查响应发现有时会有多个 `data:`，需要每个都处理。

目前的效果算是初步可用了吧，但是偶尔如果响应本身不完整（例如某个 SSE 事件返回了不完整的 utf8 编码字符串，下一个事件没有包含丢失的数据），那就会直接报错。不过考虑到实际频率比较低，重试的成本比较小，这里还算可以接受吧。
