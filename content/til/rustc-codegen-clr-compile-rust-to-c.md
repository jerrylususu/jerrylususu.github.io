---
title: rustc_codegen_clr - 把 Rust 编译成 C
date: 2025-04-12T11:50:26.928Z
---

Why?：有的架构/平台不支持 Rust，但是基本都有 C 编译器；如果可以把 Rust 编译成 C，那就可以让 Rust 在更多更广泛的平台上运行了。

How?: 作为一个 Rust 编译器(`rustc`)后端，目标是 C 而不是机器语言。

repo: https://github.com/FractalFir/rustc_codegen_clr

via: https://fractalfir.github.io/generated_html/cg_clr_odd_platforms.html