# 兼容性清单

**基线**：线上站点 <https://nekonull.me/> 的当前状态。取自它的两个 sitemap（中文 158 条 + 英文 29 条），
外加对分页、feed 和静态路径的直接探测。

**重建版**：本目录，用 Hugo Extended 0.165.0 + OINK v1.1.0 构建。

复现 URL 检查：`python3 tools/compare_urls.py`

---

## 一、已验证完全一致

### 1.1 读者可见的 URL —— 187 / 187

| | 数量 |
| --- | --- |
| 基线中的线上 URL | 187 |
| 重建版复现出来的 | 187 |
| **缺失** | **0** |

四个栏目（`/posts/`、`/share/`、`/til/`、`/archive/`）、两个独立页（`/about/`、`/project/`）、
`/en/` 下的整个英文树、以及完整的标签体系（`/tags/` + 31 个中文词条 + 10 个英文词条），
全部落在原来的路径上。

没有用到任何 `url` 或 `slug` 前置字段：栏目名和文件名原样保留，而 OINK 用的是 Hugo 默认的 pretty URL ——
和旧站同一种形态。

### 1.2 分页 —— 一致

`pagerSize` 保持 20（与旧配置相同），博客索引按日期倒序排列。与线上逐条比对：

| URL | 线上 | 重建版 |
| --- | --- | --- |
| `/posts/page/2/` | 200 | 生成 |
| `/share/page/2/` | 200 | 生成 |
| `/share/page/3/` | 404 | 不生成 |
| `/til/page/2/`、`/til/page/3/` | 200 | 生成 |
| `/en/posts/page/2/` | 404 | 不生成 |
| `/tags/llm/page/2/` | 404 | 不生成 |

`/zh/` 是 Hugo 为默认语言前缀自动生成的跳转（指向 `/`）。线上站点也有这个文件，只是 sitemap 里不列它。

### 1.3 评论 —— 131 个文章页，线程全部接得上

giscus 的 `repo`、`repoId`、`category`、`categoryId` 和 `mapping: pathname` 都与原来**完全一致**。
因为 `pathname` 映射是用页面 URL 作为讨论线程的键，而 URL 没有变，所以每一个已有的 GitHub Discussion
线程都会被自动复用。

已存储的评论本身没有任何改动 —— 它们存在 GitHub Discussions 里，不在这个仓库里。

作用范围与旧站严格一致：

- 131 个页面带评论块 —— 正好就是旧配置里 `disqusSections` 列出那些栏目下的文章
- 栏目首页、分页页、`/tags/` 与 `/tags/<词条>/`、`/about/`、`/project/` 都没有 —— 旧主题只在
  `single.html` 里渲染评论区

拿一个线上文章和重建版逐项对比过属性：

| 属性 | 线上 | 重建版 |
| --- | --- | --- |
| `data-repo` | `jerrylususu/jerrylususu.github.io` | 相同 |
| `data-category` | `Blog Comments` | 相同 |
| `data-mapping` | `pathname` | 相同 |
| `data-strict` | `1` | 相同 |
| `data-reactions-enabled` | `1` | 相同 |
| `data-input-position` | `top` | 相同 |
| `data-lang` | `zh-CN` | 相同 |
| `data-theme` | `preferred-color-scheme` | `auto`（见第 2 节） |

### 1.4 Feed —— 同样的端点、同样的条目 id、同样的全文

线上提供的每一个 feed 都在同一个 URL 上重新生成：

`/index.xml`、`/til.xml`、`/posts/index.xml`、`/share/index.xml`、`/til/index.xml`、
`/archive/index.xml`、`/en/index.xml`、`/en/posts/index.xml`、`/en/share/index.xml`、
`/en/archive/index.xml`、`/tags/index.xml`、`/tags/<词条>/index.xml`、`/en/tags/index.xml`、
`/categories/index.xml`

保留的旧行为：

- `<guid>` 仍然是页面 permalink —— 订阅者的已读状态不受影响
- `<description>` 里仍然是**整篇文章渲染后的 HTML**，不是摘要
  （OINK 默认只输出摘要，由 `layouts/_default/rss.xml`、`layouts/_default/tilrss.xml`、
  `layouts/blog/rss.xml` 三个站点模板改回全文）
- 沿用旧配置 `rssLimit = 25` 的 25 条上限
- `/index.xml` 仍然排除 TIL；`/til.xml` 仍然只含 TIL

线上 feed 里出现过的每一个条目 id，在重建版的 feed 里都有（对 9 个 feed 做了集合差集比对）。
重建版的 feed 是**超集**：它们还包含线上缺失的最新文章 —— 线上那几个栏目 feed 是陈旧残留文件，
因为旧配置早已把 RSS 从 `outputs.section` 里去掉，而部署步骤又用了 `keep_files: true`。
超出 25 条窗口的条目会被轮换出去，这是 feed 的正常行为。

### 1.5 其他

- **Google Analytics** —— 相同的 `G-R01JLDY2KE`，出现在 193 个 production 页面上。
  OINK 只在 production 的 HTML 输出里加载它，所以本地预览不会被统计。
- **图片** —— `static/img/` 里的 11 个文件全部按原路径提供。
- **内容** —— 140 个文件，正文与源仓库逐字节相同。唯一的新增是 front matter 里的几行
  （`type` / `cascade` / `comments`），正文一个字都没动。

---

## 二、有意做出的差异

### 2.1 界面

这是预期之内的：你要求现代化。`manis` 主题被 OINK 取代。

- 亮色 / 暗色 / 跟随系统 三态主题切换，系统字体，蓝色主色调
- 文章页多了栏目侧栏、目录轨道、上/下一篇导航、适用的地方有面包屑、阅读时长
- 导航栏的 `/tags` 变成一个下拉菜单，列出所有标签及各自的文章数
- 全文离线搜索
- 每个页面都有打印视图，位于 `/_print/`
- "复制为 Markdown" —— 140 个按页生成的 `.md`
- `/llms.txt`，供 agent 消费
- 新增键盘导航和 Command Palette

你评审后提的问题，四条都已经处理：

1. **导航栏标题** —— OINK 把站点标题按短标识排版（Chakra Petch、`0.14em` 字距、蓝铜渐变文字）。
   那套是给一个词的品牌名设计的，用在 “Nekonull's Garden” 上很散。已在
   `assets/scss/_styles_project.scss` 改回正文字体、正常字距、600 字重、实色。
2. **「这篇文档解决了你的问题吗？」控件** —— 已移除（`params.ui.feedback: false`）。旧站没有这个控件。
3. **分享按钮** —— 已移除（`params.ui.share: []`）。旧站没有分享栏。
4. **Command Palette 里的 GitHub 写操作** —— 「编辑当前页面」「添加子页面」「提交议题」「查阅编辑历史」
   已从 Command Palette 和页面操作菜单里双双消失。这些动作由 `params.github_repo` 派生；但仅仅取消这个配置
   并不能把它们从 palette 里去掉，因为 palette 的设计是**把不可用动作渲染成灰色行而不是隐藏**。
   真正生效的是两个小小的站点覆盖（`layouts/_partials/actions/page-urls.html` 和
   `layouts/_partials/actions/manifest.html`）。导航栏的 GitHub 链接保留了下来，
   现在 palette 里只列真正可用的条目。

### 2.2 首页

这是视觉上变化最大的一处。旧首页列出最新的长文、短文和 TIL；OINK 的首页是由
`data/home/{zh,en}.yaml` 数据驱动的，而且没有内置的"最新 N 条"区块，所以重建版用了
hero + 四栏目卡片 + CTA 的结构。

`/` 本身照常工作，落地页完全由数据驱动。已新增「最新 N 条」区块（`data/home/*.yaml` 的 `recent`，
实现见 `layouts/_partials/landing/sections/recent.html`）——取 `posts`/`share`/`til` 三个栏目的最新
N 篇，复用主题的博客列表行样式，因此首页与栏目索引视觉一致。

### 2.3 英文导航

线上站点的英文菜单项全部指向**中文**页面（`/posts`、`/share`、`/archive`、`/tags` 都缺 `/en/` 前缀），
看起来是当初的疏忽。重建版把这四项指到了对应的英文页面。

`About`、`Project`、`TIL` 仍然指向中文页，因为它们没有英文源文件 —— 这一点是**故意**沿用旧行为，
并且用了绝对 URL，避免 `relLangURL` 凭空造出一个 `/en/about/`。

### 2.4 giscus 主题

从 `preferred-color-scheme` 改成 `auto`，让评论 iframe 跟随 OINK 自己的亮/暗配色和站点主题开关。
对已存储的讨论没有任何影响。

### 2.5 去掉 Disqus

旧 `config.toml` 里还留着 `disqusShortname = "nekonull"`，但 `manis` 主题的 `single.html` 只渲染了
giscus partial —— 线上任何页面都没有 Disqus 嵌入。重建版直接去掉了这个没用的配置。

### 2.6 新增的输出

`/_print/**`、每页的 `index.md`、`/llms.txt` 都是新增的。它们只是增加了 URL，没有移动或删除任何已有的。

---

## 三、已知缺口与待办

| 项 | 状态 |
| --- | --- |
| 首页的"最新 N 条"行为 | 未复现 —— 需要你决定（见第 2.2 节） |
| `enableGitInfo` | 关闭，与旧站一致；因此没有基于 git 的"最后修改时间"，也没有贡献者信息。要开启需要完整的仓库历史。 |
| 品牌痕迹 | 导航栏已改用站点 logo（`params.logo: img/logo_dark.jpg`），favicon 由同一张图构建时生成。页脚仍写着 "Powered by Oink"，属主题默认文案。 |
| `themes/manis`、`themes/terminal` | 已弃用；重建版不使用旧主题 |
| 部署 | `.github/workflows/publish.yml` 已更新到 Hugo Extended 0.165.0，并移除了 submodule 配置；`master` → `publish` 的分支模型和 `keep_files: true` 都保留，所以 publish 分支上手工维护的子应用（`cococlock`、`showbitflag`、`day-tracker`、`mainonly`、`50`）不受影响 |
| 本目录 | 还不是 git 仓库；没有提交、没有推送到任何地方 |

---

## 四、怎么重新验证

```bash
export HUGO_CACHEDIR="$PWD/../.cache/hugo"

# 严格构建 —— 必须以 "Total in …" 结尾，且不打印任何警告
hugo --cleanDestinationDir --gc --minify --environment production \
  --printPathWarnings --panicOnWarning

# 与抓下来的线上基线做 URL 比对
python3 tools/compare_urls.py
```
