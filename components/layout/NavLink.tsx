"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePanel, type PanelId } from "@/components/panels/useActivePanel";
import { cn } from "@/lib/utils/cn";

export const BASE_CLASS =
  "font-pixel text-lg tracking-wide uppercase px-1 py-0.5 border-b-2 border-transparent transition-colors hover:text-accent";
const ACTIVE_CLASS = "border-accent text-accent";

/**
 * Nav item for a panel section. On Home it toggles the panel client-side (hash
 * only, no navigation); from any other route (e.g. /merch) it's a real link
 * back to `/#<id>`, so PanelProvider opens the right panel once Home mounts.
 */
export function NavLink({
  id,
  label,
  onNavigate,
  assignTriggerId = false,
}: {
  id: PanelId;
  label: string;
  onNavigate?: () => void;
  /** Only one instance of a given nav item on the page should own the
   * `nav-trigger-*` id (focus-restore target when a panel closes) — the
   * header's copy claims it; footer/mobile-menu copies don't, to avoid
   * duplicate DOM ids when the same item renders in multiple places. */
  assignTriggerId?: boolean;
}) {
  const pathname = usePathname();
  const { activePanel, openPanel } = usePanel();
  const isHome = pathname === "/";
  const isActive = isHome && activePanel === id;
  const triggerId = assignTriggerId ? `nav-trigger-${id}` : undefined;

  if (!isHome) {
    return (
      <Link id={triggerId} href={`/#${id}`} className={BASE_CLASS}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id={triggerId}
      onClick={() => {
        openPanel(id);
        onNavigate?.();
      }}
      aria-current={isActive ? "true" : undefined}
      className={cn(BASE_CLASS, isActive && ACTIVE_CLASS)}
    >
      {label}
    </button>
  );
}

export function MerchNavLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/merch" className={BASE_CLASS} onClick={onNavigate}>
      MERCH
    </Link>
  );
}

export function HomeWordmark({ wordmark, name }: { wordmark: string; name: string }) {
  const pathname = usePathname();
  const { closePanel } = usePanel();
  const isHome = pathname === "/";

  const className = "font-display text-2xl font-semibold tracking-tight text-ink hover:text-accent transition-colors";

  if (!isHome) {
    return (
      <Link id="nav-trigger-home" href="/" className={className} aria-label={name}>
        {wordmark}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id="nav-trigger-home"
      onClick={() => closePanel()}
      className={className}
      aria-label={`${name} — go to Home`}
    >
      {wordmark}
    </button>
  );
}
