---
title: Agent 常见设计模式：Prompt Chaining、Routing 和 Orchestrator
category: Agent设计模式
series: AI Agent专题
created: 2026-03-09
tags:
  - 博客
  - AI-Agent
  - Prompt-Chaining
  - Routing
  - Orchestrator
---


我现在看 Agent 设计时，已经不太会把注意力放在“模型会不会自主思考”这种抽象说法上了。真正决定系统质量的，往往是这些更具体的模式：**Prompt Chaining、Routing、Orchestrator-Workers、Evaluator-Optimizer。**

## Prompt Chaining：把大问题拆成线性步骤

我很喜欢 Prompt Chaining 这个思路，因为它足够朴素：

```text
in -> LLM call -> check/create -> LLM call2 -> ... -> out
```

适合场景：
- 任务可以拆成几个明确的小步骤
- 每一步都能定义清楚输入输出
- 中间要插入校验、改写或格式处理

它的优点是：
- 稳定
- 好测试
- 易调试
- 中间结果可观测

如果你的任务本质上是“多步流水线”，那 Prompt Chaining 往往比完整 Agent 更值得优先实现。

## Routing：先分流，再处理

在我看来，Routing 的本质就是先判断任务属于哪一类，再让它进入对应流程。

例如：
- 简单问题走轻量模型
- 复杂问题走强模型
- 检索型问题走 RAG
- 执行型问题走 Agent

Routing 特别适合这类系统：
- 问题类型比较清晰
- 各分支能力边界明确
- 希望控制成本与性能平衡

它的价值不只在于“分类”，更在于把系统复杂度分散开，避免所有请求都走同一条重流程。

## Orchestrator-Workers：把复杂任务拆给多个执行单元

当一个任务已经复杂到单个流程难以处理时，就会进入 Orchestrator-Workers 模式。

这里的典型角色分工是：
- Orchestrator：拆任务、调度任务、汇总结果
- Workers：负责各自子任务的执行

这种模式适合：
- 任务天然可拆分
- 子任务之间相对独立
- 需要并行处理或角色分工

比如：
- 多角度调研
- 多模块代码分析
- 多角色协作生成内容

它和普通并行化的区别在于：子任务并不是预先全部写死的，而是由上层根据输入动态决定怎么拆。

## Evaluator-Optimizer：生成之后不要急着返回

很多任务不是“一次生成就结束”，而是需要评估后再优化。

这就是 Evaluator-Optimizer 的核心：

```text
generator -> evaluator -> feedback -> optimize
```

适合场景：
- 有明确质量标准
- 输出可以被审查
- 可以基于反馈继续改进

例如：
- 翻译润色
- 文案优化
- 结构化输出检查
- 代码生成后验证

## 真正的系统设计不是四选一

如果真让我自己搭系统，我基本不会只选一种模式，而是会混合使用：
- 用 Routing 先做分流
- 某个分支内部用 Prompt Chaining
- 复杂任务再进入 Orchestrator
- 最后用 Evaluator-Optimizer 保证质量

这比“一上来就全局 Agent 化”更可控，也更符合工程实践。

## 一个简单判断方法

如果你在设计系统时拿不准该用哪种模式，可以这样判断：
- 步骤线性明确：用 Prompt Chaining
- 类型差异明显：用 Routing
- 任务复杂可拆：用 Orchestrator-Workers
- 输出需要复审：用 Evaluator-Optimizer

## 结语

写到这里，我反而更坚定一个判断：Agent 的价值从来不只在于“自主性”，更在于能否把复杂任务组织成稳定系统。真正优秀的 Agent 设计，不是把模型变得更神秘，而是把执行过程设计得更清楚。

## 参考资料

- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
