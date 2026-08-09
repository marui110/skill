export interface CacheStore {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, ttlMs: number): Promise<void>;
  delete(key: string): Promise<void>;
  deleteByPrefix(prefix: string): Promise<void>;
}

// Prefix per domain — replace APP_PREFIX with your app slug
export const PREVIEW_PREFIX = "app:preview:";

export function isRedisConfigured() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return Boolean(url && token);
}

export async function cacheGetJson<T>(store: CacheStore, key: string): Promise<T | undefined> {
  const raw = await store.get(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export async function cacheSetJson<T>(
  store: CacheStore,
  key: string,
  value: T,
  ttlMs: number,
) {
  await store.set(key, JSON.stringify(value), ttlMs);
}
