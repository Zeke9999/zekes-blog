---
title: 从 ReAct 理解 Agent 为什么需要推理与行动闭环
category: Agent设计模式
series: AI Agent专题
created: 2026-03-06
tags:
  - 博客
  - AI-Agent
  - ReAct
  - Reasoning
---


我越整理 ReAct 这部分内容，越觉得它抓住了 Agent 的关键差异：真正重要的不是“会不会调工具”，而是**能不能在行动前后持续思考，并根据环境反馈调整下一步。** 这正是 ReAct 最打动我的地方。

## ReAct 是什么

在我看来，ReAct 可以直接理解为 **Reason + Act**。

它的基本循环是：

```text
Thought -> Action -> Observation -> Thought -> ...
```

也就是说，模型不是一次性把答案吐出来，而是：
- 先思考
- 再行动
- 观察结果
- 根据结果继续思考
- 然后决定下一步

这也是我为什么会把它看得很重：它让 Agent 从“生成一个回答”变成了“推进一个过程”。

## 为什么只靠 CoT 不够

CoT 解决的是“怎么想”的问题，但它不直接解决“怎么与世界交互”的问题。

只做 CoT 时，模型更像是在脑内推演。可现实任务往往不是纯推理题，而是需要：
- 查资料
- 调工具
- 读文件
- 看结果
- 修正路径

所以真正的 Agent 任务，不只是推理链，还需要**行动链**。

## 为什么只行动也不够

如果只有 Action，没有显式 Thought，系统很容易落到另一种盲目试错里：
- 为什么做这个动作？
- 这个动作失败后怎么调整？
- 动作之间有没有长期目标约束？

没有推理支撑的行动，很难在长链路任务里保持方向感。

## ReAct 的价值，不等于所有 Agent 都必须长这样

我现在更倾向于把 ReAct 看成一种非常经典、也非常实用的 Agent 范式，但不是唯一范式。有些任务本身更偏纯推理，或者更接近一次性规划，不一定需要显式的 Action / Observation 循环。

所以 ReAct 的关键不在于“多了一步输出”，而在于它把**推理和行动连接起来**，让动作不再是随机的，让推理不再停留在纸面上。

## ReAct 为什么适合真实任务

按我的理解，ReAct 特别适合下面几类问题：
- 路径不固定的问题
- 需要不断获取新信息的问题
- 需要根据外部环境结果调整策略的问题
- 长链路任务

例如：
- 搜索式问答
- 自动化排障
- 软件工程问题修复
- 多步检索与执行任务

这类问题的共同点是：**正确答案不是一开始就知道的，而是在“做”的过程中逐渐发现的。**

## ReAct 的三个工程价值

### 1. 协同性
推理与行动之间不是断开的，而是互相驱动。

### 2. 可解释性
中间的 thought 能帮助我们理解模型为什么这么做，也更便于调试。

### 3. 可控性
当系统表现不稳定时，我们可以限制 thought 格式、动作范围，或者增强 observation 质量，而不是只能盲调 prompt。

## ReAct 不是万能药

但一个很现实的情况是：ReAct 很强，不代表它总能稳定成功。

它仍然依赖：
- context 质量
- tool 设计质量
- observation 反馈质量
- prompt 约束是否足够清晰

如果 observation 很噪，或者 action space 设计混乱，那么 Thought 再漂亮，也可能导向错误路径。

## 长程任务为什么更依赖 ReAct

在短任务里，模型可能一次输出就够了。但在长程任务里，系统必须同时处理两件事：
- 局部步骤是否正确
- 当前方向是否仍然朝着目标推进

这本质上要求系统既能做局部决策，也能持续维护全局意图。ReAct 恰好提供了这种“边做边想”的能力，因此它成为很多 Agent 系统的重要基础。

## 结语

对我来说，ReAct 最重要的意义，不是让模型多输出一个 Thought，而是让模型真正进入“和环境一起完成任务”的状态。

普通 LLM 更像在回答问题，ReAct 风格的 Agent 更像在处理问题。两者之间的差别，正是 Agent 工程化的起点。

## 参考资料

- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- Shunyu Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models*: https://arxiv.org/abs/2210.03629
- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
