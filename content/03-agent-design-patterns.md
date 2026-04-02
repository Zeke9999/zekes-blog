---
title: Agent 常见设计模式：Prompt Chaining、Routing、Parallelization、Orchestrator 与 Evaluator-Optimizer
category: Agent设计模式
series: AI Agent专题
created: 2026-03-09
tags:
  - 博客
  - AI-Agent
  - Prompt-Chaining
  - Routing
  - Parallelization
  - Orchestrator
  - Evaluator-Optimizer
---

Agent 系统的质量，通常并不取决于“模型是否足够自主”这种抽象表述，而更取决于系统采用了什么组织模式。Anthropic 在 *Building Effective Agents* 中总结的一组高频模式包括：**Prompt Chaining、Routing、Parallelization、Orchestrator-Workers、Evaluator-Optimizer。**

## Prompt Chaining：把大问题拆成线性步骤

Prompt Chaining 的核心，是把一个复杂任务拆成若干顺序执行的小步骤：

```text
in -> LLM call -> check/gate -> LLM call -> ... -> out
```

适合场景：
- 任务可以拆成几个明确的小步骤
- 每一步都能清楚定义输入输出
- 中间要插入校验、改写或格式处理

它的优点是：
- 稳定
- 好测试
- 易调试
- 中间结果可观测

如果任务本质上是“多步流水线”，那 Prompt Chaining 往往比完整 Agent 更值得优先实现。

## Routing：先分流，再处理

Routing 的本质，是先判断输入属于哪一类，再把它送入最合适的后续流程。

例如：
- 简单问题走轻量模型
- 复杂问题走强模型
- 检索型问题走 RAG
- 执行型问题走 Agent

Routing 特别适合这类系统：
- 问题类型比较清晰
- 各分支能力边界明确
- 希望平衡成本、延迟与效果

它的价值不只在于“分类”，更在于把系统复杂度拆散，避免所有请求都走同一条重流程。Anthropic 也明确指出，Routing 的意义之一是实现 separation of concerns，让不同类型输入使用更专门化的后续提示、工具和流程。

## Parallelization：把可并行的部分拆开处理

Parallelization 与 Orchestrator-Workers 容易混淆，但二者并不相同。

Parallelization 关注的是：**子任务已经知道可以拆开，并且它们之间相对独立。** 常见做法包括：
- sectioning：把任务拆成若干独立部分并行处理
- voting：对同一问题进行多次采样，再做聚合或投票

适合场景：
- 子任务之间依赖很弱
- 需要更快完成整体任务
- 希望引入多视角判断来提高置信度

例如：
- 并行审查同一段代码的不同风险维度
- 多个模型实例分别检查不同质量指标
- 对同一答案做多次采样并进行一致性聚合

它的优势是速度和覆盖面，但代价是额外的 token 消耗，以及后续还需要聚合逻辑来整合结果。

## Orchestrator-Workers：把复杂任务动态拆给多个执行单元

当一个任务已经复杂到单个固定流程难以覆盖时，就会进入 Orchestrator-Workers 模式。

典型角色分工是：
- Orchestrator：拆任务、调度任务、汇总结果
- Workers：负责各自子任务的执行

这种模式适合：
- 任务天然可拆分
- 子任务之间相对独立，但拆法并不固定
- 需要并行处理或角色分工

例如：
- 多角度调研
- 多模块代码分析
- 需要不同专长共同完成的生成任务

它和普通并行化的关键区别在于：**子任务不是预先完全写死的，而是由上层根据输入动态决定如何拆分。** 这也是 Anthropic 文档中将它与 Parallelization 分开的原因。

## Evaluator-Optimizer：生成之后不要急着返回

很多任务并不是“一次生成就结束”，而是需要先评估，再据此改进。

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

这类模式是否适用，通常取决于两个前提：
- 反馈标准足够清晰
- 模型能根据反馈稳定改进输出

如果评价标准本身模糊，或者优化环节没有可执行反馈，反复迭代只会增加成本。

## 真正的系统设计不是五选一

实际系统通常不会只使用一种模式，而是会组合使用：
- 用 Routing 先做分流
- 某个分支内部用 Prompt Chaining
- 对可拆部分做 Parallelization
- 在高复杂度任务中再进入 Orchestrator
- 最后用 Evaluator-Optimizer 保证质量

这比“一上来就全局 Agent 化”更可控，也更符合工程实践。

## 一个简单判断方法

如果在设计系统时拿不准该用哪种模式，可以先做这样的映射：
- 步骤线性明确：用 Prompt Chaining
- 类型差异明显：用 Routing
- 子任务独立且已知可拆：用 Parallelization
- 任务复杂且拆法依赖输入：用 Orchestrator-Workers
- 输出需要复审与迭代：用 Evaluator-Optimizer

## 结语

Agent 的价值从来不只在于“自主性”，更在于能否把复杂任务组织成稳定系统。真正优秀的 Agent 设计，不是把模型变得更神秘，而是把执行过程设计得更清楚、边界更清晰、验证路径更明确。

## 参考资料

- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
