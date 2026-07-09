---
name: preview-first-sync
description: 实现「预览先展示、异步入库」三层缓存模式。用于 AI 生成内容需即时 UI 反馈、Radar/Insight 类批量生成、或用户要求 preview-first / optimistic display 时。
---

# Preview-First Sync

AI 生成内容：**先让用户看到，再写数据库**。

## 何时使用

- 批量 AI 生成需立即渲染
- 生成 + 持久化分离（允许短暂 syncState）
- 需要 sessionStorage 刷新恢复

## 架构

```
Server Action                    Client
─────────────                    ──────
1. auth + validate
2. AI generate
3. setPreviewCache(batch)  →   4. receive { batchId, items }
                               5. writeClientCache + setDisplay()
                               6. void syncToDb(batchId)
7. persistToDb (async)     ←   syncState: syncing → synced|failed
8. deletePreviewCache
```

## Checklist

- [ ] `CacheStore` 接口 + Redis/Memory 实现（见 `references/cache-store.ts`）
- [ ] 预览 key 带前缀 + `userId` + `batchId`
- [ ] TTL 默认 1h；过期自动 delete
- [ ] 客户端 `syncState`: `cached` | `syncing` | `synced` | `failed`
- [ ] `void sync()` 不 await；失败显示重试
- [ ] sessionStorage 存展示数据；key 含 userId 或 batchId
- [ ] DB 写入成功后删预览缓存
- [ ] 懒解析 ID：`pendingId` → 真实 UUID（用户操作时再 persist）

## 文件清单

| 文件 | 职责 |
|------|------|
| `lib/cache/store.ts` | CacheStore 抽象 |
| `lib/cache/{domain}-preview.ts` | 预览 batch CRUD |
| `lib/{domain}/client-*-cache.ts` | sessionStorage 读写 |
| `app/**/actions.ts` | generate + sync actions |
| `components/**/workspace.tsx` | 编排 display + void sync |

## 参考

- `references/cache-store.ts` — 存储接口
- `references/preview-batch.ts` — 预览 batch 模式
- `references/client-cache.ts` — sessionStorage 模式
- `references/workspace-orchestration.tsx` — 客户端编排片段

## 反模式

- 生成后先写 DB 再返回（用户等太久）
- 预览缓存无 TTL（内存泄漏）
- sync 失败静默吞掉（用户以为已保存）
- 预览 key 不含 userId（跨用户泄漏）
