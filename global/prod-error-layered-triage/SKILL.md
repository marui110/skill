---
name: prod-error-layered-triage
description: >-
  Triage production errors by layer before touching code: client stale JS,
  runtime env, data/dialect, build/minifier. Use when production shows a
  sanitized shell error (Minified React error #441, site-wide 500, Server
  Action TypeError) that dev cannot reproduce, or when errors appear right
  after a deploy and you must decide rollback vs cache vs real fault.
---

# 生产报错分层分流

**先定层，再动手。** 生产脱敏壳错误（React #441、全站 500、Server Action `TypeError`）
在四层中各有独立根因；看到 #441 就改组件、部署后一报错就回滚，都是反模式。

## 何时使用

- 生产报「Minified React error #441」/ 整页失败 / Server Action 抛 `TypeError`，
  源码看起来正确、dev 不复现。
- 部署刚完成就收到用户报错，需判断新代码故障 vs 旧缓存残留。
- 任何「先改代码还是先查环境」的岔路口。

## 四层模型（排查成本从低到高）

| 层 | 根因形态 | 判定证据 | 处置 |
|----|----------|----------|------|
| **L1 客户端缓存** | 浏览器持旧 JS，server action / RSC reference ID 失配 | 日志 `The Server Reference ID did not match the expected format`；报错时间紧贴部署完成时间；error log 停止增长 | 强制刷新；**勿回滚勿改代码** |
| **L2 运行时 env** | 方言/驱动开关与连接串 scheme 不一致；env 值已改名或不在枚举内 | 日志「`X=A` but `Y` looks like B」；instrumentation/冷启动抛错；面板「没有该变量」实为代码默认值 | 显式补 env → Redeploy（`vercel-post-deploy-verify`） |
| **L3 数据层** | 裸写单方言 SQL；schema 漂移（迁移只覆盖一个后端） | `42703 undefined_column`、`function does not exist`、`type "signed" does not exist` | 方言封装 + 幂等双迁移（`dual-db-dialect-consistency` 类流程） |
| **L4 构建层** | minifier 错误消除源码守卫语句 | 读服务器构建产物（`.next/server/chunks/**`）与源码逐段对比，发现语句被删 | 守卫进函数体 / 先赋局部变量 |

## 步骤

1. **时间线分流（最先做，30 秒）**
   - 对比部署完成时间 vs 报错时间。
   - 报错在部署后数秒~数分钟且不再增长 → 查 L1 证据。
   - 数分钟后仍稳定复现 → 排除 L1，进 L2。

2. **拿真实错误，别读脱敏壳**
   - #441 = Server Component **render 期抛错**，不是 hydration；生产构建隐藏真错。
   - dev 复现，或**绕过页面层直调页面依赖的查询/服务函数**（`tsx` 直跑）。
   - 依赖链含 `server-only` 时临时 shim（`node_modules/server-only/` 放
     `module.exports = {}`），跑完删除。

3. **按层取证**
   - L2：Runtime Logs 里 instrumentation / middleware 的**同一条重复 Error**。
   - L3：真错含 SQL 语法 / 列不存在。
   - L4：真错是对 null 取属性的 `TypeError` 且源码无嫌疑 → **读构建产物**，别只看源码猜。

4. **「已修好但用户仍报错」辅助证据链**
   - 产物 chunk 中新逻辑已生效（比看源码快）；
   - error log 行数停止增长 = 修复前残留；
   - 日志尾部时间戳早于部署时间 = 旧残留；
   - 报错页 JS 的 CSP 拦截指向 env 里早已不存在的配置 = 旧缓存产物。

## 反模式

- 看到 #441 就怀疑 hydration / 加 `"use client"`。
- 部署后一收到报错就回滚（多为 L1，回滚反而延长故障）。
- 只读源码判断构建层问题，不读产物 chunk。
- 四层混在一次改动里「一起修」，无法归因。

## 相关

- 知识库 playbook：`agent_KB/playbooks/prod-error-layered-triage.md`
- 配合：`systematic-debugging` / `debugging-and-error-recovery`（定层后深入）、
  `vercel-post-deploy-verify`（L2 托管侧）、`verification-before-completion`（修复后验收）
