---
title: Claude Code 核心机制解析
category: AI工程实践
series: AI Agent专题
created: 2026-05-07
tags:
  - 博客
  - AI-Agent
  - Claude-Code
  - LLM工具链
---

> Claude Code 不只是 CLI 工具。它的模块化架构使其成为一个**可编程的 Agent 平台**。
> 这篇文章从源码分析出发，拆解它所依赖的核心机制。

## TypeScript 架构的取舍

Claude Code 主要用 **TypeScript** 构建。相比 Codex 的 Rust 实现，它在**内存占用和启动速度**上不占优势，但换来了关键收益：

- **热更新** — 修改即生效，无需编译
- **npm 生态** — 数十万现成包直接可用
- **开发者基数** — TypeScript 开发者远多于 Rust
- **迭代速度** — 代码易读易改，演化极快

这是经典的**性能 vs 生态**取舍。Claude Code 选了后者，插件生态的爆发验证了这一选择。

## Agent Loop：让 Agent 真正动起来

Agent 与 Web Chat 的本质区别在于**循环与批执行能力**。

基础 ReAct 循环和 Chain-of-Thought 只是起点。现代 Agent 通过 **Hooks** 和 **Tool Calling**，从学术玩具成长为能做实事的工具。

循环使 Agent 能多次调用工具、根据结果动态调整策略、在长任务中维持上下文。

## 五大核心组件

### Skill：标准化工作流

Skill 是 Claude Code 爆火的重要原因。它通过模板工程、工作定义、精细 prompt 和内置工具，让 Agent 具备了**高度定制化的标准化工作流能力**。

与之相关但容易混淆的是 **Command**。两者有重叠但定位不同：Skill 存放在 `~/.claude/skills/`，通过语义匹配自动触发；Command 存放在 `~/.claude/commands/`，通过 `/command-name` 调用。Skill 适合广义工作流，Command 适合快速执行。

### Hook：事件驱动自动化

Skill 主动，**Hook 被动**。这是两者的核心区别。

Hook 覆盖的工具不止于 PreToolUse 和 PostToolUse。完整的生命周期包括：

- **PreToolUse / PostToolUse** — 工具执行前后（验证参数、格式化输出）
- **UserPromptSubmit** — 用户发送消息时（注入上下文、检查意图）
- **PreCompact** — 上下文压缩前（保存状态快照）
- **Stop** — 会话结束时（日志清理、持久化 learnings）
- **Notification** — 权限请求时（自定义审批流）

单个 Hook 是零件，组合起来能构建更强的系统。

**跨会话记忆系统**是最典型的例子：PreCompact 在压缩前保存状态到文件，Stop 在会话结束时持久化关键 learnings，SessionStart 在新会话中自动加载之前上下文。三个 Hook 串联，让 Agent 在任务内和会话间都能维持连续性。

### Sub Agent：并行与隔离

Sub Agent 解决两个问题：

- **节省主 Agent 上下文** — 独立任务交给子 Agent，主窗口保持干净
- **并行执行** — 子 Agent 同时工作，大幅提升效率

但隔离也有代价。**Sub Agent 只有字面查询，缺少 Orchestrator 的语义上下文**——它知道"查什么"，但不完全理解"为什么查"。

所以摘要常常遗漏关键信息。实践中需要**迭代检索模式**：Orchestrator 收到摘要后评估是否足够，不够就追问，Sub Agent 回去重新查，循环最多 3 轮。这不是 bug，是架构取舍——用多次往返换上下文隔离。

### Rule：约束输出质量

LLM 输出常不受控——多余的表情符号、不规范的代码风格、模板化套话。

**Rule** 通过 `rule.md` 明确告诉模型什么能做、什么不能做，是保证输出质量的核心约束层。

### MCP：打通外部数据

**Model Context Protocol** 统一了 LLM 与外部数据的通信接口。

模型既能用已有信息，也能请求最新数据，从根本上拓展了能力边界。

但 MCP 不是免费的。每个启用的 MCP 都会贡献一批工具声明到上下文中。实践中的经验规则是：**配置 20-30 个 MCP，但只启用不超过 10 个，活跃工具数控制在 80 以下**。200k 的上下文窗口，堆满 MCP 后可能只剩 70k——可用的推理空间被大幅压缩。

这是和 TypeScript 一样的 tradeoff：**功能换窗口**。

## 插件生态：Everything-Claude-Code

得益于 TypeScript 生态，Claude 插件早已不局限于 Skill 或 MCP。以最火的 **Everything-Claude-Code** 为例，它整合了 Commands、Skills、Hooks、Sub Agents、MCP 和 Workflows。

插件生态的核心挑战是**内部一致性**——不同插件的 prompt 冲突会导致行为容斥，这是最容易被忽视的问题。

## 总结

- **TypeScript 架构**牺牲了性能下限，换来了生态和迭代速度的上限
- **Agent Loop**是区别于 Chat 的本质差异，Hooks 和 Tool Calling 是进化方向
- **Skill、Hook、Sub Agent、Rule、MCP** 构成完整能力矩阵
- 插件生态快速扩张，**一致性**是长期维护的关键
