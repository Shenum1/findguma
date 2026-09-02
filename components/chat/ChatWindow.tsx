"use client";

import { Modal } from "@/components/ui/Modal";
import { ChatFeed } from "@/components/chat/ChatFeed";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatConnectionStatus } from "@/components/chat/ChatConnectionStatus";
import { useChatMessages } from "@/components/chat/useChatMessages";
import { useChatUI } from "@/components/chat/useChatUI";

function ChatChrome({
  onClose,
  headingId,
  heightClassName,
}: {
  onClose?: () => void;
  headingId?: string;
  heightClassName: string;
}) {
  const { messages, loading, connection } = useChatMessages();

  return (
    <div className={`pixel-corners flex flex-col border border-ink/70 bg-canvas-raised ${heightClassName}`}>
      <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
        <span id={headingId} className="font-pixel text-lg leading-none tracking-wide">
          LIVE CHAT
        </span>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
          >
            ✕
          </button>
        ) : null}
      </div>
      <ChatFeed messages={messages} loading={loading} />
      <ChatConnectionStatus connection={connection} />
      <ChatComposer />
    </div>
  );
}

/**
 * One feed+composer implementation, two presentations: `embedded` sits inline
 * on the homepage (per the brief, it must read as "a major part of the
 * homepage"); `drawer` is the single global overlay opened from the header
 * chat icon/nav item on any route. Rendering both variants requires distinct
 * heading ids since ChatUIProvider mounts the drawer instance globally
 * alongside the homepage's embedded instance.
 */
export function ChatWindow({ variant }: { variant: "embedded" | "drawer" }) {
  const { isDrawerOpen, closeDrawer } = useChatUI();

  if (variant === "drawer") {
    return (
      <Modal open={isDrawerOpen} onClose={closeDrawer} labelledBy="chat-drawer-heading" className="max-w-lg">
        <ChatChrome onClose={closeDrawer} headingId="chat-drawer-heading" heightClassName="h-[70vh]" />
      </Modal>
    );
  }

  return <ChatChrome headingId="chat-embedded-heading" heightClassName="h-[28rem] sm:h-[32rem]" />;
}
