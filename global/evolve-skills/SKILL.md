---
name: evolve-skills
description: >-
  Evolve global Agent Skills from corrections, repeated failures, or reusable
  workflows. Use when the user corrects the agent, asks to improve/update a
  skill, capture a lesson into skills, or create a new global skill.
---

# Evolve Skills

把可复用教训写回全局 Skills，并同步到各 Agent。

## 权威源与同步

| 类型 | 路径 |
|------|------|
| **codeskill（含本 skill）** | `~/Documents/code/skill/codeskill/<name>/` |
| **ui-skills** | `~/Documents/code/skill/ui-skills/skills/<name>/` |
| **其余全局 skill** | `~/.claude/skills/<name>/` |
| **运行时** | `~/.claude/skills/` → 各 Agent symlink |
| **Git 全量镜像** | `~/Documents/code/skill/global/`（勿作主编辑源） |
| **场景路由** | `~/Documents/code/skill/SKILL_ROUTER.md` |
| **同步脚本** | `~/Documents/code/rule/sync-global-agent-standards.sh` |
| **Slash 命令** | `~/Documents/code/rule/commands/` |
| **入口模板** | `~/Documents/code/rule/agents/` |


**禁止**写入 `~/.cursor/skills-cursor/`（Cursor 内置）。

## 何时进化

触发任一即可：

1. 用户明确纠正流程 / 偏好 / 约束
2. 同一类失败重复出现（≥2 次）
3. 用户说「写进 skill」「沉淀」「进化」「更新全局 skill」
4. 发现跨项目可复用、且现有 skill 未覆盖

**不要进化**：一次性项目细节、密钥、临时 workaround、与现有 skill 重复的内容。

## 流程

1. **定位**：匹配现有 skill；没有则新建（`name` 小写连字符，≤64 字符）。
2. **起草**：
   - 属于 `codeskill/`（如 `evolve-skills`、`preview-first-sync`）→ 改 `~/Documents/code/skill/codeskill/<name>/`
   - 属于 ui-skills → 改 `~/Documents/code/skill/ui-skills/skills/<name>/`
   - 其余 → 改 `~/.claude/skills/<name>/`
   - 优先改 `description`、步骤、反模式；保持 `SKILL.md` < 500 行
3. **路由**：若新增/改变触发场景，更新 `~/Documents/code/skill/SKILL_ROUTER.md`（及必要时 `global-agent-workflow.mdc`）。
4. **记录**：说明触发场景、改了哪个文件、为何改。
5. **同步**（**必须**跑脚本，会部署 codeskill/ui-skills、链接各端、镜像 `global/`、部署 CLAUDE/AGENTS）：

```bash
~/Documents/code/rule/sync-global-agent-standards.sh
```

若同时改了 slash 命令：

```bash
~/Documents/code/rule/sync-global-commands.sh
```

6. **确认**：1–3 条 bullet 向用户确认。

## 新建 skill 最小结构

**codeskill（推荐跨项目工程类）：**

```text
~/Documents/code/skill/codeskill/<name>/SKILL.md
```

**仅全局运行时：**

```text
~/.claude/skills/<name>/SKILL.md
```

## 与 writing-skills 的关系

- 复杂 / 高风险 skill：先跟 `writing-skills`。
- 小补丁：本 skill 直接改即可。

## 检查清单

- [ ] codeskill 改在 `~/Documents/code/skill/codeskill/`；ui-skills 改在 `ui-skills/skills/`；其余改在 `~/.claude/skills/`
- [ ] `description` 含触发条件
- [ ] 场景变化已更新 `SKILL_ROUTER.md`（如需要）
- [ ] 无密钥 / 无项目私有路径硬编码
- [ ] 已跑 `sync-global-agent-standards.sh`
- [ ] 已向用户说明变更摘要
