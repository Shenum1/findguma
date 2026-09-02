"use client";

import { ChatFeed } from "@/components/chat/ChatFeed";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatConnectionStatus } from "@/components/chat/ChatConnectionStatus";
import { useChatMessages } from "@/components/chat/useChatMessages";

/**
 * Feed+composer, rendered inside ChatPanelTrigger's popover — chrome (title
 * bar, border, close button) lives there, this is just the body sized small
 * enough for a header-anchored popup rather than a full page section.
 */
export function ChatWindow() {
  const { messages, loading, connection } = useChatMessages();

  return (
    <div className="flex h-72 flex-col sm:h-80">
      <ChatFeed messages={messages} loading={loading} />
      <ChatConnectionStatus connection={connection} />
      <ChatComposer />
    </div>
  );
}
