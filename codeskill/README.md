# codeskill

跨项目工程类 Agent Skills 的 **Git 权威源**。

| Skill | 用途 |
|-------|------|
| `evolve-skills` | 全局 skill 自进化 |
| `preview-first-sync` | 预览先展示、异步入库 |
| `shadcn-app-components` | 组件三层 + 模板 |
| `framer-motion-patterns` | lib/motion.ts 动效 |
| `nextjs-saas-feature-scaffold` | 新 feature 脚手架 |
| `saas-tenant-membership` | 租户成员关系 |

## 同步

由 `~/Documents/code/rule/sync-global-agent-standards.sh` 部署：

```
~/Documents/code/skill/codeskill/*       →  ~/.claude/skills/*  (rsync)
~/Documents/code/skill/ui-skills/skills/* →  ~/.claude/skills/*  (symlink)
~/.claude/skills/*                      →  各 Agent symlink
~/.claude/skills/*                      →  ~/Documents/code/skill/global/*  (全量镜像)
```

场景路由：`../SKILL_ROUTER.md` · 全量目录：`../SKILLS_INDEX.md`

## 编辑

- 改本目录下的 `SKILL.md`（及 `references/` 等）
- 运行 `~/Documents/code/rule/sync-global-agent-standards.sh`
- **不要**只在 `../global/` 里改（会被覆盖）

其余非 codeskill 的全局 skill 直接维护在 `~/.claude/skills/`。
