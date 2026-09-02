"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { EmptyState } from "@/components/ui/EmptyState";
import { PixelLoader } from "@/components/ui/PixelLoader";
import type { ChatMessageWithAuthor } from "@/components/chat/useChatMessages";

export function ChatFeed({
  messages,
  loading,
}: {
  messages: ChatMessageWithAuthor[];
  loading: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Only auto-scroll to the newest message while the viewer is already near
  // the bottom — someone scrolled up to read history shouldn't get yanked
  // back down every time a new message lands.
  const pinnedToBottomRef = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !pinnedToBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedToBottomRef.current = distanceFromBottom < 80;
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="min-h-0 flex-1 overflow-y-auto px-3 py-2 sm:px-4"
    >
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <PixelLoader label="LOADING CHAT" />
        </div>
      ) : messages.length === 0 ? (
        <EmptyState title="IT'S QUIET IN HERE" description="Be the first to say something." />
      ) : (
        messages.map((message) => <ChatMessage key={message.id} message={message} />)
      )}
    </div>
  );
}
