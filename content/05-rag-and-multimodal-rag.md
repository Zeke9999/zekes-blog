---
title: 从 RAG 到 Multimodal RAG：Agent 如何连接知识与环境
category: RAG与知识增强
series: AI Agent专题
created: 2026-03-15
tags:
  - 博客
  - AI-Agent
  - RAG
  - Multimodal-RAG
---


我会把 RAG 看成 Agent 能力体系里非常关键的一环：如果说 ReAct 解决的是 Agent 怎么行动，那么 RAG 解决的就是 Agent **凭什么知道该怎么行动**。

## 为什么 Agent 需要 RAG

LLM 再强，也不可能天然掌握所有最新、最准确、最适合当前任务的信息。

因此在很多真实场景里，系统都需要一个能力：
- 先从知识库中检索
- 再把检索结果作为上下文交给模型
- 最后让模型基于这些信息生成回答或行动

这就是 RAG 的核心思想。

## RAG 的价值不只是“补知识”

我以前也容易把 RAG 理解成“给模型查资料”，但如果把视角放到 Agent 上，会发现它还有更深一层价值：
- 帮助模型定位下一步
- 缩小行动空间
- 让推理建立在外部事实之上
- 让系统具备面向环境的适应能力

也就是说，RAG 不只是知识增强，还是决策增强。

## 基础 RAG 的局限

按我的理解，基础 RAG 并不天然可靠。

常见问题包括：
- 检索结果不准
- 检索到的信息不完整
- 召回结果相关但无用
- 结果顺序不合理
- 错误信息反过来误导模型

所以真正的问题不是“有没有接 RAG”，而是“检索回来的内容是不是足够支持当前任务”。

## Agent 视角下的 RAG

一旦把视角从“问答系统”切换到“Agent 系统”，RAG 的要求会更高：
- 检索不只是为了回答问题
- 检索还要服务于下一步行动
- 检索结果必须能被融入任务流程
- 检索结果最好能和工具调用、计划更新联动

这意味着 RAG 在 Agent 里更像是一个持续参与决策的模块，而不是一次性前置步骤。

## Multimodal RAG 为什么重要

当任务不再只依赖文本信息时，Multimodal RAG 就变得重要了。

它允许 Agent 利用：
- 文本
- 图片
- 截图
- 图表
- 结构化数据

从我的角度看，多模态接入后，模型能拿到更丰富的上下文，这对理解环境和执行任务非常有帮助。

## Multimodal RAG 的工程难点

多模态增强的收益很大，但复杂度也显著上升。常见难点包括：
- 不同模态如何统一索引
- 不同模态的 top-k 如何融合
- 图像和文本信息如何共同进入上下文
- 哪类检索结果该优先影响决策

所以 Multimodal RAG 不是简单“多接一种输入”，而是整个检索与上下文组织方式都要升级。

## 一个更现实的结论

很多时候，系统效果差不是因为模型不够强，而是因为知识组织太差。我自己很认同一句话：**好的知识助手，不只是更多文本，而是更好的知识结构。**

这句话对做 Agent 特别重要。因为 Agent 不是只要“知道”，它还要根据知识去“做”。

## 结语

我现在越来越倾向于把 RAG 看成 Agent 的“知识底盘”。RAG 让 Agent 不再完全依赖模型内部知识，Multimodal RAG 则让 Agent 能更真实地接触复杂环境。未来 Agent 的能力上限，很大程度上取决于它连接知识、组织知识、利用知识的方式。

## 参考资料

- UC Berkeley, *CS294/194-196 Large Language Model Agents (Fall 2024)*: https://rdi.berkeley.edu/llm-agents/f24
- UC Berkeley, *CS294/194-280 Advanced Large Language Model Agents (Spring 2025)*: https://rdi.berkeley.edu/adv-llm-agents/sp25
- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
