"use client";

export function readSessionStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSessionStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // ignore (private browsing / storage disabled)
  }
}
