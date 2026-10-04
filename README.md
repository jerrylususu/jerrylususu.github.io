# Nekonull's Garden — OINK 重建版

把 <https://github.com/jerrylususu/jerrylususu.github.io> 从 `manis` 主题迁移到
[OINK](https://github.com/pgsty/oink) 上。

**内容不变、URL 不变、评论线程不变、feed 不断，界面重做。**

| 文档 | 看它解决什么问题 |
| --- | --- |
| [AUTHORING.md](AUTHORING.md) | 怎么写文章、怎么预览发布，以及 CI 改了什么 |
| [COMPATIBILITY.md](COMPATIBILITY.md) | 逐条列出的兼容性验证结果，以及有意的差异 |
| [PORTING-NOTES.md](PORTING-NOTES.md) | 这次重建是怎么做的：探索、踩坑、验证过程 |

## 工具链

| 需要什么 | 版本 | 说明 |
| --- | --- | --- |
| Hugo **Extended** | 0.165.0 | OINK 声明的最低要求是 0.160.1。**必须是 extended**，主题带 SCSS。 |
| Go | 不需要 | 主题是 vendor 进仓库的，构建过程不做模块解析。 |

旧站用的是 Hugo 0.145.0（非 extended）+ `manis` 主题。

## 主题来源

OINK 以 pinned clone 的方式 vendor 在 `themes/oink`，对应上游 tag：

```bash
git clone --branch v1.1.0 --depth 1 https://github.com/pgsty/oink.git oink
# 实际解析到的 commit: 3a18234aa3af15ae12e2d53839ffd321ef4bcb62
# （chore: release OINK v1.1.0）
```

之所以不用官方推荐的 Hugo Module 安装方式，是因为那样需要 Go 工具链和 module cache；vendor 之后构建既不需要 Go 也不需要缓存。

想切回 Go Module 方式的话：删掉 `themes/oink` 和 `theme: oink`，加上
`module.imports: [{path: github.com/pgsty/oink}]` 和一个钉住 `v1.1.0` 的 `go.mod`，然后 `hugo mod get`。
主题里的 `VENDOR.json` 记录了第三方运行时清单，重新分发时必须保留。

## 构建与本地预览

日常操作走 `Makefile`，不用记下面那些参数：

| 命令 | 做什么 |
| --- | --- |
| `make serve` | 本地预览 <http://localhost:1313/>（`--renderToMemory`，不写 `public/`） |
| `make draft` | 连草稿一起预览（`hugo server -D`） |
| `make build` | 严格构建到 `public/`，等同 CI |
| `make new f=posts/foo.md` | 生成文章骨架 |
| `make check` | 确认 Hugo 版本，且带 `extended` |
| `make hugo-get` | 下载 Hugo Extended 0.165.0 到 `./.tools/` |
| `make clean` | 清掉 `public/` 和 `resources/` |

`make` 不带目标时打印这张表。Makefile 会把 `HUGO_CACHEDIR` 指到 `../.cache/hugo`，并按
`./hugo` → `./.tools/hugo` → `../.tools/hugo` → `$PATH` 的顺序自动找 Hugo；
想指定别的二进制用 `make serve HUGO=/path/to/hugo`。

> `serve`/`draft` 带 `--renderToMemory`：预览只存在内存里，不写 `public/`。
> 这样就不会出现「dev server 在跑时又跑了 `make build`，`--cleanDestinationDir` 清掉
> `public/` 导致预览的 CSS/JS 404、图标消失」那类问题。

裸命令等价于：

```bash
# 把 Hugo 的缓存指到项目内（可选，避免污染 ~/.cache）
export HUGO_CACHEDIR="$PWD/../.cache/hugo"

# 本地预览（--renderToMemory：不写 public/，避免和 make build 互相干扰）
hugo server --renderToMemory

# 部署 workflow 跑的严格构建
hugo --cleanDestinationDir --gc --minify --environment production \
  --printPathWarnings --panicOnWarning
```

严格构建的预期是：以 `Total in …` 结尾，且**不打印任何警告或错误**。

## 目录说明

```
hugo.yaml                 唯一的站点配置文件
content/                  文章原文件，外加 OINK 需要的 type/cascade
data/home/{zh,en}.yaml    首页（数据驱动）
assets/scss/_styles_project.scss       站点 CSS，被主题最后 import
assets/img/logo_dark.jpg               品牌图，导航栏 logo + favicon 的唯一来源
layouts/_partials/favicons.html        构建时由品牌图生成 favicon
layouts/_partials/landing/sections/recent.html  首页「最新 N 条」区块
layouts/_partials/actions/page-urls.html   清掉 GitHub 写操作
layouts/_partials/actions/manifest.html    过滤 Command Palette
layouts/_partials/google_analytics.html    production 下的 gtag 片段
layouts/_default/rss.xml  首页 feed：除 TIL 之外的全部（全文）
layouts/_default/tilrss.xml  /til.xml —— 只含 TIL
layouts/blog/rss.xml      各栏目的 feed（全文）
static/img/               文章配图
themes/oink/              vendored 的 OINK v1.1.0
tools/                    重建辅助脚本（front matter 注入、URL 比对）
```

## 主题覆盖点

有 6 个文件扩展/覆盖了主题的默认行为。每个文件头部都写清了原因；直接删掉该文件即可退回主题默认行为。

| 文件 | 为什么 |
| --- | --- |
| `assets/scss/_styles_project.scss` | 主题把站点标题按短标识排版（Chakra Petch、`0.14em` 字距、渐变文字）。这里改回适合完整句子的样式。 |
| `assets/img/logo_dark.jpg` + `layouts/_partials/favicons.html` | 用站点 logo 替换 OINK 默认 mark，并在构建时从同一张图生成全部 favicon（不需要 ImageMagick）。 |
| `layouts/_partials/landing/sections/recent.html` | 首页「最新 N 条」；OINK 的 landing 注册表没有这个区块，用 `data/home/*.yaml` 里的 `partial:` 挂进来。 |
| `layouts/_partials/actions/page-urls.html` | 把 GitHub 的编辑/历史/新建子页/提议题 URL 置空，页面操作菜单里对应的行就整行消失。 |
| `layouts/_partials/actions/manifest.html` | Command Palette 会把不可用的动作渲染成灰色行而不是隐藏，所以在这里把上述动作，以及关掉的 ChatGPT/Claude 和版本切换一并过滤掉。 |
| `layouts/_partials/google_analytics.html` | OINK 会调用这个 partial 但主题不提供它；而 Hugo 0.165 也已经没有 `_internal/google_analytics.html` 了。 |

## 后续修改注意

- 新文章会自动从栏目的 `cascade` 继承 `type: blog`，因此自动获得博客模板和评论区。新增栏目时照 `content/posts/_index.md` 的样子写。
- 栏目首页设了 `comments: false`。想让某个列表页带评论区，删掉那一行即可（旧站的列表页也没有评论区）。
- `themes/oink` 是上游代码。站点自己的行为改动应该放在仓库根部的 `layouts/` / `assets/` 里——它们会覆盖主题。
