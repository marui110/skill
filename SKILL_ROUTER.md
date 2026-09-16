# Skill Router — 场景 → Skill

命中意图时**自动**读 `~/.claude/skills/<name>/SKILL.md`（各端 symlink 同名）。  
全量目录见 [SKILLS_INDEX.md](./SKILLS_INDEX.md)。Meta：`using-agent-skills`。

> **「全面」≠ 每轮读完全部 skill。**  
> 全面 = 每个已安装 skill 在本表有**可触达触发条件**；合理 = 分层限流；自动 = 命中即 Read，不必等用户点名。

## 自动调用协议（强制）

Agent **不得**凭记忆空跑流程；按下面顺序选 skill，并 **Read 对应 `SKILL.md` 后再动手**。

### 每轮启动（≤30 秒决策）

1. 扫本地 `AGENTS.md` / `.cursor/rules/` / 本表。  
2. **意图不明** → 读 `using-agent-skills`。  
3. **意图明确** → 用下方表命中 **1 个主流程 skill**；审查/安全类可末尾叠加。  
4. UI/视觉 → **默认栈**：`ui-skills-root` → `baseline-ui` / `improve-ui`；需要细则再叠 **一个** `better-interface`（或单项 `better-*`）。勿自动叠 `impeccable` / `design-taste-frontend` / `redesign-existing-projects`。  
5. 生产报错 / 配置不生效 → 先 `prod-error-layered-triage` / `runtime-config-source-of-truth`，再深入调试 skill。  
6. 代码库结构 / 「哪里定义了 X」→ `graphify` 或只读探索后再动手。  
7. 营销 → 先 `product-marketing`；短名渠道 skill（`image`/`video`/`ads` 等）**仅用户点名**（L3）。

### 分层（避免滥调）

| 层 | 何时自动读 | 例子 |
|----|------------|------|
| **L0 必读门控** | 会话启动场景不明；或用户纠正流程 | `using-agent-skills` · `evolve-skills` |
| **L1 主流程** | 命中表内场景 → 本轮唯一主 skill | `spec-driven-development` · `systematic-debugging` · `test-driven-development` · `lean-build` · `product-marketing` |
| **L2 叠加** | 主流程 GREEN 后或明确子域 | `code-review-and-quality` · `baseline-ui` · `better-interface` · `copywriting` |
| **L3 按需** | 用户点名或主 skill 显式指向 | 营销短名 · `impeccable` · `ponytail*` · jakubkrehel 压测/变体 |

**禁止**：同一轮并行开启多个 L1；为「显得全面」扫读十几个 skill；调用已卸载或无 `SKILL.md` 的名字。

### 「全面」验收（覆盖，非堆叠）

| 检查 | 标准 |
|------|------|
| 目录完整 | 运行时 skill 均出现在 `SKILLS_INDEX.md` |
| 路由可达 | 每个 skill 至少有一条场景行 |
| 本轮调用 | 非琐碎任务工具轨迹里有对 **1 个 L1** `SKILL.md` 的 Read |
| 不滥读 | 同轮 L1 ≤ 1；总 Read skill ≤ 3（含 UI 门控） |

### 意图信号速查

| 用户说法 / 信号 | 先读 |
|-----------------|------|
| 「按 skill / 用流程」且场景不清 | `using-agent-skills` |
| 质量条 / Definition of Done 未写清 | `constraint-driven-development` |
| 过度工程风险高的新功能 | `lean-build` / `ponytail` |
| 小 bug / 窄修复 | `surgical-patch` |
| 原因不明的失败 / 间歇性 | `investigate-first` → 再 `systematic-debugging` |
| 只验证、不扩 scope | `verification-before-completion` |
| 行为保持的重构 | `safe-refactor` |
| schema/API/依赖迁移 | `migration` / `deprecation-and-migration` |
| merge/rebase 冲突中 | `resolving-merge-conflicts` |
| 查官方/一手资料写进仓 | `research` |
| 代码库地图 / 架构关系 | `graphify` |
| UI（默认） | `ui-skills-root` → `baseline-ui` / `improve-ui` |
| 界面全面 polish（细则） | `better-interface`（L2，叠在 UI 默认栈后） |
| UI 美学批判 | `design-review`（L2） |
| 大改版 / 品味重建（用户点名） | `redesign-existing-projects` / `impeccable` / `design-taste-frontend`（L3） |
| 大输出 / 日志 / 测试结果要进沙箱 | `context-mode`（需 MCP） |
| 会话上下文裁剪 | `context-engineering` |
| context-mode 诊断/索引/搜索/统计 | `ctx-doctor` / `ctx-index` / `ctx-search` / `ctx-stats`（L3） |
| 营销立项 / ICP | `product-marketing` |
| 营销点子 / 计划 | `marketing-ideas` / `marketing-plan` |
| SEO / CRO / 营销文案 | `seo-audit` / `cro` / `copywriting` |
| 写/改 skill | `writing-skills` → 经 `evolve-skills` 写回 |

## 同主题优先级

| 主题 | 优先 | 备选 / 说明 |
|------|------|-------------|
| Meta 入口 | `using-agent-skills` | — |
| TDD | `test-driven-development` | — |
| Bug 调查 | `systematic-debugging` | `investigate-first` → `debugging-and-error-recovery` · `diagnosing-bugs` |
| 合入前审查 | `code-review-and-quality` | `requesting-code-review` / `receiving-code-review` |
| **UI 默认栈** | `ui-skills-root` → `baseline-ui` / `improve-ui` | L2 细则：`better-interface`（或单项 `better-*`） |
| UI 批判 | `design-review` | `web-design-guidelines`；变更审查：`interface-review`（L3） |
| UI 大改版 | L3 点名 | `impeccable` · `design-taste-frontend` · `redesign-existing-projects` · `frontend-design` |
| 生产脱敏报错 | `prod-error-layered-triage` | 定层后再调试 skill |
| 配置不生效 | `runtime-config-source-of-truth` | 再叠 `vercel-post-deploy-verify` |
| 写 skill | `writing-skills` | 经 `evolve-skills` 写回权威源 |
| 上下文窗口 / 大工具输出 | `context-mode` | 提示词裁剪用 `context-engineering`；`ctx-*` 为 L3 |
| **营销入口** | `product-marketing` | 再叠 `marketing-ideas` / `marketing-plan` / `copywriting` / `cro` / `seo-audit` |
| 产品发布营销 | `launch`（L3 点名或明确 GTM） | 工程上线用 `shipping-and-launch` |
| 营销文案 | `copywriting` | UI 产品文案用 `better-writing` |
| 极简实现 | `lean-build` / `ponytail` | 窄修用 `surgical-patch` |
| 仅验收 | `verification-before-completion` | — |

## 会话与元流程

| 场景 | Skill |
|------|--------|
| 会话启动 / 选 skill | `using-agent-skills` |
| 纠正 / 踩坑写回 | `evolve-skills` |
| 创建 / 编辑 skill | `writing-skills` |
| 需求不清 | `interview-me` |
| 概念发散 | `idea-refine` / `brainstorming` |
| Spec | `spec-driven-development` |
| 质量契约 | `constraint-driven-development` |
| 计划 | `writing-plans` / `executing-plans` / `planning-and-task-breakdown` |
| 子代理 | `subagent-driven-development` / `dispatching-parallel-agents` |
| 薄切片实现 | `incremental-implementation` |
| 高过度工程风险构建 | `lean-build` |
| 上下文（提示词 / 会话加载） | `context-engineering` |
| 大输出沙箱（mksglu） | `context-mode` |
| context-mode 工具（L3） | `ctx-doctor` / `ctx-index` / `ctx-search` / `ctx-stats` |
| 对照文档实现 | `source-driven-development` |
| 对抗审查决策 | `doubt-driven-development` |
| 验证完成 | `verification-before-completion` |
| Worktree | `using-git-worktrees` |
| 收尾分支 | `finishing-a-development-branch` |
| 收/发 CR | `requesting-code-review` / `receiving-code-review` |
| 一手资料调研落盘 | `research` |

## 调试 / 质量 / 交付

| 场景 | Skill |
|------|--------|
| 原因不明先诊断 | `investigate-first` |
| Bug 调查 | `systematic-debugging` / `debugging-and-error-recovery` / `diagnosing-bugs` |
| 窄修 / 小行为变更 | `surgical-patch` |
| 行为保持重构 | `safe-refactor` |
| 生产报错定层 | `prod-error-layered-triage` |
| 配置 / 多环境 | `runtime-config-source-of-truth` |
| 加密凭据跨库迁移 | `encrypted-credential-cross-env-migration` |
| Mac 脚本可移植 | `local-shell-tooling-portability` |
| TDD | `test-driven-development` |
| 五轴审查 | `code-review-and-quality` |
| 简化 | `code-simplification` / `ponytail` / `ponytail-review` / `ponytail-audit` |
| 安全 | `security-and-hardening` |
| 性能 | `performance-optimization` |
| Git / CI / 上线 | `git-workflow-and-versioning` / `ci-cd-and-automation` / `shipping-and-launch` |
| merge 冲突 | `resolving-merge-conflicts` |
| 弃用迁移 | `deprecation-and-migration` / `migration` |
| ADR / 文档 | `documentation-and-adrs` |
| 可观测性 | `observability-and-instrumentation` |
| 架构 / 领域 | `codebase-design` / `domain-modeling` / `improve-codebase-architecture` / `graphify` |
| API | `api-and-interface-design` |
| Vercel 部署 | `deploy-to-vercel` / `vercel-post-deploy-verify` / `vercel-cli-with-tokens` |
| Vercel 成本/性能 | `vercel-optimize` |
| React/Next 性能惯例 | `vercel-react-best-practices` |
| 组件 composition | `vercel-composition-patterns` |

## UI / 设计 / 动效

**默认自动栈（推荐）**：`ui-skills-root` → `baseline-ui` 或 `improve-ui` → 可选 L2 `better-interface`。

| 场景 | Skill | 层 |
|------|--------|----|
| UI 入口（必做） | `ui-skills-root` | L0/L1 |
| 去 AI 味 / 间距 | `baseline-ui` | L2 |
| 审计界面 | `improve-ui` | L2 |
| 跨学科 polish | `better-interface` | L2 |
| UI 细节 / 排版 / 色 / 布局 / a11y / 产品文案 | `better-ui` / `better-typography` / `better-colors` / `better-layout` / `better-accessibility` / `better-writing` | L2（单项） |
| DESIGN.md / a11y·meta·motion 修复 | `create-design-md` / `fixing-accessibility` / `fixing-metadata` / `fixing-motion-performance` | L2 |
| 设计批判 / Web 指南 | `design-review` / `web-design-guidelines` | L2 |
| Framer Motion | `framer-motion-patterns` | L2 |
| 生产级 UI 工程 | `frontend-ui-engineering` | L2（明确工程化时） |
| 大改版 / 品味重建 | `redesign-existing-projects` / `impeccable` / `design-taste-frontend` / `frontend-design` | **L3 点名** |
| 变更审查 / 压测 / 变体 / 逆向解释 | `interface-review` / `break` / `variant` / `explain-interface` | **L3 点名** |
| 强制完整输出 | `full-output-enforcement` | L3 |

## Marketing（coreyhaines31/marketingskills）

新营销项目先 `product-marketing`。工程发布用 `shipping-and-launch`；UI 产品文案用 `better-writing`。

### L1 / L2（可自动）

| 场景 | Skill |
|------|--------|
| 入口 / ICP / 定位 | `product-marketing` |
| 点子 / 灵感 | `marketing-ideas` |
| 完整计划 / AARRR | `marketing-plan` |
| 循环自动化 | `marketing-loops` |
| 心理 / 行为科学 | `marketing-psychology` |
| 文案 / 润色 | `copywriting` / `copy-editing` |
| CRO / 引导 | `cro` / `onboarding` |
| SEO / AI 搜索 / 站内架构 / 程序化页 | `seo-audit` / `ai-seo` / `site-architecture` / `programmatic-seo` |
| 内容战略 | `content-strategy` |
| 素材 / 归因 / A/B | `ad-creative` / `attribution` / `ab-testing` |
| 获客 / 冷邮件 / 线索磁铁 / 免费工具 | `prospecting` / `cold-email` / `lead-magnets` / `free-tools` |
| 竞品 / 客户研究 | `competitors` / `competitor-profiling` / `customer-research` |
| PR / 社区 / 影响者 / 联名 | `public-relations` / `community-marketing` / `influencer-marketing` / `co-marketing` |
| 推荐 / 留存 / RevOps / 销售赋能 | `referrals` / `churn-prevention` / `revops` / `sales-enablement` |
| App 商店 | `aso` |
| Offer / 付费墙 | `offers` / `paywalls` |

### L3（仅用户点名 — 短名易误触）

`ads` · `analytics` · `emails` · `events` · `image` · `launch` · `pricing` · `schema` · `signup` · `sms` · `social` · `video` · `popups`

### 覆盖自检（已装营销 skill）

`ab-testing` · `ad-creative` · `ads` · `ai-seo` · `analytics` · `aso` · `attribution` · `churn-prevention` · `co-marketing` · `cold-email` · `community-marketing` · `competitor-profiling` · `competitors` · `content-strategy` · `copy-editing` · `copywriting` · `cro` · `customer-research` · `emails` · `events` · `free-tools` · `image` · `influencer-marketing` · `launch` · `lead-magnets` · `marketing-ideas` · `marketing-loops` · `marketing-plan` · `marketing-psychology` · `offers` · `onboarding` · `paywalls` · `popups` · `pricing` · `product-marketing` · `programmatic-seo` · `prospecting` · `public-relations` · `referrals` · `revops` · `sales-enablement` · `schema` · `seo-audit` · `signup` · `site-architecture` · `sms` · `social` · `video`

## 其它

| 场景 | Skill |
|------|--------|
| Supabase | `supabase` / `supabase-postgres-best-practices` |
| 浏览器测试 | `playwright-skill` / `browser-testing-with-devtools` |
| SaaS 脚手架 | `nextjs-saas-feature-scaffold` / `shadcn-app-components` / `preview-first-sync` / `saas-tenant-membership` |

## 已卸载（禁止调用）

`context-mode-ops` · `ctx-insight` · `ctx-purge` · `ctx-upgrade` · `find-skills` · `remotion-best-practices` · `remotion-create` · `remotion-docs` · `remotion-interactivity` · `remotion-maps` · `remotion-markup` · `remotion-multimedia` · `remotion-render` · `remotion-saas` · `remotion-studio` · `ask-matt` · `cavecrew` · `caveman` · `caveman-compress` · `caveman-help` · `directory-submissions` · `grilling` · `handoff` · `implement` · `marketing-council` · `teach` · `to-spec` · `to-tickets` · `triage` · `wayfinder`

## 选用原则

1. 先匹配本表「自动调用协议」或 `using-agent-skills`。  
2. 同一轮最多**一个 L1 主流程** skill；L2 审查类可末尾叠加。  
3. Process skill（brainstorming / systematic-debugging / investigate-first）先于实现类。  
4. UI 默认栈优先；营销短名与大改版视觉 skill 默认 L3。  
5. 禁止手改 `~/.cursor/skills-cursor/`。  
6. 改 skill 后跑 `~/Documents/code/rule/sync-global-agent-standards.sh`；日常更新用 `daily-sync.sh`。  
7. **已卸载** skill 禁止调用；勿因 lock 残留条目重装，除非用户明确要求。

## 维护

```bash
python3 ~/Documents/code/skill/scripts/check-skill-coverage.py
~/Documents/code/rule/sync-global-agent-standards.sh
```
