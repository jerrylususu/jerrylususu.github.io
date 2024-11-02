---
title: 第一次遇到 gcc unexpected behavior 的记录
date: 2024-11-02T15:38:00+08:00
tags:
    - cpp
---

> 如果你还没有遇到过 compiler bug，说明你写的代码还不够多。 —— 一位本科同学

虽然经常能看到其他人遇到 compiler 导致的意外现象，自己遇到却还是第一次，因此还是写篇文章小小记录下。

因为一些原因，目前工作中使用的 gcc 版本是 7.4。接到一个业务需求，需要对某些特定的用户打开一个 feature flag，且需要在代码里硬编码。代码很快就写完了，自测的时候却发现不太对劲。相关代码简化脱敏后如下所示。逻辑很简单，就是把可以进入灰度的用户 id 放到了一个 allowlist 里，然后检查当前的请求涉及到的所有用户 id 是否都在这个 allowlist 中。奇怪之处在于，在 gcc 7.4 下，如果用了 `std::any_of` 来找，即便用户不在灰度列表中，列表成员检查也会返回 true，导致意外的灰度进入；简单的 for 循环则没有这个问题。

```cpp
#include <cstdint>
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
    // we want to check if all users is in allowlist (something like a feature flag)
    constexpr uint64_t allowlist[] = {1,2,3};
    std::vector<uint64_t> users;
    users.push_back(4);

    bool basic_found = std::find(std::begin(allowlist), std::end(allowlist), 4) != std::end(allowlist);
    std::cout << "outside: basic_found=" << basic_found << std::endl;
    // should be false, as expected

    bool some_found_anyof = std::any_of(users.begin(), users.end(), [&](const uint64_t uid) {
    bool found = std::find(std::begin(allowlist), std::end(allowlist), uid) != std::end(allowlist);
     std::cout << "inside: uid=" << uid <<  ", found=" << found << std::endl;
     return found;
    });
    std::cout << "some_found_anyof=" << some_found_anyof << std::endl;
    // should be false; however in gcc 7.4 this outputs true

    bool some_found_manual = false;
    for (const auto& u: users) {
        if (std::find(std::begin(allowlist), std::end(allowlist), u) != std::end(allowlist)) {
            some_found_manual = true;
            break;
        }
    }
    std::cout << "some_found_manual=" << some_found_manual << std::endl;
    // should be false, as expected
}
```

因为需求要的比较着急，就先用 for 循环替换了。后面有空的时候尝试继续简化代码，可以得到如下的最小复现 POC：定义一个 constexpr 数组，创建一个 lambda 表达式，用`[&]`隐式捕获这个数组，最后在闭包中多次获取其地址；会惊喜的发现，每次获取的地址是不一样的！（可以在 Compiler Explorer 自己试试：[https://godbolt.org/z/qdTfP81xn](https://godbolt.org/z/qdTfP81xn )）

```cpp
#include <iostream>

int main()
{
    constexpr int arr[] = {1, 2, 3};
    std::cout << "outside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;
    std::cout << "outside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;
    std::cout << "outside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;

    auto a = [&]() {
        std::cout << "inside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;
        std::cout << "inside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;
        std::cout << "inside: addr=" << reinterpret_cast<const void*>(arr) << std::endl;
    };

    a();
}
```

输出如下：

```
outside: addr=0x7ffc4b13dc24
outside: addr=0x7ffc4b13dc24
outside: addr=0x7ffc4b13dc24
inside: addr=0x7ffc4b13dbec
inside: addr=0x7ffc4b13dbf8
inside: addr=0x7ffc4b13dc04
```

从生成的汇编中可以发现，在闭包里每次访问 arr 时候，其实都在栈上临时创建了一个副本，因此每次获取到的 arr 地址都是不一致的。

```
        mov     DWORD PTR [rbp-36], 1
        mov     DWORD PTR [rbp-32], 2
        mov     DWORD PTR [rbp-28], 3
        lea     rax, [rbp-36]
	    ...ignored...
		mov     DWORD PTR [rbp-24], 1
        mov     DWORD PTR [rbp-20], 2
        mov     DWORD PTR [rbp-16], 3
        lea     rax, [rbp-24]
```

这也就能解释为什么之前在 `std::any_of` 闭包里用 `std::find` 会有问题了：其中作为参数的 `std::begin(allowlist)`, `std::end(allowlist)` 和最后一个用于比较的 `std::end(allowlist)`，三个 allowlist 的地址都不一样，因此这个 `!=` 判定始终会成功，表现上就是会认为用户总是在灰度列表中了。

这是不是一个 compiler bug 呢？正如文章标题，我只是把这作为一个 unexpected behavior，因为编译器可以自行选择对 constexpr 的优化方式。我也尝试在 gcc bug report 数据库里进行了查找，但看起来没有人反馈过这个问题。

最后是可能的绕过方式：
1. 升级 gcc 版本（gcc 8 及以上版本无此问题，7.5 及以下版本才有此问题）
2. 换用其他 compiler：clang, msvc 都无此问题
3. 不要用 constexpr，改用一般的 const
4. 用 `[&arr]` 显式捕获 constexpr 数组

祝读到这里的各位以后都能少踩这类奇怪的坑吧。