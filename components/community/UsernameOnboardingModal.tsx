"use client";

import { useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { CustomUsernameForm } from "@/components/community/CustomUsernameForm";
import { useCommunityAuth } from "@/components/community/useCommunityAuth";

/**
 * Rendered by CommunityAuthProvider whenever a signed-in user has no
 * community_profiles row yet — a username is mandatory before participating
 * anywhere in the community. Copies NewsletterModal's "message window" shell.
 * Closing (✕) signs the user back out rather than dismissing silently, since
 * there's no valid "signed in but skipped" state for this flow.
 */
export function UsernameOnboardingModal({
  open,
  onSubmitted,
}: {
  open: boolean;
  onSubmitted: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { signOut } = useCommunityAuth();

  return (
    <Modal open={open} onClose={signOut} labelledBy="username-modal-heading" initialFocusRef={inputRef}>
      <div className="pixel-corners border border-ink/70 bg-canvas-raised">
        <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
          <span className="font-pixel text-lg leading-none tracking-wide">NEW HANDLE</span>
          <button
            type="button"
            onClick={signOut}
            aria-label="Cancel and sign out"
            className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
          >
            ✕
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <h2 id="username-modal-heading" className="font-display text-2xl font-semibold text-ink">
            CHOOSE YOUR NAME
          </h2>
          <p className="mt-2 font-body text-sm text-muted">
            How should people know you here? This is what shows next to everything you post in Live
            Chat.
          </p>
          <div className="mt-4">
            <CustomUsernameForm onSuccess={onSubmitted} autoFocusRef={inputRef} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
