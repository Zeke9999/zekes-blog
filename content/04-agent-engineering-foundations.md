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

把大模型做成可用的 Agent，关键并不只是 Prompt，而是是否具备一套完整的工程支撑。围绕这一点，Skills、Memory、ACI、Harness 可以视为四类很有代表性的基础组件：它们分别回答“系统会什么”“系统记住什么”“系统如何接入环境”以及“系统如何被验证和迭代”。

## Skills：把能力做成模块，而不是全部堆进 Prompt

在工程语境里，Skill 更像是一类问题的能力封装。它通常不只是几句提示词，而是一套结构化资源，例如：
- instructions
- metadata
- references
- forms
- scripts

Anthropic 对 Agent Skills 的描述是“可被动态发现与加载的 instructions、scripts、resources 目录”。这种做法的价值主要体现在：
- 能力可复用
- 减少重复上下文
- 支持按需加载
- 更利于组合式扩展

需要注意的是，`Skill` 是一种实现思路，不是所有框架都会显式采用这个命名。不同系统里，它也可能以 playbook、plugin、tool bundle 或 domain module 的形式出现。

## Memory：持续行为依赖状态保留，但不等于所有 Agent 都需要长期记忆

对需要跨步骤、跨轮次甚至跨任务持续表现的 Agent 来说，记忆系统是重要组成部分；但这并不意味着所有 Agent 都必须具备复杂的长期记忆。

通常至少要区分两类状态：
- short-term memory：当前任务中的上下文、计划、临时观察结果
- long-term memory：跨任务保留的偏好、经验、规则、历史事实

如果只是一次性短任务，短期状态可能已经足够；如果系统需要持续服务用户，长期记忆的重要性才会迅速上升。

`memory.md` 这样的文件可以作为长期记忆的一种简单工程载体，因为它：
- 便于观察
- 便于修改
- 便于沉淀长期经验

但需要分清“概念”和“实现”：长期记忆并不等于某个特定文件。数据库、向量库、结构化状态存储乃至事件日志，都可以承担这一角色。关键在于系统能否稳定地写入、检索和更新重要状态。

## ACI：让 Agent 真正接入计算机环境

ACI 通常指 Agent-Computer Interface。这个术语在 SWE-agent 中被明确提出，用来强调：Agent 不是抽象地“知道该做什么”，而是需要一个适合模型操作的计算机接口，去完成搜索、导航、编辑、执行与反馈获取等动作。

从工程角度看，一个 Agent 是否真正能做事，取决于它能不能：
- 读取环境
- 调用工具
- 执行动作
- 获取反馈

如果没有这一层，所谓 Agent 往往只是“描述准备怎么做”，而不是真的去做。

同时也要注意，ACI 并不是所有框架都统一使用的标准术语。很多系统会把这一层称为 tool interface、action interface、runtime interface 或 environment interface。名称可以不同，但核心问题一致：**怎样把模型与真实环境连接起来，并让这种连接可控、可调试、可验证。**

## Harness：比单次效果更重要的验证与运行基础设施

Harness 不只是一个“跑测试的外壳”，而是支撑 Agent 开发、运行、回放、比较与评估的基础设施。

按照 Anthropic 在评测文章中的划分，可以区分：
- agent harness：让模型作为 agent 运行的脚手架，负责编排输入、工具调用和结果返回
- evaluation harness：运行评测任务、记录轨迹、执行 grader、汇总结果的基础设施

Harness 的意义，在于把 Agent 的表现转化成可观察、可比较、可复现的数据。没有这一层，就很难判断：
- 系统到底有没有进步
- 哪一类任务失败率更高
- 调整后到底是变好了，还是只是看起来变好了

## Context 为什么总会失控

Agent 处理复杂任务时，常见问题是 context 不断膨胀，而决策质量反而下降。

Anthropic 在 context engineering 文章中强调，好的上下文设计应尽量保留“最小但高信号”的信息集合。更合理的做法通常包括：
- 把稳定规则沉淀进 skills
- 把长期状态存入 memory
- 把动作能力封装到 ACI
- 用 compact summary 压缩上下文
- 只在运行时注入当前真正需要的信息

如果把所有规则、历史和工具说明都直接堆进 prompt，系统不仅难维护，也会更容易失去决策聚焦。

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
- ACI 负责“如何与环境交互”
- Harness 负责“如何运行、记录并证明系统有效”

## 结语

把大模型变成 Agent，不是多写几句 Prompt，而是把它放进一套完整的工程结构里。真正的难点从来都不是“让模型看起来像在行动”，而是让系统真的能行动、能记忆、能复用、能验证。

## 参考资料

- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- Anthropic, *Equipping agents for the real world with Agent Skills*: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Anthropic, *Effective context engineering for AI agents*: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic, *Demystifying evals for AI agents*: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- UC Berkeley, *CS294/194-280 Advanced Large Language Model Agents (Spring 2025)*: https://rdi.berkeley.edu/adv-llm-agents/sp25
- John Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering*: https://arxiv.org/abs/2405.15793
