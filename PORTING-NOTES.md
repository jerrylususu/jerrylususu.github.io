# 迁移过程记录

这份文档回答一个问题：**这个重建到底是怎么做的。**
从读题、定验收标准、探索 OINK、搭站、踩坑，到最后怎么验证。写给未来的自己，也写给想评估这次迁移的人。

**结果一句话**：读者可见的 URL 一条不少（**187 / 187**），评论线程全部接得上，RSS 订阅不断，界面重做。

---

## 0. 约束条件

从 `idea.txt` 和后来的几条消息里收到这些要求：

| 要求 | 来源 |
| --- | --- |
| 用 OINK 重建博客 | `idea.txt` |
| 保留全部内容，**包括 URL 形式** | `idea.txt` |
| 保留评论（基于 GitHub 的讨论） | `idea.txt` |
| 只能在当前工作目录内写，**不装全局包** | 第一条消息 |
| **RSS 订阅不能断** | 中途追加 |
| 界面可以现代化，不必迁就旧主题 | 中途追加 |
| 原型探索性质，做不到 100% 兼容就先交能跑能评估的版本 | 中途追加 |

最后一条很重要，它决定了策略：**优先保证"读者可见的东西不变"，允许"外观变"**。

---

## 1. 读题，然后先把"现状"量化

`idea.txt` 指向两个仓库：你的博客，和 OINK。`oink_docs.txt` 是从官网抓下来的 4 页文档（Get started / OINK Starter / Repository tour / From scratch）。

从文档里拿到的第一手情报：

- OINK 要求 **Hugo Extended ≥ 0.160.1**，当前版本验证用的是 0.165.0 + Go 1.27
- 官方的安装方式有三种：Hugo Module（推荐）、Git submodule / pinned clone、离线归档
- 官方推荐从 `pgsty/oink-starter` 模板起步
- 主题不复制进站点，而是以 Hugo Module 形式引用

同时把三个仓库拉到工作区：`blog-src`（你的博客）、`oink-src`（OINK v1.1.0，commit `3a18234`）、`oink-starter`（官方模板，当参考样本）。

> **为什么先量化现状**：`idea.txt` 说"保留 URL 形式"，但这句话不能直接当验收标准——"形式"是模糊的。必须先拿到**线上真实 URL 全集**，后面才有东西可比。这一步是整个工作的地基。

### 1.1 抓 URL 基线

```
https://nekonull.me/sitemap.xml          → 索引，指向下面两个
https://nekonull.me/zh/sitemap.xml       → 158 条
https://nekonull.me/en/sitemap.xml       → 29 条
```

合起来 **187 条读者可见 URL**，存成 `zh-urls.txt` / `en-urls.txt`。

### 1.2 补齐 sitemap 之外的部分

sitemap 不包含分页页，所以逐个直接探：

| 探测项 | 结果 |
| --- | --- |
| `/posts/page/2/`、`/share/page/2/`、`/til/page/2|3/` | 200（存在） |
| `/share/page/3/`、`/en/posts/page/2/`、`/tags/llm/page/2/` | 404（不存在） |
| `/index.xml`、`/til.xml`、`/posts/index.xml`、`/tags/index.xml` … | 200 |
| `/zh/index.xml` | 404（`/zh/` 只是默认语言的跳转别名） |
| `/cococlock/`、`/showbitflag/`、`/day-tracker/`、`/mainonly/`、`/50/` | 200 —— 这些**不在源码仓库里**，是 publish 分支上 `keep_files: true` 留下的手写子应用 |
| `/robots.txt` | 404 |

### 1.3 读源仓库

140 个内容文件。关键发现：

- 只有 **1 处 shortcode**（`{{ ref }}`），其余是纯 Markdown + 少量行内 HTML → 迁移风险很低
- front matter 只用了 `title` / `date` / `tags` / `description`，**没有 `url` / `slug`** → URL 完全由目录名和文件名决定，这是好消息
- 4 个栏目各有一个 `_index.md`，另有 `_index.en.md` 表示英文版
- `pagerSize = 20`，`rssLimit = 25`
- giscus 的 `repo` / `repoId` / `category` / `categoryID` 都在 `config.toml` 里
- 站点级 `layouts/` 里有两个 RSS 覆盖模板和 1 个自定义输出格式（`TilRSS`）—— 这个后来成了最大的坑

---

## 2. 吃透 OINK

OINK 是个不小的主题（764 个文件）。用 3 个**并行**探查任务分别啃三个方向，同时自己读关键模板：

1. **模板分发机制**：布局树、sidebar 怎么生成、`type` / `layout` 怎么选模板、输出格式、taxonomy
2. **评论与第三方集成**：支持哪些评论系统、giscus 的参数全集、per-page 开关、analytics、share、feedback
3. **URL 与多语言**：主题配置全集、有没有 `permalinks`、翻译用文件名后缀还是目录、`data/home` 的数据模型

自己另外读了：`blog/list.html`、`blog/single.html`、`sidebar-root.html`、`actions/context.html`、`actions/title-menu.html`、`_tokens-typography.scss`、`_brand.scss`、`_site-navbar.scss`。

### 得出的 6 条结论（决定了后面所有设计）

1. **模板按 `.Type` 分发**。有 `docs` / `book` / `blog` / `swagger` 四个 shell。想用博客模板，页面的 `type` 必须是 `blog` —— 但 `content/posts/foo.md` 默认的 `type` 是 `"posts"`（第一段路径），**不是** `blog`。这一点最关键。
2. **URL 就是 Hugo 默认的 pretty URL**。主题没有设 `permalinks`，所以 `content/<栏目>/<文件>.md` → `/<栏目>/<文件>/`。和旧站完全一致。
3. **导航来自站点级 `menus.main`**（或 `languages.<lang>.menus.main`），不是栏目 `_index` 的 front matter。
4. **首页是数据驱动的**（`data/home/<lang>.yaml`），不是模板文件。
5. **原生支持 giscus**，而且参数和旧配置几乎一一对应（`repo` / `repoId` / `category` / `categoryId` / `mapping` / `strict` / `reactionsEnabled` / `inputPosition` / `theme`）。
6. 主题自己的 fixture 用 `.zh.md` 后缀表示翻译，但按 `defaultContentLanguage` 走的常规 Hugo 规则同样有效 —— 旧站的 `.en.md`（中文为 `.md`）可以原样不动。

---

## 3. 工具链：不装全局包

环境里**既没有 Go 也没有 Hugo**，而且是 arm64。

```bash
# 第一次下错了架构
curl -L .../hugo_extended_0.165.0_linux-amd64.tar.gz | tar xz
./hugo version
# → OrbStack ERROR: Dynamic loader not found: /lib64/ld-linux-x86-64.so.2
#   （x86 程序跑在 arm64 上，缺 multiarch 库）

# 换成 arm64 就对了
curl -L .../hugo_extended_0.165.0_linux-arm64.tar.gz | tar xz
./hugo version
# → hugo v0.165.0-...-extended linux/arm64
```

解压到工作区内的 `.tools/`，并把 `HUGO_CACHEDIR` 也指到工作区内，避免污染 `~/.cache`。

### 一个关键决定：vendor 主题，不用 Go Module

官方推荐 Hugo Module，但那需要 Go 工具链 + 一个 module cache（默认写在家目录）。两个都不符合"不装全局包 / 不写到目录外"。

所以改用**第三种安装方式：pinned clone** —— 把 OINK v1.1.0 clone 到 `themes/oink`，用传统的 `theme: oink` 引用。

代价：主题升级要手动重新 clone。好处：不需要 Go，不需要 module cache，构建完全自包含，而且和你仓库里原有的 `themes/manis`、`themes/terminal` 是同一种形态。
`README.md` 里写了怎么切回 Go Module。

---

## 4. 搭站

逐层搭 `blog-oink/`：

**第 1 层 · 配置** — 把 `config.toml` 的语义一条条搬到 `hugo.yaml`：`languages`、`taxonomies`（保留 `tags` + `categories`）、`pagerSize: 20`、`services.rss.limit: 25`、GA ID、giscus 参数、7 项导航菜单、以及 OINK 需要的三个 Goldmark 设置。

**第 2 层 · 输出格式** — 复刻旧站的三套 feed：`RSS`（baseName `index`）、`TilRSS`（baseName `til`），并把 `RSS` 加回 `section` / `taxonomy` / `term`。

**第 3 层 · 内容** — `content/` 和 `static/` 原样复制，**一个文件都没改名**。

**第 4 层 · 注入类型**（这是核心手法）—— 用一个脚本给 4 个栏目的 `_index.md` / `_index.en.md` 各加 3 行：

```yaml
type: blog
comments: false
cascade:
  type: blog
```

`cascade` 会把 `type: blog` 传给栏目下**每一篇**文章。效果是：不改文件名、不动目录结构、URL 完全不变，但所有文章都套上了 OINK 的博客模板（含评论区、侧栏、目录、上下篇导航）。

> 换个思路本来也可以：把内容重组成 `content/blog/...`。但那会毁掉所有 URL，直接违反核心要求。加 3 行 front matter 是最小代价的解法。

**第 5 层 · 独立页** — `about.md` / `project.md` 设 `type: blog` + `comments: false`（它们不是文章，不该有评论区）。

**第 6 层 · 首页数据** — 写 `data/home/{zh,en}.yaml`（最终形态是 hero + 「最新 N 条」；初期草稿里的四栏目卡片与 CTA 已删）。

---

## 5. 踩到的坑

五个坑，都是靠**对照实验**定位的，不是猜的。

### 坑 1：`/til.xml` 和 `/index.xml` 内容一模一样

旧站 `config.toml` 里定义了一个自定义输出格式 `TilRSS`（baseName `til`），配 `layouts/home.tilrss.xml`，用来产出 TIL 专属 feed。照搬过来后，两个文件**字节完全相同**。

做了两组对照实验：

| 实验 | 结果 |
| --- | --- |
| 模板改名为 `layouts/index.xyz.xml` | 仍然劫持 `index.xml` |
| 模板放到 `layouts/_default/tilrss.xml` | **两个 feed 各归其位** |

结论：home 页的 XML 输出共用 `<home-kind>.*.xml` 这一个模板槽位，两个 XML 输出格式会互相劫持（不管格式名叫什么）。放到 `_default/` 目录下就分开了。
附带发现：旧站在 Hugo 0.145 下用 `home.tilrss.xml` 是能工作的，0.165 的模板查找规则变了。

### 坑 2：`/en/index.xml` 有 0 条

就是坑 1 的连带症状 —— 英文站的 home feed 用了 TIL 模板，而英文站没有 TIL 文章，于是 0 条。
修掉坑 1 后自动恢复成 13 条，和线上一致。

### 坑 3：Google Analytics 完全没输出

OINK 的 `head.html` 只在 production 下调用 `partial "google_analytics.html"`，但**主题不提供这个文件**——要站点自己写。而 Hugo 0.165 也已经移除了 `_internal/google_analytics.html`（照搬旧写法会报 `no such template`）。
自己写了一个 gtag 片段。另外我一开始还漏配了 `services.googleAnalytics.id`。

### 坑 4：列表页冒出了评论区

OINK 默认给所有页面都挂评论块，旧站只有文章页有。给 4 个栏目 `_index.md` 加 `comments: false` 修掉。修完验证：131 篇有评论，正好是文章集合，列表/分类/独立页 0 个。

### 坑 5：`languageCode` 已废弃

Hugo 0.165 用 `locale`，继续用 `languageCode` 会打警告（而 `--panicOnWarning` 下警告 = 构建失败）。

---

## 6. 保真 RSS

线上是**全文 RSS**（`<description>` 里塞整篇 HTML），而 OINK 默认只输出摘要。为了不改变订阅体验，在站点层覆盖了三个模板，把全文行为拿回来：

| 文件 | 负责 |
| --- | --- |
| `layouts/_default/rss.xml` | home + taxonomy feed，**排除 TIL** |
| `layouts/_default/tilrss.xml` | `/til.xml`，**只有 TIL** |
| `layouts/blog/rss.xml` | 各栏目的 feed |

同时保住旧站的特殊设计：`/index.xml` 排除 TIL、`/til.xml` 只有 TIL、`<guid>` 是 permalink、`rssLimit = 25`。

---

## 7. 验证

每一条都真的跑过。

| 验什么 | 怎么验 | 结果 |
| --- | --- | --- |
| **URL 一条不少** | 写了 `tools/compare_urls.py`：把 sitemap 解码成集合，和 `public/**/index.html` 反推的集合做**双向**差集 | **187 / 187，缺失 0** |
| 分页一致 | 线上逐个 curl + 检查本地产物 | `/posts/page/2/`、`/share/page/2/`、`/til/page/2|3/` 都生成；`/share/page/3/`、`/en/posts/page/2/`、`/tags/llm/page/2/` 都不生成 —— 全对 |
| **评论不断** | 逐项对比线上与本地的 giscus `data-*` 属性；统计带评论块的页面 | 131 篇 = 正好是文章集合；属性逐项一致（`repo`/`repoId`/`category`/`mapping=pathname`/`strict`/`reactions`/`inputPosition`）；URL 不变 + pathname 映射 ⇒ 旧讨论线程自动复用 |
| 评论不多不少 | 检查列表页 / 分类页 / 独立页 | 一个多余的都没有 |
| **RSS 不丢条目** | 脚本取线上 9 个 feed 的 `<guid>` 集合，和本地做差集（要求 线上 ⊆ 本地） | 全部通过；本地是超集 —— 因为线上那几个 section feed 本身就是 `keep_files` 留下的陈旧文件（`/posts/index.xml` 缺最新 3 篇） |
| GA | 统计含 `G-R01JLDY2KE` 的页面 | 193 页 |
| **严格构建** | `--panicOnWarning --printPathWarnings` | 零警告零错误 |
| 端到端 | 起 `hugo server`，用 HTTP 复查 palette 内容、页面操作菜单、标题 CSS 的规则顺序、评论区、GA | 全部符合预期 |

### 怎么确认"标题样式真的被覆盖了"

CSS 覆盖只写对还不够，得确认它在产物里**排在被覆盖规则的后面**。所以直接解析编译后的 `main.min.<hash>.css`，找出所有命中 `.td-nav-title` 的规则和它们的字节偏移：

```
offset  406761  .td-site-header .td-nav-title   ← 主题的（Chakra Petch / 0.14em / 渐变）
offset  471058  .td-site-header .td-nav-title   ← 我加的（同优先级，靠后，胜出）
```

同优先级下后者胜出，确认生效。（另外 3 处命中在 `@media` 块里，是有条件的，不影响。）

---

## 8. 你评审之后改的 4 处

### 8.1 左上角标题很怪 —— 不是字体问题

OINK 把站点标题按**短标识（wordmark）**排版：

```scss
.td-nav-title {
  font-family: var(--td-display-font-family);  // Chakra Petch（科技感斜角字体）
  letter-spacing: 0.14em;                      // 很宽的字距
  font-weight: 700;
  background: var(--td-brand-mark-gradient);    // 蓝 → 铜的渐变
  background-clip: text;
  color: transparent;                           // 渐变裁切到文字上
  margin-inline-end: -0.14em;
}
```

这套是给 `OINK`、`PIGSTY` 那种一个词的品牌名设计的；换成 16 个字符的句子就散了。

改在 **`assets/scss/_styles_project.scss`** —— 主题的官方覆盖点。因为 `assets/scss/td/_main.scss` 的最后一行是 `@import '../styles_project';`，这个文件天然排在最后、同优先级必胜。

顺带一个细节：`typography: system` 其实**已经**把字体换成系统字体了，所以真正影响观感的是**字距和渐变**，不是字体本身。

### 8.2 / 8.3 关掉 feedback 控件、清空分享按钮

```yaml
params:
  ui:
    share: []
    feedback: false
```

### 8.4 清掉 command palette 里不适用的仓库动作

这个比看起来绕。`编辑当前页面` / `添加子页面` / `提交议题` / `查阅编辑历史` 都由 `params.github_repo` 派生。直觉上取消这个配置就行，**但不行**：OINK 的 palette 是**故意把不可用项渲染成灰色行**而不是隐藏：

```js
if (!rowData.available) {
  row.classList.add('td-is-disabled');
  row.setAttribute('aria-disabled', 'true');
}
```

取消配置只会得到 4 行灰的，更难看。

而且这些动作出现在**两个地方**：页面操作菜单（`⋯`）和 palette。两个消费方都从 `actions/context.html` 取数据。

最后用两个小覆盖解决：

| 覆盖 | 作用 |
| --- | --- |
| `layouts/_partials/actions/page-urls.html` | 把仓库写操作的 URL 置空。页面操作菜单每行是 `{{ with $actionURLs.edit }}` 门控的 —— **URL 为空 = 整行不渲染** |
| `layouts/_partials/actions/manifest.html` | 从 palette 的 JSON 里过滤掉：显式黑名单 + **所有 `available: false` 的项** |

第二条规则是顺手加的：它让 ChatGPT/Claude 跳转、版本切换这些"永远用不上"的项一起消失；而且以后你真开了对应功能，它们会**自动回来**。
保留导航栏的 GitHub 图标（走 `projectRepo`）。

> 记录一个自己踩的小坑：Go 模板里 `$p.Param "x" | default $p.Param "y"` 会把 `$p.Param` 解析成零参数调用而报错，得先取到变量再 `default`。

---

## 9. 最终产物

```
blog-oink/
├── hugo.yaml                    唯一的站点配置文件
├── content/                     140 个文件，正文一字未改（只加了 3 个 front matter 键）
├── data/home/{zh,en}.yaml       首页（数据驱动）
├── assets/scss/_styles_project.scss        标题排版覆盖
├── layouts/_partials/actions/page-urls.html   清掉仓库写操作
├── layouts/_partials/actions/manifest.html    过滤 palette
├── layouts/_partials/google_analytics.html    gtag 片段
├── layouts/_default/rss.xml     home feed（排除 TIL，全文）
├── layouts/_default/tilrss.xml  /til.xml
├── layouts/blog/rss.xml         各栏目 feed（全文）
├── themes/oink/                 OINK v1.1.0，vendor，commit 3a18234
├── tools/patch_frontmatter.py   给栏目注入 type/cascade
├── tools/compare_urls.py        URL 基线与产物比对
├── README.md                    工程结构 + 主题覆盖点 + 构建方式
├── AUTHORING.md                 作者写作指南
├── COMPATIBILITY.md             兼容性清单（逐条）
└── PORTING-NOTES.md             本文件
```

---

## 10. 没做到 / 留给你决定

| 项 | 状态 |
| --- | --- |
| **首页的"最新 N 条"** | 已实现：`data/home/*.yaml` 的 `recent` 区块 + `layouts/_partials/landing/sections/recent.html`，取 posts/share/til 最新 N 篇，复用主题博客列表行。可调 `count` / `sections` / `link`。 |
| `enableGitInfo` | 关着 → 没有基于 git 的"最后修改时间"和贡献者信息（旧站也没有） |
| 品牌痕迹 | 导航栏已换成站点 logo（`params.logo: img/logo_dark.jpg`），favicon 构建时由同一张图生成；页脚仍是主题默认的 "Powered by Oink" |
| 主题升级 | 因为是 vendor 的，要手动重新 clone（`README.md` 写了切回 Go Module 的方法） |
| 部署 | workflow 已改好，但**没有 push、没有部署、没有提交**；`blog-oink/` 也还没初始化 git。上线步骤见工作区根 `PRODUCTION.md`（含 CNAME、Pages Source、keep_files 子应用三处注意） |
| 数学公式 | 没开，需要额外启用 Goldmark passthrough（`AUTHORING.md` 给了写法） |

---

## 11. 如果重来一次，会怎么做

- **更早抓 URL 基线**。我是在摸完博客之后才抓的，其实应该第一步就抓 —— 它是唯一客观的验收标准，早拿到就能早发现问题（比如文件名 slugify 会去掉标点这种细节）。
- **对"看起来一样的输出"保持怀疑**。`/index.xml` 和 `/til.xml` 字节相同这个现象很容易被忽略（两个文件都存在、都是合法 RSS、都能 200）。是因为我顺手比了一下条数和标题才发现。**探针要探到内容，不能只探状态码。**
- **优先读主题的 fixture 而不是文档**。`oink-src/hugo.yaml` 和 `tests/site/` 里的官方样例比网页文档更精确，参数默认值、输出格式定义、shortcode 语法都在那儿，而且不会过期。
