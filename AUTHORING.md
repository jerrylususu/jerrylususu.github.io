# 写作与维护指南

给作者本人看的。结论先说：**写文章还是老规矩，在栏目目录里丢一个 `.md` 就行，没有额外步骤。**
GitHub CI 需要改，但已经改好了（见 §8）。

---

## 1. 写一篇新文章

和以前完全一样。

| 栏目 | 中文源文件 | 中文 URL | 英文源文件 | 英文 URL |
| --- | --- | --- | --- | --- |
| 长文 | `content/posts/foo.md` | `/posts/foo/` | `content/posts/foo.en.md` | `/en/posts/foo/` |
| 短文 | `content/share/foo.md` | `/share/foo/` | `content/share/foo.en.md` | `/en/share/foo/` |
| TIL | `content/til/foo.md` | `/til/foo/` | — | — |
| 存档 | `content/archive/foo.md` | `/archive/foo/` | `content/archive/foo.en.md` | `/en/archive/foo/` |
| 独立页 | `content/about.md` | `/about/` | — | — |
| 独立页 | `content/project.md` | `/project/` | — | — |

生成骨架：

```bash
./hugo new content posts/my-post.md
```

得到（来自 `archetypes/default.md`）：

```yaml
---
title: "My Post"
date: 2026-09-23T22:31:38+08:00
draft: true
tags: []
---
```

**`draft: true` 是模板里唯一的新东西** —— 带这行的文章不会被构建。本地看草稿用 `./hugo server -D`，发布前把这一行删掉。
（旧站从来没用过 draft，所以这是新模板带进来的习惯。不喜欢的话，把 `archetypes/default.md` 里的 `draft: true` 删掉即可。）

新文章会自动获得：博客排版、侧栏、目录、评论区、上/下一篇导航。**你不需要在新文章里写 `type`。**

为什么？每个栏目的 `_index.md` 里有这三行：

```yaml
type: blog
cascade:
  type: blog      # 自动传给该栏目下的每一篇文章
```

---

## 2. 文件名就是 URL（唯一要小心的地方）

Hugo 会对文件名做 slugify：**转小写、去掉标点、空格转连字符、中文原样保留**。

线上现存的真实例子：

| 源文件名 | 实际 URL |
| --- | --- |
| `Python, Flask, Jinja, SQLite 里的坑.md` | `/archive/python-flask-jinja-sqlite-里的坑/` |
| `备忘：重装系统后需要重新安装的程序.md` | `/archive/备忘重装系统后需要重新安装的程序/` |

想自己控制 URL，在 front matter 里写 `slug`：

```yaml
---
title: 我的文章
slug: my-article      # → /posts/my-article/
---
```

> **改已有文章的文件名之前，先加 `slug` 把旧名字锁住。**
> URL 一变 = 旧链接 404 + **评论线程断开**（giscus 按 pathname 匹配讨论）。

万一已经改坏了，可以用 `aliases` 补救：

```yaml
aliases: [/posts/旧名字/]
```

---

## 3. 评论

自动的，不用管。giscus 用 `mapping: pathname`，讨论线程绑在 URL 上，只要 URL 不变就接得上。

不想某页有评论，front matter 加 `comments: false`。栏目首页就是这么关掉的（旧站的列表页也没有评论区）。

---

## 4. 标签

`tags: [LLM, 网络]` → `/tags/llm/`、`/tags/网络/`。导航栏的「标签」下拉会自动更新，还带计数。

---

## 5. 图片

和以前一样：把文件放 `static/img/`，正文写 `![](/img/foo.png)`。

---

## 6. 本地预览

在 `blog-oink/` 下：

```bash
make serve        # http://localhost:1313/
make draft        # 连草稿一起看
```

就这两条。Makefile 在仓库里，自己会去找 Hugo（工作区根的 `.tools/hugo` 也算），
所以不用记住任何参数。

需要 **Hugo Extended**（主题用 SCSS，非 extended 版本构建不起来）。机器上还没有的话：

```bash
make hugo-get     # 自动认架构，下载 extended 0.165.0 到 ./.tools/
```

想手动装也可以——按你的机器架构选对包名（linux-arm64 / linux-amd64 / darwin-arm64 /
darwin-amd64 …），解出来直接放在 `blog-oink/` 下即可，`.gitignore` 已忽略：

```bash
curl -L -o hugo.tar.gz \
  https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_extended_0.165.0_linux-arm64.tar.gz
tar xzf hugo.tar.gz hugo
```

`./hugo version` 的输出里必须带 `extended` 这个词。

旧仓库里的 `debug.sh` 下的是 0.145.0 **非 extended**，已经不够用了，所以别再用它。

---

## 7. 正式构建

`make build`。展开来就是：

```bash
./hugo --cleanDestinationDir --gc --minify --environment production \
       --printPathWarnings --panicOnWarning
```

这是发布用的严格模式：路径冲突会被打印出来，**任何警告都直接 fail**。RSS、Google Analytics 只在 `--environment production` 下产出，所以本地预览不会给线上统计添乱。

---

## 8. GitHub CI 要改吗？要，但已经改好了

`.github/workflows/publish.yml` 与旧版的差异：

| | 旧 | 新 |
| --- | --- | --- |
| Hugo 版本 | `0.145.0` | **`0.165.0`** |
| extended | 被注释掉 | **`extended: true`** |
| `submodules: true` | 有 | 删除（主题是 vendor 进仓库的普通目录） |
| `actions/checkout` | `@v3` | `@v4` |
| `peaceiris/actions-hugo` | `@v2` | `@v3` |
| `peaceiris/actions-gh-pages` | `@v3` | `@v4` |
| 构建命令 | `hugo` | 加上上面那四个严格参数 |

**没变的：**

- `master` push 触发；`workflow_dispatch` 手动触发；PR 只构建不发布
- 发布到 `publish` 分支
- `keep_files: true` —— publish 分支上那些手写的子应用（`cococlock` / `showbitflag` / `day-tracker` / `mainonly` / `50`）不会被删掉
- GitHub Pages 的 Source 必须是 **Deploy from a branch** → 分支 `publish`、目录 `/(root)`（workflow 用 peaceiris/actions-gh-pages 推分支，不是 Actions 部署）
- `fetch-depth: 0`

---

## 9. 迁移到你真实仓库时的额外步骤

1. 用 `blog-oink/` 的内容覆盖仓库
2. **删掉 `themes/manis/` 和 `themes/terminal/`**
3. **`themes/oink/` 要整个提交进仓库** —— 它是 vendor 进去的普通目录，不是 submodule，不需要 `.gitmodules`
4. 删掉 `config.toml`（配置现在全在 `hugo.yaml`）和 `debug.sh`（它下的是非 extended 版本）
5. 保留 `content/`、`static/`、`archetypes/`、`.github/workflows/publish.yml`
6. **自定义域名**：`nekonull.me` 的 `CNAME` 目前只存在于 `publish` 分支，靠 `keep_files: true` 保着。请把它搬到 `static/CNAME`（或在 workflow 里加 `cname: nekonull.me`），否则 publish 分支一旦重建就丢域名。
7. **Pages 的 Source** 必须是 Deploy from a branch → `publish` / `(root)`，不是 GitHub Actions。
8. **`publish` 分支上的手写子应用**（`cococlock` / `showbitflag` / `day-tracker` / `mainonly` / `50` 等）靠 `keep_files: true` 保留，不要关掉它。完整说明见工作区根的 `PRODUCTION.md`。

---

## 10. 随手可用的新排版能力（可选）

三个 Goldmark 前置设置已经开好了（`renderer.unsafe` / `parser.attribute.block` / `parser.wrapStandAloneImageWithinParagraph`），下面这些都**实测过能用**：

**GitHub 风格提示块**

```markdown
> [!NOTE]
> 说明

> [!IMPORTANT]
> 重要

> [!WARNING]
> 警告
```

**有序列表 → 步骤条**（属性行要紧跟在列表后面）

```markdown
1. 第一步
2. 第二步
{.steps}
```

**代码块带编号和标题**（注意 `caption` 必须和 `num` 一起用，单独写会报警告）

````markdown
```python {num="1-1" caption="示例代码"}
print("hi")
```
````

**标签页**

```
{{< tabs group="demo" default="a" label="示例" >}}
{{< tab label="A" value="a" >}}
AAA
{{< /tab >}}
{{< tab label="B" value="b" >}}
BBB
{{< /tab >}}
{{< /tabs >}}
```

**Mermaid 流程图 / 文件树**

````markdown
```mermaid
graph LR; A-->B;
```

```filetree
src/
  index.js  # entry
```
````

其他 shortcode：`{{< card >}}`、`{{< cards >}}`、`{{< fields >}}`、`{{< gallery >}}`、`{{< kbd >}}`、`{{< badge >}}`、`{{< fig >}}` 等；属性行还有 `{.cards}`、`{.full-width}`、`{.fields meta="type default"}`。完整清单见 <https://oink.pgsty.com/docs/>。

**行内 HTML 照旧可用** —— 旧文里的 `<script src="...gist...">`、`<details>`、`<img style=...>` 都正常渲染（因为 `renderer.unsafe: true`）。

**数学公式目前没开**，需要额外启用 Goldmark passthrough。要开的话在 `hugo.yaml` 的 `markup.goldmark` 下加（写法取自主题官方 fixture）：

```yaml
    extensions:
      passthrough:
        enable: true
        delimiters:
          block: [['\[', '\]'], ['$$', '$$']]
          inline: [['\(', '\)']]
```

---

## 11. 一页速查

| 事情 | 要不要变 |
| --- | --- |
| 写文章（加 `.md` + front matter） | 不用变 |
| 英文版（`.en.md` 同名前缀） | 不用变 |
| 图片路径 `/img/...` | 不用变 |
| 标签 | 不用变 |
| 评论 | 不用管，自动接上 |
| 本地预览的 Hugo | **换成 Extended 0.165.0** |
| GitHub CI | **已改好** |
| 文件名 | 别随便改，改之前先加 `slug` |

其他细节见 `README.md`（工程结构、主题覆盖点）、`COMPATIBILITY.md`（兼容性清单）、`PORTING-NOTES.md`（这次迁移的完整过程）。
