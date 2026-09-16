---
name: encrypted-credential-cross-env-migration
description: >-
  Migrate encrypted third-party credentials (model platform API keys, OAuth
  tokens, integration secrets) between independent databases of the same
  codebase. Use when comparing encryption key fingerprints to decide whether
  ciphertext can be copied as-is, or when running the fixed dry-run -> backup ->
  transaction -> verify migration routine for multi-tenant SaaS config tables.
---

# 加密凭据跨环境迁移

**先比密钥指纹，再决定是否重加密；任何写库都走 dry-run → backup → 事务 → verify。**

## 何时使用

- 同一代码部署多环境（各自独立 DB），需把加密存储的第三方凭据
  （模型平台 API Key、OAuth token、集成密钥）从 A 库搬到 B 库。
- 多租户 SaaS 新增/切换模型平台、集成商，需批量写入或迁移密钥行。
- 托管环境配置表为 0 行，需从自建环境补齐可用配置。

## 1. 判定密文能否直接搬运

| 条件 | 结论 |
|------|------|
| 两环境对称加密密钥（`INTEGRATION_ENCRYPTION_KEY` 类）**指纹一致**（MD5/SHA 比对） | 密文信封（`kid` + `data`）可**直接跨库写入**，无需解密重加密 |
| 指纹不一致 | 源环境解密 → 目标环境重加密；**禁止**明文落盘或进日志 |
| 密钥来源不明 / 已轮换 | 视为不一致；先确认 `kid` 对应密钥版本仍可用 |

比对只输出指纹（哈希），**永不**输出密钥原文或明文值。

## 2. 迁移前本地验证一次

- 在源环境用当前密钥**解密一条**真实记录，确认还原出合法格式
  （如 `sk-` 前缀、可解析 JSON），证明「密钥 + 密文」配对有效。
- 失败则停止迁移——搬过去只会得到一批无法解密的死数据。

## 3. 四步迁移套路（固定，不可省）

1. **`--dry-run`**：只输出「将写入/将跳过/将冲突」的行数与主键，不落库。
2. **backup JSON**：导出目标表受影响行为带时间戳的 JSON（**含密文，不含明文**；
   不入 git、不进知识库）。
3. **事务**：写入包在单事务；任一行失败整体回滚，避免半迁移状态。
4. **verify**：逐行校验行数、主键唯一性、**解密回读成功**、
   业务侧真实调用一次（如列出可用模型）通过。

## 4. 冲突与幂等

- 复合主键（租户 × 平台）用 **upsert**，重跑不产生重复行。
- `is_default` 类「每租户至多一个」约束：迁移后必须校验唯一性，
  多默认会导致运行时路由不确定。
- 脚本可重放：第二次跑 dry-run 应显示「0 将写入」。

## 5. 配置权限分层（迁移的目标形态）

1. **部署配置层**：env 决定启用哪些平台/集成。
2. **平台管理员层**：逐租户勾选可用项 + 指定默认 + 填密钥（加密存储）。
3. **终端用户层**：**只做选择，不配置平台**；界面只显示已分配项。

## 交付清单

- [ ] 已比对两环境密钥指纹，结论明确（可搬运 / 需重加密）
- [ ] 已在源环境本地解密验证一条记录成功
- [ ] dry-run 输出已人工核对
- [ ] 已生成 backup JSON（不含明文、不入 git）
- [ ] 写入在单事务内完成，失败可整体回滚
- [ ] verify 通过：行数 / 主键 / 解密回读 / 业务真实调用
- [ ] 重复跑 dry-run 显示 0 变更（幂等）

## 反模式

- 不比指纹直接搬密文，事后发现全是死数据。
- 把明文密钥写进脚本、日志、commit message 或知识库。
- 跳过 dry-run 直接写生产库；无 backup 就 UPDATE / DELETE。
- 迁移后只查行数，不做解密回读与真实调用。
- 把密钥同步到终端用户层配置（越权面扩大）。

## 相关

- 知识库 playbook：`agent_KB/playbooks/encrypted-credential-cross-env-migration.md`
- 配合：`security-and-hardening`（密钥管理基线）、`verification-before-completion`、
  `migration` / `deprecation-and-migration`（可回滚性）、
  `runtime-config-source-of-truth`（迁移前 env/DB 现状核对）
