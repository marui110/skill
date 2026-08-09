const STORAGE_KEY = "app:preview-display";

export type SyncState = "cached" | "syncing" | "synced" | "failed";

export interface ClientCacheEntry<T> {
  batchId: string;
  items: T[];
  savedAt: number;
  syncState?: SyncState;
}

export function readClientCache<T>(): ClientCacheEntry<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClientCacheEntry<T>) : null;
  } catch {
    return null;
  }
}

export function writeClientCache<T>(entry: ClientCacheEntry<T>) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
}

export function clearClientCache() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}
