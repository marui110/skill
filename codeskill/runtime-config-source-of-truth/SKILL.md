---
name: runtime-config-source-of-truth
description: >-
  Resolve runtime configuration truth via online env pull -> DB rows -> code
  fallback chain, and align multi-environment differences with instance-level
  single-point overrides instead of flipping product switches. Use when config
  changes do not take effect, two environments behave differently, an env panel
  shows no variable but code reads a value, or batch-editing hosted platform env
  (proxy-breaking CLI, REST API fallback).
---

# 运行时配置真相来源

**本地 `.env` 模板不是真相；线上 pull 才是。差异用实例级单点覆盖，不用整体开关切换。**

## 何时使用

- 排查「配置改了不生效」「两环境行为不一致」「面板没有该变量但代码读到了值」。
- 同一代码部署多环境（自建 + 托管，各自独立 DB 与 env）需对齐差异项。
- 白标 / 多 flavor 实例改展示名、语言、主题色、模型启用集。
- 批量增改托管平台 env（尤其本机带代理时 CLI 失败）。

## 固定排查链路（顺序不可换）

| 步 | 查什么 | 要点 |
|----|--------|------|
| ① | **实际生效 env** | 以线上 `env pull` / 平台 API 为准；别信本地模板 |
| ② | **DB 配置行** | 托管环境常见「表 0 行」；有行则确认归属实例/租户 |
| ③ | **代码兜底链** | DB miss → 回落 env → env 无效则静默失败或抛错 |

**最隐蔽：无效 env 值**（代码已改名 / 不在枚举内）。典型 `enabled ∩ catalog = ∅`
——不报配置错，只在调用时炸。排查前先 grep 代码实际读取的变量名再核对 env。

## 差异对齐原则

- **禁止**为借某项能力整体切换产品开关（flavor / edition / profile）：会带出默认
  语言、品牌名、主题色、logo、功能名单等一串漂移。
- **应做**：能力面全开，用细粒度实例 env 只覆盖差异项
  （`PRODUCT_DISPLAY_NAME` / `PRODUCT_DEFAULT_LOCALE` / `PRODUCT_ACCENT_COLOR` 类）。
- 逗号分隔 id 列表覆盖：**空字符串 = 未覆盖**，回退默认。
- **匿名页例外**：登录/首页无租户上下文，不读 DB 品牌行，走 env 冷启动默认值——
  「DB 配好了品牌但匿名页显示默认」不是 bug。

## 托管平台 env 操作（以 Vercel 为例）

1. CLI 报 `fetch failed`（Node 裸 fetch 不走系统代理）→ 剥代理运行：
   `env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy <cli> …`；
   先用最小 `node -e "fetch(...)"` 区分网络层 vs CLI 层。
2. 交互提示无法 stdin 管道绕过 → 走 **REST API**：
   `POST /v10/projects/{projectId}/env?teamId={teamId}&upsert=true`，
   支持数组批量、`target: ["production","preview"]` 一次写双环境。
3. zsh 不对 `$VAR` 分词 → CLI 包装必须用函数 `v() { vercel "$@"; }`。
4. 变更前 `env pull` 备份快照；改完必须 **Redeploy**（仅保存不生效）。
5. 权限不足（MCP 403 / 列表为空）→ 重新授权或指导用户面板操作；**不要假装已改 env**。

## 交付清单

- [ ] 用线上 pull / API 核对实际生效 env（非本地模板）
- [ ] grep 代码实际读取的变量名，无「已改名仍在线上」的无效值
- [ ] 差异项用实例级覆盖，未整体切换产品开关
- [ ] DB 配置行归属正确（非 0 行 / 非错租户）
- [ ] 变更后已 Redeploy，健康检查或真实页面验证生效

## 反模式

- 拿 `.env.example` 当线上现状。
- 为改一项差异去切 flavor，引发连带漂移。
- 面板看不到变量就认定「没配、不会校验」——代码默认值同样生效。
- 保存 env 后不 Redeploy 就宣布修复。

## 相关

- 知识库 playbook：`agent_KB/playbooks/runtime-config-source-of-truth.md`
- 配合：`vercel-post-deploy-verify`、`vercel-cli-with-tokens`、`deploy-to-vercel`、
  `prod-error-layered-triage`（本 skill 解决其 L2 层）、`local-shell-tooling-portability`
