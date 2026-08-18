"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, MerchNavLink } from "@/components/layout/NavLink";
import { PANEL_NAV_ITEMS } from "@/components/layout/navItems";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useOnClickOutside(containerRef, () => setOpen(false), open);

  return (
    <div className="relative sm:hidden" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center border border-ink/70 font-pixel text-lg"
      >
        {open ? "✕" : "≡"}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu-panel"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="pixel-corners absolute right-0 top-11 z-40 flex w-48 flex-col gap-3 border border-ink/70 bg-canvas p-4"
          >
            {PANEL_NAV_ITEMS.map((item) => (
              <NavLink key={item.id} id={item.id} label={item.label} onNavigate={() => setOpen(false)} />
            ))}
            <MerchNavLink onNavigate={() => setOpen(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
