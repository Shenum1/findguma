"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEscapeStack } from "@/hooks/useEscapeStack";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Shared accessible dialog primitive: portal, focus trap, ESC-to-close,
 * `inert` on the rest of the page, and initial-focus support. Backs both the
 * newsletter modal and the archive lightbox so accessibility is solved once.
 */
export function Modal({ open, onClose, labelledBy, children, initialFocusRef, className }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useFocusTrap(containerRef, open);

  // Only one layer of nested modals/panels should ever act on a given Escape
  // press (the topmost one) — see useEscapeStack. Kept separate from the
  // inert/overflow/focus effect below so a changing `onClose` identity (e.g.
  // AlbumWindow's handler is re-created whenever its lightbox state changes)
  // never re-triggers that effect and re-steals focus.
  useEscapeStack(open, onClose);

  useEffect(() => {
    if (!open) return;

    const root = document.getElementById("app-root");
    root?.setAttribute("inert", "");

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget = initialFocusRef?.current ?? containerRef.current;
    const raf = requestAnimationFrame(() => focusTarget?.focus());

    return () => {
      root?.removeAttribute("inert");
      document.body.style.overflow = originalOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open, initialFocusRef]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={cn(
              "relative z-10 max-h-[90vh] w-full max-w-md overflow-auto outline-none",
              className
            )}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
