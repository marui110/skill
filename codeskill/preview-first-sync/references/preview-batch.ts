import { cacheGetJson, cacheSetJson, PREVIEW_PREFIX, type CacheStore } from "./cache-store";

const DEFAULT_TTL_MS = 60 * 60 * 1000;

export interface PreviewItem<T> {
  pendingId: string; // `${batchId}#${index}` until DB id assigned
  data: T;
}

export interface PreviewBatch<T> {
  userId: string;
  batchId: string;
  items: PreviewItem<T>[];
  expiresAt: number;
}

function batchKey(userId: string, batchId: string) {
  return `${PREVIEW_PREFIX}${userId}:${batchId}`;
}

export async function setPreviewBatch<T>(
  store: CacheStore,
  userId: string,
  batchId: string,
  items: T[],
  ttlMs = DEFAULT_TTL_MS,
): Promise<PreviewItem<T>[]> {
  const now = Date.now();
  const previewItems = items.map((data, index) => ({
    pendingId: `${batchId}#${index}`,
    data,
  }));
  const batch: PreviewBatch<T> = {
    userId,
    batchId,
    items: previewItems,
    expiresAt: now + ttlMs,
  };
  await cacheSetJson(store, batchKey(userId, batchId), batch, ttlMs);
  return previewItems;
}

export async function getPreviewBatch<T>(
  store: CacheStore,
  userId: string,
  batchId: string,
  now = Date.now(),
): Promise<PreviewBatch<T> | undefined> {
  const entry = await cacheGetJson<PreviewBatch<T>>(store, batchKey(userId, batchId));
  if (!entry || entry.expiresAt <= now) {
    if (entry) await store.delete(batchKey(userId, batchId));
    return undefined;
  }
  return entry;
}
