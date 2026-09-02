"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEscapeStack } from "@/hooks/useEscapeStack";
import { ChatWindow } from "@/components/chat/ChatWindow";

/**
 * Header's live-chat entry point: a small anchored popover (same shape as
 * MobileMenu's dropdown), not a Panel/Modal — the rest of the page (hero,
 * other panels) stays visible and interactive while it's open, and it works
 * identically on every route since it carries its own local state instead of
 * routing through PanelProvider's home-only hash system.
 *
 * Deliberately takes no className: the caller positions it (SiteHeader wraps
 * this in its own absolutely-positioned <div>) rather than passing position
 * utilities in here, since they'd collide with this component's own
 * `relative` (Tailwind's cascade order, not the className call order, decides
 * which wins) and silently break the anchor for the dropdown below.
 */
export function ChatPanelTrigger() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useOnClickOutside(containerRef, () => setOpen(false), open);
  useEscapeStack(open, () => setOpen(false));

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="chat-popover"
        aria-label={open ? "Close live chat" : "Open live chat — live now"}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center border border-ink/70 font-pixel text-lg leading-none transition-colors hover:text-accent"
      >
        {">_"}
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-green ring-2 ring-canvas motion-reduce:animate-none"
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="chat-popover"
            role="dialog"
            aria-label="Live chat"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="pixel-corners absolute left-0 top-11 z-40 flex w-72 flex-col border border-ink/70 bg-canvas sm:w-80"
          >
            <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
              <span className="font-pixel text-lg leading-none tracking-wide">LIVE CHAT</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
              >
                ✕
              </button>
            </div>
            <ChatWindow />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
