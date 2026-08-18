"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanel, type PanelId } from "@/components/panels/useActivePanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEscapeStack } from "@/hooks/useEscapeStack";

/**
 * A section that "opens like a window" over Home instead of routing to a new
 * page. Inactive panels are removed from the tab order/a11y tree via `hidden`;
 * the active one gets focus on open and restores it to the nav trigger on
 * close. Not a modal — the site header stays reachable while a panel is open.
 */
export function Panel({
  id,
  title,
  children,
}: {
  id: PanelId;
  title: string;
  children: ReactNode;
}) {
  const { activePanel, closePanel } = usePanel();
  const isActive = activePanel === id;
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const wasActive = useRef(false);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      containerRef.current?.focus();
    } else if (!isActive && wasActive.current) {
      document.getElementById(`nav-trigger-${id}`)?.focus();
    }
    wasActive.current = isActive;
  }, [isActive, id]);

  // Shares the same escape stack as Modal — if a nested window (e.g. the
  // release/album modal) is open on top of this panel, it intercepts Escape
  // first; only once it's closed does this panel's own Escape start firing.
  useEscapeStack(isActive, closePanel);

  return (
    <section
      id={`panel-${id}`}
      aria-label={title}
      hidden={!isActive}
      ref={containerRef}
      tabIndex={-1}
      className="outline-none"
    >
      <AnimatePresence>
        {isActive ? (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="pixel-corners border border-ink/70 bg-canvas"
          >
            <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
              <span className="truncate font-pixel text-lg leading-none tracking-wide">
                {title}
              </span>
              <button
                type="button"
                onClick={closePanel}
                aria-label={`Close ${title}`}
                className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
              >
                &#10005;
              </button>
            </div>
            <div className="p-4 sm:p-8">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
