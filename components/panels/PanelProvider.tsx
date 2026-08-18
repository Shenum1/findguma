"use client";

import { createContext, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useHashState } from "@/hooks/useHashState";

export type PanelId = "about" | "music" | "archive" | "tour";

const PANEL_IDS: PanelId[] = ["about", "music", "archive", "tour"];

function isPanelId(value: string): value is PanelId {
  return (PANEL_IDS as string[]).includes(value);
}

export interface PanelContextValue {
  activePanel: PanelId | null;
  activeSub: string | null;
  openPanel: (id: PanelId) => void;
  closePanel: () => void;
  openSub: (sub: string) => void;
  closeSub: () => void;
}

export const PanelContext = createContext<PanelContextValue | null>(null);

/**
 * Drives the "sections open in place" navigation model: Home/About/Music/
 * Archive/Tour all live on one page, and which one is visible is derived from
 * the URL hash (`#about`, `#music/release-slug`, ...) rather than a route.
 */
export function PanelProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hash, setHash] = useHashState();

  // A cross-route `<Link href="/#archive">` (e.g. from /merch) applies the URL
  // hash slightly *after* the pathname commits — by a variable amount, not a
  // single reliable tick — and never fires a native `hashchange` event either
  // way. Re-dispatching one at a few checkpoints after the route settles lets
  // our existing hashchange subscription (useHashState) pick up the
  // now-current hash whenever it actually lands — no direct setState here,
  // just re-notifying the external-store subscription that already owns the
  // state update. Redundant dispatches are harmless no-ops once the hash
  // value stops changing.
  useEffect(() => {
    const notify = () => window.dispatchEvent(new HashChangeEvent("hashchange"));
    const raf = requestAnimationFrame(notify);
    const timers = [30, 100, 300].map((delay) => setTimeout(notify, delay));
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  const [rawSegment, rawSub] = hash.split("/");

  const activePanel = rawSegment && isPanelId(rawSegment) ? rawSegment : null;
  const activeSub = activePanel && rawSub ? decodeURIComponent(rawSub) : null;

  const openPanel = useCallback((id: PanelId) => setHash(id), [setHash]);
  const closePanel = useCallback(() => setHash(""), [setHash]);
  const openSub = useCallback(
    (sub: string) => {
      if (!activePanel) return;
      setHash(`${activePanel}/${encodeURIComponent(sub)}`);
    },
    [activePanel, setHash]
  );
  const closeSub = useCallback(() => {
    if (!activePanel) return;
    setHash(activePanel);
  }, [activePanel, setHash]);

  const value = useMemo<PanelContextValue>(
    () => ({ activePanel, activeSub, openPanel, closePanel, openSub, closeSub }),
    [activePanel, activeSub, openPanel, closePanel, openSub, closeSub]
  );

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}
