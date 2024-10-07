---
title: 基于 WebRecorder 和 MitmProxy 的图片手动抓取探索
date: 2024-10-07T13:58:00+08:00
tags:
    - 网络
---
最近收到任务，需要从某个站点下载一系列图片。首先当然是 F12 看下网络请求。这是一个无限滚动的瀑布流，图片地址本身是随机的（看起来文件名像是 uuid），所以没法直接遍历图片地址；此外每次滚动到底，都会触发一个获取下一页图片地址的请求，参数传的还是游标而不是页数，这又断绝了直接构造分页请求（例如 `page=1`）获取所有图片地址，再逐个拉取的念头。好在总图片数是有限的，大概在 2k 左右，每次下拉能拉回 50 条，所以手动抓取也不是不能接受。以下是两种手动抓取的思路。注：这里的手动抓取，指的是在浏览器前端通过模拟人类行为，无侵入且不对网站发起额外请求的抓取方式。

## 前置准备：AHK 翻页器

一个简单的小工具，每隔一段时间自动按 page down 翻页（建议提前 zoom out 调小页面比例，这样滚动起来效率更高）

<details>
<summary>AHK 翻页器代码</summary>

```autohotkey
#Requires AutoHotkey v2.0

; 创建一个 GUI
MyGui := Gui()
MyGui.Add("Text", "x10 y10", "Auto Page Down:")
toggle := MyGui.Add("Checkbox", "x10 y30 vToggleState", "Enable")
MyGui.OnEvent("Close", (*) => ExitApp())
MyGui.Show()

; 设置全局变量以跟踪定时器状态
global keyHeld := false

; 定时器：每0.1秒检查一次开关状态
SetTimer(CheckToggleState, 100)

; 主循环
CheckToggleState()
{
    global keyHeld  ; 声明 keyHeld 为全局变量

    if (toggle.Value) {
        if (!keyHeld) {
            ; 如果勾选了启用选项，并且哔哩哔哩窗口处于活动状态
            RandomDelayAndSendPageDown()
            keyHeld := true
        }
    } else {
        if (keyHeld) {
            ; 如果没有勾选启用选项，停止按键操作
            keyHeld := false
        }
    }
}

; 生成随机延迟并发送 Page Down 键
RandomDelayAndSendPageDown()
{
    ; 生成 500 到 1000 毫秒之间的随机延迟
    RandomDelay := Random(500, 1000)
    SetTimer(PressPageDown, RandomDelay)
}

; 按下 Page Down 键
PressPageDown()
{
    global keyHeld  ; 声明 keyHeld 为全局变量
    
    if (toggle.Value) {
        Send("{PgDn}")
        RandomDelayAndSendPageDown()  ; 继续下一次按键
    } else {
        keyHeld := false
    }
}
```

</details>


## 思路1：WebRecorder

概述：用 WebRecorder 插件，录制网络请求（WebRecorder 插件会 hook 浏览器的 XMLHttpRequest 机制），dump 出 [warc](https://en.wikipedia.org/wiki/WARC_(file_format))  (Web Archive）文件，然后再解析文件，从中提取 mime 类型为图片的文件（或者知道 URL 格式的话也可以用 URL 格式匹配）。

限制：导出的时候存在文件大小限制（Chrome 下似乎是 2G，也取决于可用内存大小），总文件大小太大的话可能会有问题。

步骤：
1. 安装 Chrome 插件 [Webrecorder ArchiveWeb.page](https://chromewebstore.google.com/detail/webrecorder-archivewebpag/fpeoodllldobpkbkabpblcfaogecpndd)
2. 浏览器插件栏找到 Webrecorder，点击 Start Archiving
3. 跳转到需要抓取的网页
4. 打开翻页器，一直往下滚动
5. 完成后打开插件，点击 Stop Archiving
6. 点击插件界面内的 Home 按钮，找到刚才的 Archiving Session，点击 Download，下载一个 wacz 文件到本地
7. 修改扩展名为 zip，将其中的 archive/data.warc.gz 文件解压出来，得到 data.warc 文件
8. 运行如下 Python 脚本，解析 warc 文件，并从中提取图片内容

<details>
<summary>Python 解析 WARC 代码</summary>

```python
from warcio.archiveiterator import ArchiveIterator
import os
import re

# 定义一个函数过滤掉不支持的字符
def sanitize_filename(filename):
    # 定义不允许的字符
    invalid_chars = r'[\\/:*?"<>|]'
    # 替换这些字符为空字符，或者可以替换为下划线 "_"
    sanitized_filename = re.sub(invalid_chars, '_', filename)
    return sanitized_filename

# 提取 WARC 文件中的图片、视频资源
def extract_resources_from_warc(warc_file, output_dir):
    with open(warc_file, 'rb') as stream:
        for record in ArchiveIterator(stream):
            if record.http_headers:
                content_type = record.http_headers.get_header('Content-Type')
                if content_type and 'image' in content_type:
                    # 获取资源文件的 URL
                    url = record.rec_headers.get_header('WARC-Target-URI')
                    print(url)

                    # 获取资源文件内容
                    content = record.content_stream().read()
                    
                    # 确定文件扩展名
                    ext = 'jpg' if 'image' in content_type else 'mp4' if 'video' in content_type else ''
                    if ext:
                        # 生成文件名
                        sanitized_url = sanitize_filename(os.path.basename(url))
                        filename = os.path.join(output_dir, sanitized_url) + '.' + ext
                        print("filename", filename)
                        # 保存文件
                        with open(filename, 'wb') as f:
                            f.write(content)
                        print(f"Extracted: {filename}")

# 示例用法
warc_file = 'data.warc'
output_dir = 'extracted_resources'
os.makedirs(output_dir, exist_ok=True)
extract_resources_from_warc(warc_file, output_dir)

```

</details>


## 思路2：MitmProxy

概述：安装 mitmproxy，设置浏览器代理指向 proxy，浏览时从响应中直接过滤出图片内容并保存到本地

限制：似乎没什么限制

步骤：
1. 安装 [mitmproxy](https://docs.mitmproxy.org/stable/overview-installation/)
2. 保存以下 Python 脚本为 `save.py`

<details>
<summary>mitmproxy save.py</summary>

```python
import os
import re
from mitmproxy import ctx, http

# 定义文件保存目录
save_dir = "saved_media"

# 确保目录存在
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 定义一个正则表达式，匹配Windows非法的文件名字符
def sanitize_filename(filename: str) -> str:
    # 替换非法字符为下划线
    return re.sub(r'[<>:"/\\|?*]', '_', filename)

def response(flow: http.HTTPFlow):
    # 获取响应的Content-Type
    content_type = flow.response.headers.get("Content-Type", "")

    # 判断是否为图片或视频类型
    if "image" in content_type:
        # 获取文件扩展名
        ext = content_type.split("/")[-1]

        # 从请求路径中尝试提取文件名，如果路径中没有文件名，则使用flow.id
        url_path = flow.request.path.split("/")[-1]
        if "." in url_path:  # 判断路径中是否包含文件扩展名
            raw_filename = url_path
        else:
            raw_filename = f"{flow.request.host}_{flow.id}.{ext}"

        # 对文件名进行清理，确保符合Windows的文件名要求
        safe_filename = sanitize_filename(raw_filename)

        # 确定完整的保存路径
        filepath = os.path.join(save_dir, safe_filename)

        # 记录日志，打印保存的文件名和URL
        ctx.log.info(f"Saving file: {filepath} from URL: {flow.request.url}")

        # 保存文件内容
        with open(filepath, "wb") as f:
            f.write(flow.response.content)

        # 打印成功保存的日志
        ctx.log.info(f"Saved {filepath}")
```

</details>

3. 运行 mitmproxy
```bash
# 需要先 cd 到 save.py 所在的目录
# 可以添加 --mode upstream:http://localhost:7890 来指定上游代理
mitmweb -s save.py
```
4. 设置浏览器，指向 mitmproxy 代理（可能你需要 [proxy switchyomega](https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)）
5. 跳转到需要抓取的网页，打开翻页器
6. 滚动到底部，且所有图片加载完成后，需要抓取的图片应该都已经保存到本地了