"use client";

import Link from "next/link";
import { PixelButton } from "@/components/ui/PixelButton";
import { useChatComposer } from "@/components/chat/useChatComposer";
import { useCommunityAuth } from "@/components/community/useCommunityAuth";

export function ChatComposer() {
  const { status: authStatus, profile } = useCommunityAuth();
  const { body, setBody, status, errorMessage, send } = useChatComposer();

  if (authStatus === "loading") {
    return (
      <div className="border-t border-ink/70 px-3 py-3 font-pixel text-sm text-muted sm:px-4">…</div>
    );
  }

  if (authStatus === "anon") {
    return (
      <div className="border-t border-ink/70 px-3 py-3 font-pixel text-sm text-muted sm:px-4">
        <Link href="/sign-in" className="underline hover:text-ink">
          SIGN IN TO CHAT
        </Link>
      </div>
    );
  }

  if (authStatus === "authed-no-username") {
    return (
      <div className="border-t border-ink/70 px-3 py-3 font-pixel text-sm text-muted sm:px-4">
        CHOOSE A USERNAME TO CHAT
      </div>
    );
  }

  if (profile?.is_banned) {
    return (
      <div className="border-t border-ink/70 px-3 py-3 font-pixel text-sm text-muted sm:px-4">
        YOU CAN&rsquo;T POST HERE RIGHT NOW.
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      className="flex flex-col gap-1 border-t border-ink/70 px-3 py-3 sm:px-4"
    >
      <div className="flex items-end gap-2">
        <label htmlFor="chat-composer-input" className="sr-only">
          Message
        </label>
        <textarea
          id="chat-composer-input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
          maxLength={500}
          rows={1}
          placeholder="Say something…"
          aria-describedby={errorMessage ? "chat-composer-error" : undefined}
          className="min-h-[2.25rem] flex-1 resize-none border border-ink/50 bg-canvas-raised px-3 py-2 font-body text-sm text-ink outline-none focus-visible:border-accent"
        />
        <PixelButton type="submit" disabled={status === "sending" || !body.trim()}>
          {status === "sending" ? "…" : "SEND"}
        </PixelButton>
      </div>
      {errorMessage ? (
        <p id="chat-composer-error" role="alert" className="font-pixel text-xs text-red">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
