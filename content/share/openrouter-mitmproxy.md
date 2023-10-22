---
title: 用 mitmproxy 重定向 OpenAI 请求到 OpenRouter
date: 2023-10-22T20:55:00+08:00
tags:
    - LLM
    - 网络
---

## 背景
最近在尝试使用一些基于 GPT 开发的工具，但遇到了一些网络相关的小问题。因为支付方式的限制，我自己并没有 OpenAI 的账户，实际使用的 API 是其他中间商（aka 二道贩子）转卖而来的， [OpenRouter](https://openrouter.ai/docs#models) 就是其中一家。（实际上 OpenRouter 做的还更多一些，更像是 LLM 的聚合提供商，除了 OpenAI 也有其他家的 LLM，如 Claude 或是 LLama。）但是很多开源工具并未考虑到这种情况，基本上都是假定用户使用的就是 OpenAI 的官方 API 端点，所以很多时候并不能直接使用各类预先构建好的产物（例如 docker 镜像），而是得把源码 clone 下来，找到 `import openai` 或者是类似的调用发起位置，再在附近补充一些参数才能正常使用。手动改代码固然不是不行，但是总归还是有些繁琐，出问题的时候还额外增加了一个需要排查的环节。

## 问题
有没有更好的，更自动化的方式，例如在网络上加个代理层，在第三方工具无需修改的前提下，就可以将 OpenAI 的请求转换成 OpenRouter 的请求呢？

## 解决
那既然都写到这里了，当然是有的。这里的核心是一个 man-in-the-middle （mitm / 中间人）代理，在请求到达代理的时候，修改请求中的内容，使之符合我们的要求，之后再继续对外发送就可以了。[mitmproxy](https://mitmproxy.org/) 就是这样一个工具。当然它的功能远不止修改请求，在完善的 Python API 的加成下还能做很多其他的事。（同类的工具其他工具，如 Fiddler，应该也能实现，但方法就需要给位自行探索了。）以下就是实现本次需求的核心代码，应该不需要太多解释。

```python
import json
from mitmproxy import http

def request(flow: http.HTTPFlow) -> None:
    # 只处理 HOST 为 api.openai.com，且请求体为 JSON 的 POST 请求
    if flow.request.host == "api.openai.com" and flow.request.method == "POST" and flow.request.headers.get("content-type", "").startswith("application/json"):
        try:
            flow.request.host = "openrouter.ai"
            flow.request.path = "/api/v1/chat/completions"
            flow.request.headers["authorization"] = "Bearer sk-xxxxxxxxxx" # token
            flow.request.headers["http-referer"] = "http://localhost:8080/my_great_app" # 应用标识
            request_data = json.loads(flow.request.get_text())

            # 甚至可以在这里切换模型
            # request_data["model"] = "anthropic/claude-instant-v1"

            flow.request.set_text(json.dumps(request_data))
            pass
        except json.JSONDecodeError:
            pass

# 需要声明回包支持 stream，否则会等待全部数据到达再返回给应用，无法实现 LLM 打字效果
def responseheaders(flow):
    flow.response.stream = True
```

启动 mitmproxy 时需要带上 Python 脚本参数，以及如果有上游代理则需要再声明：
```
mitmweb --mode upstream:http://{upstream_addr} -s openrouter.py
```

启动后会弹出 mitmproxy 的网页控制台，这时候就用第三方工具发请求试试了，一切顺利的话可以看到结果正常返回且网页上显示请求数据。如果出现问题也可以看命令行窗口的输出。如果第三方工具本身支持设置应用内代理（如 [Chatbox](https://github.com/Bin-Huang/chatbox)）则最理想；不支持的话可以考虑设置系统代理、用 mitmproxy 的[透明代理模式](https://docs.mitmproxy.org/stable/howto-transparent/)、或者用 [Proxifer](https://www.proxifier.com/) 这类工具来强制应用代理。