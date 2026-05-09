---
title: Agent Skills 完全指南：从理解到写出好 Skill
category: Agent基础
series: AI Agent专题
created: 2026-05-09
tags:
  - 博客
  - AI-Agent
  - Agent Skills
  - MCP
---

> Agent Skills 是 AI 智能体的"能力插件"——装上它，AI 就多一项专长；拔掉它，AI 还是那个通用助手。
> 这篇文章讲清楚它是什么、为什么重要、以及怎么写好它。

## 核心观点

**连接性（Connectivity）与能力（Capability）应该分离。** MCP 解决前者，Agent Skills 解决后者。两者不是竞争关系，而是智能体架构中必然分离的两个层级。

---

## 一、Agent Skills 是什么？

先说一个场景。

你用 MCP 给智能体接上了数据库，它能查表了。但当你问"分析公司内部谁的话语权最高"，它不知道该怎么查——该查哪几张表？什么叫"话语权"？从哪些维度衡量？

MCP 给了它**手**，但没给**操作手册**。

Agent Skills 就是那本操作手册。它的核心定义是：

> 一种**标准化的程序性知识封装格式**，教导智能体如何正确使用工具完成特定任务。

你可以把它理解为 AI 的一个**能力插件**。装上一个 `pdf-editor` skill，AI 就会处理 PDF；装上一个 `code-review` skill，AI 就知道按什么顺序审查代码、关注哪些问题。

### 最小形态

一个 skill 最少只需要一个文件：

```
my-skill/
└── SKILL.md
```

SKILL.md 的结构很简单——**上半部分告诉 AI"什么时候用我"，下半部分告诉 AI"具体怎么做"**：

```yaml
---
name: my-skill
description: >-
  当用户需要做某件事时，使用这个技能。
---

按以下步骤执行...
```

### 完整结构

当技能变复杂时，可以扩展成一个目录：

```
skill-name/
├── SKILL.md            # [必需] 入口文件
├── agents/
│   └── openai.yaml     # [推荐] 技能的"名片"，给产品界面用
├── scripts/            # [可选] 可执行脚本
├── references/         # [可选] 参考文档
└── assets/             # [可选] 产出物模板
```

---

## 二、渐进式披露：破解上下文困境

Agent Skills 最核心的创新，是**渐进式披露（Progressive Disclosure）**。

为什么需要它？一个典型的 MCP 服务器可能暴露几十个工具，全部加载到上下文就是 **16,000 token**。如果同时在用多个工具，上下文迅速爆炸。

Skills 的做法是分三层加载：

### L1：元数据（始终在上下文）

每次对话开始时，智能体扫描所有已安装技能的 frontmatter，**只读 name 和 description**。每个技能约 **100 个 token**。装 50 个技能也才 5,000 token。

### L2：技能主体（触发后加载）

当智能体判断"这个技能和当前任务相关"，才会读取完整的 SKILL.md。里面有详细的操作指令、工作流、示例。

建议控制在 **5,000 词以内**。

### L3：附加资源（按需加载）

**scripts/ 里的脚本"执行而不读入"**，零 token 成本。references/ 和 assets/ 只在需要时才加载。容量理论上无上限。

### 效果对比

社区的真实案例表明，将一个包含大量工具定义的 MCP 服务器用 Skill 包装后，**初始上下文消耗从 16,000 token 降至约 500 token**，减少了 97%。

这不是说总开销降到了 500，而是**单个技能对上下文的冲击大幅降低**。装得越多，相对收益越大。

---

## 三、Skill vs MCP：本质区别

用一个比喻来理解：

**MCP 是 USB 接口**——它定义了设备怎么连接。你可以插键盘、插鼠标、插 U 盘，接口标准都一样。

**Skills 是软件应用**——它告诉计算机怎么用这些设备完成具体任务。有打印机驱动不代表你知道怎么在 Word 里双面打印。

两者的职责：

- **MCP**：提供标准化访问接口，让智能体能够"够得着"外部工具和数据
- **Skills**：提供领域专业知识，告诉智能体"如何组合使用这些工具"

### 实际工作流

用户问"分析公司内部谁的话语权最高"：

1. **Skills 层**识别这是一个数据分析任务，加载 `mysql-employees-analysis` skill
2. **Skills 层**将任务分解为子步骤：查管理关系、薪资对比、任职时长
3. **MCP 层**执行具体的 SQL 查询，返回数据
4. **Skills 层**解读数据，生成综合分析

**MCP 解决了"能连"，Skills 解决了"会干"。两者缺一不可。**

---

## 四、怎么写好一个 Skill

以下原则来自 skill-creator——一个用来创建 skill 的 skill。它自己的 SKILL.md 就是最好的教学案例。

### 原则 1：简洁是根本约束

AI 的上下文窗口是一张公共工作台。你的 skill 内容、对话历史、系统指令全都要摊在上面。

**每写一段之前问自己两个问题：**

1. AI 是不是已经知道这个了？（比如"Python for 循环怎么写"——AI 当然知道，不用教）
2. 这段内容值不值得占用工作台空间？

**什么不该放进 skill：**

- README.md、CHANGELOG.md、安装指南——AI 不需要
- 背景故事、版本记录、团队信息
- 所有"写给人看的"辅助文档

> The context window is a public good. — skill-creator

### 原则 2：用"不做什么"代替"做什么"

正向描述给 AI 的约束很弱。比如"请用温暖、克制的语气写作"——"温暖"的程度、"克制"的边界全是模糊空间。

**更好的方式是指定反模式清单：**

| 不要这样做 | 怎么改 |
|-----------|--------|
| 角色堆砌 | 保留一个冲突场景，补抽象提炼 |
| 只有鸡汤没有动作 | 改为今天可做的一小步 |
| 直接大道理 | 先铺场景再讲规律 |
| 过度绝对化（"永远""一定"） | 改为"多数时候""往往" |
| 收尾太猛（"必须改变！"） | 换成"慢慢来" |

**"做什么"描述了一个无限大的可行域，AI 在里面随机游走。"不做什么"在可行域上画边界，把行为空间收窄到你要的范围。**

### 原则 3：按自由度分配任务

不是所有任务都适合让 AI 自由发挥。判断标准很简单：

1. **做错了后果多严重？** 越严重，自由度越低
2. **有多少种"正确"的做法？** 越多，自由度越高

| 任务类型 | 自由度 | 实现方式 |
|---------|--------|---------|
| 理解需求、提问 | 高 | 文字指导 |
| 规划内容结构 | 中 | 模板 + 示例 |
| 初始化目录结构 | **低** | `init_skill.py` 脚本 |
| 生成特定格式文件 | **低** | `generate_openai_yaml.py` 脚本 |
| 校验最终结果 | **低** | `quick_validate.py` 脚本 |

**脚本的核心优势是"执行而不读入"**——你可以把任意复杂的确定性逻辑放进脚本，不占用上下文 token。

三个脚本形成一条质检链：`init_skill.py`（输入保障）→ AI 创造性编写 → `quick_validate.py`（输出保障）。**确定性脚本夹住中间的创造性步骤**，既保证质量，又不限制 AI 的自由度。

### 原则 4：统一祈使语气

SKILL.md 的正文统一用祈使句。这不是美学偏好——祈使句天然就是指令，减少 AI 的歧义理解空间。

### 原则 5：触发条件必须放在 frontmatter

这是新手最容易犯的错误。

**触发条件（"when to use this skill"）必须放在 description 里，不能放在正文里。**

为什么？正文只有在技能被触发后才会加载。如果你在正文里写"当用户问到 XX 时使用此技能"，AI 根本看不到这句话——它在决定要不要触发之前，只读了 frontmatter。

> description 是 AI 决定是否触发技能的**唯一依据**。所有判断条件必须放在这里。

---

## 五、常见层错位（避坑指南）

信息放错层级是 Skill 写作中最常见的错误。以下是 six 种典型情况：

| 错误 | 后果 | 修正 |
|------|------|------|
| 触发条件写在 body 里 | body 是触发后才加载的，AI 根本看不到 | 放 frontmatter description |
| "When to Use" 大标题写在 body | 同上 | 移到 description |
| 参考细节塞进 SKILL.md | body 膨胀，信息密度下降 | 拆到 references/ |
| 确定性操作写成文字指令 | AI 每次重新理解，可能出错 | 封装成 scripts/ |
| references 互相引用 | AI 需要多跳获取信息 | 所有 references 从 SKILL.md 直接链接 |
| SKILL.md 和 references 内容重复 | 浪费 token，更新时可能不一致 | 信息只在一处存在 |

---

## 六、渐进式披露的三种实战模式

不是把内容拆到 references/ 就完事了。怎么拆才合理？skill-creator 给出了三种模式：

### 模式 1：高层指南 + 参考文件

SKILL.md 只放核心工作流和快速开始的示例。高级功能用链接引用：

```markdown
# PDF Processing

## Quick start
Extract text with pdfplumber:
[code example]

## Advanced features
- **Form filling**: See [FORMS.md](FORMS.md) for complete guide
- **API reference**: See [REFERENCE.md](REFERENCE.md)
```

AI 只在需要时才加载 FORMS.md 或 REFERENCE.md。

### 模式 2：按领域组织

多领域技能按领域拆成独立文件，避免加载无关内容：

```
bigquery-skill/
├── SKILL.md (导航 + 通用流程)
└── references/
    ├── finance.md    # 财务相关表结构
    ├── sales.md      # 销售相关表结构
    └── marketing.md  # 市场相关表结构
```

用户问销售指标时，AI 只读 `sales.md`，不加载 finance 和 marketing 的内容。

### 模式 3：条件性细节

基础功能直接展示，高级功能按需链接：

```markdown
# DOCX Processing

## Creating documents
Use docx-js for new documents.

**For tracked changes**: See [REDLINING.md](REDLINING.md)
**For OOXML details**: See [OOXML.md](OOXML.md)
```

---

## 七、六步创建流程

把以上原则落地为可执行的步骤：

1. **理解** — 明确技能要解决什么问题，收集具体的使用例子
2. **规划** — 分析哪些操作会反复执行，封装为 scripts/references/assets
3. **初始化** — 用 `init_skill.py` 创建目录结构和模板。命名规范：**小写 + 连字符（hyphen-case），≤ 64 字符，动词开头**
4. **编辑** — 先实现可复用资源，再写 SKILL.md 正文
5. **校验** — 用 `quick_validate.py` 检查 frontmatter 格式和命名规范
6. **迭代** — 在真实任务中使用，根据反馈持续改进

好的 skill 不是一次写成的。skill-creator 创建的 laotou-thought-style 技能，第一次生成后续了 `short_description` 和 `default_prompt`——从泛泛的描述迭代为更精确的操作指令。

---

## 总结

- **Agent Skills 是领域知识的标准化封装**，MCP 是工具连接的标准化协议。两者分层配合，构建完整的智能体能力栈
- **渐进式披露机制**将初始 token 消耗降低 90% 以上，让技能可以携带远超上下文限制的知识
- **写 Skill 不是写文档**——读者是 AI 不是人。每一句话都要值得它占用的 token
- **用"不做什么"替代"做什么"**，用脚本锁死脆弱操作，给创造性任务留出自由度。把触发条件放在 description 里，不要放在正文里
