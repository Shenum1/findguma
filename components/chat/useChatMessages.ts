"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export interface ChatAuthor {
  username: string;
  role: "fan" | "artist" | "moderator";
}

export interface ChatMessageWithAuthor {
  id: string;
  author_id: string;
  body: string;
  created_at: string;
  deleted_at: string | null;
  author: ChatAuthor | null;
}

export type ChatConnectionState = "connecting" | "connected" | "disconnected" | "error";

const HISTORY_LIMIT = 50;

/**
 * Loads recent history once, then keeps it live over a single Realtime
 * channel. Authors are joined client-side against community_profiles (public
 * read) and cached in a ref rather than denormalized onto chat_messages, so a
 * badge/username always reflects the sender's current profile.
 */
export function useChatMessages() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [messages, setMessages] = useState<ChatMessageWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<ChatConnectionState>("connecting");
  const authorsRef = useRef<Map<string, ChatAuthor>>(new Map());

  const hydrateAuthors = useCallback(
    async (authorIds: string[]) => {
      const unknown = [...new Set(authorIds)].filter((id) => !authorsRef.current.has(id));
      if (unknown.length === 0) return;

      const { data } = await supabase
        .from("community_profiles")
        .select("id, username, role")
        .in("id", unknown);

      for (const row of (data ?? []) as { id: string; username: string; role: ChatAuthor["role"] }[]) {
        authorsRef.current.set(row.id, { username: row.username, role: row.role });
      }
    },
    [supabase]
  );

  useEffect(() => {
    let cancelled = false;

    type MessageRow = Omit<ChatMessageWithAuthor, "author">;

    async function loadHistory() {
      setLoading(true);
      const { data } = await supabase
        .from("chat_messages")
        .select("id, author_id, body, created_at, deleted_at")
        .order("created_at", { ascending: false })
        .limit(HISTORY_LIMIT);

      if (cancelled) return;
      const rows = (data ?? []) as MessageRow[];
      await hydrateAuthors(rows.map((row) => row.author_id));
      if (cancelled) return;

      setMessages(
        rows
          .map((row) => ({ ...row, author: authorsRef.current.get(row.author_id) ?? null }))
          .reverse()
      );
      setLoading(false);
    }

    loadHistory();

    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        async (payload) => {
          const row = payload.new as MessageRow;
          await hydrateAuthors([row.author_id]);
          if (cancelled) return;
          setMessages((prev) => [
            ...prev,
            { ...row, author: authorsRef.current.get(row.author_id) ?? null },
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "chat_messages" },
        (payload) => {
          const row = payload.new as MessageRow;
          setMessages((prev) =>
            prev.map((message) =>
              message.id === row.id ? { ...message, deleted_at: row.deleted_at } : message
            )
          );
        }
      )
      .subscribe((status) => {
        if (cancelled) return;
        if (status === "SUBSCRIBED") setConnection("connected");
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setConnection("error");
        else if (status === "CLOSED") setConnection("disconnected");
      });

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase, hydrateAuthors]);

  return { messages, loading, connection };
}
