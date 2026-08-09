---
name: shadcn-app-components
description: shadcn SaaS 应用组件模板与三层分层。用于新建 shared 组件、空状态、页面头、工作区布局、或搭建 components/ui + shared + domain 结构时。
---

# shadcn App Components

## 三层结构

```
components/ui/       → shadcn 基元（Button, Input, Dialog…）
components/shared/   → 跨页面复用（无领域逻辑）
components/{domain}/ → 领域 UI（Radar, Calendar…）
```

## 新建 shared 组件前

1. 确认 shadcn 基元是否已满足（`npx shadcn@latest add`）
2. 查 `components/shared/` 是否已有类似组件
3. 用 `cn()` 合并 class；CVA 仅用于多 variant 基元

## 模板清单

| 组件 | 用途 | 参考 |
|------|------|------|
| `SectionHeader` | 区块标题+描述 | `references/section-header.tsx` |
| `AppPageHeader` | 页面顶栏 | `references/app-page-header.tsx` |
| `DashedEmptyState` | 空状态 | `references/dashed-empty-state.tsx` |
| Page workspace | Server 拉数 → Client 交互 | `references/page-workspace-pattern.md` |

## Page 模式

```tsx
// app/app/feature/page.tsx (Server)
export const dynamic = "force-dynamic";
export default async function Page() {
  const ctx = await requireAuthContext();
  const data = await getData(ctx.user.id);
  return <FeatureWorkspace initialData={data} />;
}
```

## 样式约定

- 排版：`ui-text-title` / `ui-text-section` / `ui-text-body`
- 空状态：`surface-2` 底 + 虚线或 featured 变体
- 遵循 `global-ui-conventions` 规则

## Checklist

- [ ] `"use client"` 仅当需要 hooks/事件
- [ ] Props 用显式 interface，不用 boolean prop 爆炸
- [ ] Lucide 图标 `size-4` 默认
- [ ] i18n 文案走 `t()` 不传硬编码中文到 shared（除非项目约定）
