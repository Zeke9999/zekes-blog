---
title: 专题说明与来源
category: 补充与勘误
series: AI Agent专题
created: 2026-03-24
tags:
  - 博客
  - AI-Agent
  - 勘误
---

这一组文章来自对 Agent 相关主题的阶段性整理，后续又按公开阅读场景进行了统一改写。

目前，原先散落在正文中的批注和勘误已尽量并回对应文章，而不是继续以“补充说明”的形式独立存在。原因在于：如果某个判断本身就依赖边界条件，那么更合适的做法，是把这些边界条件直接写进正文，而不是在正文之外额外附注。

这组文章主要服务两个目标：
- 将 Agent 相关主题整理成更稳定的知识结构
- 让第一次接触这些概念的读者，以较低门槛进入这一方向

因此，整组文章在写法上会明显偏向：
- 先建立直觉
- 再补工程视角
- 尽量避免术语堆叠过密

在来源上，这个专题主要参考三类公开材料：
- Berkeley 的公开课程资料，尤其是 LLM Agents 相关课程页面和讲义索引
- Anthropic 关于 agentic systems 的官方工程文档
- Shunyu Yao 等人的代表性论文，例如 ReAct，以及后续与 Agent 环境、软件工程任务相关的工作

后续如果继续补充新文章，也会尽量保持同样标准：正文中直接说明边界条件，文末明确列出主要来源。

## 总来源

- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- UC Berkeley, *CS294/194-280 Advanced Large Language Model Agents (Spring 2025)*: https://rdi.berkeley.edu/adv-llm-agents/sp25
- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- Shunyu Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models*: https://arxiv.org/abs/2210.03629
- Shunyu Yao et al., *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*: https://arxiv.org/abs/2305.10601
- Xuezhi Wang et al., *Self-Consistency Improves Chain of Thought Reasoning in Language Models*: https://arxiv.org/abs/2203.11171
- John Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering*: https://arxiv.org/abs/2405.15793
