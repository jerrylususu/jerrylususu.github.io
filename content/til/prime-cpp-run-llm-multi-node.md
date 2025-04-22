---
title: Prima.cpp - 跨设备运行 LLM (2504.08791)
date: 2025-04-22T15:01:31.189Z
---

在 exo 之后的另一个跨设备 LLM 运行工具，但是速度比 exo 快得多；原理大致是，把所有参与节点组成一个环，一次推理可以在环上转多次，某个设备第一次推理和第二次推理加载不同的层；因此对小内存环境友好，不要求所有节点内存总大小大于模型大小（只要存储加载速度够快就行）。


src: https://github.com/Lizonghang/prima.cpp

paper: https://arxiv.org/abs/2504.08791

via: https://jack-clark.net/2025/04/21/import-ai-409-huawei-trains-a-model-on-8000-ascend-chips-32b-decentralized-training-run-and-the-era-of-experience-and-superintelligence/