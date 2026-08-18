"use client";

import { useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { useNewsletter } from "@/components/newsletter/useNewsletter";

export function NewsletterModal() {
  const { isOpen, dismiss, markSubscribed } = useNewsletter();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal open={isOpen} onClose={dismiss} labelledBy="newsletter-modal-heading" initialFocusRef={inputRef}>
      <div className="pixel-corners border border-ink/70 bg-canvas-raised">
        <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
          <span className="font-pixel text-lg leading-none tracking-wide">NEW MESSAGE</span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
          >
            ✕
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <h2 id="newsletter-modal-heading" className="font-display text-2xl font-semibold text-ink">
            WANT TO STAY IN THE LOOP?
          </h2>
          <p className="mt-2 font-body text-sm text-muted">
            New music. Shows. Merch. Things from my world.
          </p>
          <div className="mt-4">
            <NewsletterForm idPrefix="newsletter-modal" onSuccess={markSubscribed} autoFocusRef={inputRef} />
          </div>
          <p className="mt-3 font-pixel text-xs uppercase tracking-wider text-muted">
            No spam. Just updates.
          </p>
        </div>
      </div>
    </Modal>
  );
}
