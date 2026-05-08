---
title: 为什么目标驱动模式能提升 Agent 表现
category: Agent基础
series: AI Agent专题
created: 2026-05-08
tags:
  - 博客
  - AI-Agent
  - 目标驱动
---

> 把同一个 prompt 放在循环里反复跑，就能显著提升模型的表现——这听起来像魔法，但背后是 **test-time compute scaling** 这个越来越被验证的趋势。问题是，"单纯循环"远不是最优解。

## 背景：从 Ralph Loop 到 /goal

早在 GPT-4 时代，就有人设计过类似"持续运行直到任务完成"的 prompt。

典型的写法是：

> "完成这个任务，要求如下。直到你 100% 确认已经完成再停下，否则找到其中的漏洞并循环执行。"

这种做法的核心是**让模型自己判断是否完成**，没完成就重来。

后来出现了 **Ralph Wiggum Loop**——最原始的形式就是在循环里不断跑同一段 prompt，保证模型能持续处理最初的指令。

再后来，Codex 开源了 `/goal` 模式：

- 底层用 SQLite 存储每个目标（`thread_goals` 表），记录 prompt、状态、token 预算
- 每次用类似 Ralph Loop 的方式执行，附带了 token 使用统计和完成度审计
- 解决了"Agent 跑 15 分钟就问你要不要继续"的尴尬

在 `/goal` 之前，还有一种更结构化的目标驱动设计——**Goal-Driven 框架**，由社区在更早的时候提出。

它的核心只有 4 个概念：

- **目标（Goal）**——最终目的
- **成功标准（Criteria）**——一套可量化、可判断的条件
- **子智能体（Subagent）**——负责持续解决问题
- **主智能体（Master Agent）**——唯一的控制者和评估者

工作方式用伪代码就能说清：

```
while (criteria not met) {
  let subagent work on achieving the Goal
  check activity every 5 minutes
  if (subagent is inactive or claims done) {
    evaluate result against criteria
    if (criteria not met) restart a new subagent
  }
}
```

主 Agent **不做具体工作，只做评估和调度**。这个框架已经被用于一些耗时 30–100 小时的复杂项目（C++ 编译器、Rust SQLite 实现）。

## 核心问题：纯循环的缺陷

Ralph Loop 和 `/goal` 有一个共同的致命弱点：**黑箱长循环**。

每轮循环的输出变成下一轮的输入，如果某一步模型做出了错误的选择，之后的所有工作都会沿着错误方向累积。这就是 **Ambiguity Compounds（歧义复利）**——每一轮的微小偏差都被下一轮放大，最终面目全非。

这种**决策偏差的复合效应**和现实世界是一样的——拿模糊的需求去问别人，没有来回沟通，结果大概率不是你想要的。

解决办法有三个方向：

### 1. 写更好的 prompt + 用 /interview 迭代

在 prompt 里穷尽所有任务目标和**绝对可量化的验收标准**。问题是，一次性写完美几乎不可能。

换个思路：**先写出能跑的第一版，然后用 `/interview` 与模型对话迭代修正**——把一次性写好变成逐步收敛。理清需求，排除可能的错误方向。

这一步的本质是**把决策权从 Agent 收回到人手里**——在长时间执行开始之前，先砍掉那些偏离目标的路径分支。

### 2. 用 subagent 做并行验证

主 Agent 只负责任务要求和验收条件，**subagent 并行验证多个可能的路径**。

好处是：

- subagent 不污染主 Agent 的上下文
- 主 Agent 有回退机制，可以不断尝试不同方向
- **subagent 避免了错误的累积**——它第一次看到代码，没有"我被这个 bug 折磨了很久"的确认偏误

实践中，subagent 内部还可以进一步拆分为 implementer 和 reviewer 两个角色：

> implementer 写代码 → reviewer 审查 → 迭代直到双方满意 → 上报主 Agent

reviewer 第一次看到代码时没有"被 bug 折磨了很久"的确认偏误，更容易发现盲点。

再加上共享记忆（SQLite 或本地 md 文件），subagent 每次新开上下文时都能恢复之前的进度。

跨上下文记忆可以用四个文件来管理：

- **GOAL.md** — 顶层目标（不可变）
- **STANDARDS.md** — 代码质量标准（不可变）
- **IMPLEMENT.md** — 执行流程说明
- **PROGRESS.md** — 决策记录和进度日志

新启动的 subagent 先读这四个文件，就能完整恢复上下文，避免在膨胀的 context window 里翻找历史信息。

设计长运行 Agent 的一条核心原则：**每一轮决策都应装入尽可能干净的上下文**。

## 深入分析：为什么多花钱就能提高表现？

从定性趋势上看，为了让输出质量提高一截，往往需要消耗数倍于常规的 token 量。这听起来浪费，但背后有深刻的架构原因：

### 1. Transformer 的注意力计算

每生成一个 token，模型都会做一次 forward pass（前向传播）。你让模型多写 1000 个 token，就等于给了它 **1000 次额外的推理机会**。

在 BrowseComp 基准上，Sonnet 4.6 用 10 倍 token 换来约 10 个百分点的提升——不是特例，而是 test-time compute scaling 规律在生效。

### 2. In-Context Learning 的递归应用

模型能从自己的输出中继续学习。它看到"我写了代码 X，现在需要测试它"，就会自然地延续这个模式。循环让它把自己的输出**当作输入再次消费**，每一轮都是对上一轮的反思。

### 3. 隐式的多路试探

单次运行是贪心解码——一个路径走到黑。多轮循环+subagent 等于在搜索空间中尝试不同分支，是**并行探索**。

每个 subagent 验证不同的可能性，直到找到最合适的方案。这本质上是把搜索过程引入了推理阶段。

### 4. Context 焦虑与注意力 sink

实践中发现，当上下文逐渐逼近容量上限时，模型倾向于仓促收尾，质量明显下降。

另一个相关机制是 **Attention Sink**：Transformer 早期 token 会吸收不成比例的注意力权重。每轮循环都在追加更多 token，但注意力预算被大量消耗在前面的 token 上，模型对关键信息的关注能力被稀释。

这就是"新鲜上下文"策略有效的原因——subagent 和共享记忆让每一轮都从干净状态启动，而不是在膨胀的上下文里挣扎。

## 总结

| 模式 | 原理 | 瓶颈 |
|------|------|------|
| Ralph Loop | 重复执行，累积注意力计算 | 错误复合，上下文膨胀 |
| /goal | Loop + 状态管理 + budget 追踪 | 仍需解决黑箱和偏差累积 |
| Goal-Driven | 主 Agent 评估 + Subagent 执行 + 定期活性检查 | 消耗大，适合数日级项目 |
| Loop + Subagent | 分而治之，并行验证 | 消耗更多 token，但质量更高 |
| Loop + Interview | 提前消除歧义 | 需要人工参与，但值得 |

目标驱动模式能提升表现的**根因**是 **test-time compute scaling**——投入更多的推理计算量来换取更好的结果。

纯循环是笨办法，但**笨办法在新范式出现之前往往就是最好的办法**。而 subagent、共享记忆、前置澄清这些改进，是在这个基础上让笨办法变得不那么笨。

如果你也在做长运行 Agent，最值得先做的一件事不是调 prompt，而是**在上线前认真想清楚：你到底想要什么？写下来，量化它，然后才让 Agent 动起来**。
