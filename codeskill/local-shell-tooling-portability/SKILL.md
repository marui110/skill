---
name: local-shell-tooling-portability
description: >-
  Write shell scripts and CLI wrappers that survive a user's Mac terminal:
  bash 3.2 restrictions, zsh word-splitting differences, proxy-breaking Node
  CLIs, and re-runnable config-restore scripts. Use when a script works in
  Linux/CI but fails silently on macOS, when wrapping a third-party CLI into a
  helper command, or when a dry-run flag must be trusted to stay dry.
---

# 本机脚本与 CLI 可移植性

**macOS 自带 bash 停在 3.2，`#!/usr/bin/env bash` 直接中招。错误表现隐蔽
（`set -u` 下运行时才炸），必须按清单预防而非事后调试。**

## 何时使用

- 写会在**用户 Mac 终端直接运行**的脚本（部署 / 清理 / 同步 / 配置恢复工具）。
- 脚本「在 Linux/CI 测得好好的，一到 Mac 就静默出错」。
- 包装第三方 CLI（Vercel / gh / aws / npm 等）为便捷命令或函数。
- 本机处于代理网络下调用 Node 系 CLI。

## 1. bash 3.2 三坑（写之前先规避）

| 坑 | 症状 | 替代写法 |
|----|------|----------|
| `declare -A` 关联数组 | `declare: -A: invalid option`；**不退出**，继续执行但数组行为错乱 | 去重用临时文件 + `grep -qxF`；或嵌套循环 O(n²)（n 小可用） |
| `set -u` + 空数组 `[@]` | `"${arr[@]}"` 对空数组报 `unbound variable` 直接退出（3.2 特有，4.x 不报） | `"${arr[@]+"${arr[@]}"}"` 惯用法 |
| `if $VAR` 把数字当命令 | `$VAR` 为 `1` 时执行命令 `1` → command not found → `if` 判非零 → 条件**恒假** | 一律 `if [ "$VAR" -eq 1 ]` / `[ "$VAR" -eq 0 ]` |

**第三坑代价最高**：布尔开关恒假会让 dry-run 分支实跑真实分支
（真实踩坑：dry-run 实跑了整轮清理）。所有开关判断必须显式 `[ … -eq … ]`。

同样不可用的 bash 4+ 特性：`mapfile` / `readarray`、`**` globstar、`${var^^}`。

## 2. zsh 包装陷阱

- zsh **不对 `$VAR` 分词**：`V="cli sub"; $V ls` 会把整串当命令名。
  CLI 包装必须用函数：`v() { vercel "$@"; }`。
- 用户默认 shell 多为 zsh，脚本 shebang 常是 bash——**两者语法差异分别对待**，
  别把 zsh 习惯写进 bash 脚本。

## 3. 代理网络下的 Node 系 CLI

1. 症状：CLI 报 `fetch failed`（undici/裸 fetch 不走系统代理），而 `curl` 正常。
2. **先最小复现区分层级**：`node -e "fetch('<url>').then(r=>console.log(r.status))"`
   —— 裸 fetch 通而 CLI 不通 = CLI 问题；都不通 = 网络问题。
3. **稳定解**：剥代理运行
   `env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy <cli> …`。
4. **交互提示无法 stdin 管道绕过**时（如分支选择），改走该服务 **REST API**
   （token 从环境变量或 CLI 凭据取，**不写进脚本**）。

## 4. 配置恢复类脚本的形态

修改会被应用/服务器刷新覆盖的本地配置时，脚本分三部分且**可重跑**：

1. 配置文件层（如 `settings.json`）恢复；
2. 本地状态库层（如 `state.vscdb` reactive/secret storage）恢复；
3. 渲染层 JS patch（应用更新会覆盖 → 需重跑）。

配套：**先退出目标应用再运行**；原文件备份 `.orig`；
状态库 JSON 值可能含控制字符，需 strip 后再 parse。

## 交付清单

- [ ] 无 `declare -A` / `mapfile` / `**` 等 bash 4+ 特性
- [ ] 数组展开用 `"${arr[@]+"${arr[@]}"}"` 或先判空
- [ ] 布尔开关用 `[ "$VAR" -eq 1 ]`，无裸 `if $VAR`
- [ ] CLI 包装用函数而非字符串变量
- [ ] 代理环境已用最小 `node -e fetch` 区分网络层 vs CLI 层
- [ ] 在**干净 macOS 终端**实跑过一次（含 dry-run 分支真实走 dry-run）
- [ ] 脚本可重跑（幂等），破坏性操作前有备份

## 反模式

- 只在 Linux/CI 验证就交付给用户 Mac。
- 用 `#!/usr/bin/env bash` 却写 bash 4 语法。
- 靠「命令没报错」判断成功——`declare -A` 失败后脚本会继续跑。
- dry-run 开关用裸 `if $VAR` 判断。
- 把 token / 密钥硬编码进脚本或提交 git。

## 相关

- 知识库 playbook：`agent_KB/playbooks/local-shell-tooling-portability.md`
- 配合：`verification-before-completion`（干净环境实跑门禁）、
  `ci-cd-and-automation`（CI 与本机差异）、`ponytail`（优先平台原生能力）、
  `runtime-config-source-of-truth`（CLI/REST 操作 env 的上层流程）
