---
name: nextjs-saas-feature-scaffold
description: 在 Next.js SaaS 项目中脚手架新 feature。用于新增 app 页面、Server Action、DB query、shared/domain 组件的完整切片时。
---

# Next.js SaaS Feature Scaffold

按薄切片交付，每步可验证。遵循 `global-nextjs-saas-architecture` 与 `global-security-baseline`。

## 文件清单（按顺序创建）

| # | 文件 | 类型 |
|---|------|------|
| 1 | `lib/security/validation.ts` | 追加 Zod schema |
| 2 | `lib/db/queries/{feature}.ts` | Drizzle 查询（带 userId） |
| 3 | `app/(app)/{feature}/actions.ts` | Server Actions |
| 4 | `app/(app)/{feature}/page.tsx` | Server Page |
| 5 | `components/{feature}/{feature}-workspace.tsx` | Client UI |
| 6 | `components/shared/*` | 仅当跨页复用时 |

## Action 模板

```tsx
"use server";
import { getAuthenticatedUser } from "@/lib/security/auth";
import { FeatureInputSchema } from "@/lib/security/validation";
import { revalidatePath } from "next/cache";

export async function createFeature(input: unknown) {
  const user = await getAuthenticatedUser();
  const data = FeatureInputSchema.parse(input);
  // await db.insert... with user.id
  revalidatePath("/app/feature");
  return { ok: true };
}
```

## Query 模板

```tsx
export async function listFeature(userId: string) {
  return db.query.featureTable.findMany({
    where: eq(featureTable.userId, userId),
    orderBy: desc(featureTable.createdAt),
  });
}
```

## Page 模板

见 skill `shadcn-app-components` → `references/page-workspace-pattern.md`

## AI 生成类 feature

若需即时展示 → skill `preview-first-sync`

## Checklist

- [ ] `export const dynamic = "force-dynamic"` on user pages
- [ ] Schema 校验所有输入
- [ ] 查询带 userId
- [ ] `npm run lint` + `npm run build` 通过
- [ ] TDD：关键 action 有测试（如项目有 test setup）
