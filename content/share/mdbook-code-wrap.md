---
title: mdBook 代码折行（wrap）
date: 2021-04-03T23:54:00+03:00 
---

[mdBook](https://rust-lang.github.io/mdBook/) 是一个基于 Rust 的文档网站生成工具。虽然 mdBook 中有代码高亮，可编辑代码等特性，但是默认情况下不支持代码折行的设定。在代码行或注释较长的时候，用户需要手动左右移动，体验不佳。

查阅[文档](https://rust-lang.github.io/mdBook/format/theme/editor.html?highlight=editor#customizing-the-editor)可知，mdBook 使用的是 Ace Editor。再查询 Ace Editor 的[文档](https://github.com/ajaxorg/ace/wiki/Embedding-API)，可以发现通过 `editor.getSession().setUseWrapMode(true);` 启用折行。

在 mdBook 生成的 book 文件夹中，可以找到 `book.js` 文件，在 line 6 开始进行如下修改，手动设定 editor 属性即可。

```javascript
// Global variable, shared between modules
function playground_text(playground) {
    let code_block = playground.querySelector("code");

    if (window.ace && code_block.classList.contains("editable")) {
        let editor = window.ace.edit(code_block);

        // CODE ADDED BEGIN
        editor.getSession().setUseWrapMode(true);
        // CODE ADDED END

        return editor.getValue();
    } else {
        return code_block.textContent;
    }
}

```