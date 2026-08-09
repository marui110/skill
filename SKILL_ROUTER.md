# Skill Router — 场景 → Skill

命中意图时**自动**读 `~/.claude/skills/<name>/SKILL.md`（各端 symlink 同名）。  
全量目录见 [SKILLS_INDEX.md](./SKILLS_INDEX.md)。Meta：`using-agent-skills`。

## 同主题优先级

| 主题 | 优先 | 备选 / 说明 |
|------|------|-------------|
| TDD | `test-driven-development` | `tdd`（短版） |
| 合入前审查 | `code-review-and-quality` | `code-review-skill`（多语言细则）；`code-review`（since-point 双轴） |
| 前端品味 | `design-taste-frontend` | `design-taste-frontend-v1`（仅兼容旧项目） |
| UI 入口 | `ui-skills-root` / `npx ui-skills start` | 再叠 `baseline-ui` / `improve-ui` / `impeccable` 等 |
| Grill | `grilling` | `grill-me` / `grill-with-docs` |
| 写 skill | `writing-skills` | `writing-great-skills`（原则参考，常禁用自动调用） |

## 会话与元流程

| 场景 | Skill |
|------|--------|
| 会话启动 / 选 skill | `using-agent-skills` |
| 纠正 / 踩坑写回 | `evolve-skills` |
| 创建 / 编辑 skill | `writing-skills` |
| 需求不清 | `interview-me` |
| 概念发散 | `idea-refine` / `brainstorming` |
| Spec | `spec-driven-development` |
| 计划 | `writing-plans` / `executing-plans` / `planning-and-task-breakdown` |
| 子代理 | `subagent-driven-development` / `dispatching-parallel-agents` |
| 薄切片实现 | `incremental-implementation` |
| 上下文 | `context-engineering` |
| 对照文档实现 | `source-driven-development` |
| 对抗审查决策 | `doubt-driven-development` |
| 验证完成 | `verification-before-completion` |
| Worktree | `using-git-worktrees` |
| 收尾分支 | `finishing-a-development-branch` |
| 收/发 CR | `requesting-code-review` / `receiving-code-review` |

## 调试 / 质量 / 交付

| 场景 | Skill |
|------|--------|
| Bug 调查 | `systematic-debugging` / `debugging-and-error-recovery` / `diagnosing-bugs` |
| TDD | `test-driven-development` |
| 五轴审查 | `code-review-and-quality` |
| 简化 | `code-simplification` / `ponytail*` |
| 安全 | `security-and-hardening` |
| 性能 | `performance-optimization` |
| Git / CI / 上线 | `git-workflow-and-versioning` / `ci-cd-and-automation` / `shipping-and-launch` |
| 弃用迁移 | `deprecation-and-migration` |
| ADR / 文档 | `documentation-and-adrs` |
| 可观测性 | `observability-and-instrumentation` |
| 架构 / 领域 | `codebase-design` / `domain-modeling` / `improve-codebase-architecture` |
| API | `api-and-interface-design` |
| Vercel 部署 | `deploy-to-vercel` / `vercel-*` |

## UI / 设计 / 动效

| 场景 | Skill |
|------|--------|
| UI 任务入口（必做） | `ui-skills-root` |
| 去 AI 味 / 间距 | `baseline-ui` |
| 审计界面 | `improve-ui` |
| DESIGN.md | `create-design-md` |
| a11y / meta / motion 修 | `fixing-accessibility` / `fixing-metadata` / `fixing-motion-performance` |
| 新建品味向 UI | `design-taste-frontend` |
| 全面 polish | `impeccable` / `frontend-design` / `frontend-ui-engineering` |
| 改版 | `redesign-existing-projects` |
| 风格向 | `minimalist-ui` / `industrial-brutalist-ui` / `high-end-visual-design` / `gpt-taste` / `brandkit` |
| 图生码 / 生图前端 | `image-to-code` / `imagegen-frontend-web` / `imagegen-frontend-mobile` |
| Framer Motion（SaaS） | `framer-motion-patterns` |
| 找动画机会 | `find-animation-opportunities` / `animate` / `improve-animations` |
| GSAP | `gsap-core` → `gsap-scrolltrigger` / `gsap-react` / `gsap-timeline` / … |
| Apple HIG | `apple-design` |
| 选 UI 库 | `pick-ui-library` |
| 原型 | `prototype` |

## Remotion

| 场景 | Skill |
|------|--------|
| 总则 | `remotion-best-practices` |
| 新建 | `remotion-create` |
| 文档 / Studio / 渲染 | `remotion-docs` / `remotion-studio` / `remotion-render` |
| 字幕 / 多媒体 / 地图 | `remotion-captions` / `remotion-multimedia` / `remotion-maps` |
| 交互 / SaaS / 升级 | `remotion-interactivity` / `remotion-saas` / `remotion-upgrade` |
| Markup | `remotion-markup` |

## Caveman / Matt / 其它

| 场景 | Skill |
|------|--------|
| Caveman 口语模式 | `caveman` / `caveman-help` |
| Caveman commit/review/stats | `caveman-commit` / `caveman-review` / `caveman-stats` / `caveman-compress` |
| 子代理 crew | `cavecrew` |
| Grill 方案 | `grilling` / `grill-me` / `grill-with-docs` |
| Matt implement/handoff | `implement` / `handoff` / `ask-matt` / `teach` / `to-spec` / `to-tickets` / `triage` / `wayfinder` |
| Apple Notes | `apple-notes` |
| PPT | `pptx` |
| Supabase | `supabase` / `supabase-postgres-best-practices` |
| 浏览器测试 | `playwright-skill` / `webapp-testing` / `browser-testing-with-devtools` |
| SaaS 脚手架 | `nextjs-saas-feature-scaffold` / `shadcn-app-components` / `preview-first-sync` / `saas-tenant-membership` |

## 选用原则

1. 先匹配本表或 `using-agent-skills`。  
2. 同一轮最多**一个主流程** skill；审查类可末尾叠加。  
3. Process skill（brainstorming / systematic-debugging）先于实现类。  
4. 禁止手改 `~/.cursor/skills-cursor/`。  
5. 改 skill 后跑 `~/Documents/code/rule/sync-global-agent-standards.sh`。
