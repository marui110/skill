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
4. UI/视觉 → **先** `ui-skills-root`（或 `npx ui-skills start`），再叠 ≤2 个实现 skill。  
5. 生产报错 / 配置不生效 → 先 `prod-error-layered-triage` / `runtime-config-source-of-truth`，再深入调试 skill。  
6. 代码库结构 / 「哪里定义了 X」→ `graphify` 或只读探索后再动手。

### 分层（避免滥调）

| 层 | 何时自动读 | 例子 |
|----|------------|------|
| **L0 必读门控** | 会话启动场景不明；或用户纠正流程 | `using-agent-skills` · `evolve-skills` |
| **L1 主流程** | 命中表内场景 → 本轮唯一主 skill | `spec-driven-development` · `systematic-debugging` · `test-driven-development` · `lean-build` |
| **L2 叠加** | 主流程 GREEN 后或明确子域 | `code-review-and-quality` · `security-and-hardening` · `baseline-ui` · `design-review` |
| **L3 按需** | 用户点名或主 skill 显式指向 | `ponytail*` · Matt/grill · `caveman*` · 单次工具 skill |

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
| UI 美学批判（URL/截图/组件） | `design-review` |
| Web Interface Guidelines | `web-design-guidelines` |
| 写/改 skill | `writing-skills` → 经 `evolve-skills` 写回 |

## 同主题优先级

| 主题 | 优先 | 备选 / 说明 |
|------|------|-------------|
| Meta 入口 | `using-agent-skills` | — |
| TDD | `test-driven-development` | — |
| Bug 调查 | `systematic-debugging` | `investigate-first` → `debugging-and-error-recovery` · `diagnosing-bugs` |
| 合入前审查 | `code-review-and-quality` | `requesting-code-review` / `receiving-code-review` |
| 前端品味 | `design-taste-frontend` | 再叠 ui-skills / `impeccable` |
| UI 入口 | `ui-skills-root` / `npx ui-skills start` | `baseline-ui` / `improve-ui` / `impeccable` |
| UI 批判 | `design-review` | `improve-ui` · `web-design-guidelines` |
| 生产脱敏报错 | `prod-error-layered-triage` | 定层后再调试 skill |
| 配置不生效 | `runtime-config-source-of-truth` | 再叠 `vercel-post-deploy-verify` |
| Grill | `grilling` | — |
| 写 skill | `writing-skills` | 经 `evolve-skills` 写回权威源 |
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
| 上下文 | `context-engineering` |
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

| 场景 | Skill |
|------|--------|
| UI 入口（必做） | `ui-skills-root` |
| 去 AI 味 / 间距 | `baseline-ui` |
| 审计界面 | `improve-ui` |
| DESIGN.md | `create-design-md` |
| a11y / meta / motion | `fixing-accessibility` / `fixing-metadata` / `fixing-motion-performance` |
| 新建品味 UI | `design-taste-frontend` |
| 全面 polish | `impeccable` / `frontend-design` / `frontend-ui-engineering` |
| 改版 | `redesign-existing-projects` |
| 设计批判 | `design-review` |
| Web 指南合规 | `web-design-guidelines` |
| 强制完整输出 | `full-output-enforcement` |
| Framer Motion | `framer-motion-patterns` |
| 动效性能 | `fixing-motion-performance` |

## Caveman / Matt / 其它

| 场景 | Skill |
|------|--------|
| Caveman 口语 / 压缩 | `caveman` / `caveman-help` / `caveman-compress` |
| CaveCrew 委派 | `cavecrew` |
| Grill / Matt | `grilling` / `implement` / `handoff` / `ask-matt` / `teach` / `to-spec` / `to-tickets` / `triage` / `wayfinder` |
| Supabase | `supabase` / `supabase-postgres-best-practices` |
| 浏览器测试 | `playwright-skill` / `browser-testing-with-devtools` |
| SaaS 脚手架 | `nextjs-saas-feature-scaffold` / `shadcn-app-components` / `preview-first-sync` / `saas-tenant-membership` |

## 选用原则

1. 先匹配本表「自动调用协议」或 `using-agent-skills`。  
2. 同一轮最多**一个 L1 主流程** skill；L2 审查类可末尾叠加。  
3. Process skill（brainstorming / systematic-debugging / investigate-first）先于实现类。  
4. 禁止手改 `~/.cursor/skills-cursor/`。  
5. 改 skill 后跑 `~/Documents/code/rule/sync-global-agent-standards.sh`；日常更新用 `daily-sync.sh`。  
6. **已卸载** skill 禁止调用；勿因 lock 残留条目重装，除非用户明确要求。

## 维护

```bash
python3 ~/Documents/code/skill/scripts/check-skill-coverage.py
~/Documents/code/rule/sync-global-agent-standards.sh
```
