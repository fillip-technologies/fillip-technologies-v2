"use client";

import { useEffect, useState } from "react";

// One request per URL per page load, shared by every component that asks for
// it (navbar menus, mobile drawer, service dock).
const cache = new Map<string, unknown[]>();
const inflight = new Map<string, Promise<unknown[] | null>>();

function loadItems(url: string): Promise<unknown[] | null> {
  const hit = cache.get(url);
  if (hit) return Promise.resolve(hit);
  let pending = inflight.get(url);
  if (!pending) {
    pending = fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data?.items)) return null;
        cache.set(url, data.items);
        return data.items as unknown[];
      })
      .catch(() => null /* callers keep their static fallback */)
      .finally(() => inflight.delete(url));
    inflight.set(url, pending);
  }
  return pending;
}

/**
 * The `items` array of a public JSON endpoint. Null until it loads, on failure,
 * or while `url` is null (pass null to skip fetching).
 */
export function useSharedItems<T>(url: string | null): T[] | null {
  const [loaded, setLoaded] = useState<{ url: string; items: T[] } | null>(null);

  useEffect(() => {
    if (!url) return;
    let alive = true;
    loadItems(url).then((items) => {
      if (alive && items) setLoaded({ url, items: items as T[] });
    });
    return () => {
      alive = false;
    };
  }, [url]);

  return loaded && loaded.url === url ? loaded.items : null;
}
