---
title: GCRA 限流算法
date: 2025-04-12T12:04:12.253Z
---

在看一个 Python 限流库（`throttled-py`）的仓库的时候，注意到了一个之前没有听说过的限流算法 GCRA（Generic Cell Rate Algorithm，通用信元速率算法）。
- 漏桶算法无法应对突发请求
- 令牌桶算法可以应对突发，但是需要维护两个状态（当前桶内令牌数、上一次补充令牌时间），且需要对状态加锁（这两个状态需要在一个原子里修改）
- GRCA 是对令牌桶的改进，减少了状态数（只需要维护一个状态 `tat` 理论到达时间），实现上更轻量

顺带一提，Let's Encrypt 用的也是 GRCA（底层状态存储在 Redis 里）。


blog: https://leungyukshing.cn/archives/Rate-Limit-Algorithm.html

via: https://github.com/ZhuoZhuoCrayon/throttled-py/tree/main/docs/basic

lets-encrypt: https://letsencrypt.org/2025/01/30/scaling-rate-limits/