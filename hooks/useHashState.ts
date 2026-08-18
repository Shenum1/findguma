"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getSnapshot() {
  return window.location.hash.replace(/^#/, "");
}

function getServerSnapshot() {
  return "";
}

/**
 * Syncs component state to the URL hash via native `hashchange`/history, never
 * `router.push` — panel switches stay client-only with no server/RSC round-trip,
 * while still getting native back/forward support and shareable deep links.
 */
export function useHashState() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setHashValue = useCallback((next: string) => {
    if (typeof window === "undefined") return;
    if (next) {
      window.location.hash = next;
    } else {
      // clearing the hash without leaving a trailing "#" in the URL
      const { pathname, search } = window.location;
      window.history.pushState(null, "", pathname + search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }, []);

  return [hash, setHashValue] as const;
}
