---
title: Skills、Memory、ACI、Harness：如何把大模型做成真正可用的 Agent
category: Agent工程化
series: AI Agent专题
created: 2026-03-12
tags:
  - 博客
  - AI-Agent
  - Skills
  - Memory
  - ACI
  - Harness
---


我越往工程实现里想，越觉得“Prompt 怎么写”其实只是表层问题。真正决定系统是否可用的，往往不是 Prompt，而是 **Skills、Memory、ACI 和 Harness** 这些更底层的工程组件。

## Skills：把能力做成模块，而不是堆进 Prompt

在我这里，Skill 更像是一类问题的能力封装。它通常不只是几句提示词，而是一套结构化资源：
- instructions
- metadata
- reference
- forms
- scripts

这样做的好处很直接：
- 能力可复用
- 减少重复上下文
- 支持按需加载
- 更利于组合式扩展

相比把所有规则都塞进系统提示词，Skill 更接近“插件化能力”。

## Memory：没有记忆，就没有持续行为

一个真正像 Agent 的系统，不能每一步都像第一次见到任务。

因此需要至少两类 Memory：
- short-term memory：当前会话上下文
- long-term memory：跨步骤、跨任务保留的信息

如果让我自己实现，我会愿意先把 long-term memory 落到 `memory.md` 这样的文件中，因为它足够直观：
- 便于观察
- 便于修改
- 便于沉淀长期经验

但这里也要分清楚“概念”和“实现”。`memory.md` 只是长期记忆的一种工程载体，不是长期记忆本身；数据库、向量库或结构化存储，同样可以承担这个角色。关键不在于文件名，而在于系统有没有能力把重要状态稳定地保留下来。

## ACI：让 Agent 真正接入计算机环境

ACI 通常指 Agent-Computer Interface。它的意义有点像 HCI，只不过交互对象从人变成了 Agent。

在我看来，一个 Agent 是否真正能做事，取决于它能不能：
- 读取环境
- 调用工具
- 执行动作
- 获取反馈

如果没有这一层，所谓 Agent 往往只是“能描述自己准备做什么”，而不是“真的去做”。

另外，ACI 也不是所有框架都统一采用的标准术语。有些系统会把这一层直接叫作 tool interface、action interface 或 environment interface。名字可以不同，但核心问题都一样：**怎样把模型和真实环境连接起来，并且让连接过程足够清晰、可控、可调试。**

## Harness：比模型更重要的验证基础设施

我自己非常认同一个观点：**Harness 往往比模型本身更重要。**

为什么？因为没有验证框架，你根本不知道：
- 系统到底有没有进步
- 哪一类任务失败率更高
- 调整后到底是变好了，还是只是看起来变好了

Harness 的价值，在于把 Agent 的表现转化成可观察、可比较、可复现的数据。

## Context 为什么总会失控

Agent 做复杂任务时，很容易出现一个问题：context 越来越长，决策质量越来越差。

这时如果继续粗暴堆信息，效果通常只会更差。

更合理的做法是：
- 把稳定规则沉淀进 skills
- 把长期状态存入 memory
- 把动作能力封装到 ACI
- 用 compact summary 压缩上下文
- 让运行时只注入当前真正需要的信息

## 一个可用 Agent 的最小骨架

如果只保留最核心的工程组件，一个可用 Agent 至少应包含：
- 输入入口
- 状态管理
- 记忆系统
- 技能系统
- 工具接口
- 验证闭环

其中：
- Skills 负责“会什么”
- Memory 负责“记住什么”
- ACI 负责“怎么做事”
- Harness 负责“怎么证明它真的有效”

## 结语

所以我最后的结论一直很明确：把大模型变成 Agent，不是多写几句 Prompt，而是把它放进一套完整的工程结构里。真正的难点从来都不是“让模型说得像在行动”，而是“让系统真的能行动、记忆、复用和验证”。

## 参考资料

- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- UC Berkeley, *CS294/194-280 Advanced Large Language Model Agents (Spring 2025)*: https://rdi.berkeley.edu/adv-llm-agents/sp25
