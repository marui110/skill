---
name: vercel-post-deploy-verify
description: >-
  Verify Vercel production after Ready: runtime logs, env/dialect mismatch,
  custom domain vs Deployment Protection. Use when deploy succeeded but the
  site still returns 500, or dual-driver DB_DIALECT is unset/wrong.
---

# Vercel 部署后验收

**Build Ready ≠ 站点可用。** 部署成功后若仍 500 / 打不开，先查运行时与 env，再查业务代码。

## 何时使用

- 用户说部署成功但网页 Internal Server Error / 打不开 / React #441（Server Components render）
- dual-driver / 多 flavor 切流后首次 Vercel 上线
- 日志出现 `DB_DIALECT=… but DATABASE_URL scheme looks like …`（或同类方言/驱动断言）
- 日志出现 `getaddrinfo ENOTFOUND db.*.supabase.co` / health `database:down`

## 步骤

1. **部署身份**  
   - Deployments：Production + Ready + 正确 commit  
   - 自定义域名是否挂在同一项目  
   - `*.vercel.app` 可能因 Deployment Protection 返回 401；**不要只用它判断生产**

2. **Runtime Logs 优先**  
   - 用 Vercel MCP `get_runtime_logs` / `get_runtime_errors`，或让用户贴 Logs  
   - 找 instrumentation / middleware 上重复的同一 Error  
   - React #441 只是生产脱敏壳；以 Logs 里的 digest / cause 为准

3. **方言与 URL 对齐**  
   - 面板**没有** `DB_DIALECT` ≠ 未生效：代码常**默认 mysql**  
   - `postgresql://` → 在 Vercel **新增** `DB_DIALECT=postgres`（Production + Preview）  
   - `mysql://` → 显式 mysql 或确认默认一致  
   - 改 env 后必须 **Redeploy**

4. **Supabase 连接串（Vercel）**  
   - Runtime 应用应使用 **Connection Pooler**（`*.pooler.supabase.com`）作为 `DATABASE_URL`  
   - `DIRECT_URL` 常指向 `db.<ref>.supabase.co`（直连，Vercel 上易 `ENOTFOUND`）  
   - 解析顺序应为：`DATABASE_URL_APP` → `DATABASE_URL`（pooler）→ `DIRECT_URL`（最后）  
   - 若旧代码把 `DIRECT_URL` 排在 `DATABASE_URL` 前，即使 pooler 已配也会打到直连主机  
   - 应急：从 Vercel 删掉错误的 `DIRECT_URL`，或改成 pooler，再 Redeploy

5. **健康检查**  
   - 请求 `/api/health`（或项目等价路径）确认 dialect / `database` / 应用身份字段，而非 HTML 500

6. **权限**  
   - MCP `403` / `list_projects` 为空 → 重新授权或指导用户在面板改；勿假装已改 env

## 反模式

- 只看 Overview「No Production Deployment」或缓存截图就断定未部署  
- 未读 Runtime Logs 就改业务组件  
- 把真实连接串 / 密钥写进 skill、知识库或回复  
- 在 Vercel 上把 Supabase **直连** `db.*.supabase.co` 当作 runtime 主 URL

## 相关

- 知识库 playbook：`agent_KB/playbooks/vercel-post-deploy-verify.md`
- 配合：`deploy-to-vercel`、`verification-before-completion`、`shipping-and-launch`
