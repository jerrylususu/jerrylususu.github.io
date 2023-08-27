---
title: 分布式系统课程笔记
date: 2021-12-12T20:47:32+03:00
description: challenging yet interesting
tags:
  - 分享
  - 系统
  - 分布式
---

这学期选了一门分布式系统的课程，实际上内容大概是 MIT 的分布式系统（6.824）和普林斯顿的分布式系统（COS 418）课程的混合。大概覆盖了以下内容：
* 分布式系统基础：RPC 和消息语义，逻辑时钟，分布式快照，一致性模型, CAP/FLP 理论
* 最终一致性系统：Bayou, DHT, Dynamo
* 共识和状态机复制：Primary-backup, Viewstamped Replication, Paxos, Raft, P-BFT
* 分布式事务与强一致性：2PC, 2PL, Spanner

回想之前大一大二断断续续上的一些分布式相关的课程，有些东西果然是需要一些经验才会慢慢理解。

课程内容之外，作业基本上也是从 MIT 的作业改的，分别是实现以下系统：
* MapReduce (Sequential / Distributed)
* Raft (Election, Log Replication, Fault Tolerance)
* K-V Storage based on Raft (KV-Raft)

其中可能比较值得一提的是后两项作业，因为算是自己可能从来不会主动去写的类型，一想到可能的巨大复杂度就打退堂鼓了。不过实际上因为配套的测试比较完备，最后写起来其实也就是一个 case 一个 case 过，并没有想象中的那么困难。（不过从日志 debug 的确容易烦躁就是了。）最后实际上 Raft 和 KVRaft 都是在两天内写完的，不过的确是全神贯注的两天了。

尝试着把自己的（中文）笔记整理了一下，放在下面的链接。不过课件还是要点回课程网站手动获取，我并没有 redistribute 的权限。如有错漏，欢迎指出。
[All distributed system lectures](https://nekonull.me/distsys_notes/#/page/all%20distributed%20system%20lectures)

总而言之，上完这门课并且写完作业，稍微算是对自己实现复杂系统的能力更有一些些信心了吧。
