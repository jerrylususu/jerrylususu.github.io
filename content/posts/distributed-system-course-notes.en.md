---
title: Notes on Distributed Systems Course
date: 2021-12-12T20:47:32+03:00
description: Challenging yet interesting
tags:
  - Sharing
  - Systems
  - Distributed
---

This semester, I took a course on distributed systems, which is essentially a combination of MIT's Distributed Systems (6.824) and Princeton's Distributed Systems (COS 418) courses. It covers the following topics:
* Fundamentals of distributed systems: RPC and message semantics, logical clocks, distributed snapshots, consistency models, CAP/FLP theory
* Eventual consistency systems: Bayou, DHT, Dynamo
* Consensus and state machine replication: Primary-backup, Viewstamped Replication, Paxos, Raft, P-BFT
* Distributed transactions and strong consistency: 2PC, 2PL, Spanner

Looking back at the distributed-related courses I took intermittently in my freshman and sophomore years, it's clear that some things require experience to gradually understand.

Apart from the course content, the assignments are mostly adapted from MIT's assignments, and they involve implementing the following systems:
* MapReduce (Sequential / Distributed)
* Raft (Election, Log Replication, Fault Tolerance)
* K-V Storage based on Raft (KV-Raft)

The last two assignments are worth mentioning because they belong to the type of tasks I would never voluntarily attempt. Just the thought of their potential complexity made me hesitant. However, in reality, due to the comprehensive set of tests provided, implementing them turned out to be a case-by-case process, and it wasn't as difficult as I had imagined. (Although debugging logs can indeed be frustrating.) In the end, I managed to complete Raft and KVRaft within two days, but those were two days of intense focus.

I tried organizing my notes and provided a link below. However, the lecture slides still need to be obtained manually from the course website, as I do not have redistribution permissions. If there are any errors or omissions, please feel free to point them out.
[All distributed system lectures](https://nekonull.me/distsys_notes/#/page/all%20distributed%20system%20lectures)

In conclusion, after completing this course and the assignments, I have gained a bit more confidence in my ability to implement complex systems.