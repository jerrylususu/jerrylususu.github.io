# 本地开发的快捷入口。命令细节见 README.md「构建与本地预览」。
#
#   make          列出全部目标
#   make serve    本地预览
#   make build    发布前跑的同款严格构建

HUGO_VERSION := 0.165.0

# 把 Hugo 缓存指到工作区里，避免污染 ~/.cache。
HUGO_CACHEDIR := $(CURDIR)/../.cache/hugo
export HUGO_CACHEDIR

# 依次找：项目内 ./hugo、项目内 ./.tools/hugo、工作区共享的 ../.tools/hugo、$PATH。
HUGO ?= $(shell command -v ./hugo 2>/dev/null \
	|| command -v ./.tools/hugo 2>/dev/null \
	|| command -v ../.tools/hugo 2>/dev/null \
	|| command -v hugo 2>/dev/null)

.PHONY: help guard serve draft build new check clean hugo-get s d b c

help:
	@echo "make serve                本地预览 http://localhost:1313/"
	@echo "make draft                连草稿一起预览（hugo server -D）"
	@echo "make build                严格构建到 public/，等同 CI"
	@echo "make new f=posts/foo.md   生成文章骨架"
	@echo "make check                确认 Hugo 版本，且带 extended"
	@echo "make clean                清掉 public/ 和 resources/"
	@echo "make hugo-get             下载 Hugo Extended $(HUGO_VERSION)"

guard:
	@test -n "$(HUGO)" || { \
		echo "找不到 Hugo。先跑 make hugo-get，或把二进制放到 ./.tools/hugo。"; \
		exit 1; \
	}

serve: guard
	$(HUGO) server

draft: guard
	$(HUGO) server -D

build: guard
	$(HUGO) --cleanDestinationDir --gc --minify --environment production \
		--printPathWarnings --panicOnWarning

new: guard
	@test -n "$(f)" || { echo "用法: make new f=posts/foo.md"; exit 1; }
	$(HUGO) new content $(f)

check: guard
	@$(HUGO) version
	@$(HUGO) version | grep -q extended \
		|| { echo "这个 Hugo 不是 extended，主题的 SCSS 构建不起来。"; exit 1; }

clean:
	rm -rf -- public resources
	rm -f -- .hugo_build.lock

hugo-get:
	@os=$$(uname -s | tr '[:upper:]' '[:lower:]'); \
	case $$(uname -m) in \
		x86_64|amd64) arch=amd64 ;; \
		aarch64|arm64) arch=arm64 ;; \
		*) echo "认不出的架构：$$(uname -m)"; exit 1 ;; \
	esac; \
	url="https://github.com/gohugoio/hugo/releases/download/v$(HUGO_VERSION)/hugo_extended_$(HUGO_VERSION)_$${os}-$${arch}.tar.gz"; \
	echo "下载 $$url"; \
	mkdir -p .tools \
		&& curl -fL -o .tools/hugo.tar.gz "$$url" \
		&& tar xzf .tools/hugo.tar.gz -C .tools hugo \
		&& ./.tools/hugo version

s: serve
d: draft
b: build
c: clean
