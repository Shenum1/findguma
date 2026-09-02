"use client";

import { useState } from "react";
import { AuthorBadge } from "@/components/chat/AuthorBadge";
import type { ChatMessageWithAuthor } from "@/components/chat/useChatMessages";
import { useCommunityAuth } from "@/components/community/useCommunityAuth";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function ChatMessage({ message }: { message: ChatMessageWithAuthor }) {
  const { user, profile } = useCommunityAuth();
  const [actionState, setActionState] = useState<"idle" | "working" | "reported">("idle");

  const canModerate = message.author_id === user?.id || profile?.role === "moderator" || profile?.role === "artist";
  const isDeleted = Boolean(message.deleted_at);

  async function handleDelete() {
    setActionState("working");
    await fetch(`/api/chat/messages/${message.id}`, { method: "DELETE" }).catch(() => null);
    setActionState("idle");
  }

  async function handleReport() {
    setActionState("working");
    const response = await fetch("/api/chat/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: message.id, reason: "Reported from Live Chat" }),
    }).catch(() => null);
    setActionState(response?.ok ? "reported" : "idle");
  }

  return (
    <div className="group flex flex-col gap-0.5 py-1">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-pixel text-base leading-none text-ink">
          {message.author?.username ?? "unknown"}
        </span>
        {message.author ? <AuthorBadge role={message.author.role} /> : null}
        <time
          dateTime={message.created_at}
          className="font-pixel text-xs leading-none text-muted"
        >
          {formatTimestamp(message.created_at)}
        </time>
        {!isDeleted && actionState !== "reported" ? (
          <span className="ml-auto hidden gap-2 font-pixel text-xs uppercase tracking-wide text-muted group-hover:flex">
            {canModerate ? (
              <button type="button" onClick={handleDelete} disabled={actionState === "working"} className="hover:text-red">
                delete
              </button>
            ) : null}
            {message.author_id !== user?.id ? (
              <button type="button" onClick={handleReport} disabled={actionState === "working"} className="hover:text-red">
                report
              </button>
            ) : null}
          </span>
        ) : null}
        {actionState === "reported" ? (
          <span className="ml-auto font-pixel text-xs uppercase tracking-wide text-muted">reported</span>
        ) : null}
      </div>
      <p className={isDeleted ? "font-body text-sm italic text-muted" : "font-body text-sm text-ink"}>
        {isDeleted ? "[message removed]" : message.body}
      </p>
    </div>
  );
}
