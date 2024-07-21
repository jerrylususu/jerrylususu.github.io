---
title: 2024 年了，我最近在用什么工具
date: 2024-07-21T21:53:00+08:00
description: 在 MacOS 下重建工作流；顺带还提及了各类工具中使用的插件
tags:
  - 分享
  - 备忘
---

## 2024 年了，我最近在用什么工具

去年年中，公司的主力开发设备从 Windows 换成了 Mac，之前在 Windows 上用的各类工具需要重新在 Mac 上找对应的替代品。一年磨合下来现在已经差不多稳定了，特此记录（其实之前就应该记录的，但是太懒）。如果能帮助到各位读者就更好了。当然也欢迎评论推荐更多你认为好用的工具。

## 独立工具

（此处的独立指的是软件本身可以独立运行，与之相对的是插件）

- [VS Code](https://code.visualstudio.com/)：宇宙 IDE（装了足够多插件之后）
- [Kate](https://kate-editor.org/)：KDE 家的文本编辑器，功能齐全但是又没有 VS Code 那么重，临时处理些文本比较方便；之前不支持 M 系列处理器，2024 年初更新后总算支持了
- [CudaText](https://cudatext.github.io/)：用来当作思维 buffer，优点是自带置顶（其他软件都很难做到）和自动保存，目前已经开了 100+ Untitled Tab 了但是依然很稳定
- Apple Notes：用来记录手头临时的待办事项，避免消息太多跟丢
- [Obsidian](https://obsidian.md/)：用来做[工作笔记](https://news.ycombinator.com/item?id=40950584)，其实就是对每个任务建一个文件，然后把所有相关信息全部丢进去；偶尔也用用 canvas 功能
- [Utools](https://www.u.tools/)：小工具聚合器，例如 JSON 格式化、二维码生成、base64编解码、timestamp 生成和解析、变量名大小写转换；绑定到 Opt+Space
- [RayCast](https://www.raycast.com/)：主要用来窗口切换和左右分屏，其他的功能用的不多；绑定到 Alt+Space
- [Snipaste](https://www.snipaste.com/)：截图 & 贴图是我工作流的重要部分，已经完全离不开了
- [Karabiner-Elements](https://karabiner-elements.pqrs.org/)：之前从 Windows 切换过来的时候用于改键（左 Ctrl -> 左 Cmd）；现在键位熟悉之后用的不多了
- [Hidden Bar](https://github.com/dwarvesf/hidden)：隐藏托盘区域的图标（这居然不是 OS 自带的功能？Windows 用户理解不能）
- [Maccy](https://github.com/p0deje/Maccy)：剪贴板历史（救了我好几次）
- [Stats](https://github.com/exelban/stats)：用来显示内存占用（可能和我的用法相关，虽然已经是 32G 内存的配置了，但是使用超过一周依然会有内存泄漏，内存压力红了之后只能重启）
- [UnnaturalScrollWheels](https://github.com/ther0n/UnnaturalScrollWheels)：修复外接鼠标滚动方向相反的问题（我觉得这也应该是个 OS 级别功能）
- [Draw.io](https://draw.io/)：画各种图
- [EasyFind](https://www.devontechnologies.com/apps/freeware#:~:text=Spotlight%20for%20Experts-,EasyFind,-Spotlight%20is%20great)：Windows 文件搜索工具 Everything 的 MacOS 下位替代，但是总比没有强
- [Timer](https://github.com/michaelvillar/timer-app)：倒计时小工具，拟物风很棒；用来提醒我该在发布单上点击下一步了
- [MacZip](https://ezip.awehunt.com/)：用了这么久 Mac 还是不能适应双击压缩文件自动解压的逻辑，还是能先预览下压缩包内容比较好
- [Insomnium](https://github.com/ArchGPT/insomnium)：类 Postman 工具，但不用登录在线账户，local-first；虽然已经停止开发，但是功能已经足够齐全了
- [ActivityWatch](https://activitywatch.net/)：记录下今天上了多少班
- [Chatbox](https://chatboxai.app/)：最好用的 OpenAI API 客户端，支持刷新上下文、显示 token 用量、消息修改、消息重放（btw 自认为目前用下来综合表现最强的 LLM 是 deepseek-coder，便宜大碗也足够智能）

## Obsidian 插件

- [Electron Window Tweaker](https://publish.obsidian.md/hub/02+-+Community+Expansions/02.05+All+Community+Expansions/Plugins/obsidian-electron-window-tweaker)：让 Obsidian 窗口也能够置顶
- [Git](https://github.com/Vinzent03/obsidian-git)：自动把变更提交到 Git 库，避免数据丢失（我设置的是 10 分钟一次）；另外偶尔看看 blame 还有成就感（原来这个文件已经被我改了这么多次了）
- [Tasks](https://publish.obsidian.md/tasks/Introduction)：将所有文件里的任务收集起来，创建统一的任务视图
- [Vertical Tabs View](https://github.com/hdykokd/obsidian-vertical-tabs-view)：标签页太多的时候，可以用纵向列表列出所有标签页（也和我 Edge 的使用习惯一致）
- [New Tab +]：避免同一个文件被打开在多个 tab 中
- [Another Quick Switcher](https://github.com/tadashi-aikawa/obsidian-another-quick-switcher)：解决 Quick Switch 时，默认搜索结果是按照文件名排序而不是最近修改时间排序的问题
- Unique Note Creator：官方插件，可以直接创建一个带有时间戳的笔记并应用模板；用来在出现新工作时创建对应的工作笔记

（顺带一提，为了和 VS Code 使用习惯一致，Quick Swtich 绑定到 Cmd+R，command palette 绑定到 Cmd+Shift+P）
## 浏览器插件

（目前用的是 Edge，纵向标签页没有其他浏览器支持）

- [沉浸式翻译](https://immersivetranslate.com/?force=1)：外文长文必备
- [ModHeader](https://modheader.com/)：调试用，主要拿来改 request header
- [Inssman](https://www.inssman.com/)：调试用，主要拿来该 request body（其他的相关插件，例如 Requestly 似乎都要求登录）
- [Earth View From Google Earth](https://chrome.google.com/webstore/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh?hl=zh-CN)：在新标签页展示航拍景象，换换心情
- [Page Notes](https://chromewebstore.google.com/detail/page-notes/omjdheidbhoghpfdnndkgoelfiogjfla)：可以保存和某个域名/ URL 相关的笔记；我自己的用法主要是在日志查询页上放一些常见的查询条件，省的来回翻找
- [Picture-in-Picture Extension (by Google)](https://chromewebstore.google.com/detail/picture-in-picture-extens/hkgfoiooedgoejojocmhlaklaeopbecg)：画中画插件，`<video>` tag 的视频都能用，摸鱼必备
- [Session Buddy](https://chromewebstore.google.com/detail/session-buddy/edacconmaakjimmfgnblocblbcdcpbko)：定时备份打开的标签页，对我这种日常 100+ tab 的用户很友好
- [VerticalTabs](https://chromewebstore.google.com/detail/verticaltabs/imimolldggofidcmfdkcffpjcgaggoaf)：在 tab 之前切换（但后来发现 Cmd+Shift+A 更好用）；现在只是用来显示打开 tab 的个数，超过 150 了就得关一批
- [TamperMonkey](https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN)：针对内部不好用的网站，写了很多 JS 小脚本来改善用户体验

还有些小工具网站：
- [JupyterLite](https://jupyter.org/try-jupyter/lab/)：一个基于 WebAssembly 在浏览器内运行 Python 和 Jupyter 的环境，临时写点东西或者调试都很方便
- [Day Tracker](https://nekonull.me/day-tracker/)：之前自己写的小工具，看今天还要上多久班

## VS Code 插件
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)：可以给特定的代码行加书签；大代码库或者是逻辑拆的太碎的时候需要
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)：行内显示报错信息，不需要手动在波浪线上 hover 也能看到
- [Todo Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)：将所有 TODO 高亮出来
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)：和 VS Code 自己的 Git 能力配合使用，就再也用不上其他的 Git GUI 了；行内 Git Blame （浅色文字显示这一行上次的修改来源）和 File History （和该文件相关的所有 commit）很有用
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)：改 HTML 的时候可以临时起个服务器，文件修改后自动刷新
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)：GitLens 的分支图是收费功能，可以用这个插件替代
- [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)：缩进可视化
- [Stats Bar](https://marketplace.visualstudio.com/items?itemName=njzy.stats-bar)：显示机器状态（CPU/内存/网络）；主要用来看云开发机的内存是否又爆炸了
- [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)：写 TypeScript 必备，输入`$`且时自动把当前字符串变量的 `"` （一般字符串）换成 `` ` ``（模板字符串）