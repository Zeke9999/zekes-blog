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


这一组文章最初来自我在学习 Agent 过程中的阶段性整理，后面又做了一轮面向公开阅读的改写。

这次整理时，我把原先散落在正文中的批注和勘误尽量并回了对应文章里，不再单独用“补充说明”去打断正文节奏。这样做的原因很简单：如果某个判断本来就需要附带边界条件，那它更适合直接成为正文的一部分，而不是事后再贴一条醒目的批注。

目前这组文章主要服务两个目标：
- 帮我自己把 Agent 相关主题整理成更稳定的知识结构
- 让第一次接触这些概念的读者，能用比较低的阅读门槛进入这个方向

因此它们的写法会明显偏向：
- 先建立直觉
- 再补工程视角
- 尽量避免把术语堆得过满

在来源上，这个专题主要参考三类公开材料：
- Berkeley 的公开课程资料，尤其是 LLM Agents 相关课程页面和讲义索引
- Anthropic 关于 agentic systems 的官方工程文档
- Shunyu Yao 等人的代表性论文，例如 ReAct，以及后续和 Agent 环境、软件工程任务相关的工作

如果后面我继续补充新的文章，我会尽量保持同样的标准：正文里直接说清边界，文末明确列出来源。

## 总来源

- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- UC Berkeley, *CS294/194-280 Advanced Large Language Model Agents (Spring 2025)*: https://rdi.berkeley.edu/adv-llm-agents/sp25
- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- Shunyu Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models*: https://arxiv.org/abs/2210.03629
- Shunyu Yao et al., *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*: https://arxiv.org/abs/2305.10601
- John Yang et al., *SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering*: https://arxiv.org/abs/2405.15793
