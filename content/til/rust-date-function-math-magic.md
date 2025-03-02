---
title: Rust 的日期库的奇妙实现
date: 2025-03-02T13:51:04.427Z
---

- 问题：实现一个函数，输入 (year, day-of-year) ，输出 (year, month, day)
- 基本做法：硬编码一个月份-日期数组，简单写一个循环
- Rust 的新做法：利用一些神奇的数学关系（仿射函数），可以在无循环的情况下实现判断，核心是这两个公式：

```
let month = (ordinal + 30) * 10 / 306 + 2;
let days_in_preceding_months = (month + 3) * 306 / 10 - 122;
```

最终优化后的代码如下：
```rust
const fn ordinal_date_to_calendar_date(year: i32, ordinal: u16) -> (i32, u8, u8) {
    let ordinal = ordinal as u32;
    let jan_feb_len = 59 + is_leap_year(year) as u32;

    let (month_adj, ordinal_adj) = if ordinal <= jan_feb_len {
        (0, 0)
    } else {
        (2, jan_feb_len)
    };

    let ordinal = ordinal - ordinal_adj;
    let month = (ordinal * 268 + 8031) >> 13;
    let days_in_preceding_months = (month * 3917 - 3866) >> 7;
    let day = ordinal - days_in_preceding_months;
    let month = month + month_adj;

    (year, month as _, day as _)
}
```

src: https://jhpratt.dev/blog/optimizing-with-novel-calendrical-algorithms/